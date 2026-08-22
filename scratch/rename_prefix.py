import json

target_file = '/Users/parsa/Desktop/bigdata_study/cbt_bank.json'
with open(target_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

count = 0
for q in data['questions']:
    if "[12회 기출]" in q.get('question', ''):
        q['question'] = q['question'].replace("[12회 기출]", "[제12회 실전 기출]")
        count += 1
        
with open(target_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Updated {count} questions from [12회 기출] to [제12회 실전 기출].")
