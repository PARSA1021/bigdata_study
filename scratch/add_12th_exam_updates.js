const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'cbt_bank.json');
const dataPath = path.join(__dirname, '..', 'data.json');

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// =========================================================================
// 1. 12회 기출 복원 반영 10개 킬러 문제 (Q_PASS_419 ~ Q_PASS_428)
// =========================================================================
const new12thQuestions = [
  {
    id: "Q_PASS_419",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 어느 회귀 모형의 실제값(y)과 예측값(ŷ)이 다음과 같이 3개의 샘플로 주어졌다. 이 모형의 평균제곱오차(MSE)와 평균절대오차(MAE)의 계산 결과로 올바르게 짝지어진 것은?\n\n• 샘플1: 실제값 y = 1.2, 예측값 ŷ = 1.4\n• 샘플2: 실제값 y = 2.5, 예측값 ŷ = 2.7\n• 샘플3: 실제값 y = 2.7, 예측값 ŷ = 2.6",
    choices: [
      "MSE = 0.03, MAE = 0.150",
      "MSE = 0.03, MAE = 0.167",
      "MSE = 0.09, MAE = 0.500",
      "MSE = 0.06, MAE = 0.167"
    ],
    answer: 1,
    explanation: "1) 각 샘플별 오차 (y_i - ŷ_i):\n- 샘플 1: 1.2 - 1.4 = -0.2 → 제곱: 0.04, 절댓값: 0.2\n- 샘플 2: 2.5 - 2.7 = -0.2 → 제곱: 0.04, 절댓값: 0.2\n- 샘플 3: 2.7 - 2.6 = +0.1 → 제곱: 0.01, 절댓값: 0.1\n\n2) MSE (평균제곱오차) = (0.04 + 0.04 + 0.01) / 3 = 0.09 / 3 = **0.03**\n3) MAE (평균절대오차) = (0.2 + 0.2 + 0.1) / 3 = 0.5 / 3 ≈ **0.167**\n\n💡 실제 기출 포인트: 4과목에서 3~4개의 단순 수치를 주고 MSE, RMSE, MAE, MAPE를 직접 계산하는 문제가 단골 출제됩니다.",
    whyWrong: [
      "MAE 계산값이 틀렸습니다 (0.5 / 3 = 0.1666... = 0.167).",
      "정답입니다. MSE = 0.03, MAE ≈ 0.167 입니다.",
      "MSE 합계(0.09)와 MAE 합계(0.5)를 샘플 수(3)로 나누지 않은 오류입니다.",
      "MSE 계산이 잘못되었습니다."
    ],
    memorizationPoint: "MSE = Σ(y - ŷ)² / n, MAE = Σ|y - ŷ| / n (합계를 구한 뒤 반드시 샘플 수 n으로 나누어야 함)",
    examinerTip: "💡 출제위원 함정: 합계만 구하고 n으로 나누는 것을 깜빡하게 유도하거나, 부호를 헷갈려 MAE를 0으로 계산하게 만드는 함정이 빈출됩니다."
  },
  {
    id: "Q_PASS_420",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c5-17",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 머신러닝 모형의 복잡도(Model Complexity)와 편향-분산 트레이드오프(Bias-Variance Tradeoff) 및 학습 오차 곡선에 대한 설명 중 가장 옳지 않은 것은?",
    choices: [
      "모형의 복잡도가 증가할수록 훈련 데이터에 대한 편향(Bias)은 감소하고, 분산(Variance)은 증가한다.",
      "과소적합(Underfitting) 영역에서는 높은 편향(High Bias)과 낮은 분산(Low Variance)이 나타난다.",
      "학습 주기(Training cycle)가 지속됨에 따라 훈련 오차(Training Error)와 검증 오차(Testing Error)는 모두 0을 향해 단조 감소한다.",
      "전체 오차(Total Error)는 편향의 제곱, 분산, 그리고 제거할 수 없는 오차(Irreducible Error)의 합으로 구성된다."
    ],
    answer: 2,
    explanation: "학습 주기(Training cycle)가 계속 진행되면 훈련 오차(Training Error)는 지속적으로 감소하지만, 검증/테스트 오차(Testing Error)는 일정 시점(최적 모델) 이후 과적합(Overfitting)으로 인해 **다시 증가하는 U자형 곡선**을 그리게 됩니다.\n\n💡 실제 기출 포인트: Bias-Variance tradeoff 그래프와 Training vs Test Error 그래프의 축과 변화 양상을 해석하는 문제가 12회 시험에 핵심 출제되었습니다.",
    whyWrong: [
      "올바른 설명입니다. 복잡도가 커질수록 편향은 줄어들고 분산은 커집니다.",
      "올바른 설명입니다. 과소적합은 모델이 너무 단순하여 편향이 높은 상태입니다.",
      "정답입니다. Testing Error는 과적합 시점에 도달하면 다시 증가합니다.",
      "올바른 설명입니다. Total Error = Bias² + Variance + Irreducible Error 입니다."
    ],
    memorizationPoint: "복잡도 증가 시: 편향(Bias)↓ 분산(Variance)↑ | 최적점 이후 Testing Error는 다시 증가(과적합)",
    examinerTip: "💡 출제위원 함정: '복잡한 모델일수록 편향과 분산이 모두 작아진다'거나 '학습을 무한히 반복하면 테스트 에러가 0이 된다'는 선지는 100% 오답입니다."
  },
  {
    id: "Q_PASS_421",
    subject: 3,
    chapter: "분석모형 설계 (분석 절차 수립·환경 구축)",
    sectionId: "s3-0",
    cardId: "c2-1",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 머신러닝 지도학습(Supervised Learning)에서 종속변수(Target Y)의 데이터 유형에 따른 알고리즘 분류로 가장 옳지 않은 것은?",
    choices: [
      "선형회귀(Linear Regression)는 종속변수가 연속형(Continuous)인 경우에만 적용하는 회귀 전용 알고리즘이다.",
      "로지스틱 회귀(Logistic Regression)와 판별분석(LDA)은 종속변수가 범주형(Categorical)인 분류 문제에 적용된다.",
      "의사결정나무, 랜덤포레스트, 서포트 벡터 머신(SVM), 인공신경망은 회귀와 분류 문제에 모두 적용 가능하다.",
      "K-최근접 이웃(K-NN)과 나이브 베이즈(Naive Bayes)는 타겟 변수가 연속형인 회귀 예측에만 사용 가능한 전용 알고리즘이다."
    ],
    answer: 3,
    explanation: "1) **나이브 베이즈(Naive Bayes)**는 조건부 확률 기반의 **'분류 전용'** 알고리즘입니다.\n2) **K-NN(K-Nearest Neighbors)**은 이웃들의 다수결 투표를 통한 **분류(Classification)**뿐만 아니라, 이웃들의 평균값을 취하는 **회귀(Regression)**에도 모두 사용 가능합니다.\n3) 따라서 두 알고리즘이 연속형 회귀 전용이라는 설명은 완전히 틀렸습니다.\n\n💡 실제 기출 포인트: 회귀 전용(선형회귀), 분류 전용(로지스틱, LDA, 나이브베이즈), 둘 다 가능(의사결정나무, 랜덤포레스트, KNN, SVM, 인공신경망, 앙상블) 매핑을 묻는 문제입니다.",
    whyWrong: [
      "올바른 설명입니다. 선형회귀는 연속형 타겟값을 예측합니다.",
      "올바른 설명입니다. 로지스틱 회귀와 판별분석은 분류 알고리즘입니다.",
      "올바른 설명입니다. 트리 기반 모형, SVM, 인공신경망은 회귀/분류 모두 지원합니다.",
      "정답입니다. 나이브 베이즈는 분류 전용이며, K-NN은 회귀와 분류 둘 다 가능합니다."
    ],
    memorizationPoint: "분류 전용: 로지스틱, 판별분석, 나이브베이즈 | 회귀/분류 둘 다 가능: 트리, 랜덤포레스트, KNN, SVM, 인공신경망",
    examinerTip: "💡 출제위원 함정: '로지스틱 회귀'는 이름에 '회귀'가 들어가지만 실제로는 '분류' 알고리즘이라는 점이 대표적인 낚시 포인트입니다."
  },
  {
    id: "Q_PASS_422",
    subject: 2,
    chapter: "통계기법 이해",
    sectionId: "s2-6",
    cardId: "c2-22",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 통계적 가설검정에서 발생하는 오류와 비모수 검정 기법에 관한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "제1종 오류(α)는 귀무가설(H₀)이 실제로 참인데도 이를 잘못 기각하는 오류를 의미하며, 유의수준과 같다.",
      "제2종 오류(β)는 귀무가설(H₀)이 거짓(대립가설 참)인데도 귀무가설을 기각하지 못하고 채택하는 오류이다.",
      "모집단의 정규성 가정을 만족하지 못할 때 두 독립된 집단의 위치(중앙값) 차이를 비교하는 비모수 검정은 '맨-휘트니 U 검정(Mann-Whitney U Test)'이다.",
      "유의수준(α)을 0.05에서 0.01로 더 엄격하게 낮추면 제1종 오류가 감소함과 동시에 제2종 오류(β)도 함께 감소하여 검정력이 극대화된다."
    ],
    answer: 3,
    explanation: "유의수준(α, 제1종 오류 허용 한계)을 낮추면 귀무가설을 기각하기가 더 어려워지므로, 반대로 **제2종 오류(β, 거짓인 귀무가설을 채택할 확률)는 증가**하게 됩니다(상충 관계). 따라서 검정력(1 - β)은 오히려 감소합니다. 두 오류를 동시에 줄이는 유일한 방법은 **'표본 크기(n)를 늘리는 것'**입니다.\n\n💡 실제 기출 포인트: 12회 2과목에서 가설검정(7문항)이 집중 출제되었으며, 1종/2종 오류 관계와 비모수 검정(맨-휘트니, 윌콕슨)이 핵심 출제되었습니다.",
    whyWrong: [
      "올바른 설명입니다. 1종 오류는 참인 H₀를 기각하는 오류입니다.",
      "올바른 설명입니다. 2종 오류는 거짓인 H₀를 채택하는 오류입니다.",
      "올바른 설명입니다. 독립 2표본 t-검정의 비모수 대안은 맨-휘트니 U 검정입니다.",
      "정답입니다. α를 낮추면 β는 반대로 증가하며 검정력(1-β)은 떨어집니다."
    ],
    memorizationPoint: "α(1종 오류)↓ ⇒ β(2종 오류)↑ (Trade-off 관계) | 두 오류를 모두 줄이려면 표본 수(n)를 늘려야 함",
    examinerTip: "💡 출제위원 함정: '유의수준을 낮추면 1종 오류와 2종 오류가 모두 줄어든다'는 대표적 단골 오답 선지입니다."
  },
  {
    id: "Q_PASS_423",
    subject: 3,
    chapter: "최신 딥러닝 및 최적화",
    sectionId: "s3-13",
    cardId: "c3-13-2",
    difficulty: "hard",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 인공신경망의 최신 아키텍처인 '트랜스포머(Transformer)'와 '셀프 어텐션(Self-Attention)' 메커니즘에 관한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "기존 RNN/LSTM의 순차적(Sequential) 연산 한계를 벗어나 입력 시퀀스 전체를 한 번에 병렬(Parallel) 처리할 수 있어 연산 속도가 획기적으로 향상되었다.",
      "단어 간 거리가 멀어지면 이전 정보가 소실되던 장기 의존성(Long-term dependency) 문제를 완벽히 해결하였다.",
      "Self-Attention 연산은 Query, Key, Value의 3가지 벡터 간 내적(Dot-product)과 소프트맥스를 통해 각 토큰 간의 상관 가중치를 계산한다.",
      "Transformer 모델은 시퀀스 데이터를 순차적으로 처리하므로 문장 내 단어의 순서와 위치 정보를 주입하기 위한 위치 인코딩(Positional Encoding)이 전혀 필요하지 않다."
    ],
    answer: 3,
    explanation: "Transformer는 RNN처럼 단어를 순차적으로 넣지 않고 **전체 시퀀스를 한 번에 병렬로 입력**받기 때문에, 모형 자체는 단어들의 위치나 순서를 알지 못합니다. 따라서 **단어의 위치 정보를 모델에 알려주기 위해 반드시 '위치 인코딩(Positional Encoding)' 벡터를 입력 임베딩에 더해주어야 합니다.**\n\n💡 실제 기출 포인트: 12회 3과목 인공신경망 파트에서 최신 아키텍처인 Transformer와 Attention의 동작 원리가 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. Transformer는 병렬 연산을 가능하게 하여 대규모 학습(LLM)을 가능케 했습니다.",
      "올바른 설명입니다. 모든 토큰 간의 Attention을 직접 계산하므로 장기 의존성 문제가 없습니다.",
      "올바른 설명입니다. Q, K, V 벡터의 스케일드 닷 프로덕트(Scaled Dot-Product) 연산을 수행합니다.",
      "정답입니다. 병렬 처리 특성상 위치 정보를 주입하기 위해 Positional Encoding이 필수적입니다."
    ],
    memorizationPoint: "Transformer: RNN 완전 대체, 병렬 처리(빠름), Q/K/V 셀프 어텐션, 위치 인코딩(Positional Encoding) 필수",
    examinerTip: "💡 출제위원 함정: '트랜스포머는 RNN 구조를 기반으로 한다' 또는 '위치 인코딩이 필요 없다'는 선지는 오답입니다."
  },
  {
    id: "Q_PASS_424",
    subject: 3,
    chapter: "차원 축소",
    sectionId: "s2-3",
    cardId: "c2-12",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 주성분 분석(PCA, Principal Component Analysis) 및 차원 축소 기법에 관한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "고차원 데이터 공간에서 데이터의 분산(Variance)을 최대한 보존하는 서로 직교(Orthogonal)하는 새로운 축들을 찾아낸다.",
      "첫 번째 주성분(PC₁)과 두 번째 주성분(PC₂) 간의 상관계수는 0으로, 서로 완전히 독립적이다.",
      "주성분 분석은 각 변수의 측정 단위나 스케일에 영향을 받지 않으므로, 분석 전 변수 표준화(Z-score Scaling)를 거칠 필요가 없다.",
      "공분산 행렬의 고유값 분해(Eigendecomposition) 또는 데이터 행렬의 특이값 분해(SVD)를 통해 주성분 벡터와 고유값을 도출한다."
    ],
    answer: 2,
    explanation: "PCA는 데이터의 **'분산(Variance)이 가장 큰 방향'**을 주성분 축으로 찾기 때문에, 변수들의 단위나 척도(Scale)가 다르면 단위가 큰 변수(예: 연봉 vs 나이)가 분산을 독점하여 주성분을 심각하게 왜곡합니다. 따라서 **PCA 수행 전에는 반드시 모든 변수를 표준화(Standardization, 평균 0, 분산 1)해야 합니다.**\n\n💡 실제 기출 포인트: 12회 3과목 차원축소(3문항)에서 PCA의 특징, 고유값/특이값 분해(SVD), 표준화 필요성이 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. PCA는 정보 손실을 최소화(분산 최대화)하는 직교 기저를 찾습니다.",
      "올바른 설명입니다. 주성분들은 서로 직교하므로 상관계수가 0입니다.",
      "정답입니다. 스케일에 매우 민감하므로 표준화(스케일링)가 필수적입니다.",
      "올바른 설명입니다. 고유값 분해나 SVD(특이값 분해)를 기반으로 계산합니다."
    ],
    memorizationPoint: "PCA 핵심: 분산 최대화, 직교(상관=0), 고유값 분해/SVD 사용, 사전 표준화(Standardization) 필수!",
    examinerTip: "💡 출제위원 함정: 'PCA는 스케일링이 필요 없다'는 보기는 데이터 전처리/차원축소의 대표 오답 함정입니다."
  },
  {
    id: "Q_PASS_425",
    subject: 4,
    chapter: "분석모형 평가 및 진단",
    sectionId: "s4-1",
    cardId: "c4-1",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 불균형 데이터 분류 모델의 성능 평가에서 정밀도(Precision)가 0.8이고 재현율(Recall)이 0.6으로 측정되었다. 정밀도와 재현율의 조화평균인 'F1-Score'의 계산값으로 가장 적절한 것은?",
    choices: [
      "0.686",
      "0.700",
      "0.720",
      "0.750"
    ],
    answer: 0,
    explanation: "F1-Score는 정밀도(Precision)와 재현율(Recall)의 조화평균(Harmonic Mean)입니다.\n\n• 공식: F1 = 2 × (Precision × Recall) / (Precision + Recall)\n• 계산: 2 × (0.8 × 0.6) / (0.8 + 0.6) = 2 × 0.48 / 1.4 = 0.96 / 1.4 = 96 / 140 ≈ **0.6857 (약 0.686)**\n\n참고) 단순 산술평균은 (0.8 + 0.6) / 2 = 0.700이지만, 조화평균은 낮은 쪽에 더 큰 페널티를 부여하므로 산술평균보다 작은 0.686이 나옵니다.\n\n💡 실제 기출 포인트: 12회 4과목 분류 성능(3문항)에서 F1-Score 및 F2-Score의 계산 문제가 출제되었습니다.",
    whyWrong: [
      "정답입니다. F1 = 2 × (0.8 × 0.6) / (0.8 + 0.6) ≈ 0.686 입니다.",
      "단순 산술평균 (0.8 + 0.6) / 2 = 0.700 으로 계산한 오답입니다.",
      "기하평균 √(0.8 × 0.6) ≈ 0.693 과 유사한 오답입니다.",
      "잘못된 계산입니다."
    ],
    memorizationPoint: "F1-Score = 2 × (P × R) / (P + R) (조화평균). 산술평균보다 항상 작거나 같음",
    examinerTip: "💡 출제위원 꿀팁: F_β Score 공식에서 β=1이면 F1(동일 비중), β=2이면 F2(재현율에 2배 가중치), β=0.5이면 F0.5(정밀도에 2배 가중치)입니다."
  },
  {
    id: "Q_PASS_426",
    subject: 4,
    chapter: "분석모형 개선",
    sectionId: "s4-2",
    cardId: "c5-17",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원 킬러] 머신러닝 파이프라인 구축 시 학습 데이터와 테스트 데이터 간의 경계가 무너져 모델 평가가 비정상적으로 낙관적으로 나오는 '데이터 누수(Data Leakage)'에 해당하는 상황으로 가장 올바른 것은?",
    choices: [
      "Train 데이터와 Test 데이터를 분할하기 전에 전체 데이터셋에 대해 평균과 표준편차를 구해 정규화(Standardization)를 적용하였다.",
      "K-Fold 교차 검증을 수행할 때 매 Fold마다 Train 세트만으로 결측치 대체값을 학습(Fit)하여 Validation 세트에 적용(Transform)하였다.",
      "시계열 데이터 예측 모델을 학습시킬 때 미래 시점의 데이터를 엄격히 배제하고 과거 데이터만을 사용하여 롤링 윈도우 방식으로 검증하였다.",
      "타겟 변수(Y)를 생성하는 데 직접적으로 기여하거나 사후에 발생하는 정보가 담긴 변수를 사전에 식별하여 피처 목록에서 제거하였다."
    ],
    answer: 0,
    explanation: "데이터를 Train과 Test로 분리하기 전에 **전체 데이터셋을 대상으로 평균, 표준편차, 최대/최소값을 구하거나 결측치를 대치하는 행위는 미래/테스트 데이터의 통계 정보가 Train 모델 학습에 사전 유출되는 전형적인 '데이터 누수(Data Leakage)'**입니다. 이는 개발 환경에서는 성능이 매우 높게 나오지만 실제 운영 배포 시 모델 성능이 급락하는 치명적 원인이 됩니다.\n\n💡 실제 기출 포인트: 12회 4과목에서 실무 지향적 키워드인 Data Leakage의 정의와 발생 원인을 묻는 문제가 복원되었습니다.",
    whyWrong: [
      "정답입니다. Train/Test 분할 전 전체 데이터로 스케일링/전처리를 수행하는 것이 대표적인 Data Leakage입니다.",
      "올바른 전처리 방식입니다 (Fold 내 Train으로만 Fit 수행).",
      "올바른 시계열 검증 방식입니다 (Time-series Split / Purged CV).",
      "데이터 누수를 방지하기 위한 올바른 피처 엔지니어링 조치입니다."
    ],
    memorizationPoint: "Data Leakage 방지 원칙: 분할(Split) 먼저! 전처리 Fit(학습)은 오직 Train 데이터로만 수행할 것!",
    examinerTip: "💡 출제위원 함정: '전체 데이터로 정규화하면 데이터셋 전체의 통계적 대표성이 높아져 일반화 성능이 향상된다'는 말은 전형적인 Data Leakage 낚시 지문입니다."
  },
  {
    id: "Q_PASS_427",
    subject: 1,
    chapter: "데이터 수집 및 저장 계획",
    sectionId: "s1-4",
    cardId: "c1-20",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 빅데이터 수집 기술 및 NoSQL 데이터베이스에 관한 설명으로 가장 옳지 않은 것은?",
    choices: [
      "척와(Chukwa)는 분산 환경에서 발생하는 대량의 로그 데이터를 HDFS에 안정적으로 실시간 수집 및 저장하는 아파치 하둡 에코시스템 프레임워크이다.",
      "스크래퍼(Scraper)와 크롤러(Crawler)는 웹 페이지의 HTML 문서를 탐색하고 필요한 비정형/반정형 데이터를 파싱(Parsing)하여 수집하는 도구이다.",
      "MongoDB는 대표적인 키-값(Key-Value) 저장소 NoSQL로서, 복잡한 트리 구조나 중첩된 JSON 형태의 BSON 문서를 저장할 수 없다.",
      "플룸(Flume)은 대량의 로그 데이터를 이벤트(Event) 기반으로 에이전트(Source-Channel-Sink)를 통해 신뢰성 있게 수집/전송하는 기술이다."
    ],
    answer: 2,
    explanation: "MongoDB는 Key-Value 저장소가 아니라 **'문서 지향(Document-Oriented) NoSQL 데이터베이스'**입니다. 복잡하고 유연한 계층 구조를 갖는 JSON 형태의 **BSON(Binary JSON) 문서 포맷**으로 데이터를 저장하고 인덱싱/쿼리하는 것이 가장 핵심적인 특징입니다.\n(참고: Redis, Memcached, DynamoDB 등이 Key-Value NoSQL에 해당합니다.)\n\n💡 실제 기출 포인트: 12회 1과목에서 척와/스크래퍼/파싱(3문항) 및 NoSQL(MongoDB) 관련 문제가 복원되었습니다.",
    whyWrong: [
      "올바른 설명입니다. Chukwa는 대용량 분산 로그 수집 프레임워크입니다.",
      "올바른 설명입니다. 스크래핑/크롤링은 웹 데이터 수집 기술입니다.",
      "정답입니다. MongoDB는 문서 지향(Document) DB이며 BSON 포맷을 완벽 지원합니다.",
      "올바른 설명입니다. Flume의 3대 핵심 구조는 Source, Channel, Sink 입니다."
    ],
    memorizationPoint: "NoSQL 유형: Document(MongoDB, CouchDB), Key-Value(Redis), Column-Family(Cassandra, HBase), Graph(Neo4j)",
    examinerTip: "💡 출제위원 꿀팁: NoSQL 4대 분류(문서형, 키-값형, 컬럼형, 그래프형)와 대표 제품 매칭 문제는 1과목 단골 문제입니다."
  },
  {
    id: "Q_PASS_428",
    subject: 2,
    chapter: "분석 변수 처리",
    sectionId: "s2-3",
    cardId: "c2-13",
    difficulty: "medium",
    questionType: "multiple-choice",
    question: "[12회 기출복원] 데이터의 정규성(Normality)을 만족시키고 등분산성을 확보하기 위해 왜곡된 연속형 변수를 변환할 때 사용하는 '박스-콕스 변환(Box-Cox Transformation)'에 관한 설명으로 가장 옳은 것은?",
    choices: [
      "박스-콕스 변환은 변수값에 음수(Negative value)나 0이 다수 포함되어 있을 때 가장 최적의 변환 성능을 발휘한다.",
      "모수 파라미터 λ(람다) 값이 1일 때는 데이터에 아무런 변환을 가하지 않는 원본 데이터(y - 1)와 동일한 형태가 된다.",
      "모수 파라미터 λ(람다) 값이 0일 때는 로그 변환(ln y)이 아닌 제곱근 변환(√y)으로 수렴한다.",
      "박스-콕스 변환은 오직 범주형 명목 변수를 원-핫 인코딩(One-hot encoding)할 때만 적용하는 기법이다."
    ],
    answer: 1,
    explanation: "박스-콕스 변환 공식: y^(λ) = (y^λ - 1) / λ (단, y > 0)\n\n1) **λ = 1 일 때:** (y¹ - 1) / 1 = y - 1 로서, 데이터에 단순 상수 이동만 적용되어 **원본의 선형 형태를 그대로 유지**합니다.\n2) **λ = 0 일 때:** 극한값에 의해 **자연로그 변환(ln y)**이 됩니다.\n3) **λ = 0.5 일 때:** **제곱근 변환(√y)**이 됩니다.\n4) **주의점:** 박스-콕스 변환은 **반드시 모든 데이터 값이 양수(y > 0)일 때만 적용**할 수 있습니다 (음수나 0이 있으면 상수 c를 더해 양수화 후 변환).\n\n💡 실제 기출 포인트: 12회 2과목 데이터 전처리(7문항)에서 Box-Cox 변환의 파라미터 λ에 따른 변환 형태(λ=0은 로그, λ=1은 무변환)가 복원되었습니다.",
    whyWrong: [
      "Box-Cox 변환은 모든 데이터가 양수(y > 0)여야만 적용 가능합니다.",
      "정답입니다. λ = 1 이면 선형 변환(y - 1)으로 데이터 형태가 유지됩니다.",
      "λ = 0 일 때는 자연로그 변환(ln y)이 적용됩니다.",
      "연속형 수치 변수의 정규분포화를 위한 변환 기법입니다."
    ],
    memorizationPoint: "Box-Cox 변환: y > 0 필수! | λ = 0 이면 로그변환(ln y) | λ = 0.5 이면 제곱근(√y) | λ = 1 이면 무변환(y-1) | λ = 2 이면 제곱변환",
    examinerTip: "💡 출제위원 함정: 'Box-Cox 변환에서 λ=0일 때 제곱근 변환이 된다'거나 '음수 데이터에 바로 적용 가능하다'는 대표 오답 함정입니다."
  }
];

