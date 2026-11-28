type MotionToken =
  `--duration-${string}` | `--motion-${string}` | `--editorial-${string}`;

export function motionTokens(element: Element) {
  const styles = getComputedStyle(element);
  const cache = new Map<MotionToken, string>();
  const optional = (name: MotionToken) => {
    const found = cache.get(name) ?? styles.getPropertyValue(name).trim();
    cache.set(name, found);
    return found;
  };
  const invalid = (
    name: MotionToken,
    expected: string,
    actual: string,
  ): never => {
    const error = new TypeError(
      `Motion token ${name}: expected ${expected}, found ${actual || '(missing)'}`,
    );
    if (import.meta.env?.DEV) console.warn(error.message, element);
    throw error;
  };
  const value = (name: MotionToken) =>
    optional(name) || invalid(name, 'a CSS value', '');
  const numeric = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?$/i;
  const number = (name: MotionToken) => {
    const raw = value(name);
    const number = Number(raw);
    return numeric.test(raw) && Number.isFinite(number)
      ? number
      : invalid(name, 'a unitless number', raw);
  };
  const ms = (name: MotionToken) => {
    const time = value(name);
    const unit = time.endsWith('ms') ? 'ms' : time.endsWith('s') ? 's' : '';
    const raw = time.slice(0, -unit.length);
    const parsed = Number(raw) * (unit === 's' ? 1000 : 1);
    return unit && numeric.test(raw) && Number.isFinite(parsed) && parsed >= 0
      ? parsed
      : invalid(name, 'a nonnegative duration in ms or s', time);
  };
  const length = (name: MotionToken) => {
    const raw = value(name);
    return raw === '0' || CSS.supports('width', `calc(${raw} + 0px)`)
      ? raw
      : invalid(name, 'a CSS length or percentage', raw);
  };
  return { value, optional, number, ms, length };
}

export function groupDelay(target: Element, position: number) {
  const tokens = motionTokens(target);
  return Math.min(
    position * tokens.ms('--motion-stagger-group'),
    tokens.ms('--motion-delay-group-max'),
  );
}
