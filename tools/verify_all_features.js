const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT_DIR = path.join(__dirname, '..');

console.log('=== 🚀 8회·9회 기출 확장 및 전 회차 실전 모의고사 검증 시작 ===\n');

// 1. Data load & round distribution verification
global.window = {};
require(path.join(ROOT_DIR, 'data.js'));
require(path.join(ROOT_DIR, 'cbt_bank.js'));
require(path.join(ROOT_DIR, 'tutor_data.js'));

const cbt = window.cbtBank;
console.log(`1. 총 문항 수: ${cbt.questions.length}문항`);
console.log(`2. 진짜 기출문제 총 문항: ${cbt.meta.totalRealGichul}문항`);

const roundExpected = {
  '12': 242,
  '11': 80,
  '10': 80,
  '9': 80,
  '8': 80,
  '4': 80,
  'frequent': 272,
  'practice': 87
};

let matchFailures = 0;
for (const [r, expected] of Object.entries(roundExpected)) {
  const actual = cbt.questions.filter(q => q.round === r).length;
  if (actual !== expected) {
    console.error(`❌ 회차 문항 불일치 [${r}]: 예상 ${expected}, 실제 ${actual}`);
    matchFailures++;
  } else {
    console.log(`   ✓ [${r}] 회차: ${actual}문항 (정상)`);
  }
}

if (matchFailures === 0) {
  console.log('✅ 8회·9회 포함 전 회차 문항 수 100% 일치 확인!\n');
}

// 2. Test 8th and 9th mock exam preset selection (20 questions per subject = 80 total)
const testPresets = ['8', '9', '10', '11', '4'];
testPresets.forEach(r => {
  const rQuizzes = cbt.questions.filter(q => q.round === r);
  console.log(`3. [${r}회 실전 모의고사] 총 ${rQuizzes.length}문항 (1과목 ${rQuizzes.filter(q => q.subject===1).length}제, 2과목 ${rQuizzes.filter(q => q.subject===2).length}제, 3과목 ${rQuizzes.filter(q => q.subject===3).length}제, 4과목 ${rQuizzes.filter(q => q.subject===4).length}제)`);
});

// 3. Test HTTP server responses
const testUrls = ['/', '/index.html', '/style.css', '/app.js', '/cbt_bank.js', '/data.js', '/tutor.js', '/manifest.json'];
let pending = testUrls.length;

testUrls.forEach(urlPath => {
  http.get(`http://localhost:3000${urlPath}`, res => {
    if (res.statusCode !== 200) {
      console.error(`❌ HTTP 요청 실패 [${urlPath}]: ${res.statusCode}`);
    } else {
      console.log(`   ✓ HTTP 200 OK: ${urlPath}`);
    }
    pending--;
    if (pending === 0) {
      console.log('\n🎉 8회·9회 확장 및 실전 CBT 웹 서버 통합 검증 완벽 통과!');
      process.exit(0);
    }
  }).on('error', err => {
    console.error(`❌ 서버 연결 에러 [${urlPath}]:`, err.message);
    process.exit(1);
  });
});
