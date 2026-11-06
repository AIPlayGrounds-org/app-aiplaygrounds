# P05-R1 · Revisión editorial y visual

**Estado: candidato pendiente de aprobación humana. A2 no aprobada.** Esta versión vive solo en la rama de desarrollo; no autoriza publicación.

## Editorial

El hero cambia de dos párrafos a una definición breve y un H1 de cuatro prácticas; I2 explica cómo la comunidad impulsa el trabajo, sin convertirla en la organización. El title se conserva y la meta description es candidata. Diagnóstico, copy íntegro, CTA y diferencias respecto de E2: [editorial-candidates-r1.md](../p05/editorial-candidates-r1.md). E1, E2 y Content Handoff no se modificaron; la sincronización editorial formal está pendiente del feedback humano. I3, I4, I5 e I8 conservan su copy y condiciones.

## Diseño

Frente a P05: Halo gana presencia en el marco abierto del hero y en I2; I2 pasa de dos columnas equivalentes a titular y bloque escalonado. I3 usa Card Astro de Starwind 2.3.1 y Button ya instalado: cuatro ilustraciones con nombres y descripciones, sin vincular verticales a cursos. Se evaluaron Item, Badge, Separator y Navigation Menu; no añadían una función necesaria frente a la navegación nativa existente y la composición editorial. I5 diferencia Labs con una superficie, manteniendo Academy y organizaciones como rutas de naturaleza distinta. I8 conserva el cierre oscuro.

Los SVG en `public/verticals/` son extracciones de grupos vectoriales de [deck/reference/07.svg](https://github.com/edhutech/ppt-ai/blob/586bbb38923895ee5cf5c7366f85a48f642b0c81/deck/reference/07.svg): Foundations/Halo, Software/oscuro-Lima, Science/Menta y Finance/Lima. Se conservaron trazados y colores originales, con recorte viewBox, sin reconstrucción ni extracción raster. Las imágenes son decorativas junto a títulos equivalentes. Los fondos de la propia ilustración incluyen el oscuro original `#0b0b12`, no un nuevo token de marca. Falta el logotipo maestro y favicon verificables.

La trayectoria adapta la jerarquía de cifras de `deck/narrativa.html`, sin copiar métricas ajenas a E2: +30 eventos desde 2025; hack@latam 56 equipos y 36 horas; bootcamp de 2025, seis semanas y más de 300 inscritos. Se conservan atribuciones, fechas, descripciones y enlaces. Los rótulos numéricos duplicados visualmente están ocultos a lectores de pantalla porque los mismos datos figuran en frases completas. No se presenta ninguna actividad como abierta.

Halo canónico `#8E8EFF` se usa como superficie y elemento gráfico, no texto pequeño sobre claro. Sobre negro mide 7,46:1; los pares figura/fondo de las ilustraciones miden aproximadamente 6,97:1 (Halo), 16,90:1 (oscuro/Lima), 15,02:1 (Menta) y 16,90:1 (Lima). No se añadió el alias textual propuesto: no hizo falta.

## Capturas locales

- [Hero 1440](hero-1440.png), [Inicio 1440](desktop-1440.png), [tablet 768](tablet-768.png)
- [Móvil 360](mobile-360.png), [móvil 320](mobile-320.png)
- [I2](I2.png), [I3](I3.png), [I4](I4.png)

## Validación y límites

Chromium: 320, 360, 768 y 1440 CSS px sin overflow horizontal; a 320 y 360 también con menú abierto. Se corrigieron el desbordamiento del H1 candidato a 320 y el layout del contenido de menú cerrado. Menú nativo comprobado con Enter/Tab/Escape y retorno de foco; forced-colors y reduced-motion emulados. No se comprobó zoom real 200/400 % ni lector de pantalla; no se afirma cumplimiento WCAG completo. Las siete páginas y anclas futuras permanecen sin implementar. La petición local a favicon devuelve 404.

`npm ci` y `npm run ci:check` pasaron, con tests de candidatos, rutas, textos históricos, SVG, output y Worker; POST de contacto local sigue en 503. Build SSG: CSS 35.003 bytes (~7.725 gzip), fuentes 90.288 bytes y cuatro SVG ~11,2 KB; JS first-party de menú inline mínimo. No se ejecutó Lighthouse ni pruebas de campo. La auditoría de output conserva sus limitaciones: no garantiza ausencia de todos los fragmentos privados. No se activaron previews ni servicios remotos.

## Criterios de revisión

1. Aprobar o corregir H1, bajada, I2 y meta description como candidatos; su adopción requiere posterior sincronización editorial.
2. Evaluar si los conejos y el uso de Halo representan apropiadamente las verticales y la comunidad.
3. Revisar legibilidad y precisión de la trayectoria y el equilibrio claro/oscuro.
4. Si la dirección satisface estos criterios, decidir A2; la aprobación visual no autoriza publicación ni servicios.
