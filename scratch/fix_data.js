const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');
let dataStr = fs.readFileSync(dataPath, 'utf8');

// Fix malformed HTML tags
dataStr = dataStr.replace(/<\/strong> - <\/strong>/g, '</strong> - ');

const data = JSON.parse(dataStr);

const fixes = {
  'c1-3-new1': `<h4 class='concept-block-h4'>분석 성숙도 (CMMI 모델 기반)</h4><div class='concept-keywords-row'><span class='concept-keyword-label'>🔑 핵심 키워드:</span> <span class='concept-keyword-tag'>성숙도 단계</span><span class='concept-keyword-tag'>초기-관리-정의-정량-최적화</span></div><ul class='concept-block-ul'><li><strong>도입(초기):</strong> 개인의 역량에 의존하는 단계</li><li><strong>활용(관리):</strong> 전문 부서를 통해 분석을 수행하는 단계</li><li><strong>확산(정의):</strong> 전사적 차원에서 분석을 관리하고 공유하는 단계</li><li><strong>최적화:</strong> 분석을 비즈니스에 내재화하여 혁신을 이끄는 단계</li></ul><div class='concept-block-note'>💡 <strong>출제위원 꿀팁:</strong> 도입 -> 활용 -> 확산 -> 최적화 순서를 기억하세요! '최적화' 단계가 가장 높은 수준입니다.</div>`,
  'c1-3-new2': `<h4 class='concept-block-h4'>데이터 거버넌스 체계</h4><div class='concept-keywords-row'><span class='concept-keyword-label'>🔑 핵심 키워드:</span> <span class='concept-keyword-tag'>데이터 표준화</span><span class='concept-keyword-tag'>거버넌스 조직</span><span class='concept-keyword-tag'>품질 관리</span></div><ul class='concept-block-ul'><li><strong>데이터 표준화:</strong> 데이터 표준 용어 설정, 명명 규칙, 메타데이터 구축</li><li><strong>데이터 관리 체계:</strong> 데이터 정합성 및 활용의 원칙과 지침을 수립</li><li><strong>데이터 거버넌스 조직:</strong> 데이터를 전사적으로 관리하는 전담 조직(CDO 등) 구성</li></ul><div class='concept-block-note'>💡 <strong>출제위원 꿀팁:</strong> 데이터 거버넌스의 3대 요소인 '원칙(Principle)', '조직(Organization)', '프로세스(Process)'를 묻는 문제가 자주 출제됩니다.</div>`,
  'c1-3-new3': `<h4 class='concept-block-h4'>상향식 접근법과 프로토타이핑</h4><div class='concept-keywords-row'><span class='concept-keyword-label'>🔑 핵심 키워드:</span> <span class='concept-keyword-tag'>상향식 접근법</span><span class='concept-keyword-tag'>디자인 씽킹</span><span class='concept-keyword-tag'>프로토타이핑</span></div><ul class='concept-block-ul'><li><strong>상향식 접근법 (Bottom-up):</strong> 문제가 명확히 정의되지 않았을 때, 데이터를 먼저 탐색하면서 인사이트를 도출하는 방식 (비지도 학습 중심)</li><li><strong>디자인 씽킹 (Design Thinking):</strong> 발산(상향식)과 수렴(하향식)을 반복하며 아이디어를 구체화</li><li><strong>프로토타이핑 (Prototyping):</strong> 요구사항이 불명확할 때 신속하게 모형(시제품)을 만들어 사용자의 피드백을 통해 개선하는 방식</li></ul><div class='concept-block-note'>💡 <strong>출제위원 꿀팁:</strong> '문제가 주어지고 해법을 찾는다'면 하향식(Top-down), '문제 자체가 불명확하여 데이터로부터 찾는다'면 상향식(Bottom-up)입니다.</div>`,
  'c2-6-new1': `<h4 class='concept-block-h4'>이산확률분포 심화</h4><div class='concept-keywords-row'><span class='concept-keyword-label'>🔑 핵심 키워드:</span> <span class='concept-keyword-tag'>기하분포</span><span class='concept-keyword-tag'>음이항분포</span><span class='concept-keyword-tag'>포아송분포</span></div><ul class='concept-block-ul'><li><strong>기하분포 (Geometric):</strong> 처음 성공할 때까지 시도한 횟수의 분포 (예: 첫 번째 불량품이 나올 때까지 검사한 제품 수)</li><li><strong>음이항분포 (Negative Binomial):</strong> r번째 성공할 때까지 시도한 실패 횟수의 분포</li><li><strong>포아송분포 (Poisson):</strong> 단위 시간/공간 내에서 희귀하게 발생하는 사건의 수 (예: 하루 동안 걸려온 문의 전화 수)</li></ul><div class='concept-block-note'>💡 <strong>출제위원 꿀팁:</strong> 이항분포와 베르누이 분포의 차이뿐만 아니라, '특정 횟수 성공할 때까지'라는 키워드가 나오면 기하/음이항 분포를 떠올리세요.</div>`
};

let fixedCards = 0;
data.sections.forEach(sec => {
  if (sec.cards) {
    sec.cards.forEach(card => {
      if (fixes[card.id]) {
        card.content = fixes[card.id];
        fixedCards++;
      }
    });
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed', fixedCards, 'empty cards and malformed HTML tags.');
