"""Genera/valida trazabilidad, no copy. E2 deriva de Estrategia/E1, no de este script.

Sin APIs. --generar produce dos CSV internos desde fuentes y localizadores reales.
Sin esa opción solo valida. Baseline opcional: --baseline /ruta/archivo.json.
"""
from pathlib import Path
from collections import Counter
import argparse
import csv
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[2]
C = REPO/'content'
E1 = C/'entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md'
E2 = C/'entregables-cliente/02-contenido-web/contenido-web.md'
S = C/'internal/03-estrategia/estrategia-contenido.md'
MATRIX = C/'internal/02-research/preguntas-2026-11-05/matriz.json'
MAP = C/'internal/02-research/seo-rebuild-2026-11-05/candidatas.csv'

# Decisiones de aplicación ya definidas en Estrategia §§5–8. No hechos nuevos.
PAGES = {
 'Inicio':('N01;N02;N05;N06;N08;N10','Institucional/navegacional','AI PlayGrounds',['comunidad de inteligencia artificial','fundamentos de la inteligencia artificial','desarrollo de software con inteligencia artificial','inteligencia artificial en la investigación científica','inteligencia artificial en finanzas']),
 'Formación':('N11;N06;N07','Formativa/comparativa','curso de inteligencia artificial',['aprender inteligencia artificial','programación con inteligencia artificial','desarrollo de software con inteligencia artificial','AI Engineering','Software with AI']),
 'Empresas':('N12;N05;N06;N08;N10','Institucional/comercial/consulta','inteligencia artificial para empresas',['soluciones de inteligencia artificial para empresas','cursos de inteligencia artificial para empresas','herramientas de inteligencia artificial para empresas']),
 'Comunidad':('N02','Exploratoria/participativa','comunidad de inteligencia artificial',['comunidades de inteligencia artificial','comunidad de IA','eventos de inteligencia artificial']),
 'AI Labs':('N03','Institucional/exploratoria','proyectos de inteligencia artificial',['laboratorio de inteligencia artificial']),
 'Productos':('N04;N09','Exploratoria/comparativa','herramientas de inteligencia artificial',['productos de inteligencia artificial','herramientas de inteligencia artificial para programadores','herramientas de inteligencia artificial para investigación']),
 'Investigación':('N13;N08','Exploratoria/informativa','investigación en inteligencia artificial',['proyectos de investigación inteligencia artificial']),
 'Equipo':('N01','Institucional','',['AI PlayGrounds']),
 'Ficha de producto':('N04;N09','Evaluación de objeto/salida','',['herramientas de inteligencia artificial','productos de inteligencia artificial','herramientas de inteligencia artificial para investigación']),
 'Ficha de investigación':('N13;N08','Evaluación de trabajo/original','',['investigación en inteligencia artificial','inteligencia artificial en la investigación científica']),
}

