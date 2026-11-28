import { sequence, type SequenceOptions } from './sequence';

export function compositionalConvergence(
  root: HTMLElement,
  options: SequenceOptions = {},
) {
  const run = sequence(root, 'convergence', options);
  const { all, reveal, prepare, timeline, distance, at, spread, tokens } = run;
  const columns =
    getComputedStyle(root)
      .getPropertyValue('--motion-convergence-axis')
      .trim() === 'inline';
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
  const art = all('[data-scene-art]');
  reveal(art, columns ? introEdge : 'bottom', 0.23, 0.65);
  const axis = columns ? 'x' : 'y';
  const direction = columns && reversed ? -1 : 1;
  const form = all('[data-scene-form]');
  const formOffset = distance('--motion-distance-card', direction);
  const entryOpacity = tokens.number('--motion-opacity-ink');
  // Never clip form controls: their hit areas and focus decoration stay available.
  prepare(form, 'transform', `translate${axis.toUpperCase()}(${formOffset})`);
  prepare(form, 'opacity', String(entryOpacity));
  timeline.add(
    form,
    {
      [axis]: [formOffset, '0px'],
      opacity: [entryOpacity, 1],
      duration: at(0.62),
    },
    at(0.23),
  );
  const rows = all('[data-scene-row]');
  if (rows.length) {
    prepare(
      rows,
      'transform',
      `translateY(${distance('--motion-distance-ink')})`,
    );
    prepare(rows, 'opacity', String(entryOpacity));
    timeline.add(
      rows,
      {
        y: [distance('--motion-distance-ink'), '0px'],
        opacity: [entryOpacity, 1],
        duration: at(0.42),
        delay: spread('--motion-stagger-group', 0.22),
      },
      at(0.36),
    );
  }
  return run.start();
}
