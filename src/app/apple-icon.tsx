/**
 * Icono para la pantalla de inicio de iOS (180×180).
 *
 * Existe aparte del favicon porque Safari no usa SVG para esto: pide un PNG
 * de tamaño fijo. Y sin él, al guardar el sitio en la pantalla de inicio, iOS
 * pone una captura de la página en miniatura, ilegible.
 *
 * NO REDIBUJA LA MARCA. Lee el mismo `icon.svg` y lo rasteriza, así que hay un
 * único sitio donde está el dibujo: si mañana cambia la marca, cambia aquí
 * sola. Duplicar los trazos era la manera segura de que los dos iconos
 * acabaran distintos sin que nadie se diera cuenta.
 *
 * El fondo de tinta se repite detrás a propósito: el SVG lleva las esquinas
 * redondeadas y fuera de ellas es transparente, pero iOS aplica SU PROPIA
 * máscara redondeada encima. Sin este fondo, las cuatro esquinas quedarían
 * transparentes dentro del recorte de Apple y se verían como muescas.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const raw = await readFile(join(process.cwd(), "src/app/icon.svg"), "utf8");

  /* SE QUITAN LOS COMENTARIOS. No es limpieza: satori —el motor que rasteriza
     esto— no los digiere, y con ellos dentro devolvía el cuadro de fondo
     VACÍO, sin marca y sin error. Un fallo mudo, de los que solo se ven
     abriendo el PNG. El SVG lleva un comentario largo explicando el dibujo,
     así que esta línea es lo único que separa el icono de salir en negro.

     Va con `encodeURIComponent` y no en base64 por la misma razón: es la
     forma que satori lee sin discutir. */
  const mark = raw.replace(/<!--[\s\S]*?-->/g, "").trim();
  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(mark)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#141413",
        }}
      >
        <img src={dataUri} width={size.width} height={size.height} alt="" />
      </div>
    ),
    { ...size },
  );
}
