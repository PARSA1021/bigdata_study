const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// s5-2 섹션 탐색
let s52 = data.sections.find(s => s.id === 's5-2');
if (!s52) {
  s52 = {
    id: "s5-2",
    num: "02",
    title: "12회 기출특강 & 최신 출제 트렌드 로드맵",
    cards: []
  };
  data.sections.push(s52);
} else {
  s52.title = "12회 기출특강 & 합격 로드맵 마스터 🔥";
}

// 12회 기출 특강 전문 카드 세트 (c5-2-6 ~ c5-2-11)
const roadmapCards = [
  {
    id: "c5-2-6",
    title: "12회 총평 & 합격률 30% 미만 급락 원인 및 과목별 비중 분석 🔥",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.15), rgba(147,51,234,0.15)); border-left:5px solid #dc2626; padding:16px 20px; border-radius:10px; margin-bottom:18px;'>
  <strong style='color:#dc2626; font-size:1.15rem;'>📊 [12회 기출 총평] 합격률 30% 미만 시대의 필기 합격 전략</strong>
  <p style='margin:8px 0 0 0; font-size:0.95rem; color:var(--text-color); line-height:1.65;'>
    빅데이터분석기사 필기는 9회차부터 50% 밑으로 떨어졌으며, <strong>최근 11회 및 12회 시험에서는 30% 미만으로 급락</strong>했습니다. 단순 암기식 문제보다는 <strong>이론의 전체적인 이해, 수학·통계적 계산, 최신 AX(AI 전환) 딥러닝 아키텍처, 실무 데이터 파이프라인</strong>의 변별력이 대폭 강화되었습니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 최근 난이도 상승 3대 핵심 원인</h4>
<ul class='concept-block-ul'>
  <li><strong>① AX 시대 인공신경망(딥러닝) 비중 급증:</strong> Transformer, Multi-Head Attention, Scaled Dot-Product, 위치 인코딩(Positional Encoding), 활성화 함수(ReLU)의 기울기 소실 극복 등 최신 딥러닝 구조가 집중 출제됨.</li>
  <li><strong>② 수학·통계적 지식 및 가설검정 심화:</strong> 2과목에서 가설검정(대응표본 t-검정, 맨-휘트니 U검정, 카이제곱 독립성 검정)이 무려 7문제 출제되며 과락의 주원인이 됨.</li>
  <li><strong>③ 신유형 실무 개념 대거 출제:</strong> 데이터 누수(Data Leakage), Bias-Variance Tradeoff 곡선 해석, Box-Cox 변환, 맵리듀스 분산캐시 조인, NoSQL(MongoDB BSON 문서) 등 실무형 개념 다수 등장.</li>
</ul>

<h4 class='concept-block-h4'>2. 12회 과목별 실제 출제 문항 비중 분석표</h4>
<table style='width:100%; border-collapse:collapse; margin:14px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.06); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px;'>과목</th>
      <th style='padding:8px;'>핵심 출제 테마 및 문항수</th>
      <th style='padding:8px;'>초단기 공략 팁</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>1과목 기획</strong></td>
      <td style='padding:8px;'>척와/스크래핑/파싱(3), KDD vs CRISP-DM(2), 빅데이터SW/NoSQL(2), 맵리듀스 조인(2), 비식별화 모델(2), 마스터플랜(2)</td>
      <td style='padding:8px;'>수집 프레임워크(Chukwa, Flume)와 분석방법론 순서 암기로 80점 이상 확보</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>2과목 탐색</strong></td>
      <td style='padding:8px;'><strong style='color:#dc2626;'>가설검정(7), 데이터 전처리(7)</strong>, 기초통계(5), 불균형데이터(1), 계통추출(1)</td>
      <td style='padding:8px;'><strong>전체 20문제 중 19문제가 가설검정+전처리+기초통계에 집중!</strong> 계산 공식 완벽 정복 필수</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>3과목 모델링</strong></td>
      <td style='padding:8px;'>선형회귀(4), 인공신경망/트랜스포머(3), 앙상블(3), 차원축소 PCA(3), SVM(2), 시계열(2)</td>
      <td style='padding:8px;'>선형회귀(VIF/잔차/릿지)와 최신 신경망(Attention), 앙상블(배깅/부스팅) 집중 공략</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>4과목 결과해석</strong></td>
      <td style='padding:8px;'>시각화(5), 분류성능 F1/F2/ROC(3), 교차검증 LOOCV(2), 편향-분산 곡선(1), 데이터 누수(1)</td>
      <td style='padding:8px;'>회귀 평가지표 계산(MSE/MAE)과 혼동행렬(F1/F2/ROC), 편향-분산 그래프 해석 마스터</td>
    </tr>
  </tbody>
