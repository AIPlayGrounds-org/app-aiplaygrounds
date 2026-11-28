import { sequence, type SequenceOptions } from './sequence';

export type MetricDensity = 'compact' | 'display';

export function rollingDigits(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  const run = sequence(root, 'metrics', options);
  const { all, timeline, at, spread, rules, tokens, disposal } = run;
  const reels: HTMLElement[] = [];
  for (const value of all('[data-rolling-value]')) {
    const density = value.dataset.rollingValue as MetricDensity;
    const steps = Math.round(
      tokens.number(
        density === 'compact'
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
      const reel = document.createElement('span');
      reel.className = 'motion-reel';
      for (let index = steps; index >= 0; index--) {
        const frame = document.createElement('span');
        frame.textContent = String((((actual - index) % 10) + 10) % 10);
        reel.append(frame);
      }
      digit.append(reel);
      reels.push(reel);
      disposal.push(() => reel.remove());
    }
  }
  if (reels.length)
    timeline.add(
      reels,
      {
        y: (target?: unknown) => [
          '0%',
          `${-100 * (1 - 1 / (target as HTMLElement).childElementCount)}%`,
        ],
        duration: at(0.89),
        delay: spread('--motion-stagger-digit', 0.11),
      },
      0,
    );
  const dividers = all('[data-motion-rule]');
  if (root.hasAttribute('data-motion-rule')) dividers.unshift(root);
  rules(dividers, 0.17, 0.67);
  return run.start();
}
