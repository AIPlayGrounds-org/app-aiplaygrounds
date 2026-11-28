/* global window, document, innerWidth, getComputedStyle, Event */
// See docs/implementation/empresas.md for the three local fixtures.
export default async function reviewCompanies(
  page,
  {
    base = 'http://127.0.0.1:4370',
    baseline = 'http://127.0.0.1:4371',
    enabled = 'http://127.0.0.1:4372',
  } = {},
) {
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const dir = '/tmp/opencode/empresas';
  const errors = [];
  await page
    .context()
    .route('**/favicon.ico', (route) => route.fulfill({ status: 204 }));
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      !message.text().includes('503 (Service Unavailable)')
    ) {
      errors.push(message.text());
    }
  });
  await page.addInitScript(() => {
    const events = [];
    Reflect.set(window, 'companyEvents', events);
    document.addEventListener('site:analytics', (event) =>
      events.push(event.detail),
    );
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [
    [1440, 900],
    [768, 1024],
    [390, 844],
    [320, 780],
  ]) {
    await page.setViewportSize({ width, height });
    for (const [url, name] of [
      [baseline + '/', 'antes-inicio'],
      [base + '/', 'inicio'],
      [base + '/empresas/', 'empresas'],
    ]) {
      const response = await page.goto(url);
      check(response?.ok(), `HTTP ${url}`);
      const state = await page.evaluate(async () => {
        await document.fonts.ready;
        const failures = [];
        for (const img of document.images) img.loading = 'eager';
        await Promise.all(
          [...document.images].map((img) =>
            img.decode().catch(() => failures.push(img.currentSrc)),
          ),
        );
        return {
          failures,
          overflow: document.documentElement.scrollWidth - innerWidth,
          h1: document.querySelectorAll('h1').length,
        };
      });
      check(
        !state.failures.length,
        `Imagen rota: ${state.failures.join(', ')}`,
      );
      check(
        state.overflow === 0 && state.h1 === 1,
        `${name} a ${width}: overflow/H1`,
      );
      await page.screenshot({
        path: `${dir}/${name}-${width}.png`,
        fullPage: true,
      });
    }
  }
  check(
    (await page.locator('#EM1 h1').textContent()) ===
      'Conecta tu organización con nuevas oportunidades en IA.',
    'H1',
  );
  check(
    (await page.locator('main > section').count()) === 5,
    'Cinco secciones',
  );
  check(
    (await page.locator('#EM6 :is(input, select, textarea)').count()) === 5,
    'Cinco campos',
  );
  check(
    await page.getByRole('button', { name: 'Enviar consulta' }).isDisabled(),
    'Envío cerrado sin configuración',
  );
  check(
    (await page.locator('script[src*="challenges.cloudflare.com"]').count()) ===
      0,
    'Sin Turnstile deshabilitado',
  );
  check(
    (await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )) === 'auto',
    'Scroll reducido',
  );
  const link = (cta) => page.locator(`a[data-cta="${cta}"]`);
  const type = page.locator('#contact-type');
  await link('hero_contact').click();
  check((await type.inputValue()) === '', 'Conversemos no elige tipo');
  check(page.url().endsWith('#EM6'), 'Ancla contacto');
  await page.locator('#contact-name').fill('Persona de prueba');
  for (const [id, expected] of [
    ['propose_alliance', 'institutional'],
    ['hero_contact', 'institutional'],
    ['propose_need', 'commercial'],
    ['ask_training', 'commercial'],
  ]) {
    await link(id).click();
    check((await type.inputValue()) === expected, `Preselección ${id}`);
    check(
      (await page.locator('#contact-name').inputValue()) ===
        'Persona de prueba',
      'Mantiene datos',
    );
  }
  await type.selectOption('institutional');
  check(
    (await type.inputValue()) === 'institutional',
    'Seleccionable manualmente',
  );
  await page.locator('.mobile-nav summary').click();
  await page.locator('.mobile-nav a[data-cta="header_opportunities"]').focus();
  await page.keyboard.press('Enter');
  check(page.url().endsWith('#EM2'), 'Ver opciones');
  check(
    !(await page.locator('.mobile-nav').evaluate((menu) => menu.open)),
    'Cierre del menú',
  );
  const events = await page.evaluate(() =>
    Reflect.get(window, 'companyEvents'),
  );
  check(
    events.filter((event) => event.name === 'cta_click').length === 6,
    'CTA sin duplicación',
  );
  check(
    events.filter((event) => event.name === 'form_start').length === 1,
    'Inicio único',
  );
  check(!JSON.stringify(events).includes('Persona de prueba'), 'Sin PII');
  check(
    !events.some((event) => event.name === 'generate_lead'),
    'No convierte sin recepción',
  );
  await link('view_trajectory').click();
  check(
    page.url().endsWith('/#I4') && (await page.locator('#I4 h2').isVisible()),
    'Trayectoria directa',
  );

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/empresas/`);
  check(
    (await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )) === 'smooth',
    'Scroll normal',
  );
  await page.locator('#EM1 [data-word]').first().waitFor({ state: 'attached' });
  await page.locator('#EM4').evaluate((section) => {
    window.scrollBy({
      top: section.getBoundingClientRect().top - 140,
      behavior: 'instant',
    });
  });
  await page
    .locator('#EM4 [data-signal-path][draw]')
    .first()
    .waitFor({ state: 'attached' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page
    .locator('#EM4 [data-signal-path][draw]')
    .first()
    .waitFor({ state: 'detached' });
  const noJS = await page
    .context()
    .browser()
    .newContext({ javaScriptEnabled: false });
  const plain = await noJS.newPage();
  await plain.goto(`${base}/empresas/`);
  check(await plain.locator('#EM4 h2').isVisible(), 'Contenido sin JS');
  check(
    await plain.locator('#EM6 button').isDisabled(),
    'Sin envío nativo desprotegido',
  );
  await noJS.close();

  // Both providers are intercepted. Nothing leaves the browser or reaches an inbox.
  const sent = [];
  let release;
  const firstResponse = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('https://challenges.cloudflare.com/**', async (route) => {
    await route.fulfill({
      contentType: 'application/javascript',
      body: 'window.turnstile={render:()=> "test-widget",getResponse:()=> "test-token",reset:()=>{}};',
    });
  });
  await page.route(`${enabled}/api/contact`, async (route) => {
    const payload = route.request().postDataJSON();
    sent.push(payload);
    if (sent.length === 1) {
      await firstResponse;
      await route.fulfill({ status: 503, json: { error: 'fixture' } });
    } else {
      await route.fulfill({
        status: 200,
        json: { status: 'accepted', requestId: payload.submissionId },
      });
    }
  });
  await page.goto(`${enabled}/empresas/`);
  await link('propose_alliance').click();
  await page.keyboard.press('Tab');
  check(
    await type.evaluate((control) => document.activeElement === control),
    'Orden de foco tras ancla',
  );
  await type.selectOption('commercial');
  const button = page.getByRole('button', { name: 'Enviar consulta' });
  await button.click();
  check(
    (await page.locator('#contact-name').getAttribute('aria-invalid')) ===
      'true',
    'ARIA error',
  );
  check(
    (await page.locator('#contact-name').getAttribute('aria-describedby')) ===
      'contact-name-error',
    'Error asociado',
  );
  check(
    await page
      .locator('#contact-name')
      .evaluate((control) => document.activeElement === control),
    'Foco en el primer error',
  );
  const name = page.locator('#contact-name');
  await name.fill('Persona de prueba');
  await page.locator('#contact-organization').fill('Organización de prueba');
  await page.locator('#contact-email').fill('mal-formato');
  await page.locator('#contact-message').fill('Consulta de prueba.');
  check(
    await page
      .getByText('Revisa el formato de tu correo electrónico.')
      .isVisible(),
    'Validación de email',
  );
  await page.locator('#contact-email').fill('persona@example.test');
  await page.waitForFunction(() => Reflect.has(window, 'turnstile'));
  await button.click();
  await page.getByText('Enviando…', { exact: true }).waitFor();
  check(await button.isDisabled(), 'Bloquea duplicados en vuelo');
  await page
    .locator('form')
    .evaluate((form) =>
      form.dispatchEvent(new Event('submit', { cancelable: true })),
    );
  release();
  await page
    .getByText(
      'No pudimos confirmar la recepción de tu consulta. Inténtalo de nuevo.',
      { exact: true },
    )
    .waitFor();
  check(sent.length === 1, 'Solo una petición en vuelo');
  check(
    (await name.inputValue()) === 'Persona de prueba',
    'Conserva datos ante error',
  );
  await button.click();
  await page
    .getByText(
      'Hemos recibido tu consulta. Gracias por compartir el contexto de tu organización.',
      { exact: true },
    )
    .waitFor();
  check(
    sent.length === 2 && sent[0].submissionId === sent[1].submissionId,
    'Mismo UUID al reintentar',
  );
  const enabledEvents = await page.evaluate(() =>
    Reflect.get(window, 'companyEvents'),
  );
  const leads = enabledEvents.filter((event) => event.name === 'generate_lead');
  check(leads.length === 1, 'Conversión única');
  check(
    leads[0].params.cta_origin === 'propose_alliance' &&
      leads[0].params.inquiry_type === 'commercial',
    'Origen y tipo final distintos',
  );
  check(
    enabledEvents.some(
      (event) =>
        event.name === 'form_error' && event.params.reason === 'submission',
    ),
    'Registra error de envío',
  );
  check(
    !/Persona de prueba|persona@example|submissionId/.test(
      JSON.stringify(enabledEvents),
    ),
    'Eventos sin PII ni UUID',
  );
  check(errors.length === 0, `Errores de consola: ${errors.join('; ')}`);
  return 'Inicio y Empresas: 4 viewports; navegación, formulario, tracking, movimiento y modo sin JS correctos.';
}
