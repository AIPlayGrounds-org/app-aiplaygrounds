# CLAUDE.md — AI PlayGrounds Web

Contexto permanente del proyecto. Léelo al inicio de cada sesión.

---

## 0. Naturaleza del proyecto — leer primero

Esta **no es una landing page desechable**. Es la base sobre la que se van a montar más aplicaciones de AI PlayGrounds.

Implicaciones para cada decisión técnica:

- Los tokens de diseño son infraestructura compartida, no estilos de una página
- Las collections de Payload se diseñan pensando en relaciones futuras
- Los componentes se construyen para reutilizarse, no para una sola vista
- La organización de carpetas es por **dominio**, no por tipo de archivo

**Pero:** no construir abstracciones para necesidades imaginarias. La regla es *"que agregar mañana no obligue a reescribir"*, no *"anticipar todo hoy"*. Si una funcionalidad no se necesita esta semana, no se construye.

> **Decisión abierta:** falta confirmar si este repo es independiente o se fusiona con el repo existente de la organización (`AIPlayGrounds-org`). Coordinar antes de definir collections.

---

## 1. Qué es AI PlayGrounds

Una comunidad de IA en español.

**Tesis:** Generar es solo el principio. Entender lo que construimos, evaluar sus resultados y tomar buenas decisiones sigue siendo difícil.

**Visión:** Construir un referente de IA seria en español.

---

## 2. Posicionamiento — crítico

AI PlayGrounds es para quienes quieren **ir más allá de usar herramientas**: entender cómo funcionan, evaluarlas con criterio y llevar sistemas reales a producción.

**Esto NO es una comunidad de "IA para principiantes".** El público tiene criterio técnico o aspira a tenerlo.

### Principios de marca
- **Sin hype** — nada de "revoluciona tu vida con IA" ni promesas infladas
- **Con criterio** — afirmaciones sostenibles, matices donde los hay
- **Independientes** — no somos vendedores de ninguna herramienta
- **Aprender de lo que falla** — los errores y limitaciones se nombran
- **En español** — el español es la lengua principal, no una traducción

### Tono de voz
Directo, técnico pero legible, sobrio. Frases cortas. Sin signos de exclamación. Sin emojis en el copy del sitio. Si una frase suena a anuncio de LinkedIn, reescríbela.

**Mal:** "¡Domina la IA y transforma tu carrera!"
**Bien:** "Entender qué existe debajo de las herramientas antes de depender de ellas."

---

## 3. Audiencias

| | Individuos | Empresas |
|---|---|---|
| Quién | Builders, ingenieros, profesionales técnicos | RR.HH., gerencias, líderes de área |
| Llega desde | Redes sociales, referidos, eventos | Búsqueda directa, referidos |
| Dispositivo | Mayormente móvil | Mayormente escritorio |
| Busca | Comunidad, programas, aprender haciendo | Proveedor confiable de capacitación |
| Ruta | Home → Programas / Comunidad | Home → `/empresas` |

**Nunca mezclar los dos discursos en una misma sección.** La home habla a individuos; `/empresas` tiene su propio lenguaje.

---

## 4. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS | Payload CMS 3 (montado dentro de Next.js) |
| Base de datos | MongoDB Atlas (Mongoose Adapter) |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Componentes UI | shadcn/ui |
| Rich text | Payload Lexical Editor |
| i18n | Middleware propio (`proxy.ts`) — rutas `/es` y `/en` |
| Animaciones | Framer Motion |
| Package manager | pnpm |
| Lenguaje | TypeScript |

### Reglas técnicas
- **Mobile-first siempre.** Diseñar en móvil y expandir con `md:` / `lg:`
- **Server Components por defecto.** `'use client'` solo cuando hay interactividad real
- Tokens de color como **CSS Variables**, nunca hex sueltos en el markup
- Componentes de shadcn/ui antes de construir uno nuevo desde cero
- Framer Motion con moderación: transiciones sobrias, coherentes con "sin hype". Nada que rebote o llame la atención sobre sí mismo
- `next/image` para todas las imágenes
- Interfaz y contenido en español; nombres de variables, archivos y componentes en inglés
- No introducir dependencias nuevas sin preguntar

---

## 5. Internacionalización

