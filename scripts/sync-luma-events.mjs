import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { format, resolveConfig } from 'prettier';

const calendar = 'cal-87ZACs1cXmaGKLg';
const origin = 'https://luma.com';
const root = fileURLToPath(new URL('../', import.meta.url));
const snapshot = join(root, 'src/data/community-events.json');
const covers = join(root, 'public/images/community');
const idPattern = /^evt-[A-Za-z0-9]+$/;
const canceled = (value) => /^(cancelled|canceled)$/i.test(value ?? '');
const text = (value) =>
  typeof value === 'string' ? value.trim() || undefined : undefined;

async function get(url) {
  const response = await globalThis.fetch(url, {
    signal: globalThis.AbortSignal.timeout(20_000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

function pageData(html) {
  const match = html.match(
    /<script\b[^>]*\bid="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
  );
  const data = match && JSON.parse(match[1]).props?.pageProps?.initialData;
  if (!data) throw new Error('La página pública de Luma cambió de formato.');
  return data;
}

export function parseFeed(ics) {
  const unfolded = ics
    .replace(/\r?\n[ \t]/g, '')
    .replaceAll('\r', '')
    .trim();
  if (
    !unfolded.startsWith('BEGIN:VCALENDAR\n') ||
    !unfolded.endsWith('\nEND:VCALENDAR')
  ) {
    throw new Error('Luma no devolvió un calendario iCal completo.');
  }
  const events = [
    ...unfolded.matchAll(/^BEGIN:VEVENT\n([\s\S]*?)^END:VEVENT$/gm),
  ];
  if (events.length !== (unfolded.match(/^BEGIN:VEVENT$/gm) ?? []).length) {
    throw new Error('El feed contiene eventos incompletos.');
  }
  const seen = new Set();
  return events.map(([, block]) => {
    const id = block.match(/^UID:(evt-[A-Za-z0-9]+)@events\.lu\.ma$/m)?.[1];
    const url = block.match(
      /^DESCRIPTION[^:]*:Get up-to-date information at: (https:\/\/(?:luma\.com|lu\.ma)\/[\w-]+)(?=\\n|\n|$)/m,
    )?.[1];
    if (!id || seen.has(id) || !url)
      throw new Error(`UID o enlace iCal inesperado: ${id ?? 'ausente'}`);
    seen.add(id);
    return {
      id,
      url: `${origin}${new URL(url).pathname}`,
      feedStatus: block.match(/^STATUS:([A-Z]+)$/m)?.[1],
    };
  });
}

function plainText(node) {
  if (typeof node?.text === 'string') return node.text;
  if (node?.type === 'hardBreak' || node?.type === 'hard_break') return '\n';
  const content = Array.isArray(node?.content)
    ? node.content.map(plainText)
    : [];
  return [
    ...content,
    ['paragraph', 'heading', 'listItem'].includes(node?.type) ? '\n' : '',
  ].join('');
}

export function normalizeEvent(entry, data) {
  const e = data?.event;
  if (e?.api_id !== entry.id)
    throw new Error(`${entry.id}: la ficha no coincide con el feed`);
  if (e.visibility && e.visibility !== 'public') return;
  if (
    !e.visibility ||
    !text(e.name) ||
    !Number.isFinite(Date.parse(e.start_at))
  ) {
    throw new Error(`${entry.id}: faltan campos mínimos de publicación`);
  }
  const status =
    [
      entry.feedStatus,
      e.status,
      data.status,
      data.registration_availability,
    ].some(canceled) ||
    e.is_canceled === true ||
    e.is_cancelled === true ||
    e.canceled_at ||
    e.cancelled_at
      ? 'cancelled'
      : 'listed';
  const geo =
    e.geo_address_visibility === 'public' ? e.geo_address_info : undefined;
  const localized = geo?.localized?.['es-419'];
  const online = {
    meet: 'Google Meet',
    zoom: 'Zoom',
    online: undefined,
    virtual: undefined,
  };
  const modality =
    e.location_type === 'hybrid'
      ? 'Híbrida'
      : e.location_type === 'offline'
        ? 'Presencial'
        : Object.hasOwn(online, e.location_type)
          ? 'Virtual'
          : undefined;
  const organizers = Array.isArray(data.hosts)
    ? [
        ...new Set(
          data.hosts
            .filter((host) => host.shown_on_event_page !== false)
            .map((host) => text(host.name))
            .filter(Boolean),
        ),
      ]
    : [];
  const coverUrl = /^https:\/\/images\.lumacdn\.com\/[\w/.-]+$/.test(
    e.cover_url ?? '',
  )
    ? e.cover_url
    : undefined;
  const slug = /^[\w-]+$/.test(e.url ?? '') ? e.url : undefined;
  if (
    e.end_at &&
    (!Number.isFinite(Date.parse(e.end_at)) ||
      Date.parse(e.end_at) < Date.parse(e.start_at))
  ) {
    throw new Error(`${entry.id}: fecha de fin inválida`);
  }
  if (e.timezone) new Intl.DateTimeFormat('es-PE', { timeZone: e.timezone });
  return {
    id: entry.id,
    title: text(e.name),
    description: text(plainText(data.description_mirror)),
    coverUrl,
    startAt: new Date(e.start_at).toISOString(),
    endAt: e.end_at ? new Date(e.end_at).toISOString() : undefined,
    timezone: text(e.timezone),
    modality,
    city: text(localized?.city ?? geo?.city),
    country: text(localized?.country ?? geo?.country),
    location: text(
      localized?.full_address ??
        geo?.full_address ??
        geo?.address ??
        online[e.location_type],
    ),
    organizers,
    url: slug ? `${origin}/${slug}` : entry.url,
    status,
    feedStatus: entry.feedStatus,
    ownedCalendar: e.calendar_api_id === calendar,
    ...(e.calendar_api_id ? { organizerCalendar: e.calendar_api_id } : {}),
  };
}

async function previousEvents() {
  try {
    return JSON.parse(await readFile(snapshot, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function optimizeCovers(events, manifestPath) {
  const files = [];
  if (!manifestPath) return { events, files };
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const image = promisify(execFile);
  await mkdir(covers, { recursive: true });
  const stage = await mkdtemp(join(covers, '.sync-'));
  try {
    for (const event of events) {
      const authorization = manifest[event.id];
      if (
        !authorization ||
        !event.coverUrl ||
        authorization.url !== event.coverUrl
      )
        continue;
      // Prefer rights-holder files. Fetch from Luma only with express permission.
      if (!authorization.file && authorization.lumaDownload !== true) continue;
      const source = join(stage, 'original');
      if (authorization.file) {
        await writeFile(
          source,
          await readFile(join(dirname(manifestPath), authorization.file)),
        );
      } else {
        const response = await get(event.coverUrl);
        if (
          !/^image\/(?:png|jpeg|webp|gif|avif)(?:;|$)/i.test(
            response.headers.get('content-type') ?? '',
          )
        ) {
          throw new Error(
            `${event.id}: la portada no es una imagen compatible`,
          );
        }
        await writeFile(source, Buffer.from(await response.arrayBuffer()));
      }
      const key = createHash('sha256')
        .update('webp-v1')
        .update(await readFile(source))
        .digest('hex')
        .slice(0, 12);
      const base = `${event.id}-${key}`;
      for (const [variant, size] of [
        ['cover', 800],
        ['thumb', 240],
      ]) {
        const filename = `${base}-${variant}.webp`;
        await image('magick', [
          `${source}[0]`,
          '-auto-orient',
          '-strip',
          '-resize',
          `${size}x${size}>`,
          '-quality',
          '86',
          join(stage, filename),
        ]);
        files.push(filename);
        event[variant] = `/images/community/${filename}`;
      }
    }
    return { events, files, stage };
  } catch (error) {
    await rm(stage, { recursive: true, force: true });
    throw error;
  }
}

async function main() {
  const previous = await previousEvents();
  const [ics, ...pages] = await Promise.all([
    get(`https://api.luma.com/ics/get?entity=calendar&id=${calendar}`).then(
      (r) => r.text(),
    ),
    ...['past', 'upcoming'].map((period) =>
      get(`${origin}/calendar/${calendar}?period=${period}`)
        .then((r) => r.text())
        .then(pageData),
    ),
  ]);
  const entries = parseFeed(ics);
  for (const p of pages) {
    if (
      p.calendar?.api_id !== calendar ||
      p.has_access !== true ||
      !Array.isArray(p.event_start_ats) ||
      !Number.isInteger(p.upcoming_event_count) ||
      Math.max(p.event_start_ats.length, p.upcoming_event_count) >
        entries.length
    ) {
      throw new Error(
        'La portada del calendario no confirma la cobertura del iCal; se conservó la colección.',
      );
    }
  }
  const current = new Map();
  const starts = new Set();
  for (const entry of entries) {
    const data = pageData(await (await get(entry.url)).text()).data;
    const event = normalizeEvent(entry, data);
    if (Number.isFinite(Date.parse(data?.event?.start_at))) {
      starts.add(new Date(data.event.start_at).toISOString());
    }
    if (event) current.set(event.id, event);
  }
  if (
    pages.some((page) =>
      page.event_start_ats.some((start) => !starts.has(start)),
    )
  ) {
    throw new Error(
      'El calendario muestra fechas sin ficha coincidente en iCal; reintenta la sincronización.',
    );
  }
  for (const old of previous) {
    if (!idPattern.test(old.id))
      throw new Error('ID inválido en la colección anterior');
    const event = current.get(old.id);
    if (!event) {
      current.set(old.id, {
        ...old,
        status: old.status === 'cancelled' ? 'cancelled' : 'unlisted',
      });
    } else if (
      old.coverUrl &&
      old.coverUrl === event.coverUrl &&
      old.cover &&
      old.thumb
    ) {
      await Promise.all(
        [old.cover, old.thumb].map((path) =>
          access(join(root, 'public', path)),
        ),
      );
      Object.assign(event, { cover: old.cover, thumb: old.thumb });
    }
  }
  const events = [...current.values()].sort(
    (a, b) => b.startAt.localeCompare(a.startAt) || a.id.localeCompare(b.id),
  );
  const manifestIndex = process.argv.indexOf('--covers');
  if (manifestIndex !== -1 && !process.argv[manifestIndex + 1])
    throw new Error('Indica la ruta al manifiesto autorizado.');
  const { files, stage } = await optimizeCovers(
    events.filter((e) => e.status === 'listed'),
    manifestIndex === -1 ? undefined : process.argv[manifestIndex + 1],
  );
  const optional = [
    'description',
    'coverUrl',
    'endAt',
    'timezone',
    'modality',
    'city',
    'country',
    'location',
    'organizers',
    'cover',
  ];
  for (const event of events) {
    event.missing = optional.filter((field) => !event[field]?.length);
  }
  const serialized = await format(JSON.stringify(events), {
    ...(await resolveConfig(snapshot)),
    filepath: snapshot,
  });
  const temporary = `${snapshot}.${process.pid}.tmp`;
  try {
    for (const name of files)
      await rename(join(stage, name), join(covers, name));
    await writeFile(temporary, serialized);
    await rename(temporary, snapshot);
  } finally {
    await rm(temporary, { force: true });
    if (stage) await rm(stage, { recursive: true, force: true });
  }
  const visible = events.filter((event) => event.status === 'listed');
  const oldById = new Map(previous.map((event) => [event.id, event]));
  const changes = events.filter(
    (event) => JSON.stringify(event) !== JSON.stringify(oldById.get(event.id)),
  );
  console.log(
    `${entries.length} en iCal; ${visible.length} publicados; ${visible.filter((e) => e.coverUrl).length} originales identificados; ${visible.filter((e) => e.cover).length} portadas locales; ${changes.length} altas o cambios.`,
  );
  for (const event of events) {
    if (event.missing.length)
      console.log(`${event.id}: sin ${event.missing.join(', ')}`);
  }
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  main().catch((error) => {
    console.error(`No se actualizó la colección: ${error.message}`);
    process.exitCode = 1;
  });
}
