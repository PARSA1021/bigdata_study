const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

const target = `      let gichulBadgeHTML = "";
      if (isRealGichul) {
        const rLabel = quiz._round === "12" ? "👑 12회 최신 기출" :
                       quiz._round === "11" ? "👑 11회 실전 기출" :
                       quiz._round === "10" ? "👑 10회 실전 기출" :
                       quiz._round === "9" ? "👑 9회 기출 복원" :
                       quiz._round === "8" ? "👑 8회 기출 복원" :
                       quiz._round === "4" ? "👑 4회 실전 기출" : "👑 단원별 빈출 기출";
        gichulBadgeHTML = \`<span class="quiz-tag-badge gichul-badge">\${rLabel}</span>\`;
      }`;

const replacement = `      let gichulBadgeHTML = "";
      if (isRealGichul) {
        const r = quiz._round || (typeof getQuestionRound === "function" ? getQuestionRound(quiz) : "gichul");
        const rLabel = r === "12" ? "👑 12회 최신 기출" :
                       r === "11" ? "👑 11회 실전 기출" :
                       r === "10" ? "👑 10회 실전 기출" :
                       r === "9" ? "👑 9회 기출 복원" :
                       r === "8" ? "👑 8회 기출 복원" :
                       r === "4" ? "👑 4회 실전 기출" : "👑 단원별 빈출 기출";
        gichulBadgeHTML = \`<span class="quiz-tag-badge gichul-badge">\${rLabel}</span>\`;
      }`;

// Normalize line endings
code = code.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (code.includes(normalizedTarget)) {
  code = code.replace(normalizedTarget, replacement);
  fs.writeFileSync(appPath, code, 'utf8');
  console.log('Successfully updated gichul badge round detection in wrong notes!');
} else {
  console.error('Target not found in app.js');
}
