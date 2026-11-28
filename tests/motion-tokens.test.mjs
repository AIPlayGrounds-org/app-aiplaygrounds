import assert from 'node:assert/strict';
import { test } from 'node:test';
import { motionTokens } from '../src/motion/tokens.ts';

test('motion tokens require explicit units and preserve valid zeros', (context) => {
  const values = new Map([
    ['--duration-instant', ' 0ms '],
    ['--duration-hero', '1.25s'],
    ['--motion-stagger-word', '34px'],
    ['--motion-scale-action', '0'],
    ['--motion-scale-word', '0.8oops'],
  ]);
  const previous = Object.getOwnPropertyDescriptor(
    globalThis,
    'getComputedStyle',
  );
  Object.defineProperty(globalThis, 'getComputedStyle', {
    configurable: true,
    value: () => ({ getPropertyValue: (name) => values.get(name) ?? '' }),
  });
  context.after(() => {
    if (previous)
      Object.defineProperty(globalThis, 'getComputedStyle', previous);
    else Reflect.deleteProperty(globalThis, 'getComputedStyle');
  });
  const tokens = motionTokens({});
  assert.equal(tokens.ms('--duration-instant'), 0);
  assert.equal(tokens.ms('--duration-hero'), 1250);
  assert.equal(tokens.number('--motion-scale-action'), 0);
  assert.equal(tokens.optional('--motion-convergence-axis'), '');
  assert.throws(() => tokens.ms('--motion-stagger-word'), /34px/);
  assert.throws(() => tokens.ms('--duration-missing'), /\(missing\)/);
  assert.throws(() => tokens.number('--motion-scale-word'), /0.8oops/);
});
