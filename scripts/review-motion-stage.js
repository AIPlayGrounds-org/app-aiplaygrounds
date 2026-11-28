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
    kinetic: '[data-word]',
    narrative: '.motion-heading-line',
    assembly: '[data-scene-art]',
    metrics: '.motion-reel',
    organic: '[data-scene-art]',
    landscape: '[data-scene-art]',
    convergence: '[data-scene-surface]',
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
  const native = ['assembly', 'organic', 'landscape', 'convergence'];
  const waitForTrack = (root, selector, running = true) =>
    page.waitForFunction(
      ({ selector, running, root }) => {
        const target = root.querySelector(selector);
        const hasTrack = target
          ?.getAnimations()
          .some(
            (effect) =>
              effect.constructor === window.Animation &&
              effect.effect
                .getKeyframes()
                .some((frame) => frame.clipPath || frame.translate),
          );
        return Boolean(hasTrack) === running;
      },
      { root, selector, running },
      { timeout: 4500 },
    );
  const waitForScene = async (root, name, running = true) =>
    native.includes(name)
      ? waitForTrack(await root.elementHandle(), motion[name], running)
      : wait(
          root.locator(motion[name]).first(),
          running ? 'attached' : 'detached',
        );
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
          if (name !== 'kinetic') await enter(root);
          await waitForScene(root, name).catch(() => {
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
          await waitForScene(root, name, false).catch((error) => {
            throw new Error(`No se limpió ${name}: ${path} a ${width}px`, {
              cause: error,
            });
          });
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
    await waitForScene(form, 'convergence');
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
    await waitForScene(form, 'convergence', false);
    await page.setViewportSize({ width: 390, height: 900 });
    assert(
      (await name.inputValue()) === 'Prueba de movimiento',
      'Se perdió el valor al cambiar el viewport',
    );

    await page.goto(`${origin}/`);
    const assembly = page.locator('#I3 [data-scene]').first();
    await enter(assembly);
    await waitForScene(assembly, 'assembly');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await waitForScene(assembly, 'assembly', false);
    await enter(assembly);
    await twoFrames();
    await waitForScene(assembly, 'assembly', false);
    await page.goto(`${origin}/formacion/`);
    await page.goBack();
    await twoFrames();
    await waitForScene(assembly, 'assembly', false);
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
    await page
      .locator('#motion-trace [data-scene]')
      .last()
      .evaluate(async (card, modulePath) => {
        const { patterns } = await import(modulePath);
        const animate = await patterns.trace();
        const node = [...card.querySelectorAll('[data-signal-stop]')].find(
          (stop) => stop.dataset.signalStop.includes(' '),
        );
        if (!node) throw new Error('Faltan los regresos al nodo central');
        const pulse = node.querySelector('[data-signal-pulse]');
        const effect = animate(card, { manual: true, duration: 1000 });
        effect.pause();
        try {
          for (const visit of node.dataset.signalStop.split(' ').map(Number)) {
            effect.seek(visit * 790 + 38);
            if (Number(getComputedStyle(pulse).opacity) < 0.5)
              throw new Error('La señal no activó el nodo al regresar');
          }
        } finally {
          effect.revert();
        }
      }, '/src/motion/patterns.ts');
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
    // A delayed module must not cover a section the visitor has already read.
    const delayed = '**/src/motion/assembly.ts*';
    let releaseAssembly;
    const gate = new Promise((resolve) => {
      releaseAssembly = resolve;
    });
    let requestAssembly;
    const requested = new Promise((resolve) => {
      requestAssembly = resolve;
    });
    await page.route(delayed, async (route) => {
      requestAssembly();
      await gate;
      await route.continue();
    });
    try {
      await page.goto(`${origin}/`);
      const card = page.locator('#I3 [data-scene]').first();
      await enter(card);
      await requested;
      const title = card.locator('[data-scene-title]');
      assert(
        await title.evaluate((el) => getComputedStyle(el).clipPath === 'none'),
        'Se ocultó texto mientras cargaba el módulo',
      );
      await page.waitForTimeout(240);
      const received = page.waitForResponse((response) =>
        response.url().includes('/src/motion/assembly.ts'),
      );
      releaseAssembly();
      await received;
      await twoFrames();
      assert(
        await title.evaluate((el) => getComputedStyle(el).clipPath === 'none'),
        'El módulo tardío volvió a ocultar texto visible',
      );
    } finally {
      releaseAssembly();
      await page.unroute(delayed);
    }
    await page.goto(`${origin}/design-system/`);
    for (const id of [...Object.keys(motion), 'trace']) {
      const demo = page.locator(`#motion-${id}`);
      await demo.locator('[data-motion-action="play"]').click();
      const status = demo.locator('[data-motion-status]');
      await status.getByText('En reproducción.').waitFor();
      await demo.locator('[data-motion-field="progress"]').fill('45');
      await status.getByText('En pausa.').waitFor();
      if (id === 'trace')
        await wait(demo.locator('[data-signal-trace][draw]').first());
      else await waitForScene(demo, id);
      await demo.locator('[data-motion-action="reset"]').click();
      if (id === 'trace')
        await wait(
          demo.locator('[data-signal-trace][draw]').first(),
          'detached',
        );
      else await waitForScene(demo, id, false);
    }
    assert(!errors.length, errors.join('\n'));
    return 'Motion: 25 vistas, nueve demos, interrupción, foco, tacto y movimiento reducido.';
  } finally {
    page.off('pageerror', onError);
    page.off('console', onConsole);
  }
}
