/**
 * 빅데이터분석기사 필기 합격 마스터 (Refactored & Expanded for All Devices)
 *
 * 1. 요약노트 & 문제은행 로드 & 양방향 개념 연계 (Dual-Way Concept Linkage)
 * 2. [연습 모드] vs [실전 CBT 모의고사 (80제, 120분, OMR)] 이원화
 * 3. 듀얼 화면 분할 뷰 (Split View: 노트 + 문제 나란히 보기 & 양방향 동기화)
 * 4. 과목별 & 개념별 성적 및 약점 진단 엔진 (취약 개념 Top 3 집중 보충)
 * 5. 개념 검색/필터링 및 키보드 단축키 (1~4 선택, 좌우 이동, F 검토) & 모바일 바텀바 지원
 */

document.addEventListener("DOMContentLoaded", () => {
  // === DOM 요소 캐싱 ===
  const mainLayout = document.getElementById("mainLayout");
  const contentEl = document.getElementById("content");
  const quizContentEl = document.getElementById("quiz-content");
  const quizContainer = document.getElementById("quiz-container");
  const quizToolbarEl = document.getElementById("quiz-toolbar");
  const quizScoreEl = document.getElementById("quiz-score");
  const quizToggleBtn = document.getElementById("quizToggleBtn");
  const splitViewBtn = document.getElementById("splitViewBtn");
  const statsToggleBtn = document.getElementById("statsToggleBtn");
  const navEl = document.getElementById("nav-container");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchStatusEl = document.getElementById("searchStatus");
  const themeBtn = document.getElementById("themeToggleBtn");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  const toTopBtn = document.getElementById("toTop");
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");

  // 모드 탭 & 모의고사 헤더
  const tabPractice = document.getElementById("tabPractice");
  const tabMockExam = document.getElementById("tabMockExam");
  const practiceHeader = document.getElementById("practice-header");
  const mockHeader = document.getElementById("mock-header");
  const examTimerEl = document.getElementById("examTimer");
  const openOmrBtn = document.getElementById("openOmrBtn");
  const submitExamBtn = document.getElementById("submitExamBtn");
  const omrSolvedCountEl = document.getElementById("omrSolvedCount");
  const mockPreset10th = document.getElementById("mockPreset10th");
  const mockPresetRandom = document.getElementById("mockPresetRandom");

  // OMR 드로어 & 오버레이
  const omrDrawer = document.getElementById("omrDrawer");
  const omrOverlay = document.getElementById("omrOverlay");
  const closeOmrBtn = document.getElementById("closeOmrBtn");
  const omrGrid = document.getElementById("omrGrid");
  const omrProgress = document.getElementById("omrProgress");
  const omrFlagCount = document.getElementById("omrFlagCount");
  const omrSubmitBtn = document.getElementById("omrSubmitBtn");

  // 학습 통계 모달
  const statsModal = document.getElementById("statsModal");
  const closeStatsBtn = document.getElementById("closeStatsBtn");
  const closeStatsModalBtn = document.getElementById("closeStatsModalBtn");
  const resetStatsBtn = document.getElementById("resetStatsBtn");
  const statTotalSolved = document.getElementById("statTotalSolved");
  const statOverallAccuracy = document.getElementById("statOverallAccuracy");
  const statBookmarks = document.getElementById("statBookmarks");
  const subjectStatsContainer = document.getElementById("subjectStatsContainer");
  const weaknessAlert = document.getElementById("weaknessAlert");
  const weakConceptContainer = document.getElementById("weakConceptContainer");

  // 개념 미리보기 모달
  const conceptModal = document.getElementById("conceptModal");
  const conceptModalTitle = document.getElementById("conceptModalTitle");
  const tabConceptNote = document.getElementById("tabConceptNote");
  const tabConceptQuiz = document.getElementById("tabConceptQuiz");
  const conceptRelatedCount = document.getElementById("conceptRelatedCount");
  const conceptModalBodyNote = document.getElementById("conceptModalBodyNote");
  const conceptModalBodyQuiz = document.getElementById("conceptModalBodyQuiz");
  const closeConceptBtn = document.getElementById("closeConceptBtn");
  const closeConceptModalBtn = document.getElementById("closeConceptModalBtn");
  const jumpToFullNoteBtn = document.getElementById("jumpToFullNoteBtn");
  const practiceConceptBtn = document.getElementById("practiceConceptBtn");

  // 과목 상수
  const SUBJECT_NAMES = {
    1: "1과목 · 분석 기획",
    2: "2과목 · 데이터 탐색",
    3: "3과목 · 데이터 모델링",
    4: "4과목 · 결과 해석",
    5: "5과목 · 자주 출제되는 개념",
    6: "🏆 10회 기출문제",
    "exam10th": "🏆 10회 기출문제 (80제)"
  };

  const BOOKMARK_KEY = "cbt_bookmarks";
  const STATS_KEY = "cbt_cum_stats";

  let allQuizzes = [];       // 전체 문제
  let workingQuizzes = [];   // 연습 모드 필터 문제
  let currentMode = "practice"; // 'practice' | 'mock'
  let bookmarks = new Set(loadBookmarks());

  // 데이터 맵 & 양방향 연계 맵
  let cardMap = new Map();         // cardId -> card data object
  let cardToQuizMap = new Map();   // cardId -> Array<quiz>
  let sectionToQuizMap = new Map();// sectionId -> Array<quiz>
  let activeConceptCardId = null;

  // 연습 모드 상태
  let quizFilter = {
    subject: "all",
    difficulty: "all",
    onlyWrong: false,
    onlyBookmarked: false,
    conceptCardId: null,
    keyword: ""
  };
  let wrongIds = new Set();
  let solvedMap = new Map(); // quizId -> boolean(correct)
  let chosenAnswerMap = new Map(); // quizId -> selected option index
  const QUIZ_PAGE_SIZE = 10;
  let currentPage = 1;

  // 실전 모의고사 상태
  let mockQuizzes = [];        // 80문항
  let mockSolvedMap = new Map(); // quizId -> chosen option index
  let mockFlaggedSet = new Set(); // quizId flagged
  let timerInterval = null;
  let timerSeconds = 120 * 60; // 120분
  let isMockSubmitted = false;

  // 누적 통계 데이터 로드
  let cumulativeStats = loadStats();

  function loadBookmarks() {
    try {
      const raw = localStorage.getItem(BOOKMARK_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveBookmarks() {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks]));
  }

  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      totalSolved: 0,
      totalCorrect: 0,
      subjects: {
        1: { solved: 0, correct: 0 },
        2: { solved: 0, correct: 0 },
        3: { solved: 0, correct: 0 },
        4: { solved: 0, correct: 0 }
      },
      concepts: {}
    };
  }

  function saveStats() {
    localStorage.setItem(STATS_KEY, JSON.stringify(cumulativeStats));
  }

  function recordStat(subjectId, isCorrect, cardId) {
    cumulativeStats.totalSolved++;
    if (isCorrect) cumulativeStats.totalCorrect++;

    if (subjectId && cumulativeStats.subjects) {
      if (!cumulativeStats.subjects[subjectId]) {
        cumulativeStats.subjects[subjectId] = { solved: 0, correct: 0 };
      }
      cumulativeStats.subjects[subjectId].solved++;
      if (isCorrect) cumulativeStats.subjects[subjectId].correct++;
    }

    if (cardId) {
      if (!cumulativeStats.concepts) cumulativeStats.concepts = {};
      if (!cumulativeStats.concepts[cardId]) {
        cumulativeStats.concepts[cardId] = { solved: 0, correct: 0 };
      }
      cumulativeStats.concepts[cardId].solved++;
      if (isCorrect) cumulativeStats.concepts[cardId].correct++;
    }

    saveStats();
  }

  // === 1. 데이터 병렬 로드 및 양방향 개념 맵 빌드 ===
  Promise.all([
    fetch("data.json").then(res => res.json()),
    fetch("cbt_bank.json").then(res => res.json())
  ]).then(([noteData, cbtData]) => {
    allQuizzes = cbtData.questions || [];
    renderNav(noteData.nav);
    renderContent(noteData.sections);
    bindCardEvents();

    buildQuizConceptMaps();
    updateNoteRelatedBadges();

    applyQuizFilter();
    renderQuizToolbar();
  }).catch(error => {
    contentEl.innerHTML = `<div class="loading">데이터를 불러오는데 실패했습니다: ${error.message}</div>`;
  });

  // 1-1. 사이드바 네비게이션 렌더링
  function renderNav(navData) {
    if (!navData) return;
    let html = "";
    navData.forEach(group => {
      html += `<div class="nav-group-title">${group.group}</div>`;
      group.items.forEach(item => {
        html += `<a href="#${item.id}" class="nav-link">${item.label}</a>`;
      });
    });
    navEl.innerHTML = html;
  }

  // 1-2. 요약노트 렌더링 & cardMap 빌드
  function renderContent(sections) {
    if (!sections) return;
    let html = "";
    cardMap.clear();

    sections.forEach(sec => {
      html += `
        <section class="section" id="${sec.id}">
          <h2 class="section-title">${sec.num} ${sec.title}</h2>
      `;

      sec.cards.forEach(card => {
        cardMap.set(card.id, card);
        const blocksHtml = card.blocks.map(renderBlock).join("");
        const isOpen = card.open ? "open" : "";

        html += `
          <article class="card ${isOpen}" id="${card.id}" data-search="${card.title.toLowerCase()}">
            <div class="card-header">
              <h3 class="card-title-text">${card.title}</h3>
              <span class="chevron">▾</span>
            </div>
            <div class="card-body">
              ${blocksHtml}
            </div>
          </article>
        `;
      });
      html += `</section>`;
    });
    contentEl.innerHTML = html;
  }

  // 1-3. 블록 타입별 렌더링
  function renderBlock(block) {
    switch (block.type) {
      case "h4": return `<h4>${block.text}</h4>`;
      case "ul": return `<ul>${block.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
      case "memo": return `<div class="memo">${block.text}</div>`;
      case "note": return `<div class="note">${block.text}</div>`;
      case "formula": return `<div class="formula">${block.text}</div>`;
      case "table":
        const heads = block.headers.map(h => `<th>${h}</th>`).join("");
        const rows = block.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
        return `<table><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>`;
      default: return "";
    }
  }

  // 1-4. 양방향 개념-문제 매핑 빌드
  function buildQuizConceptMaps() {
    cardToQuizMap.clear();
    sectionToQuizMap.clear();
    allQuizzes.forEach(quiz => {
      if (quiz.cardId) {
        if (!cardToQuizMap.has(quiz.cardId)) cardToQuizMap.set(quiz.cardId, []);
        cardToQuizMap.get(quiz.cardId).push(quiz);
      }
      if (quiz.sectionId) {
        if (!sectionToQuizMap.has(quiz.sectionId)) sectionToQuizMap.set(quiz.sectionId, []);
        sectionToQuizMap.get(quiz.sectionId).push(quiz);
      }
    });
  }

  function getQuizzesForCard(cardId) {
    if (cardToQuizMap.has(cardId)) {
      return cardToQuizMap.get(cardId);
    }
    const cardData = cardMap.get(cardId);
    if (cardData && cardData.title) {
      const title = cardData.title.toLowerCase();
      return allQuizzes.filter(q =>
        (q.question && q.question.toLowerCase().includes(title)) ||
        (q.chapter && q.chapter.toLowerCase().includes(title))
      );
    }
    return [];
  }

  function getConceptCardForQuiz(quiz) {
    if (!quiz) return null;
    if (quiz.cardId && cardMap.has(quiz.cardId)) {
      return cardMap.get(quiz.cardId);
    }
    if (quiz.chapter) {
      for (let card of cardMap.values()) {
        if (card.title.includes(quiz.chapter) || quiz.chapter.includes(card.title)) {
          return card;
        }
      }
    }
    return null;
  }

  // 1-5. 요약노트 카드 헤더에 관련 문제 배지 부착
  function updateNoteRelatedBadges() {
    document.querySelectorAll(".card").forEach(cardEl => {
      const cardId = cardEl.id;
      const quizzes = getQuizzesForCard(cardId);
      const headerEl = cardEl.querySelector(".card-header");
      if (headerEl && quizzes.length > 0) {
        let badgeBtn = headerEl.querySelector(".concept-related-btn");
        if (!badgeBtn) {
          badgeBtn = document.createElement("button");
          badgeBtn.className = "concept-related-btn";
          badgeBtn.title = "관련 기출문제 풀어보기";
          const chevron = headerEl.querySelector(".chevron");
          if (chevron) headerEl.insertBefore(badgeBtn, chevron);
          else headerEl.appendChild(badgeBtn);
        }
        badgeBtn.innerHTML = `📝 관련 문제 ${quizzes.length}개`;
        badgeBtn.dataset.cardId = cardId;

        badgeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (mainLayout.classList.contains("split-view")) {
            quizFilter.conceptCardId = cardId;
            applyQuizFilter();
            renderQuizToolbar();
          } else {
            openConceptModal(cardId, "quiz");
          }
        });
      }
    });
  }

  // === 2. 모드 전환 ===
  tabPractice.addEventListener("click", () => setMode("practice"));
  tabMockExam.addEventListener("click", () => setMode("mock"));

  function setMode(mode) {
    currentMode = mode;
    if (mode === "practice") {
      tabPractice.classList.add("active");
      tabMockExam.classList.remove("active");
      practiceHeader.classList.remove("hidden");
      mockHeader.classList.add("hidden");
      quizToolbarEl.classList.remove("hidden");
      omrDrawer.classList.add("hidden");
      renderQuizzes(workingQuizzes);
    } else {
      tabPractice.classList.remove("active");
      tabMockExam.classList.add("active");
      practiceHeader.classList.add("hidden");
      mockHeader.classList.remove("hidden");
      quizToolbarEl.classList.add("hidden");

      if (mockQuizzes.length === 0 || isMockSubmitted) {
        initMockExam();
      } else {
        renderMockQuizzes();
      }
    }
  }

  // 2-1. 실전 모의고사 생성
  let currentMockPreset = "10th";

  function initMockExam(presetMode) {
    if (presetMode) currentMockPreset = presetMode;

    if (currentMockPreset === "10th") {
      mockQuizzes = allQuizzes.filter(q => q.sectionId === "exam10th");
      if (mockQuizzes.length === 0) {
        mockQuizzes = allQuizzes.slice(0, 80);
      }
    } else {
      const s1 = shuffleArray([...allQuizzes.filter(q => q.subject === 1 && q.sectionId !== "exam10th")]).slice(0, 20);
      const s2 = shuffleArray([...allQuizzes.filter(q => q.subject === 2 && q.sectionId !== "exam10th")]).slice(0, 20);
      const s3 = shuffleArray([...allQuizzes.filter(q => q.subject === 3 && q.sectionId !== "exam10th")]).slice(0, 20);
      const s4 = shuffleArray([...allQuizzes.filter(q => q.subject === 4 && q.sectionId !== "exam10th")]).slice(0, 20);
      mockQuizzes = [...s1, ...s2, ...s3, ...s4];
      if (mockQuizzes.length < 80) {
        mockQuizzes = shuffleArray([...allQuizzes]).slice(0, 80);
      }
    }

    if (mockPreset10th && mockPresetRandom) {
      if (currentMockPreset === "10th") {
        mockPreset10th.classList.add("active");
        mockPreset10th.style.backgroundColor = "var(--primary-color)";
        mockPreset10th.style.color = "#fff";
        mockPresetRandom.classList.remove("active");
        mockPresetRandom.style.backgroundColor = "";
        mockPresetRandom.style.color = "";
      } else {
        mockPresetRandom.classList.add("active");
        mockPresetRandom.style.backgroundColor = "var(--primary-color)";
        mockPresetRandom.style.color = "#fff";
        mockPreset10th.classList.remove("active");
        mockPreset10th.style.backgroundColor = "";
        mockPreset10th.style.color = "";
      }
    }

    mockSolvedMap.clear();
    mockFlaggedSet.clear();
    isMockSubmitted = false;

    clearInterval(timerInterval);
    timerSeconds = 120 * 60;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        alert("⏱️ 시험 시간이 종료되었습니다! 답안이 자동 제출됩니다.");
        submitMockExam();
      }
    }, 1000);

    renderMockQuizzes();
    renderOmrGrid();
  }

  if (mockPreset10th) {
    mockPreset10th.addEventListener("click", () => initMockExam("10th"));
  }
  if (mockPresetRandom) {
    mockPresetRandom.addEventListener("click", () => initMockExam("random"));
  }

  function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    examTimerEl.textContent = formatted;
    if (timerSeconds <= 600) {
      examTimerEl.classList.add("warning");
    } else {
      examTimerEl.classList.remove("warning");
    }
  }

  function renderMockQuizzes() {
    let html = "";
    mockQuizzes.forEach((quiz, index) => {
      const optionsArray = quiz.choices || quiz.options;
      let optionsHtml = "";
      const userChosen = mockSolvedMap.get(quiz.id);

      optionsArray.forEach((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx);
        let statusClass = "";

        if (isMockSubmitted) {
          if (optIdx === quiz.answer) statusClass = "correct";
          else if (userChosen === optIdx) statusClass = "incorrect";
          else statusClass = "dimmed";
        } else if (userChosen === optIdx) {
          statusClass = "correct";
        }

        optionsHtml += `
          <button class="quiz-option ${statusClass}" data-quiz-id="${quiz.id}" data-opt-idx="${optIdx}" ${isMockSubmitted ? 'disabled' : ''}>
            <span class="option-badge">${letter}</span>
            <span class="option-text">${opt}</span>
            <span class="option-keycap">${optIdx + 1}</span>
            <span class="option-icon">${statusClass === 'correct' ? '✓' : (statusClass === 'incorrect' ? '✗' : '')}</span>
          </button>
        `;
      });

      const isFlagged = mockFlaggedSet.has(quiz.id);
      const isBookmarked = bookmarks.has(quiz.id);

      const conceptCard = getConceptCardForQuiz(quiz);
      const conceptBadgeHtml = conceptCard
        ? `<button class="concept-badge" data-card-id="${conceptCard.id}" title="개념 미리보기">🏷️ ${conceptCard.title}</button>`
        : '';

      let explanationHtml = "";
      if (isMockSubmitted) {
        let whyWrongHtml = "";
        if (quiz.whyWrong && Array.isArray(quiz.whyWrong)) {
          whyWrongHtml = `<ul class="why-wrong-list">`;
          quiz.whyWrong.forEach((reason, i2) => {
            if (reason !== "정답") {
              const letter = String.fromCharCode(65 + i2);
              whyWrongHtml += `<li><strong>${letter}:</strong> ${reason}</li>`;
            }
          });
          whyWrongHtml += `</ul>`;
        }
        explanationHtml = `
          <div class="quiz-explanation">
            <div class="quiz-status ${userChosen === quiz.answer ? 'correct' : 'incorrect'}">
              ${userChosen === quiz.answer ? '정답입니다! 🎉' : '오답입니다. 🥲'}
            </div>
            <p>${quiz.explanation}</p>
            ${whyWrongHtml}
            ${quiz.cardId ? `<button class="concept-link-btn" data-card-id="${quiz.cardId}">📖 핵심 개념 요약 미리보기</button>` : ''}
          </div>
        `;
      }

      html += `
        <div class="quiz-card" id="mock-q-${quiz.id}" data-quiz-id="${quiz.id}">
          <div class="quiz-card-top">
            <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">
              <span class="quiz-meta">${SUBJECT_NAMES[quiz.subject] || ""}</span>
              ${conceptBadgeHtml}
            </div>
            <div class="quiz-actions-top">
              <button class="flag-btn ${isFlagged ? 'active' : ''}" data-quiz-id="${quiz.id}">${isFlagged ? '🚩 검토중' : '🏳️ 검토'}</button>
              <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-quiz-id="${quiz.id}">${isBookmarked ? '⭐' : '☆'}</button>
            </div>
          </div>
          <div class="quiz-question">
            <span class="q-number">Q${index + 1}</span>
            <div class="q-body">${formatQuestionText(quiz.question)}</div>
          </div>
          <div class="quiz-options">
            ${optionsHtml}
          </div>
          ${explanationHtml}
        </div>
      `;
    });

    quizContainer.innerHTML = html;
    quizScoreEl.innerHTML = isMockSubmitted
      ? `최종 제출 완료 · OMR 답안지에서 과목별 채점 결과를 확인하세요.`
      : `총 80문항 진행중 · 선택지를 클릭하면 자동으로 OMR 답안지에 반영됩니다.`;

    bindMockEvents();
  }

  function bindMockEvents() {
    quizContainer.querySelectorAll(".quiz-option").forEach(btn => {
      btn.addEventListener("click", () => {
        if (isMockSubmitted) return;
        const quizId = btn.dataset.quizId;
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        mockSolvedMap.set(quizId, optIdx);
        updateMockQuizCard(quizId);
        updateOmrItem(quizId);
        updateOmrCounts();
      });
    });

    quizContainer.querySelectorAll(".flag-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const quizId = btn.dataset.quizId;
        if (mockFlaggedSet.has(quizId)) mockFlaggedSet.delete(quizId);
        else mockFlaggedSet.add(quizId);
        updateMockQuizCard(quizId);
        updateOmrItem(quizId);
        updateOmrCounts();
      });
    });

    quizContainer.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const quizId = btn.dataset.quizId;
        if (bookmarks.has(quizId)) bookmarks.delete(quizId);
        else bookmarks.add(quizId);
        saveBookmarks();
        updateMockQuizCard(quizId);
      });
    });

    bindConceptLinkButtons();
  }

  function updateMockQuizCard(quizId) {
    const cardEl = document.getElementById(`mock-q-${quizId}`);
    if (!cardEl) return;
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const userChosen = mockSolvedMap.get(quizId);
    const isFlagged = mockFlaggedSet.has(quizId);
    const isBookmarked = bookmarks.has(quizId);

    const optBtns = cardEl.querySelectorAll(".quiz-option");
    optBtns.forEach((btn, optIdx) => {
      let statusClass = "";
      if (isMockSubmitted) {
        if (optIdx === quiz.answer) statusClass = "correct";
        else if (userChosen === optIdx) statusClass = "incorrect";
        else statusClass = "dimmed";
      } else if (userChosen === optIdx) {
        statusClass = "correct";
      }

      btn.className = `quiz-option ${statusClass}`;
      if (isMockSubmitted) btn.disabled = true;
      const icon = btn.querySelector(".option-icon");
      if (icon) {
        icon.textContent = statusClass === 'correct' ? '✓' : (statusClass === 'incorrect' ? '✗' : '');
      }
    });

    const flagBtn = cardEl.querySelector(".flag-btn");
    if (flagBtn) {
      flagBtn.className = `flag-btn ${isFlagged ? 'active' : ''}`;
      flagBtn.textContent = isFlagged ? '🚩 검토중' : '🏳️ 검토';
    }

    const bookmarkBtn = cardEl.querySelector(".bookmark-btn");
    if (bookmarkBtn) {
      bookmarkBtn.className = `bookmark-btn ${isBookmarked ? 'active' : ''}`;
      bookmarkBtn.textContent = isBookmarked ? '⭐' : '☆';
    }
  }

  function updateOmrCounts() {
    const count = mockSolvedMap.size;
    omrSolvedCountEl.textContent = count;
    if (omrProgress) omrProgress.textContent = `${count} / 80`;
    if (omrFlagCount) omrFlagCount.textContent = mockFlaggedSet.size;
  }

  function updateOmrItem(quizId) {
    const itemEl = omrGrid.querySelector(`.omr-item[data-quiz-id="${quizId}"]`);
    if (!itemEl) return;

    const isSolved = mockSolvedMap.has(quizId);
    const isFlagged = mockFlaggedSet.has(quizId);
    const chosenOpt = mockSolvedMap.get(quizId);
    const letter = chosenOpt !== undefined ? String.fromCharCode(65 + chosenOpt) : "";

    itemEl.className = `omr-item ${isSolved ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}`;
    const choiceEl = itemEl.querySelector(".omr-choice");
    if (choiceEl) choiceEl.textContent = letter || '-';
  }

  function renderOmrGrid() {
    let html = "";
    mockQuizzes.forEach((quiz, index) => {
      const isSolved = mockSolvedMap.has(quiz.id);
      const isFlagged = mockFlaggedSet.has(quiz.id);
      const chosenOpt = mockSolvedMap.get(quiz.id);
      const letter = chosenOpt !== undefined ? String.fromCharCode(65 + chosenOpt) : "";

      html += `
        <div class="omr-item ${isSolved ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}" data-quiz-id="${quiz.id}">
          <span class="omr-qnum">${index + 1}</span>
          <span class="omr-choice">${letter || '-'}</span>
        </div>
      `;
    });
    omrGrid.innerHTML = html;

    omrGrid.querySelectorAll(".omr-item").forEach(item => {
      item.addEventListener("click", () => {
        const qId = item.dataset.quizId;
        const targetEl = document.getElementById(`mock-q-${qId}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          if (window.innerWidth < 768) toggleOmr(false);
        }
      });
    });
  }

  function submitMockExam() {
    if (isMockSubmitted) return;
    const unanswered = 80 - mockSolvedMap.size;
    if (unanswered > 0) {
      if (!confirm(`아직 풀지 않은 문제가 ${unanswered}개 있습니다. 정말 최종 제출하시겠습니까?`)) return;
    } else {
      if (!confirm("모든 문제 풀이를 완료하셨습니다. 최종 채점을 진행할까요?")) return;
    }

    clearInterval(timerInterval);
    isMockSubmitted = true;

    const subjectScores = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let totalCorrect = 0;

    mockQuizzes.forEach(quiz => {
      const userChoice = mockSolvedMap.get(quiz.id);
      const isCorrect = userChoice === quiz.answer;

      if (isCorrect) {
        totalCorrect++;
        if (subjectScores[quiz.subject] !== undefined) {
          subjectScores[quiz.subject] += 5;
        }
      }
      recordStat(quiz.subject, isCorrect, quiz.cardId);
    });

    const overallScore = Math.round((totalCorrect / 80) * 100);

    let isFailBySubject = false;
    Object.keys(subjectScores).forEach(sub => {
      if (subjectScores[sub] < 40) isFailBySubject = true;
    });
    const isPassed = !isFailBySubject && overallScore >= 60;

    renderMockQuizzes();
    renderOmrGrid();

    showExamResultModal(overallScore, subjectScores, isPassed, isFailBySubject);
  }

  function showExamResultModal(overallScore, subjectScores, isPassed, isFailBySubject) {
    let resultTitle = isPassed ? "🎉 축하합니다! 필기 시험 합격입니다!" : "🥲 불합격입니다. (약점 보충 필요)";
    let badgeClass = isPassed ? "pass" : "fail";
    let subReason = "";

    if (!isPassed) {
      if (isFailBySubject) subReason = " ⚠️ 40점 미만 과락 과목이 존재합니다.";
      else subReason = " ⚠️ 평균 점수가 60점 미만입니다.";
    }

    const detailHtml = `
      <div class="result-status-badge ${badgeClass}">
        ${resultTitle}
        <div style="font-size:0.9rem; font-weight:normal; margin-top:4px;">총점: ${overallScore}점 / 100점 ${subReason}</div>
      </div>
      <div class="subject-stats-list">
        ${[1, 2, 3, 4].map(sub => `
          <div class="subject-stat-item">
            <div class="subject-stat-head">
              <span>${SUBJECT_NAMES[sub]}</span>
              <span style="color: ${subjectScores[sub] < 40 ? 'var(--danger-color)' : 'var(--primary-color)'}">${subjectScores[sub]}점 ${subjectScores[sub] < 40 ? '(과락)' : ''}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${subjectScores[sub] < 40 ? 'warning' : 'good'}" style="width: ${subjectScores[sub]}%"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    statsModal.classList.remove("hidden");
    statsModal.querySelector(".modal-header h2").textContent = "⏱️ 실전 CBT 모의고사 성적표";
    statsModal.querySelector(".stats-summary-cards").style.display = "none";
    statsModal.querySelector(".stats-section-title").textContent = "과목별 상세 채점 결과";
    subjectStatsContainer.innerHTML = detailHtml;
    weaknessAlert.classList.add("hidden");
  }

  function toggleOmr(show) {
    const isHidden = omrDrawer.classList.contains("hidden");
    const targetState = show !== undefined ? !show : !isHidden;
    omrDrawer.classList.toggle("hidden", targetState);
    if (omrOverlay) omrOverlay.classList.toggle("hidden", targetState);
  }

  openOmrBtn.addEventListener("click", () => toggleOmr());
  closeOmrBtn.addEventListener("click", () => toggleOmr(false));
  if (omrOverlay) omrOverlay.addEventListener("click", () => toggleOmr(false));
  submitExamBtn.addEventListener("click", submitMockExam);
  omrSubmitBtn.addEventListener("click", submitMockExam);

  // === 3. 퀴즈 툴바 & 연습 모드 ===
  function renderQuizToolbar() {
    let subjectBtns = `<button class="filter-chip ${quizFilter.subject === 'all' && !quizFilter.conceptCardId ? 'active' : ''}" data-filter="subject" data-value="all">전체과목</button>`;
    subjectBtns += `<button class="filter-chip ${quizFilter.subject === 'exam10th' && !quizFilter.conceptCardId ? 'active' : ''}" data-filter="subject" data-value="exam10th" style="border-color:var(--primary-color);">🏆 10회 기출 (80제)</button>`;
    [1, 2, 3, 4].forEach(s => {
      subjectBtns += `<button class="filter-chip ${quizFilter.subject === s && !quizFilter.conceptCardId ? 'active' : ''}" data-filter="subject" data-value="${s}">${SUBJECT_NAMES[s] || (s + "과목")}</button>`;
    });

    const diffLabels = { all: "전체 난이도", easy: "쉬움", medium: "보통", hard: "어려움" };
    let diffBtns = Object.keys(diffLabels).map(d =>
      `<button class="filter-chip diff-chip ${quizFilter.difficulty === d ? 'active' : ''}" data-filter="difficulty" data-value="${d}">${diffLabels[d]}</button>`
    ).join("");

    let conceptChip = "";
    if (quizFilter.conceptCardId) {
      const cCard = cardMap.get(quizFilter.conceptCardId);
      const cTitle = cCard ? cCard.title : quizFilter.conceptCardId;
      conceptChip = `<button id="clearConceptFilterBtn" class="filter-chip active" style="background-color:var(--success-color); border-color:var(--success-color);">🎯 개념: ${cTitle} ✕</button>`;
    }

    quizToolbarEl.innerHTML = `
      <div class="filter-row" style="align-items:center;">
        ${conceptChip}
        ${subjectBtns}
        <div class="quiz-search-box">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="quizSearchInput" placeholder="개념/문제 키워드 검색..." value="${quizFilter.keyword || ''}" />
        </div>
      </div>
      <div class="filter-row">${diffBtns}</div>
      <div class="filter-row action-row">
        <button id="wrongOnlyBtn" class="btn-small ${quizFilter.onlyWrong ? 'active' : ''}">오답만 복습 (${wrongIds.size})</button>
        <button id="bookmarkOnlyBtn" class="btn-small ${quizFilter.onlyBookmarked ? 'active' : ''}">⭐ 즐겨찾기 (${bookmarks.size})</button>
        <button id="shuffleBtn" class="btn-small">🔀 순서 섞기</button>
        <button id="resetQuizBtn" class="btn-small">↺ 초기화</button>
      </div>
    `;

    if (document.getElementById("clearConceptFilterBtn")) {
      document.getElementById("clearConceptFilterBtn").addEventListener("click", () => {
        quizFilter.conceptCardId = null;
        applyQuizFilter();
        renderQuizToolbar();
      });
    }

    const quizSearchInput = document.getElementById("quizSearchInput");
    if (quizSearchInput) {
      let qDebounce = null;
      quizSearchInput.addEventListener("input", (e) => {
        clearTimeout(qDebounce);
        qDebounce = setTimeout(() => {
          quizFilter.keyword = e.target.value;
          applyQuizFilter();
        }, 200);
      });
    }

    quizToolbarEl.querySelectorAll(".filter-chip:not(#clearConceptFilterBtn)").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.filter;
        let value = btn.dataset.value;
        if (key === "subject" && value !== "all" && value !== "exam10th") value = parseInt(value, 10);
        quizFilter[key] = value;
        quizFilter.conceptCardId = null;
        applyQuizFilter();
        renderQuizToolbar();
      });
    });

    document.getElementById("wrongOnlyBtn").addEventListener("click", () => {
      quizFilter.onlyWrong = !quizFilter.onlyWrong;
      if (quizFilter.onlyWrong) { quizFilter.onlyBookmarked = false; quizFilter.conceptCardId = null; }
      applyQuizFilter();
      renderQuizToolbar();
    });
    document.getElementById("bookmarkOnlyBtn").addEventListener("click", () => {
      quizFilter.onlyBookmarked = !quizFilter.onlyBookmarked;
      if (quizFilter.onlyBookmarked) { quizFilter.onlyWrong = false; quizFilter.conceptCardId = null; }
      applyQuizFilter();
      renderQuizToolbar();
    });
    document.getElementById("shuffleBtn").addEventListener("click", () => {
      shuffleArray(workingQuizzes);
      currentPage = 1;
      renderQuizzes(workingQuizzes);
    });
    document.getElementById("resetQuizBtn").addEventListener("click", () => {
      if (!confirm("풀이 기록을 초기화할까요? 즐겨찾기는 유지됩니다.")) return;
      wrongIds.clear();
      solvedMap.clear();
      chosenAnswerMap.clear();
      quizFilter.onlyWrong = false;
      quizFilter.conceptCardId = null;
      quizFilter.keyword = "";
      applyQuizFilter();
      renderQuizToolbar();
    });
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function applyQuizFilter() {
    workingQuizzes = allQuizzes.filter(q => {
      if (quizFilter.conceptCardId) {
        if (q.cardId === quizFilter.conceptCardId) return true;
        const card = cardMap.get(quizFilter.conceptCardId);
        if (card && ((q.question && q.question.includes(card.title)) || (q.chapter && q.chapter.includes(card.title)))) {
          return true;
        }
        return false;
      }
      if (quizFilter.subject === "exam10th") {
        if (q.sectionId !== "exam10th") return false;
      } else if (quizFilter.subject !== "all" && q.subject !== quizFilter.subject) {
        return false;
      }
      if (quizFilter.difficulty !== "all" && q.difficulty !== quizFilter.difficulty) return false;
      if (quizFilter.onlyWrong && !wrongIds.has(q.id)) return false;
      if (quizFilter.onlyBookmarked && !bookmarks.has(q.id)) return false;
      if (quizFilter.keyword && quizFilter.keyword.trim() !== "") {
        const kw = quizFilter.keyword.trim().toLowerCase();
        const qText = (q.question + " " + q.explanation).toLowerCase();
        const concept = getConceptCardForQuiz(q);
        const cTitle = concept ? concept.title.toLowerCase() : "";
        if (!qText.includes(kw) && !cTitle.includes(kw)) return false;
      }
      return true;
    });
    currentPage = 1;
    renderQuizzes(workingQuizzes);
  }

  function formatQuestionText(text) {
    const lines = String(text).split("\n");
    const introLines = [];
    const statementLines = [];
    let inStatements = false;
    lines.forEach(raw => {
      const line = raw.trim();
      if (line === "") return;
      if (/^[ㄱㄴㄷㄹㅁ]\.\s?/.test(line)) {
        inStatements = true;
        statementLines.push(line);
      } else if (!inStatements) {
        introLines.push(line);
      } else {
        statementLines[statementLines.length - 1] += " " + line;
      }
    });
    let html = `<div class="question-intro">${introLines.join("<br>")}</div>`;
    if (statementLines.length > 0) {
      html += `<ul class="statement-list">${statementLines.map(l => {
        const m = l.match(/^([ㄱㄴㄷㄹㅁ])\.\s?(.*)$/);
        if (!m) return `<li>${l}</li>`;
        return `<li><span class="statement-tag">${m[1]}</span><span class="statement-text">${m[2]}</span></li>`;
      }).join("")}</ul>`;
    }
    return html;
  }

  function renderPaginationControls(totalItems, totalPages, position) {
    if (totalPages <= 1) return "";
    const start = (currentPage - 1) * QUIZ_PAGE_SIZE + 1;
    const end = Math.min(currentPage * QUIZ_PAGE_SIZE, totalItems);

    const pageNumbers = [];
    const windowSize = 2;
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= currentPage - windowSize && p <= currentPage + windowSize)) {
        pageNumbers.push(p);
      } else if (pageNumbers[pageNumbers.length - 1] !== "…") {
        pageNumbers.push("…");
      }
    }

    const pageBtns = pageNumbers.map(p =>
      p === "…"
        ? `<span class="page-ellipsis">…</span>`
        : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
    ).join("");

    return `
      <div class="quiz-pagination" data-position="${position}">
        <span class="page-range-label">${start}–${end} / 전체 ${totalItems}문항</span>
        <div class="page-controls">
          <button class="page-nav-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>‹ 이전</button>
          <div class="page-numbers">${pageBtns}</div>
          <button class="page-nav-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>다음 ›</button>
        </div>
      </div>
    `;
  }

  function renderQuizzes(quizzes) {
    if (!quizzes || quizzes.length === 0) {
      quizContainer.innerHTML = `<div class="loading">조건에 맞는 문제가 없습니다. 필터를 조정해보세요.</div>`;
      updateScoreBar();
      return;
    }

    const totalItems = quizzes.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / QUIZ_PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    const pageStart = (currentPage - 1) * QUIZ_PAGE_SIZE;
    const pageItems = quizzes.slice(pageStart, pageStart + QUIZ_PAGE_SIZE);

    const topPagination = renderPaginationControls(totalItems, totalPages, "top");
    const bottomPagination = renderPaginationControls(totalItems, totalPages, "bottom");

    let html = topPagination;
    pageItems.forEach((quiz, i) => {
      const index = pageStart + i;
      let optionsHtml = "";
      const optionsArray = quiz.choices || quiz.options;
      optionsArray.forEach((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx);
        optionsHtml += `<button class="quiz-option" data-quiz-id="${quiz.id}" data-opt-idx="${optIdx}">
          <span class="option-badge">${letter}</span>
          <span class="option-text">${opt}</span>
          <span class="option-keycap">${optIdx + 1}</span>
          <span class="option-icon"></span>
        </button>`;
      });

      let whyWrongHtml = "";
      if (quiz.whyWrong && Array.isArray(quiz.whyWrong)) {
        whyWrongHtml = `<ul class="why-wrong-list">`;
        quiz.whyWrong.forEach((reason, i2) => {
          if (reason !== "정답") {
            const letter = String.fromCharCode(65 + i2);
            whyWrongHtml += `<li><strong>${letter}:</strong> ${reason}</li>`;
          }
        });
        whyWrongHtml += `</ul>`;
      }

      const isBookmarked = bookmarks.has(quiz.id);
      const solved = solvedMap.has(quiz.id);
      const solvedClass = solved ? "solved" : "";
      const diffLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }[quiz.difficulty] || quiz.difficulty || "";

      const conceptCard = getConceptCardForQuiz(quiz);
      const conceptBadgeHtml = conceptCard
        ? `<button class="concept-badge" data-card-id="${conceptCard.id}" title="개념 미리보기">🏷️ ${conceptCard.title}</button>`
        : '';

      html += `
        <div class="quiz-card ${solvedClass}" id="${quiz.id}" data-answer="${quiz.answer}">
          <div class="quiz-card-top">
            <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">
              <span class="quiz-meta">${SUBJECT_NAMES[quiz.subject] || ""} ${diffLabel ? "· " + diffLabel : ""}</span>
              ${conceptBadgeHtml}
            </div>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-quiz-id="${quiz.id}" title="즐겨찾기">${isBookmarked ? "⭐" : "☆"}</button>
          </div>
          <div class="quiz-question">
            <span class="q-number">Q${index + 1}</span>
            <div class="q-body">${formatQuestionText(quiz.question)}</div>
          </div>
          <div class="quiz-options">
            ${optionsHtml}
          </div>
          <div class="quiz-explanation ${solved ? '' : 'hidden'}">
            <div class="quiz-status"></div>
            <p>${quiz.explanation}</p>
            ${whyWrongHtml}
            ${conceptCard ? `<button class="concept-link-btn" data-card-id="${conceptCard.id}">📖 핵심 개념 요약 미리보기</button>` : ''}
          </div>
        </div>
      `;
    });
    html += bottomPagination;
    quizContainer.innerHTML = html;

    quizContainer.querySelectorAll(".page-btn, .page-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.page;
        if (val === "prev") currentPage = Math.max(1, currentPage - 1);
        else if (val === "next") currentPage = Math.min(totalPages, currentPage + 1);
        else currentPage = parseInt(val, 10);
        renderQuizzes(workingQuizzes);
        quizContentEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    function finalizeCard(card, answerIdx, chosenIdx, isCorrect) {
      const allOpts = card.querySelectorAll(".quiz-option");
      allOpts.forEach((optBtn, idx) => {
        optBtn.disabled = true;
        const icon = optBtn.querySelector(".option-icon");
        if (idx === answerIdx) {
          optBtn.classList.add("correct");
          if (icon) icon.textContent = "✓";
        } else if (idx === chosenIdx && !isCorrect) {
          optBtn.classList.add("incorrect");
          if (icon) icon.textContent = "✗";
        } else {
          optBtn.classList.add("dimmed");
        }
      });
    }

    pageItems.forEach(quiz => {
      if (!solvedMap.has(quiz.id)) return;
      const card = document.getElementById(quiz.id);
      if (!card) return;
      const wasCorrect = solvedMap.get(quiz.id);
      const answerIdx = quiz.answer;
      const chosenIdx = wasCorrect ? answerIdx : (chosenAnswerMap.get(quiz.id) ?? -1);
      const status = card.querySelector(".quiz-status");
      finalizeCard(card, answerIdx, chosenIdx, wasCorrect);
      status.textContent = wasCorrect ? "정답입니다! 🎉" : "오답입니다. 🥲";
      status.classList.add(wasCorrect ? "correct" : "incorrect");
    });

    const options = quizContainer.querySelectorAll(".quiz-option");
    options.forEach(opt => {
      opt.addEventListener("click", (e) => {
        const btn = e.target.closest(".quiz-option");
        const quizCard = btn.closest(".quiz-card");
        const answerIdx = parseInt(quizCard.dataset.answer);
        const clickedIdx = parseInt(btn.dataset.optIdx);
        const quizId = quizCard.id;

        if (quizCard.classList.contains("solved")) return;
        quizCard.classList.add("solved");

        const explanation = quizCard.querySelector(".quiz-explanation");
        const status = quizCard.querySelector(".quiz-status");

        explanation.classList.remove("hidden");

        const isCorrect = clickedIdx === answerIdx;
        status.textContent = isCorrect ? "정답입니다! 🎉" : "오답입니다. 🥲";
        status.classList.add(isCorrect ? "correct" : "incorrect");
        finalizeCard(quizCard, answerIdx, clickedIdx, isCorrect);

        if (isCorrect) {
          wrongIds.delete(quizId);
        } else {
          wrongIds.add(quizId);
        }
        solvedMap.set(quizId, isCorrect);
        chosenAnswerMap.set(quizId, clickedIdx);

        const currentQuiz = allQuizzes.find(q => q.id === quizId);
        if (currentQuiz) recordStat(currentQuiz.subject, isCorrect, currentQuiz.cardId);

        updateScoreBar();
      });
    });

    quizContainer.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const quizId = btn.dataset.quizId;
        if (bookmarks.has(quizId)) {
          bookmarks.delete(quizId);
          btn.textContent = "☆";
          btn.classList.remove("active");
        } else {
          bookmarks.add(quizId);
          btn.textContent = "⭐";
          btn.classList.add("active");
        }
        saveBookmarks();
        renderQuizToolbar();
      });
    });

    bindConceptLinkButtons();
    updateScoreBar();
  }

  // === 4. 개념 미리보기 모달 2.0 및 양방향 연계 처리 ===
  function bindConceptLinkButtons() {
    document.querySelectorAll(".concept-link-btn, .concept-badge").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cardId = btn.dataset.cardId;
        if (!cardId) return;

        if (mainLayout.classList.contains("split-view")) {
          jumpToFullNote(cardId);
          return;
        }

        openConceptModal(cardId, "note");
      });
    });
  }

  function openConceptModal(cardId, initialTab = "note") {
    activeConceptCardId = cardId;
    const cardData = cardMap.get(cardId) || { id: cardId, title: "핵심 개념", blocks: [] };
    const relatedQuizzes = getQuizzesForCard(cardId);

    conceptModalTitle.textContent = cardData.title;
    conceptRelatedCount.textContent = relatedQuizzes.length;

    // 1. 요약노트 블록 렌더링
    if (cardData.blocks && cardData.blocks.length > 0) {
      conceptModalBodyNote.innerHTML = cardData.blocks.map(renderBlock).join("");
    } else {
      conceptModalBodyNote.innerHTML = `<div class="note">해당 개념의 핵심 요약 내용입니다.</div>`;
    }

    // 2. 관련 기출문제 렌더링
    if (relatedQuizzes.length > 0) {
      conceptModalBodyQuiz.innerHTML = relatedQuizzes.map((q, idx) => {
        const opts = q.choices || q.options || [];
        const answerLetter = String.fromCharCode(65 + q.answer);
        return `
          <div class="related-quiz-item">
            <div style="font-weight:600; margin-bottom:8px;">Q${idx + 1}. ${q.question}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">
              정답: <strong style="color:var(--success-color);">${answerLetter}. ${opts[q.answer] || ''}</strong>
            </div>
            <div style="font-size:0.83rem; background:rgba(0,122,255,0.06); padding:8px 12px; border-radius:6px; color:var(--text-color);">
              💡 <strong>해설:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }).join("");
    } else {
      conceptModalBodyQuiz.innerHTML = `<div class="note">이 개념에 직접 연결된 기출문제가 없습니다.</div>`;
    }

    switchConceptModalTab(initialTab);
    conceptModal.classList.remove("hidden");
  }

  function switchConceptModalTab(tabName) {
    if (tabName === "quiz") {
      tabConceptNote.classList.remove("active");
      tabConceptQuiz.classList.add("active");
      conceptModalBodyNote.classList.add("hidden");
      conceptModalBodyQuiz.classList.remove("hidden");
    } else {
      tabConceptNote.classList.add("active");
      tabConceptQuiz.classList.remove("active");
      conceptModalBodyNote.classList.remove("hidden");
      conceptModalBodyQuiz.classList.add("hidden");
    }
  }

  tabConceptNote.addEventListener("click", () => switchConceptModalTab("note"));
  tabConceptQuiz.addEventListener("click", () => switchConceptModalTab("quiz"));

  practiceConceptBtn.addEventListener("click", () => {
    if (!activeConceptCardId) return;
    conceptModal.classList.add("hidden");
    quizFilter.conceptCardId = activeConceptCardId;
    quizFilter.onlyWrong = false;
    quizFilter.onlyBookmarked = false;

    if (quizContentEl.classList.contains("hidden")) {
      quizContentEl.classList.remove("hidden");
      contentEl.classList.add("hidden");
      sidebar.style.display = "none";
      quizToggleBtn.textContent = "요약노트 보기";
      quizToggleBtn.style.backgroundColor = "var(--success-color)";
    }
    setMode("practice");
    applyQuizFilter();
    renderQuizToolbar();
  });

  function jumpToFullNote(cardId) {
    conceptModal.classList.add("hidden");

    if (!mainLayout.classList.contains("split-view")) {
      quizContentEl.classList.add("hidden");
      contentEl.classList.remove("hidden");
      sidebar.style.display = "";
      quizToggleBtn.textContent = "문제 풀기";
      quizToggleBtn.style.backgroundColor = "";
    }

    const targetCard = document.getElementById(cardId);
    if (targetCard) {
      targetCard.classList.add("open");
      targetCard.classList.add("highlight-target");
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        targetCard.classList.remove("highlight-target");
      }, 3000);
    }
  }

  closeConceptBtn.addEventListener("click", () => conceptModal.classList.add("hidden"));
  closeConceptModalBtn.addEventListener("click", () => conceptModal.classList.add("hidden"));
  jumpToFullNoteBtn.addEventListener("click", () => {
    if (activeConceptCardId) jumpToFullNote(activeConceptCardId);
  });

  function updateScoreBar() {
    const total = workingQuizzes.length;
    let solvedInView = 0, correctInView = 0;
    workingQuizzes.forEach(q => {
      if (solvedMap.has(q.id)) {
        solvedInView++;
        if (solvedMap.get(q.id)) correctInView++;
      }
    });
    const accuracy = solvedInView > 0 ? Math.round((correctInView / solvedInView) * 100) : 0;
    quizScoreEl.innerHTML = total > 0
      ? `진행 <strong>${solvedInView} / ${total}</strong> &nbsp;·&nbsp; 정답 <strong>${correctInView}</strong> &nbsp;·&nbsp; 정답률 <strong>${accuracy}%</strong>`
      : "";
  }

  // === 5. 화면 분할 뷰 (Split View) ===
  splitViewBtn.addEventListener("click", () => {
    const isSplit = mainLayout.classList.toggle("split-view");
    splitViewBtn.classList.toggle("active", isSplit);

    if (isSplit) {
      contentEl.classList.remove("hidden");
      quizContentEl.classList.remove("hidden");
      sidebar.style.display = "none";
    } else {
      if (quizToggleBtn.textContent === "요약노트 보기") {
        contentEl.classList.add("hidden");
        quizContentEl.classList.remove("hidden");
      } else {
        contentEl.classList.remove("hidden");
        quizContentEl.classList.add("hidden");
        sidebar.style.display = "";
      }
    }
  });

  // === 6. 학습 통계 및 약점 분석 모달 (취약 개념 Top 3 진단) ===
  statsToggleBtn.addEventListener("click", openStatsModal);
  closeStatsBtn.addEventListener("click", () => statsModal.classList.add("hidden"));
  closeStatsModalBtn.addEventListener("click", () => statsModal.classList.add("hidden"));

  function openStatsModal() {
    statsModal.classList.remove("hidden");
    statsModal.querySelector(".modal-header h2").textContent = "📊 학습 성적 & 약점 분석";
    statsModal.querySelector(".stats-summary-cards").style.display = "grid";
    statsModal.querySelector(".stats-section-title").textContent = "과목별 정답률 및 보충 필요도";

    statTotalSolved.textContent = cumulativeStats.totalSolved;
    const overallAcc = cumulativeStats.totalSolved > 0
      ? Math.round((cumulativeStats.totalCorrect / cumulativeStats.totalSolved) * 100)
      : 0;
    statOverallAccuracy.textContent = `${overallAcc}%`;
    statBookmarks.textContent = bookmarks.size;

    let lowestSub = null;
    let lowestAcc = 101;

    let html = "";
    [1, 2, 3, 4].forEach(sub => {
      const sData = cumulativeStats.subjects[sub] || { solved: 0, correct: 0 };
      const acc = sData.solved > 0 ? Math.round((sData.correct / sData.solved) * 100) : 0;

      if (sData.solved >= 3 && acc < lowestAcc) {
        lowestAcc = acc;
        lowestSub = sub;
      }

      const isWarning = acc < 60 && sData.solved > 0;
      html += `
        <div class="subject-stat-item">
          <div class="subject-stat-head">
            <span>${SUBJECT_NAMES[sub]}</span>
            <span>${acc}% (${sData.correct}/${sData.solved}문항)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${isWarning ? 'warning' : 'good'}" style="width: ${acc}%"></div>
          </div>
        </div>
      `;
    });

    subjectStatsContainer.innerHTML = html;

    if (lowestSub && lowestAcc < 60) {
      weaknessAlert.classList.remove("hidden");
      weaknessAlert.innerHTML = `
        <strong>⚠️ 취약 과목 진단:</strong><br>
        [${SUBJECT_NAMES[lowestSub]}]의 정답률이 <strong>${lowestAcc}%</strong>로 가장 낮습니다. 관련 요약노트 복습을 추천합니다!
      `;
    } else {
      weaknessAlert.classList.add("hidden");
    }

    // === 취약 개념 Top 3 진단 ===
    const conceptsData = cumulativeStats.concepts || {};
    const weakList = [];

    Object.keys(conceptsData).forEach(cId => {
      const stat = conceptsData[cId];
      if (stat.solved >= 2) {
        const acc = Math.round((stat.correct / stat.solved) * 100);
        if (acc < 70) {
          const card = cardMap.get(cId);
          const title = card ? card.title : `개념 (${cId})`;
          weakList.push({ cardId: cId, title, solved: stat.solved, correct: stat.correct, acc });
        }
      }
    });

    weakList.sort((a, b) => a.acc - b.acc);
    const topWeak = weakList.slice(0, 3);

    if (topWeak.length > 0) {
      weakConceptContainer.classList.remove("hidden");
      let listHtml = topWeak.map(item => `
        <div class="weak-concept-item">
          <div class="weak-concept-info">
            <span class="weak-concept-name">${item.title}</span>
            <span class="weak-concept-stats">정답률 ${item.acc}% (${item.correct}/${item.solved}문항)</span>
          </div>
          <div class="weak-concept-actions">
            <button class="btn-small weak-note-btn" data-card-id="${item.cardId}">📖 복습</button>
            <button class="btn-small weak-quiz-btn" data-card-id="${item.cardId}">🎯 문제 풀기</button>
          </div>
        </div>
      `).join("");

      weakConceptContainer.innerHTML = `
        <div class="weak-concept-title">🔥 취약 개념 집중 보충 추천 Top ${topWeak.length}</div>
        <div class="weak-concept-list">${listHtml}</div>
      `;

      weakConceptContainer.querySelectorAll(".weak-note-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          statsModal.classList.add("hidden");
          openConceptModal(btn.dataset.cardId, "note");
        });
      });

      weakConceptContainer.querySelectorAll(".weak-quiz-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          statsModal.classList.add("hidden");
          quizFilter.conceptCardId = btn.dataset.cardId;
          applyQuizFilter();
          renderQuizToolbar();
          if (quizContentEl.classList.contains("hidden")) {
            quizContentEl.classList.remove("hidden");
            contentEl.classList.add("hidden");
            sidebar.style.display = "none";
            quizToggleBtn.textContent = "요약노트 보기";
            quizToggleBtn.style.backgroundColor = "var(--success-color)";
          }
          setMode("practice");
        });
      });
    } else {
      weakConceptContainer.classList.add("hidden");
    }
  }

  resetStatsBtn.addEventListener("click", () => {
    if (!confirm("누적 학습 통계 기록을 초기화할까요?")) return;
    cumulativeStats = {
      totalSolved: 0,
      totalCorrect: 0,
      subjects: { 1: { solved: 0, correct: 0 }, 2: { solved: 0, correct: 0 }, 3: { solved: 0, correct: 0 }, 4: { solved: 0, correct: 0 } },
      concepts: {}
    };
    saveStats();
    openStatsModal();
  });

  // === 7. UI 기본 인터랙션 ===
  function bindCardEvents() {
    const headers = document.querySelectorAll(".card-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const card = header.parentElement;
        card.classList.toggle("open");
      });
    });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function clearHighlights() {
    document.querySelectorAll(".card-title-text mark").forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  let searchDebounceTimer = null;
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.classList.add("hidden");
      runSearch("");
    });
  }

  searchInput.addEventListener("input", (e) => {
    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle("hidden", e.target.value.trim() === "");
    }
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => runSearch(e.target.value), 150);
  });

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    const cards = document.querySelectorAll(".card");
    let visibleCount = 0;

    clearHighlights();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matches = query === "" || text.includes(query);
      if (matches) {
        card.classList.remove("hidden");
        if (query !== "") {
          card.classList.add("open");
          visibleCount++;
          const titleEl = card.querySelector(".card-title-text");
          if (titleEl && query.length > 0) {
            const re = new RegExp(`(${escapeRegex(rawQuery.trim())})`, "ig");
            titleEl.innerHTML = titleEl.textContent.replace(re, "<mark>$1</mark>");
          }
        }
      } else {
        card.classList.add("hidden");
      }
    });

    document.querySelectorAll(".section").forEach(section => {
      const visibleCards = section.querySelectorAll(".card:not(.hidden)");
      section.classList.toggle("hidden", query !== "" && visibleCards.length === 0);
    });

    if (query === "") {
      searchStatusEl.classList.add("hidden");
    } else {
      searchStatusEl.classList.remove("hidden");
      searchStatusEl.textContent = visibleCount > 0
        ? `"${rawQuery.trim()}" 검색 결과 ${visibleCount}건`
        : `"${rawQuery.trim()}"에 대한 검색 결과가 없습니다.`;
    }
  }

  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  const overlay = document.getElementById("overlay");
  function openSidebar() {
    sidebar.classList.add("open");
    if (window.innerWidth < 1024) {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  menuBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  navEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link") && window.innerWidth < 1024) {
      closeSidebar();
    }
  });

  expandAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.add("open"));
  });
  collapseAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    toTopBtn.classList.toggle("visible", window.scrollY > 300);
  });
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  quizToggleBtn.addEventListener("click", () => {
    const isQuizHidden = quizContentEl.classList.contains("hidden");
    if (isQuizHidden) {
      quizContentEl.classList.remove("hidden");
      contentEl.classList.add("hidden");
      sidebar.style.display = "none";
      quizToggleBtn.textContent = "요약노트 보기";
      quizToggleBtn.style.backgroundColor = "var(--success-color)";
    } else {
      quizContentEl.classList.add("hidden");
      contentEl.classList.remove("hidden");
      sidebar.style.display = "";
      quizToggleBtn.textContent = "문제 풀기";
      quizToggleBtn.style.backgroundColor = "";
    }
  });

  document.querySelectorAll(".bottom-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".bottom-nav-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const targetNav = item.dataset.nav;

      if (targetNav === "notes") {
        quizContentEl.classList.add("hidden");
        contentEl.classList.remove("hidden");
        sidebar.style.display = "";
        quizToggleBtn.textContent = "문제 풀기";
        quizToggleBtn.style.backgroundColor = "";
      } else if (targetNav === "practice") {
        quizContentEl.classList.remove("hidden");
        contentEl.classList.add("hidden");
        sidebar.style.display = "none";
        quizToggleBtn.textContent = "요약노트 보기";
        quizToggleBtn.style.backgroundColor = "var(--success-color)";
        setMode("practice");
      } else if (targetNav === "mock") {
        quizContentEl.classList.remove("hidden");
        contentEl.classList.add("hidden");
        sidebar.style.display = "none";
        quizToggleBtn.textContent = "요약노트 보기";
        quizToggleBtn.style.backgroundColor = "var(--success-color)";
        setMode("mock");
      } else if (targetNav === "stats") {
        openStatsModal();
      }
    });
  });

  // === 8. PC 키보드 단축키 (1, 2, 3, 4 선택, F 검토, Ctrl+K 검색) ===
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const isModalOpen = (statsModal && !statsModal.classList.contains("hidden")) ||
                        (conceptModal && !conceptModal.classList.contains("hidden")) ||
                        (omrDrawer && !omrDrawer.classList.contains("hidden"));
    if (isModalOpen) return;

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      return;
    }

    if (["1", "2", "3", "4"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const firstVisibleCard = Array.from(document.querySelectorAll(".quiz-card")).find(card => {
        const rect = card.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.7;
      });

      if (firstVisibleCard) {
        const opts = firstVisibleCard.querySelectorAll(".quiz-option");
        if (opts[idx] && !opts[idx].disabled) {
          opts[idx].click();
        }
      }
    } else if (e.key.toLowerCase() === "f") {
      const firstVisibleCard = Array.from(document.querySelectorAll(".quiz-card")).find(card => {
        const rect = card.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.7;
      });
      if (firstVisibleCard) {
        const flagBtn = firstVisibleCard.querySelector(".flag-btn");
        if (flagBtn) flagBtn.click();
      }
    }
  });

  // === 9. PWA 서비스 워커 등록 & 오프라인 감지 ===
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("PWA ServiceWorker registered:", reg.scope))
        .catch(err => console.error("PWA ServiceWorker registration failed:", err));
    });
  }

  function updateOnlineStatus() {
    if (!navigator.onLine) {
      console.log("Offline mode activated!");
    }
  }
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});