#!/usr/bin/env python3
"""Validate package structure, never strategy, agent behavior or AEO/GEO outcomes."""

import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = (
    "SKILL.md",
    "references/intake-and-governance.md",
    "references/search-research.md",
    "references/openseo-research.md",
    "references/pattern-library.md",
    "references/editorial-directions.md",
    "references/strategy-architecture.md",
    "references/content-structures.md",
    "references/seo-ai-editorial.md",
    "references/feedback-gate.md",
    "references/quality-and-delivery.md",
    "assets/project-brief.md",
    "assets/diagnostic-matrix.md",
    "assets/deliverable-1-direction.md",
    "assets/internal-content-strategy.md",
    "assets/internal-strategy-evidence.md",
    "assets/deliverable-2-web-content.md",
    "evals/README.md",
    "evals/activation.md",
    "evals/behavior-cases.md",
    "evals/content-structure-cases.md",
    "evals/openseo-cases.md",
    "evals/e2e-cases.md",
    "evals/holdouts.md",
    "evals/reference-expectations.md",
    "evals/rubric.md",
    "evals/results/README.md",
    "evals/results/runs.jsonl",
)

RUN_FIELDS = {
    "case_id", "suite", "holdout", "date", "opencode_version", "model",
    "skill_commit", "skill_enabled", "prompt", "references_loaded", "tools_used",
    "result", "judgment", "failures", "notes", "duration_seconds", "tokens",
}
RUN_STRING_FIELDS = {
    "case_id", "suite", "date", "opencode_version", "model", "skill_commit",
    "prompt", "result", "judgment", "notes",
}
RUN_LIST_FIELDS = {"references_loaded", "tools_used", "failures"}
RUN_SUITES = {"activation", "behavior", "e2e", "tool-smoke"}
RUN_JUDGMENTS = {"cumple", "parcial", "falla", "not_observed"}
LEGACY_E1_PATTERNS = (
    re.compile(r"vista ejecutiva", re.I),
    re.compile(r"capa ejecutiva", re.I),
    re.compile(r"dirección detallada", re.I),
    re.compile(r"detalle ampliado", re.I),
    re.compile(r"capas ejecutiva/detallada", re.I),
    re.compile(r"ambas capas", re.I),
    re.compile(r"(?:resumen|presentación) ejecutiv[oa].{0,40}(?:detalle|dirección detallada)", re.I),
    re.compile(r"vista\s*\+\s*detalle", re.I),
    re.compile(r"vista incorpora", re.I),
    re.compile(r"la vista expone", re.I),
    re.compile(r"el detalle (?:muestra|añade|expone)", re.I),
    re.compile(r"vista y detalle", re.I),
)

# These are package contracts, not a readiness evaluator for client projects.
CONTENT_STRUCTURE_CONTRACTS = {
    "SKILL.md": ("references/content-structures.md", "E2 muestra el contenido estructurado en su cuerpo principal"),
    "references/content-structures.md": (
        "## Decisión proporcional por sección", "## Primitivas componibles",
        "## Perfiles semánticos y restricciones", "## Proyección E1 y E2",
        "## Capas, faltantes y condición editorial", "## QA de estructura",
        "página → sección → función → estructura de contenido → unidad(es) → campos → copy → acción",
        "Bloque editorial", "Entidad y colección", "Comparación", "Secuencia",
        "Atributo/valor", "Pregunta/respuesta", "Acción y estado",
        "Esquema por completar — no publicable", "no especifica UI",
    ),
    "references/strategy-architecture.md": ("content-structures.md", "también estáticas"),
    "assets/internal-content-strategy.md": (
        "content-structures.md", "incluidas colecciones o estructuras compuestas dentro de páginas estáticas",
        "modelo de campos de §5", "Modelos incompletos conservados",
    ),
    "assets/deliverable-1-direction.md": (
        "content-structures.md", "información necesaria por unidad",
        "Conserva el esquema validado si faltan datos", "no copy final",
    ),
    "assets/deliverable-2-web-content.md": (
        "content-structures.md", "### Sección [nombre aprobado]",
        "el contenido principal debe mostrar la estructura", "no especifican cards",
        "**Notas editoriales — separadas del copy", "**Datos pendientes / esquema por completar — no publicable",
    ),
    "references/quality-and-delivery.md": (
        "QA de estructura", "content-structures.md", "No aplanar todo a prosa ni convertir todo en tablas",
    ),
    "evals/content-structure-cases.md": (
        "## Protocolo y prompts reproducibles", "Variante E1", "Variante E2",
        "## Juicio transversal obligatorio", "no ejecutados",
    ),
    "evals/reference-expectations.md": ("STRUCT-01–24", "content-structures.md"),
    "evals/rubric.md": ("## Estructuras semánticas", "estructura en cuerpo principal"),
}