# (tratamiento efectivo, secciones, explicación). No confundir esquema con respuesta.
QUESTION_USE = {
 1:('RESPONDIDA',['I1'],'Definición institucional expresa; inferencia editorial, no demanda medida.'),
 2:('RESPONDIDA',['I3','I5'],'Campos e iniciativas con funciones distintas; sin tres unidades equivalentes.'),
 3:('PROVISIONAL',['E2','E3'],'Roles/grupos confirmados; aportes detallados y permisos no acreditados.'),
 4:('EXCLUIDA',[],'Homónimo ajeno; no contenido sobre OpenAI Playground.'),
 5:('SOLO_REFERENCIA',[],'IAF ajeno; GB22 conserva contraste competitivo, no literal público.'),
  6:('RESPUESTA_EDITORIAL_ACCION_PENDIENTE',['C1','C4','C6','C7'],'Acceso general abierto por WhatsApp, sin formulario/evaluación; URL exacta pendiente. C7 informativo, equipo interno cerrado.'),
 7:('PENDIENTE',['C4'],'No hay requisitos/elegibilidad confirmados para responder el literal.'),
 8:('PENDIENTE',['B3'],'Campo condicional de datos por iniciativa; ningún requisito universal inventado.'),
 9:('EXCLUIDA',[],'GB22 excluye tutorial de gestión de proyectos de Labs.'),
 10:('PENDIENTE',['B3'],'Falta inventario activo, estado y posibilidad real de aporte.'),
 11:('EXCLUIDA',[],'Tutorial de construcción de modelos fuera del alcance.'),
 12:('PARCIAL',['DP1','DP3'],'Cobertura de la colección explicada; productos concretos pendientes.'),
 13:('PARCIAL',['DP1','DP2'],'Criterios utilidad/público/estado/acceso; comparación concreta depende del corpus.'),
 14:('PENDIENTE',['P2','P7'],'Campos de utilidad/límites/acceso sin objeto no equivalen a respuesta terminada.'),
 15:('EXCLUIDA',[],'Sin ranking universal de mejor IA, aunque haya métricas.'),
 16:('CONTEXTO',['I3'],'Se introduce campo de modelos; no se responde una definición general completa de IA.'),
 17:('CONTEXTO',['I3'],'Descriptor Foundations, no guía de funcionamiento ni curso básico.'),
 18:('EXCLUIDA',[],'Subtema enciclopédico fuera del website actual.'),
 19:('RESPONDIDA',['I3'],'Foundations trata fundamentos técnicos; formación en Academy.'),
 20:('CONTEXTO',['F1','F3'],'Orientación por tarea de Software with AI, no tutorial de primeros pasos.'),
 21:('PENDIENTE',['DP2','P2'],'Elección de asistente condicionada a corpus, no ganador inventado.'),
 22:('CONTEXTO',['F3'],'Se explican asistencia y revisión, no se acredita eficacia de aprendizaje.'),
 23:('RESPONDIDA',['F3'],'Comprender decisiones, revisar código y probarlo; criterio editorial, no garantía.'),
 24:('CONTEXTO',['F3'],'Descriptor de integración, sin apropiarse de título universitario o empleo.'),
 25:('CONTEXTO',['F3'],'Aplicaciones/sistemas integrados, no catálogo de puestos profesionales.'),
 26:('RESPONDIDA',['F3'],'Dos tareas y papel de IA comparados explícitamente.'),
 27:('EXCLUIDA',[],'GB22 excluye guía APA7; métrica fuente PE se conserva sin uso público.'),
 28:('PENDIENTE',['R4'],'Método/datos/validación modelados; ningún trabajo acredita aún valores.'),
 29:('PENDIENTE',['R5'],'Límites según original pendiente; no hallazgo inventado.'),
 30:('PENDIENTE',['DP2','P2'],'No hay inventario de herramientas científicas para comparar.'),
 31:('PENDIENTE',['P2','P7'],'Comprobación según herramienta pendiente; criterio no prueba fiabilidad.'),
 32:('PARCIAL',['I3','EM2'],'Campo financiero explicado, sin aplicación propia concreta acreditada.'),
 33:('CONTEXTO',['EM2'],'Contexto de problemas/procesos financieros, no guía completa de usos.'),
 34:('PARCIAL',['EM2','P2'],'Datos, errores y criterio humano en ámbito financiero; límites por producto pendientes.'),
 35:('PENDIENTE',['F4'],'Requisitos dependen de programas no recibidos.'),
 36:('PENDIENTE',['F4'],'Objetivos por curso pendientes; describir línea no inventa temario.'),
 37:('PARCIAL',['F1','F5'],'Academy como iniciativa y continuidad, no programa disponible o comparación de centros.'),
  38:('CONTEXTO_HISTORICO',['F4'],'Bootcamp gratuito de 2025 acreditado por responsable, no oferta gratuita actual o guía para aprender gratis.'),
  39:('RESPONDIDA_ESTADO',['F4','F5'],'Sin programas públicos vigentes o convocatorias activas, confirmado; condiciones futuras modeladas, no inventadas.'),
 40:('PARCIAL',['EM1','EM2'],'Ámbitos empresariales distinguidos de capacidades/ofertas, sin solución contratada.'),
 41:('CONTEXTO',['EM1','EM3'],'Marco de encaje/evidencia, sin tutorial o servicio de implementación.'),
 42:('CONTEXTO',['EM2','EM5'],'Distinción de tareas y aprendizaje, sin promesa no-code o requisitos ficticios.'),
  43:('PARCIAL',['EM3','EM4','EM5'],'Trayectoria encuentros/formación y posibilidad Academy acreditadas; no prueba capacidades en todas las verticales ni inventario de productos.'),
  44:('RESPUESTA_EDITORIAL_ACCION_PENDIENTE',['EM6'],'Datos mínimos, dos tipos y límites definidos en un formulario; privacidad/implementación pendientes, sin plazos/gestión interna.'),
 45:('APOYO_MODELO',['R2','R4','R5'],'GB22 media para campos; no guía prioritaria ni certificación de calidad.'),
 46:('APOYO_MODELO',['DI3'],'Resumen con pregunta/autor/estado previsto; no trabajo concreto seleccionable.'),
 47:('PENDIENTE',['DI3','R1','R2','R6'],'Campos claros, pero sin original/autoría/estado por instancia.'),
 48:('PENDIENTE',['DI4'],'Texto condicionado de revisión, sin proceso/criterios operativos confirmados.'),
}

