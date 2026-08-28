const fs = require('fs');
const path = require('path');

const q12_list = [
  // 1과목: 빅데이터 분석 기획 (1~20)
  {
    id: "Q12_01",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 맵리듀스(MapReduce) 프레임워크에서 여러 개의 대용량 데이터셋을 특정 키(Key) 값을 기준으로 분산 병합할 때 사용하는 데이터 처리 패턴은?",
    choices: [
      "조인(Join) 패턴",
      "필터링(Filtering) 패턴",
      "요약(Summarization) 패턴",
      "구조적 변환(Structural Transformation) 패턴"
    ],
    answer: 0,
    explanation: "맵리듀스에서 둘 이상의 데이터셋을 공통 키(Key)를 기준으로 결합하여 하나의 통합 레코드로 만드는 분산 처리 기법은 '조인(Join) 패턴'(Map-side Join 또는 Reduce-side Join)입니다.",
    whyWrong: [
      "정답: 특정 키를 기준으로 다수의 데이터셋을 병합하는 기법은 조인 패턴입니다.",
      "필터링 패턴은 조건에 맞지 않는 레코드를 걸러내는 패턴입니다.",
      "요약 패턴은 수치형 데이터의 평균, 합계 등 집계 통계량을 계산하는 패턴입니다.",
      "구조적 변환은 데이터 포맷이나 스키마 형태를 변환하는 패턴입니다."
    ],
    memorizationPoint: "특정 키(Key) 기준 분산 병합 ➔ 맵리듀스 조인(Join) 패턴",
    examinerTip: "💡 12회 기출 핵심: 대용량 분산 처리 프레임워크에서 공통 키를 통한 데이터 결합 연산은 맵리듀스 조인(Join)의 전형적인 출제 개념입니다."
  },
  {
    id: "Q12_02",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 하둡 분산 파일 시스템(HDFS)의 아키텍처 특성에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "네임노드(NameNode)에 장애가 발생하면 전체 HDFS 클러스터가 중단되는 단일 장애점(SPOF)을 가진다.",
      "데이터노드(DataNode)는 파일의 메타데이터와 블록 위치 정보를 메모리에서 전담 관리한다.",
      "HDFS는 주로 수많은 작은 파일(Small Files)의 실시간 빈번한 수정 처리에 최적화되어 있다.",
      "블록의 기본 복제 계수(Replication Factor)는 1이며 데이터 복제본을 저장하지 않는다."
    ],
    answer: 0,
    explanation: "HDFS는 마스터-슬레이브 구조로, 메타데이터를 총괄 관리하는 네임노드(NameNode)가 단일 장애점(SPOF, Single Point of Failure)으로 작용할 수 있습니다. (하둡 2.0 이상에서는 Active/Standby 이중화로 보완)",
    whyWrong: [
      "정답: 네임노드는 HDFS의 대표적인 단일 장애점(SPOF) 특성을 가집니다.",
      "메타데이터와 블록 매핑 정보는 데이터노드가 아닌 '네임노드'가 전담 관리합니다.",
      "HDFS는 대용량 파일의 순차적 읽기/쓰기(WORM: Write Once, Read Many)에 최적화되어 있습니다.",
      "HDFS의 기본 블록 복제 계수는 3(원본 1 + 복제본 2)입니다."
    ],
    memorizationPoint: "HDFS 네임노드 장애 시 전체 시스템 작동 불능 ➔ 단일 장애점(SPOF)",
    examinerTip: "💡 12회 기출 핵심: 네임노드(메타데이터 총괄, SPOF) vs 데이터노드(실제 데이터 블록 저장)의 기능 구분을 묻는 문제는 하둡 에코시스템의 최빈출 문제입니다."
  },
  {
    id: "Q12_03",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 하둡 에코시스템 중 분산된 다수의 서버로부터 대용량 로그 데이터를 안정적으로 수집하여 HDFS에 저장하는 기술은?",
    choices: [
      "척와 (Chukwa)",
      "스쿱 (Sqoop)",
      "피그 (Pig)",
      "머하웃 (Mahout)"
    ],
    answer: 0,
    explanation: "척와(Chukwa)와 플럼(Flume)은 분산 환경의 대용량 로그 데이터를 실시간/배치로 수집하여 HDFS에 저장하는 하둡 에코시스템의 대표적인 로그 수집 기술입니다.",
    whyWrong: [
      "정답: 분산 서버 로그 수집 기술은 척와(Chukwa) 및 플럼(Flume)입니다.",
      "스쿱(Sqoop)은 RDBMS와 HDFS 간의 정형 데이터 전송 솔루션입니다.",
      "피그(Pig)는 맵리듀스 처리를 단순화하는 고수준 데이터 흐름 언어입니다.",
      "머하웃(Mahout)은 하둡 기반의 머신러닝 라이브러리입니다."
    ],
    memorizationPoint: "분산 서버 대용량 로그 수집 ➔ 척와(Chukwa), 플럼(Flume)",
    examinerTip: "💡 12회 기출 핵심: 로그 수집(척와, 플럼) vs RDBMS 정형 연동(스쿱) vs 분산 코디네이션(주키퍼) 3대 에코시스템 용도를 명확히 구분하세요."
  },
  {
    id: "Q12_04",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 관계형 데이터베이스(RDBMS)와 하둡(HDFS/Hive/HBase) 간에 정형 데이터를 대용량으로 상호 전송·추출하기 위해 사용하는 솔루션은?",
    choices: [
      "스쿱 (Sqoop)",
      "카프카 (Kafka)",
      "스파크 (Spark)",
      "우지 (Oozie)"
    ],
    answer: 0,
    explanation: "스쿱(Sqoop, SQL-to-Hadoop)은 Oracle, MySQL 등 RDBMS와 HDFS, Hive 간에 정형 데이터를 고속으로 상호 임포트/익스포트할 수 있도록 지원하는 소프트웨어입니다.",
    whyWrong: [
      "정답: SQL to Hadoop 정형 데이터 전송 솔루션은 스쿱(Sqoop)입니다.",
      "카프카는 대용량 실시간 분산 메시징/이벤트 스트리밍 플랫폼입니다.",
      "스파크는 인메모리 기반의 고속 분산 데이터 처리 엔진입니다.",
      "우지는 하둡 작업들의 스케줄링과 워크플로우를 관리하는 프레임워크입니다."
    ],
    memorizationPoint: "RDBMS와 하둡 간 정형 데이터 연동 ➔ 스쿱(Sqoop: SQL to Hadoop)",
    examinerTip: "💡 12회 기출 핵심: Sqoop이라는 이름 자체가 'SQL to Hadoop'의 합성어임을 기억하면 3초 만에 정답을 고를 수 있습니다."
  },
  {
    id: "Q12_05",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] NoSQL 데이터베이스 중 JSON, BSON, XML 등의 문서(Document) 형태로 데이터를 저장하며, 수평적 확장을 위해 오토 샤딩(Auto-sharding)을 기본 지원하는 시스템은?",
    choices: [
      "MongoDB",
      "Redis",
      "HBase",
      "Neo4j"
    ],
    answer: 0,
    explanation: "MongoDB와 CouchDB는 도큐먼트(Document) 기반 NoSQL로, BSON/JSON 형식의 유연한 스키마를 사용하며 대규모 분산 처리를 위한 자동 샤딩(Auto-Sharding)과 복제(Replica Set) 기능을 제공합니다.",
    whyWrong: [
      "정답: 문서(Document) 기반 NoSQL 및 오토 샤딩 지원 DB는 MongoDB입니다.",
      "Redis는 초고속 인메모리 Key-Value 스토어입니다.",
      "HBase는 구글 빅테이블 기반의 Column-family(열 지향) NoSQL입니다.",
      "Neo4j는 노드와 엣지로 관계를 표현하는 그래프(Graph) NoSQL입니다."
    ],
    memorizationPoint: "JSON/BSON 문서 기반 + 오토 샤딩 ➔ MongoDB (Document Store)",
    examinerTip: "💡 12회 기출 핵심: Key-Value(Redis), Column-Family(HBase, Cassandra), Document(MongoDB), Graph(Neo4j) 4대 NoSQL 유형 매칭은 단골 문제입니다."
  },
  {
    id: "Q12_06",
    subject: 1,
    chapter: "데이터 수집 및 전처리",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 인터넷 상의 웹 페이지들을 자동으로 탐색하고 원하는 텍스트 및 데이터 요소를 추출하기 위해 사용하는 크롤링/스크래핑 도구는?",
    choices: [
      "스크래퍼 (Scraper / Scrapy)",
      "네임노드 (NameNode)",
      "주키퍼 (ZooKeeper)",
      "텐서보드 (TensorBoard)"
    ],
    answer: 0,
    explanation: "스크래퍼(Scraper) 또는 Scrapy, BeautifulSoup, Selenium 등은 웹 사이트의 HTML 구조를 탐색하여 특정 데이터만을 수집 및 추출하는 웹 데이터 수집 도구입니다.",
    whyWrong: [
      "정답: 웹 페이지 탐색 및 데이터 추출 도구는 스크래퍼(Scraper)입니다.",
      "네임노드는 HDFS의 메타데이터 관리 서버입니다.",
      "주키퍼는 분산 시스템의 상태 관리 및 코디네이션 서비스입니다.",
      "텐서보드는 딥러닝 모델의 학습 과정을 시각화하는 도구입니다."
    ],
    memorizationPoint: "웹 페이지 데이터 수집 및 추출 ➔ 스크래퍼(Scraper)",
    examinerTip: "💡 12회 기출 핵심: 크롤링(웹 페이지 순회 탐색)과 스크래핑(특정 데이터 추출/파싱)의 개념을 명확히 익혀두세요."
  },
  {
    id: "Q12_07",
    subject: 1,
    chapter: "데이터 수집 및 전처리",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] HTML, XML 등 비정형/반정형 웹 문서에서 구문 분석을 수행하여 필요한 텍스트 데이터만을 추출하고 구조화하는 처리 과정을 무엇이라 하는가?",
    choices: [
      "파싱 (Parsing)",
      "인코딩 (Encoding)",
      "샤딩 (Sharding)",
      "패딩 (Padding)"
    ],
    answer: 0,
    explanation: "파싱(Parsing, 구문 분석)은 일련의 문자열이나 HTML/XML 문서를 문법적 구성 요소(DOM 등)로 분해하고 분석하여 원하는 데이터를 구조화된 형태로 추출하는 과정입니다.",
    whyWrong: [
      "정답: 구문 분석을 통해 데이터를 추출/구조화하는 것은 파싱(Parsing)입니다.",
      "인코딩은 정보를 다른 형식이나 부호 체계로 변환하는 것입니다.",
      "샤딩은 대용량 데이터베이스를 여러 물리적 노드에 분할 저장하는 기술입니다.",
      "패딩은 시퀀스 길이나 이미지 크기를 맞추기 위해 0 등을 채우는 작업입니다."
    ],
    memorizationPoint: "웹 문서 구문 분석 및 원하는 데이터 추출 ➔ 파싱(Parsing)",
    examinerTip: "💡 12회 기출 핵심: 파싱은 비정형 웹 문서를 정형 데이터로 변환하는 첫 번째 단계로 시험에 자주 등장합니다."
  },
  {
    id: "Q12_08",
    subject: 1,
    chapter: "빅데이터 기술 및 플랫폼",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 빅데이터 아키텍처 계층 구조에서 서버, 스토리지, 네트워크 등 물리적 자원을 할당하고 가상화 환경을 논리적으로 제공하는 계층은?",
    choices: [
      "인프라(Infra) 계층",
      "플랫폼 소프트웨어 계층",
      "응용 서비스 계층",
      "데이터 분석 및 시각화 계층"
    ],
    answer: 0,
    explanation: "빅데이터 플랫폼 아키텍처에서 하드웨어 물리 자원의 프로비저닝 및 가상화(IaaS)를 전담하는 것은 '인프라 계층'입니다. 상위의 플랫폼 소프트웨어 계층은 분산 처리 엔진, DB 등을 논리적으로 구동합니다.",
    whyWrong: [
      "정답: 하드웨어 자원 할당과 관리는 인프라(Infra) 계층의 고유 역할입니다.",
      "플랫폼 소프트웨어 계층은 하둡, 스파크 등 데이터 처리 미들웨어를 관리합니다.",
      "응용 서비스 계층은 최종 사용자에게 비즈니스 기능을 제공하는 최상위 계층입니다.",
      "데이터 분석 계층은 머신러닝 알고리즘 및 시각화 도구를 구동하는 계층입니다."
    ],
    memorizationPoint: "하드웨어 물리 자원 할당 및 가상화 ➔ 인프라(Infra) 계층",
    examinerTip: "💡 12회 기출 핵심: 아키텍처 계층 문제에서 '물리 자원 할당'을 소프트웨어 계층의 역할로 왜곡하는 보기를 주의하세요."
  },
  {
    id: "Q12_09",
    subject: 1,
    chapter: "개인정보 비식별 조치",
    sectionId: "s1-2",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 빅데이터 비식별화 모델(K-익명성, L-다양성, T-근접성)을 적용할 때 가장 균형 있게 고려해야 하는 핵심 원칙은?",
    choices: [
      "프라이버시 보호 수준을 강화하되, 분석 목적에 필요한 '데이터 유용성(Utility)'을 훼손하지 않아야 한다.",
      "재식별 위험을 0으로 만들기 위해 데이터 내 모든 준식별자를 완전 삭제해야 한다.",
      "L-다양성은 민감한 정보의 전체 분포와 표본 분포의 거리 차이를 T 이하로 제한하는 모델이다.",
      "K-익명성을 적용하면 배경지식 공격(Background Knowledge Attack)을 완벽하게 차단할 수 있다."
    ],
    answer: 0,
    explanation: "비식별화의 궁극적 목표는 개인정보 프라이버시를 안전하게 보호하면서도(Privacy), 데이터 분석의 가치와 품질을 나타내는 '데이터 유용성(Utility)'을 보존하는 것입니다.",
    whyWrong: [
      "정답: 프라이버시 보호와 데이터 유용성(Utility)의 균형이 가장 중요한 원칙입니다.",
      "준식별자를 무조건 완전 삭제하면 분석에 필요한 데이터 유용성이 상실됩니다.",
      "분포 거리 차이를 T 이하로 제한하는 모델은 L-다양성이 아니라 'T-근접성'입니다.",
      "K-익명성은 동질성 공격과 배경지식 공격에 취약하여 L-다양성이 보완으로 등장했습니다."
    ],
    memorizationPoint: "비식별화의 핵심 목표 ➔ 프라이버시 보호(Privacy)와 데이터 유용성(Utility)의 양립",
    examinerTip: "💡 12회 기출 핵심: K-익명성(K명 이상), L-다양성(L개 이상 다양한 민감정보), T-근접성(분포 차이 T 이하)의 정의와 상호 보완 관계를 반드시 숙지하세요."
  },
  {
    id: "Q12_10",
    subject: 1,
    chapter: "데이터 거버넌스 및 법제도",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 빅데이터 분석 프로젝트를 수행할 때 개인정보보호법, 정보통신망법과 함께 개인의 금융 거래 및 신용 정보를 보호하고 건전한 활용을 규제하는 법률은?",
    choices: [
      "신용정보의 이용 및 보호에 관한 법률 (신용정보법)",
      "전자상거래 등에서의 소비자보호에 관한 법률",
      "공공데이터의 제공 및 이용 활성화에 관한 법률",
      "지능정보화 기본법"
    ],
    answer: 0,
    explanation: "데이터 3법은 '개인정보보호법', '정보통신망법(정보통신망 이용촉진 및 정보보호 등에 관한 법률)', '신용정보법(신용정보의 이용 및 보호에 관한 법률)'으로 구성되며 금융/신용 데이터의 안전한 활용을 다룹니다.",
    whyWrong: [
      "정답: 개인의 금융/신용 정보 규제 및 데이터 3법의 한 축은 신용정보법입니다.",
      "전자상거래법은 온라인 쇼핑 및 소비자 보호를 다루는 법률입니다.",
      "공공데이터법은 공공기관 데이터의 개방과 이용을 장려하는 법률입니다.",
      "지능정보화기본법은 국가 정보화 및 AI 산업 육성을 위한 법률입니다."
    ],
    memorizationPoint: "데이터 3법 ➔ 개인정보보호법 + 정보통신망법 + 신용정보법",
    examinerTip: "💡 12회 기출 핵심: 데이터 3법의 구성 3개 법률 명칭과 가명정보 결합 전문기관의 역할을 묻는 문제가 빈출됩니다."
  },
  {
    id: "Q12_11",
    subject: 1,
    chapter: "데이터분석 기획 및 방법론",
    sectionId: "s1-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 분석 대상(What)과 분석 방법(How)의 인지 여부에 따른 분석 기획 4가지 유형에 해당하지 않는 것은?",
    choices: [
      "통합 (Integration)",
      "최적화 (Optimization)",
      "솔루션 (Solution)",
      "통찰 (Insight)"
    ],
    answer: 0,
    explanation: "분석 기획 4대 사분면은 최적화(What O, How O), 솔루션(What O, How X), 통찰(What X, How O), 발견(What X, How X)입니다. 통합은 해당하지 않습니다.",
    whyWrong: [
      "정답: 통합(Integration)은 분석 기획 4대 사분면 유형에 포함되지 않습니다.",
      "최적화(What O, How O)는 4대 유형 중 하나입니다.",
      "솔루션(What O, How X)은 4대 유형 중 하나입니다.",
      "통찰(What X, How O)은 4대 유형 중 하나입니다."
    ],
    memorizationPoint: "분석 기획 4대 유형 ➔ 최적화(O,O), 솔루션(O,X), 통찰(X,O), 발견(X,X)",
    examinerTip: "💡 12회 기출 핵심: 4가지 사분면 매트릭스를 그리고 What과 How의 알고 있음/모름 상태를 3초 만에 짝짓는 훈련을 해두세요."
  },
  {
    id: "Q12_12",
    subject: 1,
    chapter: "데이터분석 기획 및 방법론",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 분석 마스터플랜 수립 시 비즈니스 도메인 내의 문제점과 해결해야 할 이슈를 명확하게 도출하고 타당성을 검토하는 초기 단계는?",
    choices: [
      "문제 정의 (Problem Definition)",
      "모형 전개 (Model Deployment)",
      "데이터 가공 (Data Preparation)",
      "성능 모니터링 (Monitoring)"
    ],
    answer: 0,
    explanation: "분석 과제 기획의 가장 첫 단계는 비즈니스 도메인의 요구사항을 분석하여 '문제 정의(Problem Definition)' 및 분석 유즈케이스를 구체화하는 것입니다.",
    whyWrong: [
      "정답: 분석 이슈와 과제를 명확히 도출하는 초기 단계는 문제 정의입니다.",
      "모형 전개는 구축된 모델을 운영 시스템에 탑재하는 마지막 단계입니다.",
      "데이터 가공은 문제 정의 및 데이터 탐색 이후 정제/변환을 수행하는 단계입니다.",
      "성능 모니터링은 모델 배포 후 지속적으로 예측 성능을 점검하는 단계입니다."
    ],
    memorizationPoint: "분석 과제 착수 첫 단계 ➔ 비즈니스 문제 정의(Problem Definition)",
    examinerTip: "💡 12회 기출 핵심: 하향식 접근법(Top-down)의 첫 단계 역시 '문제 탐색(Problem Discovery)' 및 '문제 정의'입니다."
  },
  {
    id: "Q12_13",
    subject: 1,
    chapter: "데이터분석 기획 및 방법론",
    sectionId: "s1-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 분석 프로젝트의 경제적 타당성을 평가하기 위해 투입 비용(Cost) 대비 비즈니스적 가치 창출(Value) 효과를 산출하는 대표적인 재무 지표는?",
    choices: [
      "ROI (투자수익률, Return On Investment)",
      "VIF (분산팽창계수)",
      "AUC (곡선하면적)",
      "MSE (평균제곱오차)"
    ],
    answer: 0,
    explanation: "ROI(투자자본수익률)는 투입 비용 대비 얻어지는 정량적 경제 효과를 평가하는 핵심 지표입니다.",
    whyWrong: [
      "정답: 비용 대비 가치 창출 평가 재무 지표는 ROI(투자수익률)입니다.",
      "VIF는 다중회귀의 다중공선성을 진단하는 통계 지표입니다.",
      "AUC는 이진 분류 모델의 ROC 곡선 아래 면적 지표입니다.",
      "MSE는 회귀 모델의 오차를 측정하는 손실 함수입니다."
    ],
    memorizationPoint: "비용(Cost) 대비 가치(Value) 평가 ➔ ROI (투자수익률)",
    examinerTip: "💡 12회 기출 핵심: 마스터플랜 우선순위 평가 2대 축은 '시급성(전략적 중요도, ROI)'과 '난이도(데이터/기술/비용)'입니다."
  },
  {
    id: "Q12_14",
    subject: 1,
    chapter: "분석 방법론 프로세스",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] CRISP-DM 방법론의 6개 단계 중 완성된 머신러닝 모형을 실제 운영 환경이나 비즈니스 업무 시스템에 탑재하여 실시간 서비스로 전환하는 단계는?",
    choices: [
      "전개 (Deployment)",
      "모델링 (Modeling)",
      "데이터 준비 (Data Preparation)",
      "업무 이해 (Business Understanding)"
    ],
    answer: 0,
    explanation: "CRISP-DM 6단계는 '업무 이해 ➔ 데이터 이해 ➔ 데이터 준비 ➔ 모델링 ➔ 평가 ➔ 전개(Deployment)'로 구성되며, 개발된 모형을 실제 시스템에 적용하는 단계는 전개(Deployment)입니다.",
    whyWrong: [
      "정답: 실제 업무 시스템에 적용하고 유지보수 계획을 수립하는 것은 전개(Deployment) 단계입니다.",
      "모델링 단계는 알고리즘을 선정하고 파라미터를 최적화하는 단계입니다.",
      "데이터 준비 단계는 모델링에 투입할 데이터를 정제하고 변환하는 단계입니다.",
      "업무 이해 단계는 비즈니스 목표를 분석 프로젝트 목표로 전환하는 초기 단계입니다."
    ],
    memorizationPoint: "CRISP-DM 최종 시스템 적용 단계 ➔ 전개 (Deployment)",
    examinerTip: "💡 12회 기출 핵심: CRISP-DM 6단계 순서와 단계 간 피드백 루프(특히 데이터 준비 ↔ 모델링 간 상호 반복)를 기억하세요."
  },
  {
    id: "Q12_15",
    subject: 1,
    chapter: "인공지능 및 빅데이터 개요",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "B",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 인공지능 머신러닝 모델의 성능과 학습 구조를 결정짓는 핵심 구성요소로 보기 가장 어려운 것은?",
    choices: [
      "네트워크 대역폭 속도 (Network Bandwidth)",
      "학습 데이터의 규모 및 품질 (Data Size & Quality)",
      "알고리즘 및 아키텍처 (Algorithm Structure)",
      "모델 파라미터 및 하이퍼파라미터 (Parameters)"
    ],
    answer: 0,
    explanation: "머신러닝 모델 자체의 핵심 구성요소는 데이터, 알고리즘, 파라미터/하이퍼파라미터, 손실함수입니다. 네트워크 속도는 분산 통신 인프라 환경의 조건일 뿐 모델 알고리즘의 구성요소는 아닙니다.",
    whyWrong: [
      "정답: 단순 네트워크 전송 속도 자체는 모델 내부 구성요소에 해당하지 않습니다.",
      "데이터 품질과 크기는 모델 성능을 결정하는 가장 핵심적인 요소입니다.",
      "알고리즘 구조(CNN, RNN 등)는 모델의 근간입니다.",
      "파라미터(가중치)와 하이퍼파라미터는 모델의 표현력을 결정합니다."
    ],
    memorizationPoint: "머신러닝 모델 3대 요소 ➔ 데이터, 알고리즘, 파라미터",
    examinerTip: "💡 12회 기출 핵심: 상식적인 IT 환경 인프라 용어를 모델 내부 구성요소로 둔갑시키는 오답 선지를 소거하세요."
  },
  {
    id: "Q12_16",
    subject: 1,
    chapter: "데이터 품질 관리",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "B",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 데이터 품질 관리 6대 차원 중, 분석에 필요한 필수 데이터 항목이나 레코드가 결측치나 누락 없이 온전하게 채워져 있는 상태를 의미하는 품질 지표는?",
    choices: [
      "완전성 (Completeness)",
      "정확성 (Accuracy)",
      "유효성 (Validity)",
      "일관성 (Consistency)"
    ],
    answer: 0,
    explanation: "데이터 품질의 '완전성(Completeness)'은 수집된 데이터에 결측값(Null)이나 필수 레코드의 누락이 없이 온전한 비율을 나타냅니다.",
    whyWrong: [
      "정답: 결측치나 누락이 없는 상태는 완전성(Completeness)입니다.",
      "정확성은 데이터가 현실의 실제 사실과 얼마나 일치하는지를 나타냅니다.",
      "유효성은 정의된 데이터 형식(도메인, 규칙)을 준수하는지 여부입니다.",
      "일관성은 서로 다른 테이블 간 데이터가 모순 없이 일치하는지 여부입니다."
    ],
    memorizationPoint: "결측치/누락 없이 온전히 채워진 상태 ➔ 완전성 (Completeness)",
    examinerTip: "💡 12회 기출 핵심: 데이터 품질 6차원(완전성, 정확성, 유효성, 일관성, 유일성, 최신성)의 개념 차이를 묻는 문제가 자주 출제됩니다."
  },
  {
    id: "Q12_17",
    subject: 1,
    chapter: "데이터 수집 및 오류",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "B",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 설문조사나 데이터 수집 시 발생하는 오류 중, 응답자가 의도적으로 거짓 응답을 하거나 문항을 잘못 이해하여 발생하는 오류는?",
    choices: [
      "보고 오류 (Reporting Error / Response Error)",
      "표본 추출 오류 (Sampling Error)",
      "기기 결함 오류 (Hardware Error)",
      "체계적 결측 오류 (MCAR Error)"
    ],
    answer: 0,
    explanation: "비표본 오류(Non-sampling Error)의 일종인 '보고 오류(응답 오류)'는 조사 대상자의 오기억, 고의적 왜곡 응답, 문항 오해 등으로 인해 발생하는 오류입니다.",
    whyWrong: [
      "정답: 응답자의 실수나 고의로 인한 오류는 보고 오류(Response Error)입니다.",
      "표본 추출 오류는 모집단 전체가 아닌 일부 표본만 뽑음으로써 발생하는 불가피한 오차입니다.",
      "기기 결함 오류는 센서나 물리적 하드웨어의 오작동 오류입니다.",
      "MCAR은 데이터 결측 발생 메커니즘을 의미합니다."
    ],
    memorizationPoint: "응답자의 실수나 왜곡으로 인한 오류 ➔ 보고 오류 (Response Error)",
    examinerTip: "💡 12회 기출 핵심: 표본오류(표본 크기 $N$ 증가 시 감소) vs 비표본오류(조사 규모 커지면 오히려 증가할 수 있음)의 특성을 비교하세요."
  },
  {
    id: "Q12_18",
    subject: 1,
    chapter: "개인정보 비식별 조치",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 개인정보 비식별 조치 기법 중 정확한 나이(예: 34세)를 연령대(예: 30대)로 변환하거나, 구체적인 주소를 시/군/구 단위로 상위 개념으로 치환하여 데이터의 유일성을 낮추는 기법은?",
    choices: [
      "범주화 (Categorization / Generalization)",
      "가명처리 (Pseudonymization)",
      "총계처리 (Aggregation)",
      "데이터 마스킹 (Masking)"
    ],
    answer: 0,
    explanation: "범주화(Categorization/Generalization)는 구체적인 수치나 주소 등의 세밀한 값을 상위 계층의 구간(범주)이나 광역 단위로 묶어 표현하는 대표적인 비식별 조치 기법입니다.",
    whyWrong: [
      "정답: 구체적인 값을 넓은 범위의 구간/범주로 치환하는 것은 범주화입니다.",
      "가명처리는 이름을 임의의 일련번호(User_A)나 해시값으로 대체하는 것입니다.",
      "총계처리는 전체 합계나 평균으로 집계하는 것입니다.",
      "데이터 마스킹은 주민번호 뒷자리를 *******로 가리는 기법입니다."
    ],
    memorizationPoint: "34세 ➔ 30대, 서울시 강남구 역삼동 ➔ 서울시 강남구 ➔ 범주화(Categorization)",
    examinerTip: "💡 12회 기출 핵심: 비식별 조치 5대 기법(가명처리, 총계처리, 데이터삭제, 범주화, 마스킹)의 대표 사례 매칭은 1과목 1순위 출제 포인트입니다."
  },
  {
    id: "Q12_19",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "B",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 기업 내 분석 전문 인력들이 별도의 전담 독립 부서에 모여 전사적인 분석 과제를 총괄 기획하고 주도하는 분석 조직 구조는?",
    choices: [
      "집중형 조직 구조 (Centralized)",
      "기능형 조직 구조 (Functional)",
      "분산형 조직 구조 (Decentralized)",
      "매트릭스 조직 구조 (Matrix)"
    ],
    answer: 0,
    explanation: "집중형(Centralized) 구조는 별도의 독립된 분석 전담 조직이 전사의 모든 분석 업무를 일원화하여 우선순위를 조율하고 관리하는 구조입니다.",
    whyWrong: [
      "정답: 별도 전담 조직에 인력이 모여 총괄하는 구조는 집중형입니다.",
      "기능형 구조는 일반 현업 부서(마케팅팀, 재무팀 등) 내에서 자체적으로 부분적인 분석을 수행하는 구조입니다.",
      "분산형 구조는 분석 전문 인력이 각 현업 부서에 직접 배치되어 현업과 밀접하게 협업하는 구조입니다.",
      "매트릭스 구조는 프로젝트별 이중 보고 체계를 갖춘 구조입니다."
    ],
    memorizationPoint: "전담 부서에서 전사 분석 일원화 총괄 ➔ 집중형 조직 구조",
    examinerTip: "💡 12회 기출 핵심: 집중형(전담 일원화, 우선순위 조율 용이) vs 기능형(현업 자체 수행, 전사 관점 부족) vs 분산형(현업 배치 협업, 우선순위 갈등 가능) 3대 구조를 비교하세요."
  },
  {
    id: "Q12_20",
    subject: 1,
    chapter: "빅데이터의 이해",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] DIKW 피라미드에서 정보를 개인의 경험, 훈련 및 규칙과 결합하여 '체화된 개인적인 가치 판단이나 예측'을 할 수 있는 상태는?",
    choices: [
      "지식 (Knowledge)",
      "데이터 (Data)",
      "정보 (Information)",
      "지혜 (Wisdom)"
    ],
    answer: 0,
    explanation: "지식(Knowledge)은 정보에 개인의 경험, 규칙, 체계적인 원리가 결합하여 행동의 지침이나 실천적인 의사결정으로 체화된 상태입니다.",
    whyWrong: [
      "정답: 정보가 경험/규칙과 결합하여 행동 지침으로 체화된 상태는 지식(Knowledge)입니다.",
      "데이터는 단순 관측된 순수 수치나 사실입니다.",
      "정보는 데이터를 가공/비교하여 패턴과 의미를 도출한 상태입니다.",
      "지혜는 지식을 바탕으로 미래를 통찰하고 창의적으로 적용하는 최상위 단계입니다."
    ],
    memorizationPoint: "데이터 ➔ 정보(가공/의미) ➔ 지식(경험/체화) ➔ 지혜(통찰)",
    examinerTip: "💡 12회 기출 핵심: DIKW 계층은 1과목의 상징적인 문제로, 사례형 및 정의형으로 항상 1~2문항 출제됩니다."
  },

  // 2과목: 빅데이터 탐색 (21~40)
  {
    id: "Q12_21",
    subject: 2,
    chapter: "데이터 기술통계 및 탐색",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 확률변수의 3차 중심 적률(3rd Central Moment)을 표준화한 통계량으로, 데이터 분포가 정규분포 대비 어느 한쪽으로 치우쳐 있는 비대칭성을 나타내는 지표는?",
    choices: [
      "왜도 (Skewness)",
      "첨도 (Kurtosis)",
      "분산 (Variance)",
      "평균 (Mean)"
    ],
    answer: 0,
    explanation: "1차 적률은 평균(위치), 2차 중심적률은 분산(산포도), 3차 중심적률은 왜도(비대칭도, Skewness), 4차 중심적률은 첨도(뾰족함, Kurtosis)를 나타냅니다.",
    whyWrong: [
      "정답: 3차 적률 기반의 비대칭성 측정 지표는 왜도(Skewness)입니다.",
      "첨도(Kurtosis)는 4차 중심 적률로 분포의 꼬리 두께와 중심의 뾰족함을 측정합니다.",
      "분산(Variance)은 2차 중심 적률로 데이터의 흩어짐을 측정합니다.",
      "평균(Mean)은 1차 원점 적률입니다."
    ],
    memorizationPoint: "1차=평균, 2차=분산, 3차=왜도(비대칭), 4차=첨도(뾰족함)",
    examinerTip: "💡 12회 기출 핵심: 통계학 적률(Moment) 체계에서 3차 적률이 '왜도'라는 수학적 정의가 기출되었습니다."
  },
  {
    id: "Q12_22",
    subject: 2,
    chapter: "표본추출 및 가설검정",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 모집단의 분포 형태(정규, 균등, 비대칭 등)와 무관하게, 표본의 크기($n$)가 충분히 크면($n \\ge 30$) 표본 평균들의 분포가 모평균 $\\mu$, 분산 $\\frac{\\sigma^2}{n}$인 정규분포에 근사한다는 통계학 정리는?",
    choices: [
      "중심극한정리 (Central Limit Theorem)",
      "대수의 법칙 (Law of Large Numbers)",
      "체비쇼프 부등식 (Chebyshev's Inequality)",
      "베이즈 정리 (Bayes' Theorem)"
    ],
    answer: 0,
    explanation: "중심극한정리(CLT)는 모집단의 원래 분포가 무엇이든 간에 표본 크기가 충분히 크면 표본 평균의 표집분포가 정규분포 $N(\\mu, \\sigma^2/n)$에 수렴한다는 정리입니다.",
    whyWrong: [
      "정답: 표본 평균의 분포가 정규분포로 근사한다는 정리는 중심극한정리입니다.",
      "대수의 법칙은 표본 크기가 커질수록 표본 평균이 모평균에 확률적으로 수렴한다는 정리입니다.",
      "체비쇼프 부등식은 임의의 분포에서 평균으로부터 $k$ 표준편차 이내에 속할 확률의 하한을 제시합니다.",
      "베이즈 정리는 사전확률과 우도를 통해 사후확률을 계산하는 정리입니다."
    ],
    memorizationPoint: "모집단 분포 무관 + 표본평균 정규분포 수렴 ➔ 중심극한정리 (CLT)",
    examinerTip: "💡 12회 기출 핵심: '모집단이 정규분포이어야만 성립한다'는 식의 오답 유도 보기를 주의하세요. 모집단 분포와 무관하게 성립합니다!"
  },
  {
    id: "Q12_23",
    subject: 2,
    chapter: "가설검정 및 교차분석",
    sectionId: "s2-2",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 총 200명의 응답자를 대상으로 두 범주형 변수 간의 독립성을 검정하기 위해 카이제곱 검정통계량을 산출하고자 한다. 카이제곱 검정통계량($\\chi^2$)의 올바른 계산 수식은?",
    choices: [
      "$\\sum \\frac{(O_i - E_i)^2}{E_i}$ (관측도수 $O_i$, 기대도수 $E_i$)",
      "$\\sum \\frac{(O_i - E_i)}{E_i^2}$",
      "$\\sum \\frac{(O_i + E_i)^2}{O_i}$",
      "$\\sum \\sqrt{\\frac{(O_i - E_i)^2}{200}}$"
    ],
    answer: 0,
    explanation: "카이제곱 검정통계량은 각 셀의 관측도수($O_i$)와 기대도수($E_i$)의 편차 제곱을 기대도수로 나눈 값들의 총합인 $\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}$로 계산합니다.",
    whyWrong: [
      "정답: 카이제곱 통계량 공식은 $\\sum \\frac{(O_i - E_i)^2}{E_i}$입니다.",
      "분모가 $E_i^2$가 아닙니다.",
      "분자가 합의 제곱이 아니며 분모는 기대도수 $E_i$이어야 합니다.",
      "루트 연산이나 단순 총합 나눗셈이 아닙니다."
    ],
    memorizationPoint: "카이제곱 검정통계량 $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$",
    examinerTip: "💡 12회 기출 핵심: 공식 자체와 분모가 관측도수($O$)가 아닌 '기대도수($E$)'라는 점이 킬러 포인트입니다."
  },
  {
    id: "Q12_24",
    subject: 2,
    chapter: "가설검정 및 분포 적합도",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 수집된 관측 데이터의 표본 분포가 특정한 이론적 확률 분포(예: 포아송 분포, 정규분포 등)를 따르는지 여부를 검증하기 위해 사용하는 검정 기법은?",
    choices: [
      "적합도 검정 (Goodness of Fit Test)",
      "독립성 검정 (Test of Independence)",
      "동질성 검정 (Test of Homogeneity)",
      "분산분석 (ANOVA)"
    ],
    answer: 0,
    explanation: "적합도 검정(Goodness of Fit Test)은 관측도수가 특정한 이론적 확률분포(포아송, 이항, 정규분포 등)에서 예상되는 기대도수와 통계적으로 일치하는지 검정하는 방법입니다.",
    whyWrong: [
      "정답: 데이터가 특정 분포를 따르는지 검증하는 것은 적합도 검정입니다.",
      "독립성 검정은 두 범주형 변수가 서로 독립인지 연관되어 있는지를 검정합니다.",
      "동질성 검정은 여러 모집단 간에 특정 속성의 비율이 동일한지를 검정합니다.",
      "ANOVA는 3개 이상 집단 간의 평균 차이를 비교하는 F-검정입니다."
    ],
    memorizationPoint: "이론적 확률분포(포아송 등) 일치 여부 검정 ➔ 카이제곱 적합도 검정",
    examinerTip: "💡 12회 기출 핵심: 카이제곱 3대 검정(적합도 검정, 독립성 검정, 동질성 검정)의 목적 구분을 확실히 해두세요."
  },
  {
    id: "Q12_25",
    subject: 2,
    chapter: "가설검정 절차",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 통계적 가설 검정을 수행하는 표준적인 5단계 절차를 순서대로 올바르게 나열한 것은?",
    choices: [
      "가설 설정(귀무/대립) → 유의수준($\\alpha$) 설정 → 검정통계량 계산 → 유의확률(p-value) 산출 → 기각 여부 판단 및 결론",
      "검정통계량 계산 → 가설 설정 → 유의수준 설정 → p-value 산출 → 결론",
      "유의수준 설정 → p-value 산출 → 가설 설정 → 검정통계량 계산 → 결론",
      "가설 설정 → p-value 산출 → 유의수준 설정 → 검정통계량 계산 → 결론"
    ],
    answer: 0,
    explanation: "가설 검정의 올바른 절차는: 1단계 가설 설정($H_0, H_1$) ➔ 2단계 유의수준($\\alpha$) 결정 ➔ 3단계 표본 검정통계량 계산 ➔ 4단계 p-value 산출 ➔ 5단계 $p < \\alpha$ 비교 후 기각/채택 결론 도출입니다.",
    whyWrong: [
      "정답: 가설 설정 ➔ 유의수준 ➔ 검정통계량 ➔ p-value ➔ 결론 순서가 정확합니다.",
      "검정통계량을 가설 설정보다 먼저 계산할 수 없습니다.",
      "유의수준보다 가설 설정이 선행되어야 합니다.",
      "검정통계량 계산 없이 p-value를 먼저 산출할 수 없습니다."
    ],
    memorizationPoint: "가설 검정 순서: 가설 ➔ 유의수준 ➔ 통계량 ➔ p-value ➔ 결론",
    examinerTip: "💡 12회 기출 핵심: 통계 분석의 기초 절차를 묻는 문제로, 단계 순서를 뒤섞는 보기를 소거하세요."
  },
  {
    id: "Q12_26",
    subject: 2,
    chapter: "가설검정 오류",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 가설 검정에서 실제로 귀무가설($H_0$)이 참(True)인데도 불구하고 귀무가설을 잘못 기각하는 오류는?",
    choices: [
      "제1종 오류 (Type I Error, $\\alpha$)",
      "제2종 오류 (Type II Error, $\\beta$)",
      "검정력 (Power, $1-\\beta$)",
      "표본 오류 (Sampling Error)"
    ],
    answer: 0,
    explanation: "제1종 오류($\\alpha$, 유의수준)는 '참인 귀무가설을 기각하는 오류(위양성)'이며, 제2종 오류($\\beta$)는 '거짓인 귀무가설을 기각하지 못하고 채택하는 오류(위음성)'입니다.",
    whyWrong: [
      "정답: 참인 귀무가설을 기각하는 오류는 제1종 오류($\\alpha$)입니다.",
      "제2종 오류는 거짓인 귀무가설을 채택하는 오류입니다.",
      "검정력은 거짓인 귀무가설을 올바르게 기각할 확률($1-\\beta$)입니다.",
      "표본 오류는 표본 추출 시 발생하는 통계적 오차입니다."
    ],
    memorizationPoint: "1종 오류($\\alpha$): 참 귀무가설 기각(위양성), 2종 오류($\\beta$): 거짓 귀무가설 채택",
    examinerTip: "💡 12회 기출 핵심: 1종 오류 허용 한계 = 유의수준($\\alpha$), 검정력 = $1 - \\beta$ 수식 관계를 반드시 기억하세요."
  },
  {
    id: "Q12_27",
    subject: 2,
    chapter: "기초 통계학 및 확률변수",
    sectionId: "s2-1",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 서로 독립이고 동일한 분산 $\\sigma^2$을 갖는 두 확률변수 $X_1$과 $X_2$가 있을 때, 결합 확률변수 $Y = X_1 + X_2$의 표준편차는?",
    choices: [
      "$\\sqrt{2}\\sigma$",
      "$2\\sigma$",
      "$\\sigma$",
      "$\\sqrt{\\sigma}$"
    ],
    answer: 0,
    explanation: "두 변수가 독립일 때 합의 분산은 분산의 합입니다: $Var(X_1 + X_2) = Var(X_1) + Var(X_2) = \\sigma^2 + \\sigma^2 = 2\\sigma^2$. 따라서 표준편차는 $SD = \\sqrt{Var} = \\sqrt{2\\sigma^2} = \\sqrt{2}\\sigma$입니다.",
    whyWrong: [
      "정답: 합의 분산 $2\\sigma^2$의 제곱근은 $\\sqrt{2}\\sigma$입니다.",
      "$2\\sigma$는 표준편차를 단순 합산한 오답입니다 (분산이 더해지는 것임).",
      "$\\sigma$는 단일 확률변수의 표준편차입니다.",
      "$\\sqrt{\\sigma}$는 수식 오류입니다."
    ],
    memorizationPoint: "독립 확률변수 합의 표준편차: $Var(X_1+X_2) = 2\\sigma^2 \\Rightarrow SD = \\sqrt{2}\\sigma$",
    examinerTip: "💡 12회 기출 핵심: $Var(aX + bY) = a^2 Var(X) + b^2 Var(Y)$ 독립 분산 덧셈 정리를 이용한 계산 문제입니다."
  },
  {
    id: "Q12_28",
    subject: 2,
    chapter: "선형대수 및 차원축소",
    sectionId: "s2-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 선형대수학의 행렬 분해 기법 중, 행과 열의 크기가 같은 '정방행렬(Square Matrix)'에 대해서만 고유벡터와 고윳값으로 분해가 가능한 기법은?",
    choices: [
      "고윳값 분해 (Eigen Decomposition)",
      "특이값 분해 (SVD, Singular Value Decomposition)",
      "QR 분해 (QR Decomposition)",
      "LU 분해 (LU Decomposition)"
    ],
    answer: 0,
    explanation: "고윳값 분해(Eigen Decomposition)는 정방행렬($n \\times n$)에 대해서만 $A = V \\Lambda V^{-1}$ 형태로 분해할 수 있습니다. 반면 특이값 분해(SVD)는 직사각 행렬($m \\times n$)을 포함한 모든 행렬에 적용 가능합니다.",
    whyWrong: [
      "정답: 정방행렬에 대해서만 고윳값/고유벡터로 분해 가능한 기법은 고윳값 분해입니다.",
      "SVD(특이값 분해)는 $m \\times n$ 직사각 행렬에 대해서도 적용 가능합니다.",
      "QR 분해는 직교행렬과 상삼각행렬로 분해하는 기법입니다.",
      "LU 분해는 하삼각행렬과 상삼각행렬로 분해하는 기법입니다."
    ],
    memorizationPoint: "정방행렬($n \\times n$) 전용 ➔ 고윳값 분해, 직사각 행렬($m \\times n$) 가능 ➔ 특이값 분해(SVD)",
    examinerTip: "💡 12회 기출 핵심: PCA의 기초 수학에서 고윳값 분해(정방행렬 분산-공분산 행렬 대상)와 SVD의 적용 가능 행렬 조건을 묻는 문제입니다."
  },
  {
    id: "Q12_29",
    subject: 2,
    chapter: "기초 통계학 및 확률분포",
    sectionId: "s2-1",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 1부터 6까지의 눈을 가진 공정한 주사위를 1회 던질 때 나오는 눈의 값 $X$는 이산균등분포를 따른다. 이 확률변수 $X$의 분산 $Var(X)$ 값은?",
    choices: [
      "$\\frac{35}{12}$",
      "$\\frac{35}{6}$",
      "$\\frac{7}{2}$",
      "$\\frac{25}{12}$"
    ],
    answer: 0,
    explanation: "1부터 $n$까지의 이산균등분포 분산 공식은 $Var(X) = \\frac{n^2 - 1}{12}$입니다. 주사위($n=6$)의 경우 $Var(X) = \\frac{6^2 - 1}{12} = \\frac{36 - 1}{12} = \\frac{35}{12} \\approx 2.917$입니다.",
    whyWrong: [
      "정답: 주사위 이산균등분포 분산은 $\\frac{6^2-1}{12} = \\frac{35}{12}$입니다.",
      "분모가 6이 아닙니다.",
      "$\\frac{7}{2} = 3.5$는 주사위 눈의 '기댓값(평균)'입니다.",
      "수식 대입 계산 오답입니다."
    ],
    memorizationPoint: "이산균등분포 분산 공식: $Var(X) = \\frac{n^2 - 1}{12}$ (주사위: 35/12)",
    examinerTip: "💡 12회 기출 핵심: 평균 $E(X) = \\frac{n+1}{2} = 3.5$, 분산 $Var(X) = \\frac{n^2-1}{12} = \\frac{35}{12}$ 공식을 암기해두면 5초 만에 풀립니다."
  },
  {
    id: "Q12_30",
    subject: 2,
    chapter: "상관분석",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 두 연속형 변수 간의 상관관계를 측정하는 피어슨(Pearson) 상관계수의 한계점으로 가장 옳은 것은?",
    choices: [
      "두 변수 간의 '선형적(Linear)' 관계만 측정할 수 있으므로, 2차 곡선이나 U자형 등 비선형 관계는 상관계수가 0에 가깝게 나타난다.",
      "서열척도로 측정된 순위 데이터에만 적용할 수 있다.",
      "이상치(Outlier)의 영향을 전혀 받지 않는 로버스트한 지표이다.",
      "상관계수의 값의 범위가 $-\\infty$에서 $+\\infty$까지이다."
    ],
    answer: 0,
    explanation: "피어슨 상관계수($r$)는 두 변수 간의 '직선적(선형)' 관계만을 측정합니다. 완전한 포물선($Y = X^2$)과 같은 명확한 비선형 관계가 존재해도 피어슨 상관계수는 0으로 계산되는 한계가 있습니다.",
    whyWrong: [
      "정답: 피어슨 상관계수는 선형 관계만 측정하며 비선형 관계는 탐지하지 못합니다.",
      "순위 데이터에 적용하는 것은 스피어만(Spearman) 또는 켄달(Kendall) 상관계수입니다.",
      "피어슨 상관계수는 이상치에 매우 민감합니다.",
      "상관계수의 범위는 $-1 \\le r \\le 1$입니다."
    ],
    memorizationPoint: "피어슨 상관계수 ➔ 선형 관계만 측정 (비선형 포물선 관계는 $r \\approx 0$)",
    examinerTip: "💡 12회 기출 핵심: 산점도와 함께 피어슨 상관계수의 맹점(비선형 관계 미반영, 이상치 취약)을 묻는 문제입니다."
  },
  {
    id: "Q12_31",
    subject: 2,
    chapter: "표본추출 방법",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 모집단 목록에서 첫 번째 표본은 무작위(Random)로 추출하고, 그 이후부터는 일정한 간격($k$)을 두고 순차적으로 표본을 추출하는 확률표본추출법은?",
    choices: [
      "계통 추출법 (Systematic Sampling)",
      "단순 무작위 추출법 (Simple Random Sampling)",
      "층화 추출법 (Stratified Sampling)",
      "군집 추출법 (Cluster Sampling)"
    ],
    answer: 0,
    explanation: "계통 추출법(Systematic Sampling, 체계적 추출법)은 모집단을 $N/n = k$ 간격으로 나누어 첫 번째 번호를 $1 \\sim k$ 사이에서 무작위 선택한 뒤 $k$번째마다 연속 추출하는 방법입니다.",
    whyWrong: [
      "정답: 첫 번째 무작위 + 일정 간격 $k$ 순차 추출은 계통 추출법입니다.",
      "단순 무작위 추출은 모든 원소에 동일한 추출 확률을 부여해 무작위로 뽑는 방식입니다.",
      "층화 추출은 동질적인 집단(층)으로 나눈 후 각 층에서 무작위 추출하는 방식입니다.",
      "군집 추출은 이질적인 군집으로 나눈 후 군집 자체를 무작위 추출하는 방식입니다."
    ],
    memorizationPoint: "첫 번째 랜덤 + $k$ 간격 순차 추출 ➔ 계통 추출법 (Systematic)",
    examinerTip: "💡 12회 기출 핵심: 확률표본추출 4대 기법(단순무작위, 층화, 군집, 계통)의 추출 메커니즘을 비교하세요."
  },
  {
    id: "Q12_32",
    subject: 2,
    chapter: "데이터 변환 및 정규화",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 비정규 분포를 따르는 연속형 양수 데이터를 모수 $\\lambda$를 이용해 정규분포에 가깝게 거듭제곱 변환하여, 샤피로-윌크(Shapiro-Wilk) 정규성 검정의 p-value를 유의수준 이상으로 높이고자 할 때 사용하는 데이터 변환법은?",
    choices: [
      "박스-콕스 변환 (Box-Cox Transformation)",
      "Min-Max 정규화",
      "원핫 인코딩 (One-Hot Encoding)",
      "이진화 변환 (Binarization)"
    ],
    answer: 0,
    explanation: "박스-콕스 변환(Box-Cox Transformation)은 모수 $\\lambda$에 따라 $y^{(\\lambda)} = \\frac{y^\\lambda - 1}{\\lambda}$ (단, $\\lambda=0$이면 $\\ln y$) 공식을 적용하여 비정규 데이터의 왜도를 줄이고 정규분포를 따르도록 변환하는 모수적 기법입니다.",
    whyWrong: [
      "정답: 정규성 향상 및 왜도 조정을 위한 거듭제곱 변환은 박스-콕스(Box-Cox) 변환입니다.",
      "Min-Max 정규화는 데이터 범위를 0~1로 스케일링할 뿐 데이터의 분포 모양(정규성)을 바꾸지 못합니다.",
      "원핫 인코딩은 범주형 변수를 0과 1의 희소 벡터로 변환하는 기법입니다.",
      "이진화 변환은 특정 임계값을 기준으로 0과 1로 나누는 기법입니다."
    ],
    memorizationPoint: "비정규 데이터 정규성 향상 + $\\lambda$ 변환 ➔ 박스-콕스(Box-Cox) 변환",
    examinerTip: "💡 12회 기출 핵심: 정규성 검정 p-value 증가 유도 및 선형회귀 등분산성/정규성 가정 충족을 위한 대표 변환 기법입니다."
  },
  {
    id: "Q12_33",
    subject: 2,
    chapter: "비모수 검정",
    sectionId: "s2-2",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 두 독립된 표본 집단 간의 중심 위치(중앙값) 차이를 비교할 때, 모집단의 정규성 가정을 만족하지 못하여 데이터의 순위(Rank) 합을 이용하는 비모수 검정 기법은?",
    choices: [
      "맨-휘트니 U 검정 (Mann-Whitney U Test / Wilcoxon Rank-Sum)",
      "독립표본 t-검정 (Independent Two-Sample t-test)",
      "대응표본 t-검정 (Paired t-test)",
      "카이제곱 적합도 검정"
    ],
    answer: 0,
    explanation: "독립된 두 표본의 정규성이 결여되었을 때 사용하는 비모수 검정법은 '맨-휘트니 U 검정(윌콕슨 순위합 검정)'입니다. 데이터를 크기순으로 나열하여 순위의 합을 비교합니다.",
    whyWrong: [
      "정답: 독립 2집단 비모수 순위합 검정은 맨-휘트니 U 검정입니다.",
      "독립표본 t-검정은 정규성을 만족할 때 사용하는 모수 검정입니다.",
      "대응표본 t-검정은 동일 집단의 전/후 차이를 비교하는 모수 검정입니다.",
      "카이제곱 적합도 검정은 범주형 데이터의 분포 적합성을 검정합니다."
    ],
    memorizationPoint: "독립 2표본 모수 ➔ 독립 t-검정, 비모수(순위합) ➔ 맨-휘트니 U 검정",
    examinerTip: "💡 12회 기출 핵심: 모수 검정(t-검정, ANOVA)과 비모수 검정(맨-휘트니 U, 윌콕슨 부호순위, 크루스칼-왈리스) 1:1 매칭을 완벽히 암기하세요."
  },
  {
    id: "Q12_34",
    subject: 2,
    chapter: "가설검정 기법",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 다이어트 약 복용 전후의 체중 변화, 신제품 교육 전후의 업무 만족도처럼 '동일한 하나의 집단'을 대상으로 사전 관측값과 사후 관측값의 평균 차이를 비교하는 검정은?",
    choices: [
      "대응표본 t-검정 (Paired t-test)",
      "독립표본 t-검정 (Independent Two-Sample t-test)",
      "단일표본 t-검정 (One-Sample t-test)",
      "일원배치 분산분석 (One-way ANOVA)"
    ],
    answer: 0,
    explanation: "동일한 표본 개체에 대해 처리 전(Pre)과 처리 후(Post)의 짝지어진(Paired) 측정값 간 차이(Diff)가 0인지 검정하는 기법은 '대응표본 t-검정'입니다.",
    whyWrong: [
      "정답: 동일 집단의 처리 전/후 짝지은 비교는 대응표본 t-검정(Paired t-test)입니다.",
      "독립표본 t-검정은 남학생 그룹과 여학생 그룹처럼 서로 완전히 독립된 두 집단을 비교합니다.",
      "단일표본 t-검정은 한 표본의 평균이 특정 상수(모평균)와 같은지 검정합니다.",
      "일원배치 분산분석은 3개 이상 독립 집단의 평균을 비교합니다."
    ],
    memorizationPoint: "동일 집단 전/후(Pre/Post) 짝지은 비교 ➔ 대응표본 t-검정 (Paired)",
    examinerTip: "💡 12회 기출 핵심: 12회 시험에서 대응표본 t-검정의 적용 상황을 묻는 문제가 핵심 개념으로 복수 출제되었습니다."
  },
  {
    id: "Q12_35",
    subject: 2,
    chapter: "표본분포 및 추정",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 모집단의 분산($\\sigma^2$)을 알지 못하고 표본의 크기가 소표본($n < 30$)인 경우, 표본표준편차($s$)를 이용하여 모평균을 추정하거나 가설을 검정할 때 사용하는 확률분포는?",
    choices: [
      "t-분포 (Student's t-Distribution)",
      "표준정규분포 (Z-Distribution)",
      "F-분포",
      "카이제곱 분포"
    ],
    answer: 0,
    explanation: "모분산 $\\sigma^2$을 모를 때 표본분산 $s^2$을 대입하여 $T = \\frac{\\bar{X} - \\mu}{s / \\sqrt{n}}$ 통계량을 만들면 자유도가 $n-1$인 t-분포를 따릅니다.",
    whyWrong: [
      "정답: 모분산 미지 소표본 모평균 추정은 t-분포를 사용합니다.",
      "표준정규분포는 모분산 $\\sigma^2$을 알고 있거나 대표본($n \\ge 30$)일 때 사용합니다.",
      "F-분포는 두 집단의 분산 비율을 검정할 때 사용합니다.",
      "카이제곱 분포는 모분산 자체를 검정하거나 독립성 검정에 사용합니다."
    ],
    memorizationPoint: "모분산 모름 + 소표본 모평균 검정 ➔ t-분포 (자유도 $n-1$)",
    examinerTip: "💡 12회 기출 핵심: t-분포는 자유도가 커질수록 표준정규분포에 수렴하며, 좌우 대칭인 종 모양이지만 정규분포보다 꼬리가 두껍습니다."
  },
  {
    id: "Q12_36",
    subject: 2,
    chapter: "차원축소 (PCA)",
    sectionId: "s2-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 주성분 분석(PCA)에서 원래 변수들의 분산-공분산 행렬을 분해하여 서로 상관관계가 없는 새로운 주성분 축들을 도출할 때 만족해야 하는 특성은?",
    choices: [
      "각 주성분 축들은 서로 직교(Orthogonal)하며, 제1주성분이 데이터의 분산을 가장 크게 보존한다.",
      "모든 주성분 간의 피어슨 상관계수는 1이다.",
      "주성분의 개수는 원래 변수의 개수보다 항상 많아야 한다.",
      "데이터의 비선형적인 곡선 매니폴드 구조를 왜곡 없이 보존한다."
    ],
    answer: 0,
    explanation: "PCA는 데이터의 분산을 최대화하는 방향으로 서로 직교(Orthogonal)하는 고유벡터 축을 순차적으로 찾습니다. 따라서 도출된 주성분들 간의 상관계수는 0(무상관)입니다.",
    whyWrong: [
      "정답: 주성분 축들은 서로 직교하며 제1주성분이 최대 분산을 설명합니다.",
      "주성분들 간의 상관계수는 직교하므로 0(무상관)입니다.",
      "주성분의 개수는 원래 변수 개수 $p$ 이하입니다.",
      "PCA는 선형 차원축소 기법으로 비선형 매니폴드 구조 파악에는 한계가 있습니다."
    ],
    memorizationPoint: "PCA ➔ 분산 최대화 + 서로 직교(Orthogonal) + 주성분 간 상관계수 0",
    examinerTip: "💡 12회 기출 핵심: PCA에서 주성분 간 상관성이 없다는 점과 누적 분산 설명력(보통 70~85% 이상) 기준을 숙지하세요."
  },
  {
    id: "Q12_37",
    subject: 2,
    chapter: "기술통계 및 이상치",
    sectionId: "s2-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 데이터셋에 극단적인 이상치(Outlier)가 포함되어 있을 때 산술평균과 절사평균(Trimmed Mean)의 특성 비교로 가장 옳은 것은?",
    choices: [
      "산술평균은 이상치에 크게 왜곡되지만, 절사평균은 양 극단의 일정 비율을 제거하고 계산하므로 이상치에 둔감(로버스트)하다.",
      "절사평균이 산술평균보다 이상치의 영향을 훨씬 더 크게 받는다.",
      "이상치가 존재해도 산술평균과 중앙값은 항상 일치한다.",
      "절사평균은 데이터의 최빈값(Mode)만을 평균 낸 값이다."
    ],
    answer: 0,
    explanation: "산술평균은 모든 관측치를 합산하므로 극단값(이상치)에 매우 민감합니다. 반면 절사평균은 상위/하위 일정 비율(예: 5%~10%)의 극단값을 잘라내고 계산하므로 이상치에 강건(Robust)합니다.",
    whyWrong: [
      "정답: 산술평균은 이상치에 민감하고, 절사평균은 이상치에 로버스트합니다.",
      "절사평균은 이상치 영향을 줄이기 위해 고안된 대표값입니다.",
      "이상치가 존재하면 평균과 중앙값은 크게 벌어집니다(왜도 발생).",
      "절사평균은 상하한 극단값을 제외한 산술평균입니다."
    ],
    memorizationPoint: "이상치 민감 ➔ 산술평균, 이상치 강건(Robust) ➔ 중앙값, 절사평균",
    examinerTip: "💡 12회 기출 핵심: 이상치에 민감한 척도(산술평균, 분산, 범위) vs 강건한 척도(중앙값, 사분위범위 IQR, 절사평균)의 대조가 출제되었습니다."
  },
  {
    id: "Q12_38",
    subject: 2,
    chapter: "거리 및 유사도 측정",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 수치형 데이터가 아닌 명목형(범주형) 변수들 간의 유사도를 측정하기 위해 두 집합의 교집합 크기를 합집합 크기로 나누어 계산하는 유사도 지수는?",
    choices: [
      "자카드 계수 (Jaccard Similarity)",
      "유클리디안 거리 (Euclidean Distance)",
      "마할라노비스 거리 (Mahalanobis Distance)",
      "맨하탄 거리 (Manhattan Distance)"
    ],
    answer: 0,
    explanation: "자카드 계수(Jaccard Index)는 $J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$로 정의되며, 이진형/범주형 데이터 집합 간의 유사도를 측정하는 대표적인 지표입니다. 자카드 거리는 $1 - J(A, B)$입니다.",
    whyWrong: [
      "정답: 집합의 교집합/합집합 기반 범주형 유사도는 자카드 계수입니다.",
      "유클리디안 거리는 연속형 수치 데이터의 최단 직선 거리 공식입니다.",
      "마할라노비스 거리는 변수 간 공분산(상관관계)을 고려한 통계적 거리입니다.",
      "맨하탄 거리는 각 좌표축 방향 이동 거리의 절대값 합(L1 거리)입니다."
    ],
    memorizationPoint: "범주형/집합 유사도 ➔ 자카드 계수 $\\frac{|A \\cap B|}{|A \\cup B|}$",
    examinerTip: "💡 12회 기출 핵심: 연속형 거리(유클리디안, 맨하탄, 마할라노비스, 민코프스키) vs 범주형 유사도(자카드, 코사인, 해밍거리) 분류를 숙지하세요."
  },
  {
    id: "Q12_39",
    subject: 2,
    chapter: "차원축소 이론",
    sectionId: "s2-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 고차원의 데이터셋을 저차원 공간으로 압축하는 차원 축소(Dimensionality Reduction)를 수행할 때 발생하는 현상으로 가장 옳은 것은?",
    choices: [
      "데이터의 노이즈(Noise)와 연산 복잡도는 줄어들지만, 필연적으로 일정 부분의 정보 손실(Information Loss)이 발생한다.",
      "차원을 축소하면 어떠한 정보 손실도 없이 원본 데이터를 100% 완벽하게 복원할 수 있다.",
      "차원을 축소하면 차원의 저주 현상이 더욱 심화된다.",
      "변수 간의 다중공선성이 무조건 증가한다."
    ],
    answer: 0,
    explanation: "차원 축소는 모델의 과적합을 방지하고 계산 효율성을 높이며 노이즈를 제거하지만, 저차원으로 투영되는 과정에서 일부 정보의 손실(Loss of Information)이 불가피하게 발생합니다.",
    whyWrong: [
      "정답: 노이즈 감소와 계산 효율성이 개선되나 일정 부분 정보 손실이 발생합니다.",
      "정보 손실 없는 완벽한 원본 복원은 불가능합니다.",
      "차원 축소는 차원의 저주를 완화하기 위해 수행합니다.",
      "차원 축소는 다중공선성을 제거하거나 완화합니다."
    ],
    memorizationPoint: "차원 축소 효과 ➔ 노이즈 감소, 과적합 방지, 불가피한 정보 손실 발생",
    examinerTip: "💡 12회 기출 핵심: 차원 축소의 장점(시각화 용이, 과적합 완화)과 한계(정보 손실, 해석력 저하)를 묻는 기본 개념 문제입니다."
  },
  {
    id: "Q12_40",
    subject: 2,
    chapter: "데이터 결측치 처리",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 고소득자가 본인의 소득 질문에 응답을 거부하여 결측이 발생하는 것처럼, 결측값의 발생 여부가 결측된 변수 자체의 값과 직접적으로 관련되어 있어 단순 삭제 시 심각한 편향이 발생하는 메커니즘은?",
    choices: [
      "비무작위 결측 (MNAR, Missing Not At Random)",
      "완전 무작위 결측 (MCAR, Missing Completely At Random)",
      "무작위 결측 (MAR, Missing At Random)",
      "조건부 결측 (Conditional Missing)"
    ],
    answer: 0,
    explanation: "MNAR(비무작위 결측)은 결측의 원인이 결측된 변수 자체의 미관측 값과 직접 관련이 있는 경우입니다. 단순 삭제 시 표본의 편향(Bias)이 매우 심해지므로 모델 기반 대치가 필요합니다.",
    whyWrong: [
      "정답: 결측 변수 자체의 값에 의해 누락이 발생하는 것은 비무작위 결측(MNAR)입니다.",
      "MCAR은 결측 발생이 어떤 다른 변수나 값과도 무관하게 완전 무작위로 발생한 경우입니다.",
      "MAR은 결측 발생이 다른 관측된 변수와 관련이 있으나 결측 변수 자체와는 무관한 경우입니다.",
      "조건부 결측은 표준 용어가 아닙니다."
    ],
    memorizationPoint: "소득 미응답(자체 값 영향) ➔ 비무작위 결측 (MNAR, Missing Not At Random)",
    examinerTip: "💡 12회 기출 핵심: 결측치 3대 메커니즘(MCAR: 완전무작위/삭제가능, MAR: 타변수관련, MNAR: 자체관련/삭제위험)은 매회 출제됩니다."
  }
];

console.log("Q12 1, 2과목 40문제 정의 완료.");

module.exports = { q12_list };
