import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';

export type MetricDensity = 'compact' | 'display';

export function rollingDigits(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  return nativeSequence(root, 'metrics', options, (run) => {
    const { all, add, spread, rules, tokens, disposal } = run;
    const offset = spread('--motion-stagger-digit', 0.11);
    let index = 0;
    for (const value of all('[data-rolling-value]')) {
      const steps = Math.round(
        tokens.number(
          value.dataset.rollingValue === 'compact'
            ? '--motion-reel-steps-compact'
            : '--motion-reel-steps',
        ) * run.intensity,
      );
      if (steps < 1) continue;
      for (const digit of value.querySelectorAll<HTMLElement>(
        '[data-rolling-digit]',
      )) {
        const actual = Number(
          digit.querySelector('[data-digit-face]')?.textContent,
        );
        if (!Number.isSafeInteger(steps) || steps < 0 || steps > 10) {
          throw new RangeError(
            'A digit reel must contain at most one decimal cycle.',
          );
        }
        const reel = document.createElement('span');
        reel.className = 'motion-reel';
        reel.textContent = Array.from({ length: steps + 1 }, (_, step) =>
          String((((actual - steps + step) % 10) + 10) % 10),
        ).join('\n');
        digit.append(reel);
        disposal.push(() => reel.remove());
        const delay = offset(index++);
        add(
          [reel],
          {
            transform: [
              'translateY(0%)',
              `translateY(${-100 * (1 - 1 / (steps + 1))}%)`,
            ],
          },
          0,
          0.89,
          () => delay,
        );
      }
    }
    const dividers = all('[data-motion-rule]');
    if (root.hasAttribute('data-motion-rule')) dividers.unshift(root);
    rules(dividers, 0.17, 0.67);
  });
}
