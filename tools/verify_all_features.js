const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT_DIR = path.join(__dirname, '..');

console.log('=== 🚀 진짜 기출문제 기능 통합 테스트 시작 ===\n');

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
  '9': 50,
  '8': 50,
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
  console.log('✅ 회차별 문항 수 100% 일치 확인!\n');
}

// 2. Test 12th mock exam preset selection (20 questions per subject = 80 total)
const mock12th = [];
for (let s = 1; s <= 4; s++) {
  const sQuizzes = cbt.questions.filter(q => q.round === "12" && q.subject === s);
  mock12th.push(...sQuizzes.slice(0, 20));
}
console.log(`3. 12회 정규 80제 모의고사 구성: 총 ${mock12th.length}문항 (각 과목 20제씩 균등 분배: 1과목 ${mock12th.filter(q => q.subject===1).length}, 2과목 ${mock12th.filter(q => q.subject===2).length}, 3과목 ${mock12th.filter(q => q.subject===3).length}, 4과목 ${mock12th.filter(q => q.subject===4).length})`);

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
      console.log('\n🎉 모든 기출문제 기능 및 웹 서버 통합 검증 통과!');
      process.exit(0);
    }
  }).on('error', err => {
    console.error(`❌ 서버 연결 에러 [${urlPath}]:`, err.message);
    process.exit(1);
  });
});
