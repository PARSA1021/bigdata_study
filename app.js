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
    } catch (e) {}
  }

  function updateGlobalReactivity() {
    updateHabitUI();
    if (currentNav === "home") {
      renderHome();
    } else if (currentNav === "stats") {
      renderStats();
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
    return function(...args) {
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
      cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 0, mastered: false, lastChosen: chosenIdx };
    }
    const qStat = cumulativeStats.quizzes[quiz.id];
    qStat.solved++;
    qStat.lastChosen = chosenIdx;
    if (isCorrect) {
      qStat.correct++;
      if (qStat.wrongCount > 0) qStat.mastered = true;
    } else {
      qStat.wrongCount++;
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

    renderHomeSubjectBars();

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


  function renderHomeSubjectBars() {
    if (!homeSubjectBars) return;
    let html = "";
    for (let s = 1; s <= 4; s++) {
      const stat = cumulativeStats.subjects[s] || { solved: 0, correct: 0 };
      const rate = stat.solved > 0 ? Math.round((stat.correct / stat.solved) * 100) : 0;
      const isDanger = stat.solved >= 5 && rate < 40;

      html += `
        <div class="subject-bar-card">
          <div class="sb-header">
            <span>${SUBJECT_NAMES[s]}</span>
            <span style="font-weight: 900;">${rate}% (${stat.solved}제) ${isDanger ? '<span class="sb-danger-tag">⚠️ 과락위험</span>' : ''}</span>
          </div>
          <div class="sb-track">
            <div class="sb-fill ${isDanger ? 'danger' : 'safe'}" style="width: ${rate}%;"></div>
          </div>
        </div>
      `;
    }
    homeSubjectBars.innerHTML = html;
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

    [homeView, notesView, quizContentView, wrongView, statsView].forEach(v => {
      if (v) v.classList.add("hidden");
    });

    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (targetNav === "home") {
      if (homeView) homeView.classList.remove("hidden");
      updateHabitUI();
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

  function applyQuizFilter() {
    workingQuizzes = allQuizzes.filter(q => {
      if (quizFilter.conceptCardId && q.cardId !== quizFilter.conceptCardId) return false;
      if (quizFilter.subject && quizFilter.subject !== "all" && q.subject !== parseInt(quizFilter.subject, 10)) return false;
      
      // Difficulty
      if (quizFilter.difficulty && quizFilter.difficulty !== "all") {
        if (quizFilter.difficulty === "medium" && (q.difficulty === "medium" || q.difficulty === "normal")) {
          // pass
        } else if (q.difficulty !== quizFilter.difficulty) {
          return false;
        }
      }

      // Importance
      if (quizFilter.importance && quizFilter.importance !== "all" && getImportanceGrade(q) !== quizFilter.importance) return false;

      // Round Filter (12, 11, 10, 4, practice, mock)
      if (quizFilter.round && quizFilter.round !== "all") {
        const qRound = getQuestionRound(q);
        if (quizFilter.round === "4") {
          if (qRound !== "4" && qRound !== "5" && qRound !== "6" && qRound !== "7" && qRound !== "8" && qRound !== "9") return false;
        } else {
          if (qRound !== quizFilter.round) return false;
        }
      }

      // Type Filter
      if (quizFilter.type && quizFilter.type !== "all") {
        if (quizFilter.type === "calc" && !isCalcQuestion(q)) return false;
        if (quizFilter.type === "gradeA" && getImportanceGrade(q) !== "A") return false;
        if (quizFilter.type === "bookmark" && !bookmarks.has(q.id)) return false;
      }

      if (quizFilter.calcOnly && !isCalcQuestion(q)) return false;
      if (quizFilter.bookmarkedOnly && !bookmarks.has(q.id)) return false;
      if (quizFilter.is12thOnly && getQuestionRound(q) !== "12") return false;
      if (quizFilter.is11thOnly && getQuestionRound(q) !== "11") return false;
      if (quizFilter.is10thOnly && getQuestionRound(q) !== "10") return false;
      if (quizFilter.tag && quizFilter.tag !== "all" && !q.question.includes(`[${quizFilter.tag}]`)) return false;

      if (quizFilter.keyword) {
        const kw = quizFilter.keyword.toLowerCase();
        const text = (q.question + " " + (q.explanation || "") + " " + (q.chapter || "") + " " + (q.choices || []).join(" ")).toLowerCase();
        if (!text.includes(kw)) return false;
      }
      return true;
    });
  }

  function renderQuizzes(reset = true) {
    if (!quizContainer) return;

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

    return `
      <div class="quiz-card" id="quiz-${quiz.id}" data-id="${quiz.id}">
        <div class="quiz-card-header">
          <div class="quiz-badges-group">
            <span class="quiz-subject-badge">${SUBJECT_NAMES[quiz.subject] || "과목"}</span>
            ${impBadge}
            ${diffBadge}
            ${isCalc ? '<span class="quiz-tag-badge" style="background:rgba(37,99,235,0.12); color:#2563EB;">🧮 계산</span>' : ''}
            ${quiz.chapter ? `<span class="quiz-subject-badge">${escapeHTML(quiz.chapter)}</span>` : ""}
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
              <button class="${optClass}" data-choice="${cIdx}" ${isAnswered && (currentMode !== "mock" || isMockSubmitted) ? "disabled" : ""}>
                <span class="option-num">${cIdx + 1}</span>
                <span>${escapeHTML(choice)}</span>
              </button>
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

            ${quiz.cardId ? `
              <div class="premium-concept-cta">
                <div class="cta-text">
                  <span class="cta-icon">💡</span>
                  <div class="cta-desc">
                    <strong>관련 핵심 개념 요약노트</strong>
                    <span>이 문제와 관련된 상세 이론을 확인하고 완벽히 마스터하세요!</span>
                  </div>
                </div>
                <button class="button button-brand view-concept-btn" data-card="${quiz.cardId}">
                  📖 요약노트 보기 ↗
                </button>
              </div>
            ` : ""}

            ${memo ? `
              <div style="background: var(--paper); border: 1px dashed var(--line-bold); border-radius: var(--radius-sm); padding: 10px; margin-top: 10px; font-size: 12px; font-weight: 700;">
                📝 <strong>내 암기 메모:</strong> ${escapeHTML(memo)}
              </div>
            ` : ""}
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
    if (preset === "11th") {
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
  function renderWrongNotesView(filter = "all") {
    if (!wrongListContainer) return;

    const wrongQuizzes = allQuizzes.filter(quiz => {
      const qStat = cumulativeStats.quizzes[quiz.id];
      return qStat && qStat.wrongCount > 0;
    });

    const activeWrong = wrongQuizzes.filter(q => !cumulativeStats.quizzes[q.id].mastered);
    const mastered = wrongQuizzes.filter(q => cumulativeStats.quizzes[q.id].mastered);
    const bookmarkedWrong = wrongQuizzes.filter(q => bookmarks.has(q.id));
    const highRisk = wrongQuizzes.filter(q => cumulativeStats.quizzes[q.id].wrongCount >= 2 && !cumulativeStats.quizzes[q.id].mastered);

    if (wrongTotalCount) wrongTotalCount.textContent = activeWrong.length;
    if (wrongMasteredCount) wrongMasteredCount.textContent = mastered.length;
    if (wrongBookmarkCount) wrongBookmarkCount.textContent = bookmarkedWrong.length;

    if (wfAllCount) wfAllCount.textContent = activeWrong.length;
    if (wfHighCount) wfHighCount.textContent = highRisk.length;
    if (wfBookCount) wfBookCount.textContent = bookmarkedWrong.length;

    let displayList = [];
    if (filter === "all") displayList = activeWrong;
    else if (filter === "high") displayList = highRisk;
    else if (filter === "bookmarks") displayList = bookmarkedWrong;
    else if (filter === "sub1") displayList = activeWrong.filter(q => q.subject === 1);
    else if (filter === "sub2") displayList = activeWrong.filter(q => q.subject === 2);
    else if (filter === "sub3") displayList = activeWrong.filter(q => q.subject === 3);
    else if (filter === "sub4") displayList = activeWrong.filter(q => q.subject === 4);

    if (displayList.length === 0) {
      wrongListContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1.5px solid var(--line);">
          <div style="font-size: 40px; margin-bottom: 12px;">🎉</div>
          <h3 style="font-size: 18px; font-weight: 950; margin-bottom: 8px;">오답 탈출 완료!</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
            해당 조건의 오답 문항이 없습니다. 기출문제를 풀며 실력을 계속 점검해보세요.
          </p>
          <button class="button button-brand" data-nav="practice">
            📝 새로운 기출문제 풀러가기
          </button>
        </div>
      `;
      return;
    }

    let html = "";
    displayList.forEach((quiz) => {
      const qStat = cumulativeStats.quizzes[quiz.id] || { wrongCount: 1, mastered: false };
      const memo = quizMemos[quiz.id] || "";

      html += `
        <div class="quiz-card" id="wrong-card-${quiz.id}" data-id="${quiz.id}" style="border-left: 5px solid ${qStat.wrongCount >= 2 ? 'var(--danger)' : '#F59E0B'};">
          <div class="quiz-card-header">
            <div class="quiz-badges-group">
              <span class="quiz-subject-badge">${SUBJECT_NAMES[quiz.subject]}</span>
              <span class="badge-tag" style="background: ${qStat.wrongCount >= 2 ? 'var(--danger-bg)' : '#FEF3C7'}; color: ${qStat.wrongCount >= 2 ? 'var(--danger)' : '#B45309'}; border:none;">
                ⚠️ ${qStat.wrongCount}회 오답
              </span>
              ${qStat.mastered ? '<span class="badge-tag" style="background:var(--success-bg); color:var(--success); border:none;">✓ 마스터 완료</span>' : ''}
            </div>
            <div class="quiz-actions-top">
              <span class="bookmark-star-btn ${bookmarks.has(quiz.id) ? 'bookmarked' : ''}" data-id="${quiz.id}">
                ${bookmarks.has(quiz.id) ? '★' : '☆'}
              </span>
            </div>
          </div>

          <div class="quiz-question-text">
            ${formatQuestionText(quiz.question)}
          </div>

          <div class="quiz-options-list">
            ${(quiz.choices || []).map((choice, cIdx) => `
              <button class="quiz-option wrong-retry-option" data-choice="${cIdx}">
                <span class="option-num">${cIdx + 1}</span>
                <span>${escapeHTML(choice)}</span>
              </button>
            `).join("")}
          </div>

          <div style="margin-top: 10px; text-align: right;">
            <button class="button button-sm button-light toggle-wrong-explain-btn" style="font-size: 12px; font-weight: 800; border-radius: var(--radius-pill);">
              💡 해설 및 출제 트랩 보기
            </button>
          </div>

          <div class="quiz-explanation-box" style="display: none; margin-top: 12px;">
            <div class="quiz-explanation-text">
              ${escapeHTML(quiz.explanation || "")}
            </div>

            ${quiz.memorizationPoint ? `
              <div class="keypoint-card">
                <div class="keypoint-card-header">
                  <span>🎯</span> <span>실제 기출 핵심 포인트 & 필수 암기</span>
                </div>
                <div class="keypoint-card-body">
                  ${escapeHTML(quiz.memorizationPoint)}
                </div>
              </div>
            ` : ""}

            ${quiz.examinerTip ? `
              <div class="examiner-tip-card">
                <div class="examiner-tip-header">
                  <span>💡</span> <span>출제위원의 비밀 꿀팁 & 함정 탈출법</span>
                </div>
                <div class="examiner-tip-body">
                  ${escapeHTML(quiz.examinerTip)}
                </div>
              </div>
            ` : ""}

            ${quiz.whyWrong && quiz.whyWrong.length > 0 ? `
              <div class="trap-breakdown-box">
                <div class="trap-breakdown-title">
                  ⚠️ 보기별 오답 함정(Trap) 분석
                </div>
                <ul class="trap-item-list">
                  ${quiz.whyWrong.map((why, wIdx) => {
                    if (wIdx === quiz.answer) return "";
                    return `<li><strong>${wIdx + 1}번 보기</strong>: ${escapeHTML(why)}</li>`;
                  }).join("")}
                </ul>
              </div>
            ` : ""}

            ${quiz.cardId ? `
              <div class="premium-concept-cta">
                <div class="cta-text">
                  <span class="cta-icon">💡</span>
                  <div class="cta-desc">
                    <strong>관련 핵심 개념 요약노트</strong>
                    <span>이 문제와 관련된 상세 이론을 확인하고 완벽히 마스터하세요!</span>
                  </div>
                </div>
                <button class="button button-brand view-concept-btn" data-card="${quiz.cardId}">
                  📖 요약노트 보기 ↗
                </button>
              </div>
            ` : ""}

            ${memo ? `
              <div style="background: var(--paper); border: 1px dashed var(--line-bold); border-radius: var(--radius-sm); padding: 10px; margin-top: 10px; font-size: 12px; font-weight: 700;">
                📝 <strong>내 암기 메모:</strong> ${escapeHTML(memo)}
              </div>
            ` : ""}
          </div>
        </div>
      `;
    });

    wrongListContainer.innerHTML = html;
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
            cardMap.set(card.id, card);
          });
        }
      });
    }

    allQuizzes.forEach(q => {
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
    
    const heroStartBtn = document.getElementById("heroStartPracticeBtn");
    if (heroStartBtn) {
      heroStartBtn.addEventListener("click", () => {
        switchNav("practice");
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
          switchNav("mock");
        } else {
          switchNav("practice");
        }
      });
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
    const debouncedNotesSearch = debounce((val) => handleNotesSearch(val), 120);
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
      }, {passive:true});

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
      }, {passive:true});

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

    function updateFilterChipBadges() {
      const subjectCounts = { all: allQuizzes.length, 1: 0, 2: 0, 3: 0, 4: 0 };
      const roundCounts = { all: allQuizzes.length, 12: 0, 11: 0, 10: 0, 4: 0, practice: 0, mock: 0 };
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
    bindPackBtn("btn12thExamPack", "🔥 12회 기출 복원 모드로 전환되었습니다!", f => f.is12thOnly = true);
    bindPackBtn("btn11thExamPack", "🏆 11회 기출 집중 모드로 전환되었습니다!", f => f.is11thOnly = true);
    bindPackBtn("btn10thExamPack", "🎯 10회 기출 집중 모드로 전환되었습니다!", f => f.is10thOnly = true);
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);
    bindPackBtn("btnBookmarkedOnly", "⭐ 나의 북마크 문제 모드로 전환되었습니다!", f => {
      if (bookmarks.size === 0) showToast("⚠️ 북마크(⭐)한 문제가 없습니다.");
      f.bookmarkedOnly = true;
    });

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
    const kwInput = document.getElementById("keywordSearch");
    
    const executeSearch = () => {
      if (kwInput) quizFilter.keyword = kwInput.value.trim();
      applyQuizFilter();
      renderQuizzes(true);
      updateMatchCount();
    };

    if (searchBtn) searchBtn.addEventListener("click", executeSearch);
    if (kwInput) {
      kwInput.addEventListener("keydown", e => {
        if (e.key === "Enter") executeSearch();
      });
    }

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
      const debouncedInline = debounce(val => handleNotesSearch(val), 100);
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

  // --- DELEGATION 1: Quiz Container ---
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

      // 4. Bookmark star button
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

      // 5. Flag button (CBT Mock)
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

      // 6. Option button click
      const optBtn = e.target.closest(".quiz-option");
      if (optBtn && !optBtn.disabled) {
        const card = optBtn.closest(".quiz-card");
        if (!card) return;
        const quizId = card.dataset.id;
        const choiceIdx = parseInt(optBtn.dataset.choice || optBtn.dataset.index, 10);
        if (isNaN(choiceIdx)) return;
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (!quiz) return;

        practiceSolvedMap.set(quizId, choiceIdx);
        const isCorrect = choiceIdx === quiz.answer;
        recordQuizAttempt(quiz, isCorrect, choiceIdx);
        const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
        card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);
        return;
      }

      // 7. View Concept button
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
    document.querySelectorAll(".theme-toggle-btn, .theme-btn").forEach(btn => {
      btn.setAttribute("title", isDark ? "라이트모드로 전환" : "다크모드로 전환");
      btn.setAttribute("aria-label", isDark ? "라이트모드로 전환" : "다크모드로 전환");
      const label = btn.querySelector(".theme-label");
      if (label) label.textContent = isDark ? "라이트모드" : "다크모드";
    });
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
    }, 2200);
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
    const resArr = [];
    const keywords = [
      { text: "적절하지 않은", cls: "keyword-danger" },
      { text: "아닌 것은",     cls: "keyword-danger" },
      { text: "틀린 것은",     cls: "keyword-danger" },
      { text: "거리가 먼",     cls: "keyword-danger" },
      { text: "옳지 않은",     cls: "keyword-danger" },
      { text: "가장 먼",       cls: "keyword-danger" },
      { text: "틀리게",        cls: "keyword-danger" },
      
      { text: "적절한 것은",   cls: "keyword-safe" },
      { text: "옳은 것은",     cls: "keyword-safe" },
      { text: "맞는 것은",     cls: "keyword-safe" },
      { text: "가장 올바른",   cls: "keyword-safe" }
    ];

    let processed = str;
    // VERY simplistic string search/highlight, assuming keywords are not part of HTML tags
    keywords.forEach(kw => {
      const re = new RegExp(kw.text, 'g');
      processed = processed.replace(re, `<strong class="${kw.cls}">${kw.text}</strong>`);
    });
    return processed;
  }

  function formatQuestionText(text, displayNum) {
    if (!text || typeof text !== "string") return "";

    const boxRegex = /(<보기>|\[보기\]|【보기】|<혼동행렬>|\[혼동행렬\]|<표>|\[표\]|<사례>|\[사례\])([\s\S]*)/i;
    const boxMatch = text.match(boxRegex);

    const numPrefix = displayNum ? `<strong style="color: var(--primary-accent); margin-right: 6px;">Q${displayNum}.</strong>` : "";

    if (boxMatch) {
      const mainQuestion = text.substring(0, boxMatch.index).trim();
      const boxTag = boxMatch[1].replace(/[<\[【>\]】]/g, '');
      const boxContent = boxMatch[2].trim();

      return `
        <div class="quiz-main-prompt">
          ${numPrefix}<span>${highlightTrapKeywords(escapeHTML(mainQuestion))}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">${escapeHTML(boxContent)}</div>
        </div>
      `;
    }

    return `
      <div class="quiz-main-prompt">
        ${numPrefix}<span>${highlightTrapKeywords(escapeHTML(text))}</span>
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
    reader.onload = function(evt) {
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
  // 17. BOOTSTRAP APPLICATION
  // ==========================================
  setupEventListeners();
  loadDataAndInit();
});
