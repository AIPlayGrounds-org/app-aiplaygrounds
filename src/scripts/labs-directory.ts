import {
  directoryLimits,
  evaluateDirectory,
  sortOptions,
  sortProducts,
  type IndexedProduct,
  type Sort,
} from '../data/labs-directory';

function mount(catalog: HTMLElement) {
  const get = <T extends HTMLElement>(selector: string) =>
    catalog.querySelector<T>(selector)!;
  const query = get<HTMLInputElement>('#labs-query');
  const sort = catalog.querySelector<HTMLSelectElement>('[data-sort]');
  const checkboxes = [
    ...catalog.querySelectorAll<HTMLInputElement>('[data-facet]'),
  ];
  const cards = get<HTMLUListElement>('[data-cards]');
  const list = [...cards.querySelectorAll<HTMLElement>('[data-product]')].map(
    (element) => ({
      element,
      product: JSON.parse(element.dataset.product!) as IndexedProduct,
      link: element.querySelector<HTMLAnchorElement>('[data-card-link]')!,
    }),
  );
  const searchClear = get<HTMLButtonElement>('[data-clear-query]');
  const count = get<HTMLParagraphElement>('[data-count]');
  const active = get<HTMLElement>('[data-active-filters]');
  const tags = get<HTMLUListElement>('[data-tags]');
  const pages = catalog.querySelector<HTMLElement>('[data-pages]');
  const viewButtons = [
    ...catalog.querySelectorAll<HTMLButtonElement>('[data-set-view]'),
  ];
  const mobileFilter =
    catalog.querySelector<HTMLButtonElement>('.mobile-filter');
  const dropdowns = [
    ...catalog.querySelectorAll<HTMLDetailsElement>('details[data-dropdown]'),
  ];
  const desktop = window.matchMedia('(min-width: 58rem)');
  let page = 1;
  let view = 'grid';
  let currentSort: Sort = 'recent';

  function urlParams(pageNumber: number) {
    const params = new URLSearchParams();
    if (query.value.trim()) params.set('q', query.value.trim());
    for (const input of checkboxes) {
      if (input.checked) params.append(input.name, input.value);
    }
    if (sort && sort.value !== 'recent') params.set('sort', sort.value);
    if (view === 'list') params.set('view', view);
    if (pageNumber > 1) params.set('page', String(pageNumber));
    return params;
  }

  function render(historyAction?: 'pushState' | 'replaceState') {
    const filters = new Map<string, Set<string>>();
    const selected = checkboxes.filter(({ checked }) => checked);
    for (const { name, value } of selected) {
      const values = filters.get(name) ?? new Set<string>();
      values.add(value);
      filters.set(name, values);
    }

    const nextSort = (sort?.value ?? 'recent') as Sort;
    if (nextSort !== currentSort) {
      list.sort((a, b) => sortProducts(a.product, b.product, nextSort));
      for (const { element } of list) cards.append(element);
      currentSort = nextSort;
    }
    const { results, counts } = evaluateDirectory(
      list.map(({ product }) => product),
      query.value,
      filters,
    );
    const size = pages ? directoryLimits.pageSize : list.length;
    const pageCount = Math.max(1, Math.ceil(results.length / size));
    page = Math.min(pageCount, page);
    const visible = new Set(
      results.slice((page - 1) * size, page * size).map(({ id }) => id),
    );
    const params = urlParams(page).toString();
    for (const { element, product, link } of list) {
      element.hidden = !visible.has(product.id);
      if (element.hidden) continue;
      const href = new URL(link.href);
      href.search = '';
      if (params) href.searchParams.set('from', params);
      link.href = href.pathname + href.search;
    }
    searchClear.hidden = query.value.length === 0;
    cards.dataset.view = view;
    for (const button of viewButtons)
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.setView === view),
      );
    const resultLabel = `${results.length} ${results.length === 1 ? 'producto' : 'productos'}`;
    if (count.textContent !== resultLabel) count.textContent = resultLabel;
    get<HTMLElement>('[data-no-results]').hidden = results.length > 0;

    for (const input of checkboxes) {
      const value = counts.get(input.name)?.get(input.value) ?? 0;
      const [visibleCount, spokenCount] = input.parentElement!.querySelector(
        '[data-option-count]',
      )!.children;
      visibleCount.textContent = String(value);
      spokenCount.textContent = `${value} ${value === 1 ? 'producto' : 'productos'}`;
    }
    // Keep existing tag elements when their selection hasn't changed, including keyboard focus.
    for (const item of [...tags.children]) {
      if (!selected.some((input) => item.id === tagId(input))) item.remove();
    }
    for (const input of selected) {
      if (document.getElementById(tagId(input))) continue;
      const item = document.createElement('li');
      const button = document.createElement('button');
      const label = input.parentElement!.querySelector(
        '[data-option-label]',
      )!.textContent!;
      item.id = tagId(input);
      button.type = 'button';
      button.textContent = `${label} ×`;
      button.setAttribute('aria-label', `Quitar filtro: ${label}`);
      button.addEventListener('click', () => {
        const neighbor = item.nextElementSibling ?? item.previousElementSibling;
        input.checked = false;
        update();
        (neighbor?.querySelector<HTMLButtonElement>('button') ?? query).focus();
      });
      item.append(button);
      tags.append(item);
    }
    active.hidden = selected.length === 0;

    if (pages) {
      pages.hidden = pageCount < 2;
      get('[data-page-label]').textContent = `Página ${page} de ${pageCount}`;
      for (const link of pages.querySelectorAll<HTMLAnchorElement>(
        'a[data-step]',
      )) {
        const target = page + Number(link.dataset.step);
        const enabled = target >= 1 && target <= pageCount;
        link.setAttribute('aria-disabled', String(!enabled));
        if (enabled) {
          const nextParams = urlParams(target).toString();
          link.href = `${location.pathname}${nextParams ? `?${nextParams}` : ''}#B3`;
        } else {
          link.removeAttribute('href');
        }
      }
    }

    const search = params ? `?${params}` : '';
    if (historyAction && search !== location.search) {
      history[historyAction](
        null,
        '',
        `${location.pathname}${search}${location.hash}`,
      );
    }
  }

  function restore() {
    const params = new URLSearchParams(location.search);
    query.value = params.get('q') ?? '';
    for (const input of checkboxes)
      input.checked = params.getAll(input.name).includes(input.value);
    const ordering = params.get('sort') ?? '';
    if (sort)
      sort.value = Object.hasOwn(sortOptions, ordering) ? ordering : 'recent';
    view = sort && params.get('view') === 'list' ? 'list' : 'grid';
    const requestedPage = Number(params.get('page'));
    page =
      pages && Number.isSafeInteger(requestedPage) && requestedPage >= 1
        ? requestedPage
        : 1;
    render('replaceState');
  }

  function update(historyAction: 'pushState' | 'replaceState' = 'pushState') {
    page = 1;
    render(historyAction);
  }

  function clearFilters() {
    for (const input of checkboxes) input.checked = false;
  }

  function tagId(input: HTMLInputElement) {
    return `active-${checkboxes.indexOf(input)}`;
  }

  get<HTMLFormElement>('[data-search]').addEventListener('submit', (event) => {
    event.preventDefault();
    update();
  });
  query.addEventListener('input', () => update('replaceState'));
  searchClear.addEventListener('click', () => {
    query.value = '';
    update();
    query.focus();
  });
  sort?.addEventListener('change', () => update());
  for (const input of checkboxes)
    input.addEventListener('change', () => update());
  for (const button of viewButtons) {
    button.addEventListener('click', () => {
      view = button.dataset.setView!;
      render('pushState');
    });
  }
  get('[data-clear-filters]').addEventListener('click', () => {
    clearFilters();
    update();
    query.focus();
  });
  get('[data-reset]').addEventListener('click', () => {
    clearFilters();
    query.value = '';
    update();
    query.focus();
  });
  for (const link of pages?.querySelectorAll<HTMLAnchorElement>(
    'a[data-step]',
  ) ?? []) {
    link.addEventListener('click', (event) => {
      if (
        !link.hasAttribute('href') ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      page += Number(link.dataset.step);
      render('pushState');
      count.focus();
    });
  }
  mobileFilter?.addEventListener('click', () => {
    mobileFilter.setAttribute(
      'aria-expanded',
      String(mobileFilter.getAttribute('aria-expanded') !== 'true'),
    );
  });
  document.addEventListener('click', ({ target }) => {
    if (!desktop.matches || !(target instanceof Node)) return;
    for (const dropdown of dropdowns) {
      if (!dropdown.contains(target)) {
        if (dropdown.contains(document.activeElement))
          dropdown.querySelector('summary')?.focus();
        dropdown.open = false;
      }
    }
  });
  catalog.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !(event.target instanceof Element)) return;
    const disclosure =
      event.target.closest<HTMLDetailsElement>('details[open]');
    if (disclosure) {
      disclosure.open = false;
      disclosure.querySelector('summary')?.focus();
    } else if (
      !desktop.matches &&
      mobileFilter?.getAttribute('aria-expanded') === 'true' &&
      event.target.closest('#labs-filters, .mobile-filter')
    ) {
      mobileFilter.setAttribute('aria-expanded', 'false');
      mobileFilter.focus();
    }
  });
  window.addEventListener('popstate', restore);
  restore();
  catalog.dataset.ready = '';
}

const catalog = document.querySelector<HTMLElement>('[data-labs-directory]');
if (catalog) mount(catalog);
