const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'cbt_bank.json');
const rawData = fs.readFileSync(bankPath, 'utf8');
const bank = JSON.parse(rawData);

const massiveQuestions = [
  // ==========================================
  // [제1과목] 빅데이터 분석 기획 (8문항: Q_PASS_111 ~ 118)
  // ==========================================
  {
    id: "Q_PASS_111",
    subject: 1,
    chapter: "빅데이터의 이해",
    sectionId: "s1-1",
    cardId: "c1-4",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 분산 데이터베이스 시스템의 특성을 설명하는 CAP 정리(Brewer's CAP Theorem)와 NoSQL 데이터베이스에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "일관성(Consistency): 분산 시스템의 모든 노드는 어느 시점에 접근하더라도 항상 동일하고 최신의 데이터를 조회할 수 있어야 한다.",
      "가용성(Availability): 분산 시스템 내의 일부 노드에 장애가 발생하더라도 모든 정상 노드는 항상 요청에 대해 오류 없이 응답해야 한다.",
      "분할 허용성(Partition Tolerance): 네트워크 단절이나 노드 간 통신 장애(Partition)가 발생하더라도 전체 시스템이 정상적으로 동작해야 한다.",
      "CAP 정리에 따르면 고도로 발달된 분산 트랜잭션 프로토콜(2-Phase Commit 등)을 적용하면 분산 환경에서도 일관성(C), 가용성(A), 분할 허용성(P)의 3가지 속성을 동시에 100% 완벽하게 만족시킬 수 있다."
    ],
    answer: 3,
    explanation: "CAP 정리에 따르면, 분산 네트워크 환경에서는 네트워크 장애(Partition)가 불가피하게 발생하므로 **일관성(Consistency), 가용성(Availability), 분할 허용성(Partition Tolerance)의 3가지 속성을 동시에 모두 만족하는 분산 시스템은 존재할 수 없습니다.** 분할 허용성(P)을 전제로 할 때 CP(일관성+분할허용) 또는 AP(가용성+분할허용) 중 하나를 절충(Trade-off)해야 합니다.\n\n💡 실제 기출 포인트: CAP 정리의 3대 요소 정의와 '3가지를 동시 만족할 수 없다'는 기본 정리는 NoSQL 및 분산 DB 영역의 대표 킬러 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. Consistency는 데이터의 일치성을 뜻합니다.",
      "올바른 설명입니다. Availability는 중단 없는 서비스 응답성을 뜻합니다.",
      "올바른 설명입니다. Partition Tolerance는 네트워크 분할 장애 허용성입니다.",
      "정답입니다. CAP 정리는 분산 시스템에서 3가지를 동시에 모두 만족하는 것이 수학적으로 불가능함을 증명한 정리입니다."
    ],
    memorizationPoint: "CAP 정리: C(일관성), A(가용성), P(분할허용성) 중 최대 2가지만 동시 만족 가능 (NoSQL은 주로 BASE / AP 또는 CP 구조 채택)",
    examinerTip: "💡 출제위원 함정: '최신 기술을 쓰면 CAP 3가지를 모두 달성할 수 있다'는 지문은 100% 오답입니다."
  },
  {
    id: "Q_PASS_112",
    subject: 1,
    chapter: "빅데이터 기술 및 제도",
    sectionId: "s1-2",
    cardId: "c1-7",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 빅데이터 실시간/배치 처리 아키텍처인 '람다 아키텍처(Lambda Architecture)'와 '카파 아키텍처(Kappa Architecture)'에 대한 비교 설명으로 옳은 것은?",
    choices: [
      "람다 아키텍처는 배치 레이어(Batch Layer), 서빙 레이어(Serving Layer), 스피드 레이어(Speed Layer)의 3개 계층으로 구성된다.",
      "람다 아키텍처는 배치 처리와 실시간 처리에 완전히 동일한 단일 코드베이스와 프레임워크를 사용하므로 코드 유지보수가 매우 단순하다.",
      "카파 아키텍처는 람다 아키텍처의 스피드 레이어를 완전히 제거하고 오직 배치 레이어(Hadoop MapReduce)만으로 모든 데이터를 처리하는 구조이다.",
      "람다 아키텍처의 배치 레이어는 실시간으로 유입되는 최근 몇 초간의 데이터를 인메모리 스트리밍으로 즉시 집계하여 지연 시간을 0으로 만든다."
    ],
    answer: 0,
    explanation: "1) **람다 아키텍처 (Lambda):** 대용량 원천 데이터를 저장하고 전체 집계를 수행하는 **배치 레이어(Batch)** + 실시간 최근 데이터를 처리하는 **스피드 레이어(Speed)** + 두 레이어의 결과를 결합하여 쿼리에 응답하는 **서빙 레이어(Serving)** 3계층 구조를 갖습니다.\n2) 람다 아키텍처의 단점은 배치(MapReduce/Spark)와 실시간(Storm/Flink)의 코드를 **이원화하여 중복 개발/유지보수**해야 한다는 점입니다.\n3) 이를 해결하기 위해 제이 크렙스(Jay Kreps)가 제안한 **카파 아키텍처 (Kappa)**는 배치 레이어를 없애고 **모든 데이터를 Kafka와 같은 로그 큐 기반의 단일 '스트림 처리 엔진'으로만 일원화**하여 처리합니다.\n\n💡 실제 기출 포인트: 람다 3계층(배치-스피드-서빙)과 카파의 단일 스트림 처리 구조의 차이를 묻는 최신 플랫폼 문제입니다.",
    whyWrong: [
      "정답입니다. 람다 아키텍처는 배치, 스피드, 서빙 3대 계층으로 구성됩니다.",
      "람다의 가장 큰 단점은 배치와 실시간 로직을 서로 다른 엔진으로 이중 구현해야 하는 복잡성입니다.",
      "카파 아키텍처는 배치 레이어를 제거하고 '스트림 레이어'만으로 단일화한 구조입니다.",
      "실시간 최근 데이터를 처리하는 것은 배치 레이어가 아니라 '스피드 레이어'입니다."
    ],
    memorizationPoint: "람다 아키텍처 = 배치 레이어 + 스피드 레이어 + 서빙 레이어 (코드 이원화 단점) / 카파 아키텍처 = 배치 제거, 단일 스트림 엔진 일원화",
    examinerTip: "💡 출제위원 꿀팁: '람다(3계층: 배치+스피드+서빙)' vs '카파(단일 스트림)'의 구조 키워드를 정확히 기억하세요."
  },
  {
    id: "Q_PASS_113",
    subject: 1,
    chapter: "데이터분석 계획",
    sectionId: "s1-3",
    cardId: "c1-9",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 분석 대상(What)과 분석 방법(How)의 인지 여부에 따른 4가지 분석 기획 유형 매칭으로 옳은 것은?\n\n[사분면 매핑]\n- A: 분석 대상(What)을 알고, 분석 방법(How)도 알고 있는 경우\n- B: 분석 대상(What)은 알고 있으나, 분석 방법(How)을 모르는 경우\n- C: 분석 대상(What)은 모르지만, 분석 방법(How)은 알고 있는 경우\n- D: 분석 대상(What)도 모르고, 분석 방법(How)도 모르는 경우",
    choices: [
      "A: Optimization(최적화) / B: Solution(솔루션) / C: Insight(통찰) / D: Discovery(발견)",
      "A: Solution(솔루션) / B: Optimization(최적화) / C: Discovery(발견) / D: Insight(통찰)",
      "A: Optimization(최적화) / B: Insight(통찰) / C: Solution(솔루션) / D: Discovery(발견)",
      "A: Discovery(발견) / B: Solution(솔루션) / C: Insight(통찰) / D: Optimization(최적화)"
    ],
    answer: 0,
    explanation: "분석 과제 4가지 유형 (What vs How):\n1) **Optimization (최적화):** 대상(What) 알고, 방법(How) 안다 ➔ 기존 프로세스 효율 극대화\n2) **Solution (솔루션):** 대상(What) 알고, 방법(How) 모른다 ➔ 솔루션을 찾아 해결\n3) **Insight (통찰):** 대상(What) 모르고, 방법(How) 안다 ➔ 보유 기술로 새로운 통찰 발견\n4) **Discovery (발견):** 대상(What) 모르고, 방법(How) 모른다 ➔ 탐색적으로 문제와 방법 동시 발굴\n\n💡 실제 기출 포인트: 1과목 기획에서 거의 매회 출제되는 100% 필수 득점 문제입니다.",
    whyWrong: [
      "정답입니다. A: 최적화, B: 솔루션, C: 통찰, D: 발견.",
      "A와 B가 뒤바뀌었습니다.",
      "B와 C가 뒤바뀌었습니다.",
      "A와 D가 뒤바뀌었습니다."
    ],
    memorizationPoint: "What 알고 How 안다 = 최적화(Optimization) / What 알고 How 모른다 = 솔루션(Solution) / What 모르고 How 안다 = 통찰(Insight) / 둘 다 모른다 = 발견(Discovery)",
    examinerTip: "💡 출제위원 꿀팁: 'How를 모르면 솔루션을 찾아야 한다(Solution)', 'What을 모르면 통찰을 얻어야 한다(Insight)'로 연상하면 헷갈리지 않습니다."
  },
  {
    id: "Q_PASS_114",
    subject: 1,
    chapter: "데이터 수집 및 저장 계획",
    sectionId: "s1-4",
    cardId: "c1-11",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 데이터 품질 관리 표준(ISO/IEC 25012 및 DQC-V)에서 정의하는 데이터 품질 차원(Quality Dimension)과 그 설명의 연결이 올바르지 않은 것은?",
    choices: [
      "정확성(Accuracy): 데이터의 값이 실제 세계의 참값과 정확하게 일치하는 정도",
      "완전성(Completeness): 필요한 데이터 항목이 누락되지 않고 필수적으로 채워져 있는 정도",
      "일관성(Consistency): 서로 다른 시스템이나 데이터베이스 간에 동일한 의미의 데이터가 모순 없이 일치하는 정도",
      "유효성(Validity): 데이터가 요구되는 최신의 시점에 맞추어 지연 없이 적시에 제공되는 정도"
    ],
    answer: 3,
    explanation: "데이터가 요구되는 최신의 시점에 맞추어 지연 없이 적시에 제공되는 품질 차원은 **'적시성(Timeliness / Currency)'**입니다. **'유효성(Validity)'**은 데이터의 형식, 범위, 도메인 규칙(예: 전화번호 형식, 이메일 @ 기호 포함, 성별 M/F)을 올바르게 준수하고 있는지를 의미합니다.\n\n💡 실제 기출 포인트: 데이터 품질 6대 차원(정확성, 완전성, 일관성, 유효성, 적시성, 유일성)의 개념 정의 매핑 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. Accuracy는 참값과의 일치도입니다.",
      "올바른 설명입니다. Completeness는 결측(누락)이 없는 정도입니다.",
      "올바른 설명입니다. Consistency는 모순(충돌)이 없는 일치성입니다.",
      "정답입니다. 적시 제공 여부는 '적시성'이며, 유효성은 도메인/형식 규칙 준수 여부입니다."
    ],
    memorizationPoint: "품질 차원: 정확성(참값 일치), 완전성(누락 없음), 일관성(모순 없음), 유효성(형식/도메인 규칙 준수), 적시성(최신 시점 제공)",
    examinerTip: "💡 출제위원 함정: '유효성'과 '적시성'을 바꾸어 설명하는 보기가 가장 흔한 오답 함정입니다."
  },
  {
    id: "Q_PASS_115",
    subject: 1,
    chapter: "데이터 수집 및 저장 계획",
    sectionId: "s1-4",
    cardId: "c1-19",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 데이터 저장소의 유형인 데이터 웨어하우스(DW), 데이터 마트(DM), 데이터 레이크(Data Lake)의 특징 비교 중 가장 옳지 않은 것은?",
    choices: [
      "데이터 웨어하우스(DW): 전사적 관점에서 주제 중심적(Subject-oriented), 통합적(Integrated), 시계열적(Time-variant), 비휘발성(Non-volatile) 데이터를 저장한다.",
      "데이터 마트(DM): 특정 부서나 특정 주제(예: 마케팅, 재무)의 분석 요구에 맞추어 DW로부터 구축된 소규모 데이터 저장소이다.",
      "데이터 레이크(Data Lake): 정형 데이터뿐만 아니라 로그, 이미지, 음성 등 비정형/반정형 데이터를 원본(Raw) 형태 그대로 대규모로 저장하는 저장소이다.",
      "데이터 레이크는 데이터를 저장하는 시점에 미리 엄격한 스키마(Schema-on-Write)를 정의하고 정제해야만 적재가 가능하다는 제약이 있다."
    ],
    answer: 3,
    explanation: "데이터 레이크(Data Lake)는 저장 시점에 스키마를 강제하지 않는 **'읽기 시점 스키마(Schema-on-Read)'** 방식을 사용하므로, 원천 데이터를 가공 없이 원본(Raw Data) 그대로 빠르게 대규모 적재할 수 있습니다. 반면, 적재 시점에 엄격한 스키마를 요구하는 것은 **'데이터 웨어하우스(DW, Schema-on-Write)'**입니다.\n\n💡 실제 기출 포인트: DW(주제중심/통합/시계열/비휘발, Schema-on-Write) vs Data Lake(원형 그대로/대용량/Schema-on-Read)의 구조적 차이 비교 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 빌 인몬(Bill Inmon)의 DW 4대 특징(주제성, 통합성, 시계열성, 비휘발성)입니다.",
      "올바른 설명입니다. DM은 특정 부서/목적별 소규모 DW입니다.",
      "올바른 설명입니다. Data Lake는 비정형 원천 데이터를 그대로 담는 호수입니다.",
      "정답입니다. 데이터 레이크는 Schema-on-Read 방식이며, Schema-on-Write는 DW의 특징입니다."
    ],
    memorizationPoint: "DW = 전사적, 정제된 정형 데이터, Schema-on-Write / Data Lake = 원본 원천(Raw), 정형+비정형 모두, Schema-on-Read",
    examinerTip: "💡 출제위원 꿀팁: 'DW 4대 특성(주제성, 통합성, 시계열성, 비휘발성)'과 'Data Lake의 Schema-on-Read'는 필수 암기 키워드입니다."
  },
  {
    id: "Q_PASS_116",
    subject: 1,
    chapter: "빅데이터 기술 및 제도",
    sectionId: "s1-2",
    cardId: "c1-14",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 온디바이스 AI(On-device AI) 및 엣지 환경에 딥러닝 모델을 배포하기 위한 '경량 딥러닝(Model Compression)' 기법에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "양자화(Quantization): 32비트 부동소수점(FP32) 가중치 및 활성화 값을 8비트 정수(INT8) 등 더 적은 비트 수로 변환하여 모델 크기를 줄이고 추론 속도를 높인다.",
      "가지치기(Pruning): 중요도가 낮은 가중치나 뉴런 간의 연결(Weight/Channel)을 0으로 제거하여 희소 행렬(Sparse Matrix)을 만듦으로써 연산량을 절감한다.",
      "지식 증류(Knowledge Distillation): 크고 복잡한 교사 모델(Teacher Model)의 지식(출력 확률 분포/Soft Target)을 작고 가벼운 학생 모델(Student Model)에 전달하여 학습시킨다.",
      "양자화를 적용하면 추론 시 메모리 사용량과 지연 시간(Latency)은 획기적으로 줄어들지만, 원본 모델에 비해 학습 파라미터(가중치)의 총 개수 자체가 줄어든다."
    ],
    answer: 3,
    explanation: "양자화(Quantization)는 각 가중치를 표현하는 **비트 정밀도(Bit-width: FP32 ➔ INT8)를 축소하여 메모리 용량과 연산 속도를 개선하는 기술**일 뿐, **가중치(파라미터)의 총 개수 자체를 줄이는 것이 아닙니다.** 가중치 개수를 줄이는 기법은 **'가지치기(Pruning)'**나 네트워크 구조 경량화(MobileNet 등)입니다.\n\n💡 실제 기출 포인트: 최신 경량화 3대장(양자화: 비트축소, 가지치기: 불필요 가중치 제거, 지식증류: Teacher-Student 지식 전수)의 작동 원리를 정확히 구별하는 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 양자화는 FP32를 INT8/FP16 등으로 축소합니다.",
      "올바른 설명입니다. 가지치기는 덜 중요한 가중치 연결을 잘라냅니다.",
      "올바른 설명입니다. 지식 증류는 Teacher 모델의 Soft Label을 Student가 학습합니다.",
      "정답입니다. 양자화는 비트 용량을 줄이는 것이며 파라미터 개수 자체를 삭제하는 것은 가지치기(Pruning)입니다."
    ],
    memorizationPoint: "경량화 3대 기법: 양자화(비트 축소: FP32➔INT8) / 가지치기(가중치 연결 제거) / 지식증류(Teacher➔Student 지식 전수)",
    examinerTip: "💡 출제위원 함정: '양자화가 가중치 개수를 삭제한다'는 설명은 대표적인 오답 함정입니다."
  },
  {
    id: "Q_PASS_117",
    subject: 1,
    chapter: "데이터 수집 및 저장 계획",
    sectionId: "s1-4",
    cardId: "c1-20",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 하둡 에코시스템(Hadoop Ecosystem)의 주요 오픈소스 소프트웨어와 그 핵심 기능의 매칭이 잘못된 것은?",
    choices: [
      "Apache HBase: HDFS 기반의 분산 컬럼 기반 NoSQL 데이터베이스로, 대규모 데이터셋에 대한 실시간 랜덤 읽기/쓰기를 지원한다.",
      "Apache Zookeeper: 분산 환경에서 분산 락, 노드 상태 관리, 네임서비스 등 분산 코디네이션 서비스를 제공한다.",
      "Apache Hive: SQL과 유사한 쿼리 언어(HiveQL)를 제공하여 HDFS에 저장된 대용량 데이터를 구조적으로 조회하고 분석할 수 있는 데이터 웨어하우스 도구이다.",
      "Apache Oozie: 분산 환경에서 발생하는 대용량 로그 데이터를 실시간으로 수집하여 싱크(Sink)로 전송하는 로그 전용 수집기이다."
    ],
    answer: 3,
    explanation: "Apache Oozie는 로그 수집기가 아니라, **하둡 잡(MapReduce, Pig, Hive, Spark 등)의 실행 흐름을 제어하고 관리하는 '워크플로우 스케줄러(Workflow Scheduler) 시스템'**입니다. 로그 전용 수집기는 **'Apache Flume'** 또는 Chukwa, Scribe 등입니다.\n\n💡 실제 기출 포인트: 하둡 에코시스템의 주요 구성원(HBase, Zookeeper, Hive, Oozie, Flume, Sqoop, Mahout 등)의 역할을 묻는 문제는 단골 출제 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. HBase는 HDFS 위의 분산 NoSQL입니다.",
      "올바른 설명입니다. Zookeeper는 분산 코디네이터입니다.",
      "올바른 설명입니다. Hive는 하둡용 SQL DW 인터페이스입니다.",
      "정답입니다. Oozie는 워크플로우 스케줄러이며, 로그 수집기는 Flume입니다."
    ],
    memorizationPoint: "하둡 에코: Zookeeper(코디네이션), HBase(분산NoSQL), Hive(SQL 쿼리), Oozie(워크플로우 스케줄러), Flume(로그 수집), Sqoop(RDBMS 연동)",
    examinerTip: "💡 출제위원 꿀팁: Oozie(우지) = 스케줄러/워크플로우, Flume(플룸) = 로그 수집이라는 매핑을 확실히 기억하세요."
  },
  {
    id: "Q_PASS_118",
    subject: 1,
    chapter: "빅데이터의 이해",
    sectionId: "s1-1",
    cardId: "c1-6",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 데이터 사이언티스트가 갖추어야 할 3대 핵심 역량 영역(하드 스킬 & 소프트 스킬)에 해당하지 않는 것은?",
    choices: [
      "수학 및 통계학적 지식 (Mathematics & Statistics)",
      "컴퓨터 공학 및 IT 역량 (Computer Science & Machine Learning)",
      "해당 도메인 지식 및 비즈니스 통찰력 (Domain Knowledge & Business Acumen)",
      "전통적 회계 장부 수기 작성 및 세무 대리 능력 (Bookkeeping & Tax Accounting)"
    ],
    answer: 3,
    explanation: "데이터 사이언티스트의 3대 역량(Drew Conway의 데이터 사이언스 벤 다이어그램)은 다음과 같습니다:\n1) 컴퓨터 과학 / IT 기술 (Hacking Skills: 프로그래밍, 데이터 엔지니어링)\n2) 수학 및 통계학 지식 (Math & Statistics: 머신러닝 알고리즘, 모델링)\n3) 비즈니스 도메인 지식 (Substantive Expertise: 문제 정의, 전략적 해석, 커뮤니케이션)\n\n단순 회계 장부 수기 작성은 데이터 사이언스의 핵심 역량이 아닙니다.\n\n💡 실제 기출 포인트: 데이터 사이언티스트의 다학제적(Interdisciplinary) 3대 역량(IT, 통계, 도메인)을 묻는 기본 득점 문제입니다.",
    whyWrong: [
      "핵심 역량에 해당합니다 (통계/수학 모델링).",
      "핵심 역량에 해당합니다 (IT/알고리즘 구현).",
      "핵심 역량에 해당합니다 (도메인 이해 및 비즈니스 가치 창출).",
      "정답입니다. 데이터 사이언스의 3대 역량에 해당하지 않습니다."
    ],
    memorizationPoint: "데이터 사이언스 3대 축: IT 기술(컴퓨터공학) + 수학/통계학 + 비즈니스 도메인 지식",
    examinerTip: "💡 출제위원 꿀팁: 데이터 사이언스는 단순히 코딩만 잘하는 것이 아니라 '비즈니스 도메인 통찰력'이 반드시 결합되어야 한다는 점이 기출 포인트입니다."
  },

  // ==========================================
  // [제2과목] 빅데이터 탐색 (8문항: Q_PASS_211 ~ 218)
  // ==========================================
  {
    id: "Q_PASS_211",
    subject: 2,
    chapter: "데이터 정제",
    sectionId: "s2-1",
    cardId: "c2-6",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 데이터 측정 척도(Measurement Scale)의 4가지 유형(명목, 순서, 등간, 비율 척도)에 대한 설명으로 옳은 것은?",
    choices: [
      "명목 척도(Nominal): 속성의 서열(순위) 정보를 포함하고 있어 덧셈과 뺄셈 연산이 가능하다.",
      "순서 척도(Ordinal): 대상의 범주 구분뿐만 아니라 순위(서열)를 나타내며, 순위 간의 간격(차이)이 항상 수학적으로 일정하다.",
      "등간 척도(Interval): 속성의 간격이 동일하지만 '절대적 영점(Absolute Zero)'이 존재하지 않아 비율(곱셈/나눗셈) 계산이 불가능하다.",
      "비율 척도(Ratio): 절대 영점이 존재하지 않으며, 대표적인 예로 섭씨 온도(℃)와 지능지수(IQ)가 있다."
    ],
    answer: 2,
    explanation: "1) **명목 척도:** 단순 구분/분류 (예: 성별, 혈액형, 지역) ➔ 최빈값만 가능, 사칙연산 불가.\n2) **순서 척도:** 순위 관계 포함 (예: 학점 A/B/C, 만족도 상/중/하, 직급) ➔ 서열은 알 수 있으나 간격이 균등하지 않음.\n3) **등간 척도:** 간격이 일정함 (예: 섭씨 온도 ℃, IQ 지수, 연도) ➔ 절대 영점이 없으므로 덧셈/뺄셈은 가능하나 곱셈/비율 계산 불가 (20℃가 10℃보다 2배 더운 것이 아님).\n4) **비율 척도:** **절대 영점(0 = 아무것도 없음)** 존재 (예: 키, 몸무게, 소득, 가격, 나이) ➔ 모든 사칙연산 및 비율 계산 가능.\n\n💡 실제 기출 포인트: 4대 척도의 특성과 연산 가능 범위(명목➔순서➔등간➔비율)는 2과목의 단골 기초 문제입니다.",
    whyWrong: [
      "명목 척도는 단순 분류용이며 덧셈/뺄셈이 불가능합니다.",
      "순서 척도는 순위만 알 수 있을 뿐 항목 간의 간격이 일정하지 않습니다.",
      "정답입니다. 등간 척도는 절대 영점이 없어 비율(곱셈) 연산이 불가능합니다 (섭씨 온도가 대표적 예).",
      "섭씨 온도와 IQ는 등간 척도의 예이며, 비율 척도는 절대 영점이 존재합니다."
    ],
    memorizationPoint: "척도 4단계: 명목(구분) ➔ 순서(서열) ➔ 등간(간격 일정, 절대영점X, 덧/뺄셈) ➔ 비율(절대영점O, 사칙연산 모두 가능, 키/몸무게/소득)",
    examinerTip: "💡 출제위원 함정: '온도(℃)와 IQ'는 비율 척도가 아닌 '등간 척도'라는 점이 매회 시험에 나오는 최고 빈출 함정입니다."
  },
  {
    id: "Q_PASS_212",
    subject: 2,
    chapter: "데이터 결측값 및 이상값 처리",
    sectionId: "s2-2",
    cardId: "c2-9",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 결측치(Missing Value) 대체 기법 중 '다중 대체법(MICE: Multiple Imputation by Chained Equations)'의 3단계 처리 절차를 올바른 순서대로 나열한 것은?",
    choices: [
      "대체(Imputation) 단계 ➔ 분석(Analysis) 단계 ➔ 결합(Pooling) 단계",
      "분석(Analysis) 단계 ➔ 대체(Imputation) 단계 ➔ 결합(Pooling) 단계",
      "대체(Imputation) 단계 ➔ 결합(Pooling) 단계 ➔ 분석(Analysis) 단계",
      "탐색(Exploration) 단계 ➔ 대치(Imputation) 단계 ➔ 검증(Validation) 단계"
    ],
    answer: 0,
    explanation: "다중 대체법(Multiple Imputation)의 3단계 표준 프로세스:\n1) **대체 단계 (Imputation Step):** 결측치가 포함된 데이터셋으로부터 확률적 분포를 반영하여 $m$개의 완전한 가상 데이터셋을 생성\n2) **분석 단계 (Analysis Step):** $m$개의 각 대체 데이터셋에 대해 독립적으로 통계 분석 또는 모델링 수행\n3) **결합 단계 (Pooling Step):** $m$개의 분석 결과(추정치 및 표준오차)를 루빈의 규칙(Rubin's Rules)에 따라 하나로 결합하여 최종 결론 도출\n\n💡 실제 기출 포인트: 다중대체법의 3단계(대체 ➔ 분석 ➔ 결합) 순서와 단일대체의 불확실성 과소추정 문제를 해결한다는 이론적 배경 문제입니다.",
    whyWrong: [
      "정답입니다. 다중대체 3단계: 대체(Imputation) ➔ 분석(Analysis) ➔ 결합(Pooling).",
      "대체를 먼저 수행하여 완전한 데이터셋을 만든 후 분석해야 합니다.",
      "분석을 먼저 하고 그 결과들을 결합해야 합니다.",
      "표준 3단계 용어가 아닙니다."
    ],
    memorizationPoint: "다중대체 3단계: 1단계 대체(m개 생성) ➔ 2단계 분석(m개 모델링) ➔ 3단계 결합(Rubin's Rule로 통합)",
    examinerTip: "💡 출제위원 꿀팁: 단일 대체법(평균대치 등)은 데이터의 분산을 과소추정하는 단점이 있어 다중대체법을 쓴다는 점을 기억하세요."
  },
  {
    id: "Q_PASS_213",
    subject: 2,
    chapter: "분석 변수 처리",
    sectionId: "s2-3",
    cardId: "c2-11",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 머신러닝 변수 선택(Feature Selection)의 3가지 방식(Filter, Wrapper, Embedded)에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "필터(Filter) 방식: 머신러닝 모델 학습 이전에 통계적 척도(상관계수, 카이제곱 검정, 분산 등)를 사용하여 변수와 타겟 간의 연관성을 측정하여 선택하므로 계산 속도가 매우 빠르다.",
      "래퍼(Wrapper) 방식: 예측 모델을 직접 사용하여 변수의 부분집합을 반복적으로 평가하며, 전진 선택법(Forward Selection), 후진 소거법(Backward Elimination), 단계적 선택법(Stepwise) 등이 있다.",
      "임베디드(Embedded) 방식: 모델 학습 알고리즘 자체에 변수 선택 메커니즘이 내장되어 학습과 동시에 변수 선택이 수행되는 방식으로, Lasso(L1) 회귀와 의사결정나무(Tree-based Feature Importance)가 대표적이다.",
      "래퍼(Wrapper) 방식은 필터 방식에 비해 연산량이 매우 적어 수천 개 이상의 대규모 고차원 변수를 처리할 때 가장 먼저 권장되는 기법이다."
    ],
    answer: 3,
    explanation: "래퍼(Wrapper) 방식은 변수 부분집합을 변경할 때마다 **모델을 수없이 반복해서 학습하고 검증**해야 하므로 **계산 비용과 연산 시간이 극도로 많이 들며 과적합(Overfitting) 위험**이 큽니다. 대규모 고차원 변수에는 연산 속도가 빠른 **'필터(Filter) 방식'**을 먼저 적용하여 차원을 1차 축소하는 것이 정석입니다.\n\n💡 실제 기출 포인트: 변수선택 3대 방식(Filter: 통계적 고속, Wrapper: 모델 반복검증 고비용, Embedded: 학습 내장형)의 장단점 비교 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 필터 방식은 모델을 쓰지 않아 가장 빠릅니다.",
      "올바른 설명입니다. 래퍼 방식은 전진/후진/단계적 선택이 대표적입니다.",
      "올바른 설명입니다. 임베디드는 모델 내장형(Lasso, Random Forest 등)입니다.",
      "정답입니다. 래퍼 방식은 연산량이 가장 크고 느려 대규모 변수에는 부적합합니다."
    ],
    memorizationPoint: "변수선택: Filter(통계지표, 초고속) / Wrapper(모델 반복학습, 최고성능 but 최고비용) / Embedded(학습 내장, Lasso/Tree)",
    examinerTip: "💡 출제위원 함정: '래퍼 방식이 필터 방식보다 연산량이 적다'는 보기는 단골 오답입니다."
  },
  {
    id: "Q_PASS_214",
    subject: 2,
    chapter: "분석 변수 처리",
    sectionId: "s2-3",
    cardId: "c2-13",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 데이터 스케일링(Scaling) 및 변환 기법에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "Min-Max 스케일링(정규화): 데이터를 [0, 1] 범위로 변환하는 공식으로 $X_{new} = \frac{X - X_{min}}{X_{max} - X_{min}}$ 을 사용하며, 이상치(Outlier)에 매우 민감하다.",
      "Z-Score 표준화(Standardization): 평균을 0, 표준편차를 1로 변환하는 공식으로 $X_{new} = \frac{X - \mu}{\sigma}$ 를 사용한다.",
      "로그 변환(Log Transformation): 데이터의 분포가 오른쪽으로 꼬리가 긴(양의 왜도) 비대칭 분포일 때 분산을 안정시키고 정규분포에 가깝게 변환하기 위해 사용된다.",
      "Box-Cox 변환은 오직 음수(Negative) 값을 포함하는 데이터에만 적용할 수 있는 특수한 비선형 정규화 기법이다."
    ],
    answer: 3,
    explanation: "Box-Cox 변환은 정규분포를 따르지 않는 연속형 데이터를 정규분포에 가깝게 변환하는 모수적 변환 기법이지만, **수식 정의상 반드시 '양수(Positive, $y > 0$)' 데이터에만 적용할 수 있다는 치명적인 제약**이 있습니다. (0이나 음수가 포함된 경우 상수 $c$를 더해 양수로 만든 후 적용하거나 Yeo-Johnson 변환을 사용해야 합니다.)\n\n💡 실제 기출 포인트: Min-Max, Z-score, 로그 변환, Box-Cox 변환의 조건(양수 한정)과 목적 비교 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. Min-Max는 최솟값/최댓값을 쓰므로 이상치에 매우 취약합니다.",
      "올바른 설명입니다. 표준화 공식 $(X - \mu) / \sigma$ 입니다.",
      "올바른 설명입니다. 로그 변환은 우측 꼬리 분포(Right-skewed)의 정규화에 탁월합니다.",
      "정답입니다. Box-Cox 변환은 음수가 아닌 '양수($y > 0$)' 데이터에만 적용 가능합니다."
    ],
    memorizationPoint: "Min-Max = 0~1 범위(이상치 취약) / Z-Score = 평균0, 표준편차1 / Log 변환 = 우측 꼬리 펴기 / Box-Cox = 양수(y>0) 데이터만 적용 가능",
    examinerTip: "💡 출제위원 꿀팁: 'Box-Cox 변환은 모든 음수 데이터에도 바로 쓸 수 있다'는 보기는 단골 오답 함정입니다."
  },
  {
    id: "Q_PASS_215",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-21",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 통계적 확률분포의 종류와 그 용도에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "포아송 분포(Poisson): 일정한 시간이나 공간 단위 내에서 어떤 희귀한 사건이 발생하는 횟수를 모델링하는 이산 확률분포이다.",
      "t-분포(Student's t): 모집단의 분산(모분산)을 모를 때 표본평균의 분포를 다루며, 자유도(df)가 커질수록 표준정규분포에 수렴한다.",
      "F-분포(F-distribution): 두 독립적인 카이제곱 분포의 비율로 정의되며, 주로 세 개 이상 집단의 분산 비교(ANOVA)나 회귀 모형의 유의성 검정에 사용된다.",
      "카이제곱 분포(Chi-square): 표준정규분포를 따르는 확률변수들을 단순 합산한 분포이며, 항상 음수(-∞)에서 양수(+∞)까지의 대칭 종 모양을 갖는다."
    ],
    answer: 3,
    explanation: "카이제곱 분포는 서로 독립인 표준정규 확률변수들의 **'제곱합(Sum of Squared Variables)'**으로 정의됩니다. 제곱한 값들의 합이므로 **항상 0 이상의 양수 값($\chi^2 \ge 0$)만을 가지며, 오른쪽으로 꼬리가 긴 비대칭 형태**를 갖습니다. (자유도가 무한대로 커지면 정규분포에 근사합니다.)\n\n💡 실제 기출 포인트: t-분포(모분산 모를 때, 자유도 커지면 표준정규분포), F-분포(분산비율, ANOVA), 카이제곱분포(제곱합, 0 이상)의 수학적 정의와 형태 비교 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 포아송 분포는 단위 시간당 사건 발생 건수 모델입니다.",
      "올바른 설명입니다. t-분포는 소표본 및 모분산 미지 시 사용되며 자유도가 커지면 정규분포가 됩니다.",
      "올바른 설명입니다. F-분포는 두 분산의 비율을 검정합니다.",
      "정답입니다. 카이제곱 분포는 제곱합이므로 음수 값이 존재하지 않으며($\ge 0$), 비대칭 분포입니다."
    ],
    memorizationPoint: "확률분포: 포아송(단위시간 건수) / t-분포(모분산 모를 때 평균 검정, 자유도 커지면 정규화) / F-분포(두 분산 비율, ANOVA) / 카이제곱(제곱합, 0 이상, 범주형 검정)",
    examinerTip: "💡 출제위원 함정: '카이제곱 분포는 음수 영역을 포함한다'거나 '정규분포처럼 완벽한 대칭이다'라는 설명은 오답입니다."
  },
  {
    id: "Q_PASS_216",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s5-1",
    cardId: "c5-6",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 범주형 자료 분석에 사용되는 '카이제곱 검정(Chi-Square Test)'의 3가지 유형에 대한 설명으로 옳은 것은?",
    choices: [
      "적합도 검정(Goodness of Fit): 한 개의 범주형 변수가 이론적으로 기대되는 특정 확률분포(예: 멘델의 유전법칙, 균등분포)를 따르는지 검정한다.",
      "독립성 검정(Independence): 두 개의 독립된 집단 간에 연속형 수치 데이터의 평균이 동일한지 비교하는 검정이다.",
      "동질성 검정(Homogeneity): 세 개 이상의 연속형 변수들 간에 상관계수가 동일한지 여부를 분석하는 모수 검정이다.",
      "카이제곱 검정은 각 셀의 기대 빈도(Expected Frequency)가 5 미만인 셀이 전체의 50% 이상일 때 가장 정확한 검정력을 보인다."
    ],
    answer: 0,
    explanation: "카이제곱 검정 3대 유형:\n1) **적합도 검정 (Goodness of Fit):** 단일 범주형 변수의 관측 도수가 이론적 기대 도수 분포를 잘 따르는지 검정 (자유도 = 범주수 $k - 1$).\n2) **독립성 검정 (Independence):** 두 범주형 변수(예: 성별 vs 선호정당)가 서로 독립인지 연관되어 있는지 검정 (자유도 = $(r-1)(c-1)$).\n3) **동질성 검정 (Homogeneity):** 서로 다른 모집단(예: 20대, 30대, 40대) 간에 범주별 비율이 동일한지 검정.\n\n*(참고: 카이제곱 검정은 기대 빈도가 5 미만인 셀이 전체의 20%를 초과하면 피셔의 정확 검정(Fisher's Exact Test)을 써야 합니다.)*\n\n💡 실제 기출 포인트: 적합도(단일 변수 분포 일치) vs 독립성(두 변수 연관성) vs 동질성(집단 간 비율 동일) 3가지 유형 구분 문제입니다.",
    whyWrong: [
      "정답입니다. 적합도 검정은 관측 분포가 기대 분포에 부합하는지 검정합니다.",
      "독립성 검정은 두 '범주형' 변수 간의 독립성을 검정하는 것이며 연속형 평균 비교가 아닙니다.",
      "동질성 검정은 서로 다른 집단 간의 '범주 비율' 일치 여부를 검정합니다.",
      "기대 빈도 5 미만 셀이 20%를 초과하면 카이제곱 검정의 신뢰도가 떨어져 피셔 정확 검정을 써야 합니다."
    ],
    memorizationPoint: "카이제곱 3총사: 적합도(1개 변수 vs 이론분포) / 독립성(2개 변수 간 상관/독립) / 동질성(여러 집단 간 범주 비율 일치) / 기대빈도 5 미만 셀 20% 미만이어야 적용 가능",
    examinerTip: "💡 출제위원 꿀팁: 분할표 자유도 공식 $(r-1)(c-1)$ 과 적합도 검정 자유도 $(k-1)$ 계산 공식도 필수 암기 항목입니다."
  },
  {
    id: "Q_PASS_217",
    subject: 2,
    chapter: "고급 데이터 탐색",
    sectionId: "s2-5",
    cardId: "c2-19",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 자연어 처리(NLP) 및 텍스트 마이닝의 전처리 기법에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "불용어(Stopwords) 제거: 'the', 'is', 'a', '그리고' 등 문장에서 빈번하게 등장하지만 실제 문서의 의미를 구별하는 데 기여도가 거의 없는 단어들을 분석 대상에서 제외한다.",
      "어간 추출(Stemming): 정해진 규칙(포터 스태머 등)에 따라 단어의 어미를 잘라내어 어간을 분리하는 방식으로, 결과물이 사전에 존재하지 않는 단어 형태일 수 있다.",
      "표제어 추출(Lemmatization): 품사(POS) 정보와 문맥을 고려하여 단어의 사전적 기본형(뿌리 단어)을 복원하는 방식으로, 어간 추출보다 언어학적으로 정교하다.",
      "TF-IDF(Term Frequency-Inverse Document Frequency): 특정 문서 내에서 단어의 출현 빈도(TF)가 높고, 전체 모든 문서군에서도 흔하게 자주 등장하는 단어일수록 가장 높은 가중치 점수를 부여한다."
    ],
    answer: 3,
    explanation: "TF-IDF는 특정 문서 내에서 자주 나오지만(TF 높음), **전체 다른 문서들에서는 거의 나오지 않는 희소하고 특별한 단어(IDF 높음)일수록 해당 문서의 핵심 키워드로 간주하여 높은 가중치**를 부여합니다. 모든 문서에서 흔하게 등장하는 단어(예: '데이터', '연구')는 $DF$가 커져서 $IDF = \log(N/DF)$가 0에 가까워지므로 가중치가 매우 낮아집니다.\n\n💡 실제 기출 포인트: Stemming(규칙 기반 절삭) vs Lemmatization(사전적 원형 복원)의 차이와 TF-IDF 가중치 부여 원리 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 불용어는 정보 가치가 낮은 빈출 단어입니다.",
      "올바른 설명입니다. 어간 추출은 어미를 단순 절단하므로 사전에 없는 단어가 될 수 있습니다.",
      "올바른 설명입니다. 표제어 추출은 품사를 고려하여 사전에 있는 원형을 찾습니다.",
      "정답입니다. 모든 문서에 흔하게 나오는 단어는 IDF가 매우 낮아져 TF-IDF 점수가 최하위로 떨어집니다."
    ],
    memorizationPoint: "Stemming = 단순 어미 절단(비문법적 결과 가능) / Lemmatization = 품사 고려 사전 원형 복원 / TF-IDF = (내 문서 빈도) × log(전체문서수 / 해당단어등장문서수)",
    examinerTip: "💡 출제위원 함정: 'TF-IDF는 모든 문서에 널리 쓰이는 단어에 높은 점수를 준다'는 보기는 100% 오답입니다."
  },
  {
    id: "Q_PASS_218",
    subject: 2,
    chapter: "고급 데이터 탐색",
    sectionId: "s2-5",
    cardId: "c2-18",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 시계열 데이터의 4가지 변동 요인(추세, 계절, 순환, 불규칙 요인)에 대한 설명 중 '계절 요인(Seasonal Variation)'에 해당하는 것은?",
    choices: [
      "수십 년에 걸쳐 인구 증가나 경제 발전과 함께 데이터가 장기적으로 지속 상승하거나 하락하는 경향",
      "달력상의 1년, 1주일, 24시간 등 고정된 특정 주기 단위로 규칙적이고 반복적으로 나타나는 변동 (예: 여름철 에어컨 판매량 급증, 주말 고속도로 통행량 증가)",
      "고정된 주기를 갖지 않고 경기 변동(호황/불황)에 따라 2~10년 주기로 불규칙하게 반복되는 파동",
      "지진, 화재, 전쟁, 파업 등 예기치 못한 돌발 사건으로 인해 발생하는 우발적 변동"
    ],
    answer: 1,
    explanation: "시계열 4대 변동 요인:\n1) **추세 요인 (Trend):** 장기적인 지속 상승/하락 경향\n2) **계절 요인 (Seasonal):** **1년, 1주일, 하루 등 고정된 주기로 규칙적 반복**되는 변동 (②번 정답)\n3) **순환 요인 (Cyclical):** 고정 주기가 아닌 2~10년 단위의 경기 순환 파동\n4) **불규칙 요인 (Irregular/Random):** 천재지변 등 예측 불가능한 돌발 우발 변동\n\n💡 실제 기출 포인트: 계절 요인(고정 주기 규칙적) vs 순환 요인(비고정 장기 경기 파동)의 구별 문제입니다.",
    whyWrong: [
      "장기적인 지속적 상승/하락은 '추세 요인(Trend)'입니다.",
      "정답입니다. 고정된 주기의 규칙적 반복은 '계절 요인(Seasonal)'입니다.",
      "비고정 주기의 경기 변동은 '순환 요인(Cyclical)'입니다.",
      "돌발 사고로 인한 변동은 '불규칙 요인(Irregular)'입니다."
    ],
    memorizationPoint: "시계열 4요소: 추세(장기) + 계절(고정주기 반복: 여름/주말) + 순환(경기변동 파동) + 불규칙(천재지변/노이즈)",
    examinerTip: "💡 출제위원 꿀팁: '계절'이라는 단어 때문에 1년 단위 4계절만 생각하기 쉽지만, '요일별(1주일 주기)'이나 '시간대별(24시간 주기)' 반복도 모두 계절 요인에 포함됩니다."
  },

  // ==========================================
  // [제3과목] 빅데이터 모델링 (8문항: Q_PASS_311 ~ 318)
  // ==========================================
  {
    id: "Q_PASS_311",
    subject: 3,
    chapter: "고급 분석기법 (시계열·범주형·다변량)",
    sectionId: "s3-10",
    cardId: "c3-12",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 시계열 분석의 '정상성(Stationarity)' 조건과 ARIMA(p, d, q) 모형에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "정상 시계열(Stationary Time Series)은 시간에 무관하게 평균이 일정하고, 분산도 일정하며, 두 시점 간의 공분산은 오직 시차(Lag, k)에만 의존한다.",
      "비정상 시계열에서 평균이 일정하지 않고 추세(Trend)가 존재하는 경우 '차분(Differencing)'을 통해 정상 시계열로 변환할 수 있다.",
      "비정상 시계열에서 시간에 따라 분산이 점차 커지는 이분산성이 존재하는 경우 '로그 변환(Log Transformation)'을 적용하여 분산을 안정화할 수 있다.",
      "ARIMA(p, d, q) 모형에서 d는 자기회귀 차수, p는 차분 횟수, q는 이동평균 차수를 나타내며, 자기상관함수(ACF)가 특정 시차 이후 절단(Cut-off)되는 형태를 보이면 순수 MA 모형으로 식별할 수 없다."
    ],
    answer: 3,
    explanation: "ARIMA(p, d, q) 모형의 파라미터 정의는 다음과 같습니다:\n- **$p$:** 자기회귀 차수 (Auto-Regressive, AR 차수)\n- **$d$:** 차분 횟수 (Differencing, 정상화 차수)\n- **$q$:** 이동평균 차수 (Moving Average, MA 차수)\n*(④번은 $p$와 $d$의 정의를 뒤바꾸었습니다.)*\n또한, **자기상관함수(ACF)가 시차 $q+1$에서 절단(0으로 뚝 떨어짐)되고 편자기상관함수(PACF)가 지수적으로 점차 감소하면 순수 MA(q) 모형**으로 식별합니다.\n\n💡 실제 기출 포인트: 정상성 3대 조건(평균일정, 분산일정, 공분산은 시차에만 의존)과 ARIMA(p,d,q) 차수 및 ACF/PACF 패턴 판별은 시계열의 필수 킬러 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 정상성의 3대 정의입니다.",
      "올바른 설명입니다. 추세(평균 불일치)는 차분으로 해결합니다.",
      "올바른 설명입니다. 분산 불일치는 로그/루트 변환으로 해결합니다.",
      "정답입니다. ARIMA(p,d,q)는 p=AR차수, d=차분횟수, q=MA차수이며, ACF가 절단되면 순수 MA(q) 모형의 전형적인 패턴입니다."
    ],
    memorizationPoint: "정상성: 평균일정, 분산일정, 공분산은 시차에만 의존 / ARIMA(p,d,q) = AR(p), 차분(d), MA(q) / AR모형: PACF 절단 / MA모형: ACF 절단",
    examinerTip: "💡 출제위원 꿀팁: 'AR(p) 모형은 PACF가 p 이후 절단된다', 'MA(q) 모형은 ACF가 q 이후 절단된다' (AR-P, MA-A)로 외우세요."
  },
  {
    id: "Q_PASS_312",
    subject: 3,
    chapter: "자주 출제되는 핵심 개념 픽",
    sectionId: "s5-1",
    cardId: "c5-1",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] K-최근접 이웃(KNN: K-Nearest Neighbor) 알고리즘과 거리 측정 척도에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "KNN은 사전에 모델을 학습하지 않고 새로운 데이터가 들어왔을 때 주변 데이터를 탐색하는 대표적인 게으른 학습(Lazy Learning / 인스턴스 기반 학습) 알고리즘이다.",
      "K 값을 너무 작게(예: K=1) 설정하면 노이즈나 이상치에 민감하게 반응하여 모델이 과대적합(Overfitting)될 위험이 높다.",
      "유클리드 거리(Euclidean Distance)는 두 점 사이의 최단 직선 거리를 측정하며, 맨해튼 거리(Manhattan Distance)는 각 좌표 축 방향의 절댓값 차이의 합으로 격자형 거리를 측정한다.",
      "KNN 알고리즘은 거리 기반으로 이웃을 판별하므로, 사전에 독립변수들에 대한 데이터 정규화나 표준화(Scaling)를 전혀 수행할 필요가 없다."
    ],
    answer: 3,
    explanation: "KNN은 데이터 포인트 간의 '기하학적 거리(유클리드/맨해튼 거리)'를 기반으로 가장 가까운 이웃을 판정하므로, **변수들의 단위(Scale, 예: 연봉 5,000만원 vs 나이 30세)가 다르면 스케일이 큰 변수가 거리를 지배**하게 됩니다. 따라서 **KNN 적용 전 데이터 스케일링(표준화/정규화)은 절대적으로 필수적인 전처리**입니다.\n\n💡 실제 기출 포인트: KNN의 특징(Lazy Learning, K에 따른 과적합/과소적합, 거리 스케일링 민감성)을 묻는 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. KNN은 인스턴스 기반 지연 학습 모델입니다.",
      "올바른 설명입니다. K가 작으면 과대적합, K가 너무 크면 과소적합됩니다.",
      "올바른 설명입니다. 유클리드는 직선거리($L_2$), 맨해튼은 격자거리($L_1$)입니다.",
      "정답입니다. KNN은 거리 기반 모델이므로 스케일링이 반드시 필요합니다."
    ],
    memorizationPoint: "KNN: Lazy Learner / K 작으면 ➔ 과대적합 / K 크면 ➔ 과소적합 / 거리 기반 모델(KNN, SVM, K-Means)은 반드시 사전 스케일링 필수!",
    examinerTip: "💡 출제위원 꿀팁: 거리 기반 알고리즘(KNN, SVM, K-Means, PCA)은 '스케일링 필수', 트리 기반(Random Forest, XGBoost)은 '스케일링 무관'을 구별하세요."
  },
  {
    id: "Q_PASS_313",
    subject: 3,
    chapter: "자주 출제되는 핵심 개념 픽",
    sectionId: "s5-1",
    cardId: "c5-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 나이브 베이즈(Naive Bayes) 분류기에서 '나이브(Naive, 순진한)'라는 이름이 붙게 된 핵심 가정이자 장단점에 대한 설명으로 옳은 것은?",
    choices: [
      "모든 클래스 라벨 간에 사전 확률(Prior Probability)이 항상 동일하다고 가정한다.",
      "타겟 클래스가 주어졌을 때 모든 독립변수(Feature)들이 서로 '조건부 독립(Conditionally Independent)'이라고 가정한다.",
      "독립변수들 간의 복잡한 다중 상호작용과 다중공선성을 완벽하게 고려하여 계산하므로 연산 시간이 매우 오래 걸린다.",
      "훈련 데이터셋에 단 한 번도 등장하지 않은 새로운 단어나 속성이 나타나더라도 라플라스 평활(Laplace Smoothing) 없이 사후확률을 정상 계산할 수 있다."
    ],
    answer: 1,
    explanation: "1) 나이브 베이즈가 '순진한(Naive)' 분류기라고 불리는 이유는 **'타겟 클래스 $Y$가 주어졌을 때 모든 입력 특성 $X_1, X_2, \dots, X_p$들이 서로 완전히 조건부 독립'**이라는 비현실적인(순진한) 가정을 하기 때문입니다.\n2) 이 가정 덕분에 결합확률 $P(X_1, \dots, X_p|Y)$를 각 개별 조건부 확률의 단순 곱 $\prod P(X_i|Y)$로 단순화하여 고속 연산이 가능합니다.\n3) 훈련셋에 없는 단어로 인해 확률이 0이 되는 문제(Zero-probability)를 방지하기 위해 **라플라스 평활(Laplace Smoothing)**을 사용합니다.\n\n💡 실제 기출 포인트: 조건부 독립 가정, 베이즈 정리 수식 $P(Y|X) \propto P(Y)P(X|Y)$, 라플라스 평활의 필요성 문제입니다.",
    whyWrong: [
      "사전 확률이 동일하다고 가정하지 않고 데이터셋의 클래스 비율을 그대로 반영합니다.",
      "정답입니다. 나이브 베이즈의 핵심은 '특성 간 조건부 독립' 가정입니다.",
      "변수 간 상호작용을 무시(독립 가정)하므로 연산이 매우 빠르고 단순합니다.",
      "처음 보는 단어는 확률이 0이 되어 전체 확률을 0으로 만드므로 반드시 라플라스 평활이 필요합니다."
    ],
    memorizationPoint: "나이브 베이즈 = 클래스가 주어졌을 때 모든 특성들이 '조건부 독립' 가정 / 0 확률 방지책 = 라플라스 스무딩(Laplace Smoothing)",
    examinerTip: "💡 출제위원 함정: '나이브 베이즈는 변수 간의 복잡한 상관관계를 학습한다'는 보기는 100% 오답입니다."
  },
  {
    id: "Q_PASS_314",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 자연어 처리 및 최신 거대 언어 모델(LLM)의 핵심 기반인 '트랜스포머(Transformer)' 아키텍처의 셀프 어텐션(Self-Attention) 메커니즘에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "RNN과 달리 순차적(Sequential) 반복 구조를 제거하고, 문장 내 모든 단어 간의 상호 관계를 한 번에 병렬(Parallel) 연산하여 학습 속도를 대폭 향상시켰다.",
      "입력 임베딩 벡터에 단어의 위치 정보를 부여하기 위해 '위치 인코딩(Positional Encoding)'을 추가한다.",
      "스케일드 닷 프로덕트 어텐션(Scaled Dot-Product Attention)의 수식은 $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$ 이다.",
      "쿼리(Query)와 키(Key)의 내적(Dot-product) 값을 $\\sqrt{d_k}$로 나누는 스케일링을 수행하는 이유는 소프트맥스 함수의 그래디언트가 극도로 커져서 발생하는 발산 문제를 막기 위함이다."
    ],
    answer: 3,
    explanation: "스케일링($\sqrt{d_k}$로 나누기)을 수행하는 이유는 $d_k$(키 벡터의 차원)가 커질수록 내적 값의 크기가 매우 커져서 **소프트맥스 함수가 극단적인 값(0 또는 1)으로 치우치게 되고, 이로 인해 소프트맥스의 그래디언트가 0에 극도로 가까워지는 '기울기 소실(Vanishing Gradient)' 현상이 발생하기 때문**입니다. (발산 문제가 아니라 기울기 소실 방지 목적)\n\n💡 실제 기출 포인트: Transformer 핵심 구조(Self-Attention 수식, Query/Key/Value, Positional Encoding, Scaled Dot-Product)는 최신 딥러닝 킬러 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 트랜스포머는 RNN의 순차 처리 한계를 극복하고 완전 병렬화를 달성했습니다.",
      "올바른 설명입니다. 병렬 처리로 인해 사라진 위치 순서 정보를 Positional Encoding으로 주입합니다.",
      "올바른 설명입니다. 셀프 어텐션의 표준 수식입니다.",
      "정답입니다. $\sqrt{d_k}$로 나누는 이유는 소프트맥스 포화로 인한 '기울기 소실(Vanishing Gradient)'을 막기 위함입니다."
    ],
    memorizationPoint: "Transformer Self-Attention: Attention(Q,K,V) = softmax(QK^T / √d_k) * V / 순차 제거 및 완전 병렬화 / 위치 정보는 Positional Encoding",
    examinerTip: "💡 출제위원 꿀팁: Query는 질문, Key는 검색 키(제목), Value는 내용에 해당한다는 비유를 기억하세요."
  },
  {
    id: "Q_PASS_315",
    subject: 3,
    chapter: "비정형 데이터 분석 및 앙상블·비모수 통계",
    sectionId: "s3-12",
    cardId: "c3-15",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 워드 임베딩(Word Embedding) 기법인 Word2Vec의 두 가지 학습 방식(CBOW vs Skip-gram)에 대한 비교 설명으로 옳은 것은?",
    choices: [
      "CBOW(Continuous Bag of Words): 중심 단어(Center word)를 보고 주변 단어들(Context words)을 예측하는 방식이다.",
      "Skip-gram: 주변에 있는 단어들(Context words)의 조합을 바탕으로 중간에 위치한 중심 단어(Center word)를 예측하는 방식이다.",
      "일반적으로 말뭉치(Corpus)가 크고 희귀한 단어나 전문 용어의 임베딩 품질을 정밀하게 학습하기에는 Skip-gram 방식이 CBOW 방식보다 더 우수하다.",
      "Word2Vec은 단어의 의미적 유사성을 전혀 반영하지 못하며, 단순히 단어의 출현 빈도만을 원-핫 인코딩 벡터로 변환하는 기법이다."
    ],
    answer: 2,
    explanation: "Word2Vec 2가지 모델 구조:\n1) **CBOW (Continuous Bag of Words):** **주변 단어들(Context) ➔ 중심 단어(Center) 예측** (학습 속도가 빠름)\n2) **Skip-gram:** **중심 단어(Center) ➔ 주변 단어들(Context) 예측** (희소한 단어와 거대 코퍼스에서 벡터 표현 품질이 더 우수함)\n*(①번과 ②번은 두 모델의 예측 방향을 반대로 설명했습니다.)*\n\n💡 실제 기출 포인트: CBOW(주변➔중심) vs Skip-gram(중심➔주변)의 예측 방향성과 특징 비교 문제입니다.",
    whyWrong: [
      "CBOW는 주변 단어들을 모아서 중심 단어를 맞히는 방식입니다.",
      "Skip-gram은 하나의 중심 단어를 보고 주변 단어들을 맞히는 방식입니다.",
      "정답입니다. Skip-gram은 희귀 단어 학습에 더 뛰어난 성능을 보입니다.",
      "Word2Vec은 밀집 벡터(Dense Vector) 공간에 의미적 유사성을 투영하는 임베딩 기법입니다."
    ],
    memorizationPoint: "CBOW = 주변 단어 모아서 ➔ 중심 단어 예측 (C는 모은다/Bag) / Skip-gram = 중심 단어로 ➔ 주변 단어들 예측 (희귀단어에 우수)",
    examinerTip: "💡 출제위원 함정: CBOW와 Skip-gram의 입출력 관계(주변➔중심 vs 중심➔주변)를 서로 바꾸어 출제하는 경우가 90% 이상입니다."
  },
  {
    id: "Q_PASS_316",
    subject: 3,
    chapter: "의사결정나무 및 분류 모델",
    sectionId: "s3-4",
    cardId: "c3-4",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 계산] 어느 노드 $A$에 총 10개의 데이터가 포함되어 있으며, 클래스 1이 6개, 클래스 2가 4개 존재한다. 이 노드 $A$의 지니 불순도(Gini Impurity)를 올바르게 계산한 것은?",
    choices: [
      "0.24",
      "0.48",
      "0.50",
      "0.60"
    ],
    answer: 1,
    explanation: "1) 지니 불순도(Gini Index) 계산 공식:\n$$\\text{Gini} = 1 - \\sum_{i=1}^{k} p_i^2$$\n2) 각 클래스의 비율:\n- 클래스 1의 비율 $p_1 = \\frac{6}{10} = 0.6$\n- 클래스 2의 비율 $p_2 = \\frac{4}{10} = 0.4$\n3) 지니 불순도 수치 계산:\n$$\\text{Gini} = 1 - (0.6^2 + 0.4^2) = 1 - (0.36 + 0.16) = 1 - 0.52 = \\mathbf{0.48}$$\n\n💡 실제 기출 포인트: 의사결정나무의 지니 불순도 공식($1 - \sum p_i^2$)을 직접 수기로 계산하는 단골 계산 문제입니다.",
    whyWrong: [
      "오답입니다. $0.6 \times 0.4 = 0.24$에 2를 곱하지 않은 절반 값입니다.",
      "정답입니다. $1 - (0.36 + 0.16) = 0.48$ 입니다.",
      "0.50은 5:5로 완벽히 섞였을 때의 최댓값입니다.",
      "오답입니다."
    ],
    memorizationPoint: "이진 분류 지니 불순도 = 1 - (p1² + p2²) = 2 * p1 * p2 / 6:4 비율이면 ➔ 2 * 0.6 * 0.4 = 0.48",
    examinerTip: "💡 출제위원 꿀팁: 이진 분류에서 지니 불순도는 $2 \times p \times (1-p)$ 로 초고속 계산할 수 있습니다! ($2 \times 0.6 \times 0.4 = 0.48$)"
  },
  {
    id: "Q_PASS_317",
    subject: 3,
    chapter: "분류 및 군집 분석 심화",
    sectionId: "s3-9",
    cardId: "c3-10",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] K-평균(K-Means) 군집화의 이상치 취약성을 개선하기 위해, 실제 군집에 속한 가장 중심적인 실제 데이터 포인트를 대표 중심점으로 사용하는 비지도 군집 알고리즘은?",
    choices: [
      "K-Medoids (PAM: Partitioning Around Medoids)",
      "DBSCAN",
      "Mean-Shift (평균 이동)",
      "계층적 군집분석 (Hierarchical Clustering)"
    ],
    answer: 0,
    explanation: "K-Means는 군집의 중심을 데이터의 산술 평균(Mean)으로 계산하므로 극단적인 이상치(Outlier)가 존재할 경우 중심점이 크게 왜곡됩니다. 이를 보완하기 위해 나온 **'K-Medoids (PAM)'**는 가상의 평균 대신 **군집 내 데이터들과의 거리 합이 최소가 되는 '실제 데이터 포인트(Medoid)'를 중심점**으로 선택하므로 이상치에 훨씬 강건(Robust)합니다.\n\n💡 실제 기출 포인트: K-Means의 단점(이상치 취약)을 극복하는 K-Medoids 알고리즘의 핵심 원리 문제입니다.",
    whyWrong: [
      "정답입니다. K-Medoids는 실제 데이터(Medoid)를 중심점으로 사용하여 이상치에 강건합니다.",
      "DBSCAN은 밀도 기반 군집화 기법입니다.",
      "Mean-Shift는 확률 밀도 함수의 극대점을 찾아 이동하는 방식입니다.",
      "계층적 군집분석은 덴드로그램을 형성하는 병합/분할 기법입니다."
    ],
    memorizationPoint: "K-Means = 평균 중심점 (이상치에 취약) ➔ K-Medoids = 실제 데이터 Medoid 중심점 (이상치에 강건)",
    examinerTip: "💡 출제위원 꿀팁: '이상치에 덜 민감한 K-평균의 대안'을 물으면 무조건 K-Medoids를 선택하세요."
  },
  {
    id: "Q_PASS_318",
    subject: 3,
    chapter: "비정형 데이터 분석 및 앙상블·비모수 통계",
    sectionId: "s3-12",
    cardId: "c3-17",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 그래디언트 부스팅 계열 최신 알고리즘(XGBoost, LightGBM, CatBoost)의 특징 비교 중 가장 옳지 않은 것은?",
    choices: [
      "XGBoost: 손실함수의 2차 편미분(Hessian)을 활용한 테일러 전개와 L1/L2 규제 항을 수식에 직접 포함하여 과적합을 억제한다.",
      "LightGBM: 수평적으로 균형을 맞추는 Level-wise 분할 대신, 손실을 가장 크게 줄이는 리프 노드를 지속적으로 분할하는 Leaf-wise(리프 중심) 트리를 사용하여 속도가 매우 빠르다.",
      "CatBoost: 범주형 변수(Categorical Features)가 많은 데이터에 특화되어 있으며, 타겟 인코딩 시 발생할 수 있는 데이터 누수(Target Leakage)를 방지하는 순서화 부스팅(Ordered Boosting)을 적용한다.",
      "LightGBM은 데이터 샘플 수가 매우 적은 소규모 데이터셋(예: 100개 미만)에 적용할 때 과적합 위험이 전혀 없으며 항상 최적의 성능을 낸다."
    ],
    answer: 3,
    explanation: "LightGBM은 Leaf-wise(리프 중심) 트리 분할 방식을 사용하므로 복잡한 비대칭 깊은 트리를 생성합니다. 따라서 **데이터 샘플 수가 적은 소규모 데이터셋(보통 10,000건 이하)에 적용하면 '심각한 과대적합(Overfitting)'에 빠지기 쉽다는 명확한 한계점**이 있습니다.\n\n💡 실제 기출 포인트: 부스팅 3대장(XGBoost: 정밀/규제, LightGBM: Leaf-wise/고속/소규모데이터 과적합주의, CatBoost: 범주형/Ordered Boosting)의 비교 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. XGBoost는 2차 도함수(Hessian)와 내장 규제를 씁니다.",
      "올바른 설명입니다. LightGBM은 Leaf-wise 분할로 학습 속도를 극대화했습니다.",
      "올바른 설명입니다. CatBoost는 범주형 변수 처리와 순서화 부스팅에 탁월합니다.",
      "정답입니다. LightGBM은 Leaf-wise 특성상 소규모 데이터에서 과적합되기 매우 쉽습니다."
    ],
    memorizationPoint: "XGBoost = 2차 도함수 테일러 전개 + 규제 / LightGBM = Leaf-wise(고속, 소규모 과적합 위험) / CatBoost = 범주형 변수 특화(순서화 부스팅)",
    examinerTip: "💡 출제위원 함정: 'LightGBM은 Leaf-wise 구조이므로 소규모 데이터셋에 가장 적합하다'는 반대 설명은 단골 오답입니다."
  },

  // ==========================================
  // [제4과목] 빅데이터 결과 해석 (8문항: Q_PASS_411 ~ 418)
  // ==========================================
  {
    id: "Q_PASS_411",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1-0",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 이진 분류 모델에서 분류 임계값(Classification Threshold)을 기존 0.5에서 0.8로 상향 조정(증가)시켰을 때 나타나는 성능 평가지표의 일반적인 변화 방향으로 옳은 것은?",
    choices: [
      "모델이 Positive로 예측하는 건수가 줄어들므로 정밀도(Precision)는 대체로 증가하고, 재현율(Recall)은 감소한다.",
      "모델이 Positive로 예측하는 건수가 늘어나므로 정밀도(Precision)는 감소하고, 재현율(Recall)은 증가한다.",
      "임계값 변동은 혼동행렬의 TP, FP, FN, TN 값에 아무런 영향을 주지 않는다.",
      "재현율(Recall)과 특이도(Specificity)가 동시에 증가한다."
    ],
    answer: 0,
    explanation: "분류 임계값(Threshold) 조정 메커니즘:\n1) **임계값 상향 ($0.5 \rightarrow 0.8$):** 확실하게 확률이 0.8 이상인 것만 엄격하게 Positive로 판정함.\n- Positive 예측 수가 감소하므로 $FP$가 크게 줄어 **정밀도(Precision)는 상승**함.\n- 반면 실제 Positive인 것들을 많이 놓치게 되므로 $FN$이 증가하여 **재현율(Recall)은 하락**함.\n- 실제 Negative를 정상적으로 Negative로 맞히는 비율인 **특이도(Specificity)는 상승**함.\n\n💡 실제 기출 포인트: 임계값 증가 ➔ 정밀도↑, 재현율↓, 특이도↑ / 임계값 감소 ➔ 정밀도↓, 재현율↑, 특이도↓ 의 상충관계 문제입니다.",
    whyWrong: [
      "정답입니다. 임계값을 높이면 엄격해져서 정밀도는 상승하고 재현율은 하락합니다.",
      "임계값을 높이면 Positive 예측 건수가 줄어듭니다.",
      "임계값 변경에 따라 모든 혼동행렬 수치가 변경됩니다.",
      "재현율과 특이도는 서로 상충 관계입니다."
    ],
    memorizationPoint: "임계값(Threshold) 상향(엄격) ➔ 정밀도↑, 재현율↓, 특이도↑ / 임계값 하향(느슨) ➔ 정밀도↓, 재현율↑, 특이도↓",
    examinerTip: "💡 출제위원 꿀팁: 암 진단처럼 놓치면 안 되는 문제(재현율 중요)는 임계값을 '낮추고', 스팸 필터처럼 오탐을 막아야 하는 문제(정밀도 중요)는 임계값을 '높인다'고 기억하세요."
  },
  {
    id: "Q_PASS_412",
    subject: 4,
    chapter: "분석모형 개선",
    sectionId: "s4-2",
    cardId: "c4-5",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 머신러닝 모형의 해석력을 높이기 위한 '순열 변수 중요도(Permutation Feature Importance)'의 측정 원리에 대한 설명으로 옳은 것은?",
    choices: [
      "모델 학습 시 특정 변수의 분기 노드 수를 직접 카운트하여 중요도를 매긴다.",
      "검증 데이터셋에서 특정 변수의 데이터 값들을 무작위로 뒤섞어(Shuffle/Permutation) 기존 관계를 파괴했을 때, 모델의 예측 성능이 감소하는 정도를 측정한다.",
      "독립변수와 종속변수 간의 단순 피어슨 상관계수를 계산하여 순위를 정한다.",
      "모든 변수의 가중치(Weight)를 미분하여 기울기가 0이 되는 지점을 산출한다."
    ],
    answer: 1,
    explanation: "순열 변수 중요도(Permutation Feature Importance)의 원리:\n1) 잘 학습된 모델에 대해 검증 데이터셋의 특정 피처 $X_j$ 값들을 **무작위로 뒤섞음(Permutation/Shuffle)**.\n2) 피처와 타겟 간의 원래 관계가 완전히 깨진 상태에서 모델의 예측 성능(예: RMSE, Accuracy)을 측정함.\n3) **원래 성능에 비해 성능이 급격하게 폭락한다면, 해당 변수는 모델 예측에 결정적인 '매우 중요한 변수'**로 평가함.\n\n💡 실제 기출 포인트: 트리 기반 불순도 중요도의 편향(연속형 변수 과대평가)을 보완하는 모델 불가지론적(Model-agnostic) 순열 중요도의 원리 문제입니다.",
    whyWrong: [
      "노드 분기 수 측정은 기본 트리 기반 피처 중요도(MDI) 방식입니다.",
      "정답입니다. 특정 변수를 무작위 셔플하여 성능 하락 폭을 측정하는 것이 순열 중요도입니다.",
      "단순 상관계수 방식이 아닙니다.",
      "미분 기울기 방식이 아닙니다."
    ],
    memorizationPoint: "순열 중요도(Permutation Importance) = 검증 데이터에서 특정 변수 셔플 ➔ 모델 성능 폭락 정도(Drop in Performance)로 중요도 판정",
    examinerTip: "💡 출제위원 꿀팁: 순열 중요도는 모델 종류에 상관없이(Model-agnostic) 모든 머신러닝 모델에 적용할 수 있다는 점이 핵심입니다."
  },
  {
    id: "Q_PASS_413",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-3",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 머신러닝 및 딥러닝 학습 곡선(Learning Curve)에서 과대적합(Overfitting)과 과소적합(Underfitting)의 진단으로 가장 옳은 것은?",
    choices: [
      "과소적합(Underfitting): 훈련 손실(Train Loss)은 매우 낮고 0에 근접하지만, 검증 손실(Validation Loss)은 매우 높게 치솟는 상태이다.",
      "과대적합(Overfitting): 훈련 손실(Train Loss)과 검증 손실(Validation Loss)이 모두 높은 상태로 수렴하지 못하고 평탄한 상태이다.",
      "과대적합(Overfitting): 훈련 손실(Train Loss)은 에포크가 진행될수록 지속적으로 감소하지만, 검증 손실(Validation Loss)은 특정 시점 이후 다시 증가하기 시작하는 상태이다.",
      "조기 종료(Early Stopping): 훈련 손실(Train Loss)이 0이 되는 순간까지 끝까지 기다린 후 학습을 중단하는 기법이다."
    ],
    answer: 2,
    explanation: "1) **과대적합 (Overfitting / High Variance):** 훈련 데이터는 지나치게 완벽하게 외워 Train Loss는 계속 감소하지만, 새로운 검증 데이터에 대한 **Validation Loss는 감소하다가 다시 증가(U자형 반등)**하는 지점이 발생합니다 (③번 정답).\n2) **과소적합 (Underfitting / High Bias):** 모델이 너무 단순하여 Train Loss와 Validation Loss가 둘 다 높은 채로 떨어지지 않는 상태입니다.\n3) **조기 종료 (Early Stopping):** Validation Loss가 더 이상 감소하지 않고 증가하기 시작하는 최적점에서 학습을 조기 중단하는 정규화 기법입니다.\n\n💡 실제 기출 포인트: Train Loss vs Validation Loss 곡선을 통한 과적합 판별과 Early Stopping의 기준 문제입니다.",
    whyWrong: [
      "Train Loss가 낮고 Val Loss가 치솟는 것은 '과대적합'입니다.",
      "둘 다 높은 상태는 '과소적합'입니다.",
      "정답입니다. 과대적합의 전형적인 학습 곡선 패턴입니다.",
      "Early Stopping은 Validation Loss가 반등하기 시작할 때 멈추는 기법입니다."
    ],
    memorizationPoint: "과대적합 = Train Loss↓ but Val Loss↑ (격차 발생) / 과소적합 = 둘 다 높음 / 해결책 = Early Stopping, Dropout, 규제(L1/L2)",
    examinerTip: "💡 출제위원 꿀팁: 학습 곡선 그래프에서 Train과 Validation 곡선 간의 '간격(Gap)'이 벌어질수록 과대적합(High Variance)입니다."
  },
  {
    id: "Q_PASS_414",
    subject: 4,
    chapter: "분석결과 시각화",
    sectionId: "s4-3",
    cardId: "c4-6",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 다차원 다변량 데이터 시각화 도구에 대한 설명 중 '평행 좌표계(Parallel Coordinates)'에 대한 설명으로 옳은 것은?",
    choices: [
      "계층 구조를 가진 데이터를 직사각형들의 크기와 색상으로 분할하여 시각화하는 도구이다 (Treemap).",
      "각 변수들을 평행한 수직선 축으로 나란히 배치하고, 개별 데이터 포인트를 이 축들을 가로지르는 하나의 꺾은선으로 연결하여 다차원 패턴을 파악하는 시각화 도구이다.",
      "네트워크 내에서 노드 간의 유량(Flow)과 이동 경로의 크기를 선의 두께로 표현하는 시각화 도구이다 (Sankey Diagram).",
      "위도와 경도 좌표 위에 데이터의 밀도를 등고선 형태로 표현하는 지리 공간 시각화 도구이다."
    ],
    answer: 1,
    explanation: "1) **평행 좌표계 (Parallel Coordinates):** 다변량 데이터(4개 이상의 변수)를 시각화하기 위해 각 변수를 평행한 축으로 세우고, 각 관측치를 축들을 지나는 연속된 선으로 연결하여 다차원 군집 및 상관 패턴을 시각화합니다 (②번 정답).\n2) **트리맵 (Treemap):** 계층적 데이터를 사각형 타일로 표현 (①번).\n3) **생키 다이어그램 (Sankey Diagram):** 에너지 흐름, 고객 이탈 경로 등 유량의 이동 경로 표현 (③번).\n\n💡 실제 기출 포인트: 4과목 시각화 파트에서 평행좌표계, 트리맵, 생키 다이어그램의 특징 구별 문제입니다.",
    whyWrong: [
      "계층적 사각형 분할은 트리맵(Treemap)입니다.",
      "정답입니다. 평행한 축을 지나는 선으로 다변량을 표현하는 평행 좌표계입니다.",
      "유량 이동 경로는 생키 다이어그램(Sankey Diagram)입니다.",
      "지리 밀도 표현은 공간 등고선 맵입니다."
    ],
    memorizationPoint: "평행좌표계 = 다차원 변수를 평행 축으로 나열 후 선으로 연결 / 트리맵 = 계층 사각형 / 생키 = 유량/경로 두께 표현",
    examinerTip: "💡 출제위원 꿀팁: 4개 이상의 연속형 변수를 2차원 평면에 한눈에 비교할 때 평행좌표계가 가장 자주 정답으로 출제됩니다."
  },
  {
    id: "Q_PASS_415",
    subject: 4,
    chapter: "최신 출제 트렌드 심화 개념",
    sectionId: "s5-2",
    cardId: "c5-2-4",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 거대 언어 모델(LLM) 및 생성형 AI의 텍스트 생성 성능을 평가하기 위한 지표인 BLEU와 ROUGE에 대한 설명 중 옳은 것은?",
    choices: [
      "BLEU(Bilingual Evaluation Understudy): 생성된 문장이 참조 정답 문장과 얼마나 일치하는지 '재현율(Recall)' 중심의 N-gram 정밀도를 측정하며 주로 문서 요약 평가에 쓰인다.",
      "ROUGE(Recall-Oriented Understudy for Gisting Evaluation): 참조 정답 문장의 단어가 모델 생성 문장에 얼마나 많이 포함되었는지 '재현율(Recall)'을 중심으로 측정하며 주로 텍스트 요약 평가에 널리 쓰인다.",
      "BLEU 점수는 생성된 텍스트의 길이가 너무 길어질 때 점수를 깎는 페널티(Length Penalty)를 부여하지 않는다.",
      "Perplexity(PPL) 지표는 생성 모델이 다음에 올 단어를 예측할 때 느끼는 혼란도를 나타내며, PPL 값이 클수록 언어 모델의 성능이 뛰어남을 의미한다."
    ],
    answer: 1,
    explanation: "1) **ROUGE (Recall-Oriented):** 이름 그대로 **재현율(Recall)** 중심으로, 참조 요약문의 N-gram이 생성 요약문에 얼마나 잘 포함되었는지 측정하며 **텍스트 요약(Summarization) 평가의 표준 지표**입니다 (②번 정답).\n2) **BLEU (Precision-Oriented):** 생성된 문장이 참조 문장과 얼마나 정확히 일치하는지 **정밀도(Precision)** 중심으로 측정하며 주로 **기계 번역(Machine Translation) 평가**에 쓰입니다. (너무 짧은 번역을 방지하기 위해 간결도 페널티(Brevity Penalty)를 적용함)\n3) **Perplexity (PPL):** 모델의 헷갈림(혼란도) 정도이므로 **PPL 수치가 작을수록(낮을수록) 언어 모델의 성능이 우수**합니다.\n\n💡 실제 기출 포인트: 최신 LLM 평가지표(BLEU: 정밀도 중심/번역 vs ROUGE: 재현율 중심/요약 vs PPL: 낮을수록 우수) 문제입니다.",
    whyWrong: [
      "BLEU는 재현율이 아니라 '정밀도(Precision)' 중심이며 주로 기계 번역 평가에 쓰입니다.",
      "정답입니다. ROUGE는 Recall 중심의 텍스트 요약 평가 지표입니다.",
      "BLEU는 문장이 너무 짧을 때 Brevity Penalty를 적용합니다.",
      "PPL은 혼란도이므로 값이 '작을수록(낮을수록)' 우수한 모델입니다."
    ],
    memorizationPoint: "BLEU = 정밀도(Precision) 중심 ➔ 기계 번역 평가 / ROUGE = 재현율(Recall) 중심 ➔ 문서 요약 평가 / PPL = 낮을수록 우수",
    examinerTip: "💡 출제위원 함정: BLEU와 ROUGE의 핵심 지표(Precision vs Recall)와 PPL의 대소 판별(작을수록 우수)을 꼬아내는 문제가 최신 트렌드입니다."
  },
  {
    id: "Q_PASS_416",
    subject: 4,
    chapter: "분석결과 활용",
    sectionId: "s4-4",
    cardId: "c4-8",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 디지털 서비스 환경에서 분석 모델이나 UI 변경의 비즈니스 효과를 실증하기 위해 사용되는 'A/B 테스트(A/B Testing)'에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "기존 서비스 버전인 대조군(Control Group, A)과 새로운 개선 버전인 실험군(Treatment Group, B)으로 사용자를 무작위 배정(Random Assignment)하여 동시에 노출시킨다.",
      "A/B 테스트의 결과가 통계적으로 유의미한지 검정하기 위해 클릭률(CTR)이나 전환율(CVR)의 차이에 대해 통계적 가설검정(t-검정 또는 카이제곱 검정)을 수행한다.",
      "A/B 테스트 도중 외부 환경 요인(예: 대규모 공휴일, 계절 변화, 동시 진행 마케팅 프로모션)이 개입되더라도 무작위 분할만 되어 있다면 결과에 어떠한 편향도 발생하지 않는다.",
      "테스트를 시작하기 전에 원하는 신뢰수준과 검정력을 확보하기 위한 최소 표본 크기(Sample Size)를 사전 산정해야 한다."
    ],
    answer: 2,
    explanation: "A/B 테스트에서 무작위 배정을 하더라도 **외부 요인(특정 요일 효과, 일시적 이벤트, 마케팅 캠페인 중복 등)이나 새로운 버전에 대한 사용자의 일시적 호기심 효과(Novelty Effect)**가 개입되면 심각한 통계적 편향이 발생할 수 있습니다. 따라서 충분한 테스트 기간(보통 1~2주 이상 주기성 반영)을 유지해야 합니다.\n\n💡 실제 기출 포인트: 4과목 결과 활용 파트에서 A/B 테스트의 기본 개념과 통계적 유의성 검정 원리 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. A(대조군)와 B(실험군)의 무작위 동시 테스트입니다.",
      "올바른 설명입니다. 전환율 차이는 카이제곱 검정이나 z/t-검정으로 유의성을 판단합니다.",
      "정답입니다. 외부 요인이나 신기성 효과(Novelty Effect)로 인해 결과가 왜곡될 수 있습니다.",
      "올바른 설명입니다. 통계적 검정력을 위해 사전 최소 표본 크기 산정이 필수입니다."
    ],
    memorizationPoint: "A/B 테스트 = A(대조군/기존) vs B(실험군/개선안) 무작위 분할 동시 비교 ➔ 통계적 유의성(p-value) 검정 필수",
    examinerTip: "💡 출제위원 꿀팁: A/B 테스트는 '동일한 기간'에 '동시에' 무작위로 분할하여 진행해야 외생 변수를 통제할 수 있습니다."
  },
  {
    id: "Q_PASS_417",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 분류 모델의 평가지표인 F-베타 점수(F-beta Score)에 대한 설명 중 옳은 것은?\n\n$$F_\\beta = (1 + \\beta^2) \\frac{\\text{Precision} \\times \\text{Recall}}{(\\beta^2 \\times \\text{Precision}) + \\text{Recall}}$$",
    choices: [
      "$\\beta = 1$ 일 때 산출되는 $F_1$ 점수는 정밀도와 재현율의 단순 산술 평균이다.",
      "$\\beta = 2$ 일 때 산출되는 $F_2$ 점수는 정밀도(Precision)에 재현율(Recall)보다 2배 더 많은 가중치를 부여한 지표이다.",
      "$\\beta = 0.5$ 일 때 산출되는 $F_{0.5}$ 점수는 재현율(Recall)보다 정밀도(Precision)를 더 중요하게 평가하고자 할 때 사용하는 지표이다.",
      "F-beta 점수는 정밀도나 재현율 중 하나가 0이 되더라도 항상 0보다 큰 안정적인 값을 유지한다."
    ],
    answer: 2,
    explanation: "F-베타($F_\beta$) 점수의 가중치 원리:\n- **$F_1$ 점수 ($\beta=1$):** 정밀도와 재현율의 **조화 평균(Harmonic Mean)**입니다 (산술평균 아님).\n- **$\beta > 1$ (예: $F_2$ 점수):** **재현율(Recall)**에 $\beta$배만큼 더 많은 가중치를 부여합니다. (암 진단, 불량품 검출 등 양성을 놓치면 안 되는 경우 사용)\n- **$\beta < 1$ (예: $F_{0.5}$ 점수):** **정밀도(Precision)**에 더 많은 가중치를 부여합니다. (스팸 메일 필터링 등 오탐을 줄여야 하는 경우 사용) ➔ ③번 정답!\n\n💡 실제 기출 포인트: $F_1$의 조화평균 성격과 $F_\beta$에서 $\beta$ 값에 따른 정밀도 vs 재현율 가중치 해석 문제입니다.",
    whyWrong: [
      "F1 점수는 산술평균이 아니라 '조화평균'입니다.",
      "F2 점수는 정밀도가 아니라 '재현율'에 가중치를 더 둔 지표입니다.",
      "정답입니다. $\beta < 1$ 일 때는 정밀도(Precision)를 더 중요시합니다.",
      "정밀도나 재현율 중 하나라도 0이면 F-beta 점수는 0이 됩니다."
    ],
    memorizationPoint: "F-beta 가중치: β=1 ➔ F1(조화평균) / β=2 ➔ 재현율(Recall) 중시(암진단) / β=0.5 ➔ 정밀도(Precision) 중시(스팸필터)",
    examinerTip: "💡 출제위원 꿀팁: $\beta$는 'Recall(재현율)에 부여하는 가중치 배수'라고 기억하면 절대 헷갈리지 않습니다."
  },
  {
    id: "Q_PASS_418",
    subject: 4,
    chapter: "최신 출제 트렌드 심화 개념",
    sectionId: "s5-2",
    cardId: "c5-2-5",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 빈출] 인공지능(AI)의 윤리성 및 신뢰성 가이드라인에서 제시하는 '신뢰할 수 있는 AI(Trustworthy AI)'의 4대 핵심 요건에 해당하지 않는 것은?",
    choices: [
      "공정성 (Fairness / Non-discrimination): 특정 성별, 인종, 연령 등에 대해 부당한 차별이나 편향이 발생하지 않아야 한다.",
      "설명가능성 및 투명성 (Explainability & Transparency): AI의 의사결정 과정과 결과에 대해 사용자가 이해하고 검증할 수 있어야 한다.",
      "안전성 및 견고성 (Robustness & Safety): 적대적 공격이나 예기치 못한 이상 데이터 유입 시에도 안전하게 시스템이 보호되어야 한다.",
      "절대적 수익 극대화성 (Profit Maximization): 사회적 공익보다 기업의 주주 이익과 수익 창출을 최우선 판단 기준으로 삼아야 한다."
    ],
    answer: 3,
    explanation: "신뢰할 수 있는 AI(Trustworthy AI)의 국제 표준 및 국가 AI 윤리 기준 4대 요건은 다음과 같습니다:\n1) **인간 존엄성 및 공정성 (Fairness):** 편향 및 차별 금지\n2) **투명성 및 설명가능성 (Explainability):** 의사결정 이유 설명\n3) **안전성 및 견고성 (Robustness & Safety):** 적대적 공격 방어 및 데이터 프라이버시 보호\n4) **책임성 (Accountability):** 오류 발생 시 책임 주체 명확화\n\n단순한 '기업의 수익 극대화'는 AI 윤리 및 신뢰성 가이드라인에 해당하지 않습니다.\n\n💡 실제 기출 포인트: 최신 출제 기준에 명시된 AI 윤리 및 신뢰성 4대 요건(공정성, 투명성, 안전성, 책임성)을 묻는 기본 득점 문제입니다.",
    whyWrong: [
      "핵심 요건에 해당합니다 (편향 차별 방지).",
      "핵심 요건에 해당합니다 (XAI 및 투명성).",
      "핵심 요건에 해당합니다 (보안 및 견고성).",
      "정답입니다. 신뢰할 수 있는 AI 요건이 아닙니다."
    ],
    memorizationPoint: "AI 윤리 4대 요건: 공정성(차별 금지), 투명성/설명가능성(이유 설명), 안전성/견고성(보안), 책임성(책임 소재 명확화)",
    examinerTip: "💡 출제위원 꿀팁: AI 윤리 문제는 상식적인 윤리 규범과 XAI(설명가능성)의 결합을 묻는 문제가 주로 출제됩니다."
  }
];

// 중복 검증 후 cbt_bank에 추가
const existingIds = new Set(bank.questions.map(q => q.id));
let addedCount = 0;

massiveQuestions.forEach(q => {
  if (!existingIds.has(q.id)) {
    bank.questions.push(q);
    existingIds.add(q.id);
    addedCount++;
  } else {
    console.log(`Duplicate ID skipped: ${q.id}`);
  }
});

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`Successfully added ${addedCount} massive pass-standard benchmark questions! Total questions in cbt_bank.json: ${bank.questions.length}`);
