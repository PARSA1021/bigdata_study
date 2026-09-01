const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const jsonPath = path.join(ROOT_DIR, 'cbt_bank.json');
const jsPath = path.join(ROOT_DIR, 'cbt_bank.js');

const cbt = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function cleanText(str) {
  if (!str || typeof str !== 'string') return str;
  // Keep multiline block math ($$...$$) intact, but clean inline single-variable and symbol math
  return str
    .replace(/\$H_0\$|\$H0\$/g, 'H₀')
    .replace(/\$H_1\$|\$H1\$/g, 'H₁')
    .replace(/\$H_a\$|\$Ha\$/g, 'Hₐ')
    .replace(/\$\\alpha\$|\$alpha\$/g, 'α')
    .replace(/\$\\beta\$|\$beta\$/g, 'β')
    .replace(/\$\\mu\$|\$mu\$/g, 'μ')
    .replace(/\$\\sigma\^2\$|\$sigma\^2\$/g, 'σ²')
    .replace(/\$\\sigma\$|\$sigma\$/g, 'σ')
    .replace(/\$\\chi\^2\$|\$chi\^2\$/g, 'χ²')
    .replace(/\$R\^2\$|\$R2\$/g, 'R²')
    .replace(/\$R\^2_\{adj\}\$/g, '수정된 R²')
    .replace(/\$Q_1\$|\$Q1\$/g, 'Q₁')
    .replace(/\$Q_2\$|\$Q2\$/g, 'Q₂')
    .replace(/\$Q_3\$|\$Q3\$/g, 'Q₃')
    .replace(/\$X_1\$/g, 'X₁')
    .replace(/\$X_2\$/g, 'X₂')
    .replace(/\$y_i\$/g, 'yᵢ')
    .replace(/\$F_1\$/g, 'F₁')
    .replace(/\$F_2\$/g, 'F₂')
    .replace(/\$F_\{0\.5\}\$/g, 'F₀.₅')
    .replace(/\$F_\\beta\$/g, 'F_β')
    .replace(/\$\\epsilon\$|\$epsilon\$/g, 'ε')
    .replace(/\$A \\rightarrow B\$/g, 'A → B')
    .replace(/\$P\(X\)\$/g, 'P(X)')
    .replace(/\$Y = X\^2\$/g, 'Y = X²')
    .replace(/\$([a-zA-Z0-9])\$/g, '$1');
}

let modifiedCount = 0;
cbt.questions.forEach(q => {
  const origQ = q.question;
  q.question = cleanText(q.question);
  if (q.explanation) q.explanation = cleanText(q.explanation);
  if (q.choices && Array.isArray(q.choices)) {
    q.choices = q.choices.map(cleanText);
  }
  if (q.whyWrong && Array.isArray(q.whyWrong)) {
    q.whyWrong = q.whyWrong.map(cleanText);
  }
  if (q.examinerTip) q.examinerTip = cleanText(q.examinerTip);
  if (q.memorizationPoint) q.memorizationPoint = cleanText(q.memorizationPoint);

  if (origQ !== q.question) modifiedCount++;
});

fs.writeFileSync(jsonPath, JSON.stringify(cbt, null, 2), 'utf8');
fs.writeFileSync(jsPath, `// CBT Question Bank Data Wrapper for Offline/Localhost CORS Bypass\nwindow.cbtBank = ${JSON.stringify(cbt)};\n`, 'utf8');

console.log(`🎉 성공적으로 ${modifiedCount}개 문항의 수식 및 특수문자 표기를 자연스럽고 깔끔하게 정돈했습니다!`);