# Evidence snippets selected for the actual answer, not an unrelated first paragraph.
QUESTION_QUOTES = {
  ('P01','I1'):'AI PlayGrounds es una organización enfocada en inteligencia artificial e impulsada por su comunidad.',
 ('P03','E3'):'| Jhonatan Morgan | Head of AI; líder de AI Foundations | Leadership Team y AI Foundations; un solo registro |',
  ('P13','DP1'):'Para evaluar una herramienta, empieza por la tarea que necesitas resolver.',
  ('P19','I3'):'Cómo funcionan los modelos y métodos de inteligencia artificial, cómo evaluarlos y cómo mejorarlos. AI Foundations se ocupa de los fundamentos técnicos de la IA.',
 ('P23','F3'):'La asistencia de IA no sustituye la revisión del código ni las pruebas.',
 ('P26','F3'):'| Tarea central | Integrar IA en aplicaciones o sistemas | Desarrollar software con apoyo de IA |',
  ('P32','EM2'):'Los problemas y procesos financieros en los que puede intervenir la IA.',
  ('P34','EM2'):'Importan la calidad de los datos, los errores posibles y las decisiones que deben seguir bajo responsabilidad humana.',
  ('P35','F4'):'| Requisitos | R | Conocimientos, herramientas y condiciones de participación reales |',
  ('P36','F4'):'| Objetivos | R | Qué se espera abordar/aprender, sin dominio o empleo garantizados |',
  ('P38','F4'):'En 2025 organizamos el **Bootcamp Gen AI Fundamentals**: una edición gratuita y práctica de seis semanas, con más de 300 inscritos y 16 speakers de Perú, Colombia y Estados Unidos.',
  ('P39','F4'):'Actualmente AI Academy no tiene cursos ni programas públicos vigentes, ni convocatorias activas.',
  ('P39','F5'):'Mientras no hay convocatorias públicas activas, puedes acercarte a la comunidad de AI PlayGrounds y recorrer sus actividades anteriores.',
  ('P43','EM3'):'Esta trayectoria refleja experiencia en articular comunidades, organizar actividades tecnológicas y desarrollar espacios de aprendizaje.',
  ('P44','EM6'):'Una consulta abre la conversación. No implica aceptación de la propuesta, contratación ni compromiso de ejecución.',
 ('P47','R2'):'| Autores | Autoría atribuida por la fuente original; remitente/editor no equivalen a autor |',
 ('P48','DI4'):'**CTA condicionado:** Proponer un trabajo → canal por confirmar.',
}


def cell(line):
    return [v.strip() for v in re.split(r'(?<!\\)\|',line)[1:-1]]


def anchor(text):
    return re.sub(r'[^\w\- ]','',re.sub(r'[`*_]','',text.casefold())).replace(' ','-')


def sections(text):
    result = {}
    page = None
    active = None
    for line in text.splitlines():
        if line.startswith('## '):
            active = None
        if line.startswith('## Página: ') or line.startswith('## Tipo de ficha: '):
            page = line.split(': ',1)[1]
        match = re.match(r'^### ((?:EM|DP|DI|I|F|C|B|E|P|R)\d+) · (.+)$',line)
        if match:
            sid, name = match.groups()
            assert sid not in result
            result[sid] = dict(page=page,name=name,heading=line[4:],lines=[])
            active = sid
        elif active:
            result[active]['lines'].append(line)
    for sid, section in result.items():
        section['text'] = '\n'.join(section.pop('lines')).strip()
        section['state'] = re.search(r'^\*\*Estado:\*\* ([A-E])$',section['text'],re.M)[1]
    return result


