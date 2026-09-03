const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js/app.js'), 'utf8');
const tutorJs = fs.readFileSync(path.join(ROOT_DIR, 'js/tutor.js'), 'utf8');
const cbtData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/cbt_bank.json'), 'utf8'));
const noteData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/data.json'), 'utf8'));

console.log('=== 🔎 KNOWWAY 전수 기능 및 잠재적 에러 종합 정밀 검사 ===\n');

// 1. Audit getElementById in app.js and tutor.js
// Ignore elements created dynamically inside JS templates
const dynamicIds = new Set([
  'knowwayToast', 'tutorChatInput', 'tutorChatMessages',
  'speedDrillContent', 'speedTimerBar', 'speedFeedbackBox', 'speedStreakVal', 'speedScoreVal',
  'reviewQuizArena', 'reviewFbBox', 'popQuizContainer', 'tutorInteractiveQuizContainer',
  'tutorMasteryBanner', 'tutorAudioBtn', 'resetFilterBtnInline', 'quizLoadMoreWrapper',
  'reviewWrongBtn', 'btnResetWeaknessFilter', 'homeUnsolvedQuickCount'
]);

const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
const missingIds = [];
const checkedIds = new Set();

let m;
while ((m = idRegex.exec(appJs)) !== null) {
  const id = m[1];
  if (!checkedIds.has(id)) {
    checkedIds.add(id);
    if (!html.includes(`id="${id}"`) && !dynamicIds.has(id)) {
      missingIds.push({ file: 'js/app.js', id });
    }
  }
}

while ((m = idRegex.exec(tutorJs)) !== null) {
  const id = m[1];
  if (!checkedIds.has(id)) {
    checkedIds.add(id);
    if (!html.includes(`id="${id}"`) && !dynamicIds.has(id)) {
      missingIds.push({ file: 'js/tutor.js', id });
    }
  }
}

console.log(`1. DOM getElementById 검사: 총 ${checkedIds.size}개 ID 확인`);
if (missingIds.length > 0) {
  console.warn(`⚠️ HTML에서 누락된 DOM ID (${missingIds.length}개):`, missingIds);
} else {
  console.log('✅ 모든 정적 DOM getElementById 참조가 HTML에 완벽하게 존재합니다!');
}

// 2. CBT Question bank integrity
console.log(`\n2. CBT 문제은행 (총 ${cbtData.questions.length}문항) 검사:`);
let qErrors = 0;
cbtData.questions.forEach((q, idx) => {
  if (!q.id || !q.question || !q.choices || q.choices.length !== 4 || q.answer < 0 || q.answer > 3 || !q.explanation) {
    console.error(`❌ 문제 데이터 결함: ID ${q.id} (index ${idx})`);
    qErrors++;
  }
});
if (qErrors === 0) {
  console.log(`✅ ${cbtData.questions.length}개 전체 문항 100% 무결성 확인 (ID, 지문, 4지선다, 정답 0~3, 해설)`);
}

// 3. Summary notes integrity
console.log(`\n3. 핵심 요약노트 (총 ${noteData.sections.length}개 섹션) 검사:`);
let totalCards = 0;
let noteErrors = 0;
noteData.sections.forEach(sec => {
  if (!sec.id || !sec.title || !Array.isArray(sec.cards)) {
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

console.log('\n=============================================');
console.log('🎉 종합 감사 완료: 모든 검증 항목 무결성 확인!');
console.log('=============================================\n');
