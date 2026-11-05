"""Verifica procedencia literal, país, nulls, cobertura y preservación. Sin red."""
from pathlib import Path
import hashlib
import json
import re
from collections import Counter
from seleccion import QUESTIONS

ROOT = Path(__file__).resolve().parent
load = lambda name: json.loads((ROOT/name).read_text())
matrix, obs, coverage = load('matriz.json'), load('observaciones.json'), load('cobertura.json')
assert len(matrix) == len(QUESTIONS) == 48
assert {q['cluster'] for q in matrix} == {f'N{i:02}' for i in range(1,14)}
assert Counter(q['origen'] for q in matrix) == {'Keyword interrogativa':13,'Título orgánico':16,'Inferencia editorial':19}
assert Counter(q['prioridad'] for q in matrix) == {'Alta':26,'Media':17,'Baja':5}
assert len({q['pregunta'].casefold() for q in matrix}) == len(matrix)
assert len({o['oid'] for o in obs}) == len(obs) == 790
index = {o['oid']:o for o in obs}
for q in matrix:
    assert all(q[k] for k in ['intencion','necesidad','pagina','funcion','etapa','justificacion','confianza'])
    if q['origen'] == 'Inferencia editorial':
        assert not q['evidencia'] and not q['metricas'] and q['contexto']
    else:
        assert q['evidencia']
        assert all(index[oid]['origen'] == q['origen'] for oid in q['evidencia'])
    for metric in q['metricas']:
        assert metric == {k:index[metric['oid']][k] for k in metric}
    if q['origen'] == 'Título orgánico':
        assert not q['metricas']

codes = {2604:'PE',2484:'MX',2170:'CO'}
for o in obs:
    assert o['volumen'] is None or isinstance(o['volumen'],(int,float))
    path = ROOT.parent/o['ruta']
    assert path.is_file(),path
    if o['oid'] == 'W10-WF08':
        assert o['literal'] in path.read_text()
        continue
    d = json.loads(path.read_text())
    value = d
    for key, idx in re.findall(r'([\w]+)(?:\[(\d+)\])?',o['localizador']):
        value = value[key]
        if idx:value=value[int(idx)]
    assert o['literal'] == value.get('keyword',value.get('title'))
    assert o['fecha'] == d['at']
    if d['tool'] == 'research_keywords':
        seed_index = int(re.search(r'results\[(\d+)\]',o['localizador'])[1])
        arg = d['args']['seeds'][seed_index]
        assert o['volumen'] == value.get('searchVolume')
        assert o['kd'] == value.get('keywordDifficulty')
    elif d['tool'] == 'get_keyword_metrics':
        arg = d['args']
        assert o['volumen'] == value.get('search_volume')
        assert o['kd'] == value.get('keyword_difficulty')
    else:
        query_index = int(re.search(r'results\[(\d+)\]',o['localizador'])[1])
        arg = d['args']['queries'][query_index]
        assert o['volumen'] is None and o['kd'] is None
        assert o['url'] == value.get('url') and o['rank'] == value.get('rank')
    assert arg['languageCode'] == 'es' and codes[arg['locationCode']] == o['pais']

for name, digest in load('checksums.json').items():
    assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest() == digest,name
docs = [json.loads(p.read_text()) for p in (ROOT/'raw').glob('*.json')]
paid = [d for d in docs if d.get('tool')]
assert len(paid) == 10
assert all(d['args']['projectId'] == 'Default (contenedor autorizado)' for d in paid)
seeds = [s for d in paid if d['tool']=='research_keywords' for s in d['args']['seeds']]
assert len(seeds) == 12
assert Counter(codes[s['locationCode']] for s in seeds) == {'PE':6,'MX':3,'CO':3}
assert all(s['languageCode']=='es' for s in seeds)
new_results = [r for d in paid if d['tool']=='get_serp_results' for r in d['response']['results']]
assert len(new_results) == 30 and sum(bool(r['ok']) for r in new_results) == 27
new_modules = [i for r in new_results if r['ok'] for i in r['items'] if i['type'] in {'people_also_ask','related_searches'}]
assert Counter(i['type'] for i in new_modules) == {'people_also_ask':17,'related_searches':19}
assert all(not i.get('title') and not i.get('description') for i in new_modules)
assert sum(len(d['response']['keywords']) for d in paid if d['tool']=='get_keyword_metrics') == 5
assert sum(len(r['rows']) for d in paid if d['tool']=='research_keywords' for r in d['response']['results']) == 901
assert len(load('errores-serp.json')) == coverage['failed_serps'] == 3
assert coverage['new_serps_success'] == 27
assert coverage['expansion_rows'] == 901 and coverage['seed_country_operations'] == 12
assert coverage['metric_rows'] == 5 and coverage['metric_requests'] == 102
assert len(load('ausencias-metricas.json')) == 97
assert all(x['volumen'] is None for x in load('ausencias-metricas.json'))
assert coverage['paa_questions_verified'] == coverage['related_texts_verified'] == 0
assert coverage['new_paa_modules'] == 17 and coverage['new_related_modules'] == 19
assert coverage['credits_initial'] - coverage['credits_final'] == coverage['credits_used'] == 650
assert len({oid for q in matrix for oid in q['evidencia']}) == 74
assert all(q['estado'] == 'PROPUESTA — pendiente Gate B' for q in matrix)
print('OK:48 preguntas;13 clusters;790 observaciones trazadas;país/métricas/nulls;10 capturas pagadas;650 créditos;checksums íntegros.')
