import json
import os

file_path = r'c:\Users\USER\Desktop\bigdata_study-main\cbt_bank.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

max_id_num = 0
for q in data.get('questions', []):
    id_str = q.get('id', '')
    if id_str.startswith('Q') and id_str[1:].isdigit():
        max_id_num = max(max_id_num, int(id_str[1:]))

new_questions = [
    # ---- 1과목 ----
    {
        "id": f"Q{max_id_num + 1}",
        "subject": 1,
        "chapter": "빅데이터 기술 및 제도",
        "sectionId": "s1-2",
        "cardId": "c1-5",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[기술 심화] 하둡(Hadoop) 에코시스템과 관련된 오픈소스 프로젝트에 대한 설명 중 가장 옳지 않은 것은?",
        "choices": [
            "HDFS(Hadoop Distributed File System)는 대용량 파일을 여러 서버에 나누어 저장하며, NameNode와 DataNode로 구성된다.",
            "MapReduce는 맵(Map) 단계에서 필터링과 정렬을 수행하고 리듀스(Reduce) 단계에서 요약 연산을 수행하는 분산 처리 프레임워크이다.",
            "Apache Spark는 디스크 기반의 MapReduce의 한계를 극복하기 위해 메모리 기반(In-Memory) 연산을 지원하여 처리 속도를 획기적으로 높였다.",
            "Apache Hive는 스트리밍 데이터의 실시간 분산 메시지 큐(Message Queue) 처리를 전담하여 데이터 파이프라인의 병목을 해소한다."
        ],
        "answer": 3,
        "explanation": "Apache Hive는 하둡에 저장된 데이터를 SQL과 유사한 언어(HiveQL)를 사용하여 질의(Query)할 수 있게 해주는 데이터 웨어하우스 인프라입니다. 실시간 분산 메시지 큐 처리를 담당하는 것은 Apache Kafka입니다.",
        "whyWrong": [
            "HDFS의 정확한 구조 설명입니다.",
            "MapReduce의 기본 원리입니다.",
            "Spark의 가장 큰 특징인 인메모리 연산에 대한 올바른 설명입니다.",
            "정답"
        ],
        "memorizationPoint": "하둡 에코시스템: Hive = SQL 인터페이스 / Kafka = 실시간 스트리밍 메시지 큐 / Spark = 인메모리 고속 처리"
    },
    {
        "id": f"Q{max_id_num + 2}",
        "subject": 1,
        "chapter": "분석 기획",
        "sectionId": "s1-1",
        "cardId": "c1-6",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[기획 실무] 데이터 분석 과제의 우선순위를 평가할 때, '시급성'과 '난이도'를 기준으로 4사분면 포트폴리오를 작성한다. 가장 우선적으로 추진해야 할 과제(Quick-Win)가 위치하는 영역은?",
        "choices": [
            "시급성이 높고 난이도가 높은 과제",
            "시급성이 높고 난이도가 낮은 과제",
            "시급성이 낮고 난이도가 높은 과제",
            "시급성이 낮고 난이도가 낮은 과제"
        ],
        "answer": 1,
        "explanation": "우선순위 평가에서 시급성(전략적 중요도, ROI의 Value)이 높고 난이도(투자 비용, 기술적 어려움)가 낮아 단기간에 가치를 창출할 수 있는 과제를 'Quick-Win'이라고 하며 가장 먼저 추진해야 합니다.",
        "whyWrong": [
            "시급하지만 난이도가 높으면 장기적 관점에서 접근해야 합니다.",
            "정답",
            "시급성도 낮고 난이도도 높아 추진 매력도가 가장 떨어지는 영역입니다.",
            "난이도가 낮아 구현은 쉽지만 시급성이 낮아 후순위로 밀립니다."
        ],
        "memorizationPoint": "Quick-Win 과제: 전략적 중요도(시급성, Value)는 높고 실행 난이도(비용, Cost)는 낮은 영역 (보통 1사분면이나 3사분면 등 축의 기준에 따라 다르나, 의미를 기억하세요)"
    },
    {
        "id": f"Q{max_id_num + 3}",
        "subject": 1,
        "chapter": "데이터 거버넌스",
        "sectionId": "s1-2",
        "cardId": "c1-7",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[개념 응용] 데이터 품질 관리(DQM) 지표 중, '고객의 생년월일 필드에 미래의 날짜나 유효하지 않은 문자열이 포함되지 않고 정해진 데이터 타입과 규칙을 준수하는가?'를 평가하는 기준은 무엇인가?",
        "choices": [
            "완전성(Completeness)",
            "유효성(Validity)",
            "일관성(Consistency)",
            "유용성(Usefulness)"
        ],
        "answer": 1,
        "explanation": "유효성(Validity)은 데이터가 정해진 도메인(규칙, 포맷, 범위)을 만족하는지를 나타냅니다. 예를 들어, 생년월일이 미래일 수 없고, 나이 필드에 음수가 들어갈 수 없는 규칙을 지켰는지가 유효성입니다.",
        "whyWrong": [
            "완전성은 필수 항목에 결측치(NULL)가 없는지를 의미합니다.",
            "정답",
            "일관성은 여러 시스템 간에 동일한 데이터가 서로 모순되지 않고 일치하는지를 의미합니다.",
            "유용성은 데이터가 사용자의 비즈니스 목적에 얼마나 부합하는지를 의미합니다."
        ],
        "memorizationPoint": "품질 관리 기준: 유효성(규칙 준수), 완전성(결측치 없음), 일관성(시스템 간 일치), 정확성(현실과 일치)"
    },
    {
        "id": f"Q{max_id_num + 4}",
        "subject": 1,
        "chapter": "분석 기획",
        "sectionId": "s1-1",
        "cardId": "c1-8",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[개념 심화] KDD(Knowledge Discovery in Databases) 분석 방법론의 5단계 과정이 올바르게 나열된 것은?",
        "choices": [
            "데이터 선택 -> 데이터 정제 -> 데이터 변환 -> 데이터 마이닝 -> 결과 평가",
            "데이터 정제 -> 데이터 선택 -> 데이터 변환 -> 데이터 마이닝 -> 결과 평가",
            "데이터 선택 -> 데이터 마이닝 -> 데이터 정제 -> 데이터 변환 -> 결과 평가",
            "데이터 수집 -> 데이터 변환 -> 데이터 마이닝 -> 데이터 정제 -> 지식 표현"
        ],
        "answer": 0,
        "explanation": "KDD는 Selection(선택) -> Preprocessing(전처리/정제) -> Transformation(변환) -> Data Mining(데이터 마이닝) -> Interpretation/Evaluation(결과 평가) 순으로 진행됩니다.",
        "whyWrong": [
            "정답",
            "데이터 정제가 선택보다 앞서지 않습니다. 먼저 분석 대상 데이터를 선택해야 합니다.",
            "데이터 마이닝 이전에 정제와 변환이 선행되어야 합니다.",
            "단계의 명칭과 순서가 KDD와 맞지 않습니다."
        ],
        "memorizationPoint": "KDD 순서: 선택(Select) -> 정제(Pre-process) -> 변환(Transform) -> 마이닝(Mine) -> 평가(Evaluate)"
    },
    {
        "id": f"Q{max_id_num + 5}",
        "subject": 1,
        "chapter": "빅데이터 기술 및 제도",
        "sectionId": "s1-2",
        "cardId": "c1-9",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[법제도 실무] 다음 중 개인정보 비식별화 기법에 대한 설명으로 가장 옳지 않은 것은?",
        "choices": [
            "가명처리(Pseudonymization): 홍길동을 A38X와 같이 다른 값으로 대체하여 추가 정보 없이는 특정 개인을 알아볼 수 없게 하는 기법이다.",
            "총계처리(Aggregation): 개인의 세부 정보를 보여주지 않고, 그룹의 통계값(평균, 합계 등)만을 제공하여 식별을 방지한다.",
            "데이터 마스킹(Data Masking): 개인의 식별 정보 일부 또는 전부를 대체 문자(* 등)로 가리는 기법이다.",
            "데이터 범주화(Data Categorization): 특정 개인을 식별할 수 있는 정보를 영구적으로 완전히 삭제하여 복원이 불가능하도록 하는 기법이다."
        ],
        "answer": 3,
        "explanation": "데이터 범주화(Categorization)는 구체적인 값(예: 32세)을 범위나 범주(예: 30대)로 변환하여 식별을 어렵게 하는 기법입니다. 영구적으로 식별 정보를 삭제하는 기법은 '데이터 삭제(Data Deletion)'에 해당합니다.",
        "whyWrong": [
            "가명처리의 올바른 설명입니다.",
            "총계처리의 올바른 설명입니다.",
            "데이터 마스킹의 올바른 설명입니다.",
            "정답"
        ],
        "memorizationPoint": "범주화: 구체적 수치를 구간으로 묶기 (32세 -> 30대) / 삭제: 식별 정보를 아예 없애기"
    },

    # ---- 2과목 ----
    {
        "id": f"Q{max_id_num + 6}",
        "subject": 2,
        "chapter": "데이터 전처리",
        "sectionId": "s2-1",
        "cardId": "c2-5",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실무 응용] 데이터셋에 존재하는 이상치(Outlier)를 탐지하고 처리하려고 한다. 기법들에 대한 설명으로 가장 옳지 않은 것은?",
        "choices": [
            "IQR(Inter Quartile Range) 방식은 Q1 - 1.5*IQR 미만이거나 Q3 + 1.5*IQR 초과인 데이터를 이상치로 판별한다.",
            "Z-Score 방식은 데이터가 정규분포를 따른다고 가정할 때, 데이터가 평균으로부터 표준편차의 3배(Z > 3 또는 Z < -3) 이상 벗어나면 이상치로 간주한다.",
            "DBSCAN은 밀도 기반 군집화 알고리즘으로, 어느 군집에도 속하지 못하는 저밀도 지역의 데이터를 노이즈(이상치)로 효과적으로 판별할 수 있다.",
            "Isolation Forest는 정상 데이터가 이상치보다 고립되기 쉽다는 원리를 이용하여, 의사결정나무의 깊이가 얕은 데이터를 정상으로 판별한다."
        ],
        "answer": 3,
        "explanation": "Isolation Forest는 '이상치(Outlier)'가 소수이고 기존 패턴과 달라서 고립되기 쉽다는 원리를 이용합니다. 즉, 의사결정나무에서 가지를 조금만 쳐도 쉽게 분리되는(깊이가 얕은) 데이터를 '이상치'로 판별합니다.",
        "whyWrong": [
            "IQR의 정확한 공식 설명입니다.",
            "Z-score 방식의 올바른 설명입니다.",
            "DBSCAN의 노이즈 판별 원리에 대한 올바른 설명입니다.",
            "정답"
        ],
        "memorizationPoint": "Isolation Forest: 이상치는 적고 특이하므로 빨리 분리된다 -> 트리의 깊이가 얕은 노드가 이상치(Outlier)이다."
    },
    {
        "id": f"Q{max_id_num + 7}",
        "subject": 2,
        "chapter": "기초 통계량 및 확률 분포",
        "sectionId": "s2-3",
        "cardId": "c2-6",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[통계 심화] 정규성 가정을 만족하지 못하거나 표본의 크기가 매우 작은 경우 비모수 검정(Non-parametric test)을 수행한다. 다음 검정 방법 중 목적이 서로 다른 하나는 무엇인가?",
        "choices": [
            "크루스칼-왈리스 검정 (Kruskal-Wallis Test)",
            "맨-휘트니 U 검정 (Mann-Whitney U Test)",
            "독립 표본 t-검정 (Independent Two-sample t-test)",
            "윌콕슨 순위합 검정 (Wilcoxon Rank-Sum Test)"
        ],
        "answer": 0,
        "explanation": "Mann-Whitney U Test와 Wilcoxon Rank-Sum Test는 두 집단의 차이를 비교하는 비모수 검정으로, 독립 표본 t-검정의 비모수적 대안입니다. 반면 Kruskal-Wallis Test는 '세 개 이상'의 집단 간 차이를 비교하는 비모수 검정으로, 일원배치 분산분석(ANOVA)의 대안입니다.",
        "whyWrong": [
            "정답 (3개 이상의 집단 비교)",
            "2개 독립 집단 비교 (비모수)",
            "2개 독립 집단 비교 (모수)",
            "2개 독립 집단 비교 (비모수)"
        ],
        "memorizationPoint": "비모수 2집단 비교: 윌콕슨, 맨-휘트니 / 비모수 3집단 이상 비교(ANOVA 대안): 크루스칼-왈리스"
    },
    {
        "id": f"Q{max_id_num + 8}",
        "subject": 2,
        "chapter": "데이터 전처리",
        "sectionId": "s2-1",
        "cardId": "c2-7",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[실기 연계] 데이터에 극단적인 이상치가 다수 포함되어 있어, 평균과 표준편차를 이용하는 표준화(Standardization)를 적용하기 어려운 상황이다. 중앙값(Median)과 사분위수 범위(IQR)를 사용하여 이상치의 영향을 최소화할 수 있는 스케일링 기법은?",
        "choices": [
            "Min-Max Scaler",
            "Max-Abs Scaler",
            "Robust Scaler",
            "Normalizer"
        ],
        "answer": 2,
        "explanation": "Robust Scaler는 평균과 분산 대신 중앙값(Median)과 사분위수(IQR)를 사용하기 때문에 극단적인 이상치(Outlier)의 영향을 거의 받지 않고 데이터를 안정적으로 스케일링할 수 있습니다.",
        "whyWrong": [
            "최솟값과 최댓값을 사용하므로 이상치에 매우 취약합니다.",
            "절대값이 가장 큰 수를 1로 만들기 때문에 역시 이상치에 매우 취약합니다.",
            "정답",
            "Normalizer는 각 행(데이터 포인트)의 길이를 1로 만드는 벡터 정규화 기법입니다."
        ],
        "memorizationPoint": "이상치가 많을 때 스케일링: Robust Scaler (Median과 IQR 사용)"
    },
    {
        "id": f"Q{max_id_num + 9}",
        "subject": 2,
        "chapter": "기초 통계량 및 확률 분포",
        "sectionId": "s2-3",
        "cardId": "c2-8",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[개념 응용] 두 변수 간의 관계를 분석할 때, 두 변수가 정규성을 만족하지 않거나 서열(Rank) 척도인 경우에 선형적인 관계뿐만 아니라 비선형적 단조 관계까지 평가할 수 있는 상관계수는?",
        "choices": [
            "피어슨 상관계수 (Pearson Correlation Coefficient)",
            "결정 계수 (R-squared)",
            "스피어만 상관계수 (Spearman Correlation Coefficient)",
            "스튜던트 t-통계량 (Student's t-statistic)"
        ],
        "answer": 2,
        "explanation": "스피어만 상관계수는 변수들의 값 자체 대신 순위(Rank)를 매겨 상관관계를 계산하는 비모수적 방법입니다. 이상치에 강하며 비선형적인 단조(Monotonic) 관계도 측정할 수 있습니다.",
        "whyWrong": [
            "피어슨 상관계수는 두 변수가 연속형이고 정규분포를 따르며, 선형 관계를 가질 때 사용합니다.",
            "회귀 모형의 설명력을 나타내는 지표입니다.",
            "정답",
            "평균 차이를 검정할 때 사용하는 통계량입니다."
        ],
        "memorizationPoint": "연속형, 선형관계 = 피어슨 상관계수 / 순위, 비선형단조, 비모수 = 스피어만 상관계수"
    },
    {
        "id": f"Q{max_id_num + 10}",
        "subject": 2,
        "chapter": "데이터 전처리",
        "sectionId": "s2-1",
        "cardId": "c2-9",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실무 응용] 전 국민을 대상으로 여론조사를 할 때, 인구 비례를 정확히 반영하기 위해 먼저 성별, 연령대, 지역별로 모집단을 여러 집단으로 나눈 후, 각 집단의 크기에 비례하여 표본을 무작위로 추출하였다. 이러한 표본 추출 기법은 무엇인가?",
        "choices": [
            "단순 무작위 추출법 (Simple Random Sampling)",
            "층화 추출법 (Stratified Random Sampling)",
            "집락(군집) 추출법 (Cluster Sampling)",
            "계통 추출법 (Systematic Sampling)"
        ],
        "answer": 1,
        "explanation": "모집단을 이질적인 성격을 가진 여러 계층(층, Strata)으로 나눈 뒤, 각 계층 내에서 표본을 무작위로 추출하는 방법을 층화 추출법이라고 합니다. 인구 비례를 맞추는 데 가장 효과적입니다.",
        "whyWrong": [
            "전체 모집단에서 구분 없이 무작위로 뽑는 방법입니다.",
            "정답",
            "모집단을 동질적인 여러 그룹(군집)으로 나누고, 그 중 몇 개의 군집을 통째로 선택하여 조사하는 방법입니다.",
            "일정한 간격(예: 10번째 사람마다)을 두고 추출하는 방법입니다."
        ],
        "memorizationPoint": "집단 내 동질/집단 간 이질(비율 맞춤) = 층화 추출 / 집단 내 이질/집단 간 동질(통째로 뽑음) = 집락 추출"
    },

    # ---- 3과목 ----
    {
        "id": f"Q{max_id_num + 11}",
        "subject": 3,
        "chapter": "분석 모형 구축",
        "sectionId": "s3-1",
        "cardId": "c3-4",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[개념 심화] 이항 로지스틱 회귀분석(Logistic Regression)에 대한 설명으로 가장 적절하지 않은 것은?",
        "choices": [
            "종속 변수가 0 또는 1의 범주형 값일 때 주로 사용되는 분류 알고리즘이다.",
            "독립 변수들의 선형 결합을 시그모이드 함수(Sigmoid Function)에 통과시켜 0과 1 사이의 확률값으로 변환한다.",
            "승산(Odds)은 실패할 확률 대비 성공할 확률의 비율(p / (1-p))을 의미하며, 로짓(Logit) 변환은 이 승산에 자연로그를 취한 것이다.",
            "회귀 계수(β)가 1 증가하면 종속 변수가 발생할 '확률(p)' 자체가 선형적으로 정확히 1만큼 증가함을 의미한다."
        ],
        "answer": 3,
        "explanation": "로지스틱 회귀에서 독립 변수(X)가 1 단위 증가하면 '로짓(로그 오즈)'이 β만큼 증가하는 것입니다. 즉, 승산(Odds)이 exp(β)배 만큼 증가하는 것이지, 확률(p) 자체가 선형적으로 증가하는 것은 아닙니다. (확률은 비선형인 S자 곡선을 띱니다.)",
        "whyWrong": [
            "로지스틱 회귀의 목적에 대한 정확한 설명입니다.",
            "시그모이드 함수의 역할에 대한 정확한 설명입니다.",
            "오즈와 로짓의 정확한 정의입니다.",
            "정답"
        ],
        "memorizationPoint": "로지스틱 회귀의 계수 해석: X가 1 증가하면 확률(X)이 아니라, 오즈(Odds)가 exp(계수) 배율로 곱해져 증가합니다."
    },
    {
        "id": f"Q{max_id_num + 12}",
        "subject": 3,
        "chapter": "기계학습 알고리즘",
        "sectionId": "s3-2",
        "cardId": "c3-5",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[계산 원리 응용] 의사결정나무(Decision Tree)의 분류(Classification) 기준에 대한 설명이다. 부모 노드를 자식 노드로 분할할 때 분할의 품질을 평가하는 지표로 사용되지 않는 것은?",
        "choices": [
            "지니 지수 (Gini Index)",
            "엔트로피 (Entropy)",
            "정보 획득량 (Information Gain)",
            "평균 제곱 오차 (MSE, Mean Squared Error)"
        ],
        "answer": 3,
        "explanation": "평균 제곱 오차(MSE)는 타겟 변수가 연속형인 '회귀 나무(Regression Tree)'에서 노드를 분할하는 기준으로 사용됩니다. '분류(Classification) 나무'에서는 노드의 순수도/불순도를 측정하기 위해 지니 지수나 엔트로피를 사용합니다.",
        "whyWrong": [
            "분류 나무(CART 알고리즘)의 대표적인 불순도 지표입니다.",
            "분류 나무(C4.5 등 알고리즘)의 대표적인 불순도 지표입니다.",
            "분모 노드 엔트로피 - 자식 노드 엔트로피로, 분류 나무의 분할 기준이 됩니다.",
            "정답"
        ],
        "memorizationPoint": "분류 나무 분할 기준: 지니, 엔트로피 / 회귀 나무 분할 기준: 분산, MSE"
    },
    {
        "id": f"Q{max_id_num + 13}",
        "subject": 3,
        "chapter": "기계학습 알고리즘",
        "sectionId": "s3-2",
        "cardId": "c3-6",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실무 심화] 인공신경망(ANN)을 깊게 쌓은 딥러닝 모델에서 발생할 수 있는 '기울기 소실(Vanishing Gradient)' 문제에 대한 설명으로 가장 적절하지 않은 것은?",
        "choices": [
            "오차 역전파(Backpropagation) 과정에서 입력층으로 갈수록 기울기(Gradient)가 0에 가깝게 작아져 학습이 진행되지 않는 현상이다.",
            "은닉층의 활성화 함수로 시그모이드(Sigmoid)를 여러 겹 사용할 경우, 미분값의 최댓값이 0.25에 불과하여 연쇄 법칙(Chain Rule)에 의해 곱할수록 값이 0에 수렴하게 되어 주로 발생한다.",
            "이 문제를 해결하기 위해 시그모이드 대신 ReLU(Rectified Linear Unit) 계열의 활성화 함수를 주로 사용한다.",
            "가중치(Weight)의 초깃값을 모두 0으로 동일하게 설정하면 모든 노드가 대칭적으로 학습되므로 기울기 소실 문제를 완벽히 예방할 수 있다."
        ],
        "answer": 3,
        "explanation": "가중치를 모두 0으로 초기화하면 오차 역전파 시 모든 뉴런이 동일한 기울기를 가지게 되어 '대칭성 깨짐(Symmetry Breaking)'에 실패합니다. 즉 모든 뉴런이 똑같은 특징을 학습하게 되어 신경망이 학습되지 않는 치명적인 문제가 발생합니다. 기울기 소실 예방을 위해서는 Xavier 초기화나 He 초기화 등의 기법을 사용해야 합니다.",
        "whyWrong": [
            "기울기 소실의 정확한 정의입니다.",
            "시그모이드 함수와 기울기 소실의 원인에 대한 정확한 설명입니다.",
            "ReLU 함수 도입의 가장 큰 목적입니다.",
            "정답"
        ],
        "memorizationPoint": "기울기 소실 원인: 여러 겹의 시그모이드 / 해결책: ReLU 함수, 가중치 초기화 기법(He, Xavier) 활용"
    },
    {
        "id": f"Q{max_id_num + 14}",
        "subject": 3,
        "chapter": "기계학습 알고리즘",
        "sectionId": "s3-2",
        "cardId": "c3-7",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[핵심 개념] K-평균 군집화(K-Means Clustering)를 수행할 때 최적의 군집 수(K)를 결정하기 위해 사용하는 방법이 아닌 것은?",
        "choices": [
            "엘보우 기법 (Elbow Method)",
            "실루엣 계수 (Silhouette Coefficient)",
            "덴드로그램 (Dendrogram) 분석",
            "목적 함수(군집 내 오차제곱합, WCSS)의 감소율 둔화 지점 파악"
        ],
        "answer": 2,
        "explanation": "덴드로그램(Dendrogram)은 계층적 군집 분석(Hierarchical Clustering)에서 데이터가 어떻게 묶여가는지를 트리 형태로 나타낸 시각화 도구로, 여기서 선을 그어 군집 수를 결정합니다. K-Means와 같은 비계층적 군집화에서는 사용되지 않습니다.",
        "whyWrong": [
            "K-Means 최적 K를 찾는 대표적인 방법입니다.",
            "군집 내 응집도와 군집 간 분리도를 측정하여 최적 K를 평가하는 지표입니다.",
            "정답",
            "이것이 바로 엘보우 기법의 원리입니다."
        ],
        "memorizationPoint": "비계층적(K-Means) 최적 군집 수: 엘보우, 실루엣 계수 / 계층적 군집 수 결정: 덴드로그램 수평선"
    },
    {
        "id": f"Q{max_id_num + 15}",
        "subject": 3,
        "chapter": "분석 모형 구축",
        "sectionId": "s3-1",
        "cardId": "c3-8",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[알고리즘 원리] 계층적 군집 분석(Hierarchical Clustering)에서 두 군집 간의 거리를 측정하는 방법에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "최단 연결법(Single Linkage): 두 군집 내에서 가장 가까운 두 관측치 간의 거리를 군집 간 거리로 정의한다.",
            "최장 연결법(Complete Linkage): 두 군집 내에서 가장 먼 두 관측치 간의 거리를 군집 간 거리로 정의한다.",
            "평균 연결법(Average Linkage): 두 군집의 무게중심(Centroid) 간의 거리를 군집 간 거리로 정의한다.",
            "와드 연결법(Ward's Method): 두 군집을 합쳤을 때의 오차제곱합(ESS)의 증가량이 가장 작아지는 방향으로 군집을 형성한다."
        ],
        "answer": 2,
        "explanation": "두 군집의 무게중심 간 거리를 사용하는 것은 '중심 연결법(Centroid Linkage)'입니다. '평균 연결법(Average Linkage)'은 두 군집에 속하는 '모든 관측치 쌍 간의 거리의 평균'을 군집 간 거리로 정의합니다.",
        "whyWrong": [
            "올바른 설명입니다. (고립된 군집을 잘 찾으나 체인 현상 발생 가능)",
            "올바른 설명입니다. (구형 군집을 잘 찾음)",
            "정답",
            "올바른 설명입니다. (크기가 비슷한 군집 형성 시 유리)"
        ],
        "memorizationPoint": "계층적 군집 거리 측정: 단일(가장 가까움), 완전(가장 멈), 평균(모든 쌍의 평균), 중심(무게중심 간 거리), 와드(분산/오차제곱합 증가 최소화)"
    },

    # ---- 4과목 ----
    {
        "id": f"Q{max_id_num + 16}",
        "subject": 4,
        "chapter": "분석 모형 평가",
        "sectionId": "s4-1",
        "cardId": "c4-4",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[평가 지표 심화] 이진 분류 모델의 예측 임계값(Threshold / Cut-off)을 0.5에서 0.3으로 '낮추었을 때' 나타나는 평가 지표의 일반적인 변화로 가장 적절한 것은?",
        "choices": [
            "Positive로 판정하는 기준이 까다로워져 모델의 재현율(Recall, 민감도)이 감소한다.",
            "실제 Negative 데이터를 Positive로 잘못 예측할 확률이 줄어들어 특이도(Specificity)가 증가한다.",
            "Positive로 판정하는 횟수가 늘어나므로 재현율(Recall)은 증가하지만, 틀린 판정도 늘어나 정밀도(Precision)는 감소하는 경향을 보인다.",
            "임계값의 변화는 ROC 커브 곡선 자체를 위쪽으로 밀어 올려 AUC(Area Under Curve) 값을 증가시킨다."
        ],
        "answer": 2,
        "explanation": "임계값을 0.5에서 0.3으로 낮추면, 모델이 30%만 확신해도 Positive로 예측하게 됩니다. 이로 인해 놓치는 Positive가 적어져 재현율(Recall)은 높아지지만, 그만큼 가짜 Positive(FP)가 늘어나 정밀도(Precision)와 특이도(Specificity)는 떨어지게 됩니다.",
        "whyWrong": [
            "판정 기준이 관대해져서 재현율은 증가합니다.",
            "가짜 Positive(FP)가 증가하여 특이도는 감소합니다.",
            "정답",
            "임계값 변화는 이미 그려진 ROC 커브 위를 이동하는 것이지 커브 자체(AUC 성능)를 변화시키지 않습니다."
        ],
        "memorizationPoint": "임계값 인하 -> Positive 예측 증가 -> 재현율(민감도) 증가, 정밀도/특이도 감소 (Trade-off)"
    },
    {
        "id": f"Q{max_id_num + 17}",
        "subject": 4,
        "chapter": "분석 모형 평가",
        "sectionId": "s4-1",
        "cardId": "c4-5",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[핵심 빈출] 연속형 타겟 변수를 예측하는 회귀 모델의 성능 평가 지표에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "MAE(Mean Absolute Error): 실제값과 예측값의 차이(오차)에 절댓값을 취해 평균한 지표이다.",
            "MSE(Mean Squared Error): 오차를 제곱하여 평균한 지표로, 값이 작을수록 모델의 성능이 좋음을 의미한다.",
            "RMSE(Root Mean Squared Error): MSE에 루트를 씌워 실제값과 동일한 단위(Scale)를 가지도록 보정한 지표이다.",
            "MAPE(Mean Absolute Percentage Error): MAE가 가지는 직관적인 단점을 보완하기 위해 비율(%)로 오차를 표시하며, 실제값이 0일 경우에도 문제없이 계산된다."
        ],
        "answer": 3,
        "explanation": "MAPE는 실제값 대비 오차의 비율을 계산하므로 직관적이지만, 분모에 '실제값'이 들어가기 때문에 실제값이 0인 데이터가 존재하면 계산할 수 없는(Divide by Zero) 치명적인 단점이 있습니다.",
        "whyWrong": [
            "MAE의 올바른 설명입니다.",
            "MSE의 올바른 설명입니다.",
            "RMSE의 올바른 설명입니다.",
            "정답"
        ],
        "memorizationPoint": "MAPE 특징: 비율(%)로 나타내 직관적이나, 실제값이 0이면 분모가 0이 되어 무한대 오류가 발생함."
    },
    {
        "id": f"Q{max_id_num + 18}",
        "subject": 4,
        "chapter": "분석 모형 평가",
        "sectionId": "s4-2",
        "cardId": "c4-6",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[교차 검증 실무] N개의 데이터 포인트를 가진 데이터셋에 대해 LOOCV(Leave-One-Out Cross-Validation) 기법을 사용할 때의 특징으로 가장 적절하지 않은 것은?",
        "choices": [
            "총 N번의 모델 학습과 검증을 반복하여 수행한다.",
            "각 반복마다 정확히 1개의 샘플만을 검증 데이터로 사용하고 나머지 N-1개를 학습 데이터로 사용한다.",
            "학습 데이터의 크기가 전체 데이터셋과 거의 동일하므로 모델의 편향(Bias)이 과대평가되는 것을 방지할 수 있다.",
            "연산 비용이 매우 적어 수백만 건 이상의 대규모 데이터셋 딥러닝 학습에 기본적으로 채택되는 평가 기법이다."
        ],
        "answer": 3,
        "explanation": "LOOCV는 데이터의 개수(N)만큼 모델을 처음부터 다시 학습시켜야 합니다. 따라서 데이터가 커질수록(예: 100만 개) 학습을 100만 번 수행해야 하므로 연산 비용이 상상을 초월할 정도로 높아, 대규모 데이터셋에는 절대 사용할 수 없습니다.",
        "whyWrong": [
            "LOOCV의 원리입니다.",
            "LOOCV의 정의입니다.",
            "N-1개를 학습에 쓰므로 모델이 매우 정교하게 학습되어 편향(Bias)이 매우 낮습니다.",
            "정답"
        ],
        "memorizationPoint": "LOOCV 특징: 편향(Bias) 최소화, 그러나 데이터 수(N)만큼 모델을 학습해야 하므로 연산량 폭발 (대용량 불가)"
    },
    {
        "id": f"Q{max_id_num + 19}",
        "subject": 4,
        "chapter": "분석 결과 해석",
        "sectionId": "s4-3",
        "cardId": "c4-7",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[시각화 응용] 데이터 분포의 요약 정보를 나타내는 박스 플롯(Box Plot)을 해석할 때, 박스 플롯을 통해 직접적으로 알 수 '없는' 정보는 무엇인가?",
        "choices": [
            "데이터의 중앙값 (Median)",
            "데이터의 사분위수 범위 (IQR, Q3 - Q1)",
            "데이터의 이상치 (Outlier) 존재 여부",
            "데이터의 정확한 산술 평균 (Mean)"
        ],
        "answer": 3,
        "explanation": "박스 플롯은 사분위수(제1, 제2, 제3)와 최솟값, 최댓값 등 '위치' 기반의 통계량을 요약하여 보여줍니다. 박스 내부의 굵은 선은 '중앙값(Median)'을 나타내며, 산술 평균(Mean)은 기본 박스 플롯에서는 표시되지 않습니다 (별도의 마커로 추가하지 않는 한 알 수 없음).",
        "whyWrong": [
            "박스 가운데 선이 중앙값입니다.",
            "박스의 위아래 경계가 각각 Q3, Q1이므로 IQR을 알 수 있습니다.",
            "수염(Whisker) 범위를 벗어난 점들을 통해 이상치를 명확히 파악할 수 있습니다.",
            "정답"
        ],
        "memorizationPoint": "박스플롯 구성요소: 최솟값, 1사분위수(Q1), 중앙값(Q2), 3사분위수(Q3), 최댓값, 이상치 (평균은 알 수 없음!)"
    },
    {
        "id": f"Q{max_id_num + 20}",
        "subject": 4,
        "chapter": "분석 결과 해석",
        "sectionId": "s4-3",
        "cardId": "c4-8",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[실무 시나리오] 새로운 추천 알고리즘을 도입했을 때 기존 시스템 대비 매출액의 증가가 통계적으로 유의미한지 검증하기 위해 A/B 테스트를 진행하였다. 다음 해석 중 가장 올바른 것은?",
        "choices": [
            "가설 검정 결과 p-value가 0.10이 나왔다면, 유의수준 0.05 하에서 새로운 추천 알고리즘이 기존보다 명백히 우수하다고 확론할 수 있다.",
            "A/B 테스트는 주로 집단 간의 단순 상관관계를 파악하는 데 그치며 인과관계를 추론할 수는 없다.",
            "만약 두 집단의 매출액 평균 차이에 대한 독립 표본 t-검정 결과 귀무가설이 기각되었다면, 새로운 알고리즘으로 인한 효과가 존재함을 통계적으로 뒷받침한다.",
            "A집단(기존)과 B집단(신규)을 분할할 때 사용자의 성별이나 연령대가 철저히 분리되도록 할당(예: A는 남성, B는 여성)해야 완벽한 통제 환경이 된다."
        ],
        "answer": 2,
        "explanation": "A/B 테스트는 두 집단의 차이를 비교하는 무작위 대조군 연구(RCT)의 일환으로 인과관계를 증명하는 데 쓰입니다. 독립 표본 t-검정에서 귀무가설(평균 차이가 없다)이 기각되면 대립가설(평균 차이가 있다)이 채택되어 효과가 통계적으로 유의미함을 증명합니다.",
        "whyWrong": [
            "p-value(0.10) > 유의수준(0.05)이므로 귀무가설을 기각하지 못합니다(우수하다고 할 수 없음).",
            "A/B 테스트는 통제된 실험을 통해 인과관계(알고리즘 도입 -> 매출 증가)를 추론하는 가장 강력한 실무 기법입니다.",
            "정답",
            "집단을 나눌 때는 특정 편향이 개입되지 않도록 완전히 '무작위(Randomized)'로 할당해야 합니다. 남/녀로 분리하면 알고리즘 차이인지 성별 차이인지 알 수 없습니다(교란 변수 발생)."
        ],
        "memorizationPoint": "A/B 테스트: 무작위 할당(Randomization)을 통해 교란 변수를 통제하고 인과관계를 검증(주로 t-검정 사용)"
    }
]

data['questions'].extend(new_questions)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added {len(new_questions)} more high-quality questions to CBT bank.")
