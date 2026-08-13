import json
with open('data.json', encoding='utf-8') as f:
    d = json.load(f)
keywords = ['보호', '익명성', '하향식', '대치', '오류', '앙상블', '배깅', '표집', '불균형', 'SMOTE', '접근법', '결측']
for sec in d.get('sections', []):
    for c in sec.get('cards', []):
        if any(kw in c.get('title', '') for kw in keywords):
            print(f"{c['id']} : {c['title']}")