def excerpt(section):
    text = section['text']
    # Exact excerpt from a labeled copy or schema block; no invented quote.
    match = re.search(r'\*\*(?:Copy propuesto[^*]*|Contenido provisional[^*]*|Esquema por completar[^*]*|Modelo editorial preparado[^*]*):\*\*\s*([^\n]+)',text)
    if match:
        if match[1].startswith('|'):
            remaining=text[match.end():].splitlines()
            return next(line for line in remaining if line.startswith('| ') and not re.fullmatch(r'[| :\-]+',line))[:260]
        if not match[1].startswith('#'):
            return match[1][:260]
        return next(line for line in text[match.end():].splitlines() if line and not line.startswith(('#','**','|')))[:260]
    return next(line for line in text.splitlines() if line and not line.startswith('**'))[:260]


def write_csv(name,rows):
    with (ROOT/name).open('w') as handle:
        writer = csv.DictWriter(handle,fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def expected_architecture(e1):
    body = e1.split('### 4.3 Estructura de cada página',1)[1].split('## 5.',1)[0]
    result,page = {},None
    for line in body.splitlines():
        if line.startswith('#### '):
            page=line[5:].split(' · ')[0];result[page]=[]
        if re.match(r'^\| \d',line):result[page].append(cell(line)[1])
    return result


def run(generate=False,baseline=None):
    e1,e2,strategy = E1.read_text(),E2.read_text(),S.read_text()
    ss = sections(e2)
    questions = json.loads(MATRIX.read_text())
    qi = {q['id']:q for q in questions}
    candidates = list(csv.DictReader(MAP.open()))
    known_keywords = {r['keyword'] for r in candidates}
    arch = expected_architecture(e1)
    assert len(ss)==52 and len(arch)==10
    observed = {p:[v['name'] for v in ss.values() if v['page']==p] for p in PAGES}
    assert observed==arch,('architecture',observed,arch)
    expected_states = {
        'B': {'I4','F4','EM3','C3'},
        'C': {'B3','DP2','DP3','DI2','DI3','P1','P2','P3','P5','P6','P7','P9','R1','R2','R4','R5','R6','R7'},
        'D': {'EM5','EM6','C6'}, 'E': {'E3'},
    }
    expected_states['A'] = set(ss)-set.union(*expected_states.values())
    assert {state:{sid for sid,v in ss.items() if v['state']==state} for state in 'ABCDE'} == expected_states
    assert Counter(s['state'] for s in ss.values())=={'A':26,'B':4,'C':18,'D':3,'E':1}
    assert set(PAGES)=={v['page'] for v in ss.values()}
    assert len(qi)==len(QUESTION_USE)==48 and len(known_keywords)==69
    assert 'APROBADO por autorización humana Prompt4/4' in e1
    assert 'dirección APROBADA mediante E1 v2.2' in strategy
    assert e2.startswith('# Contenido Web — Versión Final\n')
    assert 'E2 v2.1 APROBADO EDITORIALMENTE el 05/11/2026' in e2
    assert '¿Apruebas esta versión final editorial' not in e2
    assert 'Esta aprobación no autoriza publicación ni implementación.' in e2
    assert '**H1:** Explora productos y herramientas de IA' in e2
    assert '**H1:** Investigaciones y trabajos relacionados con IA' in e2
    assert 'Decisión editorial aprobada para colecciones sin entradas' in e2
    assert 'No completamente publicable' in e2
    assert all('no publicable' in v['text'].casefold() for v in ss.values() if v['state'] in 'BCDE')
    assert all(main in known_keywords or main=='' for _,_,main,_ in PAGES.values())
    assert all(k in known_keywords for *_,secondary in PAGES.values() for k in secondary)
    q_by_section={sid:[] for sid in ss}
    for n,(_,ids,_) in QUESTION_USE.items():
        for sid in ids:
            assert sid in ss
            q_by_section[sid].append(f'P{n:02}')
    records=[]
    seen_pages=set()
    for sid,section in ss.items():
        clusters,intent,main,secondary=PAGES[section['page']]
        ids=q_by_section[sid]
        page_header=re.split(r'^## (?:Página|Tipo de ficha): '+re.escape(section['page'])+r'\n',e2,flags=re.M)[1].split('\n### ',1)[0]
        metadata={label:(re.search(r'^\*\*'+label+r':\*\* (.+)$',page_header,re.M)[1] if re.search(r'^\*\*'+label+r':\*\* (.+)$',page_header,re.M) else 'Modelo no publicable: necesita objeto/original') for label in ['SEO title','Meta description','H1']}
        # Fuentes reales por bloque, sin convertir el research SEO en prueba de hechos propios.
        factual = {
            'I1':'C01;E221/H00:origen', 'I2':'C01;H00:actividad',
            'I3':'C02;B1:cuatro campos', 'I4':'H00;H01;H04;L03',
            'I5':'C02;E221:personalizacion potencial', 'I8':'C01;E221:comunidad abierta/contacto',
            'F1':'C02', 'F3':'C02', 'F4':'H04;E221:sin programas vigentes',
            'F6':'E221:Academy personalizada potencial', 'F5':'E221:sin convocatorias',
            'EM1':'C01;H00–H04', 'EM2':'C02', 'EM3':'H00;H01;H02;H03;H04',
            'EM4':'C02:funcion Labs, sin objetos', 'EM5':'E221:Academy potencial',
            'EM6':'E221:formulario/tipos/campos, no sistema existente',
            'C1':'C01;E221:acceso abierto', 'C3':'L01;L02;L03;L04;H01;H02;H03;H04',
            'C4':'E221:comunidad/equipo separados', 'C6':'E221:WhatsApp abierto, URL no recibida',
            'C7':'E221:equipo cerrado;C02:Labs informativo',
            'E1':'GB22/E221:15 personas', 'E2':'GB22/E221:estructura/PR',
            'E3':'GB22/E221:roster/roles/PR, no permisos', 'E4':'E221:comunidad abierta;C02:Labs',
        }.get(sid, 'C01/C02:modelo/funcion aprobada;C07/C09:sin fuente de objeto recibido')
        dependency = {
            'A':'Revision editorial; destinos internos/propuesta UI por validar. Acciones de postulacion no habilitadas, si aparecen en notas.',
            'B':'Revision editorial; atribucion/contexto historico conservados. Materiales opcionales con permiso; sin convocatoria vigente.',
            'C':'Instancias/originales/permisos no recibidos; modelo completo no es contenido publico completo. No renderizar registros ficticios.',
            'D':'URL WhatsApp (C6) o privacidad/implementacion de formulario unico (EM5/EM6). No activar antes de prueba real.',
            'E':'Permisos personales por dato/material; bio/foto/enlace opcionales ausentes no se inventan.',
        }[section['state']]
        records.append(dict(seccion=sid,pagina=section['page'],nombre_e1=section['name'],
          clusters=clusters,intencion=intent,keyword_principal_candidata=main,
          secundarias_candidatas=';'.join(secondary),preguntas=';'.join(ids),
          origen_preguntas=';'.join(f'{pid}:{qi[pid]["origen"]}' for pid in ids),
          estado_e2=section['state'],naturaleza_fragmento={'A':'COPY_INSTITUCIONAL_REVISION','B':'COPY_HISTORICO_DOCUMENTADO','C':'MODELO_SIN_REGISTROS','D':'ACCION_EDITORIAL_NO_IMPLEMENTADA','E':'CONTENIDO_CON_DATO_ESENCIAL_PENDIENTE'}[section['state']],
          extracto_literal=excerpt(section),
          localizador='../../entregables-cliente/02-contenido-web/contenido-web.md#'+anchor(section['heading']),
          metadatos_pagina=json.dumps(metadata,ensure_ascii=False) if section['page'] not in seen_pages else '',
          fuente_factual=factual,dependencia=dependency,
          fuente_keyword_map='../02-research/keyword-map.md#clusters-keywords-y-evidencia',
          fuente_matriz_preguntas='../02-research/preguntas-2026-11-05/matriz.json',
          base='E1v2.2;Estrategia§5–8.3/§14E221;KeywordMapN01–N13;ResearchR3/R4/R10/R11;matriz48;EvidenciaH00–H04/L00–L04 según sección',
          limite='Candidatas no targets/demanda propia; modelos sin entradas no copy público completo; histórico no oferta vigente; acción no implementada; no PAA'))
        seen_pages.add(section['page'])
    qr=[]
    for number,(use,ids,reason) in QUESTION_USE.items():
        pid=f'P{number:02}';q=qi[pid]
        quotes={sid:QUESTION_QUOTES.get((pid,sid),excerpt(ss[sid])) for sid in ids}
        assert all(quote in ss[sid]['text'] for sid,quote in quotes.items())
        qr.append(dict(pregunta_id=pid,cluster=q['cluster'],pregunta=q['pregunta'],origen=q['origen'],
          prioridad_research=q['prioridad'],procedencia=';'.join(q['evidencia']) or q['contexto'],
          mercados_fuente=';'.join(q['paises']),tratamiento_e2=use,secciones=';'.join(ids),
          estado_secciones=';'.join(f'{sid}:{ss[sid]["state"]}' for sid in ids),
          motivo=reason,extractos=json.dumps(quotes,ensure_ascii=False)))
    if generate:
        write_csv('trazabilidad-e2.csv',records)
        write_csv('preguntas-e2.csv',qr)
    for name,expected in [('trazabilidad-e2.csv',records),('preguntas-e2.csv',qr)]:
        actual=list(csv.DictReader((ROOT/name).open()))
        assert actual==expected,('regenerar matriz tras cambio de copy',name)
    for record in records:
        assert record['extracto_literal'] in ss[record['seccion']]['text']
        relative,_,fragment=record['localizador'].partition('#')
        assert (ROOT/relative).resolve()==E2.resolve()
        assert fragment==anchor(ss[record['seccion']]['heading'])
    for n,(use,ids,_) in QUESTION_USE.items():
        if use in {'RESPONDIDA','RESPONDIDA_ESTADO'}:assert all(ss[sid]['state'] in 'AB' for sid in ids)

    # Metadatos de ocho páginas y dos modelos, sin instancias ficticias.
    assert len(re.findall(r'^\*\*SEO title:\*\*',e2,re.M))==8
    assert len(re.findall(r'^\*\*Meta description:\*\*',e2,re.M))==8
    assert len(re.findall(r'^\*\*H1:\*\*',e2,re.M))==8
    assert e2.count('**Metadatos — esquema por completar, no publicable:**')==2
    assert len(set(re.findall(r'^\*\*SEO title:\*\* (.+)$',e2,re.M)))==8
    assert len(set(re.findall(r'^\*\*Meta description:\*\* (.+)$',e2,re.M)))==8
    formation = e2.split('## Página: Formación',1)[1].split('## Página: Empresas',1)[0]
    assert '→ Formación' not in formation
    assert 'CTA principal:** Ir a la comunidad → Comunidad' in formation
    assert 'Actualmente AI Academy no tiene cursos ni programas públicos vigentes, ni convocatorias activas.' in formation
    assert 'Mecanismo de inscripción' in ss['F4']['text'] and 'Temario' in ss['F4']['text']
    assert 'En 2025 organizamos el **Bootcamp Gen AI Fundamentals**' in ss['F4']['text']
    assert 'formación personalizada mediante AI Academy' in ss['F6']['text']
    # Exact roster in a single provisional personal table.
    people=[cell(line) for line in ss['E3']['text'].splitlines() if line.startswith('| ') and cell(line)[0] not in {'Persona única'}]
    names=[p[0] for p in people]
    assert len(names)==len(set(names))==15
    assert names.count('Jhonatan Morgan')==1
    assert any(p[0]=='Jhonatan Morgan' and 'AI Foundations' in p[1] and 'Head of AI' in p[1] for p in people)
    assert 'Edhú Nuñez' in names and 'Kevin Huaman' in names and 'Rocio Laura' in names
    assert any(p[0]=='Appu Dávila' and p[1]=='Public Relations (Relaciones Públicas)' for p in people)
    assert 'Edhú Núñez' not in e2 and 'Kevin Huamán' not in e2
    assert all(v in e2 for v in ['AI Foundations','AI for Software','AI for Science','AI for Finance'])
    assert not re.search(r'^### .*FAQ',e2,re.M)
    # E221: canales definidos editorialmente, nunca enlaces ficticios o implementación asumida.
    assert '**CTA principal:** Unirme a la comunidad → `WHATSAPP_INVITACION_PENDIENTE`.' in ss['C6']['text']
    assert 'sin formulario ni evaluación' in strategy
    assert 'incorporación al equipo CERRADA' in ss['C7']['text']
    assert 'Solicitar una conversación →' not in ss['C7']['text']
    assert 'no hay eventos próximos o vigentes que anunciar' in ss['C3']['text']
    assert len([v for v in ss.values() if v['page']=='Empresas'])==6
    assert '**CTA principal:** Explorar AI Labs → AI Labs.' in ss['EM4']['text']
    for label in ['Consultar formación para mi equipo','Proponer una alianza','Cuéntanos tu necesidad']:
        assert label in ss['EM5']['text']+ss['EM6']['text']
    form=ss['EM6']['text']
    for field in ['Tipo de consulta *','Nombre y apellido *','Organización o empresa *','Cargo o función (opcional)','Correo electrónico *','País (opcional)','Cuéntanos qué tienes en mente *','Consentimiento de privacidad']:
        assert form.count('| '+field+' |')==1,field
    assert 'recepción confirmada' in form.casefold() and 'POLITICA_PRIVACIDAD_PENDIENTE' in form
    assert 'El visitante siempre puede revisar/modificar' in form
    assert 'sin soporte, selección manual obligatoria' in form
    for event_id in ['0ott2q9m','yzjagyu0','gjk5qy7b','0bg0xu7s']:
        assert 'https://luma.com/'+event_id in ss['C3']['text']
    assert all('?' not in u for u in re.findall(r'https://luma\.com/[^\s|)]+',e2))
    assert not re.search(r'https?://(?:chat\.whatsapp\.com|[^\s]+\.(?:example|test))',e2)
    for metric in ['1.200 postulantes','56 equipos','36 horas','800 postulantes','22 equipos y proyectos','150 participantes','7 speakers','300 inscritos','16 speakers']:
        assert metric in ss['EM3']['text'],metric
    for sid in ['B3','DP2','DP3','DI2','DI3']:
        assert 'Modelo editorial preparado — no publicable' in ss[sid]['text']
    # Verify links/tables/whitespace of active documents; skip historical snapshots.
    paths=[E1,E2,S,ROOT/'feedback-e1.md',ROOT/'feedback-e2.md',ROOT/'validacion-e2.md',
           C/'README.md',C/'entregables-cliente/README.md',S.parent/'dossier-evidencia-estrategica.md',
           S.parent/'evidencia-historica-e21.md']
    links,tables=0,0
    for path in paths:
        text=path.read_text();width=None
        for line in text.splitlines():
            assert line.rstrip()==line,(path,'whitespace')
            if line.startswith('|'):
                size=len(cell(line))
                if width is None:width=size;tables+=1
                assert width==size,(path,line)
            else:width=None
        for _,target in re.findall(r'\[([^\]]*)\]\(([^)]+)\)',text):
            if re.match(r'\w+://',target):continue
            name,_,fragment=target.partition('#');dest=path.parent/name if name else path
            assert dest.exists(),(path,target)
            if fragment and dest.suffix=='.md':
                headings={anchor(h) for h in re.findall(r'^#+\s+(.+)$',dest.read_text(),re.M)}
                assert fragment in headings,(path,target)
            links+=1
    approved_sections=E1.read_text().split('### 4.3 Estructura de cada página',1)[1].split('## 5.',1)[0]
    assert len(re.findall(r'^\| \d',approved_sections,re.M))==52
    changed=None
    if baseline:
        original=json.loads(Path(baseline).read_text())
        changed=[name for name,digest in original.items() if not (REPO/name).is_file() or hashlib.sha256((REPO/name).read_bytes()).hexdigest()!=digest]
        allowed={str(p.relative_to(REPO)) for p in paths if p!=E1}
        allowed.update(str((ROOT/name).relative_to(REPO)) for name in ['validar-e2.py','trazabilidad-e2.csv','preguntas-e2.csv'])
        assert set(changed)<=allowed,('scope',set(changed)-allowed)
        # E1 only approval-state changes: keep all its architecture/body except two status lines.
        # Captured body hash saved before writing E2 in preservacion-e2.json.
    protection=json.loads((ROOT/'preservacion-e2.json').read_text())
    for name,digest in protection['files'].items():
        assert hashlib.sha256((REPO/name).read_bytes()).hexdigest()==digest,('protected',name)
    assert hashlib.sha256('\n'.join(line for line in e1.splitlines() if not line.startswith('**Versión / fecha / estado:') and not line.startswith('**Estado: E1 v2.2')).encode()).hexdigest()==protection['e1_body_without_status_sha256']
    return dict(result='OK',secciones=52,por_estado=dict(Counter(v['state'] for v in ss.values())),
      paginas=8,plantillas=2,personas=15,clusters=13,candidatas=69,preguntas=48,
      tratamiento_preguntas=dict(Counter(r['tratamiento_e2'] for r in qr)),
      links=links,tablas=tables,fuentes_protegidas=len(protection['files']),originales_modificados=changed)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--generar',action='store_true')
    parser.add_argument('--baseline')
    options=parser.parse_args()
    print(json.dumps(run(options.generar,options.baseline),ensure_ascii=False,indent=2))