DISCOVERY_CONTRACTS = {
    "SKILL.md": ("SEO/AEO/GEO v1", "AEO/GEO readiness", "NO APLICA — motivo",
                 "Política de entrenamiento: decisión del propietario"),
    "references/seo-ai-editorial.md": (
        "## Cadena y materialidad", "## Entidades, respuestas y relaciones",
        "## Structured data candidato — handoff, no implementación",
        "## Discovery técnico — requisitos a verificar",
        "## Medición posterior — plan, no analítica ejecutada",
        "## Freshness y gobernanza ligera", "## AEO/GEO readiness obligatorio",
        "## Base de evidencia general y mantenimiento",
        "APLICA — resuelto", "APLICA — pendiente", "NO APLICA — motivo",
        "OAI-SearchBot", "GPTBot", "ChatGPT-User", "Google-Extended",
        "recomendación inferida", "no certifica ejecución",
    ),
    "references/search-research.md": (
        "## 8. Research AEO/GEO decisional", "topic (opcional)",
        "práctica soportada oficialmente", "evidencia académica",
        "recomendación inferida", "práctica experimental",
    ),
    "assets/internal-content-strategy.md": (
        "### Modelos de campos para tipos repetibles",
        "### 8.1 Intención, cluster/topic y responsabilidad",
        "### 8.2 Modelo mínimo de entidades", "### 8.3 Answer coverage",
        "### 8.4 Relaciones semánticas y aplicación", "### 8.5 Claims y modelos",
        "### 8.6 Structured data candidato", "### 8.7 Handoff técnico",
        "### 8.8 Handoff de medición", "### 8.9 Gobernanza de datos mutables",
        "### 8.10 AEO/GEO readiness", "APLICA — resuelto",
        "APLICA — pendiente", "NO APLICA — motivo",
        "| Página/tipo | Capa | Resultado (APLICA — resuelto / APLICA — pendiente / NO APLICA — motivo) | Registro / motivo / eslabón de la cadena | Dependencia / responsable / momento |",
    ),
    "assets/internal-strategy-evidence.md": (
        "### Claims/hechos materiales y procedencia", "### Evidencia decisional SEO/AEO/GEO",
    ),
    "assets/deliverable-1-direction.md": (
        "### 4.2 ",
        "#### SEO y arquitectura de búsqueda",
        "#### Comprensión y recuperación por sistemas de IA",
        "optimización para motores de respuesta (Answer Engine Optimization, AEO)",
        "optimización para motores generativos (Generative Engine Optimization, GEO)",
        "no garantiza rankings, tráfico, citación ni aparición",
    ),
    "assets/deliverable-2-web-content.md": (
        "modelos repetibles de Estrategia", "handoffs pertinentes ya definidos en Estrategia",
    ),
    "references/quality-and-delivery.md": ("### Continuidad SEO/AEO/GEO y handoffs",),
    "evals/behavior-cases.md": tuple(f"| READY-{number:02d} " for number in range(1, 18)),
    "evals/e2e-cases.md": ("## E2E-11", "## E2E-12", "## E2E-13"),
}

