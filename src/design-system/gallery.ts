export {};

const search = document.querySelector<HTMLInputElement>('#gallery-search');
const status = document.getElementById('catalog-status');
const articles = [
  ...document.querySelectorAll<HTMLElement>('[data-gallery-component]'),
];
const nav = [...document.querySelectorAll<HTMLElement>('[data-nav-component]')];
const motionExamples = [
  ...document.querySelectorAll<HTMLElement>('[data-motion-search]'),
];
const motionNav = new Map(
  [...document.querySelectorAll<HTMLElement>('[data-motion-nav]')].map(
    (item) => [item.dataset.motionNav, item],
  ),
);

search?.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const [index, article] of articles.entries()) {
    const visible = Boolean(
      article.querySelector('h3')?.textContent?.toLowerCase().includes(query) ||
      article
        .querySelector('h3 + p')
        ?.textContent?.toLowerCase()
        .includes(query),
    );
    article.hidden = !visible;
    nav[index].hidden = !visible;
    if (visible) count++;
  }
  let patterns = 0;
  for (const example of motionExamples) {
    const visible =
      example.dataset.motionSearch?.toLowerCase().includes(query) ?? false;
    example.hidden = !visible;
    const navItem = motionNav.get(example.dataset.motionDemo);
    if (navItem) navItem.hidden = !visible;
    if (visible) patterns++;
  }
  if (status)
    status.textContent = query
      ? `${count} componentes y ${patterns} patrones de movimiento.`
      : '';
});

function markLocation() {
  for (const item of document.querySelectorAll('.gallery-sidebar nav a')) {
    if (item.getAttribute('href') === window.location.hash)
      item.setAttribute('aria-current', 'location');
    else item.removeAttribute('aria-current');
  }
}
window.addEventListener('hashchange', markLocation);
markLocation();

const themes = document.querySelectorAll<HTMLElement>('[data-gallery-theme]');
const frames = document.querySelectorAll<HTMLElement>('[data-gallery-frame]');
const theme = document.querySelector<HTMLSelectElement>('#preview-theme');
const width = document.querySelector<HTMLSelectElement>('#preview-width');

function luminance(color: string) {
  const rgb = color.match(/^#([\da-f]{6})$/i)?.[1].match(/../g);
  if (!rgb) return NaN;
  return rgb.reduce((sum, part, i) => {
    const value = Number.parseInt(part, 16) / 255;
    return (
      sum +
      [0.2126, 0.7152, 0.0722][i] *
        (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    );
  }, 0);
}

function renderTokens() {
  for (const output of document.querySelectorAll<HTMLOutputElement>(
    '[data-token]',
  )) {
    const value = getComputedStyle(output)
      .getPropertyValue(output.dataset.token ?? '')
      .trim();
    output.value = value.startsWith('#') ? value.toUpperCase() : value;
  }
  for (const output of document.querySelectorAll<HTMLOutputElement>(
    '[data-contrast]',
  )) {
    const styles = getComputedStyle(output);
    const [a, b] = (output.dataset.contrast ?? '')
      .split(' ')
      .map((token) => luminance(styles.getPropertyValue(token).trim()));
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    output.value = `${ratio.toFixed(2)}:1${ratio >= 4.5 ? ' · AA texto' : ''}`;
  }
}

theme?.addEventListener('change', () => {
  for (const region of themes) region.dataset.theme = theme.value;
  for (const field of document.querySelectorAll<HTMLInputElement>(
    '.play-controls input[name="theme"]',
  ))
    field.value = theme.value;
  renderTokens();
});
width?.addEventListener('change', () => {
  for (const frame of frames)
    frame.style.setProperty(
      '--preview-width',
      width.value === 'auto' ? '100%' : `${width.value}px`,
    );
  for (const field of document.querySelectorAll<HTMLInputElement>(
    '.play-controls input[name="viewport"]',
  ))
    field.value = width.value;
});
renderTokens();

for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-copy]',
)) {
  let timer = 0;
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy ?? '');
    const feedback = button.nextElementSibling;
    if (!code || !feedback) return;
    window.clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(code.innerText);
      feedback.textContent = 'Código copiado.';
    } catch {
      feedback.textContent =
        'No se pudo copiar. Selecciona el código para copiarlo.';
    }
    timer = window.setTimeout(() => {
      feedback.textContent = '';
    }, 3500);
  });
}

for (const trigger of document.querySelectorAll<HTMLButtonElement>(
  '[data-gallery-dialog]',
)) {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.galleryDialog ?? '');
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
  });
}

for (const toggle of document.querySelectorAll('[data-gallery-view]')) {
  const buttons = toggle.querySelectorAll<HTMLButtonElement>(
    'button[data-set-view]',
  );
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const item of buttons)
        item.setAttribute('aria-pressed', String(button === item));
    });
  }
}
