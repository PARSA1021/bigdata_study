const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

// ----------------------------------------------------
// 1. [2과목] 가설 검정 & 통계적 추론 마스터 카드 (c2-22)
// ----------------------------------------------------
const c2_22_content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,158,11,0.12)); border-left:4px solid #ef4444; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#dc2626; font-size:1.05rem;'>🔥 [최근 12회 기출 7문항 최다 출제] 가설검정 & 통계적 추론 완전 정복</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color); line-height:1.6;'>
    필기시험 합격의 승부처이자 <strong>실기시험 제3유형(가설검정 파이썬 통계분석)</strong>과 100% 직결되는 최우선 핵심 테마입니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 모수 검정(Parametric Test) 3대 T-검정 비교</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>단일표본 t-검정</span>
  <span class='concept-keyword-tag'>독립표본 t-검정</span>
  <span class='concept-keyword-tag'>대응표본 t-검정(Paired)</span>
  <span class='concept-keyword-tag'>등분산 검정(Levene)</span>
</div>

<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:22%;'>검정 종류</th>
      <th style='width:28%;'>적용 대상 & 목적</th>
      <th style='width:25%;'>검정통계량 및 자유도(df)</th>
      <th style='width:25%;'>실기(Python) 함수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>단일표본 t-검정</strong><br>(One-Sample)</td>
      <td>1개 표본 집단의 평균이 특정 기준값(μ₀)과 같은지 검정</td>
      <td><span class='formula-display' style='font-size:0.9rem; padding:4px 8px; margin:2px 0;'>t = <span class='math-frac'><span class='math-frac-num'>X̄ - μ₀</span><span class='math-frac-den'>s / √n</span></span></span><br><strong>df = n - 1</strong></td>
      <td><code>stats.ttest_1samp(data, popmean)</code></td>
    </tr>
    <tr>
      <td><strong>독립표본 t-검정</strong><br>(Two-Sample Ind.)</td>
      <td>서로 독립인 2개 집단 간 평균 차이 검정 (남 vs 여 등)</td>
      <td>등분산 만족 시 합동분산(Sp) 사용<br><strong>df = n₁ + n₂ - 2</strong></td>
      <td><code>stats.ttest_ind(a, b, equal_var=True/False)</code></td>
    </tr>
    <tr>
      <td style='background:rgba(239,68,68,0.08);'><strong>대응표본 t-검정 🔥</strong><br>(Paired Sample)</td>
      <td style='background:rgba(239,68,68,0.08);'><strong>동일 집단의 사전-사후 차이</strong> 검정 (투약 전 vs 투약 후, 교육 전 vs 후)</td>
      <td style='background:rgba(239,68,68,0.08);'>차이값 D = X₁ - X₂ 의 평균(D̄) 검정<br><strong>df = n - 1 (n은 쌍의 개수)</strong></td>
      <td style='background:rgba(239,68,68,0.08);'><code>stats.ttest_rel(before, after)</code></td>
    </tr>
  </tbody>
</table>

<div class='concept-block-note'>
  💡 <strong>[시험장 단골 함정]:</strong> 독립표본 t-검정의 자유도는 <code>n₁ + n₂ - 2</code>이지만, 대응표본 t-검정(Paired t-test)은 동일 대상의 쌍(Pair)이므로 <strong>자유도가 <code>n - 1</code></strong>입니다!
</div>

<h4 class='concept-block-h4'>2. 비모수 검정(Non-parametric Test) 4대장</h4>
<p style='font-size:0.92rem; color:var(--text-color); margin-bottom:8px;'>
  데이터가 정규분포를 따르지 않거나(샤피로-윌크 검정 $p < 0.05$), 서열(순위) 척도일 때 <strong>평균 대신 중위수(Median)나 순위(Rank)</strong>를 바탕으로 검정합니다.
</p>

<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>비모수 검정명</th>
      <th style='width:30%;'>대응되는 모수 검정</th>
      <th style='width:45%;'>핵심 특징 및 판별 키워드</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>샤피로-윌크 (Shapiro-Wilk)</strong></td>
      <td>정규성 검정 (모수 vs 비모수 판별)</td>
      <td>귀무가설(H₀: 정규성을 만족한다) / $p \ge 0.05$여야 모수 검정 수행 가능</td>
    </tr>
    <tr>
      <td><strong>맨-휘트니 U 검정 🔥</strong><br>(Mann-Whitney / 윌콕슨 순위합)</td>
      <td>독립 2표본 t-검정 (2-sample ind)</td>
      <td><strong>서로 다른 두 독립 집단</strong>의 순위합 비교 (예: A반과 B반 성적 순위 비교)</td>
    </tr>
    <tr>
      <td><strong>윌콕슨 부호순위 검정 🔥</strong><br>(Wilcoxon Signed-Rank)</td>
      <td>대응표본 t-검정 (Paired t-test)</td>
      <td><strong>동일 집단의 사전-사후 차이</strong>에 부호(+,-)와 순위를 매겨 검정 (예: 다이어트 전후)</td>
    </tr>
    <tr>
      <td><strong>크루스칼-왈리스 검정 🔥</strong><br>(Kruskal-Wallis)</td>
      <td>일원배치 분산분석 (One-way ANOVA)</td>
      <td><strong>3개 이상 독립 집단</strong> 간의 순위 기반 중위수 차이 검정</td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>3. 카이제곱(χ²) 검정 3총사 & 공식 마스터</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>적합도 검정</span>
  <span class='concept-keyword-tag'>독립성 검정</span>
  <span class='concept-keyword-tag'>동질성 검정</span>
  <span class='concept-keyword-tag'>자유도 (r-1)(c-1)</span>
  <span class='concept-keyword-tag'>기대도수 공식</span>
