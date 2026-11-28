import { allowMotion, motionLifetime, motionQuery } from './preferences';
import { bindSceneInterruption, bindTraceTriggers } from './interactions';
import { patterns } from './patterns';
import { groupDelay } from './tokens';
import type { SequenceName, SequencePlayback } from './sequence';

const roots = [
  ...document.querySelectorAll<HTMLElement>('[data-scene]'),
].filter((root) => !root.closest('[data-motion-manual]'));
const pending = new Set(roots);
const loading = new Set<HTMLElement>();
const active = new Map<HTMLElement, SequencePlayback>();
const traces = new Map<HTMLElement, SequencePlayback>();
const requests = new Map<HTMLElement, symbol>();
let observer: IntersectionObserver | undefined;
let beforeFirstPlay = true;
const entryRatio = 0.2;
const historyTraversal = performance
  .getEntriesByType('navigation')
  .some((entry) => 'type' in entry && entry.type === 'back_forward');

const finish = (root: HTMLElement) => {
  pending.delete(root);
  loading.delete(root);
  active.get(root)?.revert();
  active.delete(root);
  observer?.unobserve(root);
};
const clear = () => {
  for (const root of [...active.keys(), ...loading]) finish(root);
  for (const trace of traces.values()) trace.revert();
  traces.clear();
  requests.clear();
};
const { signal } = motionLifetime(() => {
  observer?.disconnect();
  clear();
});
const visible = (root: HTMLElement) => {
  const rect = root.getBoundingClientRect();
  return rect.top < innerHeight && rect.bottom > 0;
};
const play = async (root: HTMLElement, position: number) => {
  if (!allowMotion() || !pending.delete(root)) return;
  if (root.matches(':focus-within') || !visible(root)) {
    finish(root);
    return;
  }
  loading.add(root);
  try {
    const pattern = await patterns[root.dataset.scene as SequenceName]();
    if (!loading.has(root) || !allowMotion() || !visible(root)) {
      finish(root);
      return;
    }
    active.set(
      root,
      pattern(root, {
        delay: position ? groupDelay(root, position) : 0,
        onComplete: () => finish(root),
      }),
    );
  } catch {
    finish(root);
  } finally {
    loading.delete(root);
  }
};
const trace = async (root: HTMLElement) => {
  if (!allowMotion() || !visible(root)) return;
  finish(root);
  traces.get(root)?.revert();
  traces.delete(root);
  const request = Symbol();
  requests.set(root, request);
  try {
    const pattern = await patterns.trace();
    if (requests.get(root) !== request || !allowMotion() || !visible(root))
      return;
    traces.set(root, pattern(root, { onComplete: () => traces.delete(root) }));
  } finally {
    if (requests.get(root) === request) requests.delete(root);
  }
};

if (roots.length && 'IntersectionObserver' in window) {
  observer = new IntersectionObserver(
    (entries) => {
      const batch = new Map<Element, number>();
      for (const {
        target,
        isIntersecting,
        intersectionRatio,
        boundingClientRect,
      } of entries) {
        if (!(target instanceof HTMLElement)) continue;
        if (!isIntersecting) {
          if (loading.has(target) || active.has(target)) finish(target);
          traces.get(target)?.revert();
          traces.delete(target);
          continue;
        }
        if (intersectionRatio < entryRatio) continue;
        if (boundingClientRect.top < 0) {
          finish(target);
          continue;
        }
        const group = target.closest('[data-scene-group]');
        const position = group ? (batch.get(group) ?? 0) : 0;
        if (group) batch.set(group, position + 1);
        void play(target, position);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: [0, entryRatio] },
  );
  for (const root of roots) {
    bindSceneInterruption(root, () => finish(root), signal);
    if (root.dataset.scene === 'signal') {
      bindTraceTriggers(root, () => void trace(root).catch(() => {}), signal);
      root.addEventListener('pointerleave', () => requests.delete(root), {
        signal,
        passive: true,
      });
    }
  }
  const observePending = () => {
    const initial = beforeFirstPlay && !historyTraversal;
    beforeFirstPlay = false;
    if (!allowMotion()) return;
    for (const root of pending) {
      if (root.dataset.scene === 'kinetic') {
        if (initial) void play(root, 0);
        else finish(root);
      } else if (!initial && visible(root)) finish(root);
      else observer?.observe(root);
    }
  };
  window.addEventListener('resize', clear, { signal });
  window.addEventListener(
    'pageshow',
    ({ persisted }) => {
      if (persisted) observePending();
    },
    { signal },
  );
  document.addEventListener(
    'visibilitychange',
    () => {
      if (!document.hidden) observePending();
    },
    { signal },
  );
  matchMedia(motionQuery).addEventListener('change', observePending, {
    signal,
  });
  if (historyTraversal && document.readyState !== 'complete') {
    // Scroll restoration can follow module execution on a non-cached history traversal.
    window.addEventListener(
      'pageshow',
      () => requestAnimationFrame(observePending),
      {
        once: true,
        signal,
      },
    );
  } else observePending();
}
