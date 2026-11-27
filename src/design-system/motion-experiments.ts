import { animate } from 'animejs/animation';
import { createDraggable } from 'animejs/draggable';
import { createSpring } from 'animejs/easings';
import { onScroll } from 'animejs/events';
import { createLayout } from 'animejs/layout';
import { createScope } from 'animejs/scope';
import { createMotionPath, morphTo } from 'animejs/svg';
import { splitText } from 'animejs/text';
import { createTimeline } from 'animejs/timeline';
import { stagger } from 'animejs/utils';
import { waapi } from 'animejs/waapi';
import { motionTokens } from '../motion/tokens';

export interface Playback {
  duration: number;
  pause(): void;
  resume(): void;
  seek(time: number): void;
  revert(): void;
}

export interface Settings {
  mode: string;
  duration: number;
  stagger: number;
  delay: number;
  distance: number;
  ease: string;
  loop: boolean;
}

export function experiment(
  stage: HTMLElement,
  pattern: string,
  options: Settings,
): Playback {
  const tokens = motionTokens(stage);
  const scope = createScope({ root: stage });
  const items = [...stage.querySelectorAll<HTMLElement>('[data-motion-item]')];
  const { mode, duration, distance, delay, ease, loop } = options;
  const interval = options.stagger;
  const effects: Playback[] = [];
  let cleanup: (() => void) | undefined;
  let durationHint = duration;

  scope.add(() => {
    switch (pattern) {
      case 'sequences': {
        effects.push(
          createTimeline({ loop, defaults: { ease } })
            .add(items, {
              opacity: [tokens.number('--motion-opacity-rise'), 1],
              y: [distance, 0],
              delay: stagger(interval, { start: delay }),
              duration,
            })
            .add(items, {
              scale: [tokens.number('--motion-scale-card'), 1],
              duration: tokens.ms('--duration-card'),
              delay: stagger(interval, { from: 'center' }),
            }),
        );
        break;
      }
      case 'scroll': {
        const container = stage.querySelector<HTMLElement>(
          '[data-motion-scroll]',
        )!;
        const target = stage.querySelector<HTMLElement>(
          '[data-motion-scroll-target]',
        )!;
        const progress = stage.querySelector<HTMLProgressElement>('progress')!;
        const horizontal = mode === 'horizontal';
        container.toggleAttribute('data-horizontal', horizontal);
        const animation = animate(mode === 'progress' ? progress : items, {
          ...(mode === 'progress'
            ? { value: [0, 1] }
            : horizontal
              ? { x: [0, -distance] }
              : { y: [distance, -distance] }),
          duration,
          ease: 'linear',
          autoplay: false,
        });
        const observer = onScroll({
          container,
          target,
          axis: horizontal ? 'x' : 'y',
          sync: true,
          onUpdate: ({ progress: value }) => {
            progress.value = value;
          },
        }).link(animation);
        effects.push(animation);
        cleanup = () => {
          observer.revert();
          container.removeAttribute('data-horizontal');
          progress.value = 0;
        };
        break;
      }
      case 'svg': {
        const shape = stage.querySelector<SVGPathElement>(
          '[data-motion-shape]',
        )!;
        const path = stage.querySelector<SVGPathElement>('[data-motion-path]')!;
        const glyph = stage.querySelector<SVGPathElement>(
          '[data-motion-morph]',
        )!;
        const traveler = stage.querySelector<SVGCircleElement>(
          '[data-motion-traveler]',
        )!;
        effects.push(
          mode === 'morph'
            ? animate(glyph, { d: morphTo(shape), duration, ease })
            : animate(traveler, { ...createMotionPath(path), duration, ease }),
        );
        break;
      }
      case 'typography': {
        const text = stage.querySelector<HTMLElement>('[data-motion-text]')!;
        const split = splitText(text, {
          accessible: true,
          chars: mode === 'chars',
          words: mode !== 'lines',
          lines: mode === 'lines',
        });
        const targets =
          mode === 'lines'
            ? split.lines
            : mode === 'words'
              ? split.words
              : split.chars;
        effects.push(
          waapi.animate(targets, {
            opacity: [0, 1],
            translate: [`0 ${distance}px`, '0 0px'],
            delay: stagger(interval, { start: delay }),
            ease,
            duration,
            loop,
            persist: true,
          }),
        );
        durationHint =
          duration + delay + Math.max(0, targets.length - 1) * interval;
        break;
      }
      case 'physics-interactions': {
        const spring = createSpring({
          stiffness: tokens.number('--motion-spring-stiffness'),
          damping: tokens.number('--motion-spring-damping'),
        });
        if (mode === 'drag') {
          const drag = createDraggable(items[0], {
            container: items[0].parentElement!,
            y: false,
            releaseEase: spring.ease,
          });
          // Ejecutar also moves the target without a drag gesture.
          drag.animateInView();
          drag.setX(Math.min(80, Math.max(0, stage.clientWidth / 3)));
          cleanup = () => {
            drag.revert();
          };
        } else {
          effects.push(
            animate(items[0], {
              x: [Math.min(distance * 2, stage.clientWidth / 3), 0],
              ease: spring,
            }),
          );
        }
        break;
      }
      case 'layout': {
        const list = stage.querySelector<HTMLElement>('[data-motion-tiles]')!;
        const layout = createLayout(list, {
          children: '[data-motion-item]',
          duration,
          ease,
          ...{ enterFrom: { opacity: 0 }, leaveTo: { opacity: 0 } },
        });
        const first = items[0];
        const added = items[items.length - 1].cloneNode(true) as HTMLElement;
        added.dataset.layoutId = 'item-added';
        added.textContent = '04';
        effects.push(
          layout.update(() => {
            if (mode === 'grid') list.toggleAttribute('data-grid');
            else if (mode === 'exit') first.remove();
            else if (mode === 'enter') list.append(added);
            else list.append(first);
          }),
        );
        cleanup = () => {
          layout.revert();
          list.removeAttribute('data-grid');
          added.remove();
          list.append(...items);
        };
        break;
      }
    }
  });
  return {
    duration: Math.max(
      durationHint,
      ...effects.map((effect) =>
        Number.isFinite(effect.duration) ? effect.duration : 0,
      ),
    ),
    pause: () => effects.forEach((effect) => effect.pause()),
    resume: () => effects.forEach((effect) => effect.resume()),
    seek: (time) => effects.forEach((effect) => effect.seek(time)),
    revert: () => {
      scope.revert();
      cleanup?.();
    },
  };
}
