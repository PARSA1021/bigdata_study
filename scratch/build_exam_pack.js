const fs = require('fs');
const path = require('path');

const bankJsonPath = path.join(__dirname, '../cbt_bank.json');
const bankJsPath = path.join(__dirname, '../cbt_bank.js');

const rawBank = JSON.parse(fs.readFileSync(bankJsonPath, 'utf8'));

// Full 75 New High-Yield Questions
const newQuestions = [
  // ========================================================
  // [9회 기출 복원 팩 25문항 (Q9_01 ~ Q9_25)]
  // ========================================================
  {
    id: "Q9_01",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 개인정보 비식별 조치 기법 중 특정 데이터의 특이한 값이나 이상값(Outlier)을 상/하한 임곗값으로 변환하거나 제거하여 특정 개인에 대한 재식별 위험을 낮추는 기법은?",
    choices: [
      "특이화 (Outlier Truncation / Noise Addition)",
      "식별자 제거 (Identifier Removal)",
      "가명처리 (Pseudonymization)",
      "총계처리 (Aggregation)"
    ],
    answer: 0,
    explanation: "특이화(Outlier Truncation / Noise Addition)는 데이터셋 내에서 매우 두드러진 이상값(예: 100세 이상 고령자, 연봉 50억 등)을 특정 상한/하한값으로 치환하거나 잡음을 추가하여 재식별을 방지하는 대표적인 비식별 조치 기법입니다.",
    whyWrong: [
      "정답: 특이값을 상하한선으로 치환하거나 잡음을 추가하는 특이화 기법입니다.",
      "식별자 제거는 이름, 주민번호 등의 고유 식별 필드를 아예 완전히 삭제하는 기법입니다.",
      "가명처리는 홍길동을 임의의 식별자(User_01)나 해시값으로 대체하는 기법입니다.",
      "총계처리는 개별 데이터를 합계나 평균값으로 요약 변환하는 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 극단적인 특이값/이상치를 잘라내거나 대체하는 기법은 '특이화'입니다.",
      "2번 선지: 식별자 자체를 삭제하는 것과 이상치를 변환하는 것은 다릅니다.",
      "3번 선지: 가명처리는 개인 식별자를 다른 대체값으로 1:1 매핑하는 것입니다.",
      "4번 선지: 총계처리는 집계(합계, 평균) 연산을 수행하는 것입니다."
    ],
    memorizationPoint: "특이값/이상치 잘라내기 ➔ 특이화(Outlier Truncation)",
    examinerTip: "💡 9회 기출 핵심: 비식별 조치 5대 기법(가명처리, 총계처리, 데이터삭제, 데이터범주화, 데이터마스킹/특이화)의 세부 적용 사례는 매 시험 1과목 1번~3번 단골 출제 문제입니다."
  },
  {
    id: "Q9_02",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 빅데이터 분석 프로젝트 수행 시 작성하는 '분석 과제 정의서'에 일반적으로 포함되어야 할 필수 항목으로 가장 거리가 먼 것은?",
    choices: [
      "분석 목표 및 과제 개요",
      "분석 대상 데이터 및 소스(Source)",
      "분석 기법 및 활용 알고리즘",
      "분석 담당자의 주민등록번호 및 개인 사적 금융 정보"
    ],
    answer: 3,
    explanation: "분석 과제 정의서에는 과제 개요, 목표, 데이터 소스, 데이터 정제 방안, 분석 알고리즘, 예상 산출물, 추진 일정 등이 포함되어야 하며, 개인의 사적 금융 정보나 주민등록번호는 당연히 포함되지 않으며 개인정보보호법상으로도 기재 금지 대상입니다.",
    whyWrong: [
      "과제 목표 및 개요는 가장 핵심적인 필수 항목입니다.",
      "필요한 데이터 소스와 수집 주기는 필수 기재 항목입니다.",
      "적용할 분석 모델 및 기법은 필수 항목입니다.",
      "정답: 사적 금융 정보 및 주민등록번호는 분석 과제 정의서의 구성 요소가 아닙니다."
    ],
    optionTraps: [
      "1~3번 선지: 분석 과제 정의서의 필수 7대 요소(과제명, 목적, 데이터셋, 방법론, 분석기법, 산출물, 일정)입니다.",
      "4번 선지 (정답): 비즈니스 문서에 불필요한 민감 개인정보는 포함되지 않습니다."
    ],
    memorizationPoint: "분석 과제 정의서 ➔ 과제명, 목적, 데이터, 분석기법, 산출물, 일정",
    examinerTip: "💡 상식형 문제이나 선지가 길게 출제되므로 침착하게 읽으면 10초 안에 정답을 찾을 수 있습니다."
  },
  {
    id: "Q9_03",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 전사적 데이터 품질과 활용을 지속적으로 관리하기 위한 '데이터 거버넌스(Data Governance)'의 3대 핵심 구성 요소로 올바르게 짝지어진 것은?",
    choices: [
      "조직(Organization), 프로세스(Process), 시스템/원칙(System/Rule)",
      "하드웨어(Hardware), 소프트웨어(Software), 네트워크(Network)",
      "예산(Budget), 일정(Schedule), 인력(Manpower)",
      "데이터 레이크(Lake), 데이터 웨어하우스(DW), 데이터 마트(DM)"
    ],
    answer: 0,
    explanation: "데이터 거버넌스 체계의 3대 핵심 구성 요소는 조직(Organization, 전담 조직 및 역할 정의), 프로세스(Process, 작업 절차 및 변경 관리), 시스템/원칙(System/Rule, 정책, 표준, 인프라 지원)입니다.",
    whyWrong: [
      "정답: 조직, 프로세스, 시스템(원칙/규정)의 3대 축입니다.",
      "일반적인 IT 인프라 하드웨어 구성 요소입니다.",
      "일반적인 프로젝트 관리(PM)의 제약 조건입니다.",
      "데이터 저장소 아키텍처 계층입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 거버넌스의 3대 축 = 조직(누가), 프로세스(어떻게), 시스템/원칙(어떤 도구와 규칙으로).",
      "4번 선지: 데이터 저장 인프라의 종류로 거버넌스 개념과 혼동을 유도하는 보기입니다."
    ],
    memorizationPoint: "거버넌스 3요소 ➔ 조·프·시 (조직, 프로세스, 시스템/원칙)",
    examinerTip: "💡 조·프·시 암기 공식으로 3초 만에 푸는 대표 기출 문제입니다."
  },
  {
    id: "Q9_04",
    subject: 1,
    chapter: "데이터 분석 방법론",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터 마이닝의 표준 방법론인 CRISP-DM(Cross-Industry Standard Process for Data Mining)의 6단계 중 비즈니스 이해(Business Understanding) 바로 다음으로 수행되는 단계는?",
    choices: [
      "데이터 준비 (Data Preparation)",
      "데이터 이해 (Data Understanding)",
      "모델링 (Modeling)",
      "평가 (Evaluation)"
    ],
    answer: 1,
    explanation: "CRISP-DM의 6단계 순서는 [1단계: 비즈니스 이해] ➔ [2단계: 데이터 이해] ➔ [3단계: 데이터 준비] ➔ [4단계: 모델링] ➔ [5단계: 평가] ➔ [6단계: 전개] 순서입니다. 따라서 비즈니스 이해 바로 다음 단계는 '데이터 이해'입니다.",
    whyWrong: [
      "데이터 준비는 데이터 이해 다음 단계(3단계)입니다.",
      "정답: 2단계인 데이터 이해입니다.",
      "모델링은 4단계입니다.",
      "평가는 5단계입니다."
    ],
    optionTraps: [
      "1번 선지: 비즈니스 이해 후 바로 데이터를 가공(준비)하는 것이 아니라, 먼저 수집된 데이터의 특성을 파악(이해)해야 합니다.",
      "2번 선지 (정답): 비 ➔ 데이 ➔ 데준 ➔ 모 ➔ 평 ➔ 전."
    ],
    memorizationPoint: "CRISP-DM 6단계 ➔ 비·데이·데준·모·평·전 (비즈니스이해 ➔ 데이터이해 ➔ 데이터준비 ➔ 모델링 ➔ 평가 ➔ 전개)",
    examinerTip: "💡 KDD 분석 절차(선택 ➔ 전처리 ➔ 변환 ➔ 마이닝 ➔ 평가)와 CRISP-DM 6단계를 비교하는 문제가 번갈아가며 매 회차 출제됩니다."
  },
  {
    id: "Q9_05",
    subject: 2,
    chapter: "데이터 탐색 및 차원 축소",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 주성분 분석(PCA)에서 차원을 축소할 주성분의 개수($k$)를 결정하는 일반적인 기준으로 가장 적절하지 않은 것은?",
    choices: [
      "누적 기여율(Cumulative Proportion)이 통상 70% ~ 85% 이상이 되는 지점까지 선택한다.",
      "스크리 플롯(Scree Plot)에서 고윳값(Eigenvalue)의 감소율이 완만해지는 엘보우(Elbow) 지점 직전까지 선택한다.",
      "카이저(Kaiser) 기준에 따라 고윳값(Eigenvalue)이 1.0 이상인 주성분만을 선택한다.",
      "반드시 원래 데이터의 독립변수 개수와 동일한 개수의 주성분을 모두 선택해야만 정보 손실이 없다."
    ],
    answer: 3,
    explanation: "주성분 분석(PCA)의 본질적인 목적은 차원 축소(정보 압축)이므로, 원래 변수 개수와 동일하게 모두 선택하면 차원 축소의 의미가 완전히 사라집니다. 통상 고윳값 1 이상(Kaiser 기준), 누적 설명력 70~85% 이상, Scree plot 엘보우 지점을 기준으로 축소할 주성분 수를 결정합니다.",
    whyWrong: [
      "누적 설명력 70~85% 이상은 정석적인 주성분 개수 결정 기준입니다.",
      "Scree Plot의 꺾이는 엘보우 지점을 선택하는 것은 표준 방법입니다.",
      "Kaiser 규칙(고윳값 >= 1.0)은 표준적인 통계 판정 기준입니다.",
      "정답: 모든 주성분을 다 쓰는 것은 차원 축소 분석을 할 이유가 없는 잘못된 접근입니다."
    ],
    optionTraps: [
      "1~3번 선지: PCA 주성분 수 결정 3대 원칙(누적설명력 70~85%, Kaiser 고윳값 1.0 이상, Scree plot 엘보우).",
      "4번 선지 (정답): 차원 축소 기법에서 '전체 변수 개수만큼 다 쓴다'는 말은 자가당착입니다."
    ],
    memorizationPoint: "PCA 주성분 수 결정 ➔ 누적 기여율 70~85% / Kaiser 고윳값 >= 1 / Scree Plot 엘보우",
    examinerTip: "💡 PCA의 목적은 '분산의 최대화'와 '차원 축소'입니다. 고윳값(Eigenvalue)이 분산의 크기를 나타낸다는 점을 꼭 기억하세요."
  },
  {
    id: "Q9_06",
    subject: 2,
    chapter: "통계 검정 및 상관 분석",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 두 연속형 변수 간의 선형 관계뿐만 아니라 순위(Rank)에 기반하여 비선형 단조(Monotonic) 증가/감소 관계를 측정하며, 정규성 가정을 만족하지 않는 비모수 환경에서 사용되는 상관계수는?",
    choices: [
      "피어슨 (Pearson) 상관계수",
      "스피어만 (Spearman) 순위 상관계수",
      "점-이연 (Point-Biserial) 상관계수",
      "파이 (Phi) 계수"
    ],
    answer: 1,
    explanation: "스피어만(Spearman) 순위 상관계수는 원시 데이터의 실제 값 대신 순위(Rank)를 매겨 상관관계를 계산하므로 비선형 단조 관계를 측정할 수 있고, 정규성 가정이 필요 없는 대표적인 비모수 상관분석 기법입니다. (피어슨은 선형 관계 + 정규성 필수)",
    whyWrong: [
      "피어슨은 정규성을 만족하는 연속형 두 변수 간의 '순수 선형 관계'만을 측정합니다.",
      "정답: 순위 기반 비모수 단조 상관계수는 스피어만 상관계수입니다.",
      "점-이연 상관계수는 연속형 변수와 이분형(0/1) 명목 변수 간의 상관을 측정합니다.",
      "파이 계수는 2x2 분할표에서 두 범주형 변수 간의 연관성을 측정합니다."
    ],
    optionTraps: [
      "1번 선지: 선형 관계만 측정하고 이상치에 민감한 것은 피어슨입니다.",
      "2번 선지 (정답): 순위(Rank), 비모수, 단조성 ➔ 스피어만!"
    ],
    memorizationPoint: "피어슨 = 선형+정규성 / 스피어만 = 순위+비모수+단조",
    examinerTip: "💡 2과목 3초 치트키: '순위'나 '서열척도', '비모수'가 나오면 스피어만(Spearman)이나 켄달(Kendall)을 고르면 됩니다."
  },
  {
    id: "Q9_07",
    subject: 2,
    chapter: "데이터 전처리 및 이상값 탐색",
    sectionId: "s2-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 상자그림(Boxplot)을 이용한 이상값 탐지에서 사분위수 범위(IQR = Q3 - Q1)를 활용할 때, 정상 데이터의 상한 경계선(Upper Inner Fence)을 계산하는 공식은?",
    choices: [
      "Q3 + 1.5 × IQR",
      "Q1 - 1.5 × IQR",
      "Q3 + 3.0 × IQR",
      "Q1 + 1.5 × IQR"
    ],
    answer: 0,
    explanation: "상자그림(Boxplot)의 정상 데이터 범위는 [Q1 - 1.5*IQR, Q3 + 1.5*IQR] 입니다. 따라서 상한 경계선은 Q3 + 1.5*IQR 이며, 이보다 큰 값은 상위 이상값(Outlier)으로 판정합니다.",
    whyWrong: [
      "정답: 상한선은 Q3 + 1.5*IQR 입니다.",
      "Q1 - 1.5*IQR 은 하한선(Lower Fence) 공식입니다.",
      "3.0을 곱하는 것은 극단적 이상값(Extreme Outlier) 기준입니다.",
      "Q1에 더하는 공식은 존재하지 않는 오답 선지입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 상한선 ➔ Q3에 더함 (+ 1.5*IQR).",
      "2번 선지: 하한선 ➔ Q1에서 뺌 (- 1.5*IQR)."
    ],
    memorizationPoint: "상한선 = Q3 + 1.5*IQR / 하한선 = Q1 - 1.5*IQR",
    examinerTip: "💡 계산 문제로도 매회 출제됩니다. Q1=20, Q3=50 주어지면 IQR=30, 상한선 = 50 + 1.5*30 = 95가 됩니다."
  },
  {
    id: "Q9_08",
    subject: 2,
    chapter: "데이터 전처리 및 결측값 처리",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터의 결측 메커니즘 3가지 중 '결측값 발생 여부가 다른 관측된 변수들과는 통계적으로 관련이 있지만, 결측된 변수 자체의 값과는 관련이 없는 경우'를 무엇이라 하는가?",
    choices: [
      "완전 무작위 결측 (MCAR : Missing Completely At Random)",
      "조건부 무작위 결측 / 무작위 결측 (MAR : Missing At Random)",
      "비무작위 결측 (NMAR / MNAR : Missing Not At Random)",
      "구조적 결측 (Structural Missing)"
    ],
    answer: 1,
    explanation: "MAR(Missing At Random, 무작위 결측)은 결측의 발생이 '다른 관측된 변수(예: 성별, 나이)'와는 상관이 있지만, '결측값 자체(예: 소득)'와는 무관한 상태를 뜻합니다. (예: 여성이 남성보다 체중 응답을 누락할 확률이 높지만, 체중이 무거워서 누락한 것은 아님)",
    whyWrong: [
      "MCAR은 어떤 변수와도 전혀 무관하게 순수 우연에 의해 발생한 결측입니다.",
      "정답: 다른 변수와는 관련이 있으나 결측 변수 자체와는 무관한 MAR입니다.",
      "NMAR은 결측된 값 자체 때문에 누락된 경우(예: 고소득자가 소득 질문에 답변 거부)입니다.",
      "구조적 결측은 미혼자에게 배우자 직업을 묻는 것처럼 질문 구조상 당연히 비어있는 결측입니다."
    ],
    optionTraps: [
      "1번 선지: MCAR은 완전히 우연히 발생하여 편향이 전혀 없는 결측입니다.",
      "2번 선지 (정답): 다른 변수와 연관 있음 ➔ MAR!",
      "3번 선지: 결측값 자체의 크기와 연관 있음 ➔ NMAR/MNAR!"
    ],
    memorizationPoint: "MCAR = 완전 우연(무관) / MAR = 다른 변수와 연관 / NMAR = 결측값 자체와 연관",
    examinerTip: "💡 영문 약어(MCAR, MAR, NMAR)와 실제 사례(소득이 높아서 미응답 ➔ NMAR) 매칭이 빈출 함정입니다."
  },
  {
    id: "Q9_09",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] k-최근접 이웃(KNN) 분류 알고리즘에서 하이퍼파라미터인 $K$의 값을 매우 작게(예: $K=1$) 설정했을 때 모델에 미치는 영향으로 가장 올바른 것은?",
    choices: [
      "결정 경계가 지나치게 복잡해지며, 이상치(노이즈)에 민감해져 과대적합(Overfitting) 위험이 커진다.",
      "결정 경계가 매우 단순해지며, 모델이 둔감해져 과소적합(Underfitting) 위험이 커진다.",
      "데이터의 전반적인 대다수 경향성만을 반영하여 분산(Variance)이 크게 감소한다.",
      "거리 척도의 영향력이 완전히 사라져 정규화(Scaling)가 필요 없어진다."
    ],
    answer: 0,
    explanation: "KNN에서 K가 작을수록($K=1$) 바로 옆에 있는 단 하나의 점에 의해 분류되므로 결정 경계가 구불구불하게 매우 복잡해지고, 노이즈에 극도로 민감해져 과대적합(High Variance / Overfitting)이 발생합니다. 반대로 K가 너무 크면 결정 경계가 완만해져 과소적합(High Bias)이 발생합니다.",
    whyWrong: [
      "정답: K가 작으면 모델이 복잡해지고 과대적합됩니다.",
      "결정 경계가 단순해지고 과소적합되는 것은 K가 매우 클 때의 현상입니다.",
      "K가 작으면 분산(Variance)이 커집니다.",
      "KNN은 거리 기반 알고리즘이므로 K값과 무관하게 항상 스케일링(정규화)이 필수입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): K가 작다 ➔ 이웃을 적게 봄 ➔ 좁은 구역에 집착 ➔ 복잡함, 과대적합(Overfitting).",
      "2번 선지: K가 크다 ➔ 전체 다수결 ➔ 단순함, 과소적합(Underfitting)."
    ],
    memorizationPoint: "KNN: K 작음 = 복잡/과대적합(Overfitting) / K 큼 = 단순/과소적합(Underfitting)",
    examinerTip: "💡 의사결정나무의 깊이(Max Depth), SVM의 C값, KNN의 K값은 과대적합/과소적합 반대 방향 짝짓기 단골 문제입니다."
  },
  {
    id: "Q9_10",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 서포트 벡터 머신(SVM) 알고리즘에서 최적의 분리 초평면(Hyperplane)을 구성할 때, '서포트 벡터(Support Vector)'가 의미하는 것은?",
    choices: [
      "전체 데이터의 중심(Centroid)을 나타내는 평균 벡터",
      "분리 초평면(결정 경계)과 가장 가까운 위치에 존재하는 데이터 포인트들",
      "초평면과 가장 멀리 떨어져 있어서 분류가 가장 확실한 데이터 포인트들",
      "이상치(Outlier)로 판정되어 모델 학습에서 제외된 노이즈 벡터"
    ],
    answer: 1,
    explanation: "서포트 벡터(Support Vector)는 두 클래스를 가르는 결정 초평면과 가장 가까운 경계선 상에 위치한 데이터 포인트들을 의미하며, 이 서포트 벡터들 사이의 거리인 마진(Margin)을 최대화하는 것이 SVM의 핵심 학습 원리입니다.",
    whyWrong: [
      "데이터의 중심점은 Centroid(군집 중심)입니다.",
      "정답: 초평면과 가장 가까운 경계면 데이터가 서포트 벡터입니다.",
      "가장 멀리 떨어진 데이터는 서포트 벡터가 아니며 초평면 결정에 아무런 영향을 주지 않습니다.",
      "노이즈나 제외된 데이터가 아닙니다."
    ],
    optionTraps: [
      "1번 선지: K-Means 중심점과의 혼동을 유도하는 보기입니다.",
      "2번 선지 (정답): 초평면과 가장 가까운 데이터 포인트 = 서포트 벡터.",
      "3번 선지: SVM은 경계에 위치한 서포트 벡터들에 의해서만 초평면이 결정됩니다."
    ],
    memorizationPoint: "SVM 서포트 벡터 ➔ 결정 경계와 가장 가까운 데이터 (마진 결정)",
    examinerTip: "💡 SVM은 모든 데이터가 아니라 '서포트 벡터'들만으로 모델이 결정되므로 이상치(소수 경계 외 점)에 상대적으로 강인합니다."
  },
  {
    id: "Q9_11",
    subject: 3,
    chapter: "앙상블 및 고급 머신러닝",
    sectionId: "s3-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 앙상블 학습 기법 중 여러 모델을 병렬로 독립 학습시키는 배깅(Bagging)과 달리, 이전 모델이 잘못 예측한 데이터(오차)에 가중치를 부여하여 순차적으로 학습하는 부스팅(Boosting) 알고리즘이 아닌 것은?",
    choices: [
      "AdaBoost",
      "XGBoost",
      "Random Forest",
      "LightGBM"
    ],
    answer: 2,
    explanation: "Random Forest(랜덤 포레스트)는 여러 개의 의사결정나무를 독립적(병렬)으로 생성하고 보팅(Voting)/평균으로 결합하는 대표적인 **배깅(Bagging)** 방식의 앙상블 모델입니다. (AdaBoost, XGBoost, LightGBM, CatBoost는 순차적 오차 보정인 **부스팅** 모델)",
    whyWrong: [
      "AdaBoost는 대표적인 초창기 부스팅 알고리즘입니다.",
      "XGBoost는 강력한 성능의 Gradient Boosting 계열 부스팅 모델입니다.",
      "정답: Random Forest는 배깅(Bagging) 기반 알고리즘입니다.",
      "LightGBM은 대용량 처리에 최적화된 리프 중심 부스팅 모델입니다."
    ],
    optionTraps: [
      "1, 2, 4번 선지: 모두 Gradient/오차 보정 기반의 부스팅(Boosting) 알고리즘입니다.",
      "3번 선지 (정답): 랜덤 포레스트는 배깅(Bagging) + 변수 무작위 선택입니다."
    ],
    memorizationPoint: "배깅 = 랜덤 포레스트(병렬) / 부스팅 = Ada, XGB, LightGBM, Cat(순차/오차보정)",
    examinerTip: "💡 3과목 1초 킬러: '배깅' vs '부스팅' 알고리즘 구분 문제는 100% 매 회차 출제됩니다."
  },
  {
    id: "Q9_12",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 의사결정나무(Decision Tree)의 분할 기준 중 CART(Classification and Regression Trees) 분류 알고리즘에서 노드의 불순도(Impurity)를 측정하기 위해 사용하는 지표는?",
    choices: [
      "지니 계수 (Gini Index)",
      "엔트로피 지수 (Entropy Index)",
      "정보 획득량 (Information Gain)",
      "카이제곱 통계량 p-값 (CHAID)"
    ],
    answer: 0,
    explanation: "CART 알고리즘의 분류 나무에서는 **지니 계수(Gini Index)**를 불순도 지표로 사용하며(회귀 나무는 분산 감소량/MSE), C4.5/C5.0은 엔트로피 및 정보 획득률(Gain Ratio), ID3는 정보 획득량(Information Gain), CHAID는 카이제곱 통계량을 사용합니다.",
    whyWrong: [
      "정답: CART 분류 나무 = 지니 계수(Gini Index).",
      "엔트로피는 C4.5 및 ID3에서 사용합니다.",
      "정보 획득량은 ID3에서 사용합니다.",
      "카이제곱 검정은 CHAID에서 사용합니다."
    ],
    optionTraps: [
      "1번 선지 (정답): CART = 지니 계수(Gini).",
      "2번 선지: C4.5 / C5.0 = 엔트로피 & Gain Ratio.",
      "4번 선지: CHAID = 카이제곱(카이의 CH)."
    ],
    memorizationPoint: "CART ➔ 지니(Gini) / C4.5 ➔ 엔트로피(Gain Ratio) / CHAID ➔ 카이제곱",
    examinerTip: "💡 의사결정나무 알고리즘 매칭: CART(지니), C4.5(엔트로피/이진분기X), CHAID(카이제곱/다지분기)를 꼭 외우세요."
  },
  {
    id: "Q9_13",
    subject: 3,
    chapter: "딥러닝 및 인공신경망",
    sectionId: "s3-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 딥러닝 다층 신경망(Deep Neural Networks)에서 Sigmoid 활성화 함수를 사용할 때 역전파 과정에서 기울기가 계속 곱해져 0으로 사라지는 '기울기 소실(Vanishing Gradient)' 문제를 해결하기 위해 가장 널리 도입된 활성화 함수는?",
    choices: [
      "ReLU (Rectified Linear Unit)",
      "Step Function (계단 함수)",
      "Linear Function (선형 함수)",
      "Softmax Function (소프트맥스 함수)"
    ],
    answer: 0,
    explanation: "ReLU 함수는 입력값이 0보다 크면 그 값을 그대로 출력($f(x) = x$)하여 양수 영역에서 미분값이 항상 1이 되므로, 심층 신경망에서도 기울기가 소실되지 않고 역전파 학습이 매우 원활하게 이루어지게 만든 혁신적인 활성화 함수입니다.",
    whyWrong: [
      "정답: 기울기 소실 해결 활성화 함수 = ReLU.",
      "계단 함수는 미분이 불가능(0)하여 역전파 학습 자체가 안 됩니다.",
      "선형 함수는 여러 층을 쌓아도 단일 층과 같아져 비선형 패턴을 학습할 수 없습니다.",
      "소프트맥스는 출력층에서 다중 클래스 확률을 정규화할 때 사용합니다."
    ],
    optionTraps: [
      "1번 선지 (정답): $x>0$일 때 기울기 1 유지 ➔ ReLU!",
      "4번 선지: 소프트맥스는 출력층의 확률 변환 함수이지 은닉층 기울기 소실 해결용이 아닙니다."
    ],
    memorizationPoint: "기울기 소실(Vanishing Gradient) 해결 ➔ ReLU ($f(x)=\max(0,x)$)",
    examinerTip: "💡 Sigmoid(0~1 압축, 기울기 소실) vs ReLU(0 이하 0, 0 초과 기울기 1, 기울기 소실 방지) 비교는 딥러닝 1순위 출제 포인트입니다."
  },
  {
    id: "Q9_14",
    subject: 3,
    chapter: "비지도학습 및 군집분석",
    sectionId: "s3-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 군집 분석 기법 중 군집의 개수($K$)를 사전에 지정할 필요가 없으며, 데이터 포인트 간의 반경($\\epsilon$, Epsilon)과 최소 이웃 점 개수(MinPts)를 기준으로 기하학적 형태의 군집을 탐색하고 노이즈(이상치)를 자동으로 판별하는 알고리즘은?",
    choices: [
      "K-평균 (K-Means)",
      "DBSCAN",
      "K-중앙값 (K-Medoids / PAM)",
      "가우시안 혼합 모델 (GMM)"
    ],
    answer: 1,
    explanation: "DBSCAN(Density-Based Spatial Clustering of Applications with Noise)은 밀도 기반 군집 알고리즘으로, 군집 수 K를 미리 정하지 않아도 되며, Epsilon 반경 내에 MinPts 이상의 데이터가 밀집되어 있는지를 확인하여 임의의 복잡한 모양의 군집도 잘 찾고 이상치(Noise)를 자동 분리합니다.",
    whyWrong: [
      "K-Means는 군집 수 K를 사전에 반드시 정해야 하며 구형(Spherical) 군집만 잘 찾습니다.",
      "정답: K 사전지정 불필요, Epsilon/MinPts 밀도 기반, 노이즈 감지 ➔ DBSCAN.",
      "K-Medoids는 이상치에 강한 K-Means 변형이나 여전히 K를 미리 지정해야 합니다.",
      "GMM은 정규분포 혼합 기반의 소프트 군집 기법입니다."
    ],
    optionTraps: [
      "1번 선지: K-Means는 이상치에 민감하고 K를 사전에 반드시 지정해야 합니다.",
      "2번 선지 (정답): K 사전지정 X, 밀도(Epsilon, MinPts), 노이즈 분리 ➔ DBSCAN."
    ],
    memorizationPoint: "DBSCAN ➔ K 지정 X / Epsilon & MinPts / 밀도 기반 / 노이즈(이상치) 자동 감지",
    examinerTip: "💡 3초 치트키: '군집 수 K를 미리 정하지 않는다' + '밀도(Epsilon, MinPts)' ➔ 100% DBSCAN입니다."
  },
  {
    id: "Q9_15",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 혼동 행렬(Confusion Matrix)에서 실제 음성(Actual Negative)인 데이터 중에서 모델이 올바르게 음성(Predicted Negative)으로 분류한 비율을 나타내는 지표는?",
    choices: [
      "정밀도 (Precision)",
      "재현율 (Recall / 민감도)",
      "특이도 (Specificity)",
      "위양성률 (False Positive Rate)"
    ],
    answer: 2,
    explanation: "특이도(Specificity)는 실제 Negative인 것(TN + FP) 중에서 모델이 정확히 Negative로 맞힌(TN) 비율인 TN / (TN + FP) 을 의미합니다. (1 - 특이도 = 위양성률 FPR)",
    whyWrong: [
      "정밀도는 모델이 Positive라고 예측한 것 중 실제 Positive인 비율(TP / (TP + FP))입니다.",
      "재현율(민감도)은 실제 Positive인 것 중 모델이 맞힌 비율(TP / (TP + FN))입니다.",
      "정답: 실제 음성 중 맞힌 비율 = 특이도(Specificity, TN / (TN+FP)).",
      "위양성률은 실제 음성 중 양성으로 잘못 예측한 비율(FP / (TN+FP) = 1 - 특이도)입니다."
    ],
    optionTraps: [
      "1번 선지: 예측 양성 중 실제 양성 = 정밀도.",
      "2번 선지: 실제 양성 중 예측 양성 = 재현율(민감도).",
      "3번 선지 (정답): 실제 음성 중 예측 음성 = 특이도."
    ],
    memorizationPoint: "재현율(민감도) = 실제 양성 중 정답 / 특이도 = 실제 음성 중 정답",
    examinerTip: "💡 분모 분자 구분 공식: 정밀도(예측P 분모), 재현율(실제P 분모), 특이도(실제N 분모). 3초 만에 분모를 확인하세요!"
  },
  {
    id: "Q9_16",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 이진 분류 모델의 임곗값(Threshold) 변화에 따른 성능을 시각화하는 ROC(Receiver Operating Characteristic) 곡선에서 가로축(X축)과 세로축(Y축)에 해당하는 지표의 조합으로 올바른 것은?",
    choices: [
      "X축: 1 - 특이도 (FPR), Y축: 민감도 / 재현율 (TPR)",
      "X축: 정밀도 (Precision), Y축: 재현율 (Recall)",
      "X축: 특이도 (TNR), Y축: 정밀도 (Precision)",
      "X축: 정확도 (Accuracy), Y축: F1-Score"
    ],
    answer: 0,
    explanation: "ROC 곡선의 X축은 위양성률(FPR = 1 - 특이도)이고, Y축은 참양성률(TPR = 민감도 = 재현율)입니다. 곡선 아래 면적인 AUC(Area Under Curve)가 1에 가까울수록 우수한 모델입니다.",
    whyWrong: [
      "정답: X축 = 1 - 특이도(FPR), Y축 = 재현율(TPR).",
      "X축 정밀도, Y축 재현율은 PR(Precision-Recall) 곡선입니다.",
      "특이도와 정밀도 조합은 ROC가 아닙니다.",
      "정확도와 F1은 ROC 축이 아닙니다."
    ],
    optionTraps: [
      "1번 선지 (정답): ROC 곡선 ➔ X축: FPR (1-특이도), Y축: TPR (민감도/재현율).",
      "2번 선지: PR 곡선(불균형 데이터용)과의 혼동을 유도하는 보기입니다."
    ],
    memorizationPoint: "ROC 곡선 ➔ X: 1 - 특이도(FPR) / Y: 민감도(TPR)",
    examinerTip: "💡 ROC-AUC는 면적이 0.5이면 무작위 찍기(Random Guess), 1.0이면 완벽한 분류기를 의미합니다."
  },
  {
    id: "Q9_17",
    subject: 4,
    chapter: "회귀 모형 진단 및 평가",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 선형 회귀 분석(Linear Regression)에서 최소제곱법(OLS)을 적용하기 위해 잔차(Residual)가 만족해야 하는 4대 기본 가정에 포함되지 않는 것은?",
    choices: [
      "선형성 (Linearity)",
      "정규성 (Normality)",
      "등분산성 (Homoscedasticity)",
      "다중공선성 (Multicollinearity)"
    ],
    answer: 3,
    explanation: "선형 회귀 잔차의 4대 기본 가정은 [선형성, 독립성, 등분산성, 정규성]입니다. 다중공선성(Multicollinearity)은 독립변수들 간에 강한 상관관계가 있어 회귀계수 추정을 왜곡시키는 '해결해야 할 문제점(위험 요인)'이지 기본 가정이 아닙니다.",
    whyWrong: [
      "선형성은 종속변수와 독립변수 간의 관계가 선형이라는 기본 가정입니다.",
      "정규성은 잔차가 평균 0인 정규분포를 따른다는 기본 가정입니다.",
      "등분산성은 잔차의 분산이 모든 독립변수 값에서 일정하다는 기본 가정입니다.",
      "정답: 다중공선성은 독립변수 간 상관관계로 인한 문제점이지 잔차의 기본 가정이 아닙니다."
    ],
    optionTraps: [
      "1~3번 선지: 회귀 잔차의 4대 가정 (선·독·등·정: 선형성, 독립성, 등분산성, 정규성).",
      "4번 선지 (정답): 다중공선성은 없어야 좋은 모델의 결함 조건입니다."
    ],
    memorizationPoint: "회귀 4대 가정 ➔ 선·독·등·정 (선형성, 독립성, 등분산성, 정규성)",
    examinerTip: "💡 4과목 3초 암기: '선·독·등·정' 4글자를 외우면 3초 안에 맞힙니다."
  },
  {
    id: "Q9_18",
    subject: 4,
    chapter: "설명 가능한 AI (XAI)",
    sectionId: "s4-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 복잡한 블랙박스 머신러닝 모델의 예측 결과를 해석하기 위한 XAI(설명 가능한 인공지능) 기법 중, 게임 이론(Game Theory)의 '섀플리 값(Shapley Value)'을 기반으로 모든 특성(Feature) 조합의 한계 기여도를 공정하게 계산하여 각 특성의 기여도를 산출하는 기법은?",
    choices: [
      "LIME (Local Interpretable Model-agnostic Explanations)",
      "SHAP (SHapley Additive exPlanations)",
      "Grad-CAM",
      "PDP (Partial Dependence Plot)"
    ],
    answer: 1,
    explanation: "SHAP(SHapley Additive exPlanations)은 노벨 경제학상을 수상한 로이드 섀플리의 게임 이론 '섀플리 값'을 머신러닝에 적용한 것으로, 전체 특성의 기여도 합이 모델의 예측값 차이와 일치하는 완벽한 가법적(Additive) 특성 기여도를 산출하는 대표적인 XAI 기법입니다.",
    whyWrong: [
      "LIME은 데이터 주변에 섭동(Perturbation)을 주어 '국소적인 선형 모델'로 근사 해석하는 기법입니다.",
      "정답: 게임 이론 섀플리 값 기반 기법 = SHAP.",
      "Grad-CAM은 CNN 이미지 분류 모델에서 어떤 영역을 보고 판단했는지 히트맵으로 시각화하는 기법입니다.",
      "PDP는 특정 변수의 변화에 따른 모델 예측값의 주변부 확률 변화를 곡선으로 나타내는 도표입니다."
    ],
    optionTraps: [
      "1번 선지: 국소적 선형 근사 ➔ LIME.",
      "2번 선지 (정답): 게임 이론, 섀플리 값 ➔ SHAP!"
    ],
    memorizationPoint: "게임 이론 / 섀플리 값 ➔ SHAP / 국소 선형 근사 ➔ LIME",
    examinerTip: "💡 최신 8회, 9회, 10회에서 XAI(설명 가능한 AI) 문제가 필수 1~2문제씩 고정 출제되고 있습니다. SHAP vs LIME을 완벽히 구분하세요."
  },
  {
    id: "Q9_19",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 정밀도(Precision)와 재현율(Recall)이 상호 트레이드오프(Trade-off) 관계에 있을 때, 두 지표의 균형을 평가하기 위해 '조화평균(Harmonic Mean)'을 적용하여 산출하는 지표는?",
    choices: [
      "정확도 (Accuracy)",
      "F1-Score (F1 점수)",
      "카파 통계량 (Kappa Statistic)",
      "ROC-AUC"
    ],
    answer: 1,
    explanation: "F1-Score는 정밀도(Precision)와 재현율(Recall)의 조화평균으로 정의되며, 공식은 $2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$ 입니다. 암 진단이나 사기 거래 탐지 등 클래스 불균형이 심한 데이터셋에서 정확도(Accuracy)의 왜곡을 보완하는 대표적인 지표입니다.",
    whyWrong: [
      "정확도는 (TP+TN)/전체 로 불균형 데이터에서 다수 클래스만 맞혀도 높게 나오는 왜곡이 있습니다.",
      "정답: 정밀도와 재현율의 조화평균 = F1-Score.",
      "카파 통계량은 우연에 의해 맞출 확률을 배제한 두 관찰자/예측 간의 일치도입니다.",
      "ROC-AUC는 임곗값 전체에 걸친 면적입니다."
    ],
    optionTraps: [
      "1번 선지: 산술평균이나 단순 비율이 아닙니다.",
      "2번 선지 (정답): 정밀도와 재현율의 조화평균 = F1-Score."
    ],
    memorizationPoint: "F1-Score = 정밀도와 재현율의 조화평균 ($2 \\cdot P \\cdot R / (P+R)$)",
    examinerTip: "💡 계산 문제 예시: 정밀도 0.8, 재현율 0.8일 때 F1 = 0.8 / 정밀도 0.6, 재현율 0.9일 때 F1 = 2*(0.54)/1.5 = 0.72."
  },
  {
    id: "Q9_20",
    subject: 4,
    chapter: "연관 규칙 및 비지도 평가",
    sectionId: "s4-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 연관성 분석(Association Analysis)에서 품목 A와 품목 B 사이의 연관 규칙 $A \\rightarrow B$에 대한 향상도(Lift)가 2.5로 도출되었다. 이에 대한 올바른 해석은?",
    choices: [
      "품목 A를 구매하지 않은 고객이 품목 B를 구매할 확률이 2.5배 높다.",
      "품목 A를 구매한 고객이 품목 B를 구매할 확률이, 품목 B를 임의로 구매할 일반 확률보다 2.5배 높다 (양의 상관관계).",
      "품목 A와 B는 상호 독립이며 아무런 연관성이 없다.",
      "전체 거래 중 품목 A와 B가 동시에 구매된 거래의 비율이 2.5%이다."
    ],
    answer: 1,
    explanation: "향상도(Lift)는 $P(B|A) / P(B)$ 로 계산되며, Lift = 1 이면 독립(연관 없음), Lift > 1 이면 양의 상관관계(A 구매 시 B 구매율 증가), Lift < 1 이면 음의 상관관계(A 구매 시 B 구매율 감소)를 뜻합니다. 따라서 Lift = 2.5는 A를 샀을 때 B를 살 확률이 B의 평소 구매율보다 2.5배 높다는 뜻입니다.",
    whyWrong: [
      "A를 구매한 고객에 대한 조건부 확률의 증가 배수입니다.",
      "정답: Lift > 1 이므로 B 일반 구매율 대비 2.5배 증가한 양의 상관관계입니다.",
      "Lift = 1 일 때가 독립입니다.",
      "동시 구매 거래 비율은 지지도(Support)에 해당합니다."
    ],
    optionTraps: [
      "1, 4번 선지: 지지도나 음의 상관과의 혼동을 유도하는 보기입니다.",
      "2번 선지 (정답): Lift 2.5 = 1보다 큼 ➔ 양의 연관성(2.5배 구매 증가)."
    ],
    memorizationPoint: "향상도(Lift) ➔ 1이면 독립 / >1이면 양의 상관(추천 유효) / <1이면 음의 상관",
    examinerTip: "💡 4과목 단골 계산: 지지도 $P(A \\cap B)$, 신뢰도 $P(A \\cap B)/P(A)$, 향상도 $\\text{신뢰도}/P(B)$ 3대 공식은 반드시 암기해야 합니다."
  },
  {
    id: "Q9_21",
    subject: 2,
    chapter: "시계열 데이터 탐색",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 시계열 데이터(Time Series) 분석에서 데이터가 시간에 따라 평균이 일정하지 않고 상승하는 추세(Trend)를 가질 때, 평균을 일정하게 만들어 정상 시계열(Stationary Series)로 변환하기 위해 취하는 조치는?",
    choices: [
      "차분 (Differencing)",
      "로그 변환 (Log Transformation)",
      "이동평균 스무딩 (Moving Average Smoothing)",
      "푸리에 변환 (Fourier Transform)"
    ],
    answer: 0,
    explanation: "시계열에서 평균이 일정하지 않은 추세(Trend)가 있을 때는 현 시점 값에서 이전 시점 값을 빼주는 **차분(Differencing)**을 수행하여 평균을 일정하게 만들고, 분산이 일정하지 않을 때는 **로그 변환(Log Transformation)**을 수행합니다.",
    whyWrong: [
      "정답: 평균의 비정상성(추세) 제거 = 차분(Differencing).",
      "로그 변환은 시간에 따라 분산이 커질 때(분산 안정화) 사용합니다.",
      "이동평균 스무딩은 잡음을 완화하여 추세를 시각적으로 보기 위한 평활화입니다.",
      "푸리에 변환은 주파수 영역 변환 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 평균이 일정하지 않음 ➔ 차분(Differencing)!",
      "2번 선지: 분산이 일정하지 않음 ➔ 로그 변환(Log)!"
    ],
    memorizationPoint: "평균 비정상 ➔ 차분(Differencing) / 분산 비정상 ➔ 로그 변환(Log)",
    examinerTip: "💡 시계열 정상성 2대 조치: '평균 ➔ 차분', '분산 ➔ 로그' 2초 만에 연결하세요."
  },
  {
    id: "Q9_22",
    subject: 4,
    chapter: "회귀 모형 진단 및 다중공선성",
    sectionId: "s4-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 다중 회귀 분석에서 독립변수들 간의 강한 상관관계로 인해 회귀계수 추정의 분산이 비정상적으로 커지는 '다중공선성(Multicollinearity)'을 진단하는 분산팽창요인(VIF : Variance Inflation Factor)의 기준으로 가장 널리 사용되는 수치는?",
    choices: [
      "VIF >= 1.0",
      "VIF >= 2.5",
      "VIF >= 10.0",
      "VIF >= 100.0"
    ],
    answer: 2,
    explanation: "VIF(Variance Inflation Factor)는 $1 / (1 - R_i^2)$ 로 계산되며, 일반적으로 VIF가 10 이상(또는 엄격하게는 5 이상)이면 해당 독립변수에 심각한 다중공선성이 존재한다고 판단하여 변수 제거, 주성분 분석(PCA), Ridge/Lasso 규제 등을 적용합니다.",
    whyWrong: [
      "VIF = 1 은 다중공선성이 전혀 없는 완벽히 독립적인 이상적 상태입니다.",
      "2.5는 다중공선성 위험 수치가 아닙니다.",
      "정답: 다중공선성 판단 표준 임곗값은 VIF >= 10 (또는 공차한계 Tolerance <= 0.1) 입니다.",
      "100은 너무 극단적인 기준입니다."
    ],
    optionTraps: [
      "1번 선지: VIF=1은 최상의 상태입니다.",
      "3번 선지 (정답): VIF >= 10 (공차한계 Tolerance = 1/VIF <= 0.1)."
    ],
    memorizationPoint: "다중공선성 진단 ➔ VIF >= 10 (공차한계 Tolerance <= 0.1)",
    examinerTip: "💡 VIF와 공차한계(Tolerance)는 역수 관계($\\text{Tolerance} = 1/\\text{VIF}$)라는 점도 시험에 자주 출제됩니다."
  },
  {
    id: "Q9_23",
    subject: 2,
    chapter: "불균형 데이터 처리",
    sectionId: "s2-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 분류 분석에서 소수 클래스 데이터가 너무 적을 때, 소수 데이터를 단순 복제(Random Oversampling)하는 대신 소수 클래스 데이터 간의 K-최근접 이웃(KNN)을 찾아 선형 보간 방식으로 새로운 합성 샘플을 생성하는 오버샘플링 기법은?",
    choices: [
      "언더샘플링 (Random Undersampling)",
      "SMOTE (Synthetic Minority Over-sampling Technique)",
      "Tomek Links (토멕 링크)",
      "CNN (Condensed Nearest Neighbor)"
    ],
    answer: 1,
    explanation: "SMOTE(Synthetic Minority Over-sampling Technique)는 소수 클래스 데이터 간의 K-최근접 이웃(KNN) 거리를 기반으로 무작위 가중치를 곱해 선상에 가상의 새로운 합성 데이터를 생성(보간)함으로써 단순 복제로 인한 과대적합을 방지하는 대표적인 오버샘플링 기법입니다.",
    whyWrong: [
      "언더샘플링은 다수 클래스 데이터를 삭제하는 방식입니다.",
      "정답: KNN 선형 보간 합성 오버샘플링 = SMOTE.",
      "Tomek Links는 서로 다른 클래스가 인접한 경계면 데이터를 삭제하는 언더샘플링 기법입니다.",
      "CNN은 대표 데이터만 남기고 다수 데이터를 제거하는 언더샘플링 기법입니다."
    ],
    optionTraps: [
      "1, 3, 4번 선지: 모두 다수 클래스를 줄이는 언더샘플링 기법들입니다.",
      "2번 선지 (정답): 소수 클래스를 합성 생성하는 오버샘플링 = SMOTE!"
    ],
    memorizationPoint: "합성 오버샘플링 / KNN 보간 ➔ SMOTE",
    examinerTip: "💡 2과목 3초 치트키: '소수 클래스 단순 복제 X, 새로운 합성 샘플 생성' ➔ 100% SMOTE입니다."
  },
  {
    id: "Q9_24",
    subject: 3,
    chapter: "딥러닝 최적화 및 옵티마이저",
    sectionId: "s3-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 딥러닝 경사 하강법(Gradient Descent)의 옵티마이저 중 모멘텀(Momentum)이 관성으로 인해 최적점을 지나쳐 과도하게 진동하는 현상(Overshooting)을 방지하기 위해, 현재 위치가 아닌 '관성으로 앞으로 이동할 예측 위치'에서의 기울기를 미리 계산하여 반영하는 기법은?",
    choices: [
      "AdaGrad",
      "RMSprop",
      "NAG (Nesterov Accelerated Gradient)",
      "Adam"
    ],
    answer: 2,
    explanation: "NAG(Nesterov Accelerated Gradient)는 기존 모멘텀이 관성에 의해 멈추지 못하고 과도하게 튀어 나가는 것을 막기 위해, 관성 방향으로 먼저 한 걸음 이동한 미래 지점의 기울기를 계산하여 감속/수정 조향을 해주는 똑똑한 모멘텀 개선 알고리즘입니다.",
    whyWrong: [
      "AdaGrad는 자주 업데이트된 가중치의 학습률을 줄이는 학습률 적응형 옵티마이저입니다.",
      "RMSprop은 AdaGrad의 학습 정체 문제를 지수이동평균으로 해결한 옵티마이저입니다.",
      "정답: 미래 예측 지점의 기울기를 미리 확인하여 오버슈팅을 억제하는 옵티마이저는 NAG입니다.",
      "Adam은 모멘텀(방향)과 RMSprop(보폭/학습률)을 결합한 종합 옵티마이저입니다."
    ],
    optionTraps: [
      "1, 2번 선지: 학습률(보폭) 적응형 옵티마이저입니다.",
      "3번 선지 (정답): Nesterov(NAG) = 모멘텀으로 이동할 위치에서 미리 기울기 계산!",
      "4번 선지: Adam = Momentum + RMSprop."
    ],
    memorizationPoint: "미래 예측 위치에서 미리 기울기 계산 ➔ NAG (Nesterov)",
    examinerTip: "💡 옵티마이저 족보: SGD ➔ Momentum(관성) ➔ NAG(미리보기 관성) / AdaGrad(학습률 감소) ➔ RMSprop(지수평균) ➔ Adam(Momentum+RMSprop)."
  },
  {
    id: "Q9_25",
    subject: 1,
    chapter: "데이터 품질 및 거버넌스",
    sectionId: "s1-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "9",
    exam: "9회 기출 복원",
    question: "[9회 기출 복원] 데이터 품질 관리의 세부 평가 지표 중 '데이터 값이 사전에 정의된 유효 범위(도메인), 형식 규칙, 허용된 코드값 범위 내에 존재하는 정도'를 뜻하는 품질 지표는?",
    choices: [
      "정확성 (Accuracy)",
      "유효성 (Validity)",
      "완전성 (Completeness)",
      "일관성 (Consistency)"
    ],
    answer: 1,
    explanation: "유효성(Validity)은 데이터가 정해진 도메인, 데이터 형식(Format), 허용 범위(예: 나이는 0~150 사이 숫자, 이메일은 @ 포함 등)를 충족하는지를 평가하는 지표입니다.",
    whyWrong: [
      "정확성은 실세계의 실제 사실과 데이터 값이 정확히 일치하는지 여부입니다.",
      "정답: 허용된 도메인/형식/범위 규칙 만족 여부 = 유효성(Validity).",
      "완전성은 필수 데이터가 누락(결측) 없이 채워져 있는 비율입니다.",
      "일관성은 여러 시스템이나 테이블 간에 동일한 데이터가 모순 없이 일치하는지 여부입니다."
    ],
    optionTraps: [
      "1번 선지: 정확성(실제 사실과의 부합)과 유효성(형식/도메인 규칙 충족)의 구분을 묻는 대표 함정입니다.",
      "2번 선지 (정답): 형식 규칙, 도메인 만족 ➔ 유효성(Validity)."
    ],
    memorizationPoint: "유효성 = 도메인/형식 규칙 충족 / 완전성 = 누락 없음 / 일관성 = 모순 없음",
    examinerTip: "💡 1과목 3초 치트키: '도메인', '형식 규칙', '유효 범위' 키워드 ➔ 유효성(Validity)!"
  },

  // ========================================================
  // [8회 기출 복원 팩 25문항 (Q8_01 ~ Q8_25)]
  // ========================================================
  {
    id: "Q8_01",
    subject: 1,
    chapter: "빅데이터 아키텍처",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 데이터 웨어하우스(DW)와 비교한 '데이터 레이크(Data Lake)'의 주요 특징으로 가장 올바른 것은?",
    choices: [
      "사전에 정제되고 정의된 정형 스키마(Schema-on-Write)로만 데이터를 저장한다.",
      "원시 형태(Raw Data) 그대로 정형, 반정형, 비정형 데이터를 대규모로 저장하며 읽을 때 스키마를 적용(Schema-on-Read)한다.",
      "데이터 분석가보다는 주로 비즈니스 현업 사용자의 고정된 정형 리포팅에 최적화되어 있다.",
      "RDBMS의 관계형 테이블 구조만을 기본 스토리지로 사용한다."
    ],
    answer: 1,
    explanation: "데이터 레이크(Data Lake)는 원시 데이터(Raw Data)를 가공 없이 그대로 저장하는 대규모 저장소로, 데이터를 읽어오는 시점에 스키마를 정의하여 해석하는 Schema-on-Read 방식을 사용합니다. (DW는 저장할 때 정제하는 Schema-on-Write 방식)",
    whyWrong: [
      "Schema-on-Write는 데이터 웨어하우스(DW)의 특징입니다.",
      "정답: 원시 데이터 무가공 저장 + Schema-on-Read = 데이터 레이크.",
      "고정 정형 리포팅은 DW와 데이터 마트(DM)의 특징입니다.",
      "데이터 레이크는 하둡(HDFS), S3 등 객체/분산 스토리지를 사용합니다."
    ],
    optionTraps: [
      "1번 선지: DW(Schema-on-Write)와 Lake(Schema-on-Read)의 차이를 뒤바꿔 묻는 보기입니다.",
      "2번 선지 (정답): 원시 데이터(Raw), 비정형 포함, Schema-on-Read ➔ Data Lake!"
    ],
    memorizationPoint: "DW = Schema-on-Write (정제 저장) / Data Lake = Schema-on-Read (원시 저장)",
    examinerTip: "💡 DW vs Data Lake vs Data Mart 삼각 비교는 1과목 인프라 단골 문제입니다."
  },
  {
    id: "Q8_02",
    subject: 1,
    chapter: "데이터 분석 기획",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 분석 과제 도출 방식 중 현재 문제가 무엇인지 이미 알고 있는 상태에서 출발하여 구체적인 해결책을 찾아가는 '하향식 접근법(Top-down Approach)'의 4단계 추진 절차로 올바른 것은?",
    choices: [
      "문제 탐색 ➔ 문제 정의 ➔ 해결방안 도출 ➔ 타당성 검토",
      "문제 정의 ➔ 데이터 수집 ➔ 모델링 ➔ 배포",
      "데이터 탐색 ➔ 가설 수립 ➔ 솔루션 도출 ➔ 평가",
      "비즈니스 모델 탐색 ➔ 프로토타이핑 ➔ 타당성 검토 ➔ 발굴"
    ],
    answer: 0,
    explanation: "하향식 접근법(Top-down)의 4단계 절차는 [1단계: 문제 탐색(Problem Discovery)] ➔ [2단계: 문제 정의(Problem Definition)] ➔ [3단계: 해결방안 도출(Solution Engineering)] ➔ [4단계: 타당성 검토(Feasibility Study)] 입니다.",
    whyWrong: [
      "정답: 문제 탐색 ➔ 문제 정의 ➔ 해결방안 도출 ➔ 타당성 검토.",
      "일반적인 데이터 분석 사이클입니다.",
      "상향식(Bottom-up) 데이터 기반 탐색 절차입니다.",
      "단계가 잘못 섞인 오답입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 하향식 4단계 = 문탐 ➔ 문정 ➔ 해방 ➔ 타검.",
      "하향식(문제 중심, 비즈니스 니즈) vs 상향식(데이터 중심, Discovery, 프로토타이핑) 구분이 중요합니다."
    ],
    memorizationPoint: "하향식 4단계 ➔ 문탐·문정·해방·타검 (문제탐색 ➔ 문제정의 ➔ 해결방안도출 ➔ 타당성검토)",
    examinerTip: "💡 하향식(Top-down)과 상향식(Bottom-up/지도학습이 아닌 비지도 기반 탐색)의 정의 매칭이 핵심입니다."
  },
  {
    id: "Q8_03",
    subject: 1,
    chapter: "데이터 거버넌스 및 성숙도",
    sectionId: "s1-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 기업의 데이터 분석 성숙도 모델(CMMI 기반)의 4개 레벨 중 '전사 차원에서 분석 전문 조직이 신설되고, 분석 프로세스가 표준화되어 조직 전체로 분석이 확산되는 단계'는?",
    choices: [
      "1단계: 도입 단계",
      "2단계: 활용 단계",
      "3단계: 확산 단계",
      "4단계: 최적화 단계"
    ],
    answer: 2,
    explanation: "분석 성숙도 4단계: [1단계: 도입(분석 시작, 실적 파악)] ➔ [2단계: 활용(부서 단위 분석 활용, 예측)] ➔ [3단계: 확산(전사 전담조직, 프로세스 표준화, 전사 확산)] ➔ [4단계: 최적화(빅데이터 분석이 기업의 핵심 역량이 됨)] 입니다. 전사 조직과 표준화는 '확산 단계'입니다.",
    whyWrong: [
      "도입 단계는 일부 부서에서 기초적인 실적 위주 분석을 시작하는 단계입니다.",
      "활용 단계는 전문 부서에서 시뮬레이션 및 미래 예측을 수행하는 단계입니다.",
      "정답: 전사 분석 전문 조직 신설 및 프로세스 표준화 = 3단계 확산 단계.",
      "최적화 단계는 혁신과 최고 수준의 데이터 기반 의사결정이 내재화된 단계입니다."
    ],
    optionTraps: [
      "2번 선지: 부서 단위 활용(2단계)과 전사적 확산/표준화(3단계)의 차이를 묻는 함정입니다.",
      "3번 선지 (정답): 전사 조직, 표준화, 전사 확산 ➔ 3단계 확산 단계!"
    ],
    memorizationPoint: "성숙도 4단계 ➔ 도·활·확·최 (도입 ➔ 활용 ➔ 확산 ➔ 최적화)",
    examinerTip: "💡 준비도(6개 영역: 고객/인력/인프라/기법 등)와 성숙도(도·활·확·최)의 사분면 매핑(준비형, 정착형, 도입형, 확산형)도 함께 출제됩니다."
  },
  {
    id: "Q8_04",
    subject: 2,
    chapter: "기술 통계 및 데이터 분포",
    sectionId: "s2-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 데이터의 분포 형태를 나타내는 왜도(Skewness)가 양수($\\text{Skewness} > 0$)인 '오른쪽 꼬리가 긴 분포'에서 평균(Mean), 중앙값(Median), 최빈값(Mode)의 크기 비교로 올바른 것은?",
    choices: [
      "평균 > 중앙값 > 최빈값",
      "최빈값 > 중앙값 > 평균",
      "중앙값 > 평균 > 최빈값",
      "평균 = 중앙값 = 최빈값"
    ],
    answer: 0,
    explanation: "왜도가 양수($>0$)이면 오른쪽으로 긴 꼬리를 갖는 분포(Positive Skew)가 되며, 극단적인 고소득자나 큰 값들에 의해 평균이 오른쪽으로 가장 크게 끌려가므로 **평균 > 중앙값 > 최빈값** 순서가 됩니다. (왼쪽 꼬리 분포는 최빈값 > 중앙값 > 평균)",
    whyWrong: [
      "정답: 오른쪽 꼬리 분포(왜도>0) = 평균 > 중앙값 > 최빈값.",
      "최빈값 > 중앙값 > 평균 은 왼쪽 꼬리가 긴 분포(왜도<0)입니다.",
      "중앙값이 가장 큰 경우는 정상적인 단봉 분포에서 발생하지 않습니다.",
      "평균 = 중앙값 = 최빈값 은 좌우 대칭인 정규분포(왜도=0)입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 오른쪽 꼬리(왜도>0) ➔ 큰 값 때문에 평균이 가장 큼(평 > 중 > 최).",
      "2번 선지: 왼쪽 꼬리(왜도<0) ➔ 작은 값 때문에 평균이 가장 작음(최 > 중 > 평)."
    ],
    memorizationPoint: "오른쪽 꼬리(왜도>0) = 평 > 중 > 최 / 왼쪽 꼬리(왜도<0) = 최 > 중 > 평",
    examinerTip: "💡 2과목 3초 치트키: '오른쪽 꼬리 ➔ 평균이 오른쪽(최대)'로 외우면 절대 헷갈리지 않습니다."
  },
  {
    id: "Q8_05",
    subject: 2,
    chapter: "통계 검정 및 정규성 검정",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 통계적 가설 검정 전 표본 데이터가 정규분포를 따르는지 검증하는 정규성 검정(Normality Test) 방법 중 소표본($n < 2000$)에서 검정력이 가장 우수하여 가장 널리 권장되는 검정법은?",
    choices: [
      "Shapiro-Wilk 검정 (샤피로-윌크 검정)",
      "Kolmogorov-Smirnov 검정 (K-S 검정)",
      "Durbin-Watson 검정",
      "Levene 검정 (레빈 검정)"
    ],
    answer: 0,
    explanation: "Shapiro-Wilk 검정은 표본 수가 비교적 적은 환경($n < 2000$)에서 정규성을 검정할 때 가장 뛰어난 검정력을 나타내는 표준 정규성 검정법입니다. (Kolmogorov-Smirnov는 대표본이나 일반 연속형 분포 적합도 검정용, Durbin-Watson은 잔차 자기상관 검정, Levene은 등분산성 검정)",
    whyWrong: [
      "정답: 소표본 대표 정규성 검정 = Shapiro-Wilk 검정.",
      "Kolmogorov-Smirnov는 대표본에 주로 쓰이며 Shapiro-Wilk보다 검정력이 다소 낮습니다.",
      "Durbin-Watson은 회귀 잔차의 독립성(자기상관) 검정법입니다.",
      "Levene 검정은 집단 간 등분산성 검정법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 소표본 정규성 검정 ➔ Shapiro-Wilk!",
      "3번 선지: 잔차 자기상관 ➔ Durbin-Watson.",
      "4번 선지: 등분산성 ➔ Levene / Bartlett."
    ],
    memorizationPoint: "정규성 = Shapiro-Wilk / 등분산성 = Levene, Bartlett / 자기상관 = Durbin-Watson",
    examinerTip: "💡 통계 검정 3대 목적: '정규성(샤피로)', '등분산성(레빈)', '독립성/자기상관(더빈왓슨)'을 1초 만에 매칭하세요."
  },
  {
    id: "Q8_06",
    subject: 2,
    chapter: "비모수 통계 검정",
    sectionId: "s2-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 동일한 표본 집단에 대해 사전(Before)과 사후(After)를 비교하는 '대응표본 t-검정(Paired t-test)'을 수행하려 했으나, 정규성 가정을 만족하지 못했을 때 적용해야 하는 비모수 통계 검정법은?",
    choices: [
      "맨-휘트니 U 검정 (Mann-Whitney U Test)",
      "윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank Test)",
      "크루스칼-왈리스 검정 (Kruskal-Wallis Test)",
      "프리드만 검정 (Friedman Test)"
    ],
    answer: 1,
    explanation: "대응표본 t-검정(Paired t-test, 전후 비교 2집단)의 비모수 대안은 **윌콕슨 부호순위 검정(Wilcoxon Signed-Rank Test)**입니다. (독립 2표본 t-검정의 비모수 대안은 맨-휘트니 U 검정, 일원배치 분산분석 ANOVA의 비모수 대안은 크루스칼-왈리스 검정)",
    whyWrong: [
      "맨-휘트니 U 검정은 서로 다른 독립된 2집단(독립표본 t-test 대안)에 사용합니다.",
      "정답: 대응 2집단(전후 비교) 비모수 검정 = 윌콕슨 부호순위 검정.",
      "크루스칼-왈리스 검정은 독립된 3집단 이상(일원배치 ANOVA 대안)에 사용합니다.",
      "프리드만 검정은 반복측정된 3집단 이상(반복측정 ANOVA 대안)에 사용합니다."
    ],
    optionTraps: [
      "1번 선지: 독립 2표본 ➔ 맨-휘트니 U 검정.",
      "2번 선지 (정답): 대응 2표본(Paired, 전후) ➔ 윌콕슨 부호순위 검정."
    ],
    memorizationPoint: "독립 2집단 비모수 ➔ 맨-휘트니 / 대응 2집단(전후) 비모수 ➔ 윌콕슨 부호순위",
    examinerTip: "💡 모수 vs 비모수 짝꿍: 독립 t-test ➔ 맨-휘트니 / 대응 Paired t-test ➔ 윌콕슨 부호순위 / ANOVA ➔ 크루스칼-왈리스."
  },
  {
    id: "Q8_07",
    subject: 3,
    chapter: "선형 회귀 및 정규화(규제)",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 회귀 모델의 과대적합을 방지하기 위한 정규화 기법 중, 손실 함수에 가중치들의 '절댓값의 합(L1 Norm)'을 페널티로 부여하여 중요하지 않은 일부 변수의 가중치를 '완전히 0으로 만들어 변수 선택(Feature Selection) 효과'를 내는 회귀 모델은?",
    choices: [
      "Ridge 회귀 (릿지 회귀)",
      "Lasso 회귀 (라쏘 회귀)",
      "다항 회귀 (Polynomial Regression)",
      "주성분 회귀 (PCR)"
    ],
    answer: 1,
    explanation: "Lasso(Least Absolute Shrinkage and Selection Operator) 회귀는 가중치의 절댓값 합인 L1 규제를 손실 함수에 추가하여, 덜 중요한 변수의 회귀 계수를 정확하게 0으로 만들어 자동으로 변수를 선택(Sparse Model)해 줍니다. (Ridge는 L2 규제로 계수를 0에 가깝게 줄이지만 0으로 만들지는 않음)",
    whyWrong: [
      "Ridge 회귀는 L2 규제(가중치 제곱합)를 사용하여 계수를 작게 줄일 뿐 0으로 만들지는 못합니다.",
      "정답: L1 규제 + 계수 0 + 변수 선택 = Lasso 회귀.",
      "다항 회귀는 비선형 피처를 생성하는 회귀입니다.",
      "주성분 회귀는 PCA 변환 피처로 회귀하는 기법입니다."
    ],
    optionTraps: [
      "1번 선지: L2 규제 / 가중치 축소 / 0이 되진 않음 ➔ Ridge.",
      "2번 선지 (정답): L1 규제 / 가중치 0 가능 / 변수 선택(Feature Selection) ➔ Lasso."
    ],
    memorizationPoint: "L1 규제 = Lasso (계수 정확히 0, 변수 선택) / L2 규제 = Ridge (계수 축소, 0 안됨)",
    examinerTip: "💡 '1(L1)은 0으로 만든다(Lasso)', '2(L2)는 작게 줄인다(Ridge)' 공식으로 1초 만에 맞히세요."
  },
  {
    id: "Q8_08",
    subject: 3,
    chapter: "지도학습 머신러닝 알고리즘",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 로지스틱 회귀(Logistic Regression) 모델에서 특정 사건이 발생할 확률을 $p$라고 할 때, '사건이 발생하지 않을 확률에 대한 사건이 발생할 확률의 비'인 오즈비(Odds Ratio)를 나타내는 수식은?",
    choices: [
      "p / (1 - p)",
      "(1 - p) / p",
      "ln(p / (1 - p))",
      "1 / (1 + e^(-p))"
    ],
    answer: 0,
    explanation: "오즈(Odds)는 성공 확률을 실패 확률로 나눈 비율이므로 $p / (1 - p)$ 입니다. 여기에 자연로그(ln)를 취한 것이 로짓(Logit) 변환 $\\ln(p / (1-p))$ 이며, 이를 선형 회귀식과 연결한 것이 로지스틱 회귀입니다.",
    whyWrong: [
      "정답: 오즈(Odds) 공식 = p / (1 - p).",
      "실패 확률 대 성공 확률로 분모 분자가 바뀐 식입니다.",
      "자연로그를 취한 것은 로짓(Logit) 변환입니다.",
      "시그모이드(Sigmoid) 활성화 함수입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): Odds = p / (1-p).",
      "3번 선지: Logit = ln(Odds) = ln(p / (1-p)).",
      "4번 선지: Sigmoid = 1 / (1 + e^-z)."
    ],
    memorizationPoint: "오즈(Odds) = p / (1-p) / 로짓(Logit) = ln(p / (1-p))",
    examinerTip: "💡 확률 $p=0.8$일 때 오즈는 $0.8 / 0.2 = 4$ 입니다. 간단한 계산 문제로도 매회 출제됩니다."
  },
  {
    id: "Q8_09",
    subject: 3,
    chapter: "앙상블 머신러닝",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 랜덤 포레스트(Random Forest) 및 배깅(Bagging) 모델에서 부트스트랩(Bootstrap) 샘플링 시 한 번도 선택되지 않고 남아있는 약 36.8%의 미선택 데이터를 활용하여 별도의 검증 세트 없이 모델의 일반화 오차를 추정하는 평가 기법은?",
    choices: [
      "OOB (Out-of-Bag) 평가",
      "K-Fold 교차 검증",
      "LOOCV (Leave-One-Out Cross Validation)",
      "홀드아웃 (Hold-out) 검증"
    ],
    answer: 0,
    explanation: "부트스트랩 복원 추출 시 수학적으로 전체 데이터의 약 63.2%만 샘플에 포함되고 약 36.8%는 추출되지 않고 남는데, 이 데이터를 Out-of-Bag(OOB) 샘플이라고 부릅니다. 이를 이용해 별도의 검증 세트(Validation Set) 없이도 모델의 성능을 즉시 측정할 수 있습니다.",
    whyWrong: [
      "정답: 부트스트랩 미선택 36.8% 데이터 검증 = OOB(Out-of-Bag) 평가.",
      "K-Fold는 전체 데이터를 K개로 균등 분할하여 교차 검증하는 방식입니다.",
      "LOOCV는 1개만 검증용으로 남기고 N-1개로 학습을 N번 반복하는 방식입니다.",
      "홀드아웃은 데이터를 단순히 Train/Test로 7:3 등으로 분할하는 방식입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 배깅/랜덤포레스트의 부트스트랩 미추출(36.8%) 데이터 = OOB(Out-of-Bag) 샘플.",
      "2~4번 선지: 일반적인 데이터 분할 검증 기법입니다."
    ],
    memorizationPoint: "랜덤포레스트 미추출 36.8% ➔ OOB (Out-of-Bag) 평가 (별도 검증셋 불필요)",
    examinerTip: "💡 OOB 데이터의 비율이 약 36.8%($1/e \\approx 0.368$)라는 수치도 출제된 적이 있습니다."
  },
  {
    id: "Q8_10",
    subject: 3,
    chapter: "비지도학습 및 군집분석",
    sectionId: "s3-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 군집 분석의 결과 평가 지표인 '실루엣 계수(Silhouette Coefficient)'에 대한 설명으로 가장 적절하지 않은 것은?",
    choices: [
      "군집 내 데이터 간의 응집도(Cohesion)와 군집 간의 분리도(Separation)를 동시에 고려한다.",
      "실루엣 계수의 값은 -1에서 +1 사이의 범위를 갖는다.",
      "실루엣 계수가 +1에 가까울수록 해당 데이터는 자신이 속한 군집에 잘 결합되어 있고 다른 군집과는 명확히 분리되었음을 의미한다.",
      "실루엣 계수가 0에 가까울수록 두 군집 간의 거리가 매우 멀어서 군집화가 완벽하게 이루어졌음을 뜻한다."
    ],
    answer: 3,
    explanation: "실루엣 계수가 0에 가깝다는 것은 해당 데이터가 두 군집의 경계선(인접 지점)에 걸쳐 있어서 어느 군집에 속하는지 모호하다는 뜻입니다. 군집화가 완벽히 잘 분리되었을 때는 +1에 가까운 값을 갖습니다.",
    whyWrong: [
      "응집도 a(i)와 분리도 b(i)를 모두 계산하는 정석적인 설명입니다.",
      "실루엣 계수 범위는 [-1, 1] 입니다.",
      "1에 가까울수록 군집화가 매우 우수하다는 뜻입니다.",
      "정답: 0에 가까우면 경계면에 걸쳐 있어 분류가 모호하다는 뜻입니다."
    ],
    optionTraps: [
      "1~3번 선지: 실루엣 계수의 표준 특성 (범위 -1~+1, 1이면 최상, 음수면 잘못 군집화).",
      "4번 선지 (정답): 0은 완벽한 분리가 아니라 경계면에 위치하여 애매한 상태입니다."
    ],
    memorizationPoint: "실루엣 계수: 범위 [-1, 1] / +1 = 완벽 군집 / 0 = 경계면 모호 / 음수 = 오분류",
    examinerTip: "💡 실루엣 계수 $s(i) = (b(i) - a(i)) / \\max(a(i), b(i))$ 공식과 1에 가까울수록 좋다는 점을 반드시 기억하세요."
  },
  {
    id: "Q8_11",
    subject: 3,
    chapter: "비지도학습 및 군집분석",
    sectionId: "s3-4",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 계층적 군집분석(Hierarchical Clustering)에서 개체들이 하나씩 결합되거나 분리되는 일련의 계층 구조 과정을 나무(Tree) 모양의 다이어그램으로 시각화한 차트는?",
    choices: [
      "스크리 플롯 (Scree Plot)",
      "덴드로그램 (Dendrogram)",
      "히트맵 (Heatmap)",
      "산점도 행렬 (Scatterplot Matrix)"
    ],
    answer: 1,
    explanation: "덴드로그램(Dendrogram)은 계층적 군집분석의 병합(Agglomerative) 또는 분할(Divisive) 과정을 나무 모양의 계층 다이어그램으로 표현한 것으로, 가지를 수평으로 자르는 높이에 따라 최종 군집의 수를 결정할 수 있습니다.",
    whyWrong: [
      "스크리 플롯은 PCA 주성분 수 결정 시 고윳값 감소를 보는 꺾은선 그래프입니다.",
      "정답: 계층적 군집분석의 트리형 시각화 차트는 덴드로그램입니다.",
      "히트맵은 2차원 행렬 데이터의 값을 색상으로 시각화한 차트입니다.",
      "산점도 행렬은 여러 변수 간의 1:1 관계를 한눈에 보는 산점도 모음입니다."
    ],
    optionTraps: [
      "1번 선지: PCA 고윳값 그래프인 Scree Plot과의 혼동을 유도하는 보기입니다.",
      "2번 선지 (정답): 계층적 군집 ➔ 덴드로그램(Dendrogram)."
    ],
    memorizationPoint: "계층적 군집분석 시각화 ➔ 덴드로그램 (Dendrogram)",
    examinerTip: "💡 3과목 1초 킬러: '계층적 군집' + '나무 구조 차트' ➔ 100% 덴드로그램입니다."
  },
  {
    id: "Q8_12",
    subject: 4,
    chapter: "가설 검정 및 오류",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 통계적 가설 검정에서 '실제로는 귀무가설($H_0$)이 참임에도 불구하고, 귀무가설을 잘못 기각하여 발생하는 오류'인 제1종 오류(Type I Error, $\\alpha$)에 해당하는 혼동 행렬의 사례는?",
    choices: [
      "실제 암 환자가 아닌 사람(음성)을 암 환자(양성)로 잘못 진단한 경우 (False Positive)",
      "실제 암 환자(양성)인 사람을 정상인(음성)으로 잘못 진단하여 귀가시킨 경우 (False Negative)",
      "실제 정상인을 정상인으로 정확하게 진단한 경우 (True Negative)",
      "실제 암 환자를 암 환자로 정확하게 진단한 경우 (True Positive)"
    ],
    answer: 0,
    explanation: "제1종 오류($\\alpha$)는 '효과가 없는데(귀무가설 참) 효과가 있다고(기각)' 잘못 판정한 위양성(False Positive, FP)입니다. 즉, 정상인에게 암이라고 오진하는 경우입니다. (제2종 오류 $\\beta$는 실제 암 환자인데 정상인으로 판정하는 위음성 FN)",
    whyWrong: [
      "정답: 제1종 오류($\\alpha$) = 실제 음성인데 양성으로 잘못 판정한 위양성(FP).",
      "실제 양성을 음성으로 놓치는 것은 제2종 오류($\\beta$, FN)입니다.",
      "정확한 정상 진단은 정답(TN)입니다.",
      "정확한 암 진단은 정답(TP)입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 1종 오류 = 귀무가설 참인데 기각 = 화재 아닌데 경보 울림(FP).",
      "2번 선지: 2종 오류 = 대립가설 참인데 귀무가설 채택 = 화재 났는데 경보 안 울림(FN)."
    ],
    memorizationPoint: "제1종 오류($\\alpha$) = 위양성(FP) / 제2종 오류($\\beta$) = 위음성(FN)",
    examinerTip: "💡 의학 진단(암 진단)이나 스팸 필터에서 1종 오류(FP)와 2종 오류(FN) 중 어느 것이 더 치명적인지 묻는 문제가 단골입니다."
  },
  {
    id: "Q8_13",
    subject: 4,
    chapter: "회귀 모델 평가 지표",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 회귀 모델의 평가 지표 중 오차를 실제값으로 나누어 '백분율 오차(Percentage Error)'를 계산함으로써, 데이터의 단위나 스케일(Scale)이 서로 다른 여러 모델 간의 성능을 상대적으로 비교하기에 가장 적합한 지표는?",
    choices: [
      "MAE (Mean Absolute Error)",
      "MSE (Mean Squared Error)",
      "RMSE (Root Mean Squared Error)",
      "MAPE (Mean Absolute Percentage Error)"
    ],
    answer: 3,
    explanation: "MAPE(Mean Absolute Percentage Error)는 실제값 대비 오차의 절댓값 비율을 백분율($\\%$)로 평균한 지표로, 공식은 $\\frac{100\\%}{n} \\sum |\\frac{y - \\hat{y}}{y}|$ 입니다. 단위가 서로 다른 매출액, 가격 등을 스케일에 구애받지 않고 비교할 수 있는 장점이 있습니다.",
    whyWrong: [
      "MAE는 실제값과 동일한 단위를 가지며 백분율이 아닙니다.",
      "MSE는 오차의 제곱이므로 원래 단위의 제곱이 됩니다.",
      "RMSE는 MSE에 루트를 씌워 원래 단위로 맞춘 지표입니다.",
      "정답: 스케일 독립적 백분율 오차 지표 = MAPE."
    ],
    optionTraps: [
      "1~3번 선지: 원래 데이터의 단위(Scale)에 종속되는 절대 오차 지표들입니다.",
      "4번 선지 (정답): P(Percentage)가 들어간 MAPE가 백분율 상대 오차 지표입니다."
    ],
    memorizationPoint: "스케일 무관 백분율 오차 지표 ➔ MAPE (Mean Absolute Percentage Error)",
    examinerTip: "💡 회귀 5대 지표: MAE(직관적), MSE(이상치 민감/제곱), RMSE(원래단위), MAPE(백분율/스케일무관), RMSLE(상대오차/과소예측페널티)."
  },
  {
    id: "Q8_14",
    subject: 3,
    chapter: "딥러닝 및 정규화",
    sectionId: "s3-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 심층 신경망(Deep Neural Networks)의 학습 과정에서 특정 뉴런들끼리 과도하게 동조화(Co-adaptation)되어 과대적합되는 것을 방지하기 위해, 매 훈련 스텝마다 무작위로 일부 뉴런을 확률적($p$)으로 연결 해제(비활성화)하는 기법은?",
    choices: [
      "드롭아웃 (Dropout)",
      "배치 정규화 (Batch Normalization)",
      "조기 종료 (Early Stopping)",
      "가중치 감쇠 (Weight Decay)"
    ],
    answer: 0,
    explanation: "드롭아웃(Dropout)은 학습 시 은닉층의 뉴런을 무작위로 일정 비율($p$, 보통 0.2~0.5)만큼 끄고 학습시키는 대표적인 정규화 기법으로, 여러 개의 서로 다른 부분 신경망을 앙상블 학습시키는 것과 유사한 효과를 내어 과대적합을 크게 줄여줍니다.",
    whyWrong: [
      "정답: 뉴런 무작위 연결 해제 과적합 방지 = 드롭아웃(Dropout).",
      "배치 정규화는 미니배치별로 평균과 분산을 정규화하여 학습 속도를 높이는 기법입니다.",
      "조기 종료는 검증 오차가 다시 증가할 때 학습을 멈추는 기법입니다.",
      "가중치 감쇠는 L2 규제를 통해 가중치 크기를 줄이는 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 뉴런 무작위 비활성화 = Dropout.",
      "2번 선지: 미니배치 평균/분산 정규화 = Batch Normalization."
    ],
    memorizationPoint: "뉴런 무작위 끄기 ➔ 드롭아웃 (Dropout) / 미니배치 정규화 ➔ 배치 정규화 (BN)",
    examinerTip: "💡 드롭아웃은 '훈련(Train) 시에만 적용'되고 '테스트/추론(Inference) 시에는 모든 뉴런을 활성화(출력값 스케일 조정)'한다는 점이 단골 출제 함정입니다."
  },
  {
    id: "Q8_15",
    subject: 3,
    chapter: "자연어 처리 및 텍스트 마이닝",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 단어의 분산 표현(Word Embedding)을 학습하는 Word2Vec의 두 가지 아키텍처 중, '중심 단어(Target Word) 하나를 입력으로 주었을 때 주변에 등장할 문맥 단어(Context Words)들을 예측하는 방식'은?",
    choices: [
      "CBOW (Continuous Bag of Words)",
      "Skip-Gram",
      "GloVe",
      "FastText"
    ],
    answer: 1,
    explanation: "Word2Vec에서 주변 문맥 단어들로 중심 단어를 맞히는 것은 **CBOW(Continuous Bag of Words)**이고, 반대로 중심 단어 하나로부터 주변 문맥 단어들을 예측하는 것은 **Skip-Gram**입니다. 일반적으로 희귀한 단어나 대규모 데이터셋에서는 Skip-Gram의 성능이 더 우수합니다.",
    whyWrong: [
      "CBOW는 주변 단어들을 모아서 중심 단어 하나를 예측하는 방식입니다.",
      "정답: 중심 단어로 주변 단어들을 예측하는 방식 = Skip-Gram.",
      "GloVe는 카운트 기반과 예측 기반을 결합한 글로벌 단어 동시등장 임베딩입니다.",
      "FastText는 서브워드(Subword, n-gram) 단위로 단어를 쪼개어 학습하는 기법입니다."
    ],
    optionTraps: [
      "1번 선지: 주변 단어 ➔ 중심 단어 = CBOW.",
      "2번 선지 (정답): 중심 단어 ➔ 주변 단어 = Skip-Gram."
    ],
    memorizationPoint: "CBOW = 주변 ➔ 중심 / Skip-Gram = 중심 ➔ 주변 (스킵해서 퍼뜨림)",
    examinerTip: "💡 '중심 1개로 주변 여러 개를 스킵(Skip)해서 맞힌다 ➔ Skip-Gram'으로 외우세요."
  },
  {
    id: "Q8_16",
    subject: 3,
    chapter: "딥러닝 및 합성곱 신경망",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 이미지 처리에 사용되는 합성곱 신경망(CNN)에서 합성곱(Convolution) 계층 뒤에 위치하는 '풀링(Pooling / Max Pooling) 계층'의 주된 역할과 특징으로 가장 거리가 먼 것은?",
    choices: [
      "특성 맵(Feature Map)의 가로·세로 공간 크기를 줄여 연산량을 감소시킨다.",
      "학습해야 할 가중치 파라미터(Weight Parameter)의 수가 매우 많아 역전파 학습 시간이 오래 걸린다.",
      "이미지의 미세한 위치 이동이나 왜곡에 강인한 이동 불변성(Translation Invariance)을 제공한다.",
      "주요 특징(최댓값 등)만을 추출하여 모델의 과대적합을 억제한다."
    ],
    answer: 1,
    explanation: "풀링(Pooling, Max/Average Pooling) 계층은 단순히 주어진 윈도우 내에서 최댓값이나 평균값을 뽑아내는 연산일 뿐, **학습해야 할 가중치 파라미터(Weight)가 전혀 없습니다.** 따라서 파라미터 수가 많다는 설명은 완전한 오답입니다.",
    whyWrong: [
      "공간 다운샘플링을 통해 연산량을 줄이는 것은 풀링의 핵심 기능입니다.",
      "정답: 풀링 계층에는 학습 파라미터(Weight)가 0개(전혀 없음)입니다.",
      "이동 불변성(Translation Invariance) 확보는 풀링의 대표 장점입니다.",
      "다운샘플링으로 인한 과적합 방지 효과가 있습니다."
    ],
    optionTraps: [
      "1, 3, 4번 선지: 풀링의 3대 역할 (공간 크기 축소, 연산량 감소, 이동 불변성).",
      "2번 선지 (정답): 풀링(Pooling) 계층은 학습 파라미터가 '0'입니다!"
    ],
    memorizationPoint: "풀링(Pooling) ➔ 학습 파라미터 없음(0개) / 크기 축소 / 이동 불변성",
    examinerTip: "💡 'CNN 풀링 계층은 가중치 학습이 없다'는 점은 기출에서 가장 좋아하는 킬러 함정 보기입니다."
  },
  {
    id: "Q8_17",
    subject: 3,
    chapter: "최신 딥러닝 아키텍처 (Transformer)",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 자연어 처리의 트랜스포머(Transformer) 모델에서 RNN의 순차적 처리 한계를 극복하고 문장 내 모든 단어 쌍 간의 상호 유사도를 동시에 병렬 계산하는 핵심 메커니즘은?",
    choices: [
      "합성곱 연산 (Convolution Operation)",
      "셀프 어텐션 (Self-Attention / Scaled Dot-Product Attention)",
      "재귀적 게이트 (Recurrent Gate)",
      "오토인코더 (Autoencoder)"
    ],
    answer: 1,
    explanation: "트랜스포머(Transformer)는 RNN을 완전히 배제하고 오직 **Self-Attention(셀프 어텐션)** 메커니즘만으로 Query, Key, Value 간의 내적을 계산하여 문장 내 모든 단어 간의 상호 의존성을 병렬로 단번에 파악하는 딥러닝 아키텍처입니다.",
    whyWrong: [
      "합성곱은 CNN의 연산입니다.",
      "정답: Transformer의 핵심 병렬 연산 메커니즘 = Self-Attention.",
      "재귀적 게이트는 LSTM, GRU의 순차 구조입니다.",
      "오토인코더는 차원 축소/복원 비지도 신경망입니다."
    ],
    optionTraps: [
      "1, 3번 선지: 기존 CNN, RNN 구조입니다.",
      "2번 선지 (정답): Attention Is All You Need ➔ Self-Attention!"
    ],
    memorizationPoint: "트랜스포머(Transformer) 핵심 ➔ Self-Attention (Query, Key, Value)"
  },
  {
    id: "Q8_18",
    subject: 4,
    chapter: "설명 가능한 AI (XAI)",
    sectionId: "s4-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 설명 가능한 AI(XAI) 기법 중 LIME(Local Interpretable Model-agnostic Explanations)의 핵심 작동 원리로 가장 올바른 것은?",
    choices: [
      "모델 전체의 글로벌(전역적) 의사결정 규칙을 단일 수식으로 요약한다.",
      "해석하고자 하는 특정 데이터 주변에 무작위 섭동(Perturbation)을 주어 가상의 데이터들을 생성한 후, 국소적인 선형 대리 모델을 적합하여 해석한다.",
      "모든 가능한 특성 부분집합 조합에 대해 섀플리 값을 전수 계산한다.",
      "인공신경망의 가중치 행렬을 역전치하여 원본 입력 크기로 복원한다."
    ],
    answer: 1,
    explanation: "LIME은 모델-비의존적(Model-agnostic) 기법으로, 복잡한 블랙박스 모델 전체는 비선형이라도 '특정 데이터 주변의 매우 좁은 국소 영역(Local)'은 선형(Linear)으로 근사할 수 있다는 점에 착안하여 주변 섭동 샘플을 생성하고 해석 가능한 국소 선형 모델(대리 모델)을 학습시켜 해석합니다.",
    whyWrong: [
      "LIME은 글로벌이 아닌 국소적(Local) 해석 기법입니다.",
      "정답: 섭동 데이터 생성 ➔ 국소적 선형 대리 모델 근사 = LIME.",
      "섀플리 값 전수 계산은 SHAP의 원리입니다.",
      "가중치 역전치는 Deconvolution의 원리입니다."
    ],
    optionTraps: [
      "1번 선지: LIME의 'L'은 Local(국소적)의 약자입니다.",
      "2번 선지 (정답): 섭동(Perturbation) + 국소 선형 근사(Local Surrogate) ➔ LIME."
    ],
    memorizationPoint: "LIME ➔ Local(국소적) / 섭동(Perturbation) / 선형 대리 모델 근사"
  },
  {
    id: "Q8_19",
    subject: 4,
    chapter: "분류 모델 평가 지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 분류 모델의 성능을 평가할 때, '단순히 우연에 의해 두 분류 결과가 일치했을 확률($P_e$)'을 배제하고 두 관찰자 또는 모델의 실제 일치도를 측정하는 지표는?",
    choices: [
      "코헨의 카파 계수 (Cohen's Kappa)",
      "지니 계수 (Gini Index)",
      "실루엣 계수 (Silhouette Coefficient)",
      "로그 손실 (Log Loss)"
    ],
    answer: 0,
    explanation: "코헨의 카파 계수(Cohen's Kappa)는 $\\kappa = \\frac{P_o - P_e}{1 - P_e}$ (여기서 $P_o$는 실제 일치도, $P_e$는 우연에 의한 일치도)로 계산되며, 우연에 의한 우연성을 배제하고 순수한 모델의 분류 일치도를 평가할 때 사용합니다.",
    whyWrong: [
      "정답: 우연에 의한 일치 배제 = 카파 계수(Kappa).",
      "지니 계수는 불순도 또는 소득 불평등 지표입니다.",
      "실루엣 계수는 군집 분석의 응집도/분리도 평가 지표입니다.",
      "로그 손실은 확률 예측 분류 모델의 교차 엔트로피 손실입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 우연 일치 배제 ➔ 카파 계수 (Kappa)."
    ],
    memorizationPoint: "우연에 의한 일치 확률 배제 ➔ 카파 계수 (Kappa Statistic)"
  },
  {
    id: "Q8_20",
    subject: 2,
    chapter: "통계적 가설 검정",
    sectionId: "s2-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 분할표(Contingency Table)를 이용하여 '성별(남/여)'과 '구매 선호도(A/B/C 상품)'와 같이 두 범주형 변수 간에 서로 관련성이 있는지(독립인지)를 검정할 때 사용하는 통계 검정법은?",
    choices: [
      "t-검정 (t-Test)",
      "카이제곱 독립성 검정 (Chi-Square Independence Test)",
      "분산분석 (ANOVA)",
      "피어슨 상관분석"
    ],
    answer: 1,
    explanation: "두 범주형 변수(명목/서열 척도) 간의 독립성이나 연관성을 검정할 때는 관측 도수와 기대 도수의 차이를 이용하는 **카이제곱 독립성 검정($\\chi^2$ Test)**을 사용합니다. (t-test와 ANOVA는 수치형 연속 변수의 평균 비교용)",
    whyWrong: [
      "t-검정은 수치형 연속 변수의 2집단 평균 비교 검정입니다.",
      "정답: 두 범주형 변수 간 연관/독립 검정 = 카이제곱 독립성 검정.",
      "분산분석(ANOVA)은 수치형 연속 변수의 3집단 이상 평균 비교 검정입니다.",
      "피어슨 상관분석은 두 수치형 연속 변수 간의 선형 관계 검정입니다."
    ],
    optionTraps: [
      "1, 3, 4번 선지: 모두 종속변수가 연속형(수치형)일 때 사용하는 검정입니다.",
      "2번 선지 (정답): 범주형 변수 vs 범주형 변수 ➔ 카이제곱 검정!"
    ],
    memorizationPoint: "범주형 vs 범주형 검정 ➔ 카이제곱 검정 ($\\chi^2$ Test)"
  },
  {
    id: "Q8_21",
    subject: 2,
    chapter: "불균형 데이터 처리",
    sectionId: "s2-1",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 불균형 데이터 처리 기법 중 서로 다른 클래스에 속하면서 가장 가까운 거리의 이웃 쌍을 찾아, 클래스 간 경계선에 위치한 다수 클래스 데이터를 제거하여 결정 경계를 명확하게 정제하는 언더샘플링 기법은?",
    choices: [
      "SMOTE",
      "토멕 링크 (Tomek Links)",
      "Borderline-SMOTE",
      "ADASYN"
    ],
    answer: 1,
    explanation: "토멕 링크(Tomek Links)는 서로 다른 두 클래스 데이터 $x_i$와 $x_j$가 서로의 최근접 이웃일 때 이를 토멕 링크 쌍으로 정의하고, 경계선에 모호하게 걸쳐 있는 다수 클래스 데이터를 제거하여 두 클래스 간의 마진(경계)을 넓히는 대표적인 언더샘플링(정제) 기법입니다.",
    whyWrong: [
      "SMOTE는 소수 클래스를 합성 생성하는 오버샘플링 기법입니다.",
      "정답: 경계면 이웃 쌍 탐색 후 다수 클래스 제거 = 토멕 링크(Tomek Links).",
      "Borderline-SMOTE는 경계면 소수 데이터만 오버샘플링하는 기법입니다.",
      "ADASYN은 학습이 어려운 소수 데이터에 가중치를 두어 합성하는 오버샘플링 기법입니다."
    ],
    optionTraps: [
      "1, 3, 4번 선지: 모두 오버샘플링(Oversampling) 기법들입니다.",
      "2번 선지 (정답): 경계면 다수 데이터를 지우는 언더샘플링 = Tomek Links."
    ],
    memorizationPoint: "토멕 링크(Tomek Links) ➔ 경계면 이웃 쌍 탐색 ➔ 다수 클래스 제거 (언더샘플링)"
  },
  {
    id: "Q8_22",
    subject: 1,
    chapter: "데이터 거버넌스 및 메타데이터",
    sectionId: "s1-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 데이터 거버넌스에서 '데이터에 대한 데이터(Data about Data)'로서, 데이터의 위치, 스키마 구조, 생성 일시, 데이터 타입, 소유자 등을 설명하여 데이터의 검색과 관리를 용이하게 해주는 정보는?",
    choices: [
      "빅데이터 (Big Data)",
      "메타데이터 (Metadata)",
      "마스터 데이터 (Master Data)",
      "트랜잭션 데이터 (Transaction Data)"
    ],
    answer: 1,
    explanation: "메타데이터(Metadata)는 '데이터에 관한 데이터'로 정의되며, 대규모 데이터셋의 효율적인 검색, 공유, 데이터 계보(Lineage) 추적, 데이터 사전(Data Dictionary) 구축의 핵심 요소입니다.",
    whyWrong: [
      "빅데이터는 대용량, 고속, 다양성을 갖는 데이터 그 자체입니다.",
      "정답: 데이터에 대한 설명 데이터 = 메타데이터(Metadata).",
      "마스터 데이터는 고객, 상품, 거래처 등 비즈니스 핵심 기준 데이터입니다.",
      "트랜잭션 데이터는 주문, 결제 등 일상적인 거래 발생 데이터입니다."
    ],
    optionTraps: [
      "2번 선지 (정답): Data about Data = 메타데이터."
    ],
    memorizationPoint: "데이터에 대한 데이터 / 데이터 설명서 ➔ 메타데이터 (Metadata)"
  },
  {
    id: "Q8_23",
    subject: 2,
    chapter: "데이터 탐색 및 거리 척도",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 다변량 통계 및 군집 분석에서 변수들 간의 상관관계(공분산)와 분산의 차이를 보정하여, 통계적으로 표준화된 거리를 계산하는 거리 척도는?",
    choices: [
      "유클리드 거리 (Euclidean Distance)",
      "맨해튼 거리 (Manhattan Distance)",
      "마할라노비스 거리 (Mahalanobis Distance)",
      "체비쇼프 거리 (Chebyshev Distance)"
    ],
    answer: 2,
    explanation: "마할라노비스 거리(Mahalanobis Distance)는 공분산 행렬($\\Sigma^{-1}$)을 고려하여 변수 간 상관관계와 각 변수의 분산 스케일 차이를 완벽히 보정해 주는 통계적 거리 척도로, 타원형 데이터 분포의 이상치 탐지나 군집화에 매우 유용합니다.",
    whyWrong: [
      "유클리드 거리는 상관관계를 고려하지 않는 두 점 사이의 최단 직선거리입니다.",
      "맨해튼 거리는 격자 형태의 축을 따라 이동하는 직각 거리($L_1$)입니다.",
      "정답: 공분산 및 상관관계를 반영한 통계적 거리 = 마할라노비스 거리.",
      "체비쇼프 거리는 좌표 차이의 최댓값을 취하는 거리입니다."
    ],
    optionTraps: [
      "1, 2번 선지: 변수 간 상관관계를 전혀 고려하지 못합니다.",
      "3번 선지 (정답): 공분산(Covariance) 반영 ➔ 마할라노비스!"
    ],
    memorizationPoint: "변수 간 상관관계 & 공분산 반영 거리 ➔ 마할라노비스 거리"
  },
  {
    id: "Q8_24",
    subject: 2,
    chapter: "차원 축소 및 다차원 척도법",
    sectionId: "s2-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 여러 개체들 간의 유사성(Similarity) 또는 비유사성(거리) 측정값을 바탕으로, 개체들 사이의 상대적 거리 관계를 최대한 보존하면서 2차원 또는 3차원 공간상의 점(지각도)으로 시각화하여 위치시키는 기법은?",
    choices: [
      "다차원 척도법 (MDS : Multidimensional Scaling)",
      "의사결정나무 (Decision Tree)",
      "정준 상관분석 (Canonical Correlation Analysis)",
      "요인 분석 (Factor Analysis)"
    ],
    answer: 0,
    explanation: "다차원 척도법(MDS)은 다차원 데이터 개체들 간의 거리/비유사성을 2차원 또는 3차원 유클리드 공간의 지각도(Perceptual Map) 상에 시각적으로 배치하여 데이터의 잠재적 구조를 파악하는 차원 축소 및 시각화 기법입니다. (적합도 평가지표로 Stress 값을 사용)",
    whyWrong: [
      "정답: 개체 간 비유사성을 2차원 지각도로 시각화 = 다차원 척도법(MDS).",
      "의사결정나무는 규칙 기반 분류/회귀 지도학습 모델입니다.",
      "정준 상관분석은 두 변수 집단 간의 상관관계를 분석하는 기법입니다.",
      "요인 분석은 잠재 요인을 추출하여 변수를 축약하는 기법입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 개체 간 거리 관계 시각화 / 지각도 / Stress ➔ 다차원 척도법(MDS)."
    ],
    memorizationPoint: "개체 간 비유사성 ➔ 2차원 지각도 시각화 ➔ 다차원 척도법 (MDS, Stress 평가)"
  },
  {
    id: "Q8_25",
    subject: 1,
    chapter: "데이터 거버넌스 및 기획",
    sectionId: "s1-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "8",
    exam: "8회 기출 복원",
    question: "[8회 기출 복원] 빅데이터 분석 프로젝트 기획 시 '분석 과제의 우선순위 평가 기준'에서 비즈니스 효과(Value)와 실행 용이성(Volume/Complexity) 관점으로 평가할 때, 가장 먼저 최우선적으로 추진해야 할 사분면 영역은?",
    choices: [
      "시급성: 높음, 난이도: 쉬움 (1순위 영역)",
      "시급성: 낮음, 난이도: 쉬움 (2순위 영역)",
      "시급성: 높음, 난이도: 어려움 (3순위 영역)",
      "시급성: 낮음, 난이도: 어려움 (4순위 영역)"
    ],
    answer: 0,
    explanation: "분석 과제 우선순위 평가 매트릭스에서 비즈니스 효과/시급성이 높고(High Value/Urgency), 기술적 난이도가 쉬운(Low Difficulty/Quick Win) 과제가 가장 먼저 추진해야 하는 **1순위(최우선 추진) 과제**입니다.",
    whyWrong: [
      "정답: 시급성 높음 + 난이도 쉬움(Quick Win) = 1순위 최우선 추진.",
      "시급성 낮고 난이도 쉬운 과제는 2순위입니다.",
      "시급성 높으나 난이도가 어려운 과제는 3순위입니다.",
      "시급성 낮고 난이도 어려운 과제는 4순위(보류)입니다."
    ],
    optionTraps: [
      "1번 선지 (정답): 시급성 높고 난이도 쉬움 ➔ 1순위 (가장 빠르고 가치 높음)."
    ],
    memorizationPoint: "과제 우선순위 1순위 ➔ 시급성 높음 + 난이도 쉬움 (Quick-Win)"
  }
];

console.log(`Processing total new questions to add: ${newQuestions.length}...`);

const existingIds = new Set(rawBank.questions.map(q => q.id));
let addedCount = 0;

for (const nq of newQuestions) {
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

console.log(`Successfully merged ${addedCount} questions. Total questions now in CBT Bank: ${rawBank.questions.length}`);
