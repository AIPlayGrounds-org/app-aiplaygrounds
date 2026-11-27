// Order is significant: the first option is the default preview.
export const cardOptions = {
  surface: ['elevated', 'editorial', 'inherit'],
  density: ['md', 'sm', 'none'],
  edge: ['border', 'outline', 'none'],
  interaction: ['static', 'interactive', 'single-link'],
} as const;
