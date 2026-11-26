import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { indexProduct } from '../src/data/labs-directory.ts';
import { productSchema } from '../src/data/labs-schema.ts';

const required = {
  slug: 'producto-de-prueba',
  name: 'Producto de prueba',
  summary: 'Resumen del producto.',
  category: 'Documentación',
  type: 'Buscador',
  maturity: 'Prototype',
  development: 'In Development',
  authors: [{ name: 'AI PlayGrounds' }],
  origin: 'Institucional',
  aiRelationship: 'IA integrada',
  access: 'No disponible',
  publishedAt: '2026-11-24',
  publication: 'published',
};

test('una entrada mínima deriva ID y descripción y conserva alcances sin texto', () => {
  const product = productSchema.parse({
    ...required,
    scopes: { Team: null, Enterprise: 'Empresas con documentación interna.' },
  });
  assert.equal(product.id, required.slug);
  assert.equal(product.description, required.summary);
  assert.equal(product.application, undefined);
  assert.deepEqual(product.scopes, ['Team', 'Enterprise']);
  assert.deepEqual(product.audienceByScope, {
    Enterprise: 'Empresas con documentación interna.',
  });
  const { values } = indexProduct({ ...product, demo: false });
  assert.deepEqual(values.scopes, ['enterprise', 'team']);
  assert.deepEqual(values.application, []);
});

test('las entradas anteriores conservan sus datos y validan los alcances', () => {
  const legacy = {
    ...required,
    id: 'id-existente',
    description: 'Descripción detallada.',
    application: 'Documentación técnica',
    scopes: ['Team'],
    audienceByScope: { Team: 'Equipos de documentación.' },
  };
  assert.deepEqual(productSchema.parse(legacy), {
    ...legacy,
    capabilities: [],
    keywords: [],
    media: [],
    related: [],
    technologies: [],
    verticals: [],
  });
  assert.equal(
    productSchema.safeParse({ ...legacy, scopes: ['Enterprise'] }).success,
    false,
  );
  assert.equal(
    productSchema.safeParse({ ...required, scopes: {} }).success,
    false,
  );
});
