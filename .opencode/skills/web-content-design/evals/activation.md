# Suite ACT — activación espontánea

**Método:** OpenCode con skills relevantes cargadas; un prompt por contexto limpio; no nombrar `web-content-design`; observar selección antes de responder. Positivo esperado = activación; negativo = no activación. Mixto = activar solo si la parte editorial sustantiva lo requiere. Anotar falsos negativos y falsos positivos por separado. No introducir el contenido del caso en system prompt.

## Development ACT-D01–D22

| ID | Tipo | Prompt literal | Esperado | Señal principal |
|---|---|---|---|---|
| ACT-D01 | + | «El alcance ya está aprobado: una One Page para un estudio de arquitectura. Ayúdame a definir dirección de contenido y secciones.» | Sí | estrategia y arquitectura web |
| ACT-D02 | + | «Investiga keywords para el nuevo sitio de una clínica veterinaria en Lima y recomienda cómo agruparlas.» | Sí | search y clusters |
| ACT-D03 | + | «Necesitamos sitemap y mapa de contenido para el sitio corporativo multipágina de esta asociación.» | Sí | arquitectura/contenido |
| ACT-D04 | + | «Redacta la página de un servicio de mantenimiento industrial usando este brief y el CTA aprobado.» | Sí | copy de servicio |
| ACT-D05 | + | «El cliente dejó estos comentarios sobre el copy web. Clasifícalos y actualiza únicamente lo que corresponda.» | Sí | feedback gate |
| ACT-D06 | + | «Audita este contenido web: revisa promesas, intención, CTAs y claridad antes de publicarlo.» | Sí | QA editorial |
| ACT-D07 | + | «Ya tenemos el alcance comercial. Construye una propuesta de contenido y recorrido para la web de una academia.» | Sí | workflow de contenido |
| ACT-D08 | + | «Define la voz y el tono de las páginas del sitio a partir de esta guía y estos ejemplos aprobados.» | Sí | dirección editorial |
| ACT-D09 | + | «Revisa el title, la meta description y el H1 de esta página de servicio frente a su intención.» | Sí | SEO editorial/copy |
| ACT-D10 | + | «El mapa ya está aprobado. Escribe el contenido de la página de contacto sin alterar estrategia ni arquitectura.» | Sí | entrada directa a copy |
| ACT-D11 | + | «Organiza el contenido de un directorio de centros culturales; aún no sabemos todos los filtros disponibles.» | Sí | patrón de contenido y restricciones |
| ACT-D12 | + | «Compara el texto de la ficha de producto con la información de precio y entrega aprobada.» | Sí | copy/factualidad |
| ACT-D13 | − | «Cambia el CSS para que el menú quede fijo al hacer scroll.» | No | solo CSS |
| ACT-D14 | − | «Corrige este error de JavaScript que rompe el menú móvil.» | No | solo código |
| ACT-D15 | − | «Configura el deployment del sitio en producción.» | No | infraestructura |
| ACT-D16 | − | «Diseña un logotipo vectorial para la marca.» | No | identidad gráfica |
| ACT-D17 | − | «Escribe una publicación aislada para Instagram sobre la inauguración.» | No | social, no contenido web |
| ACT-D18 | Mixto | «Redacta los mensajes del formulario de contacto y luego conecta el endpoint en JavaScript.» | Sí, solo parte editorial | separar copy de implementación |
| ACT-D19 (E1-D1) | + | «Tenemos una One Page aprobada para una empresa de servicios. Necesito preparar la Dirección de Contenido y Estructura Web antes de redactar el copy.» | Sí | activar Entregable 1 / One Page |
| ACT-D20 (E1-D2) | + | «Tenemos una web anterior y datos de Search Console. Quiero definir la nueva dirección de contenido y arquitectura, todavía no quiero redactar el sitio.» | Sí | activar E1 con sitio existente y GSC |
| ACT-D21 (E1-D3) | + | «Necesito preparar el primer entregable para el cliente con estructura de la web, necesidades, clusters y dos opciones de voz.» | Sí | activar E1 por “primer entregable” y componentes |
| ACT-D22 | − | «Implementa schema JSON-LD en las páginas.» | No | solo SEO técnico/schema |

## Holdout de activación ACT-H01–H08 — reservado

Estos ocho casos reservados miden únicamente activación espontánea; no validan el workflow conductual B0/B1/B2. No ejecutar durante ajuste ni reformular para convertir en development. Son independientes de los holdouts conductuales, que aún no están reservados para esta arquitectura.

| ID | Tipo | Prompt literal | Esperado |
|---|---|---|---|
| ACT-H01 | + | «Las familias no entienden los requisitos de admisión en nuestra web; revisa cómo está explicado el contenido.» | Sí |
| ACT-H02 | + | «Necesito que estas páginas expliquen mejor qué cubre nuestro servicio de consultoría.» | Sí |
| ACT-H03 | + | «¿Puedes ordenar los artículos de ayuda por las preguntas que resuelven y revisar sus enlaces?» | Sí |
| ACT-H04 | − | «Ajusta el pool de conexiones de PostgreSQL para la web.» | No |
| ACT-H05 | − | «Configura eventos de conversión en Google Analytics; no cambies el contenido.» | No |
| ACT-H06 | − | «Crea un carrusel de imágenes para el hero sin tocar títulos ni textos.» | No |
| ACT-H07 | Mixto | «Reescribe el error de checkout para que se entienda y modifica el componente React que lo muestra.» | Sí, solo parte editorial |
| ACT-H08 | Mixto fronterizo | «Mejora el posicionamiento: añade schema y también revisa si el contenido de las fichas responde a lo que buscan.» | Sí, solo contenido editorial; no schema |
