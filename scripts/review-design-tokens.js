/* global getComputedStyle, document, requestAnimationFrame */

// Change tokens in the browser context only; no source files are edited.
export default async function reviewDesignTokens(page, origin) {
  for (const [path, selector] of [
    ['/formacion/', '#contenido [data-slot="button"][data-variant="primary"]'],
    ['/design-system/', '#button .preview-frame [data-slot="button"]'],
  ]) {
    await page.goto(`${origin}${path}`);
    const button = page.locator(selector).first();
    const read = () =>
      button.evaluate(async (element) => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        element.getBoundingClientRect(); // Flush the temporary stylesheet before reading transitions.
        await Promise.allSettled(
          element.getAnimations().map((animation) => animation.finished),
        );
        const style = getComputedStyle(element);
        return [
          style.backgroundColor,
          style.borderRadius,
          style.columnGap,
          style.transitionDuration,
        ];
      });
    await button.waitFor();
    const before = await read();
    const change = await page.addStyleTag({
      content: `
      :root, [data-theme='light'] {
        --primary: rgb(22 44 66);
        --radius-small: 13px;
        --button-icon-gap: 21px;
        --duration-control: 333ms;
      }
    `,
    });
    const expected = ['rgb(22, 44, 66)', '13px', '21px', '0.333s'];
    if (JSON.stringify(await read()) !== JSON.stringify(expected)) {
      throw new Error(
        `${path}: los tokens no se propagaron al botón (${await read()}).`,
      );
    }
    await change.evaluate((style) => style.remove());
    if (JSON.stringify(await read()) !== JSON.stringify(before)) {
      throw new Error(`${path}: el botón no volvió al estado original.`);
    }
  }
  const consumers = [
    {
      site: '/',
      targets: [
        ['#I3 [data-slot="card"]', 'backgroundColor', 'rgb(224, 222, 212)'],
        ['#I2 h2', 'fontSize', '31px'],
        ['#I2 .text-link svg', 'width', '23px'],
      ],
    },
    {
      site: '/empresas/',
      targets: [['#contact-name', 'borderRadius', '13px']],
    },
    {
      site: '/ai-labs/',
      targets: [
        ['main [data-badge]', 'fontSize', '16px'],
        [
          '.facet[data-dropdown] > .facet-options',
          'boxShadow',
          'rgb(20, 30, 40) 0px 2px 5px 0px',
        ],
        ['.facet[data-dropdown] > .facet-options', 'borderTopWidth', '3px'],
      ],
    },
    {
      site: '/equipo/',
      targets: [
        [
          '.vertical-icon[data-vertical="foundations"]',
          'backgroundColor',
          'rgb(230, 191, 212)',
        ],
        ['.team-card .links a', 'borderRadius', '13px'],
      ],
    },
    {
      site: '/formacion/',
      targets: [['.form-cta .conversion-surface', 'borderRadius', '19px']],
    },
    {
      site: '/design-system/',
      targets: [
        [
          '#card .preview-frame [data-slot="card"]',
          'backgroundColor',
          'rgb(224, 222, 212)',
        ],
        ['#card .preview-frame [data-slot="card"]', 'paddingTop', '29px'],
        ['#sectionheading h2', 'fontSize', '31px'],
        ['#textlink svg', 'width', '23px'],
        ['#example-Input', 'borderRadius', '13px'],
        ['#badge .preview-frame [data-badge]', 'fontWeight', '600'],
        [
          '#dropdown .ui-dropdown-panel',
          'boxShadow',
          'rgb(20, 30, 40) 0px 2px 5px 0px',
        ],
        ['#card .preview-frame [data-slot="card"]', 'borderTopWidth', '3px'],
      ],
    },
  ];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const { site, targets } of consumers) {
    await page.goto(`${origin}${site}`);
    const read = ([selector, property]) =>
      page
        .locator(selector)
        .first()
        .evaluate(
          (element, property) => getComputedStyle(element)[property],
          property,
        );
    const before = await Promise.all(targets.map(read));
    const change = await page.addStyleTag({
      content: `
      :root, [data-theme='light'] {
        --surface-elevated: rgb(224 222 212);
        --editorial-surface: rgb(224 222 212);
        --card-padding-md: 29px;
        --type-section: 31px;
        --type-label: 16px;
        --weight-medium: 600;
        --icon-chevron: 23px;
        --radius-small: 13px;
        --radius-large: 19px;
        --stroke-default: 3px;
        --shadow-overlay: 0 2px 5px rgb(20 30 40);
        --shadow-popover: 0 2px 5px rgb(20 30 40);
        --terrain-connection-light: rgb(230 191 212);
      }
    `,
    });
    try {
      for (const target of targets) {
        const actual = await read(target);
        if (actual !== target[2])
          throw new Error(
            `${site} ${target[0]}: ${target[1]} calculado ${actual}; se esperaba ${target[2]}.`,
          );
      }
    } finally {
      await change.evaluate((style) => style.remove());
    }
    if (
      JSON.stringify(await Promise.all(targets.map(read))) !==
      JSON.stringify(before)
    )
      throw new Error(`${site}: los valores originales no se restauraron.`);
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const stage = page.locator('#motion-entrance-exit [data-motion-stage]');
  await stage.evaluate((element) => {
    element.style.setProperty('--duration-entrance', '999ms');
    element.style.setProperty('--motion-stagger-group', '133ms');
    element.style.setProperty('--motion-delay-group-max', '150ms');
    element.style.setProperty('--motion-scale-card', '0.92');
    element.style.setProperty('--motion-distance-card', '37px');
  });
  const demo = page.locator('#motion-entrance-exit');
  await demo.locator('[data-motion-field="mode"]').selectOption('group');
  await demo.locator('[data-motion-action="play"]').click();
  await demo
    .locator('[data-motion-status]')
    .getByText('En reproducción.')
    .waitFor();
  const keyframes = await stage
    .locator('[data-motion-item]')
    .evaluateAll((items) =>
      items.map(
        (item) =>
          item.getAnimations().flatMap(({ effect }) => {
            const frame = effect?.getKeyframes()[0];
            return frame?.scale || frame?.['--scale']
              ? [
                  [
                    effect.getTiming().duration,
                    effect.getTiming().delay,
                    Number(frame.scale ?? frame['--scale']),
                  ],
                ]
              : [];
          })[0],
      ),
    );
  if (
    JSON.stringify(keyframes) !==
    JSON.stringify([
      [999, 0, 0.92],
      [999, 133, 0.92],
      [999, 150, 0.92],
    ])
  )
    throw new Error(
      `Anime.js no leyó los tokens esperados: ${JSON.stringify(keyframes)}`,
    );
  const travel = await stage
    .locator('[data-motion-item]')
    .first()
    .evaluate((item) =>
      item
        .getAnimations()
        .flatMap(({ effect }) => effect?.getKeyframes() ?? [])
        .some(
          (frame) =>
            frame.translate === '0px 37px' || frame.translate === '0 37px',
        ),
    );
  if (!travel)
    throw new Error('Anime.js no leyó el desplazamiento del token de tarjeta.');
  await demo.locator('[data-motion-action="reset"]').click();
  await stage.evaluate((element) => {
    for (const token of [
      '--duration-entrance',
      '--motion-stagger-group',
      '--motion-delay-group-max',
      '--motion-scale-card',
      '--motion-distance-card',
    ])
      element.style.removeProperty(token);
  });
  const trace = page.locator('#button .entry-usage');
  await trace.locator('summary').click();
  const text = await trace.innerText();
  for (const expected of [
    'src/components/ui/Button.astro',
    'src/pages/formacion.astro',
    'Páginas: mediante composición',
  ]) {
    if (!text.includes(expected))
      throw new Error(`Falta en trazabilidad: ${expected}`);
  }
  if (
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    )
  ) {
    throw new Error('La trazabilidad produce overflow.');
  }
  return 'Conexión verificada: átomos, compuestos y dominio, bordes, sombras y tiempos, escala y distancia de Anime.js.';
}
