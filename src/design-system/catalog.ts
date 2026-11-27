import { buttonSizes, buttonVariants } from '../components/ui/button';
import { badgeSizes, badgeVariants } from '../components/ui/badge';
import { cardOptions } from '../components/ui/card';
import {
  fieldAppearances,
  fieldDensities,
  textareaAppearances,
} from '../components/ui/field';
import {
  alertAppearances,
  alertTones,
  dropdownAlignments,
  tooltipPlacements,
} from '../components/ui/options';

type Controls = Record<string, readonly string[]>;
type Entry = {
  description: string;
  props: string;
  accessibility: string;
  usage: string;
  example: string;
  controls?: Controls;
  composite?: boolean;
};

export const components: Record<string, Entry> = {
  TeamCard: {
    composite: true,
    description:
      'Perfil de Equipo con tamaños relativos al ancho de su contenedor.',
    props: 'member, role, layout, heading.',
    accessibility:
      'Los enlaces sociales tienen nombre propio; el retrato acompaña el nombre sin repetirlo.',
    usage:
      'Cambia el ancho del preview para comprobar cómo responde la tipografía con cqi.',
    example: '<TeamCard {member} {role} layout="vertical" heading="h3" />',
  },
  SectionHeading: {
    composite: true,
    description:
      'Título editorial de sección con una escala fluida compartida.',
    props: 'Atributos nativos de h2 y slot de texto.',
    accessibility:
      'Respeta la jerarquía; reserva el h1 para el título de la página.',
    usage:
      'Úsalo en secciones editoriales sin acoplarlo al grid ni al contenido.',
    example: '<SectionHeading>Áreas de trabajo</SectionHeading>',
  },
  TextLink: {
    composite: true,
    description: 'Enlace editorial con señal de dirección.',
    props: 'Atributos nativos del enlace y slot de texto.',
    accessibility: 'El texto nombra su destino; el icono es decorativo.',
    usage:
      'En una tarjeta de destino único, la superficie puede activar el mismo enlace.',
    example:
      '<TextLink href="/investigacion/">Explorar investigación</TextLink>',
  },
  Button: {
    description: 'Acciones y enlaces con aspecto de botón.',
    props:
      'variant, size, shape, fullWidth, disabled, loading, iconOnly, as, href; slots leading y trailing.',
    accessibility:
      'Usa un nombre accesible para los iconos sin texto. Tab muestra el foco real.',
    usage:
      'Un enlace lleva a un destino; un botón ejecuta una acción. Para icono solo, elige cuadrado o círculo.',
    example: '<Button variant="primary">Continuar</Button>',
    controls: {
      variant: [
        'primary',
        ...Object.keys(buttonVariants).filter(
          (variant) => variant !== 'primary',
        ),
      ],
      size: ['md', ...Object.keys(buttonSizes).filter((size) => size !== 'md')],
      state: ['normal', 'disabled', 'loading'],
      icon: ['none', 'leading', 'trailing', 'only'],
      symbol: ['arrow', 'plus'],
      shape: ['default', 'square', 'circle'],
      width: ['auto', 'full'],
      element: ['button', 'link'],
    },
  },
  Badge: {
    description: 'Etiqueta breve para verticales, estados y metadatos.',
    props: 'variant, size, appearance, indicator, as; slot icon.',
    accessibility:
      'Incluye el estado en el texto; el punto y los iconos son decorativos.',
    usage:
      'Permite que el grupo de etiquetas salte de línea. No uses badges como botones.',
    example: '<Badge variant="success" indicator>Disponible</Badge>',
    controls: {
      variant: [
        'success',
        ...Object.keys(badgeVariants).filter(
          (variant) => variant !== 'success',
        ),
      ],
      size: ['md', ...Object.keys(badgeSizes).filter((size) => size !== 'md')],
      appearance: ['solid', 'outline'],
      icon: ['none', 'leading'],
      indicator: ['on', 'off'],
    },
  },
  Card: {
    description: 'Superficie flexible para una unidad de contenido.',
    props: 'as, surface, density, edge, interaction; slot de contenido libre.',
    accessibility:
      'single-link requiere un único destino marcado con data-card-link; no añade foco al contenedor.',
    usage:
      'Deja el layout al contenido. En pantallas estrechas, evita anchuras mínimas y textos cortados.',
    example: '<Card surface="editorial"><p>Estado del proyecto</p></Card>',
    controls: cardOptions,
  },
  Input: {
    description: 'Campo nativo de una sola línea.',
    props:
      'appearance, density; atributos nativos, incluidos name, type y autocomplete.',
    accessibility:
      'Asocia un Label y referencia errores con aria-describedby y aria-invalid.',
    usage:
      'Usa inline solo dentro de un control compuesto que aporte borde y foco.',
    example: '<Input id="correo" name="email" type="email" />',
    controls: {
      appearance: fieldAppearances,
      density: fieldDensities,
      state: ['normal', 'disabled', 'invalid'],
    },
  },
  Textarea: {
    description: 'Campo para texto de varias líneas.',
    props:
      'appearance, density, rows, maxlength; slot opcional para valor inicial.',
    accessibility: 'Conserva resize vertical y un Label visible.',
    usage:
      'Deja espacio para el texto; usa editorial junto a los demás campos editoriales.',
    example: '<Textarea id="mensaje" name="message" rows={4} />',
    controls: {
      appearance: textareaAppearances,
      density: fieldDensities,
      state: ['normal', 'disabled', 'invalid'],
    },
  },
  Select: {
    description: 'Selección nativa de opciones.',
    props: 'appearance, density; slot option/optgroup y atributos nativos.',
    accessibility:
      'Pon el nombre en Label, no en la primera opción. Permite recorrer las opciones con el teclado.',
    usage: 'Usa inline cuando el contenedor controle el borde y el indicador.',
    example:
      '<Select id="tema" name="topic"><option>Formación</option></Select>',
    controls: {
      appearance: fieldAppearances,
      density: fieldDensities,
      state: ['normal', 'disabled', 'invalid'],
    },
  },
  Checkbox: {
    description: 'Elección independiente o múltiple.',
    props: 'size (sm, md, lg), native, checked, disabled, name y value.',
    accessibility:
      'Usa una etiqueta clicable; agrupa grupos relacionados con fieldset y legend.',
    usage:
      'native preserva el aspecto del filtro editorial. Un grupo puede ocupar varias líneas.',
    example: '<Checkbox id="avisos" name="notices" />',
  },
  Radio: {
    description: 'Una elección dentro de un conjunto.',
    props:
      'name obligatorio; size (sm, md, lg), native, checked, disabled y value.',
    accessibility:
      'Comparte name solo entre opciones del mismo grupo; declara una leyenda para el grupo.',
    usage: 'Usa opciones visibles y breves cuando hace falta compararlas.',
    example: '<Radio id="presencial" name="format" value="presencial" />',
  },
  Switch: {
    description: 'Opción binaria con estado encendido o apagado.',
    props: 'size (sm, md, lg), checked, disabled, name y value.',
    accessibility:
      'Mantén la misma etiqueta cuando cambia el estado. Se activa con Espacio.',
    usage:
      'Úsalo para una preferencia binaria, especialmente cuando el cambio es inmediato.',
    example: '<Switch id="recordatorios" name="reminders" />',
  },
  Label: {
    description:
      'Etiqueta de un control, con el estilo tipográfico del sistema.',
    props: 'for y atributos de label; slot para texto o control.',
    accessibility:
      'El for debe coincidir con el id. Una etiqueta sigue siendo necesaria al usar placeholder.',
    usage: 'Colócala encima de campos largos y junto a controles binarios.',
    example: '<Label for="correo">Correo electrónico</Label>',
  },
  Avatar: {
    description:
      'Imagen o iniciales para identificar a una persona u organización.',
    props: 'size (sm, md, lg), label, initials; slot de imagen.',
    accessibility:
      'Omite label si el nombre ya está al lado; usa alt vacío en la imagen de un avatar etiquetado.',
    usage:
      'Selecciona un tamaño apropiado para la densidad del grupo y deja al nombre espacio para envolver.',
    example: '<Avatar initials="AP" label="AI PlayGrounds" size="md" />',
  },
  Separator: {
    description: 'Separación entre bloques o grupos de controles.',
    props:
      'orientation (horizontal, vertical), decorative; slot opcional de texto.',
    accessibility: 'Usa decorative cuando la jerarquía ya distinga los grupos.',
    usage:
      'La separación vertical necesita altura disponible en su contenedor.',
    example: '<Separator decorative />',
  },
  Spinner: {
    description: 'Indicador de una operación en curso.',
    props: 'size (xs–xl), label opcional.',
    accessibility:
      'Pasa label para anunciar una carga independiente. Sin label se considera decorativo.',
    usage: 'Prefiere colocarlo junto al mensaje que explica qué está cargando.',
    example: '<Spinner label="Cargando resultados" size="sm" />',
  },
  Alert: {
    description:
      'Mensaje contextual de información, error, advertencia o éxito.',
    props: 'tone, appearance; slots icon y contenido; role opcional.',
    accessibility:
      'Reserva role="alert" para anuncios dinámicos urgentes. Escribe un mensaje claro y no dependas del color.',
    usage: 'Colócalo cerca de la acción. El contenido puede envolver en móvil.',
    example: '<Alert tone="success">Cambios guardados.</Alert>',
    controls: {
      tone: ['success', ...alertTones.filter((tone) => tone !== 'success')],
      appearance: [
        'soft',
        ...alertAppearances.filter((appearance) => appearance !== 'soft'),
      ],
    },
  },
  Tooltip: {
    description:
      'Descripción auxiliar al pasar el puntero o enfocar un control.',
    props:
      'descriptionId, description, placement (top, bottom, left, right); slot para el disparador.',
    accessibility:
      'El disparador debe tener su propio nombre y aria-describedby apuntando a descriptionId. Escape oculta la ayuda sin mover el foco.',
    usage:
      'No pongas información necesaria ni acciones dentro del tooltip; puede no estar disponible en pantallas táctiles.',
    example:
      '<Tooltip descriptionId="tip" description="Guarda una copia local"><Button aria-describedby="tip">Exportar</Button></Tooltip>',
    controls: { placement: tooltipPlacements },
  },
  Skeleton: {
    description:
      'Marcador decorativo que reserva espacio mientras se carga contenido.',
    props: 'class para reservar dimensiones; demás atributos de div.',
    accessibility:
      'Marca la región que carga con aria-busy y ofrece un estado textual cuando corresponda.',
    usage:
      'Ajusta el tamaño al contenido esperado para limitar saltos de layout.',
    example: '<Skeleton class="h-8 w-full" />',
  },
  Dialog: {
    description: 'Modal nativo con caja centrada o composición específica.',
    props:
      'id, aria-label o aria-labelledby, layout (center, custom); slot interno.',
    accessibility:
      'Ábrelo con showModal(); Esc lo cierra y el navegador devuelve el foco. Incluye una acción de cierre visible.',
    usage:
      'Para acciones que requieren interrumpir la tarea; en móvil permite scroll interno.',
    example:
      '<Dialog id="confirmar" aria-label="Confirmar"><form method="dialog"><Button type="submit">Cerrar</Button></form></Dialog>',
  },
  Dropdown: {
    description:
      'Disclosure basado en details para opciones de navegación o filtros.',
    props:
      'label, align (start, end), open, name; slots trigger (summary) y panel (composición propia).',
    accessibility:
      'El summary debe tener nombre. Su contenido usa navegación nativa con Tab y no requiere role=menu.',
    usage:
      'El panel estándar se alinea con el disparador. Usa panel propio si el menú necesita ocupar una columna en móvil.',
    example:
      '<Dropdown label="Opciones"><a href="/equipo/">Equipo</a></Dropdown>',
    controls: { align: dropdownAlignments },
  },
  Tabs: {
    description: 'Alterna paneles locales sin navegación de página.',
    props: 'id, label, items ({ key, label }[]), active; un slot por key.',
    accessibility:
      'Flechas, Inicio y Fin mueven foco y selección; Tab entra al panel activo.',
    usage:
      'Mantén textos breves. El listado desborda dentro de la fila si el espacio es insuficiente.',
    example:
      '<Tabs id="demo" label="Detalles" items={[{ key: "overview", label: "Resumen" }]}><p slot="overview">Panel</p></Tabs>',
  },
  Accordion: {
    description:
      'Disclosure de contenido; agrupa por name si necesita exclusividad.',
    props: 'label, indicator (arrow, plus), name, open; slot de contenido.',
    accessibility:
      'No uses títulos de sección dentro del summary. El disparador acepta Enter y Espacio.',
    usage:
      'Deja abrir varios paneles si compararlos es útil. El contenido envuelve según el ancho de preview.',
    example:
      '<Accordion label="¿Cómo funciona?"><p>Detalles de la configuración.</p></Accordion>',
  },
  Pagination: {
    description: 'Navegación anterior/siguiente entre páginas de resultados.',
    props: 'previous, next, label; managed y controlClass para el directorio.',
    accessibility:
      'Los extremos sin destino se marcan como deshabilitados en el modo por enlaces.',
    usage:
      'Usa URL reales si la paginación tiene ruta. En modo managed, el directorio actualiza URLs y estado.',
    example: '<Pagination previous="?p=1" next="?p=3" label="Página 2 de 3" />',
  },
  FormField: {
    composite: true,
    description:
      'Etiqueta, campo obligatorio y mensaje de error de los formularios editoriales.',
    props:
      'id, name, label, kind, autocomplete, maxLength, placeholder, rows, error.',
    accessibility:
      'El validador vincula el mensaje con su campo. Conserva ids únicos y el nombre de cada control.',
    usage:
      'En columnas, deja que el campo ocupe el ancho disponible. Proporciona un mensaje de error específico.',
    example:
      '<FormField id="email" name="email" kind="email" label="Correo" error="Ingresa tu correo." />',
  },
  SearchField: {
    composite: true,
    description: 'Campo de búsqueda con icono y etiqueta accesible.',
    props:
      'id, label, appearance, inputClass, iconSize, as, searchableForm; slot para una acción.',
    accessibility:
      'Usa una etiqueta que nombre el conjunto que se busca. Nombra el botón de limpiar.',
    usage:
      'En un formulario existente usa as="div". Deja el filtrado y la gestión de URL al contexto.',
    example: '<SearchField id="busqueda" label="Buscar encuentros" name="q" />',
  },
  FilterControl: {
    composite: true,
    description:
      'DirectoryFilter: faceta de un directorio con opciones y recuentos.',
    props: 'group, directory, plural, dropdown, advanced.',
    accessibility:
      'El legend nombra las opciones. El checkbox conserva su estado nativo.',
    usage:
      'Combínalo con FilterGroup y monta el estilo y el controlador del directorio para filtrar datos reales.',
    example:
      '<DirectoryFilter {group} directory="labs" plural="productos" dropdown />',
  },
  FilterGroup: {
    composite: true,
    description: 'Sección nombrada para agrupar facetas.',
    props:
      'aria-label obligatorio y atributos de section; slot para los controles.',
    accessibility:
      'Describe qué se filtra. Mantén las etiquetas de cada faceta.',
    usage:
      'Usa un layout flexible para permitir varias filas en pantallas estrechas.',
    example:
      '<FilterGroup aria-label="Filtros de productos"><DirectoryFilter {group} directory="labs" plural="productos" dropdown /></FilterGroup>',
  },
  ViewToggle: {
    composite: true,
    description: 'Selector de vista en cuadrícula o lista.',
    props: 'value (grid, list), controlClass y atributos de div.',
    accessibility:
      'Los botones tienen nombres visibles para el lector de pantalla y anuncian aria-pressed.',
    usage:
      'El contexto actualiza los botones y el layout real juntos. Úsalo solo si hay dos vistas.',
    example: '<ViewToggle value="grid" />',
  },
  VerticalTag: {
    composite: true,
    description: 'Etiqueta de una de las cuatro verticales de AI PlayGrounds.',
    props: 'vertical (valor oficial del esquema) y as (span o li).',
    accessibility:
      'El texto identifica la vertical aunque no se distinga el color.',
    usage:
      'Reutiliza los nombres exactos del esquema. En conjunto, permite saltos de línea.',
    example: '<VerticalTag vertical="AI for Science" />',
  },
  ProductTags: {
    composite: true,
    description: 'Agrupa verticales, alcance o madurez de un producto.',
    props: 'product, kind (cover, scopes), overlay.',
    accessibility: 'La madurez se expresa en texto. El alcance es una lista.',
    usage:
      'Solo usa overlay cuando la portada tiene espacio para las etiquetas; permite el salto de línea.',
    example: '<ProductTags {product} kind="cover" />',
  },
  MetadataPanel: {
    composite: true,
    description: 'Panel de pares etiqueta/valor con título e icono.',
    props:
      'title, icon, fields ([label, value?, lang?][]); slots before y contenido.',
    accessibility:
      'El dl conserva la asociación entre término y descripción; el icono es decorativo.',
    usage:
      'Omite campos sin valor. Permite que etiquetas y valores largos ocupen varias líneas.',
    example:
      '<MetadataPanel title="Ficha" icon={Info} fields={[["Licencia", "MIT"]]} />',
  },
};

export function selection(entry: Entry, query: URLSearchParams) {
  return Object.fromEntries(
    Object.entries(entry.controls ?? {}).map(([key, options]) => {
      const value = query.get(key);
      return [key, value && options.includes(value) ? value : options[0]];
    }),
  );
}
