import { sequence, type SequenceOptions } from './sequence';

export function layeredAssembly(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  const run = sequence(root, 'assembly', options);
  const { all, reveal, prepare, timeline, at, scale, distance } = run;
  reveal(all('[data-scene-title]'), 'bottom', 0, 0.44);
  reveal(all('[data-scene-copy]'), 'left', 0.17, 0.52);
  const art = all('[data-scene-art]');
  // The static frame is the mask; move the artwork without repainting an inset every frame.
  const travel = distance('--motion-distance-assembly');
  const entryScale = scale('--motion-scale-landscape-entry');
  prepare(art, 'transform', `translateY(${travel}) scale(${entryScale})`);
  timeline.add(
    art,
    {
      y: [travel, '0%'],
      duration: at(0.56),
    },
    at(0.3),
  );
  timeline.add(
    art,
    {
      scale: [entryScale, 1],
      duration: at(0.47),
    },
    at(0.53),
  );
  return run.start();
}
