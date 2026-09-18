/**
 * Iconos de interfaz.
 *
 * NO es una librería de iconos. Es UN componente con un mapa de trazos, y esa
 * diferencia es deliberada: añadir un icono cuesta una línea de datos, no un
 * archivo nuevo. Así el set puede crecer sin que cada icono se invente sus
 * propias reglas, que es exactamente lo que pasa cuando cada uno llega como
 * un SVG suelto pegado dentro del componente que lo necesitaba.
 *
 * EL CONTRATO — todo icono nuevo lo cumple:
 *
 *   Rejilla      24 × 24. Siempre, aunque se pinte a 10px.
 *   Trazo        `currentColor`, nunca un color propio. El icono se tiñe con
 *                `text-*` como si fuera una letra, y hereda hover y foco sin
 *                que nadie los duplique.
 *   Relleno      ninguno. El set es lineal, como los bordes finos del sitio.
 *   Terminales   redondeadas. El sitio ya redondea sus esquinas (--radius-aipg).
 *   Tamaño       1em por defecto: el icono escala con el texto que acompaña,
 *                igual que el Logo. Nada de tamaños en píxeles sueltos.
 *
 * SOBRE `strokeWidth`: existe por óptica, no por capricho. Un trazo de 1.75
 * sobre rejilla de 24 mide 1.2px cuando el icono se pinta a 17px, pero solo
 * 0.7px cuando se pinta a 10px — y ahí desaparece. Los iconos pequeños piden
 * un trazo proporcionalmente más grueso. Por debajo de ~14px, subirlo.
 */

const paths = {
  /** Desplegables de la navegación. */
  chevronDown: "m6 9.5 6 6 6-6",
  /** Avanzar: llamadas a la acción, "ver más" de una tarjeta. */
  arrowRight: "M4 12h16m-6-6 6 6-6 6",
  /** Enlace que sale del sitio: redes, demos y repos de AI Labs. */
  arrowUpRight: "M7 17 17 7m0 0H8.5M17 7v8.5",
  /** Cerrar un panel o un aviso. */
  close: "m6 6 12 12M18 6 6 18",
  /** Menú. Sin uso hoy: el botón móvil son dos barras que se cruzan con CSS,
   *  y esa transición se perdería al cambiarla por un icono estático. */
  menu: "M4 7h16M4 12h16M4 17h16",
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  /**
   * Texto alternativo. Omitirlo —lo normal— deja el icono como decoración y
   * lo esconde de los lectores de pantalla. Solo lleva `label` el icono que
   * es la ÚNICA pista de lo que hace un control; si al lado hay texto que ya
   * lo dice, ponerlo aquí lo repite dos veces en voz alta.
   */
  label?: string;
  /** Ver la nota de óptica arriba. */
  strokeWidth?: number;
  className?: string;
};

export function Icon({
  name,
  label,
  strokeWidth = 1.75,
  className = "",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[1em] w-[1em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Un icono decorativo se esconde; uno con `label` se anuncia como imagen.
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <path d={paths[name]} />
    </svg>
  );
}
