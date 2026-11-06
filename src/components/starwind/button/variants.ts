import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex items-center justify-center gap-1.5 rounded-sm font-medium text-center',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'transition-colors focus-visible:outline-3 focus-visible:outline-offset-4',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    'aria-invalid:border-error aria-invalid:focus-visible:outline-error',
  ],
  variants: {
    variant: {
      default:
        'bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-outline',
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-outline',
      secondary:
        'border border-input bg-secondary text-secondary-foreground hover:bg-background focus-visible:outline-outline',
      outline:
        'border border-input bg-background text-foreground hover:bg-muted focus-visible:outline-outline',
      ghost:
        'hover:bg-muted hover:text-foreground focus-visible:outline-outline',
      info: 'bg-info text-info-foreground hover:bg-info/90 focus-visible:outline-outline',
      success:
        'bg-success text-success-foreground hover:bg-success/90 focus-visible:outline-outline',
      warning:
        'bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:outline-outline',
      error:
        'bg-error text-error-foreground hover:bg-error/90 focus-visible:outline-outline',
    },
    size: {
      sm: "h-9 px-4 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-11 px-5 text-base has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-4.5",
      lg: "h-12 px-8 text-lg has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
      'icon-sm': "size-9 [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-11 [&_svg:not([class*='size-'])]:size-4.5",
      'icon-lg': "size-12 [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
