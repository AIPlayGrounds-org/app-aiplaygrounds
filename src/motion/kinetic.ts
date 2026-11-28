import { sequence, type SequenceOptions } from './sequence';
import { splitHeading } from './typography';

export function immersiveEntrance(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  const run = sequence(root, 'kinetic', options);
  const { all, at, timeline, scale, distance, spread, reveal } = run;
  const [heading] = all('h1');
  if (heading) {
    const words = splitHeading(run, heading, 'words');
    if (words.length)
      timeline.add(
        words,
        {
          keyframes: {
            '0%': {
              y: distance('--motion-shift-word'),
              scaleY: scale('--motion-scale-word'),
            },
            '66%': { y: '0em', scaleY: scale('--motion-scale-word-settle') },
            '100%': { y: '0em', scaleY: 1 },
          },
          duration: at(0.68),
          delay: spread('--motion-stagger-word', 0.22),
        },
        0,
      );
  }
  // The H1 is never masked, including when the script arrives after paint.
  reveal(all('[data-scene-copy]'), 'left', 0.18, 0.62);
  const actions = all('[data-scene-actions] > *');
  if (actions.length)
    timeline.add(
      actions,
      {
        scale: [scale('--motion-scale-action'), 1],
        duration: at(0.36),
        delay: spread('--motion-stagger-group', 0.08),
      },
      at(0.56),
    );
  return run.start();
}
