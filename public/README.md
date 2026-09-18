# Assets del sitio

Imágenes y animaciones **propias de AI PlayGrounds**. Todo lo que está aquí se
publica: un archivo en `public/brand/logo.svg` queda accesible en
`/brand/logo.svg` para cualquiera que visite el sitio.

Por eso aquí no van referencias de otros sitios ni pruebas a medio hacer. Eso
vive en `design/references/`.

| Carpeta | Qué guardar |
|---|---|
| `brand/` | Logo, favicon, imagen para compartir en redes (og) |
| `images/` | Ilustraciones, texturas y portadas propias del diseño |
| `motion/` | Animaciones: `.webm`, `.mp4`, `.gif`, SVG animado |

## Cuándo *no* usar esta carpeta

A partir del paso 6 entra Payload CMS. Las imágenes de **contenido** —portada
de un programa, foto de un evento, captura de un AI Lab— se suben desde el
panel de administración y las guarda Payload, no esta carpeta.

La regla: si la imagen la cambia un editor sin tocar código, es de Payload. Si
forma parte del diseño del sitio, es de aquí.

## Formatos

- **Fotos e ilustraciones con degradados:** `.webp` (pesa la mitad que un JPG)
- **Logos, iconos, formas planas:** `.svg`
- **Animaciones:** `.webm` con `.mp4` de respaldo. Un GIF de tres segundos pesa
  más que el mismo vídeo en `.webm`
- Todas las imágenes se muestran con `next/image`, que recorta y redimensiona
  sola. Sube el original grande; no hace falta preparar versiones a mano

Lottie (animaciones vectoriales en JSON) necesitaría instalar una librería.
Antes de usarlo hay que preguntar, como cualquier dependencia nueva.

## Pendiente

`file.svg`, `globe.svg`, `next.svg`, `vercel.svg` y `window.svg` son restos de
la plantilla de Next.js. No los usa nadie en `src/`; se pueden borrar.
