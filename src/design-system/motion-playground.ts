import { allowMotion, motionLifetime } from '../motion/preferences';
import { motionTokens } from '../motion/tokens';
import { groupDelay } from '../motion/tokens';
import {
  bindSceneInterruption,
  bindTraceTriggers,
} from '../motion/interactions';
import { patterns } from '../motion/patterns';
import { approvedMotion } from './approved-motion';
import type { Playback, Settings } from './motion-experiments';

const playground = document.querySelector<HTMLElement>(
  '[data-motion-playground]',
)!;
const reduced = playground.querySelector<HTMLInputElement>(
  '[data-motion-reduce]',
)!;
const demos = [
  ...playground.querySelectorAll<HTMLElement>('[data-motion-demo]'),
];
const resets = new Map<Element, () => void>();
const { signal } = motionLifetime(() => {
  for (const reset of resets.values()) reset();
});
const offscreen = new IntersectionObserver((entries) => {
  for (const { target, isIntersecting } of entries)
    if (!isIntersecting) resets.get(target)?.();
});
window.addEventListener('pagehide', (event) => {
  if (!event.persisted) offscreen.disconnect();
});

reduced.addEventListener(
  'change',
  () => {
    playground.toggleAttribute('data-simulate-reduce', reduced.checked);
    if (reduced.checked) for (const reset of resets.values()) reset();
  },
  { signal },
);

