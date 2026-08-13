import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_code = """  // === 7. UI 기본 인터랙션 ===
  function bindCardEvents() {
    updateProgressBar();
  }

  // Global Event Delegation for Cards (Runs once)
  contentEl.addEventListener("click", (e) => {
    const header = e.target.closest(".card-header");
    if (header) {
      if(e.target.closest('.card-header-actions')) return;
      const card = header.parentElement;
      card.classList.toggle("open");
      return;
    }

    const btnLearned = e.target.closest(".btn-learned");
    if (btnLearned) {
      e.stopPropagation();
      const cardId = btnLearned.dataset.cardId;
      const cardEl = document.getElementById(cardId);
      
      if (learnedConcepts.has(cardId)) {
        learnedConcepts.delete(cardId);
        btnLearned.classList.remove("active");
        btnLearned.textContent = "학습 완료";
        if(cardEl) cardEl.classList.remove("learned");
      } else {
        learnedConcepts.add(cardId);
        btnLearned.classList.add("active");
        btnLearned.textContent = "✓ 학습 완료";
        if(cardEl) cardEl.classList.add("learned");
      }
      saveLearnedConcepts();
      return;
    }

    const btnDirectQuiz = e.target.closest(".btn-direct-quiz");
    if (btnDirectQuiz) {
      e.stopPropagation();
      const cardId = btnDirectQuiz.dataset.cardId;
      
      activeConceptCardId = cardId;
      quizFilter.conceptCardId = cardId;
      quizFilter.onlyWrong = false;
      quizFilter.onlyBookmarked = false;
      
      if (quizContentEl.classList.contains("hidden")) {
        quizContentEl.classList.remove("hidden");
        contentEl.classList.add("hidden");
        sidebar.style.display = "none";
        quizToggleBtn.textContent = "요약노트 보기";
        quizToggleBtn.style.backgroundColor = "var(--success-color)";
        
        document.querySelectorAll('.bottom-nav-item').forEach(n => n.classList.remove('active'));
        const practiceNav = document.querySelector('.bottom-nav-item[data-nav="practice"]');
        if(practiceNav) practiceNav.classList.add('active');
      }
      
      setMode("practice");
      applyQuizFilter();
      renderQuizToolbar();
      return;
    }

    const btnInlineQuiz = e.target.closest(".inline-quiz-btn");
    if (btnInlineQuiz) {
      e.stopPropagation();
      const cardId = btnInlineQuiz.dataset.cardId;
      const renderArea = document.getElementById(`inline-quiz-render-${cardId}`);
      
      if (!renderArea.classList.contains("hidden")) {
        renderArea.classList.add("hidden");
        btnInlineQuiz.textContent = "✨ 방금 읽은 개념, 딱 1문제로 확인하기";
        return;
      }

      const cQuizzes = getQuizzesForCard(cardId);
      if (cQuizzes.length === 0) {
        renderArea.innerHTML = `<div style="padding:10px; color:var(--text-muted); font-size:0.9rem;">이 개념과 관련된 기출문제가 아직 없습니다.</div>`;
        renderArea.classList.remove("hidden");
        return;
      }

      shuffleArray(cQuizzes);
      const q = cQuizzes[0];
      
      renderArea.innerHTML = `
        <div class="inline-quiz-box">
          <div style="font-weight:700; margin-bottom:12px; font-size:1.05rem;">Q. ${formatQuestionText(q.question)}</div>
          <div class="inline-options" style="display:flex; flex-direction:column; gap:8px;">
            ${(q.choices || q.options).map((opt, i) => `
              <button class="inline-opt-btn" onclick="checkInlineQuiz(this, '${cardId}', ${i}, ${q.answer})" style="text-align:left; padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-color); cursor:pointer; font-size:0.95rem; display:flex; gap:10px;">
                <span style="font-weight:bold; color:var(--text-muted);">${String.fromCharCode(65+i)}</span> <span>${opt}</span>
              </button>
            `).join("")}
          </div>
          <div id="inline-exp-${cardId}" class="inline-quiz-explanation hidden" style="margin-top:12px; padding:14px; background:var(--surface-hover); border-radius:8px; font-size:0.95rem; border-left:3px solid var(--primary-color);">
            <div id="inline-res-${cardId}" style="font-weight:700; margin-bottom:6px; font-size:1.1rem;"></div>
            <p>${q.explanation}</p>
          </div>
        </div>
      `;
      renderArea.classList.remove("hidden");
      btnInlineQuiz.textContent = "접기 ✕";
      return;
    }

    const memoToggleBtn = e.target.closest(".memo-toggle-btn");
    if (memoToggleBtn) {
      e.stopPropagation();
      const cardId = memoToggleBtn.dataset.cardId;
      const memoContent = document.getElementById(`memo-content-${cardId}`);
      if (memoContent.style.display === "none" || !memoContent.style.display) {
        memoContent.style.display = "flex";
      } else {
        memoContent.style.display = "none";
      }
      return;
    }

    const memoSaveBtn = e.target.closest(".memo-save-btn");
    if (memoSaveBtn) {
      e.stopPropagation();
      const cardId = memoSaveBtn.dataset.cardId;
      const textarea = document.getElementById(`memo-input-${cardId}`);
      const text = textarea.value.trim();
      
      conceptMemos[cardId] = text;
      saveConceptMemos();
      
      const toggleBtn = document.querySelector(`.memo-toggle-btn[data-card-id="${cardId}"]`);
      if (toggleBtn) {
        toggleBtn.innerHTML = text ? "✏️ 나만의 메모장 (작성됨)" : "✏️ 나만의 메모장";
      }
      
      const originalText = memoSaveBtn.textContent;
      memoSaveBtn.textContent = "저장됨!";
      setTimeout(() => { memoSaveBtn.textContent = originalText; }, 1500);
      return;
    }
  });"""

content = re.sub(r'  // === 7\. UI 기본 인터랙션 ===\n  function bindCardEvents\(\) \{.*?(?=  function escapeRegex)', new_code + '\\n\\n', content, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
