const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// Replace setupWrongContainerDelegation completely with full interactive feature set
const startMarker = '  // --- DELEGATION 2: Wrong Notes Container ---';
const endMarker = '  // --- DELEGATION 3: OMR Grid ---';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found in app.js', { startIdx, endIdx });
  process.exit(1);
}

const replacementDelegation = `  // --- DELEGATION 2: Wrong Notes Container & Filters ---
  function setupWrongContainerDelegation() {
    // A. Wrong Filter Chip Bar Listeners
    const wrongFilterBar = document.querySelector(".wrong-filters-scroll-bar");
    if (wrongFilterBar) {
      wrongFilterBar.addEventListener("click", e => {
        const btn = e.target.closest(".wrong-filter-btn");
        if (btn) {
          const filter = btn.dataset.filter || "all";
          wrongFilterBar.querySelectorAll(".wrong-filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          renderWrongNotesView(filter);
        }
      });
    }

    // B. Retry All Wrong Button (Top Action)
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
        showToast(\`⚡ [오답 집중 탈출 모드] \${activeWrongQuizzes.length}문항 풀이가 시작되었습니다!\`);
      });
    }

    // C. Retry Gichul Wrong Button (Top Action)
    const retryGichulBtn = document.getElementById("retryGichulWrongBtn");
    if (retryGichulBtn) {
      retryGichulBtn.addEventListener("click", () => {
        const gichulWrongQuizzes = allQuizzes.filter(q => {
          const qStat = cumulativeStats.quizzes[q.id];
          const isG = q._isGichul || isGichulQuestion(q);
          return qStat && qStat.wrongCount > 0 && !qStat.mastered && isG;
        });
        if (gichulWrongQuizzes.length === 0) {
          showToast("👑 현재 풀이 가능한 기출 오답 문항이 없습니다. 기출 모의고사를 풀어보세요!");
          return;
        }
        workingQuizzes = [...gichulWrongQuizzes];
        switchNav("practice");
        renderQuizzes(true);
        showToast(\`👑 [기출 오답 풀기 모드] \${gichulWrongQuizzes.length}문항 풀이가 시작되었습니다!\`);
      });
    }

    // D. Wrong Card Events inside wrongListContainer
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
          toggleExpBtn.textContent = isHidden ? "🙈 해설 접기" : "💡 해설 & 출제 트랩 보기";
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

        if (!cumulativeStats.quizzes[quiz.id]) {
          cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 1, mastered: false, correctStreak: 0 };
        }
        const stat = cumulativeStats.quizzes[quiz.id];

        if (isCorrect) {
          optBtn.classList.add("correct");
          card.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
          stat.correctStreak = (stat.correctStreak || 0) + 1;
          if (stat.correctStreak >= 2) {
            stat.mastered = true;
            showToast("🏆 2회 연속 정답! '오답 마스터 졸업'을 달성했습니다!");
            triggerConfetti();
          } else {
            showToast("🔥 1회 정답! 1번 더 맞히면 오답 마스터로 졸업합니다!");
          }
          scheduleSave();
          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.textContent = "🙈 해설 접기";
          setTimeout(() => renderWrongNotesView(currentWrongFilter || "all"), 1100);
        } else {
          optBtn.classList.add("incorrect");
          stat.wrongCount = (stat.wrongCount || 0) + 1;
          stat.correctStreak = 0;
          stat.mastered = false;
          scheduleSave();
          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.textContent = "🙈 해설 접기";
          showToast("❌ 오답입니다! 출제 트랩과 핵심 요약을 확인해 보세요.");
        }
        return;
      }

      // 2. Retry single card (reset options)
      const retryCardBtn = e.target.closest(".btn-retry-wrong-card");
      if (retryCardBtn) {
        const card = retryCardBtn.closest(".quiz-card");
        if (card) {
          card.querySelectorAll(".quiz-option").forEach(b => {
            b.disabled = false;
            b.classList.remove("correct", "incorrect");
          });
          const expBox = card.querySelector(".quiz-explanation-box");
          if (expBox) expBox.style.display = "none";
          const toggleBtn = card.querySelector(".toggle-wrong-explain-btn");
          if (toggleBtn) toggleBtn.textContent = "💡 해설 & 출제 트랩 보기";
          showToast("🔄 선지 선택이 초기화되었습니다. 다시 풀어보세요!");
        }
        return;
      }

      // 3. Unmaster card (restore to wrong notes)
      const unmasterBtn = e.target.closest(".btn-unmaster-wrong");
      if (unmasterBtn) {
        const quizId = unmasterBtn.dataset.id;
        if (quizId && cumulativeStats.quizzes[quizId]) {
          cumulativeStats.quizzes[quizId].mastered = false;
          cumulativeStats.quizzes[quizId].correctStreak = 0;
          cumulativeStats.quizzes[quizId].wrongCount = 1;
          scheduleSave();
          renderWrongNotesView(currentWrongFilter || "all");
          showToast("↩️ 해당 문제가 오답노트에 다시 등록되었습니다.");
        }
        return;
      }

      // 4. Bookmark star
      const star = e.target.closest(".bookmark-star-btn");
      if (star) {
        const quizId = star.dataset.id;
        if (!quizId) return;
        if (bookmarks.has(quizId)) bookmarks.delete(quizId);
        else bookmarks.add(quizId);
        saveJSON(BOOKMARK_KEY, [...bookmarks]);
        renderWrongNotesView(currentWrongFilter || "all");
        return;
      }

      // 5. View Concept Modal
      const conceptBtn = e.target.closest(".view-concept-btn");
      if (conceptBtn) {
        const cardId = conceptBtn.dataset.card;
        if (cardId) openConceptModal(cardId);
        return;
      }

      // 6. View Tutor
      const tutorBtn = e.target.closest(".view-tutor-btn");
      if (tutorBtn) {
        switchNav("tutor");
        return;
      }

      // 7. Navigation button
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        const targetNav = navBtn.dataset.nav;
        if (targetNav) switchNav(targetNav);
        return;
      }
    });
  }

`;

code = code.slice(0, startIdx) + replacementDelegation + code.slice(endIdx);
fs.writeFileSync(appPath, code, 'utf8');
console.log('Successfully upgraded wrong notes event delegation and filter handlers in app.js!');
