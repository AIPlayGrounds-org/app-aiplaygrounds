export const motionQuery = '(prefers-reduced-motion: no-preference)';

export function allowMotion() {
  return (
    matchMedia(motionQuery).matches &&
    typeof Element.prototype.animate === 'function' &&
    !document.hidden
  );
}

/** Release in-flight effects when their document or motion preference changes. */
export function motionLifetime(clean: () => void) {
  const controller = new AbortController();
  const { signal } = controller;
  const media = matchMedia(motionQuery);
  media.addEventListener(
    'change',
    () => {
      if (!media.matches) clean();
    },
    { signal },
  );
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) clean();
    },
    { signal },
  );
  window.addEventListener(
    'pagehide',
    (event) => {
      clean();
      if (!event.persisted) controller.abort();
    },
    { signal },
  );
  return controller;
}
