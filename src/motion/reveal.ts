import { waapi } from 'animejs/waapi';
import { allowMotion, motionLifetime } from './preferences';
import { motionTokens } from './tokens';

export const revealPresets = ['rise', 'card', 'ink', 'fade'] as const;
export type RevealPreset = (typeof revealPresets)[number];
type RevealOptions = {
  duration?: number;
  ease?: string;
  delay?: number;
  distance?: number;
  scale?: number;
  opacity?: number;
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
  const { distance, opacity, scale, axis = 'y', ...playback } = options;
  const offset = `${distance ?? tokens.number(`--motion-distance-${preset}`)}px`;
  return waapi.animate(target, {
    opacity: [opacity ?? tokens.number(`--motion-opacity-${preset}`), 1],
    ...(preset !== 'fade' && {
      translate: [axis === 'x' ? `${offset} 0` : `0 ${offset}`, '0 0px'],
    }),
    ...(preset === 'card' && {
      scale: [scale ?? tokens.number('--motion-scale-card'), 1],
    }),
    duration: tokens.ms('--duration-entrance'),
    ease: tokens.value('--editorial-entrance-ease'),
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
      for (const { target, isIntersecting } of entries) {
        if (
          !isIntersecting ||
          !(target instanceof HTMLElement) ||
          !pending.has(target)
        )
          continue;
        if (!allowMotion()) continue;
        pending.delete(target);
        observer.unobserve(target);
        if (target.matches(':focus-within')) continue;
        const value = target.getAttribute('data-reveal');
        const preset = revealPresets.find((name) => name === value);
        const stop = () => {
          animation.revert();
          target.removeAttribute('data-entering');
          active.delete(target);
          target.removeEventListener('focusin', stop);
        };
        const animation = reveal(target, preset, { onComplete: stop });
        active.set(target, stop);
        target.setAttribute('data-entering', '');
        target.addEventListener('focusin', stop, { once: true, signal });
      }
      if (!pending.size) observer.disconnect();
    },
    { root: viewport, rootMargin: viewport ? '0px' : '0px 0px -112px' },
  );
  const observePending = () => {
    if (allowMotion()) for (const target of pending) observer.observe(target);
  };
  observePending();
  document.addEventListener('visibilitychange', observePending, { signal });
  window.addEventListener(
    'pageshow',
    ({ persisted }) => {
      if (persisted) observePending();
    },
    { signal },
  );
  return () => {
    lifetime.abort();
    clean();
  };
}
