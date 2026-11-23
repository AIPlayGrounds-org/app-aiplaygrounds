import {
  contactAction,
  contactEmailPattern,
  contactFields,
} from '../data/organization-contact';
import { inquiry, track } from './analytics';
import { wireValidation } from './form-validation';

interface Turnstile {
  render(
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      size: 'flexible';
      'response-field': false;
    },
  ): string;
  getResponse(widget: string): string;
  reset(widget: string): void;
}
const verificationScript =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const failure =
  'No pudimos confirmar la recepción de tu consulta. Inténtalo de nuevo.';
const success =
  'Hemos recibido tu consulta. Gracias por compartir el contexto de tu organización.';

export function wireOrganizationContact(form: HTMLFormElement) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const fields = form.querySelector('fieldset');
  const status = form.querySelector('.submission-status');
  const host = form.querySelector<HTMLElement>('[data-turnstile]');
  const select = form.elements.namedItem('inquiryType');
  const { sitekey, policyVersion } = form.dataset;
  if (!button || !fields || !status || !(select instanceof HTMLSelectElement))
    return;
  const setSubmitDisabled = (disabled: boolean) => {
    button.disabled = disabled;
    button.toggleAttribute('data-disabled', disabled);
  };

  const context = () => ({
    page: '/empresas/',
    form_id: form.id,
    cta_origin: form.dataset.ctaOrigin ?? 'direct',
    inquiry_type: inquiry(select.value),
  });
  let api: Turnstile | undefined;
  let widget: string | undefined;
  let loadingWidget = false;
  function loadVerification() {
    if (!sitekey || !host || loadingWidget || widget !== undefined) return;
    loadingWidget = true;
    const script = document.createElement('script');
    script.src = verificationScript;
    const failed = () => {
      loadingWidget = false;
      script.remove();
      show('error', failure);
    };
    script.addEventListener('error', failed, { once: true });
    script.addEventListener(
      'load',
      () => {
        api = (window as Window & { turnstile?: Turnstile }).turnstile;
        try {
          if (!api) return failed();
          widget = api.render(host, {
            sitekey,
            action: contactAction,
            size: 'flexible',
            'response-field': false,
          });
        } catch {
          failed();
        }
      },
      { once: true },
    );
    document.head.append(script);
  }
  const start = (event: FocusEvent) => {
    if (
      !(event.target instanceof Element) ||
      !event.target.matches('[data-error], button[type="submit"]')
    )
      return;
    form.removeEventListener('focusin', start);
    track('form_start', context());
    loadVerification();
  };
  form.addEventListener('focusin', start);

  const validation = wireValidation(form, (control) => {
    const value = control.value.trim();
    if (
      control.name === 'email' &&
      value &&
      (control.validity.typeMismatch || !contactEmailPattern.test(value))
    ) {
      return 'Revisa el formato de tu correo electrónico.';
    }
    if (control.validity.tooLong) return 'Reduce la extensión de este campo.';
    if (value) return;
    return control.dataset.requiredMessage;
  });

  function show(state: 'error' | 'sending' | 'success', message: string) {
    form.dataset.state = state;
    if (status) status.textContent = message;
  }

  let attempt: { data: string; id: string; startedAt: number } | undefined;
  const enabled = Boolean(sitekey && policyVersion && host);
  setSubmitDisabled(!enabled);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!enabled || form.dataset.state === 'sending') return;
    status.textContent = '';
    const origin = context();
    if (!validation.validate()) {
      track('form_error', { ...origin, reason: 'validation' });
      return;
    }
    let token: string | undefined;
    try {
      if (widget !== undefined) token = api?.getResponse(widget);
    } catch {
      // An absent, expired or failed challenge cannot authorize the request.
    }
    if (!token) {
      loadVerification();
      show('error', failure);
      track('form_error', { ...origin, reason: 'verification' });
      return;
    }
    const data = Object.fromEntries(
      validation.controls.map((control) => [
        control.name,
        control.value.trim(),
      ]),
    );
    const serialized = JSON.stringify(data);
    if (attempt?.data !== serialized)
      attempt = {
        data: serialized,
        id: crypto.randomUUID(),
        startedAt: Date.now(),
      };
    if (Date.now() - attempt.startedAt >= 30 * 60_000) {
      show(
        'error',
        `${failure} Si ya enviaste estos mismos datos, recarga la página solo si deseas abrir una nueva consulta.`,
      );
      return;
    }
    show('sending', 'Enviando…');
    fields.disabled = true;
    fields.setAttribute('aria-busy', 'true');
    setSubmitDisabled(true);
    let invalidField: (typeof validation.controls)[number] | undefined;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          policyVersion,
          turnstileToken: token,
          submissionId: attempt.id,
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (
        response.status === 422 &&
        contactFields.some((name) => name === result.field)
      ) {
        invalidField = validation.controls.find(
          (control) => control.name === result.field,
        );
      }
      if (
        !response.ok ||
        result.status !== 'accepted' ||
        result.requestId !== attempt.id
      )
        throw new Error('unconfirmed');
      form.reset();
      form.dataset.ctaOrigin = 'direct';
      attempt = undefined;
      show('success', success);
      track('generate_lead', origin);
    } catch {
      show('error', failure);
      track('form_error', { ...origin, reason: 'submission' });
    } finally {
      fields.disabled = false;
      fields.removeAttribute('aria-busy');
      setSubmitDisabled(false);
      if (widget !== undefined) {
        try {
          api?.reset(widget);
        } catch {
          // Provider reload is required if its widget state becomes unavailable.
        }
      }
      if (invalidField) {
        validation.setError(invalidField, 'Revisa el valor de este campo.');
        invalidField.focus();
      }
    }
  });
}
