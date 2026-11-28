import { sequence, type SequenceOptions } from './sequence';
import { splitHeading } from './typography';

export function organicReveal(
  root: HTMLElement,
  options: SequenceOptions = {},
  variant: 'organic' | 'landscape' = 'organic',
) {
  const run = sequence(root, variant, options);
  const { all, reveal, prepare, timeline, scale, at, spread, tokens } = run;
  const landscape = variant === 'landscape';
  const [art] = all('[data-scene-art]');
  if (art) {
    // The origin follows the art's anchoring, including any responsive recentering.
    const origin =
      getComputedStyle(art).getPropertyValue('--motion-mask-origin').trim() ||
      '100% 100%';
    timeline.add(
      art,
      {
        clipPath: {
          from: `ellipse(0% 0% at ${origin})`,
          to: `ellipse(155% 155% at ${origin})`,
        },
        duration: at(0.84),
        ease: run.ease('--motion-ease-mask'),
      },
      0,
    );
    timeline.add(
      art,
      {
        scale: [scale('--motion-scale-landscape-entry'), 1],
        duration: at(0.98),
      },
      0,
    );
  }
  const lines = all('[data-scene-title]').flatMap((heading) =>
    splitHeading(run, heading, 'lines'),
  );
  reveal(
    lines,
    'bottom',
    landscape ? 0.16 : 0.22,
    0.4,
    spread('--motion-stagger-line', 0.12),
  );
  reveal(
    all('[data-scene-copy]'),
    'left',
    0.41,
    0.4,
    spread('--motion-stagger-line', 0.08),
  );
  const actions = all<HTMLElement | SVGElement>(
    landscape
      ? '[data-scene-actions] > :is([data-scene-link-text], [data-card-arrow])'
      : '[data-scene-actions]',
  );
  if (actions.length) {
    const initialScale = scale('--motion-scale-action');
    const initialOpacity = tokens.number('--motion-opacity-ink');
    prepare(actions, 'opacity', String(initialOpacity));
    prepare(actions, 'transform', `scale(${initialScale})`);
    timeline.add(
      actions,
      {
        scale: [initialScale, 1],
        opacity: [initialOpacity, 1],
        duration: at(0.27),
        delay: spread('--motion-stagger-group', 0.07),
      },
      at(0.73),
    );
  }
  return run.start();
}
