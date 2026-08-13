import json
import os

file_path = r'c:\Users\USER\Desktop\bigdata_study-main\cbt_bank.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find max ID just in case it's numeric format QXXXX
max_id_num = 0
for q in data.get('questions', []):
    id_str = q.get('id', '')
    if id_str.startswith('Q') and id_str[1:].isdigit():
        max_id_num = max(max_id_num, int(id_str[1:]))

new_questions = [
    {
        "id": f"Q{max_id_num + 1}",
        "subject": 2,
        "chapter": "데이터 전처리",
        "sectionId": "s2-1",
        "cardId": "c2-1",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[고난도 실무 연계] 머신러닝 모델링을 위해 데이터 전처리를 수행하려고 한다. 실무 및 실기 관점에서 '데이터 누수(Data Leakage)'를 방지하고 올바른 모델 평가를 하기 위한 전처리 방법으로 가장 적절하지 않은 것은?",
        "choices": [
            "K-NN 알고리즘을 이용해 결측치를 대체할 때, 타겟(Target) 변수를 제외한 독립 변수들만 사용하여 유사한 K개의 이웃을 찾는다.",
            "범주형 변수의 결측치를 최빈값으로 대체할 때, 테스트 데이터(Test data)의 결측치는 학습 데이터(Train data)에서 도출된 최빈값을 사용하여 대체한다.",
            "학습 데이터와 테스트 데이터를 병합(Concat)한 후 전체 데이터의 최솟값과 최댓값을 기준으로 Min-Max 스케일링을 한 번에 수행하고 다시 분할하여 모델을 학습시킨다.",
            "교차 검증(Cross-Validation)의 각 폴드(Fold)마다 학습 폴드의 데이터를 기준으로 스케일러(Scaler)를 적합(Fit)시킨 후, 검증 폴드를 변환(Transform)한다."
        ],
        "answer": 2,
        "explanation": "전체 데이터를 병합하여 스케일링을 수행하면, 테스트 데이터의 분포 정보가 학습 데이터의 스케일링 과정에 스며들게 되는 데이터 누수(Data Leakage)가 발생합니다. 반드시 학습 데이터(Train)만으로 Scaler를 Fit 한 후, 이 Scaler를 이용해 Train과 Test 데이터를 각각 Transform 해야 합니다.",
        "whyWrong": [
            "타겟 변수를 제외하고 거리를 계산하는 것은 올바른 방법입니다.",
            "테스트 데이터 전처리 시 학습 데이터의 통계량을 사용하는 것은 데이터 누수를 방지하는 올바른 원칙입니다.",
            "정답",
            "폴드마다 독립적으로 스케일러를 적합하는 것은 교차 검증 시 누수를 막는 완벽한 방법입니다."
        ],
        "memorizationPoint": "데이터 누수 방지 원칙: Scaler나 Imputer 적합(Fit)은 반드시 학습 데이터(Train)에만 적용하고, 검증/테스트 데이터는 변환(Transform)만 수행한다."
    },
    {
        "id": f"Q{max_id_num + 2}",
        "subject": 2,
        "chapter": "통계적 추론",
        "sectionId": "s2-2",
        "cardId": "c2-2",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[최신 출제 경향] A제약회사에서 신약을 개발하여 가설 검정을 수행하였다. 귀무가설(H0)은 '신약과 기존 약의 부작용 발생률은 같다' 이며, 유의수준 0.05에서 검정한 결과 p-value가 0.03이 도출되었다. 통계적 추론에 대한 해석으로 가장 옳지 않은 것은?",
        "choices": [
            "유의수준 0.05 하에서 귀무가설을 기각할 수 있으므로, 통계적으로 유의미한 차이가 있다고 결론 내릴 수 있다.",
            "p-value가 0.03이라는 것은 신약과 기존 약의 부작용 발생률이 실제로 같음에도 불구하고, 차이가 있다는 결론을 내릴 확률의 최댓값이 3%라는 것을 의미한다.",
            "실제로는 부작용 발생률이 동일한데 귀무가설을 기각했다면, 이는 제1종 오류(Type I Error)를 범한 것이다.",
            "제1종 오류를 엄격하게 통제하기 위해 유의수준(α)을 0.01로 낮춘다면, 귀무가설을 기각하기 어려워지며 검정력(Power)은 증가한다."
        ],
        "answer": 3,
        "explanation": "유의수준(α)을 0.01로 낮추어 제1종 오류를 엄격하게 통제하면 기각역이 좁아집니다. 이는 대립가설이 참일 때 이를 채택할 확률인 검정력(Power)을 오히려 감소시키고 제2종 오류(β)를 증가시킵니다. (유의수준과 검정력은 Trade-off 관계)",
        "whyWrong": [
            "p-value(0.03) < 유의수준(0.05)이므로 귀무가설을 기각합니다.",
            "p-value는 귀무가설이 참일 때, 이 검정 통계량 이상으로 극단적인 값이 나올 확률(제1종 오류 허용 한계)을 의미합니다.",
            "제1종 오류의 정확한 정의입니다.",
            "정답"
        ],
        "memorizationPoint": "유의수준(α)을 낮추면 1종 오류는 감소하지만, 2종 오류(β)는 증가하고 검정력(1-β)은 감소하는 Trade-off 관계를 명심하세요."
    },
    {
        "id": f"Q{max_id_num + 3}",
        "subject": 3,
        "chapter": "분석 모형 구축",
        "sectionId": "s3-1",
        "cardId": "c3-1",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[개념 응용] 선형 회귀 모델 학습 결과, 학습 데이터의 R²는 0.98로 높았으나 테스트 데이터의 R²는 0.35로 매우 낮았다. 모델의 일반화(Generalization) 성능을 높이고 과적합(Overfitting)을 해소하기 위한 조치로 가장 적절하지 않은 것은?",
        "choices": [
            "릿지(Ridge) 회귀를 도입하여 회귀 계수의 제곱합에 비례하는 페널티(L2 규제)를 부여해 계수 크기를 축소시킨다.",
            "라쏘(Lasso) 회귀를 사용하여 불필요한 독립 변수의 회귀 계수를 0으로 만들어 변수 선택(Feature Selection) 효과를 얻는다.",
            "트리 기반 앙상블 모델로 변경하고, 트리의 최대 깊이(max_depth) 매개변수를 제한 없이 깊게 설정하여 복잡한 비선형 패턴을 학습하게 한다.",
            "VIF(분산팽창지수)가 10 이상인 다중공선성 변수를 제거하거나 주성분 분석(PCA)으로 차원을 축소한다."
        ],
        "answer": 2,
        "explanation": "학습 성능은 높고 테스트 성능이 낮은 것은 전형적인 과적합(Overfitting) 상태입니다. 트리 기반 모델에서 최대 깊이(max_depth)를 제한하지 않고 깊게 설정하면 모델이 너무 복잡해져 과적합이 오히려 심화됩니다.",
        "whyWrong": [
            "L2 규제는 과적합을 방지하는 대표적 방법입니다.",
            "L1 규제(Lasso)는 불필요한 변수를 제거하여 과적합을 완화합니다.",
            "정답",
            "다중공선성 제거나 차원 축소는 모델을 단순화하여 과적합을 방지하는 데 도움을 줍니다."
        ],
        "memorizationPoint": "과적합(Overfitting) 방지 방안: 규제(L1, L2) 적용, 트리 모델의 깊이(Depth) 제한, 차원 축소 및 다중공선성 제거, 더 많은 데이터 확보."
    },
    {
        "id": f"Q{max_id_num + 4}",
        "subject": 4,
        "chapter": "분석 모형 평가 및 개선",
        "sectionId": "s4-1",
        "cardId": "c4-1",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실기 연계 심화] 전체 10,000개 중 불량품이 단 50개(0.5%)인 극심한 클래스 불균형(Imbalance) 데이터에서 불량품(1)을 탐지하는 모델을 평가할 때 가장 적절한 설명은?",
        "choices": [
            "모든 제품을 정상품(0)으로 예측하더라도 정확도(Accuracy)가 99.5%이므로 정확도를 핵심 평가 지표로 삼아야 한다.",
            "불량품을 정상품으로 잘못 판정(FN)했을 때 공정에 미치는 치명적인 비용이 크다면, 정밀도(Precision)보다는 재현율(Recall)을 높여야 한다.",
            "예측 확률을 기준으로 불량품을 판정하는 분류 임계값(Threshold)을 0.5에서 0.8로 높이면, 일반적으로 재현율(Recall)은 증가한다.",
            "이러한 불균형 데이터에서는 ROC-AUC가 성능을 절대 과대평가하지 않으므로, PR(Precision-Recall) Curve보다 항상 우선시되어야 한다."
        ],
        "answer": 1,
        "explanation": "재현율(Recall, 민감도)은 실제 불량품 중 불량품으로 예측한 비율입니다. 불량품을 놓치는 것(False Negative)이 치명적인 상황에서는 정밀도보다 재현율을 우선적으로 고려해야 합니다.",
        "whyWrong": [
            "정확도의 역설(Accuracy Paradox)에 의해 불균형 데이터에서 정확도는 신뢰할 수 없는 지표입니다.",
            "정답",
            "임계값(Threshold)을 높이면 불량 판정 기준이 엄격해져 재현율은 떨어지고 정밀도는 상승하는 경향이 있습니다.",
            "불균형 데이터에서는 다수 클래스의 영향으로 ROC 곡선이 낙관적으로 그려질 수 있어, 소수 클래스에 집중하는 PR 곡선을 함께 보는 것이 좋습니다."
        ],
        "memorizationPoint": "불량 탐지, 암 진단 등 '놓치면(FN) 안 되는' 문제에서는 재현율(Recall/민감도)이 중요하며, 임계값을 낮춰서 재현율을 끌어올릴 수 있습니다."
    }
]

data['questions'].extend(new_questions)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added {len(new_questions)} high-quality questions to CBT bank.")
