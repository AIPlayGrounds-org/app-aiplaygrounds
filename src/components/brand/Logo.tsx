/**
 * Logo de AI PlayGrounds — versión tipográfica provisional.
 *
 * Sustituye al SVG oficial mientras no exista la versión dark.
 *
 * PARA REEMPLAZAR cuando llegue el archivo: cambiar solo el contenido de este
 * componente por <Image src="/logo-dark.svg" alt="AI PlayGrounds" ... />.
 * El resto del sitio importa `<Logo />` sin saber cómo está construido por
 * dentro, así que no hay que tocar ningún otro archivo.
 *
 * El tamaño se hereda del contenedor: usar `text-lg`, `text-2xl`, etc. en el
 * padre. Los espacios están en `em`, así que escalan solos.
 */

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="AI PlayGrounds"
      className={`inline-flex items-baseline gap-[0.35em] font-sans tracking-tight text-aipg-text ${className}`}
    >
      <span className="font-normal">[</span>
      <span className="font-bold">ai</span>
      <span className="font-normal text-aipg-accent-text">·</span>
      <span className="font-normal">playgrounds</span>
      <span className="font-normal">]</span>
    </span>
  );
}
