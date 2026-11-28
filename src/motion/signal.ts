import { createDrawable, createMotionPath } from 'animejs/svg';
import { sequence } from './sequence';
import type { SequenceOptions } from './scene';

const routes = new WeakMap<
  SVGPathElement,
  Pick<ReturnType<typeof createMotionPath>, 'translateX' | 'translateY'>
>();
function routeFor(path: SVGPathElement) {
  const cached = routes.get(path);
  if (cached) return cached;
  const { translateX, translateY } = createMotionPath(path);
  // These callbacks resolve normalized SVG user coordinates for this fixed DOM path.
  // Keep Anime's tween modifiers; only reuse its geometry initialization.
  const remember = (axis: typeof translateX): typeof translateX => {
    let target: Parameters<typeof axis>[0];
    let tween: ReturnType<typeof axis>;
    return (element) => {
      if (!tween || element !== target) {
        target = element;
        tween = axis(element);
      }
      return tween;
    };
  };
  const route = {
    translateX: remember(translateX),
    translateY: remember(translateY),
  };
  routes.set(path, route);
  return route;
}

export function initiativeSignal(
  root: HTMLElement,
  options: SequenceOptions = {},
  variant: 'signal' | 'trace' = 'signal',
) {
  return sequence(root, variant, options, (run) => {
    const { all, at, reveal, prepare, timeline, tokens, disposal, distance } =
      run;
    const building = variant === 'signal';
    const [path] = all<SVGPathElement>('[data-signal-path]');
    const [traveler] = all<SVGGElement>('[data-signal-traveler]');
    const drawing = building
      ? path
      : all<SVGPathElement>('[data-signal-trace]')[0];
    const travelStart = building ? 0.09 : 0;
    const travelLength = building ? 0.75 : 0.79;
    const linear = tokens.value('--motion-ease-draw');

    if (building) {
      reveal(all('[data-scene-title]'), 'bottom', 0.13, 0.42);
      reveal(all('[data-scene-copy]'), 'left', 0.32, 0.46);
      const link = all<HTMLElement | SVGElement>(
        '[data-scene-actions] > :is([data-scene-link-text], [data-card-arrow])',
      );
      if (link.length)
        timeline.add(
          link,
          {
            y: [distance('--motion-distance-ink'), '0px'],
            opacity: [tokens.number('--motion-opacity-ink'), 1],
            duration: at(0.29),
          },
          at(0.68),
        );
    }

    if (path && traveler && drawing) {
      const { translateX, translateY } = routeFor(path);
      const names = [
        'draw',
        'pathLength',
        'stroke-dasharray',
        'stroke-dashoffset',
      ];
      const attributes = names.map((name) => drawing.getAttribute(name));
      const lineCap = drawing.style.getPropertyValue('stroke-linecap');
      // createDrawable normalizes and mutates these attributes outside the timeline.
      disposal.push(() => {
        names.forEach((name, index) => {
          const value = attributes[index];
          if (value === null) drawing.removeAttribute(name);
          else drawing.setAttribute(name, value);
        });
        if (lineCap) drawing.style.setProperty('stroke-linecap', lineCap);
        else drawing.style.removeProperty('stroke-linecap');
      });
      const drawable = createDrawable(drawing);
      timeline.add(
        drawable,
        { draw: ['0 0', '0 1'], duration: at(travelLength), ease: linear },
        at(travelStart),
      );
      timeline.add(
        traveler,
        { translateX, translateY, duration: at(travelLength), ease: linear },
        at(travelStart),
      );
      timeline.add(
        traveler,
        {
          opacity: [
            {
              to: building
                ? 1
                : tokens.number('--motion-opacity-trace') * run.intensity,
              duration: at(0.08),
            },
            { to: 0, duration: at(0.12), delay: at(travelLength - 0.08) },
          ],
        },
        at(travelStart),
      );
      if (!building)
        timeline.add(
          drawing,
          {
            opacity: [
              {
                to: tokens.number('--motion-opacity-trace') * run.intensity,
                duration: at(0.08),
              },
              { to: 0, duration: at(0.17), delay: at(0.72) },
            ],
          },
          0,
        );
      for (const stop of all<SVGGElement>('[data-signal-stop]')) {
        const visits = (stop.dataset.signalStop ?? '')
          .split(' ')
          .filter(Boolean)
          .map((time) => at(travelStart + Number(time) * travelLength));
        if (!visits.length) continue;
        if (building) {
          const opacity =
            1 - (1 - tokens.number('--motion-opacity-module')) * run.intensity;
          prepare([stop], 'opacity', String(opacity));
          timeline.add(
            stop,
            {
              opacity: [opacity, 1],
              duration: at(0.14),
            },
            visits[0],
          );
        }
        const pulse = stop.querySelector<SVGCircleElement>(
          '[data-signal-pulse]',
        );
        if (pulse)
          for (const arrival of visits)
            timeline.add(
              pulse,
              {
                opacity: [
                  {
                    to:
                      (building ? 1 : tokens.number('--motion-opacity-trace')) *
                      run.intensity,
                    duration: at(0.04),
                  },
                  { to: 0, duration: at(0.12) },
                ],
              },
              arrival,
            );
      }
    }
  });
}
