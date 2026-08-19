import json
with open('data.json', 'r', encoding='utf-8') as f:
    data_str = f.read()

keywords = ['SEMMA', 'KDD', 'CRISP-DM', '성숙도', '도입형', '음이항분포', '초기하분포', '만-휘트니', '크러스칼-월리스', 'WCSS', 'Dunn Index', 'MAPE', 'MPE', '비즈니스 기여도', 'ROI', '디자인 싱킹', '프로토타이핑', '데이터 거버넌스', '지지도', '신뢰도', '향상도', '하향식', '상향식', '오컴의 면도날', '인포그래픽']

for kw in keywords:
    count = data_str.count(kw)
    print(f"{kw}: {count}")
