const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, 'data.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 1. 3과목 nav 업데이트
const nav3 = data.nav.find(g => g.group.includes('3과목'));
if (nav3 && !nav3.items.find(i => i.id === 's3-13')) {
  nav3.items.push({ id: 's3-13', label: '13. 최신 딥러닝 및 최적화', level: 1 });
}

// 2. 3과목 심화 섹션 추가
if (!data.sections.find(s => s.id === 's3-13')) {
  data.sections.push({
    id: 's3-13',
    num: '13',
    title: '최신 딥러닝 및 최적화',
    cards: [
      {
        id: 'c3-13-1',
        title: '하이퍼파라미터 최적화(Hyperparameter Tuning)',
        open: false,
        blocks: [
          { type: 'h4', text: '주요 최적화 기법 비교' },
          { type: 'ul', items: [
            '<strong>그리드 서치(Grid Search):</strong> 사용자가 지정한 모든 하이퍼파라미터 조합을 탐색. 확실하지만 시간이 매우 오래 걸림.',
            '<strong>랜덤 서치(Random Search):</strong> 지정된 범위 내에서 무작위로 값을 추출하여 탐색. 그리드 서치보다 빠르고 효율적일 때가 많음.',
            '<strong>베이지안 최적화(Bayesian Optimization):</strong> 이전 탐색 결과를 바탕으로 다음 탐색 위치를 지능적으로 추정(Surrogate Model 활용). 최적해를 빠르게 찾음.'
          ]},
          { type: 'note', text: '🚨 [출제자의 함정] 베이지안 최적화는 단순히 무작위 탐색이 아니라 <strong>사전 정보(Prior)</strong>를 활용한다는 점이 빈출 포인트입니다.' }
        ]
      },
      {
        id: 'c3-13-2',
        title: '어텐션 메커니즘과 트랜스포머 (Attention & Transformer)',
        open: false,
        blocks: [
          { type: 'h4', text: '어텐션 메커니즘(Attention Mechanism)' },
          { type: 'ul', items: [
            '시퀀스 데이터 처리 시, 출력 단어를 예측할 때 입력 시퀀스 중 <strong>어떤 부분에 집중(Attention)</strong>해야 하는지 가중치를 부여하는 기법.',
            'RNN의 기울기 소실(Vanishing Gradient) 및 장기 의존성(Long-Term Dependency) 문제를 해결.'
          ]},
          { type: 'h4', text: '트랜스포머(Transformer)' },
          { type: 'ul', items: [
            'RNN, CNN을 완전히 배제하고 <strong>오직 어텐션(Self-Attention)만으로</strong> 구성된 모델 구조.',
            '병렬 처리가 가능하여 학습 속도가 매우 빠르고, BERT나 GPT 등 최신 LLM(대형 언어 모델)의 기반이 됨.'
          ]}
        ]
      }
    ]
  });
}

// 3. 2과목 - 불균형 데이터 처리 카드 추가 (s2-5 분석 변수 처리)
const sec2_5 = data.sections.find(s => s.id === 's2-5');
if (sec2_5 && !sec2_5.cards.find(c => c.id === 'c2-5-99')) {
  sec2_5.cards.push({
    id: 'c2-5-99',
    title: '불균형 데이터(Imbalanced Data) 처리',
    open: false,
    blocks: [
      { type: 'h4', text: '샘플링 기법' },
      { type: 'ul', items: [
        '<strong>언더샘플링(Undersampling):</strong> 다수 클래스의 데이터를 줄여 소수 클래스와 맞춤. 데이터 유실 문제 발생.',
        '<strong>오버샘플링(Oversampling):</strong> 소수 클래스의 데이터를 복제하여 다수 클래스와 맞춤. 과적합 우려.'
      ]},
      { type: 'h4', text: '고급 샘플링 알고리즘' },
      { type: 'ul', items: [
        '<strong>SMOTE:</strong> 소수 클래스 데이터들 사이를 선분으로 이어 가상의 새로운 데이터를 생성 (과적합 완화).',
        '<strong>ADASYN:</strong> SMOTE를 개선하여 분류가 어려운 데이터 주변에 더 많은 데이터를 생성.'
      ]},
      { type: 'note', text: '🚨 [출제자의 꿀팁] 불균형 데이터에서는 정확도(Accuracy)보다 F1-Score, ROC-AUC 지표를 사용하는 것이 적절하다는 것이 단골 출제됩니다.' }
    ]
  });
}

// 4. 4과목 - 혼동 행렬 팁 추가 (s4-1)
const sec4_1 = data.sections.find(s => s.id === 's4-1');
if (sec4_1) {
  const confMatrixCard = sec4_1.cards.find(c => c.title.includes('혼동 행렬') || c.title.includes('평가 지표'));
  if (confMatrixCard) {
    if (!JSON.stringify(confMatrixCard).includes('정확도의 역설')) {
      confMatrixCard.blocks.push({
        type: 'note',
        text: '🚨 [출제자의 함정 - 정확도의 역설] 암 환자가 1%인 데이터에서 무조건 "정상"이라고 예측해도 정확도는 99%가 됩니다. 따라서 불균형 데이터에서는 정확도를 맹신하면 안 되며, <strong>재현율(Recall, 실제 환자를 환자로 판별)</strong>이 훨씬 중요한 지표가 됩니다.'
      });
    }
  } else {
    sec4_1.cards.unshift({
      id: 'c4-1-0',
      title: '평가 지표와 출제자의 함정',
      open: false,
      blocks: [
        { type: 'note', text: '🚨 [출제자의 함정 - 정확도의 역설] 암 환자가 1%인 데이터에서 모두 "정상"이라고 예측해도 정확도는 99%입니다. 즉, 불균형 데이터에서는 <strong>정확도(Accuracy)를 맹신하면 안 되며, 재현율(Recall)이나 F1-Score</strong>가 중요합니다.' }
      ]
    });
  }
}

// 5. 3과목 - 과적합 방지 기법 (s3-5 인공신경망)
const sec3_5 = data.sections.find(s => s.id === 's3-5');
if (sec3_5) {
  const annCard = sec3_5.cards.find(c => c.title.includes('인공신경망') || c.title.includes('퍼셉트론'));
  if (annCard && !JSON.stringify(annCard).includes('드롭아웃')) {
    annCard.blocks.push({ type: 'h4', text: '과적합(Overfitting) 방지 기법' });
    annCard.blocks.push({ type: 'ul', items: [
      '<strong>드롭아웃(Dropout):</strong> 학습 시 신경망의 노드를 무작위로 끄고 학습시켜 특정 노드에 의존하는 것을 방지.',
      '<strong>조기 종료(Early Stopping):</strong> 검증 데이터의 오차가 증가하기 시작하면 학습을 중단.',
      '<strong>가중치 규제(L1/L2 Regularization):</strong> 가중치 값이 너무 커지지 않도록 패널티를 부여.'
    ]});
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Successfully updated data.json');
