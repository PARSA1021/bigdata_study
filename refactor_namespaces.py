import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

namespaces = """
  // ==========================================
  // [ARCHITECTURE REFACTORING]
  // Phase 2: Namespace & Class Structure Initialization
  // ==========================================
  
  // 1. Data Store (State Management)
  const Store = {
    get allQuizzes() { return allQuizzes; },
    get allNoteSections() { return allNoteSections; },
    get cumulativeStats() { return cumulativeStats; },
    get learnedConcepts() { return learnedConcepts; },
    get conceptMemos() { return conceptMemos; },
    get bookmarks() { return bookmarks; },
    get wrongIds() { return wrongIds; },
    get solvedMap() { return solvedMap; }
  };

  // 2. Data Manager (API & Local Storage)
  const DataManager = {
    init,
    loadStats,
    saveStats,
    recordStat,
    loadLearnedConcepts,
    saveLearnedConcepts,
    loadConceptMemos,
    saveConceptMemos,
    loadBookmarks,
    saveBookmarks
  };

  // 3. Quiz Engine (Business Logic)
  const QuizEngine = {
    buildQuizConceptMaps,
    getQuizzesForCard,
    getConceptCardForQuiz,
    applyQuizFilter,
    startMockExam,
    submitMockExam,
    calculateScore,
    toggleOmrDrawer,
    updateOmrGrid
  };

  // 4. UI Manager (Rendering & DOM)
  const UIManager = {
    renderNav,
    renderContent,
    renderQuizzes,
    renderQuizToolbar,
    updateProgressBar,
    updateScoreBar,
    openConceptModal,
    openStatsModal,
    showCustomAlert
  };

  // Expose to window for debugging and external access
  window.BigDataApp = { Store, DataManager, QuizEngine, UIManager };
  // ==========================================
"""

# Insert namespaces after the variable declarations
content = content.replace('  function loadLearnedConcepts() {', namespaces + '\n  function loadLearnedConcepts() {')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
