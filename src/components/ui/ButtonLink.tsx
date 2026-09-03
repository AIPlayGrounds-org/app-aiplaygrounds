/**
 * Enlace con aspecto de botón. Las dos jerarquías del sitio, en un solo sitio.
 *
 * Existe porque el estilo estaba escrito a mano en el encabezado y en la
 * navegación, y al cambiar de dirección visual hubo que tocarlo en los dos —
 * que es la señal de que era la misma decisión repetida.
 *
 * `ink` es el principal: relleno de tinta casi negra. Antes era periwinkle.
 * El cambio es el corazón de la dirección: en la referencia el acento nunca
 * rellena el control más grande de la página, aparece en marcas pequeñas.
 *
 * `line` es el secundario: solo borde. Usa --color-aipg-border-strong y no la
 * divisoria normal, porque aquí la línea ES el control: si no se ve, el botón
 * no existe.
 */

import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  variant?: "ink" | "line";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-aipg px-5 py-3 text-center font-sans text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aipg-focus";

const variants = {
  ink: "bg-aipg-text text-aipg-on-ink hover:bg-aipg-text/88",
  line: "border border-aipg-border-strong text-aipg-text hover:border-aipg-text",
} as const;

export function ButtonLink({
  href,
  variant = "ink",
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
