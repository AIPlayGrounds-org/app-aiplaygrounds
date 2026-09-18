/**
 * Datos de la comunidad.
 *
 * Aquí van HECHOS, no textos: números y enlaces. No se traducen, así que no
 * tienen sitio en los diccionarios — igual que el reparto de
 * `src/content/learnings.ts`, y por el mismo motivo.
 *
 * `meetupsHeld` HOY NO SE MUESTRA EN NINGUNA PARTE, y es deliberado. Estuvo
 * en el encabezado de /comunidad como "24 encuentros en Lima" hasta que el
 * documento de copy dejó constancia de dos problemas: la cifra está sin
 * confirmar, y los encuentros son online los miércoles —en Lima solo de vez
 * en cuando—, así que la frase era inexacta por partida doble.
 *
 * La constante se conserva porque el dato sigue siendo el que más trabajo
 * haría: una comunidad que dice "hacemos encuentros" no demuestra nada; una
 * que dice cuántos lleva, sí. Vuelve a la página en cuanto alguien confirme
 * el número, y le toca a /eventos, no a /comunidad.
 *
 * PENDIENTE: hoy se escribe a mano y se queda viejo solo. Cuando /eventos
 * liste los encuentros de verdad, debe salir de contarlos.
 */

/** Encuentros ya realizados. Sin confirmar; no se muestra todavía. */
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