</table>

<div class='concept-block-note'>
  💡 <strong>[합격 기준 및 전략]:</strong><br>
  • <strong>합격 커트라인:</strong> 전 과목 평균 60점 이상 (80문제 중 48문제 이상 정답)<br>
  • <strong>과락 기준:</strong> 과목당 40점 미만 (20문제 중 7문제 이하 정답 시 불합격)<br>
  • <strong>전략:</strong> 1과목과 4과목에서 75~80점을 획득하고, 난도가 높은 2과목(가설검정)과 3과목(모델링)에서 65점 이상을 안정적으로 확보하는 것이 최선의 합격 공식입니다.
</div>
`
  },
  {
    id: "c5-2-7",
    title: "12회 4과목 킬러: 회귀 성능 평가지표 5종 계산 공식 완벽 뽀개기 🔥",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12)); border-left:4px solid #f59e0b; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#d97706; font-size:1.05rem;'>🔥 [12회 기출 집중 출제] 회귀 평가지표 5종 공식 및 실제 계산법</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>실제값(y)과 예측값(ŷ)의 차이를 이용해 MSE, RMSE, MAE, MAPE, R²을 직접 계산하는 문제가 매회 출제됩니다.</p>
</div>

<h4 class='concept-block-h4'>1. 회귀 평가지표 5대 핵심 공식 비교표</h4>
<table style='width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.05); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px;'>지표명</th>
      <th style='padding:8px;'>공식</th>
      <th style='padding:8px;'>핵심 특징 및 출제 함정</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MSE</strong><br>(Mean Squared Error / 평균제곱오차)</td>
      <td style='padding:8px;'><code>1/n × Σ(y - ŷ)²</code></td>
      <td style='padding:8px;'>오차 제곱의 평균. <strong>이상치(Outlier)에 극도로 민감</strong> (오차가 클수록 페널티 폭증)</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>RMSE</strong><br>(Root MSE / 평균제곱근오차)</td>
      <td style='padding:8px;'><code>√(MSE)</code></td>
      <td style='padding:8px;'>MSE에 루트를 씌워 <strong>실제 타겟 변수 y와 측정 단위(Scale)를 일치</strong>시킴</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MAE</strong><br>(Mean Absolute Error / 평균절대오차)</td>
      <td style='padding:8px;'><code>1/n × Σ|y - ŷ|</code></td>
      <td style='padding:8px;'>오차 절댓값의 평균. <strong>이상치 영향에 덜 민감(Robust)</strong>하고 직관적 해석 가능</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>MAPE</strong><br>(Mean Absolute Percentage Error)</td>
      <td style='padding:8px;'><code>100/n × Σ|(y - ŷ)/y|</code></td>
      <td style='padding:8px;'>오차 비율(%)의 평균. <strong>실제값 y=0일 때 나눗셈 불가(분모가 0) 주의</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>R² (결정계수)</strong><br>(Coefficient of Determination)</td>
      <td style='padding:8px;'><code>1 - (SSE/SST) = SSR/SST</code></td>
      <td style='padding:8px;'>회귀모형의 설명력 (0~1 범위, <strong>1에 가까울수록 회귀선 설명력 우수</strong>)</td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. [12회 기출 실전 예제] 3초 계산 풀이 과정</h4>
<div style='background:var(--paper-subtle); border:1.5px solid var(--line); border-radius:8px; padding:14px 16px; margin:12px 0;'>
  <p style='margin:0 0 10px 0; font-weight:800; color:var(--primary-accent);'>[기출 데이터] 3개 샘플의 실제값과 예측값:</p>
  <ul style='margin:0; padding-left:18px; font-size:0.92rem; line-height:1.7;'>
    <li>샘플 1: 실제 y = 1.2, 예측 ŷ = 1.4 → 오차: -0.2 → <strong>오차² = 0.04</strong>, <strong>|오차| = 0.2</strong></li>
    <li>샘플 2: 실제 y = 2.5, 예측 ŷ = 2.7 → 오차: -0.2 → <strong>오차² = 0.04</strong>, <strong>|오차| = 0.2</strong></li>
    <li>샘플 3: 실제 y = 2.7, 예측 ŷ = 2.6 → 오차: +0.1 → <strong>오차² = 0.01</strong>, <strong>|오차| = 0.1</strong></li>
  </ul>
  <div style='margin-top:12px; padding-top:10px; border-top:1px dashed var(--line); font-size:0.92rem; line-height:1.8;'>
    • <strong>MSE</strong> = (0.04 + 0.04 + 0.01) / 3 = 0.09 / 3 = <strong style='color:#dc2626;'>0.03</strong><br>
    • <strong>RMSE</strong> = √(0.03) ≈ <strong style='color:#dc2626;'>0.173</strong><br>
    • <strong>MAE</strong> = (0.2 + 0.2 + 0.1) / 3 = 0.5 / 3 ≈ <strong style='color:#dc2626;'>0.167</strong>
  </div>
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 이상치(Outlier)가 포함된 데이터셋에서는 MSE가 MAE보다 이상치의 영향을 훨씬 더 크게 받는다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>O</strong> - MSE는 오차를 제곱하므로 큰 오차에 대해 기하급수적으로 큰 페널티를 부여하여 이상치에 극도로 민감합니다. 반면 MAE는 선형 절댓값이므로 이상치에 로버스트(Robust)합니다.</div>
</div>
`
  },
  {
    id: "c5-2-8",
    title: "12회 3·4과목 핵심: 편향-분산 트레이드오프 & 과적합 방지 및 데이터 누수 🔥",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12)); border-left:4px solid #3b82f6; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#2563eb; font-size:1.05rem;'>🔥 [12회 기출 집중 출제] Bias-Variance 곡선 & Training vs Testing Error 완벽 해석</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>모델 복잡도 증가에 따른 편향과 분산의 상충관계 및 학습 에러 vs 검증 에러 곡선 해석 문제가 12회 핵심으로 출제되었습니다.</p>
