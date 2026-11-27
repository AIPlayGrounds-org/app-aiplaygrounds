---
name: anime.js-best-practices
description: Implement or review animation, motion, SVG, scroll, stagger, timelines, and advanced interaction in the AI PlayGrounds Astro project using Anime.js v4.
---

# Anime.js v4 in AI PlayGrounds

Project adaptation of [anime.js Best Practices](https://github.com/davidosemwegie/animejs-best-practices/tree/47f4b7ea494a3c0bc54ba228b4008a5da6891458) (MIT; see `LICENSE`). The lock records the installer hash of upstream. This adaptation intentionally omits framework integrations, CDN recipes, copied reference documents and runnable examples.

1. Read `AGENTS.md`, `src/motion/` and the Motion section at `/design-system/#motion`. Use Impeccable to choose and review the visual intent.
2. Check whether CSS or Tailwind/daisyUI already handles the interaction. Keep hover, focus, active, disabled, borders, color, and simple icon/image feedback declarative. Prefer `waapi.animate()` for opacity and compositor-friendly transforms; choose `animate()` or `createTimeline()` when the effect requires JS values, SVG morphing, or sequencing. Use `onScroll()` for synchronized playback; use a single `IntersectionObserver` for one-shot visibility.
3. Import only the needed v4 subpaths (`animejs/waapi`, `animejs/timeline`, `animejs/svg`, `animejs/scope`, etc.). Astro `.astro` frontmatter runs on the server: wire animations in a processed `<script>`, dynamically load advanced modules, and scope targets to an element. Do not use v3 defaults (`anime({ targets })`, `easing`, `anime.timeline()`), React, Next.js, or a CDN.
4. Read CSS motion tokens with `motionTokens()`. Pass numeric milliseconds, not CSS strings. Prefer explicit start/end values for predictable composition. Prefer `translate`/`scale` and `opacity`; avoid continuous layout reads or writes. Measure the bundled bytes and the real interaction on mobile.
5. Use `allowMotion()` and `motionLifetime()`. Begin in an accessible final state so disabled JS, a failed import, reduced motion and keyboard focus cannot leave content hidden. Cancel/revert on interruption; for coordinated groups use `createScope({ root }).add(...)` and `scope.revert()`. Use `pageshow.persisted` only when an effect should replay from bfcache. Keep text splitting accessible with `splitText({ accessible: true })` and provide a keyboard alternative to drag.
6. Keep reusable presets in `src/motion/`, document them in the gallery, and verify focus, responsive behavior, reduced motion, and artifact isolation with Playwright and `npm run ci:check`.

References: [v4 documentation](https://animejs.com/documentation/), [WAAPI](https://animejs.com/documentation/web-animation-api/), [onScroll](https://animejs.com/documentation/events/onscroll/), [Scope](https://animejs.com/documentation/scope/).
