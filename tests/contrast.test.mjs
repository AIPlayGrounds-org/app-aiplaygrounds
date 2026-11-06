import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

const css = readFileSync('src/styles/tokens.css', 'utf8');
function hex(name) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'));
  assert.ok(match, `Falta ${name}`);
  return match[1];
}
function luminance(color) {
  const values = color
    .slice(1)
    .match(/../g)
    .map((part) => {
      const c = parseInt(part, 16) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a, b) {
  const [x, y] = [luminance(hex(a)), luminance(hex(b))].sort((a, b) => b - a);
  return (x + 0.05) / (y + 0.05);
}
test('pares de texto y bordes esenciales conservan contraste mínimo', () => {
  for (const bg of [
    'web-light-bg',
    'web-light-secondary',
    'web-light-elevated',
    'web-light-contrast',
  ]) {
    for (const fg of [
      'web-light-text',
      'web-light-secondary-text',
      'web-light-muted-text',
    ])
      assert.ok(contrast(fg, bg) >= 4.5, `${fg} sobre ${bg}`);
  }
  assert.ok(contrast('brand-white', 'brand-black') >= 4.5);
  assert.ok(contrast('brand-gray-3', 'brand-gray-1') >= 4.5);
  assert.ok(contrast('web-light-secondary-text', 'web-light-secondary') >= 3);
  assert.ok(contrast('brand-gray-3', 'brand-gray-1') >= 3);
});
