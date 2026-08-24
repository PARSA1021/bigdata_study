const fs = require('fs');

console.log('=== VERIFYING MUST-KNOW ESSENTIAL DECK ===');

// 1. Data verification
global.window = {};
eval(fs.readFileSync('must_know_data.js', 'utf8'));
const data = window.mustKnowData;
console.log('1. must_know_data.js: Loaded', data.length, 'concepts.');
const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
data.forEach(item => {
  if (!item.id || !item.title || !item.subject || !item.summary || !item.category) {
    throw new Error('Invalid item: ' + JSON.stringify(item));
  }
  counts[item.subject]++;
});
console.log('   - 1과목:', counts[1], '개');
console.log('   - 2과목:', counts[2], '개');
console.log('   - 3과목:', counts[3], '개');
console.log('   - 4과목:', counts[4], '개');

// 2. HTML verification
const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  'data-nav="mustknow"',
  'id="must-know-view"',
  'id="mustKnowCardsContainer"',
  'id="mustKnowSubjectTabs"',
  'id="mustKnowSearchInput"',
  'id="btnToggleBlindMode"',
  'id="btnFilterUnmasteredMk"',
  'id="btnToggleAllMkCards"',
  'id="btnPrintMustKnow"',
  'id="mustKnowOverallPercent"',
  'id="mustKnowProgressBar"',
  'id="heroStartMustKnowBtn"',
  'src="must_know_data.js"'
];

console.log('2. index.html checks:');
checks.forEach(c => {
  const ok = html.includes(c);
  console.log(`   - ${c}:`, ok ? 'OK ✅' : 'MISSING ❌');
  if (!ok) throw new Error('Missing HTML snippet: ' + c);
});

// 3. CSS verification
const css = fs.readFileSync('style.css', 'utf8');
const cssChecks = [
  '.mustknow-header-card',
  '.mk-card',
  '.mk-card-header',
  '.mk-memory-box',
  '.mk-table',
  '.mk-trap-box',
  '.blind-mode-active .blind-target',
  '@media print'
];
console.log('3. style.css checks:');
cssChecks.forEach(c => {
  const ok = css.includes(c);
  console.log(`   - ${c}:`, ok ? 'OK ✅' : 'MISSING ❌');
  if (!ok) throw new Error('Missing CSS selector: ' + c);
});

// 4. App.js verification
const app = fs.readFileSync('app.js', 'utf8');
const appChecks = [
  'MUSTKNOW_MASTERED',
  'mustKnowFilter',
  'renderMustKnowDeck',
  'updateMustKnowProgress',
  'toggleMustKnowMastery',
  'setupMustKnowEvents',
  'targetNav === "mustknow"'
];
console.log('4. app.js checks:');
appChecks.forEach(c => {
  const ok = app.includes(c);
  console.log(`   - ${c}:`, ok ? 'OK ✅' : 'MISSING ❌');
  if (!ok) throw new Error('Missing app.js code: ' + c);
});

console.log('=== ALL MUST-KNOW TESTS PASSED PERFECTLY (100%) ===');
