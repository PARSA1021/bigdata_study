const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

const targetLoopStart = '    let html = "";\n    displayList.forEach((quiz, idx) => {';
const replacementLoopStart = `    let html = "";
    displayList.forEach((quiz, idx) => {
      try {`;

const targetLoopEnd = '    wrongListContainer.innerHTML = html;\n    renderMathFormulas(wrongListContainer);';
const replacementLoopEnd = `      } catch (err) {
        console.error("Failed to render wrong card for quiz:", quiz?.id, err);
      }
    });

    wrongListContainer.innerHTML = html;
    renderMathFormulas(wrongListContainer);`;

if (code.includes('    wrongListContainer.innerHTML = html;')) {
  // Let's replace safely
  const oldSectionRegex = /let html = "";\s*displayList\.forEach\(\(quiz, idx\) => \{([\s\S]*?)\}\);\s*wrongListContainer\.innerHTML = html;\s*renderMathFormulas\(wrongListContainer\);/;
  
  if (oldSectionRegex.test(code)) {
    code = code.replace(oldSectionRegex, (match, body) => {
      return `let html = "";
    displayList.forEach((quiz, idx) => {
      try {
${body}
      } catch (err) {
        console.error("Failed to render wrong card for quiz:", quiz?.id, err);
      }
    });

    wrongListContainer.innerHTML = html;
    renderMathFormulas(wrongListContainer);`;
    });
    fs.writeFileSync(appPath, code, 'utf8');
    console.log('Successfully wrapped wrong note card render loop in try/catch!');
  } else {
    console.error('Regex match failed');
  }
}
