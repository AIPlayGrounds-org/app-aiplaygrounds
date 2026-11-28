/* global document, window */
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE ?? 'playwright',
);
const [directory, before, after] = process.argv.slice(2);
const scenes = {
  kinetic: ['/', '#I1'],
  assembly: ['/', '#I3 [data-scene]'],
  metrics: ['/formacion/', '#F5 [data-scene]'],
  narrative: ['/', '#I2'],
  organic: ['/formacion/', '#F6 [data-scene]'],
  convergence: ['/empresas/', '#EM6 [data-scene]'],
  landscape: ['/empresas/', '#EM2 [data-scene]'],
  signal: ['/empresas/', '#EM4 [data-scene]:last-child'],
  trace: ['/', '#I5 [data-scene]:last-child'],
};
const phases = [
  ['initial', 0],
  ['progress', 0.38],
  ['settle', 0.67],
  ['final', 1],
];
const results = [];
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    // Disable automatic mount; the original pattern runs directly with its manual control.
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    for (const [name, [path, selector]] of Object.entries(scenes)) {
      for (const [version, origin] of [
        ['stage', before],
        ['opt', after],
      ]) {
        await page.goto(origin + path);
        const root = page.locator(selector).first();
        const duration = await root.evaluate(async (element, name) => {
          await document.fonts.ready;
          const images = [...element.querySelectorAll('img')];
          for (const image of images) image.loading = 'eager';
          await Promise.allSettled(images.map((image) => image.decode()));
          if (name !== 'kinetic')
            window.scrollBy({
              top: element.getBoundingClientRect().top - 100,
              behavior: 'instant',
            });
          const path = '/src/motion/patterns.ts';
          const { patterns } = await import(path);
          const play = await patterns[name]();
          const comparison = (window.comparison = play(element, {
            manual: true,
          }));
          comparison.pause();
          return comparison.duration;
        }, name);
        const bounds = await root.boundingBox();
        const x = Math.max(0, Math.ceil(bounds.x));
        const y = Math.max(0, Math.ceil(bounds.y));
        const clip = {
          x,
          y,
          width: Math.min(width - x, Math.floor(bounds.width)),
          height: Math.min(900 - y, Math.floor(bounds.height), 680),
        };
        for (const [phase, fraction] of phases) {
          await page.evaluate((fraction) => {
            const { comparison } = window;
            if (fraction === 1) comparison.revert();
            else comparison.seek(comparison.duration * fraction);
          }, fraction);
          await page.screenshot({
            path: join(directory, `${width}-${name}-${version}-${phase}.png`),
            clip,
          });
        }
        results.push({ width, name, version, duration, bounds });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  join(directory, 'captures.json'),
  JSON.stringify(results, null, 2),
);
