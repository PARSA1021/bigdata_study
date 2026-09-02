const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const jsonPath = path.join(ROOT_DIR, 'cbt_bank.json');
const jsPath = path.join(ROOT_DIR, 'cbt_bank.js');
const killerPath = path.join(__dirname, 'killer_13th_data.json');

const cbtData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const killerQuestions = JSON.parse(fs.readFileSync(killerPath, 'utf8'));

// Filter out any previous test killer IDs
const killerIdSet = new Set(killerQuestions.map(q => q.id));
cbtData.questions = cbtData.questions.filter(q => !killerIdSet.has(q.id) && !['Q_KILLER_101', 'Q_KILLER_102', 'Q_KILLER_103'].includes(q.id));

// Append all 11 new killer questions
killerQuestions.forEach(q => {
  cbtData.questions.push(q);
});

// Update meta
const realCount = cbtData.questions.filter(q => q.isGichul).length;
cbtData.meta.totalQuestions = cbtData.questions.length;
cbtData.meta.total = cbtData.questions.length;
cbtData.meta.totalRealGichul = realCount;
cbtData.meta.lastUpdated = new Date().toISOString();
cbtData.meta.updatedAt = new Date().toISOString();

const roundsMap = {};
cbtData.questions.forEach(q => {
  roundsMap[q.round] = (roundsMap[q.round] || 0) + 1;
});
cbtData.meta.rounds = roundsMap;
cbtData.meta.roundBreakdown = roundsMap;

// Write to cbt_bank.json
fs.writeFileSync(jsonPath, JSON.stringify(cbtData, null, 2), 'utf8');

// Write to cbt_bank.js
const jsContent = `// CBT Question Bank Data Wrapper for Offline/Localhost CORS Bypass\nwindow.cbtBank = ${JSON.stringify(cbtData, null, 2)};\n`;
fs.writeFileSync(jsPath, jsContent, 'utf8');

console.log(`✅ 성공적으로 ${killerQuestions.length}개의 13회 대비 고난도 킬러 문항을 cbt_bank.json 및 cbt_bank.js에 완벽 주입 완료!`);
console.log(`총 문항 수: ${cbtData.questions.length}문항 (진짜 기출: ${realCount}제)`);
console.log('Rounds Breakdown:', roundsMap);
