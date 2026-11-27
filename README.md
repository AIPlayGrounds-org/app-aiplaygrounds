# AI PlayGrounds

Sitio estático en Astro, TypeScript strict, Tailwind CSS 4, daisyUI 5 y Lucide Astro. Cloudflare Workers sirve los assets públicos y los endpoints del sitio.

```sh
nvm use
npm ci
npm run dev
npm run ci:check
```

El catálogo interno está disponible en [`/design-system/`](http://localhost:4321/design-system/) durante `astro dev`. No forma parte del build público. Incluye tokens efectivos, ejemplos de componentes Astro, controles de preview y código copiable.

La sección [`Motion`](http://localhost:4321/design-system/#motion) documenta previews reales y patrones experimentales. Anime.js v4 ejecuta la animación avanzada desde `src/motion/`; el feedback sencillo sigue en CSS. Consulta la [guía de movimiento](docs/implementation/motion-system.md) para añadir patrones o actualizar la dependencia.

- [Reglas para agentes](AGENTS.md)
- [Sistema visual y tokens](DESIGN.md)
- [Arquitectura técnica](docs/implementation/technical-architecture.md)
- [Migración a daisyUI 5](docs/implementation/design-system-migration.md)