</div>

<div class='formula-grid'>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>① 적합도 검정 (Goodness-of-Fit)</span>
    <span class='formula-grid-expr'>자유도 df = k - 1</span>
    <span class='formula-grid-desc'>관측된 도수가 특정 이론적 분포(예: 멘델의 유전법칙 9:3:3:1)를 따르는지 검정 (1개 범주형 변수)</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>② 독립성 검정 (Independence) 🔥</span>
    <span class='formula-grid-expr'>자유도 df = (r - 1) × (c - 1)</span>
    <span class='formula-grid-desc'>2개의 범주형 변수 간에 연관성이 있는지 검정 (예: 성별과 선호 정당이 독립인가?)</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>③ 기대도수(Expected Frequency) 공식 🔥</span>
    <span class='formula-grid-expr' style='color:#dc2626;'>E_ij = (R_i × C_j) / N</span>
    <span class='formula-grid-desc'>i번째 행의 합계(R_i)와 j번째 열의 합계(C_j)를 곱한 후 전체 표본수(N)로 나눔</span>
  </div>
</div>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 카이제곱 검정통계량 계산 공식</span>
  </div>
  <div class='formula-display'>
    χ² = Σ <span class='math-frac'><span class='math-frac-num'>(O_ij - E_ij)²</span><span class='math-frac-den'>E_ij</span></span>
    &nbsp;&nbsp;(O: 관측도수, E: 기대도수)
  </div>
</div>

<h4 class='concept-block-h4'>4. 가설검정 의사결정 & 1종·2종 오류 완벽 정리</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>귀무가설(H₀)</span>
  <span class='concept-keyword-tag'>대립가설(H₁)</span>
  <span class='concept-keyword-tag'>1종 오류(α)</span>
  <span class='concept-keyword-tag'>2종 오류(β)</span>
  <span class='concept-keyword-tag'>검정력(1-β)</span>
  <span class='concept-keyword-tag'>p-value 판정</span>
</div>

<table class='confusion-table'>
  <thead>
    <tr>
      <th colspan='2' rowspan='2' style='background:var(--paper-subtle);'>가설검정 판정표</th>
      <th colspan='2'>실제 모집단의 참 상태 (Reality)</th>
    </tr>
    <tr>
      <th style='background:rgba(59,130,246,0.1); color:#2563EB;'>귀무가설(H₀)이 참인 경우</th>
      <th style='background:rgba(16,185,129,0.1); color:#059669;'>귀무가설(H₀)이 거짓인 경우</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan='2' style='background:var(--paper-subtle); width:15%;'>통계적<br>의사결정</th>
      <td style='font-weight:800; background:var(--surface);'>H₀ 기각<br><span style='font-size:0.8rem; color:var(--text-muted);'>(효과가 있다고 판정)</span></td>
      <td class='confusion-cell-fp'>
        <strong>제1종 오류 (α) 🚨</strong><br>
        <span style='font-size:0.82rem;'>참인 H₀를 잘못 기각</span><br>
        <span style='font-size:0.78rem;'>(유의수준 = 허용할 1종 오류 최대확률)</span>
      </td>
      <td class='confusion-cell-tp'>
        <strong>옳은 결정 (검정력, 1 - β) ✅</strong><br>
        <span style='font-size:0.82rem;'>거짓인 H₀를 올바르게 기각</span><br>
        <span style='font-size:0.78rem;'>(검정력이 높을수록 우수한 검정)</span>
      </td>
    </tr>
    <tr>
      <td style='font-weight:800; background:var(--surface);'>H₀ 채택<br><span style='font-size:0.8rem; color:var(--text-muted);'>(효과가 없다고 판정)</span></td>
      <td class='confusion-cell-tn'>
        <strong>옳은 결정 (1 - α) ✅</strong><br>
        <span style='font-size:0.82rem;'>참인 H₀를 올바르게 채택</span><br>
        <span style='font-size:0.78rem;'>(신뢰수준 95% = 1 - 0.05)</span>
      </td>
      <td class='confusion-cell-fn'>
        <strong>제2종 오류 (β) ⚠️</strong><br>
        <span style='font-size:0.82rem;'>거짓인 H₀를 잘못 채택</span><br>
        <span style='font-size:0.78rem;'>(차이가 있는데 없다고 놓침)</span>
      </td>
    </tr>
  </tbody>
</table>

<div class='calc-step-container'>
  <div class='calc-step-row'>
    <span class='calc-step-num'>p-value 판정법</span>
    <span class='calc-step-content'><strong>p-value < α (0.05):</strong> "p값이 작으면 귀무가설 기각! 대립가설(차이가 있다) 채택"</span>
  </div>
  <div class='calc-step-row'>
    <span class='calc-step-num'>신뢰구간 판정법</span>
    <span class='calc-step-content'><strong>모수 검정:</strong> 95% 신뢰구간에 0(또는 μ₀)이 포함되지 않으면 유의미한 차이(H₀ 기각)</span>
  </div>
