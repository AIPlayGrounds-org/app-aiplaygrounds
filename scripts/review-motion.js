/* global document, window, getComputedStyle */
export default async function reviewMotion(page, origin) {
  const errors = [];
  const onError = (error) => errors.push(error.message);
  page.on('pageerror', onError);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${origin}/`);
    const verticals = page.locator('#I3 [data-scene-group]');
    await verticals.evaluate((group) => {
      window.scrollBy({
        top: group.getBoundingClientRect().top - 350,
        behavior: 'instant',
      });
    });
    await page.waitForFunction(() => {
      const cards = [
        ...document.querySelectorAll(
          '#I3 [data-scene="assembly"] [data-scene-title]',
        ),
      ];
      const masks = new Set(
        cards.map((card) => getComputedStyle(card).clipPath),
      );
      return !masks.has('none') && masks.size > 1;
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() =>
      [...document.querySelectorAll('#I3 [data-scene-title]')].every(
        (title) => getComputedStyle(title).clipPath === 'none',
      ),
    );
    await verticals.scrollIntoViewIfNeeded();
    if (
      await verticals
        .locator('[data-scene-title]')
        .evaluateAll((titles) =>
          titles.some((title) => getComputedStyle(title).clipPath !== 'none'),
        )
    )
      throw new Error('El grupo editorial se repitió al invertir el scroll.');
    await page.goto(`${origin}/ai-labs/`);
    await page.waitForFunction(() =>
      Boolean(
        document
          .querySelector('[data-compact-motion]')
          ?.getAnimations({ subtree: true }).length,
      ),
    );
    await page.locator('[data-compact-motion]').evaluate((svg) => {
      const before = svg.getAnimations({ subtree: true }).length;
      window.dispatchEvent(
        new window.PageTransitionEvent('pageshow', { persisted: true }),
      );
      if (before !== svg.getAnimations({ subtree: true }).length)
        throw new Error('La restauración duplicó la secuencia.');
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(
      () =>
        document
          .querySelector('[data-compact-motion]')
          ?.getAnimations({ subtree: true }).length === 0,
    );
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`${origin}/formacion/`);
    await page.goBack();
    await page.goForward();
    const card = page.locator('[data-motion-draw="motif"]').first();
    await card.hover();
    await page.waitForFunction(() =>
      Boolean(
        document
          .querySelector('[data-motion-draw="motif"]')
          ?.getAnimations({ subtree: true }).length,
      ),
    );
    for (let index = 0; index < 3; index++) {
      await page.mouse.move(2, 2);
      await card.hover();
    }
    await page.mouse.move(2, 2);
    await page.waitForFunction(() =>
      [...document.querySelectorAll('[data-motion-draw] svg path')].every(
        (path) => !path.getAnimations().length,
      ),
    );

    await page.goto(`${origin}/design-system/#motion`);
    for (const [id, modes] of [
      [
        'entrance-exit',
        ['rise', 'fade', 'card', 'ink', 'group', 'slide', 'exit'],
      ],
      ['scroll', ['reveal', 'progress', 'parallax', 'horizontal']],
      ['sequences', ['timeline', 'hero']],
      ['svg', ['layers', 'draw', 'morph', 'path']],
      ['typography', ['chars', 'words', 'lines']],
      ['physics-interactions', ['spring', 'drag']],
      ['layout', ['reorder', 'grid', 'enter', 'exit']],
    ]) {
      const demo = page.locator(`#motion-${id}`);
      for (const mode of modes) {
        await demo.locator('[data-motion-field="mode"]').selectOption(mode);
        await demo.locator('[data-motion-action="play"]').click();
        await demo
          .locator('[data-motion-status]')
          .getByText(/En reproducción|Desplázate/)
          .waitFor({ timeout: 5000 });
        if (id === 'scroll') {
          await demo.locator('[data-motion-scroll]').evaluate((scroller) => {
            scroller.scrollTop = 150;
            scroller.scrollLeft = 150;
          });
          if (mode !== 'reveal') {
            await page.waitForFunction(
              () =>
                document.querySelector('[data-motion-scroll-progress]').value >
                0,
              null,
              { timeout: 5000 },
            );
          }
        }
        if (id === 'entrance-exit' && mode === 'card') {
          await demo.locator('[data-motion-field="progress"]').fill('50');
          await page.waitForFunction(
            () =>
              document
                .querySelector('#motion-entrance-exit [data-motion-item]')
                .getAnimations()
                .some(
                  (animation) =>
                    animation.playState === 'paused' &&
                    Number(animation.currentTime) > 0,
                ),
            null,
            { timeout: 5000 },
          );
        }
        await demo.locator('[data-motion-action="reset"]').click();
      }
    }
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      if (
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        )
      )
        throw new Error(`Overflow a ${width}px.`);
    }
    await page.locator('[data-motion-reduce]').check();
    const entrance = page.locator('#motion-entrance-exit');
    await entrance.locator('[data-motion-action="play"]').press('Enter');
    await entrance
      .locator('[data-motion-status]')
      .getByText('Movimiento reducido:', { exact: false })
      .waitFor();
    if (errors.length) throw new Error(errors.join('\n'));
    return 'Playwright: modos de movimiento, puntero, teclado, reduced motion y navegación.';
  } finally {
    page.off('pageerror', onError);
  }
}
