const fs = require('fs');
const path = require('path');

const cbtPath = path.join(__dirname, '..', 'cbt_bank.json');
const cbtData = JSON.parse(fs.readFileSync(cbtPath, 'utf8'));

const new12thQuestions = [
  // ========================================================
  // 1과목: 빅데이터 분석 기획 (Q_PASS_449 ~ Q_PASS_456)
  // ========================================================
  {
    id: "Q_PASS_449",
    subject: 1,
    chapter: "데이터 수집 및 전환",
    question: "[12회 기출복원] 웹 데이터 수집 기술에 관한 설명으로 가장 올바르지 않은 것은?",
    choices: [
      "BeautifulSoup은 HTML 문서의 DOM 트리를 파싱하여 특정 태그나 CSS 셀렉터 기반으로 데이터를 빠르게 추출하는 데 적합하다.",
      "Selenium은 실제 웹 브라우저 엔진(WebDriver)을 제어하므로 자바스크립트에 의해 비동기적으로 렌더링되는 동적 웹페이지 수집이 가능하다.",
      "정적 웹페이지 수집 시에는 브라우저 렌더링 오버헤드가 없는 HTTP 요청 라이브러리(Requests)와 HTML 파서(BeautifulSoup/lxml) 조합이 가장 빠르다.",
      "BeautifulSoup 자체에 브라우저 자바스크립트 엔진이 내장되어 있어 AJAX 비동기 호출 결과를 자동으로 렌더링하여 파싱한다."
    ],
    answer: 3,
    difficulty: "medium",
    cardId: "c1-2-1",
    explanation: "BeautifulSoup은 단순히 전달받은 HTML/XML 문자열을 파싱하는 라이브러리일 뿐, 자바스크립트 실행 엔진이 내장되어 있지 않습니다. 따라서 자바스크립트로 동적 생성되는 AJAX 데이터는 Selenium, Playwright 등을 이용하거나 백엔드 API를 직접 호출해야 합니다.",
    memorizationPoint: "BeautifulSoup은 단순 HTML 파서(JS 실행불가) vs Selenium/Playwright는 브라우저 기반 동적 렌더링 지원",
    examinerTip: "뷰티풀수프(BeautifulSoup)는 정적 파서이므로 자바스크립트 비동기 렌더링(SPA, React, AJAX)을 단독으로 처리할 수 없다는 점이 핵심 출제 함정입니다.",
    whyWrong: [
      "올바른 설명: BeautifulSoup은 파이썬의 대표적인 DOM 트리 기반 정적 HTML/XML 파서입니다.",
      "올바른 설명: Selenium은 웹드라이버를 통해 실제 브라우저를 구동하므로 동적 렌더링 수집이 가능합니다.",
      "올바른 설명: 정적 웹페이지는 Requests + BeautifulSoup 조합이 오버헤드가 없어 속도가 가장 빠릅니다.",
      "정답(오류): BeautifulSoup에는 JS 렌더링 엔진이 없습니다."
    ]
  },
  {
    id: "Q_PASS_450",
    subject: 1,
    chapter: "데이터 수집 및 전환",
    question: "[12회 기출복원] 웹 데이터 파싱(Parsing) 시 특정 데이터 패턴 및 요소를 추출하는 기법에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "정규표현식(Regular Expression)은 계층적인 XML/HTML의 중첩 태그 구조를 완벽하게 파싱하는 데 가장 권장되는 표준 도구이다.",
      "XPath(XML Path Language)는 슬래시(/)와 축(Axis), 조건식([ ])을 활용하여 XML 및 HTML 문서의 특정 노드 위치를 경로 형태로 정확하게 탐색한다.",
      "CSS Selector는 XML 문서 전용으로 설계되었으며, 웹 브라우저의 HTML DOM 탐색에는 사용할 수 없다.",
      "DOM(Document Object Model) 파서는 문서를 메모리에 로드하지 않고 한 줄씩 스트림 형태로 읽어 처리하므로 메모리 사용량이 극히 적다."
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c1-2-1",
    explanation: "XPath는 W3C 표준으로 XML/HTML 문서의 노드 트리를 경로(Path) 표현식으로 탐색하는 강력한 문법입니다. 정규표현식은 불규칙하게 중첩된 HTML 파싱에는 취약하며, CSS Selector는 HTML 스타일링 및 DOM 탐색에 널리 사용됩니다. DOM 파서는 문서 전체를 메모리에 트리 구조로 적재하므로 메모리 사용량이 큽니다.",
    memorizationPoint: "XPath: 노드 경로 기반 탐색 / CSS Selector: 클래스/ID 기반 탐색 / DOM: 메모리에 트리 적재",
    examinerTip: "DOM 파서는 문서 전체를 메모리에 트리 구조로 올리므로 대용량 파일에서는 메모리 부담이 큽니다. 반대로 한 줄씩 읽는 것은 SAX(Simple API for XML) 파서입니다.",
    whyWrong: [
      "오답: 중첩된 HTML 구조는 정규표현식보다 DOM 파서나 XPath 사용이 권장됩니다.",
      "정답: XPath는 노드 경로와 조건을 이용해 특정 요소를 정밀하게 지정할 수 있습니다.",
      "오답: CSS Selector는 웹 프론트엔드 및 HTML 크롤링에서 가장 널리 쓰입니다.",
      "오답: DOM은 문서 전체를 메모리에 트리로 올립니다. 스트림 처리는 SAX 파서입니다."
    ]
  },
  {
    id: "Q_PASS_451",
    subject: 1,
    chapter: "데이터 수집 및 전환",
    question: "[12회 기출복원] 웹 크롤러(Web Crawler) 및 스크래퍼 운영 시 고려해야 할 윤리적·기술적 표준으로 가장 올바른 것은?",
    choices: [
      "Robots.txt 파일에 명시된 'Disallow: /' 지침은 법적 구속력을 지닌 강제 조항이므로 위반 시 자동으로 IP가 전 세계 차단된다.",
      "타겟 웹 서버의 과부하(DOS)를 방지하기 위해 요청 사이에 지연 시간(Time Delay / Sleep)을 부여하고, 동시 요청 수를 제어해야 한다.",
      "웹 스크래핑을 수행할 때는 서버 로그에 흔적을 남기지 않기 위해 User-Agent 헤더를 빈칸으로 전송하는 것이 표준 권장사항이다.",
      "로그인이 필요한 비공개 개인정보 페이지라도 브라우저 쿠키를 이용해 수집하면 저작권 및 개인정보보호법에 일체 저촉되지 않는다."
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c1-2-1",
    explanation: "웹 스크래핑 시 서버 부하를 방지하기 위해 요청 간 딜레이(예: time.sleep)와 동시 커넥션 제한을 두는 것이 필수적입니다. Robots.txt는 권고 규약(Robots Exclusion Protocol)이며, User-Agent는 크롤러의 신원을 명시하는 것이 예의입니다.",
    memorizationPoint: "크롤러 매너: 요청 간 딜레이(Sleep) 설정, 명확한 User-Agent 헤더 전송, Robots.txt 준수",
    examinerTip: "User-Agent를 비우거나 임의로 조작하는 것은 차단 사유가 될 수 있으며, 서버 부하 제어(Time delay)가 안정적 수집의 핵심입니다.",
    whyWrong: [
      "오답: Robots.txt는 자율적 준수 규약(권고)이며 기술적 자동 차단과는 다릅니다.",
      "정답: 타겟 서버의 과부하를 막기 위해 지연 시간 설정과 세션 관리가 필수적입니다.",
      "오답: 명확한 User-Agent를 명시하는 것이 표준 크롤러 에티켓입니다.",
      "오답: 비공개 개인정보 무단 수집은 개인정보보호법 및 정보통신망법 위반입니다."
    ]
  },
  {
    id: "Q_PASS_452",
    subject: 1,
    chapter: "빅데이터 기술 및 아키텍처",
    question: "[12회 기출복원] 맵리듀스(MapReduce) 프레임워크에서 대용량 테이블과 소용량 참조 테이블을 조인할 때, 네트워크 셔플(Shuffle) 비용을 제거하기 위해 분산 캐시(Distributed Cache)를 활용하는 조인 방식은?",
    choices: [
      "리듀스 사이드 조인 (Reduce-side Join)",
      "맵 사이드 조인 (Map-side Join)",
      "정렬-병합 조인 (Sort-Merge Join)",
      "해시 조인 (Hash Partition Join)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c1-3-1",
    explanation: "맵 사이드 조인(Map-side Join)은 작은 크기의 테이블을 분산 캐시(Distributed Cache)를 통해 모든 매퍼(Mapper) 노드 메모리에 미리 배포한 후, 맵 단계에서 즉시 조인을 수행하여 네트워크 셔플(Shuffle)과 리듀스 단계를 생략하는 고성능 조인 기법입니다.",
    memorizationPoint: "소용량 테이블 분산 캐시 로드 + 셔플 비용 0 = 맵 사이드 조인(Map-side Join)",
    examinerTip: "일반적인 조인은 리듀스 단계에서 셔플을 거치므로 병목이 발생합니다. 작은 테이블을 메모리에 올리는 브로드캐스트/맵 사이드 조인이 최적화 1순위입니다.",
    whyWrong: [
      "오답: 리듀스 사이드 조인은 모든 데이터를 셔플하여 리듀서에서 조인하므로 네트워크 비용이 큽니다.",
      "정답: 맵 사이드 조인은 분산 캐시로 작은 테이블을 매퍼에 전달하여 셔플 없이 조인합니다.",
      "오답: 정렬-병합 조인은 데이터가 정렬되어 있을 때 순차 병합하는 일반적 조인 방식입니다.",
      "오답: 해시 조인은 해시 테이블을 빌드하여 매칭하는 일반 알고리즘입니다."
    ]
  },
  {
    id: "Q_PASS_453",
    subject: 1,
    chapter: "빅데이터 기술 및 아키텍처",
    question: "[12회 기출복원] NoSQL 데이터베이스 유형 중 MongoDB와 같이 JSON 형태의 구조화된 문서를 저장하며, 복잡한 계층 구조를 자연스럽게 표현할 수 있는 데이터베이스 유형은?",
    choices: [
      "Key-Value Store (키-값 저장소)",
      "Document Store (문서 지향 저장소)",
      "Column Family Store (열 지향 저장소)",
      "Graph Database (그래프 데이터베이스)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c1-3-2",
    explanation: "MongoDB, CouchDB 등은 Document Store(문서 지향 저장소)로, BSON/JSON 포맷의 문서를 기본 단위로 저장하여 유연한 스키마와 계층적 중첩 데이터를 지원합니다.",
    memorizationPoint: "Document Store: MongoDB, CouchDB (BSON/JSON 문서 단위 저장, 스키마리스)",
    examinerTip: "NoSQL 4대 분류: Key-Value(Redis), Document(MongoDB), Column-Family(Cassandra, HBase), Graph(Neo4j) 매핑은 단골 문제입니다.",
    whyWrong: [
      "오답: Key-Value Store는 Redis, Memcached 등으로 단순 키-값 매핑 구조입니다.",
      "정답: Document Store는 MongoDB처럼 JSON/BSON 문서를 저장합니다.",
      "오답: Column Family Store는 HBase, Cassandra 등으로 대규모 열 기반 집계에 특화되어 있습니다.",
      "오답: Graph Database는 Neo4j 등으로 노드와 엣지(관계) 저장에 특화되어 있습니다."
    ]
  },
  {
    id: "Q_PASS_454",
    subject: 1,
    chapter: "데이터 거버넌스 및 비식별화",
    question: "[12회 기출복원] 개인정보 비식별화 프라이버시 보호 모델 중, 동질 집합 내 민감 속성의 분포가 전체 데이터셋의 민감 속성 분포와 유사하도록 제어하여 '왜곡 공격' 및 '쏠림 공격'을 방어하는 기법은?",
    choices: [
      "k-익명성 (k-Anonymity)",
      "l-다양성 (l-Diversity)",
      "t-근접성 (t-Closeness)",
      "차분 프라이버시 (Differential Privacy)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c1-4-2",
    explanation: "t-근접성(t-Closeness)은 동질 집합 내 민감 정보의 확률 분포와 전체 모집단의 민감 정보 확률 분포 간의 거리(Distance)가 t 이하가 되도록 제한하여 쏠림 공격 및 유사성 공격을 완벽히 차단하는 모델입니다.",
    memorizationPoint: "k-익명성(k개 동일레코드) ➔ l-다양성(l개 다양한 민감값) ➔ t-근접성(전체 분포와 거리 t 이하)",
    examinerTip: "l-다양성은 다양한 값만 있으면 되므로 민감값 분포가 전체와 다를 때 발생하는 정보 누출(쏠림/유사성 공격)에 취약합니다. 이를 해결한 것이 t-근접성입니다.",
    whyWrong: [
      "오답: k-익명성은 동일한 준식별자 레코드가 최소 k개 이상 존재하도록 보장합니다.",
      "오답: l-다양성은 동질 집합 내 서로 다른 민감 속성이 l개 이상 존재하도록 보장합니다.",
      "정답: t-근접성은 민감 속성의 확률 분포 차이를 t 이하로 유지합니다.",
      "오답: 차분 프라이버시는 데이터셋에 잡음(Noise)을 추가하여 특정 개인의 포함 여부를 숨깁니다."
    ]
  },
  {
    id: "Q_PASS_455",
    subject: 1,
    chapter: "데이터 수집 및 전환",
    question: "[12회 기출복원] 빅데이터 수집 프레임워크인 아파치 플룸(Apache Flume)의 3대 핵심 구성요소에 해당하지 않는 것은?",
    choices: [
      "Source (소스)",
      "Channel (채널)",
      "Sink (싱크)",
      "Mapper (매퍼)"
    ],
    answer: 3,
    difficulty: "easy",
    cardId: "c1-2-1",
    explanation: "Apache Flume의 에이전트는 이벤트를 외부에서 유입받는 Source, 버퍼 역할을 하는 Channel, 최종 저장소(HDFS, Kafka 등)로 전달하는 Sink의 3대 요소로 구성됩니다. Mapper는 맵리듀스(MapReduce)의 구성요소입니다.",
    memorizationPoint: "Flume 3대 요소: Source(수집) ➔ Channel(버퍼/큐) ➔ Sink(저장소 전달)",
    examinerTip: "Flume의 Source-Channel-Sink 파이프라인 구조와 Chukwa의 Agent-Collector-HDFS 구조를 명확히 구분해야 합니다.",
    whyWrong: [
      "오답: Source는 로그 등 이벤트를 외부에서 받아 채널로 전달하는 요소입니다.",
      "오답: Channel은 소스와 싱크 사이의 완충 메모리/파일 큐입니다.",
      "오답: Sink는 채널에서 데이터를 꺼내 HDFS나 HBase 등으로 보내는 요소입니다.",
      "정답: Mapper는 맵리듀스 연산 컴포넌트입니다."
    ]
  },
  {
    id: "Q_PASS_456",
    subject: 1,
    chapter: "빅데이터 분석 기획",
    question: "[12회 기출복원] 분석 과제 우선순위 평가 시 적용하는 4분면(Quadrant) 매핑에서 '전략적 중요도(시급성)가 높고, 실행 난이도(난이도)가 쉬운 과제'가 위치하는 영역으로 가장 우선적으로 추진해야 하는 사분면은?",
    choices: [
      "제1사분면 (전략적 중요도 높음 / 난이도 높음)",
      "제2사분면 (전략적 중요도 낮음 / 난이도 높음)",
      "제3사분면 (전략적 중요도 높음 / 난이도 낮음)",
      "제4사분면 (전략적 중요도 낮음 / 난이도 낮음)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c1-1-2",
    explanation: "분석 과제 우선순위 매트릭스에서 시급성(전략적 중요도)이 높고 난이도가 낮은 과제는 최우선 과제(Quick-Win)로 분류되어 가장 먼저 추진됩니다.",
    memorizationPoint: "우선순위 1순위: 시급성 높음(전략적 중요) + 난이도 낮음(실행 쉬움) = Quick-Win",
    examinerTip: "시급성과 난이도 4분면에서 가장 먼저 추진하는 것은 '시급성 높고 난이도 낮은 과제'이며, 가장 후순위는 '시급성 낮고 난이도 높은 과제'입니다.",
    whyWrong: [
      "오답: 난이도가 높은 과제는 중장기 과제로 추진됩니다.",
      "오답: 중요도가 낮고 난이도가 높은 과제는 최후순위(배제 대상)입니다.",
      "정답: 중요도가 높고 실행 난이도가 낮은 과제가 1순위(Quick-Win) 추진 대상입니다.",
      "오답: 중요도가 낮고 난이도가 낮은 과제는 3순위 과제입니다."
    ]
  },

  // ========================================================
  // 2과목: 빅데이터 탐색 (Q_PASS_457 ~ Q_PASS_466)
  // ========================================================
  {
    id: "Q_PASS_457",
    subject: 2,
    chapter: "통계적 가설검정",
    question: "[12회 기출복원] 동일한 20명의 환자를 대상으로 새로운 혈압 강하제를 투여하기 전(Pre)과 투여한 후(Post)의 수축기 혈압 차이를 검정하고자 한다. 이때 가장 적절한 통계 분석 기법은?",
    choices: [
      "독립표본 t-검정 (Independent Two-Sample t-test)",
      "대응표본 t-검정 (Paired Samples t-test)",
      "일원배치 분산분석 (One-Way ANOVA)",
      "카이제곱 적합도 검정 (Chi-Square Goodness-of-fit)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c2-22",
    explanation: "동일한 대상(동일 표본)에 대해 처치 전과 처치 후를 1:1로 짝지어(Paired) 그 차이값(Difference = Post - Pre)의 평균이 0인지를 검정하는 기법은 대응표본 t-검정(Paired t-test)입니다.",
    memorizationPoint: "동일 대상 사전/사후 1:1 매칭 비교 ➔ 대응표본 t-검정 (Paired t-test)",
    examinerTip: "독립표본 t-검정은 'A반과 B반'처럼 서로 다른 두 집단을 비교하는 것이고, 대응표본 t-검정은 'A반 학생들의 시험 전과 후'처럼 동일 표본의 짝지은 차이를 비교합니다.",
    whyWrong: [
      "오답: 독립표본 t-검정은 서로 독립인 두 별개의 집단 평균을 비교할 때 사용합니다.",
      "정답: 동일 대상의 사전-사후 처치 효과 비교는 대응표본 t-검정입니다.",
      "오답: 일원배치 분산분석은 3개 이상 독립 집단의 평균을 비교할 때 사용합니다.",
      "오답: 카이제곱 검정은 범주형 빈도 데이터를 분석할 때 사용합니다."
    ]
  },
  {
    id: "Q_PASS_458",
    subject: 2,
    chapter: "통계적 가설검정",
    question: "[12회 기출복원] 정규성 가정을 만족하지 못하는 두 독립된 집단(A그룹과 B그룹)의 위치(중앙값) 차이를 비교 검정할 때 사용하는 대표적인 비모수 검정 기법은?",
    choices: [
      "윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank Test)",
      "맨-휘트니 U 검정 (Mann-Whitney U Test / Wilcoxon Rank-Sum Test)",
      "크루스칼-왈리스 검정 (Kruskal-Wallis Test)",
      "프리드만 검정 (Friedman Test)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c2-22",
    explanation: "독립된 두 표본의 정규성이 결여되었을 때 사용하는 비모수 검정은 맨-휘트니 U 검정(Mann-Whitney U Test, 윌콕슨 순위합 검정과 동일)입니다. 윌콕슨 부호순위 검정은 대응표본 비모수 검정입니다.",
    memorizationPoint: "독립 2표본 비모수 = 맨-휘트니 U 검정 / 대응 2표본 비모수 = 윌콕슨 부호순위 검정",
    examinerTip: "모수(독립 t-검정) ➔ 비모수(맨-휘트니 U), 모수(대응 t-검정) ➔ 비모수(윌콕슨 부호순위), 모수(ANOVA) ➔ 비모수(크루스칼-왈리스) 매핑을 완벽히 암기하세요!",
    whyWrong: [
      "오답: 윌콕슨 부호순위 검정은 대응 2표본(Paired) 비모수 검정입니다.",
      "정답: 독립 2표본의 비모수 검정은 맨-휘트니 U 검정입니다.",
      "오답: 크루스칼-왈리스 검정은 3개 이상 독립 집단의 비모수 검정(ANOVA의 비모수 버전)입니다.",
      "오답: 프리드만 검정은 3개 이상 반복측정 집단의 비모수 검정입니다."
    ]
  },
  {
    id: "Q_PASS_459",
    subject: 2,
    chapter: "통계적 가설검정",
    question: "[12회 기출복원] 2×2 분할표에서 카이제곱 독립성 검정을 수행하고자 한다. 관측빈도(O)와 기대빈도(E)를 이용한 카이제곱 통계량(χ²) 계산 공식과 자유도(df)로 가장 올바른 것은?",
    choices: [
      "χ² = Σ [ (O - E)² / E ] , 자유도 = 1",
      "χ² = Σ [ (O - E) / E² ] , 자유도 = 2",
      "χ² = Σ [ (O - E)² / O ] , 자유도 = 4",
      "χ² = Σ [ (O - E)² / E ] , 자유도 = 3"
    ],
    answer: 0,
    difficulty: "medium",
    cardId: "c2-22",
    explanation: "카이제곱 통계량은 χ² = Σ [ (관측빈도 - 기대빈도)² / 기대빈도 ] 이며, r×c 분할표의 자유도는 (r - 1)(c - 1)입니다. 2×2 분할표의 자유도는 (2 - 1)×(2 - 1) = 1×1 = 1입니다.",
    memorizationPoint: "카이제곱 공식: Σ(O - E)² / E, 자유도: (행수 - 1) × (열수 - 1)",
    examinerTip: "분모가 관측빈도(O)가 아니라 반드시 **기대빈도(E)**라는 점과 2×2 분할표의 자유도는 1이라는 점이 빈출 포인트입니다.",
    whyWrong: [
      "정답: 분모가 E이고 2×2 분할표의 자유도는 (2-1)(2-1) = 1입니다.",
      "오답: 분모가 E²이 아닙니다.",
      "오답: 분모는 O가 아니라 E입니다.",
      "오답: 자유도 계산이 잘못되었습니다 (1이어야 함)."
    ]
  },
  {
    id: "Q_PASS_460",
    subject: 2,
    chapter: "통계적 가설검정",
    question: "[12회 기출복원] 통계적 가설검정에서 유의수준(α)을 0.05에서 0.01로 더 엄격하게 낮추었을 때 발생하는 현상으로 가장 올바른 것은?",
    choices: [
      "귀무가설(H₀)을 기각하기 쉬워지며, 제1종 오류(α)와 제2종 오류(β)가 모두 감소한다.",
      "제1종 오류(α) 발생 확률은 감소하지만, 귀무가설 기각 기준이 엄격해져 제2종 오류(β) 발생 확률은 증가하고 검정력(1 - β)은 감소한다.",
      "제1종 오류(α)와 제2종 오류(β)는 항상 비례하므로 제2종 오류도 함께 감소한다.",
      "표본의 크기(n)와 상관없이 검정력(1 - β)이 1에 수렴하게 된다."
    ],
    answer: 1,
    difficulty: "hard",
    cardId: "c2-22",
    explanation: "유의수준(α, 제1종 오류)을 낮추면 귀무가설 기각이 까다로워지므로 귀무가설이 거짓인데도 기각하지 못하는 제2종 오류(β)가 증가합니다. 따라서 검정력(1 - β)은 감소합니다. 두 오류를 동시에 줄이는 유일한 방법은 표본수(n)를 늘리는 것입니다.",
    memorizationPoint: "α 감소 ➔ 기각 어려움 ➔ β 증가 ➔ 검정력(1 - β) 감소 (Trade-off 관계)",
    examinerTip: "1종 오류와 2종 오류는 시소(Trade-off) 관계입니다. 한쪽을 줄이면 다른 쪽이 늘어나며, 둘 다 줄이려면 오직 표본 크기를 키워야 합니다.",
    whyWrong: [
      "오답: α를 낮추면 기각하기 어려워집니다.",
      "정답: α가 줄어들면 β가 늘어나 검정력이 감소합니다.",
      "오답: 1종 오류와 2종 오류는 반비례(상충) 관계입니다.",
      "오답: 검정력은 표본 크기에 크게 의존합니다."
    ]
  },
  {
    id: "Q_PASS_461",
    subject: 2,
    chapter: "데이터 전처리 및 변환",
    question: "[12회 기출복원] 왜곡된 데이터의 정규성을 확보하기 위해 사용하는 박스-콕스(Box-Cox) 변환에서, 변환 파라미터 λ = 0 일 때 적용되는 수학적 변환 형태는? (단, 데이터 y > 0)",
    choices: [
      "y - 1 (선형 변환)",
      "ln(y) (자연로그 변환)",
      "√y (제곱근 변환)",
      "1 / y (역수 변환)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c2-7",
    explanation: "Box-Cox 변환 공식은 λ ≠ 0일 때 (y^λ - 1)/λ 이고, λ = 0일 때는 극한에 의해 ln(y) (자연로그 변환)이 됩니다. λ = 1이면 선형(y-1), λ = 0.5이면 제곱근 변환입니다.",
    memorizationPoint: "Box-Cox 파라미터: λ=0 ➔ 자연로그(ln y), λ=0.5 ➔ 제곱근(√y), λ=1 ➔ 선형(무변환)",
    examinerTip: "Box-Cox 변환은 반드시 모든 데이터 값이 양수(y > 0)여야 로그 및 거듭제곱 계산이 성립한다는 필수 조건도 함께 기억해야 합니다.",
    whyWrong: [
      "오답: y - 1 은 λ = 1 일 때의 형태입니다.",
      "정답: λ = 0 일 때 자연로그 변환 ln(y)이 적용됩니다.",
      "오답: √y 는 λ = 0.5 일 때의 형태입니다.",
      "오답: 1/y 는 λ = -1 일 때의 형태입니다."
    ]
  },
  {
    id: "Q_PASS_462",
    subject: 2,
    chapter: "데이터 전처리 및 변환",
    question: "[12회 기출복원] 시계열 데이터나 잡음(Noise)이 심한 연속형 변수에서 단기 변동을 완화하고 기저의 추세를 매끄럽게 파악하기 위해 사용하는 스무딩(Smoothing) 기법으로 가장 적절하지 않은 것은?",
    choices: [
      "단순 이동평균법 (Simple Moving Average)",
      "지수 평활법 (Exponential Smoothing)",
      "LOWESS / LOESS (국소 가중 회귀 스무딩)",
      "원-핫 인코딩 (One-Hot Encoding)"
    ],
    answer: 3,
    difficulty: "easy",
    cardId: "c2-7",
    explanation: "이동평균법, 지수평활법, 국소 가중 회귀(LOWESS/LOESS), 스플라인(Spline) 등은 대표적인 데이터 스무딩(평활화) 기법입니다. 원-핫 인코딩은 범주형 변수를 이진 벡터로 변환하는 인코딩 기법입니다.",
    memorizationPoint: "스무딩 기법: 이동평균(MA), 지수평활, LOWESS, 스플라인 (잡음 완화 및 추세 파악)",
    examinerTip: "스무딩은 데이터의 랜덤 노이즈를 줄여 완만한 곡선으로 만드는 기법이며, 범주형 인코딩 기법(원핫, 라벨)과 구분해야 합니다.",
    whyWrong: [
      "올바른 스무딩 기법: 일정 기간의 평균을 이동하며 계산하는 대표적 평활법입니다.",
      "올바른 스무딩 기법: 최근 데이터에 더 높은 가중치를 부여하는 평활법입니다.",
      "올바른 스무딩 기법: 국소 구간별 가중 회귀선을 적합하는 비모수 스무딩입니다.",
      "정답(스무딩 아님): 원-핫 인코딩은 범주형 피처 전처리 기법입니다."
    ]
  },
  {
    id: "Q_PASS_463",
    subject: 2,
    chapter: "데이터 전처리 및 변환",
    question: "[12회 기출복원] 데이터 피처 엔지니어링에서 사용되는 '요약변수(Summary Variable)'와 '파생변수(Derived Variable)'에 대한 설명으로 가장 올바른 것은?",
    choices: [
      "요약변수는 분석자의 주관적 논리나 특정 비즈니스 가설에 의해 새롭게 정의한 변수이다.",
      "파생변수는 고객의 총 구매금액, 최근 3개월간 결제횟수 등 기존 원천 데이터를 통계적으로 종합 집계한 변수이다.",
      "요약변수는 수집된 정보를 총합, 평균, 빈도 등으로 집계한 변수이며, 파생변수는 사용자의 특정 조건이나 계산식(예: 체질량지수 BMI = 체중/키²)으로 생성한 변수이다.",
      "파생변수는 모델의 해석력을 떨어뜨리므로 머신러닝 성능 향상에 일체 사용되지 않는다."
    ],
    answer: 2,
    difficulty: "easy",
    cardId: "c2-7",
    explanation: "요약변수는 원천 데이터를 그룹화하여 합계, 평균, 횟수 등으로 집계(Aggregate)한 객관적 변수이고, 파생변수는 분석자의 가설이나 공식(BMI, 구매성향지수 등)을 바탕으로 새롭게 창출한 변수입니다.",
    memorizationPoint: "요약변수 = 단순 집계(합계, 평균, 횟수) / 파생변수 = 분석가 가설/수식 결합(BMI, 선호지수)",
    examinerTip: "요약변수는 다수가 공통으로 사용하는 집계 데이터이며, 파생변수는 주관적 목적과 이론에 따라 가공된 변수라는 차이점을 묻는 문제가 단골입니다.",
    whyWrong: [
      "오답: 분석자의 주관적 논리와 계산식으로 만든 것은 파생변수입니다.",
      "오답: 총 구매금액, 결제횟수 등 단순 종합 집계는 요약변수입니다.",
      "정답: 요약변수는 통계적 집계, 파생변수는 조건/수식 결합 변수입니다.",
      "오답: 파생변수는 머신러닝 모델의 예측 성능을 높이는 핵심 수단입니다."
    ]
  },
  {
    id: "Q_PASS_464",
    subject: 2,
    chapter: "데이터 전처리 및 변환",
    question: "[12회 기출복원] 피처 스케일링(Feature Scaling) 기법인 표준화(Standardization)와 정규화(Normalization)에 대한 비교로 가장 올바르지 않은 것은?",
    choices: [
      "표준화(Z-Score)는 데이터를 평균 0, 표준편차 1이 되도록 변환하는 공식 `(x - μ) / σ` 를 사용한다.",
      "Min-Max 정규화는 데이터의 최소값을 0, 최대값을 1로 고정 변환하는 공식 `(x - min) / (max - min)` 을 사용한다.",
      "Min-Max 정규화는 이상치(Outlier)가 존재할 경우 다른 정상 데이터들이 좁은 구간으로 압축되는 왜곡이 발생하기 쉽다.",
      "표준화(Z-Score)를 적용하면 데이터셋에 극단적인 이상치가 존재하더라도 변환 후 모든 데이터가 반드시 [-1, 1] 범위 내에 엄격히 제한된다."
    ],
    answer: 3,
    difficulty: "medium",
    cardId: "c2-7",
    explanation: "표준화(Z-Score)는 변환 후 평균이 0, 표준편차가 1이 될 뿐, 데이터의 상한선과 하한선이 [-1, 1]로 제한되지 않습니다. 극단적 이상치는 Z값이 3, 5, 10 이상이 될 수 있습니다. 범위를 [0, 1]로 제한하는 것은 Min-Max 스케일러입니다.",
    memorizationPoint: "Z-score: 평균 0, 표준편차 1 (범위 제한 없음) vs Min-Max: 0~1 고정 (이상치에 민감)",
    examinerTip: "Z-Score는 범위 제한이 없다는 점과, Min-Max는 이상치가 min/max를 왜곡시켜 데이터 분포를 압축시킨다는 점이 핵심 비교 포인트입니다.",
    whyWrong: [
      "올바른 설명: Z = (x - mean) / std 공식입니다.",
      "올바른 설명: Min-Max = (x - min) / (max - min) 공식입니다.",
      "올바른 설명: 이상치가 있으면 max가 너무 커져 나머지 데이터가 0 근처로 몰립니다.",
      "정답(오류): Z-Score는 범위를 [-1, 1]로 제한하지 않습니다."
    ]
  },
  {
    id: "Q_PASS_465",
    subject: 2,
    chapter: "데이터 정제 및 결측치",
    question: "[12회 기출복원] 설문조사에서 '고소득자일수록 자신의 소득 기재를 회피하여 결측이 발생하는 현상'과 같이, 결측값의 발생 여부가 결측된 변수 자체의 값과 직접적인 인과관계가 있는 결측치 메커니즘은?",
    choices: [
      "완전 무작위 결측 (MCAR: Missing Completely At Random)",
      "무작위 결측 (MAR: Missing At Random)",
      "비무작위 결측 (NMAR: Not Missing At Random)",
      "구조적 결측 (Structural Missing)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c2-7",
    explanation: "비무작위 결측(NMAR)은 결측 여부가 결측된 그 변수 자체의 값(소득이 높아서 소득칸을 비움, 우울증이 심해서 우울증 설문을 거부함)과 연관된 경우로, 단순 삭제나 평균 대치 시 극심한 편향이 발생하므로 모델링 기반 보정이 필요합니다.",
    memorizationPoint: "MCAR: 완전 무관 / MAR: 다른 관측변수와 연관 / NMAR: 누락된 값 자체와 직접 연관",
    examinerTip: "소득 설문에서 고소득자의 미응답, 체중 설문에서 과체중자의 미응답은 대표적인 NMAR(비무작위 결측) 예시입니다.",
    whyWrong: [
      "오답: MCAR은 데이터 누락이 어떤 변수와도 전혀 상관없이 무작위로 발생한 경우입니다.",
      "오답: MAR은 결측 여부가 다른 관측된 변수(예: 성별, 연령)와 연관이 있는 경우입니다.",
      "정답: 결측값 자체의 크기 때문에 누락된 것은 NMAR입니다.",
      "오답: 구조적 결측은 미혼자에게 배우자 직업을 묻는 것처럼 질문 구조상 발생하는 결측입니다."
    ]
  },
  {
    id: "Q_PASS_466",
    subject: 2,
    chapter: "차원 축소 및 변수 선택",
    question: "[12회 기출복원] 주성분 분석(PCA)에서 주성분을 선택할 때, 공분산 행렬의 고유값(Eigenvalue) 크기를 기반으로 주성분 개수를 결정하는 '카이저 기준(Kaiser Criterion)'에 해당하는 것은?",
    choices: [
      "고유값(Eigenvalue)이 0.5 이상인 주성분만 선택한다.",
      "고유값(Eigenvalue)이 1.0 이상인 주성분만 선택한다.",
      "누적 설명 분산 비율이 정확히 50%가 되는 지점을 선택한다.",
      "스크리 플롯(Scree Plot)에서 기울기가 가장 가파른 첫 번째 주성분 1개만 선택한다."
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c2-8",
    explanation: "표준화된 데이터의 PCA에서 카이저 기준(Kaiser Criterion)은 평균적으로 1개 변수 분량의 분산(분산=1) 이상을 설명하는 '고유값(Eigenvalue) ≥ 1.0'인 주성분들만 선택하는 경험적 규칙입니다.",
    memorizationPoint: "PCA 주성분 결정 기준: 카이저 규칙(고유값 ≥ 1.0), 누적 설명분산 70~80% 이상, 스크리 플롯 팔꿈치점",
    examinerTip: "카이저 기준(고유값 1 이상)과 스크리 플롯의 엘보우 포인트(Elbow Point), 누적 기여율 70~80% 기준은 PCA 3대 주성분 결정법입니다.",
    whyWrong: [
      "오답: 카이저 기준은 0.5가 아니라 1.0입니다.",
      "정답: 고유값 1.0 이상인 주성분을 선택하는 것이 카이저 기준입니다.",
      "오답: 누적 설명 분산은 통상 70~80% 이상을 기준으로 합니다.",
      "오답: 스크리 플롯에서는 완만해지는 변곡점(엘보우) 직전까지의 주성분을 선택합니다."
    ]
  },

  // ========================================================
  // 3과목: 빅데이터 모델링 (Q_PASS_467 ~ Q_PASS_478)
  // ========================================================
  {
    id: "Q_PASS_467",
    subject: 3,
    chapter: "회귀분석 및 모델링",
    question: "[12회 기출복원] 다중선형회귀분석에서 독립변수 간의 높은 상관관계로 인해 회귀계수 추정치의 분산이 비정상적으로 커지는 다중공선성(Multicollinearity)에 대한 설명으로 올바르지 않은 것은?",
    choices: [
      "분산팽창계수(VIF: Variance Inflation Factor)가 10 이상이면 심각한 다중공선성이 존재하는 것으로 판정한다.",
      "다중공선성이 발생하면 모형의 전체 설명력(R²)은 높게 나오지만 개별 회귀계수의 유의확률(p-value)은 유의하지 않게 나타날 수 있다.",
      "다중공선성 해결을 위해 상관관계가 높은 변수 중 일부를 제거하거나, 주성분 분석(PCA)으로 차원을 축소할 수 있다.",
      "L2 규제를 적용하는 릿지(Ridge) 회귀는 불필요한 독립변수의 계수를 완전히 0으로 만들어 변수를 자동 제거함으로써 다중공선성을 제거한다."
    ],
    answer: 3,
    difficulty: "medium",
    cardId: "c3-1",
    explanation: "회귀계수를 정확히 0으로 만들어 변수를 완전히 제거(희소 모델 생성)하는 것은 L1 규제를 적용하는 **라쏘(Lasso) 회귀**입니다. 릿지(Ridge) 회귀는 계수를 0에 가깝게 축소(Shrinkage)시킬 뿐 완전히 0으로 만들지는 않습니다.",
    memorizationPoint: "L1 Lasso = 계수 0 생성 (변수 선택) vs L2 Ridge = 계수 감쇠 (0으로 만들지 않음)",
    examinerTip: "릿지와 라쏘의 차이는 매 회차 출제되는 초빈출 킬러 문제입니다. '계수를 0으로 만든다 = Lasso', '계수를 0 근처로 축소한다 = Ridge'를 절대 잊지 마세요!",
    whyWrong: [
      "올바른 설명: VIF ≥ 10 이면 다중공선성 존재로 판정합니다.",
      "올바른 설명: R²은 높은데 각 t-검정 p-value는 유의하지 않은 전형적 증상이 나타납니다.",
      "올바른 설명: 변수 제거, PCA, 규제 회귀 등이 해결책입니다.",
      "정답(오류): 계수를 완전히 0으로 만드는 것은 Lasso 회귀입니다."
    ]
  },
  {
    id: "Q_PASS_468",
    subject: 3,
    chapter: "회귀분석 및 모델링",
    question: "[12회 기출복원] 선형 회귀모형의 잔차(Residual) 분석에서 오차항의 자기상관(Autocorrelation / 독립성 위배) 여부를 진단하는 더빈-왓슨(Durbin-Watson, DW) 통계량에 대한 설명으로 올바른 것은?",
    choices: [
      "DW 통계량이 0에 가까울수록 오차항 간에 자기상관이 전혀 없는 독립 상태를 의미한다.",
      "DW 통계량 값이 2에 가까울수록 잔차의 자기상관이 없어 독립성 가정을 만족하는 것으로 해석한다.",
      "DW 통계량이 4에 가까울수록 양(+)의 자기상관이 강하게 존재함을 나타낸다.",
      "더빈-왓슨 통계량은 잔차의 등분산성을 검정하기 위한 전용 통계량이다."
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c3-1",
    explanation: "더빈-왓슨(DW) 통계량은 0~4 사이의 값을 가지며, 2에 가까우면 잔차 간에 자기상관이 없는 독립성을 만족합니다. 0에 가까우면 양(+)의 자기상관, 4에 가까우면 음(-)의 자기상관을 의미합니다.",
    memorizationPoint: "더빈-왓슨(DW): 2에 가까우면 독립(정상), 0에 가까우면 양의 상관, 4에 가까우면 음의 상관",
    examinerTip: "더빈-왓슨 통계량은 잔차 4대 가정(선형성, 등분산성, 독립성, 정규성) 중 '독립성(자기상관 부재)'을 검정하는 지표입니다.",
    whyWrong: [
      "오답: DW가 0에 가까우면 양(+)의 자기상관이 존재하는 상태입니다.",
      "정답: DW 값이 2에 가까울수록 자기상관이 없는 정상 독립 상태입니다.",
      "오답: DW가 4에 가까우면 음(-)의 자기상관이 존재합니다.",
      "오답: DW 통계량은 독립성(자기상관) 검정 통계량입니다."
    ]
  },
  {
    id: "Q_PASS_469",
    subject: 3,
    chapter: "딥러닝 및 인공신경망",
    question: "[12회 기출복원] 트랜스포머(Transformer) 모델의 핵심 메커니즘인 스케일드 닷 프로덕트 어텐션(Scaled Dot-Product Attention)의 수식으로 가장 올바른 것은? (단, Q: Query, K: Key, V: Value, d_k: Key 벡터의 차원)",
    choices: [
      "Attention(Q, K, V) = Softmax( Q · Kᵀ / √d_k ) · V",
      "Attention(Q, K, V) = Softmax( Q · Vᵀ / d_k ) · K",
      "Attention(Q, K, V) = Sigmoid( Q · Kᵀ × √d_k ) + V",
      "Attention(Q, K, V) = ReLU( Qᵀ · K / d_k ) · V"
    ],
    answer: 0,
    difficulty: "hard",
    cardId: "c3-13-2",
    explanation: "스케일드 닷 프로덕트 어텐션 공식은 Softmax( (Q · Kᵀ) / √d_k ) · V 입니다. Query와 Key의 내적 값을 차원 수의 제곱근(√d_k)으로 스케일링한 후 소프트맥스를 취해 어텐션 가중치를 계산하고 Value와 가중합합니다.",
    memorizationPoint: "Transformer Attention 공식 = Softmax( (Q · Kᵀ) / √d_k ) · V",
    examinerTip: "Q(Query)와 K(Key)를 내적하여 유사도를 구하고, 기울기 소실 방지를 위해 √d_k로 나눈 뒤 소프트맥스를 취해 V(Value)에 곱한다는 3단계를 기억하세요.",
    whyWrong: [
      "정답: 정확한 트랜스포머 스케일드 닷 프로덕트 어텐션 공식입니다.",
      "오답: Q와 V의 내적이 아니라 Q와 K의 내적이어야 합니다.",
      "오답: 활성화 함수는 Sigmoid가 아니라 Softmax이며, 곱하는 것이 아니라 나눕니다.",
      "오답: ReLU가 아니라 Softmax입니다."
    ]
  },
  {
    id: "Q_PASS_470",
    subject: 3,
    chapter: "딥러닝 및 인공신경망",
    question: "[12회 기출복원] 기존 RNN 모델과 달리 트랜스포머(Transformer) 모델에서 '위치 인코딩(Positional Encoding)'을 단어 임베딩 벡터에 반드시 더해주어야 하는 근본적인 이유는?",
    choices: [
      "입력 문장의 임베딩 벡터 차원을 축소하여 학습 속도를 가속하기 위해서",
      "시퀀스를 순차적으로 처리하지 않고 전체 단어를 한 번에 병렬 입력하므로, 단어 간의 순서(위치) 정보가 소실되기 때문에",
      "역전파 과정에서 발생하는 기울기 소실(Vanishing Gradient)을 방지하기 위해서",
      "텍스트 내 불용어(Stopwords)를 자동으로 식별하여 가중치를 0으로 만들기 위해서"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c3-13-2",
    explanation: "RNN은 단어를 순서대로 하나씩 읽어 자연스럽게 순서가 반영되지만, 트랜스포머는 전체 문장을 한 번에 병렬(Self-Attention) 처리하므로 순서 정보가 없습니다. 따라서 단어의 위치 정보를 주기함수(Sin, Cos) 등으로 생성하여 임베딩에 더해주는 Positional Encoding이 필수적입니다.",
    memorizationPoint: "트랜스포머 완전 병렬 처리 ➔ 순서 정보 부재 ➔ Positional Encoding으로 위치값 주입",
    examinerTip: "트랜스포머의 병렬 처리 특성과 위치 인코딩(Positional Encoding)의 필요성은 딥러닝 파트의 최신 핵심 출제 문제입니다.",
    whyWrong: [
      "오답: 차원 축소와는 관련이 없습니다.",
      "정답: 병렬 처리로 인해 사라지는 단어의 순서/위치 정보를 제공하기 위해 필수적입니다.",
      "오답: 기울기 소실 방지는 잔차 연결(Residual Connection)과 LayerNorm 등의 역할입니다.",
      "오답: 불용어 제거와는 무관합니다."
    ]
  },
  {
    id: "Q_PASS_471",
    subject: 3,
    chapter: "앙상블 및 고급 모델링",
    question: "[12회 기출복원] 앙상블(Ensemble) 기법 중 서로 다른 여러 머신러닝 모델(Base Learners)의 예측 결과를 새로운 피처(Meta Features)로 생성한 후, 이를 입력으로 받아 최종 예측을 수행하는 상위 모델(Meta Learner)을 학습시키는 기법은?",
    choices: [
      "배깅 (Bagging)",
      "부스팅 (Boosting)",
      "스태킹 (Stacking)",
      "보팅 (Voting)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c3-11",
    explanation: "스태킹(Stacking)은 여러 다양한 기본 모델의 예측값을 메타 피처로 만들어 메타 모델(Meta Learner, 2단계 모델)을 훈련시키는 기법입니다. 블렌딩(Blending)은 스태킹과 유사하나 Hold-out 세트로 메타 피처를 생성합니다.",
    memorizationPoint: "Base 모델 예측값 ➔ 새로운 피처 ➔ Meta 모델 학습 = 스태킹(Stacking) / 블렌딩(Blending)",
    examinerTip: "단순 투표/평균은 보팅(Voting), 복원추출 병렬은 배깅(Bagging), 오답 가중치 순차학습은 부스팅(Boosting), 예측값 재학습은 스태킹(Stacking)입니다.",
    whyWrong: [
      "오답: 배깅은 부트스트랩 샘플에 동일 모델을 병렬 학습하여 평균을 취합니다.",
      "오답: 부스팅은 이전 모델의 오차에 가중치를 부여해 순차적으로 학습합니다.",
      "정답: 예측값을 피처로 메타 모델을 학습시키는 것은 스태킹입니다.",
      "오답: 보팅은 여러 모델의 예측값을 다수결 투표나 단순 평균으로 결합합니다."
    ]
  },
  {
    id: "Q_PASS_472",
    subject: 3,
    chapter: "서포트 벡터 머신 (SVM)",
    question: "[12회 기출복원] 서포트 벡터 머신(SVM) 알고리즘에서 두 클래스 사이의 마진(Margin)을 결정짓는 경계선 상에 위치하여, 초평면(Hyperplane)의 위치와 기울기를 결정하는 가장 핵심적인 데이터 포인트는?",
    choices: [
      "이상치 (Outlier)",
      "서포트 벡터 (Support Vector)",
      "군집 중심점 (Centroid)",
      "고유 벡터 (Eigenvector)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c3-7",
    explanation: "서포트 벡터(Support Vector)는 결정 경계(초평면)와 가장 가까이에 위치한 데이터 포인트들로, 결정 경계의 마진(Margin)과 방향을 완전히 결정하는 핵심 샘플입니다.",
    memorizationPoint: "SVM 결정 경계와 가장 가까운 핵심 데이터 = 서포트 벡터(Support Vector)",
    examinerTip: "서포트 벡터 머신은 다른 모든 데이터가 이동하거나 삭제되어도 '서포트 벡터'만 변하지 않으면 결정 경계가 그대로 유지되는 특성이 있습니다.",
    whyWrong: [
      "오답: 이상치는 마진을 왜곡시킬 수 있는 노이즈입니다.",
      "정답: 결정 경계를 지탱하는 핵심 포인트는 서포트 벡터입니다.",
      "오답: 중심점은 K-Means 등 군집분석의 개념입니다.",
      "오답: 고유 벡터는 PCA 등 선형대수학 분해 개념입니다."
    ]
  },
  {
    id: "Q_PASS_473",
    subject: 3,
    chapter: "서포트 벡터 머신 (SVM)",
    question: "[12회 기출복원] 서포트 벡터 머신(SVM)에서 원래의 저차원 입력 공간에서 선형 분리가 불가능한 데이터를 고차원 특징 공간으로 직접 변환하지 않고도, 내적 연산만으로 고차원 매핑 효과를 내는 수학적 기법은?",
    choices: [
      "경사하강법 (Gradient Descent)",
      "커널 트릭 (Kernel Trick)",
      "소프트맥스 함수 (Softmax Function)",
      "드롭아웃 (Dropout)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c3-7",
    explanation: "커널 트릭(Kernel Trick)은 데이터를 직접 무한/고차원 공간으로 변환하지 않고도, 커널 함수(RBF/가우시안, 다항식, 시그모이드 등)를 통해 고차원 내적을 저차원에서 직접 계산하여 비선형 분류를 가능하게 하는 기법입니다.",
    memorizationPoint: "고차원 직접 변환 없이 내적 계산으로 비선형 분리 = 커널 트릭 (RBF, Polynomial)",
    examinerTip: "SVM의 가장 대표적인 비선형 커널은 RBF(가우시안 방사기저함수) 커널입니다.",
    whyWrong: [
      "오답: 경사하강법은 손실함수를 최적화하는 파라미터 업데이트 기법입니다.",
      "정답: 비선형 고차원 매핑 내적 연산 기법은 커널 트릭입니다.",
      "오답: 소프트맥스는 다중 분류 확률을 출력하는 활성화 함수입니다.",
      "오답: 드롭아웃은 신경망의 과적합 방지 기법입니다."
    ]
  },
  {
    id: "Q_PASS_474",
    subject: 3,
    chapter: "분류 모델링",
    question: "[12회 기출복원] 나이브 베이즈(Naive Bayes) 분류기가 사후확률 P(Y|X)을 계산할 때 모델의 계산 복잡도를 대폭 단순화하기 위해 도입한 핵심 가정은?",
    choices: [
      "모든 설명변수(X)는 서로 완전한 다중공선성 관계를 갖는다.",
      "클래스(Y)가 주어졌을 때 모든 설명변수(X₁, X₂, ..., X_n)는 서로 조건부 독립(Conditionally Independent)이다.",
      "모든 데이터는 정규분포가 아닌 이항분포만을 따른다.",
      "종속변수 Y는 연속형 실수 값만을 가져야 한다."
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c3-5",
    explanation: "나이브 베이즈는 이름 그대로 '순진한(Naive)' 가정, 즉 클래스 Y가 주어졌을 때 모든 특성 X_i들이 서로 독립이라는 조건부 독립(Conditional Independence) 가정을 사용하여 결합확률을 개별 확률의 곱(P(X|Y) = Π P(X_i|Y))으로 단순화합니다.",
    memorizationPoint: "나이브 베이즈의 핵심 = 클래스가 주어질 때 모든 피처는 '조건부 독립(Conditional Independence)'",
    examinerTip: "현실에서는 변수 간 상관관계가 존재하지만, 조건부 독립 가정을 도입함으로써 텍스트 분류(스팸 필터) 등에서 초고속으로 우수한 성능을 발휘합니다.",
    whyWrong: [
      "오답: 다중공선성이 아니라 독립을 가정합니다.",
      "정답: 클래스 조건 하에서 모든 설명변수의 조건부 독립성이 핵심 가정입니다.",
      "오답: 가우시안, 다항, 베르누이 등 다양한 분포를 지원합니다.",
      "오답: 종속변수 Y는 범주형 클래스입니다."
    ]
  },
  {
    id: "Q_PASS_475",
    subject: 3,
    chapter: "거리 및 유사도 측정",
    question: "[12회 기출복원] 두 고객의 구매 상품 집합 A = {사과, 바나나, 우유, 빵, 치즈} 와 B = {우유, 빵, 치즈, 주스, 커피, 달걀} 사이의 자카드 유사도(Jaccard Similarity)와 자카드 거리(Jaccard Distance)로 올바른 것은?",
    choices: [
      "자카드 유사도 = 3/8 (0.375), 자카드 거리 = 5/8 (0.625)",
      "자카드 유사도 = 3/11 (0.273), 자카드 거리 = 8/11 (0.727)",
      "자카드 유사도 = 5/6 (0.833), 자카드 거리 = 1/6 (0.167)",
      "자카드 유사도 = 3/5 (0.600), 자카드 거리 = 2/5 (0.400)"
    ],
    answer: 0,
    difficulty: "medium",
    cardId: "c3-9",
    explanation: "교집합 A ∩ B = {우유, 빵, 치즈} (3개), 합집합 A ∪ B = {사과, 바나나, 우유, 빵, 치즈, 주스, 커피, 달걀} (8개)입니다. 따라서 자카드 유사도는 3/8 = 0.375 이며, 자카드 거리는 1 - 유사도 = 1 - 3/8 = 5/8 = 0.625 입니다.",
    memorizationPoint: "자카드 유사도 = |A ∩ B| / |A ∪ B|, 자카드 거리 = 1 - 유사도",
    examinerTip: "합집합을 구할 때 교집합 원소(3개)가 중복 계산되지 않도록 주의해야 합니다. 전체 원소 개수는 5 + 6 - 3 = 8개입니다.",
    whyWrong: [
      "정답: 교집합 3개 / 합집합 8개 = 3/8(0.375), 거리 = 5/8(0.625) 입니다.",
      "오답: 합집합에서 중복을 빼지 않고 단순 합산한 오류입니다.",
      "오답: 계산 공식이 틀렸습니다.",
      "오답: 집합 A의 크기로 나눈 오류입니다."
    ]
  },
  {
    id: "Q_PASS_476",
    subject: 3,
    chapter: "차원 축소 및 분해 기법",
    question: "[12회 기출복원] 행렬 분해 기법 중 정방행렬뿐만 아니라 행과 열의 크기가 다른 임의의 m×n 직사각형 행렬 A를 직교행렬 U, 특이값 대각행렬 Σ, 직교행렬 V^T의 곱 `A = U Σ V^T` 로 분해하는 기법은?",
    choices: [
      "고유값 분해 (Eigendecomposition)",
      "특이값 분해 (SVD: Singular Value Decomposition)",
      "LU 분해 (LU Decomposition)",
      "QR 분해 (QR Decomposition)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c2-8",
    explanation: "특이값 분해(SVD)는 m×n 크기의 모든 직사각형 행렬에 적용 가능하며, A = U Σ V^T 형태로 분해하여 잠재 의미 분석(LSA), 이미지 압축, 추천 시스템 등에 널리 활용됩니다. 고유값 분해는 정방행렬에만 적용 가능합니다.",
    memorizationPoint: "정방행렬 전용 = 고유값 분해 / 임의의 m×n 행렬 분해 = 특이값 분해(SVD)",
    examinerTip: "SVD의 절단된 SVD(Truncated SVD)는 상위 k개의 특이값만 남겨 데이터의 차원을 획기적으로 축소하는 데 사용됩니다.",
    whyWrong: [
      "오답: 고유값 분해는 오직 n×n 정방행렬에만 정의됩니다.",
      "정답: 임의의 m×n 직사각형 행렬을 분해하는 것은 SVD입니다.",
      "오답: LU 분해는 하삼각/상삼각 행렬로 분해하는 연립방정식 풀이법입니다.",
      "오답: QR 분해는 직교행렬과 상삼각행렬로 분해하는 기법입니다."
    ]
  },
  {
    id: "Q_PASS_477",
    subject: 3,
    chapter: "신규 및 고급 모델링",
    question: "[12회 기출복원] 시스템의 내부 상태(State)는 직접 관찰할 수 없으나 상태에서 방출되는 관측 기호(Symbol)만을 확인할 수 있을 때, 관측 시퀀스로부터 가장 가능성이 높은 은닉 상태 시퀀스를 역추정하는 비터비(Viterbi) 알고리즘이 사용되는 확률 모델은?",
    choices: [
      "의사결정나무 (Decision Tree)",
      "은닉 마르코프 모델 (HMM: Hidden Markov Model)",
      "선형 판별 분석 (LDA)",
      "K-최근접 이웃 (KNN)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c3-13",
    explanation: "은닉 마르코프 모델(HMM)은 은닉 상태 전이 확률과 관측 방출 확률로 구성된 시계열/순차 데이터 확률 모델이며, 최적의 은닉 상태 경로를 찾는 알고리즘으로 동적 계획법 기반의 비터비(Viterbi) 알고리즘을 사용합니다.",
    memorizationPoint: "은닉 상태 + 관측 확률 + 비터비(Viterbi) 알고리즘 = 은닉 마르코프 모델 (HMM)",
    examinerTip: "음성 인식, 자연어 품사 태깅, 유전자 서열 분석 등에서 은닉 상태 시퀀스를 추론하는 HMM의 개념이 12회 신규 키워드로 출제되었습니다.",
    whyWrong: [
      "오답: 의사결정나무는 if-else 규칙 기반 분기 모델입니다.",
      "정답: 비터비 알고리즘과 은닉 상태를 다루는 모델은 HMM입니다.",
      "오답: LDA는 클래스 간 분산을 최대화하는 선형 판별/차원축소 기법입니다.",
      "오답: KNN은 최근접 k개 이웃의 다수결을 따르는 인스턴스 기반 모델입니다."
    ]
  },
  {
    id: "Q_PASS_478",
    subject: 3,
    chapter: "데이터 전처리 및 인코딩",
    question: "[12회 기출복원] 범주형 변수를 N개의 고유 카테고리에 대해 각각 0과 1로 구성된 이진 벡터로 변환하는 '원-핫 인코딩(One-Hot Encoding)' 적용 시 발생할 수 있는 주요 문제점으로 가장 올바른 것은?",
    choices: [
      "카테고리 간에 원치 않는 서열(순서) 관계가 강제로 부여된다.",
      "고유 카테고리 수(Cardinality)가 많을 경우 변수 수가 급증하여 대부분이 0인 희소 행렬(Sparse Matrix)이 생성되고 차원의 저주가 발생할 수 있다.",
      "비선형 모델(트리 모델 등)에서는 원-핫 인코딩된 데이터를 전혀 학습할 수 없다.",
      "변환 후 데이터의 메모리 사용량이 극적으로 감소하여 언더플로우가 발생한다."
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c2-7",
    explanation: "원-핫 인코딩은 카테고리 간 순서 왜곡이 없다는 장점이 있으나, 고유 범주 수가 많으면(고차수 카디널리티) 열(Feature)의 수가 기하급수적으로 늘어나 대부분이 0인 희소 행렬(Sparse Matrix)이 되어 메모리 낭비와 차원의 저주를 유발합니다.",
    memorizationPoint: "원-핫 인코딩의 단점: 범주가 많을 때 희소 행렬(Sparse Matrix) 및 차원의 저주 발생",
    examinerTip: "라벨 인코딩(Label Encoding)은 0, 1, 2 등의 숫자를 부여해 순서 왜곡이 생기는 반면, 원-핫 인코딩은 순서 왜곡은 없으나 희소 행렬이 문제입니다.",
    whyWrong: [
      "오답: 순서 관계가 강제로 부여되는 것은 라벨 인코딩(Label Encoding)입니다.",
      "정답: 고유값이 많을 때 희소 행렬과 차원의 저주가 발생하는 것이 원-핫 인코딩의 대표적 한계입니다.",
      "오답: 트리 모델도 원-핫 인코딩 데이터를 학습할 수 있습니다.",
      "오답: 메모리 사용량은 급격히 증가합니다."
    ]
  },

  // ========================================================
  // 4과목: 빅데이터 결과 해석 (Q_PASS_479 ~ Q_PASS_488)
  // ========================================================
  {
    id: "Q_PASS_479",
    subject: 4,
    chapter: "데이터 시각화",
    question: "[12회 기출복원] 10개 이상의 다차원(다변량) 연속형 변수들을 시각화하기 위해 여러 개의 수직 또는 수평 평행 축을 나란히 배치하고, 각 데이터 인스턴스를 축들을 가로지르는 꺾은선으로 표현하는 시각화 기법은?",
    choices: [
      "산점도 행렬 (Scatter Plot Matrix)",
      "평행 좌표 플롯 (Parallel Coordinates Plot)",
      "상자 그림 (Boxplot)",
      "체르노프 페이스 (Chernoff Faces)"
    ],
    answer: 1,
    difficulty: "medium",
    cardId: "c4-7",
    explanation: "평행 좌표 플롯(Parallel Coordinates Plot)은 다차원 변수들을 평행한 축으로 나란히 세우고 데이터 샘플을 꺾은선으로 연결하여 다차원 공간의 패턴, 군집, 이상치를 효과적으로 파악할 수 있는 고차원 시각화 도구입니다.",
    memorizationPoint: "평행한 여러 축을 가로지르는 꺾은선 다차원 시각화 = 평행 좌표 플롯 (Parallel Coordinates)",
    examinerTip: "변수의 개수가 많을 때 2차원 산점도의 한계를 극복하고 군집별 꺾은선 궤적을 비교하는 데 최적입니다.",
    whyWrong: [
      "오답: 산점도 행렬은 2개 변수 쌍들의 산점도를 격자 형태로 나열한 것입니다.",
      "정답: 평행한 축들에 꺾은선으로 다변량을 표현하는 것은 평행 좌표 플롯입니다.",
      "오답: 상자 그림은 단일 변수의 사분위수와 이상치를 표현합니다.",
      "오답: 체르노프 페이스는 다변량 수치를 사람의 얼굴 표정(눈, 코, 입 크기)으로 매핑하는 기법입니다."
    ]
  },
  {
    id: "Q_PASS_480",
    subject: 4,
    chapter: "데이터 시각화 및 이상치",
    question: "[12회 기출복원] 상자그림(Boxplot)을 활용하여 이상치를 탐지할 때, 1사분위수 Q1 = 30, 3사분위수 Q3 = 70 인 데이터셋에서 정상 데이터로 판정되는 하한선과 상한선 범위로 올바른 것은?",
    choices: [
      "하한선: -30, 상한선: 130",
      "하한선: 10, 상한선: 90",
      "하한선: -10, 상한선: 110",
      "하한선: 0, 상한선: 100"
    ],
    answer: 0,
    difficulty: "medium",
    cardId: "c4-7",
    explanation: "사분위범위 IQR = Q3 - Q1 = 70 - 30 = 40 입니다. 하한선 = Q1 - 1.5×IQR = 30 - (1.5 × 40) = 30 - 60 = -30, 상한선 = Q3 + 1.5×IQR = 70 + (1.5 × 40) = 70 + 60 = 130 입니다.",
    memorizationPoint: "IQR = Q3 - Q1 / 하한선 = Q1 - 1.5×IQR / 상한선 = Q3 + 1.5×IQR",
    examinerTip: "1.5 × IQR을 계산한 뒤, 반드시 Q1에서는 빼주고 Q3에서는 더해주어야 한다는 점을 실수하지 않도록 주의하세요!",
    whyWrong: [
      "정답: IQR=40, 하한 = 30 - 60 = -30, 상한 = 70 + 60 = 130 입니다.",
      "오답: 1.5가 아니라 0.5를 곱한 오류입니다.",
      "오답: IQR을 잘못 계산한 오류입니다.",
      "오답: 단순 1.0 IQR을 적용한 오류입니다."
    ]
  },
  {
    id: "Q_PASS_481",
    subject: 4,
    chapter: "데이터 시각화",
    question: "[12회 기출복원] 데이터 분석 결과를 대중이나 의사결정권자에게 효과적으로 전달하기 위해 텍스트, 이미지, 그래프, 다이어그램을 감각적으로 결합하여 정보를 한눈에 파악할 수 있도록 디자인한 시각화 형태는?",
    choices: [
      "히스토그램 (Histogram)",
      "인포그래픽 (Infographic)",
      "줄기-잎 그림 (Stem-and-Leaf Plot)",
      "QQ-플롯 (Quantile-Quantile Plot)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c4-7",
    explanation: "인포그래픽(Infographic)은 Information과 Graphic의 합성어로, 복잡한 통계 수치나 프로세스를 스토리텔링과 시각적 그래픽 요소를 융합하여 누구나 직관적으로 이해할 수 있도록 전달하는 종합 시각화 산출물입니다.",
    memorizationPoint: "정보(Information) + 그래픽(Graphic) 융합 시각화 = 인포그래픽(Infographic)",
    examinerTip: "인포그래픽은 단순 차트 그리기를 넘어 메시지 전달력과 스토리텔링을 극대화하는 시각화 기법입니다.",
    whyWrong: [
      "오답: 히스토그램은 연속형 데이터의 도수분포를 나타내는 막대그래프입니다.",
      "정답: 그래픽과 텍스트를 종합 디자인한 시각화는 인포그래픽입니다.",
      "오답: 줄기-잎 그림은 수치를 줄기와 잎으로 분해하여 빈도를 나타낸 표입니다.",
      "오답: QQ-플롯은 데이터의 정규성 만족 여부를 시각적으로 진단하는 그래프입니다."
    ]
  },
  {
    id: "Q_PASS_482",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    question: "[12회 기출복원] 희귀 암 환자 진단이나 화재 감지와 같이 '실제 Positive 환자를 Negative로 잘못 예측(FN)'하는 것이 매우 치명적이어서, 정밀도(Precision)보다 재현율(Recall)에 2배의 가중치를 두어 평가하고자 할 때 사용하는 F-베타 지표는?",
    choices: [
      "F_0.5 Score",
      "F_1 Score",
      "F_2 Score",
      "F_β (β = 0)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c4-2",
    explanation: "F_β Score 공식에서 β는 재현율(Recall)에 부여하는 상대적 가중치입니다. β > 1이면 재현율을 더 중요시하며, 재현율에 2배의 가중치를 부여하는 지표는 F_2 Score 입니다. (반대로 스팸 메일처럼 정밀도가 더 중요하면 F_0.5를 사용합니다.)",
    memorizationPoint: "F1 = 동등 가중(조화평균) / F2 = 재현율 2배 중시(암 진단) / F0.5 = 정밀도 2배 중시(스팸 필터)",
    examinerTip: "β = 1 이면 F1-Score(조화평균), β = 2 이면 재현율 2배(FN 최소화), β = 0.5 이면 정밀도 2배(FP 최소화)입니다.",
    whyWrong: [
      "오답: F_0.5는 정밀도를 2배 중시하는 지표입니다.",
      "오답: F_1은 정밀도와 재현율을 1:1 동등하게 조화평균한 지표입니다.",
      "정답: 재현율에 2배 가중치를 부여하는 지표는 F_2 Score입니다.",
      "오답: β=0은 정밀도만 반영하는 형태입니다."
    ]
  },
  {
    id: "Q_PASS_483",
    subject: 4,
    chapter: "교차 검증 및 평가",
    question: "[12회 기출복원] 데이터셋의 크기가 N개로 매우 작을 때, N-1개의 샘플로 모델을 훈련하고 나머지 단 1개의 샘플로 검증하는 과정을 총 N번 반복하여 성능을 평균 내는 교차 검증 기법은?",
    choices: [
      "K-Fold 교차 검증 (K-Fold Cross Validation)",
      "계층별 K-Fold (Stratified K-Fold)",
      "LOOCV (Leave-One-Out Cross Validation)",
      "홀드아웃 (Hold-out Validation)"
    ],
    answer: 2,
    difficulty: "easy",
    cardId: "c4-3",
    explanation: "LOOCV(Leave-One-Out Cross Validation)는 전체 샘플 수 N에 대해 K=N으로 설정하여 매번 1개의 샘플만 검증에 사용하는 극단적인 K-Fold 교차 검증 기법으로, 데이터 수가 매우 적을 때 편향 없이 검증하기 위해 사용됩니다.",
    memorizationPoint: "샘플 1개만 검증용으로 빼놓고 N번 반복 학습 = LOOCV (Leave-One-Out CV)",
    examinerTip: "LOOCV는 거의 모든 데이터를 학습에 사용하므로 편향(Bias)이 매우 낮으나, N번 모델을 훈련해야 하므로 연산 비용이 매우 큽니다.",
    whyWrong: [
      "오답: K-Fold는 데이터를 K개의 동일 크기 폴드로 분할합니다.",
      "오답: Stratified K-Fold는 타겟 클래스 비율을 유지하며 K개로 분할합니다.",
      "정답: 1개만 검증용으로 남기는 기법은 LOOCV입니다.",
      "오답: 홀드아웃은 데이터를 단순히 Train과 Test로 1회 분할합니다."
    ]
  },
  {
    id: "Q_PASS_484",
    subject: 4,
    chapter: "교차 검증 및 평가",
    question: "[12회 기출복원] 전체 데이터셋에서 지정된 비율(예: 70% 학습, 30% 검증)로 무작위 샘플링하여 학습과 검증을 분할하는 과정을 무작위로 여러 번(예: 50회) 반복 수행하여 평균 성능을 산출하는 교차 검증 기법은?",
    choices: [
      "랜덤 서브 샘플링 교차 검증 (Random Sub-sampling / Monte Carlo CV)",
      "부트스트랩 (Bootstrap)",
      "시계열 교차 검증 (Time Series Split)",
      "LOOCV"
    ],
    answer: 0,
    difficulty: "medium",
    cardId: "c4-3",
    explanation: "랜덤 서브 샘플링(Random Sub-sampling CV, 몬테카를로 교차검증)은 K-Fold와 달리 데이터를 겹치지 않는 폴드로 쪼개지 않고, 매 반복마다 무작위로 Train/Test 세트를 독립적으로 샘플링하여 성능을 평가하는 방법입니다.",
    memorizationPoint: "지정된 비율로 무작위 분할을 N회 반복 = 랜덤 서브 샘플링 (Monte Carlo CV)",
    examinerTip: "K-Fold는 모든 샘플이 정확히 1번씩만 검증에 사용되지만, 랜덤 서브 샘플링은 특정 샘플이 검증에 여러 번 포함되거나 전혀 포함되지 않을 수 있습니다.",
    whyWrong: [
      "정답: 무작위 독립 분할을 다회 반복하는 것은 랜덤 서브 샘플링 교차검증입니다.",
      "오답: 부트스트랩은 복원 추출을 기반으로 하는 샘플링 기법입니다.",
      "오답: 시계열 교차 검증은 시간 순서를 유지하며 점진적으로 훈련 기간을 늘려가는 기법입니다.",
      "오답: LOOCV는 K=N인 교차검증입니다."
    ]
  },
  {
    id: "Q_PASS_485",
    subject: 4,
    chapter: "하이퍼파라미터 최적화",
    question: "[12회 기출복원] 머신러닝 하이퍼파라미터 튜닝 기법 중, 이전 하이퍼파라미터 탐색 결과의 성능을 바탕으로 사후 확률 대리 모델(Surrogate Model, 가우시안 프로세스 등)을 지속적으로 갱신하여 최적의 파라미터를 똑똑하게 찾아가는 최적화 기법은?",
    choices: [
      "그리드 서치 (Grid Search)",
      "랜덤 서치 (Random Search)",
      "베이지안 최적화 (Bayesian Optimization)",
      "수동 튜닝 (Manual Tuning)"
    ],
    answer: 2,
    difficulty: "medium",
    cardId: "c4-5",
    explanation: "베이지안 최적화(Bayesian Optimization)는 이전 시도들의 입력값과 출력 성능을 기반으로 목적 함수의 형태를 확률적으로 추정(대리 모델)하고, 탐색(Exploration)과 활용(Exploitation)의 균형을 맞추어 최소의 시도로 최적 하이퍼파라미터를 찾는 고도화된 기법입니다.",
    memorizationPoint: "이전 탐색 결과 기반 확률 대리 모델 갱신 ➔ 베이지안 최적화 (Bayesian Optimization)",
    examinerTip: "모든 격자 조합을 다 해보는 것은 Grid Search, 무작위 추출은 Random Search, 확률 모델 기반 똑똑한 탐색은 Bayesian Optimization입니다.",
    whyWrong: [
      "오답: 그리드 서치는 사전에 지정한 모든 격자 조합을 완전 탐색합니다.",
      "오답: 랜덤 서치는 하이퍼파라미터 공간에서 무작위로 조합을 추출합니다.",
      "정답: 이전 결과를 학습하여 대리 모델을 갱신하는 기법은 베이지안 최적화입니다.",
      "오답: 수동 튜닝은 사람이 직접 값을 변경해보는 방식입니다."
    ]
  },
  {
    id: "Q_PASS_486",
    subject: 4,
    chapter: "회귀 vs 분류 모델 비교",
    question: "[12회 기출복원] 머신러닝의 지도학습 문제 중 '회귀(Regression)'와 '분류(Classification)'의 본질적인 차이에 대한 설명으로 가장 올바른 것은?",
    choices: [
      "회귀는 종속변수 Y가 이산적인 범주(클래스)를 가지며 혼동행렬로 평가하고, 분류는 연속형 실수 값을 가지며 MSE로 평가한다.",
      "회귀는 종속변수 Y가 연속형 수치(실수)이며 MSE, MAE, R² 등으로 평가하고, 분류는 종속변수 Y가 이산형 범주이며 정확도, F1-Score, ROC-AUC 등으로 평가한다.",
      "회귀 모델은 과적합이 발생하지 않지만, 분류 모델은 항상 과적합이 발생한다.",
      "선형회귀는 분류 문제에만 사용되고, 로지스틱 회귀는 연속형 실수 예측에만 사용된다."
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c4-2",
    explanation: "회귀(Regression)는 연속형 수치(집값, 매출액, 온도 등)를 예측하며 오차 지표(MSE, MAE, R²)로 평가하고, 분류(Classification)는 이산형 클래스(스팸 여부, 질병 유무, 품종 등)를 예측하며 혼동행렬 지표(Accuracy, Precision, Recall, F1, ROC)로 평가합니다.",
    memorizationPoint: "회귀: 연속형 Y ➔ 오차(MSE, MAE, R²) / 분류: 범주형 Y ➔ 혼동행렬(F1, ROC-AUC)",
    examinerTip: "로지스틱 회귀(Logistic Regression)는 이름에 '회귀'가 들어가지만 실제로는 0과 1의 클래스를 분류하는 **분류 전용 모델**이라는 점을 반드시 기억하세요!",
    whyWrong: [
      "오답: 회귀와 분류의 타겟 변수와 평가지표가 서로 뒤바뀌었습니다.",
      "정답: 회귀는 연속형 수치와 MSE, 분류는 이산형 범주와 혼동행렬/F1 지표를 사용합니다.",
      "오답: 두 모델 모두 과적합이 발생할 수 있습니다.",
      "오답: 로지스틱 회귀는 분류 모델이며, 선형회귀는 수치 예측 회귀 모델입니다."
    ]
  },
  {
    id: "Q_PASS_487",
    subject: 4,
    chapter: "모형 모니터링 및 유지보수",
    question: "[12회 기출복원] 실제 운영 환경에 배포된 머신러닝 모델이 시간이 지남에 따라 고객 성향 변화나 거시 경제 환경 변화로 인해 데이터의 확률 분포가 변경되어 예측 성능이 저하되는 현상과 그에 대한 대응책으로 올바른 것은?",
    choices: [
      "데이터 누수(Data Leakage) 현상이며, 해결을 위해 하이퍼파라미터 탐색 범위를 고정한다.",
      "데이터 드리프트(Data Drift / Concept Drift) 현상이며, 성능 모니터링을 통해 주기적으로 최신 데이터로 모형을 재학습(Remodeling)해야 한다.",
      "다중공선성 현상이며, 주성분 분석(PCA)을 1회 수행한 후 영구적으로 모델을 유지한다.",
      "과소적합 현상이며, 훈련 데이터셋의 크기를 10% 미만으로 대폭 줄여야 한다."
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c4-6",
    explanation: "배포된 모델의 입력 데이터 분포가 변하는 현상을 데이터 드리프트(Data Drift), 입력과 출력 간의 관계가 변하는 것을 개념 드리프트(Concept Drift)라고 합니다. 이를 해결하기 위해 지속적인 성능 모니터링과 주기적 모형 재학습(Remodeling) 파이프라인이 필수적입니다.",
    memorizationPoint: "시간 경과에 따른 데이터 분포 변화 = 데이터 드리프트 (해결: 모델 재학습 Remodeling)",
    examinerTip: "모델은 한 번 배포하고 끝나는 것이 아니라 지속적인 MLOps 모니터링과 데이터 드리프트 감지 및 리모델링이 필요합니다.",
    whyWrong: [
      "오답: 데이터 누수는 Train/Test 분할 전 전처리 오류입니다.",
      "정답: 시간 경과에 따른 분포 변화는 데이터 드리프트이며 재학습이 해결책입니다.",
      "오답: 다중공선성은 독립변수 간 상관관계 문제입니다.",
      "오답: 과소적합 해결책이 아닙니다."
    ]
  },
  {
    id: "Q_PASS_488",
    subject: 4,
    chapter: "데이터 누수 및 검증 오류",
    question: "[12회 기출복원] 머신러닝 모델링 과정에서 훈련 데이터(Train)와 테스트 데이터(Test)를 분할하기 전에, 전체 데이터셋에 대해 결측치 평균 대치나 Min-Max 스케일링을 먼저 수행하여 발생하는 심각한 실무 오류는?",
    choices: [
      "차원의 저주 (Curse of Dimensionality)",
      "데이터 누수 (Data Leakage)",
      "기울기 소실 (Vanishing Gradient)",
      "다중공선성 (Multicollinearity)"
    ],
    answer: 1,
    difficulty: "easy",
    cardId: "c4-3",
    explanation: "데이터 누수(Data Leakage)는 모델이 실제 서비스(Test) 환경에서 절대 알 수 없는 미래의 정보나 테스트 데이터의 통계량(평균, 최대값 등)이 훈련 과정에 유출되는 현상입니다. 분할 전에 스케일링이나 대치를 수행하면 테스트 데이터의 정보가 스케일링 기준에 스며들게 되므로 치명적인 누수가 발생합니다.",
    memorizationPoint: "Train/Test 분할 전 전체 데이터 스케일링/대치 수행 = 치명적인 데이터 누수(Data Leakage)",
    examinerTip: "반드시 Train 데이터셋으로만 fit(평균/표준편차 계산)을 수행하고, Test 데이터에는 Train에서 구한 기준으로 transform만 수행해야 누수를 막을 수 있습니다.",
    whyWrong: [
      "오답: 차원의 저주는 변수가 너무 많아 공간이 희소해지는 현상입니다.",
      "정답: 테스트 데이터 정보가 사전 유출되는 현상은 데이터 누수(Data Leakage)입니다.",
      "오답: 기울기 소실은 심층 신경망 역전파 시 기울기가 0이 되는 현상입니다.",
      "오답: 다중공선성은 독립변수 간 강한 상관관계 문제입니다."
    ]
  }
];

// cbtData에 신규 문제들 추가
new12thQuestions.forEach(q => {
  const existIdx = cbtData.questions.findIndex(item => item.id === q.id);
  if (existIdx >= 0) {
    cbtData.questions[existIdx] = q;
  } else {
    cbtData.questions.push(q);
  }
});

fs.writeFileSync(cbtPath, JSON.stringify(cbtData, null, 2), 'utf8');
console.log(`[cbt_bank.json] Successfully injected 40 comprehensive 12th exam restoration questions! Total quizzes now: ${cbtData.questions.length}`);
