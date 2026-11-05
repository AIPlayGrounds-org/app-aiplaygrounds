"""Compilación local reproducible. No APIs; selección editorial en seleccion.py."""
from pathlib import Path
from collections import Counter
import csv
import hashlib
import json
import re
import unicodedata
from seleccion import QUESTIONS

ROOT = Path(__file__).resolve().parent
OLD = ROOT.parent / 'seo-rebuild-2026-11-05'
COUNTRIES = {2604: 'PE', 2484: 'MX', 2170: 'CO'}


def norm(text):
    text = ''.join(c for c in unicodedata.normalize('NFD', text.casefold()) if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', ' ', text).strip()


def dump(name, data):
    (ROOT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def csvout(name, data):
    with (ROOT / name).open('w') as f:
        writer = csv.DictWriter(f, fieldnames=list(data[0]))
        writer.writeheader()
        writer.writerows(data)


observations, serps, failures, absent = [], [], [], []
stats = Counter()
for base, prefix in [(OLD / 'raw', 'OLD:'), (ROOT / 'raw', '')]:
    for path in sorted(base.glob('*.json')):
        d = json.loads(path.read_text())
        tool, args = d.get('tool'), d.get('args', {})
        if tool not in {'research_keywords', 'get_keyword_metrics', 'get_serp_results'}:
            continue
        source = prefix + d['id']
        date = d.get('at')
        if tool == 'research_keywords':
            for seed_index, (arg, result) in enumerate(zip(args['seeds'], d['response']['results']), 1):
                if not prefix:
                    stats['seed_country_operations'] += 1
                    stats['expansion_rows'] += len(result.get('rows', []))
                for index, row in enumerate(result.get('rows', []), 1):
                    text = row['keyword']
                    # Interrogativas iniciales y formulaciones invertidas; no todo seed es evidencia.
                    if re.match(r'^(que |como |cual |cuales |donde |para que |por que |quien |cuanto |cuantos |se puede |es necesario )', norm(text)) or re.search(r'\b(que es|como funciona)$', norm(text)):
                        observations.append(dict(oid=f'{source}-S{seed_index}-R{index}', source=source, origen='Keyword interrogativa', literal=text, pais=COUNTRIES[arg['locationCode']], idioma='es', fecha=date, consulta=arg['seed'], url=None, rank=None, volumen=row.get('searchVolume'), kd=row.get('keywordDifficulty'), intent_auto=row.get('intent'), ruta=f'{base.relative_to(ROOT.parent)}/{path.name}', localizador=f'response.results[{seed_index-1}].rows[{index-1}]'))
        elif tool == 'get_keyword_metrics':
            returned = d['response']['keywords']
            if not prefix:
                stats['metric_requests'] += len(args['keywords'])
                stats['metric_rows'] += len(returned)
                for keyword in args['keywords']:
                    if norm(keyword) not in {norm(r['keyword']) for r in returned}:
                        absent.append(dict(source=source, pais=COUNTRIES[args['locationCode']], keyword=keyword, volumen=None, estado='SIN_FILA_DEVUELTA — desconocido, no cero'))
            for index, row in enumerate(returned, 1):
                text = row['keyword']
                if not re.match(r'^(que |como |cual |cuales |donde |para que |por que |quien |cuanto |se puede |es necesario )', norm(text)):
                    continue
                observations.append(dict(oid=f'{source}-R{index}', source=source, origen='Keyword interrogativa', literal=text, pais=COUNTRIES[args['locationCode']], idioma='es', fecha=date, consulta=text, url=None, rank=None, volumen=row.get('search_volume'), kd=row.get('keyword_difficulty'), intent_auto=row.get('main_intent'), ruta=f'{base.relative_to(ROOT.parent)}/{path.name}', localizador=f'response.keywords[{index-1}]'))
        else:
            for index, (arg, result) in enumerate(zip(args['queries'], d['response']['results']), 1):
                sid = f'{source}-Q{index:02}'
                if not result.get('ok'):
                    failures.append(dict(serp=sid, pais=COUNTRIES[arg['locationCode']], consulta=arg['keyword'], respuesta=result))
                    continue
                items = result.get('items', [])
                serps.append(dict(id=sid, pais=COUNTRIES[arg['locationCode']], consulta=arg['keyword'], paa=sum(i.get('type') == 'people_also_ask' for i in items), related=sum(i.get('type') == 'related_searches' for i in items)))
                for item_index, item in enumerate(items):
                    title = item.get('title') or ''
                    if item.get('type') != 'organic' or not ('?' in title or '¿' in title or re.match(r'^(que |como |cual |cuales |donde |para que |por que )', norm(title))):
                        continue
                    observations.append(dict(oid=f'{sid}-I{item_index+1}', source=sid, origen='Título orgánico', literal=title, pais=COUNTRIES[arg['locationCode']], idioma='no_es_o_mixto' if re.match(r'^(how |what |which |why |can |is )', title.casefold()) else 'es_observado', fecha=date, consulta=arg['keyword'], url=item.get('url'), rank=item.get('rank'), volumen=None, kd=None, intent_auto=None, ruta=f'{base.relative_to(ROOT.parent)}/{path.name}', localizador=f'response.results[{index-1}].items[{item_index}]'))

# W10 es resultado websearch, contrastado en WF08; no posee país SERP ni métricas.
observations.append(dict(oid='W10-WF08', source='W10/WF08', origen='Título orgánico', literal='¿Cómo elegir qué herramienta de IA utilizar?', pais='Sin mercado asignable', idioma='es_traduccion_automatica', fecha='2026-11-05', consulta='"¿Cómo elegir" "herramienta" "inteligencia artificial"', url='https://pitchavatar.com/es/how-should-you-choose-which-ai-tool-to-use', rank=None, volumen=None, kd=None, intent_auto=None, ruta='preguntas-2026-11-05/fuentes-web.md', localizador='WF08'))

matrix = []
for index, original in enumerate(QUESTIONS, 1):
    q = dict(original)
    terms = {norm(q['match']), *(norm(a) for a in q['aliases'])} - {''}
    matches = [o for o in observations if o['origen'] == q['origen'] and norm(o['literal']) in terms]
    if q['origen'] != 'Inferencia editorial' and not matches:
        raise ValueError(f'Sin fuente literal: {q["pregunta"]} / {terms}')
    confidence = 'Editorial sustentada en contexto; demanda literal no acreditada'
    if q['origen'] == 'Keyword interrogativa':
        confidence = 'Alta en literal/mercado del proveedor; media en intención; volumen estimado, no audiencia propia'
    elif matches:
        confidence = 'Alta en título devuelto; media en intención; destino/cuerpo no verificado salvo WF02/WF04/WF08'
    q.update(id=f'P{index:02}', evidencia=[m['oid'] for m in matches], paises=sorted({m['pais'] for m in matches}) or ['Aplicación editorial transversal; sin demanda nacional acreditada'], confianza=confidence, metricas=[{k: m[k] for k in ['oid', 'literal', 'pais', 'idioma', 'fecha', 'volumen', 'kd', 'intent_auto']} for m in matches if m['origen'] == 'Keyword interrogativa'])
    matrix.append(q)

selected = {oid for q in matrix for oid in q['evidencia']}
for o in observations:
    o['seleccion'] = 'CANONICA_SELECCIONADA' if o['oid'] in selected else 'NO_SELECCIONADA — no equivale a oportunidad'
    o['alertas'] = '; '.join(x for x, flag in [('Idioma no español/mixto', o['idioma'] == 'no_es_o_mixto'), ('Título truncado: no completar', '...' in o['literal'] or '…' in o['literal']), ('Redirect Google: URL destino no verificada', bool(o['url'] and 'google.com/goto' in o['url']))] if flag)

coverage = dict(stats)
coverage.update(canonical_questions=len(matrix), by_origin=dict(Counter(q['origen'] for q in matrix)), by_priority=dict(Counter(q['prioridad'] for q in matrix)), by_function=dict(Counter(q['funcion'] for q in matrix)), observed_candidates=len(observations), unique_literal_origin_country=len({(norm(o['literal']), o['origen'], o['pais']) for o in observations}), selected_observations=len(selected), selected_observations_by_origin=dict(Counter(o['origen'] for o in observations if o['oid'] in selected)), observed_by_origin=dict(Counter(o['origen'] for o in observations)), selected_by_country=dict(Counter(o['pais'] for o in observations if o['oid'] in selected)), new_serps_success=sum(not s['id'].startswith('OLD:') for s in serps), failed_serps=len(failures), new_paa_modules=sum(s['paa'] for s in serps if not s['id'].startswith('OLD:')), new_related_modules=sum(s['related'] for s in serps if not s['id'].startswith('OLD:')), paa_questions_verified=0, related_texts_verified=0, credits_initial=7820, credits_final=7170, credits_used=650, clusters={cluster:dict(total=len(qs), origins=dict(Counter(q['origen'] for q in qs)), high=[q['id'] for q in qs if q['prioridad']=='Alta']) for cluster in sorted({q['cluster'] for q in matrix}) for qs in [[q for q in matrix if q['cluster']==cluster]]})
dump('matriz.json', matrix)
dump('observaciones.json', observations)
dump('cobertura.json', coverage)
dump('serps.json', serps)
dump('errores-serp.json', failures)
dump('ausencias-metricas.json', absent)
csvout('matriz.csv', [{k:json.dumps(v, ensure_ascii=False) if isinstance(v,list) else v for k,v in q.items()} for q in matrix])
csvout('observaciones.csv', observations)

lines = ['# Matriz interna de preguntas · AI PlayGrounds v2', '', '**05/11/2026 · PROPUESTA para Gate B, sin aprobación.** No es un entregable cliente ni una revisión de E1/E2.', '', f'{len(matrix)} preguntas canónicas: '+ '; '.join(f'{n} {kind.lower()}' for kind,n in coverage['by_origin'].items())+'. PAA verificadas:0. Búsquedas relacionadas textuales:0.', '', '## Lectura y trazabilidad', '', '- Una keyword recuperada prueba una expresión en la base del proveedor; un título prueba una formulación publicada, no que usuarios la busquen. Las inferencias no son búsquedas verificadas.', '- Las métricas pertenecen a cada literal, país, idioma y fecha. Nunca sumar alias, seeds o países. `null` significa desconocido;0 se conserva únicamente si lo devolvió el proveedor.', '- `OLD:` identifica evidencia anterior íntegra; el resto está en `raw/`. Cada observación conserva ruta y localizador JSON, consulta, fecha, URL/posición y texto literal. Las fechas son de consulta, no de actualización de la base de volumen.', '- La pregunta canónica corrige ortografía o agrupa equivalentes; consultar alias y literales. Las consultas solicitadas sin filas no cuentan como preguntas descubiertas. Las observaciones no seleccionadas incluyen ruido/idiomas ajenos/títulos incompletos; no se promueven a oportunidades.', '- País SERP no equivale a país del sitio. IAF es argentino aunque apareció en MX. W10/WF08 no permite atribución nacional.', '- Funciones E1/E2 son recomendaciones para revisión futura; se mantienen ocho páginas y dos tipos de ficha. FAQ contextual es opcional, nunca un formato obligatorio.', '', '## Cobertura de los trece clusters', '', '| Cluster | Canónicas | Keywords / títulos / editoriales | Alta prioridad |', '|---|---:|---|---|']
for cluster, c in coverage['clusters'].items():
    lines.append(f'| {cluster} | {c["total"]} | '+ ' / '.join(str(c['origins'].get(k,0)) for k in ['Keyword interrogativa','Título orgánico','Inferencia editorial']) +f' | {", ".join(c["high"])} |')
for q in matrix:
    lines += ['', f'## {q["id"]} · {q["cluster"]} · {q["pregunta"]}', '', f'- **Origen:** {q["origen"]}. **Prioridad:** {q["prioridad"]}. **Intención:** {q["intencion"]}.', f'- **Necesidad:** {q["necesidad"]}.', f'- **Destino candidato:** {q["pagina"]}. **Función:** `{q["funcion"]}`. **Decidir en:** {q["etapa"]}.', f'- **Relevancia / justificación:** {q["justificacion"]}.', f'- **Confianza:** {q["confianza"]}. **Mercado observado:** {"; ".join(q["paises"])}.', f'- **Contexto de apoyo:** {q["contexto"] or "Observaciones literales indicadas debajo"}.', '- **Observaciones fuente:** '+(', '.join(q['evidencia']) or 'Ninguna consulta literal: inferencia editorial; contexto anterior, no métrica.'), '- **Métricas por literal y mercado:** '+(json.dumps(q['metricas'],ensure_ascii=False) if q['metricas'] else 'Desconocidas/no aplicables; no cero.')]
lines += ['', '## Archivos de consulta', '', '- [Matriz CSV](matriz.csv) / [JSON](matriz.json): campos completos, alias, etapas y fuentes.', '- [Observaciones CSV](observaciones.csv) / [JSON](observaciones.json): literales y localizadores hacia las respuestas.', '- [Cobertura computada](cobertura.json), [SERP](serps.json), [fallos](errores-serp.json), [ausencias de métricas](ausencias-metricas.json).', '- [Fuentes web y límites](fuentes-web.md), [preflight](preflight.md), [cierre e interpretación](cierre.md).', '', 'Reproducir: `python content/internal/02-research/preguntas-2026-11-05/compilar.py`. Validar con `validar.py` en la misma carpeta.', '']
(ROOT / 'matriz.md').write_text('\n'.join(lines))
dump('checksums.json', {str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((ROOT/'raw').glob('*.json'))})
print(json.dumps(coverage,ensure_ascii=False,indent=2))
