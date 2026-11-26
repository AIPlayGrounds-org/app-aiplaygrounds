import {
  evaluateDirectory,
  paginateDirectory,
  readDirectoryState,
  sortDirectory,
  writeDirectoryState,
  type DirectoryItem,
  type Sort,
  type DirectoryView,
} from '../data/directory';

function mount(catalog: HTMLElement) {
  const get = <T extends HTMLElement>(selector: string) =>
    catalog.querySelector<T>(selector)!;
  const query = get<HTMLInputElement>('[data-query]');
  const sort = catalog.querySelector<HTMLSelectElement>('[data-sort]');
  const checkboxes = [
    ...catalog.querySelectorAll<HTMLInputElement>('[data-facet]'),
  ];
  const cards = get<HTMLUListElement>('[data-cards]');
  const list = [...cards.querySelectorAll<HTMLElement>('[data-entry]')].map(
    (element) => ({
      element,
      entry: JSON.parse(element.dataset.entry!) as DirectoryItem,
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
  const mobile = window.matchMedia('(width < 40rem)');
  const dialog = catalog.querySelector<HTMLDialogElement>(
    '[data-filter-dialog]',
  );
  const filterContent = catalog.querySelector<HTMLElement>(
    '[data-filter-content]',
  );
  const filterHome = catalog.querySelector<HTMLElement>('[data-filter-home]');
  const drawerContent = dialog?.querySelector<HTMLElement>(
    '[data-drawer-content]',
  );
  const advanced = catalog.querySelector<HTMLElement>('[data-advanced-panel]');
  const advancedActions = advanced?.querySelector('.advanced-actions');
  const drawerActions = dialog?.querySelector('[data-drawer-actions]');
  const advancedRegion = catalog.querySelector<HTMLElement>(
    '[data-advanced-region]',
  );
  const more = catalog.querySelector<HTMLButtonElement>('[data-more-toggle]');
  const badge = catalog.querySelector<HTMLElement>('[data-advanced-count]');
  const applied = new Set<HTMLInputElement>();
  const inPanel = (input: HTMLInputElement) =>
    dialog?.open || input.hasAttribute('data-advanced');
  let page = 1;
  const defaultView = cards.dataset.view as DirectoryView;
  const { singular, plural, section } = catalog.dataset;
  let view = defaultView;
  let currentSort: Sort = 'recent';
  let editingQuery = false;

  function render(historyAction?: 'pushState' | 'replaceState') {
    const filters = new Map<string, Set<string>>();
    const selected = checkboxes.filter((input) => applied.has(input));
    for (const { name, value } of selected) {
      const values = filters.get(name) ?? new Set<string>();
      values.add(value);
      filters.set(name, values);
    }

    const nextSort = (sort?.value ?? 'recent') as Sort;
    if (nextSort !== currentSort) {
      list.sort((a, b) => sortDirectory(a.entry, b.entry, nextSort));
      for (const { element } of list) cards.append(element);
      currentSort = nextSort;
    }
    const { results, counts } = evaluateDirectory(
      list.map(({ entry }) => entry),
      query.value,
      filters,
    );
    const pagination = paginateDirectory(results, page);
    const { pageCount } = pagination;
    page = pagination.page;
    const visible = new Set(pagination.results.map(({ id }) => id));
    const urlParams = (pageNumber: number) =>
      writeDirectoryState(
        {
          query: query.value,
          filters,
          sort: currentSort,
          view,
          page: pageNumber,
        },
        defaultView,
      ).toString();
    const params = urlParams(page);
    for (const { element, entry, link } of list) {
      element.hidden = !visible.has(entry.id);
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
    const resultLabel = `${results.length} ${results.length === 1 ? singular : plural}`;
    if (count.textContent !== resultLabel) count.textContent = resultLabel;
    get<HTMLElement>('[data-no-results]').hidden = results.length > 0;

    for (const input of checkboxes) {
      const value = counts.get(input.name)?.get(input.value) ?? 0;
      const [visibleCount, spokenCount] = input.parentElement!.querySelector(
        '[data-option-count]',
      )!.children;
      visibleCount.textContent = String(value);
      spokenCount.textContent = `${value} ${value === 1 ? singular : plural}`;
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
        applied.delete(input);
        update();
        (neighbor?.querySelector<HTMLButtonElement>('button') ?? query).focus();
      });
      item.append(button);
      tags.append(item);
    }
    active.hidden = selected.length === 0;
    if (badge) {
      const total = selected.filter((input) =>
        input.hasAttribute('data-advanced'),
      ).length;
      badge.hidden = total === 0;
      badge.textContent = String(total);
      badge.setAttribute('aria-label', `${total} filtros secundarios activos`);
    }
    updateSummaries();

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
          const nextParams = urlParams(target);
          link.href = `${location.pathname}${nextParams ? `?${nextParams}` : ''}#${section}`;
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
    const state = readDirectoryState(
      new URLSearchParams(location.search),
      checkboxes,
      { sortable: Boolean(sort), paginated: Boolean(pages), defaultView },
    );
    editingQuery = false;
    applied.clear();
    for (const input of checkboxes) {
      if (state.filters.get(input.name)?.has(input.value)) applied.add(input);
    }
    if (dialog?.open) dialog.close();
    setPanel(false);
    restoreSelections();
    query.value = state.query;
    if (sort) sort.value = state.sort;
    view = state.view;
    page = state.page;
    render('replaceState');
  }

  function update(historyAction: 'pushState' | 'replaceState' = 'pushState') {
    page = 1;
    render(historyAction);
  }

  function clearFilters() {
    for (const input of checkboxes) input.checked = false;
    applied.clear();
  }

  function restoreSelections() {
    for (const input of checkboxes) input.checked = applied.has(input);
    updateSummaries();
  }

  function updateSummaries() {
    for (const facet of catalog.querySelectorAll<HTMLElement>(
      '.advanced-facet',
    )) {
      const inputs = [
        ...facet.querySelectorAll<HTMLInputElement>('input:checked'),
      ];
      const summary = facet.querySelector<HTMLElement>('[data-facet-summary]')!;
      summary.textContent =
        inputs.length === 0
          ? 'Todas'
          : inputs.length === 1
            ? inputs[0].parentElement!.querySelector('[data-option-label]')!
                .textContent
            : `${inputs.length} seleccionadas`;
    }
  }

  function tagId(input: HTMLInputElement) {
    return `${catalog.dataset.directory}-active-${checkboxes.indexOf(input)}`;
  }

  get<HTMLFormElement>('[data-search]').addEventListener('submit', (event) => {
    event.preventDefault();
    update();
  });
  query.addEventListener('input', () => {
    const previousSearch = location.search;
    update(editingQuery ? 'replaceState' : 'pushState');
    editingQuery ||= location.search !== previousSearch;
  });
  query.addEventListener('blur', () => {
    editingQuery = false;
  });
  searchClear.addEventListener('click', () => {
    query.value = '';
    update();
    query.focus();
  });
  sort?.addEventListener('change', () => update());
  for (const input of checkboxes)
    input.addEventListener('change', () => {
      if (inPanel(input)) {
        updateSummaries();
        return;
      }
      if (input.checked) applied.add(input);
      else applied.delete(input);
      update();
    });
  for (const button of viewButtons) {
    button.addEventListener('click', () => {
      view = button.dataset.setView === 'list' ? 'list' : 'grid';
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
  function setPanel(open: boolean) {
    if (!advanced || !advancedRegion || !more) return;
    advancedRegion.toggleAttribute('data-open', open);
    advanced.inert = !open;
    more.setAttribute('aria-expanded', String(open));
    if (!open) {
      restoreSelections();
      for (const detail of advanced.querySelectorAll<HTMLDetailsElement>(
        'details[open]',
      ))
        detail.open = false;
    }
  }
  more?.addEventListener('click', () =>
    setPanel(more.getAttribute('aria-expanded') !== 'true'),
  );
  mobileFilter?.addEventListener('click', () => {
    if (!dialog || !filterContent || !drawerContent) return;
    setPanel(false);
    restoreSelections();
    for (const detail of dropdowns) detail.open = false;
    drawerContent.append(filterContent);
    if (advancedActions) drawerActions?.append(advancedActions);
    if (advanced) advanced.inert = false;
    dialog.showModal();
  });
  dialog?.addEventListener('close', async () => {
    if (dialog.open) return;
    restoreSelections();
    for (const detail of dropdowns) detail.open = false;
    await Promise.all(
      dialog
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    );
    if (dialog.open) return;
    if (advancedActions) advanced?.append(advancedActions);
    if (filterContent && filterHome) filterHome.append(filterContent);
    setPanel(false);
    if (!mobile.matches && document.activeElement === document.body)
      query.focus();
  });
  mobile.addEventListener('change', () => {
    if (!mobile.matches && dialog?.open) dialog.close();
    else if (mobile.matches) {
      setPanel(false);
      for (const detail of dropdowns) detail.open = false;
    }
  });
  catalog
    .querySelectorAll<HTMLButtonElement>('[data-panel-clear]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        for (const input of checkboxes)
          if (inPanel(input)) input.checked = false;
        updateSummaries();
      });
    });
  catalog
    .querySelectorAll<HTMLButtonElement>('[data-panel-apply]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        for (const input of checkboxes) {
          if (!inPanel(input)) continue;
          if (input.checked) applied.add(input);
          else applied.delete(input);
        }
        update();
        if (dialog?.open) dialog.close();
      });
    });
  function positionDropdown() {
    if (mobile.matches) return;
    const open = dropdowns.find((dropdown) => dropdown.open);
    if (!open) return;
    const trigger = open.querySelector('summary')!.getBoundingClientRect();
    const options = open.querySelector<HTMLElement>('.facet-options')!;
    const viewport = document.documentElement;
    const gutter = 8;
    const width = options.offsetWidth;
    const rightEdge = viewport.clientWidth - gutter;
    const left = Math.max(gutter, Math.min(trigger.left, rightEdge - width));
    options.style.setProperty('--dropdown-offset', `${left - trigger.left}px`);
    const headerBottom =
      document.querySelector('.site-header')?.getBoundingClientRect().bottom ??
      0;
    const above = trigger.top - Math.max(headerBottom, 0) - gutter - 5;
    const below = viewport.clientHeight - trigger.bottom - gutter - 5;
    const flip = below < options.scrollHeight && above > below;
    open.toggleAttribute('data-flip', flip);
    options.style.setProperty(
      '--dropdown-room',
      `${Math.max(80, flip ? above : below)}px`,
    );
  }
  for (const dropdown of dropdowns)
    dropdown.addEventListener('toggle', positionDropdown);
  window.addEventListener('resize', positionDropdown);
  window.addEventListener('scroll', positionDropdown, { passive: true });
  document.addEventListener('click', ({ target }) => {
    if (!(target instanceof Node)) return;
    for (const dropdown of dropdowns) {
      if (!dropdown.contains(target)) {
        if (dropdown.contains(document.activeElement))
          dropdown.querySelector('summary')?.focus();
        dropdown.open = false;
      }
    }
  });
  catalog.addEventListener('focusout', (event) => {
    if (!(event.target instanceof Element)) return;
    const dropdown = event.target.closest<HTMLDetailsElement>('details[open]');
    if (
      dropdown &&
      event.relatedTarget instanceof Node &&
      !dropdown.contains(event.relatedTarget)
    ) {
      dropdown.open = false;
    }
  });
  catalog.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !(event.target instanceof Element)) return;
    const disclosure =
      event.target.closest<HTMLDetailsElement>('details[open]');
    if (disclosure) {
      event.preventDefault();
      disclosure.open = false;
      disclosure.querySelector('summary')?.focus();
    } else if (
      !dialog?.open &&
      more?.getAttribute('aria-expanded') === 'true'
    ) {
      event.preventDefault();
      setPanel(false);
      more.focus();
    }
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) restore();
  });
  restore();
  catalog.dataset.ready = '';
}

document.querySelectorAll<HTMLElement>('[data-directory]').forEach(mount);
