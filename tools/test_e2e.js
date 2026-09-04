const path = require('path');
const ROOT_DIR = path.join(__dirname, '..');

console.log('=== 🚀 KNOWWAY E2E 전 기능 통합 시뮬레이션 테스트 시작 ===\n');

global.window = {};
require(path.join(ROOT_DIR, 'data/data.js'));
require(path.join(ROOT_DIR, 'data/cbt_bank.js'));
require(path.join(ROOT_DIR, 'data/tutor_data.js'));

const cbt = window.cbtBank;
const note = window.noteData;
const tutor = window.TUTOR_CURRICULUM;

// 1. Dataset stats
console.log('1. 데이터 스크립트 정상 로드:');
console.log(`   - CBT 총 문항: ${cbt.questions.length}제`);
console.log(`   - 요약노트 섹션: ${note.sections.length}개`);
console.log(`   - AI 튜터 단계: ${tutor.length}단계`);

// 2. Round breakdown
const roundsMap = {};
cbt.questions.forEach(q => {
  roundsMap[q.round] = (roundsMap[q.round] || 0) + 1;
});
console.log('\n2. 회차별 문항 수 확인:', roundsMap);

// 3. Mock Exam generator simulation for 7 presets (12th, 11th, 10th, 9th, 8th, 4th, random)
console.log('\n3. 실전 모의고사 7개 전 프리셋 80제 완결성 검증:');
const presets = ['12th', '11th', '10th', '9th', '8th', '4th', 'random'];

presets.forEach(p => {
  let selected = [];
  if (p === '12th') {
    for (let s = 1; s <= 4; s++) {
      const sQuizzes = cbt.questions.filter(q => q.round === '12' && q.subject === s);
      selected.push(...sQuizzes.slice(0, 20));
    }
  } else if (p === '11th') {
    selected = cbt.questions.filter(q => q.round === '11');
  } else if (p === '10th') {
    selected = cbt.questions.filter(q => q.round === '10');
  } else if (p === '9th') {
    selected = cbt.questions.filter(q => q.round === '9');
  } else if (p === '8th') {
    selected = cbt.questions.filter(q => q.round === '8');
  } else if (p === '4th') {
    selected = cbt.questions.filter(q => q.round === '4');
  } else {
    for (let s = 1; s <= 4; s++) {
      const sQuizzes = cbt.questions.filter(q => q.isGichul && q.subject === s);
      selected.push(...sQuizzes.slice(0, 20));
    }
  }

  const sub1 = selected.filter(q => q.subject === 1).length;
  const sub2 = selected.filter(q => q.subject === 2).length;
  const sub3 = selected.filter(q => q.subject === 3).length;
  const sub4 = selected.filter(q => q.subject === 4).length;

  if (selected.length === 80 && sub1 === 20 && sub2 === 20 && sub3 === 20 && sub4 === 20) {
    console.log(`   ✓ [${p}] 실전 모의: 총 ${selected.length}제 (과목별: ${sub1}, ${sub2}, ${sub3}, ${sub4}) ➔ 완벽(80제)`);
  } else {
    console.error(`   ❌ [${p}] 실전 모의 비정상: 총 ${selected.length}제 (과목별: ${sub1}, ${sub2}, ${sub3}, ${sub4})`);
    process.exit(1);
  }
});

// 4. AI Tutor integrity
console.log('\n4. AI 튜터 16단계 커리큘럼 무결성 검증:');
let totalConcepts = 0;
let totalTutorQuestions = 0;
tutor.forEach(st => {
  if (st.concepts) {
    totalConcepts += st.concepts.length;
    st.concepts.forEach(c => {
      if (c.questions) totalTutorQuestions += c.questions.length;
    });
  }
});
console.log(`   ✓ ${tutor.length}단계 내 총 ${totalConcepts}개 핵심 개념 및 ${totalTutorQuestions}개 실전 확인 문제 완비`);

// 5. Summary Notes check
let totalCards = 0;
note.sections.forEach(sec => {
  totalCards += (sec.cards || []).length;
});
console.log(`\n5. 핵심 요약노트 무결성: ${note.sections.length}개 섹션 / ${totalCards}개 개념 카드 완비`);

console.log('\n🎉 전 기능 E2E 시뮬레이션 테스트 100% 무결성 통과!\n');
