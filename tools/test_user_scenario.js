const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// Setup mock browser environment
global.window = {
  location: { href: 'http://localhost:3000/' },
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; },
    clear() { this.store = {}; }
  }
};

const elements = {};
global.document = {
  getElementById(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        classList: {
          add: () => {},
          remove: () => {},
          toggle: () => {},
          contains: () => false
        },
        style: {},
        addEventListener: () => {},
        appendChild: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
        innerHTML: '',
        textContent: '',
        dataset: {},
        focus: () => {},
        click: () => {}
      };
    }
    return elements[id];
  },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  createElement(tag) {
    return {
      tagName: tag,
      classList: { add: () => {}, remove: () => {} },
      style: {},
      appendChild: () => {},
      innerHTML: '',
      textContent: '',
      dataset: {}
    };
  },
  addEventListener: () => {}
};

// Require data scripts
require(path.join(ROOT_DIR, 'data.js'));
require(path.join(ROOT_DIR, 'cbt_bank.js'));

// Read and evaluate app.js
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');

console.log('=== 🧪 사용자 오답 33문항 렌더링 시뮬레이션 테스트 ===\n');

// Pick 33 questions: 5 from Sub1, 14 from Sub2, 9 from Sub3, 5 from Sub4
const cbt = window.cbtBank;
const sub1Quizzes = cbt.questions.filter(q => q.subject === 1).slice(0, 5);
const sub2Quizzes = cbt.questions.filter(q => q.subject === 2).slice(0, 14);
const sub3Quizzes = cbt.questions.filter(q => q.subject === 3).slice(0, 9);
const sub4Quizzes = cbt.questions.filter(q => q.subject === 4).slice(0, 5);

const targetWrongQuizzes = [...sub1Quizzes, ...sub2Quizzes, ...sub3Quizzes, ...sub4Quizzes];
console.log(`총 타겟 오답 문항 수: ${targetWrongQuizzes.length}개 (1과목 ${sub1Quizzes.length}, 2과목 ${sub2Quizzes.length}, 3과목 ${sub3Quizzes.length}, 4과목 ${sub4Quizzes.length})`);

// Setup localStorage with these 33 wrong questions
const cumulativeStats = {
  quizzes: {},
  totalSolved: 33,
  totalCorrect: 0,
  totalWrong: 33,
  dailyLog: {}
};

targetWrongQuizzes.forEach(q => {
  cumulativeStats.quizzes[q.id] = {
    wrongCount: 1,
    correctCount: 0,
    hasWrong: true,
    mastered: false,
    correctStreak: 0,
    lastTried: Date.now()
  };
});

// Pick 7 bookmarks
const bookmarks = targetWrongQuizzes.slice(0, 7).map(q => q.id);

window.localStorage.setItem('bigdata_quiz_stats_v2', JSON.stringify(cumulativeStats));
window.localStorage.setItem('bigdata_bookmarks_v2', JSON.stringify(bookmarks));

// Evaluate app.js
eval(appJs);

// Now trigger navigation to 'wrong'
const wrongNavBtn = { dataset: { nav: 'wrong' } };
// Find wrong nav event or call renderWrongNotesView directly
// Let's test by clicking all 9 filters!
const filtersToTest = [
  { filter: 'all', expectedCount: 33 },
  { filter: 'gichul', expectedCount: targetWrongQuizzes.filter(q => q.isGichul !== false).length },
  { filter: 'bookmarks', expectedCount: 7 },
  { filter: 'sub1', expectedCount: 5 },
  { filter: 'sub2', expectedCount: 14 },
  { filter: 'sub3', expectedCount: 9 },
  { filter: 'sub4', expectedCount: 5 }
];

console.log('\n--- 각 필터별 렌더링 검증 ---');
const wrongContainer = document.getElementById('wrongListContainer');

// Re-render wrong view with 'all'
// In app.js, switchNav('wrong') is available
const mainNav = document.getElementById('navWrong');
// Call render function directly or through switchNav
// app.js has window.renderWrongNotesView or internal
// Let's check:
console.log('Testing filter switching...');
