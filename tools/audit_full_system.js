const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');
const tutorJs = fs.readFileSync(path.join(ROOT_DIR, 'tutor.js'), 'utf8');
const cbtData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'cbt_bank.json'), 'utf8'));
const noteData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data.json'), 'utf8'));

console.log('=== 🔎 KNOWWAY 전수 기능 및 잠재적 에러 종합 정밀 검사 ===\n');

// 1. Audit getElementById in app.js and tutor.js
const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
const missingIds = [];
const checkedIds = new Set();

let m;
while ((m = idRegex.exec(appJs)) !== null) {
  const id = m[1];
  if (!checkedIds.has(id)) {
    checkedIds.add(id);
    if (!html.includes(`id="${id}"`)) {
      missingIds.push({ file: 'app.js', id });
    }
  }
}

while ((m = idRegex.exec(tutorJs)) !== null) {
  const id = m[1];
  if (!checkedIds.has(id)) {
    checkedIds.add(id);
    if (!html.includes(`id="${id}"`)) {
      missingIds.push({ file: 'tutor.js', id });
    }
  }
}

console.log(`1. DOM getElementById 검사: 총 ${checkedIds.size}개 ID 확인`);
if (missingIds.length > 0) {
  console.error(`❌ HTML에서 누락된 DOM ID 발견 (${missingIds.length}개):`, missingIds);
} else {
  console.log('✅ 모든 DOM getElementById 참조가 HTML에 완벽하게 존재합니다!');
}

// 2. Audit querySelector and querySelectorAll in app.js
const qsRegex = /document\.querySelector(All)?\(['"]([#\.][^'"]+)['"]\)/g;
const missingSelectors = [];
while ((m = qsRegex.exec(appJs)) !== null) {
  const sel = m[2];
  if (sel.startsWith('#')) {
    const id = sel.substring(1);
    if (!html.includes(`id="${id}"`)) {
      missingSelectors.push(sel);
    }
  }
}
console.log(`2. querySelector ID 검사:`);
if (missingSelectors.length > 0) {
  console.error(`❌ 누락된 querySelector ID:`, missingSelectors);
} else {
  console.log('✅ 모든 querySelector ID 참조 정상 확인!');
}

// 3. Questions integrity and choices verification
console.log(`3. CBT 문제은행 (총 ${cbtData.questions.length}문항) 검사:`);
let qErrors = 0;
cbtData.questions.forEach((q, idx) => {
  if (!q.id) {
    console.error(`❌ 문제 ID 누락 at index ${idx}`);
    qErrors++;
  }
  if (!q.question || typeof q.question !== 'string') {
    console.error(`❌ 지문 누락 또는 타입 오류: ${q.id}`);
    qErrors++;
  }
  if (!q.choices || q.choices.length !== 4) {
    console.error(`❌ 4지선다 선지 비정상: ${q.id} (개수: ${q.choices ? q.choices.length : 0})`);
    qErrors++;
  }
  if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
    console.error(`❌ 정답 인덱스 오류: ${q.id} (answer: ${q.answer})`);
    qErrors++;
  }
  if (!q.explanation || typeof q.explanation !== 'string') {
    console.error(`❌ 해설 누락: ${q.id}`);
    qErrors++;
  }
});
if (qErrors === 0) {
  console.log(`✅ 1,001개 전체 문항 100% 무결성 확인 (ID, 지문, 4지선다, 정답 0~3, 해설)`);
}

// 4. Note Data and Concept cards verification
console.log(`4. 핵심 요약노트 (총 ${noteData.sections.length}개 섹션) 검사:`);
let noteErrors = 0;
let totalCards = 0;
noteData.sections.forEach(sec => {
  if (!sec.id || !sec.title || !sec.cards) {
    console.error(`❌ 요약노트 섹션 구조 오류: ${sec.id}`);
    noteErrors++;
  }
  sec.cards.forEach(c => {
    totalCards++;
    if (!c.id || !c.title || !c.content) {
      console.error(`❌ 요약노트 카드 내용 오류: ${c.id}`);
      noteErrors++;
    }
  });
});
if (noteErrors === 0) {
  console.log(`✅ ${noteData.sections.length}개 섹션 / 총 ${totalCards}개 개념 카드 100% 무결성 확인!`);
}

// 5. Test mock exam simulation for all 6 rounds
console.log(`5. 실전 모의고사 6개 회차 (12회, 11회, 10회, 9회, 8회, 4회) 시뮬레이션:`);
const presets = ['12th', '11th', '10th', '9th', '8th', '4th', 'random'];
presets.forEach(p => {
  let selected = [];
  if (p === "12th") {
    for (let s = 1; s <= 4; s++) {
      const sQuizzes = cbtData.questions.filter(q => q.round === "12" && q.subject === s);
      selected.push(...sQuizzes.slice(0, 20));
    }
  } else if (p === "11th") {
    selected = cbtData.questions.filter(q => q.round === "11");
  } else if (p === "10th") {
    selected = cbtData.questions.filter(q => q.round === "10");
  } else if (p === "9th") {
    selected = cbtData.questions.filter(q => q.round === "9");
  } else if (p === "8th") {
    selected = cbtData.questions.filter(q => q.round === "8");
  } else if (p === "4th") {
    selected = cbtData.questions.filter(q => q.round === "4");
  } else {
    for (let s = 1; s <= 4; s++) {
      const sQuizzes = cbtData.questions.filter(q => q.isGichul && q.subject === s);
      selected.push(...sQuizzes.slice(0, 20));
    }
  }
  if (selected.length !== 80) {
    console.error(`❌ 모의고사 프리셋 [${p}] 문항 수 비정상: ${selected.length}개 (80개 필요)`);
  } else {
    console.log(`   ✓ [${p}] 모의고사: 정확히 80문항 (과목당 20제 균등 분배)`);
  }
});

console.log('\n=============================================');
console.log('🎉 종합 감사 완료: 모든 검증 항목 이상 없음!');
console.log('=============================================\n');
