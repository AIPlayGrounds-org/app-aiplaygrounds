/**
 * Datos de la comunidad.
 *
 * Aquí van HECHOS, no textos: números y enlaces. No se traducen, así que no
 * tienen sitio en los diccionarios — igual que el reparto de
 * `src/content/learnings.ts`, y por el mismo motivo.
 *
 * `meetupsHeld` es el dato que más trabajo hace en toda la página. Una
 * comunidad que dice "hacemos encuentros" no demuestra nada; una que dice
 * cuántos lleva, sí. Por eso está y por eso hay que mantenerlo al día.
 *
 * PENDIENTE: hoy el número se escribe a mano y se queda viejo solo. Cuando
 * /eventos tenga el listado real, debe salir de contar los eventos pasados,
 * no de esta constante.
 */

/** Encuentros ya realizados. Fuente: el perfil de Luma. */
export const meetupsHeld = 24;

/**
 * Perfil de Luma: es donde de verdad se publican y se registran los
 * encuentros. Mientras /eventos siga en construcción, los botones del sitio
 * apuntan aquí en vez de a una página vacía.
 *
 * El día que /eventos liste los encuentros, este enlace deja de ser el
 * destino de los botones y pasa a ser una fuente más.
 */
export const lumaUrl = "https://luma.com/user/usr-tnI7C4r7KT5go4S";