</div>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>실전 자가진단 OX:</strong> Q. 대응표본 t-검정에서 표본 쌍의 개수가 20쌍일 때 검정통계량의 자유도는 38이다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--danger);'>X (오답)</strong> - 대응표본 t-검정은 동일한 대상의 전-후 차이값 1개 변수(D)를 분석하므로 자유도는 <strong>n - 1 = 19</strong>입니다. 38은 독립된 두 집단(n1+n2-2)일 때의 자유도입니다.</div>
</div>
`;

// ----------------------------------------------------
// 2. [2과목] 결측치 & 이상치 & 차원축소 카드 보강 (c2-9, c2-10, c2-12)
// ----------------------------------------------------
const c2_9_content = `
<h4 class='concept-block-h4'>1. 결측 메커니즘 3가지 (MCAR, MAR, MNAR)</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>MCAR (완전무작위)</span>
  <span class='concept-keyword-tag'>MAR (무작위/조건부)</span>
  <span class='concept-keyword-tag'>MNAR (비무작위)</span>
</div>
<ul class='concept-block-ul'>
  <li><strong>완전 무작위 결측 (MCAR):</strong> 결측 발생이 어떤 다른 변수나 데이터 자체와도 전혀 무관한 경우 (예: 설문지가 바람에 날아감, 전산 통신 일시 오류). 삭제해도 편향(Bias)이 발생하지 않음.</li>
  <li><strong>무작위 결측 (MAR):</strong> 결측 여부가 <strong>다른 관측된 변수와 관련</strong>되어 있지만, 결측값 자체와는 무관함 (예: 여성이 남성보다 체중 응답을 덜 하지만, 성별이 알려져 있는 경우).</li>
  <li><strong>비무작위 결측 (MNAR):</strong> <strong>결측된 그 변수의 값 자체 때문</strong>에 결측이 발생한 경우 (예: 고소득자나 극빈층이 소득 질문에 무응답). 가장 편향이 크며 단순 삭제 시 심각한 왜곡 발생.</li>
</ul>

<h4 class='concept-block-h4'>2. 결측값 대체(Imputation) 기법 비교</h4>
<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>대체 기법</th>
      <th style='width:40%;'>작동 원리</th>
      <th style='width:35%;'>장단점 및 출제 포인트</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>단순 평균/중앙값 대체</strong></td>
      <td>결측치를 해당 열의 전체 평균이나 중앙값으로 일괄 채움</td>
      <td>간단하지만 <strong>분산이 과소추정(축소)</strong>되어 표준오차가 왜곡되는 한계</td>
    </tr>
    <tr>
      <td><strong>KNN 대체법</strong></td>
      <td>다른 변수들의 거리가 가장 가까운 K개 이웃의 평균/가중평균으로 대체</td>
      <td>데이터의 국소적 특성 반영 가능, 계산 비용 증가</td>
    </tr>
    <tr>
      <td><strong>회귀 대체법</strong></td>
      <td>다른 변수들을 독립변수로 하여 결측 변수를 예측해 대입</td>
      <td>변수 간 관계를 보존하나 결정론적 회귀는 분산을 지나치게 줄임</td>
    </tr>
    <tr>
      <td><strong>MICE (다중대체법) 🔥</strong></td>
      <td>체인 방정식을 이용해 여러 번(m회) 대치 후 결과를 통합</td>
      <td><strong>결측치 불확실성을 완벽히 반영</strong>하여 표준오차 과소추정 극복</td>
    </tr>
  </tbody>
</table>
`;

const c2_10_content = `
<h4 class='concept-block-h4'>1. 사분위수(IQR) 기준 이상치 탐지 공식 🔥</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>IQR = Q3 - Q1</span>
  <span class='concept-keyword-tag'>하한치 Q1 - 1.5×IQR</span>
  <span class='concept-keyword-tag'>상한치 Q3 + 1.5×IQR</span>
  <span class='concept-keyword-tag'>극단치 3.0×IQR</span>
</div>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 박스플롯(Boxplot) 이상치 판단 기준</span>
  </div>
  <div class='formula-display'>
    정상 범위: [ Q₁ - 1.5 × IQR, &nbsp; Q₃ + 1.5 × IQR ] &nbsp;&nbsp;(IQR = Q₃ - Q₁)
  </div>
  <div class='calc-step-container'>
    <div class='calc-step-row'>
      <span class='calc-step-num'>마일드 이상치</span>
      <span class='calc-step-content'>1.5 × IQR 바깥 ~ 3.0 × IQR 이내에 위치하는 값</span>
    </div>
    <div class='calc-step-row'>
      <span class='calc-step-num'>극단적 이상치 (Extreme)</span>
      <span class='calc-step-content'>3.0 × IQR 바깥에 위치하는 심각한 이상치</span>
    </div>
  </div>
</div>

<h4 class='concept-block-h4'>2. 이상치 처리 기법 (윈저화 vs 절단)</h4>
<ul class='concept-block-ul'>
  <li><strong>윈저화 (Winsorizing) 🔥:</strong> 이상치를 삭제하지 않고 <strong>상한치(예: 99백분위수)나 하한치(1백분위수)의 값으로 대체(Clipping)</strong>하여 데이터 손실을 방지하는 기법.</li>
  <li><strong>절단 (Trimming):</strong> 상위/하위 일정 비율(예: 상하위 5%)의 이상치 데이터를 완전히 제거하는 방법.</li>
  <li><strong>Z-Score (표준점수):</strong> 평균 0, 표준편차 1로 표준화한 후 <strong>$|Z| > 3$</strong>인 값을 이상치로 판정 (데이터가 정규분포를 따를 때 유효).</li>
  <li><strong>ESD / Generalized ESD:</strong> 정규분포 가정 하에 평균과 표준편차를 반복 갱신하며 다중 이상치를 탐지하는 기법.</li>
