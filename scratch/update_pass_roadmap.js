const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. 메타데이터 업데이트
data.meta.version = "개정 버전 2026.08.21 (11·12회 기출 복원 및 합격률 30% 미만 돌파 보강판)";
data.meta.description = "최근 11회 및 12회 필기 합격률 30% 미만 급락 트렌드를 완벽 반영. AX 시대 딥러닝/Transformer 비중 급증, 가설검정 심화(대응표본t, 맨-휘트니, 카이제곱), 데이터 누수(Data Leakage) 및 편향-분산 트레이드오프 등 최신 킬러 주제를 전면 보강했습니다.";

// 2. s5-2 섹션에 'c5-2-6' 카드 추가/업데이트
let s52 = data.sections.find(s => s.id === 's5-2');
if (s52) {
  const newPassGuideCard = {
    id: "c5-2-6",
    title: "최근 합격률 트렌드 분석 및 필기 고득점 돌파 전략 🔥 [필독 로드맵]",
    open: true,
    content: `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.15), rgba(147,51,234,0.15)); border-left:5px solid #dc2626; padding:14px 18px; border-radius:10px; margin-bottom:18px;'>
  <strong style='color:#dc2626; font-size:1.1rem;'>📊 최근 필기 합격률 30% 미만 급락! 난이도 급상승 3대 원인 & 완벽 대비책</strong>
  <p style='margin:8px 0 0 0; font-size:0.94rem; color:var(--text-color); line-height:1.6;'>
    빅데이터분석기사 필기는 9회차부터 50% 밑으로 떨어졌으며, <strong>최근 11회 및 12회에서는 30% 미만으로 매우 낮아졌습니다.</strong> 단순 암기를 탈피하고 다음 핵심 3대 축을 체계적으로 정복해야 합격할 수 있습니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 최근 난이도 상승 3대 핵심 원인</h4>
<ul class='concept-block-ul'>
  <li><strong>① AX(AI 전환) 시대 인공신경망(딥러닝) 비중 급증:</strong> Transformer, Attention, Positional Encoding, 활성화함수(ReLU), 최신 앙상블 등 실무 딥러닝 아키텍처 다수 출제.</li>
  <li><strong>② 수학·통계적 지식 난이도 급상승:</strong> 2과목에서 가설검정(대응표본 t검정, 맨-휘트니 U검정, 카이제곱 독립성 검정)이 무려 7문제 출제되는 등 계산 및 판정 문제 강화.</li>
  <li><strong>③ 신규 실무 개념 출제:</strong> Data Leakage(데이터 누수), Bias-Variance Tradeoff 그래프 해석, Box-Cox 변환, NoSQL/Chukwa 등 최신 실무 트렌드 대거 반영.</li>
</ul>

<h4 class='concept-block-h4'>2. 과목별 핵심 출제 키워드 맵 (12회 기출 기준)</h4>
<table style='width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9rem;'>
  <thead>
    <tr style='background:rgba(0,0,0,0.06); border-bottom:2px solid var(--border-color);'>
      <th style='padding:8px; width:22%;'>과목</th>
      <th style='padding:8px;'>주요 출제 키워드 및 특징</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>1과목: 기획</strong></td>
      <td style='padding:8px;'>단순 암기보다 깊이 있는 내용 (웹 스크래핑/파싱 기술, 척와, 맵리듀스 조인패턴, KDD vs CRISP-DM, 비식별화 모델 k/l/t)</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>2과목: 탐색</strong></td>
      <td style='padding:8px;'><strong>가설검정 7문항 집중 출제!</strong> (대응표본 t, 맨-휘트니, 카이제곱, 1종/2종오류), 데이터 전처리(결측치, 이상치, Box-Cox, 정규화/표준화), 기초통계(왜도 3차적률, 표본분산)</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>3과목: 모델링</strong></td>
      <td style='padding:8px;'>선형회귀(다중공선성 VIF, 릿지/라쏘, 잔차 4대가정), <strong>인공신경망(Transformer, Attention, MSE 계산)</strong>, 앙상블(배깅, 부스팅, 스태킹), 차원축소(PCA, 고유값/SVD), 군집(자카드 계수), 시계열(ARIMA-ACF/PACF, HMM)</td>
    </tr>
    <tr style='border-bottom:1px solid var(--border-color);'>
      <td style='padding:8px;'><strong>4과목: 결과해석</strong></td>
      <td style='padding:8px;'>회귀 평가지표 계산(MSE, RMSE, MAE, MAPE, R²), 분류 평가지표(F1/F2-Score, ROC-AUC), <strong>과적합과 편향-분산 곡선</strong>, 교차검증(LOOCV, 홀드아웃), 시각화(평행좌표, 박스플롯), 데이터 누수(Data Leakage)</td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>3. 시험 직전 마스터해야 할 4대 필수 핵심 개념</h4>

<div style='background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.2); padding:12px 14px; border-radius:8px; margin:10px 0;'>
  <strong style='color:#1d4ed8;'>① 기계학습의 4대 분류 체계</strong>
  <ul style='margin:6px 0 0 0; padding-left:18px; font-size:0.9rem;'>
    <li><strong>지도학습 (Supervised):</strong> 정답(Y값, 종속변수) 있음. <strong>회귀(Y: 연속형)</strong> vs <strong>분류(Y: 범주형)</strong></li>
    <li><strong>비지도학습 (Unsupervised):</strong> 정답(Y값) 없음. 군집화(K-Means, DBSCAN), 차원축소(PCA), 연관규칙(장바구니)</li>
    <li><strong>준지도학습 (Semi-supervised):</strong> 소량의 레이블 데이터 + 대량의 비레이블 데이터 결합</li>
    <li><strong>강화학습 (Reinforcement):</strong> 에이전트가 환경과 상호작용하며 보상(Reward)을 최대화하는 방향으로 학습</li>
  </ul>
</div>

<div style='background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2); padding:12px 14px; border-radius:8px; margin:10px 0;'>
  <strong style='color:#047857;'>② 데이터 분석 프로세스 및 데이터 분할 (Split)</strong>
  <ul style='margin:6px 0 0 0; padding-left:18px; font-size:0.9rem;'>
    <li><strong>원천 데이터 탐색 (EDA):</strong> 데이터 분포, 결측치, 이상치 파악</li>
    <li><strong>데이터 전처리:</strong> 결측치/이상치 정제, 정규화, 파생변수 생성 (일반화 성능의 핵심)</li>
    <li><strong>Train Data (훈련 데이터, ~80%):</strong> 모델 학습용</li>
    <li><strong>Validation Data (검증 데이터):</strong> 학습 중 하이퍼파라미터 튜닝 및 과적합 조기 감지용</li>
    <li><strong>Test Data (평가 데이터):</strong> 최종 모델의 일반화 성능 평가용 (★학습 및 튜닝에 절대 사용 금지!)</li>
  </ul>
</div>

<div style='background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.2); padding:12px 14px; border-radius:8px; margin:10px 0;'>
  <strong style='color:#b45309;'>③ 모델 성능 평가지표 공식 총정리</strong>
  <ul style='margin:6px 0 0 0; padding-left:18px; font-size:0.9rem;'>
    <li><strong>회귀 지표:</strong> MSE = Σ(y-ŷ)²/n, RMSE = √MSE, MAE = Σ|y-ŷ|/n, MAPE = 100/n × Σ|(y-ŷ)/y|, R² = 1 - SSE/SST</li>
    <li><strong>분류 혼동행렬 (Confusion Matrix):</strong>
      <br>• 정확도 (Accuracy) = (TP + TN) / Total
      <br>• 정밀도 (Precision) = TP / (TP + FP) [예측 양성 중 실제 양성]
      <br>• 재현율/민감도 (Recall/Sensitivity) = TP / (TP + FN) [실제 양성 중 예측 양성]
      <br>• 특이도 (Specificity) = TN / (FP + TN) [실제 음성 중 예측 음성]
      <br>• 위양성률 (FPR) = 1 - 특이도 = FP / (FP + TN)
      <br>• <strong>F1-Score</strong> = 2 × (Precision × Recall) / (Precision + Recall) [조화평균]
      <br>• <strong>ROC 커브</strong>: X축 = FPR (1-특이도), Y축 = TPR (재현율) / <strong>AUC 1.0에 가까울수록 우수</strong>
    </ul>
</div>

<div style='background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.2); padding:12px 14px; border-radius:8px; margin:10px 0;'>
  <strong style='color:#b91c1c;'>④ 과적합(Overfitting) & 편향-분산 트레이드오프</strong>
  <ul style='margin:6px 0 0 0; padding-left:18px; font-size:0.9rem;'>
    <li><strong>편향(Bias):</strong> 모델이 단순해 생기는 오차. <strong>복잡도 ↑ 시 편향 ↓</strong></li>
    <li><strong>분산(Variance):</strong> 모델이 민감해 생기는 변동성. <strong>복잡도 ↑ 시 분산 ↑</strong></li>
    <li><strong>Total Error:</strong> Bias² + Variance + Irreducible Error → <strong>총 오차가 최소가 되는 지점이 최적 모델</strong></li>
    <li><strong>과적합 (Overfitting):</strong> Training Error는 계속 하락하나 Testing Error가 U자형으로 다시 상승하는 현상</li>
  </ul>
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>실전 합격 자가진단:</strong> Q. 테스트 데이터(Test Set)를 사용해 최적의 하이퍼파라미터를 튜닝해도 무방하다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>X</strong> - 테스트 세트는 오직 최종 모델의 일반화 성능을 1회 측정하기 위한 용도입니다. 튜닝 과정에 사용하면 **데이터 누수(Data Leakage)**가 발생하여 실전 성능을 신뢰할 수 없게 됩니다. 튜닝은 반드시 Validation Set(또는 CV)을 써야 합니다!</div>
</div>
`
  };

  const existingIdx = s52.cards.findIndex(c => c.id === 'c5-2-6');
  if (existingIdx >= 0) {
    s52.cards[existingIdx] = newPassGuideCard;
  } else {
    s52.cards.push(newPassGuideCard);
  }
}