Rutas `/es` y `/en`. **El español es la fuente; el inglés es la traducción.**

El i18n entra en el **paso 2**, con el layout base. No se pospone ni es opcional.

- Todo el texto de interfaz y copy vive en **archivos de diccionario** (`src/dictionaries/es.ts` y `en.ts`), nunca escrito directo en el JSX
- Ambos diccionarios comparten el mismo tipo: TypeScript avisa si a una clave le falta traducción
- Todo texto nuevo se crea con su clave en **ambos** diccionarios desde el primer día. El valor en inglés puede quedar pendiente; la clave no
- El copy de marca (tesis, principios, titulares) lo traduce una persona, no automáticamente — el tono se pierde en traducción literal
- Contenido de Payload: usar los campos localizados nativos del CMS

---

## 6. Dirección visual

**Referencia principal:** Crafter Station (crafterstation.com) — base oscura, tipografía como protagonista, líneas divisorias visibles, estética de ingeniería.

### Lo que se toma
- Etiqueta en mayúsculas espaciadas sobre el titular (`AI PLAYGROUNDS · LATAM`)
- Titular de gran escala, sans-serif de peso alto
- Bordes finos que estructuran la navegación en bloques
- Dos botones jerarquizados: uno relleno (principal), uno con solo borde (secundaria)
- Sin ilustraciones decorativas ni fotos de stock

### Lo que NO se toma
- Menús con catorce destinos — no hay ese volumen de contenido todavía
- "Sign in" visible — no hay cuentas públicas por ahora

### Tokens

Extraídos del logo oficial: negro `#000000`, blanco `#FFFFFF`, acento periwinkle `#8E8EFE`.

```css
/* globals.css — Tailwind v4 usa @theme */
@theme {
  --color-aipg-bg:      #0A0A0A;  /* fondo base */
  --color-aipg-surface: #141414;  /* tarjetas, superficies elevadas */
  --color-aipg-border:  #262626;  /* líneas divisorias */
  --color-aipg-text:    #FAFAFA;  /* texto principal */
  --color-aipg-muted:   #A3A3A3;  /* texto secundario */
  --color-aipg-accent:  #8E8EFE;  /* periwinkle del logo */
}
```

El acento aparece **poco**: botón principal, enlaces, el punto separador, indicadores de estado. La base es neutra. Esto es deliberado — permite cambiar el acento en un solo lugar y que toda la plataforma lo herede.

**Tipografía:** Geist (viene integrada con Next.js).

### Logo

El archivo disponible es la versión **Light** (texto negro sobre blanco). El sitio es oscuro, así que se necesita la **Dark** (texto blanco, punto periwinkle):

```
public/logo-light.svg
public/logo-dark.svg   ← uso principal
```

El punto separador (`·`) del logo es el mismo periwinkle del acento. Ese detalle puede reutilizarse como elemento gráfico en etiquetas y separadores.

---

## 7. Copy del encabezado (home)

```
Etiqueta:   AI PLAYGROUNDS · LATAM
Titular:    Generar es solo el principio.
Subtítulo:  Una comunidad de IA en español para quienes quieren ir más allá
            de usar herramientas: entender cómo funcionan, evaluarlas con
            criterio y llevar sistemas reales a producción.
Botón 1:    Ver programas      (relleno, acento periwinkle, texto negro)
Botón 2:    Ver eventos        (solo borde, texto blanco)
```

El titular sale directo de la tesis de marca. Afirmativo, sobrio, sin promesas infladas — coherente con "sin hype".

> **Pendiente:** versión en inglés de todo este bloque.

---

## 8. Rutas

```
/[lang]                      Home
/[lang]/comunidad            Qué es la comunidad, cómo unirse
/[lang]/programas            Listado de programas
/[lang]/programas/[slug]     Detalle de programa
/[lang]/eventos              Listado de eventos
/[lang]/eventos/[slug]       Detalle de evento
/[lang]/ai-labs              Productos construidos por la comunidad
/[lang]/ai-labs/[slug]       Detalle de producto
/[lang]/nosotros             Tesis, principios, equipo
/[lang]/empresas             Capacitación corporativa
/admin                       Panel de Payload
```

### Navegación (5 bloques, no 7 enlaces)

```
[logo]  Comunidad ▾   Programas ▾   AI Labs   Nosotros ▾   [Para empresas]
```

