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
  // 1. CONSTANTS & STORAGE KEYS
  // ==========================================
  const STATS_KEY = "knowway_stats_v2";
  const HABIT_KEY = "knowway_habit_v2";
  const BOOKMARK_KEY = "knowway_bookmarks_v2";
  const MEMO_KEY = "knowway_concept_memos_v2";
  const QUIZ_MEMO_KEY = "knowway_quiz_memos_v2";
  const LEARNED_KEY = "knowway_learned_concepts_v2";
  const MOCK_RECORDS_KEY = "knowway_mock_records_v2";

  const SUBJECT_NAMES = {
    1: "1과목 · 분석 기획",
    2: "2과목 · 데이터 탐색",
    3: "3과목 · 데이터 모델링",
    4: "4과목 · 결과 해석"
  };

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

  // Practice state
  let quizFilter = {
    subject: "all",
    difficulty: "all",
    importance: "all",
    tag: "all",
    keyword: "",
    conceptCardId: null,
    calcOnly: false
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
  const oxTrainerModal = document.getElementById("oxTrainerModal");
  const closeOxModalBtn = document.getElementById("closeOxModalBtn");
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

  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveJSON(STATS_KEY, cumulativeStats);
      saveJSON(HABIT_KEY, habitData);
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
    const todayStr = getTodayString();
    const todayCount = habitData.activity[todayStr] || 0;
    const goal = habitData.dailyGoal || 30;

    const targetDate = new Date(habitData.ddayDate || "2026-09-05");
    const today = new Date(todayStr);
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    const ddayStr = diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-Day" : `D+${Math.abs(diffDays)}`;

    if (topbarDdayText) topbarDdayText.textContent = ddayStr;
    if (topbarStreakCount) topbarStreakCount.textContent = `${habitData.streak || 1}일`;

    if (homeDdayCount) homeDdayCount.textContent = ddayStr;
    if (homeDdayTarget) homeDdayTarget.textContent = `${habitData.ddayTitle || "시험"} (${habitData.ddayDate})`;
    if (homeStreakNum) homeStreakNum.textContent = habitData.streak || 1;

    const goalPct = Math.min(100, Math.round((todayCount / goal) * 100));
    if (homeGoalRate) homeGoalRate.textContent = `${goalPct}%`;
    if (homeTodaySolved) homeTodaySolved.textContent = todayCount;
    if (homeGoalProgressFill) homeGoalProgressFill.style.width = `${goalPct}%`;
    if (homeGoalSubText) {
      if (todayCount >= goal) homeGoalSubText.innerHTML = "🎉 오늘 목표 달성 완료! 추가로 더 공부해볼까요?";
      else homeGoalSubText.textContent = `오늘 목표까지 ${goal - todayCount}문제 남았어요! 🔥`;
    }

    if (homeTotalSolved) homeTotalSolved.textContent = cumulativeStats.totalSolved;
    const acc = cumulativeStats.totalSolved > 0 ? Math.round((cumulativeStats.totalCorrect / cumulativeStats.totalSolved) * 100) : 0;
    if (homeAccuracy) homeAccuracy.textContent = `${acc}%`;

    let wrongCount = 0;
    Object.values(cumulativeStats.quizzes || {}).forEach(q => {
      if (q.wrongCount > 0 && !q.mastered) wrongCount++;
    });
    if (homeWrongCount) homeWrongCount.textContent = wrongCount;

    renderStreakWeekDots();
    renderReverseRoadmap();
    renderHeatmap();
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

  function renderStreakWeekDots() {
    if (!homeStreakWeekDots) return;
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const now = new Date();
    const currentDayIdx = now.getDay();
    let html = "";

    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - (currentDayIdx - i));
      const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const count = habitData.activity[dStr] || 0;
      const isActive = count > 0;
      const isToday = i === currentDayIdx;

      html += `
        <div class="week-day-dot ${isActive ? "active" : ""}">
          <div class="dot-circle" title="${dStr}: ${count}문제 풀이">${isActive ? "✓" : ""}</div>
          <div class="day-label" style="${isToday ? "font-weight: 900; color: var(--text-color);" : ""}">${days[i]}</div>
        </div>
      `;
    }
    homeStreakWeekDots.innerHTML = html;
  }

  // ==========================================
  // 7. REVERSE CHRONOLOGICAL ROADMAP
  // ==========================================
  function renderReverseRoadmap() {
    if (!examTimelineGrid) return;

    const timelinePresets = [
      { id: "11th", title: "11회 기출 실전 모의고사", tag: "2025 최신 80제", desc: "가장 최근 출제된 최신 트렌드 완벽 복원", icon: "🔥" },
      { id: "10th", title: "10회 기출 실전 모의고사", tag: "핵심 기출 80제", desc: "단골 빈출 계산 및 모델링 응용 문항", icon: "🏆" },
      { id: "4th", title: "4회 기출 실전 모의고사", tag: "기본 완성 80제", desc: "합격을 위한 필수 기초 개념 총집결", icon: "🎯" },
      { id: "random", title: "랜덤 전과목 조합 모의고사", tag: "실전 대비 80제", desc: "실제 시험처럼 무작위 과목별 20문항 배분", icon: "🔀" }
    ];

    let passedCount = 0;
    let html = "";

    timelinePresets.forEach(preset => {
      const rec = mockRecords[preset.id] || { solvedCount: 0, bestScore: 0, passed: false };
      if (rec.passed) passedCount++;

      let statusBadge = `<span class="timeline-status-badge status-unattempted">미응시</span>`;
      if (rec.passed) {
        statusBadge = `<span class="timeline-status-badge status-passed">✓ 합격 (${rec.bestScore}점)</span>`;
      } else if (rec.solvedCount > 0) {
        statusBadge = `<span class="timeline-status-badge status-progress">응시완료 (${rec.bestScore}점)</span>`;
      }

      html += `
        <div class="timeline-exam-card" data-preset="${preset.id}">
          <div>
            <div class="timeline-card-header">
              <span class="timeline-round-tag">${preset.tag}</span>
              ${statusBadge}
            </div>
            <div class="timeline-exam-title">${preset.icon} ${preset.title}</div>
            <div class="timeline-exam-desc">${preset.desc}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 10px;">
            <span class="timeline-score-val">${rec.bestScore > 0 ? `최고점: <strong>${rec.bestScore}점</strong>` : '80문항 / 120분'}</span>
            <span style="font-size: 12px; font-weight: 900; color: var(--primary-accent);">응시하기 ➔</span>
          </div>
        </div>
      `;
    });

    examTimelineGrid.innerHTML = html;

    const masteryPct = Math.round((passedCount / timelinePresets.length) * 100);
    if (roadmapMasteryRate) roadmapMasteryRate.textContent = `${masteryPct}% (${passedCount}/${timelinePresets.length}회차 정복)`;
  }

  function renderHeatmap() {
    if (!heatmapGrid) return;
    const now = new Date();
    let html = "";

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const count = habitData.activity[dStr] || 0;

      let lvl = "lvl-0";
      if (count >= 30) lvl = "lvl-4";
      else if (count >= 20) lvl = "lvl-3";
      else if (count >= 10) lvl = "lvl-2";
      else if (count >= 1) lvl = "lvl-1";

      html += `<div class="heatmap-square ${lvl}" title="${dStr} (${count}문제 풀이)">${count > 0 ? count : ""}</div>`;
    }
    heatmapGrid.innerHTML = html;
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

    mainNavButtons.forEach(btn => {
      if (btn.dataset.nav === targetNav) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    [homeView, notesView, quizContentView, wrongView].forEach(v => {
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
    } else if (targetNav === "mock") {
      if (quizContentView) quizContentView.classList.remove("hidden");
      setMode("mock");
      loadMockPreset(options.preset || "11th");
    } else if (targetNav === "wrong") {
      if (wrongView) wrongView.classList.remove("hidden");
      renderWrongNotesView("all");
    }
  }

  function setMode(mode) {
    currentMode = mode;
    if (mode === "practice") {
      if (tabPractice) tabPractice.classList.add("active");
      if (tabMockExam) tabMockExam.classList.remove("active");
      if (practiceHeader) practiceHeader.classList.remove("hidden");
      if (mockHeader) mockHeader.classList.add("hidden");
    } else {
      if (tabPractice) tabPractice.classList.remove("active");
      if (tabMockExam) tabMockExam.classList.add("active");
      if (practiceHeader) practiceHeader.classList.add("hidden");
      if (mockHeader) mockHeader.classList.remove("hidden");
    }
  }


  // ==========================================
  // 9. PRACTICE QUIZ ENGINE (Batch & Virtualized)
  // ==========================================
  function applyQuizFilter() {
    workingQuizzes = allQuizzes.filter(q => {
      if (quizFilter.conceptCardId && q.cardId !== quizFilter.conceptCardId) return false;
      if (quizFilter.subject !== "all" && q.subject !== parseInt(quizFilter.subject, 10)) return false;
      if (quizFilter.difficulty !== "all" && q.difficulty !== quizFilter.difficulty) return false;
      if (quizFilter.importance !== "all" && getImportanceGrade(q) !== quizFilter.importance) return false;
      if (quizFilter.calcOnly && !isCalcQuestion(q)) return false;
      if (quizFilter.tag !== "all" && !q.question.includes(`[${quizFilter.tag}]`)) return false;
      if (quizFilter.keyword) {
        const kw = quizFilter.keyword.toLowerCase();
        const text = (q.question + " " + (q.explanation || "") + " " + (q.choices || []).join(" ")).toLowerCase();
        if (!text.includes(kw)) return false;
      }
      return true;
    });
  }

  function renderQuizzes(reset = true) {
    if (!quizContainer) return;

    if (workingQuizzes.length === 0) {
      quizContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1.5px solid var(--line);">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 18px; font-weight: 900; margin-bottom: 8px;">조건에 맞는 문제가 없습니다.</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">필터 조건을 변경하거나 다른 키워드로 검색해보세요.</p>
          <button id="resetFilterBtn" class="button button-brand">필터 초기화</button>
        </div>
      `;
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

    const impBadge = {
      A: '<span class="badge-tag badge-grade-a">⭐ A급 필수</span>',
      B: '<span class="badge-tag badge-grade-b">🎯 B급 변형</span>',
      C: '<span class="badge-tag badge-grade-c">💡 C급 심화</span>'
    }[impGrade] || "";

    const diffBadge = {
      easy: '<span class="quiz-tag-badge" style="background:#DCFCE7; color:#16A34A;">쉬움</span>',
      medium: '<span class="quiz-tag-badge" style="background:#FEF3C7; color:#D97706;">보통</span>',
      hard: '<span class="quiz-tag-badge" style="background:#FEE2E2; color:#DC2626;">어려움</span>'
    }[quiz.difficulty] || "";

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

            <!-- 2. Main Explanation -->
            <div class="quiz-explanation-text">
              ${escapeHTML(quiz.explanation || "")}
            </div>

            <!-- 3. Key Point Card (🎯 실제 기출 핵심 포인트) -->
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

            <!-- 4. Examiner Secret Tip Card (💡 출제위원의 비밀 꿀팁) -->
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

            <!-- 5. 3-Step Calculation Template -->
            ${isCalc ? `
              <div class="calc-formula-template">
                <div class="calc-template-header">
                  <span>📐</span> <span>2·3과목 빈출 계산 공식 & 3단계 풀이 템플릿</span>
                </div>
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
            ` : ""}

            <!-- 6. Trap Analysis -->
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
              <div class="quiz-bottom-actions">
                <button class="btn-small view-concept-btn" data-card="${quiz.cardId}">
                  📖 관련 요약노트 보기 ↗
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
        selected.push(...sQuizzes.sort(() => Math.random() - 0.5).slice(0, 20));
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
    timerSeconds = 120 * 60;
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
    if (timerSeconds <= 600) examTimer.style.color = "#FF3B30";
    else examTimer.style.color = "var(--brand)";
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

    oxItems.sort(() => Math.random() - 0.5);
    oxCurrentIdx = 0;
    oxStreak = 0;

    renderOxQuestion();
    if (oxTrainerModal) oxTrainerModal.classList.remove("hidden");
  }

  function renderOxQuestion() {
    if (oxCurrentIdx >= oxItems.length) {
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
        <div class="cheat-sheet-sec-title">🧮 빅분기 필기 10대 핵심 계산 공식 요약표</div>
        <table class="cheat-formula-table">
          <thead>
            <tr><th>지표명</th><th>계산 공식</th><th>핵심 암기 팁</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>정밀도 (Precision)</strong></td><td>TP / (TP + FP)</td><td>예측 Positive 기준 맞춘 비율</td></tr>
            <tr><td><strong>재현율 (Recall)</strong></td><td>TP / (TP + FN)</td><td>실제 Positive 기준 맞춘 비율</td></tr>
            <tr><td><strong>F1-Score</strong></td><td>2PR / (P + R)</td><td>정밀도와 재현율의 조화평균</td></tr>
            <tr><td><strong>특이도 (Specificity)</strong></td><td>TN / (TN + FP)</td><td>실제 Negative 기준 맞춘 비율</td></tr>
            <tr><td><strong>위양성률 (FPR)</strong></td><td>FP / (TN + FP) = 1 - 특이도</td><td>ROC 곡선의 X축 지표</td></tr>
            <tr><td><strong>IQR (사분위범위)</strong></td><td>Q3 - Q1</td><td>이상치 경계: [Q1-1.5IQR, Q3+1.5IQR]</td></tr>
            <tr><td><strong>결정계수 (R²)</strong></td><td>SSR / SST = 1 - (SSE / SST)</td><td>0~1 사이, 1에 가까울수록 설명력 높음</td></tr>
            <tr><td><strong>가설검정 p-value</strong></td><td>p-value &lt; 유의수준(α)</td><td>귀무가설 기각(H₀ 기각 ➔ H₁ 채택)</td></tr>
            <tr><td><strong>1종 오류 / 2종 오류</strong></td><td>α(1종): H₀참인데 기각 / β(2종): H₁참인데 H₀채택</td><td>1종 오류가 더 치명적</td></tr>
            <tr><td><strong>지니계수 (Gini)</strong></td><td>1 - ∑(p_i)²</td><td>0일 때 가장 순수(분류 성능 우수)</td></tr>
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

          <div class="quiz-explanation-box">
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
              <div class="quiz-bottom-actions">
                <button class="btn-small view-concept-btn" data-card="${quiz.cardId}">
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
      const [noteRes, cbtRes] = await Promise.all([
        fetch("data.json").then(r => r.json()),
        fetch("cbt_bank.json").then(r => r.json())
      ]);

      noteData = noteRes;
      allQuizzes = cbtRes.questions || [];

      buildMaps();
      renderNav();
      renderContent();
      buildNotesSearchIndex();
      updateHabitUI();

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

  function renderContent() {
    if (!contentEl || !noteData || !noteData.sections) return;
    let html = "";

    noteData.sections.forEach(sec => {
      html += `
        <section id="${sec.id}" class="section-container" style="margin-bottom: 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; border-bottom: 2px solid var(--line-bold); padding-bottom: 10px;">
            <h2 style="font-size: 22px; font-weight: 950; letter-spacing: -0.04em;">${escapeHTML(sec.title)}</h2>
            ${sec.subject ? `<span class="badge-tag">${SUBJECT_NAMES[sec.subject] || ""}</span>` : ""}
          </div>
          <div class="cards-list">
            ${(sec.cards || []).map(card => renderNoteCardHTML(card)).join("")}
          </div>
        </section>
      `;
    });

    contentEl.innerHTML = html;
    updateNoteProgress();
  }

  function buildNotesSearchIndex() {
    notesSearchIndex = [];
    if (!contentEl) return;
    const cards = contentEl.querySelectorAll(".card");
    cards.forEach(card => {
      const title = (card.querySelector(".card-title")?.textContent || "").toLowerCase();
      const body = (card.querySelector(".card-body")?.textContent || "").toLowerCase();
      notesSearchIndex.push({
        cardEl: card,
        text: `${title} ${body}`
      });
    });
  }

  function handleNotesSearch(query) {
    const kw = (query || "").trim().toLowerCase();
    if (clearSearchBtn) {
      if (kw) clearSearchBtn.classList.remove("hidden");
      else clearSearchBtn.classList.add("hidden");
    }

    if (notesSearchIndex.length === 0) {
      buildNotesSearchIndex();
    }

    let matchCount = 0;
    notesSearchIndex.forEach(item => {
      const isMatch = !kw || item.text.includes(kw);
      item.cardEl.style.display = isMatch ? "" : "none";
      if (isMatch) matchCount++;
    });

    if (searchStatusEl) {
      if (kw) {
        searchStatusEl.textContent = `검색 결과: ${matchCount}개 개념 발견`;
        searchStatusEl.classList.remove("hidden");
      } else {
        searchStatusEl.classList.add("hidden");
      }
    }
  }

  function renderNoteCardHTML(card) {
    const isLearned = learnedConcepts.has(card.id);
    const relatedQuizzes = cardToQuizMap.get(card.id) || [];
    const cardContent = card.content || "";

    return `
      <div class="card" id="card-${card.id}" data-id="${card.id}">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="learn-check-btn ${isLearned ? 'learned' : ''}" data-id="${card.id}" style="width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid var(--line-bold); background: ${isLearned ? 'var(--brand)' : 'var(--surface)'}; font-size: 12px; font-weight: 900;">
              ${isLearned ? '✓' : ''}
            </button>
            <h3 class="card-title">${escapeHTML(card.title)}</h3>
          </div>
          <div style="display: flex; gap: 8px;">
            ${relatedQuizzes.length > 0 ? `
              <button class="btn-small practice-card-quizzes-btn" data-id="${card.id}" style="background: var(--brand); color: #090909; border-color: #090909;">
                📝 관련 기출 (${relatedQuizzes.length}제)
              </button>
            ` : ""}
          </div>
        </div>
        <div class="card-body">
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

  function openConceptModal(cardId) {
    const card = cardMap.get(cardId);
    if (!card || !conceptModal) return;

    if (conceptModalTitle) conceptModalTitle.textContent = card.title;
    if (conceptModalBodyNote) conceptModalBodyNote.innerHTML = card.content || "";

    const related = cardToQuizMap.get(cardId) || [];
    if (conceptRelatedCount) conceptRelatedCount.textContent = related.length;

    if (conceptModalBodyQuiz) {
      if (related.length === 0) {
        conceptModalBodyQuiz.innerHTML = "<p style='padding: 20px; color: var(--text-muted);'>관련 기출문제가 없습니다.</p>";
      } else {
        conceptModalBodyQuiz.innerHTML = related.map((q, idx) => {
          const qChoices = q.choices || [];
          return `
            <div style="background: var(--paper-subtle); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
              <div style="font-weight: 850; margin-bottom: 6px;">${formatQuestionText(q.question, idx + 1)}</div>
              <div style="font-size: 13px; color: var(--text-muted);">정답: ${q.answer + 1}번 (${escapeHTML(qChoices[q.answer] || "")})</div>
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
        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      };
    }

    conceptModal.classList.remove("hidden");
  }


  // ==========================================
  // 15. EVENT DELEGATION & GLOBAL LISTENERS
  // ==========================================
  function setupEventListeners() {
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

    // Mobile Sidebar
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        if (sidebar) sidebar.classList.add("active");
        if (overlay) overlay.classList.add("active");
      });
    }
    if (closeSidebarBtn) {
      closeSidebarBtn.addEventListener("click", () => {
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      });
    }
    if (overlay) {
      overlay.addEventListener("click", () => {
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      });
    }

    // Theme Switcher
    const themeTriggers = document.querySelectorAll("#themeToggleBtn, #sidebarThemeToggleBtn, .sidebar-theme-toggle");
    themeTriggers.forEach(btn => {
      btn.addEventListener("click", toggleTheme);
    });

    const initTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "light";
    updateThemeUI(initTheme);

    // Scroll to top
    window.addEventListener("scroll", () => {
      if (toTopBtn) {
        if (window.scrollY > 300) toTopBtn.classList.add("visible");
        else toTopBtn.classList.remove("visible");
      }
    }, { passive: true });

    if (toTopBtn) {
      toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Quick Triggers
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

    // Quiz Filters
    if (subjectFilter) {
      subjectFilter.addEventListener("change", e => {
        quizFilter.subject = e.target.value;
        quizFilter.conceptCardId = null;
        applyQuizFilter();
        renderQuizzes(true);
      });
    }
    if (difficultyFilter) {
      difficultyFilter.addEventListener("change", e => {
        quizFilter.difficulty = e.target.value;
        applyQuizFilter();
        renderQuizzes(true);
      });
    }
    if (importanceFilter) {
      importanceFilter.addEventListener("change", e => {
        quizFilter.importance = e.target.value;
        applyQuizFilter();
        renderQuizzes(true);
      });
    }
    if (tagFilter) {
      tagFilter.addEventListener("change", e => {
        quizFilter.tag = e.target.value;
        applyQuizFilter();
        renderQuizzes(true);
      });
    }
    if (searchQuizBtn) {
      searchQuizBtn.addEventListener("click", () => {
        if (keywordSearch) quizFilter.keyword = keywordSearch.value.trim();
        applyQuizFilter();
        renderQuizzes(true);
      });
    }
    if (keywordSearch) {
      keywordSearch.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          quizFilter.keyword = keywordSearch.value.trim();
          applyQuizFilter();
          renderQuizzes(true);
        }
      });
    }

    // Practice Quick Filters
    if (target13thQuizBtn) {
      target13thQuizBtn.addEventListener("click", () => {
        workingQuizzes = allQuizzes.filter(q => {
          const text = (q.question + " " + q.chapter).toLowerCase();
          return TARGET_13TH_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
        }).sort(() => Math.random() - 0.5).slice(0, 20);
        renderQuizzes(true);
      });
    }

    if (termStatQuizBtn) {
      termStatQuizBtn.addEventListener("click", () => {
        workingQuizzes = allQuizzes.filter(q => {
          const text = (q.question + " " + q.chapter).toLowerCase();
          return TERM_STAT_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
        }).sort(() => Math.random() - 0.5).slice(0, 20);
        renderQuizzes(true);
      });
    }

    // Tabs
    if (tabPractice) tabPractice.addEventListener("click", () => switchNav("practice"));
    if (tabMockExam) tabMockExam.addEventListener("click", () => switchNav("mock"));

    if (mockPreset11th) mockPreset11th.addEventListener("click", () => loadMockPreset("11th"));
    if (mockPreset10th) mockPreset10th.addEventListener("click", () => loadMockPreset("10th"));
    if (mockPreset4th) mockPreset4th.addEventListener("click", () => loadMockPreset("4th"));
    if (mockPresetRandom) mockPresetRandom.addEventListener("click", () => loadMockPreset("random"));

    if (openOmrBtn) openOmrBtn.addEventListener("click", () => toggleOmr(true));
    if (closeOmrBtn) closeOmrBtn.addEventListener("click", () => toggleOmr(false));
    if (omrOverlay) omrOverlay.addEventListener("click", () => toggleOmr(false));
    if (submitExamBtn) submitExamBtn.addEventListener("click", submitMockExam);
    if (omrSubmitBtn) omrSubmitBtn.addEventListener("click", submitMockExam);

    if (closeConceptBtn && conceptModal) {
      closeConceptBtn.addEventListener("click", () => conceptModal.classList.add("hidden"));
    }
    if (closeConceptModalBtn && conceptModal) {
      closeConceptModalBtn.addEventListener("click", () => conceptModal.classList.add("hidden"));
    }

    document.querySelectorAll(".wrong-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".wrong-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderWrongNotesView(btn.dataset.filter);
      });
    });

    if (retryAllWrongBtn) {
      retryAllWrongBtn.addEventListener("click", () => {
        const wrongIds = Object.keys(cumulativeStats.quizzes || {}).filter(id => {
          const q = cumulativeStats.quizzes[id];
          return q.wrongCount > 0 && !q.mastered;
        });
        workingQuizzes = allQuizzes.filter(q => wrongIds.includes(q.id));
        switchNav("practice");
        renderQuizzes(true);
      });
    }

    // Unified Modal Overlay Backdrop Click-to-Close
    document.querySelectorAll(".modal-overlay").forEach(overlayEl => {
      overlayEl.addEventListener("click", e => {
        if (e.target === overlayEl) {
          overlayEl.classList.add("hidden");
        }
      });
    });

    // Keyboard Shortcuts (Ctrl+K, Esc, OX shortcuts)
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.add("hidden"));
        if (omrDrawer) omrDrawer.classList.add("hidden");
        if (omrOverlay) omrOverlay.classList.add("hidden");
        if (sidebar && window.innerWidth <= 900) {
          sidebar.classList.remove("active");
          if (overlay) overlay.classList.remove("active");
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        switchNav("notes");
        if (searchInput) searchInput.focus();
      }
      if (oxTrainerModal && !oxTrainerModal.classList.contains("hidden")) {
        if (e.key.toLowerCase() === "o" || e.key === "ArrowLeft") {
          if (!oxBtnTrue.disabled) handleOxAnswer(true);
        } else if (e.key.toLowerCase() === "x" || e.key === "ArrowRight") {
          if (!oxBtnFalse.disabled) handleOxAnswer(false);
        } else if (e.key === " " || e.key === "Enter") {
          if (!oxFeedbackBox.classList.contains("hidden")) {
            oxCurrentIdx++;
            renderOxQuestion();
          }
        }
      }
    });

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

    // Set up Global Delegations
    setupQuizContainerDelegation();
    setupWrongContainerDelegation();
    setupOmrGridDelegation();
    setupContentDelegation();
    setupNavDelegation();
    setupTimelineDelegation();
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

      // 2. Shuffle button
      const shuffleBtn = e.target.closest("#shuffleQuizBtn");
      if (shuffleBtn) {
        // Robust Fisher-Yates shuffle
        for (let i = workingQuizzes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [workingQuizzes[i], workingQuizzes[j]] = [workingQuizzes[j], workingQuizzes[i]];
        }
        renderQuizzes(true);
        showToast(`🔀 총 ${workingQuizzes.length}개 문제가 무작위로 섞였습니다!`);
        if (quizContainer) {
          quizContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
          flagBtn.textContent = "★ 검토중";
          flagBtn.style.cssText = "background:#FEF3C7; color:#B45309; border-color:#F59E0B;";
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
        const choiceIdx = parseInt(optBtn.dataset.choice, 10);
        const quiz = allQuizzes.find(q => q.id === quizId);
        if (!quiz) return;

        if (currentMode === "practice") {
          practiceSolvedMap.set(quizId, choiceIdx);
          const isCorrect = choiceIdx === quiz.answer;
          recordQuizAttempt(quiz, isCorrect, choiceIdx);
          const cardIndex = workingQuizzes.findIndex(q => q.id === quizId);
          card.outerHTML = renderQuizCardHTML(quiz, cardIndex + 1);
        } else if (currentMode === "mock" && !isMockSubmitted) {
          mockSolvedMap.set(quizId, choiceIdx);
          card.querySelectorAll(".quiz-option").forEach((b, idx) => {
            if (idx === choiceIdx) b.classList.add("correct");
            else b.classList.remove("correct");
          });
          updateSingleOmrRow(quizId, choiceIdx, mockFlaggedSet.has(quizId));
          updateOmrHeaderCounts();
        }
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
        recordQuizAttempt(quiz, isCorrect, choiceIdx);

        if (isCorrect) {
          optBtn.classList.add("correct");
          card.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
          alert("🎉 정답입니다! '오답 탈출(마스터 완료)' 성공!");
          renderWrongNotesView("all");
        } else {
          optBtn.classList.add("incorrect");
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
      const learnBtn = e.target.closest(".learn-check-btn");
      if (learnBtn) {
        const cardId = learnBtn.dataset.id;
        if (!cardId) return;
        if (learnedConcepts.has(cardId)) {
          learnedConcepts.delete(cardId);
          learnBtn.classList.remove("learned");
          learnBtn.textContent = "";
          learnBtn.style.background = "var(--surface)";
        } else {
          learnedConcepts.add(cardId);
          learnBtn.classList.add("learned");
          learnBtn.textContent = "✓";
          learnBtn.style.background = "var(--brand)";
        }
        saveJSON(LEARNED_KEY, [...learnedConcepts]);
        updateNoteProgress();
        return;
      }

      const practiceBtn = e.target.closest(".practice-card-quizzes-btn");
      if (practiceBtn) {
        const cardId = practiceBtn.dataset.id;
        if (cardId) switchNav("practice", { cardId });
        return;
      }
    });
  }

  // --- DELEGATION 5: Sidebar Nav Container ---
  function setupNavDelegation() {
    if (!navContainer) return;
    navContainer.addEventListener("click", e => {
      const link = e.target.closest(".nav-link");
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        if (targetId) {
          switchNav("notes");
          const targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
        const presetId = card.dataset.preset;
        if (presetId) switchNav("mock", { preset: presetId });
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
          ${numPrefix}<span>${escapeHTML(mainQuestion)}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">${escapeHTML(boxContent)}</div>
        </div>
      `;
    }

    return `
      <div class="quiz-main-prompt">
        ${numPrefix}<span>${escapeHTML(text)}</span>
      </div>
    `;
  }

  // ==========================================
  // 16. BOOTSTRAP APPLICATION
  // ==========================================
  setupEventListeners();
  loadDataAndInit();
});