</ul>
`;

const c2_12_content = `
<h4 class='concept-block-h4'>1. 주성분 분석 (PCA - Principal Component Analysis)</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>고윳값(Eigenvalue)</span>
  <span class='concept-keyword-tag'>고유벡터(Eigenvector)</span>
  <span class='concept-keyword-tag'>설명분산비율</span>
  <span class='concept-keyword-tag'>Scree Plot</span>
  <span class='concept-keyword-tag'>비지도 학습</span>
</div>

<ul class='concept-block-ul'>
  <li><strong>원리:</strong> 데이터의 공분산 행렬을 고유값 분해(Eigendecomposition)하여 <strong>분산(Variance)이 최대가 되는 직교(Orthogonal) 축</strong>을 찾아 차원을 축소함.</li>
  <li><strong>제1주성분(PC1):</strong> 데이터의 전체 분산을 가장 많이 설명하는 축.</li>
  <li><strong>제2주성분(PC2):</strong> PC1과 <strong>수직(직교, 상관계수=0)</strong>이면서 남은 분산을 최대로 설명하는 축.</li>
</ul>

<div class='formula-grid'>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>① 카이저 기준 (Kaiser Rule)</span>
    <span class='formula-grid-expr'>고윳값(Eigenvalue) ≥ 1.0</span>
    <span class='formula-grid-desc'>원래 변수 1개 이상의 분산 크기를 가지는 주성분만 선택</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>② 누적 설명 분산 비율</span>
    <span class='formula-grid-expr'>누적 기여율 ≥ 80% ~ 85%</span>
    <span class='formula-grid-desc'>전체 분산의 80% 이상을 설명할 때까지 주성분 개수를 채택</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>③ Scree Plot 엘보우 포인트</span>
    <span class='formula-grid-expr'>기울기가 완만해지는 직전</span>
    <span class='formula-grid-desc'>고윳값 감소 그래프의 꺾이는 지점(Elbow) 바로 앞까지 선택</span>
  </div>
</div>

<h4 class='concept-block-h4'>2. PCA vs LDA vs t-SNE 핵심 비교</h4>
<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>차원축소 기법</th>
      <th style='width:25%;'>학습 방식</th>
      <th style='width:50%;'>핵심 메커니즘 & 목적</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>PCA (주성분분석)</strong></td>
      <td><strong>비지도학습 (Unsupervised)</strong></td>
      <td>라벨(Y) 없이 데이터의 <strong>전체 분산(Variance) 최대화</strong> 축 탐색</td>
    </tr>
    <tr>
      <td><strong>LDA (선형판별분석) 🔥</strong></td>
      <td><strong>지도학습 (Supervised)</strong></td>
      <td>라벨(Y)을 고려하여 <strong>클래스 간 분산 최대화 & 클래스 내 분산 최소화</strong></td>
    </tr>
    <tr>
      <td><strong>t-SNE / UMAP</strong></td>
      <td>비선형 비지도학습</td>
      <td>고차원 공간의 이웃 간 유사도를 저차원에 보존 (시각화에 주로 활용)</td>
    </tr>
  </tbody>
</table>
`;

// ----------------------------------------------------
// 3. [3과목] 인공신경망 & 딥러닝 & 트랜스포머/어텐션 (c3-5, c3-6, c3-13-2)
// ----------------------------------------------------
const c3_5_content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(147,51,234,0.12), rgba(59,130,246,0.12)); border-left:4px solid #8b5cf6; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#7c3aed; font-size:1.05rem;'>⚡ [합격률 하락의 주원인] 딥러닝 & 인공신경망 핵심 학습 원리</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color); line-height:1.6;'>
    단순 퍼셉트론부터 다층 퍼셉트론(MLP), 순전파(Forward), 역전파(Backpropagation, 연쇄법칙), 최적화 알고리즘까지 체계적으로 정리합니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 퍼셉트론과 역전파(Backpropagation) 메커니즘</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>단층 퍼셉트론(XOR 불가)</span>
  <span class='concept-keyword-tag'>MLP(은닉층 도입)</span>
  <span class='concept-keyword-tag'>오차 역전파</span>
  <span class='concept-keyword-tag'>연쇄 법칙(Chain Rule)</span>
</div>

<ul class='concept-block-ul'>
  <li><strong>단층 퍼셉트론 한계:</strong> 선형 분리만 가능하여 <strong>XOR 문제 해결 불가능</strong> (Minsky 지적).</li>
  <li><strong>다층 퍼셉트론 (MLP):</strong> 입력층과 출력층 사이에 1개 이상의 <strong>은닉층(Hidden Layer)</strong>과 <strong>비선형 활성화 함수</strong>를 도입하여 비선형 결정 경계 형성 가능.</li>
  <li><strong>순전파 (Forward Propagation):</strong> 입력값이 가중치(W)와 곱해지고 편향(b)이 더해져 활성화 함수를 거쳐 출력층까지 전달되는 과정.</li>
  <li><strong>오차 역전파 (Backpropagation) 🔥:</strong> 출력층의 오차(Loss)를 <strong>미분의 연쇄법칙(Chain Rule)</strong>을 이용해 출력층에서 입력층 방향으로 거꾸로 전파하며 각 가중치(W)의 기울기(Gradient)를 계산하여 갱신하는 알고리즘.</li>
</ul>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 경사하강법 가중치 갱신 공식</span>
  </div>
  <div class='formula-display'>
    W_new = W_old - η × <span class='math-frac'><span class='math-frac-num'>∂Loss</span><span class='math-frac-den'>∂W</span></span>
    &nbsp;&nbsp;(η: 학습률 Learning Rate)
  </div>
</div>

<h4 class='concept-block-h4'>2. 딥러닝 최적화 옵티마이저 (Optimizer) 발전 계보</h4>
<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>옵티마이저</th>
      <th style='width:35%;'>주요 특징 및 메커니즘</th>
      <th style='width:40%;'>핵심 수식 및 개선점</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SGD (확률적 경사하강법)</strong></td>
      <td>미니배치 단위로 무작위 샘플링하여 빠르게 가중치 갱신</td>
      <td>진동(Oscillation)이 심하고 로컬 미니멈(Local Minima)에 갇힐 위험</td>
    </tr>
    <tr>
      <td><strong>Momentum (모멘텀)</strong></td>
      <td>이전 기울기의 관성(운동량)을 반영하여 관성 방향으로 가속</td>
      <td>지그재그 진동을 줄이고 안장점(Saddle Point)을 빠르게 탈출</td>
    </tr>
    <tr>
      <td><strong>AdaGrad</strong></td>
      <td>자주 변한 변수는 학습률을 낮추고, 드문 변수는 학습률을 높임</td>
      <td>학습이 진행될수록 학습률이 0에 수렴하여 조기 학습 중단 문제</td>
    </tr>
    <tr>
      <td><strong>RMSprop</strong></td>
      <td>AdaGrad의 학습률 급감 문제를 지수이동평균(EMA)으로 완화</td>
      <td>최근 기울기 위주로 학습률을 조정하여 안정적 학습 유지</td>
    </tr>
    <tr>
      <td style='background:rgba(147,51,234,0.08);'><strong>Adam (아담) 🔥</strong></td>
      <td style='background:rgba(147,51,234,0.08);'><strong>Momentum (방향) + RMSprop (학습률 크기)</strong>을 결합한 최신 표준 기법</td>
      <td style='background:rgba(147,51,234,0.08);'>가장 널리 쓰이며 하이퍼파라미터 튜닝에 강건(Robust)함</td>
    </tr>
  </tbody>
</table>
`;