</div>

<h4 class='concept-block-h4'>1. 편향-분산 상충관계 (Bias-Variance Tradeoff) 2대 그래프 해석</h4>

<div style='display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:14px 0;'>
  <div style='background:var(--paper-subtle); border:1.5px solid var(--line); border-radius:8px; padding:14px;'>
    <strong style='color:#1d4ed8; font-size:0.95rem;'>📈 1) 복잡도(Complexity)에 따른 오차 곡선</strong>
    <ul style='margin:8px 0 0 0; padding-left:18px; font-size:0.88rem; line-height:1.7;'>
      <li><strong>모델 복잡도 ↑:</strong> 편향(Bias²)은 감소 ↓, 분산(Variance)은 증가 ↑</li>
      <li><strong>과소적합 (Underfitting):</strong> High Bias, Low Variance (모델이 너무 단순함)</li>
      <li><strong>과적합 (Overfitting):</strong> Low Bias, High Variance (모델이 너무 복잡함)</li>
      <li><strong>최적 모델:</strong> Total Error = Bias² + Variance + Irreducible Error 가 최소가 되는 균형점</li>
    </ul>
  </div>

  <div style='background:var(--paper-subtle); border:1.5px solid var(--line); border-radius:8px; padding:14px;'>
    <strong style='color:#059669; font-size:0.95rem;'>📉 2) 학습 주기(Training cycle)에 따른 에러 곡선</strong>
    <ul style='margin:8px 0 0 0; padding-left:18px; font-size:0.88rem; line-height:1.7;'>
      <li><strong>Training Error (훈련 오차):</strong> 학습이 지속(Epoch ↑)될수록 0을 향해 <strong>계속해서 단조 하락</strong></li>
      <li><strong>Testing Error (검증 오차):</strong> 처음에는 하락하다가 최적 지점 이후 과적합으로 인해 <strong>다시 상승 (U자형 반등)</strong></li>
      <li><strong>조기 종료 (Early Stopping):</strong> Testing Error가 다시 증가하기 시작하는 시점에 학습을 멈춤</li>
    </ul>
  </div>