for (const demo of demos) {
  const stage = demo.querySelector<HTMLElement>('[data-motion-stage]')!;
  const status = demo.querySelector<HTMLElement>('[data-motion-status]');
  if (!status) continue;
  const pattern = demo.dataset.motionDemo!;
  const approved = approvedMotion.find(({ id }) => id === pattern);
  const field = (name: string) =>
    demo.querySelector<HTMLInputElement>(`[data-motion-field="${name}"]`);
  const tokens = motionTokens(stage);
  const read = (name: string, fallback: number) => {
    const input = field(name);
    if (!input?.value) return fallback;
    return Math.min(+input.max, Math.max(+input.min, input.valueAsNumber || 0));
  };
  let current: Playback | undefined;
  let generation = 0;
  let paused = false;
  const showMode = () => {
    const mode = field('mode')?.value;
    for (const visual of stage.querySelectorAll(
      '[data-svg-mode], [data-sequence-mode]',
    )) {
      visual.toggleAttribute(
        'hidden',
        (visual.getAttribute('data-svg-mode') ??
          visual.getAttribute('data-sequence-mode')) !== mode,
      );
    }
    const unavailable: Record<string, string[]> = {
      'entrance-exit':
        mode === 'card' || mode === 'group'
          ? []
          : mode === 'fade'
            ? ['distance', 'scale']
            : ['scale'],
      scroll:
        mode === 'reveal' || mode === 'progress'
          ? ['duration', 'distance']
          : ['duration'],
      sequences: mode === 'hero' ? ['stagger', 'delay', 'loop'] : [],
      svg: mode === 'draw' ? [] : ['stagger'],
      'physics-interactions':
        mode === 'drag' ? ['duration', 'progress'] : ['duration'],
    };
    for (const control of demo.querySelectorAll<HTMLElement>(
      '[data-motion-field]',
    )) {
      control
        .closest('label')
        ?.toggleAttribute(
          'hidden',
          unavailable[pattern]?.includes(control.dataset.motionField ?? '') ??
            false,
        );
    }
  };
  const reset = () => {
    generation++;
    current?.revert();
    current = undefined;
    paused = false;
    status.textContent = '';
    field('progress')?.setAttribute('value', '0');
    if (field('progress')) field('progress')!.value = '0';
  };
  const play = async (trigger?: HTMLElement) => {
    if (reduced.checked || !allowMotion()) {
      status.textContent = 'Movimiento reducido: se muestra el estado final.';
      return;
    }
    if (current && paused && !trigger) {
      current.resume();
      paused = false;
      status.textContent = 'En reproducción.';
      return;
    }
    reset();
    const request = generation;
    const valid = () =>
      request === generation &&
      !signal.aborted &&
      !reduced.checked &&
      allowMotion();
    const mode = field('mode')?.value ?? '';
    const settings: Settings = {
      mode,
      duration:
        read('duration', tokens.ms('--duration-entrance')) / read('speed', 1),
      stagger: read(
        'stagger',
        tokens.ms(
          pattern === 'sequences'
            ? '--motion-stagger-group'
            : '--motion-stagger-contours',
        ),
      ),
      delay: read('delay', 0),
      distance: read('distance', tokens.number('--motion-distance-rise')),
      ease: field('ease')?.value || tokens.value('--editorial-entrance-ease'),
      loop: field('loop')?.checked ?? false,
    };
    try {
      if (approved) {
        const run = await patterns[approved.id]();
        if (!valid()) return;
        const roots = trigger
          ? [trigger]
          : [...stage.querySelectorAll<HTMLElement>('[data-scene]')];
        const progress = field('progress');
        const effects = roots.map((root, index) =>
          run(root, {
            manual: true,
            ...(field('duration')?.value && { duration: read('duration', 0) }),
            ...(field('stagger')?.value && { stagger: settings.stagger }),
            speed: read('speed', 1),
            intensity: read('intensity', 1),
            ease: field('ease')?.value,
            delay: field('stagger')?.value
              ? Math.min(
                  index * settings.stagger,
                  tokens.ms('--motion-delay-group-max'),
                )
              : groupDelay(root, index),
            ...(index === roots.length - 1 && {
              onProgress: (value: number) => {
                if (progress && !paused)
                  progress.value = String(Math.round(value * 100));
              },
            }),
          }),
        );
        current = {
          duration: Math.max(...effects.map((effect) => effect.duration)),
          pause: () => effects.forEach((effect) => effect.pause()),
          resume: () => effects.forEach((effect) => effect.resume()),
          seek: (time) => effects.forEach((effect) => effect.seek(time)),
          revert: () => effects.forEach((effect) => effect.revert()),
        };
      } else if (
        pattern === 'entrance-exit' ||
        (pattern === 'scroll' && mode === 'reveal')
      ) {
        const { groupDelay, observeReveals, reveal } =
          await import('../motion/reveal');
        if (!valid()) return;
        if (pattern === 'scroll') {
          const container = stage.querySelector<HTMLElement>(
            '[data-motion-scroll]',
          )!;
          const target = stage.querySelector<HTMLElement>(
            '[data-motion-scroll-target]',
          )!;
          target.setAttribute('data-reveal', 'card');
          container.scrollTop = 0;
          const clean = observeReveals(container, container);
          current = {
            duration: 0,
            pause: reset,
            resume: () => {},
            seek: () => {},
            revert: () => {
              clean?.();
              target.removeAttribute('data-reveal');
            },
          };
        } else {
          const preset =
            mode === 'group'
              ? 'card'
              : mode === 'card' || mode === 'fade' || mode === 'ink'
                ? mode
                : 'rise';
          const items =
            stage.querySelectorAll<HTMLElement>('[data-motion-item]');
          const effects = [...items].map((node, index) =>
            reveal(node, preset, {
              ...(field('duration')?.value && { duration: settings.duration }),
              ...(field('ease')?.value && { ease: settings.ease }),
              delay:
                settings.delay +
                (mode === 'group' && !field('stagger')?.value
                  ? groupDelay(node, index)
                  : index * read('stagger', 0)),
              intensity: read('intensity', 1),
              ...(field('distance')?.value && { distance: settings.distance }),
              scale: read('scale', tokens.number('--motion-scale-card')),
              loop: settings.loop,
              reversed: mode === 'exit',
              axis: mode === 'slide' ? 'x' : 'y',
              persist: true,
            }),
          );
          current = {
            duration: Math.max(0, ...effects.map((effect) => effect.duration)),
            pause: () => effects.forEach((effect) => effect.pause()),
            resume: () => effects.forEach((effect) => effect.resume()),
            seek: (time) =>
              effects.forEach((effect) => effect.seek(time, true)),
            revert: () => effects.forEach((effect) => effect.revert()),
          };
        }
      } else if (pattern === 'sequences' && mode === 'hero') {
        const { immersiveEntrance } = await import('../motion/kinetic');
        if (!valid()) return;
        current = immersiveEntrance(
          stage.querySelector<HTMLElement>('#motion-hero-sample')!,
          {
            manual: true,
            duration: field('duration')?.value ? settings.duration : undefined,
            ease: field('ease')?.value,
          },
        );
      } else if (pattern === 'svg' && mode === 'layers') {
        const { compactEntrance } = await import('../motion/hero');
        if (!valid()) return;
        current = compactEntrance(
          stage.querySelector('svg[data-compact-motion]')!,
          {
            manual: true,
            speed: read('speed', 1),
            ease: field('ease')?.value,
          },
        );
      } else if (pattern === 'svg' && mode === 'draw') {
        const { drawIllustration } = await import('../motion/draw');
        if (!valid()) return;
        current = drawIllustration(stage.querySelector('[data-motion-draw]')!, {
          manual: true,
          duration: tokens.ms('--duration-draw') / read('speed', 1),
          stagger: read('stagger', tokens.ms('--motion-stagger-draw')),
          ease: field('ease')?.value,
        });
      } else {
        const { experiment } = await import('./motion-experiments');
        if (!valid()) return;
        current = experiment(stage, pattern, settings);
      }
      status.textContent =
        pattern === 'scroll'
          ? 'Desplázate dentro del ejemplo.'
          : 'En reproducción.';
    } catch (error) {
      if (!valid()) return;
      reset();
      status.textContent = 'No se pudo iniciar el ejemplo.';
      console.error(error);
    }
  };
  demo.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const action = event.target.closest<HTMLElement>('[data-motion-action]')
        ?.dataset.motionAction;
      if (action === 'play') void play();
      if (action === 'reset') reset();
      if (action === 'pause' && current) {
        if (
          pattern === 'scroll' ||
          (pattern === 'physics-interactions' &&
            field('mode')?.value === 'drag')
        )
          reset();
        else {
          current.pause();
          paused = true;
        }
        status.textContent = 'En pausa.';
      }
    },
    { signal },
  );
  demo.addEventListener(
    'change',
    (event) => {
      if (event.target === field('progress')) return;
      reset();
      showMode();
    },
    { signal },
  );
  field('progress')?.addEventListener(
    'input',
    (event) => {
      if (!current || !(event.target instanceof HTMLInputElement)) return;
      current.pause();
      paused = true;
      current.seek((current.duration * event.target.valueAsNumber) / 100);
      status.textContent = 'En pausa.';
    },
    { signal },
  );
  for (const root of stage.querySelectorAll<HTMLElement>('[data-scene]')) {
    bindSceneInterruption(root, reset, signal);
    if (pattern === 'trace')
      bindTraceTriggers(root, () => void play(root), signal);
  }
  resets.set(demo, reset);
  offscreen.observe(demo);
  showMode();
}