OPENSEO_CONTRACTS = {
    "SKILL.md": ("proveedor MCP opcional", "references/openseo-research.md"),
    "references/search-research.md": ("openseo-research.md", "no requiere consultar ambos proveedores",
                                      "get_serp_results", "no es cero",
                                      "Fuente utilizada no equivale a consulta nueva",
                                      "`USAR` nunca lleva estado `—`",
                                      "lectura de evidencia aportada/reutilizada"),
    "references/openseo-research.md": (
        "schemas/descripciones actuales", "list_projects", "get_project_context",
        "no por primer resultado", "Sin dominio o autorización continúa sin OpenSEO",
        "research_keywords", "get_keyword_metrics", "get_serp_results",
        "find_serp_competitors", "get_domain_overview", "get_domain_keyword_suggestions",
        "get_ranked_keywords", "no expone endpoint dedicado de clustering/content gap",
        "español (`es`)", "Latinoamérica", "No mezcles ni sumes volúmenes de diferentes países",
        "por métrica", "KD=0 no implica automáticamente competencia orgánica baja",
        "Desconocido, no volumen cero", "nunca sustituto de KD",
        "etiqueta original, intención editorial, evidencia, discrepancia",
        "No superar el presupuesto autorizado", "presupuesto máximo configurable",
        "consumo verificado + reservas pendientes/no conciliadas + máximo nueva llamada",
        "no se puede acotar el cargo máximo", "sin confirmaciones por consulta",
        "Consumo estimado y consumo verificado se reportan por separado",
        "meta.creditsCharged", "meta.creditsRemaining", "no reintentes a ciegas",
        "Sin OpenSEO instalado", "Google Keyword Planner", "Gate B/B2",
        "mismo proyecto", "no obliga a ejecutar research nuevo", "no actives otros skills",
    ),
    "assets/internal-strategy-evidence.md": ("OpenSEO opcional", "Presupuesto restante seguro",
                                            "Consumo verificado", "openseo-research.md"),
    "assets/internal-content-strategy.md": ("Cuando OpenSEO haya sido usado", "aceptadas en B2"),
    "references/strategy-architecture.md": ("Las señales de OpenSEO", "no una página por keyword"),
    "references/seo-ai-editorial.md": ("OpenSEO MCP opcional", "openseo-research.md"),
    "evals/openseo-cases.md": ("## Estado de ejecución", "no llames al MCP real",
                               "fixtures locales", "sin tools"),
}

# First-column label identifies a template table; the other labels are minimum
# structural fields. No assessment of whether a project filled them correctly.
DISCOVERY_TABLES = {
    "assets/internal-content-strategy.md": {
        "Tipo": {"Campo", "Significado / formato editorial", "Obligatorio o condición de uso",
                 "Sección responsable", "Fuente / claim referenciado"},
        "Entidad / identificador interno si útil": {"Tipo editorial", "Nombre canónico / alias sustentado",
                 "Qué necesita entenderse", "Página responsable", "Fuente/evidencia referenciada", "Estado"},
        "Pregunta/necesidad (referencia a audiencia de §3)": {"Audiencia", "Página responsable",
                 "Sección/bloque/campo responsable", "Claim/evidencia/condición necesaria referenciada", "Estado"},
        "Origen": {"Relación", "Destino", "Base / evidencia referenciada", "Estado"},
        "Página/tipo": {"Entidad principal / objeto real", "Structured data candidato y motivo",
                 "Propiedades sustentadas → campos/claims visibles", "Pendientes / propiedades no afirmables"},
        "Requisito / página o tipo afectado": {"Motivo", "Responsable", "Momento",
                 "Estado de implementación", "Criterio de verificación posterior"},
        "Objetivo / página / cluster-topic": {"Métrica/señal", "Fuente posible", "Responsable",
                 "Momento / periodo comparable", "Limitación de cobertura/atribución"},
        "Dato / claim referenciado": {"Dónde aparece (página/campo y menciones dependientes)",
                 "Fuente referenciada", "Responsable", "Frecuencia/evento de revisión"},
    },
    "assets/internal-strategy-evidence.md": {
        "ID si útil / claim o hecho": {"Tipo", "Fuente / alcance / permiso público",
                 "Fecha de fuente / vigencia o evento de caducidad",
                 "Página/campo y referencias dependientes", "Estado factual / estado publicable",
                 "Dependencia / responsable"},
    },
    "assets/deliverable-1-direction.md": {
        "Necesidad / intención y razón suficiente": {
            "Cómo se refleja en la web (página y sección/campos)", "Qué resuelve"},
    },
}


