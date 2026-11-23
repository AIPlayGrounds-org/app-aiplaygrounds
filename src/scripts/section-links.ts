import { inquiry } from './analytics';

export function wireSectionLinks(root: Document) {
  root.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-cta][href]');
    if (
      !link?.hash ||
      link.pathname !== location.pathname ||
      link.origin !== location.origin
    )
      return;
    const section = root.getElementById(link.hash.slice(1));
    if (!section) return;
    const form = section.querySelector<HTMLFormElement>(
      'form[data-cta-origin]',
    );
    if (!form || form.dataset.state === 'sending') return;
    form.dataset.ctaOrigin = link.dataset.cta;
    const type = inquiry(link.dataset.inquiryType);
    const select = form.elements.namedItem(form.dataset.inquiryField ?? '');
    if (type && select instanceof HTMLSelectElement && !select.disabled) {
      select.value = type;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    // Let native navigation manage scrolling, focus, and browser history.
  });
}
