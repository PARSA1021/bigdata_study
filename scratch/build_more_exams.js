const fs = require('fs');
const path = require('path');

const bankJsonPath = path.join(__dirname, '../cbt_bank.json');
const bankJsPath = path.join(__dirname, '../cbt_bank.js');

const rawBank = JSON.parse(fs.readFileSync(bankJsonPath, 'utf8'));

// 50 More High-Yield Authentic Restoration Questions (25 from 9th round, 25 from 8th round)
const moreQuestions = [
  // ========================================================
  // [9회 추가 기출 복원 25문항 (Q9_26 ~ Q9_50)]
  // ========================================================
  {
    id: "Q9_26",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 분석 과제의 우선순위 평가 매트릭스에서 '시급성(비즈니스 효과/Value)'과 '난이도(투자/실행 용이성/Volume)'를 기준으로 4개 사분면을 분류할 때, 시급성은 높으나 난이도가 어려워(복잡도 높음) 장기적 과제로 추진해야 하는 사분면은?",
    choices: [
      "1순위 영역 (시급성 높음, 난이도 쉬움 - Quick Win)",
      "2순위 영역 (시급성 낮음, 난이도 쉬움)",
      "3순위 영역 (시급성 높음, 난이도 어려움 - 중장기 과제)",
      "4순위 영역 (시급성 낮음, 난이도 어려움 - 보류)"
    ],
    answer: 2,
    explanation: "과제 우선순위 매트릭스에서 시급성이 높아 가치는 크지만 난이도가 높은(어려운) 과제는 3순위 영역에 해당하며, 역량을 축적한 뒤 추진하는 중장기 전략 과제로 설정합니다.",
    whyWrong: [
      "1순위는 시급성 높음 + 난이도 쉬움(Quick Win)입니다.",
      "2순위는 시급성 낮음 + 난이도 쉬움(단기 실행)입니다.",
      "정답: 시급성 높음 + 난이도 어려움 = 3순위(중장기 추진 과제).",
      "4순위는 시급성 낮음 + 난이도 어려움(보류/취소)입니다."
    ],
    optionTraps: [
      "1번 선지: 가장 먼저 할 일 = 1순위 (시급성 높음, 난이도 쉬움).",
      "3번 선지 (정답): 가치 높으나 어려움 ➔ 3순위 중장기 과제."
    ],
    memorizationPoint: "과제 우선순위: 1순위(시급高, 난이도易) ➔ 2순위(시급低, 난이도易) ➔ 3순위(시급高, 난이도難) ➔ 4순위(시급低, 난이도難)",
    examinerTip: "💡 사분면 순서(1➔2➔3➔4)는 필기 1과목에 매년 빠짐없이 나오는 고정 문제입니다."
  },
  {
    id: "Q9_27",
    subject: 1,
    chapter: "데이터 품질 및 거버넌스",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터 품질 관리의 평가 지표 중 '사용자가 원하는 시점에 데이터가 지연(Delay) 없이 적시에 제공되고 최신성을 유지하는 정도'를 뜻하는 품질 속성은?",
    choices: [
      "정확성 (Accuracy)",
      "적시성 (Timeliness)",
      "완전성 (Completeness)",
      "일관성 (Consistency)"
    ],
    answer: 1,
    explanation: "적시성(Timeliness)은 데이터가 비즈니스 의사결정에 필요한 시점에 지체 없이 즉각 제공되며, 최신의 상태로 갱신되어 있는지를 나타내는 데이터 품질 지표입니다.",
    whyWrong: [
      "정확성은 실세계 값과 오차 없이 일치하는 정도입니다.",
      "정답: 지연 없이 필요한 시점에 제공 및 최신성 유지 = 적시성(Timeliness).",
      "완전성은 결측치(누락) 없이 데이터가 꽉 차 있는 비율입니다.",
      "일관성은 여러 시스템 간에 데이터가 모순되지 않고 일치하는 정도입니다."
    ],
    optionTraps: [
      "2번 선지 (정답): 시간, 지연 없음, 최신성 ➔ 적시성(Timeliness)."
    ],
    memorizationPoint: "적시성(Timeliness) ➔ 지연 없음, 제때 제공, 최신 상태 유지",
    examinerTip: "💡 데이터 품질 6대 지표: 정확성(참값 부합), 완전성(누락 없음), 일관성(모순 없음), 유효성(도메인/규칙 충족), 적시성(지연 없음), 유일성(중복 없음)."
  },
  {
    id: "Q9_28",
    subject: 1,
    chapter: "데이터 거버넌스 및 비식별 조치",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 개인정보 비식별 조치 기법 중 '실제 나이 27세를 20대(20~29세)로 변환'하거나 '소득 4,320만 원을 4,000만~5,000만 원 구간으로 묶는' 조치 방법은?",
    choices: [
      "가명처리 (Pseudonymization)",
      "데이터 범주화 (Categorization / Binning)",
      "식별자 삭제 (Suppression)",
      "암호화 (Encryption)"
    ],
    answer: 1,
    explanation: "데이터 범주화(Categorization / Data Binning)는 연속형 수치 데이터를 특정 범위(구간, 예: 20대, 30대)나 범주형 그룹으로 묶어 세부적인 개인 식별성을 완화하는 기법입니다.",
    whyWrong: [
      "가명처리는 이름을 임의의 ID나 해시값으로 1:1 대체하는 것입니다.",
      "정답: 수치를 연령대, 소득 구간 등으로 묶는 것은 데이터 범주화입니다.",
      "식별자 삭제는 필드 자체를 지우는 것입니다.",
      "암호화는 키를 이용해 가독 불가능한 암호문으로 바꾸는 기법입니다."
    ],
    optionTraps: [
      "1번 선지: 단순 대체와 구간 묶기는 다릅니다.",
      "2번 선지 (정답): 27세 ➔ 20대, 4300만원 ➔ 4천~5천만원 구간화 = 데이터 범주화."
    ],
    memorizationPoint: "수치 ➔ 구간 묶기 (20대, 30대) ➔ 데이터 범주화(Categorization)",
    examinerTip: "💡 범주화(감경, 범제화, 수치 구간화, 랜덤 올림) 세부 유형도 시험에 자주 나옵니다."
  },
  {
    id: "Q9_29",
    subject: 1,
    chapter: "데이터 분석 방법론",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터베이스에서 가치 있는 지식을 추출하는 KDD(Knowledge Discovery in Databases) 분석 절차의 5단계 순서로 올바른 것은?",
    choices: [
      "데이터셋 선택 ➔ 데이터 전처리 ➔ 데이터 변환 ➔ 데이터 마이닝 ➔ 평가 및 해석",
      "데이터 수집 ➔ 모델링 ➔ 데이터 정제 ➔ 변환 ➔ 배포",
      "비즈니스 이해 ➔ 데이터 준비 ➔ 데이터 이해 ➔ 마이닝 ➔ 전개",
      "문제 정의 ➔ 데이터 변환 ➔ 전처리 ➔ 모델링 ➔ 평가"
    ],
    answer: 0,
    explanation: "KDD 분석 방법론의 5단계 절차는 [1단계: 데이터셋 선택(Selection)] ➔ [2단계: 데이터 전처리(Preprocessing)] ➔ [3단계: 데이터 변환(Transformation)] ➔ [4단계: 데이터 마이닝(Data Mining)] ➔ [5단계: 결과 평가 및 해석(Interpretation/Evaluation)] 입니다.",
    whyWrong: [
      "정답: 선택 ➔ 전처리 ➔ 변환 ➔ 마이닝 ➔ 평가.",
      "단계 순서가 잘못 섞인 오답입니다.",
      "CRISP-DM 단계와 혼합된 오답입니다.",
      "전처리와 변환 순서가 뒤바뀐 오답입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): KDD 5단계 = 선 ➔ 전 ➔ 변 ➔ 마 ➔ 평.",
      "전처리와 변환의 선후 관계(전처리가 먼저, 변환이 나중)를 헷갈리지 마세요."
    ],
    memorizationPoint: "KDD 5단계 ➔ 선·전·변·마·평 (선택 ➔ 전처리 ➔ 변환 ➔ 마이닝 ➔ 평가)",
    examinerTip: "💡 KDD(선전변마평) vs CRISP-DM(비·데이·데준·모·평·전) 두 방법론 비교는 100% 출제됩니다."
  },
  {
    id: "Q9_30",
    subject: 1,
    chapter: "데이터 분석 기획",
    sectionId: "s1-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 하향식 접근법(Top-down)의 1단계인 '문제 탐색'에서 비즈니스 모델 캔버스를 활용하여 기업 내부 및 외부 환경의 과제를 빠짐없이 도출하는 5대 탐색 영역에 포함되지 않는 것은?",
    choices: [
      "업무 (Operation)",
      "제품 (Product)",
      "고객 (Customer)",
      "인공지능 딥러닝 프레임워크 (Framework)"
    ],
    answer: 3,
    explanation: "비즈니스 모델 캔버스 기반 과제 탐색의 5대 영역은 [업무(Operation), 제품(Product), 고객(Customer), 규제와 감사(Regulation & Audit), 지원 인프라(IT & Human Resource)] 입니다. 딥러닝 프레임워크는 기술적 도구일 뿐 비즈니스 탐색 영역이 아닙니다.",
    whyWrong: [
      "업무는 내부 프로세스 효율화 관점의 탐색 영역입니다.",
      "제품은 제품 및 서비스 혁신 관점의 탐색 영역입니다.",
      "고객은 고객 경험 및 타겟팅 관점의 탐색 영역입니다.",
      "정답: 딥러닝 프레임워크는 비즈니스 모델 캔버스의 5대 탐색 영역이 아닙니다."
    ],
    optionTraps: [
      "1~3번 선지: 비즈니스 캔버스 5대 영역 (업무, 제품, 고객, 규제/감사, 지원 인프라).",
      "4번 선지 (정답): 단순 기술 도구는 비즈니스 과제 도출 영역이 아닙니다."
    ],
    memorizationPoint: "비즈니스 모델 캔버스 5대 탐색 ➔ 업·제·고·규·지 (업무, 제품, 고객, 규제/감사, 지원인프라)",
    examinerTip: "💡 1과목 3초 암기: '업·제·고·규·지' 5글자를 기억하면 3초 만에 오답을 걸러낼 수 있습니다."
  },
  {
    id: "Q9_31",
    subject: 2,
    chapter: "데이터 전처리 및 스케일링",
    sectionId: "s2-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터의 평균을 0, 표준편차를 1로 변환하는 표준화(Standardization / Z-Score) 공식으로 올바른 것은? (단, $x$는 원시값, $\\mu$는 평균, $\\sigma$는 표준편차)",
    choices: [
      "Z = (x - \\mu) / \\sigma",
      "Z = (x - \\text{Min}) / (\\text{Max} - \\text{Min})",
      "Z = (x - \\mu) / (\\text{Max} - \\text{Min})",
      "Z = \\sigma / (x - \\mu)"
    ],
    answer: 0,
    explanation: "Z-Score 표준화(Standardization) 공식은 $Z = \\frac{x - \\mu}{\\sigma}$ 입니다. (Min-Max 정규화 공식은 $\\frac{x - \\text{Min}}{\\text{Max} - \\text{Min}}$)",
    whyWrong: [
      "정답: Z-Score 표준화 공식 = (x - 평균) / 표준편차.",
      "Min-Max 정규화(0~1 변환) 공식입니다.",
      "분모 분자가 잘못 조합된 오답입니다.",
      "분모 분자가 역수로 뒤집힌 오답입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 표준화 Z = (x - 평균) / 표준편차.",
      "2번 선지: Min-Max 정규화와의 구분이 중요합니다."
    ],
    memorizationPoint: "표준화 Z = (x - 평균) / 표준편차 / 정규화 = (x - Min) / (Max - Min)",
    examinerTip: "💡 평균 70, 표준편차 10일 때 점수 90점의 Z점수는 $(90-70)/10 = 2.0$ 입니다. 간단 계산 문제로 자주 출제됩니다."
  },
  {
    id: "Q9_32",
    subject: 2,
    chapter: "데이터 전처리 및 인코딩",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 범주형 변수를 0과 1로 구성된 이진 벡터로 변환하는 '원-핫 인코딩(One-Hot Encoding)'을 범주 수가 매우 많은 고유값(High Cardinality, 예: 10,000개 우편번호) 변수에 적용할 때 발생하는 주된 문제점은?",
    choices: [
      "데이터가 과도하게 압축되어 정보 손실이 극심해진다.",
      "대다수 값이 0인 희소 행렬(Sparse Matrix)이 생성되어 차원이 폭발하고 메모리 낭비 및 차원의 저주가 발생한다.",
      "모든 변수 간에 완벽한 비선형 관계가 강제로 부여된다.",
      "결측값(Null)이 자동으로 평균값으로 대치된다."
    ],
    answer: 1,
    explanation: "원-핫 인코딩은 고유 범주 수만큼 새로운 열(Column)을 생성하므로, 고유 범주가 많을 경우 대부분이 0인 희소 행렬(Sparse Matrix)이 되어 차원의 저주(Curse of Dimensionality), 과대적합, 연산 비용 급증 문제가 발생합니다. 이 경우 타깃 인코딩이나 임베딩을 고려해야 합니다.",
    whyWrong: [
      "압축이 아니라 차원이 수천~수만 개로 폭발적으로 늘어납니다.",
      "정답: 희소 행렬(Sparse Matrix) 생성 및 차원의 저주 발생.",
      "비선형 관계를 강제하는 것이 아닙니다.",
      "결측치 대치와 무관합니다."
    ],
    optionTraps: [
      "1번 선지: 차원 축소가 아니라 차원 확장이 일어납니다.",
      "2번 선지 (정답): 희소 행렬(Sparse), 차원의 저주 = 원-핫 인코딩의 대표 단점."
    ],
    memorizationPoint: "원-핫 인코딩 단점 ➔ 희소 행렬(Sparse Matrix) & 차원의 저주 (차원 폭발)",
    examinerTip: "💡 범주형 인코딩: 레이블 인코딩(순서 강제 왜곡 위험) vs 원-핫 인코딩(희소 행렬/차원 폭발 위험) 2대 단점을 꼭 기억하세요."
  },
  {
    id: "Q9_33",
    subject: 2,
    chapter: "기술 통계 및 데이터 분포",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터의 왜도(Skewness)가 음수($\\text{Skewness} < 0$)인 '왼쪽 꼬리가 긴 분포(Negative Skew)'에서 평균(Mean), 중앙값(Median), 최빈값(Mode)의 크기 관계는?",
    choices: [
      "최빈값 > 중앙값 > 평균",
      "평균 > 중앙값 > 최빈값",
      "중앙값 > 최빈값 > 평균",
      "평균 = 중앙값 = 최빈값"
    ],
    answer: 0,
    explanation: "왜도가 음수($<0$)이면 왼쪽으로 긴 꼬리를 갖는 분포(Negative Skew)가 되며, 극단적으로 작은 값들에 의해 평균이 왼쪽으로 가장 크게 끌려 내려가므로 **최빈값 > 중앙값 > 평균** 순서가 됩니다.",
    whyWrong: [
      "정답: 왼쪽 꼬리 분포(왜도<0) = 최빈값 > 중앙값 > 평균.",
      "평균 > 중앙값 > 최빈값 은 오른쪽 꼬리 분포(왜도>0)입니다.",
      "중앙값이 가장 큰 경우는 일반 단봉 분포에서 성립하지 않습니다.",
      "모두 같은 것은 좌우 대칭 정규분포(왜도=0)입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 왼쪽 꼬리(왜도<0) ➔ 작은 값 때문에 평균이 가장 작음(최 > 중 > 평).",
      "2번 선지: 오른쪽 꼬리(왜도>0)와의 반대 관계입니다."
    ],
    memorizationPoint: "왼쪽 꼬리(왜도<0) ➔ 최 > 중 > 평 / 오른쪽 꼬리(왜도>0) ➔ 평 > 중 > 최",
    examinerTip: "💡 '왼쪽 꼬리는 평균이 가장 왼쪽(최소)'로 외우면 1초 킬러입니다."
  },
  {
    id: "Q9_34",
    subject: 2,
    chapter: "통계적 가설 검정 및 분산분석",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 3개 이상의 표본 집단 간 평균 차이를 검정하는 분산분석(ANOVA : Analysis of Variance)을 수행하기 위해 데이터가 만족해야 하는 3대 기본 가정은?",
    choices: [
      "정규성, 등분산성, 독립성",
      "선형성, 다중공선성, 정규성",
      "등분산성, 비모수성, 대칭성",
      "단조성, 유의성, 상호작용성"
    ],
    answer: 0,
    explanation: "분산분석(ANOVA)의 3대 기본 가정은 [1. 정규성(각 집단은 정규분포를 따른다), 2. 등분산성(각 집단의 분산은 동일하다), 3. 독립성(각 집단과 표본은 서로 독립적이다)] 입니다.",
    whyWrong: [
      "정답: ANOVA 3대 가정 = 정규성, 등분산성, 독립성.",
      "선형성과 다중공선성은 회귀 분석 관련 개념입니다.",
      "비모수성은 가정이 아니라 가정을 만족하지 못할 때 쓰는 방법입니다.",
      "분산분석 기본 가정이 아닙니다."
    ],
    optionTraps: [
      "1번 선지 (정답): ANOVA 3대 가정 ➔ 정·등·독 (정규성, 등분산성, 독립성).",
      "회귀 4대 가정(선·독·등·정)에서 '선형성'을 뺀 3개가 ANOVA 3대 가정입니다."
    ],
    memorizationPoint: "ANOVA 3대 가정 ➔ 정·등·독 (정규성, 등분산성, 독립성)",
    examinerTip: "💡 회귀분석 가정(선·독·등·정 4개)과 ANOVA 가정(정·등·독 3개)을 헷갈리게 섞는 보기가 빈출입니다."
  },
  {
    id: "Q9_35",
    subject: 2,
    chapter: "통계적 가설 검정",
    sectionId: "s2-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 두 독립표본의 평균 차이를 비교할 때, 두 집단이 정규분포는 따르지만 두 집단의 분산이 서로 다른 '이분산(Heteroscedasticity)' 상태일 때 적용하는 t-검정 방법은?",
    choices: [
      "스튜던트 t-검정 (Student's t-test)",
      "대응표본 t-검정 (Paired t-test)",
      "웰치의 t-검정 (Welch's t-test)",
      "일표본 t-검정 (One-sample t-test)"
    ],
    answer: 2,
    explanation: "두 독립 집단의 분산이 같을 때는 합동 분산을 사용하는 스튜던트 t-검정(Student's t-test)을 사용하지만, 등분산 가정이 깨져 이분산 상태일 때는 자유도를 보정한 **웰치의 t-검정(Welch's t-test)**을 적용합니다.",
    whyWrong: [
      "스튜던트 t-검정은 두 집단의 분산이 동일한 등분산일 때 사용합니다.",
      "대응표본 t-검정은 동일 집단의 전후 비교에 사용합니다.",
      "정답: 두 집단 이분산 시 적용하는 t-검정 = 웰치의 t-검정(Welch's t-test).",
      "일표본 t-검정은 단일 집단의 평균을 특정 기준값과 비교할 때 사용합니다."
    ],
    optionTraps: [
      "1번 선지: 등분산 만족 ➔ Student's t-test.",
      "3번 선지 (정답): 이분산(등분산 미만족) ➔ Welch's t-test!"
    ],
    memorizationPoint: "독립 2집단 등분산 ➔ Student t / 이분산 ➔ Welch t / 비모수 ➔ Mann-Whitney"
  },
  {
    id: "Q9_36",
    subject: 3,
    chapter: "지도학습 및 회귀 진단",
    sectionId: "s3-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 다중 회귀 분석에서 독립변수 간 다중공선성(Multicollinearity) 문제를 해결하기 위한 방법으로 가장 적절하지 않은 것은?",
    choices: [
      "상관관계가 매우 높은 두 독립변수 중 하나를 모델에서 제거한다.",
      "주성분 분석(PCA)을 수행하여 상호 독립적인 주성분 변수로 차원을 축소한다.",
      "Ridge나 Lasso와 같은 가중치 규제(Regularization) 회귀 모델을 적용한다.",
      "다중공선성이 존재하는 변수들을 그대로 두고, 상관관계가 높은 또 다른 새로운 독립변수를 대거 추가한다."
    ],
    answer: 3,
    explanation: "다중공선성은 독립변수 간 강한 상관관계로 인해 발생하므로, 상관관계가 높은 변수를 더 추가하면 다중공선성이 더욱 악화됩니다. 변수 제거, PCA 차원 축소, Ridge/Lasso 규제 적용, 능형회귀 등이 올바른 해결책입니다.",
    whyWrong: [
      "상관관계 높은 변수 중 하나를 제거하는 것은 가장 직관적인 해결책입니다.",
      "PCA 차원 축소는 주성분 간 독립성을 보장하므로 완벽한 해결책입니다.",
      "Ridge/Lasso 규제는 다중공선성에 의한 계수 폭발을 막아줍니다.",
      "정답: 상관된 변수를 더 추가하는 것은 다중공선성을 심화시키는 잘못된 방법입니다."
    ],
    optionTraps: [
      "1~3번 선지: 다중공선성 3대 해결법(변수 제거, PCA 축소, Ridge/Lasso 규제).",
      "4번 선지 (정답): 상식적으로 문제를 악화시키는 행동입니다."
    ],
    memorizationPoint: "다중공선성 해결 ➔ 변수 제거 / PCA 차원 축소 / Ridge·Lasso 규제"
  },
  {
    id: "Q9_37",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 서포트 벡터 머신(SVM)에서 규제 매개변수(Cost / Regularization Parameter) $C$의 값을 매우 크게(Large C) 설정했을 때 모델의 동작 특성으로 올바른 것은?",
    choices: [
      "오분류(슬랙 변수)를 거의 허용하지 않는 하드 마진(Hard Margin)에 가까워져, 마진이 좁아지고 과대적합(Overfitting) 위험이 커진다.",
      "오분류를 너그럽게 허용하는 소프트 마진(Soft Margin)이 되어, 마진이 넓어지고 과소적합(Underfitting) 위험이 커진다.",
      "결정 초평면이 완벽한 1차원 직선으로만 단순화된다.",
      "서포트 벡터의 개수가 데이터 전체 개수만큼 급증하여 모델이 둔감해진다."
    ],
    answer: 0,
    explanation: "SVM에서 C는 오분류에 대한 페널티(벌점) 크기입니다. C가 매우 크면 오분류를 용납하지 않으려 하므로(하드 마진), 마진 폭이 매우 좁아지고 결정 경계가 복잡해져 과대적합(Overfitting / High Variance) 위험이 커집니다. 반대로 C가 작으면 마진이 넓어지고 과소적합됩니다.",
    whyWrong: [
      "정답: C가 크면 하드 마진 ➔ 마진 좁음 ➔ 과대적합(Overfitting).",
      "소프트 마진과 넓은 마진은 C가 작을 때의 특성입니다.",
      "C값과 초평면의 차원 수와는 무관합니다.",
      "C가 크면 마진이 좁아져 서포트 벡터 수는 오히려 줄어듭니다."
    ],
    optionTraps: [
      "1번 선지 (정답): C 큼 = 벌점 큼 = 오분류 불허(하드마진) = 좁은 마진 = 복잡/과대적합.",
      "2번 선지: C 작음 = 벌점 작음 = 오분류 허용(소프트마진) = 넓은 마진 = 단순/과소적합."
    ],
    memorizationPoint: "SVM C값: C 큼 ➔ 하드마진(좁은 마진, 과대적합) / C 작음 ➔ 소프트마진(넓은 마진, 과소적합)"
  },
  {
    id: "Q9_38",
    subject: 3,
    chapter: "비지도학습 및 군집분석",
    sectionId: "s3-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] K-Means 군집 분석에서 초기에 무작위로 중심점(Centroid)을 선택할 경우 초기값 위치에 따라 군집 결과가 크게 왜곡되는 단점을 극복하기 위해, '첫 번째 중심점만 무작위로 뽑고 이후 중심점들은 기존 중심점들과 거리가 먼 데이터일수록 높은 확률로 선택되도록 설계된' 개선 알고리즘은?",
    choices: [
      "K-Means++",
      "K-Medoids (PAM)",
      "DBSCAN",
      "Mean-Shift"
    ],
    answer: 0,
    explanation: "K-Means++는 초기 중심점을 무작위로 다 뽑지 않고, 서로 최대한 멀리 떨어진 데이터 포인트를 확률적으로 중심점으로 선택하도록 하여 초기값 의존성 및 지역 최적해(Local Minima) 문제를 획기적으로 개선한 표준 K-Means 초기화 기법입니다.",
    whyWrong: [
      "정답: 초기 중심점 거리 확률 분산 배치 = K-Means++.",
      "K-Medoids는 중심점 대신 실제 데이터 포인트(메도이드)를 중심으로 삼는 기법입니다.",
      "DBSCAN은 밀도 기반 군집 기법입니다.",
      "Mean-Shift는 확률 밀도 함수의 피크를 찾아가는 군집 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): K-Means 초기값 개선 = K-Means++."
    ],
    memorizationPoint: "K-Means 초기값 문제 해결 ➔ K-Means++ (중심점 간 거리 기반 분산 선택)"
  },
  {
    id: "Q9_39",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 의사결정나무(Decision Tree)의 과대적합(Overfitting)을 방지하기 위해 설정하는 하이퍼파라미터 조절 방향으로 올바른 것은?",
    choices: [
      "최대 깊이(Max Depth)를 제한하여 작게 설정하고, 노드 분할을 위한 최소 샘플 수(Min Samples Split)를 크게 설정한다.",
      "최대 깊이(Max Depth)를 무제한으로 크게 늘리고, 최소 샘플 수를 1로 설정한다.",
      "리프 노드의 최소 샘플 수(Min Samples Leaf)를 1로 줄인다.",
      "나무가 완전히 순수 노드가 될 때까지 가지치기(Pruning)를 전혀 하지 않는다."
    ],
    answer: 0,
    explanation: "의사결정나무가 과대적합되는 것을 막으려면 깊이(Max Depth)를 제한(작게)하고, 노드를 쪼개기 위한 최소 샘플 수(Min Samples Split)나 리프 노드 최소 샘플 수(Min Samples Leaf)를 충분히 크게 설정하여 잔가지가 너무 많이 자라지 않도록 사전 가지치기를 해야 합니다.",
    whyWrong: [
      "정답: Max Depth 제한(작게) + Min Samples Split 크게 ➔ 과대적합 방지.",
      "깊이를 무제한으로 늘리면 100% 과대적합이 발생합니다.",
      "리프 샘플 수를 1로 줄이면 노이즈까지 학습하여 과대적합됩니다.",
      "가지치기를 안 하면 과대적합됩니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 깊이 줄이기, 분할 샘플 수 늘리기 ➔ 모델 단순화(과적합 방지)."
    ],
    memorizationPoint: "의사결정나무 과적합 방지 ➔ Max Depth 작게 / Min Samples 크게 / 가지치기(Pruning)"
  },
  {
    id: "Q9_40",
    subject: 3,
    chapter: "앙상블 머신러닝",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 앙상블 학습 기법인 배깅(Bagging)과 부스팅(Boosting)의 오차 감소 효과에 대한 설명으로 올바르게 짝지어진 것은?",
    choices: [
      "배깅은 주로 분산(Variance)을 감소시키고, 부스팅은 주로 편향(Bias)을 감소시킨다.",
      "배깅은 주로 편향(Bias)을 감소시키고, 부스팅은 주로 분산(Variance)을 감소시킨다.",
      "배깅과 부스팅 모두 오직 분산(Variance)만을 감소시킨다.",
      "배깅과 부스팅 모두 오직 편향(Bias)만을 감소시킨다."
    ],
    answer: 0,
    explanation: "배깅(Bagging, 예: Random Forest)은 여러 독립 모델의 평균/투표를 취하므로 **분산(Variance)을 줄여** 과대적합을 완화하고, 부스팅(Boosting, 예: XGBoost)은 이전 모델의 오차를 순차적으로 보정하므로 모델의 **편향(Bias)을 줄여** 예측 정확도를 끌어올립니다.",
    whyWrong: [
      "정답: 배깅 = 분산(Variance) 감소 / 부스팅 = 편향(Bias) 감소.",
      "배깅과 부스팅의 역할이 반대로 설명된 오답입니다.",
      "부스팅은 편향을 주로 감소시킵니다.",
      "배깅은 분산을 주로 감소시킵니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 배깅 ➔ 분산(Variance) 감소 / 부스팅 ➔ 편향(Bias) 감소."
    ],
    memorizationPoint: "배깅 = 분산(Variance) 감소 / 부스팅 = 편향(Bias) 감소",
    examinerTip: "💡 '배분(배깅-분산)', '부편(부스팅-편향)' 2글자 암기법으로 1초 만에 맞히세요."
  },
  {
    id: "Q9_41",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 베이즈 정리(Bayes' Theorem)에 기반한 나이브 베이즈(Naive Bayes) 분류기에서 계산 복잡도를 대폭 줄이기 위해 전제하는 '순진한(Naive)' 가정은?",
    choices: [
      "모든 클래스의 사전 확률이 항상 동일하다.",
      "클래스가 주어졌을 때 모든 입력 특성(Feature)들은 상호 조건부 독립(Conditionally Independent)이다.",
      "모든 데이터는 정규분포를 따르지 않는 비모수 데이터이다.",
      "독립변수와 종속변수 간에 완벽한 선형 관계가 성립한다."
    ],
    answer: 1,
    explanation: "나이브 베이즈(Naive Bayes)의 '나이브(Naive, 순진한)'라는 명칭은 현실에서는 변수 간 상관관계가 존재함에도 불구하고, '모든 특성들이 클래스가 주어졌을 때 서로 독립(조건부 독립)'이라고 과감하게 가정하여 확률 곱셈을 단순화했기 때문에 붙은 이름입니다.",
    whyWrong: [
      "사전 확률이 동일하다고 가정하지 않으며 데이터 비율대로 계산합니다.",
      "정답: 모든 특성이 상호 조건부 독립이라는 가정 = Naive 가정.",
      "가우시안 나이브 베이즈는 정규분포를 가정합니다.",
      "선형 관계를 가정하는 알고리즘이 아닙니다."
    ],
    optionTraps: [
      "2번 선지 (정답): 나이브 베이즈의 대전제 = 특성 간 상호 조건부 독립(Conditional Independence)."
    ],
    memorizationPoint: "나이브 베이즈 핵심 전제 ➔ 특성 간 상호 조건부 독립 (Conditional Independence)"
  },
  {
    id: "Q9_42",
    subject: 3,
    chapter: "딥러닝 최적화 및 옵티마이저",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 딥러닝에서 가장 널리 쓰이는 종합 옵티마이저인 Adam(Adaptive Moment Estimation)이 결합한 두 가지 최적화 기법의 조합으로 올바른 것은?",
    choices: [
      "Momentum (모멘텀) + RMSprop",
      "SGD + NAG",
      "AdaGrad + AdaDelta",
      "경사 하강법 + 유전 알고리즘"
    ],
    answer: 0,
    explanation: "Adam(Adaptive Moment Estimation)은 관성을 이용해 기울기 방향을 유지하는 **모멘텀(Momentum, 1차 모멘트)**과 지수이동평균으로 학습률 보폭을 조절하는 **RMSprop(2차 모멘트)**의 장점을 결합한 최적화 알고리즘입니다.",
    whyWrong: [
      "정답: Adam = Momentum(방향) + RMSprop(보폭/학습률).",
      "SGD와 NAG의 단순 결합이 아닙니다.",
      "AdaGrad와 AdaDelta의 결합이 아닙니다.",
      "유전 알고리즘과 무관합니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Adam = Momentum + RMSprop."
    ],
    memorizationPoint: "Adam = Momentum (1차 모멘트, 방향) + RMSprop (2차 모멘트, 학습률 보폭)"
  },
  {
    id: "Q9_43",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 암 환자 진단이나 화재 감지 모델과 같이, '실제 양성(환자)인 데이터를 정상으로 오진하여 놓치는 위음성(False Negative, FN) 오류의 치명적 대가가 매우 큰 분야'에서 최우선으로 극대화해야 하는 평가지표는?",
    choices: [
      "정밀도 (Precision)",
      "재현율 (Recall / 민감도)",
      "특이도 (Specificity)",
      "정확도 (Accuracy)"
    ],
    answer: 1,
    explanation: "암 진단, 화재 감지, 금융 사기 탐지 등 실제 양성을 놓치면 치명적인 시스템에서는 위음성(FN)을 최소화해야 하므로, 실제 양성 중 맞힌 비율인 **재현율(Recall = TP / (TP + FN))**을 최우선 지표로 삼아야 합니다. (스팸 필터는 무고한 메일 차단 FP 방지를 위해 정밀도가 중요)",
    whyWrong: [
      "정밀도는 FP(일반 메일을 스팸으로 오분류)를 줄여야 하는 스팸 필터에 적합합니다.",
      "정답: 암 진단, 화재 경보, 사기 탐지(FN 최소화) ➔ 재현율(Recall / 민감도).",
      "특이도는 실제 음성을 맞히는 비율입니다.",
      "정확도는 클래스 불균형 시 왜곡됩니다."
    ],
    optionTraps: [
      "1번 선지: 스팸 필터, 유튜브 추천 ➔ 정밀도(Precision).",
      "2번 선지 (정답): 암 진단, 화재 감지, 불량품 검출 ➔ 재현율(Recall / 민감도)."
    ],
    memorizationPoint: "암 진단 / 사기 탐지 / 화재 감지 ➔ 재현율(Recall / 민감도) 극대화",
    examinerTip: "💡 시험 3초 매칭: '암 진단, 사기 탐지' 나오면 ➔ 무조건 재현율(Recall)! '스팸 메일' 나오면 ➔ 정밀도(Precision)!"
  },
  {
    id: "Q9_44",
    subject: 4,
    chapter: "회귀 모델 평가 지표",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 부동산 가격 예측이나 수요 예측에서, 실제값($y$)보다 모델이 적게 예측한 '과소 예측(Under-estimation)'에 대해 과대 예측보다 더 가혹한 벌점(페널티)을 부여하는 손실 평가 지표는?",
    choices: [
      "MAE",
      "MSE",
      "RMSE",
      "RMSLE (Root Mean Squared Logarithmic Error)"
    ],
    answer: 3,
    explanation: "RMSLE(Root Mean Squared Logarithmic Error)는 실제값과 예측값에 로그를 취해 오차를 계산하므로, 스케일이 큰 이상치에 덜 민감하고, 예측값이 실제값보다 작은 과소 예측(Under-estimation)에 대해 더 큰 페널티를 부여하는 비대칭적 특성을 갖습니다.",
    whyWrong: [
      "MAE는 오차의 절댓값으로 대칭적입니다.",
      "MSE는 오차의 제곱으로 대칭적입니다.",
      "RMSE는 대칭적입니다.",
      "정답: 로그 변환 + 과소 예측 페널티 = RMSLE."
    ],
    optionTraps: [
      "4번 선지 (정답): RMSLE ➔ 과소 예측(Under-estimation)에 더 큰 페널티 부여."
    ],
    memorizationPoint: "과소 예측(Under-estimation) 페널티 ➔ RMSLE (Root Mean Squared Log Error)"
  },
  {
    id: "Q9_45",
    subject: 4,
    chapter: "회귀 잔차 진단",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 선형 회귀 모형의 잔차(Residual)가 시간에 따라 서로 상관되어 있는지를 검정하는 더빈-왓슨(Durbin-Watson) 통계량에 대한 설명으로 올바른 것은?",
    choices: [
      "통계량 $d \\approx 2$ 이면 잔차 간에 자기상관(Autocorrelation)이 없음을 의미한다.",
      "통계량 $d \\approx 0$ 이면 잔차 간에 완벽한 음의 자기상관이 있음을 의미한다.",
      "통계량 $d \\approx 4$ 이면 잔차 간에 완벽한 양의 자기상관이 있음을 의미한다.",
      "통계량의 범위는 0에서 무한대($\\infty$)까지이다."
    ],
    answer: 0,
    explanation: "더빈-왓슨(Durbin-Watson) 통계량 $d$의 범위는 0부터 4까지이며, $d \\approx 2$일 때 잔차 간 자기상관이 없는 독립적 상태(정상)입니다. $d \\approx 0$이면 양의 자기상관, $d \\approx 4$이면 음의 자기상관이 존재합니다.",
    whyWrong: [
      "정답: d = 2 이면 자기상관 없음(독립성 만족).",
      "d = 0 은 양의 자기상관입니다.",
      "d = 4 는 음의 자기상관입니다.",
      "범위는 0에서 4까지입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Durbin-Watson 통계량 2 ➔ 자기상관 없음 (독립성 만족).",
      "2, 3번 선지: 0(양의 상관)과 4(음의 상관)를 반대로 바꾼 함정입니다."
    ],
    memorizationPoint: "Durbin-Watson (0~4): 2 = 자기상관 없음(독립) / 0 = 양의 상관 / 4 = 음의 상관"
  },
  {
    id: "Q9_46",
    subject: 4,
    chapter: "다중 분류 평가",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 3개 이상의 다중 클래스 분류 모델에서 클래스별 F1-Score를 종합할 때, '각 클래스의 실제 샘플 수(Support)에 비례하여 가중 평균'을 산출하는 방식은?",
    choices: [
      "Micro Average (마이크로 평균)",
      "Macro Average (매크로 평균)",
      "Weighted Average (가중 평균)",
      "Harmonic Average (조화 평균)"
    ],
    answer: 2,
    explanation: "Weighted Average(가중 평균)는 클래스별 지표를 계산한 후 각 클래스가 전체 데이터셋에서 차지하는 샘플 수(Support) 비중에 비례하여 가중치를 주어 평균을 내는 방식입니다. (Macro는 샘플 수 무시 단순 산술평균, Micro는 전체 TP/FP/FN을 합산하여 단일 계산)",
    whyWrong: [
      "Micro는 전체 TP, FP, FN을 통합 계산하는 방식입니다.",
      "Macro는 클래스별 크기를 무시하고 단순 산술평균하는 방식입니다.",
      "정답: 클래스별 샘플 수 비중 가중치 적용 = Weighted Average.",
      "조화 평균은 두 지표 간의 균형 평균입니다."
    ],
    optionTraps: [
      "2번 선지: Macro Average는 클래스 크기 불균형을 무시하고 동등 취급합니다.",
      "3번 선지 (정답): 클래스 샘플 수 비례 가중 = Weighted Average."
    ],
    memorizationPoint: "Macro = 클래스별 단순 평균 / Micro = 전체 합산 단일 계산 / Weighted = 샘플 수 가중 평균"
  },
  {
    id: "Q9_47",
    subject: 4,
    chapter: "연관 규칙 분석",
    sectionId: "s4-4",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 연관성 분석(Association Rule)에서 항목 집합 A와 항목 집합 B에 대한 '지지도(Support)'의 수학적 정의는?",
    choices: [
      "P(A ∩ B) : 전체 거래 중 A와 B가 동시에 포함된 거래의 비율",
      "P(B | A) : A를 구매했을 때 B도 구매할 조건부 확률",
      "P(B | A) / P(B) : 향상도 비율",
      "P(A ∪ B) : A 또는 B가 포함된 합집합 비율"
    ],
    answer: 0,
    explanation: "지지도(Support)는 전체 거래 중에서 항목 A와 항목 B가 동시에 거래된 비율인 $P(A \\cap B) = \\frac{n(A \\cap B)}{N}$ 로 정의됩니다.",
    whyWrong: [
      "정답: 지지도(Support) = P(A ∩ B).",
      "P(B | A) 는 신뢰도(Confidence)의 공식입니다.",
      "향상도(Lift) 공식입니다.",
      "합집합 공식은 연관분석의 핵심 지표가 아닙니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 동시 발생 비율 = 지지도(Support).",
      "2번 선지: 조건부 확률 = 신뢰도(Confidence)."
    ],
    memorizationPoint: "지지도(Support) = P(A ∩ B) / 신뢰도(Confidence) = P(A ∩ B) / P(A) / 향상도(Lift) = 신뢰도 / P(B)"
  },
  {
    id: "Q9_48",
    subject: 4,
    chapter: "데이터 시각화",
    sectionId: "s4-4",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 2차원 평면 좌표(X축, Y축) 위에 점을 찍는 산점도(Scatterplot)를 확장하여, 원의 크기(Size)와 색상(Color)을 통해 3개 이상의 수치형 변수를 한 차트에 동시에 시각화하는 도표는?",
    choices: [
      "히스토그램 (Histogram)",
      "버블 차트 (Bubble Chart)",
      "상자그림 (Boxplot)",
      "파이 차트 (Pie Chart)"
    ],
    answer: 1,
    explanation: "버블 차트(Bubble Chart)는 X축, Y축 좌표뿐만 아니라 원(버블)의 크기와 색상을 활용하여 최대 3~4개의 변수를 한눈에 비교할 수 있는 다변량 시각화 도표입니다.",
    whyWrong: [
      "히스토그램은 단일 수치 변수의 도수 분포를 보는 막대형 차트입니다.",
      "정답: 원의 크기와 색상으로 다변량 시각화 = 버블 차트.",
      "상자그림은 사분위수를 통한 분포 및 이상치 파악용입니다.",
      "파이 차트는 단일 범주형 비율 파악용입니다."
    ],
    optionTraps: [
      "2번 선지 (정답): 원의 크기(Size) + 산점도 = 버블 차트(Bubble Chart)."
    ],
    memorizationPoint: "산점도 + 원 크기(Size) ➔ 버블 차트 (Bubble Chart)"
  },
  {
    id: "Q9_49",
    subject: 3,
    chapter: "차원 축소 및 지도 판별",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 지도학습 기반의 차원 축소 기법인 선형 판별 분석(LDA : Linear Discriminant Analysis)의 최적 투영 축 결정 기준은?",
    choices: [
      "클래스 간 분산(Between-class Variance)을 최대화하고, 클래스 내 분산(Within-class Variance)을 최소화한다.",
      "전체 데이터의 분산(Total Variance)을 무조건 최대화한다.",
      "데이터 포인트 간의 유클리드 거리를 무조건 최소화한다.",
      "이상치(Outlier)의 영향력을 최대화한다."
    ],
    answer: 0,
    explanation: "LDA는 정답 라벨(클래스) 정보를 활용하여, '서로 다른 클래스 간의 거리는 최대한 멀리 떨어뜨리고(클래스 간 분산 최대화)', '같은 클래스에 속한 데이터들은 최대한 빽빽하게 모이도록(클래스 내 분산 최소화)' 하는 최적의 축을 찾습니다.",
    whyWrong: [
      "정답: 클래스 간 분산 최대화 & 클래스 내 분산 최소화 = LDA.",
      "전체 분산 최대화는 비지도학습인 PCA의 원리입니다.",
      "거리 최소화는 LDA의 원리가 아닙니다.",
      "이상치 최대화는 잘못된 설명입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): LDA ➔ 클래스 간 분산(Between) 최대 / 클래스 내 분산(Within) 최소.",
      "2번 선지: PCA(라벨 없는 전체 분산 최대화)와의 구분이 중요합니다."
    ],
    memorizationPoint: "LDA ➔ 클래스 간 분산 최대화 & 클래스 내 분산 최소화 (지도 차원축소)"
  },
  {
    id: "Q9_50",
    subject: 1,
    chapter: "데이터 거버넌스 및 분석 조직",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 기업의 데이터 분석 조직 구조 3가지 중 '별도의 전사 분석 전담 조직이 독립적으로 존재하면서, 분석 인력들이 각 사업 부서에 배치되어 협업을 수행함으로써 전사적 분석 통제와 현업 실무 적용을 동시에 달성하는 구조'는?",
    choices: [
      "집중 구조 (Concentrated)",
      "기능 구조 (Functional)",
      "확산 / 분산 구조 (CoE / Matrix / Distributed)",
      "수평 구조 (Flat)"
    ],
    answer: 2,
    explanation: "분산/매트릭스 구조(CoE 기반 분산형)는 전사 분석 전담 부서(CoE)가 표준과 거버넌스를 통제하면서, 분석 인력을 각 사업부서에 파견/배치하여 현업 밀착형 분석을 수행하는 이상적인 하이브리드 조직 모델입니다.",
    whyWrong: [
      "집중 구조는 전사 전담 부서에만 인력이 몰려 있어 현업과의 소통이 느릴 수 있습니다.",
      "기능 구조는 각 사업부서 내부에서 자체적으로 분석을 수행하여 전사 표준이 부족합니다.",
      "정답: 전사 전담 조직 통제 + 현업 부서 배치 협업 = 분산/매트릭스(확산) 구조.",
      "일반적인 조직 분류 명칭입니다."
    ],
    optionTraps: [
      "1번 선지: 중앙 집중형 전담 조직 = 집중 구조.",
      "2번 선지: 사업부서 자체 수행 = 기능 구조.",
      "3번 선지 (정답): 전담 조직 + 현업 배치 하이브리드 = 분산/확산 구조."
    ],
    memorizationPoint: "집중(전담부서 몰림) vs 기능(각 부서 자체) vs 분산(전담 통제 + 현업 파견 배치)"
  },

  // ========================================================
  // [8회 추가 기출 복원 25문항 (Q8_26 ~ Q8_50)]
  // ========================================================
  {
    id: "Q8_26",
    subject: 1,
    chapter: "데이터 분석 프로젝트 관리",
    sectionId: "s1-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 빅데이터 분석 프로젝트 관리의 5대 주요 관리 요소(5 Major Management Elements)에 포함되지 않는 것은?",
    choices: [
      "데이터 복잡도 (Data Complexity)",
      "분석 속도 (Speed)",
      "분석 규모 (Data Size / Scale)",
      "서버의 감가상각 연수 (Depreciation Years)"
    ],
    answer: 3,
    explanation: "빅데이터 분석 프로젝트 5대 관리 요소는 [1. 데이터 양(Data Size), 2. 데이터 복잡도(Complexity), 3. 분석 속도(Speed), 4. 분석 복잡도/시사점 유효성(Analytic Complexity), 5. 정확도 및 정밀도(Accuracy & Precision)] 입니다. 서버 감가상각은 회계적 항목입니다.",
    whyWrong: [
      "데이터 복잡도는 비정형/정형 통합 시 핵심 관리 요소입니다.",
      "분석 속도는 실시간/배치 성능 관련 필수 관리 요소입니다.",
      "분석 규모(데이터 양)는 인프라와 직결되는 필수 관리 요소입니다.",
      "정답: 회계적 서버 감가상각은 분석 프로젝트 5대 관리 요소가 아닙니다."
    ],
    optionTraps: [
      "1~3번 선지: 분석 프로젝트 5대 요소 (크기, 복잡도, 속도, 분석복잡도, 정확도).",
      "4번 선지 (정답): 단순 회계 용어입니다."
    ],
    memorizationPoint: "분석 프로젝트 5대 관리 ➔ 크기(Size), 복잡도(Complexity), 속도(Speed), 정확도(Accuracy), 분석복잡도"
  },
  {
    id: "Q8_27",
    subject: 1,
    chapter: "데이터 분석 기획",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 상향식 접근법(Bottom-up Approach)의 주요 특징으로 가장 올바른 것은?",
    choices: [
      "사전에 명확한 문제가 정의되어 있으며 그 원인을 파악하는 방식이다.",
      "보유하고 있는 데이터 자체를 다각도로 탐색하여 미처 몰랐던 새로운 인사이트를 발견(Discovery)하고 프로토타이핑하는 방식이다.",
      "철저히 탑다운 방식의 경영진 지시에 의해서만 수행된다.",
      "오직 지도학습(Supervised Learning) 모델만을 사용한다."
    ],
    answer: 1,
    explanation: "상향식 접근법(Bottom-up)은 문제 정의 없이 방대한 데이터로부터 비지도학습(Unsupervised)이나 EDA, 프로토타이핑, 디자인 씽킹(Design Thinking)을 통해 새로운 가치와 통찰을 발견(Discovery)해 나가는 방식입니다.",
    whyWrong: [
      "문제가 이미 정의된 것은 하향식(Top-down) 접근법입니다.",
      "정답: 데이터 탐색 ➔ 새로운 인사이트 발견(Discovery) = 상향식 접근법.",
      "경영진 지시 기반은 하향식입니다.",
      "상향식은 라벨 없는 비지도학습이나 탐색적 분석을 주로 씁니다."
    ],
    optionTraps: [
      "1번 선지: 하향식(Problem First)과의 구분이 핵심입니다.",
      "2번 선지 (정답): 데이터 기반 탐색 및 발견(Discovery) ➔ 상향식(Bottom-up)."
    ],
    memorizationPoint: "하향식 = 문제 중심(Problem First) / 상향식 = 데이터 중심(Data First, Discovery)"
  },
  {
    id: "Q8_28",
    subject: 1,
    chapter: "빅데이터의 이해",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 기존 빅데이터의 3V(Volume, Velocity, Variety)에 추가되어 '빅데이터의 5V'를 구성하는 2가지 확장 요소는?",
    choices: [
      "신뢰성 (Veracity)과 가치 (Value)",
      "가시성 (Visibility)과 가변성 (Variability)",
      "유효성 (Validity)과 가상화 (Virtualization)",
      "신속성 (Vigor)과 승리 (Victory)"
    ],
    answer: 0,
    explanation: "빅데이터의 5V는 기존 3V(규모 Volume, 속도 Velocity, 다양성 Variety)에 데이터의 품질과 신뢰도를 뜻하는 **신뢰성(Veracity)**과 비즈니스 활용 효용을 뜻하는 **가치(Value)**가 추가된 개념입니다.",
    whyWrong: [
      "정답: 5V 확장 요소 = 신뢰성(Veracity) + 가치(Value).",
      "가시성과 가변성은 7V 등에서 논의되는 부차적 개념입니다.",
      "유효성과 가상화는 5V 표준이 아닙니다.",
      "무관한 단어들입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 3V + Veracity(신뢰성) + Value(가치) = 5V."
    ],
    memorizationPoint: "빅데이터 5V ➔ 3V (Volume, Velocity, Variety) + Veracity (신뢰성) + Value (가치)"
  },
  {
    id: "Q8_29",
    subject: 2,
    chapter: "데이터 전처리 및 결측값 대치",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 결측값을 대치할 때, 결측이 발생한 관측치와 가장 유사한 거리의 K개 이웃 데이터들을 찾아 그 이웃들의 평균(수치형) 또는 최빈값(범주형)으로 결측치를 채우는 알고리즘은?",
    choices: [
      "평균 대치법 (Mean Imputation)",
      "KNN 대치법 (K-Nearest Neighbors Imputation)",
      "단순 삭제법 (Listwise Deletion)",
      "중앙값 대치법 (Median Imputation)"
    ],
    answer: 1,
    explanation: "KNN 대치법(K-Nearest Neighbors Imputation)은 결측치가 있는 샘플과 가장 거리가 가까운 K개의 이웃 샘플들의 값을 바탕으로 가중 평균 또는 다수결로 결측치를 채워주는 정교한 전처리 기법입니다.",
    whyWrong: [
      "평균 대치법은 전체 데이터의 단일 평균으로 채우는 방식입니다.",
      "정답: K개 유사 이웃의 값으로 대치 = KNN 대치법.",
      "단순 삭제법은 결측치가 있는 행 전체를 지우는 방식입니다.",
      "중앙값 대치법은 전체 중앙값으로 채우는 방식입니다."
    ],
    optionTraps: [
      "2번 선지 (정답): K개 유사 이웃 기반 대치 ➔ KNN Imputer."
    ],
    memorizationPoint: "유사 이웃 K개 평균/최빈값 대치 ➔ KNN 대치법 (KNN Imputation)"
  },
  {
    id: "Q8_30",
    subject: 2,
    chapter: "정규성 검정 및 시각화",
    sectionId: "s2-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 데이터의 정규성을 시각적으로 검토하는 Q-Q 플롯(Quantile-Quantile Plot)에서 데이터가 완전한 정규분포를 따를 때 나타나는 점들의 형태는?",
    choices: [
      "45도 대각선 직선($y = x$)에 거의 일치하여 점들이 일직선상에 가깝게 배열된다.",
      "완벽한 U자형 곡선을 그리며 휘어진다.",
      "좌우 양 끝으로 갈수록 대각선에서 완전히 멀어지는 S자 형태를 띤다.",
      "아무런 패턴 없이 4분면에 무작위로 흩뿌려진다."
    ],
    answer: 0,
    explanation: "Q-Q 플롯은 실제 데이터의 분위수와 이론적 정규분포의 분위수를 1:1로 매핑한 산점도로, 데이터가 정규성을 만족할수록 점들이 **45도 대각선 직선 위에 일직선**으로 깔끔하게 놓이게 됩니다.",
    whyWrong: [
      "정답: 45도 대각선 직선에 일치 ➔ 정규성 만족.",
      "U자형 곡선은 왜도(비대칭성)가 존재한다는 뜻입니다.",
      "S자 형태는 첨도(두꺼운 꼬리 / Fat-tail)가 존재한다는 뜻입니다.",
      "무작위 분산은 정규분포가 아닙니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Q-Q Plot 직선 일치 = 정규분포."
    ],
    memorizationPoint: "Q-Q Plot ➔ 점들이 45도 대각선 직선상에 위치하면 정규성 만족!"
  },
  {
    id: "Q8_31",
    subject: 2,
    chapter: "통계적 가설 검정 및 분산분석",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 3개 집단(A, B, C)의 평균을 비교하는 일원배치 분산분석(One-Way ANOVA)에서 검정하고자 하는 '귀무가설($H_0$)'의 통계적 서술로 올바른 것은?",
    choices: [
      "세 집단의 모평균은 모두 같다 (\\mu_A = \\mu_B = \\mu_C)",
      "세 집단의 모평균은 모두 서로 다르다",
      "적어도 어느 한 집단의 모평균은 다른 집단들과 다르다",
      "세 집단의 모분산은 모두 다르다"
    ],
    answer: 0,
    explanation: "ANOVA의 귀무가설($H_0$)은 '차이가 없다', 즉 **모든 집단의 평균이 동일하다($\\mu_1 = \\mu_2 = \\mu_3$)** 입니다. (대립가설 $H_1$은 '적어도 한 집단의 평균은 다르다' 입니다)",
    whyWrong: [
      "정답: 귀무가설($H_0$) = 모든 집단의 평균이 같다 (차이 없음).",
      "모두 다르다는 것은 귀무가설이 아닙니다.",
      "적어도 한 집단의 평균이 다르다는 것은 대립가설($H_1$)입니다.",
      "분산에 관한 가설이 아닌 평균 비교 검정입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): ANOVA 귀무가설 = 모든 평균이 같다.",
      "3번 선지: ANOVA 대립가설 = 적어도 하나는 다르다."
    ],
    memorizationPoint: "ANOVA 가설 ➔ 귀무가설: 모든 평균이 같다 / 대립가설: 적어도 하나는 다르다"
  },
  {
    id: "Q8_32",
    subject: 2,
    chapter: "차원 축소 및 다차원 척도법",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 다차원 척도법(MDS)에서 원래 고차원 개체 간 거리와 저차원(2D)으로 표현된 거리 사이의 불일치 오차를 측정하는 '스트레스(Stress)' 값에 대한 설명으로 올바른 것은?",
    choices: [
      "스트레스 값이 0에 가까울수록 원래 거리 구조를 완벽하게 보존하여 적합도가 매우 우수함을 뜻한다.",
      "스트레스 값이 1에 가까울수록 적합도가 완벽함을 뜻한다.",
      "스트레스 값은 항상 음수 범위의 값을 갖는다.",
      "스트레스 값이 0.2 이상이면 매우 훌륭한 적합도로 판정한다."
    ],
    answer: 0,
    explanation: "MDS의 스트레스(Stress) 값은 '원래 거리와 축소된 거리의 오차'를 뜻하므로, 0에 가까울수록 오차가 없어 적합도가 완벽(0.05 이하면 매우 우수, 0.2 이상이면 나쁨)합니다.",
    whyWrong: [
      "정답: 스트레스 값은 오차이므로 0에 가까울수록 완벽합니다.",
      "1에 가까우면 오차가 극심하여 적합도가 엉망인 상태입니다.",
      "스트레스 값은 0 이상의 양수입니다.",
      "0.2 이상이면 적합도가 나쁜(Poor) 상태입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): MDS Stress는 오차이므로 낮을수록(0에 가까울수록) 우수!"
    ],
    memorizationPoint: "MDS Stress 값 ➔ 오차 지표 ➔ 0에 가까울수록 완벽 (낮을수록 좋음)"
  },
  {
    id: "Q8_33",
    subject: 2,
    chapter: "기술 통계 및 데이터 분포",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 데이터 분포의 뾰족한 정도와 꼬리의 두께를 나타내는 '첨도(Kurtosis)'에 대한 설명으로 가장 적절하지 않은 것은?",
    choices: [
      "정규분포를 기준으로 3을 뺀 초과 첨도(Excess Kurtosis)가 0이면 정규분포와 뾰족한 정도가 같다.",
      "초과 첨도가 양수(Kurtosis > 0)이면 정규분포보다 중심이 더 뾰족하고 꼬리가 두꺼운(Fat-tail) 형태이다.",
      "초과 첨도가 음수(Kurtosis < 0)이면 정규분포보다 중심이 평평하고 완만한 형태이다.",
      "첨도는 데이터의 좌우 비대칭성을 측정하는 지표이다."
    ],
    answer: 3,
    explanation: "데이터의 좌우 비대칭성을 측정하는 지표는 **왜도(Skewness)**이며, **첨도(Kurtosis)**는 분포의 중심부 뾰족한 정도와 양쪽 꼬리의 두꺼운 정도(Tail weight)를 측정하는 지표입니다.",
    whyWrong: [
      "초과 첨도 0 = 정규분포와 동일(Mesokurtic).",
      "첨도 > 0 = 뾰족함, 두꺼운 꼬리(Leptokurtic).",
      "첨도 < 0 = 평평함, 얇은 꼬리(Platykurtic).",
      "정답: 좌우 비대칭성은 첨도가 아니라 왜도(Skewness)의 정의입니다."
    ],
    optionTraps: [
      "4번 선지 (정답): 비대칭도 = 왜도(Skewness) / 뾰족함·꼬리두께 = 첨도(Kurtosis)."
    ],
    memorizationPoint: "좌우 비대칭 ➔ 왜도(Skewness) / 뾰족함과 꼬리 두께 ➔ 첨도(Kurtosis)"
  },
  {
    id: "Q8_34",
    subject: 3,
    chapter: "선형 회귀 및 규제 모델",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 손실 함수에 가중치의 L1 규제(Lasso)와 L2 규제(Ridge)를 결합하여, 변수 선택 효과와 다중공선성 완화 효과를 동시에 얻도록 설계된 회귀 알고리즘은?",
    choices: [
      "ElasticNet 회귀 (엘라스틱넷 회귀)",
      "로지스틱 회귀",
      "다항 회귀",
      "주성분 회귀"
    ],
    answer: 0,
    explanation: "ElasticNet(엘라스틱넷)은 Lasso의 L1 규제(절댓값 합)와 Ridge의 L2 규제(제곱합)를 선형 결합한 정규화 기법으로, 상관관계가 높은 다수의 변수가 있을 때 변수 선택(L1)과 안정적인 계수 축소(L2)를 모두 달성합니다.",
    whyWrong: [
      "정답: L1 + L2 결합 회귀 = ElasticNet 회귀.",
      "로지스틱 회귀는 분류 모델입니다.",
      "다항 회귀는 다항 특성 회귀입니다.",
      "주성분 회귀는 PCA 기반 회귀입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): L1 (Lasso) + L2 (Ridge) ➔ ElasticNet!"
    ],
    memorizationPoint: "L1(Lasso) + L2(Ridge) 결합 ➔ ElasticNet 회귀"
  },
  {
    id: "Q8_35",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 의사결정나무의 C4.5 알고리즘에서 ID3의 '고유값이 많은 변수(예: 주민번호, 날짜 등)를 부적절하게 선호하는 편향'을 해결하기 위해 도입한 불순도 분할 기준은?",
    choices: [
      "정보 획득률 (Gain Ratio)",
      "지니 계수 (Gini Index)",
      "카이제곱 통계량",
      "평균 제곱 오차 (MSE)"
    ],
    answer: 0,
    explanation: "ID3의 정보 획득량(Information Gain)은 범주가 많은 변수를 과도하게 선호하는 단점이 있어, C4.5에서는 노드 분기 수에 대한 분할 엔트로피(Split Info)로 나누어 보정한 **정보 획득률(Gain Ratio)**을 분할 기준으로 사용합니다.",
    whyWrong: [
      "정답: C4.5의 다치 분기 보정 지표 = 정보 획득률(Gain Ratio).",
      "지니 계수는 CART 알고리즘에서 사용합니다.",
      "카이제곱 통계량은 CHAID에서 사용합니다.",
      "MSE는 회귀 나무에서 사용합니다."
    ],
    optionTraps: [
      "1번 선지 (정답): C4.5 ➔ Gain Ratio (정보 획득률)."
    ],
    memorizationPoint: "ID3 ➔ 정보 획득량 / C4.5 ➔ 정보 획득률(Gain Ratio) / CART ➔ 지니 계수"
  },
  {
    id: "Q8_36",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 로지스틱 회귀 모델에서 특정 독립변수 $X_1$의 회귀계수 추정치 $\\beta_1 = 0.693$으로 계산되었다. 독립변수 $X_1$이 1단위 증가할 때 성공 오즈(Odds)의 변화는? (단, $e^{0.693} \\approx 2.0$)",
    choices: [
      "성공 오즈(Odds)가 약 2.0배 증가한다.",
      "성공 오즈(Odds)가 약 0.693배로 감소한다.",
      "성공 확률이 정확히 69.3% 증가한다.",
      "성공 오즈의 변화가 전혀 없다."
    ],
    answer: 0,
    explanation: "로지스틱 회귀에서 독립변수가 1단위 증가할 때 오즈(Odds)의 증가 배수는 $e^{\\beta_1}$ 입니다. 따라서 $e^{0.693} \\approx 2.0$ 이므로 성공 오즈가 약 2.0배 증가합니다.",
    whyWrong: [
      "정답: 오즈비 = exp(회귀계수) = e^0.693 ≈ 2.0배 증가.",
      "단순 회귀계수 수치가 곱해지는 것이 아닙니다.",
      "오즈가 증가하는 것이지 확률이 69.3% 증가하는 것이 아닙니다.",
      "변화가 없지 않습니다."
    ],
    optionTraps: [
      "1번 선지 (정답): $X$ 1단위 증가 시 오즈 변화 = $e^\\beta$ 배."
    ],
    memorizationPoint: "로지스틱 회귀 $X$ 1단위 증가 ➔ 오즈(Odds)는 $e^{\\beta}$ 배 증가!"
  },
  {
    id: "Q8_37",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] SVM의 커널 트릭 중 RBF(가우시안) 커널의 하이퍼파라미터 $\\gamma$(Gamma)의 값을 매우 크게 설정했을 때 모델에 미치는 영향은?",
    choices: [
      "개별 데이터 포인트의 영향 반경이 좁아져 결정 경계가 매우 굴곡지고 복잡해지며 과대적합(Overfitting) 위험이 커진다.",
      "데이터 포인트의 영향 반경이 넓어져 결정 경계가 완만해지고 과소적합(Underfitting) 위험이 커진다.",
      "커널 함수가 선형(Linear) 커널로 완전히 바뀐다.",
      "초평면의 마진이 무한대로 넓어진다."
    ],
    answer: 0,
    explanation: "RBF 커널의 $\\gamma$(Gamma)는 하나의 데이터가 미치는 영향력의 거리를 뜻합니다. Gamma가 크면 하나의 데이터 포인트마다 봉우리처럼 좁고 뾰족하게 경계가 형성되어 결정 경계가 매우 구불구불해지고 과대적합(High Variance)이 발생합니다.",
    whyWrong: [
      "정답: Gamma 큼 ➔ 영향 반경 좁음 ➔ 복잡한 경계 ➔ 과대적합(Overfitting).",
      "완만한 경계와 과소적합은 Gamma가 작을 때의 특성입니다.",
      "선형 커널로 바뀌지 않습니다.",
      "마진이 무한대가 되지 않습니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Gamma 큼 ➔ 복잡/과대적합 / Gamma 작음 ➔ 단순/과소적합."
    ],
    memorizationPoint: "SVM RBF: Gamma 큼 = 복잡·과대적합 / Gamma 작음 = 단순·과소적합"
  },
  {
    id: "Q8_38",
    subject: 3,
    chapter: "차원 축소 기법 비교",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 차원 축소 기법인 주성분 분석(PCA)과 선형 판별 분석(LDA)의 가장 핵심적인 차이점으로 올바른 것은?",
    choices: [
      "PCA는 타깃 라벨(Y)이 필요 없는 비지도학습이고, LDA는 타깃 라벨(Y)을 사용하는 지도학습이다.",
      "PCA는 지도학습이고, LDA는 비지도학습이다.",
      "PCA는 오직 범주형 데이터에만 적용되고, LDA는 수치형 데이터에만 적용된다.",
      "PCA와 LDA는 수학적으로 완전히 동일한 알고리즘이다."
    ],
    answer: 0,
    explanation: "PCA는 타깃 클래스(라벨 Y) 정보 없이 전체 데이터의 분산만을 최대화하는 **비지도(Unsupervised) 차원 축소** 기법이고, LDA는 타깃 클래스 라벨을 활용하여 클래스 간 분리를 최대화하는 **지도(Supervised) 차원 축소** 기법입니다.",
    whyWrong: [
      "정답: PCA = 비지도(전체 분산 최대화) / LDA = 지도(클래스 분리 최대화).",
      "지도와 비지도가 반대로 설명된 오답입니다.",
      "둘 다 수치형 독립변수에 적용됩니다.",
      "원리와 목적이 다릅니다."
    ],
    optionTraps: [
      "1번 선지 (정답): PCA(비지도) vs LDA(지도)."
    ],
    memorizationPoint: "PCA ➔ 비지도 차원 축소 (전체 분산 최대화) / LDA ➔ 지도 차원 축소 (클래스 분리)"
  },
  {
    id: "Q8_39",
    subject: 3,
    chapter: "딥러닝 및 순환신경망",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 기본 순환신경망(RNN)이 시퀀스(Sequence) 길이가 길어질수록 초기의 정보를 잊어버리는 '장기 의존성(Long-term Dependency)' 한계를 극복하기 위해 셀 상태(Cell State)와 3개 게이트(삭제, 입력, 출력)를 도입한 모델은?",
    choices: [
      "LSTM (Long Short-Term Memory)",
      "Perceptron (퍼셉트론)",
      "CNN",
      "Autoencoder"
    ],
    answer: 0,
    explanation: "LSTM(Long Short-Term Memory)은 망각 게이트(Forget Gate), 입력 게이트(Input Gate), 출력 게이트(Output Gate)와 셀 상태(Cell State)를 통해 과거의 중요한 정보를 손실 없이 멀리까지 전달하여 RNN의 장기 의존성 문제를 해결한 모델입니다.",
    whyWrong: [
      "정답: RNN 장기의존성 해결 3대 게이트 모델 = LSTM.",
      "퍼셉트론은 단일 인공 신경망 유닛입니다.",
      "CNN은 합성곱 이미지 모델입니다.",
      "Autoencoder는 비지도 차원 축소 모델입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): RNN 한계 극복 ➔ LSTM (Forget/Input/Output Gate)."
    ],
    memorizationPoint: "RNN 장기 의존성 해결 ➔ LSTM (셀 상태 + 삭제·입력·출력 게이트)"
  },
  {
    id: "Q8_40",
    subject: 3,
    chapter: "딥러닝 및 합성곱 신경망",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] CNN에서 입력 이미지의 가장자리에 0 등의 값을 덧대어 출력 특성 맵의 크기가 줄어드는 것을 방지하고 가장자리 정보를 보존하는 기법은?",
    choices: [
      "패딩 (Padding / Zero-Padding)",
      "스트라이드 (Stride)",
      "풀링 (Pooling)",
      "드롭아웃 (Dropout)"
    ],
    answer: 0,
    explanation: "패딩(Padding, 특히 Zero-Padding)은 합성곱 연산을 거치면서 출력 피처맵의 가로세로 크기가 줄어드는 것을 방지하고, 외곽 모서리 부분의 특징 정보를 충분히 학습할 수 있도록 입력 외곽에 0을 둘러주는 기법입니다.",
    whyWrong: [
      "정답: 가장자리 0 덧대어 크기 유지 = 패딩(Padding).",
      "스트라이드는 필터가 이동하는 보폭(간격)입니다.",
      "풀링은 다운샘플링 연산입니다.",
      "드롭아웃은 뉴런 비활성화 정규화입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 외곽 덧대기(크기 보존) = Padding / 이동 보폭 = Stride."
    ],
    memorizationPoint: "외곽 0 채우기(크기 유지) ➔ 패딩 (Padding) / 필터 이동 간격 ➔ 스트라이드 (Stride)"
  },
  {
    id: "Q8_41",
    subject: 3,
    chapter: "앙상블 머신러닝",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 앙상블 그래디언트 부스팅(GBM : Gradient Boosting Machine) 알고리즘의 핵심 학습 원리는?",
    choices: [
      "이전 단계 모델의 손실 함수(Loss Function)에 대한 음의 기울기(잔차 / Residual)를 다음 모델이 순차적으로 학습하여 결합한다.",
      "수천 개의 나무를 무작위로 생성하여 단순 투표(Voting)로 결정한다.",
      "부트스트랩 샘플링을 반복하여 분산을 독립적으로 줄인다.",
      "서로 다른 알고리즘 모델의 예측값을 메타 모델로 다시 학습한다."
    ],
    answer: 0,
    explanation: "GBM(Gradient Boosting Machine)은 이전 모델이 예측하고 남은 잔차(Residual, 손실 함수의 음의 기울기 $-\\nabla L$)를 다음 약한 학습기가 예측하도록 순차적으로 나무를 덧붙여 오차를 지속적으로 줄여나가는 경사 하강 기반 부스팅 기법입니다.",
    whyWrong: [
      "정답: 잔차(음의 기울기)를 순차적으로 학습 = 그래디언트 부스팅(GBM).",
      "단순 투표는 배깅/랜덤포레스트의 원리입니다.",
      "부트스트랩 분산 감소는 배깅의 원리입니다.",
      "메타 모델 학습은 스태킹(Stacking)의 원리입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 잔차(Residual) / Gradient 순차 학습 ➔ GBM."
    ],
    memorizationPoint: "그래디언트 부스팅(GBM) ➔ 잔차(오차/음의 기울기)를 다음 모델이 순차 학습"
  },
  {
    id: "Q8_42",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] $F_\\beta$ 평가지표에서 $\\beta = 0.5$ ($F_{0.5}$)로 설정했을 때 지표의 가중치 해석으로 올바른 것은?",
    choices: [
      "재현율(Recall)보다 정밀도(Precision)에 2배 더 높은 가중치를 부여한다.",
      "정밀도보다 재현율에 2배 더 높은 가중치를 부여한다.",
      "정밀도와 재현율에 정확히 1:1 동일한 가중치를 부여한다.",
      "특이도에 0.5배의 가중치를 부여한다."
    ],
    answer: 0,
    explanation: "$F_\\beta$ 스코어 공식에서 $\\beta$는 '재현율의 상대적 중요도'를 뜻합니다. $\\beta=1$이면 F1(1:1 동등), $\\beta=2$($F_2$)이면 재현율에 2배 가중치, $\\beta=0.5$($F_{0.5}$)이면 재현율보다 **정밀도(Precision)에 2배 더 높은 가중치**를 부여합니다.",
    whyWrong: [
      "정답: F0.5 = 정밀도에 2배 더 가중치 부여 (스팸 필터용).",
      "재현율에 2배 가중치를 부여하는 것은 F2 스코어입니다.",
      "1:1 동일 가중치는 F1 스코어입니다.",
      "특이도 가중치와 무관합니다."
    ],
    optionTraps: [
      "1번 선지 (정답): $\\beta < 1$ ($F_{0.5}$) ➔ 정밀도 중시 / $\\beta > 1$ ($F_2$) ➔ 재현율 중시."
    ],
    memorizationPoint: "F0.5 ➔ 정밀도(Precision) 중시 / F1 ➔ 1:1 동등 / F2 ➔ 재현율(Recall) 중시"
  },
  {
    id: "Q8_43",
    subject: 4,
    chapter: "회귀 모델 평가 지표",
    sectionId: "s4-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 회귀 모델에서 전체 제곱합(SST), 회귀 제곱합(SSR), 잔차 제곱합(SSE)의 관계가 $SST = SSR + SSE$ 일 때, 결정계수($R^2$)를 나타내는 공식으로 올바른 것은?",
    choices: [
      "R² = SSR / SST = 1 - (SSE / SST)",
      "R² = SSE / SST",
      "R² = SST / SSR",
      "R² = 1 + (SSR / SSE)"
    ],
    answer: 0,
    explanation: "결정계수($R^2$)는 전체 변동(SST) 중 회귀 모형이 설명하는 변동(SSR)의 비율이므로, $R^2 = \\frac{SSR}{SST} = 1 - \\frac{SSE}{SST}$ 로 계산되며 0에서 1 사이의 값을 가집니다.",
    whyWrong: [
      "정답: R² = SSR / SST = 1 - SSE/SST.",
      "SSE/SST는 모형이 설명하지 못하는 비율(1 - R²)입니다.",
      "분모 분자가 역수입니다.",
      "잘못된 수식입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 결정계수 $R^2 = SSR / SST = 1 - SSE/SST$."
    ],
    memorizationPoint: "결정계수 R² = 설명된 변동(SSR) / 전체 변동(SST) = 1 - 잔차(SSE)/전체(SST)"
  },
  {
    id: "Q8_44",
    subject: 4,
    chapter: "모델 진단 및 학습 곡선",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 머신러닝 모델의 학습 곡선(Learning Curve)에서 학습 데이터 오차(Training Error)와 검증 데이터 오차(Validation Error)가 모두 높게 유지되면서 더 이상 줄어들지 않는 상태를 진단한 결과는?",
    choices: [
      "과소적합 (Underfitting / High Bias)",
      "과대적합 (Overfitting / High Variance)",
      "최적 적합 (Good Fit)",
      "데이터 불균형 (Data Imbalance)"
    ],
    answer: 0,
    explanation: "훈련 오차와 검증 오차가 둘 다 높게 유지되는 것은 모델이 너무 단순하여 데이터의 기본적인 패턴조차 학습하지 못한 **과소적합(Underfitting / High Bias)** 상태입니다. (반대로 훈련 오차는 매우 낮으나 검증 오차가 높은 것은 과대적합 High Variance)",
    whyWrong: [
      "정답: 둘 다 높은 오차 = 과소적합(High Bias).",
      "과대적합은 훈련 오차는 매우 낮고 검증 오차만 높은 상태입니다.",
      "최적 적합은 둘 다 낮은 오차로 수렴하는 상태입니다.",
      "학습 곡선의 전형적인 과소적합 진단입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 훈련오차 高 + 검증오차 高 ➔ 과소적합(High Bias) ➔ 모델 복잡도 늘려야 함.",
      "2번 선지: 훈련오차 低 + 검증오차 高 ➔ 과대적합(High Variance) ➔ 규제/데이터 늘려야 함."
    ],
    memorizationPoint: "둘 다 오차 높음 = 과소적합(High Bias) / 훈련오차 낮고 검증오차 높음 = 과대적합(High Variance)"
  },
  {
    id: "Q8_45",
    subject: 4,
    chapter: "연관 규칙 분석",
    sectionId: "s4-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 100건의 마트 거래 데이터에서 기저귀를 구매한 거래가 50건, 맥주를 구매한 거래가 40건, 기저귀와 맥주를 동시에 구매한 거래가 20건이다. 연관 규칙 '기저귀 → 맥주'의 신뢰도(Confidence)는?",
    choices: [
      "20% (0.2)",
      "40% (0.4)",
      "50% (0.5)",
      "80% (0.8)"
    ],
    answer: 1,
    explanation: "신뢰도(Confidence) 공식은 $\\text{Confidence}(A \\rightarrow B) = \\frac{P(A \\cap B)}{P(A)} = \\frac{n(A \\cap B)}{n(A)}$ 입니다. 기저귀를 산 50건 중 맥주도 같이 산 건수는 20건이므로, $20 / 50 = 0.40(40\\%)$ 입니다.",
    whyWrong: [
      "20%는 전체 100건 대비 동시 구매 비율인 지지도(Support = 20/100)입니다.",
      "정답: 신뢰도 = 동시구매(20) / 기저귀구매(50) = 40%(0.4).",
      "50%는 기저귀의 단독 지지도입니다.",
      "맥주 기준 역방향 신뢰도는 20/40 = 50% 입니다."
    ],
    optionTraps: [
      "1번 선지: 지지도(20/100 = 0.2)와 신뢰도(20/50 = 0.4)의 혼동 함정입니다.",
      "2번 선지 (정답): 신뢰도 = P(A∩B)/P(A) = 20/50 = 0.4."
    ],
    memorizationPoint: "신뢰도(Confidence) = 동시구매건수 / 조건품목(A)구매건수"
  },
  {
    id: "Q8_46",
    subject: 4,
    chapter: "비지도학습 군집 평가",
    sectionId: "s4-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 군집 분석에서 실제 정답 클래스 라벨이 존재하는 경우, 실제 라벨과 군집 결과의 일치도를 데이터 쌍(Pair) 단위로 평가하는 '랜드 지수(Rand Index)'의 공식 개념은?",
    choices: [
      "(같은 군집에 잘 묶인 쌍 + 다른 군집으로 잘 분리된 쌍) / 전체 데이터 쌍의 수",
      "군집 간 분산 / 군집 내 분산",
      "1 - (오분류율)",
      "모든 데이터 포인트 간의 유클리드 거리 합"
    ],
    answer: 0,
    explanation: "랜드 지수(Rand Index, RI)는 군집 외적 평가 지표로, 전체 $N(N-1)/2$ 개의 데이터 쌍 중에서 '실제 같은 클래스인데 같은 군집으로 묶인 쌍($a$)'과 '실제 다른 클래스인데 다른 군집으로 분리된 쌍($b$)'의 비율인 $\\frac{a + b}{\\text{Total Pairs}}$ 로 정의됩니다.",
    whyWrong: [
      "정답: (일치 쌍 a + 분리 쌍 b) / 전체 쌍 = Rand Index.",
      "F-통계량 ANOVA 공식입니다.",
      "일반적인 정확도 개념입니다.",
      "거리 합 공식입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Rand Index = 쌍(Pair) 단위 일치율."
    ],
    memorizationPoint: "랜드 지수 (Rand Index) ➔ 데이터 쌍(Pair) 일치도 기반 군집 외적 평가지표"
  },
  {
    id: "Q8_47",
    subject: 4,
    chapter: "시계열 모형 식별",
    sectionId: "s4-2",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 시계열 ARIMA 모형 식별에서 자기상관함수(ACF)와 편자기상관함수(PACF)의 패턴을 분석할 때, '자기회귀(AR(p)) 모형'의 올바른 판별 기준은?",
    choices: [
      "ACF는 점진적으로 감소(지수적 감소)하고, PACF는 p 시차(Lag p) 이후 절단(0으로 절단)된다.",
      "PACF가 지수적으로 감소하고, ACF가 q 시차 이후 절단된다.",
      "ACF와 PACF 모두 특정 시차에서 절단된다.",
      "ACF와 PACF 모두 무한히 진동하며 절단되지 않는다."
    ],
    answer: 0,
    explanation: "AR(p) 모형은 자기상관함수(ACF)가 시차가 증가함에 따라 지수적 또는 사인파 형태로 서서히 감소(Tails off)하고, 편자기상관함수(PACF)는 p 시차 이후 급격히 0으로 절단(Cuts off after lag p)됩니다. (반대로 MA(q)는 ACF가 q 이후 절단, PACF가 지수적 감소)",
    whyWrong: [
      "정답: AR(p) ➔ ACF 점진적 감소, PACF p 시차 후 절단.",
      "PACF 감소, ACF 절단은 이동평균 모형인 MA(q)의 특성입니다.",
      "ARMA(p, q) 모형은 둘 다 지수적으로 감소합니다.",
      "잘못된 설명입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): AR(p) = PACF가 p에서 절단! / MA(q) = ACF가 q에서 절단!"
    ],
    memorizationPoint: "AR(p) ➔ PACF 절단(p) / MA(q) ➔ ACF 절단(q)",
    examinerTip: "💡 'AR은 P(PACF)에서 절단, MA는 A(ACF)에서 절단' 공식으로 2초 만에 푸세요!"
  },
  {
    id: "Q8_48",
    subject: 2,
    chapter: "불균형 데이터 처리",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] SMOTE 오버샘플링의 변형 기법 중, 분류하기 쉬운 소수 샘플보다 '주변에 다수 클래스가 많아 분류 학습이 더 어려운 소수 샘플에 가중치를 두어 더 많은 합성 데이터를 생성하는 적응형 오버샘플링 알고리즘'은?",
    choices: [
      "ADASYN (Adaptive Synthetic)",
      "Random Undersampling",
      "NearMiss",
      "One-Class SVM"
    ],
    answer: 0,
    explanation: "ADASYN(Adaptive Synthetic)은 소수 클래스 데이터 중 주변에 다수 클래스 이웃이 많아 학습하기 까다로운 경계 영역의 소수 데이터에 적응형(Adaptive) 가중치를 부여하여 더 많은 합성 샘플을 생성하는 기법입니다.",
    whyWrong: [
      "정답: 학습 난이도에 따른 적응형 합성 가중치 = ADASYN.",
      "언더샘플링 기법입니다.",
      "언더샘플링 기법입니다.",
      "이상치 탐지 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 적응형(Adaptive) 합성 오버샘플링 = ADASYN."
    ],
    memorizationPoint: "학습 어려운 소수 데이터 집중 가중 합성 ➔ ADASYN (Adaptive Synthetic)"
  },
  {
    id: "Q8_49",
    subject: 1,
    chapter: "데이터 분석 로드맵 및 마스터플랜",
    sectionId: "s1-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 기업의 전사 데이터 분석 마스터 플랜 수립 시, 도출된 과제들을 일시에 전사적으로 한 번에 구축하여 오픈하는 방식을 뜻하는 용어는?",
    choices: [
      "빅뱅 (Big Bang) 방식",
      "단계적 (Phased / Iterative) 도입 방식",
      "하향식 (Top-down) 방식",
      "프로토타이핑 (Prototyping) 방식"
    ],
    answer: 0,
    explanation: "빅뱅(Big Bang) 방식은 전체 시스템이나 분석 과제를 분할하지 않고 한 번에 전체 오픈하는 방식으로, 단기간에 도입 효과를 볼 수 있으나 프로젝트 리스크가 매우 큽니다. 반대로 위험을 낮추기 위해 순차적으로 오픈하는 방식은 단계적(Phased) 방식입니다.",
    whyWrong: [
      "정답: 일괄 전사 동시 오픈 = 빅뱅(Big Bang) 방식.",
      "단계적 도입은 순차적으로 위험을 줄이며 오픈하는 방식입니다.",
      "하향식은 과제 도출 방식입니다.",
      "프로토타이핑은 시제품 제작 방식입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 일괄 구축/오픈 = 빅뱅(Big Bang) 방식."
    ],
    memorizationPoint: "전사 일괄 동시 오픈 ➔ 빅뱅 (Big Bang) / 순차적 위험 분산 ➔ 단계적 (Phased)"
  },
  {
    id: "Q8_50",
    subject: 3,
    chapter: "머신러닝 하이퍼파라미터 튜닝",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 머신러닝 하이퍼파라미터 튜닝 기법 중 이전 탐색 결과의 성능 정보를 기반으로 확률적 대리 모델(Surrogate Model)을 구축하여, 다음 번에 최적의 성능을 낼 가능성이 가장 높은 파라미터 조합을 똑똑하게 탐색해 나가는 기법은?",
    choices: [
      "그리드 서치 (Grid Search)",
      "랜덤 서치 (Random Search)",
      "베이지안 최적화 (Bayesian Optimization)",
      "수동 튜닝 (Manual Search)"
    ],
    answer: 2,
    explanation: "베이지안 최적화(Bayesian Optimization)는 이전 시도들의 하이퍼파라미터 조합과 성능 결과를 바탕으로 목적 함수의 사후 확률 모델을 추정하여, 가장 유망한 파라미터 영역을 지능적으로 탐색하는 효율적인 튜닝 기법입니다. (Grid/Random은 이전 결과를 기억하지 않는 무작위 탐색)",
    whyWrong: [
      "그리드 서치는 모든 조합을 격자로 전수 조사하는 비효율적인 방식입니다.",
      "랜덤 서치는 무작위로 조합을 뽑아 탐색하는 방식입니다.",
      "정답: 이전 탐색 결과 기반 확률 대리 모델 탐색 = 베이지안 최적화.",
      "수동 튜닝은 분석가가 감으로 일일이 바꾸는 방식입니다."
    ],
    optionTraps: [
      "1, 2번 선지: 이전 시도의 성공/실패 정보를 활용하지 못합니다.",
      "3번 선지 (정답): 이전 결과 학습 ➔ 베이지안 최적화(Bayesian Optimization)."
    ],
    memorizationPoint: "이전 탐색 결과 기반 지능적 하이퍼파라미터 탐색 ➔ 베이지안 최적화 (Bayesian Optimization)"
  }
];

console.log(`Adding ${moreQuestions.length} more authentic restoration questions for 9th and 8th rounds...`);

const existingIds = new Set(rawBank.questions.map(q => q.id));
let addedCount = 0;

for (const nq of moreQuestions) {
  if (!existingIds.has(nq.id)) {
    rawBank.questions.push(nq);
    addedCount++;
  }
}

rawBank.meta.totalQuestions = rawBank.questions.length;
rawBank.meta.lastUpdated = new Date().toISOString();

// Write back to cbt_bank.json and cbt_bank.js
fs.writeFileSync(bankJsonPath, JSON.stringify(rawBank, null, 2), 'utf8');
fs.writeFileSync(bankJsPath, `window.cbtBank = ${JSON.stringify(rawBank, null, 2)};\n`, 'utf8');

console.log(`Successfully merged ${addedCount} additional questions. Total in bank: ${rawBank.questions.length}`);
