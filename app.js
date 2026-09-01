/**
 * KNOWWAY (노웨이) Style BigData Master App (v5.5 Clean & High-Performance Turbo Edition)
 * 1. 합격 루틴 엔진 (D-Day, 연속 스트릭 🔥, 30일 잔디 히트맵, 일일 목표 달성)
 * 2. 최신 역순 기출 로드맵 & 회차별 정복 트래커 (11회 -> 10회 -> 4회 -> 랜덤)
 * 3. 선지 변형 대비: 선지별 오답 Trap 분석 & 선지 OX 벼락치기 훈련 모드
 * 4. 2·3과목 빈출 계산 공식 패턴화 & 3단계 풀이 템플릿
 * 5. 60점 합격선 타겟: A급 필수 빈출 300제 스피드 패스 & 중요도 등급
 * 6. 시험장 30분 전 단권화 파이널 치트시트 & 원클릭 인쇄/PDF
 * 7. 실전 CBT 모의고사 & 실시간 OMR 마킹 & 과락/합격 판정
 * 8. 스마트 오답 탈출 (Retry & Master) 시스템
 * ⚡ Performance Engine: Event Delegation, Virtualized Batch Rendering, In-Place DOM Updates, Debounced Persistence
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CONSTANTS & STORAGE KEYS (Frozen Config)
  // ==========================================
  const STORAGE_KEYS = Object.freeze({
    STATS: "knowway_stats_v2",
    HABIT: "knowway_habit_v2",
    BOOKMARK: "knowway_bookmarks_v2",
    MEMO: "knowway_concept_memos_v2",
    QUIZ_MEMO: "knowway_quiz_memos_v2",
    LEARNED: "knowway_learned_concepts_v2",
    MOCK_RECORDS: "knowway_mock_records_v2",
    WEAKNESS: "knowway_weakness_counts_v1"
  });

  const MOCK_EXAM_CONFIG = Object.freeze({
    TOTAL_QUESTIONS: 80,
    TIME_LIMIT_MINUTES: 120,
    PASSING_AVERAGE: 60,
    FAIL_SUBJECT_SCORE: 40
  });

  const STATS_KEY = STORAGE_KEYS.STATS;
  const HABIT_KEY = STORAGE_KEYS.HABIT;
  const BOOKMARK_KEY = STORAGE_KEYS.BOOKMARK;
  const MEMO_KEY = STORAGE_KEYS.MEMO;
  const QUIZ_MEMO_KEY = STORAGE_KEYS.QUIZ_MEMO;
  const LEARNED_KEY = STORAGE_KEYS.LEARNED;
  const MOCK_RECORDS_KEY = STORAGE_KEYS.MOCK_RECORDS;
  const WEAKNESS_KEY = STORAGE_KEYS.WEAKNESS;

  const SUBJECT_NAMES = Object.freeze({
    1: "1과목 · 분석 기획",
    2: "2과목 · 데이터 탐색",
    3: "3과목 · 데이터 모델링",
    4: "4과목 · 결과 해석"
  });

  const TARGET_13TH_KEYWORDS = [
    "가설검정", "회귀분석", "데이터 전처리", "이상치", "차원축소", "과적합", "정규화",
    "스케일링", "결측치", "결정계수", "다중공선성", "상관관계", "군집분석", "k-means",
    "knn", "svm", "랜덤포레스트", "부스팅", "xgboost", "앙상블", "하이퍼파라미터",
    "교차검증", "f1", "roc", "auc", "혼동행렬", "빅데이터 거버넌스", "비식별", "개인정보"
  ];

  const TERM_STAT_KEYWORDS = [
    "정밀도", "재현율", "f1-score", "roc", "auc", "p-value", "유의수준", "1종 오류",
    "2종 오류", "중심극한정리", "귀무가설", "대립가설", "t-검정", "f-검정", "카이제곱",
    "분산분석", "anova", "왜도", "첨도", "변동계수", "사분위수", "상관계수", "피어슨",
    "스피어만", "주성분분석", "pca", "요인분석", "마이닝", "crisp-dm", "kdd"
  ];

  const CALC_KEYWORDS = [
    "계산", "정밀도", "재현율", "f1", "특이도", "민감도", "오차행렬", "혼동행렬",
    "tpr", "fpr", "rmse", "mse", "mae", "결정계수", "r2", "r-squared", "지니",
    "엔트로피", "iqr", "사분위", "왜도", "첨도", "p-value", "신뢰구간", "기울기",
    "절편", "상관계수", "주성분", "기여율", "분산비율"
  ];

  const BATCH_SIZE = 30;

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  let noteData = null;
  let allQuizzes = [];
  let workingQuizzes = [];
  let currentRenderedCount = 0;
  let quizBatchObserver = null;

  let currentNav = "home"; // 'home' | 'notes' | 'practice' | 'mock' | 'wrong'
  let currentMode = "practice"; // 'practice' | 'mock'

  let cardMap = new Map();
  let cardToQuizMap = new Map();
  let sectionToQuizMap = new Map();
  let notesSearchIndex = [];

  let bookmarks = new Set(loadJSON(BOOKMARK_KEY, []));
  let learnedConcepts = new Set(loadJSON(LEARNED_KEY, []));
  let quizMemos = loadJSON(QUIZ_MEMO_KEY, {});
  let cumulativeStats = loadStats();
  let habitData = loadHabitData();
  let mockRecords = loadJSON(MOCK_RECORDS_KEY, {});
  let weaknessCounts = loadJSON(WEAKNESS_KEY, {});

  let notesFilter = {
    subject: "all",
    unlearnedOnly: false,
    bookmarkedOnly: false,
    weaknessOnly: false,
    searchKeyword: ""
  };
  let quizFilter = {
    subject: "all",
    round: "all",
    type: "all",
    difficulty: "all",
    importance: "all",
    tag: "all",
    keyword: "",
    conceptCardId: null,
    calcOnly: false,
    bookmarkedOnly: false,
    is12thOnly: false,
    is11thOnly: false,
    is10thOnly: false
  };
  let practiceSolvedMap = new Map();
  let eliminatedOptionsMap = new Map(); // quizId -> Set of eliminated choice indices
  let currentFontScale = localStorage.getItem("knowway_font_scale") || "md";
  let isAutoAdvanceEnabled = localStorage.getItem("knowway_auto_advance") === "true";
  let flashSearchKeyword = "";
  let flashCurrentCategory = "traps";

  // CBT Mock Exam State
  let currentPreset = "11th";
  let mockQuizzes = [];
  let mockSolvedMap = new Map();
  let mockFlaggedSet = new Set();
  let timerInterval = null;
  let timerSeconds = 120 * 60;
  let isMockSubmitted = false;

  // OX Trainer State
  let oxItems = [];
  let oxCurrentIdx = 0;
  let oxStreak = 0;

  // Debounced save timer
  let saveTimer = null;

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================
  const mainNavButtons = document.querySelectorAll(".main-nav-btn, .sidebar-nav-item, .bottom-nav-item");
  const brandLogoBtn = document.getElementById("brandLogoBtn");
  const topbarDdayPill = document.getElementById("topbarDdayPill");
  const topbarDdayText = document.getElementById("topbarDdayText");
  const topbarStreakCount = document.getElementById("topbarStreakCount");
  const openCheatSheetTopBtn = document.getElementById("openCheatSheetTopBtn");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toTopBtn = document.getElementById("toTop");

  // Views
  const homeView = document.getElementById("home-view");
  const tutorView = document.getElementById("tutor-view");
  const notesView = document.getElementById("notes-view");
  const quizContentView = document.getElementById("quiz-content");
  const wrongView = document.getElementById("wrong-view");
  const statsView = document.getElementById("stats-view");

  // Stats View & Settings elements
  const statsSubjectGrid = document.getElementById("statsSubjectGrid");
  const statTotSolved = document.getElementById("statTotSolved");
  const statTotAcc = document.getElementById("statTotAcc");
  const statTotMaster = document.getElementById("statTotMaster");
  const btnExportData = document.getElementById("btnExportData");
  const fileImportData = document.getElementById("fileImportData");
  const btnResetData = document.getElementById("btnResetData");

  // Home view elements
  const homeDdayCount = document.getElementById("homeDdayCount");
  const homeDdayTarget = document.getElementById("homeDdayTarget");
  const homeStreakNum = document.getElementById("homeStreakNum");
  const homeStreakWeekDots = document.getElementById("homeStreakWeekDots");
  const homeGoalRate = document.getElementById("homeGoalRate");
  const homeTodaySolved = document.getElementById("homeTodaySolved");
  const homeGoalProgressFill = document.getElementById("homeGoalProgressFill");
  const homeGoalSubText = document.getElementById("homeGoalSubText");
  const homeTotalSolved = document.getElementById("homeTotalSolved");
  const homeAccuracy = document.getElementById("homeAccuracy");
  const homeWrongCount = document.getElementById("homeWrongCount");
  const heatmapGrid = document.getElementById("heatmapGrid");
  const homeSubjectBars = document.getElementById("homeSubjectBars");
  const resumeBanner = document.getElementById("resumeBanner");
  const resumeTitle = document.getElementById("resumeTitle");
  const resumeDetail = document.getElementById("resumeDetail");
  const resumeActionBtn = document.getElementById("resumeActionBtn");
  const editDdayBtn = document.getElementById("editDdayBtn");
  const examTimelineGrid = document.getElementById("examTimelineGrid");
  const roadmapMasteryRate = document.getElementById("roadmapMasteryRate");

  // Quick Action Buttons in Home
  const quickAgradePassBtn = document.getElementById("quickAgradePassBtn");
  const quickOxTrainerBtn = document.getElementById("quickOxTrainerBtn");
  const quickCalcPackBtn = document.getElementById("quickCalcPackBtn");
  const quickCheatSheetBtn = document.getElementById("quickCheatSheetBtn");

  // Notes View Elements
  const navContainer = document.getElementById("nav-container");
  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchStatusEl = document.getElementById("searchStatus");
  const progressBar = document.getElementById("progressBar");
  const progressPercent = document.getElementById("progressPercent");

  // Practice & Mock Elements
  const tabPractice = document.getElementById("tabPractice");
  const tabMockExam = document.getElementById("tabMockExam");
  const practiceHeader = document.getElementById("practice-header");
  const mockHeader = document.getElementById("mock-header");
  const quizToolbar = document.getElementById("quiz-toolbar");
  const quizScore = document.getElementById("quiz-score");
  const quizContainer = document.getElementById("quiz-container");

  const btnAgradePass = document.getElementById("btnAgradePass");
  const btnCalcPack = document.getElementById("btnCalcPack");
  const target13thQuizBtn = document.getElementById("target13thQuizBtn");
  const termStatQuizBtn = document.getElementById("termStatQuizBtn");

  const subjectFilter = document.getElementById("subjectFilter");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const importanceFilter = document.getElementById("importanceFilter");
  const tagFilter = document.getElementById("tagFilter");
  const keywordSearch = document.getElementById("keywordSearch");
  const searchQuizBtn = document.getElementById("searchQuizBtn");

  // Mock exam elements
  const examTimer = document.getElementById("examTimer");
  const openOmrBtn = document.getElementById("openOmrBtn");
  const submitExamBtn = document.getElementById("submitExamBtn");
  const omrSolvedCount = document.getElementById("omrSolvedCount");
  const mockPreset11th = document.getElementById("mockPreset11th");
  const mockPreset10th = document.getElementById("mockPreset10th");
  const mockPreset4th = document.getElementById("mockPreset4th");
  const mockPresetRandom = document.getElementById("mockPresetRandom");

  // OMR Drawer Elements
  const omrDrawer = document.getElementById("omrDrawer");
  const omrOverlay = document.getElementById("omrOverlay");
  const closeOmrBtn = document.getElementById("closeOmrBtn");
  const omrGrid = document.getElementById("omrGrid");
  const omrProgress = document.getElementById("omrProgress");
  const omrFlagCount = document.getElementById("omrFlagCount");
  const omrSubmitBtn = document.getElementById("omrSubmitBtn");

  // Wrong notes elements
  const wrongTotalCount = document.getElementById("wrongTotalCount");
  const wrongMasteredCount = document.getElementById("wrongMasteredCount");
  const wrongBookmarkCount = document.getElementById("wrongBookmarkCount");
  const wfAllCount = document.getElementById("wfAllCount");
  const wfHighCount = document.getElementById("wfHighCount");
  const wfBookCount = document.getElementById("wfBookCount");
  const wrongListContainer = document.getElementById("wrongListContainer");
  const retryAllWrongBtn = document.getElementById("retryAllWrongBtn");

  // Modals
  const sprintTimerOverlay = document.getElementById("sprintTimerOverlay");
  const quickSprintModeBtn = document.getElementById("quickSprintModeBtn");
  let sprintInterval = null;
  let sprintSeconds = 300;
  let isSprintMode = false;
  let currentWrongFilter = "all";

  const oxTrainerModal = document.getElementById("oxTrainerModal");
  const closeOxModalBtn = document.getElementById("closeOxModalBtn");
  const oxQuestionCard = document.getElementById("oxQuestionCard");
  const oxProgressText = document.getElementById("oxProgressText");
  const oxStreakText = document.getElementById("oxStreakText");
  const oxSubjectTag = document.getElementById("oxSubjectTag");
  const oxStatementText = document.getElementById("oxStatementText");
  const oxBtnTrue = document.getElementById("oxBtnTrue");
  const oxBtnFalse = document.getElementById("oxBtnFalse");
  const oxFeedbackBox = document.getElementById("oxFeedbackBox");
  const oxFeedbackTitle = document.getElementById("oxFeedbackTitle");
  const oxFeedbackDesc = document.getElementById("oxFeedbackDesc");
  const oxNextBtn = document.getElementById("oxNextBtn");

  const cheatSheetModal = document.getElementById("cheatSheetModal");
  const closeCheatSheetBtn = document.getElementById("closeCheatSheetBtn");
  const closeCheatSheetModalBtn = document.getElementById("closeCheatSheetModalBtn");
  const printCheatSheetBtn = document.getElementById("printCheatSheetBtn");
  const cheatSheetContent = document.getElementById("cheatSheetContent");

  // Badge Helper Functions
  function getDifficultyBadgeHTML(difficulty) {
    const BADGES = {
      easy: '<span class="quiz-tag-badge" style="background:rgba(52,199,89,0.12); color:var(--success);">쉬움</span>',
      medium: '<span class="quiz-tag-badge" style="background:rgba(255,149,0,0.12); color:var(--warn);">보통</span>',
      hard: '<span class="quiz-tag-badge" style="background:rgba(255,59,48,0.12); color:var(--danger);">어려움</span>'
    };
    return BADGES[difficulty] || "";
  }

  function getImportanceBadgeHTML(grade) {
    const BADGES = {
      A: '<span class="badge-tag badge-grade-a">⭐ A급 필수</span>',
      B: '<span class="badge-tag badge-grade-b">🎯 B급 변형</span>',
      C: '<span class="badge-tag badge-grade-c">💡 C급 심화</span>'
    };
    return BADGES[grade] || "";
  }

  const conceptModal = document.getElementById("conceptModal");
  const closeConceptBtn = document.getElementById("closeConceptBtn");
  const closeConceptModalBtn = document.getElementById("closeConceptModalBtn");
  const conceptModalTitle = document.getElementById("conceptModalTitle");
  const conceptModalBodyNote = document.getElementById("conceptModalBodyNote");
  const conceptModalBodyQuiz = document.getElementById("conceptModalBodyQuiz");
  const tabConceptNote = document.getElementById("tabConceptNote");
  const tabConceptQuiz = document.getElementById("tabConceptQuiz");
  const conceptRelatedCount = document.getElementById("conceptRelatedCount");
  const practiceConceptBtn = document.getElementById("practiceConceptBtn");
  const jumpToFullNoteBtn = document.getElementById("jumpToFullNoteBtn");

  const ddayModal = document.getElementById("ddayModal");
  const closeDdayBtn = document.getElementById("closeDdayBtn");
  const ddayTitleInput = document.getElementById("ddayTitleInput");
  const ddayDateInput = document.getElementById("ddayDateInput");
  const dailyGoalInput = document.getElementById("dailyGoalInput");
  const saveDdayBtn = document.getElementById("saveDdayBtn");


  // ==========================================
  // 4. STORAGE HELPERS & DEBOUNCED PERSISTENCE
  // ==========================================
  function loadJSON(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function saveJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { }
  }

  function updateGlobalReactivity() {
    updateHabitUI();
    if (currentNav === "home") {
      updateHabitUI();
    } else if (currentNav === "stats") {
      renderStatsDashboard();
    }
  }

  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveJSON(STATS_KEY, cumulativeStats);
      saveJSON(HABIT_KEY, habitData);
      updateGlobalReactivity();
    }, 400);
  }

  window.addEventListener("beforeunload", () => {
    saveJSON(STATS_KEY, cumulativeStats);
    saveJSON(HABIT_KEY, habitData);
  });

  function loadStats() {
    return loadJSON(STATS_KEY, {
      totalSolved: 0,
      totalCorrect: 0,
      subjects: {
        1: { solved: 0, correct: 0 },
        2: { solved: 0, correct: 0 },
        3: { solved: 0, correct: 0 },
        4: { solved: 0, correct: 0 }
      },
      concepts: {},
      quizzes: {}
    });
  }

  function loadHabitData() {
    const todayStr = getTodayString();
    const defaultData = {
      ddayTitle: "제13회 빅데이터분석기사 필기",
      ddayDate: "2026-09-05",
      dailyGoal: 30,
      streak: 1,
      lastActiveDate: todayStr,
      activity: { [todayStr]: 0 },
      lastSession: null
    };
    const saved = loadJSON(HABIT_KEY, defaultData);
    if (!saved.activity) saved.activity = {};
    if (typeof saved.activity[todayStr] !== "number") {
      saved.activity[todayStr] = 0;
    }
    return saved;
  }

  function getTodayString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function debounce(fn, delay = 150) {
    let t = null;
    return function (...args) {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, limit = 100) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }


  // ==========================================
  // 5. IMPORTANCE & CALCULATION CLASSIFIER
  // ==========================================
  function getImportanceGrade(quiz) {
    const qText = (quiz.question || "").toLowerCase();

    // A급: 빈출 기출, 기본 필수, 혼동행렬, DIKW, 가설검정, 3V, 데이터 거버넌스, 평가 지표
    if (qText.includes("[빈출 기출]") || qText.includes("[기본 필수]") ||
      qText.includes("dikw") || qText.includes("혼동행렬") || qText.includes("3v") ||
      qText.includes("정밀도") || qText.includes("재현율") || qText.includes("가설검정") ||
      qText.includes("과적합") || qText.includes("거버넌스")) {
      return "A";
    }

    // C급: 실무 심화, 최신 심화
    if (qText.includes("[실무 심화]") || qText.includes("[최신 심화]") || quiz.difficulty === "hard") {
      return "C";
    }

    // B급: 그 외 핵심 변형 및 응용
    return "B";
  }

  function isCalcQuestion(quiz) {
    const text = (quiz.question + " " + (quiz.explanation || "") + " " + (quiz.choices || []).join(" ")).toLowerCase();
    return CALC_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
  }

  function getCalcSolutionTemplate(quiz) {
    const text = (quiz.question + " " + (quiz.explanation || "")).toLowerCase();

    if (text.includes("정밀도") || text.includes("precision")) {
      return {
        formula: "정밀도(Precision) = TP / (TP + FP)  [예측을 True로 한 것 중 실제 True의 비율]",
        substitute: "문제의 혼동행렬 표에서 '예측 Positive(True)' 열(또는 행)의 합을 분모로, 실제 TP를 분자로 대입합니다.",
        tip: "💡 암기 팁: '정밀'하게 'P'redict(예측)한 것 기준! (분모가 TP + FP)"
      };
    } else if (text.includes("재현율") || text.includes("recall") || text.includes("민감도")) {
      return {
        formula: "재현율(Recall / Sensitivity) = TP / (TP + FN)  [실제 True인 것 중 정답 맞춘 비율]",
        substitute: "문제의 혼동행렬 표에서 '실제 Actual True'의 합을 분모로, 맞춘 TP를 분자로 대입합니다.",
        tip: "💡 암기 팁: '재'대로 'A'ctual(실제) 정답 기준! (분모가 TP + FN)"
      };
    } else if (text.includes("f1") || text.includes("f-measure")) {
      return {
        formula: "F1-Score = 2 × (Precision × Recall) / (Precision + Recall)  [조화평균]",
        substitute: "구해진 정밀도(P)와 재현율(R)의 곱에 2를 곱한 값을 (P + R)로 나눕니다.",
        tip: "💡 암기 팁: 산술평균이 아닌 '조화평균'! (2PR / P+R)"
      };
    } else if (text.includes("특이도") || text.includes("specificity")) {
      return {
        formula: "특이도(Specificity) = TN / (TN + FP)  [실제 False 중 맞춘 비율]",
        substitute: "실제 Negative(False)인 총합 중 모델이 올바르게 Negative로 예측한 TN의 비율입니다.",
        tip: "💡 암기 팁: FPR(위양성률) = 1 - 특이도"
      };
    } else if (text.includes("iqr") || text.includes("사분위") || text.includes("이상치")) {
      return {
        formula: "IQR = Q3 - Q1, 이상치 범위: [Q1 - 1.5×IQR,  Q3 + 1.5×IQR]",
        substitute: "제3사분위수(Q3)에서 제1사분위수(Q1)를 빼서 IQR을 구한 후 1.5를 곱해 경계값을 계산합니다.",
        tip: "💡 암기 팁: 박스플롯(Box Plot)의 울타리(Whisker) 경계 계산 공식입니다."
      };
    } else if (text.includes("결정계수") || text.includes("r2") || text.includes("r-squared")) {
      return {
        formula: "결정계수(R²) = SSR / SST = 1 - (SSE / SST)  [0 ≤ R² ≤ 1]",
        substitute: "총제곱합(SST) = 회귀제곱합(SSR) + 잔차제곱합(SSE) 관계를 이용하여 계산합니다.",
        tip: "💡 암기 팁: 1에 가까울수록 회귀모형의 설명력이 뛰어납니다."
      };
    }

    return {
      formula: "문제에 주어진 핵심 통계 / 머신러닝 연산 공식",
      substitute: "기출 지문의 조건과 수치를 대입하여 계산합니다.",
      tip: "💡 시험 팁: 복잡한 계산 문제는 보기 선지의 대략적인 크기(Order)만 파악해도 빠르게 정답을 찾을 수 있습니다."
    };
  }


  // ==========================================
  // 6. HABIT & ROUTINE ENGINE
  // ==========================================
  function recordQuizAttempt(quiz, isCorrect, chosenIdx) {
    const todayStr = getTodayString();

    cumulativeStats.totalSolved++;
    if (isCorrect) cumulativeStats.totalCorrect++;

    const sub = quiz.subject || 1;
    if (!cumulativeStats.subjects[sub]) {
      cumulativeStats.subjects[sub] = { solved: 0, correct: 0 };
    }
    cumulativeStats.subjects[sub].solved++;
    if (isCorrect) cumulativeStats.subjects[sub].correct++;

    if (quiz.cardId) {
      if (!cumulativeStats.concepts[quiz.cardId]) {
        cumulativeStats.concepts[quiz.cardId] = { solved: 0, correct: 0 };
      }
      cumulativeStats.concepts[quiz.cardId].solved++;
      if (isCorrect) cumulativeStats.concepts[quiz.cardId].correct++;
    }

    if (!cumulativeStats.quizzes[quiz.id]) {
      cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 0, correctStreak: 0, mastered: false, lastChosen: chosenIdx };
    }
    const qStat = cumulativeStats.quizzes[quiz.id];
    qStat.solved++;
    qStat.lastChosen = chosenIdx;
    if (isCorrect) {
      qStat.correct++;
      if (qStat.wrongCount > 0 && !qStat.mastered) {
        qStat.correctStreak = (qStat.correctStreak || 0) + 1;
        if (qStat.correctStreak >= 2) {
          qStat.mastered = true;
          showToast(`🎉 [오답 졸업!] 2회 연속 정답으로 문제가 완전히 마스터되었습니다!`);
        } else {
          showToast(`👍 [1회 정답!] 1번 더 맞히면 오답노트에서 완전히 '졸업'됩니다! (1/2)`);
        }
      }
    } else {
      qStat.wrongCount = (qStat.wrongCount || 0) + 1;
      qStat.correctStreak = 0;
      qStat.mastered = false;
      showToast("⚠️ 오답노트에 자동 기록되었습니다!");
    }

    if (!habitData.activity[todayStr]) habitData.activity[todayStr] = 0;
    habitData.activity[todayStr]++;

    if (habitData.lastActiveDate !== todayStr) {
      const last = new Date(habitData.lastActiveDate);
      const today = new Date(todayStr);
      const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) habitData.streak = (habitData.streak || 0) + 1;
      else if (diffDays > 1) habitData.streak = 1;
      habitData.lastActiveDate = todayStr;
    }

    habitData.lastSession = {
      mode: currentMode,
      quizId: quiz.id,
      title: currentMode === "mock" ? `${currentPreset} 기출 실전 모의고사` : `${SUBJECT_NAMES[quiz.subject] || "기출문제"} 풀이 중`,
      detail: `최근 푼 문제: ${quiz.question.substring(0, 32)}...`,
      timestamp: Date.now()
    };

    scheduleSave();

    // Fast topbar updates (0ms)
    const targetDate = new Date(habitData.ddayDate || "2026-09-05");
    const today = new Date(todayStr);
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    const ddayStr = diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-Day" : `D+${Math.abs(diffDays)}`;
    if (topbarDdayText) topbarDdayText.textContent = ddayStr;
    if (topbarStreakCount) topbarStreakCount.textContent = `${habitData.streak || 1}일`;

    if (currentNav === "home") {
      updateHabitUI();
    }
  }

  function updateHabitUI() {
    if (homeTotalSolved) homeTotalSolved.textContent = cumulativeStats.totalSolved;
    const acc = cumulativeStats.totalSolved > 0 ? Math.round((cumulativeStats.totalCorrect / cumulativeStats.totalSolved) * 100) : 0;
    if (homeAccuracy) homeAccuracy.textContent = `${acc}%`;

    let wrongCount = 0;
    Object.values(cumulativeStats.quizzes || {}).forEach(q => {
      if (q.wrongCount > 0 && !q.mastered) wrongCount++;
    });
    if (homeWrongCount) homeWrongCount.textContent = wrongCount;

    renderHomePassRadar();

    if (resumeBanner) {
      if (habitData.lastSession) {
        resumeBanner.classList.remove("hidden");
        if (resumeTitle) resumeTitle.textContent = habitData.lastSession.title;
        if (resumeDetail) resumeDetail.textContent = habitData.lastSession.detail;
      } else {
        resumeBanner.classList.add("hidden");
      }
    }
  }

  function renderHomePassRadar() {
    const homeSubjectBars = document.getElementById("homeSubjectBars");
    const passVerdictBadge = document.getElementById("passVerdictBadge");
    const verdictText = document.getElementById("verdictText");
    const radarAverageScore = document.getElementById("radarAverageScore");
    const radarAdviceText = document.getElementById("radarAdviceText");

    let totalSolved = 0;
    let sumRate = 0;
    let hasDanger = false;
    let dangerSubjects = [];

    let html = "";
    for (let s = 1; s <= 4; s++) {
      const stat = cumulativeStats.subjects[s] || { solved: 0, correct: 0 };
      const rate = stat.solved > 0 ? Math.round((stat.correct / stat.solved) * 100) : 0;
      totalSolved += stat.solved;
      sumRate += rate;
      const isDanger = stat.solved >= 5 && rate < 40;
      if (isDanger) {
        hasDanger = true;
        dangerSubjects.push(SUBJECT_NAMES[s]);
      }

      html += `
        <div class="subject-radar-card ${isDanger ? 'danger' : ''}">
          <div class="s-radar-header">
            <span style="font-weight: 850;">${SUBJECT_NAMES[s]}</span>
            <span class="s-radar-tag ${isDanger ? 'danger' : (rate >= 60 ? 'safe' : '')}">
              ${isDanger ? '🚨 과락위험' : (rate >= 60 ? '🟢 합격권' : '🟡 보완필요')} (${rate}점)
            </span>
          </div>
          <div class="s-radar-track" style="position: relative;">
            <div class="s-radar-fill ${isDanger ? 'danger' : (rate >= 60 ? 'safe' : '')}" style="width: ${rate}%;"></div>
            <div class="s-radar-guide fail-line" style="left: 40%;" title="과락 기준선 (40점)"></div>
            <div class="s-radar-guide pass-line" style="left: 60%;" title="합격 기준선 (60점)"></div>
          </div>
          <div class="s-radar-benchmarks">
            <span>0</span>
            <span class="benchmark-pin fail" style="left: 40%;">40점 과락선</span>
            <span class="benchmark-pin pass" style="left: 60%;">60점 합격선</span>
            <span>100</span>
          </div>
          <div class="s-radar-footer" style="margin-top: 10px;">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 750;">풀이: ${stat.solved}문항 (정답 ${stat.correct})</span>
            <button class="s-radar-drill-btn" data-subject="${s}">🎯 이 과목 집중 훈련 ➔</button>
          </div>
        </div>
      `;
    }

    if (homeSubjectBars) homeSubjectBars.innerHTML = html;

    const avg = totalSolved > 0 ? (sumRate / 4).toFixed(1) : "0.0";
    if (radarAverageScore) radarAverageScore.textContent = avg;

    if (passVerdictBadge && verdictText) {
      passVerdictBadge.className = "pass-verdict-badge";
      if (totalSolved < 5) {
        passVerdictBadge.classList.add("pending");
        verdictText.textContent = "진단 중 (5문제 이상 풀이 시 판정)";
        if (radarAdviceText) radarAdviceText.textContent = "기출문제를 풀면 4개 과목별 과락 위험도와 실시간 합격 확률이 자동 진단됩니다.";
      } else if (hasDanger) {
        passVerdictBadge.classList.add("danger");
        verdictText.textContent = `🚨 과락 발생 위험 (${dangerSubjects.join(", ")})`;
        if (radarAdviceText) radarAdviceText.textContent = `⚠️ [${dangerSubjects.join(", ")}] 과목이 40점 미만으로 과락 위험입니다. 해당 과목 A급 문제를 집중 공략하세요!`;
      } else if (parseFloat(avg) >= 60) {
        passVerdictBadge.classList.add("pass");
        verdictText.textContent = "🟢 합격 확실권 (전과목 40점 이상 & 평균 60점 돌파)";
        if (radarAdviceText) radarAdviceText.textContent = `🎉 현재 페이스를 유지하면 합격 확실! 최신 12·11·10회 기출 복원 모의고사를 마무리하세요.`;
      } else {
        passVerdictBadge.classList.add("warning");
        verdictText.textContent = "🟡 점수 보완 필요 (평균 60점 미달)";
        if (radarAdviceText) radarAdviceText.textContent = `💡 평균 60점까지 ${(60 - parseFloat(avg)).toFixed(1)}점 남았습니다. 계산 공식형 및 A급 빈출 문제를 보완하세요.`;
      }
    }
  }


  // ==========================================
  // 8. NAVIGATION & VIEW ROUTING
  // ==========================================
  function switchNav(targetNav, options = {}) {
    currentNav = targetNav;

    if (targetNav !== "practice" && isSprintMode) {
      endSprintMode(true);
    }

    mainNavButtons.forEach(btn => {
      if (btn.dataset.nav === targetNav) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    [homeView, tutorView, notesView, quizContentView, wrongView, statsView].forEach(v => {
      if (v) v.classList.add("hidden");
    });

    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (targetNav === "home") {
      if (homeView) homeView.classList.remove("hidden");
      updateHabitUI();
    } else if (targetNav === "tutor") {
      if (tutorView) tutorView.classList.remove("hidden");
      if (window.aiTutor) {
        if (options.stageIdx !== undefined) window.aiTutor.selectStage(options.stageIdx);
        else window.aiTutor.renderUI();
      }
    } else if (targetNav === "notes") {
      if (notesView) notesView.classList.remove("hidden");
    } else if (targetNav === "practice") {
      if (quizContentView) quizContentView.classList.remove("hidden");
      setMode("practice");
      if (options.cardId) {
        quizFilter.conceptCardId = options.cardId;
        quizFilter.subject = "all";
        quizFilter.calcOnly = false;
        quizFilter.importance = "all";
        quizFilter.difficulty = "all";
        quizFilter.tag = "all";
        quizFilter.keyword = "";
      }
      applyQuizFilter();
      renderQuizzes(true);
    } else if (targetNav === "wrong") {
      if (wrongView) wrongView.classList.remove("hidden");
      renderWrongNotesView("all");
    } else if (targetNav === "stats") {
      if (statsView) statsView.classList.remove("hidden");
      renderStatsDashboard();
    }
  }

  function setMode(mode) {
    currentMode = "practice";
    if (practiceHeader) practiceHeader.classList.remove("hidden");
  }


  // ==========================================
  // 9. PRACTICE QUIZ ENGINE (Batch & Virtualized)
  // ==========================================
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function handleShuffleQuizzes() {
    if (!workingQuizzes || workingQuizzes.length <= 1) {
      showToast("⚠️ 섞을 문제가 부족합니다.");
      return;
    }
    workingQuizzes = shuffleArray(workingQuizzes);
    if (currentMode === "mock") {
      mockQuizzes = workingQuizzes;
      renderOmrGrid();
      updateOmrHeaderCounts();
    }
    renderQuizzes(true);
    showToast(`🔀 총 ${workingQuizzes.length}개 문제가 무작위로 섞였습니다!`);
    if (quizContainer) {
      quizContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function getQuestionRound(q) {
    if (!q) return "mock";
    const exam = q.exam || q.round;
    if (exam) {
      const match = String(exam).match(/(\d+)/);
      if (match) return match[1];
    }
    const qid = String(q.id || "");
    if (qid.startsWith("Q9_")) return "9";
    if (qid.startsWith("Q8_")) return "8";
    if (qid.startsWith("Q12_")) return "12";
    if (qid.startsWith("Q11_")) return "11";
    if (qid.startsWith("Q10_") || qid.startsWith("Q10")) return "10";
    if (qid.startsWith("Q4_")) return "4";
    if (qid.startsWith("Q5")) return "mock";
    if (/^Q[1-4]/.test(qid)) return "practice";

    const qText = q.question || "";
    const textMatch = qText.match(/\[(\d+)회/);
    if (textMatch) return textMatch[1];

    return "mock";
  }

  function findMatchingConceptCardId(quiz) {
    if (!quiz) return null;
    if (quiz.cardId && cardMap.has(quiz.cardId)) return quiz.cardId;
    if (quiz.sectionId && noteData && noteData.sections) {
      const sec = noteData.sections.find(s => s.id === quiz.sectionId);
      if (sec && sec.cards && sec.cards.length > 0) return sec.cards[0].id;
    }
    if (noteData && noteData.sections) {
      const text = ((quiz.chapter || "") + " " + (quiz.question || "")).toLowerCase();
      for (const sec of noteData.sections) {
        for (const card of (sec.cards || [])) {
          const cTitle = (card.title || "").toLowerCase();
          if (text.includes(cTitle) || (cTitle.length >= 3 && text.includes(cTitle.substring(0, 3)))) {
            return card.id;
          }
        }
      }
      return noteData.sections[0]?.cards?.[0]?.id || null;
    }
    return null;
  }

  function findMatchingTutorStage(quiz) {
    if (!quiz) return 1;
    const text = ((quiz.chapter || "") + " " + (quiz.question || "") + " " + (quiz.explanation || "")).toLowerCase();
    if (text.includes("transformer") || text.includes("트랜스포머") || text.includes("attention") || text.includes("어텐션") || text.includes("bert") || text.includes("gpt")) return 16;
    if (text.includes("딥러닝") || text.includes("cnn") || text.includes("rnn") || text.includes("lstm") || text.includes("활성화함수") || text.includes("옵티마이저") || text.includes("adam") || text.includes("relu") || text.includes("드롭아웃") || text.includes("풀링")) return 15;
    if (text.includes("연관") || text.includes("apriori") || text.includes("지지도") || text.includes("신뢰도") || text.includes("향상도") || text.includes("장바구니")) return 14;
    if (text.includes("불균형") || text.includes("smote") || text.includes("오버샘플링") || text.includes("언더샘플링") || text.includes("토멕")) return 13;
    if (text.includes("변수선택") || text.includes("filter") || text.includes("wrapper") || text.includes("embedded") || text.includes("전진선택") || text.includes("후진제거")) return 12;
    if (text.includes("군집") || text.includes("k-means") || text.includes("dbscan") || text.includes("실루엣") || text.includes("계층적") || text.includes("와드") || text.includes("som")) return 11;
    if (text.includes("svm") || text.includes("서포트벡터") || text.includes("마진") || text.includes("초평면") || text.includes("커널")) return 10;
    if (text.includes("의사결정나무") || text.includes("지니") || text.includes("엔트로피") || text.includes("cart") || text.includes("c4.5") || text.includes("가지치기") || text.includes("앙상블") || text.includes("배깅") || text.includes("부스팅") || text.includes("랜덤포레스트") || text.includes("xgboost") || text.includes("lightgbm")) return 9;
    if (text.includes("로지스틱") || text.includes("오즈비") || text.includes("로짓") || text.includes("odds") || text.includes("소프트맥스") || text.includes("sigmoid")) return 8;
    if (text.includes("라쏘") || text.includes("lasso") || text.includes("릿지") || text.includes("ridge") || text.includes("엘라스틱넷") || text.includes("l1") || text.includes("l2")) return 7;
    if (text.includes("회귀") || text.includes("결정계수") || text.includes("다중공선성") || text.includes("vif") || text.includes("잔차") || text.includes("더빈")) return 6;
    if (text.includes("상관") || text.includes("차원축소") || text.includes("pca") || text.includes("주성분") || text.includes("요인분석") || text.includes("피어슨") || text.includes("스피어만")) return 5;
    if (text.includes("가설") || text.includes("p-value") || text.includes("t-검정") || text.includes("1종 오류") || text.includes("2종 오류") || text.includes("유의수준") || text.includes("귀무가설") || text.includes("anova") || text.includes("분산분석") || text.includes("카이제곱")) return 4;
    if (text.includes("스케일") || text.includes("정규화") || text.includes("표준화") || text.includes("z-score") || text.includes("min-max") || text.includes("왜도") || text.includes("첨도") || text.includes("box-cox")) return 3;
    if (text.includes("결측") || text.includes("이상치") || text.includes("iqr") || text.includes("outlier") || text.includes("비식별") || text.includes("익명") || text.includes("가명") || text.includes("k-익명") || text.includes("l-다양") || text.includes("t-근접")) return 2;
    if (text.includes("표본") || text.includes("샘플링") || text.includes("층화") || text.includes("군집추출") || text.includes("계통") || text.includes("단순무작위") || text.includes("crisp-dm") || text.includes("kdd") || text.includes("거버넌스")) return 1;

    if (quiz.subject === 1) return 1;
    if (quiz.subject === 2) return 3;
    if (quiz.subject === 3) return 9;
    if (quiz.subject === 4) return 13;
    return 1;
  }

  function applyFontScale(scale) {
    currentFontScale = scale;
    localStorage.setItem("knowway_font_scale", scale);
    if (quizContainer) {
      quizContainer.classList.remove("font-scale-sm", "font-scale-md", "font-scale-lg");
      quizContainer.classList.add(`font-scale-${scale}`);
    }
    document.querySelectorAll(".font-size-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.scale === scale);
    });
  }

  function updatePracticeHud() {
    const hudProgressText = document.getElementById("hudProgressText");
    const hudAccuracyText = document.getElementById("hudAccuracyText");
    const hudWrongText = document.getElementById("hudWrongText");
    const hudRemainingText = document.getElementById("hudRemainingText");
    const hudProgressFill = document.getElementById("hudProgressFill");

    if (!workingQuizzes || workingQuizzes.length === 0) {
      if (hudProgressText) hudProgressText.textContent = "0 / 0 (0%)";
      if (hudAccuracyText) hudAccuracyText.textContent = "0%";
      if (hudWrongText) hudWrongText.textContent = "0";
      if (hudRemainingText) hudRemainingText.textContent = "0";
      if (hudProgressFill) hudProgressFill.style.width = "0%";
      return;
    }

    const total = workingQuizzes.length;
    let solvedCount = 0;
    let correctCount = 0;
    let wrongCount = 0;

    workingQuizzes.forEach(q => {
      const chosen = currentMode === "mock" ? mockSolvedMap.get(q.id) : practiceSolvedMap.get(q.id);
      if (typeof chosen === "number") {
        solvedCount++;
        if (chosen === q.answer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const percent = Math.round((solvedCount / total) * 100);
    const accuracy = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;
    const remaining = total - solvedCount;

    if (hudProgressText) hudProgressText.textContent = `${solvedCount} / ${total} (${percent}%)`;
    if (hudAccuracyText) hudAccuracyText.textContent = `${accuracy}%`;
    if (hudWrongText) hudWrongText.textContent = String(wrongCount);
    if (hudRemainingText) hudRemainingText.textContent = String(remaining);
    if (hudProgressFill) hudProgressFill.style.width = `${percent}%`;
  }

  function applyQuizFilter() {
    const kw = quizFilter.keyword ? quizFilter.keyword.toLowerCase() : "";
    const reqSub = quizFilter.subject && quizFilter.subject !== "all" ? parseInt(quizFilter.subject, 10) : null;

    workingQuizzes = allQuizzes.filter(q => {
      if (quizFilter.conceptCardId && q.cardId !== quizFilter.conceptCardId) return false;
      if (reqSub !== null && q.subject !== reqSub) return false;

      // Difficulty
      if (quizFilter.difficulty && quizFilter.difficulty !== "all") {
        if (quizFilter.difficulty === "medium" && (q.difficulty === "medium" || q.difficulty === "normal")) {
          // pass
        } else if (q.difficulty !== quizFilter.difficulty) {
          return false;
        }
      }

      // Importance (Cached)
      if (quizFilter.importance && quizFilter.importance !== "all" && q._importance !== quizFilter.importance) return false;

      // Round Filter (Cached)
      if (quizFilter.round && quizFilter.round !== "all") {
        if (quizFilter.round === "4") {
          if (q._round !== "4" && q._round !== "5" && q._round !== "6" && q._round !== "7") return false;
        } else {
          if (q._round !== quizFilter.round) return false;
        }
      }

      // Type Filter (Cached)
      if (quizFilter.type && quizFilter.type !== "all") {
        if (quizFilter.type === "calc" && !q._isCalc) return false;
        if (quizFilter.type === "gradeA" && q._importance !== "A") return false;
        if (quizFilter.type === "bookmark" && !bookmarks.has(q.id)) return false;
      }

      if (quizFilter.calcOnly && !q._isCalc) return false;
      if (quizFilter.bookmarkedOnly && !bookmarks.has(q.id)) return false;
      if (quizFilter.is12thOnly && q._round !== "12") return false;
      if (quizFilter.is11thOnly && q._round !== "11") return false;
      if (quizFilter.is10thOnly && q._round !== "10") return false;
      if (quizFilter.tag && quizFilter.tag !== "all" && !q.question.includes("[" + quizFilter.tag + "]")) return false;

      // Search Keyword (Cached lowercase string search - 0ms instant)
      if (kw && q._searchStr && !q._searchStr.includes(kw)) return false;

      return true;
    });
  }

  function renderQuizzes(reset = true) {
    if (!quizContainer) return;

    updatePracticeHud();

    if (workingQuizzes.length === 0) {
      const activeFilterSummary = [];
      if (quizFilter.subject !== "all") activeFilterSummary.push(`${quizFilter.subject}과목`);
      if (quizFilter.round !== "all") activeFilterSummary.push(`${quizFilter.round === "practice" ? "단원별" : quizFilter.round === "mock" ? "실전모의" : quizFilter.round + "회"}`);
      if (quizFilter.type !== "all") activeFilterSummary.push(quizFilter.type === "calc" ? "계산형" : quizFilter.type === "gradeA" ? "A급" : "북마크");
      if (quizFilter.importance !== "all") activeFilterSummary.push(`${quizFilter.importance}급`);
      if (quizFilter.keyword) activeFilterSummary.push(`"${quizFilter.keyword}"`);

      const summaryText = activeFilterSummary.length > 0 ? `현재 설정된 필터 [ ${activeFilterSummary.join(" + ")} ] 에 해당하는 문제가 없습니다.` : "조건에 맞는 문제가 없습니다.";

      quizContainer.innerHTML = `
        <div style="text-align: center; padding: 50px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1.5px solid var(--line); margin: 20px 0;">
          <div style="font-size: 42px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 18px; font-weight: 900; margin-bottom: 8px; color: var(--text-color);">조건에 맞는 문제가 없습니다</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6;">${summaryText}</p>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            <button id="resetFilterBtnInline" class="button button-brand" style="padding: 10px 20px; font-weight: 700;">🔄 필터 전체 초기화</button>
          </div>
        </div>
      `;

      const resetBtnInline = document.getElementById("resetFilterBtnInline");
      if (resetBtnInline) {
        resetBtnInline.addEventListener("click", () => {
          const resetBtn = document.getElementById("resetFilterBtn");
          if (resetBtn) resetBtn.click();
          else {
            quizFilter = { subject: "all", round: "all", type: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
            applyQuizFilter();
            renderQuizzes(true);
            updateMatchCount();
          }
        });
      }

      if (quizToolbar) quizToolbar.innerHTML = `<div>총 <strong style="color: var(--primary-accent);">0</strong>문항</div>`;
      return;
    }

    if (quizToolbar) {
      quizToolbar.innerHTML = `
        <div>총 <strong style="color: var(--primary-accent);">${workingQuizzes.length}</strong>문항</div>
        <div style="display: flex; gap: 8px;">
          <button id="shuffleQuizBtn" class="btn-small">🔀 문제 섞기</button>
        </div>
      `;
    }

    if (currentMode === "mock") {
      currentRenderedCount = workingQuizzes.length;
      let html = "";
      workingQuizzes.forEach((quiz, index) => {
        html += renderQuizCardHTML(quiz, index + 1);
      });
      quizContainer.innerHTML = html;
      renderMathFormulas(quizContainer);
      return;
    }

    // Practice mode: Batch rendering for instant responsiveness
    if (reset) {
      currentRenderedCount = Math.min(BATCH_SIZE, workingQuizzes.length);
      let html = "";
      for (let i = 0; i < currentRenderedCount; i++) {
        html += renderQuizCardHTML(workingQuizzes[i], i + 1);
      }

      if (workingQuizzes.length > currentRenderedCount) {
        const remaining = workingQuizzes.length - currentRenderedCount;
        html += `
          <div id="quizLoadMoreWrapper" class="quiz-load-more-wrapper">
            <button id="loadMoreQuizzesBtn" class="quiz-load-more-btn">
              <span>➕ 더 많은 문제 불러오기 (+${Math.min(BATCH_SIZE, remaining)}제 / 잔여 ${remaining}제)</span>
            </button>
          </div>
        `;
      }

      quizContainer.innerHTML = html;
      renderMathFormulas(quizContainer);
      setupInfiniteScrollObserver();
    }
  }

  function renderNextQuizBatch() {
    if (!quizContainer || currentRenderedCount >= workingQuizzes.length) return;

    const startIdx = currentRenderedCount;
    const endIdx = Math.min(startIdx + BATCH_SIZE, workingQuizzes.length);
    currentRenderedCount = endIdx;

    const loadMoreWrap = document.getElementById("quizLoadMoreWrapper");
    if (loadMoreWrap) loadMoreWrap.remove();

    const tempDiv = document.createElement("div");
    let html = "";
    for (let i = startIdx; i < endIdx; i++) {
      html += renderQuizCardHTML(workingQuizzes[i], i + 1);
    }

    if (endIdx < workingQuizzes.length) {
      const remaining = workingQuizzes.length - endIdx;
      html += `
        <div id="quizLoadMoreWrapper" class="quiz-load-more-wrapper">
          <button id="loadMoreQuizzesBtn" class="quiz-load-more-btn">
            <span>➕ 더 많은 문제 불러오기 (+${Math.min(BATCH_SIZE, remaining)}제 / 잔여 ${remaining}제)</span>
          </button>
        </div>
      `;
    }

    tempDiv.innerHTML = html;
    renderMathFormulas(tempDiv);
    while (tempDiv.firstChild) {
      quizContainer.appendChild(tempDiv.firstChild);
    }

    setupInfiniteScrollObserver();
  }

  function setupInfiniteScrollObserver() {
    if (quizBatchObserver) {
      quizBatchObserver.disconnect();
      quizBatchObserver = null;
    }
    const wrapper = document.getElementById("quizLoadMoreWrapper");
    if (!wrapper || !("IntersectionObserver" in window)) return;

    quizBatchObserver = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        quizBatchObserver.disconnect();
        renderNextQuizBatch();
      }
    }, { rootMargin: "300px" });

    quizBatchObserver.observe(wrapper);
  }

  function renderQuizCardHTML(quiz, displayNum) {
    const isBookmarked = bookmarks.has(quiz.id);
    const chosenIdx = currentMode === "mock" ? mockSolvedMap.get(quiz.id) : practiceSolvedMap.get(quiz.id);
    const isAnswered = typeof chosenIdx === "number";
    const isCorrect = isAnswered && chosenIdx === quiz.answer;
    const isFlagged = mockFlaggedSet.has(quiz.id);
    const memo = quizMemos[quiz.id] || "";
    const impGrade = getImportanceGrade(quiz);
    const isCalc = isCalcQuestion(quiz);

    const impBadge = getImportanceBadgeHTML(impGrade);
    const diffBadge = getDifficultyBadgeHTML(quiz.difficulty);

    const eliminatedSet = eliminatedOptionsMap.get(quiz.id) || new Set();
    const targetCardId = findMatchingConceptCardId(quiz);
    const targetTutorStage = findMatchingTutorStage(quiz);

    return `
      <div class="quiz-card" id="quiz-${quiz.id}" data-id="${quiz.id}">
        <div class="quiz-card-header">
          <div class="quiz-badges-group">
            <span class="quiz-subject-badge">${SUBJECT_NAMES[quiz.subject] || "과목"}</span>
            ${impBadge}
            ${diffBadge}
            ${isCalc ? '<span class="quiz-tag-badge" style="background:rgba(37,99,235,0.12); color:#2563EB;">🧮 계산</span>' : ''}
            ${quiz.chapter ? `<span class="quiz-subject-badge">${escapeHTML(quiz.chapter)}</span>` : ""}
            ${quiz.exam ? `<span class="quiz-tag-badge" style="background:rgba(255,149,0,0.15); color:#D97706; font-weight:850;">${escapeHTML(quiz.exam)}</span>` : ""}
          </div>
          <div class="quiz-actions-top">
            ${currentMode === "mock" ? `
              <button class="btn-small flag-btn ${isFlagged ? 'active' : ''}" data-id="${quiz.id}" style="${isFlagged ? 'background:#FEF3C7; color:#B45309; border-color:#F59E0B;' : ''}">
                ${isFlagged ? '★ 검토중' : '☆ 검토'}
              </button>
            ` : ""}
            <span class="bookmark-star-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${quiz.id}" title="즐겨찾기">
              ${isBookmarked ? '★' : '☆'}
            </span>
          </div>
        </div>

        <div class="quiz-question-text">
          ${formatQuestionText(quiz.question, displayNum)}
        </div>

        <div class="quiz-options-list">
          ${(quiz.choices || []).map((choice, cIdx) => {
            let optClass = "quiz-option";
            const isEliminated = eliminatedSet.has(cIdx);
            if (isEliminated) optClass += " eliminated";

            if (isAnswered) {
              if (currentMode === "mock" && !isMockSubmitted) {
                if (cIdx === chosenIdx) optClass += " correct";
              } else {
                if (cIdx === quiz.answer) optClass += " correct";
                else if (cIdx === chosenIdx) optClass += " incorrect";
                else optClass += " dimmed";
              }
            }
            return `
              <div class="quiz-option-wrapper">
                <button class="${optClass}" data-choice="${cIdx}" ${isAnswered && (currentMode !== "mock" || isMockSubmitted) ? "disabled" : ""}>
                  <span class="option-num">${cIdx + 1}</span>
                  <span>${escapeHTML(choice)}</span>
                </button>
                ${(!isAnswered && (currentMode !== "mock" || !isMockSubmitted)) ? `
                  <button class="opt-eliminate-btn ${isEliminated ? 'active' : ''}" data-quiz-id="${quiz.id}" data-opt-idx="${cIdx}" title="${isEliminated ? '소거 취소' : '확실한 오답 선지 지우기 (소거법)'}">
                    ${isEliminated ? '↩' : '✕'}
                  </button>
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>

        ${(isAnswered && (currentMode !== "mock" || isMockSubmitted)) ? `
          <div class="quiz-explanation-box">
            <!-- 1. Result Banner -->
            <div class="quiz-result-banner ${isCorrect ? 'correct' : 'incorrect'}">
              <span>${isCorrect ? '✓ 정답입니다!' : '✗ 오답입니다'}</span>
              <span style="font-size: 13.5px; font-weight: 800;">정답: ${quiz.answer + 1}번</span>
            </div>

            <!-- ⚡ 3-Step Active Learning Loop Action Bar -->
            <div class="quiz-loop-actions-box">
              <div class="quiz-loop-header">
                <div class="quiz-loop-title">
                  <span>⚡</span> <span>3단계 완전 정복 루틴 (Active Mastery Loop)</span>
                </div>
                <span style="font-size: 11.5px; color: var(--text-muted); font-weight: 700;">풀이 ➔ 이론 ➔ 재응시</span>
              </div>
              <div class="quiz-loop-buttons-grid">
                <button class="loop-action-btn btn-retry" data-action="loop-retry" data-id="${quiz.id}" title="마킹을 초기화하고 이 문제를 다시 풉니다">
                  <span>🔄</span> <span>다시 풀기</span>
                </button>
                <button class="loop-action-btn btn-drill" data-action="loop-drill" data-id="${quiz.id}" data-subject="${quiz.subject}" data-chapter="${escapeHTML(quiz.chapter || '')}" title="동일 단원/유사 문제 5문항을 모아 바로 풉니다">
                  <span>🔀</span> <span>유사단원 드릴</span>
                </button>
                <button class="loop-action-btn btn-theory" data-action="loop-theory" data-card="${targetCardId || ''}" data-quiz-id="${quiz.id}" title="이 문제와 관련된 핵심 요약노트를 즉시 봅니다">
                  <span>📖</span> <span>핵심이론 보기</span>
                </button>
                <button class="loop-action-btn btn-tutor" data-action="loop-tutor" data-stage="${targetTutorStage || 1}" title="1:1 AI 튜터에서 개념 비교 및 함정 훈련을 진행합니다">
                  <span>🎯</span> <span>1:1 AI 튜터</span>
                </button>
              </div>
            </div>

            <!-- 2. Main Explanation (정답 분석) -->
            <div class="explain-section">
              <div class="explain-section-title correct-title">
                ✅ 정답 분석
              </div>
              <div class="correct-analysis-box">
                <div class="quiz-explanation-text">
                  ${escapeHTML(quiz.explanation || "")}
                </div>
                ${(quiz.whyWrong && quiz.whyWrong[quiz.answer] && quiz.whyWrong[quiz.answer].trim() !== "") ? `
                  <div class="correct-answer-reason">
                    <strong>${quiz.answer + 1}번 보기가 정답인 이유:</strong> ${escapeHTML(quiz.whyWrong[quiz.answer])}
                  </div>
                ` : ""}
              </div>
            </div>

            <!-- 3. Choice Trap 1:1 Breakdown (선지별 출제자의 오답 트랩) -->
            <div class="explain-section">
              <div class="explain-section-title wrong-title" style="color: var(--amber-text); border-color: rgba(255, 149, 0, 0.3);">
                🎯 선지별 출제 트랩 1:1 분석 (Choice Trap Breakdown)
              </div>
              <div class="choice-trap-box" style="display: flex; flex-direction: column; gap: 8px;">
                ${quiz.choices.map((choiceText, cIdx) => {
                  const isTargetAns = cIdx === quiz.answer;
                  const trapDesc = (quiz.optionTraps && quiz.optionTraps[cIdx]) || (quiz.whyWrong && quiz.whyWrong[cIdx]);
                  return `
                    <div class="choice-trap-item ${isTargetAns ? 'correct-trap' : 'wrong-trap'}" style="padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid ${isTargetAns ? 'var(--success)' : 'var(--line-bold)'}; background: ${isTargetAns ? 'rgba(52, 199, 89, 0.06)' : 'var(--paper-subtle)'}; font-size: 13px;">
                      <div class="choice-trap-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                        <span class="choice-num-badge" style="font-weight: 850; font-size: 12px; color: ${isTargetAns ? 'var(--success)' : 'var(--text-bold)'};">${cIdx + 1}번 선지</span>
                        <span class="choice-trap-tag" style="font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 99px; background: ${isTargetAns ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 149, 0, 0.15)'}; color: ${isTargetAns ? 'var(--success)' : '#D97706'};">
                          ${isTargetAns ? '✅ 정답 포인트' : '⚠️ 오답 유도 함정'}
                        </span>
                      </div>
                      <div class="choice-trap-body" style="color: var(--text-normal); line-height: 1.5;">
                        <span style="font-weight: 600;">"${escapeHTML(choiceText)}"</span>
                        ${trapDesc ? `
                          <div class="trap-desc" style="margin-top: 4px; font-size: 12.5px; color: ${isTargetAns ? 'var(--success)' : 'var(--text-subtle)'}; font-weight: 500;">
                            👉 ${escapeHTML(trapDesc)}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- 4. 3-Step Calculation Template -->
            ${isCalc ? `
              <div class="explain-section">
                <div class="explain-section-title calc-title">
                  📐 계산 공식 & 3단계 풀이
                </div>
                <div class="calc-formula-template">
                  <div class="calc-step-row">
                    <span class="calc-step-num">1단계</span>
                    <div class="calc-step-content"><strong>사용 공식:</strong> ${escapeHTML(getCalcSolutionTemplate(quiz).formula)}</div>
                  </div>
                  <div class="calc-step-row">
                    <span class="calc-step-num">2단계</span>
                    <div class="calc-step-content"><strong>수치 대입:</strong> ${escapeHTML(getCalcSolutionTemplate(quiz).substitute)}</div>
                  </div>
                  <div class="calc-step-row">
                    <span class="calc-step-num">3단계</span>
                    <div class="calc-step-content"><strong>10초 암산팁:</strong> ${escapeHTML(getCalcSolutionTemplate(quiz).tip)}</div>
                  </div>
                </div>
              </div>
            ` : ""}

            <!-- 5. Core Memorization Note (핵심 암기 노트) -->
            ${(quiz.memorizationPoint || quiz.examinerTip) ? `
              <div class="explain-section">
                <div class="explain-section-title memo-title">
                  🎯 핵심 암기 노트
                </div>
                <div class="premium-memo-card">
                  ${quiz.memorizationPoint ? `
                    <div class="memo-part keypoint-part">
                      <div class="memo-part-title">📖 기출 필수 암기</div>
                      <div class="memo-part-body">${escapeHTML(quiz.memorizationPoint)}</div>
                    </div>
                  ` : ""}
                  ${quiz.examinerTip ? `
                    <div class="memo-part tip-part">
                      <div class="memo-part-title">💡 출제위원의 단골 함정</div>
                      <div class="memo-part-body">${escapeHTML(quiz.examinerTip)}</div>
                    </div>
                  ` : ""}
                </div>
              </div>
            ` : ""}

            <!-- 6. Inline Custom Memo Card -->
            <div class="quiz-memo-input-wrap">
              <div class="quiz-memo-header-row">
                <span>📝 나만의 기출 암기 메모 (저장 시 오답노트 & 치트시트 연동)</span>
                ${memo ? '<span style="color:var(--success); font-weight:850;">✓ 저장됨</span>' : ''}
              </div>
              <textarea class="quiz-memo-textarea" data-id="${quiz.id}" placeholder="이 문제에서 헷갈렸던 점이나 나만의 암기 비법을 적어두세요...">${escapeHTML(memo)}</textarea>
              <button class="quiz-memo-save-btn" data-id="${quiz.id}">💾 메모 저장</button>
              <div style="clear:both;"></div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }


  // ==========================================
  // 10. CBT MOCK EXAM ENGINE & OMR IN-PLACE UPDATES
  // ==========================================
  function loadMockPreset(preset) {
    currentPreset = preset;
    let selected = [];
    if (preset === "12th") {
      selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q12_"));
      if (selected.length === 0) selected = allQuizzes.slice(0, 80);
    } else if (preset === "11th") {
      selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q11_"));
      if (selected.length === 0) selected = allQuizzes.slice(0, 80);
    } else if (preset === "10th") {
      selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q10_"));
      if (selected.length === 0) selected = allQuizzes.slice(80, 160);
    } else if (preset === "4th") {
      selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q4_"));
      if (selected.length === 0) selected = allQuizzes.slice(160, 240);
    } else {
      selected = [];
      for (let s = 1; s <= 4; s++) {
        const sQuizzes = allQuizzes.filter(q => q.subject === s);
        selected.push(...shuffleArray(sQuizzes).slice(0, 20));
      }
    }

    mockQuizzes = selected.slice(0, 80);
    workingQuizzes = mockQuizzes;
    mockSolvedMap.clear();
    mockFlaggedSet.clear();
    isMockSubmitted = false;

    [mockPreset11th, mockPreset10th, mockPreset4th, mockPresetRandom].forEach(p => {
      if (p) p.classList.remove("active");
    });
    if (preset === "11th" && mockPreset11th) mockPreset11th.classList.add("active");
    if (preset === "10th" && mockPreset10th) mockPreset10th.classList.add("active");
    if (preset === "4th" && mockPreset4th) mockPreset4th.classList.add("active");
    if (preset === "random" && mockPresetRandom) mockPresetRandom.classList.add("active");

    startExamTimer();
    renderQuizzes(true);
    renderOmrGrid();
    updateOmrHeaderCounts();
  }

  function startExamTimer() {
    clearInterval(timerInterval);
    timerSeconds = 80 * 60; // 80분 하드코어 타이머 훈련
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        alert("⏱️ 시험 시간이 종료되었습니다. 자동으로 제출 및 채점됩니다.");
        submitMockExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!examTimer) return;
    const m = Math.floor(timerSeconds / 60);
    const s = timerSeconds % 60;
    examTimer.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    const totalSeconds = 80 * 60;
    const progressPercent = (timerSeconds / totalSeconds) * 100;
    const cbtTimerProgress = document.getElementById("cbtTimerProgress");
    const cbtTimerMsg = document.getElementById("cbtTimerMsg");

    if (cbtTimerProgress) cbtTimerProgress.style.width = `${progressPercent}%`;

    if (cbtTimerMsg) {
      const elapsedMinutes = 80 - (timerSeconds / 60);
      if (elapsedMinutes < 30) {
        cbtTimerMsg.textContent = "🟢 1-Pass 구간: 아는 문제부터 빠르게 마킹하세요.";
        cbtTimerMsg.style.color = "var(--success)";
        if (cbtTimerProgress) cbtTimerProgress.style.background = "var(--success)";
        examTimer.style.color = "var(--success)";
        cbtTimerMsg.style.opacity = "1";
      } else if (elapsedMinutes >= 30 && elapsedMinutes < 65) {
        cbtTimerMsg.textContent = "⚠️ 2-Pass 구간: 1-Pass 종료! 아직 안 푼 문제 및 별표 문항 집중.";
        cbtTimerMsg.style.color = "var(--warn)";
        if (cbtTimerProgress) cbtTimerProgress.style.background = "var(--warn)";
        examTimer.style.color = "var(--warn)";
        cbtTimerMsg.style.opacity = "1";
      } else {
        cbtTimerMsg.textContent = "🚨 최종 마킹 점검: 누락 확인. 헷갈리는 건 첫 직감을 믿으세요!";
        cbtTimerMsg.style.color = "var(--danger)";
        if (cbtTimerProgress) cbtTimerProgress.style.background = "var(--danger)";
        examTimer.style.color = "var(--danger)";
        if (timerSeconds <= 300) {
          cbtTimerMsg.style.opacity = (timerSeconds % 2 === 0) ? "0.5" : "1";
        } else {
          cbtTimerMsg.style.opacity = "1";
        }
      }
    }
  }

  function renderOmrGrid() {
    if (!omrGrid) return;
    let html = "";
    mockQuizzes.forEach((q, idx) => {
      const chosen = mockSolvedMap.get(q.id);
      const isFlagged = mockFlaggedSet.has(q.id);
      html += `
        <div class="omr-row ${typeof chosen === 'number' ? 'solved' : ''} ${isFlagged ? 'flagged' : ''}" data-id="${q.id}" data-idx="${idx + 1}">
          <span class="omr-row-label" style="font-weight: 850; cursor: pointer;">${idx + 1}. ${isFlagged ? '★' : ''}</span>
          <div class="omr-options-circles">
            ${[0, 1, 2, 3].map(c => `
              <div class="omr-circle ${chosen === c ? 'marked' : ''}" data-id="${q.id}" data-choice="${c}">${c + 1}</div>
            `).join("")}
          </div>
        </div>
      `;
    });
    omrGrid.innerHTML = html;
  }

  function updateSingleOmrRow(quizId, choiceIdx, isFlagged) {
    if (!omrGrid) return;
    const row = omrGrid.querySelector(`.omr-row[data-id="${quizId}"]`);
    if (!row) return;
    const hasChoice = typeof choiceIdx === "number";
    row.classList.toggle("solved", hasChoice);
    row.classList.toggle("flagged", !!isFlagged);

    const label = row.querySelector(".omr-row-label");
    const idx = row.dataset.idx;
    if (label && idx) {
      label.textContent = `${idx}. ${isFlagged ? '★' : ''}`;
    }

    const circles = row.querySelectorAll(".omr-circle");
    circles.forEach((circle, cIdx) => {
      circle.classList.toggle("marked", cIdx === choiceIdx);
    });
  }

  function updateOmrHeaderCounts() {
    const solvedCount = mockSolvedMap.size;
    const totalCount = mockQuizzes.length;
    const flagCount = mockFlaggedSet.size;

    if (omrSolvedCount) omrSolvedCount.textContent = solvedCount;
    if (omrProgress) omrProgress.textContent = `${solvedCount} / ${totalCount}`;
    if (omrFlagCount) omrFlagCount.textContent = flagCount;
  }

  function toggleOmr(forceOpen) {
    if (!omrDrawer || !omrOverlay) return;
    const isOpen = !omrDrawer.classList.contains("hidden");
    const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

    if (shouldOpen) {
      omrDrawer.classList.remove("hidden");
      omrOverlay.classList.remove("hidden");
    } else {
      omrDrawer.classList.add("hidden");
      omrOverlay.classList.add("hidden");
    }
  }

  function triggerConfetti() {
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F3FA05', '#3B82F6', '#10B981', '#FF3B30'],
        zIndex: 9999
      });
    }
  }

  function submitMockExam() {
    if (isMockSubmitted) {
      alert("이미 제출된 시험입니다.");
      return;
    }

    const unsolved = mockQuizzes.length - mockSolvedMap.size;
    if (unsolved > 0 && timerSeconds > 0) {
      if (!confirm(`아직 풀지 않은 문제가 ${unsolved}개 있습니다. 정말 최종 제출하시겠습니까?`)) {
        toggleOmr(true);
        return;
      }
    }

    clearInterval(timerInterval);
    isMockSubmitted = true;
    toggleOmr(false);

    let totalCorrect = 0;
    const subScores = { 1: { total: 0, correct: 0 }, 2: { total: 0, correct: 0 }, 3: { total: 0, correct: 0 }, 4: { total: 0, correct: 0 } };

    mockQuizzes.forEach(quiz => {
      const chosen = mockSolvedMap.get(quiz.id);
      const isCorrect = typeof chosen === "number" && chosen === quiz.answer;
      if (isCorrect) totalCorrect++;

      const sub = quiz.subject || 1;
      if (subScores[sub]) {
        subScores[sub].total++;
        if (isCorrect) subScores[sub].correct++;
      }

      recordQuizAttempt(quiz, isCorrect, chosen);
    });

    const totalScore = Math.round((totalCorrect / mockQuizzes.length) * 100);
    let hasDisqualification = false;
    let subResultsHTML = "";

    for (let s = 1; s <= 4; s++) {
      const sTotal = subScores[s].total || 20;
      const sCorrect = subScores[s].correct || 0;
      const sScore = Math.round((sCorrect / sTotal) * 100);
      const isFail = sScore < 40;
      if (isFail) hasDisqualification = true;

      subResultsHTML += `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--line);">
          <span>${SUBJECT_NAMES[s]}</span>
          <span style="font-weight: 900; color: ${isFail ? 'var(--danger)' : 'var(--text-color)'};">
            ${sScore}점 (${sCorrect}/${sTotal}) ${isFail ? '⚠️ 과락' : '✓ 통과'}
          </span>
        </div>
      `;
    }

    const isPassed = totalScore >= 60 && !hasDisqualification;

    if (isPassed) {
      setTimeout(triggerConfetti, 400);
    }

    if (!mockRecords[currentPreset]) mockRecords[currentPreset] = { bestScore: 0, lastScore: 0, passed: false, solvedCount: 0 };
    mockRecords[currentPreset].lastScore = totalScore;
    mockRecords[currentPreset].bestScore = Math.max(mockRecords[currentPreset].bestScore, totalScore);
    mockRecords[currentPreset].passed = mockRecords[currentPreset].passed || isPassed;
    mockRecords[currentPreset].solvedCount = mockQuizzes.length;
    saveJSON(MOCK_RECORDS_KEY, mockRecords);

    if (quizScore) {
      quizScore.innerHTML = `
        <div style="background: var(--surface); border: 2px solid ${isPassed ? 'var(--success)' : 'var(--danger)'}; border-radius: var(--radius-lg); padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-md);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
              <span class="badge-tag" style="background: ${isPassed ? 'var(--success-bg)' : 'var(--danger-bg)'}; color: ${isPassed ? 'var(--success)' : 'var(--danger)'};">
                ${isPassed ? '🎉 최종 합격 (PASS)' : '❌ 불합격 (FAIL)'}
              </span>
              <h2 style="font-size: 26px; font-weight: 950; margin-top: 6px;">
                총점: ${totalScore}점 <span style="font-size: 16px; font-weight: 700; color: var(--text-muted);">(${totalCorrect} / ${mockQuizzes.length} 정답)</span>
              </h2>
            </div>
            <button id="reviewWrongBtn" class="button button-brand">
              📕 오답 문제만 다시 보기
            </button>
          </div>
          <div style="background: var(--paper-subtle); border-radius: var(--radius-md); padding: 14px;">
            ${subResultsHTML}
          </div>
        </div>
      `;

      const rwBtn = document.getElementById("reviewWrongBtn");
      if (rwBtn) {
        rwBtn.addEventListener("click", () => {
          workingQuizzes = mockQuizzes.filter(q => mockSolvedMap.get(q.id) !== q.answer);
          renderQuizzes(true);
        });
      }
    }

    renderQuizzes(true);
    renderReverseRoadmap();
  }

  function renderReverseRoadmap() {
    if (!examTimelineGrid) return;
    const presets = [
      { id: "12th", title: "12회 기출 복원", date: "2026.03", count: 87, tag: "최신 출제" },
      { id: "11th", title: "11회 실전 기출", date: "2025.10", count: 80, tag: "실전 모의" },
      { id: "10th", title: "10회 실전 기출", date: "2025.06", count: 80, tag: "핵심 기출" },
      { id: "9th", title: "9회 기출 복원", date: "2024.11", count: 50, tag: "단골 복원" },
      { id: "8th", title: "8회 기출 복원", date: "2024.04", count: 50, tag: "유형 분석" },
      { id: "4th", title: "4회 실전 기출", date: "2022.04", count: 80, tag: "기초 탄탄" }
    ];

    let passedCount = 0;
    let html = "";

    presets.forEach(p => {
      const rec = mockRecords[p.id] || { bestScore: 0, lastScore: 0, passed: false, solvedCount: 0 };
      if (rec.passed) passedCount++;

      html += `
        <div class="timeline-exam-card ${rec.passed ? 'passed' : ''}" data-preset="${p.id}" style="cursor:pointer;">
          <div class="t-exam-top">
            <span class="t-exam-tag">${p.tag}</span>
            <span class="t-exam-score ${rec.bestScore >= 60 ? 'pass' : (rec.bestScore > 0 ? 'fail' : '')}">
              ${rec.bestScore > 0 ? `${rec.bestScore}점` : '미응시'}
            </span>
          </div>
          <h4 class="t-exam-title">${p.title}</h4>
          <div class="t-exam-meta">${p.date} 시행 · ${p.count}문항</div>
          <div class="t-exam-status-bar">
            <span class="t-status-text">${rec.passed ? '🎉 60점 합격 완료' : (rec.bestScore > 0 ? '🔄 재응시 권장' : '⚡ 실전 풀기')}</span>
            <span class="t-status-arrow">➔</span>
          </div>
        </div>
      `;
    });

    examTimelineGrid.innerHTML = html;

    if (roadmapMasteryRate) {
      const pct = Math.round((passedCount / presets.length) * 100);
      roadmapMasteryRate.textContent = `${pct}% (${passedCount}/${presets.length}회차)`;
    }
  }


  // ==========================================
  // 11. OX SPEED TRAINER ENGINE
  // ==========================================
  function startOxTrainer() {
    oxItems = [];
    allQuizzes.forEach(quiz => {
      const choices = quiz.choices || [];
      if (choices.length === 0) return;
      if (choices[quiz.answer]) {
        oxItems.push({
          quizId: quiz.id,
          subject: quiz.subject,
          statement: `${quiz.question.replace(/\[.*?\]/g, '').trim()} ➔ [보기] "${choices[quiz.answer]}"`,
          isTrue: true,
          desc: `✓ 옳은 설명입니다. (${(quiz.explanation || "").substring(0, 90)}...)`
        });
      }
      choices.forEach((choice, idx) => {
        if (idx !== quiz.answer) {
          const reason = quiz.whyWrong && quiz.whyWrong[idx] ? quiz.whyWrong[idx] : "오답 선지입니다.";
          oxItems.push({
            quizId: quiz.id,
            subject: quiz.subject,
            statement: `${quiz.question.replace(/\[.*?\]/g, '').trim()} ➔ [보기] "${choice}"`,
            isTrue: false,
            desc: `✗ 틀린 설명입니다. 이유: ${reason}`
          });
        }
      });
    });

    oxItems = shuffleArray(oxItems);
    oxCurrentIdx = 0;
    oxStreak = 0;

    renderOxQuestion();
    if (oxTrainerModal) oxTrainerModal.classList.remove("hidden");
  }

  function renderOxQuestion() {
    if (oxCurrentIdx >= oxItems.length) {
      triggerConfetti();
      alert(`🎉 선지 OX 훈련 완료! 총 ${oxCurrentIdx}개 선지를 학습하셨습니다.`);
      if (oxTrainerModal) oxTrainerModal.classList.add("hidden");
      return;
    }

    const item = oxItems[oxCurrentIdx];
    if (oxProgressText) oxProgressText.textContent = `${oxCurrentIdx + 1} / ${Math.min(50, oxItems.length)}`;
    if (oxStreakText) oxStreakText.textContent = `🔥 ${oxStreak}`;
    if (oxSubjectTag) oxSubjectTag.textContent = SUBJECT_NAMES[item.subject] || "전체 과목";
    if (oxStatementText) oxStatementText.textContent = item.statement;

    if (oxFeedbackBox) oxFeedbackBox.classList.add("hidden");
    if (oxBtnTrue) oxBtnTrue.disabled = false;
    if (oxBtnFalse) oxBtnFalse.disabled = false;
  }

  function handleOxAnswer(userChoice) {
    const item = oxItems[oxCurrentIdx];
    const isCorrect = userChoice === item.isTrue;

    if (isCorrect) oxStreak++;
    else oxStreak = 0;

    if (oxStreakText) oxStreakText.textContent = `🔥 ${oxStreak}`;
    if (oxBtnTrue) oxBtnTrue.disabled = true;
    if (oxBtnFalse) oxBtnFalse.disabled = true;

    if (oxFeedbackBox) {
      oxFeedbackBox.classList.remove("hidden");
      if (oxFeedbackTitle) {
        oxFeedbackTitle.textContent = isCorrect ? "✓ 정답입니다!" : "✗ 틀렸습니다!";
        oxFeedbackTitle.style.color = isCorrect ? "var(--success)" : "var(--danger)";
      }
      if (oxFeedbackDesc) oxFeedbackDesc.textContent = item.desc;
    }
  }


  // ==========================================
  // 12. FINAL CHEAT SHEET ENGINE
  // ==========================================
  function openCheatSheetModal() {
    if (!cheatSheetContent || !cheatSheetModal) return;

    const repeatWrong = allQuizzes.filter(q => {
      const stat = cumulativeStats.quizzes[q.id];
      return stat && stat.wrongCount >= 2;
    });

    const bookmarkedQuizzes = allQuizzes.filter(q => bookmarks.has(q.id));

    let html = `
      <div class="cheat-sheet-section">
        <div class="cheat-sheet-sec-title">⚠️ 내가 자주 낚이는 단골 오답 함정 Top (${repeatWrong.length}문항)</div>
        ${repeatWrong.length === 0 ? '<p style="color:var(--text-muted); font-size:13px;">아직 2회 이상 틀린 오답 문항이 없습니다. 기출을 풀며 약점을 기록하세요!</p>' : `
          <div>
            ${repeatWrong.slice(0, 15).map(q => {
      const qChoices = q.choices || [];
      return `
                <div class="trap-highlight-item">
                  <strong>[${SUBJECT_NAMES[q.subject]}] ${escapeHTML(q.question)}</strong><br />
                  <span style="color:var(--success); font-weight:800;">✓ 정답: ${escapeHTML(qChoices[q.answer] || "")}</span> | 
                  <span style="color:var(--text-muted);">${escapeHTML(q.memorizationPoint || (q.explanation || "").substring(0, 60))}</span>
                </div>
              `;
    }).join("")}
          </div>
        `}
      </div>

      <div class="cheat-sheet-section">
        <div class="cheat-sheet-sec-title">🧮 빅분기 필기 13대 핵심 계산 공식 & 단골 함정 요약표</div>
        <table class="cheat-formula-table">
          <thead>
            <tr><th>지표/개념명</th><th>계산 공식 / 핵심 차이</th><th>핵심 암기 팁</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>정밀도 (Precision)</strong></td><td>TP / (TP + FP)</td><td>예측 Positive 기준 맞춘 비율</td></tr>
            <tr><td><strong>재현율 (Recall)</strong></td><td>TP / (TP + FN)</td><td>실제 Positive 기준 맞춘 비율</td></tr>
            <tr><td><strong>F1-Score</strong></td><td>2PR / (P + R)</td><td>정밀도와 재현율의 조화평균</td></tr>
            <tr><td><strong>특이도 (Specificity)</strong></td><td>TN / (TN + FP)</td><td>실제 Negative 기준 맞춘 비율</td></tr>
            <tr><td><strong>향상도 (Lift)</strong></td><td>P(A∩B) / (P(A)×P(B))</td><td>1보다 커야 양의 상관관계 (1이면 독립)</td></tr>
            <tr><td><strong>IQR (사분위범위)</strong></td><td>Q3 - Q1</td><td>이상치 경계: [Q1-1.5IQR, Q3+1.5IQR]</td></tr>
            <tr><td><strong>결정계수 (R²)</strong></td><td>SSR / SST = 1 - (SSE / SST)</td><td>0~1 사이, 1에 가까울수록 설명력 높음</td></tr>
            <tr><td><strong>가설검정 p-value</strong></td><td>p-value &lt; 유의수준(α)</td><td>귀무가설 기각(H₀ 기각 ➔ H₁ 채택)</td></tr>
            <tr><td><strong>1종 오류 / 2종 오류</strong></td><td>α(1종): H₀참인데 기각 / β(2종): H₁참인데 H₀채택</td><td>1종 오류가 더 치명적 (귀무가설 기각 오류)</td></tr>
            <tr><td><strong>지니계수 (Gini)</strong></td><td>1 - ∑(p_i)²</td><td>0일 때 가장 순수(분류 성능 우수)</td></tr>
            <tr><td><strong>규제 회귀 (Ridge vs Lasso)</strong></td><td>Ridge(L2 패널티) / Lasso(L1 패널티)</td><td>Lasso는 불필요한 계수를 0으로 만들어 변수선택</td></tr>
            <tr><td><strong>가명정보 vs 익명정보</strong></td><td>가명(추가정보 결합시 식별O) / 익명(식별 절대불가)</td><td>익명정보는 개인정보보호법 적용 면제</td></tr>
            <tr><td><strong>결측치 (MCAR/MAR/NMAR)</strong></td><td>MCAR(무관), MAR(다른 변수 연관), NMAR(값 자체 연관)</td><td>NMAR은 고소득자가 소득칸을 빈칸으로 두는 경우</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cheat-sheet-section">
        <div class="cheat-sheet-sec-title">⭐ 내가 북마크한 핵심 문제 (${bookmarkedQuizzes.length}문항)</div>
        ${bookmarkedQuizzes.length === 0 ? '<p style="color:var(--text-muted); font-size:13px;">북마크한 문항이 없습니다. 중요 문제에 별표(★)를 눌러 추가하세요!</p>' : `
          <div>
            ${bookmarkedQuizzes.slice(0, 10).map(q => {
      const qChoices = q.choices || [];
      return `
                <div style="background:var(--surface); border:1px solid var(--line); border-radius:6px; padding:10px; margin-bottom:8px; font-size:13px;">
                  <strong>${escapeHTML(q.question)}</strong><br />
                  <span style="color:var(--primary-accent); font-weight:800;">정답: ${q.answer + 1}번 (${escapeHTML(qChoices[q.answer] || "")})</span> - ${escapeHTML(q.memorizationPoint || "")}
                </div>
              `;
    }).join("")}
          </div>
        `}
      </div>
    `;

    cheatSheetContent.innerHTML = html;
    cheatSheetModal.classList.remove("hidden");
  }


  // ==========================================
  // 13. WRONG NOTES VIEW & MASTER
  // ==========================================
  function updateWrongHeaderCounts() {
    const allTracked = allQuizzes.filter(quiz => {
      const qStat = cumulativeStats.quizzes[quiz.id];
      return qStat && (qStat.wrongCount > 0 || qStat.hasWrong || qStat.mastered);
    });

    const activeWrong = allTracked.filter(q => !cumulativeStats.quizzes[q.id]?.mastered);
    const mastered = allTracked.filter(q => cumulativeStats.quizzes[q.id]?.mastered);
    const bookmarkedWrong = allTracked.filter(q => bookmarks.has(q.id));
    const highRisk = activeWrong.filter(q => (cumulativeStats.quizzes[q.id]?.wrongCount || 0) >= 2);
    const gichulWrong = activeWrong.filter(q => q._isGichul);

    const sub1 = activeWrong.filter(q => q.subject === 1);
    const sub2 = activeWrong.filter(q => q.subject === 2);
    const sub3 = activeWrong.filter(q => q.subject === 3);
    const sub4 = activeWrong.filter(q => q.subject === 4);

    if (wrongTotalCount) wrongTotalCount.textContent = activeWrong.length;
    if (wrongMasteredCount) wrongMasteredCount.textContent = mastered.length;
    if (wrongBookmarkCount) wrongBookmarkCount.textContent = bookmarkedWrong.length;

    const wfAllEl = document.getElementById("wfAllCount");
    const wfGichulEl = document.getElementById("wfGichulCount");
    const wfHighEl = document.getElementById("wfHighCount");
    const wfMasteredTabEl = document.getElementById("wfMasteredTabCount");
    const wfBookEl = document.getElementById("wfBookCount");
    const wfSub1El = document.getElementById("wfSub1Count");
    const wfSub2El = document.getElementById("wfSub2Count");
    const wfSub3El = document.getElementById("wfSub3Count");
    const wfSub4El = document.getElementById("wfSub4Count");

    if (wfAllEl) wfAllEl.textContent = activeWrong.length;
    if (wfGichulEl) wfGichulEl.textContent = gichulWrong.length;
    if (wfHighEl) wfHighEl.textContent = highRisk.length;
    if (wfMasteredTabEl) wfMasteredTabEl.textContent = mastered.length;
    if (wfBookEl) wfBookEl.textContent = bookmarkedWrong.length;
    if (wfSub1El) wfSub1El.textContent = sub1.length;
    if (wfSub2El) wfSub2El.textContent = sub2.length;
    if (wfSub3El) wfSub3El.textContent = sub3.length;
    if (wfSub4El) wfSub4El.textContent = sub4.length;
  }

  function renderWrongNotesView(filter = "all") {
    if (!wrongListContainer) return;
    currentWrongFilter = filter;

    updateWrongHeaderCounts();

    const allTracked = allQuizzes.filter(quiz => {
      const qStat = cumulativeStats.quizzes[quiz.id];
      return qStat && (qStat.wrongCount > 0 || qStat.hasWrong || qStat.mastered);
    });

    const activeWrong = allTracked.filter(q => !cumulativeStats.quizzes[q.id]?.mastered);
    const mastered = allTracked.filter(q => cumulativeStats.quizzes[q.id]?.mastered);
    const bookmarkedWrong = allTracked.filter(q => bookmarks.has(q.id));
    const highRisk = activeWrong.filter(q => (cumulativeStats.quizzes[q.id]?.wrongCount || 0) >= 2);
    const gichulWrong = activeWrong.filter(q => q._isGichul);

    let displayList = [];
    if (filter === "all") displayList = activeWrong;
    else if (filter === "gichul") displayList = gichulWrong;
    else if (filter === "high") displayList = highRisk;
    else if (filter === "mastered") displayList = mastered;
    else if (filter === "bookmarks") displayList = bookmarkedWrong;
    else if (filter === "sub1") displayList = activeWrong.filter(q => q.subject === 1);
    else if (filter === "sub2") displayList = activeWrong.filter(q => q.subject === 2);
    else if (filter === "sub3") displayList = activeWrong.filter(q => q.subject === 3);
    else if (filter === "sub4") displayList = activeWrong.filter(q => q.subject === 4);

    if (displayList.length === 0) {
      let emptyMsg = "해당 조건의 오답 문항이 없습니다. 기출문제를 풀며 실력을 계속 점검해보세요.";
      let emptyTitle = "오답 탈출 완료!";
      let emptyIcon = "🎉";

      if (filter === "mastered") {
        emptyTitle = "마스터 졸업 문항 없음";
        emptyMsg = "오답 문제를 2회 연속 정답으로 맞히면 '마스터 완료'로 이곳에 기록됩니다.";
        emptyIcon = "🏆";
      } else if (filter === "gichul") {
        emptyTitle = "기출 오답 없음";
        emptyMsg = "틀린 기출문제가 없습니다. 실전 기출문제를 풀며 실력을 점검해 보세요!";
        emptyIcon = "👑";
      } else if (filter === "high") {
        emptyTitle = "2회 이상 고위험 오답 없음";
        emptyMsg = "2회 이상 누적된 고위험 오답이 없습니다. 훌륭합니다!";
        emptyIcon = "🛡️";
      }

      wrongListContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1.5px solid var(--line);">
          <div style="font-size: 42px; margin-bottom: 12px;">${emptyIcon}</div>
          <h3 style="font-size: 18px; font-weight: 950; margin-bottom: 8px;">${emptyTitle}</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            ${emptyMsg}
          </p>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="button button-brand" data-nav="practice">
              📝 새로운 기출문제 풀러가기 ➔
            </button>
          </div>
        </div>
      `;
      return;
    }

    let html = "";
    displayList.forEach((quiz, idx) => {
      const qStat = cumulativeStats.quizzes[quiz.id] || { wrongCount: 1, mastered: false, correctStreak: 0 };
      const memo = quizMemos[quiz.id] || "";
      const isRealGichul = quiz._isGichul || isGichulQuestion(quiz);
      const isMastered = !!qStat.mastered;
      const streak = qStat.correctStreak || 0;

      let gichulBadgeHTML = "";
      if (isRealGichul) {
        const rLabel = quiz._round === "12" ? "👑 12회 최신 기출" :
                       quiz._round === "11" ? "👑 11회 실전 기출" :
                       quiz._round === "10" ? "👑 10회 실전 기출" :
                       quiz._round === "9" ? "👑 9회 기출 복원" :
                       quiz._round === "8" ? "👑 8회 기출 복원" :
                       quiz._round === "4" ? "👑 4회 실전 기출" : "👑 단원별 빈출 기출";
        gichulBadgeHTML = `<span class="quiz-tag-badge gichul-badge">${rLabel}</span>`;
      }

      html += `
        <div class="quiz-card wrong-note-card ${isMastered ? 'mastered-card' : ''}" id="wrong-card-${quiz.id}" data-id="${quiz.id}" style="border-left: 5px solid ${isMastered ? 'var(--success)' : (qStat.wrongCount >= 2 ? 'var(--danger)' : '#F59E0B')};">
          <div class="quiz-card-header">
            <div class="quiz-badges-group">
              <span class="quiz-subject-badge">${SUBJECT_NAMES[quiz.subject]}</span>
              ${gichulBadgeHTML}
              <span class="badge-tag" style="background: ${qStat.wrongCount >= 2 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)'}; color: ${qStat.wrongCount >= 2 ? 'var(--danger)' : '#B45309'}; border:none; font-weight:850;">
                ⚠️ ${qStat.wrongCount || 1}회 오답
              </span>
              ${isMastered ? '<span class="badge-tag" style="background:rgba(52, 199, 89, 0.15); color:var(--success); border:none; font-weight:850;">✓ 2회 연속 정답 (마스터 졸업)</span>' : ''}
            </div>
            <div class="quiz-actions-top">
              <span class="bookmark-star-btn ${bookmarks.has(quiz.id) ? 'bookmarked' : ''}" data-id="${quiz.id}" title="북마크 저장">
                ${bookmarks.has(quiz.id) ? '★' : '☆'}
              </span>
            </div>
          </div>

          <!-- 2-Strike Mastery Status Indicator Bar -->
          <div class="strike-status-box">
            <div class="strike-dot-track">
              <span class="strike-dot ${streak >= 1 ? 'filled' : ''}"></span>
              <span class="strike-dot ${streak >= 2 || isMastered ? 'filled' : ''}"></span>
            </div>
            <span class="strike-text ${isMastered ? 'mastered' : (streak === 1 ? 'half' : '')}">
              ${isMastered ? '🎉 2회 연속 정답 (마스터 완료!)' : (streak === 1 ? '🔥 1/2 정답 (1번 더 맞히면 졸업!)' : '⚪ 0/2 (2회 연속 정답 시 마스터 졸업)')}
            </span>
          </div>

          <div class="quiz-question-text">
            ${formatQuestionText(quiz.question, idx + 1)}
          </div>

          <div class="quiz-options-list">
            ${(quiz.choices || []).map((choice, cIdx) => `
              <button class="quiz-option wrong-retry-option" data-choice="${cIdx}">
                <span class="option-num">${cIdx + 1}</span>
                <span>${escapeHTML(choice)}</span>
              </button>
            `).join("")}
          </div>

          <!-- Wrong Card Interactive Action Bar -->
          <div class="wrong-card-action-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
            <button class="button button-sm button-light btn-retry-wrong-card" data-id="${quiz.id}" title="선지 선택을 초기화하고 다시 풉니다" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>🔄</span> <span>다시 풀기</span>
            </button>
            <button class="button button-sm button-light toggle-wrong-explain-btn" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>💡</span> <span>해설 & 출제 트랩 보기</span>
            </button>
            ${quiz.cardId ? `
              <button class="button button-sm button-light view-concept-btn" data-card="${quiz.cardId}" title="관련 요약노트 보기" style="font-weight: 800; border-radius: var(--radius-pill);">
                <span>📖</span> <span>핵심요약</span>
              </button>
            ` : ""}
            <button class="button button-sm button-light view-tutor-btn" data-subject="${quiz.subject}" title="1:1 AI 튜터에게 질문하기" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>🎯</span> <span>AI 튜터</span>
            </button>
            ${isMastered ? `
              <button class="button button-sm button-light btn-unmaster-wrong" data-id="${quiz.id}" title="오답노트에 다시 담아 복습합니다" style="font-weight: 800; border-radius: var(--radius-pill); color: #B45309;">
                <span>↩️</span> <span>오답노트 복귀</span>
              </button>
            ` : ""}
          </div>

          <!-- Structured Explanation Box -->
          <div class="quiz-explanation-box" style="display: none; margin-top: 14px;">
            <div class="quiz-explanation-text">
              ${formatExplanationText(quiz.explanation || "")}
            </div>

            ${(quiz.whyWrong && quiz.whyWrong[quiz.answer] && quiz.whyWrong[quiz.answer].trim() !== "") ? `
              <div class="correct-answer-reason" style="margin-top: 12px; padding: 10px 14px; background: rgba(52, 199, 89, 0.06); border-radius: var(--radius-sm); border: 1px solid rgba(52, 199, 89, 0.3);">
                <strong>${quiz.answer + 1}번 보기가 정답인 이유:</strong> ${escapeHTML(quiz.whyWrong[quiz.answer])}
              </div>
            ` : ""}

            ${quiz.memorizationPoint ? `
              <div class="keypoint-card" style="margin-top: 12px; padding: 12px 16px; background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--brand); border-radius: var(--radius-sm);">
                <div class="keypoint-card-header" style="font-weight: 850; font-size: 13px; color: var(--brand); margin-bottom: 4px;">
                  <span>🎯</span> <span>실제 기출 핵심 포인트 & 필수 암기</span>
                </div>
                <div class="keypoint-card-body" style="font-size: 13.5px; line-height: 1.6;">
                  ${escapeHTML(quiz.memorizationPoint)}
                </div>
              </div>
            ` : ""}

            ${quiz.examinerTip ? `
              <div class="examiner-tip-card" style="margin-top: 12px; padding: 12px 16px; background: var(--surface); border: 1px solid var(--line); border-left: 4px solid #F59E0B; border-radius: var(--radius-sm);">
                <div class="examiner-tip-header" style="font-weight: 850; font-size: 13px; color: #D97706; margin-bottom: 4px;">
                  <span>💡</span> <span>출제위원의 비밀 꿀팁 & 함정 탈출법</span>
                </div>
                <div class="examiner-tip-body" style="font-size: 13.5px; line-height: 1.6;">
                  ${escapeHTML(quiz.examinerTip)}
                </div>
              </div>
            ` : ""}

            ${quiz.whyWrong && quiz.whyWrong.length > 0 ? `
              <div class="trap-breakdown-box" style="margin-top: 12px;">
                <div class="trap-breakdown-title" style="font-size: 13px; font-weight: 850; color: var(--danger); margin-bottom: 6px;">
                  ⚠️ 보기별 오답 함정(Trap) 분석
                </div>
                <div class="choice-trap-box" style="display: flex; flex-direction: column; gap: 6px;">
                  ${quiz.choices.map((choiceText, cIdx) => {
                    const isTargetAns = cIdx === quiz.answer;
                    const trapDesc = (quiz.optionTraps && quiz.optionTraps[cIdx]) || (quiz.whyWrong && quiz.whyWrong[cIdx]);
                    return `
                      <div class="choice-trap-item ${isTargetAns ? 'correct-trap' : 'wrong-trap'}" style="padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid ${isTargetAns ? 'var(--success)' : 'var(--line-bold)'}; background: ${isTargetAns ? 'rgba(52, 199, 89, 0.05)' : 'var(--paper-subtle)'}; font-size: 12.5px;">
                        <span style="font-weight: 750; color: ${isTargetAns ? 'var(--success)' : 'var(--text-bold)'};">${cIdx + 1}번 선지: </span>
                        <span>"${escapeHTML(choiceText)}"</span>
                        ${trapDesc ? `<div style="margin-top: 2px; color: ${isTargetAns ? 'var(--success)' : 'var(--text-muted)'}; font-size: 12px;">👉 ${escapeHTML(trapDesc)}</div>` : ""}
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            ` : ""}

            ${memo ? `
              <div style="background: var(--paper); border: 1px dashed var(--line-bold); border-radius: var(--radius-sm); padding: 10px; margin-top: 12px; font-size: 12px; font-weight: 700;">
                📝 <strong>내 암기 메모:</strong> ${escapeHTML(memo)}
              </div>
            ` : ""}
          </div>
        </div>
      `;
    });

    wrongListContainer.innerHTML = html;
    renderMathFormulas(wrongListContainer);
  }


  // ==========================================
  // 14. CONCEPT NOTES & SEARCH ENGINE
  // ==========================================
  async function loadDataAndInit() {
    try {
      // Fetch fallback removed. We exclusively use the natively loaded data scripts 
      // (.js copies) to completely bypass file:// CORS and prevent loading errors.
      if (!window.noteData || !window.cbtBank) {
        throw new Error("Static data scripts fail. Make sure data.js and cbt_bank.js are loaded.");
      }

      noteData = window.noteData;
      allQuizzes = window.cbtBank.questions || [];

      buildMaps();
      renderNav();
      renderContent();
      buildNotesSearchIndex();
      updateHabitUI();

      const psTotalEl = document.getElementById("practiceTotalCount");
      if (psTotalEl) psTotalEl.textContent = allQuizzes.length;

    } catch (err) {
      console.error("Data load error:", err);
      if (contentEl) {
        contentEl.innerHTML = `<div style="padding: 40px; color: var(--danger);">데이터를 불러오는 데 실패했습니다. 새로고침 해주세요.</div>`;
      }
    }
  }

  function buildMaps() {
    cardMap.clear();
    cardToQuizMap.clear();
    sectionToQuizMap.clear();

    if (noteData && noteData.sections) {
      noteData.sections.forEach(sec => {
        if (sec.cards) {
          sec.cards.forEach(card => {
            card._searchStr = ((card.title || "") + " " + (card.content || "")).toLowerCase();
            cardMap.set(card.id, card);
          });
        }
      });
    }

    allQuizzes.forEach(q => {
      // ⚡ 고성능 최적화: 매 필터/검색 시 30,000+ 정규식/문자열 할당 제거를 위한 사전 캐싱
      q._round = getQuestionRound(q);
      q._isCalc = isCalcQuestion(q);
      q._importance = getImportanceGrade(q);
      q._searchStr = ((q.question || "") + " " + (q.explanation || "") + " " + (q.chapter || "") + " " + (q.choices || []).join(" ")).toLowerCase();

      if (q.cardId) {
        if (!cardToQuizMap.has(q.cardId)) cardToQuizMap.set(q.cardId, []);
        cardToQuizMap.get(q.cardId).push(q);
      }
      if (q.sectionId) {
        if (!sectionToQuizMap.has(q.sectionId)) sectionToQuizMap.set(q.sectionId, []);
        sectionToQuizMap.get(q.sectionId).push(q);
      }
    });
  }

  function buildNotesSearchIndex() {
    notesSearchIndex = [];
    if (!noteData || !noteData.sections) return;
    noteData.sections.forEach(sec => {
      if (sec.cards) {
        sec.cards.forEach(card => {
          notesSearchIndex.push({
            id: card.id,
            sectionId: sec.id,
            sectionTitle: sec.title || "",
            title: card.title || "",
            content: card.content || "",
            keywords: card.keywords || []
          });
        });
      }
    });
  }

  function renderNav() {
    if (!navContainer || !noteData || !noteData.nav) return;
    let html = "";

    noteData.nav.forEach(group => {
      html += `
        <div class="nav-group" style="margin-bottom: 14px;">
          <div style="font-size: 11px; font-weight: 900; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px; padding: 0 8px;">
            ${escapeHTML(group.group)}
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${(group.items || []).map(item => `
              <a href="#${item.id}" class="nav-link" style="display: block; padding: 7px 10px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 750; color: var(--text-color);">
                ${escapeHTML(item.label)}
              </a>
            `).join("")}
          </div>
        </div>
      `;
    });

    navContainer.innerHTML = html;
  }

  // ==========================================
  // 14. ENHANCED CONCEPT NOTES ENGINE (요약노트 고도화)
  // ==========================================
  let areAllCardsExpanded = true;

  function renderContent() {
    if (!contentEl || !noteData || !noteData.sections) return;
    let html = "";
    let totalRenderedSections = 0;
    let totalRenderedCards = 0;

    const kw = (notesFilter.keyword || "").trim().toLowerCase();

    // Check if weakness cards exist
    const weakCardsCount = Object.values(weaknessCounts).filter(cnt => cnt >= 2).length;

    // Render pinned weakness section banner if weakness filter is active or in overall view
    if (notesFilter.weaknessOnly) {
      html += `
        <div class="weakness-pinned-banner blur-glass" style="margin-bottom: 24px; padding: 18px 24px; border-radius: var(--radius-lg); border: 2px solid var(--danger); background: rgba(255, 59, 48, 0.08);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 24px;">🔴</span>
              <div>
                <h3 style="margin: 0; font-size: 17px; font-weight: 850; color: var(--danger);">나의 약점 집중공략 개념 (${weakCardsCount}개)</h3>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-subtle);">문제 풀이 중 2회 이상 오답이 발생하여 집중 복습이 필요한 핵심 개념 모음입니다.</p>
              </div>
            </div>
            <button id="btnResetWeaknessFilter" class="button button-light btn-small">전체 개념 보기</button>
          </div>
        </div>
      `;
    }

    noteData.sections.forEach(sec => {
      const calcSubject = sec.id.match(/^s(\d+)-/)?.[1];
      const subject = String(sec.subject || calcSubject || "1");

      // 1) 과목 필터링
      if (notesFilter.subject !== "all") {
        if (notesFilter.subject === "5") {
          if (!sec.id.startsWith("s5-") && sec.id !== "s5-1" && sec.id !== "s5-2") return;
        } else {
          if (subject !== notesFilter.subject) return;
        }
      }

      // 2) 카드 필터링 (미학습, 북마크, 약점, 키워드 검색)
      const matchingCards = (sec.cards || []).filter(card => {
        const isLearned = learnedConcepts.has(card.id);
        const isBookmarked = bookmarks.has(card.id);
        const wCount = weaknessCounts[card.id] || 0;

        if (notesFilter.unlearnedOnly && isLearned) return false;
        if (notesFilter.bookmarkedOnly && !isBookmarked) return false;
        if (notesFilter.weaknessOnly && wCount < 2) return false;

        if (kw) {
          const title = (card.title || "").toLowerCase();
          const body = (card.content || "").toLowerCase();
          if (!title.includes(kw) && !body.includes(kw)) return false;
        }

        return true;
      });

      if (matchingCards.length === 0) return;

      totalRenderedSections++;
      totalRenderedCards += matchingCards.length;

      html += `
        <section id="${sec.id}" class="section-container">
          <div class="section-banner-header">
            <div class="sec-title-group">
              <span class="sec-num-badge">${escapeHTML(sec.num || sec.id)}</span>
              <h2 class="sec-title-text">${escapeHTML(sec.title)}</h2>
            </div>
            <div class="sec-badges-group">
              <span class="badge-tag">${SUBJECT_NAMES[subject] || (subject + "과목")}</span>
              <span class="badge-count">${matchingCards.length}개 개념</span>
            </div>
          </div>
          <div class="cards-list">
            ${matchingCards.map(card => renderNoteCardHTML(card, kw)).join("")}
          </div>
        </section>
      `;
    });

    if (totalRenderedCards === 0) {
      html = `
        <div class="notes-empty-state">
          <div class="empty-icon">🔍</div>
          <h3>조건에 일치하는 요약노트 개념이 없습니다.</h3>
          <p>과목 탭을 '전체 보기'로 전환하거나, 검색어/필터 조건을 해제해 보세요.</p>
          <button id="btnResetNotesFilter" class="button button-brand" style="margin-top: 14px;">
            필터 및 검색 초기화
          </button>
        </div>
      `;
    }

    contentEl.innerHTML = html;

    const resetWeaknessBtn = document.getElementById("btnResetWeaknessFilter");
    if (resetWeaknessBtn) {
      resetWeaknessBtn.addEventListener("click", () => {
        notesFilter.weaknessOnly = false;
        const btnFilterWeakness = document.getElementById("btnFilterWeakness");
        if (btnFilterWeakness) btnFilterWeakness.classList.remove("active");
        renderContent();
      });
    }

    updateNoteProgress();
  }

  function highlightSearchKeywordStr(text, kw) {
    if (!kw || !text) return escapeHTML(text);
    const regex = new RegExp(`(${escapeHTML(kw)})`, "gi");
    return escapeHTML(text).replace(regex, `<span style="background-color: var(--brand); color: #090909; font-weight: 950; padding: 0 4px; border-radius: 4px;">$1</span>`);
  }

  function renderNoteCardHTML(card, kw = "") {
    const isLearned = learnedConcepts.has(card.id);
    const isBookmarked = bookmarks.has(card.id);
    const wCount = weaknessCounts[card.id] || 0;
    const relatedQuizzes = cardToQuizMap.get(card.id) || [];
    const cardContent = card.content || "";
    const isExpanded = areAllCardsExpanded || Boolean(kw) || notesFilter.unlearnedOnly || notesFilter.bookmarkedOnly || notesFilter.weaknessOnly;
    const displayTitle = kw ? highlightSearchKeywordStr(card.title, kw) : escapeHTML(card.title);

    return `
      <div class="card ${isExpanded ? 'expanded' : 'collapsed'} ${wCount >= 2 ? 'card-weakness' : ''}" id="card-${card.id}" data-id="${card.id}">
        <div class="card-header" data-action="toggle-accordion" title="클릭하여 내용 펼치기/접기">
          <div class="card-header-left">
            <button class="learn-check-btn ${isLearned ? 'learned' : ''}" data-id="${card.id}" data-action="toggle-learned" title="${isLearned ? '학습 완료됨 (클릭하여 취소)' : '학습 완료 체크'}">
              ${isLearned ? '✓' : ''}
            </button>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <h3 class="card-title" style="margin:0;">${displayTitle}</h3>
              ${wCount >= 2 ? `
                <span class="badge-weakness" title="오답 ${wCount}회 발생 개념">🔴 약점 집중공략 (${wCount}회 오답)</span>
              ` : ""}
            </div>
          </div>
          
          <div class="card-header-actions" onclick="event.stopPropagation()">
            <button class="card-action-btn card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${card.id}" data-action="toggle-bookmark" title="${isBookmarked ? '북마크 해제' : '중요 개념 북마크(찜)'}">
              ${isBookmarked ? '⭐' : '☆'}
            </button>

            <button class="card-action-btn card-copy-btn" data-id="${card.id}" data-action="copy-concept" title="개념 텍스트 클립보드 복사">
              📋
            </button>

            ${relatedQuizzes.length > 0 ? `
              <button class="btn-small practice-card-quizzes-btn" data-id="${card.id}" data-action="practice-quiz" title="이 개념의 기출/변형 문제 풀기">
                📝 관련 기출 (${relatedQuizzes.length}제)
              </button>
            ` : ""}

            <button class="card-accordion-toggle" data-action="toggle-accordion" title="접기/펼치기">
              <span class="chevron-icon">▼</span>
            </button>
          </div>
        </div>

        <div class="card-body ${isExpanded ? '' : 'hidden'}">
          ${cardContent}
        </div>
      </div>
    `;
  }

  function updateNoteProgress() {
    if (!noteData || !noteData.sections) return;
    let totalCards = 0;
    noteData.sections.forEach(s => {
      if (s.cards) totalCards += s.cards.length;
    });

    const learnedCount = learnedConcepts.size;
    const pct = totalCards > 0 ? Math.round((learnedCount / totalCards) * 100) : 0;

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressPercent) progressPercent.textContent = `${pct}% (${learnedCount}/${totalCards})`;
  }

  function handleNotesSearch(query) {
    notesFilter.keyword = query;
    const clearBtn = document.getElementById("clearNotesInlineSearch");
    if (clearBtn) {
      if (query) clearBtn.classList.remove("hidden");
      else clearBtn.classList.add("hidden");
    }
    renderContent();
  }

  function openConceptModal(cardId) {
    const card = cardMap.get(cardId);
    if (!card || !conceptModal) return;

    if (conceptModalTitle) conceptModalTitle.textContent = card.title;
    if (conceptModalBodyNote) conceptModalBodyNote.innerHTML = card.content || "";

    const related = cardToQuizMap.get(cardId) || [];
    if (conceptRelatedCount) conceptRelatedCount.textContent = related.length;

    if (conceptModalBodyQuiz) {
      if (related.length === 0) {
        conceptModalBodyQuiz.innerHTML = "<p style='padding: 20px; color: var(--text-muted); text-align: center;'>관련 기출문제가 없습니다.</p>";
      } else {
        conceptModalBodyQuiz.innerHTML = related.map((q, idx) => {
          const qChoices = q.choices || [];
          return `
            <div style="background: var(--paper-subtle); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px; border: 1px solid var(--line);">
              <div style="font-weight: 850; margin-bottom: 8px;">${formatQuestionText(q.question, idx + 1)}</div>
              <div style="font-size: 13px; color: var(--primary-accent); font-weight: 750;">💡 정답: ${q.answer + 1}번 - ${escapeHTML(qChoices[q.answer] || "")}</div>
            </div>
          `;
        }).join("");
      }
    }

    if (tabConceptNote) {
      tabConceptNote.onclick = () => {
        tabConceptNote.classList.add("active");
        if (tabConceptQuiz) tabConceptQuiz.classList.remove("active");
        if (conceptModalBodyNote) conceptModalBodyNote.classList.remove("hidden");
        if (conceptModalBodyQuiz) conceptModalBodyQuiz.classList.add("hidden");
      };
    }
    if (tabConceptQuiz) {
      tabConceptQuiz.onclick = () => {
        tabConceptQuiz.classList.add("active");
        if (tabConceptNote) tabConceptNote.classList.remove("active");
        if (conceptModalBodyQuiz) conceptModalBodyQuiz.classList.remove("hidden");
        if (conceptModalBodyNote) conceptModalBodyNote.classList.add("hidden");
      };
    }

    if (practiceConceptBtn) {
      practiceConceptBtn.onclick = () => {
        conceptModal.classList.add("hidden");
        switchNav("practice", { cardId });
      };
    }

    if (jumpToFullNoteBtn) {
      jumpToFullNoteBtn.onclick = () => {
        conceptModal.classList.add("hidden");
        switchNav("notes");
        const targetEl = document.getElementById(`card-${cardId}`);
        if (targetEl) {
          targetEl.classList.remove("collapsed");
          targetEl.classList.add("expanded");
          const b = targetEl.querySelector(".card-body");
          if (b) b.classList.remove("hidden");
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
    }

    conceptModal.classList.remove("hidden");
  }


  // ==========================================
  // 14.5 SPRINT MODE ENGINE
  // ==========================================
  function startSprintMode() {
    isSprintMode = true;
    switchNav("practice");
    workingQuizzes = shuffleArray([...allQuizzes]).slice(0, 50);
    currentPage = 1;

    if (practiceHeader) practiceHeader.classList.add("hidden");
    if (sprintTimerOverlay) sprintTimerOverlay.classList.remove("hidden");

    sprintSeconds = 300;
    updateSprintTimerUI();
    renderQuizzes(true);

    clearInterval(sprintInterval);
    sprintInterval = setInterval(() => {
      sprintSeconds--;
      updateSprintTimerUI();
      if (sprintSeconds <= 0) endSprintMode(false);
    }, 1000);
  }

  function updateSprintTimerUI() {
    if (!sprintTimerOverlay) return;
    const m = Math.floor(sprintSeconds / 60).toString().padStart(2, "0");
    const s = (sprintSeconds % 60).toString().padStart(2, "0");
    sprintTimerOverlay.textContent = `⏱️ ${m}:${s}`;

    if (sprintSeconds <= 15) {
      sprintTimerOverlay.style.color = "#FF3B30";
      sprintTimerOverlay.style.borderColor = "#FF3B30";
      sprintTimerOverlay.style.transform = `translateX(-50%) scale(${1 + (sprintSeconds % 2 === 0 ? 0.05 : 0)})`;
    } else {
      sprintTimerOverlay.style.color = "#F3FA05";
      sprintTimerOverlay.style.borderColor = "#F3FA05";
      sprintTimerOverlay.style.transform = "translateX(-50%) scale(1)";
    }
  }

  function endSprintMode(silent = false) {
    clearInterval(sprintInterval);
    isSprintMode = false;
    if (sprintTimerOverlay) sprintTimerOverlay.classList.add("hidden");
    if (practiceHeader) practiceHeader.classList.remove("hidden");

    if (!silent) {
      alert("시간 종료! 5분 벼락치기 타임어택이 마무리 되었습니다.");
      triggerConfetti();
    }
  }

  // ==========================================
  // 15. EVENT DELEGATION & GLOBAL LISTENERS
  // ==========================================
  function setupEventListeners() {
    // Settings & Data Management
    if (btnExportData) {
      btnExportData.addEventListener("click", handleExportData);
    }
    if (fileImportData) {
      fileImportData.addEventListener("change", handleImportData);
    }
    if (btnResetData) {
      btnResetData.addEventListener("click", handleResetData);
    }

    // Navigation Tabs
    mainNavButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const nav = btn.dataset.nav;
        const preset = btn.dataset.preset;
        if (nav) switchNav(nav, { preset });
      });
    });

    if (brandLogoBtn) {
      brandLogoBtn.addEventListener("click", e => {
        e.preventDefault();
        switchNav("home");
      });
    }

    // Home Pillars & Hero Buttons Navigation
    document.querySelectorAll(".pillar-card").forEach(card => {
      card.addEventListener("click", () => {
        const nav = card.dataset.nav;
        if (nav) {
          switchNav(nav);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });

    const heroStartBtn = document.getElementById("heroStartPracticeBtn");
    if (heroStartBtn) {
      heroStartBtn.addEventListener("click", () => {
        switchNav("practice");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const heroTutorBtn = document.getElementById("heroStartTutorBtn");
    if (heroTutorBtn) {
      heroTutorBtn.addEventListener("click", () => {
        switchNav("tutor");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Global Keyboard Shortcuts (1-4 for Quiz Options, Esc for Modal Dismissal)
    document.addEventListener("keydown", e => {
      // 1. Esc Key Modal Dismissal
      if (e.key === "Escape") {
        const modals = [cheatSheetModal, oxTrainerModal, conceptModal, sprintTimerOverlay];
        modals.forEach(m => {
          if (m && m.style.display !== "none") {
            m.style.display = "none";
          }
        });
        const omrModal = document.getElementById("omrModal");
        if (omrModal && omrModal.classList.contains("active")) {
          omrModal.classList.remove("active");
        }
        document.body.style.overflow = "";
        return;
      }

      // Ignore input fields and textareas
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTag === "input" || activeTag === "textarea") return;

      // 2. Quiz Option Selection (1-4 Keys)
      if (["1", "2", "3", "4"].includes(e.key)) {
        if (currentNav === "practice" || currentNav === "mock") {
          const optIndex = parseInt(e.key, 10) - 1;
          const visibleCard = document.querySelector(".quiz-card");
          if (visibleCard) {
            const options = visibleCard.querySelectorAll(".quiz-option");
            if (options[optIndex]) {
              options[optIndex].click();
            }
          }
        }
      }
    });

    // Mobile Collapsible TOC Toggle
    const toggleTocBtn = document.getElementById("toggleMobileTocBtn");
    const notesTocContainer = document.getElementById("notesTocContainer");
    const tocToggleText = document.getElementById("tocToggleText");
    const tocToggleIcon = document.getElementById("tocToggleIcon");

    if (toggleTocBtn && notesTocContainer) {
      toggleTocBtn.addEventListener("click", () => {
        const isCollapsed = notesTocContainer.classList.toggle("collapsed");
        if (tocToggleText) tocToggleText.textContent = isCollapsed ? "펼치기" : "접기";
        if (tocToggleIcon) tocToggleIcon.textContent = isCollapsed ? "▼" : "▲";
      });
    }

    // Theme Switcher
    const themeTriggers = document.querySelectorAll("#themeToggleBtn");
    themeTriggers.forEach(btn => {
      btn.addEventListener("click", toggleTheme);
    });

    const initTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "light";
    updateThemeUI(initTheme);

    // Scroll to top (Optimized with throttle to prevent rendering lag)
    window.addEventListener("scroll", throttle(() => {
      if (toTopBtn) {
        if (window.scrollY > 300) toTopBtn.classList.add("visible");
        else toTopBtn.classList.remove("visible");
      }
    }, 150), { passive: true });

    if (toTopBtn) {
      toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Quick Triggers
    if (quickSprintModeBtn) {
      quickSprintModeBtn.addEventListener("click", startSprintMode);
    }
    if (quickAgradePassBtn) {
      quickAgradePassBtn.addEventListener("click", () => {
        switchNav("practice");
        if (btnAgradePass) btnAgradePass.click();
      });
    }
    if (quickOxTrainerBtn) {
      quickOxTrainerBtn.addEventListener("click", startOxTrainer);
    }
    if (quickCalcPackBtn) {
      quickCalcPackBtn.addEventListener("click", () => {
        switchNav("practice");
        if (btnCalcPack) btnCalcPack.click();
      });
    }
    if (quickCheatSheetBtn || openCheatSheetTopBtn) {
      const openCs = () => openCheatSheetModal();
      if (quickCheatSheetBtn) quickCheatSheetBtn.addEventListener("click", openCs);
      if (openCheatSheetTopBtn) openCheatSheetTopBtn.addEventListener("click", openCs);
    }

    if (btnAgradePass) {
      btnAgradePass.addEventListener("click", () => {
        quizFilter.importance = "A";
        quizFilter.calcOnly = false;
        if (importanceFilter) importanceFilter.value = "A";
        applyQuizFilter();
        renderQuizzes(true);
      });
    }

    if (btnCalcPack) {
      btnCalcPack.addEventListener("click", () => {
        quizFilter.calcOnly = true;
        quizFilter.importance = "all";
        applyQuizFilter();
        renderQuizzes(true);
      });
    }

    if (resumeActionBtn) {
      resumeActionBtn.addEventListener("click", () => {
        if (habitData.lastSession && habitData.lastSession.mode === "mock") {
          switchNav("practice");
          btnModeExam?.click();
        } else {
          switchNav("practice");
        }
      });
    }

    // Mock Exam & OMR Triggers
    if (openOmrBtn) {
      openOmrBtn.addEventListener("click", () => toggleOmr());
    }
    if (closeOmrBtn) {
      closeOmrBtn.addEventListener("click", () => toggleOmr(false));
    }
    if (omrOverlay) {
      omrOverlay.addEventListener("click", () => toggleOmr(false));
    }
    if (omrSubmitBtn) {
      omrSubmitBtn.addEventListener("click", submitMockExam);
    }
    if (submitExamBtn) {
      submitExamBtn.addEventListener("click", submitMockExam);
    }

    if (mockPreset11th) {
      mockPreset11th.addEventListener("click", () => loadMockPreset("11th"));
    }
    if (mockPreset10th) {
      mockPreset10th.addEventListener("click", () => loadMockPreset("10th"));
    }
    if (mockPreset4th) {
      mockPreset4th.addEventListener("click", () => loadMockPreset("4th"));
    }
    if (mockPresetRandom) {
      mockPresetRandom.addEventListener("click", () => loadMockPreset("random"));
    }

    // OX Trainer Modal Events
    if (closeOxModalBtn && oxTrainerModal) {
      closeOxModalBtn.addEventListener("click", () => oxTrainerModal.classList.add("hidden"));
    }
    if (oxBtnTrue) oxBtnTrue.addEventListener("click", () => handleOxAnswer(true));
    if (oxBtnFalse) oxBtnFalse.addEventListener("click", () => handleOxAnswer(false));
    if (oxNextBtn) {
      oxNextBtn.addEventListener("click", () => {
        oxCurrentIdx++;
        renderOxQuestion();
      });
    }

    // Cheat Sheet Modal Events
    if (closeCheatSheetBtn && cheatSheetModal) {
      closeCheatSheetBtn.addEventListener("click", () => cheatSheetModal.classList.add("hidden"));
    }
    if (closeCheatSheetModalBtn && cheatSheetModal) {
      closeCheatSheetModalBtn.addEventListener("click", () => cheatSheetModal.classList.add("hidden"));
    }
    if (printCheatSheetBtn) {
      printCheatSheetBtn.addEventListener("click", () => window.print());
    }

    // D-Day Modal
    if (editDdayBtn || topbarDdayPill) {
      const openDday = () => {
        if (ddayTitleInput) ddayTitleInput.value = habitData.ddayTitle || "제13회 빅데이터분석기사 필기";
        if (ddayDateInput) ddayDateInput.value = habitData.ddayDate || "2026-09-05";
        if (dailyGoalInput) dailyGoalInput.value = habitData.dailyGoal || 30;
        if (ddayModal) ddayModal.classList.remove("hidden");
      };
      if (editDdayBtn) editDdayBtn.addEventListener("click", openDday);
      if (topbarDdayPill) topbarDdayPill.addEventListener("click", openDday);
    }
    if (closeDdayBtn && ddayModal) {
      closeDdayBtn.addEventListener("click", () => ddayModal.classList.add("hidden"));
    }
    if (saveDdayBtn && ddayModal) {
      saveDdayBtn.addEventListener("click", () => {
        if (ddayTitleInput) habitData.ddayTitle = ddayTitleInput.value.trim();
        if (ddayDateInput) habitData.ddayDate = ddayDateInput.value;
        if (dailyGoalInput) habitData.dailyGoal = parseInt(dailyGoalInput.value, 10) || 30;
        saveJSON(HABIT_KEY, habitData);
        ddayModal.classList.add("hidden");
        updateHabitUI();
      });
    }

    // Practice Mode Pack Buttons & Subject Filter Chips
    setupPracticeHeaderEvents();

    // Notes Search with Debounce
    const debouncedNotesSearch = debounce((val) => handleNotesSearch(val), 180);
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        debouncedNotesSearch(e.target.value);
      });
    }
    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        handleNotesSearch("");
      });
    }

    // Enhanced Notes View Controls
    setupNotesToolbarEvents();

    if (oxQuestionCard) {
      let startX = 0; let currentX = 0; let isDragging = false;
      const threshold = window.innerWidth > 600 ? 120 : 80;

      oxQuestionCard.addEventListener("touchstart", (e) => {
        if (oxBtnTrue.disabled || oxBtnFalse.disabled) return;
        startX = e.touches[0].clientX;
        isDragging = true;
        oxQuestionCard.style.transition = "none";
      }, { passive: true });

      oxQuestionCard.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const rotate = diffX * 0.05;
        oxQuestionCard.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;

        if (diffX > threshold / 2) {
          oxQuestionCard.style.boxShadow = "4px 4px 20px rgba(16, 185, 129, 0.4)";
        } else if (diffX < -threshold / 2) {
          oxQuestionCard.style.boxShadow = "-4px 4px 20px rgba(255, 59, 48, 0.4)";
        } else {
          oxQuestionCard.style.boxShadow = "none";
        }
      }, { passive: true });

      oxQuestionCard.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        oxQuestionCard.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease";
        oxQuestionCard.style.boxShadow = "none";

        const diffX = currentX - startX;
        if (diffX > threshold) {
          oxQuestionCard.style.transform = `translateX(120%) rotate(15deg)`;
          oxQuestionCard.style.opacity = "0";
          setTimeout(() => {
            handleOxAnswer(true);
            oxQuestionCard.style.transform = "none";
            oxQuestionCard.style.opacity = "1";
          }, 300);
        } else if (diffX < -threshold) {
          oxQuestionCard.style.transform = `translateX(-120%) rotate(-15deg)`;
          oxQuestionCard.style.opacity = "0";
          setTimeout(() => {
            handleOxAnswer(false);
            oxQuestionCard.style.transform = "none";
            oxQuestionCard.style.opacity = "1";
          }, 300);
        } else {
          oxQuestionCard.style.transform = "none";
        }
      });
    }

    // Set up Global Delegations
    setupQuizToolbarDelegation();
    setupQuizContainerDelegation();
    setupWrongContainerDelegation();
    setupOmrGridDelegation();
    setupContentDelegation();
    setupNavDelegation();
    setupTimelineDelegation();
  }

  // --- ENHANCED: Practice Header & Filter Events ---
  function setupPracticeHeaderEvents() {
    const resetAllPills = () => {
      document.querySelectorAll(".premium-pack-card, .p-pack-chip").forEach(b => b.classList.remove("active"));
    };

    // Mode Switcher (Study vs CBT Exam)
    const btnModeStudy = document.getElementById("btnModeStudy");
    const btnModeExam = document.getElementById("btnModeExam");
    const mockHeaderEl = document.getElementById("mock-header");

    if (btnModeStudy) {
      btnModeStudy.addEventListener("click", () => {
        currentMode = "practice";
        isMockSubmitted = false;
        if (btnModeStudy) btnModeStudy.classList.add("active");
        if (btnModeExam) btnModeExam.classList.remove("active");
        if (mockHeaderEl) mockHeaderEl.classList.add("hidden");
        applyQuizFilter();
        renderQuizzes(true);
        showToast("🟢 즉시 해설 학습모드로 전환되었습니다.");
      });
    }

    if (btnModeExam) {
      btnModeExam.addEventListener("click", () => {
        currentMode = "mock";
        if (btnModeExam) btnModeExam.classList.add("active");
        if (btnModeStudy) btnModeStudy.classList.remove("active");
        if (mockHeaderEl) mockHeaderEl.classList.remove("hidden");
        loadMockPreset("11th");
        showToast("🔵 실전 CBT 모의고사 모드가 시작되었습니다! (80분 타이머 & OMR)");
      });
    }

    // Auto-Advance Toggle Switch
    const toggleAutoAdvanceBtn = document.getElementById("toggleAutoAdvanceBtn");
    if (toggleAutoAdvanceBtn) {
      toggleAutoAdvanceBtn.classList.toggle("active", isAutoAdvanceEnabled);
      toggleAutoAdvanceBtn.addEventListener("click", () => {
        isAutoAdvanceEnabled = !isAutoAdvanceEnabled;
        localStorage.setItem("knowway_auto_advance", isAutoAdvanceEnabled);
        toggleAutoAdvanceBtn.classList.toggle("active", isAutoAdvanceEnabled);
        showToast(isAutoAdvanceEnabled ? "🚀 [Auto 스크롤 ON] 정답 마킹 시 다음 문제로 자동 이동합니다!" : "⏸️ [Auto 스크롤 OFF] 수동으로 다음 문제를 확인합니다.");
      });
    }

    // Font Scale Buttons
    document.querySelectorAll(".font-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const scale = btn.dataset.scale || "md";
        applyFontScale(scale);
      });
    });

    // Initialize saved font scale
    applyFontScale(currentFontScale);

    function updateFilterChipBadges() {
      const subjectCounts = { all: allQuizzes.length, 1: 0, 2: 0, 3: 0, 4: 0 };
      const roundCounts = { all: allQuizzes.length, 12: 0, 11: 0, 10: 0, 9: 0, 8: 0, 4: 0, practice: 0, mock: 0 };
      const typeCounts = { all: allQuizzes.length, calc: 0, gradeA: 0, bookmark: bookmarks.size };
      const impCounts = { all: allQuizzes.length, A: 0, B: 0, C: 0 };

      allQuizzes.forEach(q => {
        if (q.subject && subjectCounts[q.subject] !== undefined) subjectCounts[q.subject]++;

        const r = getQuestionRound(q);
        if (roundCounts[r] !== undefined) roundCounts[r]++;

        if (isCalcQuestion(q)) typeCounts.calc++;
        const imp = getImportanceGrade(q);
        if (imp === "A") typeCounts.gradeA++;
        if (impCounts[imp] !== undefined) impCounts[imp]++;
      });

      document.querySelectorAll("#subjectFilterChips .f-chip").forEach(chip => {
        const sub = chip.dataset.sub;
        if (sub === "all") chip.textContent = `전체 과목 (${allQuizzes.length})`;
        else if (sub === "1") chip.textContent = `1과목 분석기획 (${subjectCounts[1]})`;
        else if (sub === "2") chip.textContent = `2과목 데이터탐색 (${subjectCounts[2]})`;
        else if (sub === "3") chip.textContent = `3과목 데이터모델링 (${subjectCounts[3]})`;
        else if (sub === "4") chip.textContent = `4과목 결과해석 (${subjectCounts[4]})`;
      });

      document.querySelectorAll("#roundFilterChips .f-chip").forEach(chip => {
        const r = chip.dataset.round;
        if (r === "all") chip.textContent = `전체 회차 (${allQuizzes.length})`;
        else if (r === "9") chip.textContent = `🔥 9회 기출 복원 (${roundCounts[9] || 50})`;
        else if (r === "8") chip.textContent = `🏆 8회 기출 복원 (${roundCounts[8] || 50})`;
        else if (r === "12") chip.textContent = `12회 (${roundCounts[12]})`;
        else if (r === "11") chip.textContent = `11회 (${roundCounts[11]})`;
        else if (r === "10") chip.textContent = `10회 (${roundCounts[10]})`;
        else if (r === "4") chip.textContent = `4회 (${roundCounts[4]})`;
        else if (r === "practice") chip.textContent = `단원별 (${roundCounts.practice})`;
        else if (r === "mock") chip.textContent = `실전모의 (${roundCounts.mock})`;
      });

      document.querySelectorAll("#typeFilterChips .f-chip").forEach(chip => {
        const t = chip.dataset.type;
        if (t === "all") chip.textContent = `전체 유형 (${allQuizzes.length})`;
        else if (t === "calc") chip.textContent = `🧮 계산 공식형 (${typeCounts.calc})`;
        else if (t === "gradeA") chip.textContent = `⭐ A급 필수 (${typeCounts.gradeA})`;
        else if (t === "bookmark") chip.textContent = `📌 내 북마크 (${typeCounts.bookmark})`;
      });

      document.querySelectorAll("#importanceFilterChips .f-chip").forEach(chip => {
        const imp = chip.dataset.imp;
        if (imp === "all") chip.textContent = `모든 등급 (${allQuizzes.length})`;
        else if (imp === "A") chip.textContent = `A급 필수 (${impCounts.A})`;
        else if (imp === "B") chip.textContent = `B급 핵심 (${impCounts.B})`;
        else if (imp === "C") chip.textContent = `C급 심화 (${impCounts.C})`;
      });
    }

    const updateMatchCount = () => {
      const matchCountEl = document.getElementById("matchedQuizCount");
      if (matchCountEl) matchCountEl.textContent = workingQuizzes.length;
      updateFilterChipBadges();
      updatePracticeHud();
    };

    const bindPackBtn = (id, msg, updateFilterFn) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          resetAllPills();
          btn.classList.add("active");
          quizFilter = { subject: "all", round: "all", type: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
          updateFilterFn(quizFilter);
          applyQuizFilter();
          renderQuizzes(true);
          showToast(msg);
          updateMatchCount();
        });
      }
    };

    bindPackBtn("btnAgradePass", "⭐ A급 필수 빈출 모드로 전환되었습니다!", f => f.importance = "A");
    bindPackBtn("btn9thExamPack", "🔥 9회 기출 복원 모드로 전환되었습니다!", f => f.round = "9");
    bindPackBtn("btn8thExamPack", "🏆 8회 기출 복원 모드로 전환되었습니다!", f => f.round = "8");
    bindPackBtn("btn12thExamPack", "⚡ 12회 기출 복원 모드로 전환되었습니다!", f => f.is12thOnly = true);
    bindPackBtn("btn11thExamPack", "🎯 11회 기출 집중 모드로 전환되었습니다!", f => f.is11thOnly = true);
    bindPackBtn("btn10thExamPack", "📘 10회 기출 집중 모드로 전환되었습니다!", f => f.is10thOnly = true);
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);
    bindPackBtn("btnBookmarkedOnly", "⭐ 나의 북마크 문제 모드로 전환되었습니다!", f => {
      if (bookmarks.size === 0) showToast("⚠️ 북마크(⭐)한 문제가 없습니다.");
      f.bookmarkedOnly = true;
    });

    const btnWrongRetryPack = document.getElementById("btnWrongRetryPack");
    if (btnWrongRetryPack) {
      btnWrongRetryPack.addEventListener("click", () => {
        resetAllPills();
        btnWrongRetryPack.classList.add("active");
        const wrongQuizzes = allQuizzes.filter(q => {
          const qStat = cumulativeStats.quizzes[q.id];
          return qStat && qStat.wrongCount > 0 && !qStat.mastered;
        });
        if (wrongQuizzes.length === 0) {
          showToast("🎉 현재 탈출하지 못한 오답 문항이 없습니다!");
          return;
        }
        workingQuizzes = [...wrongQuizzes];
        renderQuizzes(true);
        showToast(`⚡ [오답 집중 탈출 모드] 총 ${wrongQuizzes.length}문항 풀이가 시작되었습니다!`);
        updateMatchCount();
      });
    }

    const target13thBtn = document.getElementById("target13thQuizBtn");
    if (target13thBtn) {
      target13thBtn.addEventListener("click", () => {
        resetAllPills();
        target13thBtn.classList.add("active");
        quizFilter = { subject: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
        const matched = allQuizzes.filter(q => {
          const text = (q.question + " " + q.chapter).toLowerCase();
          return TARGET_13TH_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
        });
        workingQuizzes = shuffleArray(matched).slice(0, 20);
        renderQuizzes(true);
        showToast("🔮 13회 적중 출제예상 20문항이 추출되었습니다!");
        updateMatchCount();
      });
    }

    const termStatBtn = document.getElementById("termStatQuizBtn");
    if (termStatBtn) {
      termStatBtn.addEventListener("click", () => {
        resetAllPills();
        termStatBtn.classList.add("active");
        quizFilter = { subject: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
        const matched = allQuizzes.filter(q => {
          const text = (q.question + " " + q.chapter).toLowerCase();
          return TERM_STAT_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
        });
        workingQuizzes = shuffleArray(matched).slice(0, 20);
        renderQuizzes(true);
        showToast("🔄 빈출 용어·통계 20문항이 추출되었습니다!");
        updateMatchCount();
      });
    }

    const subjectChips = document.querySelectorAll("#subjectFilterChips .f-chip");
    subjectChips.forEach(chip => {
      chip.addEventListener("click", () => {
        subjectChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        quizFilter.subject = chip.dataset.sub;
        applyQuizFilter();
        renderQuizzes(true);
        updateMatchCount();
      });
    });

    const roundChips = document.querySelectorAll("#roundFilterChips .f-chip");
    roundChips.forEach(chip => {
      chip.addEventListener("click", () => {
        roundChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        quizFilter.round = chip.dataset.round;
        applyQuizFilter();
        renderQuizzes(true);
        updateMatchCount();
      });
    });

    const typeChips = document.querySelectorAll("#typeFilterChips .f-chip");
    typeChips.forEach(chip => {
      chip.addEventListener("click", () => {
        typeChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        quizFilter.type = chip.dataset.type;
        applyQuizFilter();
        renderQuizzes(true);
        updateMatchCount();
      });
    });

    const importanceChips = document.querySelectorAll("#importanceFilterChips .f-chip");
    importanceChips.forEach(chip => {
      chip.addEventListener("click", () => {
        importanceChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        quizFilter.importance = chip.dataset.imp;
        applyQuizFilter();
        renderQuizzes(true);
        updateMatchCount();
      });
    });

    const searchBtn = document.getElementById("searchQuizBtn");
    const kwInput = document.getElementById("quizSearchInput") || document.getElementById("keywordSearch");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    const executeSearch = (val) => {
      quizFilter.keyword = (typeof val === "string" ? val : (kwInput ? kwInput.value : "")).trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("hidden", !quizFilter.keyword);
      }
      applyQuizFilter();
      renderQuizzes(true);
      updateMatchCount();
    };

    const debouncedQuizSearch = debounce(val => executeSearch(val), 180);

    if (kwInput) {
      kwInput.addEventListener("input", e => debouncedQuizSearch(e.target.value));
      kwInput.addEventListener("keydown", e => {
        if (e.key === "Enter") executeSearch(kwInput.value);
        if (e.key === "Escape") {
          kwInput.value = "";
          executeSearch("");
          kwInput.blur();
        }
      });
    }

    if (clearSearchBtn && kwInput) {
      clearSearchBtn.addEventListener("click", () => {
        kwInput.value = "";
        executeSearch("");
        kwInput.focus();
      });
    }

    if (searchBtn) searchBtn.addEventListener("click", () => executeSearch());

    // Shortcut Ctrl+K / Cmd+K for Quick Search Focus
    window.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        const quizView = document.getElementById("quiz-content");
        if (quizView && !quizView.classList.contains("hidden") && kwInput) {
          e.preventDefault();
          kwInput.focus();
          kwInput.select();
        }
      }
    });

    const resetBtn = document.getElementById("resetFilterBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetAllPills();
        quizFilter = { subject: "all", round: "all", type: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
        if (kwInput) kwInput.value = "";
        subjectChips.forEach(c => c.classList.toggle("active", c.dataset.sub === "all"));
        roundChips.forEach(c => c.classList.toggle("active", c.dataset.round === "all"));
        typeChips.forEach(c => c.classList.toggle("active", c.dataset.type === "all"));
        importanceChips.forEach(c => c.classList.toggle("active", c.dataset.imp === "all"));
        applyQuizFilter();
        renderQuizzes(true);
        updateMatchCount();
        showToast("🔄 모든 필터와 검색이 초기화되었습니다.");
      });
    }

    const shuffleBtn = document.getElementById("shuffleQuizBtn");
    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        handleShuffleQuizzes();
        updateMatchCount();
      });
    }

    // Mobile Filter Collapsible Toggle
    const toggleFilterBtn = document.getElementById("toggleMobileFiltersBtn");
    const premiumFiltersWrapper = document.getElementById("premiumFiltersWrapper");
    const filterToggleIcon = document.getElementById("filterToggleIcon");

    if (toggleFilterBtn && premiumFiltersWrapper) {
      toggleFilterBtn.addEventListener("click", () => {
        const isCollapsed = premiumFiltersWrapper.classList.toggle("collapsed");
        if (filterToggleIcon) {
          filterToggleIcon.textContent = isCollapsed ? "▼ 펼치기" : "▲ 접기";
        }
      });
    }
  }

  // --- ENHANCED: Notes Toolbar & Tabs Events ---
  function setupNotesToolbarEvents() {
    // 1. Subject Tabs Filter
    const subjectTabs = document.querySelectorAll(".notes-sub-tab");
    subjectTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        subjectTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        notesFilter.subject = tab.dataset.subject || "all";
        renderContent();
      });
    });

    // 2. Expand / Collapse All Cards
    const toggleAllBtn = document.getElementById("btnToggleAllCards");
    const toggleAllText = document.getElementById("toggleAllText");
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener("click", () => {
        areAllCardsExpanded = !areAllCardsExpanded;
        if (toggleAllText) {
          toggleAllText.textContent = areAllCardsExpanded ? "전체 접기" : "전체 펼치기";
        }
        toggleAllBtn.classList.toggle("active", areAllCardsExpanded);

        const allCards = document.querySelectorAll(".notes-cards-container .card");
        allCards.forEach(card => {
          if (areAllCardsExpanded) {
            card.classList.remove("collapsed");
            card.classList.add("expanded");
            const b = card.querySelector(".card-body");
            if (b) b.classList.remove("hidden");
          } else {
            card.classList.remove("expanded");
            card.classList.add("collapsed");
            const b = card.querySelector(".card-body");
            if (b) b.classList.add("hidden");
          }
        });
      });
    }

    // 3. Filter Unlearned Concepts Only
    const filterUnlearnedBtn = document.getElementById("btnFilterUnlearned");
    if (filterUnlearnedBtn) {
      filterUnlearnedBtn.addEventListener("click", () => {
        notesFilter.unlearnedOnly = !notesFilter.unlearnedOnly;
        filterUnlearnedBtn.classList.toggle("active", notesFilter.unlearnedOnly);
        renderContent();
      });
    }

    // 4. Filter Bookmarked Concepts Only
    const filterBookmarkedBtn = document.getElementById("btnFilterBookmarked");
    if (filterBookmarkedBtn) {
      filterBookmarkedBtn.addEventListener("click", () => {
        notesFilter.bookmarkedOnly = !notesFilter.bookmarkedOnly;
        filterBookmarkedBtn.classList.toggle("active", notesFilter.bookmarkedOnly);
        renderContent();
      });
    }

    // 4-2. Filter Weak Concepts Only (🔴 약점 집중공략만)
    const filterWeaknessBtn = document.getElementById("btnFilterWeakness");
    if (filterWeaknessBtn) {
      filterWeaknessBtn.addEventListener("click", () => {
        notesFilter.weaknessOnly = !notesFilter.weaknessOnly;
        filterWeaknessBtn.classList.toggle("active", notesFilter.weaknessOnly);
        renderContent();
      });
    }

    // 4-3. TOC Drawer Toggle & Auto-Close (📑 목차 팝업 모달)
    const btnToggleToc = document.getElementById("btnToggleToc");
    const notesTocOverlay = document.getElementById("notesTocOverlay");
    const closeTocDrawerBtn = document.getElementById("closeTocDrawerBtn");

    if (btnToggleToc && notesTocOverlay) {
      btnToggleToc.addEventListener("click", () => {
        notesTocOverlay.classList.remove("hidden");
      });
    }

    if (closeTocDrawerBtn && notesTocOverlay) {
      closeTocDrawerBtn.addEventListener("click", () => {
        notesTocOverlay.classList.add("hidden");
      });
    }

    if (notesTocOverlay) {
      notesTocOverlay.addEventListener("click", e => {
        if (e.target === notesTocOverlay) {
          notesTocOverlay.classList.add("hidden");
        }
      });
    }

    const navContainerEl = document.getElementById("nav-container");
    if (navContainerEl) {
      navContainerEl.addEventListener("click", e => {
        const item = e.target.closest("a, button, .nav-item");
        if (item && notesTocOverlay) {
          notesTocOverlay.classList.add("hidden");
        }
      });
    }

    // 5. Inline Search Input in Notes Header
    const inlineSearch = document.getElementById("notesInlineSearchInput");
    const clearInlineSearch = document.getElementById("clearNotesInlineSearch");
    if (inlineSearch) {
      const debouncedInline = debounce(val => handleNotesSearch(val), 180);
      inlineSearch.addEventListener("input", e => debouncedInline(e.target.value));
    }
    if (clearInlineSearch && inlineSearch) {
      clearInlineSearch.addEventListener("click", () => {
        inlineSearch.value = "";
        handleNotesSearch("");
      });
    }
  }

  // --- DELEGATION 0: Quiz Toolbar ---
  function setupQuizToolbarDelegation() {
    if (!quizToolbar) return;
    quizToolbar.addEventListener("click", e => {
      const shuffleBtn = e.target.closest("#shuffleQuizBtn");
      if (shuffleBtn) {
        handleShuffleQuizzes();
      }
    });
  }

  // --- DELEGATION 1: Quiz Container (With 3-Step Active Learning Loop) ---
  function setupQuizContainerDelegation() {
    if (!quizContainer) return;
    quizContainer.addEventListener("click", e => {
      // 1. Reset filter button
      const resetBtn = e.target.closest("#resetFilterBtn");
      if (resetBtn) {
        quizFilter = { subject: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false };
        if (subjectFilter) subjectFilter.value = "all";
        if (difficultyFilter) difficultyFilter.value = "all";
        if (importanceFilter) importanceFilter.value = "all";
        if (tagFilter) tagFilter.value = "all";
        if (keywordSearch) keywordSearch.value = "";
        applyQuizFilter();
        renderQuizzes(true);
        return;
      }

      // 2. Shuffle button (fallback)
      const shuffleBtn = e.target.closest("#shuffleQuizBtn");
      if (shuffleBtn) {
        handleShuffleQuizzes();
        return;
      }

      // 3. Load More button
      const loadMoreBtn = e.target.closest("#loadMoreQuizzesBtn");
      if (loadMoreBtn) {
        renderNextQuizBatch();
        return;
      }

      // 4. Elimination Button (선지 소거법)
      const elimBtn = e.target.closest(".opt-eliminate-btn");
      if (elimBtn) {
        e.stopPropagation();
        const quizId = elimBtn.dataset.quizId;
        const optIdx = parseInt(elimBtn.dataset.optIdx, 10);
        if (!eliminatedOptionsMap.has(quizId)) {
          eliminatedOptionsMap.set(quizId, new Set());
        }
        const elimSet = eliminatedOptionsMap.get(quizId);
        if (elimSet.has(optIdx)) {
          elimSet.delete(optIdx);
        } else {
          elimSet.add(optIdx);
        }
        const card = elimBtn.closest(".quiz-card");
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (card && quiz) {
          const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
          card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);
        }
        return;
      }

      // 5. Active Learning Loop: Instant Retry (이 문제 다시 풀기)
      const retryBtn = e.target.closest('[data-action="loop-retry"]');
      if (retryBtn) {
        const quizId = retryBtn.dataset.id;
        practiceSolvedMap.delete(quizId);
        mockSolvedMap.delete(quizId);
        if (eliminatedOptionsMap.has(quizId)) eliminatedOptionsMap.delete(quizId);
        const quiz = allQuizzes.find(q => q.id === quizId);
        const card = retryBtn.closest(".quiz-card");
        if (card && quiz) {
          const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
          card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);
          updatePracticeHud();
          showToast("🔄 문제가 초기화되었습니다! 다시 정답을 선택해보세요.");
        }
        return;
      }

      // 6. Active Learning Loop: Drill Similar Questions (유사 단원 5문항 드릴)
      const drillBtn = e.target.closest('[data-action="loop-drill"]');
      if (drillBtn) {
        const quizId = drillBtn.dataset.id;
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (!quiz) return;
        const sub = quiz.subject;
        const ch = quiz.chapter;
        let similar = allQuizzes.filter(q => q.id !== quizId && ((ch && q.chapter === ch) || q.subject === sub));
        similar = shuffleArray(similar).slice(0, 5);
        workingQuizzes = [quiz, ...similar];
        renderQuizzes(true);
        updatePracticeHud();
        showToast(`🔀 [${ch || SUBJECT_NAMES[sub]}] 유사 단원 5문항 집중 드릴이 시작되었습니다!`);
        window.scrollTo({ top: document.getElementById("quiz-content")?.offsetTop - 60 || 0, behavior: "smooth" });
        return;
      }

      // 7. Active Learning Loop: Instant Theory Peek (관련 이론 보기)
      const theoryBtn = e.target.closest('[data-action="loop-theory"]');
      if (theoryBtn) {
        let cardId = theoryBtn.dataset.card;
        const quizId = theoryBtn.dataset.quizId;
        if (!cardId && quizId) {
          const quiz = allQuizzes.find(q => q.id === quizId);
          cardId = findMatchingConceptCardId(quiz);
        }
        if (cardId) {
          openConceptModal(cardId);
        } else {
          showToast("관련 요약노트로 이동합니다.");
          switchNav("notes");
        }
        return;
      }

      // 8. Active Learning Loop: Jump to 1:1 AI Tutor (AI 튜터 훈련소)
      const tutorBtn = e.target.closest('[data-action="loop-tutor"]');
      if (tutorBtn) {
        const stageId = parseInt(tutorBtn.dataset.stage, 10) || 1;
        switchNav("tutor");
        if (window.aiTutor) {
          window.aiTutor.selectStage(stageId - 1);
          window.aiTutor.switchMode("train");
        }
        showToast(`🎯 1:1 AI 튜터 [${stageId}단계] 훈련소로 이동했습니다!`);
        return;
      }

      // 9. Save Custom Quiz Memo
      const saveMemoBtn = e.target.closest(".quiz-memo-save-btn");
      if (saveMemoBtn) {
        const quizId = saveMemoBtn.dataset.id;
        const card = saveMemoBtn.closest(".quiz-card");
        const textarea = card ? card.querySelector(`.quiz-memo-textarea[data-id="${quizId}"]`) : null;
        if (quizId && textarea) {
          const memoVal = textarea.value.trim();
          quizMemos[quizId] = memoVal;
          saveJSON(QUIZ_MEMO_KEY, quizMemos);
          showToast("💾 나만의 암기 메모가 저장되었습니다!");
          const headerRow = card.querySelector(".quiz-memo-header-row");
          if (headerRow && memoVal) {
            headerRow.innerHTML = '<span>📝 나만의 기출 암기 메모 (저장 시 오답노트 & 치트시트 연동)</span><span style="color:var(--success); font-weight:850;">✓ 저장됨</span>';
          }
        }
        return;
      }

      // 10. Bookmark star button
      const bookmarkBtn = e.target.closest(".bookmark-star-btn");
      if (bookmarkBtn) {
        e.stopPropagation();
        const quizId = bookmarkBtn.dataset.id;
        if (!quizId) return;
        if (bookmarks.has(quizId)) {
          bookmarks.delete(quizId);
          bookmarkBtn.classList.remove("bookmarked");
          bookmarkBtn.textContent = "☆";
        } else {
          bookmarks.add(quizId);
          bookmarkBtn.classList.add("bookmarked");
          bookmarkBtn.textContent = "★";
        }
        saveJSON(BOOKMARK_KEY, [...bookmarks]);
        return;
      }

      // 11. Flag button (CBT Mock)
      const flagBtn = e.target.closest(".flag-btn");
      if (flagBtn) {
        e.stopPropagation();
        const quizId = flagBtn.dataset.id;
        if (!quizId) return;
        if (mockFlaggedSet.has(quizId)) {
          mockFlaggedSet.delete(quizId);
          flagBtn.classList.remove("active");
          flagBtn.textContent = "☆ 검토";
          flagBtn.style.cssText = "";
        } else {
          mockFlaggedSet.add(quizId);
          flagBtn.classList.add("active");
          flagBtn.textContent = "🚩 검토중";
          flagBtn.style.cssText = "background: rgba(239, 68, 68, 0.15); color: #EF4444; border-color: #EF4444; font-weight: 850;";
        }
        updateSingleOmrRow(quizId, mockSolvedMap.get(quizId), mockFlaggedSet.has(quizId));
        updateOmrHeaderCounts();
        return;
      }

      // 12. Option button click
      const optBtn = e.target.closest(".quiz-option");
      if (optBtn && !optBtn.disabled) {
        const card = optBtn.closest(".quiz-card");
        if (!card) return;
        const quizId = card.dataset.id;
        const choiceIdx = parseInt(optBtn.dataset.choice || optBtn.dataset.index, 10);
        if (isNaN(choiceIdx)) return;
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (!quiz) return;

        if (currentMode === "mock") {
          mockSolvedMap.set(quizId, choiceIdx);
          updateSingleOmrRow(quizId, choiceIdx, mockFlaggedSet.has(quizId));
          updateOmrHeaderCounts();
          updatePracticeHud();
          const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
          card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);
        } else {
          practiceSolvedMap.set(quizId, choiceIdx);
          const isCorrect = choiceIdx === quiz.answer;
          recordQuizAttempt(quiz, isCorrect, choiceIdx);
          updatePracticeHud();
          renderHomePassRadar();
          const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
          card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);

          if (isAutoAdvanceEnabled) {
            setTimeout(() => {
              const currentCard = document.getElementById(`quiz-${quizId}`);
              const nextCard = currentCard ? currentCard.nextElementSibling : null;
              if (nextCard && nextCard.classList.contains("quiz-card")) {
                nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 550);
          }
        }
        return;
      }

      // 13. View Concept button (Legacy fallback)
      const conceptBtn = e.target.closest(".view-concept-btn");
      if (conceptBtn) {
        const cardId = conceptBtn.dataset.card;
        if (cardId) openConceptModal(cardId);
        return;
      }
    });
  }

  // --- DELEGATION 2: Wrong Notes Container ---
  function setupWrongContainerDelegation() {
    if (!wrongListContainer) return;
    wrongListContainer.addEventListener("click", e => {
      // 0. Toggle Explanation button
      const toggleExpBtn = e.target.closest(".toggle-wrong-explain-btn");
      if (toggleExpBtn) {
        const card = toggleExpBtn.closest(".quiz-card");
        if (!card) return;
        const expBox = card.querySelector(".quiz-explanation-box");
        if (expBox) {
          const isHidden = expBox.style.display === "none";
          expBox.style.display = isHidden ? "block" : "none";
          toggleExpBtn.textContent = isHidden ? "🙈 해설 접기" : "💡 해설 및 출제 트랩 보기";
        }
        return;
      }

      // 1. Retry option click
      const optBtn = e.target.closest(".wrong-retry-option");
      if (optBtn) {
        const card = optBtn.closest(".quiz-card");
        if (!card) return;
        const quizId = card.dataset.id;
        const choiceIdx = parseInt(optBtn.dataset.choice, 10);
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (!quiz) return;

        const isCorrect = choiceIdx === quiz.answer;
        const expBox = card.querySelector(".quiz-explanation-box");
        const toggleBtn = card.querySelector(".toggle-wrong-explain-btn");

        if (isCorrect) {
          optBtn.classList.add("correct");
          card.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
          if (!cumulativeStats.quizzes[quiz.id]) {
            cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 1, mastered: false };
          }
          cumulativeStats.quizzes[quiz.id].mastered = true;
          scheduleSave();
          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.textContent = "🙈 해설 접기";
          showToast("🎉 정답입니다! '오답 탈출(마스터 완료)' 성공!");
          triggerConfetti();
          setTimeout(() => renderWrongNotesView("all"), 1200);
        } else {
          optBtn.classList.add("incorrect");
          if (!cumulativeStats.quizzes[quiz.id]) {
            cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 1, mastered: false };
          }
          cumulativeStats.quizzes[quiz.id].wrongCount++;
          cumulativeStats.quizzes[quiz.id].mastered = false;
          scheduleSave();
          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.textContent = "🙈 해설 접기";
          showToast("❌ 오답입니다! 아래 출제 트랩과 해설을 확인해 보세요.");
        }
        return;
      }

      // 2. Bookmark star
      const star = e.target.closest(".bookmark-star-btn");
      if (star) {
        const quizId = star.dataset.id;
        if (!quizId) return;
        if (bookmarks.has(quizId)) bookmarks.delete(quizId);
        else bookmarks.add(quizId);
        saveJSON(BOOKMARK_KEY, [...bookmarks]);
        renderWrongNotesView("all");
        return;
      }

      // 3. View Concept
      const conceptBtn = e.target.closest(".view-concept-btn");
      if (conceptBtn) {
        const cardId = conceptBtn.dataset.card;
        if (cardId) openConceptModal(cardId);
        return;
      }

      // 4. Navigation button
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        const targetNav = navBtn.dataset.nav;
        if (targetNav) switchNav(targetNav);
        return;
      }
    });

    const retryAllBtn = document.getElementById("retryAllWrongBtn");
    if (retryAllBtn) {
      retryAllBtn.addEventListener("click", () => {
        const activeWrongQuizzes = allQuizzes.filter(q => {
          const qStat = cumulativeStats.quizzes[q.id];
          return qStat && qStat.wrongCount > 0 && !qStat.mastered;
        });
        if (activeWrongQuizzes.length === 0) {
          showToast("🎉 현재 탈출하지 못한 오답 문항이 없습니다!");
          return;
        }
        workingQuizzes = [...activeWrongQuizzes];
        switchNav("practice");
        renderQuizzes(true);
        showToast(`⚡ [오답 집중 탈출 모드] ${activeWrongQuizzes.length}문항 풀이가 시작되었습니다!`);
      });
    }
  }

  // --- DELEGATION 3: OMR Grid ---
  function setupOmrGridDelegation() {
    if (!omrGrid) return;
    omrGrid.addEventListener("click", e => {
      const circle = e.target.closest(".omr-circle");
      if (circle && !isMockSubmitted) {
        e.stopPropagation();
        const quizId = circle.dataset.id;
        const choice = parseInt(circle.dataset.choice, 10);
        mockSolvedMap.set(quizId, choice);

        updateSingleOmrRow(quizId, choice, mockFlaggedSet.has(quizId));
        updateOmrHeaderCounts();

        const card = document.getElementById(`quiz-${quizId}`);
        if (card) {
          card.querySelectorAll(".quiz-option").forEach((b, idx) => {
            if (idx === choice) b.classList.add("correct");
            else b.classList.remove("correct");
          });
        }
        return;
      }

      const row = e.target.closest(".omr-row");
      if (row) {
        const quizId = row.dataset.id;
        const targetEl = document.getElementById(`quiz-${quizId}`);
        if (targetEl) {
          toggleOmr(false);
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }

  // --- DELEGATION 4: Content (Notes) Container ---
  function setupContentDelegation() {
    if (!contentEl) return;
    contentEl.addEventListener("click", e => {
      // 1. Reset Notes Filter (Empty State Button)
      const resetBtn = e.target.closest("#btnResetNotesFilter");
      if (resetBtn) {
        notesFilter = { subject: "all", unlearnedOnly: false, bookmarkedOnly: false, keyword: "" };
        const inlineSearch = document.getElementById("notesInlineSearchInput");
        if (inlineSearch) inlineSearch.value = "";
        if (searchInput) searchInput.value = "";
        const clearInlineBtn = document.getElementById("clearNotesInlineSearch");
        if (clearInlineBtn) clearInlineBtn.classList.add("hidden");
        const filterUnlearnedBtn = document.getElementById("btnFilterUnlearned");
        if (filterUnlearnedBtn) filterUnlearnedBtn.classList.remove("active");
        const filterBookmarkedBtn = document.getElementById("btnFilterBookmarked");
        if (filterBookmarkedBtn) filterBookmarkedBtn.classList.remove("active");
        const subjectTabs = document.querySelectorAll(".notes-sub-tab");
        subjectTabs.forEach(t => t.classList.toggle("active", (t.dataset.subject || "all") === "all"));
        renderContent();
        showToast("🔄 요약노트 필터 및 검색이 초기화되었습니다.");
        return;
      }

      // 2. Learn Check Mark Button
      const learnBtn = e.target.closest(".learn-check-btn");
      if (learnBtn) {
        e.stopPropagation();
        const cardId = learnBtn.dataset.id;
        if (!cardId) return;
        if (learnedConcepts.has(cardId)) {
          learnedConcepts.delete(cardId);
          learnBtn.classList.remove("learned");
          learnBtn.textContent = "";
          learnBtn.style.background = "var(--surface)";
          showToast("학습 완료 해제");
        } else {
          learnedConcepts.add(cardId);
          learnBtn.classList.add("learned");
          learnBtn.textContent = "✓";
          learnBtn.style.background = "var(--brand)";
          showToast("✓ 학습 완료 마크!");
        }
        saveJSON(LEARNED_KEY, [...learnedConcepts]);
        updateNoteProgress();
        return;
      }

      // 3. Concept Bookmark Button
      const bookmarkBtn = e.target.closest(".card-bookmark-btn");
      if (bookmarkBtn) {
        e.stopPropagation();
        const cardId = bookmarkBtn.dataset.id;
        if (!cardId) return;
        if (bookmarks.has(cardId)) {
          bookmarks.delete(cardId);
          bookmarkBtn.classList.remove("bookmarked");
          bookmarkBtn.textContent = "☆";
          showToast("⭐ 개념 북마크 해제");
        } else {
          bookmarks.add(cardId);
          bookmarkBtn.classList.add("bookmarked");
          bookmarkBtn.textContent = "⭐";
          showToast("⭐ 핵심 개념 북마크 저장!");
        }
        saveJSON(BOOKMARK_KEY, [...bookmarks]);
        return;
      }

      // 4. Concept Text Copy Button
      const copyBtn = e.target.closest(".card-copy-btn");
      if (copyBtn) {
        e.stopPropagation();
        const cardId = copyBtn.dataset.id;
        const cardObj = cardMap.get(cardId);
        if (cardObj) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = cardObj.content || "";
          const textToCopy = `${cardObj.title}\n\n${tempDiv.textContent || tempDiv.innerText || ""}`;
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("📋 개념 텍스트가 클립보드에 복사되었습니다!");
          }).catch(() => {
            showToast("⚠️ 복사 권한 오류가 발생했습니다.");
          });
        }
        return;
      }

      // 5. Practice Card Quizzes Button
      const practiceBtn = e.target.closest(".practice-card-quizzes-btn");
      if (practiceBtn) {
        e.stopPropagation();
        const cardId = practiceBtn.dataset.id;
        if (cardId) switchNav("practice", { cardId });
        return;
      }

      // 6. Accordion Toggle (Card Header or Chevron Button)
      const headerOrToggle = e.target.closest(".card-header, .card-accordion-toggle");
      if (headerOrToggle) {
        const card = headerOrToggle.closest(".card");
        if (!card) return;
        const body = card.querySelector(".card-body");
        if (!body) return;

        const isCollapsed = card.classList.contains("collapsed");
        if (isCollapsed) {
          card.classList.remove("collapsed");
          card.classList.add("expanded");
          body.classList.remove("hidden");
        } else {
          card.classList.remove("expanded");
          card.classList.add("collapsed");
          body.classList.add("hidden");
        }
        return;
      }
    });
  }

  // --- DELEGATION 5: Sidebar / TOC Nav Container ---
  function setupNavDelegation() {
    if (!navContainer) return;
    navContainer.addEventListener("click", e => {
      const link = e.target.closest(".nav-link");
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        if (targetId) {
          switchNav("notes");

          // Ensure subject filter does not hide the target
          let targetEl = document.getElementById(targetId);
          if (!targetEl) {
            notesFilter.subject = "all";
            const subjectTabs = document.querySelectorAll(".notes-sub-tab");
            subjectTabs.forEach(t => t.classList.toggle("active", (t.dataset.subject || "all") === "all"));
            renderContent();
            targetEl = document.getElementById(targetId);
          }

          if (targetEl) {
            if (targetEl.classList.contains("card") && targetEl.classList.contains("collapsed")) {
              targetEl.classList.remove("collapsed");
              targetEl.classList.add("expanded");
              const body = targetEl.querySelector(".card-body");
              if (body) body.classList.remove("hidden");
            }
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }

          if (window.innerWidth <= 900) {
            if (sidebar) sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
          }
        }
      }
    });
  }

  // --- DELEGATION 6: Exam Timeline Grid ---
  function setupTimelineDelegation() {
    if (!examTimelineGrid) return;
    examTimelineGrid.addEventListener("click", e => {
      const card = e.target.closest(".timeline-exam-card");
      if (card) {
        switchNav("practice");
      }
    });
  }

  function toggleTheme() {
    const curTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = curTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeUI(newTheme);
  }

  function updateThemeUI(theme) {
    const isDark = theme === "dark";
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.setAttribute("title", isDark ? "라이트모드로 전환" : "다크모드로 전환");
      themeBtn.setAttribute("aria-label", isDark ? "라이트모드로 전환" : "다크모드로 전환");
      const label = themeBtn.querySelector(".theme-label");
      if (label) label.textContent = isDark ? "라이트모드" : "다크모드";
    }
  }

  function showToast(msg) {
    let toast = document.getElementById("knowwayToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "knowwayToast";
      toast.className = "knowway-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 250);
      }, 1800);
  }

  function renderMathFormulas(rootEl) {
    if (!rootEl) return;
    if (typeof window.renderMathInElement === "function") {
      // ⚡ 고속 바이패스: 수식 기호($)가 없는 경우 무거운 전체 DOM 트리 순회를 즉시 스킵
      if (rootEl.textContent && !rootEl.textContent.includes("$")) return;
      try {
        window.renderMathInElement(rootEl, {
          delimiters: [
            { left: "$", right: "$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (e) { }
    }
  }

  function escapeHTML(str) {
    if (!str || typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightTrapKeywords(str) {
    if (!str || typeof str !== "string") return str;

    const dangerKeywords = [
      "적절하지 않은", "아닌 것은", "틀린 것은", "거리가 먼", "옳지 않은",
      "가장 먼", "틀리게", "부적절한", "포함되지 않는", "해당하지 않는", "잘못된 것은", "옳지 못한"
    ];

    const safeKeywords = [
      "가장 적절한", "적절한 것은", "가장 옳은", "옳은 것은", "맞는 것은", "올바른 것은", "가장 알맞은", "올바르게"
    ];

    let processed = str;

    dangerKeywords.forEach(kw => {
      if (processed.includes(kw)) {
        const re = new RegExp(kw, 'g');
        processed = processed.replace(re, `<span class="badge-trap-danger">🚨 ${kw}</span>`);
      }
    });

    safeKeywords.forEach(kw => {
      if (processed.includes(kw)) {
        const re = new RegExp(kw, 'g');
        processed = processed.replace(re, `<span class="badge-trap-safe">✓ ${kw}</span>`);
      }
    });

    return processed;
  }

  function formatQuestionText(text, displayNum) {
    if (!text || typeof text !== "string") return "";

    let raw = text.trim();
    let prefixTagHTML = "";

    // Extract prefix tag like [빈출 기출], [최신 기출 변형], [12회 복원], etc.
    const tagMatch = raw.match(/^\[([가-힣a-zA-Z0-9\s·]+)\]\s*/);
    if (tagMatch) {
      const tagText = tagMatch[1].trim();
      let badgeClass = "q-prefix-brand";
      if (tagText.includes("빈출") || tagText.includes("A급")) {
        badgeClass = "q-prefix-amber";
      } else if (tagText.includes("12회") || tagText.includes("11회") || tagText.includes("최신")) {
        badgeClass = "q-prefix-purple";
      } else if (tagText.includes("계산")) {
        badgeClass = "q-prefix-blue";
      }
      prefixTagHTML = `<span class="q-prefix-badge ${badgeClass}">🏷️ ${escapeHTML(tagText)}</span> `;
      raw = raw.substring(tagMatch[0].length).trim();
    }

    const boxRegex = /(<보기>|\[보기\]|【보기】|<혼동행렬>|\[혼동행렬\]|<표>|\[표\]|<사례>|\[사례\]|<조건>|\[조건\])([\s\S]*)/i;
    const boxMatch = raw.match(boxRegex);

    const numPrefix = displayNum ? `<strong class="q-num-label">Q${displayNum}.</strong> ` : "";

    if (boxMatch) {
      const mainQuestion = raw.substring(0, boxMatch.index).trim();
      const boxTag = boxMatch[1].replace(/[<\[【>\]】]/g, '');
      const boxContent = boxMatch[2].trim();

      const formattedBoxLines = boxContent.split("\n").map(line => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9][\.\)\s]/.test(trimmed)) {
          return `<div class="quiz-box-bullet-item"><span class="bullet-dot">▪</span><span>${escapeHTML(trimmed)}</span></div>`;
        }
        return `<div class="quiz-box-line">${escapeHTML(trimmed)}</div>`;
      }).filter(Boolean).join("");

      return `
        <div class="quiz-main-prompt">
          ${numPrefix}${prefixTagHTML}<span>${highlightTrapKeywords(escapeHTML(mainQuestion))}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">${formattedBoxLines}</div>
        </div>
      `;
    }

    return `
      <div class="quiz-main-prompt">
        ${numPrefix}${prefixTagHTML}<span>${highlightTrapKeywords(escapeHTML(raw))}</span>
      </div>
    `;
  }

  // ==========================================
  // 16. SETTINGS & ADVANCED STATS VIEWER
  // ==========================================
  function renderStatsDashboard() {
    if (!statsSubjectGrid) return;

    // Overview Update
    const acc = cumulativeStats.totalSolved > 0
      ? Math.round((cumulativeStats.totalCorrect / cumulativeStats.totalSolved) * 100)
      : 0;

    let masteredCount = 0;
    Object.values(cumulativeStats.quizzes || {}).forEach(q => {
      if (q.mastered) masteredCount++;
    });

    if (statTotSolved) statTotSolved.textContent = cumulativeStats.totalSolved + "제";
    if (statTotAcc) statTotAcc.textContent = acc + "%";
    if (statTotMaster) statTotMaster.textContent = masteredCount + "문항";

    // Subject Breakdown Update
    let html = "";
    for (let s = 1; s <= 4; s++) {
      const stat = cumulativeStats.subjects[s] || { solved: 0, correct: 0 };
      const rate = stat.solved > 0 ? Math.round((stat.correct / stat.solved) * 100) : 0;
      const isDanger = stat.solved >= 10 && rate < 40;

      html += `
        <div class="subject-bar-card stat-detail-card" style="margin-bottom: 12px; background: var(--bg-hover);">
          <div class="sb-header" style="margin-bottom: 8px;">
            <span style="font-size: 15px; font-weight: 800;">${SUBJECT_NAMES[s]}</span>
            <span style="font-weight: 900; font-size: 15px;" class="${isDanger ? 'danger-text' : ''}">
              ${rate}% (총 ${stat.solved}제 풀이) ${isDanger ? ' <span class="sb-danger-tag">⚠️ 과락위험</span>' : ''}
            </span>
          </div>
          <div class="sb-track" style="height: 10px; background: var(--line-bold); border-radius: 999px;">
            <div class="sb-fill ${isDanger ? 'danger' : 'safe'}" style="width: ${rate}%; height: 100%; border-radius: 999px;"></div>
          </div>
        </div>
      `;
    }
    statsSubjectGrid.innerHTML = html;
  }

  function handleExportData() {
    const dataObj = {
      knowway_stats_v2: cumulativeStats,
      knowway_bookmarks: [...bookmarks],
      knowway_memos: quizMemos,
      knowway_habit: habitData,
      mockRecords: mockRecords
    };

    const dataStr = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `knowway_backup_${getTodayString()}.json`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);

    showToast("✅ 학습 백업 데이터가 다운로드되었습니다.");
  }

  function handleImportData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const importObj = JSON.parse(evt.target.result);
        if (importObj.knowway_stats_v2) {
          saveJSON(STATS_KEY, importObj.knowway_stats_v2);
          cumulativeStats = importObj.knowway_stats_v2;
        }
        if (importObj.knowway_bookmarks) {
          saveJSON(BOOKMARK_KEY, importObj.knowway_bookmarks);
          bookmarks = new Set(importObj.knowway_bookmarks);
        }
        if (importObj.knowway_memos) {
          saveJSON(MEMO_KEY, importObj.knowway_memos);
          quizMemos = importObj.knowway_memos;
        }
        if (importObj.knowway_habit) {
          saveJSON(HABIT_KEY, importObj.knowway_habit);
          habitData = importObj.knowway_habit;
        }
        if (importObj.mockRecords) {
          saveJSON(MOCK_KEY, importObj.mockRecords);
          mockRecords = importObj.mockRecords;
        }
        showToast("🚀 학습 데이터가 성공적으로 복원되었습니다!");
        setTimeout(() => location.reload(), 1500);
      } catch (err) {
        showToast("⚠️ 올바르지 않은 백업 파일입니다.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleResetData() {
    if (confirm("정말로 모든 기록(풀이 내역, 통계, 오답노트 등)을 완전 삭제하시겠습니까?\\n(이 작업은 절대 되돌릴 수 없습니다!)")) {
      localStorage.removeItem(STATS_KEY);
      localStorage.removeItem(BOOKMARK_KEY);
      localStorage.removeItem(MEMO_KEY);
      localStorage.removeItem(HABIT_KEY);
      localStorage.removeItem(MOCK_KEY);
      showToast("🗑️ 초기화 되었습니다. 리프레시합니다.");
      setTimeout(() => location.reload(), 1500);
    }
  }


  // ==========================================
  // 16-1. FORMULA CALCULATOR TOOL (🧮 3초 공식 빠른 계산기)
  // ==========================================
  const calcToolModal = document.getElementById("calcToolModal");
  const openCalcToolTopBtn = document.getElementById("openCalcToolTopBtn");
  const closeCalcToolBtn = document.getElementById("closeCalcToolBtn");
  const closeCalcToolModalBtn = document.getElementById("closeCalcToolModalBtn");

  function openCalcToolModal() {
    if (calcToolModal) {
      calcToolModal.classList.remove("hidden");
      updateCalcResults();
    }
  }

  function closeCalcToolModal() {
    if (calcToolModal) {
      calcToolModal.classList.add("hidden");
    }
  }

  function initCalcTool() {
    if (openCalcToolTopBtn) openCalcToolTopBtn.addEventListener("click", openCalcToolModal);
    if (closeCalcToolBtn) closeCalcToolBtn.addEventListener("click", closeCalcToolModal);
    if (closeCalcToolModalBtn) closeCalcToolModalBtn.addEventListener("click", closeCalcToolModal);
    if (calcToolModal) {
      calcToolModal.addEventListener("click", e => {
        if (e.target === calcToolModal) closeCalcToolModal();
      });
    }

    // Tabs
    const tabs = [
      { btn: "calcTabMatrix", pane: "calcPaneMatrix" },
      { btn: "calcTabIqr", pane: "calcPaneIqr" },
      { btn: "calcTabZscore", pane: "calcPaneZscore" },
      { btn: "calcTabR2", pane: "calcPaneR2" }
    ];

    tabs.forEach(t => {
      const btnEl = document.getElementById(t.btn);
      if (btnEl) {
        btnEl.addEventListener("click", () => {
          tabs.forEach(x => {
            const b = document.getElementById(x.btn);
            const p = document.getElementById(x.pane);
            if (b) b.classList.toggle("active", x.btn === t.btn);
            if (p) p.classList.toggle("hidden", x.pane !== t.pane);
          });
          updateCalcResults();
        });
      }
    });

    // Inputs Live Updating
    const inputIds = [
      "calcInputTP", "calcInputFP", "calcInputFN", "calcInputTN",
      "calcInputQ1", "calcInputQ3", "calcInputX", "calcInputMu",
      "calcInputSigma", "calcInputSSE", "calcInputSST"
    ];

    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", updateCalcResults);
    });
  }

  function updateCalcResults() {
    // 1. Confusion Matrix
    const tp = parseFloat(document.getElementById("calcInputTP")?.value || 0);
    const fp = parseFloat(document.getElementById("calcInputFP")?.value || 0);
    const fn = parseFloat(document.getElementById("calcInputFN")?.value || 0);
    const tn = parseFloat(document.getElementById("calcInputTN")?.value || 0);

    const precision = (tp + fp) > 0 ? (tp / (tp + fp)) : 0;
    const recall = (tp + fn) > 0 ? (tp / (tp + fn)) : 0;
    const specificity = (tn + fp) > 0 ? (tn / (tn + fp)) : 0;
    const accuracy = (tp + fp + fn + tn) > 0 ? ((tp + tn) / (tp + fp + fn + tn)) : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall / (precision + recall)) : 0;

    const resMatrix = document.getElementById("calcMatrixResult");
    if (resMatrix) {
      resMatrix.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:12px;">
          <div style="padding:10px 14px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">🎯 정밀도 (Precision)</div>
            <div style="font-size:18px; font-weight:950; color:var(--brand-accent, #007AFF);">${(precision * 100).toFixed(1)}%</div>
            <div style="font-size:11px; color:var(--text-muted);">공식: $\\frac{TP}{TP + FP} = \\frac{${tp}}{${tp}+${fp}}$</div>
          </div>

          <div style="padding:10px 14px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">📢 재현율/민감도 (Recall)</div>
            <div style="font-size:18px; font-weight:950; color:#10B981;">${(recall * 100).toFixed(1)}%</div>
            <div style="font-size:11px; color:var(--text-muted);">공식: $\\frac{TP}{TP + FN} = \\frac{${tp}}{${tp}+${fn}}$</div>
          </div>

          <div style="padding:10px 14px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">⚡ F1-Score (조화평균)</div>
            <div style="font-size:18px; font-weight:950; color:#F59E0B;">${f1.toFixed(3)}</div>
            <div style="font-size:11px; color:var(--text-muted);">공식: $\\frac{2 \\times P \\times R}{P + R}$</div>
          </div>

          <div style="padding:10px 14px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">🛡️ 특이도 (Specificity)</div>
            <div style="font-size:18px; font-weight:950; color:var(--text-color);">${(specificity * 100).toFixed(1)}%</div>
            <div style="font-size:11px; color:var(--text-muted);">공식: $\\frac{TN}{TN + FP} = \\frac{${tn}}{${tn}+${fp}}$</div>
          </div>

          <div style="padding:10px 14px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">✅ 정확도 (Accuracy)</div>
            <div style="font-size:18px; font-weight:950; color:var(--text-color);">${(accuracy * 100).toFixed(1)}%</div>
            <div style="font-size:11px; color:var(--text-muted);">공식: $\\frac{TP + TN}{\\text{전체}}$</div>
          </div>
        </div>

        <div style="font-size:12px; line-height:1.5; padding:10px 12px; background:var(--paper-subtle); border-left:3.5px solid var(--brand); border-radius:6px; color:var(--text-color);">
          💡 <strong>시험 암기 팁:</strong> <strong>정밀도</strong>는 '예측'이 분모($TP+FP$), <strong>재현율</strong>은 '실제'가 분모($TP+FN$)입니다. 불균형 데이터에서는 <strong>F1-Score</strong>가 성능 평가의 핵심 기준이 됩니다!
        </div>
      `;
    }

    // 2. IQR
    const q1 = parseFloat(document.getElementById("calcInputQ1")?.value || 0);
    const q3 = parseFloat(document.getElementById("calcInputQ3")?.value || 0);
    const iqr = q3 - q1;
    const lowerBound = q1 - (1.5 * iqr);
    const upperBound = q3 + (1.5 * iqr);

    const resIqr = document.getElementById("calcIqrResult");
    if (resIqr) {
      resIqr.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:12px;">
          <div style="padding:12px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">📏 사분위수 범위 (IQR)</div>
            <div style="font-size:20px; font-weight:950; color:var(--brand);">${iqr}</div>
            <div style="font-size:11px; color:var(--text-muted);">$Q_3 - Q_1 = ${q3} - ${q1}$</div>
          </div>

          <div style="padding:12px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">🔽 이상치 하한 경계 (Lower Whisker)</div>
            <div style="font-size:20px; font-weight:950; color:#EF4444;">${lowerBound}</div>
            <div style="font-size:11px; color:var(--text-muted);">$Q_1 - 1.5 \\times IQR = ${q1} - ${1.5 * iqr}$</div>
          </div>

          <div style="padding:12px; background:var(--surface); border:1px solid var(--line-bold); border-radius:10px;">
            <div style="font-size:11px; font-weight:800; color:var(--text-muted);">🔼 이상치 상한 경계 (Upper Whisker)</div>
            <div style="font-size:20px; font-weight:950; color:#EF4444;">${upperBound}</div>
            <div style="font-size:11px; color:var(--text-muted);">$Q_3 + 1.5 \\times IQR = ${q3} + ${1.5 * iqr}$</div>
          </div>
        </div>

        <div style="font-size:12px; line-height:1.5; padding:10px 12px; background:var(--paper-subtle); border-left:3.5px solid #FF9500; border-radius:6px; color:var(--text-color);">
          📦 <strong>박스플롯 해석:</strong> 관측값이 <strong>${lowerBound} 미만</strong>이거나 <strong>${upperBound} 초과</strong>이면 박스플롯 상 이상치(Outlier)점으로 표시됩니다.
        </div>
      `;
    }

    // 3. Z-Score
    const x = parseFloat(document.getElementById("calcInputX")?.value || 0);
    const mu = parseFloat(document.getElementById("calcInputMu")?.value || 0);
    const sigma = parseFloat(document.getElementById("calcInputSigma")?.value || 1);
    const z = sigma !== 0 ? (x - mu) / sigma : 0;

    const resZ = document.getElementById("calcZscoreResult");
    if (resZ) {
      resZ.innerHTML = `
        <div style="padding:14px; background:var(--surface); border:1.5px solid var(--line-bold); border-radius:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:13px; font-weight:800;">📈 Z-Score 표준화 점수</span>
            <span style="font-size:22px; font-weight:950; color:var(--brand);">$z = ${z.toFixed(3)}$</span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:6px;">
            공식: $z = \\frac{X - \\mu}{\\sigma} = \\frac{${x} - ${mu}}{${sigma}} = ${z.toFixed(3)}$
          </div>
        </div>
        <div style="font-size:12px; line-height:1.5; padding:10px 12px; background:var(--paper-subtle); border-left:3.5px solid #3B82F6; border-radius:6px; color:var(--text-color);">
          💡 <strong>해석:</strong> Z-Score 변환 후 데이터의 평균은 <strong>0</strong>, 표준편차는 <strong>1</strong>이 됩니다. (이상치 판별 기준: $|z| \\ge 3$)
        </div>
      `;
    }

    // 4. R2
    const sse = parseFloat(document.getElementById("calcInputSSE")?.value || 0);
    const sst = parseFloat(document.getElementById("calcInputSST")?.value || 1);
    const r2 = sst !== 0 ? 1 - (sse / sst) : 0;

    const resR2 = document.getElementById("calcR2Result");
    if (resR2) {
      resR2.innerHTML = `
        <div style="padding:14px; background:var(--surface); border:1.5px solid var(--line-bold); border-radius:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:13px; font-weight:800;">📐 결정계수 ($R^2$) 설명력</span>
            <span style="font-size:22px; font-weight:950; color:#10B981;">$R^2 = ${r2.toFixed(3)}$ (${(r2 * 100).toFixed(1)}%)</span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:6px;">
            공식: $R^2 = 1 - \\frac{SSE}{SST} = 1 - \\frac{${sse}}{${sst}} = ${r2.toFixed(3)}$
          </div>
        </div>
        <div style="font-size:12px; line-height:1.5; padding:10px 12px; background:var(--paper-subtle); border-left:3.5px solid #10B981; border-radius:6px; color:var(--text-color);">
          🎯 <strong>해석:</strong> 총변동(SST) 중 회귀 모형이 <strong>${(r2 * 100).toFixed(1)}%</strong>를 설명할 수 있음을 의미합니다. (관계: $SST = SSR + SSE$)
        </div>
      `;
    }

    // Render KaTeX in updated calc panes if renderMathInElement is available
    if (typeof window.renderMathInElement === "function" && calcToolModal) {
      window.renderMathInElement(calcToolModal, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  // ==========================================
  // 16. EXAM HALL 10-MIN FLASH CHEATSHEET & PASS WEAPONS
  // ==========================================
  const FLASH_ITEMS = [
    // 🎯 1초 킬러 단골 함정 50선 (traps: T1 ~ T50)
    // --- 1과목: 빅데이터 기획 & 거버넌스 (T1 ~ T10) ---
    {
      id: "T1",
      category: "traps",
      subject: 1,
      title: "DIKW 피라미드 계층 역전 함정",
      body: "• <span class='point-hl'>데이터</span>: 순수한 수치/기호 (예: 우유 2,000원)<br>• <span class='point-hl'>정보</span>: 데이터 간 관계/의미 도출 (예: A마트 우유가 더 싸다)<br>• <span class='point-hl'>지식</span>: 정보의 체화 및 행동 가이드 (예: A마트에서 우유를 사야겠다)<br>• <span class='point-hl'>지혜</span>: 창의적 통찰/아이디어 (예: 가격 차이를 활용한 할인앱 기획)<br><span class='trap-hl'>함정: 단순 가격 비교는 지식이 아닌 '정보(Information)'임!</span>"
    },
    {
      id: "T2",
      category: "traps",
      subject: 1,
      title: "가명정보 vs 익명정보의 법적 지위",
      body: "• <span class='point-hl'>가명정보</span>: 추가 정보 결합 없이는 식별 불가 ➔ 통계작성, 과학적 연구에 동의 없이 활용 가능 (<span class='trap-hl'>개인정보보호법 적용 대상</span>).<br>• <span class='point-hl'>익명정보</span>: 영구히 개인 식별 불가 ➔ <span class='point-hl'>개인정보보호법 적용 완전 제외</span>."
    },
    {
      id: "T3",
      category: "traps",
      subject: 1,
      title: "분석 기획의 4대 접근 유형 (What vs How)",
      body: "• <span class='point-hl'>최적화 (Optimization)</span>: What(대상) O, How(방법) O<br>• <span class='point-hl'>솔루션 (Solution)</span>: What(대상) O, How(방법) X<br>• <span class='point-hl'>통찰 (Insight)</span>: What(대상) X, How(방법) O<br>• <span class='point-hl'>발견 (Discovery)</span>: What(대상) X, How(방법) X"
    },
    {
      id: "T4",
      category: "traps",
      subject: 1,
      title: "개인정보 비식별 3형제 방어 공격",
      body: "• <span class='point-hl'>K-익명성</span>: 동일 준식별자 레코드가 최소 K개 존재.<br>• <span class='point-hl'>L-다양성</span>: 민감정보가 최소 L개 이상 다양 ➔ <span class='point-hl'>동질성 공격, 배경지식 공격 방어</span>.<br>• <span class='point-hl'>T-근접성</span>: 민감정보 분포가 전체와 T 이하 차이 ➔ <span class='point-hl'>쏠림 공격, 왜곡 공격 방어</span>."
    },
    {
      id: "T5",
      category: "traps",
      subject: 1,
      title: "CRISP-DM vs KDD 분석 방법론 절차",
      body: "• <span class='point-hl'>CRISP-DM (6단계)</span>: 업무 이해 ➔ 데이터 이해 ➔ 데이터 준비 ➔ 모델링 ➔ 평가 ➔ 전개.<br>• <span class='point-hl'>KDD (5단계)</span>: 데이터셋 선택 ➔ 전처리 ➔ 변환 ➔ 데이터마이닝 ➔ 해석/평가.<br><span class='trap-hl'>함정: CRISP-DM의 '데이터 준비'와 '모델링'은 피드백 루프를 가짐!</span>"
    },
    {
      id: "T6",
      category: "traps",
      subject: 1,
      title: "데이터 거버넌스 구성 3대 요소",
      body: "• <span class='point-hl'>조직 (Organization)</span>: 전담 부서 및 데이터 관리자(Data Steward)<br>• <span class='point-hl'>프로세스 (Process)</span>: 데이터 생명주기 관리 및 표준화 절차<br>• <span class='point-hl'>시스템/기술 (Technology)</span>: 메타데이터 관리, 마스터 데이터 관리(MDM)"
    },
    {
      id: "T7",
      category: "traps",
      subject: 1,
      title: "하향식(Top-Down) vs 상향식(Bottom-Up) 기획",
      body: "• <span class='point-hl'>하향식</span>: 문제가 주어지고 답을 찾는 방식 (문제 탐색 ➔ 정의 ➔ 해결방안 도출 ➔ 타당성 검토).<br>• <span class='point-hl'>상향식</span>: 데이터를 탐색하며 숨겨진 가치를 발굴하는 방식.<br><span class='trap-hl'>디자인 씽킹: 상향식 발산(Divergence) + 하향식 수렴(Convergence)의 반복 결합!</span>"
    },
    {
      id: "T8",
      category: "traps",
      subject: 1,
      title: "빅데이터 3V + 2V 구분",
      body: "• 초기 3V: <span class='point-hl'>규모(Volume), 속도(Velocity), 다양성(Variety)</span><br>• 확장 5V: <span class='point-hl'>+ 가치(Value), 정확성/신뢰성(Veracity)</span><br><span class='trap-hl'>함정: 가트너 초기 정의 3V에 Value나 Veracity가 들어간 보기는 오답!</span>"
    },
    {
      id: "T9",
      category: "traps",
      subject: 1,
      title: "분석 마스터 플랜 우선순위 도출 기준",
      body: "• <span class='point-hl'>전략적 중요도 (시급성)</span>: 전략적 타당성, 비즈니스 효과 (ROI)<br>• <span class='point-hl'>실행 용이성 (난이도)</span>: 데이터 획득성, 기술적 성숙도, 분석 비용<br><span class='trap-hl'>시급성 높고 난이도 낮은 과제 ➔ 최우선(1순위) 추진!</span>"
    },
    {
      id: "T10",
      category: "traps",
      subject: 1,
      title: "데이터 성숙도(CMMI 기반) 5단계",
      body: "1단계(도입) ➔ 2단계(활용) ➔ 3단계(확산) ➔ 4단계(최적화) ➔ 5단계(지속개선). 부서 간 데이터가 공유되고 표준화되는 단계는 <span class='point-hl'>3단계(확산)</span>."
    },

    // --- 2과목: 빅데이터 탐색 & 통계 분석 (T11 ~ T23) ---
    {
      id: "T11",
      category: "traps",
      subject: 2,
      title: "결측치 3대 메커니즘 (MCAR vs MAR vs MNAR)",
      body: "• <span class='point-hl'>MCAR (완전 무작위)</span>: 결측이 다른 모든 변수 및 값과 무관 (삭제해도 편향 없음).<br>• <span class='point-hl'>MAR (무작위)</span>: 결측이 다른 관측 변수와 연관됨.<br>• <span class='trap-hl'>MNAR (비무작위)</span>: 결측된 이유 자체가 해당 변수의 값과 연관 (고소득자의 소득 미응답). 삭제 시 극심한 편향 발생."
    },
    {
      id: "T12",
      category: "traps",
      subject: 2,
      title: "IQR(사분위수 범위) 이상치 판정 경계",
      body: "• <span class='point-hl'>IQR = Q3 - Q1</span><br>• <span class='point-hl'>하한: Q1 - 1.5 × IQR</span><br>• <span class='point-hl'>상한: Q3 + 1.5 × IQR</span><br><span class='trap-hl'>함정: 중앙값(Q2)에 1.5 IQR을 더하거나 빼는 공식은 단골 오답!</span>"
    },
    {
      id: "T13",
      category: "traps",
      subject: 2,
      title: "Z-Score 표준화와 3-시그마 법칙",
      body: "• <span class='point-hl'>z = (X - μ) / σ</span> (평균 0, 분산 1 변환)<br>• 정규분포에서 <span class='point-hl'>|z| ≥ 3</span>인 데이터는 약 0.3% 확률에 해당하므로 이상치로 판별.<br><span class='trap-hl'>Min-Max는 이상치에 극도로 취약하나, Z-Score는 이상치 탐지에 효과적.</span>"
    },
    {
      id: "T14",
      category: "traps",
      subject: 2,
      title: "왜도(Skewness)와 평균·중앙값·최빈값 대소관계",
      body: "• <span class='point-hl'>우측 꼬리 (Positive Skew, 왜도 > 0)</span>: <span class='point-hl'>평균 > 중앙값 > 최빈값</span><br>• <span class='point-hl'>좌측 꼬리 (Negative Skew, 왜도 < 0)</span>: <span class='point-hl'>최빈값 > 중앙값 > 평균</span><br><span class='trap-hl'>정규분포: 평균 = 중앙값 = 최빈값 (왜도 = 0, 첨도 = 3)</span>"
    },
    {
      id: "T15",
      category: "traps",
      subject: 2,
      title: "가설검정 p-value와 기각역 판정 규칙",
      body: "• <span class='point-hl'>p-value < 유의수준(α=0.05)</span> ➔ <span class='point-hl'>귀무가설(H₀) 기각</span>, 대립가설(H₁) 채택 (통계적 유의차 있음).<br>• <span class='trap-hl'>p-value ≥ α</span> ➔ 귀무가설 기각 불가 (H₀ 유지)."
    },
    {
      id: "T16",
      category: "traps",
      subject: 2,
      title: "1종 오류(α) vs 2종 오류(β)와 검정력(1-β)",
      body: "• <span class='point-hl'>1종 오류 (α)</span>: 귀무가설이 참인데 잘못 기각한 위양성 (<span class='trap-hl'>더 치명적</span>).<br>• <span class='point-hl'>2종 오류 (β)</span>: 대립가설이 참인데 귀무가설을 채택한 위음성.<br>• <span class='point-hl'>검정력 (Power = 1 - β)</span>: 대립가설이 참일 때 올바르게 귀무가설을 기각할 확률."
    },
    {
      id: "T17",
      category: "traps",
      subject: 2,
      title: "피어슨 vs 스피어만 vs 켄달 상관계수",
      body: "• <span class='point-hl'>피어슨(Pearson)</span>: 모수적, 연속형 변수 간 <span class='point-hl'>선형적 관계</span> (이상치에 민감).<br>• <span class='point-hl'>스피어만(Spearman)</span>: 비모수적, 순위 척도 간 <span class='point-hl'>단조적 관계</span> (이상치에 로버스트).<br>• <span class='point-hl'>켄달(Kendall)</span>: 순위 쌍(Concordant/Discordant)의 일치 비율."
    },
    {
      id: "T18",
      category: "traps",
      subject: 2,
      title: "중심극한정리(CLT)의 진짜 의미",
      body: "모집단의 분포 형태와 상관없이, 표본 크기($n \\ge 30$)가 충분히 크면 <span class='point-hl'>'표본 평균(Sample Mean)들의 분포'가 정규분포에 근사</span>함.<br><span class='trap-hl'>함정: 원 데이터나 모집단 자체가 정규분포로 바뀌는 것이 아님!</span>"
    },
    {
      id: "T19",
      category: "traps",
      subject: 2,
      title: "표본추출 4대 확률표본추출법 구분",
      body: "• <span class='point-hl'>단순무작위</span>: 난수표/제비뽑기로 무작위 추출.<br>• <span class='point-hl'>계통추출</span>: 첫 번째만 무작위 선정 후 k번째 간격마다 추출.<br>• <span class='point-hl'>층화추출</span>: <span class='point-hl'>집단 내 동질, 집단 간 이질</span> (학년별, 성별 비율 배분).<br>• <span class='point-hl'>군집추출</span>: <span class='point-hl'>집단 내 이질, 집단 간 동질</span> (학급/동 전체 조사)."
    },
    {
      id: "T20",
      category: "traps",
      subject: 2,
      title: "주성분분석(PCA)의 본질과 축의 직교성",
      body: "서로 상관관계가 있는 변수들을 결합하여 <span class='point-hl'>서로 독립(직교)인 새로운 주성분</span>으로 축소.<br>• 제1주성분이 분산(정보량)을 가장 많이 설명.<br>• 주성분 간 상관계수는 <span class='point-hl'>0</span>.<br><span class='trap-hl'>차원의 저주와 다중공선성 문제를 동시에 해결!</span>"
    },
    {
      id: "T21",
      category: "traps",
      subject: 2,
      title: "다중공선성 진단 VIF 공식",
      body: "• <span class='point-hl'>VIF = 1 / (1 - R²)</span><br>• <span class='point-hl'>VIF ≥ 10</span>이면 다중공선성 존재로 판단.<br>💡 해결책: 상관성 높은 변수 제거, PCA 차원축소, 릿지(L2) 회귀 적용."
    },
    {
      id: "T22",
      category: "traps",
      subject: 2,
      title: "차원축소 t-SNE vs PCA",
      body: "• <span class='point-hl'>PCA</span>: 선형적 전역 구조 보존, 주성분 간 직교, 모델링 전처리에 주로 활용.<br>• <span class='point-hl'>t-SNE</span>: 비선형적 국소 구조(거리) 보존, <span class='point-hl'>2~3차원 고차원 시각화 전용</span> (새로운 데이터 변환 적용 불가)."
    },
    {
      id: "T23",
      category: "traps",
      subject: 2,
      title: "정규성 검정 3대 방법",
      body: "• 시각적: <span class='point-hl'>Q-Q Plot</span> (점들이 대각선 45도 직선에 정렬되면 정규성 만족).<br>• 통계적: <span class='point-hl'>Shapiro-Wilk 검정 (소표본), Kolmogorov-Smirnov 검정 (대표본)</span>.<br><span class='trap-hl'>정규성 검정의 귀무가설(H₀): '데이터가 정규분포를 따른다' (p > 0.05여야 정규분포 인정).</span>"
    },

    // --- 3과목: 빅데이터 모델링 & 머신러닝 (T24 ~ T38) ---
    {
      id: "T24",
      category: "traps",
      subject: 3,
      title: "L1 Lasso vs L2 Ridge 규제의 본질 차이",
      body: "• <span class='point-hl'>L1 라쏘 (Lasso)</span>: 가중치 절댓값 합 페널티 ➔ 불필요한 계수를 <span class='point-hl'>정확히 0</span>으로 만들어 <span class='point-hl'>변수 선택(Feature Selection)</span> 수행.<br>• <span class='point-hl'>L2 릿지 (Ridge)</span>: 가중치 제곱합 페널티 ➔ 계수를 0에 가깝게 축소하되 0으로 만들지는 않음 (다중공선성 완화)."
    },
    {
      id: "T25",
      category: "traps",
      subject: 3,
      title: "배깅(Bagging) vs 부스팅(Boosting)의 오류 감소",
      body: "• <span class='point-hl'>배깅 (랜덤포레스트)</span>: 복원추출 병렬 학습 ➔ <span class='point-hl'>분산(Variance) 감소</span> (과적합 완화).<br>• <span class='point-hl'>부스팅 (XGBoost, LightGBM)</span>: 오차에 가중치 순차 학습 ➔ <span class='point-hl'>편향(Bias) 감소</span> (성능 극대화, 이상치에 민감)."
    },
    {
      id: "T26",
      category: "traps",
      subject: 3,
      title: "로지스틱 회귀분석 계수 해석과 오즈비(Odds Ratio)",
      body: "• 로짓 변환: $\\ln(\\text{Odds}) = \\beta_0 + \\beta_1 X$<br>• 독립변수 $X$가 1단위 증가할 때 성공 오즈(Odds)는 <span class='point-hl'>$e^{\\beta_1}$배</span> 증가함.<br><span class='trap-hl'>함정: 계수 $\\beta_1$배 증가가 아니라 'e의 $\\beta_1$제곱' 배 증가임!</span>"
    },
    {
      id: "T27",
      category: "traps",
      subject: 3,
      title: "의사결정나무 분할 알고리즘 매칭",
      body: "• <span class='point-hl'>CART</span>: 지니지수 (Gini Index), 분산 감소량<br>• <span class='point-hl'>C4.5 / C5.0</span>: 엔트로피, 정보획득률 (Information Gain Ratio)<br>• <span class='point-hl'>CHAID</span>: 카이제곱 통계량, F-검정"
    },
    {
      id: "T28",
      category: "traps",
      subject: 3,
      title: "의사결정나무 가지치기(Pruning)의 목적",
      body: "모든 훈련 데이터를 완벽하게 분류하면 트리가 과도하게 깊어져 <span class='trap-hl'>과적합(Overfitting)</span>이 발생함.<br>➔ 사전에 최대 깊이를 제한하거나 사후에 불필요한 마디를 제거(가지치기)하여 <span class='point-hl'>일반화 성능(Generalization)</span>을 극대화."
    },
    {
      id: "T29",
      category: "traps",
      subject: 3,
      title: "SVM의 C값과 Gamma 하이퍼파라미터",
      body: "• <span class='point-hl'>C (Cost)</span>: 클수록 이상치 불허(하드마진 ➔ 과적합), 작을수록 소프트마진(과소적합).<br>• <span class='point-hl'>Gamma (RBF 커널)</span>: 클수록 결정 경계가 복잡/굴곡(과적합), 작을수록 단순(과소적합)."
    },
    {
      id: "T30",
      category: "traps",
      subject: 3,
      title: "DBSCAN 군집분석 vs K-means",
      body: "• <span class='point-hl'>DBSCAN</span>: 밀도 기반, <span class='point-hl'>군집 수(k) 사전 지정 불필요</span>, 기하학적 형태 군집화 가능, 노이즈(이상치) 자동 분리.<br>• <span class='point-hl'>K-means</span>: 거리 기반, 군집 수(k) 지정 필수, 이상치에 취약, 볼록한 구형 군집 가정."
    },
    {
      id: "T31",
      category: "traps",
      subject: 3,
      title: "계층적 군집분석의 거리 측정법 4가지",
      body: "• <span class='point-hl'>단일연결법</span>: 군집 간 최단거리 (사슬효과 발생 위험).<br>• <span class='point-hl'>완전연결법</span>: 군집 간 최장거리 (콤팩트한 군집).<br>• <span class='point-hl'>평균연결법</span>: 모든 쌍의 평균 거리.<br>• <span class='point-hl'>와드연결법 (Ward)</span>: 군집 내 <span class='point-hl'>오차제곱합(SSE)의 증가량을 최소화</span>하는 방향으로 병합."
    },
    {
      id: "T32",
      category: "traps",
      subject: 3,
      title: "인공신경망 활성화 함수 (Sigmoid vs ReLU vs Softmax)",
      body: "• <span class='point-hl'>Sigmoid</span>: 출력값 0~1. 은닉층이 깊어지면 <span class='trap-hl'>기울기 소실(Vanishing Gradient)</span> 발생.<br>• <span class='point-hl'>ReLU</span>: $\\max(0, x)$. 양수 영역 기울기 1로 기울기 소실 해결 (가장 대중적).<br>• <span class='point-hl'>Softmax</span>: 다중 분류 출력층, 모든 출력값의 합이 <span class='point-hl'>1.0</span>인 확률값으로 변환."
    },
    {
      id: "T33",
      category: "traps",
      subject: 3,
      title: "딥러닝 과적합 방지 4대 핵심 기법",
      body: "1. <span class='point-hl'>드롭아웃 (Dropout)</span>: 학습 시 뉴런을 무작위로 비활성화.<br>2. <span class='point-hl'>조기 종료 (Early Stopping)</span>: 검증 손실이 증가하기 시작할 때 학습 중단.<br>3. <span class='point-hl'>가중치 감쇠 (Weight Decay)</span>: 가중치 L1/L2 페널티 부과.<br>4. <span class='point-hl'>배치 정규화 (Batch Normalization)</span>: 레이어 입력 분포를 정규화하여 학습 안정화."
    },
    {
      id: "T34",
      category: "traps",
      subject: 3,
      title: "CNN 풀링(Pooling) 레이어의 본질",
      body: "• <span class='point-hl'>Max Pooling / Avg Pooling</span>: 특성 맵의 크기를 줄여 연산량 감소 및 평행이동 불변성 확보.<br><span class='trap-hl'>함정: 풀링 계층은 가중치(학습 파라미터)가 전혀 없음!</span>"
    },
    {
      id: "T35",
      category: "traps",
      subject: 3,
      title: "RNN의 장기의존성 문제와 LSTM 게이트 3개",
      body: "기본 RNN은 시퀀스가 길면 기울기 소실 발생 ➔ LSTM은 Cell State와 3개 게이트로 장기 기억 해결:<br>• <span class='point-hl'>Forget Gate</span>: 과거 정보 버릴 비율 결정.<br>• <span class='point-hl'>Input Gate</span>: 현재 새 정보 저장 비율 결정.<br>• <span class='point-hl'>Output Gate</span>: 최종 출력값 결정."
    },
    {
      id: "T36",
      category: "traps",
      subject: 3,
      title: "자가조직지도(SOM)의 비지도 경쟁 학습",
      body: "신경망 기반 비지도 학습. 경쟁층에서 입력 벡터와 가장 가까운 <span class='point-hl'>승자 뉴런(BMU)</span> 하나만 선택하는 <span class='point-hl'>승자 독식(Winner-Takes-All)</span> 방식으로 고차원 데이터를 2차원 위상 격자로 압축."
    },
    {
      id: "T37",
      category: "traps",
      subject: 3,
      title: "앙상블 보팅(Voting)의 하드 vs 소프트",
      body: "• <span class='point-hl'>하드 보팅 (Hard)</span>: 다수결 원칙 (가장 많은 표를 받은 클래스 선택).<br>• <span class='point-hl'>소프트 보팅 (Soft)</span>: 각 모델이 예측한 클래스별 <span class='point-hl'>확률의 평균</span>이 가장 높은 클래스 선택 (일반적으로 성능 우수)."
    },
    {
      id: "T38",
      category: "traps",
      subject: 3,
      title: "랜덤포레스트의 Out-of-Bag (OOB) 검증",
      body: "부트스트랩(복원추출) 수행 시 전체 데이터의 약 <span class='point-hl'>63.2%</span>만 추출되고 <span class='point-hl'>36.8%는 비추출(OOB)</span>로 남음 ➔ 별도의 검증 데이터셋 없이 OOB로 모델의 일반화 성능 자체 검증 가능."
    },

    // --- 4과목: 빅데이터 결과해석 & 평가 (T39 ~ T50) ---
    {
      id: "T39",
      category: "traps",
      subject: 4,
      title: "정밀도(Precision) vs 재현율(Recall) 트레이드오프",
      body: "분류 임계값(Threshold)을 낮추면:<br>➔ Positive 예측이 많아져 <span class='point-hl'>재현율(Recall) 상승, 정밀도(Precision) 하락</span>.<br>• <span class='point-hl'>암 진단, 화재 감지</span>: 재현율(Recall) 최우선 (FN 최소화).<br>• <span class='point-hl'>스팸 메일, 유죄 판결</span>: 정밀도(Precision) 최우선 (FP 최소화)."
    },
    {
      id: "T40",
      category: "traps",
      subject: 4,
      title: "ROC 곡선의 X축과 Y축 & AUC 면적",
      body: "• <span class='point-hl'>X축: 1 - 특이도 (FPR = FP / (TN + FP))</span><br>• <span class='point-hl'>Y축: 민감도/재현율 (TPR = TP / (TP + FN))</span><br>• 대각선 $AUC = 0.5$ (무작위 찍기), $1.0$에 가까울수록 완벽한 모델."
    },
    {
      id: "T41",
      category: "traps",
      subject: 4,
      title: "향상도 곡선 (Lift Chart)의 기준선 1.0",
      body: "• $Lift = \\text{해당 등급의 반응률} / \\text{전체 반응률}$<br>• <span class='point-hl'>Lift > 1</span>: 모델을 적용하여 타겟 마케팅 시 무작위 추출 대비 우수한 성과.<br>• $Lift = 1$: 무작위 추출과 동일."
    },
    {
      id: "T42",
      category: "traps",
      subject: 4,
      title: "회귀 평가 지표 4가지 구분 (MSE vs RMSE vs MAE vs MAPE)",
      body: "• <span class='point-hl'>MSE / RMSE</span>: 오차 제곱 ➔ <span class='trap-hl'>큰 이상치에 민감하게 페널티 부과</span>.<br>• <span class='point-hl'>MAE</span>: 오차 절댓값 ➔ 이상치에 덜 민감(로버스트).<br>• <span class='point-hl'>MAPE</span>: 백분율 오차율 ➔ 직관적 비교 가능하나 0 분모 에러 주의."
    },
    {
      id: "T43",
      category: "traps",
      subject: 4,
      title: "실루엣 계수(Silhouette)의 값 범위와 의미",
      body: "• 값 범위: <span class='point-hl'>-1 ≤ s(i) ≤ +1</span><br>• <span class='point-hl'>+1에 근접</span>: 군집 내 응집도 높고 타 군집과 분리도 최상.<br>• <span class='trap-hl'>-1에 근접</span>: 데이터가 완전히 엉뚱한 군집에 할당됨(오분류)."
    },
    {
      id: "T44",
      category: "traps",
      subject: 4,
      title: "층화 K-Fold (Stratified K-Fold)의 필수 적용처",
      body: "타겟 클래스 불균형(예: 정상 95%, 사기 5%)이 심할 때, 각 Fold마다 <span class='point-hl'>원본 타겟 클래스의 비율을 동일하게 유지</span>하며 분할하는 필수 교차검증 기법."
    },
    {
      id: "T45",
      category: "traps",
      subject: 4,
      title: "불균형 데이터 오버샘플링 SMOTE 원리",
      body: "소수 클래스 데이터를 단순히 복제하는 것이 아니라, <span class='point-hl'>K-최근접 이웃(KNN) 간의 선분 위에 가상의 새로운 소수 클래스 데이터를 생성(보간)</span>하여 과적합을 방지하는 알고리즘."
    },
    {
      id: "T46",
      category: "traps",
      subject: 4,
      title: "연관성 분석(Apriori) 3대 평가 지표",
      body: "• <span class='point-hl'>지지도 (Support)</span>: $P(A \\cap B)$ (전체 중 A, B 동시 구매 비율)<br>• <span class='point-hl'>신뢰도 (Confidence)</span>: $P(B|A) = P(A \\cap B) / P(A)$ (A 샀을 때 B도 살 확률)<br>• <span class='point-hl'>향상도 (Lift)</span>: $P(A \\cap B) / [P(A)P(B)]$ (1보다 커야 양의 상관관계)"
    },
    {
      id: "T47",
      category: "traps",
      subject: 4,
      title: "설명 가능한 AI (XAI)의 SHAP vs LIME",
      body: "• <span class='point-hl'>SHAP</span>: 게임이론의 Shapley Value 기반, 대역적(Global) 및 국소적(Local) 특성 기여도 모두 측정 (공리 만족).<br>• <span class='point-hl'>LIME</span>: 예측 대상 주변에 국소 대리 모형(선형 모델)을 만들어 국소적(Local)으로 설명."
    },
    {
      id: "T48",
      category: "traps",
      subject: 4,
      title: "데이터 시각화 차트 매칭 함정",
      body: "• <span class='point-hl'>시계열 추세</span>: 꺾은선 그래프 (Line Chart)<br>• <span class='point-hl'>전체 대비 구성 비율</span>: 파이/도넛 차트, 트리맵<br>• <span class='point-hl'>분포 및 이상치</span>: 박스플롯 (Box Plot), 히스토그램<br>• <span class='point-hl'>두 연속형 변수 간 관계</span>: 산점도 (Scatter Plot)"
    },
    {
      id: "T49",
      category: "traps",
      subject: 4,
      title: "회귀모형 잔차분석 3대 플롯",
      body: "• <span class='point-hl'>잔차 vs 예측값 플롯</span>: 잔차가 0을 중심으로 무작위 분포해야 선형성 및 등분산성 만족.<br>• <span class='point-hl'>Q-Q Plot</span>: 점들이 직선에 정렬되어야 잔차의 정규성 만족.<br>• <span class='point-hl'>Cook's Distance</span>: 1 이상이면 회귀모형을 크게 왜곡하는 영향점(Influential Point)."
    },
    {
      id: "T50",
      category: "traps",
      subject: 4,
      title: "과적합(Overfitting) vs 과소적합(Underfitting) 진단",
      body: "• <span class='point-hl'>과적합 (High Variance)</span>: 훈련 오차는 매우 낮으나 검증 오차가 급증 ➔ 드롭아웃, L1/L2 규제, 데이터 증강으로 해결.<br>• <span class='point-hl'>과소적합 (High Bias)</span>: 훈련 오차와 검증 오차 둘 다 높음 ➔ 모델 복잡도 증가, 특성 추가로 해결."
    },

    // 📐 10초 암산 계산 공식 12선 (formulas: F1 ~ F12)
    {
      id: "F1",
      category: "formulas",
      subject: 4,
      title: "F1-Score (조화평균) 공식",
      body: "<span class='point-hl'>F1 = 2 × (Precision × Recall) / (Precision + Recall)</span><br>💡 암산 팁: 정밀도 0.8, 재현율 0.8이면 F1도 0.8. 둘의 차이가 클수록 작은 쪽에 더 끌려 내려감."
    },
    {
      id: "F2",
      category: "formulas",
      subject: 3,
      title: "오즈비 (Odds Ratio) 공식",
      body: "• <span class='point-hl'>Odds = p / (1 - p)</span> (성공확률 / 실패확률)<br>• <span class='point-hl'>Odds Ratio = Odds_A / Odds_B</span><br>💡 예: 약물 투여군의 성공확률이 0.8(오즈=4), 미투여군이 0.5(오즈=1)이면 오즈비는 4배."
    },
    {
      id: "F3",
      category: "formulas",
      subject: 3,
      title: "VIF (분산팽창요인) 계산 공식",
      body: "<span class='point-hl'>VIF = 1 / (1 - R²)</span><br>💡 암산 팁: 결정계수 R² = 0.9이면 VIF = 1 / 0.1 = <span class='point-hl'>10</span> (다중공선성 기준선). R² = 0.95이면 VIF = 20."
    },
    {
      id: "F4",
      category: "formulas",
      subject: 3,
      title: "지니 불순도 (Gini Impurity) 공식",
      body: "<span class='point-hl'>Gini = 1 - Σ(p_i²)</span><br>💡 이진 분류 암산: 50:50 분할이면 `1 - (0.5² + 0.5²) = 1 - 0.5 = 0.5` (최대 불순). 100:0이면 `1 - 1² = 0` (완전 순수)."
    },
    {
      id: "F5",
      category: "formulas",
      subject: 2,
      title: "Min-Max 정규화 (최대-최소 스케일링)",
      body: "<span class='point-hl'>x_norm = (x - Min) / (Max - Min)</span> (결과값 범위: 0 ~ 1)<br>💡 예: 데이터 범위 10~50에서 값 30의 정규화값은 `(30-10)/(50-10) = 20/40 = 0.5`."
    },
    {
      id: "F6",
      category: "formulas",
      subject: 2,
      title: "Z-Score 표준화 (Standardization)",
      body: "<span class='point-hl'>z = (x - μ) / σ</span> (평균 0, 표준편차 1로 변환)<br>💡 예: 평균 70, 표준편차 10일 때 90점의 z값은 `(90-70)/10 = +2.0`."
    },
    {
      id: "F7",
      category: "formulas",
      subject: 4,
      title: "재현율 (Recall / Sensitivity / TPR)",
      body: "<span class='point-hl'>Recall = TP / (TP + FN)</span> (실제 True 중 맞힌 True 비율)"
    },
    {
      id: "F8",
      category: "formulas",
      subject: 4,
      title: "정밀도 (Precision / PPV)",
      body: "<span class='point-hl'>Precision = TP / (TP + FP)</span> (True로 예측한 것 중 실제 True 비율)"
    },
    {
      id: "F9",
      category: "formulas",
      subject: 4,
      title: "특이도 (Specificity / TNR)",
      body: "<span class='point-hl'>Specificity = TN / (TN + FP)</span> (실제 False 중 맞힌 False 비율)<br>💡 1 - 특이도 = <span class='trap-hl'>FPR (위양성률 = FP / (TN + FP))</span>"
    },
    {
      id: "F10",
      category: "formulas",
      subject: 4,
      title: "정확도 (Accuracy)",
      body: "<span class='point-hl'>Accuracy = (TP + TN) / (TP + FP + FN + TN)</span> (전체 중 맞힌 비율)"
    },
    {
      id: "F11",
      category: "formulas",
      subject: 3,
      title: "회귀분석 결정계수 (R²)",
      body: "<span class='point-hl'>R² = SSR / SST = 1 - (SSE / SST)</span><br>• SSR(회귀제곱합) / SST(총제곱합). 1에 가까울수록 독립변수가 종속변수를 잘 설명함."
    },
    {
      id: "F12",
      category: "formulas",
      subject: 2,
      title: "유클리드 거리 vs 맨해튼 거리",
      body: "• <span class='point-hl'>유클리드</span>: `d = √[(x1-x2)² + (y1-y2)²]` (직선 최단거리)<br>• <span class='point-hl'>맨해튼</span>: `d = |x1-x2| + |y1-y2|` (격자 블록 이동거리)"
    },

    // ⭐ 과목별 A급 급소 10선 (agrade: A1 ~ A10)
    {
      id: "A1",
      category: "agrade",
      subject: 1,
      title: "1과목: 빅데이터 3V + 2V & 가명정보 처리",
      body: "• 3V: Volume(양), Velocity(속도), Variety(다양성) + Value(가치), Veracity(정확성)<br>• 가명정보: 추가 정보 없이는 특정 개인을 알아볼 수 없는 정보로 통계작성, 과학적 연구, 공익적 기록보존에 동의 없이 활용 가능."
    },
    {
      id: "A2",
      category: "agrade",
      subject: 1,
      title: "1과목: 분석 기획 4가지 유형 (도출 방식)",
      body: "• <span class='point-hl'>최적화(Optimization)</span>: 문제 O, 답 O<br>• <span class='point-hl'>솔루션(Solution)</span>: 문제 O, 답 X<br>• <span class='point-hl'>통찰(Insight)</span>: 문제 X, 답 O<br>• <span class='point-hl'>발견(Discovery)</span>: 문제 X, 답 X"
    },
    {
      id: "A3",
      category: "agrade",
      subject: 2,
      title: "2과목: 주성분분석(PCA)의 특징과 목적",
      body: "서로 상관관계가 있는 변수들을 결합하여 <span class='point-hl'>서로 독립인 주성분들로 축소</span>. 제1주성분이 분산(정보량)을 가장 많이 설명함. 차원의 저주 해결 및 다중공선성 해소 목적."
    },
    {
      id: "A4",
      category: "agrade",
      subject: 3,
      title: "3과목: 회귀분석의 기본 가정 4가지",
      body: "1. <span class='point-hl'>선형성</span>: 독립변수와 종속변수가 선형 관계<br>2. <span class='point-hl'>독립성</span>: 잔차끼리 상관관계가 없음 (Durbin-Watson 통계량 ≈ 2)<br>3. <span class='point-hl'>등분산성</span>: 잔차의 분산이 일정함<br>4. <span class='point-hl'>정규성</span>: 잔차가 정규분포를 따름 (Q-Q 플롯, 샤피로 검정)"
    },
    {
      id: "A5",
      category: "agrade",
      subject: 4,
      title: "4과목: k-fold 교차검증 & 부트스트랩",
      body: "• <span class='point-hl'>K-Fold</span>: 데이터를 k개로 분할하여 k-1개로 학습, 1개로 검증을 k번 반복 후 평균.<br>• <span class='point-hl'>부트스트랩(Bootstrap)</span>: 중복을 허용하는 복원추출. 원 데이터의 약 63.2%가 추출되고 36.8%는 비추출(Out-of-Bag, OOB 데이터)로 남아 자체 검증에 활용됨."
    },
    {
      id: "A6",
      category: "agrade",
      subject: 1,
      title: "1과목: 데이터 조직 구조 3가지 (집중 vs 기능 vs 분산)",
      body: "• <span class='point-hl'>집중형</span>: 전사 분석 전담조직이 전사 과제 총괄 (중복 배제, 현업 업무와 이원화 우려).<br>• <span class='point-hl'>기능형</span>: 각 현업 부서별로 분석 수행 (현업 특화, 전사적 표준화 및 시너지 부족).<br>• <span class='point-hl'>분산형</span>: 전담조직 인력을 각 현업 부서에 배치하여 협업 (우선순위 조율, 가장 균형적)."
    },
    {
      id: "A7",
      category: "agrade",
      subject: 2,
      title: "2과목: 분산분석(ANOVA)과 F-검정",
      body: "3개 이상 집단 간의 <span class='point-hl'>평균 차이 유의성</span> 검정. <span class='point-hl'>$F = \\text{집단 간 분산 (MSB)} / \\text{집단 내 분산 (MSW)}$</span>. F값이 클수록(p < 0.05) 적어도 한 집단의 평균이 유의미하게 다름."
    },
    {
      id: "A8",
      category: "agrade",
      subject: 3,
      title: "3과목: 앙상블 Stacking (스태킹) 모델링",
      body: "서로 다른 기본 모델들(Base Models)의 예측 결과를 <span class='point-hl'>새로운 메타 학습 데이터(Meta Features)로 생성</span>한 후, 메타 모델(Meta Learner)을 통해 최종 예측을 수행하는 고성능 앙상블 기법."
    },
    {
      id: "A9",
      category: "agrade",
      subject: 4,
      title: "4과목: 이항분포 ➔ 정규분포 근사 조건",
      body: "이항분포 $B(n, p)$에서 시행 횟수 $n$이 충분히 크고 <span class='point-hl'>$np \\ge 5$ 이고 $n(1-p) \\ge 5$</span>를 만족할 때, 평균 $np$, 분산 $np(1-p)$인 정규분포 $N(np, np(1-p))$에 근사함."
    },
    {
      id: "A10",
      category: "agrade",
      subject: 4,
      title: "4과목: 카이제곱(Chi-Square) 독립성 검정",
      body: "두 범주형 변수 간의 연관성/독립성 검정. $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$ ($O$: 관측빈도, $E$: 기대빈도). $\\chi^2$ 통계량이 크면(p < 0.05) 두 변수는 서로 독립이 아니라 <span class='point-hl'>유의미한 연관성이 있음</span>."
    }
  ];

  function setupPassRadarAndFlashEvents() {
    const homeSubjectBars = document.getElementById("homeSubjectBars");
    if (homeSubjectBars) {
      homeSubjectBars.addEventListener("click", e => {
        const drillBtn = e.target.closest(".s-radar-drill-btn");
        if (drillBtn) {
          const sub = drillBtn.dataset.subject;
          if (sub) {
            switchNav("practice");
            quizFilter = { subject: sub, round: "all", type: "all", difficulty: "all", importance: "all", tag: "all", keyword: "", conceptCardId: null, calcOnly: false, bookmarkedOnly: false, is12thOnly: false, is11thOnly: false, is10thOnly: false };
            applyQuizFilter();
            renderQuizzes(true);
            showToast(`🎯 [${SUBJECT_NAMES[sub]}] 과락 탈출 집중 훈련으로 이동했습니다!`);
          }
        }
      });
    }

    const openFlashBtn = document.getElementById("openExamFlashBtn");
    const openFlashHomeBtn = document.getElementById("openExamFlashHomeBtn");
    const closeFlashBtn = document.getElementById("closeExamFlashModalBtn");
    const closeFlashFooterBtn = document.getElementById("closeExamFlashFooterBtn");
    const flashModal = document.getElementById("examHallFlashModal");
    const flashSearchInput = document.getElementById("flashSearchInput");
    const clearFlashSearch = document.getElementById("clearFlashSearch");

    const openFlash = () => {
      if (flashModal) {
        flashModal.classList.remove("hidden");
        renderExamHallFlashItems();
      }
    };

    const closeFlash = () => {
      if (flashModal) flashModal.classList.add("hidden");
    };

    if (openFlashBtn) openFlashBtn.addEventListener("click", openFlash);
    if (openFlashHomeBtn) openFlashHomeBtn.addEventListener("click", openFlash);
    if (closeFlashBtn) closeFlashBtn.addEventListener("click", closeFlash);
    if (closeFlashFooterBtn) closeFlashFooterBtn.addEventListener("click", closeFlash);

    if (flashModal) {
      flashModal.addEventListener("click", e => {
        if (e.target === flashModal) closeFlash();
      });
    }

    // Flash Modal Category Tabs
    document.querySelectorAll(".flash-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".flash-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        flashCurrentCategory = btn.dataset.category || "traps";
        renderExamHallFlashItems();
      });
    });

    // Flash Modal Live Search
    if (flashSearchInput) {
      flashSearchInput.addEventListener("input", e => {
        flashSearchKeyword = e.target.value.trim().toLowerCase();
        if (clearFlashSearch) clearFlashSearch.classList.toggle("hidden", !flashSearchKeyword);
        renderExamHallFlashItems();
      });
    }

    if (clearFlashSearch && flashSearchInput) {
      clearFlashSearch.addEventListener("click", () => {
        flashSearchInput.value = "";
        flashSearchKeyword = "";
        clearFlashSearch.classList.add("hidden");
        renderExamHallFlashItems();
        flashSearchInput.focus();
      });
    }
  }

  function renderExamHallFlashItems() {
    const flashBody = document.getElementById("examFlashBody");
    if (!flashBody) return;

    let items = FLASH_ITEMS.filter(it => {
      if (flashCurrentCategory !== "all" && it.category !== flashCurrentCategory) return false;
      if (flashSearchKeyword) {
        const text = (it.title + " " + it.body).toLowerCase();
        return text.includes(flashSearchKeyword);
      }
      return true;
    });

    if (items.length === 0) {
      flashBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 800;">일치하는 킬러 키워드가 없습니다.</div>
        </div>
      `;
      return;
    }

    let html = "";
    items.forEach((item, idx) => {
      const catLabel = item.category === "traps" ? "🎯 단골 함정" : item.category === "formulas" ? "📐 계산 공식" : "⭐ A급 급소";
      const subName = SUBJECT_NAMES[item.subject] || `${item.subject}과목`;
      let subClass = `sub-${item.subject}`;

      html += `
        <div class="flash-item-card">
          <div class="flash-item-header">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span class="flash-subject-tag ${subClass}">${subName}</span>
              <span class="flash-item-title">${idx + 1}. ${escapeHTML(item.title)}</span>
            </div>
            <span class="flash-killer-tag">${catLabel}</span>
          </div>
          <div class="flash-item-body">
            ${item.body}
          </div>
        </div>
      `;
    });
    flashBody.innerHTML = html;
    renderMathFormulas(flashBody);
  }

  function setupSpeedHotkeys() {
    window.addEventListener("keydown", e => {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea") return;

      const quizView = document.getElementById("quiz-content");
      if (!quizView || quizView.classList.contains("hidden")) return;

      const quizCards = Array.from(document.querySelectorAll(".quiz-card"));
      if (quizCards.length === 0) return;

      let targetCard = null;
      const windowMiddle = window.innerHeight / 2;
      for (const card of quizCards) {
        const rect = card.getBoundingClientRect();
        if (rect.top <= windowMiddle && rect.bottom >= windowMiddle) {
          targetCard = card;
          break;
        }
      }
      if (!targetCard) targetCard = quizCards[0];

      // Key 1, 2, 3, 4: Select option
      if (["1", "2", "3", "4"].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        const optBtn = targetCard.querySelector(`.quiz-option[data-choice="${optIdx}"]`);
        if (optBtn && !optBtn.disabled) {
          e.preventDefault();
          optBtn.click();
        }
        return;
      }

      // Key R / r: Instant retry
      if (e.key === "r" || e.key === "R") {
        const retryBtn = targetCard.querySelector('[data-action="loop-retry"]');
        if (retryBtn) {
          e.preventDefault();
          retryBtn.click();
        }
        return;
      }

      // Key T / t: Open theory
      if (e.key === "t" || e.key === "T") {
        const theoryBtn = targetCard.querySelector('[data-action="loop-theory"]');
        if (theoryBtn) {
          e.preventDefault();
          theoryBtn.click();
        }
        return;
      }

      // Key Space: Move to next question
      if (e.code === "Space" && !e.target.closest("button")) {
        const nextCard = targetCard.nextElementSibling;
        if (nextCard && nextCard.classList.contains("quiz-card")) {
          e.preventDefault();
          nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }

  // ==========================================
  // 16-2. SMART RESET MODAL CONTROLLER
  // ==========================================
  function setupResetModalEvents() {
    const resetModal = document.getElementById("resetConfirmModal");
    const openBtn = document.getElementById("openResetModalBtn");
    const closeBtn = document.getElementById("closeResetModalBtn");
    const closeFooterBtn = document.getElementById("closeResetFooterBtn");
    const currentCountBadge = document.getElementById("resetCurrentCountBadge");
    const wrongCountBadge = document.getElementById("resetWrongCountBadge");

    const btnResetCurrent = document.getElementById("btnResetCurrentView");
    const btnResetWrong = document.getElementById("btnResetWrongOnly");
    const btnResetAll = document.getElementById("btnResetAllSolve");

    const openModal = () => {
      if (!resetModal) return;
      if (currentCountBadge) {
        currentCountBadge.textContent = `${workingQuizzes.length}문항`;
      }
      if (wrongCountBadge) {
        let wrongCount = 0;
        Object.values(cumulativeStats.quizzes || {}).forEach(q => {
          if (q.wrongCount > 0 && !q.mastered) wrongCount++;
        });
        wrongCountBadge.textContent = `${wrongCount}문항`;
      }
      resetModal.classList.remove("hidden");
    };

    const closeModal = () => {
      if (resetModal) resetModal.classList.add("hidden");
    };

    if (openBtn) openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeFooterBtn) closeFooterBtn.addEventListener("click", closeModal);

    if (resetModal) {
      resetModal.addEventListener("click", e => {
        if (e.target === resetModal) closeModal();
      });
    }

    // Option 1: Reset Current View Only
    if (btnResetCurrent) {
      btnResetCurrent.addEventListener("click", () => {
        const count = workingQuizzes.length;
        workingQuizzes.forEach(q => {
          practiceSolvedMap.delete(q.id);
          mockSolvedMap.delete(q.id);
          eliminatedOptionsMap.delete(q.id);
        });
        renderQuizzes(true);
        updatePracticeHud();
        closeModal();
        showToast(`🔄 현재 화면의 ${count}문항이 백지로 초기화되었습니다! 다시 풀어보세요.`);
      });
    }

    // Option 2: Reset Wrong Notes Only
    if (btnResetWrong) {
      btnResetWrong.addEventListener("click", () => {
        let resetCount = 0;
        Object.keys(cumulativeStats.quizzes || {}).forEach(id => {
          if (cumulativeStats.quizzes[id].wrongCount > 0 || cumulativeStats.quizzes[id].mastered) {
            resetCount++;
            cumulativeStats.quizzes[id].wrongCount = 0;
            cumulativeStats.quizzes[id].mastered = false;
            cumulativeStats.quizzes[id].correctStreak = 0;
          }
        });
        scheduleSave();
        updateHabitUI();
        updatePracticeHud();
        renderWrongNotesView("all");
        closeModal();
        showToast(`📕 오답노트 기록(${resetCount}문항)이 초기화되었습니다. 새로운 오답을 수집할 준비가 되었습니다!`);
      });
    }

    // Option 3: Full Reset
    if (btnResetAll) {
      btnResetAll.addEventListener("click", () => {
        if (confirm("정말로 전체 풀이 기록과 통계를 완전히 삭제하시겠습니까?\n(이 작업은 절대 되돌릴 수 없습니다!)")) {
          practiceSolvedMap.clear();
          mockSolvedMap.clear();
          eliminatedOptionsMap.clear();
          cumulativeStats = {
            totalSolved: 0,
            totalCorrect: 0,
            subjects: { 1: { solved: 0, correct: 0 }, 2: { solved: 0, correct: 0 }, 3: { solved: 0, correct: 0 }, 4: { solved: 0, correct: 0 } },
            concepts: {},
            quizzes: {}
          };
          saveJSON(STATS_KEY, cumulativeStats);
          updateHabitUI();
          renderQuizzes(true);
          updatePracticeHud();
          renderWrongNotesView("all");
          closeModal();
          showToast("🗑️ 전체 풀이 기록이 완전히 초기화되었습니다. 새로운 N회독을 응원합니다!");
        }
      });
    }
  }

  // ==========================================
  // 17. BOOTSTRAP APPLICATION
  // ==========================================
  initCalcTool();
  setupEventListeners();
  setupPassRadarAndFlashEvents();
  setupSpeedHotkeys();
  setupResetModalEvents();
  loadDataAndInit();
  if (window.aiTutor) {
    window.aiTutor.init();
  }
});
