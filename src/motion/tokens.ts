type MotionToken =
  `--duration-${string}` | `--motion-${string}` | `--editorial-${string}`;

export function motionTokens(element: Element) {
  const styles = getComputedStyle(element);
  const value = (name: MotionToken) => styles.getPropertyValue(name).trim();
  const number = (name: MotionToken) => Number.parseFloat(value(name)) || 0;
  const ms = (name: MotionToken) => {
    const time = value(name);
    return (
      (Number.parseFloat(time) || 0) *
      (time.endsWith('s') && !time.endsWith('ms') ? 1000 : 1)
    );
  };
  return { value, number, ms };
}
