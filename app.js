/**
 * 빅데이터분석기사 요약노트 (Refactored for Studying)
 * 
 * 1. 데이터 로드 및 렌더링 (Load & Render)
 * 2. 검색 기능 (Search)
 * 3. UI 인터랙션 (UI Interactions - 다크모드, 사이드바, 맨 위로)
 */

document.addEventListener("DOMContentLoaded", () => {
  // === DOM 요소 캐싱 ===
  const contentEl = document.getElementById("content");
  const quizContentEl = document.getElementById("quiz-content");
  const quizContainer = document.getElementById("quiz-container");
  const quizToggleBtn = document.getElementById("quizToggleBtn");
  const navEl = document.getElementById("nav-container");
  const searchInput = document.getElementById("searchInput");
  const themeBtn = document.getElementById("themeToggleBtn");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  const toTopBtn = document.getElementById("toTop");
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");

  // 데이터 보관용 변수
  let allCards = [];
  
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
      renderQuizzes(data.questions);
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
              <h3>${card.title}</h3>
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

  // 1-4. 퀴즈 렌더링
  function renderQuizzes(quizzes) {
    if (!quizzes || quizzes.length === 0) {
      quizContainer.innerHTML = "<p>등록된 문제가 없습니다.</p>";
      return;
    }
    
    let html = "";
    quizzes.forEach((quiz, index) => {
      let optionsHtml = "";
      const optionsArray = quiz.choices || quiz.options; 
      optionsArray.forEach((opt, optIdx) => {
        optionsHtml += `<button class="quiz-option" data-quiz-id="${quiz.id}" data-opt-idx="${optIdx}">${optIdx + 1}. ${opt}</button>`;
      });
      
      let whyWrongHtml = "";
      if (quiz.whyWrong && Array.isArray(quiz.whyWrong)) {
        whyWrongHtml = `<ul style="margin-top: 10px; font-size: 0.9em; color: var(--text-muted); list-style-type: none; padding-left: 0;">`;
        quiz.whyWrong.forEach((reason, i) => {
            if (reason !== "정답") {
                whyWrongHtml += `<li style="margin-bottom: 4px;"><strong>${i+1}번 오답 노트:</strong> ${reason}</li>`;
            }
        });
        whyWrongHtml += `</ul>`;
      }

      html += `
        <div class="quiz-card" id="${quiz.id}" data-answer="${quiz.answer}">
          <div class="quiz-question">Q${index + 1}. ${quiz.question}</div>
          <div class="quiz-options">
            ${optionsHtml}
          </div>
          <div class="quiz-explanation hidden">
            <div class="quiz-status"></div>
            <p>${quiz.explanation}</p>
            ${whyWrongHtml}
          </div>
        </div>
      `;
    });
    quizContainer.innerHTML = html;
    
    // 퀴즈 옵션 클릭 이벤트
    const options = quizContainer.querySelectorAll(".quiz-option");
    options.forEach(opt => {
      opt.addEventListener("click", (e) => {
        const btn = e.target;
        const quizCard = btn.closest(".quiz-card");
        const answerIdx = parseInt(quizCard.dataset.answer);
        const clickedIdx = parseInt(btn.dataset.optIdx);
        
        // 이미 푼 문제면 무시
        if (quizCard.classList.contains("solved")) return;
        quizCard.classList.add("solved");
        
        const explanation = quizCard.querySelector(".quiz-explanation");
        const status = quizCard.querySelector(".quiz-status");
        const allOpts = quizCard.querySelectorAll(".quiz-option");
        
        explanation.classList.remove("hidden");
        
        if (clickedIdx === answerIdx) {
          btn.classList.add("correct");
          status.textContent = "정답입니다! 🎉";
          status.classList.add("correct");
        } else {
          btn.classList.add("incorrect");
          status.textContent = "오답입니다. 🥲";
          status.classList.add("incorrect");
          // 정답 표시
          allOpts[answerIdx].classList.add("correct");
        }
      });
    });
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

  // 2-2. 검색 기능 (단순 텍스트 필터링)
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
      // 카드의 텍스트 내용 전체를 기준으로 검색
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.classList.remove("hidden");
        // 검색어가 있으면 해당 카드를 자동으로 열어줌
        if (query.trim() !== "") card.classList.add("open");
      } else {
        card.classList.add("hidden");
      }
    });
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