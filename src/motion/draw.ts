import { waapi } from 'animejs/waapi';
import { motionTokens } from './tokens';

/** Draw normalized paths without measuring painted lengths or adding SVG wrappers. */
export function drawIllustration(
  root: Element,
  options: {
    duration?: number;
    stagger?: number;
    manual?: boolean;
    ease?: string;
  } = {},
) {
  const nodes = root.querySelectorAll<SVGElement>('.motif path');
  const tokens = motionTokens(root);
  return waapi.animate(nodes, {
    strokeDasharray: ['1 1', '1 1'],
    strokeDashoffset: [1, 0],
    duration: options.duration ?? tokens.ms('--duration-draw'),
    ease: options.ease || tokens.value('--motion-ease-draw'),
    delay: (node) => {
      const index = node.parentElement
        ? [...node.parentElement.children].indexOf(node)
        : 0;
      return (
        Math.min(index, 3) *
        (options.stagger ?? tokens.ms('--motion-stagger-draw'))
      );
    },
    persist: options.manual ?? false,
    onComplete: (effect) => effect.revert(),
  });
}
