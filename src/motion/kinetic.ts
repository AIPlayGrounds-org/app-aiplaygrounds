import { nativeSequence } from './native-sequence';
import type { SequenceOptions } from './scene';
import { splitHeading } from './typography';

export function immersiveEntrance(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  return nativeSequence(root, 'kinetic', options, (run) => {
    const {
      all,
      keyframes,
      scale,
      distance,
      spread,
      reveal,
      add,
      ease,
      travelEase,
    } = run;
    const [heading] = all('h1');
    if (heading) {
      const words = splitHeading(run, heading, 'words');
      const delay = spread('--motion-stagger-word', 0.22);
      keyframes(
        words,
        [
          {
            scale: `1 ${scale('--motion-scale-word')}`,
            offset: 0,
            easing: ease,
          },
          {
            scale: `1 ${scale('--motion-scale-word-settle')}`,
            offset: 0.66,
            easing: ease,
          },
          { scale: '1 1', offset: 1 },
        ],
        0,
        0.68,
        delay,
        'forwards',
      );
      keyframes(
        words,
        [
          {
            translate: `0 ${distance('--motion-shift-word')}`,
            easing: travelEase(),
          },
          { translate: '0 0em' },
        ],
        0,
        0.68 * 0.66,
        delay,
        'forwards',
      );
    }
    // The H1 is never masked, including when the script arrives after paint.
    reveal(all('[data-scene-copy]'), 'left', 0.18, 0.62);
    add(
      all('[data-scene-actions] > *'),
      { scale: [scale('--motion-scale-action'), 1] },
      0.56,
      0.36,
      spread('--motion-stagger-group', 0.08),
    );
  });
}
