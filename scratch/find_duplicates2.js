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
        // Decide which one to keep.
        // Mock exam questions have prefixes: Q11_, Q10_, Q4_
        const q1IsMock = cbt.questions[i].id.includes('_');
        const q2IsMock = cbt.questions[j].id.includes('_');
        
        let keep, remove;
        if (q1IsMock && !q2IsMock) {
          keep = cbt.questions[i];
          remove = cbt.questions[j];
        } else if (!q1IsMock && q2IsMock) {
          keep = cbt.questions[j];
          remove = cbt.questions[i];
        } else {
          // Both are mock, or both are general.
          // Keep the first one.
          keep = cbt.questions[i];
          remove = cbt.questions[j];
          
          if (q1IsMock && q2IsMock) {
            console.log(`WARNING: Both are mock exams! Keeping ${keep.id}, removing ${remove.id}`);
          }
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