const c3_6_content = `
<h4 class='concept-block-h4'>1. 활성화 함수(Activation Function) 완벽 비교</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>Sigmoid (0~1)</span>
  <span class='concept-keyword-tag'>Tanh (-1~1)</span>
  <span class='concept-keyword-tag'>ReLU (0 이상 선형)</span>
  <span class='concept-keyword-tag'>Leaky ReLU</span>
  <span class='concept-keyword-tag'>기울기 소실(Vanishing Gradient)</span>
</div>

<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:22%;'>활성화 함수</th>
      <th style='width:28%;'>수식 & 출력 범위</th>
      <th style='width:50%;'>핵심 특징 및 출제 함정</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sigmoid (시그모이드)</strong></td>
      <td><span style='font-family:monospace;'>σ(x) = 1 / (1 + e⁻ˣ)</span><br><strong>출력: (0, 1)</strong></td>
      <td>이진 분류 출력층에 필수. 은닉층 깊어질 시 <strong>기울기 소실(Vanishing Gradient)</strong> 유발 (미분 최대값 0.25)</td>
    </tr>
    <tr>
      <td><strong>Tanh (하이퍼볼릭 탄젠트)</strong></td>
      <td><span style='font-family:monospace;'>tanh(x)</span><br><strong>출력: (-1, 1)</strong></td>
      <td><strong>원점 중심(Zero-centered)</strong>으로 Sigmoid보다 학습 효율 우수하나 여전히 깊은 층에서 기울기 소실 발생</td>
    </tr>
    <tr>
      <td style='background:rgba(16,185,129,0.08);'><strong>ReLU 🔥</strong></td>
      <td style='background:rgba(16,185,129,0.08);'><span style='font-family:monospace;'>f(x) = max(0, x)</span><br><strong>출력: [0, ∞)</strong></td>
      <td style='background:rgba(16,185,129,0.08);'>양수 구간 미분값이 1이므로 <strong>기울기 소실을 획기적으로 해결</strong>. 연산 속도 초고속. 음수 구간 뉴런이 죽는 Dying ReLU 단점</td>
    </tr>
    <tr>
      <td><strong>Leaky ReLU</strong></td>
      <td><span style='font-family:monospace;'>f(x) = max(αx, x) (α=0.01)</span><br><strong>출력: (-∞, ∞)</strong></td>
      <td>음수 영역에 작은 기울기(0.01)를 부여하여 Dying ReLU 문제를 해결</td>
    </tr>
    <tr>
      <td><strong>Softmax (소프트맥스)</strong></td>
      <td><span style='font-family:monospace;'>eˣⁱ / Σeˣʲ</span><br><strong>총합 = 1.0 (확률)</strong></td>
      <td><strong>다중 클래스 분류(Multi-class) 출력층</strong>의 필수 함수. 각 클래스에 속할 확률값 출력</td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. 딥러닝 과적합(Overfitting) 방지 기법 4종</h4>
<ul class='concept-block-ul'>
  <li><strong>드롭아웃 (Dropout) 🔥:</strong> 학습(Training) 시에는 무작위로 일부 뉴런을 꺼두고(비활성화), <strong>추론(Inference/Test) 시에는 모든 뉴런을 활성화</strong>하되 가중치를 스케일링하여 앙상블 효과 도출.</li>
  <li><strong>배치 정규화 (Batch Normalization) 🔥:</strong> 미니배치마다 각 층의 활성화 출력을 평균 0, 분산 1로 정규화하여 <strong>내부 공변량 변화(Internal Covariate Shift)를 완화</strong>하고 학습 속도 및 안정성 극대화.</li>
  <li><strong>가중치 규제 (Weight Decay):</strong> 손실함수에 가중치 크기 페널티를 추가 ($L_1$ 라쏘, $L_2$ 릿지)하여 가중치가 지나치게 커지는 것을 억제.</li>
  <li><strong>조기 종료 (Early Stopping):</strong> 검증 손실(Validation Loss)이 일정 에폭(Patience) 동안 개선되지 않으면 과적합 직전에 학습을 조기 중단.</li>
</ul>
`;

