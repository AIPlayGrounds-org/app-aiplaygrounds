import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';

export function compositionalConvergence(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  return nativeSequence(
    root,
    'convergence',
    options,
    ({ all, reveal, add, distance, spread, tokens, travelEase }) => {
      const columns = tokens.optional('--motion-convergence-axis') === 'inline';
      const reversed = root.dataset.artSide === 'end';
      const introEdge = columns ? (reversed ? 'right' : 'left') : 'top';
      reveal(all('[data-scene-surface]'), 'center', 0, 0.59);
      reveal(
        all('[data-scene-title], [data-scene-copy]'),
        introEdge,
        0.12,
        0.48,
        spread('--motion-stagger-line', 0.08),
      );
      reveal(
        all('[data-scene-art]'),
        columns ? introEdge : 'bottom',
        0.23,
        0.65,
      );
      const axis = columns ? 'X' : 'Y';
      const formOffset = distance(
        '--motion-distance-card',
        columns && reversed ? -1 : 1,
      );
      const entryOpacity = tokens.number('--motion-opacity-ink');
      // Controls keep their hit areas and focus decoration.
      const forms = all('[data-scene-form]');
      const rows = all('[data-scene-row]');
      const stagger = spread('--motion-stagger-group', 0.22);
      const easing = travelEase();
      add(
        forms,
        {
          transform: [
            `translate${axis}(${formOffset})`,
            `translate${axis}(0px)`,
          ],
        },
        0.23,
        0.62,
        undefined,
        easing,
      );
      add(
        rows,
        {
          transform: [
            `translateY(${distance('--motion-distance-ink')})`,
            'translateY(0px)',
          ],
        },
        0.36,
        0.42,
        stagger,
        easing,
      );
      add(forms, { opacity: [entryOpacity, 1] }, 0.23, 0.62);
      add(rows, { opacity: [entryOpacity, 1] }, 0.36, 0.42, stagger);
    },
  );
}