</div>

<h4 class='concept-block-h4'>2. 과적합(Overfitting) 해결 5대 핵심 솔루션</h4>
<ol class='concept-block-ul' style='padding-left:20px;'>
  <li><strong>데이터 양 증대:</strong> 데이터 증강(Data Augmentation), 추가 수집</li>
  <li><strong>정규화 / 규제 (Regularization):</strong> L1 Lasso(절댓값 페널티, 계수 0 생성으로 변수 선택), L2 Ridge(제곱 페널티, 가중치 감쇠)</li>
  <li><strong>차원 축소 및 피처 선택:</strong> PCA, RFE, 상관관계가 높은 중복 변수 제거</li>
  <li><strong>드롭아웃 (Dropout) & 앙상블:</strong> 인공신경망 노드 무작위 비활성화, 배깅/랜덤포레스트로 분산 감소</li>
  <li><strong>교차 검증 (Cross Validation):</strong> K-Fold, Stratified K-Fold로 데이터 분할 일반화</li>
</ol>

<div class='concept-block-note' style='background:rgba(239,68,68,0.08); border-left:4px solid #ef4444;'>
  🚨 <strong>[12회 킬러 출제 - Data Leakage (데이터 누수) 절대 금기]:</strong><br>
  Train 데이터와 Test 데이터를 분할하기 전에 <strong>전체 데이터셋으로 평균/표준편차를 계산하여 스케일링(Standardization)을 적용하거나 결측치를 대치하는 행위는 미래/테스트 데이터의 정보가 훈련에 유출되는 치명적인 Data Leakage</strong>입니다. 반드시 <strong>Train 데이터로만 fit</strong>하고 Test 데이터에는 transform만 수행해야 합니다!
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 모델의 복잡도를 무한히 높이면 Training Error와 Testing Error가 모두 0에 수렴한다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - Training Error는 0에 수렴하지만, Testing Error는 분산(Variance) 급증으로 인해 특정 시점 이후 과적합이 발생하여 다시 상승(U자형)합니다.</div>
</div>
`
  },
  {
    id: "c5-2-9",
    title: "12회 3과목 지도학습 맵 & 최신 인공신경망 (Transformer & Attention) 🔥",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(147,51,234,0.12), rgba(59,130,246,0.12)); border-left:4px solid #9333ea; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#7e22ce; font-size:1.05rem;'>🔥 [12회 기출 핵심] 종속변수 유형별 알고리즘 분류 & 최신 딥러닝 아키텍처</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>종속변수 Y가 연속형(회귀)인지 범주형(분류)인지의 매핑과 트랜스포머의 Self-Attention 구조가 12회 시험의 핵심 변별력이었습니다.</p>
</div>

<h4 class='concept-block-h4'>1. 머신러닝 지도학습 알고리즘 3대 분류 체계</h4>
<table style='width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.05); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px;'>구분</th>
      <th style='padding:8px;'>타겟 변수(Y)</th>
      <th style='padding:8px;'>해당 알고리즘</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>① 회귀 전용</strong></td>
      <td style='padding:8px;'>연속형 / 수치형</td>
      <td style='padding:8px;'>선형회귀(단순/다중/릿지/라쏘), 다항회귀</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>② 분류 전용</strong></td>
      <td style='padding:8px;'>범주형 / 이산형</td>
      <td style='padding:8px;'>로지스틱 회귀(Logistic), 판별분석(LDA/QDA), 나이브 베이즈(Naive Bayes)</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>③ 회귀 & 분류<br>둘 다 가능</strong></td>
      <td style='padding:8px;'>연속형 & 범주형<br>모두 지원</td>
      <td style='padding:8px;'>
        • <strong>의사결정나무 (Decision Tree)</strong><br>
        • <strong>랜덤포레스트 (Random Forest)</strong><br>
        • <strong>K-최근접 이웃 (K-NN)</strong><br>
        • <strong>서포트 벡터 머신 (SVM)</strong><br>
        • <strong>인공신경망 (ANN / DNN / Transformer)</strong> ★꼼꼼한 학습 필수<br>
        • <strong>앙상블 (Bagging, Boosting - XGBoost/LightGBM, Stacking)</strong>
      </td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. 트랜스포머(Transformer)와 셀프 어텐션(Self-Attention) 4대 핵심 구조</h4>
<ul class='concept-block-ul'>
  <li><strong>① 완전 병렬 처리 (Parallelism):</strong> 순차적(Sequential)으로 단어를 읽던 RNN/LSTM의 한계를 벗어나 시퀀스 전체를 한 번에 병렬 연산하여 대규모 사전학습(LLM) 가능.</li>
  <li><strong>② 장기 의존성 (Long-term Dependency) 극복:</strong> 문장 내 단어 간 거리에 상관없이 직접 어텐션을 연결하여 이전 정보 소실 문제 해결.</li>
  <li><strong>③ Self-Attention (Q, K, V):</strong>
    <br>• Query(질문), Key(대조키), Value(실제정보)의 내적과 소프트맥스로 단어 간 상관 가중치 계산
    <br>• <code>Attention(Q, K, V) = Softmax(Q·Kᵀ / √d_k) · V</code>
  </li>
  <li><strong>④ 위치 인코딩 (Positional Encoding) 필수:</strong> 병렬 입력으로 인해 단어의 위치/순서를 모르므로, **주기 함수(Sin, Cos) 기반 위치 벡터를 임베딩에 반드시 더해주어야 함**.</li>
</ul>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 나이브 베이즈(Naive Bayes)와 로지스틱 회귀는 연속형 종속변수를 예측하는 회귀 모델이다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 나이브 베이즈와 로지스틱 회귀는 대표적인 **'분류 전용(Classification)'** 알고리즘입니다. (로지스틱 회귀는 이름에 회귀가 들어가지만 실제로는 분류를 수행하는 단골 낚시 문제입니다!)</div>
</div>
`
  },
  {
    id: "c5-2-10",
    title: "12회 2과목 7문항 최다출제: 통계적 가설검정 & 비모수 검정 & 전처리 마스터 🔥",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(16,185,129,0.12)); border-left:4px solid #10b981; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#047857; font-size:1.05rem;'>🔥 [12회 2과목 최다 출제 - 7문항] 가설검정 오류, 비모수 검정 및 Box-Cox 변환</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>1종/2종 오류 관계, t-검정 vs 비모수 검정 매핑, Box-Cox 변환의 파라미터 λ를 완벽히 정복하세요.</p>
