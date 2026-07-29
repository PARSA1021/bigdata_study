/**
 * 빅데이터분석기사 요약노트 (Refactored for Studying)
 *
 * 1. 데이터 로드 및 렌더링 (Load & Render)
 * 2. 검색 기능 (Search) - 하이라이트, 결과 없음 안내, 섹션 자동 숨김
 * 3. UI 인터랙션 (UI Interactions - 다크모드, 사이드바, 맨 위로)
 * 4. CBT 퀴즈 모드 - 과목/난이도 필터, 진행률·정답률, 오답노트, 즐겨찾기, 셔플
 */

document.addEventListener("DOMContentLoaded", () => {
  // === DOM 요소 캐싱 ===
  const contentEl = document.getElementById("content");
  const quizContentEl = document.getElementById("quiz-content");
  const quizContainer = document.getElementById("quiz-container");
  const quizToolbarEl = document.getElementById("quiz-toolbar");
  const quizScoreEl = document.getElementById("quiz-score");
  const quizToggleBtn = document.getElementById("quizToggleBtn");
  const navEl = document.getElementById("nav-container");
  const searchInput = document.getElementById("searchInput");
  const searchStatusEl = document.getElementById("searchStatus");
  const themeBtn = document.getElementById("themeToggleBtn");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  const toTopBtn = document.getElementById("toTop");
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");

  // 데이터 보관용 변수
  let allCards = [];

  // === 퀴즈 상태 관리 ===
  const SUBJECT_NAMES = {
    1: "1과목 · 분석 기획",
    2: "2과목 · 데이터 탐색",
    3: "3과목 · 데이터 모델링",
    4: "4과목 · 결과 해석"
  };
  const BOOKMARK_KEY = "cbt_bookmarks";
  let allQuizzes = [];       // 원본 전체 문제
  let workingQuizzes = [];   // 현재 필터/셔플 적용된 문제 목록
  let bookmarks = new Set(loadBookmarks());
  let quizFilter = { subject: "all", difficulty: "all", onlyWrong: false, onlyBookmarked: false };
  let wrongIds = new Set();
  let solvedMap = new Map(); // quizId -> boolean(correct)
  let chosenAnswerMap = new Map(); // quizId -> selected option index
  const QUIZ_PAGE_SIZE = 10;
  let currentPage = 1;

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

  // === 1. 데이터 로드 및 렌더링 ===
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      renderNav(data.nav);
      renderContent(data.sections);
      bindCardEvents();
    })
    .catch(error => {
      contentEl.innerHTML = `<div class="loading">데이터를 불러오는데 실패했습니다: ${error.message}</div>`;
    });

  fetch("cbt_bank.json")
    .then(response => response.json())
    .then(data => {
      allQuizzes = data.questions || [];
      applyQuizFilter();
      renderQuizToolbar();
    })
    .catch(error => {
      quizContainer.innerHTML = `<div class="loading">문제은행 데이터를 불러오는데 실패했습니다: ${error.message}</div>`;
    });

  // 1-1. 네비게이션(사이드바) 렌더링
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

  // 1-2. 메인 컨텐츠 렌더링
  function renderContent(sections) {
    if (!sections) return;
    let html = "";
    allCards = []; // 검색을 위해 모든 카드 저장

    sections.forEach(sec => {
      html += `
        <section class="section" id="${sec.id}">
          <h2 class="section-title">${sec.num} ${sec.title}</h2>
      `;

      sec.cards.forEach(card => {
        allCards.push(card);
        const blocksHtml = card.blocks.map(renderBlock).join("");

        // 카드 열림 상태 (기본적으로 첫번째 카드는 열어두거나 설정에 따라)
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

  // === 4. 퀴즈 툴바 (과목/난이도 필터, 셔플, 오답노트, 즐겨찾기) ===
  function renderQuizToolbar() {
    const subjects = [...new Set(allQuizzes.map(q => q.subject))].sort();

    let subjectBtns = `<button class="filter-chip ${quizFilter.subject === 'all' ? 'active' : ''}" data-filter="subject" data-value="all">전체</button>`;
    subjects.forEach(s => {
      subjectBtns += `<button class="filter-chip ${quizFilter.subject === s ? 'active' : ''}" data-filter="subject" data-value="${s}">${SUBJECT_NAMES[s] || (s + "과목")}</button>`;
    });

    const diffLabels = { all: "전체 난이도", easy: "쉬움", medium: "보통", hard: "어려움" };
    let diffBtns = Object.keys(diffLabels).map(d =>
      `<button class="filter-chip diff-chip ${quizFilter.difficulty === d ? 'active' : ''}" data-filter="difficulty" data-value="${d}">${diffLabels[d]}</button>`
    ).join("");

    quizToolbarEl.innerHTML = `
      <div class="filter-row">${subjectBtns}</div>
      <div class="filter-row">${diffBtns}</div>
      <div class="filter-row action-row">
        <button id="wrongOnlyBtn" class="btn-small ${quizFilter.onlyWrong ? 'active' : ''}">오답만 다시 풀기 (${wrongIds.size})</button>
        <button id="bookmarkOnlyBtn" class="btn-small ${quizFilter.onlyBookmarked ? 'active' : ''}">⭐ 즐겨찾기만 (${bookmarks.size})</button>
        <button id="shuffleBtn" class="btn-small">🔀 순서 섞기</button>
        <button id="resetQuizBtn" class="btn-small">↺ 전체 초기화</button>
      </div>
    `;

    quizToolbarEl.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.filter;
        let value = btn.dataset.value;
        if (key === "subject" && value !== "all") value = parseInt(value, 10);
        quizFilter[key] = value;
        applyQuizFilter();
        renderQuizToolbar();
      });
    });

    document.getElementById("wrongOnlyBtn").addEventListener("click", () => {
      quizFilter.onlyWrong = !quizFilter.onlyWrong;
      if (quizFilter.onlyWrong) quizFilter.onlyBookmarked = false;
      applyQuizFilter();
      renderQuizToolbar();
    });
    document.getElementById("bookmarkOnlyBtn").addEventListener("click", () => {
      quizFilter.onlyBookmarked = !quizFilter.onlyBookmarked;
      if (quizFilter.onlyBookmarked) quizFilter.onlyWrong = false;
      applyQuizFilter();
      renderQuizToolbar();
    });
    document.getElementById("shuffleBtn").addEventListener("click", () => {
      shuffleArray(workingQuizzes);
      currentPage = 1;
      renderQuizzes(workingQuizzes);
    });
    document.getElementById("resetQuizBtn").addEventListener("click", () => {
      if (!confirm("전체 풀이 기록(정답/오답, 점수)을 초기화할까요? 즐겨찾기는 유지됩니다.")) return;
      wrongIds.clear();
      solvedMap.clear();
      chosenAnswerMap.clear();
      quizFilter.onlyWrong = false;
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
      if (quizFilter.subject !== "all" && q.subject !== quizFilter.subject) return false;
      if (quizFilter.difficulty !== "all" && q.difficulty !== quizFilter.difficulty) return false;
      if (quizFilter.onlyWrong && !wrongIds.has(q.id)) return false;
      if (quizFilter.onlyBookmarked && !bookmarks.has(q.id)) return false;
      return true;
    });
    currentPage = 1;
    renderQuizzes(workingQuizzes);
  }

  // 1-4. 퀴즈 렌더링
  // 문제 본문에 포함된 줄바꿈과 ㄱ.ㄴ.ㄷ.ㄹ. 보기를 보기 좋게 구조화해서 렌더링
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
        // 보기 항목이 줄바꿈으로 이어지는 경우 마지막 항목에 이어붙임
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

    // 페이지 번호 버튼: 현재 페이지 주변 몇 개만 표시
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
      const index = pageStart + i; // 필터링된 목록 내 전체 순번(0-base)
      let optionsHtml = "";
      const optionsArray = quiz.choices || quiz.options;
      optionsArray.forEach((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
        optionsHtml += `<button class="quiz-option" data-quiz-id="${quiz.id}" data-opt-idx="${optIdx}">
          <span class="option-badge">${letter}</span>
          <span class="option-text">${opt}</span>
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

      html += `
        <div class="quiz-card ${solvedClass}" id="${quiz.id}" data-answer="${quiz.answer}">
          <div class="quiz-card-top">
            <span class="quiz-meta">${SUBJECT_NAMES[quiz.subject] || ""} ${diffLabel ? "· " + diffLabel : ""}</span>
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
          </div>
        </div>
      `;
    });
    html += bottomPagination;
    quizContainer.innerHTML = html;

    // 페이지네이션 버튼 이벤트
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

    // 옵션 상태 마무리 처리 (아이콘 표시, 미선택 오답 흐리게, 클릭 잠금)
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

    // 이미 푼 문제 상태 복원
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

    // 퀴즈 옵션 클릭 이벤트
    const options = quizContainer.querySelectorAll(".quiz-option");
    options.forEach(opt => {
      opt.addEventListener("click", (e) => {
        const btn = e.target.closest(".quiz-option");
        const quizCard = btn.closest(".quiz-card");
        const answerIdx = parseInt(quizCard.dataset.answer);
        const clickedIdx = parseInt(btn.dataset.optIdx);
        const quizId = quizCard.id;

        // 이미 푼 문제면 무시
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
        updateScoreBar();
      });
    });

    // 즐겨찾기 버튼 이벤트
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

    updateScoreBar();
  }

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

  // === 2. 이벤트 바인딩 ===

  // 2-1. 카드 아코디언 토글
  function bindCardEvents() {
    const headers = document.querySelectorAll(".card-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const card = header.parentElement;
        card.classList.toggle("open");
      });
    });
  }

  // 2-2. 검색 기능 (텍스트 필터링 + 하이라이트 + 결과없음 안내)
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
  searchInput.addEventListener("input", (e) => {
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

    // 섹션 단위로 표시되는 카드가 하나도 없으면 섹션 제목도 숨김
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

  // 검색창 단축키 (Ctrl/⌘ + K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // 2-3. 전체 펼치기 / 접기
  expandAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.add("open"));
  });

  collapseAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("open"));
  });

  // 2-4. 다크 모드 토글
  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // 2-5. 모바일 사이드바 토글
  const overlay = document.getElementById("overlay");

  function openSidebar() {
    sidebar.classList.add("open");
    if (window.innerWidth < 1024) {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지
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

  // 사이드바 링크 클릭시 모바일이면 닫기
  navEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link") && window.innerWidth < 1024) {
      closeSidebar();
    }
  });

  // 2-6. 맨 위로 가기 버튼
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopBtn.classList.add("visible");
    } else {
      toTopBtn.classList.remove("visible");
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 2-7. 퀴즈 모드 토글
  quizToggleBtn.addEventListener("click", () => {
    const isQuizMode = !quizContentEl.classList.contains("hidden");
    if (isQuizMode) {
      // 요약노트 모드로 돌아가기
      quizContentEl.classList.add("hidden");
      contentEl.classList.remove("hidden");
      sidebar.style.display = ""; // 사이드바 보이기 (기본값)
      quizToggleBtn.textContent = "문제 풀기";
      quizToggleBtn.style.backgroundColor = "";
    } else {
      // 문제 풀기 모드로 전환
      quizContentEl.classList.remove("hidden");
      contentEl.classList.add("hidden");
      sidebar.style.display = "none"; // 문제 풀때는 사이드바 숨기기 (공간 확보)
      quizToggleBtn.textContent = "요약노트 보기";
      quizToggleBtn.style.backgroundColor = "var(--success, #059669)";
    }
  });
});