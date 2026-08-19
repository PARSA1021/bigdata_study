import json
with open('data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for s in d.get('sections', []):
    if s['id'] in ['s1-3', 's2-6']:
        print(f"--- {s['id']} ---")
        for c in s.get('cards', []):
            if 'new' in c['id']:
                print(c['id'], c['title'])
