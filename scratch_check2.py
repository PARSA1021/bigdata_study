import json
with open('data.json', 'r', encoding='utf-8') as f:
    data_str = f.read()

for kw in ['기하분포', '다항분포', '포아송분포', '분석 성숙도', '데이터 거버넌스', '프로토타이핑']:
    print(f"{kw}: {data_str.count(kw)}")
