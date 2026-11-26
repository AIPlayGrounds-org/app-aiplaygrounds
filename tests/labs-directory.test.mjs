import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { URLSearchParams } from 'node:url';
import {
  buildFacets,
  directoryLimits,
  evaluateDirectory,
  indexProduct,
  paginateProducts,
  readDirectoryState,
  sortProducts,
  writeDirectoryState,
} from '../src/data/labs-directory.ts';
import { productSchema } from '../src/data/labs-schema.ts';
import demos from '../src/data/labs-products.demo.json' with { type: 'json' };

const products = demos.map((entry) =>
  indexProduct({ ...productSchema.parse(entry), demo: true }),
);
const options = buildFacets(products).flatMap(({ key, options }) =>
  options.map(([value]) => ({ name: key, value })),
);
const fullControls = { sortable: true, paginated: true };

test('la búsqueda combina campos y trata igual las consultas con y sin tildes', () => {
  for (const query of [
    'Semantic Search',
    'pasajes pertinentes',
    'gestión',
    'GESTION',
    'Python búsqueda semántica',
    'AI PlayGrounds conocimiento embeddings',
  ]) {
    assert.deepEqual(
      evaluateDirectory(products, query, new Map()).results.map(({ id }) => id),
      ['demo-semantic-search'],
    );
  }
  assert.deepEqual(
    evaluateDirectory(products, 'Alex Rivera', new Map()).results.map(
      ({ id }) => id,
    ),
    ['demo-flow-studio'],
  );
  assert.equal(
    evaluateDirectory(products, 'sin coincidencias', new Map()).results.length,
    0,
  );
});

test('las facetas combinan opciones del mismo grupo y recalculan los demás contadores', () => {
  const filters = new Map([
    ['scopes', new Set(['enterprise', 'individual'])],
    ['maturity', new Set(['prototype'])],
  ]);
  const { results, counts } = evaluateDirectory(products, '', filters);
  assert.deepEqual(
    results.map(({ id }) => id),
    ['demo-semantic-search'],
  );
  assert.equal(counts.get('maturity').get('beta'), 1);
  assert.equal(counts.get('scopes').get('enterprise'), 1);
  assert.equal(counts.get('scopes').get('individual') ?? 0, 0);
});

test('ordenación alfabética, por publicación y por actualización', () => {
  const order = (sort) =>
    [...products]
      .sort((a, b) => sortProducts(a, b, sort))
      .map(({ name }) => name);
  assert.deepEqual(order('az'), [
    'CodeAssist',
    'Flow Studio',
    'Semantic Search',
  ]);
  assert.deepEqual(order('za'), [
    'Semantic Search',
    'Flow Studio',
    'CodeAssist',
  ]);
  assert.deepEqual(order('recent'), [
    'CodeAssist',
    'Semantic Search',
    'Flow Studio',
  ]);
  assert.equal(
    sortProducts(
      { ...products[2], updatedAt: '2026-11-26' },
      products[0],
      'updated',
    ),
    -1,
  );
});

test('las páginas se ajustan a 1, 3, 4, 5, 12 y más de 12 productos', () => {
  for (const size of [0, 1, 3, 4, 5, 12, 13, 25]) {
    const results = Array.from({ length: size }, (_, index) => index);
    const first = paginateProducts(results, 1);
    assert.equal(
      first.results.length,
      Math.min(size, directoryLimits.pageSize),
    );
    const last = paginateProducts(results, 99);
    assert.equal(
      last.page,
      Math.max(1, Math.ceil(size / directoryLimits.pageSize)),
    );
    assert.deepEqual(
      last.results,
      results.slice((last.page - 1) * directoryLimits.pageSize),
    );
  }
});

test('restaurar una URL conserva los filtros confirmados, orden, vista y página', () => {
  const params = new URLSearchParams(
    'q=gestión&scopes=enterprise&scopes=team&maturity=prototype&sort=za&view=list&page=2',
  );
  const state = readDirectoryState(params, options, fullControls);
  assert.deepEqual(
    state.filters.get('scopes'),
    new Set(['enterprise', 'team']),
  );
  assert.deepEqual(state.filters.get('maturity'), new Set(['prototype']));
  assert.equal(state.query, 'gestión');
  assert.equal(state.sort, 'za');
  assert.equal(state.view, 'list');
  assert.equal(state.page, 2);
  assert.deepEqual(
    readDirectoryState(writeDirectoryState(state), options, fullControls),
    state,
  );
  const compact = readDirectoryState(
    new URLSearchParams('scopes=invalid&sort=za&view=list&page=2'),
    options,
    { sortable: false, paginated: false },
  );
  assert.equal(writeDirectoryState(compact).toString(), '');
  assert.equal(
    readDirectoryState(
      new URLSearchParams('page=-3&sort=invalid'),
      options,
      fullControls,
    ).page,
    1,
  );
});
