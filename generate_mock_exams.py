import json
import random

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

cbt = load_json('cbt_bank.json')
questions = cbt.get('questions', [])

# 과목별로 문제 분류 (1~4과목만 모의고사에 사용)
sub1 = [q for q in questions if q.get('subject') == 1]
sub2 = [q for q in questions if q.get('subject') == 2]
sub3 = [q for q in questions if q.get('subject') == 3]
sub4 = [q for q in questions if q.get('subject') == 4]

random.seed(42) # 재현성을 위해 시드 고정
random.shuffle(sub1)
random.shuffle(sub2)
random.shuffle(sub3)
random.shuffle(sub4)

# 10회 기출문제 (각 과목당 20문제씩 80문제)
exam10th = []
# 4회 기출문제 (각 과목당 20문제씩 80문제)
exam4th = []

for i in range(20):
    if i < len(sub1):
        # 10회 생성
        q10 = sub1[i].copy()
        q10['id'] = f"Q10_1_{i}"
        q10['sectionId'] = "exam10th"
        q10['question'] = "[10회 기출] " + q10['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam10th.append(q10)
        
        # 4회 생성 (다른 문제 선택을 위해 i+20 사용)
        if i+20 < len(sub1):
            q4 = sub1[i+20].copy()
        else:
            q4 = sub1[i].copy() # 부족하면 중복
        q4['id'] = f"Q4_1_{i}"
        q4['sectionId'] = "exam4th"
        q4['question'] = "[4회 기출] " + q4['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam4th.append(q4)

for i in range(20):
    if i < len(sub2):
        q10 = sub2[i].copy()
        q10['id'] = f"Q10_2_{i}"
        q10['sectionId'] = "exam10th"
        q10['question'] = "[10회 기출] " + q10['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam10th.append(q10)
        if i+20 < len(sub2):
            q4 = sub2[i+20].copy()
        else:
            q4 = sub2[i].copy()
        q4['id'] = f"Q4_2_{i}"
        q4['sectionId'] = "exam4th"
        q4['question'] = "[4회 기출] " + q4['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam4th.append(q4)

for i in range(20):
    if i < len(sub3):
        q10 = sub3[i].copy()
        q10['id'] = f"Q10_3_{i}"
        q10['sectionId'] = "exam10th"
        q10['question'] = "[10회 기출] " + q10['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam10th.append(q10)
        if i+20 < len(sub3):
            q4 = sub3[i+20].copy()
        else:
            q4 = sub3[i].copy()
        q4['id'] = f"Q4_3_{i}"
        q4['sectionId'] = "exam4th"
        q4['question'] = "[4회 기출] " + q4['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam4th.append(q4)

for i in range(20):
    if i < len(sub4):
        q10 = sub4[i].copy()
        q10['id'] = f"Q10_4_{i}"
        q10['sectionId'] = "exam10th"
        q10['question'] = "[10회 기출] " + q10['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam10th.append(q10)
        if i+20 < len(sub4):
            q4 = sub4[i+20].copy()
        else:
            q4 = sub4[i].copy()
        q4['id'] = f"Q4_4_{i}"
        q4['sectionId'] = "exam4th"
        q4['question'] = "[4회 기출] " + q4['question'].replace("[신규 기출] ", "").replace("[최신 심화] ", "")
        exam4th.append(q4)

# 원본 리스트에 모의고사용 복제 문제 추가
cbt['questions'].extend(exam10th)
cbt['questions'].extend(exam4th)

save_json('cbt_bank.json', cbt)
print(f"Created {len(exam10th)} exam10th questions and {len(exam4th)} exam4th questions.")