// 3. s3-0 / c2-5 데이터 분할 카드 내용 보강
let s30 = data.sections.find(s => s.id === 's3-0');
if (s30) {
  let c25 = s30.cards.find(c => c.id === 'c2-5');
  if (c25) {
    c25.title = "데이터 분할 (Train / Validation / Test) 및 데이터 누수 방지 🔥";
    c25.content = `
<h4 class='concept-block-h4'>데이터 분할 3대 영역의 명확한 역할</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span>
  <span class='concept-keyword-tag'>Train(학습)</span>
  <span class='concept-keyword-tag'>Validation(튜닝)</span>
  <span class='concept-keyword-tag'>Test(최종평가)</span>
  <span class='concept-keyword-tag'>Data Leakage 방지</span>
</div>

<ul class='concept-block-ul'>
  <li><strong>1) Train Data (훈련 데이터, 통상 60~80%):</strong> 모델의 가중치(파라미터)를 직접 학습시키는 데 사용.</li>
  <li><strong>2) Validation Data (검증 데이터, 통상 10~20%):</strong> 학습 진행 중 모델 성능을 사전 평가하고 하이퍼파라미터 튜닝 및 과적합 조기 종료(Early Stopping)를 결정하는 데 사용.</li>
  <li><strong>3) Test Data (평가 데이터, 통상 10~20%):</strong> 모든 학습과 튜닝이 완료된 최종 모델의 일반화 성능을 독립적으로 측정하기 위한 데이터. (<strong>★절대로 모델 학습이나 튜닝에 개입해서는 안 됨!</strong>)</li>
</ul>

<div class='concept-block-note'>
  💡 <strong>Data Leakage (데이터 누수) 방지 수칙:</strong><br>
  데이터를 Train/Validation/Test로 분할하기 전에 전체 데이터셋으로 스케일러(MinMax/Standard)를 <code>fit()</code>하거나 결측치 평균을 구하면, 테스트 데이터의 통계 정보가 모델 학습에 유출됩니다. 반드시 <strong>Train 데이터로만 fit</strong>하고, 그 기준값으로 Validation/Test에 transform해야 합니다!
</div>
`;
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully updated data.json with the comprehensive pass trend & difficulty analysis roadmap!`);
