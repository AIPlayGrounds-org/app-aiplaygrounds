# Calendario de Comunidad

`/comunidad/` lee `communityEvents`, una colección de Astro que valida `src/data/community-events.json` al compilar. No hay consultas a Luma en producción ni nueva infraestructura. La página muestra solo los encuentros anteriores; la sincronización conserva también los próximos cuando los haya. Vuelve a construir y desplegar al actualizar el calendario o al terminar un encuentro.

## Sincronizar

```sh
npm run sync:events
npm run validate:content
npm run build
```

Revisa `git diff` antes de publicar. Incluye el JSON actualizado y, si corresponde, los WebP autorizados. La sincronización puede repetirse: usa el ID de Luma, no el nombre ni el slug. Un cambio de hora, nombre o URL modifica el mismo registro. Un fallo de red, formato, comprobación de cobertura o conversión deja intacto el JSON anterior. No ejecutes dos sincronizaciones a la vez.

La fuente de inventario es el [iCal publicado por el calendario](https://api.luma.com/ics/get?entity=calendar&id=cal-87ZACs1cXmaGKLg), que, según la [documentación oficial](https://help.luma.com/p/ical-syncing), contiene todos los eventos publicados sin paginación. Se contrastan fechas y conteos con los datos de las vistas públicas Anteriores y Próximos. Cada UID se comprueba contra su ficha pública, leyendo los datos que entrega la página sin iniciar sesión. El formato HTML de Luma no es una API estable: ante cambios no se intenta acceder a endpoints privados, ni se sobrescribe el snapshot.

Se probó el [MCP oficial](https://help.luma.com/p/mcp): `https://mcp.luma.com` devolvió `401` y solicita OAuth. Listar un calendario con ese MCP requiere una cuenta que lo administre. La [API oficial](https://help.luma.com/p/luma-api) requiere Luma Plus y una clave; no se contrató ni se solicitó una clave. El iCal y las fichas públicas cubrieron el inventario sin autenticación.

## Qué se guarda

- ID, nombre, descripción en texto, URL original de portada, inicio y fin en ISO, zona IANA, modalidad, ciudad, país, dirección o plataforma pública, nombres de anfitriones visibles y URL oficial. La propiedad del calendario de origen permite que el destacado no seleccione un evento ajeno agregado al calendario.
- `listed` significa que la ficha se publica en el calendario; el iCal usa `TENTATIVE` para estas entradas y no prueba asistencia, realización efectiva ni inscripción abierta. Las cancelaciones explícitas se excluyen, y las entradas retiradas de un feed completo quedan como `unlisted`, no como canceladas. Tampoco se publican entradas cuya ficha ya no sea pública. Si una ficha todavía está en el iCal pero no se puede verificar, el comando falla y conserva la colección anterior.
- `missing` identifica campos ausentes. No se guardan datos de invitados, enlaces privados de videollamada ni recuentos de asistentes. La interfaz usa la zona del evento para mostrar la fecha y el inicio para ordenar. Por decisión editorial, fija el [Workshop Práctico de Claude Code](https://luma.com/gjk5qy7b) por ID de Luma. Si ya no es elegible, muestra el encuentro propio más reciente que haya terminado.

**Corte de la primera importación:** 12 fichas públicas, todas anteriores (7 virtuales y 5 presenciales), 0 próximas, 12 URLs originales de portada y 0 portadas descargadas. Los 7 encuentros virtuales no tienen ciudad ni país público; todos tienen zona y anfitriones. El encuentro más reciente en ese corte fue [From Hack to Pilot: Perú Demo Day](https://luma.com/yzjagyu0), que sigue en el historial.

## Portadas y acceso a WhatsApp

Pide confirmación de derechos para reutilizar las portadas. Preferir los archivos originales que controla el titular de derechos; los [términos de Luma](https://luma.com/terms) restringen la descarga directa y republicación de imágenes como archivos independientes. No ejecutar descargas desde Luma sin su permiso expreso.

Con permiso para publicar los originales, prepara un manifiesto local por ID. `url` debe coincidir exactamente con la portada de Luma; `file` apunta a un original autorizado, relativo al manifiesto. Solo si Luma autoriza expresamente descargar del CDN, reemplaza `file` por `"lumaDownload": true`. No subas el manifiesto con evidencias privadas al repositorio.

```json
{
  "evt-ID": {
    "url": "URL exacta registrada en coverUrl",
    "file": "original-autorizado.png"
  }
}
```

Ejecuta `npm run sync:events -- --covers /ruta/manifiesto.json` con ImageMagick 7 (`magick`). Produce WebP de hasta 800 px y 240 px, sin recorte. Si cambia la URL de portada, la nueva necesita autorización propia. El auditor del build admite solo WebP referenciados en la colección: al sustituir una imagen, elimina las variantes obsoletas. Si se revoca una autorización, retira las dos referencias del registro y los WebP del repositorio; no vuelvas a incluirla en el manifiesto. Sin archivos locales la interfaz omite la imagen, no hace hotlink ni muestra sustitutos.

`PUBLIC_COMMUNITY_WHATSAPP_URL` se configura al compilar, solo con una invitación vigente `https://chat.whatsapp.com/…` verificada por el responsable. Sin ella no hay botón de acceso.

## Verificación inicial

Los 12 destinos de la colección coincidieron con el historial público y las 12 páginas de evento respondieron. La vista pública Próximos no tenía eventos. Se comprobó la sincronización repetida sin cambios y, en una copia aislada, la conservación del JSON al fallar la red y la conversión de una imagen rectangular sin recorte.

En navegador se comprobó el selector por teclado, el enlace al destacado, la combinación de búsqueda y filtros, la limpieza y paginación. A 1440, 768 y 390 px se revisaron las filas y el destacado sin desbordamiento. El encuadre cuadrado se probó con una imagen temporal no publicada; las capturas de la página muestran el estado real sin portadas. `npm run ci:check` pasa (incluye compilación estática, prueba en seco del Worker y auditoría de artefactos).