</div>

<h4 class='concept-block-h4'>1. 가설검정의 오류와 검정력 (Power of Test)</h4>
<ul class='concept-block-ul'>
  <li><strong>귀무가설(H₀):</strong> 효과가 없다, 차이가 없다 (기존 상태 유지)</li>
  <li><strong>대립가설(H₁):</strong> 효과가 있다, 차이가 있다 (연구자의 주장)</li>
  <li><strong>제1종 오류 (α):</strong> H₀가 참인데 잘못 기각하는 오류 (= 유의수준)</li>
  <li><strong>제2종 오류 (β):</strong> H₀가 거짓(H₁ 참)인데 H₀를 채택하는 오류</li>
  <li><strong>검정력 (1 - β):</strong> H₁이 참일 때 H₀를 올바르게 기각할 확률 (1에 가까울수록 우수)</li>
  <li><strong>오류의 상충관계:</strong> α를 낮추면 귀무가설 기각이 까다로워져 β가 증가함. <strong>두 오류를 동시에 줄이는 유일한 방법은 표본 크기(n)를 늘리는 것</strong></li>
</ul>

<h4 class='concept-block-h4'>2. 모수 검정 vs 비모수 검정 완벽 매핑표</h4>
<table style='width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.05); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px;'>검정 목적</th>
      <th style='padding:8px;'>모수 검정 (정규성 만족 O)</th>
      <th style='padding:8px;'>비모수 검정 (정규성 만족 X, 순위 기반)</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'>독립 2표본 평균/위치 비교</td>
      <td style='padding:8px;'>독립표본 t-검정</td>
      <td style='padding:8px;'><strong style='color:#2563EB;'>맨-휘트니 U 검정 (Mann-Whitney U)</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'>대응 2표본 (동일 표본 전/후 비교)</td>
      <td style='padding:8px;'>대응표본 t-검정 (Paired t-test)</td>
      <td style='padding:8px;'><strong style='color:#2563EB;'>윌콕슨 부호순위 검정 (Wilcoxon Signed-Rank)</strong></td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'>3개 이상 독립 집단 비교</td>
      <td style='padding:8px;'>일원배치 분산분석 (One-way ANOVA)</td>
      <td style='padding:8px;'><strong style='color:#2563EB;'>크루스칼-왈리스 검정 (Kruskal-Wallis)</strong></td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>3. 박스-콕스 변환 (Box-Cox Transformation) 핵심</h4>
