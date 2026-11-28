import { allowMotion, motionLifetime } from './preferences';

const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const running = new Map<Element, () => void>();
let lifetimeVersion = 0;
const { signal } = motionLifetime(() => {
  lifetimeVersion++;
  for (const stop of running.values()) stop();
  running.clear();
});

for (const card of document.querySelectorAll<HTMLElement>(
  '[data-motion-draw="motif"]',
)) {
  if (card.closest('[data-motion-manual]')) continue;
  let hovered = false;
  let pending = false;
  let generation = 0;
  const update = async () => {
    if (!allowMotion() || !hovered) {
      generation++;
      pending = false;
      running.get(card)?.();
      running.delete(card);
      return;
    }
    if (pending || running.has(card)) return;
    pending = true;
    const request = ++generation;
    const version = lifetimeVersion;
    try {
      const { drawIllustration } = await import('./draw');
      if (
        request !== generation ||
        version !== lifetimeVersion ||
        !allowMotion() ||
        signal.aborted
      )
        return;
      const animation = drawIllustration(card);
      running.set(card, () => animation.revert());
    } catch {
      // The SVG is complete when its motion module is unavailable.
    } finally {
      if (request === generation) pending = false;
    }
  };
  card.addEventListener(
    'pointerenter',
    (event) => {
      hovered = event.pointerType !== 'touch' && finePointer.matches;
      void update();
    },
    { signal },
  );
  card.addEventListener(
    'pointerleave',
    () => {
      hovered = false;
      void update();
    },
    { signal },
  );
}
