const q12_part2 = [
  // 3과목: 빅데이터 모델링 (41~60)
  {
    id: "Q12_41",
    subject: 3,
    chapter: "회귀분석 및 규제선형모델",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 다중 회귀분석에서 독립변수 간 다중공선성을 완화하고 과적합을 방지하기 위해 회귀계수의 제곱합(L2 페널티)을 손실함수에 추가하여 가중치를 0에 가깝게 축소하는 모델은?",
    choices: [
      "릿지 회귀 (Ridge Regression)",
      "라쏘 회귀 (Lasso Regression)",
      "엘라스틱넷 (ElasticNet)",
      "로지스틱 회귀 (Logistic Regression)"
    ],
    answer: 0,
    explanation: "릿지 회귀(Ridge)는 L2 규제($\\lambda \\sum \\beta_j^2$)를 사용하여 계수의 크기를 0에 가깝게 축소(Shrinkage)함으로써 다중공선성 문제를 완화합니다. (라쏘는 L1 규제로 계수를 정확히 0으로 만듦)",
    whyWrong: [
      "정답: L2 가중치 제곱합 페널티로 계수를 축소하는 모델은 릿지(Ridge) 회귀입니다.",
      "라쏘(Lasso) 회귀는 L1 절대값 페널티를 사용하여 불필요한 계수를 정확히 0으로 만듭니다.",
      "엘라스틱넷은 L1과 L2 규제를 결합한 모델입니다.",
      "로지스틱 회귀는 이진 분류를 위한 확률 모형입니다."
    ],
    memorizationPoint: "L2 규제 + 계수 축소 + 다중공선성 완화 ➔ 릿지 회귀 (Ridge)",
    examinerTip: "💡 12회 기출 핵심: L1 라쏘(계수 0 ➔ 변수선택 효과) vs L2 릿지(계수 축소 ➔ 다중공선성 완화)의 차이점은 매 회차 100% 출제됩니다."
  },
  {
    id: "Q12_42",
    subject: 3,
    chapter: "로지스틱 회귀분석",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 로지스틱 회귀분석에서 선형 결합의 결과인 로짓(Logit, $\\ln \\frac{p}{1-p}$)의 역함수로 사용되어 최종 예측값을 0과 1 사이의 확률값으로 변환해주는 비선형 활성화 함수는?",
    choices: [
      "시그모이드 함수 (Sigmoid / Logistic Function)",
      "ReLU 함수",
      "Softmax 함수",
      "Leaky ReLU 함수"
    ],
    answer: 0,
    explanation: "로짓 함수 $\\text{logit}(p) = \\ln \\frac{p}{1-p} = z$의 역함수는 $p = \\frac{1}{1 + e^{-z}}$ 형태의 시그모이드(Sigmoid) 함수이며, 임의의 실수 $z$를 0과 1 사이의 확률값으로 변환합니다.",
    whyWrong: [
      "정답: 로짓의 역함수이자 0~1 확률 변환 함수는 시그모이드(Sigmoid) 함수입니다.",
      "ReLU 함수는 $\\max(0, x)$로 은닉층에 주로 쓰이는 활성화 함수입니다.",
      "Softmax 함수는 다중 클래스 분류의 출력층 확률 변환 함수입니다.",
      "Leaky ReLU는 음수 영역에 작은 기울기를 주는 ReLU 변형입니다."
    ],
    memorizationPoint: "로짓의 역함수 ➔ 시그모이드 함수 $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ (0~1 확률)",
    examinerTip: "💡 12회 기출 핵심: 오즈비(Odds Ratio = $e^{\\beta_1}$)와 로짓 ➔ 시그모이드 수학적 연결 관계를 명확히 이해해두세요."
  },
  {
    id: "Q12_43",
    subject: 3,
    chapter: "서포트 벡터 머신 (SVM)",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 서포트 벡터 머신(SVM)에서 (0,0), (1,1)과 (0,1), (1,0)이 대각선으로 교차하는 XOR 형태의 비선형 데이터를 선형 초평면 하나로 분류할 수 없을 때 적용하는 기법은?",
    choices: [
      "커널 트릭 (Kernel Trick - RBF, 다항식 커널 등)",
      "단순 선형 마진 최대화 (Hard Margin)",
      "최대우도추정법 (MLE)",
      "단순 선형 보간법 (Linear Interpolation)"
    ],
    answer: 0,
    explanation: "XOR 문제와 같은 비선형 데이터는 저차원 선형 초평면으로 분리할 수 없습니다. 따라서 커널 함수(RBF, 가우시안, 다항식 등)를 이용해 데이터를 고차원 특징 공간으로 매핑하는 '커널 트릭(Kernel Trick)'을 사용합니다.",
    whyWrong: [
      "정답: 비선형 데이터 분류를 위해 고차원 매핑을 수행하는 것은 커널 트릭(Kernel Trick)입니다.",
      "하드 마진 선형 SVM은 XOR 비선형 데이터를 전혀 분리할 수 없습니다.",
      "최대우도추정법은 모수 추정 기법입니다.",
      "선형 보간법은 결측치 대체 등에 쓰이는 수치 보간 기법입니다."
    ],
    memorizationPoint: "SVM 비선형 XOR 분리 ➔ 커널 트릭 (RBF/가우시안, 다항식, 시그모이드)",
    examinerTip: "💡 12회 기출 핵심: 단순 선형 SVM은 XOR 문제를 풀 수 없으며, 방사형 기저함수(RBF) 커널과 Gamma 파라미터로 해결합니다."
  },
  {
    id: "Q12_44",
    subject: 3,
    chapter: "딥러닝 및 자연어처리",
    sectionId: "s3-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 기존의 순환 구조(RNN)를 완전히 배제하고, '셀프 어텐션(Self-Attention)' 메커니즘만을 기반으로 전체 시퀀스를 한 번에 병렬 처리하여 문맥을 파악하는 최신 딥러닝 아키텍처는?",
    choices: [
      "트랜스포머 (Transformer)",
      "순환신경망 (Simple RNN)",
      "합성곱신경망 (CNN)",
      "제한 볼츠만 머신 (RBM)"
    ],
    answer: 0,
    explanation: "트랜스포머(Transformer, Attention Is All You Need)는 RNN의 순차적 연산 한계를 극복하고, 멀티헤드 셀프 어텐션과 포지셔널 인코딩을 통해 문장 전체의 단어 간 상호 연관성을 병렬로 학습하는 모델입니다.",
    whyWrong: [
      "정답: RNN 없이 어텐션만으로 시퀀스를 병렬 처리하는 아키텍처는 트랜스포머입니다.",
      "Simple RNN은 순차적(Step-by-step)으로 연산하여 장기의존성 문제와 병렬 처리 불가 한계가 있습니다.",
      "CNN은 이미지 격자 구조의 국소 특징을 추출하는 신경망입니다.",
      "RBM은 비지도 학습 기반의 에너지 모델입니다."
    ],
    memorizationPoint: "RNN 대체 + 셀프 어텐션(Self-Attention) 병렬 처리 ➔ 트랜스포머 (Transformer)",
    examinerTip: "💡 12회 기출 핵심: BERT, GPT의 근간이 되는 트랜스포머 모델의 '어텐션 병렬 처리' 특성이 최신 기출로 출제되었습니다."
  },
  {
    id: "Q12_45",
    subject: 3,
    chapter: "딥러닝 아키텍처",
    sectionId: "s3-4",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 텍스트 문장, 음성 신호, 주가 시계열처럼 시간에 따른 순서(Time Step)와 순차적 문맥이 중요한 시퀀스(Sequence) 데이터를 처리하기 위해 은닉 상태(Hidden State)를 순환 연결하는 인공신경망 구조는?",
    choices: [
      "순환신경망 (RNN, Recurrent Neural Network)",
      "합성곱신경망 (CNN)",
      "다층 퍼셉트론 (MLP)",
      "생성적 적대 신경망 (GAN)"
    ],
    answer: 0,
    explanation: "RNN(순환신경망)은 이전 시점($t-1$)의 은닉 상태를 현재 시점($t$)의 입력과 함께 순환적으로 전달받아 순서가 있는 시계열/시퀀스 데이터를 효과적으로 학습합니다.",
    whyWrong: [
      "정답: 순차적 시계열/텍스트 데이터 처리에 특화된 구조는 RNN입니다.",
      "CNN은 2차원 공간 이미지 처리에 특화되어 있습니다.",
      "MLP는 단순 피드포워드 완전연결 신경망입니다.",
      "GAN은 생성자와 판별자가 경쟁하며 진짜 같은 가짜 데이터를 만드는 생성 모델입니다."
    ],
    memorizationPoint: "시간 순서/시퀀스 데이터 처리 ➔ RNN (순환신경망)",
    examinerTip: "💡 12회 기출 핵심: 공간 데이터 ➔ CNN, 시계열/순차 데이터 ➔ RNN/LSTM/Transformer 매칭 문제입니다."
  },
  {
    id: "Q12_46",
    subject: 3,
    chapter: "딥러닝 및 어텐션",
    sectionId: "s3-4",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 인코더-디코더 신경망에서 디코더가 특정 출력 단어를 예측할 때, 입력 문장의 모든 단어 중 '현재 예측에 가장 연관성이 높은 단어'에 더 큰 가중치를 부여하여 집중하는 메커니즘은?",
    choices: [
      "어텐션 (Attention) 메커니즘",
      "드롭아웃 (Dropout)",
      "배치 정규화 (Batch Normalization)",
      "풀링 (Pooling)"
    ],
    answer: 0,
    explanation: "어텐션(Attention) 메커니즘은 입력 시퀀스의 모든 정보를 단일 고정 벡터로 압축할 때 발생하는 정보 손실(병목 현상)을 방지하고, 디코더가 출력 시 매번 입력의 중요한 부분에 소프트맥스 가중치로 집중하게 만듭니다.",
    whyWrong: [
      "정답: 연관성 높은 입력 요소에 동적으로 가중치를 부여하는 기술은 어텐션입니다.",
      "드롭아웃은 과적합 방지를 위해 무작위로 뉴런을 비활성화하는 규제 기법입니다.",
      "배치 정규화는 학습 속도 향상과 기울기 소실 방지를 위해 미니배치별로 정규화하는 기법입니다.",
      "풀링은 CNN에서 특징 맵의 공간 해상도를 축소하는 연산입니다."
    ],
    memorizationPoint: "가장 연관성 높은 입력 단어에 가중치 집중 ➔ 어텐션 (Attention)",
    examinerTip: "💡 12회 기출 핵심: Seq2Seq의 병목 현상을 해결하고 딥러닝 자연어처리를 혁신한 어텐션의 원리를 묻는 문제입니다."
  },
  {
    id: "Q12_47",
    subject: 3,
    chapter: "분류 알고리즘 (나이브베이즈)",
    sectionId: "s3-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 베이즈 정리를 기반으로 하며, '모든 설명변수(Feature)들이 주어진 타깃 클래스 조건 하에서 서로 완전히 독립이다'라는 매우 강한 가정을 바탕으로 사후확률을 계산하는 분류기는?",
    choices: [
      "나이브 베이즈 분류기 (Naive Bayes Classifier)",
      "의사결정나무 (Decision Tree)",
      "랜덤 포레스트 (Random Forest)",
      "서포트 벡터 머신 (SVM)"
    ],
    answer: 0,
    explanation: "나이브 베이즈(Naive Bayes)는 설명변수들 간의 '조건부 독립(Conditional Independence)'이라는 순진한(Naive) 가정을 적용하여 $P(X_1, X_2|Y) = P(X_1|Y)P(X_2|Y)$로 곱연산하여 확률을 계산하는 분류기입니다.",
    whyWrong: [
      "정답: 변수 간 조건부 독립 가정을 전제하는 분류기는 나이브 베이즈입니다.",
      "의사결정나무는 변수 간 상호작용을 분할 규칙으로 파악합니다.",
      "랜덤 포레스트는 배깅 기반의 앙상블 모델입니다.",
      "SVM은 결정 경계(초평면) 마진을 최대화하는 모델입니다."
    ],
    memorizationPoint: "모든 독립변수 조건부 독립 가정 ➔ 나이브 베이즈 (Naive Bayes)",
    examinerTip: "💡 12회 기출 핵심: 스팸 메일 필터링과 텍스트 분류에 강하며, 변수 간 상관관계를 무시한다는 가정이 핵심 함정 포인트입니다."
  },
  {
    id: "Q12_48",
    subject: 3,
    chapter: "앙상블 학습 (Ensemble)",
    sectionId: "s3-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 앙상블 기법 중 배깅(Bagging)과 부스팅(Boosting)의 핵심적인 학습 방식 차이를 올바르게 설명한 것은?",
    choices: [
      "배깅은 여러 모델을 독립적으로 '병렬(Parallel)' 학습시켜 분산(Variance)을 줄이고, 부스팅은 이전 모델의 오차에 가중치를 두어 '순차적(Sequential)'으로 학습시켜 편향(Bias)을 줄인다.",
      "배깅은 순차 학습만 가능하고, 부스팅은 완전 병렬 학습만 가능하다.",
      "배깅은 편향을 주로 줄이고, 부스팅은 분산만을 줄인다.",
      "배깅은 트리 모델을 사용할 수 없고 부스팅만 트리 모델을 사용한다."
    ],
    answer: 0,
    explanation: "배깅(랜덤포레스트 등)은 복원추출(Bootstrap) 데이터로 여러 모델을 병렬 학습해 예측 분산(Variance)을 줄입니다. 부스팅(XGBoost, LightGBM 등)은 앞 모델이 틀린 오답에 가중치를 부여해 순차 학습하며 모델 편향(Bias)을 줄입니다.",
    whyWrong: [
      "정답: 배깅=병렬학습/분산감소, 부스팅=오차가중치 순차학습/편향감소입니다.",
      "학습 방식이 정반대로 설명되었습니다.",
      "배깅이 분산 감소, 부스팅이 편향 감소를 주 목적으로 합니다.",
      "두 기법 모두 의사결정나무(Decision Tree)를 기본 학습기로 널리 사용합니다."
    ],
    memorizationPoint: "배깅=병렬(Bootstrap)+분산감소, 부스팅=순차(오차가중치)+편향감소",
    examinerTip: "💡 12회 기출 핵심: 앙상블 2대 산맥인 배깅과 부스팅의 병렬/순차 및 분산/편향 대조는 3과목 필출 문제입니다."
  },
  {
    id: "Q12_49",
    subject: 3,
    chapter: "앙상블 학습 (Ensemble)",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 서로 다른 여러 개별 모델(SVM, 랜덤포레스트, XGBoost 등)이 출력한 예측 결과들을 새로운 훈련 데이터의 입력 특성(Feature)으로 사용하여, 최종 메타 모델(Meta Model)이 결합 예측을 수행하는 앙상블 기법은?",
    choices: [
      "스태킹 (Stacking)",
      "보팅 (Voting)",
      "배깅 (Bagging)",
      "드롭아웃 (Dropout)"
    ],
    answer: 0,
    explanation: "스태킹(Stacking, Stacked Generalization)은 Base 모델들의 예측값들을 메타 특성으로 쌓아서(Stack) 상위의 메타 모델(Meta Learner, 보통 로지스틱 회귀 등)을 훈련시켜 최종 결과를 도출하는 앙상블 기법입니다.",
    whyWrong: [
      "정답: 개별 모델의 예측값을 메타 모델의 입력으로 쓰는 앙상블은 스태킹(Stacking)입니다.",
      "보팅은 개별 모델의 예측 결과에 대해 다수결 투표(하드)나 확률 평균(소프트)을 적용하는 방식입니다.",
      "배깅은 동일한 알고리즘을 부트스트랩 샘플에 병렬 적용하는 방식입니다.",
      "드롭아웃은 딥러닝 과적합 방지 기법입니다."
    ],
    memorizationPoint: "개별 모델 예측값 ➔ 메타 모델(Meta-learner) 입력 학습 ➔ 스태킹 (Stacking)",
    examinerTip: "💡 12회 기출 핵심: 보팅(단순 투표/평균), 배깅(병렬 복원추출), 부스팅(순차 가중치), 스태킹(메타 모델 결합) 4대 앙상블을 구분하세요."
  },
  {
    id: "Q12_50",
    subject: 3,
    chapter: "은닉 마르코프 모델 (HMM)",
    sectionId: "s3-4",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 관측 가능한 시퀀스 데이터 이면에 존재하는 '보이지 않는 숨겨진 상태(Hidden State)'들의 전이 확률을 마르코프 체인으로 모델링하고, 가장 가능성 높은 은닉 상태 경로를 찾기 위해 비터비(Viterbi) 알고리즘을 사용하는 모델은?",
    choices: [
      "은닉 마르코프 모델 (HMM, Hidden Markov Model)",
      "주성분 분석 (PCA)",
      "K-평균 군집화 (K-means)",
      "DBSCAN"
    ],
    answer: 0,
    explanation: "HMM(은닉 마르코프 모델)은 은닉 상태 간 전이확률과 은닉 상태에서 관측값 생성확률을 갖는 확률 모델로, 음성인식, 품사 태깅 등에서 최적의 은닉 상태 경로를 찾기 위해 비터비(Viterbi) 알고리즘을 사용합니다.",
    whyWrong: [
      "정답: 숨겨진 상태 확률 추론 및 비터비 알고리즘 기반 모델은 은닉 마르코프 모델(HMM)입니다.",
      "PCA는 선형 차원 축소 기법입니다.",
      "K-means는 거리 기반의 비지도 군집화 알고리즘입니다.",
      "DBSCAN은 밀도 기반 군집화 알고리즘입니다."
    ],
    memorizationPoint: "숨겨진 상태(Hidden State) + 비터비(Viterbi) 알고리즘 ➔ 은닉 마르코프 모델 (HMM)",
    examinerTip: "💡 12회 기출 핵심: HMM의 3대 문제(평가-Forward, 디코딩-Viterbi, 학습-Baum-Welch) 중 디코딩 알고리즘인 비터비가 출제되었습니다."
  },
  {
    id: "Q12_51",
    subject: 3,
    chapter: "앙상블 (랜덤포레스트)",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 랜덤 포레스트(Random Forest) 모델의 하이퍼파라미터 중 의사결정나무의 개수(n_estimators)에 대한 설명으로 가장 옳은 것은?",
    choices: [
      "나무의 개수를 무조건 무한정 늘린다고 해서 모델의 성능이 계속 향상되거나 과적합이 완벽히 방지되는 것은 아니며, 일정 수준 이상에서는 성능이 수렴하고 계산 비용만 증가한다.",
      "나무 개수가 10개 미만일 때 가장 높은 일반화 성능을 보인다.",
      "나무 개수를 늘리면 항상 심각한 과적합(Overfitting)이 발생한다.",
      "나무의 개수는 데이터의 행(Row) 개수보다 항상 많아야 한다."
    ],
    answer: 0,
    explanation: "랜덤 포레스트는 배깅 특성상 나무 개수(n_estimators)가 증가해도 모델 분산이 수렴하여 과적합 위험이 적지만, 일정 임계점 이후에는 성능 향상이 미미하고 연산 시간만 크게 증가합니다.",
    whyWrong: [
      "정답: 나무 개수를 무한정 늘린다고 성능이 계속 좋아지지 않으며 한계 효용이 수렴합니다.",
      "너무 적은 나무 개수는 앙상블의 분산 감소 효과를 얻지 못합니다.",
      "배깅 구조이므로 나무를 늘린다고 해서 단일 트리처럼 과적합되지 않습니다.",
      "나무 개수와 데이터 행 개수 사이에는 그러한 제약이 없습니다."
    ],
    memorizationPoint: "랜덤포레스트 트리 개수 ➔ 일정 수준 이상 증가 시 성능 수렴 및 연산 비용 증가",
    examinerTip: "💡 12회 기출 핵심: 하이퍼파라미터 튜닝 시 트리 개수 증가가 무조건적인 성능 보장을 의미하지 않는다는 실무적 통찰을 묻는 문제입니다."
  },
  {
    id: "Q12_52",
    subject: 3,
    chapter: "하이퍼파라미터 튜닝",
    sectionId: "s3-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 사용자가 설정한 하이퍼파라미터 후보군들의 모든 가능한 조합을 격자망 형태로 전수 탐색하여 최적의 파라미터를 찾는 방식은?",
    choices: [
      "그리드 서치 (Grid Search)",
      "랜덤 서치 (Random Search)",
      "베이지안 최적화 (Bayesian Optimization)",
      "유전 알고리즘 (Genetic Algorithm)"
    ],
    answer: 0,
    explanation: "그리드 서치(Grid Search)는 사전에 지정한 하이퍼파라미터 값들의 모든 조합을 순차적으로 교차 검증하여 최상의 성능을 내는 조합을 탐색하는 전수 조사 기법입니다.",
    whyWrong: [
      "정답: 모든 가능한 조합을 격자 형태로 전수 탐색하는 방식은 그리드 서치(Grid Search)입니다.",
      "랜덤 서치는 지정된 확률 분포에서 무작위로 파라미터를 표본 추출하여 탐색합니다.",
      "베이지안 최적화는 이전 탐색 결과의 확률 모델(가우시안 프로세스)을 바탕으로 다음 후보를 똑똑하게 탐색합니다.",
      "유전 알고리즘은 생물학적 진화 원리를 모방한 탐색 기법입니다."
    ],
    memorizationPoint: "모든 파라미터 조합 전수 격자 탐색 ➔ 그리드 서치 (Grid Search)",
    examinerTip: "💡 12회 기출 핵심: 그리드 서치(전수 격자), 랜덤 서치(무작위 표본), 베이지안 최적화(이전 결과 반영) 3대 튜닝 기법을 비교하세요."
  },
  {
    id: "Q12_53",
    subject: 3,
    chapter: "회귀모형 가정 진단",
    sectionId: "s3-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 선형 회귀분석의 기본 가정 중 '잔차의 등분산성(Homoscedasticity)'을 만족하는 잔차 산점도(Residual Plot)의 이상적인 패턴은?",
    choices: [
      "잔차들이 중심선 0을 기준으로 예측값의 크기에 상관없이 특정 경향성 없이 무작위로 균등하게 흩어져 있는 형태",
      "예측값이 커질수록 잔차의 폭이 나팔 모양(Funnel)으로 점점 넓어지는 형태",
      "잔차들이 2차 포물선 형태의 뚜렷한 곡선 궤적을 그리는 형태",
      "잔차들이 시간 순서에 따라 양의 기울기로 일정한 주기적 파동을 그리는 형태"
    ],
    answer: 0,
    explanation: "적합한 선형 회귀모형의 잔차 플롯은 예측값($\\hat{Y}$)의 변화에 상관없이 잔차가 0을 중심으로 일정한 대역폭 내에 무작위(Random)로 고르게 분포해야 등분산성을 만족합니다.",
    whyWrong: [
      "정답: 잔차가 0을 중심으로 특정 패턴 없이 무작위로 고르게 분포해야 합니다.",
      "나팔 모양으로 퍼지는 형태는 '이분산성(Heteroscedasticity)'이 존재하는 대표적 패턴입니다.",
      "포물선 곡선 형태는 '선형성(Linearity)' 가정이 위배된 경우입니다.",
      "주기적 파동이나 추세는 '독립성(자기상관)' 가정이 위배된 경우입니다."
    ],
    memorizationPoint: "잔차 등분산성 플롯 ➔ 0 기준 무작위(Random) 균일 밴드 형태",
    examinerTip: "💡 12회 기출 핵심: 잔차 분석 4대 플롯(선형성, 등분산성, 정규성 Q-Q 플롯, 더빈-왓슨 독립성) 해석은 단골 기출입니다."
  },
  {
    id: "Q12_54",
    subject: 3,
    chapter: "차원의 저주",
    sectionId: "s3-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 머신러닝에서 입력 변수(특징, 차원)의 수가 지나치게 많아질수록 공간의 부피가 기하급수적으로 증가하여 데이터 밀도가 희소(Sparse)해지고 모델의 예측 성능이 급격히 저하되는 현상은?",
    choices: [
      "차원의 저주 (Curse of Dimensionality)",
      "다중공선성 (Multicollinearity)",
      "기울기 소실 (Vanishing Gradient)",
      "과소적합 (Underfitting)"
    ],
    answer: 0,
    explanation: "차원의 저주(Curse of Dimensionality)는 차원 수($D$)가 증가함에 따라 공간의 크기가 지수적으로 팽창하여 빈 공간(희소성)이 많아지고, 모델 학습에 필요한 데이터 수가 기하급수적으로 요구되는 현상입니다.",
    whyWrong: [
      "정답: 차원 증가로 인한 공간 희소화 및 성능 저하는 차원의 저주입니다.",
      "다중공선성은 독립변수 간 강한 상관관계로 계수 추정이 불안정해지는 현상입니다.",
      "기울기 소실은 딥러닝 역전파 시 기울기가 0에 수렴하는 현상입니다.",
      "과소적합은 모델이 너무 단순하여 데이터의 패턴을 학습하지 못한 상태입니다."
    ],
    memorizationPoint: "변수/차원 과다 ➔ 공간 희소화 및 성능 저하 ➔ 차원의 저주",
    examinerTip: "💡 12회 기출 핵심: 차원의 저주 해결 방안으로 차원 축소(PCA, LDA, t-SNE)와 변수 선택(L1 Lasso 등)이 연계되어 출제됩니다."
  },
  {
    id: "Q12_55",
    subject: 3,
    chapter: "유사도 및 특징 인코딩",
    sectionId: "s3-2",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 수많은 범주형 변수를 원핫 인코딩(One-Hot Encoding)하여 고차원 희소 벡터(Sparse Vector)로 변환했을 때 발생하는 현상으로 가장 옳은 것은?",
    choices: [
      "생성된 원핫 벡터들은 서로 다른 위치에만 1을 가지므로 벡터 간 내적(Dot Product)이 0이 되어 서로 직교(Orthogonal)하며, 코사인 유사도로 단어/항목 간의 의미적 관계를 측정하기 어렵다.",
      "원핫 인코딩 벡터 간의 코사인 유사도는 항상 1이 된다.",
      "원핫 인코딩을 수행하면 차원의 크기가 1차원으로 압축된다.",
      "항목 간의 의미적 유사성(유의어 관계)이 자동으로 벡터 거리에 반영된다."
    ],
    answer: 0,
    explanation: "원핫 인코딩된 벡터들은 서로 다른 인덱스만 1이고 나머지는 0이므로 내적이 0(즉, $90^\\circ$ 직교)입니다. 따라서 모든 항목 간 코사인 유사도가 0이 되어 항목 간 의미적/맥락적 유사성을 파악할 수 없습니다. (이를 해결하기 위해 임베딩 Word2Vec 사용)",
    whyWrong: [
      "정답: 원핫 벡터들은 서로 직교하여 내적이 0이 되므로 코사인 유사도 측정이 어렵습니다.",
      "서로 다른 원핫 벡터의 코사인 유사도는 0입니다.",
      "범주 개수($N$)만큼 차원이 급격히 확장됩니다.",
      "원핫 인코딩은 의미적 유사도를 전혀 표현하지 못합니다."
    ],
    memorizationPoint: "원핫 인코딩 ➔ 벡터 간 내적 0 (직교, Orthogonal) ➔ 유사도 측정 불가",
    examinerTip: "💡 12회 기출 핵심: 원핫 인코딩의 한계(차원 폭발, 직교성, 의미 상실)와 단어 임베딩(Word Embedding)의 필요성을 묻는 문제입니다."
  },
  {
    id: "Q12_56",
    subject: 3,
    chapter: "특징 공학 (Feature Engineering)",
    sectionId: "s3-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 기존 수집된 변수들을 수학적/논리적으로 결합하여(예: '매출액 / 방문자수 = 객단가', '키와 몸무게로 BMI 지수 산출') 모델의 예측력을 높이는 새로운 변수를 무엇이라 하는가?",
    choices: [
      "파생 변수 (Derived Variable)",
      "요약 변수 (Summary Variable)",
      "더미 변수 (Dummy Variable)",
      "통제 변수 (Control Variable)"
    ],
    answer: 0,
    explanation: "파생 변수(Derived Variable)는 사용자가 분석 목적이나 도메인 지식에 따라 기존 변수들을 결합, 연산, 조건화하여 새롭게 정의한 변수입니다.",
    whyWrong: [
      "정답: 기존 변수들의 결합/연산으로 생성한 새로운 변수는 파생 변수입니다.",
      "요약 변수는 기간별 합계, 평균, 횟수 등 집계 연산으로 요약한 변수입니다.",
      "더미 변수는 범주형 변수를 0과 1로 수치 변환한 변수입니다.",
      "통제 변수는 실험에서 효과를 일정하게 유지하기 위해 통제하는 변수입니다."
    ],
    memorizationPoint: "도메인 지식 결합 새로운 속성 생성 ➔ 파생 변수 (Derived Variable)",
    examinerTip: "💡 12회 기출 핵심: 파생 변수(주관적 조건/수식 결합) vs 요약 변수(기간별/그룹별 집계 요약)의 차이를 묻는 문제가 빈출됩니다."
  },
  {
    id: "Q12_57",
    subject: 3,
    chapter: "데이터 전처리 및 스케일링",
    sectionId: "s3-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 오른쪽으로 꼬리가 길게 늘어진 양의 왜도(Right-skewed)를 가진 데이터에 적용하여 큰 값들의 간격을 좁히고 정규분포 형태로 변환하기에 가장 적합한 변환법은?",
    choices: [
      "로그 변환 (Log Transformation)",
      "지수 변환 (Exponential Transformation)",
      "제곱 변환 ($X^2$)",
      "Min-Max 정규화"
    ],
    answer: 0,
    explanation: "오른쪽 꼬리가 긴 비대칭 데이터(소득, 자산 등)는 큰 값에 대해 로그($\\ln X$)를 취하면 큰 값들이 압축되어 분포가 좌우 대칭인 정규분포에 가깝게 변환됩니다.",
    whyWrong: [
      "정답: 오른쪽 꼬리가 긴 데이터의 왜도 완화 변환은 로그 변환입니다.",
      "지수 변환이나 제곱 변환은 큰 값을 더 극단적으로 키워 왜도를 더 악화시킵니다.",
      "Min-Max는 0~1 스케일링일 뿐 왜도 형태를 바꾸지 못합니다."
    ],
    memorizationPoint: "오른쪽 꼬리 긴 데이터(양의 왜도) 완화 ➔ 로그 변환 (Log / Box-Cox)",
    examinerTip: "💡 12회 기출 핵심: 우측 꼬리(양의 왜도) ➔ $\\log X, \\sqrt{X}, 1/X$, 좌측 꼬리(음의 왜도) ➔ $X^2, X^3$ 변환 방향을 기억하세요."
  },
  {
    id: "Q12_58",
    subject: 3,
    chapter: "모델 검증 (교차검증)",
    sectionId: "s3-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 전체 데이터셋을 훈련용(Train, 예: 70%)과 평가용(Test, 예: 30%)으로 단 한 번 무작위 분할하여 모델을 학습하고 검증하는 가장 단순한 교차 검증 기법은?",
    choices: [
      "홀드아웃 교차 검증 (Holdout Validation)",
      "K-Fold 교차 검증",
      "LOOCV (Leave-One-Out Cross Validation)",
      "계층별 K-Fold (Stratified K-Fold)"
    ],
    answer: 0,
    explanation: "홀드아웃(Holdout) 검증은 데이터를 훈련 세트와 테스트 세트로 1회 단순 분할하여 평가하는 방식으로, 계산이 빠르지만 데이터 분할 방식에 따라 성능 평가가 불안정할 수 있습니다.",
    whyWrong: [
      "정답: 단 1회 단순 분할하는 검증 기법은 홀드아웃(Holdout)입니다.",
      "K-Fold는 데이터를 K개로 쪼개어 K번 반복 검증합니다.",
      "LOOCV는 단 1개의 샘플만 검증용으로 남기고 $N$번 반복 검증합니다.",
      "계층별 K-Fold는 타깃 클래스 비율을 유지하며 K번 분할 검증합니다."
    ],
    memorizationPoint: "단 1회 Train/Test 무작위 분할 ➔ 홀드아웃 (Holdout) 검증",
    examinerTip: "💡 12회 기출 핵심: 데이터가 충분히 클 때는 홀드아웃을 쓰지만, 소량 데이터에서는 K-Fold 교차검증이 필수적입니다."
  },
  {
    id: "Q12_59",
    subject: 3,
    chapter: "모델 검증 및 하이퍼파라미터",
    sectionId: "s3-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 5-Fold 교차 검증(K=5) 환경에서 그리드 서치를 통해 2개의 하이퍼파라미터 조합(A 파라미터 3가지, B 파라미터 2가지)을 최적화하고자 한다. 이 때 모델이 학습되고 평가되는 총 반복 실행 횟수는?",
    choices: [
      "30회",
      "6회",
      "5회",
      "60회"
    ],
    answer: 0,
    explanation: "총 파라미터 조합 수 = $3 \\times 2 = 6$개 조합. 각 조합마다 5-Fold 교차 검증이 수행되므로, 총 훈련 및 평가 횟수는 $6 \\times 5 = 30$회입니다.",
    whyWrong: [
      "정답: $3 \\times 2 \\times 5 = 30$회입니다.",
      "6회는 K-Fold를 고려하지 않은 단일 파라미터 조합 수입니다.",
      "5회는 단순 5-Fold 1개 조합 횟수입니다.",
      "60회는 계산 오답입니다."
    ],
    memorizationPoint: "총 실행 횟수 = (파라미터 조합 수) $\\times$ (K-Fold의 K값)",
    examinerTip: "💡 12회 기출 핵심: 그리드 서치와 K-Fold의 곱셈 법칙을 묻는 산수 계산 문제입니다."
  },
  {
    id: "Q12_60",
    subject: 3,
    chapter: "다변량 통계분석",
    sectionId: "s3-1",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 여러 개의 독립변수(집단 구분)가 '두 개 이상의 연속형 종속변수들'에 미치는 영향을 동시에 검정하여, 다중 종속변수 간의 상관성을 고려하는 다변량 통계 기법은?",
    choices: [
      "다변량 분산분석 (MANOVA, Multivariate Analysis of Variance)",
      "일원배치 분산분석 (One-way ANOVA)",
      "이원배치 분산분석 (Two-way ANOVA)",
      "단순 선형 회귀분석"
    ],
    answer: 0,
    explanation: "MANOVA(다변량 분산분석)는 종속변수가 2개 이상일 때 종속변수 간의 상관성을 반영하여 집단 간 평균 벡터의 차이를 검정하는 다변량 기법입니다.",
    whyWrong: [
      "정답: 2개 이상의 연속형 종속변수를 동시에 분석하는 기법은 MANOVA입니다.",
      "일원배치 ANOVA는 독립변수 1개, 종속변수 1개(단변량)일 때 사용합니다.",
      "이원배치 ANOVA는 독립변수 2개, 종속변수 1개(단변량)일 때 사용합니다.",
      "단순 선형 회귀는 단일 독립변수와 단일 종속변수의 선형 관계 모형입니다."
    ],
    memorizationPoint: "다중 종속변수($Y_1, Y_2$) 동시 평균 벡터 검정 ➔ MANOVA (다변량 분산분석)",
    examinerTip: "💡 12회 기출 핵심: ANOVA(종속변수 1개) vs MANOVA(종속변수 2개 이상)의 차이점을 기억하세요."
  },

  // 4과목: 빅데이터 결과 해석 (61~80)
  {
    id: "Q12_61",
    subject: 4,
    chapter: "분류 모델 평가지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 이진 분류 모델의 평가 결과 정밀도(Precision)가 0.8이고 재현율(Recall)이 0.8로 산출되었다. 이 모델의 F1-Score 값은?",
    choices: [
      "0.80",
      "0.64",
      "1.60",
      "0.40"
    ],
    answer: 0,
    explanation: "F1-Score는 정밀도($P$)와 재현율($R$)의 조화평균으로, $F_1 = \\frac{2 \\times P \\times R}{P + R} = \\frac{2 \\times 0.8 \\times 0.8}{0.8 + 0.8} = \\frac{1.28}{1.6} = 0.80$입니다. (정밀도와 재현율이 같으면 F1도 그 값과 동일)",
    whyWrong: [
      "정답: $F_1 = \\frac{2 \\times 0.8 \\times 0.8}{0.8 + 0.8} = 0.80$입니다.",
      "0.64는 $P \\times R$ 단순 곱셈값입니다.",
      "1.60은 $P + R$ 단순 덧셈값입니다.",
      "0.40은 계산 오답입니다."
    ],
    memorizationPoint: "F1-Score 공식: $F_1 = \\frac{2 \\times Precision \\times Recall}{Precision + Recall}$",
    examinerTip: "💡 12회 기출 핵심: 12회 시험에서 정밀도와 재현율이 0.8일 때 F1-Score 0.80 도출 계산이 출제되었습니다."
  },
  {
    id: "Q12_62",
    subject: 4,
    chapter: "불균형 데이터 평가",
    sectionId: "s4-1",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 암 진단이나 금융 사기 탐지처럼 소수 클래스(양성)를 놓치는 거짓 음성(FN)의 비용이 치명적이어서, 정밀도(Precision)보다 '재현율(Recall)'에 2배의 가중치를 두어 평가해야 할 때 적합한 평가지표는?",
    choices: [
      "$F_2$-Score (F-beta with $\\beta=2$)",
      "$F_{0.5}$-Score (F-beta with $\\beta=0.5$)",
      "$F_1$-Score",
      "정확도 (Accuracy)"
    ],
    answer: 0,
    explanation: "$F_\\beta$ 지표에서 $\\beta$는 재현율에 부여하는 가중치입니다. $\\beta=2$인 $F_2$-Score는 재현율(Recall)을 정밀도보다 2배 더 중요하게 평가합니다. (반대로 정밀도를 2배 중시하면 $F_{0.5}$)",
    whyWrong: [
      "정답: 재현율(Recall)에 2배 가중치를 부여하는 지표는 $F_2$-Score입니다.",
      "$F_{0.5}$-Score는 정밀도(Precision)를 재현율보다 2배 더 중시할 때 사용합니다.",
      "$F_1$-Score는 정밀도와 재현율에 1:1 동등한 가중치를 부여합니다.",
      "정확도는 클래스 불균형 시 소수 클래스를 전혀 평가하지 못합니다."
    ],
    memorizationPoint: "재현율(Recall, 암진단) 중시 ➔ $F_2$-Score, 정밀도(Precision, 스팸) 중시 ➔ $F_{0.5}$-Score",
    examinerTip: "💡 12회 기출 핵심: $F_\\beta = (1+\\beta^2) \\frac{P \\times R}{\\beta^2 P + R}$에서 $\\beta > 1$이면 Recall 중시, $\\beta < 1$이면 Precision 중시 원리를 기억하세요."
  },
  {
    id: "Q12_63",
    subject: 4,
    chapter: "회귀 모델 평가지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 2개의 테스트 샘플에 대해 실제값이 $[1.0, 2.0]$이고 모델의 예측값이 $[0.8, 2.0]$일 때, 평균제곱오차(MSE)의 계산 결과값은?",
    choices: [
      "0.02",
      "0.04",
      "0.10",
      "0.20"
    ],
    answer: 0,
    explanation: "첫 번째 오차 $e_1 = 1.0 - 0.8 = 0.2 \\Rightarrow e_1^2 = 0.04$. 두 번째 오차 $e_2 = 2.0 - 2.0 = 0.0 \\Rightarrow e_2^2 = 0$. 평균제곱오차 $MSE = \\frac{0.04 + 0.0}{2} = 0.02$입니다.",
    whyWrong: [
      "정답: $MSE = \\frac{(0.2)^2 + (0)^2}{2} = \\frac{0.04}{2} = 0.02$입니다.",
      "0.04는 오차 제곱의 합(SSE)이며 2로 나누지 않은 값입니다.",
      "0.10은 평균절대오차(MAE = 0.2/2)입니다.",
      "0.20은 단순 오차 합계입니다."
    ],
    memorizationPoint: "MSE = 오차 제곱합 / 표본수 $N$ (예: $0.04 / 2 = 0.02$)",
    examinerTip: "💡 12회 기출 핵심: 12회 시험에 출제된 실제 MSE 수치 계산(오차 0.2 ➔ 제곱 0.04 ➔ 평균 0.02) 문제입니다."
  },
  {
    id: "Q12_64",
    subject: 4,
    chapter: "분류 모델 시각화 (ROC-AUC)",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] ROC(Receiver Operating Characteristic) 곡선에 대한 설명으로 가장 옳은 것은?",
    choices: [
      "분류 모델에서 단 하나의 고정된 임계값이 아니라, 분류 임계값(Threshold, 0~1)의 연속적인 변화에 따른 거짓 양성률(1-특이도, FPR)과 참 양성률(재현율, TPR)의 성능 궤적을 나타낸 곡선이다.",
      "ROC 곡선의 가로축(X축)은 재현율(TPR)이고 세로축(Y축)은 특이도이다.",
      "완전 무작위(Random) 분류 모델의 ROC-AUC 면적은 1.0이다.",
      "곡선이 우측 하단으로 갈수록 우수한 모델이다."
    ],
    answer: 0,
    explanation: "ROC 곡선은 임계값(Threshold)을 1에서 0으로 점진적으로 낮추면서 변화하는 $X$축: FPR(1-특이도)과 $Y$축: TPR(재현율)의 궤적을 그린 곡선입니다.",
    whyWrong: [
      "정답: 임계값의 변화에 따른 민감도(TPR)와 1-특이도(FPR)의 성능 추이를 나타냅니다.",
      "X축이 FPR(1-특이도)이고 Y축이 TPR(재현율/민감도)입니다.",
      "무작위 동전 던지기 모델의 AUC는 0.5이며, 완벽한 모델이 1.0입니다.",
      "곡선이 좌측 상단(0, 1)에 가까울수록 우수한 모델입니다."
    ],
    memorizationPoint: "ROC 곡선: X축=FPR(1-특이도), Y축=TPR(재현율), 임계값 변화 궤적",
    examinerTip: "💡 12회 기출 핵심: '하나의 고정된 임계값'이 아니라 '임계값의 전 범위 변화에 따른 성능'이라는 본질적 정의가 출제되었습니다."
  },
  {
    id: "Q12_65",
    subject: 4,
    chapter: "시계열 모형 진단",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 시계열 데이터에서 시간의 흐름에 따라 현재 시점의 관측값($Y_t$)이 과거 시점의 관측값($Y_{t-k}$)과 밀접한 선형적 연관성을 가지는 성질을 무엇이라 하는가?",
    choices: [
      "자기상관성 (Autocorrelation)",
      "다중공선성 (Multicollinearity)",
      "이분산성 (Heteroscedasticity)",
      "정규성 (Normality)"
    ],
    answer: 0,
    explanation: "자기상관성(Autocorrelation, 계열상관)은 동일한 시계열 변수 내에서 서로 다른 시점 간의 관측치들이 상관관계를 갖는 성질이며, 더빈-왓슨(Durbin-Watson) 통계량이나 자기상관함수(ACF)로 진단합니다.",
    whyWrong: [
      "정답: 시계열에서 현재값과 과거값 간의 상관성은 자기상관성(Autocorrelation)입니다.",
      "다중공선성은 다중회귀에서 서로 다른 독립변수 간의 강한 선형관계입니다.",
      "이분산성은 잔차의 분산이 일정하지 않은 상태입니다.",
      "정규성은 오차가 정규분포를 따르는 성질입니다."
    ],
    memorizationPoint: "시계열 현재값과 과거값 간 상관 ➔ 자기상관성 (Autocorrelation)",
    examinerTip: "💡 12회 기출 핵심: 더빈-왓슨 통계량 $d \\approx 2$이면 자기상관 없음, $d < 2$이면 양의 자기상관, $d > 2$이면 음의 자기상관입니다."
  },
  {
    id: "Q12_66",
    subject: 4,
    chapter: "회귀모형 진단 (다중공선성)",
    sectionId: "s4-2",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 다중 회귀분석에서 독립변수들 간에 강한 선형 상관관계가 존재하여 회귀계수의 분산이 비정상적으로 커지고 계수 추정의 신뢰성을 떨어뜨리는 문제는?",
    choices: [
      "다중공선성 (Multicollinearity)",
      "과소적합 (Underfitting)",
      "자기상관성 (Autocorrelation)",
      "이상치 편향 (Outlier Bias)"
    ],
    answer: 0,
    explanation: "다중공선성(Multicollinearity)은 독립변수들끼리 높은 상관관계를 보여 모델의 설명력($R^2$)은 높지만 개별 회귀계수의 t-검정 p-value가 유의하지 않게 나오는 대표적인 회귀 진단 문제입니다.",
    whyWrong: [
      "정답: 독립변수 간 강한 상관관계로 인한 계수 추정 불안정은 다중공선성입니다.",
      "과소적합은 모델이 데이터 패턴을 충분히 학습하지 못한 상태입니다.",
      "자기상관성은 시계열 오차항 간의 상관관계입니다.",
      "이상치 편향은 극단값으로 인한 왜곡입니다."
    ],
    memorizationPoint: "독립변수 간 높은 상관 ➔ 다중공선성 (VIF $\\ge 10$ 진단, Ridge/PCA 해결)",
    examinerTip: "💡 12회 기출 핵심: $VIF = \\frac{1}{1-R^2} \\ge 10$ 기준과 해결책(변수 제거, PCA 차원축소, 릿지 규제)이 연계되어 출제됩니다."
  },
  {
    id: "Q12_67",
    subject: 4,
    chapter: "데이터 시각화 및 탐색",
    sectionId: "s4-3",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 두 개 이상의 데이터 집단의 수치 분포를 비교할 때, 최솟값, 제1사분위수(Q1), 중앙값(Q2), 제3사분위수(Q3), 최댓값 및 이상치를 한눈에 비교할 수 있는 시각화 차트는?",
    choices: [
      "상자 수염 그림 (Box Plot)",
      "히스토그램 (Histogram)",
      "파이 차트 (Pie Chart)",
      "산점도 행렬 (Scatter Plot Matrix)"
    ],
    answer: 0,
    explanation: "상자 수염 그림(Box Plot)은 5가지 요약 수치(Min, Q1, Median, Q3, Max)와 $1.5 \\times IQR$ 바깥의 이상치를 직관적으로 나타내어 여러 그룹 간의 중심 위치와 산포도를 비교하는 데 최적입니다.",
    whyWrong: [
      "정답: 5대 요약 수치와 이상치를 비교하는 시각화는 박스플롯(Box Plot)입니다.",
      "히스토그램은 단일 연속형 변수의 구간별 빈도 분포를 나타냅니다.",
      "파이 차트는 전체 대비 범주별 비율을 나타냅니다.",
      "산점도 행렬은 다변수 간의 상관관계를 한눈에 확인합니다."
    ],
    memorizationPoint: "중앙값 + 사분위범위(IQR) + 이상치 비교 ➔ 상자 수염 그림 (Box Plot)",
    examinerTip: "💡 12회 기출 핵심: 박스플롯 상자의 중앙 선은 '평균'이 아니라 '중앙값(Median)'이라는 점을 반드시 기억하세요."
  },
  {
    id: "Q12_68",
    subject: 4,
    chapter: "데이터 시각화 차트 유형",
    sectionId: "s4-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 데이터 시각화 차트 중 '히스토그램(Histogram)'의 올바른 데이터 표현 특성에 해당하는 것은?",
    choices: [
      "키, 몸무게 등 '연속형(양적)' 데이터의 구간(Bin)별 도수(빈도) 분포를 막대로 표현하며, 막대 사이에 간격이 없다.",
      "성별, 혈액형 등 '명목형(범주형)' 데이터의 빈도를 나타내는 데 주로 사용된다.",
      "시간에 따른 데이터의 추세와 계절적 변동을 선으로 표현한다.",
      "두 연속형 변수 간의 비선형적인 상관관계 궤적을 점으로 표현한다."
    ],
    answer: 0,
    explanation: "히스토그램(Histogram)은 연속형(양적) 변수를 일정한 계급 구간(Bin)으로 나누고 그 구간의 빈도를 표현하며, 연속적인 데이터 특성상 막대 사이에 빈틈(간격)이 없습니다. (범주형은 간격이 있는 막대그래프 사용)",
    whyWrong: [
      "정답: 연속형 데이터의 구간별 빈도 분포 시각화는 히스토그램입니다.",
      "범주형 데이터 빈도 표현은 '막대그래프(Bar Chart)'를 사용합니다.",
      "시간에 따른 추세는 '꺾은선 그래프(Line Chart)'를 사용합니다.",
      "두 변수 간 상관관계 점 표현은 '산점도(Scatter Plot)'입니다."
    ],
    memorizationPoint: "연속형(양적) 데이터 구간 빈도 ➔ 히스토그램 (막대 사이 간격 없음)",
    examinerTip: "💡 12회 기출 핵심: 막대그래프(범주형 질적 데이터, 간격 있음) vs 히스토그램(연속형 양적 데이터, 간격 없음)의 구분이 출제되었습니다."
  },
  {
    id: "Q12_69",
    subject: 4,
    chapter: "데이터 시각화 차트 유형",
    sectionId: "s4-3",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 2차원 좌표평면 위에 두 연속형 변수 간의 관계를 점으로 나타내는 '산점도(Scatter Plot)'의 한계점으로 가장 옳은 것은?",
    choices: [
      "두 변수 간의 상관관계 유무를 파악하는 데는 용이하지만, 데이터의 시간에 따른 순차적 흐름이나 추세(Trend)를 파악하기는 어렵다.",
      "이상치(Outlier)의 존재를 전혀 파악할 수 없다.",
      "데이터가 선형적인 관계를 가질 때는 사용할 수 없다.",
      "반드시 3개 이상의 다차원 변수가 있어야만 그릴 수 있다."
    ],
    answer: 0,
    explanation: "산점도(Scatter Plot)는 $X$와 $Y$ 두 변수 간의 상관성, 군집, 이상치 파악에는 매우 효과적이지만, 데이터가 발생한 시간 순서(Time-series sequence)가 점들의 좌표에 드러나지 않아 시계열적 추세 분석에는 부적합합니다.",
    whyWrong: [
      "정답: 상관관계 파악에는 적합하나 시간적 순서/추세 파악에는 한계가 있습니다.",
      "산점도는 극단적인 위치의 이상치를 가장 직관적으로 발견할 수 있는 도구입니다.",
      "선형/비선형 관계 모두 산점도로 확인 가능합니다.",
      "산점도는 기본적으로 2개 연속형 변수를 대상으로 합니다."
    ],
    memorizationPoint: "산점도 ➔ 상관관계 및 이상치 파악 용이, 시계열적 시간 흐름 파악 불가",
    examinerTip: "💡 12회 기출 핵심: 각 시각화 도구의 장점과 한계점을 묻는 4과목 단골 문제입니다."
  },
  {
    id: "Q12_70",
    subject: 4,
    chapter: "다차원 시각화 (평행좌표계)",
    sectionId: "s4-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 다변량(다차원) 데이터를 시각화하기 위해 여러 개의 평행한 축을 세우고 각 데이터 개체를 선으로 연결하여 표현하는 '평행좌표 그래프(Parallel Coordinates)'의 주요 한계점은?",
    choices: [
      "데이터의 개체(Row) 수가 많아질수록 선들이 서로 복잡하게 겹쳐(Overplotting), 개별 데이터 비교나 군집의 형태를 파악하기가 매우 어려워진다.",
      "3개 이상의 다변량 변수를 표현하는 것이 불가능하다.",
      "축의 순서를 변경해도 시각적 패턴이 전혀 바뀌지 않는다.",
      "연속형 수치 데이터를 시각화할 수 없다."
    ],
    answer: 0,
    explanation: "평행좌표계(Parallel Coordinates)는 고차원 데이터를 평행한 세로축들로 연결해 표현하지만, 데이터 인스턴스가 수백~수천 개 이상으로 많아지면 선들이 새까맣게 겹쳐버려(Overplotting) 시각적 해석력을 상실하는 치명적 한계가 있습니다.",
    whyWrong: [
      "정답: 데이터가 많아지면 선 겹침(Overplotting)으로 패턴 및 군집 파악이 곤란해집니다.",
      "평행좌표계는 3개 이상의 다변량 변수를 시각화하기 위해 개발된 도구입니다.",
      "축의 배치 순서에 따라 인접한 변수 간의 패턴 가시성이 크게 달라집니다.",
      "연속형 수치 데이터의 다차원 시각화에 널리 사용됩니다."
    ],
    memorizationPoint: "평행좌표 그래프 한계 ➔ 데이터 개체 증가 시 선 겹침(Overplotting)으로 군집 파악 불가",
    examinerTip: "💡 12회 기출 핵심: 12회 시험에서 평행좌표그래프의 특징과 오버플로팅 한계점이 출제되었습니다."
  },
  {
    id: "Q12_71",
    subject: 4,
    chapter: "데이터 시각화 및 인포그래픽",
    sectionId: "s4-3",
    difficulty: "easy",
    importance: "B",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 복잡한 정보, 데이터, 지식을 시각적인 그래픽으로 요약하여 전달하는 '인포그래픽(Infographics)'에 대한 설명으로 가장 올바른 것은?",
    choices: [
      "복잡한 데이터를 사용자가 직관적이고 '쉽고 빠르게 이해하도록 정보 전달'하는 것이 본질적인 목적이므로, 단순한 시각적 화려함보다 데이터의 정확한 메시지 전달이 우선시되어야 한다.",
      "정보 전달의 정확성보다는 예술적이고 화려한 디자인 효과를 극대화하는 것이 가장 중요하다.",
      "인포그래픽은 수치 데이터의 원본 표를 있는 그대로 나열하는 도구이다.",
      "사용자의 인지 부하를 높여 오랫동안 고민하게 만드는 것이 인포그래픽의 핵심이다."
    ],
    answer: 0,
    explanation: "인포그래픽(Infographics)은 Information + Graphics의 합성어로, 핵심 정보를 보는 이로 하여금 빠르고 명확하게 이해시키는 '정보 전달력'이 본질입니다. 그래픽 요소에만 치중하여 왜곡이 발생하면 안 됩니다.",
    whyWrong: [
      "정답: 직관적이고 정확한 정보 전달이 본질적 목적입니다.",
      "디자인 효과만을 중시하여 정보 왜곡을 초래하는 것은 잘못된 접근입니다.",
      "원본 표를 그대로 나열하는 것이 아니라 시각적으로 가공/요약하는 도구입니다.",
      "사용자의 인지 부하(Cognitive Load)를 최소화하는 것이 목적입니다."
    ],
    memorizationPoint: "인포그래픽의 본질 ➔ 직관적이고 정확한 정보 전달 (단순 그래픽 치중 X)",
    examinerTip: "💡 12회 기출 핵심: '정보 전달보다 시각적 그래픽 자체를 더 중시한다'는 오답 선지를 정확히 걸러내세요."
  },
  {
    id: "Q12_72",
    subject: 4,
    chapter: "연관성 분석 (Association Rule)",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 대규모 트랜잭션 데이터에서 항목들 간의 동시 발생 빈도를 분석하여 유용한 구매 규칙(예: '맥주를 산 고객은 기저귀를 함께 구매한다')을 발견하는 비지도 학습 기법은?",
    choices: [
      "연관성 분석 (Association Rule / 장바구니 분석)",
      "의사결정나무 분석",
      "선형 판별 분석 (LDA)",
      "주성분 회귀 분석 (PCR)"
    ],
    answer: 0,
    explanation: "연관성 분석(Association Analysis, 장바구니 분석)은 Apriori, FP-Growth 등의 알고리즘을 사용하여 거래 데이터 내 품목 간의 지지도(Support), 신뢰도(Confidence), 향상도(Lift) 규칙을 탐색하는 기법입니다.",
    whyWrong: [
      "정답: 트랜잭션 품목 간 동시 발생 규칙을 찾는 기법은 연관성 분석입니다.",
      "의사결정나무는 지도학습 기반의 분류/회귀 모델입니다.",
      "LDA는 클래스 분리를 최대화하는 지도학습 차원축소 기법입니다.",
      "PCR은 주성분 추출 후 회귀분석을 결합한 지도학습 모델입니다."
    ],
    memorizationPoint: "장바구니 동시 구매 규칙 발굴 ➔ 연관성 분석 (지지도, 신뢰도, 향상도)",
    examinerTip: "💡 12회 기출 핵심: 연관성 분석은 자연어 문장 완성 모델이 아니라 '동시 발생 규칙'을 찾는 탐색적 기법입니다."
  },
  {
    id: "Q12_73",
    subject: 4,
    chapter: "연관성 분석 지표 (향상도)",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 연관성 분석에서 도출된 규칙 $A \\Rightarrow B$의 향상도(Lift)가 1.0보다 큰($Lift > 1$) 경우의 의미로 가장 옳은 것은?",
    choices: [
      "품목 A를 구매하는 행위가 품목 B를 구매할 확률을 통계적으로 증가시키는 '양의 상관관계(유의미한 연관성)'가 존재한다.",
      "품목 A와 품목 B의 구매는 서로 완전히 독립적이다.",
      "품목 A를 구매하면 품목 B의 구매 확률이 오히려 감소하는 음의 상관관계이다.",
      "품목 A와 B의 동시 구매 확률이 0이다."
    ],
    answer: 0,
    explanation: "향상도 $Lift(A \\Rightarrow B) = \\frac{P(A \\cap B)}{P(A)P(B)} = \\frac{Confidence}{P(B)}$이며, $Lift > 1$이면 양의 연관성(구매 촉진), $Lift = 1$이면 독립, $Lift < 1$이면 음의 연관성(구매 저해)을 의미합니다.",
    whyWrong: [
      "정답: $Lift > 1$은 A 구매가 B 구매 확률을 높이는 양의 연관성입니다.",
      "$Lift = 1$일 때 두 품목이 상호 독립입니다.",
      "$Lift < 1$일 때 음의 상관관계(배타적 구매)입니다.",
      "지지도 $P(A \\cap B) = 0$이면 향상도도 0이 됩니다."
    ],
    memorizationPoint: "향상도(Lift): $>1$ (양의 연관성), $=1$ (독립), $<1$ (음의 연관성)",
    examinerTip: "💡 12회 기출 핵심: 향상도 기준선은 0이 아닌 '1.0'이라는 점이 킬러 함정입니다."
  },
  {
    id: "Q12_74",
    subject: 4,
    chapter: "군집 모델 평가지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 군집 분석(Clustering) 결과의 타당성을 평가하기 위해, 군집 내 객체 간의 응집도($a(i)$)와 가장 인접한 타 군집과의 분리도($b(i)$)를 이용하여 $-1$에서 $+1$ 사이의 값으로 계산하는 지표는?",
    choices: [
      "실루엣 계수 (Silhouette Coefficient)",
      "던 지수 (Dunn Index)",
      "엘보우 계수 (Elbow Score)",
      "지니 계수 (Gini Coefficient)"
    ],
    answer: 0,
    explanation: "실루엣 계수(Silhouette Coefficient)는 $s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$로 계산되며, $-1 \\le s(i) \\le 1$ 범위를 가집니다. 1에 가까울수록 군집이 잘 응집되고 분리되었음을 나타냅니다.",
    whyWrong: [
      "정답: 응집도와 분리도를 이용해 -1~+1로 평가하는 지표는 실루엣 계수입니다.",
      "던 지수는 군집 간 최소 거리 / 군집 내 최대 직경의 비율로 측정합니다.",
      "엘보우 방법은 군집 수 $K$에 따른 SSE 감소율 꺾임점을 시각화하는 방법입니다.",
      "지니 계수는 불순도나 소득 불평등도를 측정하는 지표입니다."
    ],
    memorizationPoint: "군집 평가: 실루엣 계수 $s(i) = \\frac{b(i)-a(i)}{\\max(a(i),b(i))}$ ($-1 \\le s \\le 1$, $1$ 최상)",
    examinerTip: "💡 12회 기출 핵심: 실루엣 계수의 수식 분자 $b(i)-a(i)$와 값의 범위(-1~1)를 묻는 문제가 단골 출제됩니다."
  },
  {
    id: "Q12_75",
    subject: 4,
    chapter: "불균형 데이터 샘플링",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 불균형 데이터셋에서 소수 클래스의 데이터를 단순 복제하는 대신, K-최근접 이웃(K-NN) 알고리즘을 이용해 소수 클래스 샘플들 간의 선분 상에 새로운 합성 데이터를 생성(보간)하는 오버샘플링 기법은?",
    choices: [
      "SMOTE (Synthetic Minority Over-sampling Technique)",
      "랜덤 언더샘플링 (Random Under-sampling)",
      "토멕 링크 (Tomek Links)",
      "ADASYN"
    ],
    answer: 0,
    explanation: "SMOTE는 소수 클래스 데이터 포인트와 그 K-NN 이웃 포인트 사이의 가상 선분 상에 무작위 가중치를 곱해 새로운 합성 샘플을 보간 생성함으로써 단순 복제에 의한 과적합을 방지하는 오버샘플링 기법입니다.",
    whyWrong: [
      "정답: K-NN 기반 합성 샘플 보간 오버샘플링은 SMOTE입니다.",
      "랜덤 언더샘플링은 다수 클래스 데이터를 무작위로 버려 균형을 맞춥니다.",
      "토멕 링크는 경계면의 노이즈 쌍을 제거하는 언더샘플링 기법입니다.",
      "ADASYN은 분류가 어려운 소수 클래스에 가중치를 두어 SMOTE를 변형한 기법입니다."
    ],
    memorizationPoint: "K-NN 이웃 선분 보간 합성 오버샘플링 ➔ SMOTE",
    examinerTip: "💡 12회 기출 핵심: SMOTE는 단순 복제가 아닌 '가중 보간 합성'이므로 과적합 위험을 크게 줄여줍니다."
  },
  {
    id: "Q12_76",
    subject: 4,
    chapter: "설명 가능한 AI (XAI)",
    sectionId: "s4-3",
    difficulty: "hard",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 복잡한 블랙박스 머신러닝 모델의 예측 결과를 해석(XAI)하기 위해, 협조적 게임이론의 '샤플리 값(Shapley Value)'을 기반으로 각 특징(Feature)이 예측값에 기여한 중요도를 공정하게 산출하는 기법은?",
    choices: [
      "SHAP (SHapley Additive exPlanations)",
      "LIME (Local Interpretable Model-agnostic Explanations)",
      "Grad-CAM",
      "PDP (Partial Dependence Plot)"
    ],
    answer: 0,
    explanation: "SHAP은 게임이론에서 플레이어들의 연합 기여도를 공정 배분하는 샤플리 값(Shapley Value)을 머신러닝 특징 기여도에 적용하여 대칭성과 덧셈성을 만족하는 강력한 XAI 기법입니다.",
    whyWrong: [
      "정답: 샤플리 값(Shapley Value) 기반의 특징 기여도 산출 XAI는 SHAP입니다.",
      "LIME은 예측 인스턴스 주변의 국소 영역에 섭동(Perturbation)을 주어 대리 선형 모델을 만드는 기법입니다.",
      "Grad-CAM은 CNN 합성곱 계층의 그래디언트를 시각화하는 히트맵 기법입니다.",
      "PDP는 관심 변수의 변화에 따른 모델의 한계 효과를 선 그래프로 표현하는 기법입니다."
    ],
    memorizationPoint: "게임이론 샤플리 값(Shapley Value) ➔ SHAP, 국소 대리 모델 ➔ LIME",
    examinerTip: "💡 12회 기출 핵심: XAI의 양대 산맥인 SHAP(샤플리 연합 기여도)과 LIME(국소 대리 모델)의 차이를 기억하세요."
  },
  {
    id: "Q12_77",
    subject: 4,
    chapter: "시계열 분석 (정상성)",
    sectionId: "s4-2",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 시계열 데이터가 ARIMA 등 통계적 시계열 모형에 적합하기 위해 만족해야 하는 '정상성(Stationarity)'의 3대 조건에 해당하지 않는 것은?",
    choices: [
      "시계열의 분산이 시간에 따라 지수적으로 증가하는 일정한 추세(Trend)를 가진다.",
      "시계열의 평균이 시간에 관계없이 일정하다.",
      "시계열의 분산이 시간에 관계없이 일정하다.",
      "두 시점 간의 공분산은 시점의 위치가 아닌 시차(Lag)에만 의존한다."
    ],
    answer: 0,
    explanation: "정상 시계열(Stationary Time Series)은 평균이 일정하고, 분산이 일정하며, 공분산이 특정 시점 $t$가 아닌 오직 시차 $k$에만 의존해야 합니다. 분산이 시간에 따라 변하거나 추세가 존재하면 비정상 시계열입니다.",
    whyWrong: [
      "정답: 분산이 시간에 따라 증가하는 추세는 비정상 시계열의 특성입니다.",
      "평균이 시간에 무관하게 일정한 것은 정상성의 필수 조건입니다.",
      "분산이 시간에 무관하게 일정한 것은 정상성의 필수 조건입니다.",
      "공분산이 시차 $k$에만 의존하는 것은 정상성의 필수 조건입니다."
    ],
    memorizationPoint: "정상성 3대 조건: 평균 일정 + 분산 일정 + 공분산은 오직 시차(Lag)에만 의존",
    examinerTip: "💡 12회 기출 핵심: 추세 제거 ➔ 차분(Differencing), 분산 일정화 ➔ 로그/Box-Cox 변환을 통해 정상화합니다."
  },
  {
    id: "Q12_78",
    subject: 4,
    chapter: "혼동행렬 평가지표",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 혼동행렬(Confusion Matrix)에서 '실제 Negative(False)인 데이터 총합 중에서 모델이 Negative로 올바르게 예측한 비율'을 나타내는 지표는?",
    choices: [
      "특이도 (Specificity)",
      "재현율 (Recall / Sensitivity)",
      "정밀도 (Precision)",
      "위양성률 (FPR, False Positive Rate)"
    ],
    answer: 0,
    explanation: "특이도(Specificity)는 실제 음성(TN + FP) 중 맞춘 음성의 비율인 $\\frac{TN}{TN + FP}$입니다. 위양성률(FPR)은 $1 - \\text{특이도} = \\frac{FP}{TN + FP}$입니다.",
    whyWrong: [
      "정답: 실제 Negative 중 올바르게 맞춘 비율은 특이도(Specificity)입니다.",
      "재현율은 실제 Positive 중 맞춘 비율($\\frac{TP}{TP+FN}$)입니다.",
      "정밀도는 Positive로 예측한 것 중 실제 Positive의 비율($\\frac{TP}{TP+FP}$)입니다.",
      "FPR은 실제 Negative 중 Positive로 잘못 예측한 비율입니다."
    ],
    memorizationPoint: "특이도(Specificity) = $\\frac{TN}{TN + FP}$, FPR = $1 - \\text{특이도}$",
    examinerTip: "💡 12회 기출 핵심: 혼동행렬 4대 공식(정밀도, 재현율, 특이도, 정확도)은 시험장 들어가기 직전 필수 암기 사항입니다."
  },
  {
    id: "Q12_79",
    subject: 4,
    chapter: "회귀 모형 평가 (결정계수)",
    sectionId: "s4-1",
    difficulty: "medium",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 회귀모형의 총변동(SST)이 100이고 모델이 설명하지 못하는 잔차제곱합(SSE)이 20일 때, 이 회귀모형의 결정계수($R^2$) 값은?",
    choices: [
      "0.80",
      "0.20",
      "0.40",
      "1.20"
    ],
    answer: 0,
    explanation: "결정계수 $R^2 = 1 - \\frac{SSE}{SST} = \\frac{SSR}{SST}$입니다. 문제에서 $SST=100, SSE=20$이므로 $R^2 = 1 - \\frac{20}{100} = 0.80$입니다. (즉, 독립변수들이 종속변수의 변동을 80% 설명함)",
    whyWrong: [
      "정답: $R^2 = 1 - \\frac{20}{100} = 0.80$입니다.",
      "0.20은 설명되지 않는 잔차의 비율($SSE/SST$)입니다.",
      "0.40은 계산 오류입니다.",
      "결정계수는 0과 1 사이의 값을 가지므로 1.20은 불가능합니다."
    ],
    memorizationPoint: "결정계수 공식: $R^2 = 1 - \\frac{SSE}{SST} = \\frac{SSR}{SST}$ ($0 \\le R^2 \\le 1$)",
    examinerTip: "💡 12회 기출 핵심: SST = SSR + SSE 관계식을 활용한 10초 암산 결정계수 계산 문제입니다."
  },
  {
    id: "Q12_80",
    subject: 4,
    chapter: "모델 진단 및 과적합",
    sectionId: "s4-1",
    difficulty: "easy",
    importance: "A",
    questionType: "multiple-choice",
    round: "12",
    exam: "12회 기출 복원",
    question: "[12회 기출 복원] 머신러닝 모델 학습 과정에서 훈련 데이터에 대한 손실(Loss)은 계속 감소하여 0에 가까워지지만, 검증(Validation) 데이터에 대한 손실이 특정 시점 이후 다시 급격히 증가하는 현상은?",
    choices: [
      "과적합 (Overfitting)",
      "과소적합 (Underfitting)",
      "조기종료 (Early Stopping)",
      "정규화 (Regularization)"
    ],
    answer: 0,
    explanation: "과적합(Overfitting)은 모델이 훈련 데이터의 사소한 노이즈까지 지나치게 과도하게 학습하여, 새로운 미관측 검증/테스트 데이터에 대한 일반화 성능이 저하되는 현상입니다.",
    whyWrong: [
      "정답: 훈련 오차는 줄어드나 검증 오차가 다시 치솟는 현상은 과적합(Overfitting)입니다.",
      "과소적합은 훈련 데이터조차 충분히 학습하지 못해 훈련/검증 오차가 모두 높은 상태입니다.",
      "조기종료는 과적합이 시작되기 직전 학습을 멈추는 방지 기법입니다.",
      "정규화는 가중치 페널티를 주어 과적합을 방지하는 기법입니다."
    ],
    memorizationPoint: "Train 오차 감소 vs Val 오차 급증 ➔ 과적합 (Overfitting)",
    examinerTip: "💡 12회 기출 핵심: 과적합 방지 4대 기법(드롭아웃, 조기종료, 가중치 규제 L1/L2, 데이터 증강)을 함께 숙지하세요."
  }
];

module.exports = { q12_part2 };
