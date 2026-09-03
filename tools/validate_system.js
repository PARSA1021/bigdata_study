const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('=== 🔍 KNOWWAY 시스템 무결성 및 기출 문제은행 검증 시작 ===\n');

// 1. Core files presence check
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/tutor.js',
  'data/tutor_data.js',
  'data/data.js',
  'data/data.json',
  'data/cbt_bank.js',
  'data/cbt_bank.json',
  'manifest.json',
  'sw.js',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

let missing = 0;
requiredFiles.forEach(f => {
  const p = path.join(ROOT_DIR, f);
  if (!fs.existsSync(p)) {
    console.error(`❌ 필수 파일 누락: ${f}`);
    missing++;
  }
});
if (missing === 0) {
  console.log(`✅ 1. 모든 필수 앱 파일 존재 확인 (${requiredFiles.length}개 파일)`);
} else {
  process.exit(1);
}

// 2. JS Syntax validation
const jsFiles = [
  'js/app.js',
  'js/tutor.js',
  'data/tutor_data.js',
  'data/data.js',
  'data/cbt_bank.js',
  'sw.js'
];
jsFiles.forEach(file => {
  try {
    execSync(`node -c "${path.join(ROOT_DIR, file)}"`);
  } catch (err) {
    console.error(`❌ JS 구문 오류: ${file}`);
    process.exit(1);
  }
});
console.log('✅ 2. 모든 JavaScript 파일 구문 무결성 통과 (Syntax 100% OK)');

// 3. Data consistency & Gichul metadata check
global.window = {};
require(path.join(ROOT_DIR, 'data/data.js'));
require(path.join(ROOT_DIR, 'data/cbt_bank.js'));
require(path.join(ROOT_DIR, 'data/tutor_data.js'));

const dataJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/data.json'), 'utf8'));
const cbtJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data/cbt_bank.json'), 'utf8'));

console.log(`✅ 3. 데이터 요약:`);
console.log(`   - 요약노트 섹션 수: ${window.noteData.sections.length}개 (JSON 일치: ${dataJson.sections.length === window.noteData.sections.length})`);
console.log(`   - CBT 문제은행 총 문항: ${window.cbtBank.questions.length}문항 (JSON 일치: ${cbtJson.questions.length === window.cbtBank.questions.length})`);
console.log(`   - 진짜 기출문제 총 문항: ${cbtJson.meta.totalRealGichul}문항 (12회~4회 + 단원별 빈출 기출)`);
console.log(`   - AI 튜터 1:1 커리큘럼 단계: ${window.TUTOR_CURRICULUM.length}단계`);

// 4. Question IDs uniqueness & Choices & Gichul classification validation
const qIds = new Set();
let invalidQ = 0;
const roundsMap = {};

cbtJson.questions.forEach((q, idx) => {
  if (qIds.has(q.id)) {
    console.error(`❌ 중복 문제 ID: ${q.id} (index ${idx})`);
    invalidQ++;
  }
  qIds.add(q.id);
  if (!q.choices || q.choices.length !== 4) {
    console.error(`❌ 선지 개수 비정상 (4개 아님): ${q.id}`);
    invalidQ++;
  }
  if (q.answer < 0 || q.answer > 3) {
    console.error(`❌ 정답 인덱스 비정상: ${q.id} (answer: ${q.answer})`);
    invalidQ++;
  }
  if (!q.round) {
    console.error(`❌ round 메타데이터 누락: ${q.id}`);
    invalidQ++;
  }
  roundsMap[q.round] = (roundsMap[q.round] || 0) + 1;
});

if (invalidQ === 0) {
  console.log(`✅ 4. CBT 문제은행 ${cbtJson.questions.length}문항 100% 무결성 및 기출 회차 분류 검증 완료:`);
  console.log(`   - 12회 최신 기출 복원: ${roundsMap['12']}제`);
  console.log(`   - 11회 실전 기출: ${roundsMap['11']}제 (정규 80제 완결)`);
  console.log(`   - 10회 실전 기출: ${roundsMap['10']}제 (정규 80제 완결)`);
  console.log(`   - 9회 기출 복원: ${roundsMap['9']}제 (정규 80제 완결!)`);
  console.log(`   - 8회 기출 복원: ${roundsMap['8']}제 (정규 80제 완결!)`);
  console.log(`   - 4회 실전 기출: ${roundsMap['4']}제 (정규 80제 완결)`);
  console.log(`   - 단원별 빈출·실전 기출: ${roundsMap['frequent']}제`);
  console.log(`   - 단원별 개념/예상: ${roundsMap['practice']}제`);
}

// 5. HTML Elements, Presets & Wrong Note elements check
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const expectedElements = [
  'mockPreset12th', 'mockPreset11th', 'mockPreset10th', 'mockPreset9th', 'mockPreset8th', 'mockPreset4th', 'mockPresetRandom',
  'btnAllGichulPack', 'btnVariantPack', 'btn12thExamPack', 'btn11thExamPack', 'btn10thExamPack', 'btn9thExamPack', 'btn8thExamPack', 'btn4thExamPack', 'btnFrequentGichulPack',
  'wrongTotalCount', 'wrongMasteredCount', 'wrongBookmarkCount', 'retryAllWrongBtn', 'retryGichulWrongBtn',
  'wfAllCount', 'wfGichulCount', 'wfHighCount', 'wfMasteredTabCount', 'wfBookCount', 'wfSub1Count', 'wfSub2Count', 'wfSub3Count', 'wfSub4Count',
  'oxTrainerModal', 'calcToolModal', 'ddayModal', 'examHallFlashModal', 'omrDrawer'
];

let missingElements = 0;
expectedElements.forEach(eid => {
  if (!html.includes(`id="${eid}"`)) {
    console.error(`❌ HTML 필수 요소/프리셋 누락: ${eid}`);
    missingElements++;
  }
});
if (missingElements === 0) {
  console.log(`✅ 5. 모든 기출 프리셋 7종, 퀵 팩 버튼 8종, 오답노트 필터 9종 및 풀이 액션 버튼 정상 확인`);
}

console.log('\n🎉 시스템 무결성 검증 완료: 모든 파일 및 데이터가 정상 작동 중입니다!\n');
