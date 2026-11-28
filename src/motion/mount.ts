import { allowMotion, motionLifetime, motionQuery } from './preferences';
import { bindSceneInterruption, bindTraceTriggers } from './interactions';
import { patterns, type Pattern } from './patterns';
import { groupDelay, motionTokens } from './tokens';
import type { SequenceName, SequencePlayback } from './scene';

const roots = [
  ...document.querySelectorAll<HTMLElement>('[data-scene]'),
].filter((root) => !root.closest('[data-motion-manual]'));
const pending = new Set(roots);
const loading = new Set<HTMLElement>();
const active = new Map<HTMLElement, SequencePlayback>();
const traces = new Map<HTMLElement, SequencePlayback>();
const requests = new Map<HTMLElement, symbol>();
const modules = new Map<SequenceName, Promise<Pattern>>();
const ready = new Map<SequenceName, Pattern>();
let observer: IntersectionObserver | undefined;
let beforeFirstPlay = true;
const entryRatio = 0.2;
const load = (name: SequenceName) => {
  let job = modules.get(name);
  if (!job) {
    job = patterns[name]()
      .then((pattern) => {
        ready.set(name, pattern);
        return pattern;
      })
      .catch((error: unknown) => {
        modules.delete(name);
        throw error;
      });
    modules.set(name, job);
  }
  return job;
};
const historyTraversal = performance
  .getEntriesByType('navigation')
  .some((entry) => 'type' in entry && entry.type === 'back_forward');

const finish = (root: HTMLElement) => {
  pending.delete(root);
  loading.delete(root);
  active.get(root)?.revert();
  active.delete(root);
  if (!traces.has(root)) observer?.unobserve(root);
};
const stopTrace = (root: HTMLElement) => {
  traces.get(root)?.revert();
  traces.delete(root);
  if (!pending.has(root) && !active.has(root)) observer?.unobserve(root);
};
const clear = () => {
  for (const root of [...active.keys(), ...loading]) finish(root);
  for (const root of traces.keys()) stopTrace(root);
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
const play = async (
  root: HTMLElement,
  position: number,
  entered = performance.now(),
) => {
  if (!allowMotion() || !pending.delete(root)) return;
  if (root.matches(':focus-within') || !visible(root)) {
    finish(root);
    return;
  }
  loading.add(root);
  try {
    const name = root.dataset.scene as SequenceName;
    const delay = position ? groupDelay(root, position) : 0;
    const budget = motionTokens(root).ms(
      name === 'kinetic'
        ? '--motion-delay-opening-max'
        : '--motion-delay-entry-load-max',
    );
    const pattern = ready.get(name) ?? (await load(name));
    if (!loading.has(root) || !allowMotion() || !visible(root)) {
      finish(root);
      return;
    }
    if (performance.now() - entered > budget) {
      finish(root);
      return;
    }
    active.set(
      root,
      pattern(root, {
        delay,
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
  stopTrace(root);
  const request = Symbol();
  requests.set(root, request);
  try {
    // Signal Build and Active Trace share one import, even for early keyboard focus.
    const tracePattern = ready.get('trace') ?? (await load('trace'));
    if (requests.get(root) !== request || !allowMotion() || !visible(root))
      return;
    traces.set(root, tracePattern(root, { onComplete: () => stopTrace(root) }));
    observer?.observe(root);
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
        time,
      } of entries) {
        if (!(target instanceof HTMLElement)) continue;
        if (!isIntersecting) {
          if (loading.has(target) || active.has(target)) finish(target);
          if (traces.has(target)) stopTrace(target);
          continue;
        }
        if (!pending.has(target)) continue;
        if (intersectionRatio < entryRatio) {
          // Load while the composition is still at the viewport edge; never hide it while waiting.
          void load(target.dataset.scene as SequenceName).catch(() => {});
          continue;
        }
        if (boundingClientRect.top < 0) {
          finish(target);
          continue;
        }
        const group = target.closest('[data-scene-group]');
        const position = group ? (batch.get(group) ?? 0) : 0;
        if (group) batch.set(group, position + 1);
        void play(target, position, time);
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
