import type { SequenceName } from '../motion/sequence';

export const sequenceSources = [
  '/src/motion/sequence.ts',
  '/src/motion/typography.ts',
] as const;

export const approvedMotion = [
  {
    id: 'kinetic',
    title: 'Kinetic Typography',
    name: 'Typography · apertura inmersiva',
    api: 'splitText(), createTimeline(), stagger(), keyframes',
    tokens:
      '--duration-hero, --motion-stagger-word, --motion-shift-word, --motion-scale-word*, --motion-scale-action',
    use: 'Inicio, Empresas y Formación. El ritmo comienza en las palabras y continúa hacia la descripción y las acciones. Admite alineación centrada, lateral y cielo abierto.',
    note: 'El H1 siempre es visible. El paisaje y el espacio que ocupa el texto no se animan.',
    code: '<ImmersiveHero id="F1" image={image} title={title} description={description} composition="open-sky" />',
    source: '/src/components/site/ImmersiveHero.astro',
  },
  {
    id: 'assembly',
    title: 'Layered Assembly',
    name: 'Sequences · tarjetas por capas',
    api: 'createTimeline(), inset(), translate, scale',
    tokens:
      '--duration-assembly, --motion-stagger-group, --motion-delay-group-max, --motion-distance-assembly, --motion-scale-landscape-entry',
    use: 'Inicio, verticales. Agrupa las tarjetas que llegan juntas; en la columna móvil cada tarjeta entra a su paso.',
    note: 'Se conserva la altura desde el HTML. La entrada mueve el marco y el hover mueve solo la imagen.',
    code: '<div data-scene-group>\n  {verticals.map((vertical) => <VerticalCard {...vertical} />)}\n</div>',
    source: '/src/components/site/VerticalCard.astro',
  },
  {
    id: 'metrics',
    title: 'Rolling Digits',
    name: 'Typography / Metrics · odómetro',
    api: 'createTimeline(), stagger(), translateY',
    tokens:
      '--duration-metrics, --motion-reel-steps*, --motion-stagger-digit, --motion-stagger-group',
    use: 'Inicio y Formación. Usa compact en cifras junto a texto; display en cifras principales. Admite separadores, signos y unidades como «36 h».',
    note: 'El lector de pantalla recibe la cifra real una vez. Solo se crean carretes mientras se anima.',
    code: '<ul data-scene="metrics">\n  <li data-motion-rule><strong><RollingValue value="1,200+" density="display" /></strong></li>\n</ul>\n<SceneMotion />',
    source: '/src/components/site/RollingValue.astro',
  },
  {
    id: 'narrative',
    title: 'Narrative Flow',
    name: 'Entrance & Exit · lectura editorial',
    api: 'createTimeline(), splitText(), stagger(), inset()',
    tokens:
      '--duration-narrative, --motion-stagger-line, --motion-stagger-group, --motion-arrow-x, --motion-arrow-y',
    use: 'Inicio y Empresas. Encadena título, texto y enlaces según el orden de lectura. Marca el borde existente con data-motion-rule si lo hay.',
    note: 'Las líneas se calculan al entrar. Al recibir foco o cambiar el ancho se restaura el texto original.',
    code: '<Section data-scene="narrative">\n  <SectionHeading data-scene-title>{title}</SectionHeading>\n  <p data-scene-copy>{description}</p>\n  <TextLink data-scene-actions href={href}>{label}</TextLink>\n</Section>\n<SceneMotion />',
    source: '/src/motion/narrative.ts',
  },
  {
    id: 'organic',
    title: 'Organic Reveal',
    name: 'Entrance & Exit · llamada ilustrada',
    api: 'createTimeline(), ellipse(), splitText(), stagger()',
    tokens:
      '--duration-organic, --motion-mask-origin, --motion-ease-mask, --motion-scale-landscape-entry, --motion-stagger-line, --motion-scale-action',
    use: 'Inicio, Formación, Equipo y Comunidad. Admite paisaje encuadrado o recorte transparente; el origen sigue el anclaje de la imagen.',
    note: 'La máscara se limita al arte y no altera sus dimensiones. Usa Convergence para formularios completos.',
    code: '<ClosingCTA id="F6" {title} {paragraphs} {buttons} illustration={image} />',
    source: '/src/components/site/ClosingCTA.astro',
  },
  {
    id: 'convergence',
    title: 'Compositional Convergence',
    name: 'Sequences · conversión ilustrada',
    api: 'createTimeline(), inset(), translate, stagger()',
    tokens:
      '--duration-convergence, --motion-distance-card, --motion-distance-ink, --motion-stagger-line, --motion-stagger-group',
    use: 'Empresas y Formación. Admite arte al inicio o al final de las columnas; en móvil converge en el eje de lectura. Marca cada fila, incluido el botón.',
    note: 'El foco, pulsar o escribir finalizan la secuencia. No se ocultan ni se reconstruyen controles.',
    code: '<FormCTA id="EM6" {title} {description} illustration={image}>\n  <OrganizationContactForm />\n</FormCTA>',
    source: '/src/components/site/FormCTA.astro',
  },
  {
    id: 'landscape',
    title: 'Landscape Expansion',
    name: 'Image Motion · paisajes de colaboración',
    api: 'organicReveal(root, options, "landscape"), ellipse()',
    tokens:
      '--duration-landscape, --motion-ease-mask, --motion-scale-landscape-entry, --motion-stagger-line, --motion-stagger-group',
    use: 'Empresas. Variante de Organic Reveal que parte de la esquina inferior derecha en tonos grove y sand. Escalona superficies que llegan juntas.',
    note: 'El marco y el área clicable permanecen fijos; el zoom CSS de hover sigue activo.',
    code: '<div data-scene-group>\n  <CollaborationCard {...alliance} />\n  <CollaborationCard {...commercial} />\n</div>',
    source: '/src/components/site/CollaborationCard.astro',
  },
  {
    id: 'signal',
    title: 'Signal Build',
    name: 'SVG · Sistemas modulares',
    api: 'createMotionPath(), createDrawable(), createTimeline()',
    tokens:
      '--duration-signal-build, --motion-ease-draw, --motion-opacity-module, --motion-distance-ink, --motion-stagger-group',
    use: 'Inicio y Empresas. La misma señal arma matrices, capas, una visualización conceptual y una red. Cada parada se calcula desde la geometría.',
    note: 'El SVG ya está completo en el HTML. Solo se anima la entrada visible y el trazo se restaura al terminar.',
    code: '<InitiativeGrid>\n  <InitiativeCard illustrationId="inicio-art-labs" illustration="labs" {...labs} />\n</InitiativeGrid>',
    source: '/src/motion/signal.ts',
  },
  {
    id: 'trace',
    title: 'Active Trace',
    name: 'SVG / Interactions · señal de respuesta',
    api: 'initiativeSignal(root, options, "trace"), createMotionPath(), createDrawable()',
    tokens:
      '--duration-active-trace, --motion-ease-draw, --motion-opacity-trace',
    use: 'Inicio y Empresas. Pasa el cursor por cualquier zona de la tarjeta o enfoca su enlace con Tab. Prueba las cuatro variantes de la familia.',
    note: 'Una ejecución por interacción, sin reconstrucción ni hover táctil. La ruta es la misma de Signal Build.',
    code: 'const play = await patterns.trace();\nconst trace = play(card);\n// Antes de repetir: trace.revert();',
    source: '/src/components/site/InitiativeCard.astro',
  },
] as const satisfies ReadonlyArray<{
  id: SequenceName;
  title: string;
  name: string;
  api: string;
  tokens: string;
  use: string;
  note: string;
  code: string;
  source: string;
}>;
