const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.json');
const bankPath = path.join(__dirname, '..', 'cbt_bank.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));

console.log('=== DATA.JSON VALIDATION ===');
console.log('Total sections:', data.sections.length);
let totalCards = 0;
const cardIdSet = new Set();
const sectionIdSet = new Set();

data.sections.forEach(sec => {
  sectionIdSet.add(sec.id);
  if (sec.cards) {
    sec.cards.forEach(c => {
      if (cardIdSet.has(c.id)) {
        console.warn('Duplicate card ID in data.json:', c.id);
      }
      cardIdSet.add(c.id);
      totalCards++;
    });
  }
});
console.log('Total cards in data.json:', totalCards);

console.log('\n=== CBT_BANK.JSON VALIDATION ===');
console.log('Total questions:', bank.questions.length);

let errCount = 0;
const qIdSet = new Set();
const subCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

bank.questions.forEach((q, idx) => {
  if (qIdSet.has(q.id)) {
    console.error(`Error: Duplicate question ID [${q.id}] at index ${idx}`);
    errCount++;
  }
  qIdSet.add(q.id);

  if (![1, 2, 3, 4].includes(q.subject)) {
    console.error(`Error: Invalid subject [${q.subject}] in question [${q.id}]`);
    errCount++;
  } else {
    subCounts[q.subject]++;
  }

  if (!Array.isArray(q.choices) || q.choices.length !== 4) {
    console.error(`Error: Invalid choices length (${q.choices ? q.choices.length : 0}) in question [${q.id}]`);
    errCount++;
  }

  if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
    console.error(`Error: Invalid answer index [${q.answer}] in question [${q.id}]`);
    errCount++;
  }

  if (!Array.isArray(q.whyWrong) || q.whyWrong.length !== 4) {
    console.error(`Error: Invalid whyWrong length (${q.whyWrong ? q.whyWrong.length : 0}) in question [${q.id}]`);
    errCount++;
  }

  if (!q.question || !q.explanation) {
    console.error(`Error: Empty question or explanation in question [${q.id}]`);
    errCount++;
  }

  if (q.cardId && !cardIdSet.has(q.cardId)) {
    // Non-fatal warning if cardId points to a removed card
    // console.warn(`Notice: cardId [${q.cardId}] in question [${q.id}] not found in data.json`);
  }
});

console.log('Subject distribution:', subCounts);
console.log('Validation completed with', errCount, 'errors.');
