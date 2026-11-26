import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { compactHeroArt } from '../src/components/site/compact-hero-art.ts';

function luminance(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((part) => {
      const value = parseInt(part, 16) / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

test('los cuatro fondos de alcance mantienen contraste con el texto oscuro', () => {
  const foreground = luminance('#191a18');
  for (const [name, { palette }] of Object.entries(compactHeroArt)) {
    const background = luminance(palette[2]);
    const contrast = (background + 0.05) / (foreground + 0.05);
    assert.ok(contrast >= 4.5, `${name}: contraste ${contrast.toFixed(2)}:1`);
  }
});
