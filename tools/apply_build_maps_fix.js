const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// Replace with regex handling \r?\n
const regex = /(q\._round = getQuestionRound\(q\);\r?\n)/;
if (regex.test(code)) {
  code = code.replace(regex, '$1      q._isGichul = isGichulQuestion(q);\n');
  // Normalize line endings to avoid mixed endings if needed
  fs.writeFileSync(appPath, code, 'utf8');
  console.log('Successfully inserted q._isGichul = isGichulQuestion(q); in buildMaps!');
} else {
  console.error('Regex match failed');
}
