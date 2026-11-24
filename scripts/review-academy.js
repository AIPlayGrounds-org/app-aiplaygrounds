/* global document, innerWidth, getComputedStyle, window */
export default async function reviewAcademy(page) {
  // Serve the static build on this port before running via playwright-cli.
  const origin = 'http://127.0.0.1:4372';
  const out = '/tmp/opencode/academy-after';
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const errors = [];
  await page
    .context()
    .route('**/favicon.ico', (route) => route.fulfill({ status: 204 }));
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1920, 1440, 1080, 1024, 768, 641, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const heroHeights = [];
    for (const [route, id] of [
      ['/', '#I1'],
      ['/empresas/', '#EM1'],
    ]) {
      await page.goto(`${origin}${route}`);
      heroHeights.push(
        await page.locator(id).evaluate(async (hero) => {
          await document.fonts.ready;
          return hero.getBoundingClientRect().height;
        }),
      );
    }
    await page.goto(`${origin}/formacion/`);
    await page.locator('.site-header[data-at-top]').waitFor();
    const layout = await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = 'eager';
          return image.decode();
        }),
      );
      const cards = [...document.querySelectorAll('.immersive-card')];
      const boxes = cards.map((card) => {
        const bounds = card.getBoundingClientRect();
        const panel = card.querySelector('.panel').getBoundingClientRect();
        return {
          x: bounds.x,
          y: bounds.y,
          height: bounds.height,
          fits:
            panel.left > bounds.left &&
            panel.right < bounds.right &&
            panel.bottom < bounds.bottom &&
            panel.top - bounds.top >= bounds.width * 0.58,
        };
      });
      const rect = (selector) =>
        document.querySelector(selector).getBoundingClientRect();
      const hero = rect('#F1');
      const header = rect('.site-header');
      const copy = rect('#F1 .hero-content');
      const copyStyle = getComputedStyle(
        document.querySelector('#F1 .hero-content'),
      );
      const bootcamp = getComputedStyle(document.querySelector('.bootcamp'));
      return {
        sections: [...document.querySelectorAll('main > section')].map(
          ({ id }) => id,
        ),
        noOverflow: document.documentElement.scrollWidth === innerWidth,
        static: document.querySelectorAll('[data-entering]').length === 0,
        boxes,
        height: hero.height,
        headerClean: [
          ...document.querySelectorAll(
            '.site-header :is(.brand, .desktop-nav a, summary)',
          ),
        ].every((item) => {
          const style = getComputedStyle(item);
          return (
            style.color === 'rgb(0, 0, 0)' &&
            style.textShadow === 'none' &&
            style.webkitTextStrokeWidth === '0px'
          );
        }),
        overlay:
          hero.top === header.top && rect('#F1 .hero-image').top === header.top,
        centered:
          Math.abs(copy.left + copy.width / 2 - (hero.left + hero.width / 2)) <=
            1 &&
          Math.abs(
            copy.top -
              header.bottom -
              (hero.bottom - (hero.height - header.height) / 4 - copy.bottom),
          ) <= 1,
        unpadded:
          copyStyle.paddingBlockStart === '0px' &&
          copyStyle.paddingBlockEnd === '0px',
        cleanHistory:
          bootcamp.borderBlockStartWidth === '0px' &&
          bootcamp.borderBlockEndWidth === '0px',
      };
    });
    check(
      layout.sections.join() === 'F1,F2,F3,F4,F5,F6,F7',
      'Orden de secciones',
    );
    check(layout.noOverflow, `Desbordamiento horizontal a ${width}px`);
    check(layout.static, `Reveal con movimiento reducido a ${width}px`);
    check(
      heroHeights.every((height) => height === layout.height),
      `Alturas de hero distintas a ${width}px`,
    );
    check(
      layout.headerClean,
      `Texto de navegación no es negro sin efectos a ${width}px`,
    );
    check(
      layout.overlay && layout.centered && layout.unpadded,
      `Hero descentrado a ${width}px`,
    );
    check(layout.cleanHistory, 'Líneas horizontales en Trayectoria');
    const [first, second] = layout.boxes;
    check(first.fits && second.fits, `Panel recortado a ${width}px`);
    if (width >= 768) {
      check(
        first.y === second.y && first.height === second.height,
        `Cards desalineadas a ${width}px`,
      );
    } else {
      check(first.x === second.x && first.y < second.y, 'Cards sin apilar');
    }
    if ([1440, 768, 390, 320].includes(width)) {
      await page.screenshot({
        path: `${out}/formacion-${width}.png`,
        fullPage: true,
      });
    }
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await page.waitForFunction(
      () => {
        const header = document.querySelector(
          '.site-header:not([data-at-top])',
        );
        return (
          header &&
          Math.abs(header.getBoundingClientRect().top) < 1 &&
          getComputedStyle(header).backgroundColor === 'rgb(251, 246, 236)'
        );
      },
      null,
      { timeout: 3000 },
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('.site-header[data-at-top]').waitFor();
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${origin}/empresas/`);
  const card = page.locator('[data-card-interactive]').first();
  await card.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const bounds = await card.boundingBox();
  const restingEdge = await card.evaluate(
    (node) => getComputedStyle(node).borderTopColor,
  );
  await card.hover();
  await page.waitForFunction((edge) => {
    const hovered = document.querySelector('[data-card-interactive]:hover');
    return hovered && getComputedStyle(hovered).borderTopColor !== edge;
  }, restingEdge);
  const activeEdge = await card.evaluate(
    (node) => getComputedStyle(node).borderTopColor,
  );
  check(restingEdge !== activeEdge, 'Borde de hover sin contraste');
  check(
    JSON.stringify(bounds) === JSON.stringify(await card.boundingBox()),
    'El hover desplaza el card',
  );
  await page.mouse.move(0, 0);
  const cardLink = card.getByRole('link');
  await page.keyboard.press('Tab');
  await cardLink.focus();
  await page.waitForFunction((edge) => {
    const focused = document.querySelector(
      '[data-card-interactive]:has(:focus-visible)',
    );
    return focused && getComputedStyle(focused).borderTopColor === edge;
  }, activeEdge);
  check(
    await cardLink.evaluate((node) => node.matches(':focus-visible')),
    'Enlace de card sin foco de teclado',
  );
  check(
    (await card.evaluate((node) => getComputedStyle(node).borderTopColor)) ===
      activeEdge,
    'Card sin borde reforzado al navegar por teclado',
  );

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${origin}/formacion/`);
  check(
    (await page
      .locator('#F1')
      .getByText('AI Academy', { exact: true })
      .count()) === 0,
    'Etiqueta del hero visible',
  );
  check(
    (await page
      .locator('#F3')
      .getByText('Son enfoques independientes', { exact: false })
      .count()) === 0,
    'Nota de F3 visible',
  );
  check(
    await page
      .locator('#F4')
      .getByRole('heading', { name: 'Cursos', exact: true })
      .isVisible(),
    'Título de Cursos',
  );
  check(
    (await page.locator('.bootcamp .edition').textContent()).trim() ===
      'Edición finalizada',
    'Etiqueta de F5',
  );
  check(
    (await page
      .locator('.bootcamp')
      .getByText(/gratuita/)
      .count()) === 0,
    'Gratuidad en F5',
  );
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  check(
    await skip.evaluate((node) => node.matches(':focus-visible')),
    'Foco del salto',
  );
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  const explore = page.getByRole('link', { name: 'Explorar enfoques' });
  check(
    await explore.evaluate(
      (node) =>
        node.matches(':focus-visible') &&
        getComputedStyle(node).outlineWidth === '3px',
    ),
    'Foco del CTA principal',
  );
  await page.keyboard.press('Enter');
  check(new URL(page.url()).hash === '#F3', 'Destino del hero');
  check(
    await page.locator('#F3').evaluate((node) => node.matches(':focus')),
    'Foco en F3',
  );

  const waitlist = page.getByRole('form', {
    name: 'Lo próximo que construyas empieza aquí.',
  });
  check(
    (await waitlist.getAttribute('action')) === '/api/academy-waitlist',
    'Contrato de lista de espera',
  );
  check(
    (await waitlist.locator('input:disabled, button:disabled').count()) === 5,
    'Formulario activo',
  );
  check(
    (await waitlist.locator('[data-turnstile], iframe').count()) === 0,
    'Widget activo',
  );

  await page.getByRole('link', { name: 'Conoce nuestra trayectoria' }).click();
  check(
    new URL(page.url()).pathname === '/comunidad/' &&
      new URL(page.url()).hash === '#C3',
    'Destino de trayectoria',
  );
  check(
    await page
      .locator('#C3')
      .getByText(/Bootcamp Gen AI Fundamentals/)
      .isVisible(),
    'Hito no encontrado',
  );
  await page.goto(`${origin}/formacion/`);
  await page
    .getByRole('link', { name: 'Explorar formación para equipos' })
    .click();
  check(
    new URL(page.url()).pathname === '/empresas/' &&
      new URL(page.url()).hash === '#EM5',
    'Destino de formación para equipos',
  );
  await page
    .locator('#EM5')
    .getByRole('link', { name: 'Consultar formación' })
    .click();
  check(
    new URL(page.url()).hash === '#EM6',
    'Destino del formulario de Empresas',
  );
  check(
    (await page.locator('#contact-type').inputValue()) === 'commercial',
    'Motivo comercial no preseleccionado',
  );
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/empresas/',
      '/formacion/',
      '/comunidad/',
      '/equipo/',
      '/ai-labs/',
      '/investigacion/',
    ]) {
      await page.goto(`${origin}${route}`);
      const copyright = page
        .locator('footer')
        .getByText(
          '© 2026 Fundación AI PlayGrounds. Todos los derechos reservados.',
          { exact: true },
        );
      check(await copyright.isVisible(), `Copyright ausente en ${route}`);
      const fits = await copyright.evaluate(async (node) => {
        await document.fonts.ready;
        const legal = node.getBoundingClientRect();
        const description = node.previousElementSibling.getBoundingClientRect();
        const art = node
          .closest('footer')
          .querySelector('.landscape-frame')
          .getBoundingClientRect();
        return (
          legal.left === description.left &&
          legal.top > description.bottom &&
          legal.bottom <= art.top
        );
      });
      check(
        fits,
        `Copyright desalineado o superpuesto en ${route} a ${width}px`,
      );
    }
  }
  check(errors.length === 0, errors.join('\n'));
  return 'Tres heroes y header sticky verificados en ocho anchos; también contenido, enlaces, formulario, copyright, hover y foco de cards.';
}
