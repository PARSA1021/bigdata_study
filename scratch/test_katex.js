const fs = require('fs');

// Test how latex strings in must_know_data.js look in memory
global.window = {};
eval(fs.readFileSync('must_know_data.js', 'utf8'));

console.log('Sample formulas from must_know_data:');
window.mustKnowData.slice(15, 22).forEach(item => {
  console.log('--- ' + item.title + ' ---');
  item.corePoints.forEach(p => {
    if (p.includes('$')) {
      console.log('Point formula:', p);
    }
  });
});
