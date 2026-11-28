import { waapi } from 'animejs/waapi';
import { cssBezier } from './easing';
import {
  masks,
  scene,
  staticPlayback,
  type SequenceName,
  type SequenceOptions,
  type SequencePlayback,
} from './scene';

type Target = HTMLElement | SVGElement;
type Tracks = Record<string, string[] | number[]>;
type Offset = (index: number) => number;
const translationCurves = new Map<string, string>();

/** Independent tracks run on the document timeline, without a JS tick in production. */
export function nativeSequence(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
  build: (run: ReturnType<typeof nativeTracks>) => void,
): SequencePlayback {
  const run = nativeTracks(root, name, options);
  if (run.at(1) === 0) return staticPlayback(run.at(1), options);
  try {
    build(run);
    return run.start();
  } catch (error) {
    run.revert();
    throw error;
  }
}

function nativeTracks(
  root: Element,
  name: SequenceName,
  options: SequenceOptions,
) {
  const run = scene(root, name, options);
  const animations: Animation[] = [];
  const ease = options.ease || run.tokens.value('--editorial-entrance-ease');
  const travelEase = () => {
    const cached = translationCurves.get(ease);
    if (cached) return cached;
    const curve = cssBezier(ease);
    if (!curve) return ease;
    // The original JS tracks interpolated both factors of calc(distance * intensity).
    const result = waapi.convertEase((time) => 1 - (1 - curve(time)) ** 2);
    translationCurves.set(ease, result);
    return result;
  };
  const speed = options.speed ?? 1;
  let frame = 0;
  let duration = 0;
  let reverted = false;
  const timing = (start: number, length: number, shift: number) => {
    const delay = run.at(start) + shift + (options.delay ?? 0);
    const activeDuration = run.at(length);
    duration = Math.max(duration, delay + activeDuration);
    return { delay, duration: activeDuration };
  };
  const add = (
    targets: Target[],
    tracks: Tracks,
    start: number,
    length: number,
    offset?: Offset,
    curve = ease,
  ) => {
    if (!targets.length) return;
    const times = targets.map((_, index) =>
      timing(start, length, offset?.(index) ?? 0),
    );
    // Properties sharing a clock can use a single browser effect per element.
    if (Object.keys(tracks).length > 1) {
      for (const [index, target] of targets.entries()) {
        const animation = target.animate(tracks, {
          ...times[index],
          fill: 'both',
          easing: curve,
        });
        animation.pause();
        animations.push(animation);
      }
      return;
    }
    const effect = waapi.animate(targets, {
      ...tracks,
      duration: run.at(length),
      delay: (_, index) => times[index].delay,
      ease: curve,
      autoplay: false,
      persist: true,
    });
    animations.push(...effect.animations);
  };
  // Explicit offsets/easing preserve the original multi-phase transform in one track.
  const keyframes = (
    targets: Target[],
    frames: Keyframe[],
    start: number,
    length: number,
    offset?: Offset,
    fill: FillMode = 'both',
  ) => {
    for (const [index, target] of targets.entries()) {
      const animation = target.animate(frames, {
        ...timing(start, length, offset?.(index) ?? 0),
        fill,
      });
      animation.pause();
      animations.push(animation);
    }
  };
  const reveal = (
    targets: Target[],
    edge: keyof typeof masks,
    start: number,
    length: number,
    offset?: Offset,
  ) =>
    add(
      targets,
      { clipPath: [`inset(${masks[edge]})`, 'inset(0% 0% 0% 0%)'] },
      start,
      length,
      offset,
    );
  const rules = (targets: HTMLElement[], start: number, length: number) => {
    if (typeof CSS.registerProperty !== 'function') return;
    for (const rule of targets) {
      rule.setAttribute('data-motion-rule-active', '');
      run.disposal.push(() => rule.removeAttribute('data-motion-rule-active'));
    }
    add(
      targets,
      { '--motion-rule-progress': ['0%', '100%'] },
      start,
      length,
      run.spread('--motion-stagger-group', 0.12),
    );
  };
  const revert = () => {
    if (reverted) return;
    reverted = true;
    cancelAnimationFrame(frame);
    for (const animation of animations) animation.cancel();
    run.clean();
  };
  const start = (): SequencePlayback => {
    const control = animations.reduce<Animation | undefined>(
      (last, current) =>
        !last ||
        Number(current.effect?.getComputedTiming().endTime) >=
          Number(last.effect?.getComputedTiming().endTime)
          ? current
          : last,
      undefined,
    );
    let notified = false;
    const complete = () => {
      if (notified || reverted) return;
      notified = true;
      if (!options.manual) revert();
      options.onComplete?.();
    };
    const progress = () => {
      options.onProgress?.(
        Math.min(1, Number(control?.currentTime) / duration),
      );
      if (control?.playState === 'running' || control?.pending)
        frame = requestAnimationFrame(progress);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      for (const animation of animations) animation.pause();
    };
    const resume = () => {
      for (const animation of animations) animation.play();
      if (options.onProgress) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(progress);
      }
    };
    if (control) {
      for (const animation of animations) animation.playbackRate = speed;
      resume();
      // Some effects share a phase but finish in different compositor tasks.
      // Settle the whole scene even if a track is canceled by the browser.
      void Promise.all(animations.map((animation) => animation.finished)).then(
        complete,
        complete,
      );
    } else queueMicrotask(complete);
    return {
      duration,
      pause,
      resume,
      seek: (time) => {
        for (const animation of animations) animation.currentTime = time;
      },
      revert,
    };
  };
  return {
    ...run,
    add,
    keyframes,
    reveal,
    rules,
    ease,
    travelEase,
    start,
    revert,
  };
}
