import { sequence, type SequenceOptions } from './sequence';
import { splitHeading } from './typography';

export function narrativeFlow(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  const run = sequence(root, 'narrative', options);
  const { all, reveal, prepare, rules, spread, distance, timeline, at } = run;
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
  const links = all('[data-scene-link-text]');
  reveal(links, 'left', 0.67, 0.27, spread('--motion-stagger-group', 0.06));
  const arrows = all<SVGElement>('[data-scene-actions] [data-card-arrow]');
  if (arrows.length) {
    prepare(arrows, 'opacity', '0');
    timeline.add(
      arrows,
      {
        // CSS uses individual translate for link feedback; the timeline owns transform.
        x: [distance('--motion-arrow-x', -1), '0px'],
        y: [distance('--motion-arrow-y', -1), '0px'],
        opacity: [0, 1],
        duration: at(0.27),
        delay: spread('--motion-stagger-group', 0.06),
      },
      at(0.67),
    );
  }
  return run.start();
}
