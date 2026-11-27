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
  return 'Conexión verificada: color, radio, separación y movimiento en sitio y galería.';
}
