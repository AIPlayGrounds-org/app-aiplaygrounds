"""QA documental de E1 v2.2. Solo lectura; no red, APIs, compilación o cambios de Git."""
from pathlib import Path
from collections import Counter
import csv
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[3]
CONTENT = REPO / 'content'
STRATEGY = CONTENT / 'internal/03-estrategia/estrategia-contenido.md'
CLIENT = CONTENT / 'entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md'
EXPECTED = {'Inicio':6,'Equipo':4,'Comunidad':5,'Formación':5,'Empresas':6,
            'AI Labs':5,'Productos':4,'Ficha de producto':7,'Investigación':4,'Ficha de investigación':6}
OLD_COUNTS = {'Inicio':7,'Equipo':4,'Comunidad':7,'Formación':6,'Empresas':6,
              'AI Labs':5,'Productos':4,'Ficha de producto':9,'Investigación':4,'Ficha de investigación':7}
NAMES = ['Soledad Ñahui','Jhonatan Morgan','Edhú Nuñez','Joseph Robles','Julio Montreul',
         'Max Veramendi','Jheslyn Lagos','Ricardo Quispe','David Durán','Pedro Rojas',
         'Kevin Huaman','Edith Canelo','Rocio Laura','Appu Dávila','Milagros Dimas']


def between(text, start, end):
    return text.split(start,1)[1].split(end,1)[0]


def cells(line):
    return [v.strip() for v in re.split(r'(?<!\\)\|',line)[1:-1]]


def architectures(text, heading):
    result, page = {}, None
    for line in text.splitlines():
        if line.startswith(heading):
            page = line[len(heading):].split(' · ')[0]
            result[page] = []
        if re.match(r'^\| \d',line):
            values = cells(line)
            result[page].append((int(values[0].split()[0]), values[1]))
    return result


s, e = STRATEGY.read_text(), CLIENT.read_text()
internal = architectures(between(s,'## 6. Arquitectura completa por página','## 7. Recorridos principales'),'### ')
external = architectures(between(e,'### 4.3 Estructura de cada página','## 5. Cómo se moverán'),'#### ')
assert internal == external
assert {p:len(rows) for p,rows in internal.items()} == EXPECTED
assert sum(EXPECTED.values()) == 52
for rows in internal.values():
    assert [n for n,_ in rows] == list(range(1,len(rows)+1))
assert len({name for _,name in internal['Inicio']}) == 6
assert internal['Inicio'][-1][1] == 'Acércate a AI PlayGrounds'
assert internal['Empresas'][1][1] == 'Cuatro verticales y ámbitos de aplicación'
assert internal['Formación'][-1][1] == 'Estado y siguiente paso'

previous = ROOT/'previous'
for name,digest in json.loads((previous/'checksums.json').read_text()).items():
    assert hashlib.sha256((previous/name).read_bytes()).hexdigest() == digest,name
old = architectures(between((previous/'e1-v2.1.md').read_text(),'### 4.3 Estructura de cada página','## 5. Cómo se moverán'),'#### ')
assert {p:len(rows) for p,rows in old.items()} == OLD_COUNTS
assert sum(OLD_COUNTS.values()) == 59

roster = between(s,'### Roster canónico confirmado por GB22','## 6.')
people = [cells(line) for line in roster.splitlines() if line.startswith('| PER')]
assert len(people) == len({r[0] for r in people}) == len({r[1] for r in people}) == 15
assert [r[1] for r in people] == NAMES
assert sum(r[1]=='Jhonatan Morgan' for r in people) == 1
jhonatan = next(r for r in people if r[1]=='Jhonatan Morgan')
assert 'Head of AI' in jhonatan[2] and 'AI Foundations' in jhonatan[3]
assert 'PR pendiente' in next(r for r in people if r[1]=='Appu Dávila')[3]
assert all(name in e for name in NAMES)
assert not any(wrong in s+e for wrong in ['Edhú Núñez','Kevin Huamán','Rocío Laura'])

coverage = between(s,'### 8.3 Preguntas con ownership','### 8.4')
question_ids = [pid for line in coverage.splitlines() if line.startswith('| P') for pid in re.findall(r'P\d{2}',cells(line)[0])]
assert Counter(question_ids) == Counter(f'P{i:02}' for i in range(1,49))
for pid,required in [('P05','Solo evidencia competitiva'),('P09','Fuera del plan E1/E2'),('P27','Fuera del plan E1/E2'),('P45','media')]:
    row = next(line for line in coverage.splitlines() if line.startswith('| '+pid+' '))
    assert required in row,(pid,row)

