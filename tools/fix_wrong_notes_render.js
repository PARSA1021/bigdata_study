const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Add isGichulQuestion function right after getQuestionRound
const targetGetRound = `  function getQuestionRound(q) {
    if (!q) return "mock";
    const exam = q.exam || q.round;
    if (exam) {
      const match = String(exam).match(/(\\d+)/);
      if (match) return match[1];
    }
    const qid = String(q.id || "");
    if (qid.startsWith("Q9_")) return "9";
    if (qid.startsWith("Q8_")) return "8";
    if (qid.startsWith("Q12_")) return "12";
    if (qid.startsWith("Q11_")) return "11";
    if (qid.startsWith("Q10_") || qid.startsWith("Q10")) return "10";
    if (qid.startsWith("Q4_")) return "4";
    if (qid.startsWith("Q5")) return "mock";
    if (/^Q[1-4]/.test(qid)) return "practice";

    const qText = q.question || "";
    const textMatch = qText.match(/\\[(\\d+)회/);
    if (textMatch) return textMatch[1];

    return "mock";
  }`;

const replacementGetRound = `  function getQuestionRound(q) {
    if (!q) return "mock";
    const exam = q.exam || q.round;
    if (exam) {
      const match = String(exam).match(/(\\d+)/);
      if (match) return match[1];
    }
    const qid = String(q.id || "");
    if (qid.startsWith("Q9_")) return "9";
    if (qid.startsWith("Q8_")) return "8";
    if (qid.startsWith("Q12_")) return "12";
    if (qid.startsWith("Q11_")) return "11";
    if (qid.startsWith("Q10_") || qid.startsWith("Q10")) return "10";
    if (qid.startsWith("Q4_")) return "4";
    if (qid.startsWith("Q5")) return "mock";
    if (/^Q[1-4]/.test(qid)) return "practice";

    const qText = q.question || "";
    const textMatch = qText.match(/\\[(\\d+)회/);
    if (textMatch) return textMatch[1];

    return "mock";
  }

  function isGichulQuestion(q) {
    if (!q) return false;
    if (typeof q.isGichul === "boolean") return q.isGichul;
    const r = (q._round || getQuestionRound(q));
    return r !== "practice" && r !== "mock_practice";
  }`;

if (code.includes(targetGetRound)) {
  code = code.replace(targetGetRound, replacementGetRound);
} else {
  console.error("targetGetRound not found");
}

// 2. Update buildMaps to cache q._isGichul
const targetBuildMaps = `    allQuizzes.forEach(q => {
      // ⚡ 고성능 최적화: 매 필터/검색 시 30,000+ 정규식/문자열 할당 제거를 위한 사전 캐싱
      q._round = getQuestionRound(q);
      q._isCalc = isCalcQuestion(q);`;

const replacementBuildMaps = `    allQuizzes.forEach(q => {
      // ⚡ 고성능 최적화: 매 필터/검색 시 30,000+ 정규식/문자열 할당 제거를 위한 사전 캐싱
      q._round = getQuestionRound(q);
      q._isGichul = (q.isGichul === true || (q._round && q._round !== "practice" && q._round !== "mock_practice"));
      q._isCalc = isCalcQuestion(q);`;

if (code.includes(targetBuildMaps)) {
  code = code.replace(targetBuildMaps, replacementBuildMaps);
} else {
  console.error("targetBuildMaps not found");
}

// 3. Update updateWrongHeaderCounts and renderWrongNotesView
const targetGichulFilter1 = `    const gichulWrong = activeWrong.filter(q => q._isGichul);`;
const replacementGichulFilter1 = `    const gichulWrong = activeWrong.filter(q => q._isGichul || isGichulQuestion(q));`;

code = code.replace(targetGichulFilter1, replacementGichulFilter1);
code = code.replace(targetGichulFilter1, replacementGichulFilter1); // replace both occurrences

fs.writeFileSync(appPath, code, 'utf8');
console.log('Successfully updated app.js with isGichulQuestion and q._isGichul caching!');
