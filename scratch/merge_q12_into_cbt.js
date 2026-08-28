const fs = require('fs');
const path = require('path');

const { q12_list } = require('./gen_q12');
const { q12_part2 } = require('./gen_q12_part2');

const all_q12 = [...q12_list, ...q12_part2];
console.log(`총 12회 복원 문제 개수: ${all_q12.length}문항`);

if (all_q12.length !== 80) {
  console.error("오류: 12회 문제가 80문항이 아닙니다!");
  process.exit(1);
}

// 1. cbt_bank.js 업데이트
const cbtPath = path.join(__dirname, '..', 'cbt_bank.js');
let cbtContent = fs.readFileSync(cbtPath, 'utf8');

// Parse existing questions
eval(cbtContent.replace('window.cbtBank =', 'global.cbtBank ='));

// Remove any existing Q12_ questions if previously added
const filteredQuestions = global.cbtBank.questions.filter(q => !q.id.startsWith('Q12_'));
const newQuestions = [...filteredQuestions, ...all_q12];

const newCbtBank = {
  meta: {
    title: "빅데이터분석기사 실전 기출 복원 모의고사",
    version: "2026.12 (12회 기출 복원 완벽 반영)",
    generatedFrom: "빅데이터 분석기사 역대 기출문제(12회~1회) 완벽 분석 및 복원",
    totalQuestions: newQuestions.length,
    lastUpdated: new Date().toISOString()
  },
  questions: newQuestions
};

const newCbtContent = `window.cbtBank = ${JSON.stringify(newCbtBank, null, 2)};\n`;
fs.writeFileSync(cbtPath, newCbtContent, 'utf8');
console.log(`cbt_bank.js 업데이트 완료! 총 문항수: ${newQuestions.length}`);

// 2. cbt_bank.json 도 업데이트 (동기화)
const jsonPath = path.join(__dirname, '..', 'cbt_bank.json');
fs.writeFileSync(jsonPath, JSON.stringify(newCbtBank, null, 2), 'utf8');
console.log(`cbt_bank.json 업데이트 완료!`);
