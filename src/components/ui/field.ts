export const fieldAppearances = ['default', 'editorial', 'inline'] as const;
export const textareaAppearances = [
  'default',
  'editorial',
] as const satisfies readonly (typeof fieldAppearances)[number][];
export const fieldDensities = ['comfortable', 'compact'] as const;

export type FieldAppearance = (typeof fieldAppearances)[number];
export type TextareaAppearance = (typeof textareaAppearances)[number];
export type FieldDensity = (typeof fieldDensities)[number];
