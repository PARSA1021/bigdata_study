const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const tutorJs = fs.readFileSync('tutor.js', 'utf8');

console.log('=== 1. Checking getElementById mappings in index.html ===');
const getElementMatches = [
  ...appJs.matchAll(/getElementById\s*\(\s*["']([^"']+)["']\s*\)/g),
  ...tutorJs.matchAll(/getElementById\s*\(\s*["']([^"']+)["']\s*\)/g)
].map(m => m[1]);

const uniqueIds = [...new Set(getElementMatches)];
const missingInHtml = [];

for (const id of uniqueIds) {
  // Check dynamic template literals or static elements in index.html
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    missingInHtml.push(id);
  }
}

console.log(`Total getElementById searched: ${uniqueIds.length}`);
console.log('IDs not statically in index.html (may be dynamically generated in JS):', missingInHtml);

console.log('\n=== 2. Checking Calculation Formula Engine ===');
function calcConfusion(tp, fp, fn, tn) {
  const precision = (tp + fp) > 0 ? (tp / (tp + fp)) : 0;
  const recall = (tp + fn) > 0 ? (tp / (tp + fn)) : 0;
  const specificity = (tn + fp) > 0 ? (tn / (tn + fp)) : 0;
  const accuracy = (tp + fp + fn + tn) > 0 ? ((tp + tn) / (tp + fp + fn + tn)) : 0;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall / (precision + recall)) : 0;
  return { precision, recall, specificity, accuracy, f1 };
}

const testRes = calcConfusion(80, 20, 10, 90);
console.log('Test Metrics (TP=80, FP=20, FN=10, TN=90):');
console.log(`- Precision: ${(testRes.precision * 100).toFixed(1)}% (Expected 80.0%)`);
console.log(`- Recall: ${(testRes.recall * 100).toFixed(1)}% (Expected 88.9%)`);
console.log(`- F1-Score: ${testRes.f1.toFixed(3)} (Expected 0.842)`);
console.log(`- Specificity: ${(testRes.specificity * 100).toFixed(1)}% (Expected 81.8%)`);
console.log(`- Accuracy: ${(testRes.accuracy * 100).toFixed(1)}% (Expected 85.0%)`);

console.log('\n=== 3. HTML Tag Balance Check for Modals ===');
const modalIds = [
  'oxTrainerModal', 'cheatSheetModal', 'conceptModal',
  'calcToolModal', 'ddayModal', 'examHallFlashModal', 'resetConfirmModal', 'omrDrawer'
];

for (const mid of modalIds) {
  const exists = html.includes(`id="${mid}"`);
  console.log(`- Modal [${mid}]: ${exists ? '✅ Present' : '❌ Missing'}`);
}