seo = between(s,'### 8.1 Intención, cluster/topic y responsabilidad','### 8.2')
seo_rows = [cells(line) for line in seo.splitlines() if line.startswith('| ') and cells(line)[0].split(' · ')[0] in EXPECTED]
assert len(seo_rows) == 10
assert {c for row in seo_rows for c in re.findall(r'N\d{2}',row[0])} == {f'N{i:02}' for i in range(1,14)}
assert all(len(row)==5 and all(row) for row in seo_rows)
assert not re.search(r'\bK[0-5]\b|T1–T4',s)
b2 = (CONTENT/'internal/01-brief-diagnostico/diagnostico-b2.md').read_text()
assert {m for m in re.findall(r'^\| (N\d{2}) ',b2,re.M)} == {f'N{i:02}' for i in range(1,14)}
assert 'A. Prioridad estratégica institucional' in b2 and 'B. Oportunidad SEO respaldada' in b2
candidates = list(csv.DictReader((CONTENT/'internal/02-research/seo-rebuild-2026-11-05/candidatas.csv').open()))
assert len({r['keyword'] for r in candidates}) == 69
assert len(json.loads((CONTENT/'internal/02-research/preguntas-2026-11-05/matriz.json').read_text())) == 48

cta_internal = between(s,'### CTA contextual por página y plantilla','## 8.')
cta_external = between(e,'### Acciones y cierre por página','## 6.')
def page_rows(text):
    return {cells(line)[0]:cells(line)[1:] for line in text.splitlines() if line.startswith('| ') and cells(line)[0] in EXPECTED}
assert set(page_rows(cta_internal)) == set(page_rows(cta_external)) == set(EXPECTED)
assert all(len(v)==4 and all(v) for v in page_rows(cta_internal).values())
assert all(len(v)==3 and all(v) for v in page_rows(cta_external).values())
readiness = between(s,'### 8.10 AEO/GEO readiness','## 9.')
assert all(readiness.count('| '+page+' |')==2 for page in EXPECTED)
assert all(token in s for token in ['HT1','HT2','HT3','HT4','§8.8','§8.9','C01','C03','C06','C07','C08','C09'])

assert e.index('### 4.1') < e.index('### 4.2') < e.index('### 4.3')
assert e.index('#### SEO y arquitectura') < e.index('#### Comprensión y recuperación') < e.index('### 4.3')
assert 'Answer Engine Optimization, AEO' in e and 'Generative Engine Optimization, GEO' in e
assert 'v2.2' in e and 'pendiente de aprobación humana' in e
assert not re.search(r'\bP\d{2}\b|\bN\d{2}\b|\bC0\d\b',e), 'IDs internos filtrados a E1'
assert 'Contenido Web — Versión Final' not in e
assert not (CONTENT/'entregables-cliente/02-contenido-web/contenido-web.md').exists()

active_paths = [CONTENT/p for p in [
    'README.md','entregables-cliente/README.md',
    'internal/01-brief-diagnostico/diagnostico-b2.md',
    'internal/02-research/research.md','internal/02-research/research-queries.md','internal/02-research/keyword-map.md',
    'internal/03-estrategia/estrategia-contenido.md','internal/03-estrategia/dossier-evidencia-estrategica.md',
    'internal/04-feedback/feedback-e1.md',
    'entregables-cliente/01-direccion-contenido-estructura/direccion-contenido-estructura-web.md']]
active_paths += list(ROOT.glob('*.md'))
def anchor(text):
    return re.sub(r'[^\w\- ]','',re.sub(r'[`*_]','',text.casefold())).replace(' ','-')
links, tables = 0,0
for path in active_paths:
    text = path.read_text()
    width = None
    for line in text.splitlines():
        assert line.rstrip()==line, (path,'trailing whitespace')
        if line.startswith('|'):
            count = len(cells(line))
            if width is None:width=count;tables+=1
            assert count==width,(path,line)
        else:width=None
    for label,target in re.findall(r'\[([^\]]*)\]\(([^)]+)\)',text):
        if re.match(r'\w+://',target):continue
        name,_,fragment = target.partition('#')
        destination = path.parent/name if name else path
        assert destination.exists(),(path,target)
        links += 1
        if fragment and destination.suffix=='.md':
            headings = {anchor(h) for h in re.findall(r'^#+\s+(.+)$',destination.read_text(),re.M)}
            assert fragment in headings,(path,target,'anchor')

protected = json.loads((ROOT/'preservacion.json').read_text())
for name,digest in protected.items():
    assert hashlib.sha256((REPO/name).read_bytes()).hexdigest()==digest,('protegido',name)

# Optional complete session baseline; the durable manifest covers immutable sources.
changed = None
if len(sys.argv)>1:
    baseline = json.loads(Path(sys.argv[1]).read_text())
    changed = [name for name,digest in baseline.items() if not (REPO/name).is_file() or hashlib.sha256((REPO/name).read_bytes()).hexdigest()!=digest]
    allowed = {str(p.relative_to(REPO)) for p in active_paths}
    assert set(changed)<=allowed,('scope',set(changed)-allowed)
print(json.dumps(dict(result='OK',sections=52,previous_sections=59,pages=8,templates=2,
                      people=15,questions_evaluated=48,clusters=13,candidate_expressions=69,
                      cta_pages_templates=10,readiness_rows=20,local_links=links,tables=tables,
                      immutable_files=len(protected),changed_originals=changed),ensure_ascii=False,indent=2))
