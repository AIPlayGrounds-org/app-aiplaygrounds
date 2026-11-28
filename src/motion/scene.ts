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
export interface SequencePlayback {
  duration: number;
  pause(): void;
  resume(): void;
  seek(time: number): void;
  revert(): void;
}

export function staticPlayback(
  duration: number,
  options: SequenceOptions,
): SequencePlayback {
  const noop = () => {};
  if (options.onComplete) queueMicrotask(options.onComplete);
  return { duration, pause: noop, resume: noop, seek: noop, revert: noop };
}

export const masks = {
  left: '0% 100% 0% 0%',
  right: '0% 0% 0% 100%',
  top: '0% 0% 100% 0%',
  bottom: '100% 0% 0% 0%',
  center: '0% 50% 0% 50%',
};

export function scene(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
) {
  const tokens = motionTokens(root);
  const duration = options.duration ?? tokens.ms(sequenceDurations[name]);
  const at = (fraction: number) => duration * fraction;
  const intensity = options.intensity ?? 1;
  const disposal: (() => void)[] = [];
  const all = <T extends Element = HTMLElement>(selector: string) => [
    ...root.querySelectorAll<T>(selector),
  ];
  const scale = (token: `--motion-scale-${string}`) =>
    1 + (tokens.number(token) - 1) * intensity;
  const distance = (token: `--motion-${string}`, direction = 1) =>
    `calc(${tokens.length(token)} * ${direction * intensity})`;
  const spread = (token: `--motion-stagger-${string}`, cap: number) => {
    const interval = options.stagger ?? tokens.ms(token);
    return (index: number) => Math.min(index * interval, at(cap));
  };
  const clean = () => {
    while (disposal.length) disposal.pop()?.();
  };
  return {
    tokens,
    at,
    all,
    intensity,
    disposal,
    scale,
    distance,
    spread,
    clean,
  };
}
