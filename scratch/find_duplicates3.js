const fs = require('fs');
const path = require('path');

const cbtPath = path.join(__dirname, '../cbt_bank.json');
const cbt = JSON.parse(fs.readFileSync(cbtPath, 'utf8'));

function normalize(text) {
  if (!text) return '';
  return text
    .replace(/^\[.*?\]\s*/g, '')
    .replace(/[^\w가-힣]/g, '')
    .toLowerCase();
}

function computeSimilarity(str1, str2) {
  const getBigrams = (str) => {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.slice(i, i + 2));
    }
    return bigrams;
  };
  const b1 = getBigrams(str1);
  const b2 = getBigrams(str2);
  if (b1.size === 0 && b2.size === 0) return 1;
  if (b1.size === 0 || b2.size === 0) return 0;
  let intersection = 0;
  for (const b of b1) {
    if (b2.has(b)) intersection++;
  }
  return intersection / Math.min(b1.size, b2.size);
}

const duplicatesToRemove = new Set();
const duplicatePairs = [];

function isMock(id) {
  return id.startsWith("Q11_") || id.startsWith("Q10_") || id.startsWith("Q4_");
}

for (let i = 0; i < cbt.questions.length; i++) {
  if (duplicatesToRemove.has(cbt.questions[i].id)) continue;
  
  const q1Text = normalize(cbt.questions[i].question);
  if (q1Text.length < 5) continue;
  
  for (let j = i + 1; j < cbt.questions.length; j++) {
    if (duplicatesToRemove.has(cbt.questions[j].id)) continue;
    
    const q2Text = normalize(cbt.questions[j].question);
    const sim = computeSimilarity(q1Text, q2Text);
    
    if (sim > 0.85) {
      const c1 = cbt.questions[i].choices ? cbt.questions[i].choices.join('').replace(/[^\w가-힣]/g, '') : '';
      const c2 = cbt.questions[j].choices ? cbt.questions[j].choices.join('').replace(/[^\w가-힣]/g, '') : '';
      const choiceSim = computeSimilarity(c1, c2);
      
      if (choiceSim > 0.8) {
        const q1Mock = isMock(cbt.questions[i].id);
        const q2Mock = isMock(cbt.questions[j].id);
        
        let keep, remove;
        if (q1Mock && !q2Mock) {
          keep = cbt.questions[i];
          remove = cbt.questions[j];
        } else if (!q1Mock && q2Mock) {
          keep = cbt.questions[j];
          remove = cbt.questions[i];
        } else if (q1Mock && q2Mock) {
          // If BOTH are mocks from different exams, they are repeated across exams.
          // In real exams, this happens! Do not remove them to keep exam integrity.
          console.log(`Keeping both mocks: ${cbt.questions[i].id} and ${cbt.questions[j].id}`);
          continue; 
        } else {
          // Both are not mocks, keep the first.
          keep = cbt.questions[i];
          remove = cbt.questions[j];
        }
        
        duplicatesToRemove.add(remove.id);
        duplicatePairs.push({
          keep: keep.id,
          remove: remove.id,
        });
      }
    }
  }
}

console.log(`Found ${duplicatePairs.length} duplicate pairs.`);

const removeScript = `
const fs = require('fs');
const cbtPath = ${JSON.stringify(cbtPath)};
const cbt = JSON.parse(fs.readFileSync(cbtPath, 'utf8'));
const removeIds = new Set(${JSON.stringify(Array.from(duplicatesToRemove))});
const newQuestions = cbt.questions.filter(q => !removeIds.has(q.id));
cbt.questions = newQuestions;
fs.writeFileSync(cbtPath, JSON.stringify(cbt, null, 2), 'utf8');
console.log('Removed ' + removeIds.size + ' duplicates. Remaining: ' + newQuestions.length);
`;
fs.writeFileSync(path.join(__dirname, 'apply_remove.js'), removeScript, 'utf8');
console.log('Run apply_remove.js to remove duplicates safely.');
