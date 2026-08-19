import json
with open('data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
with open('current_concepts.txt', 'w', encoding='utf-8') as out:
    for s in d.get('sections', []):
        out.write(f"[{s['id']}] {s['title']}\n")
        for c in s.get('cards', []):
            out.write(f"  - {c['id']}: {c['title']}\n")
