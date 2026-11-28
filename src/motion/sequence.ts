import { createTimeline } from 'animejs/timeline';
import { cssBezier } from './easing';
import {
  masks,
  scene,
  staticPlayback,
  type SequenceName,
  type SequenceOptions,
} from './scene';

function timelineEase(value: string) {
  // The JS engine expects a function for CSS cubic Bézier tokens.
  const curve = cssBezier(value);
  if (curve) return curve;
  if (value === 'ease-out') return 'outQuad';
  if (value === 'ease-in-out') return 'inOutQuad';
  return value;
}

export function sequence(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
  build: (run: ReturnType<typeof timelineTracks>) => void,
) {
  const run = timelineTracks(root, name, options);
  if (run.at(1) === 0) return staticPlayback(run.at(1), options);
  try {
    build(run);
    return run.start();
  } catch (error) {
    run.revert();
    throw error;
  }
}

function timelineTracks(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
) {
  const run = scene(root, name, options);
  const { tokens, at, disposal } = run;
  const ease = (token: `--editorial-${string}` | `--motion-${string}`) =>
    timelineEase(options.ease || tokens.value(token));
  const timeline = createTimeline({
    autoplay: false,
    delay: options.delay,
    playbackRate: options.speed ?? 1,
    defaults: { ease: ease('--editorial-entrance-ease') },
    onUpdate: options.onProgress
      ? (animation) => options.onProgress?.(animation.progress)
      : undefined,
  });
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
    edge: keyof typeof masks,
    start: number,
    length: number,
  ) => {
    if (!targets.length) return;
    const from = `inset(${masks[edge]})`;
    prepare(targets, 'clip-path', from);
    timeline.add(
      targets,
      {
        clipPath: [from, 'inset(0% 0% 0% 0%)'],
        duration: at(length),
      },
      at(start),
    );
  };
  let reverted = false;
  const revert = () => {
    if (reverted) return;
    reverted = true;
    try {
      timeline.revert();
    } finally {
      run.clean();
    }
  };
  const start = () => {
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
    ...run,
    timeline,
    reveal,
    prepare,
    start,
    revert,
  };
}
