# AI Academy: activación de la lista de espera

`/formacion/` presenta el diseño aprobado. La lista de espera se muestra con
los campos y el envío deshabilitados; no carga un widget ni guarda datos.

## Antes de habilitar el envío

- Crear e integrar un widget Turnstile con una clave pública real y configurar `ACADEMY_TURNSTILE_SECRET` como secreto y `ACADEMY_TURNSTILE_HOSTNAMES` con los dominios exactos, sin localhost. El Worker valida la acción `academy_waitlist` y el hostname real.
- Crear una lista dedicada a Academy en Brevo, con atributos de texto `ACADEMY_NAME` y `ACADEMY_LINE`. Configurar `ACADEMY_BREVO_LIST_ID` y el secreto `ACADEMY_BREVO_API_KEY`. Revisar que la lista no dispare automatizaciones y confirmar la persistencia de ambos atributos, incluidos contactos existentes. No usar la configuración Wrangler local en producción.
- Acordar aviso de privacidad, conservación de datos, responsable de los avisos y baja. Probar con el widget real y un contacto autorizado: éxito, token caducado/reutilizado, persistencia y caída de Brevo. No habilitar el formulario público antes de verificarlo.
- Conectar la interfaz a `POST /api/academy-waitlist`, anunciar el resultado real del envío y retirar el aviso de indisponibilidad al activar. La configuración de pruebas del Worker usa KV local y no debe conectarse a la página pública. `/api/contact` no interviene.
