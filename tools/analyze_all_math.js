const fs = require('fs');
const cbt = JSON.parse(fs.readFileSync('cbt_bank.json', 'utf8'));

const mathItems = [];
cbt.questions.forEach(q => {
  const allText = (q.question || '') + ' ' + (q.explanation || '') + ' ' + (q.choices || []).join(' ');
  const matches = allText.match(/\$[^$]+\$/g);
  if (matches) {
    matches.forEach(m => mathItems.push({ id: q.id, math: m }));
  }
});

console.log('Total math occurrences in CBT bank:', mathItems.length);
const freq = {};
mathItems.forEach(item => {
  freq[item.math] = (freq[item.math] || 0) + 1;
});

const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
console.log('Top 30 math expressions:');
sorted.slice(0, 30).forEach(([m, count]) => {
  console.log(`  ${m} : ${count} times`);
});
