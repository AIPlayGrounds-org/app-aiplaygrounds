import { cubicBezier } from 'animejs/easings';

export function cssBezier(value: string) {
  const coordinates = /^cubic-bezier\(([^)]+)\)$/
    .exec(value)?.[1]
    .split(',')
    .map(Number);
  if (coordinates?.length !== 4 || !coordinates.every(Number.isFinite)) return;
  const [x1, y1, x2, y2] = coordinates;
  return cubicBezier(x1, y1, x2, y2);
}