const c3_13_2_content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(147,51,234,0.12)); border-left:4px solid #3b82f6; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#2563eb; font-size:1.05rem;'>🚀 [12회 신경향 킬러] 트랜스포머(Transformer) & 어텐션(Attention) 아키텍처</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color); line-height:1.6;'>
    RNN의 순차적(Sequential) 연산 한계를 뛰어넘어 <strong>Self-Attention과 완전 병렬 처리</strong>를 구현한 현대 초거대 AI(LLM, GPT, BERT)의 핵심 근간입니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 스케일드 닷 프로덕트 어텐션 (Scaled Dot-Product Attention)</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>Query(Q)</span>
  <span class='concept-keyword-tag'>Key(K)</span>
  <span class='concept-keyword-tag'>Value(V)</span>
  <span class='concept-keyword-tag'>√d_k 스케일링</span>
  <span class='concept-keyword-tag'>Softmax 가중합</span>
</div>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 어텐션 핵심 계산 수식 (Attention Formula)</span>
  </div>
  <div class='formula-display'>
    Attention(Q, K, V) = softmax<span class='math-frac'><span class='math-frac-num'>Q Kᵀ</span><span class='math-frac-den'>√d_k</span></span> V
  </div>
  <div class='calc-step-container'>
    <div class='calc-step-row'>
      <span class='calc-step-num'>1. 내적 유사도</span>
      <span class='calc-step-content'>Query(검색어)와 Key(데이터 키)의 전치행렬을 행렬곱(Dot-Product)하여 단어 간 연관도 산출</span>
    </div>
    <div class='calc-step-row'>
      <span class='calc-step-num'>2. 스케일링</span>
      <span class='calc-step-content'>차원수 √d_k 로 나누어 내적값이 너무 커져 softmax 기울기가 소실되는 것을 방지</span>
    </div>
    <div class='calc-step-row'>
      <span class='calc-step-num'>3. 가중합 산출</span>
      <span class='calc-step-content'>Softmax를 적용해 어텐션 가중치(합=1)를 구한 후 실제 내용인 Value(V)와 곱해 최종 맥락 벡터 도출</span>
    </div>
  </div>
</div>

<h4 class='concept-block-h4'>2. 트랜스포머 아키텍처 4대 핵심 구성 요소</h4>
<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>핵심 요소</th>
      <th style='width:75%;'>원리 및 기능 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Multi-Head Attention 🔥</strong></td>
      <td>어텐션을 한 번만 계산하지 않고, Q, K, V를 여러 개(h개 헤드)의 부분 공간으로 사영하여 <strong>다양한 관점의 문맥적 의미를 동시에 병렬로 포착</strong>함.</td>
    </tr>
    <tr>
      <td><strong>위치 인코딩 🔥<br>(Positional Encoding)</strong></td>
      <td>트랜스포머는 RNN처럼 순차 입력받지 않고 전체 문장을 한 번에 입력받으므로, <strong>단어의 순서(위치) 정보</strong>를 주입하기 위해 sin, cos 주기함수 값을 임베딩에 더해줌.</td>
    </tr>
    <tr>
      <td><strong>잔차 연결 및 층 정규화<br>(Add & LayerNorm)</strong></td>
      <td>입력값을 출력값에 그대로 더해주는 <strong>Residual Connection (Skip Connection)</strong>을 적용하여 깊은 신경망에서도 기울기 소실 없이 안정적으로 학습.</td>
    </tr>
    <tr>
      <td><strong>완전한 병렬화 (Parallelism)</strong></td>
      <td>순환 루프가 전혀 없으므로 GPU를 통한 <strong>행렬 병렬 연산이 100% 가능</strong>하여 학습 속도가 RNN 대비 수십~수백 배 향상됨.</td>
    </tr>
  </tbody>
</table>

<div class='concept-block-quiz'>
  <div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> Q. 트랜스포머 모델은 이전 타임스텝의 은닉 상태(Hidden State)를 순차적으로 전달받는 순환 구조(RNN)를 채택하고 있다?</div>
  <div class='concept-quiz-a'>정답: <strong style='color:var(--danger);'>X (오답)</strong> - 트랜스포머는 순환(Recurrence) 구조를 완전히 제거하고 <strong>Self-Attention 메커니즘과 Positional Encoding</strong>만으로 문맥과 위치를 병렬 처리합니다.</div>
