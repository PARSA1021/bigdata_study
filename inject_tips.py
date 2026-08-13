import json

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def inject_tip(card, tip_type, text):
    # tip_type: "꿀팁" or "주의"
    prefix = "🚨 <strong>[출제위원의 암기 꿀팁]</strong> " if tip_type == "꿀팁" else "⚠️ <strong>[헷갈림 주의 포인트]</strong> "
    card['blocks'].append({
        "type": "note",
        "text": prefix + text
    })
    print(f"Injected into {card['id']}: {card['title']}")

data = load_json('data.json')

for sec in data.get('sections', []):
    for c in sec.get('cards', []):
        title = c.get('title', '')
        
        # 1. 개인정보 보호 모델 (K-익명성 등)
        if "프라이버시" in title and ("보호" in title or "모델" in title):
            inject_tip(c, "꿀팁", "K-익명성은 'K'명 이상의 동일한 정보! L-다양성은 'L'개의 다양한 민감정보! T-근접성은 'T'이하의 분포 차이! (K-명수, L-다양, T-분포)로 기억하세요.")
        
        # 2. 하향식 / 상향식 
        elif "하향식" in title or "상향식" in title or "문제 탐색" in title:
            if not any("하향식은" in b.get('text', '') for b in c.get('blocks', [])):
                inject_tip(c, "꿀팁", "하향식(Top-Down): 문제가 이미 무엇인지 알 때 (What -> How). 상향식(Bottom-Up): 문제가 뭔지 모를 때 데이터부터 보고 탐색 (데이터 -> 통찰).")
        
        # 3. 결측값 처리
        elif "결측값 처리" in title or "결측치" in title:
            inject_tip(c, "주의", "기출문제에서 '다중 대치법'을 '단순 대치법'으로 교묘하게 바꿔서 출제합니다. 다중 대치법은 여러 번 대치하여 불확실성을 줄이는 고급 기법임을 잊지 마세요.")
        
        # 4. 1종 오류, 2종 오류
        elif "추정과 가설검정" in title or "1종 오류" in title or "분류 모형 평가" in title:
            inject_tip(c, "주의", "1종 오류는 '죄 없는 사람을 감옥에 보내는 것(참을 거짓이라 함)', 2종 오류는 '범인을 풀어주는 것(거짓을 참이라 함)'. 의료계(암 진단)나 보안에서는 2종 오류(범인을 놓침)가 훨씬 치명적입니다!")
            inject_tip(c, "꿀팁", "정밀도(Precision)는 '정정(정상이라 예측한 것 중 진짜 정상)', 재현율(Recall)은 '실재(실제 정상 중 맞춘 비율)'로 외우세요!")
        
        # 5. 앙상블 기법
        elif "앙상블" in title:
            inject_tip(c, "꿀팁", "배깅(Bagging)은 여러 모델이 '투표(병렬)'해서 결정(예: 랜덤 포레스트). 부스팅(Boosting)은 앞 모델의 '오답 노트(순차적)'를 다음 모델이 이어받아 학습합니다.")
            
        # 6. 불균형 데이터
        elif "불균형 데이터" in title or "Imbalanced" in title:
            inject_tip(c, "주의", "SMOTE 기법은 단순히 복사(Oversampling)하는 것이 아니라, 소수 클래스의 데이터 사이에 가상의 데이터를 '보간(생성)'하는 방식입니다. 단순 복제라고 하면 오답입니다!")

save_json('data.json', data)
print("Injection complete.")
