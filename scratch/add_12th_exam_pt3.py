import json

target_file = '/Users/parsa/Desktop/bigdata_study/cbt_bank.json'

with open(target_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_questions = [
    {
        "id": "Q12010",
        "subject": 2,
        "chapter": "데이터 수집 장비",
        "sectionId": "s2-1",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 대규모 가상화 및 클러스터 환경에서 파일을 블록 단위로 나누어 분산 저장하는 분산 파일 시스템(Distributed File System)으로 보기 어려운 것은?",
        "choices": [
            "GFS (Google File System)",
            "Ceph",
            "HDFS (Hadoop Distributed File System)",
            "HBase"
        ],
        "answer": 3,
        "explanation": "HBase는 분산 파일 시스템(HDFS) 위에서 동작하는 'NoSQL 데이터베이스'입니다. 분산 파일 시스템(저장소 자체)이 아닙니다.",
        "whyWrong": [
            "구글에서 개발한 분산 파일 시스템입니다.",
            "분산 객체/블록 저장 파일 시스템입니다.",
            "하둡 생태계의 대표적인 분산 파일 시스템입니다.",
            "정답"
        ],
        "memorizationPoint": "HDFS, GFS = 파일 시스템(저장소). HBase, MongoDB = 그 위에서 돌아가는 DB(데이터베이스).",
        "examinerTip": "Hadoop 생태계 중 HDFS(저장)와 HBase(NoSQL 데이터베이스)의 역할을 헷갈리게 하는 문제가 빈출입니다."
    },
    {
        "id": "Q12011",
        "subject": 2,
        "chapter": "비정형 데이터 수집",
        "sectionId": "s2-2",
        "cardId": "c2-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 웹 스크래퍼(Scraper)와 크롤링 생태계에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "스크래퍼는 웹사이트의 HTML 구조를 분석하고 필요한 정보를 추출하는 도구이다.",
            "스크래퍼는 특정 웹 페이지의 데이터를 자동으로 수집할 수 있다.",
            "스크래피(Scrapy)는 파이썬 기반의 프레임워크로 대규모 웹 크롤링과 스크래핑에 주로 사용된다.",
            "아파치 스쿱(Sqoop)은 스트리밍 데이터 처리에 적합하며, 대용량 로그나 네트워크 트래픽을 수집하는 데 사용된다."
        ],
        "answer": 3,
        "explanation": "아파치 스쿱(Sqoop)은 관계형 데이터베이스(RDBMS)와 하둡(HDFS) 간에 대용량 정형 데이터를 일괄(Bulk) 송수신하기 위한 도구입니다. 스트리밍이나 로그 수집 도구는 Flume이나 Kafka 등이 쓰입니다.",
        "whyWrong": [
            "웹 스크래퍼의 정확한 정의입니다.",
            "웹 스크래퍼의 주요 기능입니다.",
            "Python 생태계의 대표적 크롤링 강력 프레임워크입니다.",
            "정답"
        ],
        "memorizationPoint": "Sqoop = SQL(RDBMS) to Hadoop. Flume, Kafka, Scribe = 실시간 로그/스트리밍 데이터 수집.",
        "examinerTip": "데이터 수집 도구(Sqoop, Flume, Kafka) 중 Sqoop은 반드시 'RDBMS 연동'이라는 키워드로 짝지어야 합니다."
    },
    {
        "id": "Q12012",
        "subject": 2,
        "chapter": "정형/비정형 데이터 수집",
        "sectionId": "s2-2",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 보기가 설명하고 있는 빅데이터 수집 기술로 가장 적절한 것을 고르시오.\n[보기] 대규모 분산 시스템을 모니터링하기 위해 프레임워크 자체에서 발생하는 많은 로그 데이터를 수집·분석하는 시스템으로서, 하둡(Hadoop)과 동기적으로 연동되도록 설계되었다.",
        "choices": [
            "플룸(Flume)",
            "척와(Chukwa)",
            "카프카(Kafka)",
            "스크라이브(Scribe)"
        ],
        "answer": 1,
        "explanation": "척와(Chukwa)는 하둡(Hadoop) 클러스터에서 생성되는 로그와 이벤트 데이터를 수집, 저장, 분석하기 위해 만들어진 아파치 하둡 서브 프로젝트입니다. 하둡 생태계 내부에 밀접하게 설계되었습니다.",
        "whyWrong": [
            "다양한 소스에서 로그를 능동적으로 수집(Source-Channel-Sink)하는 강력한 툴이나, 척와처럼 하둡 모니터링 자체 생태계 목적으로만 출발하진 않았습니다.",
            "정답",
            "링크드인에서 만든 대용량 분산 메시징 큐/스트리밍 플랫폼입니다.",
            "페이스북에서 만든 대용량 실시간 스트리밍 로그 수집기입니다."
        ],
        "memorizationPoint": "하둡(Hadoop) 전용/친화적 로그 모니터링 체계 = Chukwa(척와).",
        "examinerTip": "비정형 데이터 수집도구들(Flume, Chukwa, Scribe)의 창시 목적과 기업(아파치 수집전용/하둡용/페이스북용) 등을 묻는 지엽적 문제가 간혹 출제됩니다."
    },
    {
        "id": "Q12013",
        "subject": 2,
        "chapter": "데이터 적재 및 저장",
        "sectionId": "s2-3",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 대용량 데이터 분산 처리를 위한 오토샤딩(Auto-Sharding) 기능을 내장하여 빠른 처리 속도를 갖는 문서(Document) 기반 NoSQL DB는?",
        "choices": [
            "Redis",
            "CouchDB",
            "MongoDB",
            "DynamoDB"
        ],
        "answer": 2,
        "explanation": "MongoDB는 대표적인 Document 기반(BSON 포맷) NoSQL 데이터베이스이며, 트래픽과 데이터 증가 시 자동으로 데이터를 분할하여 여러 머신에 분산 저장하는 기능인 오토샤딩(Auto-Sharding)을 강력하게 지원합니다.",
        "whyWrong": [
            "Key-Value 형태의 초고속 In-Memory 데이터베이스입니다.",
            "Document 기반이지만 오토샤딩보다는 다중 마스터 복제 아키텍처에 중점을 둡니다.",
            "정답",
            "아마존(AWS)의 Key-Value/Document 하이브리드 서버리스 DB입니다."
        ],
        "memorizationPoint": "Document(JSON) 기반 + 오토샤딩 = MongoDB.",
        "examinerTip": "NoSQL 종류 매칭(Key-Value: Redis / Document: MongoDB / Column: HBase, Cassandra / Graph: Neo4j) 문제가 자주 나옵니다."
    },
    {
        "id": "Q12014",
        "subject": 1,
        "chapter": "데이터 분석 기획",
        "sectionId": "s1-3",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 빅데이터 분석 마스터 플랜 수립에 대한 설명으로 가장 적절한 것은?",
        "choices": [
            "분석 과제의 기획 단계에서 전사적 특성이나 전략 수립 방향은 고려하지 않는다.",
            "분석 과제의 우선순위를 평가할 때 데이터 구축 비용이나 적용 난이도는 배제한다.",
            "분석 목표에 따라 전사 또는 비즈니스 관점의 중장기적 수행 계획을 수립하는 절차이다.",
            "분석 과제의 목적이나 목표에 따라 오직 단기적인 부문 전개 방향성만 제시한다."
        ],
        "answer": 2,
        "explanation": "빅데이터 분석 마스터 플랜은 기업이나 기관의 전사적 목표와 전략을 바탕으로 전체적인 과제들을 도출하고 우선순위를 정하여 중장기적인 분석 프로젝트 실행 계획(로드맵)을 수립하는 것을 말합니다.",
        "whyWrong": [
            "마스터 플랜은 전사적 전략과 반드시 연계되어야 합니다.",
            "우선순위는 철저하게 '비즈니스 시급성(전략적 중요도)'과 '구현 난이도(투자비용, 기술장벽)'를 종합하여 산정합니다.",
            "정답",
            "단기적 부문 계획뿐 아니라 중장기적 전사 계획을 포괄해야 합니다."
        ],
        "memorizationPoint": "마스터 플랜 = 전사적, 중장기적 플랜 (우선순위 산정: 시급성과 난이도).",
        "examinerTip": "단기/국소 부서만의 계획이라는 오답과 난이도/시급성을 무시한다는 오답을 소거하는 것이 핵심입니다."
    },
    {
        "id": "Q12015",
        "subject": 1,
        "chapter": "데이터 분석 관리",
        "sectionId": "s1-3",
        "cardId": "c1-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 보기에서 설명하고 있는 데이터 분석 과제 도출 단계 중 가장 적절한 것은?\n[보기]\n- 분석 대상 과제 현황을 파악하고 개선과제 발굴\n- 데이터 주요 이슈별로 개선방향을 도출하고, 방안을 수립하여 빅데이터 활용 방안 명세서를 작성",
        "choices": [
            "분석목표 수립",
            "도메인 이슈 도출",
            "프로젝트 관리 및 계획 수립",
            "보유 데이터 자산 확인"
        ],
        "answer": 1,
        "explanation": "현황 파악, 개선과제 발굴, 이슈별 방향 도출은 대상 업무 영역이자 비즈니스 도메인의 문제점('도메인 이슈')을 도출하여 과제화하는 단계에 해당합니다.",
        "whyWrong": [
            "이미 도출된 이슈나 과제를 바탕으로 구체적인 분석의 지향점이나 KPI를 정하는 단계입니다.",
            "정답",
            "과제가 확정된 이후 일정과 리소스를 기획하는 단계입니다.",
            "수집 가능한 데이터를 파악하는 단계로 이슈 분석 이전/병행에 이루어집니다."
        ],
        "memorizationPoint": "도메인 이슈 도출 = 현업의 현황/문제점(이슈) 파악 ➔ 개선과제 발굴.",
        "examinerTip": "분석 방법론의 절차 명칭과 주요 산출물(명세서 등)을 연결하는 문제 형식입니다."
    },
    {
        "id": "Q12016",
        "subject": 1,
        "chapter": "투자와 성과 평가",
        "sectionId": "s1-3",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 ROI(투자대비효과) 관점에서 빅데이터 분석 과제의 우선순위 평가 요소에 대한 설명으로 옳지 않은 것은?",
        "choices": [
            "비즈니스 효과(Return)는 새로운 가치(Value) 창출과 매출 증대 등을 포함한다.",
            "투자비용(Investment)은 과제의 시급성을 결정하고, 비즈니스 효과(Return)는 난이도를 결정한다.",
            "ROI 요소는 크게 투자비용 측면(Investment)과 비즈니스 효과 측면(Return)으로 구분된다.",
            "빅데이터의 3V 특성인 Volume(규모), Variety(다양성), Velocity(속도)는 투자비용(Investment) 요소에 영향을 미친다."
        ],
        "answer": 1,
        "explanation": "우선순위 평가 시, 투자대비효과(ROI) 관점에서 [투자비용 산출 요소(Investment)]는 프로젝트 '난이도'를 결정짓고, [비즈니스 효과 요소(Return)]는 전략적 중요도에 따른 '시급성'을 결정짓습니다. 두 설명이 반대로 되어 있습니다.",
        "whyWrong": [
            "비즈니스 가치 증대는 Return의 핵심입니다.",
            "정답",
            "ROI는 Return(수익성/시급성)과 Investment(투자비용/난이도)로 구분됩니다.",
            "데이터의 양과 다양성이 클수록 처리 인프라와 비용(Investment)이 기하급수적으로 증가합니다."
        ],
        "memorizationPoint": "투자비용(Investment) = 난이도 ↑. 비즈니스 효과(Return) = 시급성(빨리 해야 함) ↑.",
        "examinerTip": "Investment(난이도) / Return(시급성) 매칭을 거꾸로 낸 함정이 가장 빈도 높은 기출 유형입니다."
    },
    {
        "id": "Q12017",
        "subject": 1,
        "chapter": "데이터 법제도",
        "sectionId": "s1-4",
        "cardId": "c1-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 개인정보 비식별 조치 모델에 대한 익명성 검증 방법으로 적절하지 않은 것은?",
        "choices": [
            "L-다양성(L-Diversity)은 주어진 K-익명성 그룹 내에서 민감한 정보의 분포가 최소 L개 이상의 서로 다른 범주를 갖도록 다양성을 부여하여 추론 가능성을 낮추는 기법이다.",
            "K-익명성(K-Anonymity)은 데이터 집합에서 특정인을 추론할 수 있는지 여부를 검토하여, 동일한 속성값을 갖는 레코드가 최소 K개 이상 존재하도록 하는 기법이다.",
            "m-유일성(m-Uniqueness)은 원본 데이터와 동일한 속성 값의 조합이 최종 비식별 결과 데이터에 최소 m개 이상은 존재해야만 재식별 위험성이 낮다는 특성이다.",
            "t-근접성(t-Closeness)은 특정 K-익명성 그룹 내부의 민감정보 분포와 전체 데이터 집합의 민감정보 분포 차이를 t 이하로 맞추어 추론을 방지한다."
        ],
        "answer": 2,
        "explanation": "m-유일성(m-Uniqueness)이라는 개념은 존재하지 않으며, 이 설명은 사실상 K-익명성에 해당하는 개념을 함정 단어로 재포장한 것입니다. 프라이버시 보호 모델의 핵심 3대장은 K-익명성, L-다양성, t-근접성입니다.",
        "whyWrong": [
            "L-다양성의 정확한 정의입니다 (배경지식/동질성 공격 방어).",
            "K-익명성의 정확한 정의입니다 (연결 공격 방어).",
            "정답",
            "t-근접성의 정확한 정의입니다 (쏠림 공격/유사성 공격 방어)."
        ],
        "memorizationPoint": "프라이버시 3대장 = K-익명성, L-다양성, t-근접성.",
        "examinerTip": "K-익명성, L-다양성, t-근접성의 용어를 'm-유일성' 등 없는 단어로 뒤섞는 것이 자주 출제되는 패턴입니다."
    },
    {
        "id": "Q12024",
        "subject": 4,
        "chapter": "통계 검정 실무",
        "sectionId": "s4-4",
        "cardId": "c4-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 카이제곱 검정(Chi-squared Test)에 대한 설명으로 옳은 것은?",
        "choices": [
            "서로 다른 두 모집단으로부터 추출한 표본들의 표본분산이 동일한지 비교 분석할 때 사용한다.",
            "독립된 두 집단 간의 '연속형' 변수에 대한 평균 차이를 검정할 때 사용한다.",
            "교차표상에서 관측빈도(Observed frequency)와 기대빈도(Expected frequency)의 차이를 이용하여 검정 통계량을 계산한다.",
            "다수의 연속형 독립변수들이 종속변수의 평균값에 미치는 영향을 검정 비교 분석한다."
        ],
        "answer": 2,
        "explanation": "카이제곱 검정은 '범주형' 변수들 간의 연관성(독립성)이나 일치도(적합도)를 확인하기 위한 기법으로, 실제 데이터 발생 횟수(관측빈도)와 통계적으로 예상되는 횟수(기대빈도)의 차이를 통해 검정을 수행합니다.",
        "whyWrong": [
            "등분산성 검정은 F-검정 등을 사용합니다.",
            "두 집단 연속형 평균 차이는 T-검정(T-test)을 사용합니다.",
            "정답",
            "다수의 연속형 독립변수가 종속변수에 미치는 영향은 회귀분석, 평균 차이의 경우 분산분석(ANOVA)을 사용합니다."
        ],
        "memorizationPoint": "카이제곱 검정 = 범주형 빈도수 검정(관측빈도 vs 기대빈도).",
        "examinerTip": "분석하려는 데이터가 '빈도/범주형'일 때 카이제곱 검정을 써야 한다는 상황 판단 문제가 자주 나타납니다."
    },
    {
        "id": "Q12025",
        "subject": 2,
        "chapter": "이상치와 오류 분석",
        "sectionId": "s2-6",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 이상치(Outlier)가 실제로 발생하는 주요 원인(비정상적 오류 원인)으로 보기 가장 어려운 것은?",
        "choices": [
            "측정 오류(Measurement Error)",
            "실험 오류(Experimental Error)",
            "보고 오류(Reporting/Data entry Error)",
            "표본 오류(Sampling Error)"
        ],
        "answer": 3,
        "explanation": "이상치(Outlier)는 기기 결함(측정 오류), 실험 통제 실패(실험 오류), 혹은 키보드 오입력 등을 통한 데이터 기입 에러(보고/입력 오류) 등에 의해 무작위로 발생합니다. 표본 추출 오류(편향된 표본 추출 등)는 전체 집단을 대표하지 못하는 대표성 문제를 낳지만 그 자체가 단일 '극단적 이상치'를 즉각 유발하는 원인으로 직결되지는 않습니다.",
        "whyWrong": [
            "센서 고장 등으로 말도 안 되는 수치가 측정되는 확실한 이상치 원인입니다.",
            "실험 통제 변인에 문제가 생겨 튀는 결과가 나오는 이상치 원인입니다.",
            "사람이 1.5를 15로 잘못 치는 휴먼 에러로 발생하는 이상치 원인입니다.",
            "정답"
        ],
        "memorizationPoint": "이상치의 주요 발생 원인: 입력 오류, 측정 장비 오류, 실험 오류, 고의적 악의적 누락 등.",
        "examinerTip": "이상치가 '자연스러운 변이'로 진짜 존재할 수도 있지만, 주로 인적/물리적 '에러'로 발생함을 이해해야 합니다."
    },
    {
        "id": "Q12026",
        "subject": 2,
        "chapter": "표본 추출 기법",
        "sectionId": "s2-2",
        "cardId": "c2-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 첫 번째 표본은 모집단에서 무작위로 선택하고, 이후에는 일정한 간격(N번째)으로 표본을 추출하는 방법은 무엇인가?",
        "choices": [
            "단순임의추출법 (Simple Random Sampling)",
            "계통추출법 (Systematic Sampling)",
            "층화추출법 (Stratified Sampling)",
            "군집추출법 (Cluster Sampling)"
        ],
        "answer": 1,
        "explanation": "계통추출법(Systematic Sampling)은 모집단 리스트가 나열되어 있을 때 첫 원소를 무작위로 뽑고 그 이후부터 일정한 간격 K(전체 N/표본 n)씩 건너뛰며 표본을 추출하는 방법입니다.",
        "whyWrong": [
            "간격 없이 그냥 난수표 등을 이용해 완전히 랜덤으로 뽑는 방식입니다.",
            "정답",
            "모집단을 여러 특성 계층(층)으로 미리 나누고 각 층 안에서 랜덤 추출하는 방법입니다.",
            "모집단을 지역 등 여러 묶음(군집)으로 나누고 특정 군집을 통째로 뽑은 뒤 조사하는 방식입니다."
        ],
        "memorizationPoint": "일정한 간격(순서, 주기) ➔ 계통(Systematic) 추출법.",
        "examinerTip": "표본 추출 4가지 방법(단순랜덤, 계통-간격, 층화-성비비율, 군집-특정지역도려내기)은 매우 자주 물어보는 단골입니다."
    },
    {
        "id": "Q12027",
        "subject": 2,
        "chapter": "데이터 변환 기법",
        "sectionId": "s2-6",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터 전처리 기법에 대한 설명으로 적절하지 않은 것은?",
        "choices": [
            "평활화(Smoothing)는 데이터의 잡음(Noise)이나 불규칙한 변동을 줄여 추세를 매끄럽게 하는 방법이다.",
            "정규화(Normalization)는 새로운 변수를 파생 생성하여 모델의 특징(Feature)을 근본적으로 확장하는 방법이다.",
            "스케일링(Scaling)은 정규화 등을 통해 데이터 배열 값 범위를 일정한 구간 내로 조정하는 방법이다.",
            "표준화(Standardization)는 평균과 표준편차를 이용해 데이터를 평균 0을 중심으로 재배치하는 변환 방법이다."
        ],
        "answer": 1,
        "explanation": "정규화(Normalization) 혹은 스케일링은 기존 변수의 '값의 범위나 단위 단위'를 0과 1 사이 등으로 변경하는 스케일링 방법이지, 아예 새로운 의미를 갖는 변수를 '생성(파생/확장)'하는 기법이 아닙니다. 새로운 변수를 창출하는 건 'Feature Engineering(파생변수 생성)'입니다.",
        "whyWrong": [
            "이동평균 등을 써서 들쭉날쭉한 데이터를 매끄러운 형태로 다듬는 올바른 설명입니다.",
            "정답",
            "스케일링의 정확한 정의입니다.",
            "표준화(Z-score)의 정확한 정의입니다."
        ],
        "memorizationPoint": "정규화/표준화 ➔ 기존 변수의 값 스케일 조정 (파생/확장아님).",
        "examinerTip": "전처리 기법의 목적들(평활화-잡음제거, 정규화-단위통일, 인코딩-수치화)을 헷갈리지 않게 매칭해야 합니다."
    },
    {
        "id": "Q12028",
        "subject": 2,
        "chapter": "상관관계 기법",
        "sectionId": "s2-7",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 공분산과 상관계수에 대한 설명으로 가장 옳지 않은 것은 무엇인가?",
        "choices": [
            "공분산은 두 변수가 동일한 방향으로 함께 변하는 정도를 측정하는 지표이다.",
            "피어슨 상관계수(Pearson Correlation)는 두 연속형 수치 변수 간의 선형(직선) 관계 강도를 측정한다.",
            "스피어만 상관계수(Spearman Correlation)는 순위(Rank) 자료를 이용해 관계성을 측정하는 비모수 척도이다.",
            "피어슨 상관계수는 산점도가 U자 또는 포물선을 그리는 비선형 관계를 검정하고 측정하는 데 매우 적합하다."
        ],
        "answer": 3,
        "explanation": "피어슨 상관계수는 오직 두 변수 간의 '선형(직선) 관계'만을 포착할 수 있습니다. 그래서 U자 모양의 완벽한 2차 함수적 비선형 관계가 있더라도 피어슨 상관계수는 0에 가깝게 나옵니다. 비선형 관계 측정엔 부적합합니다.",
        "whyWrong": [
            "공분산이 양수면 같은 방향, 음수면 반대 방향을 나타냅니다.",
            "피어슨 상관계수의 정확한 목적입니다.",
            "값 자체 대신 등수(순위)로 변환해 순서적 연관성을 재는 것이 스피어만 계수입니다.",
            "정답"
        ],
        "memorizationPoint": "피어슨 상관계수는 오직 '직선(선형)' 관계만 잰다. 곡선(비선형)은 짚어내지 못한다.",
        "examinerTip": "피어슨 상관계수가 0이라고 해서 두 변수가 아무런 관련성이 없다고 단정 지으면 안 됩니다(비선형 패턴일 수 있음)."
    },
    {
        "id": "Q12039",
        "subject": 2,
        "chapter": "데이터 변환",
        "sectionId": "s2-8",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 Box-Cox 변환에서 적절한 변환 파라미터 λ(람다) 값을 선택하는 기준으로 옳지 않은 것은?",
        "choices": [
            "변환된 데이터 분포의 왜도(Skewness)가 0에 가깝게 대칭이 되도록 하는 λ 값을 선택한다.",
            "Q-Q plot을 그려 데이터 포인트들이 45도 직선에 가장 잘 부합하는 λ 값을 찾는다.",
            "샤피로-윌크(Shapiro-Wilk) 정규성 검정을 수행하여 p-value가 최소화 되는 방향의 λ 값을 선택한다.",
            "분석 데이터의 특성에 따라 λ=0을 적용하여 로그변환 효과를 내거나, λ=0.5를 적용하여 제곱근변환 효과를 얻을 수 있다."
        ],
        "answer": 2,
        "explanation": "Box-Cox 변환의 목적은 데이터를 정규분포에 가깝게 만드는 것입니다. 정규성 검정(샤피로-윌크 등)에서는 귀무가설이 '데이터가 정규분포를 따른다'이므로, p-value가 유의수준(0.05)보다 커야(최대화되어야) 정규성이 훼손되지 않았음을 뜻합니다. p-value를 최소화(기각)하는 방향으로 가면 안 됩니다.",
        "whyWrong": [
            "대칭성을 확보하는 좋은 기준입니다.",
            "Q-Q plot 직선 일치는 정규성의 증거입니다.",
            "정답",
            "Box-Cox 변환 수식의 특징 상 람다가 0이면 자연로그, 0.5면 제곱근 변환과 동일합니다."
        ],
        "memorizationPoint": "정규성 검정(Shapiro-Wilk, K-S)의 귀무가설 = '정규분포가 맞다'. 따라서 P-VALUE가 커야 정규성을 충족하는 것이다.",
        "examinerTip": "p-value가 무조건 작아야 좋다고 생각하는 초보자들의 심리를 이용한 고난이도 함정 문제로 출제됩니다."
    },
    {
        "id": "Q12040",
        "subject": 2,
        "chapter": "표본 분포 특징",
        "sectionId": "s2-9",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 t-분포, 정규분포, F-검정에 대한 설명으로 가장 옳지 않은 것은?",
        "choices": [
            "t-분포는 표본의 크기가 비교적 작고 모집단의 분산을 알지 못할 때, 모평균에 대한 가설검정에 주로 사용된다.",
            "정규분포는 평균과 분산(표준편차) 두 모수에 의해 그래프의 뼈대 모양과 위치가 완전히 결정된다.",
            "F-검정은 두 집단 간의 '분산'이 서로 동일한지(등분산성)를 비교 분석하는 데 사용할 수 있는 기법이다.",
            "t-검정은 모집단의 모평균과 모분산을 우리가 사전에 모두 확실히 알고 있을 때만 사용하는 필수 가설검정이다."
        ],
        "answer": 3,
        "explanation": "모집단의 모평균과 모분산을 모두 확실히 알고 있다면 t-검정이 아닌 Z-검정(정규분포)을 사용합니다. t-검정은 표본의 크기가 작고 '모분산을 모를 때' 표본 분산으로 이를 대체해서 검정하기 위해 고안된 기법입니다.",
        "whyWrong": [
            "t-분포와 t-검정이 설계된 주된 목적입니다.",
            "정규분포 N(μ, σ²)의 핵심 성질입니다.",
            "F-분포와 F-검정은 두 분산의 '비율(비)'을 검정하므로 등분산성 검정에 사용됩니다.",
            "정답"
        ],
        "memorizationPoint": "모분산을 (안다 + 표본 크다) = Z검정 중심 / 모분산을 (모른다 + 표본 작다) = t검정 중심.",
        "examinerTip": "Z-검정과 t-검정의 사용 조건을 가르는 기준(모분산을 아는가? n이 30 이상인가?)을 묻는 질문입니다."
    },
    {
        "id": "Q12041",
        "subject": 3,
        "chapter": "딥러닝 응용",
        "sectionId": "s3-9",
        "cardId": "c3-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 입력 시퀀스(문장 등)가 길어질 때 앞쪽의 단어 정보가 뒤로 갈수록 점차 소실되는 RNN의 문제(장기 의존성 문제)를 보완하고, 디코더가 출력을 만들 때 입력의 중요한 '특정 부분에 가중치를 두어 더 집중하도록' 고안된 딥러닝 메커니즘은?",
        "choices": [
            "풀링(Pooling)",
            "배치 정규화(Batch Normalization)",
            "어텐션(Attention)",
            "드롭아웃(Dropout)"
        ],
        "answer": 2,
        "explanation": "어텐션(Attention) 알고리즘은 모델이 결과를 예측할 때, 입력 시퀀스의 전체 정보 중 현재 예측해야 할 단어와 가장 관련성 높은 부분에 '주의(Attention)'를 더 깊게 기울이게 하는 혁신적인 딥러닝 메커니즘입니다.",
        "whyWrong": [
            "CNN 등에서 이미지 크기를 줄여 주요 피처만 요약하는 연산입니다.",
            "레이어 통과 시마다 학습이 안정되도록 미니배치 단위로 정규화를 시키는 훈련 기법입니다.",
            "정답",
            "과적합 방지를 위해 학습 중 무작위로 일부 뉴런을 끄고 학습시키는 기법입니다."
        ],
        "memorizationPoint": "문장이 길어짐 + 중요 단어에 집중 = 어텐션 메커니즘(Attention).",
        "examinerTip": "어텐션, 트랜스포머, RNN, LSTM 등 최신 딥러닝 자연어처리 계보에서 나타난 키워드들의 특징을 잘 정리해 두어야 합니다."
    },
    {
        "id": "Q12042",
        "subject": 3,
        "chapter": "딥러닝 텍스트 처리",
        "sectionId": "s3-9",
        "cardId": "c3-exam12",
        "difficulty": "easy",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 단어들의 순서와 문맥적 흐름(시계열적 특성)이 중요한 자연어(NLP) 및 음성 데이터를 모델링하고 처리하는 데 보통 가장 최적화되어 있는 딥러닝 인공신경망 계열들로 올바르게 묶인 것은?",
        "choices": [
            "CNN(합성곱 신경망), GAN(적대적 생성 신경망)",
            "KNN(K-최근접 이웃), 의사결정나무(Decision Tree)",
            "RNN(순환 신경망), 트랜스포머(Transformer)",
            "SVM(서포트 벡터 머신), DNN(심층 신경망)"
        ],
        "answer": 2,
        "explanation": "자연어나 음성과 같이 데이터 포인트 간의 '순서(Time steps)'가 의미를 가지는 시퀀스(Sequence) 데이터를 처리하는 데에는 RNN 계열(LSTM, GRU 포함)과 최근 거대 언어 모델(LLM)의 근간이 된 트랜스포머(Transformer) 모델이 가장 적합합니다.",
        "whyWrong": [
            "CNN은 주로 이미지 등 공간적 구조를 파악하는 데 특화되어 있고, GAN은 가짜 이미지를 실감나게 생성하는 데 특화되었습니다.",
            "머신러닝 알고리즘이며 연속적 문맥 처리망이 아닙니다.",
            "정답",
            "SVM은 일반적 분류기이며 특정 시퀀스 전문 모델이 아닙니다."
        ],
        "memorizationPoint": "텍스트 등 '시퀀스(순서)'가 중요한 연속 데이터 = RNN, LSTM, Transformer.",
        "examinerTip": "데이터 유형(이미지 vs 텍스트/시계열)에 따른 적합한 딥러닝 알고리즘 군을 묶어내는 문제가 빈출입니다."
    },
    {
        "id": "Q12034",
        "subject": 2,
        "chapter": "데이터 스케일링",
        "sectionId": "s2-7",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 데이터 전처리 과정에서의 변수값 변환(Scaling & Transformation) 방법에 대해 옳게 설명하는 것은?",
        "choices": [
            "Min-Max 정규화는 데이터 값들 중 최솟값과 최댓값만 보므로 극단적인 이상치의 영향을 거의 받지 않는다.",
            "Z-Score 표준화는 변환할 때 원래 데이터의 평균(μ)과 표준편차(σ) 통계량을 이용하여 분산을 1로 맞춘다.",
            "로그 변환(Log Transform)은 오른쪽으로 꼬리가 길게 늘어진 비대칭 분포를 정규분포에서 더 심하게 왜곡시킨다.",
            "사분위수를 이용한 Robust 정규화를 수행하면 변환 후에도 원본 데이터가 가졌던 절대적인 숫자 범위를 완전히 그대로 유지한다."
        ],
        "answer": 1,
        "explanation": "Z-Score(Standardization)는 공식 `(x - 평균) / 표준편차`를 사용하므로 원래 데이터의 평균과 표준편차를 활용하여 데이터를 평균이 0, 표준편차가 1인 정규분포 형태로 재배열합니다.",
        "whyWrong": [
            "최댓값과 최솟값 양 끝에만 절대적으로 의존하므로 이상치가 하나라도 튀면 모든 정상 데이터가 한 점으로 뭉개지는 등 이상치에 극도로 치명적입니다.",
            "정답",
            "로그 변환은 오른쪽으로 긴 꼬리(왜도>0)를 가진 비대칭 데이터를 좀 더 종모양(정규분포)으로 '펴주는(안정화시키는)' 효과가 있습니다. 심하게 왜곡시키는 것이 아닙니다.",
            "어떤 스케일링이든 변환을 수행하면 값의 스케일은 원본값(ex: 월급 500만원)에서 완전히 다른 숫자 범위(ex: 0.1~1.5 등)로 틀어집니다."
        ],
        "memorizationPoint": "Z-score 공식 = (데이터 - 평균) / 표준편차. 분산을 1로 만든다.",
        "examinerTip": "Min-Max 스케일링이 이상치에 '취약함'을 오답으로 내는 것은 매우 전통적인 출제 방식입니다. 이상치에 강한 놈은 'Robust'입니다."
    },
    {
        "id": "Q12035",
        "subject": 4,
        "chapter": "교차표 및 가설검정",
        "sectionId": "s4-4",
        "cardId": "c4-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 두 범주형 변수를 교차로 나열한 2차원 분할표(Contingency Table, 교차표)를 이용한 카이제곱 독립성 검정에서 자유도(Degree of Freedom)를 계산하는 공식으로 가장 옳은 것은?",
        "choices": [
            "전체 표본 수 - 1",
            "행의 수 + 열의 수",
            "(행의 수 - 1) × (열의 수 - 1)",
            "관측빈도 - 기대빈도"
        ],
        "answer": 2,
        "explanation": "교차표를 활용하는 카이제곱 독립성/동질성 검정의 파라미터인 자유도는 (r - 1) × (c - 1) 수식을 따릅니다. 여기서 r은 범주형 행(Row)의 개수, c는 범주형 열(Column)의 개수입니다.",
        "whyWrong": [
            "단일 표본에 사용하는 일반 분산 계산 등의 자유도입니다.",
            "잘못된 계산법입니다.",
            "정답",
            "카이제곱 검정 통계량 값을 산출하는 도중 활용되는 차이값 산식이지 자유도 공식이 아닙니다."
        ],
        "memorizationPoint": "교차분할표 카이제곱 검정 자유도 = (R행 - 1) * (C열 - 1).",
        "examinerTip": "가령 2(성별) x 3(등급) 교차표라면 자유도는 (2-1)*(3-1) = 2가 됨을 직접 요구할 수도 있습니다."
    },
    {
        "id": "Q12036",
        "subject": 2,
        "chapter": "확률 기초",
        "sectionId": "s2-9",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 보기 중 연속형(Continuous) 확률분포가 아닌 이산형(Discrete) 확률분포 모형에 해당하는 것은?",
        "choices": [
            "포아송 분포(Poisson Distribution)",
            "감마 분포(Gamma Distribution)",
            "정규 분포(Normal Distribution)",
            "베타 분포(Beta Distribution)"
        ],
        "answer": 0,
        "explanation": "포아송 분포는 일정한 시간 또는 공간 내에서 어떤 사건이 '발생하는 횟수(횟수는 0, 1, 2, 3.. 처럼 딱 떨어지는 이산값)'를 나타내는 대표적인 이산형 확률 분포입니다.",
        "whyWrong": [
            "정답",
            "대기 시간이나 신뢰성 등을 다루는 양의 실수 연속 분포입니다.",
            "가장 유명한 연속형 곡선 모형 분포입니다.",
            "0과 1 사이 구간에서 정의되는 연속형 확률 분포입니다."
        ],
        "memorizationPoint": "대표 이산형 분포 = 베르누이, 이항, 포아송, 기하, 초기하 분포. 대표 연속형 분포 = 정규, t, F, 카이제곱.",
        "examinerTip": "분포의 종류를 주고 이산형인지 연속형인지 구별하는 문제는 통계 기초를 묻는 훌륭한 문항입니다. '횟수'나 '성공/실패'는 이산형입니다."
    },
    {
        "id": "Q12037",
        "subject": 2,
        "chapter": "중심극한정리",
        "sectionId": "s2-9",
        "cardId": "c2-exam12",
        "difficulty": "hard",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 통계학의 핵심이라고 할 수 있는 중심극한정리(Central Limit Theorem)에 대한 설명으로 가장 옳은 것은?",
        "choices": [
            "통계적으로 표본 크기가 작아질수록 그 표본에서 뽑아낸 표본평균의 분포 곡선 모양은 점차 정규분포에 단단히 가까워진다.",
            "원래 우리가 추출하려는 모집단 데이터 자체가 정규분포 곡선을 따를 때에만 중심극한정리가 수학적으로 성립하게 된다.",
            "모집단이 어떤 비뚤어진 분포를 가지든 관계없이 임의 추출한 표본의 크기(n)가 충분히 크면 그 '표본평균들의 분포(Sampling distribution of mean)'는 결국 근사적으로 정규분포에 가까워진다.",
            "표본 크기가 극한으로 커져 모집단 사이즈와 일치하게 되면, 해당 표본평균들이 가지는 분산 크기는 항상 0이 된다."
        ],
        "answer": 2,
        "explanation": "중심극한정리(CLT)는 원본 모집단의 분포 형태(비대칭이든 쌍봉이든 상관 없이)와 무관하게, 충분히 큰 집합(일반적으로 n≥30) 단위로 표본을 반복 추출하여 그 '평균치(표본평균)'만 모아서 그래프를 그리면 정규분포 모양을 띈다는 위대한 통계법칙입니다.",
        "whyWrong": [
            "표본 크기가 '커질수록(n 커질수록)' 정규분포에 근사합니다.",
            "모집단이 정규분포를 따르지 않는 개판(?) 분포여도 성립한다는 것이 중심극한정리의 위대한 성질입니다.",
            "정답",
            "표본분산 공식 상 극한이 되면 0에 수렴하는 경향이 있겠지만, 중심극한정리의 정체성을 설명하는 핵심 정의 문장이 전혀 아닙니다."
        ],
        "memorizationPoint": "중심극한정리: 엄마(모집단)가 어떻게 생겼든 무시하고, 자식(표본)을 많이 낳으면 평균은 예쁜 종(정규분포) 모양이 된다.",
        "examinerTip": "중심극한정리는 '모집단이 반드시 정규분포여야 한다'는 오답 보기를 매우 조심해야 합니다."
    },
    {
        "id": "Q12038",
        "subject": 2,
        "chapter": "데이터 전처리 결측치 결측값 처리",
        "sectionId": "s2-4",
        "cardId": "c2-exam12",
        "difficulty": "medium",
        "questionType": "multiple-choice",
        "question": "[12회 기출] 다음 중 데이터 분석 셋 기획 및 전처리 과정에서 결측치(Missing Value)를 처리하는 방법으로 가장 적절하지 않은 것은?",
        "choices": [
            "완전 제거(Listwise Deletion) 분석은 여러 변수 중 결측치가 하나라도 포함되어 있는 행(레코드)을 완전히 제거하여 지우는 방법이다.",
            "평균 대치(Mean Imputation) 기법은 해당 변수의 결측값을 같은 컬럼 내 정상 데이터들의 평균값으로 일괄 계산하여 대체하는 방법이다.",
            "회귀 대치(Regression Imputation)는 변수 간의 연관 관계에서 추정된 회귀식의 계산 예측값으로 빈 구멍(결측값)을 채워넣는 방법이다.",
            "행 제거(완전 분석) 기법을 사용하면 통계적 일관성 유지가 쉬워지며 원래 행의 형태가 보존되므로 원본 데이터보다 더 많은 가상 데이터를 생성할 수 있다."
        ],
        "answer": 3,
        "explanation": "완전 제거(Complete Case Analysis / Listwise Deletion)는 결측치가 있는 데이터를 삭제해 버리는 방법이므로, 수행 시 살아남는 최종 관측치 숫자는 항상 원본보다 줄어들(감소) 수밖에 없습니다. 데이터의 양이 부족해지는 단점이 있습니다.",
        "whyWrong": [
            "결측이 한 개라도 있으면 행 통째로 삭제하는 Listwise 삭제 방식의 설명입니다.",
            "쉽게 편하게 빈칸에 전체 평균치를 집어넣어 채우는 단순 대치 방식입니다.",
            "다변량 연관성을 이용해 더 그럴싸한 숫자(예측치)를 빈칸에 채우는 훌륭한 대체 방식입니다.",
            "정답"
        ],
        "memorizationPoint": "행 제거(삭제법)를 하면 데이터 건수(N)는 필연적으로 손실·감소한다.",
        "examinerTip": "전처리 대체 방법 명칭(평균대치, 조건부 대치, 다중 대치 등)의 개념 및 단점을 제대로 숙지하고 있어야 합니다."
    }
]

data['questions'].extend(new_questions)

with open(target_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Added {len(new_questions)} questions to cbt_bank.json")
