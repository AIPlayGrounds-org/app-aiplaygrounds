import { waapi } from 'animejs/waapi';
import { createScope } from 'animejs/scope';
import { allowMotion, motionLifetime } from './preferences';
import { motionTokens } from './tokens';

function scene(
  scope: ReturnType<typeof createScope>,
  effects: ReturnType<typeof waapi.animate>[],
) {
  return {
    duration: Math.max(0, ...effects.map(({ duration }) => duration)),
    pause: () => effects.forEach((effect) => effect.pause()),
    resume: () => effects.forEach((effect) => effect.resume()),
    seek: (time: number) =>
      effects.forEach((effect) =>
        effect.seek(Math.min(time, effect.duration), true),
      ),
    revert: () => scope.revert(),
  };
}
export function compactEntrance(
  root: SVGSVGElement,
  overrides: { speed?: number; ease?: string; manual?: boolean } = {},
) {
  const tokens = motionTokens(root);
  const scope = createScope({ root });
  const speed = overrides.speed ?? 1;
  const effects: ReturnType<typeof waapi.animate>[] = [];
  const group = (
    selector: string,
    duration: number,
    delay: number,
    step: number,
    property: Record<string, (string | number)[]>,
    ease = tokens.value('--motion-ease-standard'),
  ) => {
    const nodes = root.querySelectorAll<SVGElement>(selector);
    if (!nodes.length) return;
    effects.push(
      waapi.animate(nodes, {
        ...property,
        duration: duration / speed,
        delay: (_, index) => (delay + index * step) / speed,
        ease: overrides.ease || ease,
        persist: overrides.manual ?? false,
        onComplete: (effect) => effect.revert(),
      }),
    );
  };
  scope.add(() => {
    group(
      '.land',
      tokens.ms('--duration-land'),
      0,
      tokens.ms('--motion-stagger-land'),
      {
        opacity: [0, 1],
        transform: [
          `translateY(${tokens.value('--motion-distance-land')}) scaleY(${tokens.value('--motion-scale-land')})`,
          'translateY(0px) scaleY(1)',
        ],
      },
      tokens.value('--editorial-entrance-ease'),
    );
    const draw = { strokeDasharray: ['1 1', '1 1'], strokeDashoffset: [1, 0] };
    const appear = { opacity: [0, 1] };
    group(
      '.contours path',
      tokens.ms('--duration-contours'),
      tokens.ms('--motion-delay-contours'),
      tokens.ms('--motion-stagger-contours'),
      draw,
    );
    group(
      '.marks path',
      tokens.ms('--duration-marks'),
      tokens.ms('--motion-delay-marks'),
      tokens.ms('--motion-stagger-marks'),
      draw,
    );
    group(
      '.grid',
      tokens.ms('--duration-layer'),
      tokens.ms('--motion-delay-grid'),
      0,
      appear,
    );
    group(
      '.marks :is(circle, rect)',
      tokens.ms('--duration-points'),
      tokens.ms('--motion-delay-points'),
      tokens.ms('--motion-stagger-points'),
      appear,
    );
    group(
      '.dot-row',
      tokens.ms('--duration-layer'),
      tokens.ms('--motion-delay-dots'),
      tokens.ms('--motion-stagger-dots'),
      appear,
    );
  });
  return scene(scope, effects);
}

export function mountCompactArt(root: ParentNode) {
  const arts = root.querySelectorAll<SVGSVGElement>('[data-compact-motion]');
  let scenes: ReturnType<typeof compactEntrance>[] = [];
  const clean = () => {
    for (const scene of scenes) scene.revert();
    scenes = [];
  };
  const { signal } = motionLifetime(clean);
  const play = () => {
    clean();
    if (allowMotion()) scenes = [...arts].map((art) => compactEntrance(art));
  };
  window.addEventListener(
    'pageshow',
    ({ persisted }) => {
      if (persisted) play();
    },
    { signal },
  );
  play();
}