// cbt_bank.json 에 추가
const existingIds = new Set(bank.questions.map(q => q.id));
let addedCount = 0;
new12thQuestions.forEach(q => {
  if (!existingIds.has(q.id)) {
    bank.questions.push(q);
    existingIds.add(q.id);
    addedCount++;
  }
});
fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`[cbt_bank.json] Added ${addedCount} new 12th exam killer questions! Total: ${bank.questions.length}`);

// =========================================================================
// 2. data.json 중요도 및 12회 기출 핵심 포인트 보강
// =========================================================================

// 보강할 핵심 카드 수정
data.sections.forEach(sec => {
  sec.cards.forEach(card => {
    // 1) c4-2: 회귀 평가지표 카드 강화
    if (card.id === 'c4-2') {
      card.title = "회귀 및 군집모델 평가지표 🔥 [12회 기출 집중 출제]";
      card.content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,158,11,0.12)); border-left:4px solid #ef4444; padding:12px 16px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#dc2626; font-size:1.05rem;'>🔥 [12회 기출 집중 출제] 회귀 평가지표 5종 공식 및 계산 완벽 암기</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>실제값(y)과 예측값(ŷ)의 차이를 이용해 MSE, RMSE, MAE, MAPE를 직접 계산하는 문제가 매회 출제됩니다. 영문 약어와 한글 명칭을 함께 외우세요!</p>
</div>

<h4 class='concept-block-h4'>1. 회귀모형 핵심 5대 평가지표 비교 공식</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 지표:</span>
  <span class='concept-keyword-tag'>MSE(평균제곱오차)</span>
  <span class='concept-keyword-tag'>RMSE(평균제곱근오차)</span>
  <span class='concept-keyword-tag'>MAE(평균절대오차)</span>
  <span class='concept-keyword-tag'>MAPE(평균절대백분율오차)</span>
  <span class='concept-keyword-tag'>R²(결정계수)</span>
</div>

<table style='width:100%; border-collapse:collapse; margin:14px 0; font-size:0.9rem; text-align:left;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.05); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px;'>지표명</th>
      <th style='padding:8px;'>계산 공식</th>
      <th style='padding:8px;'>핵심 특징 및 함정</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MSE</strong><br>(Mean Squared Error / 평균제곱오차)</td>
      <td style='padding:8px;'><code>1/n × Σ(y - ŷ)²</code></td>
      <td style='padding:8px;'>오차 제곱 평균. <strong>이상치(Outlier)에 극도로 민감함</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>RMSE</strong><br>(Root MSE / 평균제곱근오차)</td>
      <td style='padding:8px;'><code>√(MSE)</code></td>
      <td style='padding:8px;'>MSE에 루트를 씌워 <strong>실제 타겟 변수와 단위(Scale)를 일치시킴</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MAE</strong><br>(Mean Absolute Error / 평균절대오차)</td>
      <td style='padding:8px;'><code>1/n × Σ|y - ŷ|</code></td>
      <td style='padding:8px;'>오차 절댓값 평균. <strong>이상치 영향에 덜 민감(Robust)하고 직관적</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MAPE</strong><br>(Mean Absolute Percentage Error)</td>
      <td style='padding:8px;'><code>100/n × Σ|(y - ŷ) / y|</code></td>
      <td style='padding:8px;'>오차 비율의 절댓값 평균(%). <strong>y=0일 때 나눗셈 불가 주의</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>R² (결정계수)</strong><br>(Coefficient of Determination)</td>
      <td style='padding:8px;'><code>1 - (SSE / SST) = SSR / SST</code></td>
      <td style='padding:8px;'>회귀모형의 설명력 (0~1 범위, <strong>1에 가까울수록 성능 우수</strong>)</td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. 군집분석 평가지표</h4>
<ul class='concept-block-ul'>
  <li><strong>실루엣 계수 (Silhouette Coefficient):</strong> -1 ~ 1 사이의 값. 1에 가까울수록 완벽한 군집화 (0.5 이상이면 타당).</li>
  <li><strong>Dunn Index:</strong> 군집 간 거리의 최솟값 / 군집 내 거리의 최댓값 (클수록 우수).</li>
</ul>

<div class='concept-block-note'>
  💡 <strong>[12회 실전 계산 꿀팁]:</strong><br>
  실제 y = [1.2, 2.5, 2.7], 예측 ŷ = [1.4, 2.7, 2.6] 일 때:<br>
  • 오차: [-0.2, -0.2, +0.1]<br>
  • 제곱 오차 합 = 0.04 + 0.04 + 0.01 = 0.09 → <strong>MSE = 0.09 / 3 = 0.03</strong><br>
  • 절대 오차 합 = 0.2 + 0.2 + 0.1 = 0.5 → <strong>MAE = 0.5 / 3 ≈ 0.167</strong>
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 회귀 평가 지표 중 MAE는 MSE에 비해 이상치(Outlier)의 영향을 덜 받는다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>O</strong> - MSE는 오차를 제곱하므로 큰 오차가 발생하면 값이 기하급수적으로 커져 이상치에 매우 취약하지만, MAE는 선형 절댓값이므로 이상치에 견고(Robust)합니다.</div>
</div>`;
    }

    // 2) c5-17: 과적합 방지 기법 & Bias-Variance Tradeoff 강화
    if (card.id === 'c5-17') {
      card.title = "과적합(Overfitting) 방지 기법 및 편향-분산 상충관계 🔥 [12회 기출 집중 출제]";
      card.content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.12), rgba(59,130,246,0.12)); border-left:4px solid #3b82f6; padding:12px 16px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#2563eb; font-size:1.05rem;'>🔥 [12회 기출 집중 출제] 편향-분산 트레이드오프 (Bias-Variance Tradeoff) 완벽 해석</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>모델 복잡도 증가에 따른 편향과 분산의 변화, 그리고 학습 에러 vs 검증 에러 곡선 해석 문제가 12회 핵심으로 출제되었습니다.</p>
</div>

<h4 class='concept-block-h4'>1. 편향-분산 상충관계 (Bias-Variance Tradeoff)</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span>
  <span class='concept-keyword-tag'>편향(Bias)</span>
  <span class='concept-keyword-tag'>분산(Variance)</span>
  <span class='concept-keyword-tag'>과소적합</span>
  <span class='concept-keyword-tag'>과적합</span>
  <span class='concept-keyword-tag'>최적모델</span>
</div>

<ul class='concept-block-ul'>
  <li><strong>편향 (Bias²):</strong> 모델이 너무 단순하여 데이터의 본질적 패턴을 잡지 못하는 오차 → <strong>모델 복잡도 ↑ 시 편향 ↓</strong></li>
  <li><strong>분산 (Variance):</strong> 모델이 훈련 데이터의 사소한 노이즈까지 과도하게 민감하게 학습하는 변동성 → <strong>모델 복잡도 ↑ 시 분산 ↑</strong></li>
  <li><strong>Total Error (총 오차):</strong> <code>Bias² + Variance + Irreducible Error (줄일 수 없는 오차)</code></li>
  <li><strong>과소적합 (Underfitting):</strong> High Bias & Low Variance (모델이 지나치게 단순)</li>
  <li><strong>과적합 (Overfitting):</strong> Low Bias & High Variance (모델이 지나치게 복잡)</li>
  <li><strong>최적 모델 (Optimal Model):</strong> 편향과 분산의 합(Total Error)이 최소가 되는 균형 지점</li>
</ul>

<h4 class='concept-block-h4'>2. 학습 주기(Training cycle)와 에러 곡선 추이</h4>
<ul class='concept-block-ul'>
  <li><strong>Training Error:</strong> 학습이 계속 반복(Epoch ↑)될수록 0에 수렴하며 <strong>지속적으로 하락</strong>.</li>
  <li><strong>Testing Error:</strong> 처음에는 하락하다가 최적 모델 시점을 지나면 과적합으로 인해 <strong>다시 상승 (U자형 반등)</strong>.</li>
</ul>

<h4 class='concept-block-h4'>3. 과적합(Overfitting) 방지 5대 핵심 솔루션</h4>
<ol class='concept-block-ul' style='padding-left:20px;'>
  <li><strong>데이터 증강 (Data Augmentation):</strong> 훈련 데이터의 양을 늘려 일반화 능력 향상.</li>
  <li><strong>정규화 / 규제 (Regularization):</strong> 가중치 축소 (L1 Lasso: 변수 선택 효과 / L2 Ridge: 가중치 감쇠).</li>
  <li><strong>차원 축소 및 피처 선택:</strong> 불필요한 노이즈 변수 제거 (PCA, RFE).</li>
  <li><strong>드롭아웃 (Dropout) & 앙상블 (Ensemble):</strong> 무작위 노드 비활성화 및 배깅/랜덤포레스트 적용.</li>
  <li><strong>조기 종료 (Early Stopping) & 교차검증 (Cross Validation):</strong> 검증 오차가 반등할 때 학습 즉시 중단.</li>
</ol>

<div class='concept-block-note'>
  💡 <strong>[12회 킬러 개념 - Data Leakage (데이터 누수)]:</strong><br>
  Train/Test를 분할하기 전에 전체 데이터셋으로 스케일링(Standardization)하거나 결측치를 대치하면 미래 Test 정보가 Train에 유출되는 <strong>Data Leakage</strong>가 발생합니다. 반드시 <strong>Train 세트로만 Fit</strong>하고 Test는 Transform만 적용해야 합니다!
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 모델의 복잡도를 계속 높이면 테스트 데이터에 대한 에러가 지속적으로 0에 수렴한다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 모델 복잡도가 지나치게 높아지면 분산(Variance)이 급격히 증가하여 테스트 데이터에 대한 오차(Testing Error)는 다시 상승(과적합)합니다.</div>
</div>`;
    }

    // 3) c2-1: 분석모형 설계 / 지도학습 체계도 강화
    if (card.id === 'c2-1') {
      card.title = "분석모형 선정 및 지도학습 분류 체계 🔥 [12회 기출 핵심]";
      card.content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.12)); border-left:4px solid #10b981; padding:12px 16px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#059669; font-size:1.05rem;'>🔥 [12회 기출 핵심] 지도학습 타겟 변수 유형별 알고리즘 완벽 매핑</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>종속변수 Y가 연속형(회귀)인지 범주형(분류)인지, 그리고 둘 다 가능한 복합 알고리즘을 묻는 문제가 매회 단골 출제됩니다.</p>
</div>

<h4 class='concept-block-h4'>1. 지도학습 알고리즘 유형 분류</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span>
  <span class='concept-keyword-tag'>회귀(연속형)</span>
  <span class='concept-keyword-tag'>분류(범주형)</span>
  <span class='concept-keyword-tag'>트리/신경망(둘다가능)</span>
</div>

<ul class='concept-block-ul'>
  <li><strong>① 회귀(Regression) 전용 [Y: 연속형]:</strong> 선형회귀(단순/다중/릿지/라쏘), 다항회귀</li>
  <li><strong>② 분류(Classification) 전용 [Y: 범주형]:</strong> 로지스틱 회귀(Logistic), 판별분석(LDA/QDA), 나이브 베이즈(Naive Bayes)</li>
  <li><strong>③ 회귀 & 분류 둘 다 가능한 만능 알고리즘:</strong>
    <br>• <strong>의사결정나무 (Decision Tree)</strong>
    <br>• <strong>랜덤포레스트 (Random Forest)</strong>
    <br>• <strong>K-최근접 이웃 (K-NN)</strong>
    <br>• <strong>서포트 벡터 머신 (SVM)</strong>
    <br>• <strong>인공신경망 (ANN / DNN / Transformer)</strong> ★12회 집중출제
    <br>• <strong>앙상블 기법 (Bagging, Boosting, Stacking)</strong>
  </li>
</ul>

<h4 class='concept-block-h4'>2. 머신러닝 분석 파이프라인</h4>
<p style='font-size:0.92rem;'>원 데이터 → EDA(탐색적 데이터 분석) → 데이터 전처리 → Train(80%) / Test(20%) 분할 → Train 내 K-Fold 검증 및 하이퍼파라미터 튜닝 → 최종 모형 평가(회귀: MSE/R², 분류: F1/ROC-AUC)</p>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. '로지스틱 회귀'는 이름에 회귀가 들어가므로 연속형 종속변수를 예측하는 회귀 전용 알고리즘이다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 로지스틱 회귀는 시그모이드(Sigmoid) 함수를 통해 사건 발생 확률(0~1)을 구해 범주(0 또는 1)를 예측하는 대표적인 **'분류(Classification)'** 알고리즘입니다. (가장 빈출되는 낚시 지문!)</div>
</div>`;
    }

    // 4) c2-22: 추정과 가설검정 강화
    if (card.id === 'c2-22') {
      card.title = "추정과 가설검정 (1종/2종 오류 & 비모수검정) 🔥 [12회 기출 7문항 최다출제]";
      card.content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12)); border-left:4px solid #f59e0b; padding:12px 16px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#d97706; font-size:1.05rem;'>🔥 [12회 기출 최다 빈출 - 7문항 출제!] 가설검정 오류와 비모수 검정 완벽 정리</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>1종 오류, 2종 오류, 유의수준, 검정력, 그리고 정규성을 만족하지 않을 때 쓰는 비모수 검정(맨-휘트니, 윌콕슨)을 완벽히 정복하세요.</p>
</div>

<h4 class='concept-block-h4'>1. 가설검정 오류와 검정력</h4>
<ul class='concept-block-ul'>
  <li><strong>귀무가설(H₀):</strong> 차이가 없다, 효과가 없다 (기존 상태 유지).</li>
  <li><strong>대립가설(H₁):</strong> 차이가 있다, 효과가 있다 (연구자가 입증하려는 주장).</li>
  <li><strong>제1종 오류 (α):</strong> H₀가 참인데 잘못 기각하는 오류 (= 유의수준).</li>
  <li><strong>제2종 오류 (β):</strong> H₀가 거짓(H₁ 참)인데 H₀를 채택하는 오류.</li>
  <li><strong>검정력 (1 - β):</strong> H₁이 참일 때 H₀를 올바르게 기각할 확률 (클수록 좋음).</li>
  <li><strong>상충 관계:</strong> α를 낮추면 β가 증가함. <strong>두 오류를 동시에 줄이는 유일한 방법은 표본 크기(n)를 늘리는 것</strong>.</li>
</ul>

<h4 class='concept-block-h4'>2. 모수 검정 vs 비모수 검정 매핑 (필수 암기)</h4>
<table style='width:100%; border-collapse:collapse; margin:10px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.05); border-bottom:2px solid var(--border-color);'>
      <th style='padding:6px;'>검정 목적</th>
      <th style='padding:6px;'>모수 검정 (정규성 O)</th>
      <th style='padding:6px;'>비모수 검정 (정규성 X, 순위)</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:6px;'>독립 2표본 평균 비교</td>
      <td style='padding:6px;'>독립표본 t-검정</td>
      <td style='padding:6px;'><strong>맨-휘트니 U 검정 (Mann-Whitney U)</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:6px;'>대응 2표본(전/후) 비교</td>
      <td style='padding:6px;'>대응표본 t-검정</td>
      <td style='padding:6px;'><strong>윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank)</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:6px;'>3개 이상 집단 평균 비교</td>
      <td style='padding:6px;'>일원배치 분산분석 (ANOVA)</td>
      <td style='padding:6px;'><strong>크루스칼-왈리스 검정 (Kruskal-Wallis)</strong></td>
    </tr>
  </tbody>
</table>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 유의수준(α)을 0.05에서 0.01로 줄이면 제2종 오류(β)도 함께 줄어든다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 유의수준 α와 2종 오류 β는 상충(Trade-off) 관계이므로, α를 줄이면 귀무가설 기각이 까다로워져 β는 반대로 증가합니다.</div>
</div>`;
    }

    // 5) c3-13-2: Transformer & Attention 강화
    if (card.id === 'c3-13-2') {
      card.title = "어텐션 메커니즘과 트랜스포머 (Attention & Transformer) 🔥 [12회 신경향 킬러]";
      card.content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(147,51,234,0.12), rgba(59,130,246,0.12)); border-left:4px solid #9333ea; padding:12px 16px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#7e22ce; font-size:1.05rem;'>🔥 [12회 기출 신경향 킬러] Transformer & Self-Attention 핵심 구조</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>RNN을 완전히 대체하고 현대 거대언어모델(LLM)의 근간이 된 Transformer의 4대 핵심 원리를 이해하세요.</p>
