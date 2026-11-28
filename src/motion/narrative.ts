import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';
import { splitHeading } from './typography';

export function narrativeFlow(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  return nativeSequence(root, 'narrative', options, (run) => {
    const { all, reveal, rules, spread, distance, add } = run;
    const lines = all('[data-scene-title]').flatMap((heading) =>
      splitHeading(run, heading, 'lines'),
    );
    reveal(lines, 'left', 0, 0.42, spread('--motion-stagger-line', 0.16));
    rules(all('[data-motion-rule]'), 0.25, 0.51);
    reveal(
      all('[data-scene-copy]'),
      'left',
      0.38,
      0.55,
      spread('--motion-stagger-line', 0.1),
    );
    const offset = spread('--motion-stagger-group', 0.06);
    reveal(all('[data-scene-link-text]'), 'left', 0.67, 0.27, offset);
    add(
      all<SVGElement>('[data-scene-actions] [data-card-arrow]'),
      {
        // The existing CSS interaction owns individual translate.
        transform: [
          `translate(${distance('--motion-arrow-x', -1)}, ${distance('--motion-arrow-y', -1)})`,
          'translate(0px, 0px)',
        ],
        opacity: [0, 1],
      },
      0.67,
      0.27,
      offset,
    );
  });
}
