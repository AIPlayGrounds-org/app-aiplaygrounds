/* global window, PerformanceObserver, requestAnimationFrame, performance */
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { release } from 'node:os';

// Supply the local Playwright installation; the site does not depend on it.
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE ?? 'playwright',
);
const [output, ...origins] = process.argv.slice(2);
const repeats = Number(process.env.MOTION_REPEATS ?? 5);
const detailed = process.env.MOTION_TRACE === '1';
const routes = {
  '/': ['#I3', '#I2', '#I4', '#I5', '#I8'],
  '/empresas/': ['#EM2', '#EM3', '#EM4', '#EM6'],
  '/formacion/': ['#F6', '#F5', '#F7'],
};
const conditions = detailed
  ? [{ width: 390, cpu: 4, latency: 0 }]
  : [
      { width: 390, cpu: 4, latency: 0 },
      { width: 1440, cpu: 1, latency: 0 },
      { width: 390, cpu: 6, latency: 150 },
    ];
const categories = [
  'devtools.timeline',
  'blink.user_timing',
  'v8',
  'disabled-by-default-v8.compile',
  'disabled-by-default-devtools.timeline',
];
const browser = await chromium.launch();
const result = {
  browser: browser.version(),
  node: process.version,
  os: release(),
  conditions,
  repeats,
  rows: [],
};
try {
  for (const condition of conditions) {
    for (const [route, sections] of Object.entries(routes)) {
      for (let repeat = 0; repeat < repeats; repeat++) {
        for (const origin of origins) {
          const { width, cpu, latency } = condition;
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            isMobile: width === 390,
            hasTouch: width === 390,
          });
          try {
            const page = await context.newPage();
            const cdp = await context.newCDPSession(page);
            await cdp.send('Performance.enable');
            await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
            if (latency) {
              await cdp.send('Network.enable');
              await cdp.send('Network.emulateNetworkConditions', {
                latency,
                offline: false,
                downloadThroughput: 200_000,
                uploadThroughput: 93_750,
              });
            }
            await page.addInitScript(() => {
              const state = (window.motionProfile = {
                lcp: 0,
                cls: 0,
                long: [],
                gaps: 0,
              });
              const observers = {
                'largest-contentful-paint': (entry) => {
                  state.lcp = entry.startTime;
                },
                'layout-shift': (entry) => {
                  if (!entry.hadRecentInput) state.cls += entry.value;
                },
                longtask: (entry) => state.long.push(entry.duration),
              };
              for (const [type, receive] of Object.entries(observers))
                new PerformanceObserver((list) =>
                  list.getEntries().forEach(receive),
                ).observe({ type, buffered: true });
              let last;
              const tick = (now) => {
                if (last && now - last > 25) state.gaps++;
                last = now;
                requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
            const trace = [];
            if (detailed) {
              cdp.on('Tracing.dataCollected', ({ value }) =>
                trace.push(...value),
              );
              await cdp.send('Tracing.start', {
                categories: categories.join(','),
              });
            }
            const sample = async () => {
              const { metrics } = await cdp.send('Performance.getMetrics');
              const times = Object.fromEntries(
                metrics
                  .filter(({ name }) =>
                    /^(Task|Script|Layout|RecalcStyle)Duration$/.test(name),
                  )
                  .map(({ name, value }) => [name, Math.round(value * 1000)]),
              );
              return {
                ...times,
                ...(await page.evaluate(() => ({
                  ...window.motionProfile,
                  resources: performance
                    .getEntriesByType('resource')
                    .filter(({ name }) => /\.(js|css)$/.test(name))
                    .map(({ name, decodedBodySize, transferSize }) => [
                      name.split('/').at(-1),
                      decodedBodySize,
                      transferSize,
                    ]),
                }))),
              };
            };
            await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
            await page.waitForFunction(
              (end) => performance.now() > end,
              latency ? 4500 : 2300,
            );
            const initial = await sample();
            const scenes = [];
            for (const selector of detailed ? sections : sections.slice(0, 1)) {
              const before = await sample();
              const response = await page
                .locator(selector)
                .evaluate(async (element, selector) => {
                  performance.mark(`motion:${selector}:start`);
                  const start = performance.now();
                  window.scrollBy({
                    top: element.getBoundingClientRect().top - 130,
                    behavior: 'instant',
                  });
                  return Math.round(
                    await new Promise((resolve) =>
                      requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                          resolve(performance.now() - start),
                        ),
                      ),
                    ),
                  );
                }, selector);
              await page.waitForTimeout(1500);
              await page.evaluate(
                (selector) => performance.mark(`motion:${selector}:end`),
                selector,
              );
              scenes.push({
                selector,
                before,
                response,
                after: await sample(),
              });
            }
            if (detailed) {
              const complete = new Promise((resolve) =>
                cdp.once('Tracing.tracingComplete', resolve),
              );
              await cdp.send('Tracing.end');
              await complete;
              await writeFile(
                `${output}-${new URL(origin).port}-${route.replaceAll('/', '') || 'home'}-${repeat}.json`,
                JSON.stringify(trace),
              );
            }
            result.rows.push({
              condition,
              route,
              origin,
              repeat,
              initial,
              scenes,
            });
            await writeFile(output, JSON.stringify(result, null, 2));
          } finally {
            await context.close();
          }
        }
      }
    }
  }
} finally {
  await browser.close();
}
