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

data = load_json('data.json')

for sec in data.get('sections', []):
    for c in sec.get('cards', []):
        title = c.get('title', '')
        card_id = c.get('id', '')
        
        # 과목 2 및 과목 3 타겟팅 (c2-, c3-)
        if not (card_id.startswith('c2-') or card_id.startswith('c3-')):
            continue

        # 1. 이상값 처리
        if "이상값" in title or "이상치" in title:
            inject_tip(c, "주의", "이상값(Outlier)을 반드시 제거해야 하는 것은 아닙니다. 데이터 손실을 막기 위해 '조정(클리핑)'하거나 다른 값으로 '대치'할 수도 있습니다.")
        
        # 2. 변수 선택 기법
        elif "변수 선택" in title or "변수추출" in title:
            inject_tip(c, "꿀팁", "전진선택법: 한 번 들어온 변수는 나갈 수 없음. / 후진제거법: 한 번 나간 변수는 들어올 수 없음. / 단계적 선택법: 들어오고 나가는 것 모두 가능(가장 유연함).")
        
        # 3. 차원 축소 (PCA)
        elif "차원 축소" in title or "주성분" in title or "PCA" in title:
            inject_tip(c, "꿀팁", "주성분 분석(PCA)의 핵심 목적은 '정보 손실 최소화'와 '분산 최대화'입니다! 가장 분산이 큰 축을 제1주성분으로 삼습니다.")
        
        # 4. 확률 분포
        elif "확률 분포" in title or "확률분포" in title or "확률" in title:
            if "이산" in str(c) or "연속" in str(c):
                inject_tip(c, "꿀팁", "이산형(건수, 횟수) = 이항, 포아송, 베르누이 / 연속형(시간, 길이, 무게) = 정규분포, t-분포, 카이제곱분포. 종류를 구분하는 문제가 100% 출제됩니다.")
        
        # 5. 회귀분석 가정
        elif "회귀" in title and "가정" in str(c):
            inject_tip(c, "꿀팁", "회귀분석 5대 가정 암기: '선(형성) 독(립성) 등(분산성) 정(상성/정규성) 비(상관성)'. 이 중 하나라도 위배되면 신뢰할 수 없습니다.")
            
        # 6. 다중공선성
        elif "다중공선성" in title or "공선성" in title:
            inject_tip(c, "주의", "다중공선성은 '독립변수(X)들끼리 너무 친해서(상관관계가 높아서)' 발생하는 문제입니다. VIF값이 10을 넘으면 문제가 있다고 판단하고, PCA 등으로 변수를 합치거나 제거해야 합니다.")
            
        # 7. 로지스틱 회귀
        elif "로지스틱" in title:
            inject_tip(c, "주의", "로지스틱 회귀분석은 이름은 '회귀'지만 사실상 '분류(Classification)' 기법입니다! 결과가 0 또는 1(합격/불합격 등)로 나오는 이항 분포를 따릅니다.")
            
        # 8. 의사결정나무
        elif "의사결정나무" in title:
            inject_tip(c, "꿀팁", "가지치기(Pruning)는 과적합(Overfitting)을 방지하기 위한 핵심 작업입니다. 분기 기준으로는 '불순도(Impurity)가 낮아지는' 즉, 데이터가 순수해지는 방향을 찾습니다.")
            
        # 9. 인공신경망
        elif "인공신경망" in title or "퍼셉트론" in title:
            inject_tip(c, "꿀팁", "은닉층(Hidden Layer)이 없으면 단층 퍼셉트론이며, 이는 선형 분리만 가능해서 그 유명한 'XOR 문제'를 해결하지 못합니다. 다층 퍼셉트론(MLP)이 도입되며 비선형 문제 해결이 가능해졌습니다.")
            
        # 10. 서포트 벡터 머신
        elif "서포트 벡터" in title or "SVM" in title:
            inject_tip(c, "꿀팁", "SVM의 핵심 목표는 두 클래스 사이의 '마진(Margin)을 최대화'하는 초평면(결정 경계)을 찾는 것입니다. 데이터가 섞여 있다면 '커널 트릭(Kernel Trick)'을 써서 차원을 높여 해결합니다.")
            
        # 11. 연관성 분석
        elif "연관성" in title or "장바구니" in title:
            inject_tip(c, "꿀팁", "지지도(Support): 전체 거래 중 A와 B가 함께 팔린 비율 / 신뢰도(Confidence): A를 산 사람 중 B도 산 비율 / 향상도(Lift): A를 샀을 때 B를 살 확률이 독립일 때보다 몇 배인가(1보다 커야 유의미).")
            inject_tip(c, "주의", "지지도 공식을 뒤집어 출제하는 경우가 많습니다. 분모는 무조건 '전체 거래 건수'입니다.")

save_json('data.json', data)
print("Injection complete.")
