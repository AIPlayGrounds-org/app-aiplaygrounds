import { strict as assert } from 'node:assert';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { URL, URLSearchParams } from 'node:url';
import {
  evaluateDirectory,
  paginateDirectory,
  readDirectoryState,
  writeDirectoryState,
} from '../src/data/directory.ts';
import {
  indexResearch,
  researchFacets,
} from '../src/data/research-directory.ts';
import {
  researchDemoSchema,
  researchSchema,
} from '../src/data/research-schema.ts';
import demos from '../src/data/research.demo.json' with { type: 'json' };

const entries = demos.map((demo) => researchDemoSchema.parse(demo));
const indexes = entries.map((entry) => indexResearch({ ...entry, demo: true }));

test('el directorio de demostración contiene cuatro fichas con portada y relaciones válidas', () => {
  assert.equal(entries.length, 4);
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  for (const { id, cover, relatedResearch } of entries) {
    assert.ok(cover && existsSync(new URL(`..${cover.src}`, import.meta.url)));
    assert.ok(relatedResearch.length > 0);
    for (const targetId of relatedResearch) {
      assert.notEqual(targetId, id);
      assert.ok(byId.get(targetId)?.relatedResearch.includes(id));
    }
  }
});

test('una ficha real publicada necesita descripción, autoría y una fuente primaria verificada', () => {
  const entry = entries[0];
  const publicEntry = {
    ...entry,
    cover: undefined,
    source: 'https://example.org/original',
    verifiedAt: '2026-10-10',
  };
  assert.ok(researchSchema.safeParse(publicEntry).success);
  assert.ok(
    !researchSchema.safeParse({ ...publicEntry, source: undefined }).success,
  );
  assert.ok(
    !researchSchema.safeParse({ ...publicEntry, verifiedAt: undefined })
      .success,
  );
  assert.ok(!researchSchema.safeParse({ ...publicEntry, authors: [] }).success);
  assert.ok(
    !researchSchema.safeParse({
      ...publicEntry,
      summary: undefined,
      question: undefined,
    }).success,
  );
  assert.ok(
    !researchSchema.safeParse({ ...publicEntry, source: 'ftp://example.org' })
      .success,
  );
  assert.ok(
    !researchDemoSchema.safeParse({ ...entry, doi: '10.1000/demo' }).success,
  );
  assert.ok(
    !researchDemoSchema.safeParse({
      ...entry,
      peerReview: 'Revisado por pares',
    }).success,
  );
});

test('los filtros de investigación son dinámicos e independientes de los estados editoriales', () => {
  const { primary, secondary } = researchFacets(indexes);
  assert.deepEqual(
    primary.map(({ key }) => key),
    ['area', 'type', 'researchStatus'],
  );
  assert.ok(secondary.some(({ key }) => key === 'editorialStatus'));
  assert.ok(!secondary.some(({ key }) => key === 'peerReview'));
  assert.deepEqual(researchFacets([indexes[0]]), {
    primary: [],
    secondary: [],
  });
  const filters = new Map([
    ['researchStatus', new Set(['en desarrollo'])],
    ['editorialStatus', new Set(['protocolo'])],
    ['techniques', new Set(['embeddings'])],
  ]);
  const { results, counts } = evaluateDirectory(
    indexes,
    'Lucia BM25 pertinencia',
    filters,
  );
  assert.deepEqual(
    results.map(({ id }) => id),
    ['demo-busqueda-documental'],
  );
  assert.equal(counts.get('techniques').get('busqueda vectorial'), 1);
  assert.equal(
    evaluateDirectory(
      indexes,
      'Lucia BM25',
      new Map([...filters, ['year', new Set(['2024'])]]),
    ).results.length,
    0,
  );
});

test('la lista es la vista predeterminada y el estado completo puede restaurarse', () => {
  const settings = { sortable: true, paginated: true, defaultView: 'list' };
  const options = [{ name: 'type', value: 'estudio comparativo' }];
  assert.equal(
    readDirectoryState(new URLSearchParams(), options, settings).view,
    'list',
  );
  const search = new URLSearchParams(
    'q=BM25&type=estudio+comparativo&sort=az&view=grid&page=2',
  );
  const state = readDirectoryState(search, options, settings);
  assert.equal(
    writeDirectoryState(state, 'list').toString(),
    search.toString(),
  );
  assert.equal(
    writeDirectoryState({ ...state, view: 'list' }, 'list').has('view'),
    false,
  );
  const largerCatalog = Array.from({ length: 16 }, (_, position) => ({
    ...indexes[position % indexes.length],
    id: `sample-${position}`,
  }));
  const page = paginateDirectory(largerCatalog, state.page);
  assert.equal(page.pageCount, 2);
  assert.equal(page.results.length, 4);
});
