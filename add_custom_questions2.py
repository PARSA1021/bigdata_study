import json

file_path = r'c:\Users\USER\Desktop\bigdata_study-main\cbt_bank.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

max_id_num = 0
for q in data.get('questions', []):
    id_str = q.get('id', '')
    if id_str.startswith('Q') and id_str[1:].isdigit():
        max_id_num = max(max_id_num, int(id_str[1:]))

new_questions = [
    {
        "id": f"Q{max_id_num + 1}",
        "subject": 1,
        "chapter": "분석 기획",
        "sectionId": "s1-1",
        "cardId": "c1-3",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[고난도 실기 연계] CRISP-DM 방법론을 적용하여 카드사의 이탈 고객 예측 모델을 구축하고 있다. '모델링 기법을 선택'하고 '테스트 설계를 수행'하는 단계 직전에 완료되어야 하며, 파생 변수 생성(Feature Engineering)과 데이터 정제가 주로 이루어지는 단계는 무엇인가?",
        "choices": [
            "비즈니스 이해(Business Understanding)",
            "데이터 이해(Data Understanding)",
            "데이터 준비(Data Preparation)",
            "모델링(Modeling)"
        ],
        "answer": 2,
        "explanation": "CRISP-DM은 비즈니스 이해 -> 데이터 이해 -> 데이터 준비 -> 모델링 -> 평가 -> 전개 순으로 진행됩니다. 모델링 직전에 데이터를 분석 도구에 적합한 형태로 가공하고 파생 변수를 생성하는 단계는 '데이터 준비(Data Preparation)' 단계입니다.",
        "whyWrong": [
            "비즈니스 목표를 설정하는 초기 단계입니다.",
            "데이터의 품질을 확인하고 초기 인사이트를 얻는 단계입니다.",
            "정답",
            "알고리즘을 선택하고 모델을 학습시키는 단계로, 데이터 준비 이후에 진행됩니다."
        ],
        "memorizationPoint": "CRISP-DM 순서: 비즈니스 이해 -> 데이터 이해 -> 데이터 준비(정제, 파생변수 생성) -> 모델링 -> 평가 -> 전개"
    },
    {
        "id": f"Q{max_id_num + 2}",
        "subject": 1,
        "chapter": "데이터 거버넌스",
        "sectionId": "s1-2",
        "cardId": "c1-4",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[개념 심화] 전사적인 데이터 거버넌스 체계를 수립할 때, 데이터의 표준화 요소 및 조직에 대한 설명으로 가장 적절하지 않은 것은?",
        "choices": [
            "데이터 표준 용어 사전은 기업 내에서 사용하는 동의어와 유의어를 통일하여 일관성을 확보하기 위해 구축한다.",
            "메타데이터(Metadata)는 '데이터에 대한 데이터'로, 데이터의 구조, 속성, 출처 등의 정보를 정의하여 검색과 관리를 용이하게 한다.",
            "데이터 사전(Data Dictionary)은 데이터베이스에 저장된 데이터 요소들의 논리적, 물리적 구조를 명세한 것이다.",
            "데이터 거버넌스 조직 내에서 '데이터 관리자(Data Steward)'는 주로 물리적 데이터베이스 서버의 백업과 네트워크 보안을 전담하는 엔지니어 역할을 수행한다."
        ],
        "answer": 3,
        "explanation": "데이터 관리자(Data Steward)는 비즈니스 관점에서 데이터의 품질, 표준화, 보안 정책이 잘 준수되는지 관리하는 비즈니스 담당자(현업)에 가깝습니다. 물리적 서버나 네트워크 보안을 전담하는 것은 DBA(Database Administrator)나 시스템 엔지니어의 역할입니다.",
        "whyWrong": [
            "표준 용어 사전의 올바른 정의입니다.",
            "메타데이터의 올바른 정의입니다.",
            "데이터 사전의 올바른 정의입니다.",
            "정답"
        ],
        "memorizationPoint": "Data Steward(데이터 관리자)는 IT 엔지니어가 아니라, 비즈니스 목적에 맞게 데이터 품질과 표준 준수를 감독하는 현업 주체입니다."
    },
    {
        "id": f"Q{max_id_num + 3}",
        "subject": 2,
        "chapter": "기초 통계량 및 확률 분포",
        "sectionId": "s2-3",
        "cardId": "c2-3",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[개념 응용] 콜센터에 시간당 걸려오는 문의 전화의 수, 혹은 특정 교차로에서 하루 동안 발생하는 교통사고의 건수와 같이 '단위 시간이나 공간에서 드물게 발생하는 사건의 횟수'를 모델링할 때 가장 적절한 확률 분포는?",
        "choices": [
            "정규 분포(Normal Distribution)",
            "이항 분포(Binomial Distribution)",
            "포아송 분포(Poisson Distribution)",
            "지수 분포(Exponential Distribution)"
        ],
        "answer": 2,
        "explanation": "단위 시간이나 단위 공간에서 발생하는 희귀 사건의 '발생 횟수'를 나타내는 이산확률분포는 포아송 분포입니다. 반면 그 사건들 사이의 '대기 시간'을 나타내는 연속확률분포는 지수 분포입니다.",
        "whyWrong": [
            "정규 분포는 자연계의 많은 연속형 데이터가 따르는 종 모양의 분포입니다.",
            "이항 분포는 성공 확률이 p인 베르누이 시행을 n번 반복했을 때 성공 횟수의 분포입니다.",
            "정답",
            "지수 분포는 포아송 분포를 따르는 사건들 사이의 '시간 간격(대기 시간)'을 모델링할 때 쓰입니다."
        ],
        "memorizationPoint": "사건의 발생 횟수 = 포아송 분포(이산형) / 사건 발생까지의 대기 시간 = 지수 분포(연속형)"
    },
    {
        "id": f"Q{max_id_num + 4}",
        "subject": 2,
        "chapter": "데이터 전처리",
        "sectionId": "s2-1",
        "cardId": "c2-4",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실무 심화] 다중 대치법(Multiple Imputation)을 사용하여 결측치를 처리할 때의 특징으로 가장 적절하지 않은 것은?",
        "choices": [
            "결측치를 단순히 평균이나 최빈값으로 단일 대치(Single Imputation)할 때 발생하는 과소추정된 분산(Variance) 문제를 완화할 수 있다.",
            "대치(Imputation), 분석(Analysis), 결합(Pooling)의 3단계로 이루어진다.",
            "여러 개의 완전한 데이터셋을 생성하므로 단일 대치법에 비해 연산 비용과 시간이 증가한다.",
            "단일 대치법과 마찬가지로 결측값이 대체된 후에는 결측치로 인한 통계적 추정치의 불확실성(Uncertainty)을 완전히 제거하여 완벽한 모수 추정이 가능하다."
        ],
        "answer": 3,
        "explanation": "다중 대치법의 가장 큰 특징이자 장점은 결측치 대치로 인해 필연적으로 발생하는 통계적 '불확실성(Uncertainty)'을 통계 모형에 정량적으로 반영할 수 있다는 점입니다. 불확실성을 완전히 제거하는 것은 불가능하며, 이를 무시하는 단일 대치법의 단점을 극복하기 위해 다중 대치법이 도입되었습니다.",
        "whyWrong": [
            "평균으로 단일 대치하면 데이터가 평균에 몰려 분산이 과소추정되나 다중 대치법은 이를 완화합니다.",
            "다중 대치법의 3단계 프로세스는 대치 -> 분석 -> 결합(Pooling) 입니다.",
            "보통 M=5~10개의 데이터셋을 생성하므로 연산 비용이 큽니다.",
            "정답"
        ],
        "memorizationPoint": "다중 대치법 3단계(대치->분석->결합)는 결측치로 인한 '불확실성'을 무시하지 않고 모수 추정에 반영하기 위한 기법입니다."
    },
    {
        "id": f"Q{max_id_num + 5}",
        "subject": 3,
        "chapter": "기계학습 알고리즘",
        "sectionId": "s3-2",
        "cardId": "c3-2",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실기 연계 심화] 서포트 벡터 머신(SVM) 모델에서 RBF(Radial Basis Function) 커널을 사용할 때 하이퍼파라미터인 비용(Cost, C)과 감마(Gamma, γ)에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "Cost(C) 값을 크게 설정하면 오분류를 엄격하게 허용하지 않아 마진(Margin)이 좁아지며, 과적합(Overfitting)의 위험이 커진다.",
            "Gamma(γ) 값을 크게 설정하면 개별 데이터 포인트가 미치는 영향력의 범위(반경)가 커져 결정 경계가 매우 완만해지고 과소적합(Underfitting)이 발생한다.",
            "Cost(C) 값을 작게 설정하면 오분류를 유연하게 허용하는 소프트 마진(Soft Margin)이 되어 모델의 일반화 성능이 높아질 수 있다.",
            "최적의 C와 Gamma 조합을 찾기 위해서는 주로 그리드 서치(Grid Search)나 랜덤 서치와 같은 교차 검증 기법을 활용한다."
        ],
        "answer": 1,
        "explanation": "RBF 커널에서 Gamma(γ) 값은 데이터 포인트의 영향력 반경의 '역수'와 비례합니다. Gamma가 커지면 반경이 좁아져 데이터 포인트 하나하나에 민감하게 반응하므로 결정 경계가 매우 굴곡진 형태가 되어 과적합(Overfitting)이 발생합니다. 반대로 Gamma가 작을 때 영향력 반경이 커져 경계가 완만해집니다.",
        "whyWrong": [
            "C가 크면 오차를 용납하지 않는 하드 마진(Hard Margin)에 가까워져 과적합됩니다.",
            "정답",
            "C가 작으면 소프트 마진이 되어 일반화(Generalization) 성능이 좋아집니다.",
            "SVM은 하이퍼파라미터 튜닝이 필수적이므로 그리드 서치를 널리 사용합니다."
        ],
        "memorizationPoint": "SVM RBF 커널 파라미터: Cost(C) 증가 -> 과적합 / Gamma(γ) 증가 -> 반경 감소, 굴곡짐 -> 과적합"
    },
    {
        "id": f"Q{max_id_num + 6}",
        "subject": 3,
        "chapter": "기계학습 알고리즘",
        "sectionId": "s3-3",
        "cardId": "c3-3",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[핵심 빈출] 앙상블(Ensemble) 기법인 배깅(Bagging)과 부스팅(Boosting)의 차이점을 설명한 것으로 가장 올바른 것은?",
        "choices": [
            "배깅은 주로 모델의 편향(Bias)을 줄이는 데 목적이 있으며, 부스팅은 분산(Variance)을 줄이는 데 목적이 있다.",
            "랜덤 포레스트(Random Forest)는 대표적인 부스팅 알고리즘이며, XGBoost는 대표적인 배깅 알고리즘이다.",
            "배깅은 여러 개의 기본 모델(Weak Learner)을 독립적으로 병렬 학습시킨 후 그 결과를 결합하지만, 부스팅은 이전 모델이 틀린 오차에 가중치를 부여하여 순차적으로 학습한다.",
            "부스팅은 각 모델을 학습할 때 복원 추출된 동일한 가중치의 부트스트랩(Bootstrap) 샘플만을 사용하여 독립적으로 학습한다."
        ],
        "answer": 2,
        "explanation": "배깅(Bagging)은 부트스트랩 샘플링을 통해 모델을 병렬로 독립적으로 학습시켜 분산(Variance)을 줄여 과적합을 막는 데 유리합니다. 반면 부스팅(Boosting)은 이전 모델의 오차에 가중치를 두고 순차적으로 꼬리를 물고 학습하여 편향(Bias)을 줄여 정확도를 높이는 데 집중합니다.",
        "whyWrong": [
            "반대입니다. 배깅은 분산 감소, 부스팅은 편향 감소에 효과적입니다.",
            "랜덤 포레스트는 배깅, XGBoost는 부스팅 알고리즘입니다.",
            "정답",
            "부스팅은 오답 데이터에 가중치를 부여하며, 순차적으로 학습하므로 독립적이지 않습니다."
        ],
        "memorizationPoint": "배깅(Bagging) = 병렬, 독립적, 분산 감소(랜덤포레스트) / 부스팅(Boosting) = 직렬, 오차 보완, 편향 감소(XGBoost, LightGBM)"
    },
    {
        "id": f"Q{max_id_num + 7}",
        "subject": 4,
        "chapter": "모형 평가",
        "sectionId": "s4-2",
        "cardId": "c4-2",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실기 계산 연계] 암 환자를 진단하는 분류 모델의 혼동 행렬(Confusion Matrix) 평가 결과가 다음과 같다. [TP=40, FN=10, FP=5, TN=945] 이 모델의 F1-score는 대략 얼마인가?",
        "choices": [
            "0.73",
            "0.80",
            "0.84",
            "0.89"
        ],
        "answer": 2,
        "explanation": "F1-score는 정밀도(Precision)와 재현율(Recall)의 조화평균입니다.\\n1) 정밀도 = TP / (TP + FP) = 40 / (40 + 5) = 40/45 ≈ 0.888\\n2) 재현율 = TP / (TP + FN) = 40 / (40 + 10) = 40/50 = 0.8\\n3) F1-score = 2 * (0.888 * 0.8) / (0.888 + 0.8) = 2 * 0.7104 / 1.688 ≈ 0.842",
        "whyWrong": [
            "계산 오류입니다.",
            "재현율(Recall) 값입니다.",
            "정답",
            "정밀도(Precision) 값입니다."
        ],
        "memorizationPoint": "F1-Score 계산 공식: 2 * (정밀도 * 재현율) / (정밀도 + 재현율) -> 극심한 불균형 모델의 성능을 비교할 때 주로 사용합니다."
    },
    {
        "id": f"Q{max_id_num + 8}",
        "subject": 4,
        "chapter": "모형 평가",
        "sectionId": "s4-3",
        "cardId": "c4-3",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[개념 응용] 타겟 변수(Class)가 '정상' 95%, '사기(Fraud)' 5%로 극도로 불균형한 금융 사기 적발 데이터를 사용하여 K-Fold 교차 검증을 수행하려고 한다. 이때 단순한 K-Fold 대신 계층적 K-Fold (Stratified K-Fold) 교차 검증을 사용해야 하는 가장 핵심적인 이유는 무엇인가?",
        "choices": [
            "모든 폴드(Fold)에서 학습 데이터의 크기를 일정하게 맞추어 연산 속도를 최적화하기 위해서이다.",
            "폴드마다 동일한 수의 데이터 포인트가 배정되지 않도록 의도적으로 무작위성을 부여하기 위해서이다.",
            "각 폴드의 학습 데이터와 검증 데이터에 원본 데이터의 타겟 변수 클래스 비율(95:5)이 동일하게 유지되도록 분할하기 위해서이다.",
            "사기(Fraud) 클래스의 데이터를 복원 추출하여 정상 클래스의 수(95%)와 동일하게 맞추는 오버샘플링(Oversampling)을 자동으로 수행하기 위해서이다."
        ],
        "answer": 2,
        "explanation": "계층적 K-Fold (Stratified K-Fold)는 극심한 불균형 데이터에서 단순 K-Fold 분할 시 특정 검증 폴드에 소수 클래스(예: 사기 5%)가 아예 포함되지 않는 치명적인 문제를 방지합니다. 원본 데이터의 타겟 클래스 비율을 각 폴드 내에서도 그대로 유지(95:5)하여 모델이 모든 폴드에서 편향 없이 안정적으로 평가될 수 있도록 보장합니다.",
        "whyWrong": [
            "연산 속도 최적화와는 무관합니다.",
            "무작위성을 부여하려는 목적이 아니라 층화(비율 유지)를 위한 목적입니다.",
            "정답",
            "오버샘플링(SMOTE 등)은 교차 검증 분할 내부에서 별도로 수행해야 하는 작업이며 Stratified K-Fold 자체가 샘플링 양을 늘려주지는 않습니다."
        ],
        "memorizationPoint": "분류(Classification) 문제, 특히 불균형 데이터셋에서는 일반 K-Fold가 아닌 Stratified K-Fold 분할을 사용하는 것이 실기 평가의 필수 기본기입니다."
    }
]

data['questions'].extend(new_questions)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added {len(new_questions)} additional high-quality questions to CBT bank.")
