const fs = require('fs');

const appContent = fs.readFileSync('app.js', 'utf8');

// Find all standalone function calls: (not preceded by .)
const fnCalls = [...appContent.matchAll(/(?:^|[^.a-zA-Z0-9_$])([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g)].map(m => m[1]);

const fnDefs = new Set();
for (const m of appContent.matchAll(/function\s+([a-zA-Z0-9_$]+)/g)) {
  fnDefs.add(m[1]);
}
for (const m of appContent.matchAll(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g)) {
  fnDefs.add(m[1]);
}

const builtins = new Set([
  'if', 'for', 'while', 'switch', 'catch', 'require', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  'encodeURIComponent', 'decodeURIComponent', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
  'fetch', 'alert', 'confirm', 'prompt', 'requestAnimationFrame', 'cancelAnimationFrame',
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'Math', 'JSON', 'RegExp', 'Map', 'Set', 'WeakMap', 'WeakSet',
  'Promise', 'Error', 'TypeError', 'RangeError', 'ReferenceError', 'console', 'document', 'window', 'localStorage',
  'sessionStorage', 'navigator', 'location', 'history', 'customElements', 'Event', 'CustomEvent', 'Blob', 'FileReader',
  'IntersectionObserver', 'SpeechSynthesisUtterance', 'AudioContext', 'webkitAudioContext', 'confetti',
  'renderMathInElement', 'escapeHTML', 'formatQuestionText', 'highlightTrapKeywords', 'debounce', 'throttle'
]);

const missing = [];
for (const fn of fnCalls) {
  if (!fnDefs.has(fn) && !builtins.has(fn) && !fn.startsWith('_')) {
    missing.push(fn);
  }
}

console.log('Missing standalone functions:', [...new Set(missing)]);
