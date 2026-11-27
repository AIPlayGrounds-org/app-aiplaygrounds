/* global document, getComputedStyle, window */
export default async function reviewDesignSystem(
  page,
  origin = 'http://localhost:4321',
  { gallery = true, contactEnabled = false } = {},
) {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const errors = [];
  const recordError = (error) => errors.push(error.message);
  page.on('pageerror', recordError);
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      for (const path of [
        '/',
        '/empresas/',
        '/formacion/',
        '/ai-labs/',
        '/investigacion/',
        '/equipo/',
        '/comunidad/',
        ...(gallery ? ['/design-system/'] : []),
      ]) {
        const response = await page.goto(`${origin}${path}`, {
          waitUntil: 'domcontentloaded',
        });
        assert(response.ok(), `${path}: HTTP ${response.status()}`);
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        assert(!overflow, `${path}: overflow horizontal a ${width}px`);
        assert(
          (await page.locator('[data-entering]').count()) === 0,
          'Movimiento reducido',
        );
      }
    }

    await page.goto(`${origin}/ai-labs/`);
    await page.locator('[data-directory][data-ready]').waitFor();
    const search = page.locator('[data-query]');
    await search.fill('xyzzy sin resultados');
    await page.locator('[data-no-results]').waitFor({ state: 'visible' });
    await page
      .getByRole('button', { name: 'Limpiar búsqueda', exact: true })
      .click();
    await page.locator('[data-no-results]').waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'Listado' }).click();
    assert(
      (await page.locator('[data-cards]').getAttribute('data-view')) === 'list',
      'Vista de listado',
    );
    await page.locator('[data-sort]').selectOption({ index: 1 });
    const facet = page.locator('.catalog-filters details').first();
    await facet.locator('summary').press('Enter');
    assert(await facet.evaluate((el) => el.open), 'Abrir faceta con teclado');
    await facet.locator('input[data-facet]').first().check();
    await page.locator('[data-active-filters]').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    assert(
      !(await facet.evaluate((el) => el.open)),
      'Cerrar faceta con Escape',
    );
    await page.locator('[data-clear-filters]').click();
    await page.locator('[data-active-filters]').waitFor({ state: 'hidden' });
    await page.locator('[data-more-toggle]').click();
    await page.locator('[data-advanced-region][data-open]').waitFor();
    await page.keyboard.press('Escape');
    assert(
      (await page
        .locator('[data-more-toggle]')
        .getAttribute('aria-expanded')) === 'false',
      'Cerrar filtros avanzados',
    );

    await page.setViewportSize({ width: 390, height: 950 });
    const opener = page.getByRole('button', { name: 'Filtros', exact: true });
    await opener.click();
    await page.locator('[data-filter-dialog][open]').waitFor();
    assert(
      await page
        .getByRole('button', { name: 'Cerrar filtros' })
        .evaluate((el) => el === document.activeElement),
      'Foco inicial del diálogo',
    );
    const dialog = page.locator('[data-filter-dialog]');
    await dialog.locator('summary').first().click();
    await dialog.locator('details[open] input[data-facet]').first().check();
    await dialog.locator('[data-panel-apply]').last().click();
    await dialog.waitFor({ state: 'hidden' });
    assert(
      await opener.evaluate((el) => el === document.activeElement),
      'Retorno de foco del diálogo',
    );
    await page.locator('[data-active-filters]').waitFor({ state: 'visible' });
    const mobile = page.locator('.mobile-nav summary');
    await mobile.press('Enter');
    await page.getByRole('navigation', { name: 'Navegación móvil' }).waitFor();
    await page.keyboard.press('Escape');
    await page
      .getByRole('navigation', { name: 'Navegación móvil' })
      .waitFor({ state: 'hidden' });

    await page.goto(`${origin}/investigacion/`);
    await page.locator('[data-directory][data-ready]').waitFor();
    assert(
      (await page
        .locator('[data-set-view="list"]')
        .getAttribute('aria-pressed')) === 'true',
      'Investigación comienza en listado',
    );
    await page.locator('[data-cards] [data-card-link]').first().click();
    await page.locator('main h1').waitFor();

    await page.goto(`${origin}/comunidad/`);
    await page.locator('[data-filter-controls]').waitFor();
    await page.locator('#event-search').fill('xyzzy sin resultados');
    await page.locator('[data-no-results]').waitFor();
    await page.locator('[data-clear]').click();
    await page.locator('[data-no-results]').waitFor({ state: 'hidden' });
    await page.locator('select[name="year"]').selectOption({ index: 1 });
    await page.locator('[data-clear]').waitFor();

    if (contactEnabled) {
      await page.route(
        'https://challenges.cloudflare.com/turnstile/**',
        (route) =>
          route.fulfill({
            contentType: 'application/javascript',
            body: 'window.turnstile={render:()=> "test-widget",getResponse:()=> "test-token",reset:()=>{}};',
          }),
      );
      let attempts = 0;
      await page.route('**/api/contact', async (route) => {
        const data = route.request().postDataJSON();
        attempts++;
        await route.fulfill(
          attempts === 1
            ? { status: 422, json: { field: 'email' } }
            : { json: { status: 'accepted', requestId: data.submissionId } },
        );
      });
      await page.goto(`${origin}/empresas/`);
      const submit = page.locator(
        '#organization-contact button[type="submit"]',
      );
      await submit.click();
      await page.locator('#contact-type[aria-invalid="true"]').waitFor();
      await page.selectOption('#contact-type', 'institutional');
      await page.fill('#contact-name', 'Persona de prueba');
      await page.fill('#contact-organization', 'Organización de prueba');
      await page.fill('#contact-email', 'prueba@example.com');
      await page.fill('#contact-message', 'Mensaje de validación local.');
      await submit.click();
      await page.locator('#organization-contact[data-state="error"]').waitFor();
      await page.locator('#contact-email[aria-invalid="true"]').waitFor();
      await page.fill('#contact-email', 'correccion@example.com');
      await submit.click();
      await page
        .locator('#organization-contact[data-state="success"]')
        .waitFor();
      assert(
        attempts === 2,
        'Validación, error 422 y envío confirmado con mocks',
      );
    } else {
      await page.goto(`${origin}/empresas/`);
      assert(
        await page
          .locator('#organization-contact button[type="submit"]')
          .isDisabled(),
        'Contacto deshabilitado sin configuración',
      );
    }
    await page.goto(`${origin}/formacion/`);
    assert(
      await page.locator('#academy-form button[type="submit"]').isDisabled(),
      'Convocatoria deshabilitada',
    );
    assert(
      await page
        .locator('#academy-form input[type="radio"]')
        .first()
        .isDisabled(),
      'Controles de Academy deshabilitados',
    );

    if (gallery) {
      await page.setViewportSize({ width: 1440, height: 950 });
      await page.goto(`${origin}/design-system/`);
      await page.locator('#gallery-search').fill('badge');
      assert(
        (await page.locator('#badge').isVisible()) &&
          !(await page.locator('#button').isVisible()),
        'Búsqueda en el catálogo',
      );
      await page.locator('#gallery-search').clear();
      await page.selectOption('#preview-theme', 'dark');
      await page.selectOption('#preview-width', '320');
      await page.selectOption('#button-variant', 'accent');
      await page.selectOption('#button-icon', 'only');
      await page
        .locator('#button form')
        .getByRole('button', { name: 'Actualizar ejemplo' })
        .click();
      const preview = page.locator('#button [data-gallery-frame]');
      await preview.getByRole('button', { name: 'Continuar' }).waitFor();
      assert(
        (await preview.getAttribute('data-theme')) === 'dark',
        'Tema de preview persistente',
      );
      assert(
        Math.round((await preview.boundingBox()).width) === 320,
        'Ancho del preview',
      );
      assert(
        (await page.locator('#button-code').textContent()).includes(
          'variant="accent"',
        ),
        'Código sincronizado',
      );
      await page
        .context()
        .grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
      await page.locator('#button [data-copy]').click();
      await page
        .locator('#button .copy-row [role="status"]')
        .getByText('Código copiado.')
        .waitFor();
      await page.getByRole('button', { name: 'Abrir diálogo' }).press('Enter');
      await page.getByRole('dialog', { name: 'Confirmar acción' }).waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      assert(
        await page
          .getByRole('button', { name: 'Abrir diálogo' })
          .evaluate((el) => el === document.activeElement),
        'Retorno de foco del ejemplo',
      );
      await page.locator('#dropdown summary').press('Enter');
      await page
        .locator('#dropdown')
        .getByRole('link', { name: 'Guía de uso' })
        .waitFor();
      await page.getByRole('tab', { name: 'Resumen' }).press('ArrowRight');
      assert(
        (await page
          .getByRole('tab', { name: 'Datos técnicos' })
          .getAttribute('aria-selected')) === 'true',
        'Teclado en Tabs',
      );
      await page.getByRole('tabpanel', { name: 'Datos técnicos' }).waitFor();
      await page.getByRole('tab', { name: 'Resumen' }).press('End');
      assert(
        await page
          .getByRole('tab', { name: 'Datos técnicos' })
          .evaluate(
            (el) =>
              el.matches(':focus-visible') &&
              getComputedStyle(el).outlineWidth !== '0px',
          ),
        'Foco visible en Tabs',
      );
      await page
        .locator('#accordion details')
        .last()
        .locator('summary')
        .press('Enter');
      assert(
        (await page.locator('#accordion details[open]').count()) === 2,
        'Accordion no exclusivo',
      );
      assert(
        (await page
          .locator('#pagination a')
          .first()
          .getAttribute('aria-disabled')) === 'true',
        'Extremo de paginación deshabilitado',
      );
      const action = page.locator('#button [data-gallery-frame] button');
      const color = await action.evaluate(
        (el) => getComputedStyle(el).backgroundColor,
      );
      await action.hover();
      assert(
        (await action.evaluate(
          (el) => getComputedStyle(el).backgroundColor,
        )) !== color,
        'Hover real en Button',
      );
      const contrast = await page.locator('[data-contrast]').allTextContents();
      assert(
        contrast.every((text) => Number.parseFloat(text) >= 4.5),
        `Contrastes AA: ${contrast.join(', ')}`,
      );
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto(`${origin}/empresas/`);
    const card = page
      .locator('[data-card-interactive][data-reveal="card"]')
      .first();
    await card.scrollIntoViewIfNeeded();
    await card.locator('[data-card-link]').hover();
    assert(
      (await card.evaluate((el) =>
        getComputedStyle(el).getPropertyValue('--surface-motion').trim(),
      )) === '1',
      'Feedback de movimiento al pasar el puntero por una tarjeta',
    );
    assert(errors.length === 0, errors.join('\n'));
    return `Playwright: navegación, formularios, directorios, movimiento y responsive${gallery ? ', incluido el catálogo' : ''}.`;
  } finally {
    page.off('pageerror', recordError);
  }
}
