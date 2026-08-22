import json
import os

target_file = '/Users/parsa/Desktop/bigdata_study/cbt_bank.json'

with open(target_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_questions = [
    {
        "id": "Q12001",
        "subject": 1,
        "chapter": "빅데이터 기획",
        "sectionId": "s1-1",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터의 본질이나 특성을 유지하면서 식별정보를 제한하는 비식별화 방안으로 해당하는 것은?",
        "choices": [
            "가명 처리",
            "데이터 마스킹",
            "총계 처리",
            "고의적 왜곡"
        ],
        "answer": 1,
        "explanation": "데이터 마스킹은 데이터의 본질적 변형 없이 전부 또는 일부를 특정 기호(* 등)로 대체하여 노출을 제한하는 비식별화 기술입니다.",
        "whyWrong": [
            "다른 값으로 대체하는 가명 처리입니다.",
            "정답",
            "전체 또는 부분적인 합, 평균 등을 계산하는 처리입니다.",
            "의도적으로 데이터를 조금 변형시켜 식별을 막는 것입니다."
        ],
        "memorizationPoint": "데이터 마스킹: 본질을 훼손하지 않고 기호로 대체하여 식별 방지.",
        "examinerTip": "가명 처리, 익명 처리, 마스킹의 차이를 묻는 문항이 자주 출제됩니다."
    },
    {
        "id": "Q12002",
        "subject": 1,
        "chapter": "빅데이터 분석 기획",
        "sectionId": "s1-1",
        "cardId": "c1-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터가 누락 없이 반영되었는지를 보장하는 데이터 품질관리 기준으로 옳은 것은?",
        "choices": [
            "정확성(Accuracy)",
            "적시성(Timeliness)",
            "일관성(Consistency)",
            "완전성(Completeness)"
        ],
        "answer": 3,
        "explanation": "완전성(Completeness)은 필요한 데이터 값이 누락 없이 모두 저장되어 있는지를 의미하는 데이터 품질 지표입니다.",
        "whyWrong": [
            "정확성은 데이터가 실제 세계의 값을 정확하게 반영하는지 여부입니다.",
            "적시성은 필요한 시점에 데이터가 제공될 수 있는지 여부입니다.",
            "일관성은 데이터가 모순되지 않고 일정한 형태나 규칙을 따르는지 여부입니다.",
            "정답"
        ],
        "memorizationPoint": "데이터의 누락 여부 = 완전성(Completeness).",
        "examinerTip": "데이터 품질 측정 지표(정확성, 적시성, 일관성, 완전성, 유효성)의 정의를 연결하는 문제가 단골 출제됩니다."
    },
    {
        "id": "Q12003",
        "subject": 1,
        "chapter": "빅데이터 분석 기획",
        "sectionId": "s1-2",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 KDD와 CRISP-DM 분석 방법론에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "CRISP-DM은 총 6단계로 구성된 분석 방법론이다.",
            "CRISP-DM은 비즈니스 관점으로 접근하는 분석 방법론이다.",
            "KDD는 데이터로부터 유용한 지식을 발견하는 전통적인 분석 방법론이다.",
            "KDD는 데이터 추출, 변환, 분석, 해석의 4단계로 구성된 분석 방법론이다."
        ],
        "answer": 3,
        "explanation": "KDD(Knowledge Discovery in Database) 방법론은 '데이터 선택(Selection) -> 전처리(Preprocessing) -> 변환(Transformation) -> 데이터 마이닝(Data Mining) -> 해석/평가(Interpretation/Evaluation)'의 5단계로 구성됩니다.",
        "whyWrong": [
            "CRISP-DM은 비즈니스 이해 - 데이터 이해 - 데이터 준비 - 모델링 - 평가 - 전개의 6단계입니다.",
            "CRISP-DM의 가장 큰 특징이 비즈니스 이해(Business Understanding)를 최우선으로 한다는 점입니다.",
            "KDD의 정의로 올바른 설명입니다.",
            "정답"
        ],
        "memorizationPoint": "KDD는 선택-전처리-변환-마이닝-해석/평가의 5단계 프로세스를 가집니다.",
        "examinerTip": "CRISP-DM의 6단계 순서와 KDD의 5단계 순서를 비교하는 문항은 거의 매회 출제됩니다."
    },
    {
        "id": "Q12004",
        "subject": 1,
        "chapter": "빅데이터 분석 기획",
        "sectionId": "s1-2",
        "cardId": "c1-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 인공지능 모델 구축 시 핵심 고려요소로 가장 적절하지 않은 것은?",
        "choices": [
            "유선 네트워크의 대역폭 확보",
            "시스템의 견고성, 안정성, 신뢰성",
            "학습 데이터의 다양성과 모집단에 대한 대표성",
            "데이터 및 모델 설명 및 문서화"
        ],
        "answer": 0,
        "explanation": "인공지능 모델 구축의 핵심 요소는 데이터의 품질과 편향 문제, 시스템의 견고성과 신뢰성,そして 모델 결과에 대한 설명 가능성 등입니다. 유선 네트워크 대역폭 확보는 IT 인프라 운영 측면일 수 있으나 AI 모델 '구축' 자체의 직접적인 핵심 고려사항으로 보기는 어렵습니다.",
        "whyWrong": [
            "정답",
            "모델의 강건성과 시스템 안정성은 중요한 요소입니다.",
            "편향을 줄이기 위해 데이터 다양성과 대표성 확보는 필수입니다.",
            "모델 유지보수와 XAI 관점에서 필수적인 요소입니다."
        ],
        "memorizationPoint": "AI 모델 구축 핵심: 데이터 다양성/대표성(편향방지), 시스템 강건성, 결과 설명가능성과 문서화.",
        "examinerTip": "상식적인 IT 인프라 요건과 데이터 분석/AI 관점의 요건을 구분할 수 있어야 합니다."
    },
    {
        "id": "Q12005",
        "subject": 1,
        "chapter": "빅데이터 분석 기획",
        "sectionId": "s1-3",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 개인정보에 해당하는 것으로 옳은 것은?",
        "choices": [
            "이메일 주소가 무작위로 영문과 숫자의 조합인 경우",
            "고객이 자진하여 웹사이트 등에 게시한 본인의 이름",
            "특정 단체를 식별할 수 있는 사물에 대한 정보",
            "특정 개인을 알아볼 수 없도록 완벽하게 익명 처리된 데이터"
        ],
        "answer": 1,
        "explanation": "개인정보는 자진 게시 여부와 상관없이 '본인의 이름' 등 개인을 식별할 수 있는 정보라면 모두 법의 보호 대상인 개인정보에 해당합니다. (개인정보보호법)",
        "whyWrong": [
            "무작위 조합만으로는 개인을 식별하기 불가능하여 단독으로는 개인정보가 아닙니다.",
            "정답",
            "단체를 식별하는 사물은 '자연인'에 대한 정보가 아니므로 개인정보에 해당하지 않습니다.",
            "완전하게 '익명' 처리되어 특정 개인을 전혀 알아볼 수 없는 정보는 개인정보보호법의 적용 대상에서 제외됩니다."
        ],
        "memorizationPoint": "스스로 공개한 정보나 인터넷에 노출된 정보(이름, 사진 등)라 하더라도 자연인을 식별할 수 있다면 개인정보입니다.",
        "examinerTip": "개인정보보호법상 익명정보와 가명정보, 그리고 개인정보의 정의를 구별하는 문제가 빈출됩니다."
    },
    {
        "id": "Q12006",
        "subject": 1,
        "chapter": "빅데이터 분석 기획",
        "sectionId": "s1-3",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 빅데이터 플랫폼에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "일반적으로 소프트웨어 계층, 플랫폼 계층, 인프라 계층으로 구성된다.",
            "인프라 계층은 정보의 수집, 저장, 분석 등을 위한 물리적 인프라를 제공한다.",
            "플랫폼 계층은 수집된 데이터를 관리 및 분석·활용하기 위한 솔루션들을 제공한다.",
            "소프트웨어 계층은 인프라 계층에서 수집된 데이터를 시각화하는 네트워크 기술을 제공한다."
        ],
        "answer": 3,
        "explanation": "소프트웨어 계층은 플랫폼의 자원과 분석 결과를 바탕으로 최종 사용자(User)에게 분석 서비스를 애플리케이션 형태로 제공하는 계층입니다. 단지 네트워크 기술을 제공하는 것이 아닙니다.",
        "whyWrong": [
            "빅데이터 플랫폼 구조는 대개 이 3계층(IaaS, PaaS, SaaS와 유사)으로 구분할 수 있습니다.",
            "서버, 스토리지, 네트워크 등을 제공하는 기반 계층입니다.",
            "분석 엔진과 관리 모듈 등이 존재하는 계층입니다.",
            "정답"
        ],
        "memorizationPoint": "소프트웨어 계층: 분석 결과를 바탕으로 사용자에게 응용 서비스를 제공 (네트워크 기술 X).",
        "examinerTip": "빅데이터 플랫폼의 하드웨어(인프라) - 소프트웨어(앱) 간 기능을 반대로 설명한 오답을 유의하세요."
    },
    {
        "id": "Q12007",
        "subject": 2,
        "chapter": "데이터 수집",
        "sectionId": "s2-1",
        "cardId": "c2-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 HTML 파일에서 특정 텍스트나 데이터를 자동으로 추출하기 위한 가장 적합한 도구 및 기법은?",
        "choices": [
            "크롤링(Crawling)",
            "파싱(Parsing)",
            "스크래핑(Scraping)",
            "로깅(Logging)"
        ],
        "answer": 2,
        "explanation": "웹 스크래핑(Scraping)은 특정 웹페이지(HTML 등)의 문서를 가져와 그 안에서 '원하는 데이터를 추출'하는 동작을 의미합니다. (크롤링은 웹 링크를 따라 탐색하며 수집하는 행위 자체에 초점이 맞춰져 있습니다.)",
        "whyWrong": [
            "주로 웹 페이지를 연결하며 돌아다니면서 다수의 문서를 수집하는 탐색 과정에 중점을 둡니다.",
            "구문 분석 기법으로 스크래핑 내부에서 활용되지만, '웹에서 목적 데이터를 가져오는 작업' 전반을 지칭하진 않습니다.",
            "정답",
            "시스템의 상태나 이벤트를 기록하는 작업입니다."
        ],
        "memorizationPoint": "크롤링 = 탐색 및 광범위 수집 / 스크래핑 = 특정 데이터 추출.",
        "examinerTip": "웹 데이터 수집에서 크롤링(광범위 웹봇)과 스크래핑(특정 정보 추출)을 미세하게 구분하는 문제에 유의하세요."
    },
    {
        "id": "Q12008",
        "subject": 2,
        "chapter": "데이터 수집",
        "sectionId": "s2-1",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 Cassandra, MongoDB 등과 같이 정형화되지 않고 수많은 데이터가 지속적으로 유입·처리되는 환경에 가장 적합한 데이터베이스 방식은?",
        "choices": [
            "HDFS",
            "NoSQL",
            "RDBMS",
            "In-memory DB"
        ],
        "answer": 1,
        "explanation": "MongoDB, Cassandra 등은 NoSQL(Not Only SQL) 데이터베이스로 분류됩니다. 스키마가 없거나 유연하여 텍스트, 로그 등 비정형/반정형 대용량 데이터를 고속으로 저장 및 처리하는 데 특화되어 있습니다.",
        "whyWrong": [
            "하둡 분산 파일 시스템으로 대용량 파일 저장 스토리지이지 실시간 쿼리/트랜잭션에 유리한 DB엔진은 아닙니다.",
            "정답",
            "정해진 스키마(표) 구조를 가지며 트랜잭션 무결성(ACID)이 중요한 정형 데이터에 적합합니다.",
            "데이터를 메모리에 올리는 방식으로 속도가 빠르지만, MongoDB 등은 분류상 NoSQL에 속합니다."
        ],
        "memorizationPoint": "비정형 데이터, 유연한 스키마, 대용량 분산처리 = NoSQL (MongoDB, Cassandra, Redis 등).",
        "examinerTip": "RDBMS(정형) vs NoSQL(비/반정형, 스키마 유연)의 특징을 비교하는 문제가 아주 자주 출제됩니다."
    },
    {
        "id": "Q12043",
        "subject": 2,
        "chapter": "데이터 분포와 유사도",
        "sectionId": "s2-2",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 이진형(0/1) 또는 집합형 범주 데이터의 유사도를 측정하는 데 가장 적합한 척도는?",
        "choices": [
            "유클리드(Euclidean) 거리",
            "자카드(Jaccard) 계수",
            "맨하탄(Manhattan) 거리",
            "마할라노비스(Mahalanobis) 거리"
        ],
        "answer": 1,
        "explanation": "자카드(Jaccard) 계수는 두 집합이나 이진형 데이터 간의 교집합 비율을 측정하여 유사도를 평가하는 데에 널리 사용됩니다. (교집합의 크기 / 합집합의 크기)",
        "whyWrong": [
            "연속형 수치 데이터 간의 직선 거리를 잴 때 사용합니다.",
            "정답",
            "연속형 데이터의 격자(블록) 거리를 잴 때 사용합니다.",
            "변수 간의 상관관계(공분산)를 반영하여 거리를 측정하는 척도입니다."
        ],
        "memorizationPoint": "이진형, 범주형 데이터 간의 집합 유사도 = 자카드(Jaccard) 계수.",
        "examinerTip": "유클리드, 맨하탄, 마할라노비스, 코사인, 자카드 척도의 사용 조건을 정확히 외워야 합니다."
    },
    {
        "id": "Q12044",
        "subject": 2,
        "chapter": "변수 선택",
        "sectionId": "s2-3",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 변수 선택(Feature Selection) 기법에 대해 가장 올바르게 설명한 것은?",
        "choices": [
            "필터 기법은 특정 모델 학습 과정과 독립적으로 통계적 척도(상관관계 등)로 변수를 선택한다.",
            "래퍼(Wrapper) 기법은 모델 학습 및 알고리즘과 무관하게 통계량으로만 변수를 선택한다.",
            "임베디드 기법은 변수 선택을 수행하는 외부 래퍼 모델을 항상 별도로 적용한다.",
            "모든 기법은 최종 모델을 반복적으로 학습시켜 평가하며 변수를 고른다."
        ],
        "answer": 0,
        "explanation": "필터(Filter) 기법은 모델을 아예 학습시키지 않고, 상관계수, 카이제곱 통계량, F-검정 등을 통해 단일 변수와 종속변수 간의 연관성을 측정하여 높은 변수를 선택하는 방법입니다.",
        "whyWrong": [
            "정답",
            "래퍼 기법은 예측 모델을 직접 반복 학습시키면서 최적의 변수 조합을 찾습니다.",
            "임베디드 기법은 자체 알고리즘(예: 라쏘, 의사결정나무) 안에 가중치 패널티 등을 통해 변수 선택 기능이 내장되어 있습니다.",
            "필터 기법은 모델을 학습시키지 않습니다."
        ],
        "memorizationPoint": "필터(모델 독립적 통계량), 래퍼(모델 직접 반복 학습 적용), 임베디드(모델 내장에 귀속).",
        "examinerTip": "변수 선택 기법 3가지(필터, 래퍼, 임베디드)의 매칭이 잘못된 것을 찾는 문제는 무조건 나옵니다."
    },
    {
        "id": "Q12045",
        "subject": 2,
        "chapter": "정규화 회귀",
        "sectionId": "s2-4",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 회귀계수의 크기에 페널티를 부여하여 과적합을 방지하는 정규화 회귀분석에 대한 설명으로 옳은 것은?",
        "choices": [
            "릿지(Ridge) 회귀는 L2 페널티를 사용하고, 라쏘(Lasso) 회귀는 L1 페널티를 사용한다.",
            "릿지 회귀는 L1 페널티를 사용하고, 라쏘 회귀는 L2 페널티를 사용한다.",
            "릿지 회귀와 라쏘 회귀 모두 절댓값 기반의 L1 페널티를 사용한다.",
            "릿지 회귀와 라쏘 회귀 모두 제곱 기반의 L2 페널티를 사용한다."
        ],
        "answer": 0,
        "explanation": "릿지(Ridge)는 가중치의 제곱합(L2 Norm)에 페널티를 부여하고, 라쏘(Lasso)는 가중치의 절댓값 합(L1 Norm)에 페널티를 부여합니다. 라쏘는 변수의 계수를 0으로 만들어 변수 선택 기능을 수행할 수 있습니다.",
        "whyWrong": [
            "정답",
            "라쏘(Lasso)가 L1, 릿지(Ridge)가 L2입니다. 반대로 설명했습니다.",
            "둘 다 L1을 사용하지 않고 각자 다릅니다. (엘라스틱 넷이 혼합 사용)",
            "둘 다 L2를 사용하지 않습니다."
        ],
        "memorizationPoint": "라쏘=L1(절댓값, 0가능), 릿지=L2(제곱, 0가까이 됨).",
        "examinerTip": "라쏘(L1, 변수선택 가능)와 릿지(L2, 변수선택 불가)의 페널티 방식 차이를 암기하세요."
    },
    {
        "id": "Q12046",
        "subject": 2,
        "chapter": "가설검정 및 추론",
        "sectionId": "s2-5",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터의 정규분포 가정을 하지 않고, 순위(rank)나 부호 등을 이용해 검정하는 비모수 검정 기법으로만 묶인 것은?",
        "choices": [
            "t-검정, F-검정",
            "분산분석(ANOVA), 선형 회귀분석",
            "맨-휘트니 U 검정, 크루스칼-왈리스 검정",
            "Z-검정, 독립표본 t-검정"
        ],
        "answer": 2,
        "explanation": "맨-휘트니 U 검정(Mann-Whitney U Test)과 크루스칼-왈리스 검정(Kruskal-Wallis Test)은 정규성 가정을 충족하지 못할 때 사용하는 대표적인 비모수 검정 기법입니다.",
        "whyWrong": [
            "정규분포를 가정하는 모수 검정입니다.",
            "잔차의 정규성 등을 전제하는 모수 검정 및 통계 기법입니다.",
            "정답",
            "분포의 모수(평균/분산)를 이용하는 모수 검정 기법입니다."
        ],
        "memorizationPoint": "비모수 검정 = 데이터 분포 무관, 순위/부호 사용 (맨-휘트니, 윌콕슨, 크루스칼 왈리스, 런 검정 등).",
        "examinerTip": "비모수 검정과 그에 대응하는 모수 검정(t-test ↔ 맨-휘트니) 짝짓기 문제가 출제 포인트입니다."
    },
    {
        "id": "Q12047",
        "subject": 3,
        "chapter": "딥러닝",
        "sectionId": "s3-1",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 출력 노드가 2개인 인공신경망 모델에서 특정 데이터에 대한 예측값이 (0.7, 0.2)이고, 실제 정답값이 (1, 0)일 때, 이 특정 예측에 대한 평균제곱오차(MSE)는 얼마인가?",
        "choices": [
            "0.045",
            "0.065",
            "0.130",
            "0.260"
        ],
        "answer": 1,
        "explanation": "MSE는 오차 제곱의 평균입니다. 노드 1의 오차 = (0.7 - 1.0)² = 0.09. 노드 2의 오차 = (0.2 - 0.0)² = 0.04. 오차의 합 = 0.13, 평균(2개 노드) = 0.13 / 2 = 0.065 입니다.",
        "whyWrong": [
            "계산 오류입니다.",
            "정답",
            "오차의 합(Sum of Squared Errors, SSE)입니다. 평균을 구해야 합니다.",
            "잘못된 계산입니다."
        ],
        "memorizationPoint": "MSE = 평균 제곱 오차, 각 값의 오차를 제곱하여 더한 후 개수로 나눈 값.",
        "examinerTip": "단순 공식(MSE, MAE)에 숫자만 대입하여 계산하는 문제는 절대로 틀리면 안 되는 기본 문제입니다."
    },
    {
        "id": "Q12048",
        "subject": 2,
        "chapter": "데이터 변환",
        "sectionId": "s2-6",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 파생변수(Derived Variable)에 대한 설명으로 가장 옳은 것은?",
        "choices": [
            "기존 원본 변수들을 결합하거나 수학적 변환을 수행하여 분석 목적에 맞게 분석가가 새롭게 생성한 변수이다.",
            "생성된 파생변수가 가지는 정보량은 항상 원본 데이터가 가진 정보량보다 줄어든다.",
            "데이터 모델링 단계에서 한 번 값이 고정되면 머신러닝 학습 파이프라인에서 다시 활용할 수 없다.",
            "파생변수는 오직 기존 수치화된 데이터들의 평균 등 기초 통계량으로만 생성할 수 있다."
        ],
        "answer": 0,
        "explanation": "파생변수는 기존 데이터를 바탕으로 분석가의 도메인 지식과 논리에 의해 의미를 부여하여 새롭게 만든 변수입니다(예: 키와 체중 ➔ BMI지수).",
        "whyWrong": [
            "정답",
            "경우에 따라 패턴을 극대화시켜 모델 성능을 크게 향상시킬 수 있습니다.",
            "데이터 전처리 파이프라인에 포함되어 향후 새로운 데이터에 대해서도 동일하게 생성·활용할 수 있습니다.",
            "논리적 조건식(If), 문자열 분리 등 다양한 방법으로 생성할 수 있습니다."
        ],
        "memorizationPoint": "파생변수는 분석 목적에 맞게 분석가가 '주관적/논리적'으로 가공해 낸 새로운 변수입니다.",
        "examinerTip": "파생변수(분석가 주관성 개입O) vs 요약변수(단순 통계량 계산, 주관성 개입X)의 차이를 구별할 수 있어야 합니다."
    },
    {
        "id": "Q12049",
        "subject": 2,
        "chapter": "데이터 인코딩",
        "sectionId": "s2-6",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 원-핫 인코딩(One-Hot Encoding)에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "명목형 변수의 값들을 0과 1로만 이루어진 이진 벡터로 변환하는 방법이다.",
            "변수의 고유 항목 수(클래스 수)가 많아질수록 생성되는 벡터의 차원(희소 벡터)이 크게 늘어난다.",
            "가중치 크기나 순위를 가지지 않는 서열/순서형 변수에 적용하면 값 간의 순서 정보를 그대로 보존할 수 있어 가장 적합하다.",
            "변환된 서로 다른 두 범주 간의 벡터를 내적하면 0이 되고, 코사인 유사도도 0이 된다."
        ],
        "answer": 2,
        "explanation": "원-핫 인코딩은 범주 간에 순서(서열)나 계층적 의미가 없는 유일한 '명목형 변수'(예: 성별, 색상)를 표현하는 데 적합합니다. 순서를 가진 서열형 변수에 적용하면 중요 순서 정보가 다 날아갑니다.",
        "whyWrong": [
            "원-핫 인코딩의 올바른 정의입니다.",
            "항목이 100개면 차원이 100개로 늘어나는 문제(차원의 저주)가 발생합니다.",
            "정답",
            "서로 다른 범주는 수직(직교) 상태가 되므로 내적과 코사인 유사도 모두 0입니다."
        ],
        "memorizationPoint": "명목형(순서 없음) ➔ 원-핫 인코딩. 서열형(순서 있음) ➔ 라벨 인코딩 주의.",
        "examinerTip": "고유값이 매우 많은 범주형 변수에 원-핫을 남용하면 '차원의 저주'가 유발됨을 기억하세요."
    },
    {
        "id": "Q12050",
        "subject": 3,
        "chapter": "앙상블 분석",
        "sectionId": "s3-2",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 여러 약한 개별 모델들이 일차적으로 예측한 결과값(Prediction)들을 새로운 독립변수로 삼아, 최종 메타모델(Meta Model)이 이를 다시 학습하고 예측을 수행하는 앙상블 기법은?",
        "choices": [
            "배깅(Bagging)",
            "부스팅(Boosting)",
            "스태킹(Stacking)",
            "단순 보팅(Simple Voting)"
        ],
        "answer": 2,
        "explanation": "스태킹(Stacking)은 여러 기반 모델이 예측한 결과 데이터를 쌓아(Stack) 하나의 데이터 세트로 만들고, 이를 또 다른 메타 모델이 최종적으로 학습하여 예측하는 기법입니다.",
        "whyWrong": [
            "원본 데이터를 부트스트랩 분할하여 병렬 학습 후 결과를 평균내는 방식입니다.",
            "앞 모델의 오차를 보완하는 방향으로 순차적으로 약한 학습기를 훈련시키는 방식입니다.",
            "정답",
            "가장 많이 투표된 클래스나 평균을 단순 계산으로 내는 앙상블입니다 (메타 모델 학습 없음)."
        ],
        "memorizationPoint": "기반 모델의 예측 결과를 독립변수로 하여 메타 모델이 재학습 = 스태킹(Stacking).",
        "examinerTip": "배깅(병렬, 분산 억제), 부스팅(순차, 편향 억제), 스태킹(예측값 재학습 메타모델)의 키워드 매칭은 필수 포인트입니다."
    },
    {
        "id": "Q12051",
        "subject": 3,
        "chapter": "앙상블 분석",
        "sectionId": "s3-2",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 배깅(Bagging)과 부스팅(Boosting) 앙상블 기법에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "배깅은 여러 개의 부트스트랩 표본을 추출하여 다수의 모델을 독립적으로 병렬 학습한다.",
            "부스팅은 약한 학습기들의 오차를 줄여나가는 방향으로 순차적으로 강한 학습기를 완성한다.",
            "배깅과 부스팅은 모두 의사결정나무와 같은 개별 모델을 여러 개 묶어서 학습할 수 있다.",
            "배깅은 모델의 편향(Bias)을, 부스팅은 모델의 분산(Variance)을 줄이는 데 효과적이다."
        ],
        "answer": 3,
        "explanation": "거꾸로 설명되었습니다. 배깅(Bagging)은 분산(Variance)을 줄여서 과적합을 방지하는 데 효과적이고, 부스팅(Boosting)은 편향(Bias)을 줄여서 전반적인 예측 정확도를 높이는 데 효과적입니다.",
        "whyWrong": [
            "배깅의 작동 원리(병렬 실행)를 정확히 설명했습니다.",
            "부스팅의 작동 원리(직렬/순차 보완 실행)를 정확히 설명했습니다.",
            "앙상블 모델은 기본적으로 여러 개별 모델(Weak Learner)을 묶어서 활용합니다.",
            "정답"
        ],
        "memorizationPoint": "배깅 = 분산(Variance) 축소, 부스팅 = 편향(Bias) 축소.",
        "examinerTip": "배깅(랜덤포레스트)과 부스팅(GBM, XGBoost)의 특징 및 저감하는 오차(편향/분산) 구분이 가장 중요합니다."
    },
    {
        "id": "Q12052",
        "subject": 3,
        "chapter": "분류 분석",
        "sectionId": "s3-3",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 로지스틱 회귀(Logistic Regression) 알고리즘에 활용되는 수식이나 함수 성질에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "시그모이드(Sigmoid) 함수는 입력값을 항상 0과 1 사이의 값으로 변환하여 확률로 해석할 수 있다.",
            "성공 확률 p와 실패 확률 (1-p)의 비에 로그를 취한 로짓(Logit) 함수의 출력값 범위는 음의 무한대에서 양의 무한대 사이이다.",
            "로짓 함수는 선형 결합 함수의 결과를 활용하며, 시그모이드 함수의 역함수 관계를 갖는다.",
            "로지스틱 회귀분석은 종속변수가 연속형 수치일 때 그 크기를 정확하게 예측하는 데 주로 활용된다."
        ],
        "answer": 3,
        "explanation": "로지스틱 회귀는 이름에 '회귀'가 들어있지만 연속형 수치를 예측하는 회귀 모델이 아니라 해당 데이터가 특정 클래스에 속할 확률(0~1)을 계산해 범주(0 또는 1)를 분류하는 '분류(Classification)' 모델입니다.",
        "whyWrong": [
            "출력을 0~1 확률로 맵핑하는 시그모이드 함수의 정의입니다.",
            "로짓 함수 ln(p/(1-p))의 범위는 -∞ ~ ∞ 가 맞습니다.",
            "로짓 변환식의 y값 역산출 함수가 바로 시그모이드 함수입니다.",
            "정답"
        ],
        "memorizationPoint": "로지스틱 회귀 분석 = 이름과 달리 연속값 예측이 아닌 생존/사망, 참/거짓 판단하는 '분류' 기법.",
        "examinerTip": "'로지스틱 회귀'가 분류 기법인지 회귀 기법인지를 묻는 말장난이 단골입니다."
    },
    {
        "id": "Q12053",
        "subject": 3,
        "chapter": "분류 분석",
        "sectionId": "s3-4",
        "cardId": "c3-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터의 비선형적인 패턴을 해결하기 위해 서포트 벡터 머신(SVM)에서 활용되는 커널(Kernel) 함수의 종류에 해당하지 않는 것은?",
        "choices": [
            "선형(Linear) 커널",
            "다항식(Polynomial) 커널",
            "RBF(가우시안 / 방사형 기저) 커널",
            "감마(Gamma) 차원 함수"
        ],
        "answer": 3,
        "explanation": "감마(Gamma)는 RBF(가우시안) 커널 함수에서 사용하는 '하이퍼파라미터' 중 하나로, 모델이 각 데이터 포인트를 얼마나 멀리까지 영향력을 미치게 할지를 결정하는 값이지 커널 함수 그 자체의 종류가 아닙니다.",
        "whyWrong": [
            "기본적인 선형 분류에 사용되는 SVM 커널입니다.",
            "다차원 비선형 공간으로 매핑하는 커널 중 하나입니다.",
            "가장 많이 사용되는 대표적인 비선형 매핑 가우시안 커널입니다.",
            "정답"
        ],
        "memorizationPoint": "SVM 주요 커널: Linear, Polynomial, RBF(가우시안), Sigmoid. 감마(Gamma)는 RBF의 파라미터.",
        "examinerTip": "커널 트릭(Kernel Trick)을 활용하여 저차원 데이터를 고차원 공간으로 사상(표현)해 비선형을 분리하는 원리를 외우세요."
    },
    {
        "id": "Q12054",
        "subject": 3,
        "chapter": "앙상블",
        "sectionId": "s3-2",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 랜덤 포레스트(Random Forest)에 대한 설명으로 가장 옳지 않은 것은?",
        "choices": [
            "여러 개의 의사결정나무(Decision Tree)를 배깅(Bagging) 방식으로 결합한 앙상블 알고리즘이다.",
            "각 무작위 나무는 부트스트랩(Bootstrap) 표본으로 학습하며, 분할 시 무작위로 고른 일부 변수들만 정보 이득 후보로 사용한다.",
            "모델을 구성하는 나무의 개수를 무한히 많이 증가시킬수록 과적합(Overfitting) 현상이 심해져 예측력이 계속 하락한다.",
            "단일 의사결정나무 모델보다 상대적으로 분산이 낮아져 과적합에 더 강하며 일반화 성능이 뛰어나다."
        ],
        "answer": 2,
        "explanation": "랜덤 포레스트에서 나무(Tree/n_estimators)의 개수가 증가하면 예측 신뢰도는 높아지고 오차 분산이 줄어들긴 하지만 성능이 더 이상 무한히 오르지는 않으며 일정 수준에 수렴합니다. 나무 개수가 많다고 과대적합이 악화되는 것은 아닙니다.",
        "whyWrong": [
            "랜덤 포레스트의 기본 알고리즘(Bagging 계열)입니다.",
            "데이터 표본 추출 무작위성 + 변수 선택 무작위성을 결합하여 포레스트를 형성합니다.",
            "정답",
            "병렬로 다수 트리 의견을 종합(평균/투표)하므로 단일 나무의 최대 약점인 과적합을 막아줍니다."
        ],
        "memorizationPoint": "트리 개수(n_estimators)가 많아진다고 과적합 되는 것이 아니라, 단순 모델링 시간이 길어지고 성능은 수렴(포화)합니다.",
        "examinerTip": "부트스트랩(복원추출 표본)과 랜덤 서브공간(Random Subspace, 변수 일부 추출) 기법 두 가지가 적용된다는 특징을 외우세요."
    },
    {
        "id": "Q12055",
        "subject": 2,
        "chapter": "시계열 분석",
        "sectionId": "s2-7",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 시계열 데이터 분석에서 특정 시점의 관측치와 시간 간격(Lag, 시차)을 가진 이전 관측치 사이의 선형 연관성만을 나타내며, 중간에 있는 다른 시점들의 상호 영향을 통제(제거)한 상태에서의 순수 상관관계를 보여주는 개념은?",
        "choices": [
            "자기상관함수(ACF, Auto-Correlation Function)",
            "부분자기상관함수(PACF, Partial Auto-Correlation Function)",
            "이동평균(MA, Moving Average) 편차",
            "교차상관함수(CCF, Cross-Correlation Function)"
        ],
        "answer": 1,
        "explanation": "중간 시차들의 영향을 모두 배제하고 오직 특정 '두 시차(Lag)' 관측치 간만의 순수한 직통 상관관계를 나타내는 함수는 부분자기상관함수(PACF)입니다. ACF는 중간 시점들의 연쇄 영향력을 그대로 포함한 채 계산됩니다.",
        "whyWrong": [
            "중간 시간의 영향력을 제거하지 않은 전체적인 상관관계를 표시합니다 (ACF).",
            "정답",
            "과거 오차를 통하여 추세를 부드럽게 만드는 MA 모델의 방식입니다.",
            "서로 다른 두 개의 독립된 시계열 변수(예: 기온과 전력량) 간의 상관관계를 볼 때 씁니다."
        ],
        "memorizationPoint": "중간 영향 제거 후 순수 자기 상관성 = 부분자기상관함수(PACF, AR모델 차수 결정에 사용).",
        "examinerTip": "ACF와 PACF의 역할(AR모델 p차수, MA모델 q차수 결정)을 비교하는 ARIMA 문제는 아주 헷갈리게 빈출됩니다."
    },
    {
        "id": "Q12061",
        "subject": 4,
        "chapter": "모형 평가 지표",
        "sectionId": "s4-1",
        "cardId": "c4-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 불량품(Positive) 탐지 모델 평가 결과 혼동 행렬에서, 진짜 불량(TP) = 20, 가짜 불량(FP) = 6, 불량인데 정상으로 판정(FN) = 4, 진짜 정상(TN) = 70 인 경우 이 모델의 F1-score는 대략 얼마인가?",
        "choices": [
            "0.75",
            "0.80",
            "0.85",
            "0.90"
        ],
        "answer": 1,
        "explanation": "정밀도(Precision) = TP / (TP + FP) = 20 / 26 = 0.769. 재현율(Recall) = TP / (TP + FN) = 20 / 24 = 0.833. F1-score는 정밀도와 재현율의 조화평균 = 2 * (0.769 * 0.833) / (0.769 + 0.833) = 약 0.80 입니다.",
        "whyWrong": [
            "공식 계산 오류",
            "정답",
            "공식 계산 오류",
            "공식 계산 오류"
        ],
        "memorizationPoint": "F1 score = 2 * (정밀도 * 재현율) / (정밀도 + 재현율). (조화평균)",
        "examinerTip": "혼동 행렬 값을 주어주고 정확도, 정밀도, 재현율, 특이도, F1-스코어 중 하나를 계산하라는 문제는 직접 대입하면 풀리는 점수 주는 문제입니다."
    },
    {
        "id": "Q12062",
        "subject": 4,
        "chapter": "분류 모델 평가",
        "sectionId": "s4-1",
        "cardId": "c4-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 ROC 곡선(Receiver Operating Characteristic Curve)에 대한 설명으로 가장 거리가 먼 것은?",
        "choices": [
            "이진 분류 모델의 예측 결과 임계값 변화에 따른 성능을 평가하는 데 널리 활용된다.",
            "x축은 거짓 긍정률(1-특이도), y축은 진짜 긍정률(재현율, 민감도)로 나타낸다.",
            "모델의 전반적인 변별력 성능은 곡선 아래 면적인 AUC(Area Under Curve) 값으로 요약할 수 있다.",
            "분류 예측 점수를 내림차순 정렬 후 하나의 고정된 확률 임계값 하나만 적용하여 점으로 표시된 곡선이다."
        ],
        "answer": 3,
        "explanation": "ROC 곡선은 하나의 고정된 임계값이 아니라, 확률 임계값을 0부터 1까지 '연속적으로 변화시켜 가면서' 도출되는 거짓긍정률(FPR)과 진짜긍정률(TPR) 점들을 이어 그린 선입니다.",
        "whyWrong": [
            "ROC Curve의 아주 대표적인 활용 방식입니다.",
            "x축 = FPR (1-Specificity), y축 = TPR (Sensitivity, Recall). 완벽합니다.",
            "AUC 값이 1에 가까울수록(왼쪽 위로 볼록할수록) 훌륭한 분류 성능을 의미합니다.",
            "정답"
        ],
        "memorizationPoint": "ROC 커브는 컷오프(임계값)를 조금씩 변경하면서 달라지는 모델 성능을 연결한 곡선.",
        "examinerTip": "x축을 '특이도'라고 꼬아내거나 '하나의 고정된 임계값'이라고 오답을 내는 경우가 많습니다."
    },
    {
        "id": "Q12066",
        "subject": 4,
        "chapter": "시각화",
        "sectionId": "s4-3",
        "cardId": "c4-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 데이터의 분포 및 특성을 파악하기 위한 개별 2차원 산점도(Scatter Plot)에 대한 설명으로 가장 거리가 먼 것은?",
        "choices": [
            "두 연속형 수치 변수 간의 관계(패턴)를 2차원 좌표평면 상에서 점들의 분포 위치로 표현한다.",
            "변수 간에 존재하는 선형성 여부 및 양(+) 또는 음(-)의 상관관계를 시각적으로 즉시 파악할 수 있다.",
            "시간 흐름에 따른 연속적 변화 추세를 선으로 파악하기에 매우 적합한 차트이다.",
            "전체 데이터의 분포에서 동떨어져 크게 벗어나는 특이값(이상치) 유무를 직관적으로 파악할 수 있다."
        ],
        "answer": 2,
        "explanation": "시간의 흐름에 따른 연속적 변화를 파악하는 데에는 산점도(점)보다는 각 시점의 데이터를 선으로 연결한 '꺾은선 그래프(Line Chart)' 또는 '시계열 차트'를 사용하는 것이 훨씬 직관적이고 적합합니다.",
        "whyWrong": [
            "산점도의 가장 기본적인 정의와 역할로 옳은 설명입니다.",
            "우상향이면 양의 상관관계, 우하향이면 음의 상관관계를 보입니다.",
            "정답",
            "군집에서 뚝 떨어진 곳에 찍힌 점을 통해 시각적으로 쉽게 이상치를 의심할 수 있습니다."
        ],
        "memorizationPoint": "두 수치 간 관계 = 산점도 / 시계열 파악 = 꺾은선(라인) 차트.",
        "examinerTip": "산점도(상관성), 히스토그램(분포), Box Plot(이상치 및 사분위), 파이/도넛차트(비율) 등 목적에 맞는 시각화 도구 매칭 문제가 늘 나옵니다."
    },
    {
        "id": "Q12067",
        "subject": 3,
        "chapter": "회귀 분석",
        "sectionId": "s3-2",
        "cardId": "c3-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 선형 회귀분석 모델이 합리적인 결과를 도출하기 위한 잔차(Residual) 가정 중에서 '등분산성(Homoscedasticity)'에 대한 올바른 설명으로 가장 적합한 것은?",
        "choices": [
            "모든 독립변수의 예측값 범위에 대하여 오차항(잔차)의 분산(퍼진 정도) 크기가 치우침 없이 일정해야 한다.",
            "전체 오차항(잔차) 값들의 총합 및 평균은 어떠한 경우에도 항상 오차가 없는 0이어야 한다.",
            "오차항(잔차)들 사이에 자기상관과 같은 서로 완전한 선형관계가 존재하지 않아야 한다.",
            "계산된 잔차 데이터들의 분포가 좌우로 편향되지 않은 완벽한 정규분포 곡선을 띄어야 한다."
        ],
        "answer": 0,
        "explanation": "잔차의 등분산성은 회귀선의 예측값 크기에 상관없이(X축의 처음부터 끝까지) 잔차(Y축으로 떨어진 오차의 폭)가 일정하게 분포하여 일정한 띠 모양을 형성하는 성질입니다.",
        "whyWrong": [
            "정답",
            "가정에 포함되지만(평균 0), 이는 등분산성이 아닌 잔차의 기대값 가정입니다.",
            "잔차가 서로 무관하게 무작위라는 '독립성(자기상관 부재)' 가정에 해당합니다.",
            "잔차가 정규 곡선을 따른다는 잔차의 '정규성' 가정에 해당합니다."
        ],
        "memorizationPoint": "회귀 4대 기본 잔차 가정: 선형성(직선관계), 독립성(서로 독립), 등분산성(일정한 분산 오차폭), 정규성(분포가 종모양).",
        "examinerTip": "잔차 산점도 그래프를 보여주고 터널처럼 쭉 뻗으면 등분산, 깔대기처럼 퍼지면 등분산 훼손(이분산)임을 맞추는 이미지 문제도 대비하세요."
    }
]

data['questions'].extend(new_questions)

with open(target_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added {len(new_questions)} questions to cbt_bank.json")
