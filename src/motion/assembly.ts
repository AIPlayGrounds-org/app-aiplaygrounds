import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';

export function layeredAssembly(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  return nativeSequence(
    root,
    'assembly',
    options,
    ({ all, reveal, add, scale, distance, travelEase }) => {
      reveal(all('[data-scene-title]'), 'bottom', 0, 0.44);
      reveal(all('[data-scene-copy]'), 'left', 0.17, 0.52);
      const art = all('[data-scene-art]');
      // The fixed frame is the mask. Independent properties preserve the staggered settling.
      add(
        art,
        { translate: [`0 ${distance('--motion-distance-assembly')}`, '0 0%'] },
        0.3,
        0.56,
        undefined,
        travelEase(),
      );
      add(
        art,
        { scale: [scale('--motion-scale-landscape-entry'), 1] },
        0.53,
        0.47,
      );
    },
  );
}
