import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    {
      name: 'internal-design-system',
      hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
          if (command === 'dev') {
            injectRoute({
              pattern: '/design-system',
              entrypoint: new URL(
                './src/design-system/Gallery.astro',
                import.meta.url,
              ),
            });
          }
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    // Lazy demos use additional ESM subpaths; avoid dev-only re-optimization
    // invalidating earlier imports while a preview is open.
    optimizeDeps: { exclude: ['animejs'] },
  },
});
