const finePointer = '(any-hover: hover) and (any-pointer: fine)';

export function bindTraceTriggers(
  root: HTMLElement,
  play: () => void,
  signal: AbortSignal,
) {
  root.addEventListener(
    'pointerenter',
    (event) => {
      if (event.pointerType !== 'touch' && matchMedia(finePointer).matches)
        play();
    },
    { signal, passive: true },
  );
  root.addEventListener(
    'focusin',
    (event) => {
      if (
        event.target instanceof Element &&
        event.target.matches(':focus-visible[href]')
      )
        play();
    },
    { signal },
  );
}

export function bindSceneInterruption(
  root: HTMLElement,
  finish: () => void,
  signal: AbortSignal,
) {
  root.addEventListener('focusin', finish, { signal });
  root.addEventListener('pointerdown', finish, { signal, passive: true });
  if (root.dataset.scene === 'convergence') {
    root.addEventListener('input', finish, { signal });
    root.addEventListener('change', finish, { signal });
  }
}
