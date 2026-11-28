import { createTimeline } from 'animejs/timeline';
import { stagger } from 'animejs/utils';
import { cubicBezier } from 'animejs/easings';
import { motionTokens } from './tokens';

export const sequenceDurations = {
  kinetic: '--duration-hero',
  assembly: '--duration-assembly',
  metrics: '--duration-metrics',
  narrative: '--duration-narrative',
  organic: '--duration-organic',
  convergence: '--duration-convergence',
  landscape: '--duration-landscape',
  signal: '--duration-signal-build',
  trace: '--duration-active-trace',
} as const;

export type SequenceName = keyof typeof sequenceDurations;
export interface SequenceOptions {
  manual?: boolean;
  duration?: number;
  speed?: number;
  ease?: string;
  stagger?: number;
  intensity?: number;
  delay?: number;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

function timelineEase(value: string) {
  // The JS engine expects a function for CSS cubic Bézier tokens.
  const coordinates = /^cubic-bezier\(([^)]+)\)$/
    .exec(value)?.[1]
    .split(',')
    .map(Number);
  if (coordinates?.length === 4 && coordinates.every(Number.isFinite)) {
    const [x1, y1, x2, y2] = coordinates;
    return cubicBezier(x1, y1, x2, y2);
  }
  if (value === 'ease-out') return 'outQuad';
  if (value === 'ease-in-out') return 'inOutQuad';
  return value;
}

export function sequence(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
) {
  const tokens = motionTokens(root);
  const duration = options.duration ?? tokens.ms(sequenceDurations[name]);
  const ease = (token: `--editorial-${string}` | `--motion-${string}`) =>
    timelineEase(options.ease || tokens.value(token));
  const intensity = options.intensity ?? 1;
  const disposal: (() => void)[] = [];
  const at = (fraction: number) => duration * fraction;
  const step = (token: `--motion-stagger-${string}`) =>
    options.stagger ?? tokens.ms(token);
  const spread = (token: `--motion-stagger-${string}`, fraction: number) =>
    stagger(step(token), {
      modifier: (value) => Math.min(value, at(fraction)),
    });
  const timeline = createTimeline({
    autoplay: false,
    delay: options.delay,
    playbackRate: options.speed ?? 1,
    defaults: { ease: ease('--editorial-entrance-ease') },
    onUpdate: options.onProgress
      ? (animation) => options.onProgress?.(animation.progress)
      : undefined,
  });
  const all = <T extends Element = HTMLElement>(selector: string) => [
    ...root.querySelectorAll<T>(selector),
  ];
  const scale = (token: `--motion-scale-${string}`) =>
    1 + (tokens.number(token) - 1) * intensity;
  const distance = (token: `--motion-${string}`, direction = 1) =>
    `calc(${tokens.value(token)} * ${direction * intensity})`;
  const prepare = (
    targets: (HTMLElement | SVGElement)[],
    property: string,
    value: string,
  ) => {
    for (const { style } of targets) {
      const previous = style.getPropertyValue(property);
      style.setProperty(property, value);
      disposal.push(() => {
        if (previous) style.setProperty(property, previous);
        else style.removeProperty(property);
      });
    }
  };
  const reveal = (
    targets: (HTMLElement | SVGElement)[],
    edge: 'left' | 'right' | 'top' | 'bottom' | 'center',
    start: number,
    length: number,
    delay?: ReturnType<typeof spread>,
  ) => {
    if (!targets.length) return;
    const insets = {
      left: '0% 100% 0% 0%',
      right: '0% 0% 0% 100%',
      top: '0% 0% 100% 0%',
      bottom: '100% 0% 0% 0%',
      center: '0% 50% 0% 50%',
    };
    const from = `inset(${insets[edge]})`;
    prepare(targets, 'clip-path', from);
    timeline.add(
      targets,
      {
        clipPath: [from, 'inset(0% 0% 0% 0%)'],
        duration: at(length),
        ...(delay && { delay }),
      },
      at(start),
    );
  };
  const rules = (targets: HTMLElement[], start: number, length: number) => {
    if (!targets.length) return;
    prepare(targets, '--motion-rule-progress', '0%');
    timeline.add(
      targets,
      {
        '--motion-rule-progress': ['0%', '100%'],
        duration: at(length),
        delay: spread('--motion-stagger-group', 0.12),
      },
      at(start),
    );
  };
  const start = () => {
    let reverted = false;
    const revert = () => {
      if (reverted) return;
      reverted = true;
      timeline.revert();
      for (const dispose of disposal.reverse()) dispose();
    };
    timeline.onComplete = () => {
      if (!options.manual) revert();
      options.onComplete?.();
    };
    timeline.play();
    return {
      duration: timeline.duration + (options.delay ?? 0),
      pause: () => timeline.pause(),
      resume: () => timeline.resume(),
      seek: (time: number) =>
        timeline.seek(Math.max(0, time - (options.delay ?? 0)), true),
      revert,
    };
  };
  return {
    timeline,
    at,
    all,
    scale,
    distance,
    reveal,
    prepare,
    rules,
    spread,
    tokens,
    ease,
    intensity,
    disposal,
    start,
  };
}

export type Sequence = ReturnType<typeof sequence>;
export type SequencePlayback = ReturnType<Sequence['start']>;
