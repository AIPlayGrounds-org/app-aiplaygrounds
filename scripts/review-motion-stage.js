/* global document, window, PointerEvent, getComputedStyle, requestAnimationFrame */
export default async function reviewMotionStage(
  page,
  origin,
  widths = [320, 390, 768, 1024, 1440],
) {
  const patterns = {
    '/': {
      kinetic: '#I1',
      narrative: '#I2',
      assembly: '#I3 [data-scene]',
      metrics: '#I4 .stat',
      signal: '#I5 [data-scene]',
      organic: '#I8 [data-scene]',
    },
    '/empresas/': {
      kinetic: '#EM1',
      landscape: '#EM2 [data-scene]',
      narrative: '#EM3',
      signal: '#EM4 [data-scene]',
      convergence: '#EM6 [data-scene]',
    },
    '/formacion/': {
      kinetic: '#F1',
      metrics: '#F5 [data-scene]',
      organic: '#F6 [data-scene]',
      convergence: '#F7 [data-scene]',
    },
    '/equipo/': { organic: 'main [data-scene="organic"]' },
    '/comunidad/': { organic: 'main [data-scene="organic"]' },
  };
  const motion = {
    kinetic: '[data-word][style*="transform"]',
    narrative: '.motion-heading-line[style*="clip-path"]',
    assembly: '[data-scene-art][style*="transform"]',
    metrics: '.motion-reel',
    organic: '[data-scene-art][style*="ellipse"]',
    landscape: '[data-scene-art][style*="ellipse"]',
    convergence: '[data-scene-surface][style*="clip-path"]',
    signal: '[data-signal-path][draw]',
  };
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const errors = [];
  const onError = (error) => errors.push(error.message);
  const onConsole = (message) => {
    if (message.type() === 'error') errors.push(message.text());
  };
  page.on('pageerror', onError);
  page.on('console', onConsole);
  const enter = (root) =>
    root.evaluate((element) => {
      window.scrollBy({
        top: element.getBoundingClientRect().top - window.innerHeight * 0.25,
        behavior: 'instant',
      });
    });
  const twoFrames = () =>
    page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
  const wait = (locator, state = 'attached') =>
    locator.waitFor({ state, timeout: 4500 });
  const hoverTitle = async (card) => {
    const box = await card.locator('h3').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  };
  try {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      for (const [path, scenes] of Object.entries(patterns)) {
        await page.mouse.move(2, 2);
        for (const [name, selector] of Object.entries(scenes)) {
          const response = await page.goto(`${origin}${path}`);
          assert(response?.ok(), `HTTP ${path}`);
          const root = page.locator(selector).first();
          const effect = root.locator(motion[name]).first();
          if (name !== 'kinetic') await enter(root);
          await wait(effect).catch(() => {
            throw new Error(`Sin entrada ${name}: ${path} a ${width}px`);
          });
          if (name === 'kinetic') {
            const heading = root.getByRole('heading', { level: 1 });
            assert(await heading.isVisible(), `H1 oculto en ${path} ${width}`);
            const animation = await root
              .locator('.hero-image')
              .evaluate((img) => getComputedStyle(img).transform);
            assert(animation === 'none', `Paisaje animado en ${path}`);
          }
          await twoFrames();
          assert(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
            `Overflow durante ${name}: ${path} ${width}`,
          );
          await wait(effect, 'detached');
        }
      }
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${origin}/empresas/`);
    const initiatives = page.locator('#EM4 [data-scene="signal"]');
    const first = initiatives.first();
    const tracer = first.locator('[data-signal-trace]');
    await enter(first);
    await wait(first.locator('[data-signal-path][draw]'));
    await hoverTitle(first);
    await wait(first.locator('[data-signal-trace][draw]'));
    assert(
      !(await first.locator('[data-signal-path][draw]').count()),
      'El hover superpuso la construcción',
    );
    for (let index = 0; index < 3; index++) {
      await page.mouse.move(2, 2);
      await hoverTitle(first);
    }
    await wait(first.locator('[data-signal-trace][draw]'), 'detached');
    await page.mouse.move(2, 2);
    await first.locator('a').focus();
    await wait(first.locator('[data-signal-trace][draw]'));
    await wait(first.locator('[data-signal-trace][draw]'), 'detached');
    await first.evaluate((card) =>
      card.dispatchEvent(
        new PointerEvent('pointerenter', { pointerType: 'touch' }),
      ),
    );
    await twoFrames();
    assert(
      !(await tracer.getAttribute('draw')),
      'El puntero táctil activó la traza',
    );

    const form = page.locator('#EM6 [data-scene]');
    await enter(form);
    const fill = form.locator(motion.convergence);
    await wait(fill);
    const name = form.locator('#contact-name');
    await name.click();
    await name.pressSequentially('Prueba de movimiento');
    assert(
      (await name.inputValue()) === 'Prueba de movimiento',
      'Se perdió el valor ingresado',
    );
    assert(
      await name.evaluate((input) => document.activeElement === input),
      'Se perdió el foco del formulario',
    );
    await wait(fill, 'detached');
    await page.setViewportSize({ width: 390, height: 900 });
    assert(
      (await name.inputValue()) === 'Prueba de movimiento',
      'Se perdió el valor al cambiar el viewport',
    );

    await page.goto(`${origin}/`);
    const assembly = page.locator('#I3 [data-scene]').first();
    await enter(assembly);
    const assemblyEffect = assembly.locator(motion.assembly);
    await wait(assemblyEffect);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(assemblyEffect, 'detached');
    await enter(assembly);
    await twoFrames();
    assert(
      !(await assemblyEffect.count()),
      'El scroll inverso reinició las tarjetas',
    );
    await page.goto(`${origin}/formacion/`);
    await page.goBack();
    await twoFrames();
    assert(
      !(await assemblyEffect.count()),
      'Atrás reinició una entrada visible',
    );
    await page.goForward();
    assert(
      await page.getByRole('heading', { level: 1 }).isVisible(),
      'Fallo tras atrás/adelante',
    );

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${origin}/`);
    await enter(page.locator('#I5 [data-scene]').first());
    await hoverTitle(page.locator('#I5 [data-scene]').first());
    await twoFrames();
    assert(
      !(await page
        .locator(
          '[data-signal-path][draw], [data-signal-trace][draw], .motion-reel, [data-word]',
        )
        .count()),
      'Reduced motion dejó movimiento activo',
    );

    await page.goto(`${origin}/design-system/`);
    assert(
      (await page.locator('#motion-signal [data-initiative-art]').count()) ===
        4,
      'Falta una ilustración modular',
    );
    const ids = await page
      .locator('[data-initiative-art]')
      .evaluateAll((art) => art.map((svg) => svg.id));
    assert(new Set(ids).size === ids.length, 'IDs de SVG repetidos');
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `Overflow de catálogo: ${width}`,
      );
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const id of [...Object.keys(motion), 'trace']) {
      const demo = page.locator(`#motion-${id}`);
      await demo.locator('[data-motion-action="play"]').click();
      const status = demo.locator('[data-motion-status]');
      await status.getByText('En reproducción.').waitFor();
      await demo.locator('[data-motion-field="progress"]').fill('45');
      await status.getByText('En pausa.').waitFor();
      const selector =
        id === 'trace' ? '[data-signal-trace][draw]' : motion[id];
      await wait(demo.locator(selector).first());
      await demo.locator('[data-motion-action="reset"]').click();
      await wait(demo.locator(selector).first(), 'detached');
    }
    assert(!errors.length, errors.join('\n'));
    return 'Motion: 25 vistas, nueve demos, interrupción, foco, tacto y movimiento reducido.';
  } finally {
    page.off('pageerror', onError);
    page.off('console', onConsole);
  }
}
