/* global document, getComputedStyle, innerWidth, matchMedia */
export default async function reviewRefinement(page) {
  const production = 'http://127.0.0.1:4370';
  const development = 'http://localhost:4321';
  const dir = '/tmp/opencode/empresas-v2';
  const errors = [];
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const computed = (item, property) =>
    item.evaluate(
      (node, name) => getComputedStyle(node).getPropertyValue(name),
      property,
    );
  const settled = (item) =>
    item.evaluate(async (node) => {
      await Promise.all(
        node
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished.catch(() => {})),
      );
    });
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = 'eager';
          return image.decode();
        }),
      );
    });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth === innerWidth,
      ),
      `Desbordamiento: ${page.url()}`,
    );
  };

  // The static test server has no favicon; don't conflate that probe with page assets.
  await page
    .context()
    .route('**/favicon.ico', (route) => route.fulfill({ status: 204 }));
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (
      response.status() >= 400 &&
      ['document', 'script', 'stylesheet', 'image', 'font'].includes(
        response.request().resourceType(),
      )
    ) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [
    [1440, 900],
    [1024, 900],
    [768, 1024],
    [390, 844],
    [320, 780],
  ]) {
    await page.setViewportSize({ width, height });
    for (const [path, name] of [
      ['/empresas/', 'empresas'],
      ['/', 'inicio'],
      ['/formacion/', 'formacion'],
    ]) {
      await page.goto(production + path);
      await ready();
      await page.screenshot({
        path: `${dir}/despues-${name}-${width}.png`,
        fullPage: true,
      });
      if (name !== 'empresas') continue;
      const surface = page.locator('#EM6 .conversion-surface');
      const art = surface.locator('.art img');
      const form = surface.locator('form');
      check(
        (await surface.locator('form').count()) === 1,
        'Formulario único en la superficie',
      );
      check(
        (await computed(form, 'border-top-width')) === '0px',
        'El formulario no tiene un segundo borde',
      );
      check(
        (await computed(page.locator('#EM3'), 'border-top-width')) === '0px',
        'Sin separador superior',
      );
      check(
        (await computed(page.locator('#EM3'), 'border-bottom-width')) === '0px',
        'Sin separador inferior',
      );
      const [a, f, s] = await Promise.all([
        art.boundingBox(),
        form.boundingBox(),
        surface.boundingBox(),
      ]);
      check(
        a &&
          f &&
          s &&
          Math.abs(a.x - s.x) <= 2 &&
          a.y + a.height >= s.y + s.height - 2,
        'Patio anclado a la esquina',
      );
      check(
        width >= 768 ? a.x + a.width * 0.83 < f.x : a.y >= f.y + f.height,
        'El patio no invade el formulario',
      );
    }
  }
  for (const path of [
    '/comunidad/',
    '/ai-labs/',
    '/investigacion/',
    '/equipo/',
  ]) {
    await page.goto(production + path);
    await ready();
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(production + '/empresas/');
  await ready();
  const targets = [
    ['#EM2 .grove', '.art', 'scale', '1.035', 'alianza'],
    ['#EM2 .sand', '.art', 'scale', '1.035', 'comercial'],
    [
      '#EM4 .path-card',
      '.path-illustration svg',
      'translate',
      '0px -6px',
      'iniciativa',
    ],
  ];
  for (const [selector, artSelector, property, active, name] of targets) {
    const card = page.locator(selector).first();
    const art = card.locator(artSelector);
    const arrow = card.locator('a svg');
    await card.scrollIntoViewIfNeeded();
    await settled(card);
    const color = await computed(card, 'border-right-color');
    const { width, height } = await card.boundingBox();
    await card.screenshot({ path: `${dir}/reposo-${name}.png` });
    await card.locator('h3').hover();
    await settled(card);
    check(
      (await computed(card, 'border-right-color')) !== color,
      `${name}: borde desde el título`,
    );
    check(
      (await computed(art, property)) === active,
      `${name}: ilustración desde el título`,
    );
    check(
      (await computed(arrow, 'translate')) === '4px -3px',
      `${name}: flecha desde el título`,
    );
    const hovered = await card.boundingBox();
    check(
      width === hovered.width && height === hovered.height,
      `${name}: sin cambio de tamaño`,
    );
    if (property === 'scale') {
      const picture = await art.boundingBox();
      check(
        Math.abs(picture.x + picture.width - hovered.x - width) <= 2 &&
          Math.abs(picture.y + picture.height - hovered.y - height) <= 2,
        `${name}: anclaje durante hover`,
      );
    }
    await card.screenshot({ path: `${dir}/hover-${name}.png` });
    await page.mouse.move(0, 0);
    await card.locator('a').focus();
    await settled(card);
    check(
      (await computed(card, 'border-right-color')) !== color &&
        (await computed(card.locator('a'), 'outline-style')) === 'solid',
      `${name}: foco visible`,
    );
    await card.locator('a').blur();
  }

  await page.goto(production + '/');
  const closing = page.locator('#I8 .closing');
  await closing.scrollIntoViewIfNeeded();
  await settled(closing);
  const closingBorder = await computed(closing, 'border-right-color');
  await closing.locator('h2').hover();
  await settled(closing);
  check(
    (await computed(closing.locator('img'), 'scale')) === '1.04' &&
      (await computed(closing, 'border-right-color')) === closingBorder,
    'Cierre: arte desde superficie, sin nuevo borde',
  );
  check(
    (await page
      .locator('#I3 [data-card-interactive], #I4 [data-card-interactive]')
      .count()) === 0,
    'No añadir affordance a verticales o métricas',
  );
  await page.goto(production + '/equipo/');
  check(
    (await page.locator('#E3 [data-card-interactive]').count()) === 0,
    'No añadir affordance a equipo estático',
  );

  for (const [url, selector, edge] of [
    [
      production + '/comunidad/',
      '#C3 [data-card-interactive]',
      'border-top-color',
    ],
    [development + '/ai-labs/', '.product-card', 'border-right-color'],
    [development + '/investigacion/', '.research-row', 'border-bottom-color'],
  ]) {
    await page.goto(url);
    const card = page.locator(selector).first();
    const normal = await computed(card, edge);
    await card.locator('h3').hover();
    await settled(card);
    check(
      (await computed(card, edge)) !== normal &&
        (await computed(card.locator('[data-card-arrow]'), 'translate')) !==
          'none',
      `Interacción de ${url}`,
    );
  }

  await page.goto(production + '/empresas/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = page.locator('#EM2 .grove');
  const normal = await computed(reduced, 'border-right-color');
  await reduced.locator('h3').hover();
  await settled(reduced);
  check(
    (await computed(reduced, 'border-right-color')) !== normal &&
      (await computed(reduced.locator('img'), 'scale')) === 'none',
    'Movimiento reducido mantiene feedback sin escala',
  );

  const touch = await page
    .context()
    .browser()
    .newContext({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 },
    });
  const mobile = await touch.newPage();
  await mobile.goto(production + '/empresas/');
  check(
    await mobile.evaluate(() => matchMedia('(hover: none)').matches),
    'Puntero táctil',
  );
  await mobile.locator('#EM2 h3').first().tap();
  check(
    (await computed(mobile.locator('#EM2 .grove img'), 'scale')) === '1',
    'Tocar el título no activa movimiento',
  );
  await mobile.locator('[data-cta="propose_alliance"]').tap();
  check(
    (await mobile.locator('#contact-type').inputValue()) === 'institutional',
    'El CTA táctil precarga el tipo',
  );
  await touch.close();

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(production + '/empresas/');
  const contact = page.locator('#EM6 .conversion-surface');
  await contact.evaluate((node) =>
    node.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  const beforeEdit = await contact.boundingBox();
  await contact.locator('#contact-name').focus();
  await page.keyboard.type('Prueba');
  check(
    (await computed(contact.locator('.intro'), 'translate')) === 'none' &&
      (await computed(contact.locator('.form-slot'), 'opacity')) === '1',
    'El foco asienta la entrada del contenido de contacto',
  );
  await settled(contact);
  check(
    JSON.stringify(await contact.boundingBox()) === JSON.stringify(beforeEdit),
    'La superficie no se mueve durante la edición',
  );

  check(errors.length === 0, errors.join('; '));
  return 'Refinamiento visual, hover de superficie, teclado, táctil y movimiento reducido: OK.';
}
