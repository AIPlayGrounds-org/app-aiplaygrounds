type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

// Visual and accessible invalid state are updated together, and only after interaction.
export function wireValidation(
  form: HTMLFormElement,
  issue: (control: Control) => string | undefined,
) {
  const controls = [...form.querySelectorAll<Control>('[data-error]')];
  const touched = new WeakSet<Control>();
  const live = form.querySelector('[data-validation-status]');
  function setError(control: Control, message?: string) {
    const error = document.getElementById(control.dataset.error ?? '');
    if (!error) return;
    control.setAttribute('aria-invalid', message ? 'true' : 'false');
    const descriptions = new Set(
      control.getAttribute('aria-describedby')?.split(/\s+/) ?? [],
    );
    if (message) {
      error.textContent = message;
      descriptions.add(error.id);
    } else {
      descriptions.delete(error.id);
    }
    if (descriptions.size)
      control.setAttribute('aria-describedby', [...descriptions].join(' '));
    else control.removeAttribute('aria-describedby');
    error.hidden = !message;
  }
  for (const control of controls) {
    control.addEventListener('input', () => {
      touched.add(control);
      if (control.getAttribute('aria-invalid') === 'true' && !issue(control)) {
        setError(control);
        if (live) live.textContent = '';
      }
    });
    const validateEdited = () => {
      if (!touched.has(control)) return;
      const message = issue(control);
      setError(control, message);
      if (live) live.textContent = message ?? '';
    };
    control.addEventListener('blur', validateEdited);
    control.addEventListener('change', () => {
      touched.add(control);
      validateEdited();
    });
  }
  form.noValidate = true;
  return {
    setError,
    controls,
    validate() {
      const invalid = controls.filter((control) => {
        const message = issue(control);
        setError(control, message);
        return Boolean(message);
      });
      invalid[0]?.focus();
      return !invalid.length;
    },
  };
}