def check(root: Path = ROOT) -> list[str]:
    problems: list[str] = []
    for relative in REQUIRED:
        if not (root / relative).is_file():
            problems.append(f"archivo requerido no encontrado: {relative}")
    if problems:
        return problems

    skill_path = root / "SKILL.md"
    text = skill_path.read_text(encoding="utf-8")
    parts = re.match(r"\A---\n(.*?)\n---\n(.*)\Z", text, re.S)
    if not parts:
        return ["SKILL.md: falta frontmatter YAML delimitado al inicio"]
    try:
        fields = yaml.safe_load(parts.group(1))
    except yaml.YAMLError as error:
        return [f"SKILL.md: YAML inválido ({error})"]
    if not isinstance(fields, dict):
        return ["SKILL.md: el frontmatter debe ser un mapping"]
    name = fields.get("name")
    if not isinstance(name, str):
        problems.append("SKILL.md: name debe ser texto")
    elif (name != root.name or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name)
          or len(name) > 64):
        problems.append("SKILL.md: name debe coincidir con la carpeta y usar minúsculas/números/guiones (máx. 64)")
    description = fields.get("description")
    if not isinstance(description, str) or not 1 <= len(description) <= 1024:
        problems.append("SKILL.md: description debe tener entre 1 y 1024 caracteres")
    if not parts.group(2).strip() or len(text.splitlines()) >= 500:
        problems.append("SKILL.md: cuerpo vacío o de 500 líneas o más")

    for file in root.rglob("*.md"):
        contents = file.read_text(encoding="utf-8")
        for dest in re.findall(r"\[[^]]+\]\(([^)]+)\)", contents):
            if dest.startswith(("http://", "https://", "#", "mailto:")):
                continue
            target = (file.parent / dest.split("#", 1)[0]).resolve()
            if not target.is_relative_to(root.resolve()) or not target.is_file():
                problems.append(f"{file.relative_to(root)}: enlace inexistente/fuera del paquete: {dest}")

    patterns = (root / "references/pattern-library.md").read_text(encoding="utf-8")
    for objective in ("O1 Comprender", "O2 Elegir", "O3 Consultar", "O4 Interés futuro",
                      "O5 Acceso/participación", "O6 Transacción", "O7 Tarea operativa"):
        if objective not in patterns:
            problems.append(f"falta objetivo/patrón: {objective}")
    for category in (
        "C1 Institucional/corporativa",
        "C2 Servicios/portafolio",
        "C3 Comercio electrónico",
        "C4 Formación",
        "C5 Directorio/catálogo",
        "C6 Comunidad/participación",
        "C7 Publicación/conocimiento",
    ):
        if category not in patterns:
            problems.append(f"falta categoría/patrón: {category}")
    package_text = "\n".join(path.read_text(encoding="utf-8") for path in root.rglob("*.md")
                              if "evals" not in path.parts)
    for required_phrase in ("ACCEPT", "ADAPT", "ESCALATE", "seo-keywords",
                            "ads_competition", "Contenido Web — Versión Final"):
        if required_phrase not in package_text:
            problems.append(f"falta regla central: {required_phrase}")
    for path, phrases in {
        "SKILL.md": ("Gate A", "Gate B", "B0", "B1", "B2", "Contraste SEO editorial + visibilidad en IA"),
        "assets/project-brief.md": ("brief estructurado", "no es un formulario", "visibilidad pública/interna"),
        "assets/diagnostic-matrix.md": ("Síntesis transversal", "B0 — provisional", "B1 — validada", "B2 — consolidada"),
        "references/search-research.md": ("parte **explícitamente de B1**", "Filtro ≠ cluster ≠ página SEO", "verificación pública puntual", "B2 debe incluir explícitamente", "Research Preflight general", "Decision Delta obligatorio", "fuentes pertinentes e independientes"),
        "references/intake-and-governance.md": ("verificación pública puntual", "única base del research formal"),
        "references/strategy-architecture.md": ("B2 + Keyword Map + O/C", "E1 ⊆ estado interno", "feedback → ACCEPT / ADAPT / ESCALATE"),
        "evals/holdouts.md": ("No hay holdouts activos", "cuando esta versión quede congelada"),
        "assets/deliverable-1-direction.md": (
            "## 1. Qué entendimos", "## 2. Qué proponemos", "## 3. A quiénes nos dirigimos",
            "## 4. Cómo quedaría la web", "### 4.1 Vista general", "### 4.3 Estructura de cada página",
            "| Tipo de visitante | Qué necesita | Qué debe poder encontrar o hacer |",
            "| Página | Principalmente para | Objetivo |",
            "| Orden | Sección | Objetivo | Contenido / elementos clave |",
            "## 5. Cómo se moverán las personas por la web", "## 6. Cómo debería sonar la marca",
            "## 7. Qué necesitamos de ti", "### Decisiones para aprobar ahora",
            "### Información que puede completarse después", "## 8. Qué pasa después",
            "Este es el único Entregable 1", "proyección derivada, nunca fuente primaria de edición",
            "mostrar exactamente dos direcciones", "5–6 muestras",
        ),
        "assets/internal-content-strategy.md": (
            "estrategia-contenido.md", "Dossier", "¿Puedo producir todas las secciones sustantivas de E1",
            "## 1. Estado y decisiones de partida", "## 2. Resultado que debe conseguir la web",
            "## 3. Audiencias y necesidades", "## 4. Estrategia de mensajes",
            "## 5. Modelo de contenido del sitio", "## 6. Arquitectura completa por página",
            "## 7. Recorridos principales", "## 8. SEO editorial y visibilidad en IA",
            "## 9. Dirección editorial", "## 10. Dependencias y pendientes",
            "## 11. Correspondencia con E1", "E1 ⊆ estado interno",
            "La dirección editorial vigente completa vive aquí",
            "Si no existe una dirección editorial aprobada",
        ),
        "assets/internal-strategy-evidence.md": (
            "# Dossier de Evidencia Estratégica", "## 3. Research Preflight",
            "## 5. Triangulación de evidencia", "## 6. Decision Delta — obligatorio",
            "## 10. Trazabilidad de la dirección editorial", "## 11. Feedback ledger",
            "no entregable formal", "no se comparte por defecto",
            "content/internal/03-estrategia/dossier-evidencia-estrategica.md",
            "no sustituye", "no define por sí solo la Estrategia", "## 12. Riesgos, incertidumbre y cierre",
        ),
        "assets/deliverable-2-web-content.md": (
            "INSTRUCCIONES INTERNAS PARA EL AGENTE", "Contenido Web — documento para revisión e implementación",
            "**Objetivo de la página:**", "**Audiencia / necesidad principal:**",
            "Correspondencia con secciones E1", "| Condición o respaldo relevante |",
            "## Feedback del Entregable 2",
        ),
    }.items():
        contents = (root / path).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in contents:
                problems.append(f"{path}: falta concepto estructural: {phrase}")
    for path, phrases in DISCOVERY_CONTRACTS.items():
        contents = (root / path).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in contents:
                problems.append(f"{path}: falta contrato estructural SEO/AEO/GEO: {phrase}")
    for path, phrases in CONTENT_STRUCTURE_CONTRACTS.items():
        contents = (root / path).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in contents:
                problems.append(f"{path}: falta contrato de estructuras de contenido: {phrase}")
    for path, phrases in OPENSEO_CONTRACTS.items():
        contents = (root / path).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in contents:
                problems.append(f"{path}: falta contrato OpenSEO: {phrase}")
    # Fixtures are prompts and expected observables, not recorded agent runs.
    openseo_cases = (root / "evals/openseo-cases.md").read_text(encoding="utf-8")
    rows = [line for line in openseo_cases.splitlines() if re.match(r"^\| OSEO-\d+ \|", line)]
    ids = [line.split("|")[1].strip() for line in rows]
    if set(ids) != {f"OSEO-{number:02d}" for number in range(1, 15)} or len(ids) != 14:
        problems.append("evals/openseo-cases.md: requiere OSEO-01–14 únicos")
    for row in rows:
        cells = [cell.strip() for cell in row.strip("|").split("|")]
        if len(cells) != 3 or not all(cells):
            problems.append("evals/openseo-cases.md: requiere ID, fixture y observables")
    # Fixture integrity only: never infer that the agent chose the right model,
    # produced client-readable content, or respected UI/evidence boundaries.
    structure_cases = (root / "evals/content-structure-cases.md").read_text(encoding="utf-8")
    case_rows = [line for line in structure_cases.splitlines()
                 if re.match(r"^\| STRUCT-\d+ \|", line)]
    case_ids = [line.split("|")[1].strip() for line in case_rows]
    expected_ids = {f"STRUCT-{number:02d}" for number in range(1, 25)}
    if set(case_ids) != expected_ids or len(case_ids) != len(expected_ids):
        problems.append("evals/content-structure-cases.md: requiere STRUCT-01–24 únicos")
    for row in case_rows:
        cells = [cell.strip() for cell in row.strip("|").split("|")]
        if len(cells) != 4 or not all(cells):
            problems.append("evals/content-structure-cases.md: fila requiere ID, fixture y observables E1/E2")
    e2_structure = (root / "assets/deliverable-2-web-content.md").read_text(encoding="utf-8")
    if "| Orden | Sección aprobada / componente | Heading propuesto | Copy público |" in e2_structure:
        problems.append("E2: tabla monolítica obsoleta puede ocultar unidades/campos")
    # Validate visible terms in the template heading, not its exact wording or
    # whether an agent actually explains/applies the benefit in a client E1.
    e1_template = (root / "assets/deliverable-1-direction.md").read_text(encoding="utf-8")
    e1_heading = re.search(r"^### 4\.2 (.+)$", e1_template, re.M)
    if (not e1_heading
            or not re.search(r"\bSEO\b", e1_heading.group(1), re.I)
            or not re.search(r"\b(?:IA|inteligencia artificial)\b", e1_heading.group(1), re.I)):
        problems.append("assets/deliverable-1-direction.md: título de beneficio debe hacer reconocibles SEO e IA")
    # Template ordering only; no claim to assess client explanation, acronym use
    # in generated prose, factual provenance or voice-approval behavior.
    e1_general = re.search(r"^### 4\.1 Vista general$", e1_template, re.M)
    e1_detail = re.search(r"^### 4\.3 Estructura de cada página$", e1_template, re.M)
    if (e1_general and e1_heading and e1_detail
            and not e1_general.start() < e1_heading.start() < e1_detail.start()):
        problems.append("assets/deliverable-1-direction.md: orden debe ser vista general → SEO + IA → detalle")
    if e1_heading and e1_detail and e1_heading.end() < e1_detail.start():
        bridge = e1_template[e1_heading.end():e1_detail.start()]
        seo_block = bridge.find("#### SEO y arquitectura de búsqueda")
        ai_block = bridge.find("#### Comprensión y recuperación por sistemas de IA")
        application_table = bridge.find("| Necesidad / intención y razón suficiente |")
        if not 0 <= seo_block < ai_block < application_table:
            problems.append("assets/deliverable-1-direction.md: puente requiere subbloques SEO e IA antes de tabla")
    for path, tables in DISCOVERY_TABLES.items():
        headers = [tuple(cell.strip() for cell in line.strip().strip("|").split("|"))
                   for line in (root / path).read_text(encoding="utf-8").splitlines()
                   if line.startswith("|")]
        for first, fields in tables.items():
            if not any(header[0] == first and fields.issubset(header) for header in headers):
                problems.append(f"{path}: campos mínimos ausentes en tabla SEO/AEO/GEO: {first}")
    seo_text = (root / "references/seo-ai-editorial.md").read_text(encoding="utf-8")
    for source_id in range(1, 8):
        if not re.search(rf"^\| F{source_id} \|.*\]\(https://", seo_text, re.M):
            problems.append(f"references/seo-ai-editorial.md: falta referencia primaria F{source_id}")
    if (root / "assets/intake-diagnostic.md").exists():
        problems.append("asset obsoleto presente: assets/intake-diagnostic.md")

    skill_text = (root / "SKILL.md").read_text(encoding="utf-8")
    formal_deliverables = re.findall(r"\*\*(?:Dirección de Contenido y Estructura Web \(E1\)|Contenido Web \(E2\))\*\*", skill_text)
    if len(formal_deliverables) != 2 or "Solo hay **dos entregables formales**" not in skill_text:
        problems.append("SKILL.md: deben declararse exactamente dos entregables formales")
    if "no se aprueba ni se entrega por defecto" not in skill_text:
        problems.append("SKILL.md: el Dossier debe quedar interno, sin aprobación ni entrega por defecto")
    if "ni gate humano adicional" not in skill_text:
        problems.append("SKILL.md: el Dossier no debe crear un gate humano adicional")
    for phrase in ("content/internal/03-estrategia/estrategia-contenido.md",
                   "exactamente dos direcciones y 5–6 muestras comparables por dirección",
                   "content/entregables-cliente/02-contenido-web/contenido-web.md",
                   "Reconoce rutas antiguas", "no generes E1"):
        if phrase not in skill_text:
            problems.append(f"SKILL.md: falta contrato operativo de dossier/E1: {phrase}")

    strategy_text = (root / "assets/internal-content-strategy.md").read_text(encoding="utf-8")
    dossier_text = (root / "assets/internal-strategy-evidence.md").read_text(encoding="utf-8")
    e1_text = (root / "assets/deliverable-1-direction.md").read_text(encoding="utf-8")
    if "E1 ⊆ estado interno" not in strategy_text or "fuente primaria de edición" not in e1_text:
        problems.append("falta regla de derivación interno → E1")
    if "no sustituye" not in dossier_text.lower() or "no define por sí solo" not in dossier_text.lower():
        problems.append("Dossier debe distinguirse de la Estrategia de Contenido")
    if "content/internal/01-brief-diagnostico/" not in skill_text or "content/entregables-cliente/01-direccion-contenido-estructura/" not in skill_text:
        problems.append("SKILL.md: rutas canónicas incoherentes o incompletas")
    if "legacy" not in skill_text.lower() or "no rehagas research" not in skill_text.lower():
        problems.append("SKILL.md: compatibilidad legacy/migración no documentada")
    if "solo marca `LISTO` tras observar la ruta" not in skill_text or "command -v" not in skill_text:
        problems.append("SKILL.md: Planner LISTO requiere disponibilidad/ruta observada")
    editorial_contract = (root / "references/editorial-directions.md").read_text(encoding="utf-8").lower()
    if ("no existe dirección editorial aprobada" not in editorial_contract
            or "guía verbal disponible" not in editorial_contract
            or "5–6 muestras comparables por dirección" not in editorial_contract
            or "una dirección editorial ya aprobada" not in editorial_contract
            or "por sí sola no cuenta como dirección editorial aprobada" not in editorial_contract):
        problems.append("references/editorial-directions.md: condición de alternativas editoriales incompleta")
    if "| Secciones en orden / qué resuelven |" in e1_text:
        problems.append("E1: persiste la mega-celda de arquitectura obsoleta")
    if "Registra la especificación técnica interna completa de la dirección elegida" in dossier_text:
        problems.append("Dossier: duplica ficha editorial operativa de Estrategia")
    e1_after = e1_text.split("## 8. Qué pasa después", 1)[-1].split("<!-- COMPROBACIÓN INTERNA", 1)[0]
    if "aprobada esta dirección" not in e1_after.lower() or any(
            internal in e1_after.lower() for internal in ("estado interno", "snapshot", "resincron", "accept / adapt / escalate")):
        problems.append("E1: Qué pasa después debe ser texto cliente sin instrucciones internas")
    if "INSTRUCCIONES INTERNAS PARA EL AGENTE" not in e1_text:
        problems.append("E1: instrucciones del agente no están delimitadas como internas")
    if "INSTRUCCIONES INTERNAS PARA EL AGENTE" not in (root / "assets/deliverable-2-web-content.md").read_text(encoding="utf-8"):
        problems.append("E2: instrucciones de producción no están separadas del contenido entregable")
    e2_text = (root / "assets/deliverable-2-web-content.md").read_text(encoding="utf-8").lower()
    for internal_label in ("objetivo / categoría / patrón y variante",
                           "audiencia / necesidad / cluster e intención",
                           "claim/evidencia y estado"):
        if internal_label in e2_text:
            problems.append(f"E2: metadata metodológica interna en plantilla visible: {internal_label}")

    search_text = (root / "references/search-research.md").read_text(encoding="utf-8")
    for phrase in ("dos ejes", "estado operativo", "FALTA BASE RESPONSABLE",
                   "webfetch profundiza una URL pertinente", "exactamente uno de estos tokens",
                   "una paráfrasis", "Delta 0", "PRECISA",
                   "no afirmes el hecho como verificado a partir del slug"):
        if phrase not in search_text:
            problems.append(f"references/search-research.md: falta contrato de preflight/fetch: {phrase}")
    for legacy_status in ("Keyword Planner: no pertinente",
                          "Keyword Planner: no ejecutado — faltan seeds responsables",
                          "Keyword Planner: no disponible", "Keyword Planner: intento fallido"):
        if legacy_status in search_text:
            problems.append("references/search-research.md: estado Planner antiguo mezcla pertinencia y operación: "
                            + legacy_status)

    documents = [*root.rglob("*.md")]
    for root_document in (root.parent / "README.md", root.parent / "DECISIONS.md"):
        if root_document.is_file():
            documents.append(root_document)
    for document in documents:
        for line_number, line in enumerate(document.read_text(encoding="utf-8").splitlines(), 1):
            if "referencia histórica" in line.lower():
                continue
            for pattern in LEGACY_E1_PATTERNS:
                if pattern.search(line):
                    relative = document.relative_to(root.parent)
                    problems.append(f"{relative}:{line_number}: residuo de arquitectura E1 obsoleta: {pattern.pattern}")
                    break

    runs = root / "evals/results/runs.jsonl"
    for line_number, line in enumerate(runs.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError as error:
            problems.append(f"evals/results/runs.jsonl:{line_number}: JSON inválido ({error})")
            continue
        if not isinstance(record, dict):
            problems.append(f"evals/results/runs.jsonl:{line_number}: cada registro debe ser objeto")
            continue
        missing = RUN_FIELDS - record.keys()
        if missing:
            problems.append(f"evals/results/runs.jsonl:{line_number}: campos requeridos ausentes: "
                            + ", ".join(sorted(missing)))
            continue
        for field in RUN_STRING_FIELDS:
            if not isinstance(record[field], str):
                problems.append(f"evals/results/runs.jsonl:{line_number}: {field} debe ser texto")
        for field in RUN_LIST_FIELDS:
            if not isinstance(record[field], list):
                problems.append(f"evals/results/runs.jsonl:{line_number}: {field} debe ser lista")
        for field in ("holdout", "skill_enabled"):
            if not isinstance(record[field], bool):
                problems.append(f"evals/results/runs.jsonl:{line_number}: {field} debe ser booleano")
        if isinstance(record["suite"], str) and record["suite"] not in RUN_SUITES:
            problems.append(f"evals/results/runs.jsonl:{line_number}: suite desconocida: {record['suite']}")
        if isinstance(record["judgment"], str) and record["judgment"] not in RUN_JUDGMENTS:
            problems.append(f"evals/results/runs.jsonl:{line_number}: judgment desconocido: {record['judgment']}")
        for field in ("duration_seconds", "tokens"):
            value = record[field]
            if value != "not_observed" and (isinstance(value, bool) or not isinstance(value, (int, float))):
                problems.append(f"evals/results/runs.jsonl:{line_number}: {field} debe ser número o not_observed")
        if isinstance(record["failures"], list):
            for index, failure in enumerate(record["failures"], 1):
                if (not isinstance(failure, dict)
                        or not {"severity", "dimension", "evidence"}.issubset(failure)
                        or not isinstance(failure.get("severity"), str)
                        or failure.get("severity") not in {"critical", "major", "minor"}
                        or not isinstance(failure.get("dimension"), str)
                        or not isinstance(failure.get("evidence"), str)):
                    problems.append(f"evals/results/runs.jsonl:{line_number}: fallo {index} tiene esquema inválido")
    return problems


if __name__ == "__main__":
    issues = check()
    if issues:
        for issue in issues:
            print(f"ERROR: {issue}", file=sys.stderr)
        sys.exit(1)
    print(f"OK: frontmatter, {len(list(ROOT.rglob('*.md')))} Markdown, enlaces locales, runtime y estructura de evals (sin evaluar comportamiento)")
