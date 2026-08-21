const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'cbt_bank.json');
const rawData = fs.readFileSync(bankPath, 'utf8');
const bank = JSON.parse(rawData);

const killerQuestions = [
  // =========================================================================
  // [2과목: 빅데이터 탐색] 가설 검정, 비모수 검정, 데이터 전처리 (Q_KILLER_201 ~ 216)
  // =========================================================================
  {
    id: "Q_KILLER_201",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 신약 투약 전과 투약 후의 혈압 변화를 알아보기 위해 환자 25명을 대상으로 사전-사후 혈압을 측정하였다. 차이값(D = 사전 - 사후)의 표본평균이 6, 표본표준편차가 10으로 계산되었을 때, 대응표본 t-검정(Paired t-test)의 검정통계량 t값과 자유도(df)로 올바른 것은?",
    choices: [
      "t = 3.0, 자유도 df = 24",
      "t = 3.0, 자유도 df = 48",
      "t = 1.5, 자유도 df = 24",
      "t = 0.6, 자유도 df = 25"
    ],
    answer: 0,
    explanation: "1) **대응표본 t-검정통계량 공식:**\n   t = D̄ / (s_D / √n)\n   여기서 D̄ = 6, s_D = 10, n = 25 (환자 수)\n   표준오차 SE = 10 / √25 = 10 / 5 = 2.0\n   따라서 검정통계량 t = 6 / 2.0 = **3.0**\n2) **자유도 (df):** 대응표본 t-검정은 동일 대상의 쌍(Pair)이므로 자유도는 n - 1 = 25 - 1 = **24**입니다.\n\n💡 실제 기출 포인트: 12회 시험에서 대응표본 t-검정 계산과 자유도(n-1)를 묻는 문제가 핵심 킬러로 출제되었습니다. 독립 2표본의 자유도(n1+n2-2)와 절대 헷갈리지 마세요!",
    whyWrong: [
      "정답입니다. t = 6 / (10/√25) = 3.0 이며 자유도는 n - 1 = 24입니다.",
      "자유도 48은 서로 다른 두 독립 집단(25+25-2)일 때의 자유도이므로 오답입니다.",
      "검정통계량 t 계산이 잘못되었습니다 (10/5=2, 6/2=3).",
      "표본 수 자체(25)는 자유도가 아닙니다."
    ],
    memorizationPoint: "대응표본 t-검정: t = D̄ / (s_D / √n), 자유도 df = n - 1 (쌍의 개수 - 1)",
    examinerTip: "💡 출제위원 함정: '사전-사후(동일 표본)'라는 단어가 나오면 무조건 대응표본(Paired)이며 자유도는 2n-2가 아니라 'n-1'입니다."
  },
  {
    id: "Q_KILLER_202",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 통계적 가설 검정에서 모수 검정(Parametric Test)과 비모수 검정(Non-parametric Test)의 매칭으로 가장 옳지 않은 것은?",
    choices: [
      "모수 검정의 '독립 2표본 t-검정' ➔ 비모수 검정의 '맨-휘트니 U 검정 (Mann-Whitney U Test)'",
      "모수 검정의 '대응표본 t-검정' ➔ 비모수 검정의 '윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank Test)'",
      "모수 검정의 '일원배치 분산분석(One-way ANOVA)' ➔ 비모수 검정의 '크루스칼-왈리스 검정 (Kruskal-Wallis Test)'",
      "모수 검정의 '정규성 검정(Shapiro-Wilk)' ➔ 비모수 검정의 '피어슨 적률상관계수(Pearson Correlation)'"
    ],
    answer: 3,
    explanation: "1) **모수-비모수 검정 대응 관계:**\n   - 독립 2표본 t-검정 ➔ **맨-휘트니 U 검정** (윌콕슨 순위합 검정)\n   - 대응표본 t-검정 ➔ **윌콕슨 부호순위 검정**\n   - 일원배치 분산분석(ANOVA) ➔ **크루스칼-왈리스 검정**\n   - 반복측정 분산분석 ➔ **프리드만 검정(Friedman Test)**\n   - 피어슨 상관계수(모수) ➔ **스피어만 / 켄달 순위상관계수(비모수)**\n2) 샤피로-윌크(Shapiro-Wilk)는 데이터가 정규분포를 따르는지 검정하는 기법이며, 피어슨 상관계수는 두 연속형 변수의 선형 상관관계를 측정하는 모수적 기법입니다.\n\n💡 실제 기출 포인트: 12회 시험에서 비모수 검정 기법(맨-휘트니, 윌콕슨 부호순위, 크루스칼-왈리스)의 적용 대상을 묻는 문제가 집중 출제되었습니다.",
    whyWrong: [
      "올바른 매칭입니다. 독립된 두 집단은 맨-휘트니 U검정으로 대체합니다.",
      "올바른 매칭입니다. 동일 집단 전후 차이는 윌콕슨 부호순위검정으로 대체합니다.",
      "올바른 매칭입니다. 3개 이상 집단 분산분석은 크루스칼-왈리스 검정으로 대체합니다.",
      "정답입니다. 샤피로-윌크는 정규성 검정이며, 피어슨 상관계수에 대응하는 비모수 기법은 스피어만 순위상관계수입니다."
    ],
    memorizationPoint: "비모수 3대장: 독립 2표본 = 맨-휘트니, 대응표본 = 윌콕슨 부호순위, 3집단 이상 = 크루스칼-왈리스",
    examinerTip: "💡 출제위원 꿀팁: 데이터가 정규분포를 따르지 않을 때(p < 0.05) 어떤 비모수 통계 검정을 써야 하는지 묻는 짝짓기 문제가 단골입니다."
  },
  {
    id: "Q_KILLER_203",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출 빈출] 3개의 연령대(20대, 30대, 40대)와 4개의 선호 음료(커피, 차, 탄산, 주스) 간의 연관성을 검정하기 위해 카이제곱 독립성 검정(Chi-Square Test of Independence)을 수행하고자 한다. 이 분할표(Contingency Table)의 검정통계량 자유도(df)는 얼마인가?",
    choices: [
      "df = 6",
      "df = 11",
      "df = 12",
      "df = 5"
    ],
    answer: 0,
    explanation: "카이제곱 독립성 검정 및 동질성 검정의 분할표 자유도 계산 공식:\n**df = (r - 1) × (c - 1)**\n- r (행의 수, 연령대) = 3\n- c (열의 수, 음료 종류) = 4\n- 따라서 자유도 df = (3 - 1) × (4 - 1) = 2 × 3 = **6**\n\n💡 실제 기출 포인트: r×c 분할표가 주어졌을 때 자유도 (r-1)(c-1)을 계산하는 문제는 10초 컷 100% 득점 문제입니다.",
    whyWrong: [
      "정답입니다. df = (3 - 1) * (4 - 1) = 2 * 3 = 6.",
      "11은 전체 칸 수(12)에서 1을 뺀 값으로 적합도 검정 공식과 혼동한 것입니다.",
      "12는 전체 셀(3×4)의 개수입니다.",
      "(3+4)-2=5 로 잘못 계산한 값입니다."
    ],
    memorizationPoint: "카이제곱 독립성/동질성 검정 자유도 df = (행 수 - 1) × (열 수 - 1)",
    examinerTip: "💡 출제위원 함정: 적합도 검정(Goodness-of-Fit)의 자유도는 범주수 k - 1 이고, 2차원 교차 분할표(독립성/동질성)의 자유도는 (r-1)(c-1)입니다."
  },
  {
    id: "Q_KILLER_204",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 다음 2×2 분할표에서 A약 복용 그룹의 완치자 셀(㉠)에 대한 카이제곱 독립성 검정의 '기대도수(Expected Frequency)'는 얼마인가?\n\n| 구분 | 완치 | 미완치 | 합계 |\n|---|---|---|---|\n| A약 복용 | 40 (㉠) | 10 | 50 |\n| 위약 복용 | 20 | 30 | 50 |\n| 합계 | 60 | 40 | 100 |",
    choices: [
      "30",
      "40",
      "50",
      "25"
    ],
    answer: 0,
    explanation: "1) **기대도수(E_ij) 계산 공식:**\n   E_ij = (i번째 행 합계 × j번째 열 합계) / 전체 표본수 N\n2) **㉠ 셀(A약 복용 & 완치):**\n   - 해당 행 합계(A약 복용 합계) = 50\n   - 해당 열 합계(완치 합계) = 60\n   - 전체 표본수 N = 100\n   - 따라서 기대도수 E = (50 × 60) / 100 = 3000 / 100 = **30**\n\n(참고: 관측도수 O는 40이고, 귀무가설 하의 기대도수 E는 30이므로, (O-E)^2/E = (40-30)^2/30 = 100/30 = 3.33)",
    whyWrong: [
      "정답입니다. E = (50 * 60) / 100 = 30.",
      "40은 관측도수(O)입니다.",
      "50은 A약 복용자의 총합입니다.",
      "25는 100/4로 단순 균등 분할한 잘못된 값입니다."
    ],
    memorizationPoint: "카이제곱 기대도수 E_ij = (해당 행 합계 × 해당 열 합계) / 전체 합계 N",
    examinerTip: "💡 출제위원 꿀팁: 기대도수 계산 문제는 12회 필기 및 실기 제3유형에서 직접 계산하라는 형식으로 단골 출제됩니다."
  },
  {
    id: "Q_KILLER_205",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 필수] 가설검정의 의사결정과 오류(Error)에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "제1종 오류(Type I Error)는 실제 귀무가설(H₀)이 참인데도 이를 잘못 기각하는 오류이다.",
      "제2종 오류(Type II Error)는 실제 대립가설(H₁)이 참인데도(H₀가 거짓) 귀무가설을 채택하는 오류이다.",
      "유의수준(α)은 연구자가 허용할 수 있는 제1종 오류의 최대 확률을 의미한다.",
      "표본 크기(n)가 고정되어 있을 때 유의수준(α)을 낮추면 제2종 오류(β)의 발생 확률도 함께 감소한다."
    ],
    answer: 3,
    explanation: "1) **1종 오류(α)와 2종 오류(β)의 관계:**\n   표본의 크기(n)가 고정되어 있을 때, 1종 오류(α)와 2종 오류(β)는 **상충 관계(Trade-off)**에 있습니다. 즉, α를 줄이면(기준을 엄격히 하면) 귀무가설을 기각하기 어려워져 거짓인 H₀를 채택할 위험인 **β는 반대로 증가**합니다.\n2) 두 오류(α와 β)를 동시에 줄이는 유일한 방법은 **'표본 크기(n)를 늘리는 것'**입니다.\n3) **검정력(Power of Test):** 1 - β 로 정의되며, 거짓인 귀무가설을 올바르게 기각할 확률을 의미합니다.",
    whyWrong: [
      "올바른 설명입니다. α = P(H₀ 기각 | H₀ 참).",
      "올바른 설명입니다. β = P(H₀ 채택 | H₀ 거짓).",
      "올바른 설명입니다. 통상 유의수준 α = 0.05 (5%)를 기준으로 설정합니다.",
      "정답입니다. 표본 크기가 일정할 때 α와 β는 역의 관계(Trade-off)이므로 α를 낮추면 β는 증가합니다."
    ],
    memorizationPoint: "1종 오류(α)와 2종 오류(β)는 시소(Trade-off) 관계! 둘 다 줄이려면 표본 수(n)를 늘려야 함",
    examinerTip: "💡 출제위원 함정: '유의수준을 0.05에서 0.01로 엄격하게 낮추면 검정력(1-β)이 증가한다'는 지문은 오답입니다 (α 감소 -> β 증가 -> 검정력 1-β 감소)."
  },
  {
    id: "Q_KILLER_206",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[실전 기출] 유의수준 α = 0.05에서 가설검정을 수행한 결과, 검정통계량에 대한 유의확률(p-value)이 0.012로 도출되었다. 이에 대한 통계적 해석으로 옳은 것은?",
    choices: [
      "p-value가 유의수준(0.05)보다 작으므로 귀무가설(H₀)을 기각하고 대립가설(H₁)을 채택한다.",
      "p-value가 유의수준(0.05)보다 작으므로 귀무가설(H₀)을 채택하고 대립가설을 기각한다.",
      "p-value가 0.05보다 작으므로 제1종 오류가 발생하지 않았음을 100% 확신할 수 있다.",
      "p-value가 0.012이므로 연구 가설(대립가설)은 통계적으로 유의미하지 않다."
    ],
    answer: 0,
    explanation: "**p-value 기반 가설검정 의사결정 규칙:**\n- **p-value < α (0.012 < 0.05):** 귀무가설이 참일 때 관측된 데이터 같은 극단적인 결과가 나올 확률이 1.2%에 불과하므로, **귀무가설(H₀)을 기각**하고 **대립가설(H₁)을 채택**합니다 (통계적으로 유의한 차이가 있음).\n- 암기 팁: *'p-value가 α보다 작으면 귀무가설 쫓겨난다(기각)'*",
    whyWrong: [
      "정답입니다. p < α 이면 H₀를 기각하고 대립가설(차이가 있다)을 채택합니다.",
      "p < α 일 때는 H₀를 채택하는 것이 아니라 기각합니다.",
      "통계적 추론에서 1종 오류 확률이 0이 되는 것은 불가능합니다.",
      "p < 0.05이므로 연구 가설(대립가설)은 통계적으로 매우 유의미합니다."
    ],
    memorizationPoint: "p-value < α ➔ 귀무가설(H₀) 기각! 대립가설(H₁) 채택 (통계적으로 유의미)",
    examinerTip: "💡 출제위원 꿀팁: 실기 제3유형 코드 실행 후 나오는 `pvalue=0.012`를 보고 '기각인지 채택인지' 판정하는 기본 중의 기본 문제입니다."
  },
  {
    id: "Q_KILLER_207",
    subject: 2,
    chapter: "데이터 결측값 및 이상값 처리",
    sectionId: "s2-2",
    cardId: "c2-8",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[합격기준 킬러] 데이터 결측 메커니즘(Missing Mechanism) 3가지에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "완전 무작위 결측 (MCAR): 데이터의 결측 여부가 관측된 변수나 결측된 변수 자체와 아무런 상관이 없는 상태이다.",
      "무작위 결측 (MAR): 결측 여부가 결측된 그 변수 자체의 값과는 무관하지만, 다른 관측된 변수와는 통계적 관련이 있는 상태이다.",
      "비무작위 결측 (MNAR): 결측된 변수의 실제 참값의 크기나 상태 때문에 결측이 발생하는 경우이다.",
      "비무작위 결측 (MNAR) 데이터는 표본 크기가 충분히 크다면 단순 삭제(Listwise Deletion)를 적용해도 모수의 추정치에 어떠한 편향(Bias)도 발생하지 않는다."
    ],
    answer: 3,
    explanation: "1) **MNAR(비무작위 결측):** 고소득자나 극빈층이 소득 질문에 응답을 기피하는 것처럼, **결측값 자체의 성질 때문에 결측이 발생**한 경우입니다.\n2) MNAR 데이터를 단순 삭제(Listwise Deletion)하면 특정 집단(예: 고소득자)이 표본에서 통째로 누락되므로 **심각한 표본 선택 편향(Sample Selection Bias)**이 발생하여 모집단 추정치가 심각하게 왜곡됩니다.\n3) 단순 삭제가 편향을 유발하지 않는 유일한 조건은 **MCAR(완전 무작위 결측)**일 때뿐입니다.",
    whyWrong: [
      "올바른 설명입니다. MCAR은 결측 원인이 순수 무작위(우연)입니다.",
      "올바른 설명입니다. MAR은 다른 관측 변수(예: 성별, 나이)에 조건부로 결측이 발생합니다.",
      "올바른 설명입니다. MNAR은 결측값 자체와 결측 발생이 직접 연관되어 있습니다.",
      "정답입니다. MNAR 데이터를 단순 삭제하면 심각한 추정 편향이 발생합니다."
    ],
    memorizationPoint: "MCAR: 완전 무작위 (삭제 가능) / MAR: 다른 변수와 관련 (대체 권장) / MNAR: 결측값 자체와 관련 (단순삭제 시 심각한 편향)",
    examinerTip: "💡 출제위원 함정: '무작위 결측(MAR)은 결측값 자체의 크기와 관련이 있다' ➔ MNAR의 설명이므로 오답입니다."
  },
  {
    id: "Q_KILLER_208",
    subject: 2,
    chapter: "데이터 결측값 및 이상값 처리",
    sectionId: "s2-2",
    cardId: "c2-10",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 필수 계산] 어떤 연속형 변수의 제1사분위수(Q1)가 30이고, 제3사분위수(Q3)가 70이다. 박스플롯(Boxplot)의 IQR 1.5배수 기준을 적용할 때, 이상치(Outlier)로 판정되는 정상 데이터의 '하한치'와 '상한치'는 각각 얼마인가?",
    choices: [
      "하한치: -30, 상한치: 130",
      "하한치: 10, 상한치: 90",
      "하한치: 0, 상한치: 100",
      "하한치: -10, 상한치: 110"
    ],
    answer: 0,
    explanation: "1) **IQR (사분위범위) 계산:**\n   IQR = Q3 - Q1 = 70 - 30 = 40\n2) **이상치 경계값 공식:**\n   - **하한치:** Q1 - 1.5 × IQR = 30 - (1.5 × 40) = 30 - 60 = **-30**\n   - **상한치:** Q3 + 1.5 × IQR = 70 + (1.5 × 40) = 70 + 60 = **130**\n3) 따라서 -30 미만이거나 130 초과인 값이 이상치로 판정됩니다.",
    whyWrong: [
      "정답입니다. IQR = 40, 하한 = 30 - 60 = -30, 상한 = 70 + 60 = 130.",
      "1.5배가 아닌 0.5배를 적용한 잘못된 계산입니다.",
      "계산 실수가 포함된 보기입니다.",
      "하한/상한 계산 시 Q1/Q3 대신 다른 값을 대입한 오류입니다."
    ],
    memorizationPoint: "이상치 정상 범위: [ Q1 - 1.5 × IQR,  Q3 + 1.5 × IQR ] (IQR = Q3 - Q1)",
    examinerTip: "💡 출제위원 꿀팁: 음수 하한치(-30)가 나오는 경우 수험생들이 당황하여 양수 보기를 찍는 심리를 노린 함정 문제입니다."
  },
  {
    id: "Q_KILLER_209",
    subject: 2,
    chapter: "분석 변수 처리",
    sectionId: "s2-3",
    cardId: "c2-12",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 4개 변수로 구성된 데이터셋에 주성분 분석(PCA)을 수행하여 공분산 행렬의 고윳값(Eigenvalue)을 구한 결과가 다음과 같을 때, 카이저 기준(Kaiser's Rule)에 따라 선택되는 주성분의 개수와 제1주성분(PC1)의 설명분산비율(기여율)로 올바른 것은?\n\n- λ₁ = 2.4\n- λ₂ = 1.0\n- λ₃ = 0.4\n- λ₄ = 0.2",
    choices: [
      "주성분 개수: 2개, PC1 분산기여율: 60%",
      "주성분 개수: 1개, PC1 분산기여율: 60%",
      "주성분 개수: 2개, PC1 분산기여율: 80%",
      "주성분 개수: 3개, PC1 분산기여율: 24%"
    ],
    answer: 0,
    explanation: "1) **카이저 기준 (Kaiser Criterion):**\n   고윳값(Eigenvalue)이 **1.0 이상인 주성분**만 선택합니다.\n   - λ₁ = 2.4 (≥ 1.0) ➔ 선택\n   - λ₂ = 1.0 (≥ 1.0) ➔ 선택\n   - λ₃ = 0.4 (< 1.0), λ₄ = 0.2 (< 1.0) ➔ 탈락\n   ➔ 따라서 선택되는 주성분 개수는 **2개 (PC1, PC2)**\n2) **제1주성분(PC1) 분산기여율 계산:**\n   - 전체 고윳값 합 = 2.4 + 1.0 + 0.4 + 0.2 = 4.0\n   - PC1 분산기여율 = λ₁ / 전체 합 = 2.4 / 4.0 = **0.6 (60%)**\n   (참고: PC1과 PC2의 누적 분산기여율 = (2.4+1.0)/4.0 = 85%)",
    whyWrong: [
      "정답입니다. 고윳값 1.0 이상은 λ1(2.4), λ2(1.0) 2개이며, PC1 기여율은 2.4/4.0 = 60%입니다.",
      "카이저 기준은 1.0 이상(≥1.0)이므로 λ2(1.0)도 포함되어 2개입니다.",
      "80%는 잘못된 기여율 계산입니다 (PC1은 60%, 누적은 85%).",
      "전체 고윳값 합(4.0)으로 나누지 않고 단순히 2.4를 대입한 오류입니다."
    ],
    memorizationPoint: "카이저 기준: 고윳값(Eigenvalue) ≥ 1.0 인 주성분 선택 / 분산기여율 = 해당 고윳값 / 전체 고윳값 총합",
    examinerTip: "💡 출제위원 꿀팁: 고윳값이 정확히 1.0일 때 포함되는지(1.0 이상이므로 포함)를 묻는 경계값 함정이 자주 나옵니다."
  },

  // =========================================================================
  // [3과목: 빅데이터 모델링] 인공신경망, 딥러닝, 트랜스포머/어텐션 (Q_KILLER_301 ~ 316)
  // =========================================================================
  {
    id: "Q_KILLER_301",
    subject: 3,
    chapter: "인공신경망 및 다층 퍼셉트론",
    sectionId: "s3-5",
    cardId: "c3-5",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 딥러닝 인공신경망의 학습 알고리즘인 '오차 역전파(Backpropagation)'에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "순전파(Forward Propagation)를 통해 계산된 최종 출력값과 실제 라벨의 손실(Loss)을 입력층에서 출력층 방향으로 전달하며 가중치를 갱신한다.",
      "수학적으로 미분의 '연쇄 법칙(Chain Rule)'을 활용하여 각 계층 가중치(Weight)에 대한 손실함수의 편미분(Gradient)을 효율적으로 계산한다.",
      "경사하강법을 적용하여 손실함수를 최소화하는 방향(기울기의 반대 방향)으로 가중치를 반복 갱신한다.",
      "출력층에 가까운 계층부터 시작하여 입력층에 가까운 계층으로 거꾸로 오차 기울기가 전파된다."
    ],
    answer: 0,
    explanation: "1) **오차 역전파 (Backpropagation)의 방향:**\n   오차 역전파는 순전파와 반대로 **'출력층(Output Layer)에서 입력층(Input Layer) 방향으로'** 거꾸로(Backward) 오차의 기울기(Gradient)를 전파하며 가중치를 갱신합니다.\n2) 0번 선지는 오차를 '입력층에서 출력층 방향으로' 전달한다고 설명하였으므로 명백한 오답입니다.",
    whyWrong: [
      "정답입니다. 오차 역전파는 '출력층 ➔ 은닉층 ➔ 입력층' 방향으로 거꾸로 전파됩니다.",
      "올바른 설명입니다. 합성함수 미분의 연쇄법칙(Chain Rule)을 기반으로 동작합니다.",
      "올바른 설명입니다. Gradient Descent 원리에 따라 기울기 반대 방향(-η∇L)으로 갱신합니다.",
      "올바른 설명입니다. 출력층부터 입력층으로 역방향 계산이 이루어집니다."
    ],
    memorizationPoint: "순전파: 입력층 ➔ 은닉층 ➔ 출력층 / 역전파: 출력층 ➔ 은닉층 ➔ 입력층 (연쇄법칙 Chain Rule 기반)",
    examinerTip: "💡 출제위원 함정: 순전파와 역전파의 계산 순서나 데이터/기울기 이동 방향을 반대로 뒤집는 보기가 매우 빈출됩니다."
  },
  {
    id: "Q_KILLER_302",
    subject: 3,
    chapter: "인공신경망 및 다층 퍼셉트론",
    sectionId: "s3-5",
    cardId: "c3-6",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[합격기준 필수] 심층 신경망(DNN)에서 시그모이드(Sigmoid) 활성화 함수를 여러 은닉층에 사용할 때 발생하는 '기울기 소실(Vanishing Gradient)' 문제와 이를 해결하기 위한 대안으로 가장 옳은 것은?",
    choices: [
      "시그모이드 함수의 미분 최대값이 0.25에 불과하여 층이 깊어질수록 역전파 기울기가 0에 수렴하므로, 양수 구간에서 기울기가 1인 ReLU 계열 함수를 은닉층에 사용한다.",
      "시그모이드 함수의 출력값이 [-1, 1] 범위로 너무 넓어 오버플로우가 발생하므로, 출력을 [0, 1]로 제한하는 Tanh 함수를 은닉층에 적용한다.",
      "시그모이드 함수는 연산 속도가 너무 느리므로, 모든 은닉층에 소프트맥스(Softmax) 함수를 적용하여 해결한다.",
      "기울기 소실은 은닉층 노드 수가 너무 적어서 발생하므로, 가중치 규제(L1/L2 Regularization)를 완전히 해제하여 해결한다."
    ],
    answer: 0,
    explanation: "1) **시그모이드(Sigmoid)의 기울기 소실 원인:**\n   시그모이드 함수 σ(x) = 1 / (1 + e^-x) 의 미분값 σ'(x) = σ(x)(1 - σ(x)) 는 x=0일 때 **최대 0.25**입니다. 은닉층이 5~10개만 쌓여도 0.25가 계속 곱해지면서 기울기가 0으로 사라져(소실) 초기 입력층 쪽 가중치가 거의 학습되지 않습니다.\n2) **해결책 (ReLU):**\n   ReLU 함수 f(x) = max(0, x) 는 **x > 0 구간에서 도함수(기울기)가 항상 1.0**이므로 층이 아무리 깊어져도 기울기가 소실되지 않고 완벽하게 역전파됩니다.",
    whyWrong: [
      "정답입니다. Sigmoid 미분 최댓값은 0.25이며, ReLU는 x>0에서 미분값이 1이므로 기울기 소실을 극복합니다.",
      "Tanh의 출력 범위는 [-1, 1]이며, 시그모이드(0~1)보다 학습은 잘되나 여전히 기울기 소실이 발생합니다.",
      "Softmax는 다중 분류의 '출력층'에 사용하는 함수이며 은닉층에는 쓰지 않습니다.",
      "기울기 소실은 은닉층 깊이에 따른 활성화 함수의 미분 연쇄곱 때문입니다."
    ],
    memorizationPoint: "시그모이드: 미분 최대 0.25 (기울기 소실 원인) ➔ ReLU: x>0에서 미분값 1 (기울기 소실 극복)",
    examinerTip: "💡 출제위원 꿀팁: '은닉층에는 ReLU/Leaky ReLU', '이진분류 출력층에는 Sigmoid', '다중분류 출력층에는 Softmax' 조합을 기계처럼 외우셔야 합니다."
  },
  {
    id: "Q_KILLER_303",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 트랜스포머(Transformer) 모델의 핵심 메커니즘인 '스케일드 닷 프로덕트 어텐션(Scaled Dot-Product Attention)'의 계산 공식으로 올바른 것은? (단, Q: Query, K: Key, V: Value, d_k: Key 벡터의 차원수)",
    choices: [
      "Attention(Q, K, V) = softmax( (Q Kᵀ) / √d_k ) V",
      "Attention(Q, K, V) = sigmoid( (Qᵀ K) / d_k ) V",
      "Attention(Q, K, V) = softmax( (Q Vᵀ) / √d_k ) K",
      "Attention(Q, K, V) = tanh( (Q K) / √d_k ) Vᵀ"
    ],
    answer: 0,
    explanation: "**트랜스포머 Scaled Dot-Product Attention 공식:**\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n1) **Query(Q)와 Key(K)의 내적(Q Kᵀ):** 단어 간의 상호 유사도(어텐션 스코어)를 계산합니다.\n2) **스케일링 (1 / √d_k):** 차원수(d_k)가 커질수록 내적 결과의 분산이 커져 Softmax 함수의 기울기가 0에 가까워지는 현상을 방지합니다.\n3) **Softmax:** 각 Key에 대한 어텐션 가중치(합=1)로 정규화합니다.\n4) **Value(V) 곱:** 가중치에 실제 내용인 Value를 곱해 최종 맥락 벡터(Context Vector)를 완성합니다.\n\n💡 실제 기출 포인트: 12회 시험에서 Transformer Attention 공식과 √d_k로 나누는 이유(Softmax 기울기 소실 방지)가 출제되었습니다.",
    whyWrong: [
      "정답입니다. Attention(Q, K, V) = softmax((QK^T)/√d_k)V 입니다.",
      "Sigmoid가 아닌 Softmax를 사용하며 전치 위치가 틀렸습니다.",
      "Query와 내적하는 대상은 Value(V)가 아니라 Key(K)입니다.",
      "Tanh가 아니며 Value의 전치가 아닙니다."
    ],
    memorizationPoint: "어텐션 공식: softmax( (Q Kᵀ) / √d_k ) × V (소프트맥스 안에는 Q와 K의 전치, 바깥에는 V)",
    examinerTip: "💡 출제위원 함정: Q와 곱해지는 것이 K인지 V인지, √d_k로 나누는 스케일링 항이 분모에 있는지 분자에 있는지를 꼬아서 냅니다."
  },
  {
    id: "Q_KILLER_304",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 트랜스포머(Transformer) 아키텍처의 구성 요소와 특징에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "Multi-Head Attention은 여러 개의 어텐션을 병렬로 수행하여 단어들 간의 다양한 문맥적 의미 관계를 동시에 포착한다.",
      "위치 인코딩(Positional Encoding)은 순환(RNN) 구조가 없는 트랜스포머에 단어의 순서 및 위치 정보를 주기 위해 사인(sin)과 코사인(cos) 주기함수를 사용한다.",
      "트랜스포머는 RNN과 달리 이전 타임스텝의 출력이 다음 계산에 필수적인 순차적(Sequential) 연산 종속성을 가지므로 GPU 병렬 학습이 불가능하다.",
      "인코더와 디코더의 각 서브레이어에는 기울기 소실을 방지하고 안정적인 학습을 돕기 위해 잔차 연결(Residual Connection)과 층 정규화(Layer Normalization)가 적용된다."
    ],
    answer: 2,
    explanation: "1) **트랜스포머의 최대 강점은 '완전한 병렬 처리(Parallelism)'**입니다.\n2) 기존 RNN/LSTM은 $t-1$ 시점의 은닉 상태를 받아야만 $t$ 시점을 계산할 수 있어 순차적(Sequential)으로만 동작하므로 GPU의 대규모 병렬 연산 성능을 활용할 수 없었습니다.\n3) 반면 트랜스포머는 순환 구조를 완전히 버리고 문장 전체의 단어들을 한 번에 행렬 연산(Self-Attention)으로 처리하므로 **100% 완전 병렬 학습이 가능**하여 대규모 데이터 학습 속도를 획기적으로 개선했습니다.",
    whyWrong: [
      "올바른 설명입니다. Multi-Head Attention은 $h$개의 독립된 어텐션 헤드로 다양한 관점을 학습합니다.",
      "올바른 설명입니다. Positional Encoding은 sin/cos 함수를 이용해 위치 정보를 주입합니다.",
      "정답입니다. 트랜스포머는 순차적 의존성이 없어서 GPU 병렬 처리가 완벽히 가능합니다.",
      "올바른 설명입니다. Add & LayerNorm(잔차 연결 + 층 정규화)이 적용됩니다."
    ],
    memorizationPoint: "트랜스포머 3대 혁신: 1) Self-Attention, 2) Positional Encoding (위치 정보), 3) 완전 병렬 연산 (RNN의 순차처리 한계 극복)",
    examinerTip: "💡 출제위원 함정: '트랜스포머는 RNN 기반으로 만들어졌다' ➔ 100% 오답 지문입니다. 트랜스포머는 RNN을 완전히 배제(Attention Is All You Need)했습니다."
  },
  {
    id: "Q_KILLER_305",
    subject: 3,
    chapter: "딥러닝 분석",
    sectionId: "s3-11",
    cardId: "c3-13",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 필수 계산] 크기가 32×32 인 입력 이미지에 5×5 크기의 필터(Filter/Kernel)를 적용하고자 한다. 패딩(Padding)을 2로 설정하고, 스트라이드(Stride)를 1로 적용했을 때 출력되는 특성 맵(Feature Map)의 크기는 얼마인가?",
    choices: [
      "32×32",
      "28×28",
      "30×30",
      "36×36"
    ],
    answer: 0,
    explanation: "1) **CNN 출력 크기 계산 공식:**\n   Output Size = ⌊ (W - F + 2P) / S ⌋ + 1\n   - W (입력 크기) = 32\n   - F (필터 크기) = 5\n   - P (패딩 크기) = 2\n   - S (스트라이드) = 1\n2) **수치 대입:**\n   Output = (32 - 5 + 2×2) / 1 + 1\n          = (32 - 5 + 4) / 1 + 1\n          = 31 / 1 + 1 = **32**\n3) 따라서 출력 특성 맵의 크기는 **32×32** (입력 크기와 동일하게 유지됨) 입니다.",
    whyWrong: [
      "정답입니다. (32 - 5 + 4)/1 + 1 = 32×32.",
      "패딩을 적용하지 않았을 때(P=0)의 크기입니다 (32-5+1 = 28).",
      "계산 실수가 포함된 보기입니다.",
      "패딩 계산이 잘못된 보기입니다."
    ],
    memorizationPoint: "CNN 출력 크기 공식: Output = [ (W - F + 2P) / S ] + 1",
    examinerTip: "💡 출제위원 꿀팁: '입력과 출력 크기를 동일하게 유지하기 위한 패딩 크기'를 묻는 역산 문제도 빈출됩니다 (F=5, S=1일 때 P=2)."
  },

  // =========================================================================
  // [4과목: 빅데이터 결과 해석] 혼동 행렬 평가지표, 편향-분산, 교차검증 (Q_KILLER_401 ~ 416)
  // =========================================================================
  {
    id: "Q_KILLER_401",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 집중 계산] 다음은 악성 종양(Positive)과 양성 종양(Negative)을 분류한 모델의 혼동 행렬(Confusion Matrix)이다. 이 모델의 '정밀도(Precision)'와 '재현율/민감도(Recall)'로 올바른 것은?\n\n| | 실제 Positive (암) | 실제 Negative (정상) |\n|---|---|---|\n| 예측 Positive | 80 (TP) | 20 (FP) |\n| 예측 Negative | 10 (FN) | 90 (TN) |",
    choices: [
      "정밀도: 0.80, 재현율: 약 0.889",
      "정밀도: 약 0.889, 재현율: 0.80",
      "정밀도: 0.80, 재현율: 0.90",
      "정밀도: 0.85, 재현율: 0.85"
    ],
    answer: 0,
    explanation: "1) **정밀도 (Precision):** 모델이 Positive라고 예측한 것 중 진짜 Positive의 비율\n   - Precision = TP / (TP + FP)\n   - Precision = 80 / (80 + 20) = 80 / 100 = **0.80 (80%)**\n2) **재현율/민감도 (Recall / Sensitivity):** 실제 Positive인 것 중 모델이 맞춘 비율\n   - Recall = TP / (TP + FN)\n   - Recall = 80 / (80 + 10) = 80 / 90 = 8 / 9 ≈ **0.889 (약 88.9%)**\n\n💡 실제 기출 포인트: 4과목에서 혼동행렬 표를 주고 정밀도, 재현율, F1-Score를 구하는 문제는 매 시험마다 최소 2~3문제씩 100% 출제됩니다.",
    whyWrong: [
      "정답입니다. 정밀도 = 80/100 = 0.80, 재현율 = 80/90 ≈ 0.889.",
      "정밀도와 재현율의 분모가 서로 뒤바뀌었습니다.",
      "0.90은 특이도(TN/(TN+FP) = 90/110 ≈ 0.818)와 다른 잘못된 수치입니다.",
      "전체 정확도는 (80+90)/200 = 170/200 = 0.85 입니다."
    ],
    memorizationPoint: "정밀도 = TP / (TP + FP) [예측 Positive 기준] / 재현율 = TP / (TP + FN) [실제 Positive 기준]",
    examinerTip: "💡 출제위원 함정: '정밀도의 분모는 예측 1의 합(TP+FP)', '재현율의 분모는 실제 1의 합(TP+FN)'을 명확히 구분해야 합니다."
  },
  {
    id: "Q_KILLER_402",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 집중 계산] 어떤 분류 모델의 정밀도(Precision)가 0.8이고, 재현율(Recall)이 0.6일 때, 이 모델의 'F1-Score'는 얼마인가?",
    choices: [
      "약 0.686",
      "0.700",
      "0.480",
      "0.740"
    ],
    answer: 0,
    explanation: "1) **F1-Score 공식 (조화평균):**\n   F1 = 2 × (Precision × Recall) / (Precision + Recall)\n2) **수치 대입:**\n   - 분자 = 2 × 0.8 × 0.6 = 2 × 0.48 = 0.96\n   - 분모 = 0.8 + 0.6 = 1.4\n   - F1 = 0.96 / 1.4 = 96 / 140 = 24 / 35 ≈ **0.6857 (약 0.686)**\n3) 단순 산술평균은 (0.8 + 0.6)/2 = 0.70이지만, 조화평균은 작은 값에 더 큰 가중치를 두므로 0.70보다 항상 작게 나옵니다.",
    whyWrong: [
      "정답입니다. F1 = 2*(0.8*0.6)/(0.8+0.6) = 0.96 / 1.4 ≈ 0.686.",
      "0.700은 산술평균 (0.8+0.6)/2 이므로 오답입니다.",
      "0.480은 단순 곱(P*R)입니다.",
      "계산 실수가 포함된 보기입니다."
    ],
    memorizationPoint: "F1-Score = 2 × (P × R) / (P + R) (정밀도와 재현율의 조화평균)",
    examinerTip: "💡 출제위원 함정: F1-Score를 산술평균(0.70)으로 착각하도록 유도하는 오답 보기가 항상 1번에 배치됩니다."
  },
  {
    id: "Q_KILLER_403",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 필수 시나리오] 신용카드 이상 거래(FDS 사기 결제 탐지)나 희귀 암 질환 진단과 같이, 실제 Positive(이상/암) 케이스를 절대 놓치지 않는 것(FN 최소화)이 가장 중요한 비즈니스 환경에서 가장 우선적으로 고려해야 할 평가지표 2가지는?",
    choices: [
      "재현율(Recall / 민감도)과 F2-Score",
      "정밀도(Precision)와 F0.5-Score",
      "특이도(Specificity)와 정확도(Accuracy)",
      "위양성률(FPR)과 단순 오분류율(Error Rate)"
    ],
    answer: 0,
    explanation: "1) **암 진단, 사기 결제, 공장 결함 검출의 특징:**\n   - 실제로 암 환자인데 정상으로 오진(FN)하여 치료 시기를 놓치는 것이 치명적입니다.\n   - 따라서 실제 양성을 놓치지 않고 찾아내는 **재현율(Recall = TP / (TP+FN))**을 극대화해야 합니다.\n2) **F_β Score 적용:**\n   - β = 2 인 **F2-Score**는 재현율(Recall)에 정밀도보다 2배의 가중치를 부여하는 지표이므로 이러한 의료/보안 도메인에 최적입니다.\n   - 반대로 스팸 메일 필터링(중요 메일을 스팸으로 오분류하면 안 됨)은 **정밀도(Precision)**와 **F0.5-Score**가 중요합니다.",
    whyWrong: [
      "정답입니다. 암/사기 탐지는 FN 방지가 최우선이므로 재현율과 F2-Score를 봅니다.",
      "정밀도와 F0.5-Score는 FP 방지가 중요한 스팸 필터링 등에 적합합니다.",
      "불균형 데이터에서 정확도는 '정확도의 역설'로 인해 무의미합니다.",
      "오분류율은 클래스 불균형 문제를 해결하지 못합니다."
    ],
    memorizationPoint: "암 진단 / 결함 탐지 / 사기 결제 ➔ 재현율(Recall) & F2-Score (FN 최소화 목표)",
    examinerTip: "💡 출제위원 꿀팁: 도메인 시나리오(암 진단 vs 스팸메일)를 제시하고 적합한 평가지표를 고르는 문제는 4과목 단골 1순위입니다."
  },
  {
    id: "Q_KILLER_404",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-991",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 빈출] 이진 분류 모델의 ROC(Receiver Operating Characteristic) 곡선과 AUC(Area Under Curve)에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "ROC 곡선의 가로축(X축)은 위양성률(FPR = 1 - 특이도)이고, 세로축(Y축)은 민감도(TPR = 재현율)이다.",
      "분류 결정 임계값(Threshold)을 1.0에서 0.0으로 점차 낮추면 TPR과 FPR이 모두 증가하면서 곡선이 좌하단(0,0)에서 우상단(1,1)으로 진행한다.",
      "완벽하게 분류하는 이상적인 모델의 ROC 곡선은 좌상단 모서리인 (0, 1)을 통과하며, 이때 AUC 면적은 1.0이다.",
      "동전을 던져서 무작위로 예측하는 수준의 모델은 ROC 곡선이 완벽한 U자형을 그리며 AUC 값은 0.0이 된다."
    ],
    answer: 3,
    explanation: "1) **무작위 추측(Random Guess)의 ROC/AUC:**\n   동전 던지기처럼 50% 확률로 무작위 예측하는 모델의 ROC 곡선은 (0,0)에서 (1,1)을 잇는 **대각선 직선(y = x)**이 되며, 이때의 **AUC 면적은 0.5**입니다.\n2) AUC가 0.0인 것은 모든 예측을 정반대로 뒤집은 최악의 반대 예측 상태를 의미합니다.",
    whyWrong: [
      "올바른 설명입니다. X축: FPR(1-특이도), Y축: TPR(민감도).",
      "올바른 설명입니다. 임계값을 낮추면 양성 판정이 많아져 TPR, FPR 모두 증가합니다.",
      "올바른 설명입니다. 완벽한 모델은 (0, 1) 모서리에 닿으며 AUC=1.0 입니다.",
      "정답입니다. 무작위 모델의 ROC 곡선은 대각선(y=x)이며 AUC는 0.5 입니다."
    ],
    memorizationPoint: "ROC 축: X=1-특이도(FPR), Y=민감도(TPR) / AUC: 완벽 1.0, 랜덤추측 0.5",
    examinerTip: "💡 출제위원 함정: ROC 곡선의 X축과 Y축 이름을 반대로 바꾸거나(X가 TPR, Y가 FPR), 랜덤 모델의 AUC를 0으로 속이는 문제가 빈출됩니다."
  },
  {
    id: "Q_KILLER_405",
    subject: 4,
    chapter: "분석모형 개선",
    sectionId: "s4-2",
    cardId: "c4-4",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 머신러닝 모델의 복잡도(Complexity)와 '편향-분산 트레이드오프(Bias-Variance Tradeoff)' 그래프에 대한 설명으로 옳은 것은?",
    choices: [
      "모델의 복잡도가 증가할수록 편향(Bias)은 감소하고 분산(Variance)은 증가한다.",
      "모델의 복잡도가 증가할수록 편향(Bias)과 분산(Variance)이 모두 단조 증가한다.",
      "과소적합(Underfitting) 상태는 낮은 편향(Low Bias)과 높은 분산(High Variance)을 특징으로 한다.",
      "과대적합(Overfitting) 상태는 높은 편향(High Bias)과 낮은 분산(Low Variance)을 특징으로 한다."
    ],
    answer: 0,
    explanation: "1) **편향-분산 트레이드오프 (Bias-Variance Tradeoff):**\n   - **모델 복잡도 증가 시:** 모델이 훈련 데이터에 너무 유연하게 맞춰지므로 **편향(Bias)은 감소**하지만, 새로운 데이터 변동에 취약해져 **분산(Variance)은 급증**합니다.\n   - **총 기대 오차 (Total Error):** Bias² + Variance + Irreducible Noise 로 구성되며, 편향과 분산의 합이 최소가 되는 **U자형 곡선의 최적점(Optimal Point)**에서 일반화 성능이 극대화됩니다.\n2) 과소적합은 High Bias (단순해서 패턴을 못 배움), 과대적합은 High Variance (훈련셋에 과적합되어 출렁거림) 입니다.",
    whyWrong: [
      "정답입니다. 모델 복잡도 증가 ➔ 편향 감소, 분산 증가 (서로 반대 방향 트레이드오프).",
      "편향과 분산은 상충(Trade-off) 관계이므로 하나가 줄면 다른 하나가 늡니다.",
      "과소적합은 High Bias, Low Variance 입니다.",
      "과대적합은 Low Bias, High Variance 입니다."
    ],
    memorizationPoint: "모델 복잡도 ↑ ➔ 편향(Bias) ↓, 분산(Variance) ↑ (과적합 Overfitting 위험)",
    examinerTip: "💡 출제위원 꿀팁: 편향-분산 그래프에서 '과소적합 = High Bias', '과대적합 = High Variance', '총 오차 = U자 곡선' 3대 포인트를 기억하세요."
  },
  {
    id: "Q_KILLER_406",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-992",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 교차 검증(Cross-Validation) 기법 중 'LOOCV(Leave-One-Out Cross-Validation)'에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "총 N개의 데이터가 있을 때, 1개의 관측치만 검증용으로 쓰고 나머지 N-1개로 모델을 훈련하는 과정을 N번 반복한다.",
      "훈련 데이터셋의 크기가 N-1개로 거의 전체 데이터와 같으므로 모델의 편향(Bias)이 거의 발생하지 않는다.",
      "K-Fold 교차 검증에 비해 모델 훈련을 N번 수행해야 하므로 데이터 수가 많을 경우 계산 비용(시간)이 극도로 높다.",
      "매 반복마다 훈련되는 N개의 모델들이 서로 독립적인 데이터를 사용하므로 추정된 평가 성능의 분산(Variance)이 극도로 낮아 항상 K-Fold보다 일반화 안정성이 우수하다."
    ],
    answer: 3,
    explanation: "1) **LOOCV의 분산(Variance) 특성:**\n   LOOCV에서 훈련에 사용되는 N개의 서브 데이터셋들은 서로 **N-2개의 데이터를 공유하여 거의 99% 동일**합니다. 따라서 각 반복에서 훈련된 모델들의 예측 결과 간에 **높은 양의 상관관계(High Correlation)**가 존재하여, 최종 평균 오차 추정치의 **분산(Variance)이 오히려 커지는 단점**이 있습니다.\n2) 따라서 실무에서는 편향과 분산의 균형이 우수한 **K=5 또는 K=10인 K-Fold 교차검증**이 표준으로 권장됩니다.",
    whyWrong: [
      "올바른 설명입니다. LOOCV는 K=N인 극단적인 K-Fold 기법입니다.",
      "올바른 설명입니다. N-1개로 학습하므로 편향이 매우 낮습니다.",
      "올바른 설명입니다. 데이터가 10만 개면 모델을 10만 번 학습해야 하므로 연산 비용이 극대화됩니다.",
      "정답입니다. LOOCV의 훈련셋들은 거의 동일하여 상관관계가 높아 분산(Variance)이 커지는 단점이 있습니다."
    ],
    memorizationPoint: "LOOCV = N개 중 1개만 검증, N번 반복 / 장점: 편향 극소 / 단점: 연산 비용 극대, 높은 분산",
    examinerTip: "💡 출제위원 함정: 'LOOCV는 계산량이 적고 분산이 가장 낮다'는 지문은 대표적인 킬러 오답 지문입니다."
  }
];

// Add questions to bank while avoiding duplicate IDs
let addedCount = 0;
const existingIds = new Set(bank.questions.map(q => q.id));

killerQuestions.forEach(q => {
  if (existingIds.has(q.id)) {
    const idx = bank.questions.findIndex(x => x.id === q.id);
    bank.questions[idx] = q;
    console.log(`Updated existing killer question: [${q.id}]`);
  } else {
    bank.questions.push(q);
    existingIds.add(q.id);
    addedCount++;
    console.log(`Injected new killer question: [${q.id}]`);
  }
});

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`Successfully injected ${addedCount} new killer CBT questions! Total in bank: ${bank.questions.length}`);
