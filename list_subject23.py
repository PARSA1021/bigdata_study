import json
with open('data.json', encoding='utf-8') as f:
    d = json.load(f)

for sec in d.get('sections', []):
    if "2과목" in sec.get('title', '') or "3과목" in sec.get('title', ''):
        print(f"\n--- {sec.get('title')} ---")
        for c in sec.get('cards', []):
            print(f"{c['id']} : {c['title']}")
