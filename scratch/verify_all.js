const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const mustKnow = fs.readFileSync('must_know_data.js', 'utf8');

const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const ids = new Set();
while ((m = regex.exec(app)) !== null) {
  ids.add(m[1]);
}

const missing = [...ids].filter(id => {
  // Ignore dynamic IDs created by JS or optional modals
  if (id.startsWith('card-') || id === 'knowwayToast' || id === 'resetMustKnowFilterBtn') return false;
  return !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`);
});

console.log('Total unique IDs referenced:', ids.size);
console.log('Missing static IDs in index.html:', missing);