<p style='font-size:0.92rem;'>데이터의 정규성을 확보하기 위해 왜곡된 연속형 양수 데이터($y > 0$)를 파라미터 $\lambda$를 이용해 변환하는 기법:</p>
<ul class='concept-block-ul'>
  <li><strong>λ = 1:</strong> 선형 변환 ($y - 1$) → <strong>원본 데이터 형태 유지 (무변환)</strong></li>
  <li><strong>λ = 0:</strong> <strong>자연로그 변환 ($\ln y$)</strong></li>
  <li><strong>λ = 0.5:</strong> <strong>제곱근 변환 ($\sqrt{y}$)</strong></li>
  <li><strong>λ = 2:</strong> 제곱 변환 ($y^2$)</li>
  <li><strong>★ 필수 조건:</strong> 모든 데이터 값이 <strong>반드시 양수($y > 0$)</strong>여야 함 (음수/0이 있으면 상수 c를 더해 보정)</li>
</ul>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 정규성을 만족하지 않는 두 독립 집단의 평균 차이를 비교할 때는 윌콕슨 부호순위 검정을 사용한다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 독립된 두 집단은 **맨-휘트니 U 검정(Mann-Whitney U)**을 사용하며, 윌콕슨 부호순위 검정은 동일 집단의 사전-사후 처치 효과를 비교하는 대응표본(Paired) 비모수 검정입니다.</div>
</div>
`
  },
  {
    id: "c5-2-11",
    title: "12회 시험장 파이널 5분: 전과목 빈출 계산 공식 & 3초 치트키 10선 📄",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-left:5px solid #10b981; padding:16px 20px; border-radius:10px; margin-bottom:18px;'>
  <strong style='color:#047857; font-size:1.1rem;'>📄 [시험장 5분 전] 12회 기출 기반 필수 계산 공식 & 핵심 치트키 10선</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color);'>시험 직전 OMR 마킹 전 반드시 눈에 새겨야 할 10대 계산 공식과 판정 기준입니다.</p>
</div>

<ol class='concept-block-ul' style='padding-left:20px; gap:14px;'>
  <li>
    <strong>1. 표본분산 (Sample Variance):</strong> <code>s² = Σ(x - x̄)² / (n - 1)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>★ 표본분산은 n이 아니라 반드시 <strong>(n - 1)</strong>로 나눔! (불편추정량)</span>
  </li>
  <li>
    <strong>2. 카이제곱 독립성 검정 자유도:</strong> <code>df = (행의 수 - 1) × (열의 수 - 1) = (r - 1)(c - 1)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>예: 3×4 분할표 ➔ (3-1)×(4-1) = 2×3 = <strong>6</strong></span>
  </li>
  <li>
    <strong>3. IQR 이상치 경계 판정:</strong> <code>IQR = Q3 - Q1</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>하한선 = <strong>Q1 - 1.5×IQR</strong> / 상한선 = <strong>Q3 + 1.5×IQR</strong></span>
  </li>
  <li>
    <strong>4. F1-Score (조화평균):</strong> <code>F1 = 2 × (Precision × Recall) / (Precision + Recall)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>F2 = 재현율 2배 가중(암 진단) / F0.5 = 정밀도 2배 가중(스팸 필터)</span>
  </li>
  <li>
    <strong>5. ROC 곡선과 AUC:</strong> <code>X축 = FPR (1 - 특이도), Y축 = TPR (민감도/재현율)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>AUC = 1.0 (완벽한 모델), AUC = 0.5 (무작위 동전던지기 수준)</span>
  </li>
  <li>
    <strong>6. 왜도(Skewness)와 대표값 대소 비교:</strong><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>• 왜도 > 0 (오른쪽 꼬리): <strong>최빈값 < 중앙값 < 평균</strong><br>• 왜도 < 0 (왼쪽 꼬리): <strong>평균 < 중앙값 < 최빈값</strong></span>
  </li>
  <li>
    <strong>7. 시계열 ARIMA 차수 판정 규칙 (절단 규칙):</strong><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>• <strong>AR(p):</strong> PACF가 p차에서 절단 (Cut-off) / ACF는 점진적 감쇄<br>• <strong>MA(q):</strong> ACF가 q차에서 절단 (Cut-off) / PACF는 점진적 감쇄<br>★ 암기 짝: <strong>AR-PACF</strong>, <strong>MA-ACF</strong></span>
  </li>
  <li>
    <strong>8. 자카드 유사도 & 거리:</strong> <code>유사도 = |A ∩ B| / |A ∪ B|</code>, <code>거리 = 1 - 유사도</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>교집합 개수를 전체 합집합(중복 제외) 개수로 나눔</span>
  </li>
  <li>
    <strong>9. 다중공선성(VIF) 판정:</strong> <code>VIF = 1 / (1 - R²)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'><strong>VIF ≥ 10</strong> 이면 심각한 다중공선성 존재 (해결: Ridge/Lasso 또는 PCA)</span>
  </li>
  <li>
    <strong>10. 회귀 잔차 4대 기본 가정:</strong> <code>선형성, 등분산성, 독립성, 정규성 (선등독정)</code><br>
    <span style='color:var(--text-muted); font-size:0.88rem;'>독립성(자기상관) 검정 통계량: <strong>더빈-왓슨(Durbin-Watson)</strong> 통계량 (2에 가까우면 독립)</span>
  </li>
</ol>
`
  }
];

// s5-2 카드 목록에 등록/업데이트
roadmapCards.forEach(newCard => {
  const idx = s52.cards.findIndex(c => c.id === newCard.id);
  if (idx >= 0) {
    s52.cards[idx] = newCard;
  } else {
    s52.cards.push(newCard);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`[data.json] Successfully added all 6 comprehensive 12th exam roadmap & master summary cards! Total cards in s5-2: ${s52.cards.length}`);
