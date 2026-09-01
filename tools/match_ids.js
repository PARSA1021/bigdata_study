const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

const idRegex = /id=['"]([^'"]+)['"]/g;
const allHtmlIds = [];
let m;
while ((m = idRegex.exec(html)) !== null) {
  allHtmlIds.push(m[1]);
}

console.log('Total IDs in index.html:', allHtmlIds.length);

const missingList = [
  'openCheatSheetTopBtn', 'menuBtn', 'closeSidebarBtn', 'sidebar', 'overlay',
  'homeDdayCount', 'homeDdayTarget', 'homeStreakNum', 'homeStreakWeekDots',
  'homeGoalRate', 'homeTodaySolved', 'homeGoalProgressFill', 'homeGoalSubText',
  'heatmapGrid', 'editDdayBtn', 'quickAgradePassBtn', 'quickOxTrainerBtn',
  'quickCalcPackBtn', 'quickCheatSheetBtn', 'searchInput', 'tabPractice',
  'tabMockExam', 'termStatQuizBtn', 'subjectFilter', 'difficultyFilter',
  'importanceFilter', 'tagFilter', 'keywordSearch', 'searchQuizBtn',
  'quickSprintModeBtn', 'resetFilterBtnInline', 'quizLoadMoreWrapper',
  'reviewWrongBtn', 'btnResetWeaknessFilter', 'omrModal', 'toggleMobileTocBtn',
  'notesTocContainer', 'tocToggleText', 'tocToggleIcon', 'knowwayToast',
  'tutorMasteryBanner', 'tutorInteractiveQuizContainer', 'tutorAudioBtn',
  'tutorChatInput', 'tutorChatMessages', 'speedDrillContent', 'speedTimerBar',
  'speedFeedbackBox', 'speedStreakVal', 'speedScoreVal', 'reviewQuizArena',
  'reviewFbBox', 'popQuizContainer'
];

console.log('\n--- Finding closest matches in index.html ---');
missingList.forEach(missing => {
  const norm = missing.toLowerCase().replace(/[-_]/g, '');
  const matches = allHtmlIds.filter(hId => {
    const hNorm = hId.toLowerCase().replace(/[-_]/g, '');
    return hNorm.includes(norm) || norm.includes(hNorm);
  });
  console.log(`${missing} ➔ matches: ${matches.join(', ') || 'NONE'}`);
});
