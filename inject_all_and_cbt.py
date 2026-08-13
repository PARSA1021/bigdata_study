import json

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def inject_tip(card, tip_type, text):
    prefix = "🚨 <strong>[출제위원의 암기 꿀팁]</strong> " if tip_type == "꿀팁" else "⚠️ <strong>[헷갈림 주의 포인트]</strong> "
    # 중복 삽입 방지
    for block in card.get('blocks', []):
        if block.get('type') == 'note' and text in block.get('text', ''):
            return
    card['blocks'].append({
        "type": "note",
        "text": prefix + text
    })
    print(f"Injected into {card['id']}: {card['title']}")

# 1. data.json 업데이트 (1, 4, 5과목 난제 보강)
data = load_json('data.json')
for sec in data.get('sections', []):
    for c in sec.get('cards', []):
        title = c.get('title', '')
        
        # 4과목: 오분류표 및 평가지표
        if "평가 지표" in title or "오분류표" in title or "ROC" in title:
            inject_tip(c, "꿀팁", "ROC 커브는 좌상단으로 딱 붙을수록 좋은 모델! 즉, 민감도는 높고(1에 가깝고), 1-특이도는 낮을수록(0에 가깝게) 최고입니다. F1-Score 공식은 '2*정*재 / (정+재)'로 외우세요!")
        
        # 4과목: 교차 검증
        elif "교차 검증" in title or "Cross-Validation" in title or "K-Fold" in title:
            inject_tip(c, "주의", "LOOCV(Leave-One-Out)는 데이터 하나만 빼고 다 학습시키는 무식한 방법입니다. 데이터가 크면 연산량이 폭발해서 쓸 수 없다는 점이 기출로 자주 나옵니다!")
            
        # 1과목: 비식별화 보강
        elif "비식별화" in title or "마스킹" in title:
            inject_tip(c, "주의", "가명처리는 '홍길동 -> 임꺽정'으로 바꾸는 것, 총계처리는 '평균 35세' 뭉뚱그리기, 마스킹은 '홍O동' 가리기입니다. 이 3가지를 뒤섞어 놓고 찾는 문제가 무조건 1문제 나옵니다.")
            
        # 5과목: 최신 AI 윤리/트렌드
        elif "윤리" in title or "가이드라인" in title or "환각" in title:
            inject_tip(c, "꿀팁", "환각(Hallucination): AI의 그럴듯한 헛소리 / 공정성(Fairness): 인종이나 성별로 부당하게 차별 금지 / 투명성(Transparency): 알고리즘의 결정 과정을 설명할 수 있어야 함(XAI).")

save_json('data.json', data)
print("data.json update complete.")

# 2. cbt_bank.json 해설 업그레이드
cbt = load_json('cbt_bank.json')
tip_prefix = "\n\n🚨 [출제위원의 꿀팁] "
count = 0
for q in cbt.get('questions', []):
    # 정답률이 낮을법한 고난이도 개념 위주로 키워드 매칭
    exp = q.get('explanation', '')
    if "다중공선성" in exp and tip_prefix not in exp:
        q['explanation'] += tip_prefix + "'분산 팽창(VIF)' 단어가 보이면 무조건 다중공선성입니다. VIF > 10 이면 위험 신호입니다."
        count += 1
    elif ("정밀도" in exp or "재현율" in exp) and tip_prefix not in exp:
        q['explanation'] += tip_prefix + "정밀도='정'상 예측 중 진짜 정상, 재현율='실'제 정상 중 진짜 정상. 암 진단에서는 범인을 놓치는 2종 오류(재현율 하락)가 더 치명적입니다."
        count += 1
    elif "하향식" in exp and tip_prefix not in exp:
        q['explanation'] += tip_prefix + "하향식은 '문제가 뭔지 확실히 알 때' 위에서 아래로 찍어누르는 방식입니다. 모를 땐 상향식을 씁니다."
        count += 1
    elif "오버피팅" in exp or "과적합" in exp and tip_prefix not in exp:
        q['explanation'] += tip_prefix + "과적합(오버피팅)은 훈련 데이터에만 너무 목숨을 걸어서 모의고사만 잘 보고 수능은 망치는 현상입니다. 가지치기(Pruning)가 필수죠!"
        count += 1
    elif "K-익명성" in exp and tip_prefix not in exp:
        q['explanation'] += tip_prefix + "개인정보 3형제: K-명수 이상(K-익명성), L-다양한 정보(L-다양성), T-이하 분포 차이(T-근접성)."
        count += 1

save_json('cbt_bank.json', cbt)
print(f"cbt_bank.json update complete. Injected tips into {count} questions.")
