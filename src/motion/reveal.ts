import { waapi } from 'animejs/waapi';
import { allowMotion, motionLifetime, motionQuery } from './preferences';
import { groupDelay, motionTokens } from './tokens';
export { groupDelay } from './tokens';

export const revealPresets = ['rise', 'card', 'ink', 'fade'] as const;
export type RevealPreset = (typeof revealPresets)[number];
type RevealOptions = {
  duration?: number;
  ease?: string;
  delay?: number;
  distance?: number;
  scale?: number;
  opacity?: number;
  intensity?: number;
  autoplay?: boolean;
  loop?: boolean;
  persist?: boolean;
  reversed?: boolean;
  axis?: 'x' | 'y';
  onComplete?: () => void;
};

export function reveal(
  target: HTMLElement,
  preset: RevealPreset = 'rise',
  options: RevealOptions = {},
) {
  const tokens = motionTokens(target);
  const {
    distance,
    opacity,
    scale,
    intensity = 1,
    axis = 'y',
    ...playback
  } = options;
  const length =
    preset === 'fade'
      ? '0px'
      : distance === undefined
        ? tokens.length(`--motion-distance-${preset}`)
        : `${distance}px`;
  const offset = intensity === 1 ? length : `calc(${length} * ${intensity})`;
  const initialOpacity = opacity ?? tokens.number(`--motion-opacity-${preset}`);
  const initialScale = scale ?? tokens.number('--motion-scale-card');
  const duration =
    preset === 'ink' || preset === 'fade'
      ? '--duration-reading'
      : '--duration-entrance';
  return waapi.animate(target, {
    opacity: [1 - (1 - initialOpacity) * intensity, 1],
    ...(preset !== 'fade' && {
      translate: [axis === 'x' ? `${offset} 0` : `0 ${offset}`, '0 0px'],
    }),
    ...(preset === 'card' && {
      scale: [1 - (1 - initialScale) * intensity, 1],
    }),
    duration: tokens.ms(duration),
    ease: tokens.value('--editorial-ease-out'),
    delay: tokens.ms('--editorial-delay'),
    ...playback,
  });
}

export function observeReveals(
  root: ParentNode,
  viewport: Element | null = null,
) {
  if (!allowMotion() || !('IntersectionObserver' in window)) return;
  const pending = new Set<Element>(root.querySelectorAll('[data-reveal]'));
  if (!pending.size) return;
  const active = new Map<Element, () => void>();
  const clean = () => {
    observer.disconnect();
    for (const stop of active.values()) stop();
  };
  const lifetime = motionLifetime(clean);
  const { signal } = lifetime;
  const observer = new IntersectionObserver(
    (entries) => {
      const batchPositions = new Map<Element, number>();
      for (const {
        target,
        isIntersecting,
        boundingClientRect,
        rootBounds,
      } of entries) {
        if (!isIntersecting) {
          active.get(target)?.();
          continue;
        }
        if (!(target instanceof HTMLElement) || !pending.has(target)) continue;
        if (!allowMotion()) continue;
        pending.delete(target);
        // The initial viewport and fast jumps remain readable without a late entrance.
        if (
          target.matches(':focus-within') ||
          (rootBounds && boundingClientRect.top < rootBounds.top)
        ) {
          observer.unobserve(target);
          continue;
        }
        const value = target.getAttribute('data-reveal');
        const preset = revealPresets.find((name) => name === value);
        let animation: ReturnType<typeof reveal>;
        const stop = () => {
          animation.revert();
          target.removeAttribute('data-entering');
          active.delete(target);
          observer.unobserve(target);
          target.removeEventListener('focusin', stop);
        };
        const group = target.closest('[data-reveal-group]');
        const position = group ? (batchPositions.get(group) ?? 0) : 0;
        if (group) batchPositions.set(group, position + 1);
        try {
          animation = reveal(target, preset, {
            ...(group && { delay: groupDelay(target, position) }),
            onComplete: stop,
          });
          active.set(target, stop);
          target.setAttribute('data-entering', '');
          target.addEventListener('focusin', stop, { once: true, signal });
        } catch {
          observer.unobserve(target);
        }
      }
    },
    { root: viewport },
  );
  const observePending = (skipVisible = false) => {
    if (!allowMotion()) return;
    for (const target of pending) {
      if (
        skipVisible &&
        target.getBoundingClientRect().top < window.innerHeight &&
        target.getClientRects().length
      ) {
        pending.delete(target);
      } else observer.observe(target);
    }
  };
  observePending(!viewport);
  matchMedia(motionQuery).addEventListener(
    'change',
    ({ matches }) => {
      if (matches) observePending(true);
    },
    { signal },
  );
  document.addEventListener('visibilitychange', () => observePending(true), {
    signal,
  });
  window.addEventListener(
    'pageshow',
    ({ persisted }) => {
      if (persisted) observePending(true);
    },
    { signal },
  );
  return () => {
    lifetime.abort();
    clean();
  };
}