</div>
`;

// ----------------------------------------------------
// 4. [4과목] 혼동 행렬 & 분류 평가지표 5종 & 편향-분산 트레이드오프 (c4-1, c4-4, c4-992)
// ----------------------------------------------------
const c4_1_content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,158,11,0.12)); border-left:4px solid #ef4444; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#dc2626; font-size:1.05rem;'>🔥 [계산 문제 100% 출제] 혼동 행렬(Confusion Matrix) & 평가지표 5종 공식</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color); line-height:1.6;'>
    실제값과 예측값의 2×2 오분류표를 바탕으로 <strong>정확도, 정밀도, 재현율(민감도), 특이도, F1-Score</strong>를 직접 손으로 계산하는 문제가 매회 출제됩니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 혼동 행렬(Confusion Matrix) 4대 요소</h4>
<table class='confusion-table'>
  <thead>
    <tr>
      <th colspan='2' rowspan='2' style='background:var(--paper-subtle);'>혼동 행렬 (2×2)</th>
      <th colspan='2'>실제값 (Actual Truth)</th>
    </tr>
    <tr>
      <th style='background:rgba(59,130,246,0.1); color:#2563EB;'>실제 Positive (1, 양성/암/사기)</th>
      <th style='background:rgba(107,114,128,0.1); color:#374151;'>실제 Negative (0, 음성/정상)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan='2' style='background:var(--paper-subtle); width:15%;'>예측값<br>(Predicted)</th>
      <td style='font-weight:800; background:var(--surface);'>예측 Positive (1)</td>
      <td class='confusion-cell-tp'>
        <strong>TP (True Positive) ✅</strong><br>
        <span style='font-size:0.8rem;'>양성을 양성으로 정확히 맞춤</span>
      </td>
      <td class='confusion-cell-fp'>
        <strong>FP (False Positive) 🚨 (1종오류)</strong><br>
        <span style='font-size:0.8rem;'>음성을 양성으로 잘못 예측</span>
      </td>
    </tr>
    <tr>
      <td style='font-weight:800; background:var(--surface);'>예측 Negative (0)</td>
      <td class='confusion-cell-fn'>
        <strong>FN (False Negative) ⚠️ (2종오류)</strong><br>
        <span style='font-size:0.8rem;'>양성을 음성으로 잘못 예측 (놓침)</span>
      </td>
      <td class='confusion-cell-tn'>
        <strong>TN (True Negative) ✅</strong><br>
        <span style='font-size:0.8rem;'>음성을 음성으로 정확히 맞춤</span>
      </td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. 분류 평가지표 5대 공식 비교 & 암기법</h4>
<div class='formula-grid'>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>① 정확도 (Accuracy)</span>
    <span class='formula-grid-expr'>Accuracy = (TP + TN) / Total</span>
    <span class='formula-grid-desc'>전체 예측 중 올바르게 맞춘 비율. 불균형 데이터에서는 정확도의 역설 발생.</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>② 정밀도 (Precision / PPV) 🔥</span>
    <span class='formula-grid-expr' style='color:#2563eb;'>Precision = TP / (TP + FP)</span>
    <span class='formula-grid-desc'><strong>모델이 Positive라고 예측한 것 중</strong> 진짜 Positive 비율 (스팸메일 분류 시 중요)</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>③ 재현율/민감도 (Recall / TPR) 🔥</span>
    <span class='formula-grid-expr' style='color:#dc2626;'>Recall = TP / (TP + FN)</span>
    <span class='formula-grid-desc'><strong>실제 Positive인 대상 중</strong> 모델이 놓치지 않고 찾아낸 비율 (암 진단, 금융 사기 탐지 시 최우선)</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>④ 특이도 (Specificity / TNR)</span>
    <span class='formula-grid-expr'>Specificity = TN / (TN + FP)</span>
    <span class='formula-grid-desc'>실제 음성(정상) 중에서 모델이 음성으로 정확히 판정한 비율</span>
  </div>
  <div class='formula-grid-item'>
    <span class='formula-grid-title'>⑤ 위양성률 (FPR = False Positive Rate)</span>
    <span class='formula-grid-expr'>FPR = 1 - 특이도 = FP / (TN + FP)</span>
    <span class='formula-grid-desc'>실제 정상 중 모델이 양성으로 오경보를 울린 비율 (ROC 곡선의 X축)</span>
  </div>
  <div class='formula-grid-item' style='background:rgba(239,68,68,0.04); border-color:#ef4444;'>
    <span class='formula-grid-title'>⑥ F1-Score (조화평균) 🔥🔥🔥</span>
    <span class='formula-grid-expr' style='color:#b91c1c;'>F₁ = 2 × (P × R) / (P + R)</span>
    <span class='formula-grid-desc'>정밀도(Precision)와 재현율(Recall)의 불균형을 고려한 조화평균 지표</span>
  </div>
</div>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 F-Beta Score 확장 공식</span>
  </div>
  <div class='formula-display'>
    F_β = (1 + β²) × <span class='math-frac'><span class='math-frac-num'>Precision × Recall</span><span class='math-frac-den'>β² × Precision + Recall</span></span>
  </div>
  <div class='calc-step-container'>
    <div class='calc-step-row'>
      <span class='calc-step-num'>β = 2 (F2-Score)</span>
      <span class='calc-step-content'><strong>재현율(Recall)을 정밀도보다 2배 더 중요</strong>하게 평가 (암 진단, 결함 검출)</span>
    </div>
    <div class='calc-step-row'>
      <span class='calc-step-num'>β = 0.5 (F0.5-Score)</span>
      <span class='calc-step-content'><strong>정밀도(Precision)를 재현율보다 2배 더 중요</strong>하게 평가 (스팸 필터링)</span>
    </div>
  </div>
</div>

<h4 class='concept-block-h4'>3. ROC Curve와 AUC 심화</h4>
<ul class='concept-block-ul'>
  <li><strong>ROC 곡선:</strong> 분류 임계값(Threshold 0~1)을 변경할 때 <strong>X축: FPR (1 - 특이도)</strong> 대비 <strong>Y축: TPR (민감도/재현율)</strong>의 궤적을 그린 곡선.</li>
  <li><strong>최적의 모델:</strong> 좌상단 모서리 (0, 1)에 바짝 붙을수록 우수함.</li>
  <li><strong>AUC (Area Under Curve):</strong> ROC 곡선 아래 면적으로 <strong>1.0에 가까울수록 완벽한 모델</strong>이며, <strong>0.5는 무작위 동전 던지기 수준</strong>임.</li>
</ul>
`;