- **Comunidad ▾** → Comunidad · Eventos · Discord
- **Programas ▾** → Todos los programas · AI Fundamentals · The Real AI
- **AI Labs** → directo, sin desplegable
- **Nosotros ▾** → Equipo · Principios
- **Para empresas** → botón aparte, a la derecha

---

## 9. Collections de Payload

Diseñar pensando en relaciones futuras. Todos los campos de texto visible son **localizados** (ES/EN).

### `Programas`
```
titulo                text, localizado
slug                  text, único
descripcionCorta      text, localizado, máx 140
nivel                 select: Fundamentos | Intermedio | Avanzado
modalidad             select: En vivo | Híbrido | Asíncrono
duracion              text, localizado
fechaInicio           date
estado                select: Próximo | En curso | Cerrado
precio                number, opcional (vacío = gratuito)
paraQuien             richText, localizado
loQueAprendes         array de text, localizado
requisitos            array de text, localizado
imagen                upload → Media
destacado             checkbox
```

### `Eventos`
```
titulo                text, localizado
slug                  text, único
tipo                  select: Hackathon | Charla | Meetup | Workshop
descripcionCorta      text, localizado
fecha                 date
ubicacion             text
estado                select: Próximo | Pasado
enlaceRegistro        text, opcional
imagen                upload → Media
```

### `AILabs`
```
nombre                text
slug                  text, único
autores               relationship → Users (hasMany)
problemaQueResuelve   text, localizado
descripcion           richText, localizado
enlaceDemo            text, opcional
enlaceRepo            text, opcional
tecnologias           array de text
programaOrigen        relationship → Programas, opcional
captura               upload → Media
```

### `Leads`
```
nombre                text
email                 email
tipo                  select: Personal | Organización
interes               select: Programas | Eventos | Capacitación corporativa
mensaje               textarea, opcional
origen                text (qué página generó el lead)
createdAt             automático
```

La pregunta de segmentación (`tipo`) **separa los dos embudos automáticamente**. Es el campo más importante del formulario.

### `Users` y `Media`
Collections nativas de Payload. `Users` solo para administradores por ahora, pero existe desde el inicio porque `AILabs.autores` la referencia y porque habrá cuentas públicas más adelante.

---

## 10. Aliados

PNUD · Globant · ElevenLabs · Cursor · Lovable · SpinOut · Intercorp

**Es la prueba social más fuerte del sitio.** Va visible y alto en la home, justo bajo el encabezado. Logos en escala de grises, en fila, sin adornos. Vale más que cualquier número de miembros.

---

## 11. Orden de construcción

1. Tokens en `@theme` + tipografía Geist + logo dark
2. Layout base: navegación + footer + i18n funcionando (`/es` y `/en`)
3. Home: encabezado
4. Home: franja de aliados
5. Home: tesis y principios
6. **Despliegue** — publicar en cuanto la home esté en pie, con el pipeline y las variables de entorno resueltos antes de que haya mucho que romper
7. Collection `Programas` en Payload + listado
8. Detalle de programa
9. `/empresas`
10. Collection `Leads` + formulario
11. AI Labs *(último — requiere productos reales que mostrar)*

El copy de la home (pasos 3–5) va escrito en **componentes y diccionarios, no en Payload**. Payload entra en el paso 7, con el primer contenido que de verdad se administra: los programas.

**Una sección por sesión.** Construir, revisar en navegador, ajustar, commit. No generar la web completa de una vez.

---

## 12. Footer

Cierre del sitio: **"Construido desde Latinoamérica."**

Enlaces: LinkedIn · Discord · WhatsApp · GitHub

---

## 13. Cómo trabajar en este proyecto

- Explicar los cambios en lenguaje accesible: quien dirige este proyecto está aprendiendo desarrollo web
- Antes de crear archivos nuevos, decir qué se va a crear y por qué
- **No editar este CLAUDE.md sin pedir confirmación.** Es la fuente de verdad del proyecto
- No introducir dependencias nuevas sin preguntar
- Al terminar una sección, sugerir el mensaje de commit
- Si una decisión de diseño tiene alternativas razonables, plantearlas en vez de asumir
- Verificar el stack real en `package.json` antes de asumir cualquier framework