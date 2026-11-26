import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeEvent, parseFeed } from '../scripts/sync-luma-events.mjs';

const id = 'evt-fixture';
const feed = (...events) =>
  ['BEGIN:VCALENDAR', 'VERSION:2.0', ...events, 'END:VCALENDAR'].join('\r\n');
const block = [
  'BEGIN:VEVENT',
  `UID:${id}@events.lu.ma`,
  'DESCRIPTION:Get up-to-date information at: https://luma.com/fixtu',
  ' re\\nPublic details only',
  'STATUS:TENTATIVE',
  'END:VEVENT',
].join('\r\n');

test('el iCal se despliega, valida sus límites y rechaza IDs duplicados', () => {
  assert.deepEqual(parseFeed(feed(block)), [
    { id, url: 'https://luma.com/fixture', feedStatus: 'TENTATIVE' },
  ]);
  assert.deepEqual(parseFeed(feed()), []);
  assert.throws(() => parseFeed(feed(block, block)), /UID/);
  assert.throws(() => parseFeed(feed('BEGIN:VEVENT\r\n')), /incompletos/);
  assert.throws(() => parseFeed('<html>'), /iCal completo/);
});

test('la normalización excluye detalles privados y distingue cancelación de TENTATIVE', () => {
  const [entry] = parseFeed(feed(block));
  const event = {
    api_id: id,
    calendar_api_id: 'cal-87ZACs1cXmaGKLg',
    name: 'Fixture',
    visibility: 'public',
    start_at: '2026-06-06T00:00:00Z',
    end_at: '2026-06-06T02:00:00Z',
    timezone: 'America/Lima',
    location_type: 'meet',
    geo_address_visibility: 'private',
    geo_address_info: { city: 'Hidden' },
    virtual_info: { url: 'https://example.test/private' },
  };
  const hosts = [
    { name: 'Visible' },
    { name: 'Hidden', shown_on_event_page: false },
  ];
  const record = normalizeEvent(entry, { event, hosts });
  assert.equal(record.status, 'listed');
  assert.equal(record.startAt, '2026-06-06T00:00:00.000Z');
  assert.equal(record.modality, 'Virtual');
  assert.equal(record.location, 'Google Meet');
  assert.equal(record.city, undefined);
  assert.deepEqual(record.organizers, ['Visible']);
  assert.equal(
    normalizeEvent({ ...entry, feedStatus: 'CANCELLED' }, { event }).status,
    'cancelled',
  );
  assert.equal(
    normalizeEvent(entry, { event: { ...event, is_canceled: true } }).status,
    'cancelled',
  );
  assert.equal(
    normalizeEvent(entry, { event: { ...event, visibility: 'private' } }),
    undefined,
  );
  assert.throws(
    () => normalizeEvent(entry, { event: { ...event, api_id: 'evt-other' } }),
    /coincide/,
  );
});
