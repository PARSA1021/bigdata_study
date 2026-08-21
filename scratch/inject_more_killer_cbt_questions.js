const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'cbt_bank.json');
const rawData = fs.readFileSync(bankPath, 'utf8');
const bank = JSON.parse(rawData);

const moreKillerQuestions = [
  // ----------------------------------------------------
  // 2과목 추가 문제 (Q_KILLER_210 ~ 216)
  // ----------------------------------------------------
  {
    id: "Q_KILLER_210",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[기출 필수 계산] 3개 집단(k=3)의 평균 차이를 검정하기 위해 각 집단별로 10명씩 총 30명(N=30)의 표본을 추출하여 일원배치 분산분석(One-Way ANOVA)을 수행하였다. 집단 간 제곱합(SSB)이 80이고, 집단 내 제곱합(SSW)이 108일 때, 분산분석 F-검정통계량의 값은 얼마인가?",
    choices: [
      "F = 10.0",
      "F = 5.0",
      "F = 20.0",
      "F = 0.74"
    ],
    answer: 0,
    explanation: "1) **자유도 계산:**\n   - 집단 간 자유도 df₁ = k - 1 = 3 - 1 = **2**\n   - 집단 내 자유도 df₂ = N - k = 30 - 3 = **27**\n2) **평균제곱(MS) 계산:**\n   - 집단 간 평균제곱 MSB = SSB / df₁ = 80 / 2 = **40**\n   - 집단 내 평균제곱 MSW = SSW / df₂ = 108 / 27 = **4**\n3) **F-검정통계량 계산:**\n   - F = MSB / MSW = 40 / 4 = **10.0**\n\n💡 실제 기출 포인트: ANOVA 표(분산분석표)에서 자유도와 평균제곱을 이용해 F값을 직접 구하는 계산 문제는 매년 출제되는 단골 문제입니다.",
    whyWrong: [
      "정답입니다. MSB = 80/2 = 40, MSW = 108/27 = 4 이므로 F = 40/4 = 10.0 입니다.",
      "자유도 df1을 4로 나누었을 때의 오답입니다.",
      "MSW 계산 시 자유도 대신 다른 값을 나눈 오류입니다.",
      "SSB/SSW 단순 비율(80/108)을 구한 오류입니다."
    ],
    memorizationPoint: "ANOVA F-통계량 = (SSB / (k-1)) / (SSW / (N-k)) = MSB / MSW",
    examinerTip: "💡 출제위원 함정: 집단 간 자유도(k-1)와 집단 내 자유도(N-k)를 분산분석표의 빈칸으로 뚫어놓고 채우는 문제가 단골입니다."
  },
  {
    id: "Q_KILLER_211",
    subject: 2,
    chapter: "데이터 결측값 및 이상값 처리",
    sectionId: "s2-2",
    cardId: "c2-9",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 결측치 대체 기법 중 MICE(Multivariate Imputation by Chained Equations, 다중대체법)의 3단계 처리 절차를 올바른 순서로 나열한 것은?",
    choices: [
      "대치 단계(Imputation) ➔ 분석 단계(Analysis) ➔ 결합 단계(Pooling)",
      "분석 단계(Analysis) ➔ 대치 단계(Imputation) ➔ 결합 단계(Pooling)",
      "결합 단계(Pooling) ➔ 대치 단계(Imputation) ➔ 분석 단계(Analysis)",
      "정규화 단계(Normalization) ➔ 대치 단계(Imputation) ➔ 잔차 단계(Residual)"
    ],
    answer: 0,
    explanation: "1) **MICE 다중대체법 3단계 절차:**\n   - **① 대치 단계 (Imputation):** 결측이 있는 각 변수에 대해 조건부 회귀 모델을 연쇄적으로 실행하여 $m$개의 완전한 가상 데이터셋을 생성합니다.\n   - **② 분석 단계 (Analysis):** 생성된 $m$개의 개별 데이터셋 각각에 통계/머신러닝 분석을 독립적으로 수행하여 $m$개의 모수 추정치를 얻습니다.\n   - **③ 결합 단계 (Pooling):** 루빈의 결합 규칙(Rubin's Rules)을 적용하여 $m$개의 분석 결과를 하나의 단일 통합 추정치와 결합 표준오차로 통합합니다.\n\n💡 실제 기출 포인트: MICE 3단계(대치 ➔ 분석 ➔ 결합/풀링)는 최근 실무 전처리 트렌드로 출제되었습니다.",
    whyWrong: [
      "정답입니다. 대치(Imputation) ➔ 분석(Analysis) ➔ 결합/풀링(Pooling) 순서입니다.",
      "분석을 먼저 수행할 수 없습니다.",
      "결합은 가장 마지막 단계입니다.",
      "정규화 단계는 MICE 고유 3단계에 해당하지 않습니다."
    ],
    memorizationPoint: "MICE 다중대체법 3단계: 대치(Imputation) ➔ 분석(Analysis) ➔ 결합(Pooling) [대분결]",
    examinerTip: "💡 출제위원 꿀팁: 루빈의 규칙(Rubin's Rules)을 사용해 결합(Pooling)한다는 키워드가 나오면 100% MICE 다중대체법입니다."
  },
  {
    id: "Q_KILLER_212",
    subject: 2,
    chapter: "분석 변수 처리",
    sectionId: "s2-3",
    cardId: "c2-14",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[기출 빈출] 불균형 데이터(Imbalanced Data)를 처리하기 위한 오버샘플링(Oversampling) 기법 중, 소수 클래스 데이터의 K개 최근접 이웃(KNN)을 찾아 이웃들 간의 선분 위에 가상의 새로운 소수 클래스 샘플을 선형 보간하여 생성하는 기법은?",
    choices: [
      "SMOTE (Synthetic Minority Over-sampling Technique)",
      "Random Undersampling (랜덤 언더샘플링)",
      "Tomek Links (토멕 링크)",
      "CNN (Condensed Nearest Neighbor)"
    ],
    answer: 0,
    explanation: "1) **SMOTE (Synthetic Minority Over-sampling Technique):**\n   소수 클래스 데이터를 단순 복제하면 과적합(Overfitting)이 발생하므로, 소수 클래스 데이터와 그 K-NN 이웃 사이의 선분 상에 **새로운 합성 샘플(Synthetic Sample)**을 생성하여 클래스 균형을 맞추는 대표적인 오버샘플링 알고리즘입니다.\n2) Tomek Links와 CNN은 언더샘플링 기법입니다.",
    whyWrong: [
      "정답입니다. SMOTE는 KNN 기반 선형 보간을 통한 가상 소수 샘플 생성 기법입니다.",
      "랜덤 언더샘플링은 다수 클래스 데이터를 무작위로 버리는 기법입니다.",
      "토멕 링크는 서로 다른 클래스 간 가장 가까운 쌍을 찾아 다수 클래스를 삭제하는 언더샘플링입니다.",
      "CNN(Condensed Nearest Neighbor)은 언더샘플링 기법입니다."
    ],
    memorizationPoint: "SMOTE = 소수 클래스 KNN 기반 가상 샘플 합성 오버샘플링",
    examinerTip: "💡 출제위원 함정: 단순 복제(Random Oversampling)와 가상 데이터 합성(SMOTE)의 차이를 묻는 문제가 단골입니다."
  },

  // ----------------------------------------------------
  // 3과목 추가 문제 (Q_KILLER_306 ~ 310)
  // ----------------------------------------------------
  {
    id: "Q_KILLER_306",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 딥러닝 최적화 알고리즘인 'Adam(Adaptive Moment Estimation)'에 대한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "기울기의 1차 모멘트(지수이동평균)를 사용하는 모멘텀(Momentum) 기법과 2차 모멘트(제곱값의 지수이동평균)를 사용하는 RMSprop 기법을 결합한 알고리즘이다.",
      "학습 초기에 모멘트 추정치가 0으로 편향(Bias)되는 현상을 보정하기 위한 바이어스 보정(Bias Correction) 단계를 포함한다.",
      "모든 파라미터(가중치)에 대해 완전히 고정된 단일 글로벌 학습률을 영구적으로 적용하여 파라미터별 개별 적응이 불가능하다.",
      "하이퍼파라미터 β₁ (통상 0.9)과 β₂ (통상 0.999)를 통해 1차 및 2차 모멘트의 감쇠율을 조절한다."
    ],
    answer: 2,
    explanation: "1) **Adam의 핵심 특징:**\n   Adam은 **각 파라미터(가중치)마다 적응적(Adaptive)으로 서로 다른 학습률을 자동으로 조절**하는 적응형 학습률 알고리즘입니다.\n2) 2번 선지처럼 '모든 파라미터에 고정된 단일 학습률을 적용한다'는 것은 기본 순수 경사하강법(GD)의 한계점이며 Adam의 설명과 정반대입니다.",
    whyWrong: [
      "올바른 설명입니다. Adam = Momentum (1차 모멘트, 방향) + RMSprop (2차 모멘트, 크기).",
      "올바른 설명입니다. 초기 $m_0=0, v_0=0$ 에 따른 편향을 보정하는 식이 포함되어 있습니다.",
      "정답입니다. Adam은 각 파라미터별로 학습률을 개별 적응(Adaptive)시키는 기법입니다.",
      "올바른 설명입니다. 기본 권장값은 $\\beta_1 = 0.9, \\beta_2 = 0.999, \\epsilon = 10^{-8}$ 입니다."
    ],
    memorizationPoint: "Adam = 모멘텀(Momentum, 관성) + 알엠에스프롭(RMSprop, 적응형 학습률) + 초기 편향 보정",
    examinerTip: "💡 출제위원 꿀팁: 최적화 알고리즘(GD -> SGD -> Momentum / AdaGrad -> RMSprop -> Adam) 발전 계보를 묻는 킬러 문제입니다."
  },
  {
    id: "Q_KILLER_307",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] 트랜스포머 기반의 사전학습 언어모델인 'BERT'와 'GPT'의 아키텍처 및 학습 방식 비교로 가장 옳지 않은 것은?",
    choices: [
      "BERT는 트랜스포머의 인코더(Encoder) 구조를 사용하며, 양방향(Bidirectional) 문맥을 모두 참조한다.",
      "GPT는 트랜스포머의 디코더(Decoder) 구조를 사용하며, 이전 단어들로부터 다음 단어를 순차적으로 예측하는 단방향(Autoregressive) 구조이다.",
      "BERT는 문장 내의 일부 단어를 가리고 맞추는 마스크 언어 모델(MLM)과 다음 문장 예측(NSP)으로 사전학습된다.",
      "GPT는 미래 시점의 단어를 모두 미리 참조할 수 있는 마스크 없는 완전 양방향 셀프 어텐션(Full Self-Attention)을 학습에 활용한다."
    ],
    answer: 3,
    explanation: "1) **GPT의 어텐션 메커니즘:**\n   GPT는 텍스트를 생성하는 모델이므로, 미래의 단어를 미리 컨닝하지 못하도록 **'마스크드 셀프 어텐션(Masked Self-Attention / Causal Masking)'**을 사용하여 이전 시점($t$ 이전)의 단어들만 참조할 수 있도록 제한합니다.\n2) 미래 단어까지 모두 양방향으로 참조하는 것은 **BERT(인코더 기반)**의 특징입니다.",
    whyWrong: [
      "올바른 설명입니다. BERT = Bidirectional Encoder Representations from Transformers.",
      "올바른 설명입니다. GPT = Generative Pre-trained Transformer (디코더 기반 자기회귀 모델).",
      "올바른 설명입니다. BERT는 Masked LM(15% 마스킹)과 NSP로 학습합니다.",
      "정답입니다. GPT는 미래 단어를 가리는 Masked Self-Attention(인과적 마스킹)을 적용합니다."
    ],
    memorizationPoint: "BERT = 트랜스포머 인코더, 양방향 문맥, 분류/이해에 강함 / GPT = 트랜스포머 디코더, 단방향(자기회귀), 텍스트 생성에 강함",
    examinerTip: "💡 출제위원 꿀팁: 'BERT(인코더-양방향)' vs 'GPT(디코더-단방향 생성)'의 핵심 대조를 정확히 암기하세요."
  },

  // ----------------------------------------------------
  // 4과목 추가 문제 (Q_KILLER_407 ~ 410)
  // ----------------------------------------------------
  {
    id: "Q_KILLER_407",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 집중 계산] 1,000명의 환자를 대상으로 코로나 감염 여부를 진단한 결과가 다음과 같다. 실제 정상인 사람 중 모델이 정상이라고 올바르게 진단한 비율인 '특이도(Specificity)'와 '위양성률(FPR)'로 올바른 것은?\n\n- 실제 감염자(Positive): 100명 (모델이 감염으로 예측한 TP = 90명, 정상으로 오진한 FN = 10명)\n- 실제 정상인(Negative): 900명 (모델이 감염으로 오진한 FP = 90명, 정상으로 맞춘 TN = 810명)",
    choices: [
      "특이도: 0.90 (90%), 위양성률: 0.10 (10%)",
      "특이도: 0.81 (81%), 위양성률: 0.19 (19%)",
      "특이도: 0.90 (90%), 위양성률: 0.90 (90%)",
      "특이도: 0.50 (50%), 위양성률: 0.50 (50%)"
    ],
    answer: 0,
    explanation: "1) **특이도 (Specificity / TNR):**\n   - 실제 Negative(정상) 중 TN의 비율\n   - Specificity = TN / (TN + FP) = 810 / (810 + 90) = 810 / 900 = **0.90 (90%)**\n2) **위양성률 (False Positive Rate / FPR):**\n   - FPR = 1 - 특이도 = FP / (TN + FP) = 90 / 900 = **0.10 (10%)**\n3) (참고: 민감도는 TP/(TP+FN) = 90/100 = 0.90, 정밀도는 TP/(TP+FP) = 90/180 = 0.50)",
    whyWrong: [
      "정답입니다. 특이도 = 810/900 = 0.90, FPR = 1 - 0.90 = 0.10.",
      "810을 전체 1000으로 나눈 단순 비율 오류입니다.",
      "FPR은 1-특이도이므로 0.90이 될 수 없습니다.",
      "0.50은 정밀도(TP/(TP+FP) = 90/180)의 수치입니다."
    ],
    memorizationPoint: "특이도 = TN / (TN + FP) / 위양성률(FPR) = 1 - 특이도 = FP / (TN + FP)",
    examinerTip: "💡 출제위원 꿀팁: ROC 곡선의 X축이 바로 '위양성률(1 - 특이도)'임을 묻는 개념과 계산 연계 문제입니다."
  },
  {
    id: "Q_KILLER_408",
    subject: 4,
    chapter: "분석모형 개선",
    sectionId: "s4-2",
    cardId: "c4-4",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출 킬러] K-최근접 이웃(K-NN) 모델에서 하이퍼파라미터인 이웃의 수(K)의 크기 변화에 따른 모델의 편향(Bias)과 분산(Variance) 변화에 대한 설명으로 옳은 것은?",
    choices: [
      "K값이 매우 작으면(예: K=1) 모델 복잡도가 높아져 낮은 편향(Low Bias)과 높은 분산(High Variance)을 가지며 과적합(Overfitting)된다.",
      "K값이 매우 작으면(예: K=1) 모델이 지나치게 단순해져 높은 편향(High Bias)과 낮은 분산(Low Variance)을 가지며 과소적합(Underfitting)된다.",
      "K값이 매우 커지면(예: K=N) 데이터의 국소적 노이즈에 민감하게 반응하여 높은 분산(High Variance)을 갖게 된다.",
      "K-NN 모델은 비모수 모델이므로 K값의 크기와 편향-분산 트레이드오프는 아무런 통계적 상관관계가 없다."
    ],
    answer: 0,
    explanation: "1) **K-NN에서 K값과 편향-분산 관계:**\n   - **K가 작을 때 (K=1):** 단 1개의 가장 가까운 데이터 포인트에 의해 결정 경계가 만들어지므로, 경계면이 매우 구불구불하고 복잡해집니다. 따라서 **편향은 낮고(Low Bias) 분산은 극도로 높아져(High Variance) 과적합(Overfitting)**됩니다.\n   - **K가 클 때 (K=N):** 전체 데이터의 다수결로 결정되므로 경계가 매우 단순해져 **편향은 높고(High Bias) 분산은 낮아져(Low Variance) 과소적합(Underfitting)**됩니다.",
    whyWrong: [
      "정답입니다. K=1 이면 복잡도 최대, Low Bias & High Variance (과적합).",
      "K=1 은 과소적합이 아니라 과적합입니다.",
      "K=N 이면 전체 평균으로 수렴하므로 분산이 낮아지고 편향이 커집니다.",
      "K-NN은 K값에 따라 편향-분산 트레이드오프가 극명하게 나타나는 대표 알고리즘입니다."
    ],
    memorizationPoint: "K-NN: K 작음(K=1) ➔ 복잡도 ↑, 분산 ↑, 과적합 / K 큼(K=N) ➔ 단순함, 편향 ↑, 과소적합",
    examinerTip: "💡 출제위원 함정: '의사결정나무 깊이(Depth)가 깊을 때'와 'K-NN의 K가 작을 때'가 동일하게 과적합(High Variance) 상태임을 비교하는 문제가 빈출됩니다."
  }
];

let addedMore = 0;
const existingIds2 = new Set(bank.questions.map(q => q.id));

moreKillerQuestions.forEach(q => {
  if (existingIds2.has(q.id)) {
    const idx = bank.questions.findIndex(x => x.id === q.id);
    bank.questions[idx] = q;
    console.log(`Updated question: [${q.id}]`);
  } else {
    bank.questions.push(q);
    existingIds2.add(q.id);
    addedMore++;
    console.log(`Injected question: [${q.id}]`);
  }
});

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`Successfully injected ${addedMore} additional killer questions! Total in bank: ${bank.questions.length}`);
