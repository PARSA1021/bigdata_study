const fs = require('fs');
const path = require('path');

const cbtPath = path.join(__dirname, '../cbt_bank.json');
const cbt = JSON.parse(fs.readFileSync(cbtPath, 'utf8'));

console.log(`Total questions: ${cbt.questions.length}`);

// Remove common prefixes and normalize
function normalize(text) {
  if (!text) return '';
  return text
    .replace(/^\[.*?\]\s*/g, '') // Remove prefixes like [기출], [최신 기출 변형]
    .replace(/[^\w가-힣]/g, '') // Remove all punctuation and spaces
    .toLowerCase();
}

function computeSimilarity(str1, str2) {
  // Simple ngram overlap (bigrams)
  function getBigrams(str) {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.slice(i, i + 2));
    }
    return bigrams;
  }
  
  const b1 = getBigrams(str1);
  const b2 = getBigrams(str2);
  
  if (b1.size === 0 && b2.size === 0) return 1;
  if (b1.size === 0 || b2.size === 0) return 0;
  
  let intersection = 0;
  for (const b of b1) {
    if (b2.has(b)) intersection++;
  }
  
  return intersection / Math.min(b1.size, b2.size); // Overlap coefficient
}

const duplicatesToRemove = new Set();
const duplicatePairs = [];

for (let i = 0; i < cbt.questions.length; i++) {
  if (duplicatesToRemove.has(cbt.questions[i].id)) continue;
  
  const q1Text = normalize(cbt.questions[i].question);
  if (q1Text.length < 5) continue; // too short
  
  for (let j = i + 1; j < cbt.questions.length; j++) {
    if (duplicatesToRemove.has(cbt.questions[j].id)) continue;
    
    const q2Text = normalize(cbt.questions[j].question);
    const sim = computeSimilarity(q1Text, q2Text);
    
    if (sim > 0.85) {
      // Check choices as well to be sure
      const c1 = cbt.questions[i].choices ? cbt.questions[i].choices.join('').replace(/[^\w가-힣]/g, '') : '';
      const c2 = cbt.questions[j].choices ? cbt.questions[j].choices.join('').replace(/[^\w가-힣]/g, '') : '';
      const choiceSim = computeSimilarity(c1, c2);
      
      if (choiceSim > 0.8) {
        duplicatesToRemove.add(cbt.questions[j].id);
        duplicatePairs.push({
          keep: cbt.questions[i].id,
          remove: cbt.questions[j].id,
          q1: cbt.questions[i].question,
          q2: cbt.questions[j].question,
          sim: sim,
          choiceSim: choiceSim
        });
      }
    }
  }
}

console.log(`Found ${duplicatePairs.length} duplicate pairs.`);
if (duplicatePairs.length > 0) {
  for (let i = 0; i < Math.min(10, duplicatePairs.length); i++) {
    const pair = duplicatePairs[i];
    console.log(`\nKEEP [${pair.keep}]: ${pair.q1}`);
    console.log(`REMOVE [${pair.remove}]: ${pair.q2}`);
    console.log(`Sim: ${pair.sim.toFixed(2)}, ChoiceSim: ${pair.choiceSim.toFixed(2)}`);
  }
}

// Write a script that we can run later to actually remove them
const removeScript = `
const fs = require('fs');
const cbt = JSON.parse(fs.readFileSync('${cbtPath.replace(/\\/g, '\\\\')}', 'utf8'));
const removeIds = new Set(${JSON.stringify(Array.from(duplicatesToRemove))});
const newQuestions = cbt.questions.filter(q => !removeIds.has(q.id));
cbt.questions = newQuestions;
fs.writeFileSync('${cbtPath.replace(/\\/g, '\\\\')}', JSON.stringify(cbt, null, 2), 'utf8');
console.log('Removed ' + removeIds.size + ' duplicates. Remaining: ' + newQuestions.length);
`;
fs.writeFileSync(path.join(__dirname, 'apply_remove.js'), removeScript, 'utf8');
console.log('\nWrote apply_remove.js to execute the removal.');
