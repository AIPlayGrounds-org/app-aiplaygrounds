/**
 * Contenedor compartido del sitio.
 *
 * Fija el ancho máximo y los márgenes laterales en UN solo lugar, para que la
 * navegación, el contenido y el footer queden alineados en la misma columna.
 * Si mañana cambia el ancho, se cambia aquí y lo heredan los tres.
 *
 * El relleno lateral crece con la pantalla: 24px en móvil (suficiente para que
 * el texto nunca toque el borde), 32px desde sm y 48px desde lg.
 */

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className = "", children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
