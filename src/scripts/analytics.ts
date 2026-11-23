type Inquiry = 'institutional' | 'commercial';
type FormContext = {
  page: string;
  form_id: string;
  cta_origin: string;
  inquiry_type?: Inquiry;
};
type SiteEvents = {
  cta_click: {
    page: string;
    section: string;
    cta_id: string;
    destination: string;
    destination_type: 'section' | 'page';
    inquiry_type?: Inquiry;
  };
  form_start: FormContext;
  form_error: FormContext & {
    reason: 'validation' | 'verification' | 'submission';
  };
  generate_lead: FormContext;
};

// In-memory interface only. An approved, opted-in adapter can subscribe to it.
export function track<K extends keyof SiteEvents>(
  name: K,
  params: SiteEvents[K],
) {
  document.dispatchEvent(
    new CustomEvent('site:analytics', { detail: { name, params } }),
  );
}

export function inquiry(value?: string): Inquiry | undefined {
  return value === 'institutional' || value === 'commercial'
    ? value
    : undefined;
}

export function trackLinks(root: Document, page: string) {
  const onLink = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.origin !== location.origin) return;
    const context = link.closest('header, footer');
    const section =
      context?.tagName.toLowerCase() ?? link.closest('main section')?.id;
    if (!section || (!link.dataset.cta && !context)) return;
    const destination = link.pathname + link.hash; // Never forward acquisition parameters.
    track('cta_click', {
      page,
      section,
      cta_id: link.dataset.cta ?? `nav:${destination}`,
      destination,
      destination_type:
        link.pathname === location.pathname && link.hash ? 'section' : 'page',
      inquiry_type: inquiry(link.dataset.inquiryType),
    });
  };
  root.addEventListener('click', onLink);
  root.addEventListener('auxclick', (event) => {
    if (event.button === 1) onLink(event);
  });
}
