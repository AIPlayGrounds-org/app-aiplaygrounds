import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';
import { motionTokens } from './tokens';
import { splitHeading } from './typography';

export function organicReveal(
  root: HTMLElement,
  options: SequenceOptions = {},
  variant: 'organic' | 'landscape' = 'organic',
) {
  return nativeSequence(root, variant, options, (run) => {
    const { all, reveal, add, scale, spread, tokens } = run;
    const landscape = variant === 'landscape';
    const [art] = all('[data-scene-art]');
    if (art) {
      // Keep the existing CSS hover scale independent from this transform.
      const origin = motionTokens(art).value('--motion-mask-origin');
      add(
        [art],
        {
          clipPath: [
            `ellipse(0% 0% at ${origin})`,
            `ellipse(155% 155% at ${origin})`,
          ],
        },
        0,
        0.84,
        undefined,
        options.ease || tokens.value('--motion-ease-mask'),
      );
      add(
        [art],
        {
          transform: [
            `scale(${scale('--motion-scale-landscape-entry')})`,
            'scale(1)',
          ],
        },
        0,
        0.98,
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
    add(
      actions,
      {
        scale: [scale('--motion-scale-action'), 1],
        opacity: [tokens.number('--motion-opacity-ink'), 1],
      },
      0.73,
      0.27,
      spread('--motion-stagger-group', 0.07),
    );
  });
}
