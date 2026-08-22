import json

target_file = '/Users/parsa/Desktop/bigdata_study/cbt_bank.json'

with open(target_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_questions = [
    {
        "id": "Q12071",
        "subject": 2,
        "chapter": "회귀 분석 가정",
        "sectionId": "s2-7",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 선형회귀 모델이 적절한 설명력을 가지기 위한 잔차(Residual) 가정에 대해 잘못 설명하는 것은?",
        "choices": [
            "최소제곱법(OLS) 하에서 오차가 한쪽으로 편향되지 않으려면 모든 잔차의 평균은 0이어야 한다.",
            "모든 구간에서 잔차의 분산(Variance)은 예측값 또는 독립변수 값의 크기와 관계없이 일정하게 퍼져 있어야 한다.",
            "각 오차항들 사이에 어떠한 자기상관(Auto-correlation)도 존재하지 않고 서로 독립이어야 한다.",
            "모델의 설명력을 극대화하기 위해 잔차와 특정 종속변수 사이에는 강한 양의 선형 상관관계가 존재해야 한다."
        ],
        "answer": 3,
        "explanation": "잔차(Residual)는 모델이 설명하지 못하는 '성능 밖의 무작위 오차' 부분입니다. 따라서 잔차와 어떠한 변수(독립변수, 종속변수 모두 포함) 간에도 패턴이나 상관관계가 남아있어서는 안 됩니다(독립성 가정).",
        "whyWrong": [
            "잔차의 평균이 0이라는 잔차 기대치 모델 가정입니다.",
            "잔차의 분산이 일정해야 한다는 등분산성 가정입니다.",
            "잔차 간에 상관관계가 없어야 한다는 독립성 가정입니다.",
            "정답"
        ],
        "memorizationPoint": "잔차(설명 불가 오차)는 그 어떤 것(종속변수, 독립변수, 시간 등)과도 아무런 상관패턴이 없어야 훌륭한 회귀 모델입니다.",
        "examinerTip": "선형회귀분석의 잔차에 대한 기본 가정 '정, 등, 독'(정규성, 등분산성, 독립성/무상관성)을 반드시 외워두세요."
    },
    {
        "id": "Q12072",
        "subject": 4,
        "chapter": "데이터 분할과 누출",
        "sectionId": "s4-1",
        "cardId": "c4-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 머신러닝 프로세스에서 발생하는 데이터 누출(Data Leakage) 현상에 대한 설명으로 가장 적합한 것은?",
        "choices": [
            "분석 목적에 맞춰 과거 시점의 데이터를 모델 학습(Train) 데이터로 활용하여 분석하는 정상적인 과정을 말한다.",
            "모델이 실전에서는 절대 알 수 없는 평가(Test) 데이터를 훈련 시에 학습 데이터로 잘못 사용하거나 포함하여 발생한다.",
            "종속변수가 존재하지 않아 평가가 어려운 비지도학습 기법에서만 한정적으로 발생하는 구조적 문제이다.",
            "데이터 누출이 한 번이라도 발생하면 모델의 과적합 평가 성능이 크게 낮아져 무용지물이 된다."
        ],
        "answer": 1,
        "explanation": "데이터 누출(Data Leakage)은 테스트에 사용해야 할 평가 데이터(또는 미래 예측 시점의 데이터)가 모델의 '학습 과정'에 미리 유입되어, 결과적으로 성능이 과대하게(비정상적으로 높게) 평가되는 치명적인 오류 현상을 말합니다.",
        "whyWrong": [
            "과거 데이터를 학습에 쓰는 것은 지극히 정상적인 ML 구조입니다.",
            "정답",
            "지도학습, 예측 모델링 등에서 과하게 발생하므로 비지도학습 한정이라고 볼 수 없습니다.",
            "누출이 발생하면 평가 시에는 성능이 100%에 가깝게 '과도하게 훌륭한 척' 나오지만 실제 환경에 배포했을 때 실력(성능)이 폭락하게 됩니다."
        ],
        "memorizationPoint": "데이터 누출(Leakage) ➔ 시험 문제지(Test Data)를 학습(Train) 시 미리 훔쳐본 상태. 가짜 만점(과대평가)이 나옴.",
        "examinerTip": "데이터 전처리(스케일링, 결측치 대체 등)는 반드시 훈련/테스트 셋 분할 이후 훈련셋 기준으로만 진행해야 데이터 누출이 없음을 묻는 문제가 단골입니다."
    },
    {
        "id": "Q12053",
        "subject": 3,
        "chapter": "초평면과 커널 트릭",
        "sectionId": "s3-4",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 서포트 벡터 머신(SVM) 알고리즘의 커널(Kernel) 함수 종류에 해당하지 않는 것은?",
        "choices": [
            "선형(Linear) 커널",
            "다항식(Polynomial) 커널",
            "RBF(가우시안) 커널",
            "감마(Gamma)"
        ],
        "answer": 3,
        "explanation": "감마(Gamma)는 RBF(가우시안) 커널에서 조절하는 가중치 통제 하이퍼파라미터(영향력이 미치는 거리 조절) 이름이며, 커널 함수 종류의 명칭 자체는 아닙니다.",
        "whyWrong": [
            "원형 그대로 맵핑하는 기본 커널 함수입니다.",
            "다항식 차수로 비선형을 그리는 커널 함수입니다.",
            "방사형 기저 함수(Radial Basis Function)라 불리우며 무한 차원 매핑을 수행하는 비선형 커널입니다.",
            "정답"
        ],
        "memorizationPoint": "SVM 커널 함수 = 선형(Linear), 다항(Poly), RBF(가우시안). 감마(Gamma)는 RBF 파라미터.",
        "examinerTip": "비선형 분류를 수행할 때 SVM에서 적용하는 사상 기법의 이름이 '커널 트릭(Kernel Trick)'임을 꼭 명심하세요."
    },
    {
        "id": "Q12058",
        "subject": 3,
        "chapter": "확률 기반 분류 모델",
        "sectionId": "s3-3",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 나이브 베이즈(Naive Bayes) 분류기에 대한 설명으로 옳은 것은?",
        "choices": [
            "특정 클래스가 주어졌을 때, 모델의 모든 특징(독립변수)들이 서로 조건부 독립이라고 가정한다.",
            "독립변수들과 무관하게 종속변수(클래스)들이 서로 완벽히 독립이라고 가정한다.",
            "예측에 활용되는 독립변수들 간 상관관계가 강할수록 모델의 분류 정확도가 향상된다.",
            "확률 모형인 베이지안 정리를 전혀 사용하지 않는 거리 기반 분류 알고리즘이다."
        ],
        "answer": 0,
        "explanation": "나이브 베이즈(Naive Bayes) 모델은 이름 속 'Naive(순진한)'라는 뜻처럼, 주어져 있는 모든 속성(독립변수)들이 해당 클래스 아래에서 서로 조건부 독립(Conditionally Independent)이라는 강력하고 단순화된 가정을 둔 베이즈 확률 분류기입니다.",
        "whyWrong": [
            "정답",
            "종속변수 클래스의 독립성이 아닌, 종속변수가 주어졌을 때 독립변수(feature) 간의 독립성이 핵심 가정입니다.",
            "상호 변수간에 '독립'을 가정(상관관계 = 0)하므로, 실제로 다중공선성(높은 상관관계)이 있으면 베이즈 모델의 근본 가정과 맞지 않아 성능이 떨어지게 됩니다.",
            "나이브 베이즈 모델은 이름 그대로 철저히 베이즈 확률론에 입각한 알고리즘입니다."
        ],
        "memorizationPoint": "나이브(순진한) 가정 = 모든 독립변수는 서로 완전히 독립이다 (교집합을 단순 곱하기로 퉁친다).",
        "examinerTip": "나이브 베이즈가 '모든 특징들이 상호 독립'이라는 다소 비현실적(Naive) 가정을 하고 있음을 안다면 바로 풀 수 있습니다."
    }
]

data['questions'].extend(new_questions)

with open(target_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added {len(new_questions)} questions to cbt_bank.json")