</div>

<h4 class='concept-block-h4'>1. 트랜스포머(Transformer)의 4대 핵심 구조</h4>
<ul class='concept-block-ul'>
  <li><strong>완전 병렬화 (Parallel Processing):</strong> RNN의 순차적(Step-by-step) 계산 한계를 극복하고 시퀀스 전체를 한 번에 병렬 연산하여 학습 속도 극대화.</li>
  <li><strong>장기 의존성 (Long-term Dependency) 극복:</strong> 모든 단어 쌍 간의 거리에 무관하게 직접 어텐션을 계산하여 정보 소실 해결.</li>
  <li><strong>Self-Attention (Q, K, V):</strong>
    <br>• <strong>Query (Q):</strong> 질문을 던지는 단어
    <br>• <strong>Key (K):</strong> 대조 대상이 되는 단어
    <br>• <strong>Value (V):</strong> 실제 단어의 의미가 담긴 정보
    <br>• <code>Attention(Q, K, V) = Softmax(Q·Kᵀ / √d_k) · V</code>
  </li>
  <li><strong>위치 인코딩 (Positional Encoding):</strong> 시퀀스를 병렬로 입력받기 때문에 **단어의 위치와 순서 정보를 주입하기 위해 임베딩에 주기 함수(Sin, Cos) 기반 위치 벡터를 필수적으로 더함**.</li>
</ul>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. Transformer 모델은 단어를 순서대로 처리하므로 위치 인코딩(Positional Encoding)이 불필요하다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - Transformer는 모든 단어를 병렬로 한 번에 입력받으므로 순서 정보가 없습니다. 따라서 **위치 인코딩을 반드시 추가**해야 합니다.</div>
</div>`;
    }
  });
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`[data.json] Successfully updated concepts with 12th exam highlights & master summaries!`);