const c4_4_content = `
<div class='concept-highlight-banner' style='background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(16,185,129,0.12)); border-left:4px solid #f59e0b; padding:14px 18px; border-radius:8px; margin-bottom:16px;'>
  <strong style='color:#d97706; font-size:1.05rem;'>📊 편향-분산 트레이드오프(Bias-Variance Tradeoff) & 과적합 극복</strong>
  <p style='margin:6px 0 0 0; font-size:0.92rem; color:var(--text-color); line-height:1.6;'>
    모델 복잡도(Complexity) 변화에 따른 편향과 분산의 상충 관계 및 교차 검증을 통한 일반화 성능 확보 원리입니다.
  </p>
</div>

<h4 class='concept-block-h4'>1. 편향-분산 트레이드오프 곡선 해석</h4>
<div class='concept-keywords-row'>
  <span class='concept-keyword-label'>🔑 핵심 키워드:</span> 
  <span class='concept-keyword-tag'>편향 (Bias)</span>
  <span class='concept-keyword-tag'>분산 (Variance)</span>
  <span class='concept-keyword-tag'>과소적합 (High Bias)</span>
  <span class='concept-keyword-tag'>과대적합 (High Variance)</span>
  <span class='concept-keyword-tag'>총 오차 U자 곡선</span>
</div>

<div class='formula-card'>
  <div class='formula-card-header'>
    <span class='formula-badge'>🧮 총 기대 오차 분해 공식 (Total Expected Error)</span>
  </div>
  <div class='formula-display'>
    Total Error = Bias² + Variance + Irreducible Error(줄일 수 없는 오차, 노이즈)
  </div>
</div>

<table class='confusion-table' style='text-align:left;'>
  <thead>
    <tr>
      <th style='width:25%;'>구분</th>
      <th style='width:38%;'>과소적합 (Underfitting)</th>
      <th style='width:37%;'>과대적합 (Overfitting)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>모델 복잡도</strong></td>
      <td><strong>너무 단순함</strong> (선형 모형으로 비선형 데이터 설명)</td>
      <td><strong>지나치게 복잡함</strong> (고차 다항회귀, 깊은 트리)</td>
    </tr>
    <tr>
      <td><strong>편향 & 분산</strong></td>
      <td><strong>High Bias (높은 편향)</strong> & Low Variance</td>
      <td>Low Bias & <strong>High Variance (높은 분산)</strong></td>
    </tr>
    <tr>
      <td><strong>학습/검증 오차</strong></td>
      <td>학습 오차(Train Loss)도 높고, 검증 오차도 높음</td>
      <td>학습 오차는 0에 가까우나, <strong>검증 오차가 급증함</strong></td>
    </tr>
    <tr>
      <td><strong>해결 방안</strong></td>
      <td>더 복잡한 모델 적용, 파생변수 추가, 규제 완화</td>
      <td><strong>데이터 추가 수집, 규제(L1/L2), 드롭아웃, 차원축소, 교차검증</strong></td>
    </tr>
  </tbody>
</table>

<h4 class='concept-block-h4'>2. 교차 검증 (Cross-Validation) 기법 비교</h4>
<ul class='concept-block-ul'>
  <li><strong>K-Fold 교차 검증:</strong> 데이터를 K개(보통 5 또는 10)로 균등 분할하여 K-1개로 학습, 1개로 검증하는 과정을 K번 반복한 후 평균 성능을 측정.</li>
  <li><strong>Stratified K-Fold (계층적 K-Fold) 🔥:</strong> 불균형 데이터셋에서 각 Fold마다 <strong>타깃 클래스(Y)의 비율을 원본과 동일하게 유지</strong>하며 분할하는 필수 기법.</li>
  <li><strong>LOOCV (Leave-One-Out CV) 🔥:</strong> 전체 N개 데이터 중 <strong>단 1개만 검증용</strong>으로 쓰고 N-1개로 학습하는 과정을 N번 반복. 편향은 거의 없으나 <strong>계산 비용이 극도로 높고 분산이 큼</strong>.</li>
  <li><strong>시계열 교차검증 (Time Series Split):</strong> 시간의 순서를 무시하고 랜덤 셔플링하면 <strong>미래 데이터 누수(Data Leakage)</strong>가 발생하므로, 과거 데이터로만 미래를 예측하도록 순차 확장(Rolling Window) 검증 수행.</li>
</ul>
`;

// Update cards in data.json
let updatedCount = 0;

function updateCard(cardId, newContent) {
  for (const sec of data.sections) {
    if (!sec.cards) continue;
    const card = sec.cards.find(c => c.id === cardId);
    if (card) {
      card.content = newContent.trim();
      updatedCount++;
      console.log(`Updated card: [${cardId}] in section [${sec.id}]`);
      return true;
    }
  }
  return false;
}

updateCard('c2-22', c2_22_content);
updateCard('c2-9', c2_9_content);
updateCard('c2-10', c2_10_content);
updateCard('c2-12', c2_12_content);
updateCard('c3-5', c3_5_content);
updateCard('c3-6', c3_6_content);
updateCard('c3-13-2', c3_13_2_content);
updateCard('c4-1', c4_1_content);
updateCard('c4-4', c4_4_content);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully upgraded ${updatedCount} master concept cards in data.json!`);
