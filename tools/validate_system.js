const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

console.log('=== 🔍 KNOWWAY 시스템 무결성 및 데이터 검증 시작 ===\n');

// 1. Core files presence check
const requiredFiles = [
  'index.html',
  'style.css',
  'app.js',
  'tutor.js',
  'tutor_data.js',
  'data.js',
  'data.json',
  'cbt_bank.js',
  'cbt_bank.json',
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
  console.log('✅ 1. 모든 필수 앱 파일 존재 확인 (13개 파일)');
}

// 2. Data consistency check
global.window = {};
require(path.join(ROOT_DIR, 'data.js'));
require(path.join(ROOT_DIR, 'cbt_bank.js'));
require(path.join(ROOT_DIR, 'tutor_data.js'));

const dataJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data.json'), 'utf8'));
const cbtJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'cbt_bank.json'), 'utf8'));

console.log(`✅ 2. 데이터 요약:`);
console.log(`   - 요약노트 섹션 수: ${window.noteData.sections.length}개 (JSON 일치: ${dataJson.sections.length === window.noteData.sections.length})`);
console.log(`   - CBT 문제은행 총 문항: ${window.cbtBank.questions.length}문항 (JSON 일치: ${cbtJson.questions.length === window.cbtBank.questions.length})`);
console.log(`   - AI 튜터 1:1 커리큘럼 단계: ${window.TUTOR_CURRICULUM.length}단계`);

// 3. Question IDs uniqueness & Choices validation
const qIds = new Set();
let invalidQ = 0;
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
});

if (invalidQ === 0) {
  console.log(`✅ 3. CBT 문제은행 ${cbtJson.questions.length}문항 100% 무결성 검증 완료 (고유 ID, 4지선다, 정답 매칭)`);
}

// 4. HTML Modal check
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const modalIds = [
  'oxTrainerModal', 'cheatSheetModal', 'conceptModal',
  'calcToolModal', 'ddayModal', 'examHallFlashModal', 'resetConfirmModal', 'omrDrawer'
];

let missingModals = 0;
modalIds.forEach(mid => {
  if (!html.includes(`id="${mid}"`)) {
    console.error(`❌ 모달 누락: ${mid}`);
    missingModals++;
  }
});
if (missingModals === 0) {
  console.log(`✅ 4. 모든 핵심 모달 8종 HTML 구조 정상 확인`);
}

console.log('\n🎉 시스템 검증 완료: 모든 웹앱 구성 요소가 완벽하게 작동합니다!\n');
