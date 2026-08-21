const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'cbt_bank.json');
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));

// =========================================================================
// 12회 기출 복원 추가 20문항 (Q_PASS_429 ~ Q_PASS_448)
// =========================================================================
const extra12thQuestions = [
  // --- [1과목] 빅데이터 분석 기획 (4문항: Q_PASS_429 ~ 432) ---
  {
    id: "Q_PASS_429",
    subject: 1,
    chapter: "빅데이터 기술 및 제도",
    sectionId: "s1-2",
    cardId: "c1-20",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 하둡 맵리듀스(MapReduce)에서 대규모 분산 데이터 간의 조인(Join) 처리를 수행하는 패턴에 관한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "리듀스 사이드 조인(Reduce-Side Join)은 셔플(Shuffle) 단계를 거쳐 동일한 조인 키를 가진 레코드를 동일한 리듀서로 모아 결합하는 가장 일반적인 방식이다.",
      "맵 사이드 조인(Map-Side Join / Replicated Join)은 한쪽 테이블이 메모리에 올릴 수 있을 만큼 충분히 작을 때(작은 테이블을 분산 캐시로 공유), 셔플 과정 없이 맵 단계에서 즉시 조인을 완료하는 고속 기법이다.",
      "리듀스 사이드 조인은 대용량 네트워크 트래픽(셔플)이 발생하지 않아 맵 사이드 조인보다 항상 처리 속도가 월등히 빠르다.",
      "맵 사이드 조인을 수행하려면 작은 테이블을 분산 캐시(Distributed Cache)에 로드하여 모든 매퍼(Mapper) 노드가 메모리에 보유해야 한다."
    ],
    answer: 2,
    explanation: "리듀스 사이드 조인(Reduce-Side Join)은 모든 데이터를 키 기준으로 정렬하고 네트워크를 통해 전송하는 **대규모 셔플(Shuffle) 비용이 발생**하므로 속도가 상대적으로 느립니다. 반면, 한쪽 테이블이 작을 때 사용하는 **맵 사이드 조인(Map-Side Join)**은 셔플 단계를 완전히 생략하고 맵 단계에서 메모리 조인을 수행하므로 **속도가 훨씬 빠릅니다**.\n\n💡 실제 기출 포인트: 12회 1과목 맵리듀스 조인 패턴(Reduce-side vs Map-side 분산캐시 조인)의 원리를 묻는 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 일반적인 대용량-대용량 조인에 쓰이는 표준 방식입니다.",
      "올바른 설명입니다. 작은 테이블을 메모리에 복제(Broadcast)하여 셔플을 없앱니다.",
      "정답입니다. 리듀스 사이드 조인은 셔플 비용 때문에 맵 사이드 조인보다 느립니다.",
      "올바른 설명입니다. Distributed Cache를 활용해 메모리에 적재합니다."
    ],
    memorizationPoint: "Map-Side Join: 작은 테이블 메모리 캐싱, 셔플 없음(빠름) | Reduce-Side Join: 일반적 조인, 셔플 발생(느림)",
    examinerTip: "💡 출제위원 함정: '리듀스 사이드 조인이 셔플을 생략한다'거나 '맵 사이드 조인이 메모리를 가장 적게 쓴다'는 선지는 오답입니다."
  },
  {
    id: "Q_PASS_430",
    subject: 1,
    chapter: "데이터분석 계획",
    sectionId: "s1-3",
    cardId: "c1-10",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 데이터 마이닝 및 빅데이터 분석 방법론인 KDD와 CRISP-DM의 단계별 매핑 및 절차에 대한 설명으로 가장 옳은 것은?",
    choices: [
      "CRISP-DM은 폭포수(Waterfall) 모델 기반으로 피드백이나 단계 간 반복이 엄격히 금지된 단방향 방법론이다.",
      "KDD의 5단계 절차는 '데이터셋 선택(Selection) → 전처리(Preprocessing) → 변환(Transformation) → 데이터 마이닝(Data Mining) → 결과 평가(Evaluation)' 순으로 진행된다.",
      "CRISP-DM의 6단계 중 모델을 실제 운영 환경에 배포하고 유지보수 계획을 수립하는 단계는 '평가(Evaluation)' 단계이다.",
      "KDD 방법론의 '데이터 전처리' 단계는 노이즈 제거와 결측치 처리가 아니라, 분석 목적에 맞는 변수 선택과 차원 축소만을 수행하는 단계이다."
    ],
    answer: 1,
    explanation: "1) **KDD 5단계:** 데이터셋 선택(Selection) → 전처리(Preprocessing, 노이즈/결측치 제거) → 변환(Transformation, 차원축소/정규화) → 데이터 마이닝(Data Mining) → 해석/평가(Evaluation)\n2) **CRISP-DM 6단계:** 업무 이해 → 데이터 이해 → 데이터 준비 → 모델링 → 평가 → 전개(Deployment). CRISP-DM은 단계 간 **피드백과 반복(Iterative)**이 핵심입니다.\n3) 모델을 배포하고 유지보수하는 단계는 평가가 아니라 **'전개(Deployment)'** 단계입니다.\n\n💡 실제 기출 포인트: KDD 5단계와 CRISP-DM 6단계의 순서 및 세부 활동 짝짓기는 1과목 최다 빈출 테마입니다.",
    whyWrong: [
      "CRISP-DM은 피드백과 반복이 빈번한 반복적/순환적 방법론입니다.",
      "정답입니다. KDD의 정확한 5단계 순서입니다 (선-전-변-마-평).",
      "운영 배포 및 유지보수는 마지막 6단계인 '전개(Deployment)' 단계입니다.",
      "노이즈/결측치 정제는 '전처리' 단계이고, 차원축소/변수변환은 '변환' 단계입니다."
    ],
    memorizationPoint: "KDD 5단계: 선택 → 전처리 → 변환 → 마이닝 → 평가 | CRISP-DM 6단계: 업무이해 → 데이터이해 → 데이터준비 → 모델링 → 평가 → 전개",
    examinerTip: "💡 출제위원 꿀팁: KDD의 '변환'과 '전처리' 활동을 서로 바꿔치기하거나 CRISP-DM의 '데이터 준비'와 '모델링' 순서를 꼬아서 출제합니다."
  },
  {
    id: "Q_PASS_431",
    subject: 1,
    chapter: "데이터분석 계획",
    sectionId: "s1-3",
    cardId: "c1-16",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 분석과제 발굴을 위한 4분면 접근법(매트릭스)에서 분석 대상(What)과 분석 방법(How)에 따른 4가지 유형의 연결이 가장 올바른 것은?",
    choices: [
      "분석 대상(What)을 알고 있고 분석 방법(How)도 알고 있는 경우 → 통찰 (Insight)",
      "분석 대상(What)을 알고 있으나 분석 방법(How)을 모르는 경우 → 솔루션 (Solution)",
      "분석 대상(What)을 모르고 분석 방법(How)만 알고 있는 경우 → 최적화 (Optimization)",
      "분석 대상(What)과 분석 방법(How)을 둘 다 전혀 모르는 경우 → 발견 (Discovery)이 아니라 솔루션 (Solution)"
    ],
    answer: 1,
    explanation: "분석과제 발굴 2×2 매트릭스 분류:\n1) **최적화 (Optimization):** 분석 대상(Known) + 분석 방법(Known) [둘 다 앎]\n2) **솔루션 (Solution):** 분석 대상(Known) + 분석 방법(Unknown) [대상은 아는데 방법을 모름]\n3) **통찰 (Insight):** 분석 대상(Unknown) + 분석 방법(Known) [대상은 모르는데 방법은 앎]\n4) **발견 (Discovery):** 분석 대상(Unknown) + 분석 방법(Unknown) [둘 다 모름]\n\n💡 실제 기출 포인트: 12회 1과목 분석과제 발굴 4분면 매트릭스 매핑 문제입니다.",
    whyWrong: [
      "둘 다 알고 있는 경우는 '최적화(Optimization)'입니다.",
      "정답입니다. 대상은 알지만 접근 방식을 모를 때 새로운 Solution을 모색합니다.",
      "대상은 모르고 방법만 알 때는 '통찰(Insight)'을 도출합니다.",
      "둘 다 모르는 경우는 '발견(Discovery)'입니다."
    ],
    memorizationPoint: "What/How: Known/Known=최적화, Known/Unknown=솔루션, Unknown/Known=통찰, Unknown/Unknown=발견",
    examinerTip: "💡 출제위원 함정: '최적화'와 '솔루션', '통찰'의 정의를 교차하여 짝짓는 문제가 매회 출제됩니다."
  },
  {
    id: "Q_PASS_432",
    subject: 1,
    chapter: "빅데이터 기술 및 제도",
    sectionId: "s1-2",
    cardId: "c1-8",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 개인정보 비식별 조치 프라이버시 보호 모델(k-익명성, l-다양성, t-근접성)에 관한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "k-익명성(k-Anonymity)은 준식별자(QI) 속성값이 동일한 레코드가 데이터셋 내에 최소 k개 이상 존재하도록 하여 개인을 특정할 수 없게 만드는 모델이다.",
      "k-익명성은 특정 그룹 내의 민감 속성(질병 등) 값이 모두 동일할 경우 발생하는 '동질성 공격(Homogeneity Attack)'과 배경지식을 이용한 '배경지식 공격'에 취약하다.",
      "l-다양성(l-Diversity)은 k-익명성을 만족하는 동질 집단 내에 서로 다른 민감 속성의 종류가 최소 l개 이상 다양하게 분포하도록 보장하는 모델이다.",
      "t-근접성(t-Closeness)은 전체 데이터셋의 민감 속성 분포와 특정 동질 집단 내 민감 속성 분포의 거리(차이)가 최소 t 이상으로 멀어지도록 규제하는 모델이다."
    ],
    answer: 3,
    explanation: "t-근접성(t-Closeness)은 특정 동질 집단 내의 민감한 속성값 분포가 **'전체 데이터셋의 민감 속성 분포와 t 이하의 거리로 가까워야(유사해야)'** 함을 요구하는 모델입니다. 분포 차이가 멀어지면(크면) 특정 집단의 민감 정보가 왜곡되어 노출될 위험(쏠림 공격, Skewness Attack)이 커지므로, 거리 차이를 **t 이하로 작게 제한(근접)**해야 합니다.\n\n💡 실제 기출 포인트: 12회 1과목 데이터 비식별화 모델(k-익명성, l-다양성, t-근접성)의 정의와 공격 취약점 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. k개 이상의 동질 집단을 형성합니다.",
      "올바른 설명입니다. k-익명성은 동질성 공격과 배경지식 공격에 취약합니다.",
      "올바른 설명입니다. l-다양성은 민감 속성을 l개 이상 다양화하여 동질성 공격을 방어합니다.",
      "정답입니다. t-근접성은 분포 간 거리를 t '이하'로 좁히는(가깝게 하는) 모델입니다."
    ],
    memorizationPoint: "k-익명성: 동질 레코드 k개 이상 | l-다양성: 민감정보 l개 이상 다양화 | t-근접성: 전체 분포와 거리 t 이하로 제한",
    examinerTip: "💡 출제위원 함정: 't-근접성은 전체 분포와 거리를 최대한 멀리 떨어뜨린다'는 문장은 정반대로 서술한 대표 오답입니다."
  },

  // --- [2과목] 빅데이터 탐색 (6문항: Q_PASS_433 ~ 438) ---
  {
    id: "Q_PASS_433",
    subject: 2,
    chapter: "데이터 탐색 개요",
    sectionId: "s2-4",
    cardId: "c2-17",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 데이터 분포의 모양을 결정하는 '3차 중심적률(왜도, Skewness)'과 '4차 중심적률(첨도, Kurtosis)'에 관한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "왜도(Skewness)가 양수(Skewness > 0)인 경우 오른쪽으로 긴 꼬리를 갖는 분포이며, '최빈값 < 중앙값 < 평균'의 대소 관계를 갖는다.",
      "왜도(Skewness)가 0인 경우 완벽한 좌우 대칭 분포를 이루며, '최빈값 = 중앙값 = 평균'이 된다.",
      "첨도(Kurtosis)는 데이터의 뾰족한 정도와 꼬리의 두께를 나타내며, 표준정규분포의 첨도는 0(정규첨도 기준 3을 뺀 경우)이다.",
      "왜도(Skewness)가 음수(Skewness < 0)인 경우 오른쪽으로 긴 꼬리를 가지며, '평균 > 중앙값 > 최빈값'의 관계를 형성한다."
    ],
    answer: 3,
    explanation: "왜도가 음수(Skewness < 0)인 경우는 **'왼쪽으로 긴 꼬리(Left-skewed)'**를 가지며, 극단적으로 작은 값들의 영향으로 인해 평균이 왼쪽으로 끌어내려져 **'평균(Mean) < 중앙값(Median) < 최빈값(Mode)'**의 대소 관계를 가집니다.\n\n💡 실제 기출 포인트: 12회 2과목 기초통계(5문항)에서 왜도(3차 중심적률)의 부호에 따른 꼬리 방향과 평균/중앙값/최빈값 대소 비교가 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. 오른쪽 꼬리(우측 비대칭): 최빈값 < 중앙값 < 평균",
      "올바른 설명입니다. 대칭 분포에서는 세 대표값이 일치합니다.",
      "올바른 설명입니다. 정규분포의 잉여첨도(Excess Kurtosis)는 0입니다.",
      "정답입니다. 왜도 < 0 은 '왼쪽 꼬리'이며 '평균 < 중앙값 < 최빈값' 순서입니다."
    ],
    memorizationPoint: "왜도 > 0 (오른쪽 꼬리): 최빈값 < 중앙값 < 평균 | 왜도 < 0 (왼쪽 꼬리): 평균 < 중앙값 < 최빈값",
    examinerTip: "💡 출제위원 꿀팁: '꼬리가 긴 쪽으로 평균이 끌려간다'고 외우면 절대 헷갈리지 않습니다. (우측 꼬리면 평균이 가장 큼!)"
  },
  {
    id: "Q_PASS_434",
    subject: 2,
    chapter: "데이터 탐색 개요",
    sectionId: "s2-4",
    cardId: "c2-17",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 5개의 데이터 표본 [2, 4, 4, 4, 6]이 주어졌을 때, 이 표본의 '표본분산(Sample Variance)'과 '표본표준편차(Sample Standard Deviation)'의 값은?",
    choices: [
      "표본분산 = 1.6, 표본표준편차 = √1.6",
      "표본분산 = 2.0, 표본표준편차 = √2.0",
      "표본분산 = 8.0, 표본표준편차 = 2.82",
      "표본분산 = 2.5, 표본표준편차 = √2.5"
    ],
    answer: 1,
    explanation: "1) 표본평균 x̄ = (2 + 4 + 4 + 4 + 6) / 5 = 20 / 5 = 4\n2) 각 편차 및 제곱:\n- (2 - 4)² = (-2)² = 4\n- (4 - 4)² = 0\n- (4 - 4)² = 0\n- (4 - 4)² = 0\n- (6 - 4)² = (2)² = 4\n- 편차 제곱의 합(SS) = 4 + 0 + 0 + 0 + 4 = 8\n3) **표본분산 (s²):** 편차제곱합을 (n - 1)로 나눔 → 8 / (5 - 1) = 8 / 4 = **2.0**\n4) **표본표준편차 (s):** √2.0\n\n💡 실제 기출 포인트: 모분산(n으로 나눔)과 표본분산(자유도 n-1로 나눔)의 차이를 묻는 기초통계 계산 문제입니다.",
    whyWrong: [
      "n=5로 나눈 모분산(8/5=1.6)으로 계산한 전형적인 오답 함정입니다.",
      "정답입니다. 표본분산은 (n-1)=4로 나누므로 2.0, 표준편차는 √2.0 입니다.",
      "편차제곱합(8.0)을 그대로 분산으로 오인한 보기입니다.",
      "잘못된 계산입니다."
    ],
    memorizationPoint: "표본분산 s² = Σ(x_i - x̄)² / (n - 1) ★반드시 n이 아닌 (n - 1)로 나누어야 불편추정량이 됨!",
    examinerTip: "💡 출제위원 함정: '표본'이라는 단어를 명시하고 n으로 나누게 유도하는 낚시 보기가 매회 출제됩니다."
  },
  {
    id: "Q_PASS_435",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 3개의 성별(남/여/기타)과 4개의 구매선호 브랜드(A/B/C/D) 간의 관련성을 알아보기 위해 3×4 분할표를 작성하여 카이제곱 독립성 검정을 수행하고자 한다. 이 검정의 '자유도(Degrees of Freedom)'는?",
    choices: [
      "6",
      "7",
      "11",
      "12"
    ],
    answer: 0,
    explanation: "카이제곱 독립성 검정 및 동질성 검정에서 $r \\times c$ 분할표의 자유도(df) 공식:\n\n• $\\text{자유도}(df) = (r - 1) \\times (c - 1)$\n• 행(r) = 3, 열(c) = 4\n• $df = (3 - 1) \\times (4 - 1) = 2 \\times 3 = \\mathbf{6}$\n\n💡 실제 기출 포인트: 12회 2과목 가설검정(7문항)에서 카이제곱 독립성 검정의 자유도 계산 및 기대빈도 공식이 출제되었습니다.",
    whyWrong: [
      "정답입니다. (3-1) × (4-1) = 2 × 3 = 6 입니다.",
      "(3+4) = 7 로 단순 합산한 오답입니다.",
      "(3×4) - 1 = 11 로 전체 셀 수에서 1을 뺀 오답입니다.",
      "3 × 4 = 12 로 전체 셀 수를 그대로 쓴 오답입니다."
    ],
    memorizationPoint: "카이제곱 분할표 자유도 df = (행의 수 - 1) × (열의 수 - 1) = (r - 1)(c - 1)",
    examinerTip: "💡 출제위원 꿀팁: 적합도 검정의 자유도는 (k - 1)이고, 독립성/동질성 검정 분할표의 자유도는 (r - 1)(c - 1)입니다."
  },
  {
    id: "Q_PASS_436",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 동일한 피실험자 집단을 대상으로 다이어트 신약 복용 '전(Before)'과 '후(After)'의 체중 변화를 측정하여 약효가 있는지를 통계적으로 검증하고자 할 때 가장 적절한 가설검정 방법은?",
    choices: [
      "독립표본 t-검정 (Independent Two-Sample t-test)",
      "대응표본 t-검정 (Paired Samples t-test)",
      "일원배치 분산분석 (One-way ANOVA)",
      "카이제곱 적합도 검정 (Chi-Square Goodness of Fit Test)"
    ],
    answer: 1,
    explanation: "동일한 개체나 짝지어진(Paired) 표본을 대상으로 '사전-사후' 처치 효과를 비교할 때는 두 집단이 독립이 아니므로 **대응표본 t-검정(Paired Samples t-test)**을 사용해야 합니다. (각 쌍의 차이 $D_i = X_{after} - X_{before}$를 단일 표본으로 변환하여 검정함)\n\n💡 실제 기출 포인트: 12회 2과목 가설검정에서 독립표본 t검정과 대응표본 t검정의 적용 상황 구분이 출제되었습니다.",
    whyWrong: [
      "독립표본 t검정은 남성 vs 여성처럼 서로 완전히 무관한 두 독립 집단의 평균을 비교할 때 씁니다.",
      "정답입니다. 동일 집단의 사전-사후 비교는 대응표본 t-검정을 적용합니다.",
      "ANOVA는 3개 이상의 독립 집단 평균을 비교할 때 씁니다.",
      "카이제곱 적합도 검정은 범주형 빈도 분포가 이론적 분포를 따르는지 검정할 때 씁니다."
    ],
    memorizationPoint: "사전-사후(동일 표본) 비교 = 대응표본 t-검정 (Paired t-test) | 서로 다른 두 집단 = 독립표본 t-검정",
    examinerTip: "💡 출제위원 함정: '동일 인물의 치료 전/후 체중 비교' 예시를 주고 독립표본 t-검정을 정답으로 오인하게 유도합니다."
  },
  {
    id: "Q_PASS_437",
    subject: 2,
    chapter: "결측값·이상값 처리",
    sectionId: "s2-2",
    cardId: "c2-10",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 사분위수(IQR, Interquartile Range)를 활용한 박스플롯(Boxplot) 기반 이상치 탐지에서, 제1사분위수 Q1 = 30 이고 제3사분위수 Q3 = 70 일 때 '정상 데이터의 유효 하한선(Lower Whisker)'과 '유효 상한선(Upper Whisker)'은?",
    choices: [
      "하한선: -30, 상한선: 130",
      "하한선: 0, 상한선: 100",
      "하한선: 10, 상한선: 90",
      "하한선: -10, 상한선: 110"
    ],
    answer: 0,
    explanation: "1) IQR (사분위범위) = Q3 - Q1 = 70 - 30 = 40\n2) 유효 하한선 (Lower Bound) = Q1 - (1.5 × IQR) = 30 - (1.5 × 40) = 30 - 60 = **-30**\n3) 유효 상한선 (Upper Bound) = Q3 + (1.5 × IQR) = 70 + (1.5 × 40) = 70 + 60 = **130**\n\n따라서 -30 미만이거나 130을 초과하는 데이터는 이상치(Outlier)로 판정합니다.\n\n💡 실제 기출 포인트: 12회 2과목 전처리(7문항)에서 IQR 기반 이상치 경계 계산 공식이 복원되었습니다.",
    whyWrong: [
      "정답입니다. 하한선: 30 - 60 = -30, 상한선: 70 + 60 = 130 입니다.",
      "1.5가 아닌 1.0 × IQR 을 적용한 오답입니다.",
      "1.5 × IQR(60)을 잘못 계산한 오답입니다.",
      "잘못된 계산입니다."
    ],
    memorizationPoint: "IQR 이상치 경계: 하한 = Q1 - 1.5×IQR, 상한 = Q3 + 1.5×IQR (단, IQR = Q3 - Q1)",
    examinerTip: "💡 출제위원 함정: Q1에서 빼야 할 것을 Q3에서 빼거나 1.5를 곱하지 않는 계산 실수를 노립니다."
  },
  {
    id: "Q_PASS_438",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-20",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 1,000명의 고객 명부에서 50명의 표본을 추출하기 위해, 전체를 20명 간격(k = 1,000/50 = 20)으로 나누고 첫 번째 구간에서 무작위로 7번째 고객을 뽑은 뒤 [7, 27, 47, 67, ...] 번호의 고객을 일정한 간격으로 추출하는 표본추출 기법은?",
    choices: [
      "단순 무작위 추출법 (Simple Random Sampling)",
      "계통 추출법 (Systematic Sampling)",
      "층화 추출법 (Stratified Random Sampling)",
      "군집 추출법 (Cluster Sampling)"
    ],
    answer: 1,
    explanation: "모집단의 원소에 번호를 부여하고 일정한 **추출 간격(k = N/n)**을 정한 뒤 첫 번째 번호만 무작위로 뽑고 이후 **매 k번째 원소를 주기적으로 추출하는 방식은 '계통 추출법(Systematic Sampling)'**입니다.\n(단, 모집단에 일정한 주기성(Periodicity)이 존재하면 특정 특성만 편향 추출될 위험이 있습니다.)\n\n💡 실제 기출 포인트: 12회 2과목 샘플링 방법(계통추출)의 정의와 특징 문제입니다.",
    whyWrong: [
      "단순 무작위 추출은 모든 번호에 동일한 당첨 확률을 주고 제비뽑기하듯 무작위로 뽑는 방식입니다.",
      "정답입니다. 일정한 간격 k마다 추출하는 계통 추출법입니다.",
      "층화 추출은 모집단을 동질적 층(예: 성별, 연령)으로 나눈 후 각 층에서 무작위 추출합니다.",
      "군집 추출은 모집단을 이질적인 군집(예: 학교, 구역)으로 나눈 뒤 특정 군집 전체를 전수 조사합니다."
    ],
    memorizationPoint: "계통 추출법(Systematic Sampling): 간격 k = N/n 마다 주기적 추출 (주기성 존재 시 편향 주의)",
    examinerTip: "💡 출제위원 꿀팁: 4대 확률표본추출(단순무작위, 계통, 층화, 군집)의 추출 방식과 층화(집단 내 동질, 집단 간 이질) vs 군집(집단 내 이질, 집단 간 동질) 구분이 필수 출제됩니다."
  },

  // --- [3과목] 빅데이터 모델링 (6문항: Q_PASS_439 ~ 444) ---
  {
    id: "Q_PASS_439",
    subject: 3,
    chapter: "회귀 모형 구축·다중공선성",
    sectionId: "s3-2",
    cardId: "c3-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 다중선형회귀분석에서 독립변수들 간의 강한 상관관계로 인해 발생하는 '다중공선성(Multicollinearity)'과 잔차(Residual) 진단에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "다중공선성이 존재하면 모형의 전체 설명력(R²)은 매우 높게 나오지만 개별 회귀계수의 유의확률(p-value)이 크게 나와 통계적으로 유의하지 않게 나타날 수 있다.",
      "분산팽창지수(VIF, Variance Inflation Factor)가 10 이상이면 심각한 다중공선성이 존재하는 것으로 판정한다.",
      "다중공선성을 해결하기 위해 능형회귀(Ridge), 라쏘(Lasso)와 같은 정규화 기법을 적용하거나 주성분 분석(PCA)으로 상관된 변수를 축약할 수 있다.",
      "회귀모형 잔차의 4대 기본 가정은 '선형성, 등분산성, 독립성, 정규성'이며, 이 중 시계열 데이터에서 잔차 간의 자기상관(독립성 위배)을 진단하는 통계량은 F-통계량이다."
    ],
    answer: 3,
    explanation: "잔차의 독립성(자기상관 부재)을 검정하는 대표적인 통계량은 **더빈-왓슨(Durbin-Watson) 통계량**입니다. (더빈-왓슨 통계량이 2에 가까우면 자기상관이 없고 독립성을 만족함)\nF-통계량은 회귀모형 전체의 통계적 유의성을 검정할 때 사용합니다.\n\n💡 실제 기출 포인트: 12회 3과목 선형회귀(4문항)에서 릿지, 잔차 4대 가정, 다중공선성(VIF > 10)이 집중 출제되었습니다.",
    whyWrong: [
      "올바른 설명입니다. 다중공선성의 대표적인 이상 징후입니다.",
      "올바른 설명입니다. VIF = 1 / (1 - R_i²) 이며 통상 10 이상이면 심각한 공선성입니다.",
      "올바른 설명입니다. Ridge/Lasso 또는 PCA는 다중공선성의 대표적인 해결책입니다.",
      "정답입니다. 잔차의 자기상관(독립성) 검정은 F-통계량이 아니라 '더빈-왓슨(Durbin-Watson)' 통계량을 씁니다."
    ],
    memorizationPoint: "다중공선성: VIF > 10 판정 | 잔차 4대 가정: 선등독정 (선형성, 등분산성, 독립성-더빈왓슨, 정규성-Q-Q플롯/샤피로)",
    examinerTip: "💡 출제위원 함정: '다중공선성이 발생하면 R² 값이 0에 가까워진다'는 틀린 설명입니다 (R²은 높게 유지됨)."
  },
  {
    id: "Q_PASS_440",
    subject: 3,
    chapter: "회귀 모형 구축·다중공선성",
    sectionId: "s3-2",
    cardId: "c3-991",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 선형회귀 모형의 과적합을 방지하기 위한 정규화(Regularization) 기법인 '릿지(Ridge)'와 '라쏘(Lasso)'의 비교 설명으로 가장 옳은 것은?",
    choices: [
      "릿지(Ridge) 회귀는 L1 규제를 사용하여 가중치의 절댓값 합을 손실함수에 페널티로 추가한다.",
      "라쏘(Lasso) 회귀는 L2 규제를 사용하여 덜 중요한 변수의 회귀계수를 0에 가깝게 축소할 뿐 절대 0으로 만들지는 못한다.",
      "라쏘(Lasso) 회귀는 L1 페널티를 적용하여 중요하지 않은 독립변수의 회귀계수를 정확히 0으로 만들어 자동 변수 선택(Feature Selection) 효과를 낸다.",
      "엘라스틱넷(ElasticNet)은 릿지와 라쏘의 페널티를 전혀 사용하지 않고 오직 의사결정나무의 가지치기만을 결합한 방법이다."
    ],
    answer: 2,
    explanation: "1) **릿지 (Ridge):** L2 규제 ($\lambda \sum \beta_j^2$) 적용. 회귀계수를 0에 가깝게 줄이지만 **정확히 0이 되지는 않음** (변수 선택 불가).\n2) **라쏘 (Lasso):** L1 규제 ($\lambda \sum |\beta_j|$) 적용. 불필요한 변수의 회귀계수를 **정확히 0으로 만들어 변수를 제거함 (Feature Selection 효과)**.\n3) **엘라스틱넷 (ElasticNet):** L1 규제와 L2 규제를 결합한 모델.\n\n💡 실제 기출 포인트: 12회 3과목 선형회귀에서 릿지와 라쏘의 L1/L2 페널티 형태 및 계수 0 생성 여부가 출제되었습니다.",
    whyWrong: [
      "릿지는 L2 규제(제곱합)를 사용합니다.",
      "라쏘는 L1 규제를 사용하며 계수를 정확히 0으로 만듭니다.",
      "정답입니다. 라쏘(L1)는 계수를 0으로 만들어 변수 선택(희소성)을 유도합니다.",
      "엘라스틱넷은 L1(라쏘)과 L2(릿지)의 페널티를 선형 결합한 정규화 기법입니다."
    ],
    memorizationPoint: "L1 Lasso: 절댓값 페널티 → 계수 0 생성(변수 선택) | L2 Ridge: 제곱 페널티 → 계수 축소(0은 안 됨)",
    examinerTip: "💡 출제위원 꿀팁: L1 = Lasso(절댓값, 0 가능) vs L2 = Ridge(제곱, 0 불가)를 교차하는 문제가 단골 출제됩니다."
  },
  {
    id: "Q_PASS_441",
    subject: 3,
    chapter: "비정형·앙상블·비모수",
    sectionId: "s3-12",
    cardId: "c3-17",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 앙상블(Ensemble) 기법 중 '배깅(Bagging)', '부스팅(Boosting)', '스태킹(Stacking)'의 비교로 가장 옳지 않은 것은?",
    choices: [
      "배깅(Bagging)은 부트스트랩(Bootstrap, 복원추출)으로 생성된 여러 표본 데이터로 모델들을 병렬 학습시킨 후 다수결 투표나 평균으로 결합하여 모델의 '분산(Variance)'을 줄인다.",
      "부스팅(Boosting)은 이전 모델이 잘못 예측한 오답 데이터에 가중치를 부여하여 다음 모델을 순차적(Sequential)으로 학습시키며, 주로 '편향(Bias)'을 줄이는 데 효과적이다.",
      "스태킹(Stacking)은 서로 다른 유형의 여러 개별 기본 모델(Base Model)들의 예측 결과를 새로운 훈련 데이터(메타 피처)로 구성하여 최종 메타 모델(Meta Model)을 학습시키는 기법이다.",
      "랜덤 포레스트(Random Forest)는 대표적인 부스팅 알고리즘으로, 잔차를 줄이기 위해 이전 트리의 오류를 지속적으로 가중치 갱신하여 순차 학습한다."
    ],
    answer: 3,
    explanation: "랜덤 포레스트(Random Forest)는 부스팅이 아니라 **'배깅(Bagging)'의 대표적인 확장 알고리즘**입니다. 부트스트랩 샘플링과 트리 분기 시 무작위 변수 선택(Random Feature Selection)을 결합하여 개별 트리들의 상관성을 낮추고 분산을 크게 줄입니다.\n(부스팅의 대표 알고리즘은 AdaBoost, GBM, XGBoost, LightGBM, CatBoost입니다.)\n\n💡 실제 기출 포인트: 12회 3과목 앙상블(3문항)에서 스태킹, 배깅과 부스팅의 원리 및 랜덤포레스트의 소속이 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. Bagging = Bootstrap Aggregating (병렬 학습, 분산 감소).",
      "올바른 설명입니다. Boosting = 오차 가중치 순차 학습 (편향 감소).",
      "올바른 설명입니다. Stacking = 예측값을 입력으로 쓰는 메타 모델 학습.",
      "정답입니다. 랜덤 포레스트는 부스팅이 아니라 '배깅' 알고리즘입니다."
    ],
    memorizationPoint: "배깅(Bagging): 병렬, 부트스트랩, 분산 감소 (랜덤포레스트) | 부스팅(Boosting): 순차, 오차가중, 편향 감소 (XGBoost/LightGBM) | 스태킹: 메타모델",
    examinerTip: "💡 출제위원 함정: '랜덤포레스트는 부스팅이다' 또는 '배깅은 순차적으로 학습한다'는 선지는 100% 오답입니다."
  },
  {
    id: "Q_PASS_442",
    subject: 3,
    chapter: "인공신경망 및 다층 퍼셉트론",
    sectionId: "s3-5",
    cardId: "c3-6",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 딥러닝 다층 신경망 학습에서 은닉층의 활성화 함수(Activation Function)로 'ReLU(Rectified Linear Unit)' 함수를 사용할 때 얻을 수 있는 가장 큰 이점은?",
    choices: [
      "출력값이 항상 -1과 1 사이로 제한되어 출력의 분산이 일정하게 유지된다.",
      "역전파(Backpropagation) 과정에서 은닉층이 깊어지더라도 양수 영역의 기울기가 1로 유지되어 '기울기 소실(Vanishing Gradient)' 문제를 완화한다.",
      "모든 입력 구간에서 완벽하게 미분 가능하므로 입력이 0 이하일 때도 뉴런이 항상 활성화 상태를 유지한다.",
      "시그모이드(Sigmoid) 함수에 비해 지수 연산(exp)이 많이 포함되어 있어 더 정밀한 비선형 매핑을 수행한다."
    ],
    answer: 1,
    explanation: "ReLU 함수 $f(x) = \max(0, x)$는 $x > 0$일 때 기울기(미분값)가 항상 1입니다. 따라서 과거 Sigmoid나 Tanh 함수처럼 층이 깊어질수록 미분값이 0으로 수렴하여 학습이 중단되던 **'기울기 소실(Vanishing Gradient)' 문제를 획기적으로 해결**하였으며, 단순 비교 연산으로 **학습 속도가 매우 빠릅니다**.\n\n💡 실제 기출 포인트: 12회 3과목 인공신경망에서 활성화 함수 ReLU의 특징과 기울기 소실 극복 원리가 출제되었습니다.",
    whyWrong: [
      "-1과 1 사이로 출력하는 것은 Tanh(쌍곡탄젠트) 함수입니다.",
      "정답입니다. 양수 구간 미분값이 1이어서 기울기 소실을 극복합니다.",
      "ReLU는 x < 0 일 때 미분값이 0이 되어 뉴런이 죽는(Dying ReLU) 현상이 있습니다 (Leaky ReLU로 해결).",
      "ReLU는 단순 max 연산이므로 지수 연산이 없어 연산 비용이 매우 저렴합니다."
    ],
    memorizationPoint: "ReLU f(x) = max(0, x): x>0 일 때 미분값=1 → 기울기 소실(Vanishing Gradient) 방지 및 빠른 연산",
    examinerTip: "💡 출제위원 꿀팁: 시그모이드(기울기 소실 발생) vs ReLU(기울기 소실 극복) 비교는 딥러닝 단골 출제 포인트입니다."
  },
  {
    id: "Q_PASS_443",
    subject: 3,
    chapter: "분류 및 군집 분석 심화",
    sectionId: "s3-9",
    cardId: "c3-10",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 두 고객 A와 B의 구매 품목 집합이 다음과 같을 때, 두 고객 간의 '자카드 유사도(Jaccard Similarity)'와 '자카드 거리(Jaccard Distance)'의 값으로 올바른 것은?\n\n• 고객 A 구매 품목: {우유, 빵, 버터, 치즈}\n• 고객 B 구매 품목: {빵, 버터, 계란, 잼, 주스}",
    choices: [
      "자카드 유사도 = 2/7 (약 0.286), 자카드 거리 = 5/7 (약 0.714)",
      "자카드 유사도 = 2/9 (약 0.222), 자카드 거리 = 7/9 (약 0.778)",
      "자카드 유사도 = 1/2 (약 0.500), 자카드 거리 = 1/2 (약 0.500)",
      "자카드 유사도 = 2/4 (약 0.500), 자카드 거리 = 2/5 (약 0.400)"
    ],
    answer: 0,
    explanation: "1) 교집합 (A ∩ B): {빵, 버터} → 2개\n2) 합집합 (A ∪ B): {우유, 빵, 버터, 치즈, 계란, 잼, 주스} → 7개\n3) **자카드 유사도 (Jaccard Similarity):** |A ∩ B| / |A ∪ B| = **2 / 7 (약 0.286)**\n4) **자카드 거리 (Jaccard Distance):** 1 - 자카드 유사도 = 1 - 2/7 = **5 / 7 (약 0.714)**\n\n💡 실제 기출 포인트: 12회 3과목 군집분석(자카드 계수)에서 두 집합 간의 유사도 및 비유사도 거리 계산 문제가 복원되었습니다.",
    whyWrong: [
      "정답입니다. 교집합 2개 / 합집합 7개 = 2/7, 거리는 1 - 2/7 = 5/7 입니다.",
      "두 집합의 원소 수 단순 합산(4+5=9)을 분모로 잘못 계산한 오답입니다.",
      "잘못된 계산입니다.",
      "한쪽 집합의 크기만으로 나눈 잘못된 계산입니다."
    ],
    memorizationPoint: "자카드 유사도 = |A ∩ B| / |A ∪ B| (교집합 / 합집합) | 자카드 거리 = 1 - 자카드 유사도",
    examinerTip: "💡 출제위원 함정: 합집합을 구할 때 중복 원소(교집합)를 중복 카운트하여 4+5=9로 나누게 만드는 실수를 노립니다."
  },
  {
    id: "Q_PASS_444",
    subject: 3,
    chapter: "고급 분석기법 (시계열·범주형·다변량)",
    sectionId: "s3-10",
    cardId: "c3-12",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 시계열 데이터 분석에서 자기상관함수(ACF)와 편자기상관함수(PACF)의 형태를 보고 ARIMA 모델의 차수(p, d, q)를 식별하는 규칙으로 가장 옳은 것은?",
    choices: [
      "자기회귀 모형 AR(p)은 ACF가 p차 시차 이후 절단(Cut-off)되고, PACF는 지수적으로 감소하거나 소멸한다.",
      "자기회귀 모형 AR(p)은 PACF가 p차 시차 이후 절단(Cut-off)되고, ACF는 지수적으로 감소하거나 소멸하는 형태를 띤다.",
      "이동평균 모형 MA(q)은 PACF가 q차 시차 이후 절단(Cut-off)되고, ACF는 지수적으로 감소한다.",
      "ARIMA(p, d, q) 모형에서 d=0인 모형은 비정상(Non-stationary) 시계열에만 적용할 수 있는 적분 모형이다."
    ],
    answer: 1,
    explanation: "시계열 ARIMA 차수 판별 규칙 (필수 암기!):\n1) **AR(p) 모형:** **PACF가 p차 이후 절단(Cut-off)** / ACF는 점진적 감쇄(Tails off)\n2) **MA(q) 모형:** **ACF가 q차 이후 절단(Cut-off)** / PACF는 점진적 감쇄(Tails off)\n3) **ARMA(p, q) 모형:** ACF와 PACF 둘 다 점진적 감쇄\n4) d는 정상 시계열로 만들기 위한 차분(Differencing) 횟수이며, d=0이면 이미 정상성을 만족하는 ARMA 모형입니다.\n\n💡 실제 기출 포인트: 12회 3과목 시계열(ACF, 은닉마르코프 모델)에서 AR/MA 모형 식별 규칙이 출제되었습니다.",
    whyWrong: [
      "ACF가 절단되는 것은 MA(q) 모형입니다.",
      "정답입니다. AR(p) 모형은 PACF가 p차 이후 절단됩니다.",
      "MA(q) 모형은 PACF가 아니라 ACF가 q차 이후 절단됩니다.",
      "d=0이면 정상 시계열(차분 불필요) 상태를 의미합니다."
    ],
    memorizationPoint: "AR(p) = PACF가 p차에서 절단 / MA(q) = ACF가 q차에서 절단 (앞글자 짝: AR-PACF, MA-ACF)",
    examinerTip: "💡 출제위원 꿀팁: 'AR은 PACF에서 싹둑(절단), MA는 ACF에서 싹둑(절단)'으로 외우면 절대 헷갈리지 않습니다!"
  },

  // --- [4과목] 빅데이터 결과 해석 (4문항: Q_PASS_445 ~ 448) ---
  {
    id: "Q_PASS_445",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 이진 분류 모델의 ROC(Receiver Operating Characteristic) 곡선과 AUC(Area Under the Curve)에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "ROC 곡선의 X축은 위양성률(FPR = 1 - 특이도)이고, Y축은 민감도(TPR / 재현율)이다.",
      "완벽하게 분류하는 이상적인 모델의 ROC 곡선은 좌측 상단 모서리 (0, 1)을 통과하며 AUC 값은 1.0이 된다.",
      "무작위로 동전을 던져 찍는 수준의 모델(Random Classifier)의 ROC 곡선은 대각선(y = x)을 나타내며 AUC 값은 약 0.5이다.",
      "ROC 곡선 아래 면적인 AUC 값은 0과 1 사이의 값을 가지며, 0.5 미만의 값이 나오면 최고의 성능을 의미한다."
    ],
    answer: 3,
    explanation: "AUC(Area Under the Curve) 값은 0.5에서 1.0 사이에서 평가되며, **1.0에 가까울수록 모델의 분류 성능이 완벽**함을 의미합니다. AUC가 0.5이면 순수 무작위 추측 수준(Random Guess)이고, 0.5 미만이면 분류 기준(0과 1의 레이블)이 반대로 뒤집혀 있다는 뜻입니다.\n\n💡 실제 기출 포인트: 12회 4과목 분류성능(3문항)에서 ROC 커브의 축(X축: FPR, Y축: TPR)과 AUC 해석이 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. X축: 1 - Specificity (FPR), Y축: Recall (TPR).",
      "올바른 설명입니다. 완벽한 모델은 좌상단(0,1)에 위치하며 AUC=1.0 입니다.",
      "올바른 설명입니다. 대각선은 랜덤 모델(AUC=0.5)을 뜻합니다.",
      "정답입니다. AUC는 1.0에 가까울수록 최우수 성능입니다."
    ],
    memorizationPoint: "ROC Curve: X축 = FPR (1-특이도), Y축 = TPR (민감도/재현율) | AUC 1.0=완벽, 0.5=무작위",
    examinerTip: "💡 출제위원 함정: 'ROC 곡선의 X축이 정밀도(Precision)이다' 또는 'X축이 특이도(Specificity) 자체이다'는 대표 오답입니다 (1-특이도 임)."
  },
  {
    id: "Q_PASS_446",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 암 환자 진단이나 금융 사기 탐지처럼 '실제 양성(Positive)을 놓치지 않고 최대한 많이 찾아내는 것(재현율, Recall)'이 정밀도(Precision)보다 훨씬 중요한 경우, 가중 조화평균 지표인 F_β Score에서 β(베타) 값으로 가장 적절한 것은?",
    choices: [
      "β = 0 (정밀도와 재현율을 모두 무시)",
      "β = 0.5 (F0.5 Score: 정밀도에 2배 가중치)",
      "β = 1.0 (F1 Score: 정밀도와 재현율에 동일한 가중치)",
      "β = 2.0 (F2 Score: 재현율에 2배 가중치)"
    ],
    answer: 3,
    explanation: "F_β 공식: $F_\\beta = (1 + \\beta^2) \\times \\frac{\\text{Precision} \\times \\text{Recall}}{(\\beta^2 \\times \\text{Precision}) + \\text{Recall}}$\n\n1) **β = 1:** **F1-Score** (정밀도와 재현율에 동일한 1:1 가중치 부여)\n2) **β = 2:** **F2-Score** (재현율 Recall에 2배의 가중치를 부여 → 암 진단, 사기 탐지, 불량품 검출 등 **놓치면 치명적인 경우** 사용)\n3) **β = 0.5:** **F0.5-Score** (정밀도 Precision에 2배의 가중치를 부여 → 스팸 메일 필터링 등 **오탐이 치명적인 경우** 사용)\n\n💡 실제 기출 포인트: 12회 4과목 분류성능에서 F1 Score와 함께 F2 Score의 목적과 가중치 의미가 복원되었습니다.",
    whyWrong: [
      "β=0은 수학적으로 무의미합니다.",
      "F0.5 Score는 정밀도(Precision)를 더 중시할 때 사용합니다.",
      "F1 Score는 두 지표를 동일하게 중요하게 볼 때 씁니다.",
      "정답입니다. 재현율(Recall)을 2배 더 중요하게 평가할 때는 F2-Score를 사용합니다."
    ],
    memorizationPoint: "F1 = 동일 가중치 | F2 = 재현율(Recall) 2배 가중 (암 진단) | F0.5 = 정밀도(Precision) 2배 가중 (스팸 필터)",
    examinerTip: "💡 출제위원 꿀팁: β > 1 이면 재현율 중시(F2), β < 1 이면 정밀도 중시(F0.5)라는 관계는 고득점 변별력 문제입니다."
  },
  {
    id: "Q_PASS_447",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1-0",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 데이터 샘플 수가 n개인 데이터셋에서 1개의 샘플만을 검증(Test) 데이터로 사용하고 나머지 (n - 1)개 샘플로 모델을 훈련시키는 과정을 n번 반복하여 평균 성능을 산출하는 교차 검증 기법은?",
    choices: [
      "홀드아웃 교차 검증 (Hold-out Validation)",
      "LOOCV (Leave-One-Out Cross Validation)",
      "층화 K-Fold 교차 검증 (Stratified K-Fold CV)",
      "부트스트랩 (Bootstrap Resampling)"
    ],
    answer: 1,
    explanation: "**LOOCV (Leave-One-Out Cross Validation)**는 K-Fold 교차 검증의 극단적인 형태로 $K = n$인 경우입니다. 전체 $n$개 샘플 중 딱 1개만 테스트 데이터로 남겨두고 나머지 $(n-1)$개로 훈련하며 이를 $n$번 반복합니다.\n• **장점:** 편향(Bias)이 매우 낮고 데이터 낭비가 없어 소규모 데이터셋에 효과적임.\n• **단점:** 모델을 $n$번 새로 학습시켜야 하므로 데이터가 많을 경우 계산 비용이 극도로 높음.\n\n💡 실제 기출 포인트: 12회 4과목 교차검증(2문항)에서 LOOCV와 홀드아웃/랜덤서브샘플링 비교가 복원되었습니다.",
    whyWrong: [
      "홀드아웃은 데이터를 단순히 Train(70%)/Test(30%) 1회 분할하는 방식입니다.",
      "정답입니다. n번 반복하여 1개씩 남겨놓는 LOOCV 입니다.",
      "층화 K-Fold는 타겟 레이블의 비율을 유지하며 K개 폴드로 나누는 방식입니다.",
      "부트스트랩은 중복 복원추출을 의미합니다."
    ],
    memorizationPoint: "LOOCV (Leave-One-Out CV): K = n. 편향 최소화, 계산량 최대(대용량 데이터 부적합)",
    examinerTip: "💡 출제위원 함정: 'LOOCV는 계산 비용이 가장 저렴하여 대용량 빅데이터에 가장 추천된다'는 문장은 정반대 오답입니다."
  },
  {
    id: "Q_PASS_448",
    subject: 4,
    chapter: "분석결과 시각화",
    sectionId: "s4-3",
    cardId: "c4-3",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 4개 이상의 연속형 변수를 가진 고차원 다변량 데이터를 2차원 평면에 표현하기 위해, 평행한 수직 축들을 나열하고 각 데이터 포인트를 이 축들 사이를 잇는 꺾은선으로 시각화하여 변수 간 패턴과 군집을 탐색하는 기법은?",
    choices: [
      "히스토그램 (Histogram)",
      "상자 그림 (Boxplot)",
      "평행 좌표 그림 (Parallel Coordinates Plot)",
      "체르노프 페이스 (Chernoff Faces)"
    ],
    answer: 2,
    explanation: "**평행 좌표 그림 (Parallel Coordinates Plot)**은 다차원(고차원) 연속형 데이터를 시각화하는 대표적인 다변량 시각화 도구입니다. 세로로 평행하게 배치된 여러 축에 각 변수의 값을 표시하고 이 점들을 선(Line)으로 연결하여, 변수들 간의 상관관계, 군집 패턴, 이상치 프로파일을 한눈에 파악할 수 있습니다.\n\n💡 실제 기출 포인트: 12회 4과목 시각화(5문항)에서 평행좌표, 인포그래픽, 상자그림, 산점도, 히스토그램이 대거 복원되었습니다.",
    whyWrong: [
      "히스토그램은 단일 연속형 변수의 도수분포를 나타내는 막대 형태 그래프입니다.",
      "상자 그림은 사분위수를 이용해 이상치와 분포의 대칭성을 보는 도구입니다.",
      "정답입니다. 다변량 변수 축들을 평행하게 나열해 선으로 잇는 평행 좌표 플롯입니다.",
      "체르노프 페이스는 사람 얼굴 표정의 각 부위(눈, 코, 입)에 변수를 매핑하는 시각화 기법입니다."
    ],
    memorizationPoint: "평행 좌표 그림 (Parallel Coordinates): 평행 수직축 + 꺾은선 연결 → 고차원 다변량 상관/군집 탐색",
    examinerTip: "💡 출제위원 꿀팁: 4과목 시각화는 '차원(단변량 vs 이변량 vs 다변량)'과 '목적(분포 vs 관계 vs 비교)' 매핑이 단골 출제됩니다."
  }
];

// 중복 검증 후 추가
const existingIds = new Set(bank.questions.map(q => q.id));
let addedCount = 0;
extra12thQuestions.forEach(q => {
  if (!existingIds.has(q.id)) {
    bank.questions.push(q);
    existingIds.add(q.id);
    addedCount++;
  }
});

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`[cbt_bank.json] Successfully added ${addedCount} additional 12th exam questions! Total in bank: ${bank.questions.length}`);
