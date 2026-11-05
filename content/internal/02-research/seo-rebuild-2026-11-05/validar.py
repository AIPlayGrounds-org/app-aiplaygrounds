"""Valida evidencia derivada de respuestas MCP; no llama APIs ni modifica archivos."""
from pathlib import Path
import csv
import json
import hashlib
from collections import Counter

ROOT = Path(__file__).resolve().parent


def rows(name):
    with (ROOT / name).open() as handle:
        return list(csv.DictReader(handle))


docs = [json.loads(path.read_text()) for path in sorted((ROOT / 'raw').glob('*.json'))]
paid = [doc for doc in docs if doc.get('tool') in {
    'research_keywords', 'get_keyword_metrics', 'get_serp_results',
    'find_serp_competitors', 'get_domain_overview', 'get_ranked_keywords',
}]
coverage = json.loads((ROOT / 'coverage.json').read_text())
assert len(paid) == coverage['paid_calls_returned'] == 27
assert len({doc['id'] for doc in paid}) == len(paid)
assert len(json.loads((ROOT / 'raw/Z02-catalog.json').read_text())['catalog']['items']) == 82

seeds = []
serps = []
overview = []
for doc in paid:
    args = doc['args']
    assert args['projectId'] == 'Default (contenedor autorizado)'
    if doc['tool'] == 'research_keywords':
        assert args['resultLimit'] == 150
        assert args['includeClickstreamData'] is False
        assert args['groupKeywords'] is False
        assert len(args['seeds']) == len(doc['response']['results'])
        seeds.extend(args['seeds'])
        assert all(result['ok'] for result in doc['response']['results'])
        localized = args['seeds']
    elif doc['tool'] == 'get_serp_results':
        assert args['depth'] == 20
        assert len(args['queries']) == len(doc['response']['results'])
        localized = args['queries']
        for query, result in zip(localized, doc['response']['results']):
            assert query['keyword'] == result['keyword'] and result['ok']
            assert query['device'] == 'desktop'
            serps.append((query['locationCode'], query['keyword'], result))
    else:
        localized = [args]
    assert all(item['locationCode'] in {2604, 2484, 2170} for item in localized)
    assert all(item['languageCode'] == 'es' for item in localized)
    assert all('locationName' not in item for item in localized)
    if doc['tool'] == 'get_keyword_metrics':
        assert len(args['keywords']) == 48
        assert args['includeMonthlyTrends'] is True
        assert args['includeClickstreamData'] is False
        overview.extend(doc['response']['keywords'])

assert len(seeds) == coverage['seeds'] == 30
assert Counter(item['locationCode'] for item in seeds) == {2604: 10, 2484: 10, 2170: 10}
assert len(serps) == len({(code, kw) for code, kw, _ in serps}) == 66
assert len(overview) == 81
observations = rows('observaciones.csv')
assert len(observations) == 2838 + 81
assert len(rows('ausencias-overview.csv')) == 63
assert all(row['volume'] == '' for row in rows('ausencias-overview.csv'))
assert len(rows('competidor-datacamp.csv')) == 300
candidates = rows('candidatas.csv')
assert len(candidates) == 69 * 3
assert len({(row['country'], row['keyword'].casefold()) for row in candidates}) == 69 * 3
assert len({row['cluster'] for row in candidates}) == 13
assert len(rows('solapamiento-serp.csv')) == 27

for country, stats in coverage['by_country'].items():
    country_rows = [row for row in observations if row['country'] == country]
    expansion = [row for row in country_rows if row['source'] != 'keyword_overview']
    metric_rows = [row for row in country_rows if row['source'] == 'keyword_overview']
    assert len(expansion) == stats['discovery_rows']
    assert len({row['keyword'].casefold() for row in expansion}) == stats['discovery_unique_keywords']
    assert len(metric_rows) == stats['overview_rows']
    for metric, count in stats['overview_metric_coverage'].items():
        assert sum(row[metric] != '' for row in metric_rows) == count

index = {(row['id'], row['country'], row['keyword'].casefold()): row for row in observations}
for candidate in candidates:
    if candidate['status'] == 'NO_OBSERVADA_EN_RESPUESTAS':
        assert all(candidate[key] == '' for key in ['volume', 'kd', 'cpc_usd', 'ads_competition', 'intent_auto', 'evidence'])
    else:
        originals = [index[(rid, candidate['country'], candidate['keyword'].casefold())]
                     for rid in candidate['evidence'].split(';')]
        assert any(all(original[key] == candidate[key] for key in
                       ['volume', 'kd', 'cpc_usd', 'ads_competition', 'intent_auto'])
                   for original in originals)
questions = rows('preguntas.csv')
assert all(row['type'] in {'KEYWORD_INTERROGATIVA', 'TITULO_ORGANICO'} for row in questions)
assert all(row['volume'] == '' for row in questions if row['type'] == 'TITULO_ORGANICO')
assert coverage['paa_questions_recovered'] == 0
assert coverage['related_search_texts_recovered'] == 0
assert sum(item.get('type') == 'people_also_ask' for _, _, result in serps for item in result['items']) == 22
assert sum(item.get('type') == 'related_searches' for _, _, result in serps for item in result['items']) == 62
assert coverage['balance_start'] - coverage['balance_final'] == coverage['balance_difference'] == 1671
assert coverage['mcp_calls_total'] == coverage['paid_attempts'] + coverage['mcp_readonly_account_context_location_calls'] == 46
manifest = ROOT / 'SHA256SUMS'
if manifest.exists():
    for line in manifest.read_text().splitlines():
        digest, filename = line.split('  ', 1)
        assert hashlib.sha256((ROOT / filename).read_bytes()).hexdigest() == digest, filename
print('OK: parámetros, países, cobertura, procedencia, faltantes, preguntas y conteos.')
