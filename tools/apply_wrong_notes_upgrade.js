const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let lines = fs.readFileSync(appPath, 'utf8').split('\n');

// 1. Declare currentWrongFilter if not present
let decIdx = lines.findIndex(l => l.includes('let isSprintMode = false;'));
if (decIdx !== -1 && !lines[decIdx + 1].includes('currentWrongFilter')) {
  lines.splice(decIdx + 1, 0, '  let currentWrongFilter = "all";');
}

// 2. Fix practice mode mastery assignment (do not set wrongCount = 0)
let wrongStreakIdx = lines.findIndex(l => l.includes('qStat.wrongCount = 0;'));
if (wrongStreakIdx !== -1 && lines[wrongStreakIdx - 1].includes('qStat.mastered = true;')) {
  lines.splice(wrongStreakIdx, 1);
}

// 3. Replace section 13: renderWrongNotesView
let sec13Start = lines.findIndex(l => l.includes('function renderWrongNotesView(filter'));
let sec13End = lines.findIndex(l => l.includes('14. CONCEPT NOTES & SEARCH ENGINE'));

if (sec13Start !== -1 && sec13End !== -1) {
  // Find opening of function and closing brace before sec14
  let endBraceIdx = sec13End - 1;
  while (endBraceIdx > sec13Start && !lines[endBraceIdx].includes('}')) {
    endBraceIdx--;
  }

  const newSectionLines = [
`  function updateWrongHeaderCounts() {
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

      wrongListContainer.innerHTML = \`
        <div style="text-align: center; padding: 60px 20px; background: var(--surface); border-radius: var(--radius-lg); border: 1.5px solid var(--line);">
          <div style="font-size: 42px; margin-bottom: 12px;">\${emptyIcon}</div>
          <h3 style="font-size: 18px; font-weight: 950; margin-bottom: 8px;">\${emptyTitle}</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            \${emptyMsg}
          </p>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="button button-brand" data-nav="practice">
              📝 새로운 기출문제 풀러가기 ➔
            </button>
          </div>
        </div>
      \`;
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
        gichulBadgeHTML = \`<span class="quiz-tag-badge gichul-badge">\${rLabel}</span>\`;
      }

      html += \`
        <div class="quiz-card wrong-note-card \${isMastered ? 'mastered-card' : ''}" id="wrong-card-\${quiz.id}" data-id="\${quiz.id}" style="border-left: 5px solid \${isMastered ? 'var(--success)' : (qStat.wrongCount >= 2 ? 'var(--danger)' : '#F59E0B')};">
          <div class="quiz-card-header">
            <div class="quiz-badges-group">
              <span class="quiz-subject-badge">\${SUBJECT_NAMES[quiz.subject]}</span>
              \${gichulBadgeHTML}
              <span class="badge-tag" style="background: \${qStat.wrongCount >= 2 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)'}; color: \${qStat.wrongCount >= 2 ? 'var(--danger)' : '#B45309'}; border:none; font-weight:850;">
                ⚠️ \${qStat.wrongCount || 1}회 오답
              </span>
              \${isMastered ? '<span class="badge-tag" style="background:rgba(52, 199, 89, 0.15); color:var(--success); border:none; font-weight:850;">✓ 2회 연속 정답 (마스터 졸업)</span>' : ''}
            </div>
            <div class="quiz-actions-top">
              <span class="bookmark-star-btn \${bookmarks.has(quiz.id) ? 'bookmarked' : ''}" data-id="\${quiz.id}" title="북마크 저장">
                \${bookmarks.has(quiz.id) ? '★' : '☆'}
              </span>
            </div>
          </div>

          <!-- 2-Strike Mastery Status Indicator Bar -->
          <div class="strike-status-box">
            <div class="strike-dot-track">
              <span class="strike-dot \${streak >= 1 ? 'filled' : ''}"></span>
              <span class="strike-dot \${streak >= 2 || isMastered ? 'filled' : ''}"></span>
            </div>
            <span class="strike-text \${isMastered ? 'mastered' : (streak === 1 ? 'half' : '')}">
              \${isMastered ? '🎉 2회 연속 정답 (마스터 완료!)' : (streak === 1 ? '🔥 1/2 정답 (1번 더 맞히면 졸업!)' : '⚪ 0/2 (2회 연속 정답 시 마스터 졸업)')}
            </span>
          </div>

          <div class="quiz-question-text">
            \${formatQuestionText(quiz.question, idx + 1)}
          </div>

          <div class="quiz-options-list">
            \${(quiz.choices || []).map((choice, cIdx) => \`
              <button class="quiz-option wrong-retry-option" data-choice="\${cIdx}">
                <span class="option-num">\${cIdx + 1}</span>
                <span>\${escapeHTML(choice)}</span>
              </button>
            \`).join("")}
          </div>

          <!-- Wrong Card Interactive Action Bar -->
          <div class="wrong-card-action-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
            <button class="button button-sm button-light btn-retry-wrong-card" data-id="\${quiz.id}" title="선지 선택을 초기화하고 다시 풉니다" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>🔄</span> <span>다시 풀기</span>
            </button>
            <button class="button button-sm button-light toggle-wrong-explain-btn" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>💡</span> <span>해설 & 출제 트랩 보기</span>
            </button>
            \${quiz.cardId ? \`
              <button class="button button-sm button-light view-concept-btn" data-card="\${quiz.cardId}" title="관련 요약노트 보기" style="font-weight: 800; border-radius: var(--radius-pill);">
                <span>📖</span> <span>핵심요약</span>
              </button>
            \` : ""}
            <button class="button button-sm button-light view-tutor-btn" data-subject="\${quiz.subject}" title="1:1 AI 튜터에게 질문하기" style="font-weight: 800; border-radius: var(--radius-pill);">
              <span>🎯</span> <span>AI 튜터</span>
            </button>
            \${isMastered ? \`
              <button class="button button-sm button-light btn-unmaster-wrong" data-id="\${quiz.id}" title="오답노트에 다시 담아 복습합니다" style="font-weight: 800; border-radius: var(--radius-pill); color: #B45309;">
                <span>↩️</span> <span>오답노트 복귀</span>
              </button>
            \` : ""}
          </div>

          <!-- Structured Explanation Box -->
          <div class="quiz-explanation-box" style="display: none; margin-top: 14px;">
            <div class="quiz-explanation-text">
              \${formatExplanationText(quiz.explanation || "")}
            </div>

            \${(quiz.whyWrong && quiz.whyWrong[quiz.answer] && quiz.whyWrong[quiz.answer].trim() !== "") ? \`
              <div class="correct-answer-reason" style="margin-top: 12px; padding: 10px 14px; background: rgba(52, 199, 89, 0.06); border-radius: var(--radius-sm); border: 1px solid rgba(52, 199, 89, 0.3);">
                <strong>\${quiz.answer + 1}번 보기가 정답인 이유:</strong> \${escapeHTML(quiz.whyWrong[quiz.answer])}
              </div>
            \` : ""}

            \${quiz.memorizationPoint ? \`
              <div class="keypoint-card" style="margin-top: 12px; padding: 12px 16px; background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--brand); border-radius: var(--radius-sm);">
                <div class="keypoint-card-header" style="font-weight: 850; font-size: 13px; color: var(--brand); margin-bottom: 4px;">
                  <span>🎯</span> <span>실제 기출 핵심 포인트 & 필수 암기</span>
                </div>
                <div class="keypoint-card-body" style="font-size: 13.5px; line-height: 1.6;">
                  \${escapeHTML(quiz.memorizationPoint)}
                </div>
              </div>
            \` : ""}

            \${quiz.examinerTip ? \`
              <div class="examiner-tip-card" style="margin-top: 12px; padding: 12px 16px; background: var(--surface); border: 1px solid var(--line); border-left: 4px solid #F59E0B; border-radius: var(--radius-sm);">
                <div class="examiner-tip-header" style="font-weight: 850; font-size: 13px; color: #D97706; margin-bottom: 4px;">
                  <span>💡</span> <span>출제위원의 비밀 꿀팁 & 함정 탈출법</span>
                </div>
                <div class="examiner-tip-body" style="font-size: 13.5px; line-height: 1.6;">
                  \${escapeHTML(quiz.examinerTip)}
                </div>
              </div>
            \` : ""}

            \${quiz.whyWrong && quiz.whyWrong.length > 0 ? \`
              <div class="trap-breakdown-box" style="margin-top: 12px;">
                <div class="trap-breakdown-title" style="font-size: 13px; font-weight: 850; color: var(--danger); margin-bottom: 6px;">
                  ⚠️ 보기별 오답 함정(Trap) 분석
                </div>
                <div class="choice-trap-box" style="display: flex; flex-direction: column; gap: 6px;">
                  \${quiz.choices.map((choiceText, cIdx) => {
                    const isTargetAns = cIdx === quiz.answer;
                    const trapDesc = (quiz.optionTraps && quiz.optionTraps[cIdx]) || (quiz.whyWrong && quiz.whyWrong[cIdx]);
                    return \`
                      <div class="choice-trap-item \${isTargetAns ? 'correct-trap' : 'wrong-trap'}" style="padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid \${isTargetAns ? 'var(--success)' : 'var(--line-bold)'}; background: \${isTargetAns ? 'rgba(52, 199, 89, 0.05)' : 'var(--paper-subtle)'}; font-size: 12.5px;">
                        <span style="font-weight: 750; color: \${isTargetAns ? 'var(--success)' : 'var(--text-bold)'};">\${cIdx + 1}번 선지: </span>
                        <span>"\${escapeHTML(choiceText)}"</span>
                        \${trapDesc ? \`<div style="margin-top: 2px; color: \${isTargetAns ? 'var(--success)' : 'var(--text-muted)'}; font-size: 12px;">👉 \${escapeHTML(trapDesc)}</div>\` : ""}
                      </div>
                    \`;
                  }).join("")}
                </div>
              </div>
            \` : ""}

            \${memo ? \`
              <div style="background: var(--paper); border: 1px dashed var(--line-bold); border-radius: var(--radius-sm); padding: 10px; margin-top: 12px; font-size: 12px; font-weight: 700;">
                📝 <strong>내 암기 메모:</strong> \${escapeHTML(memo)}
              </div>
            \` : ""}
          </div>
        </div>
      \`;
    });

    wrongListContainer.innerHTML = html;
    renderMathFormulas(wrongListContainer);
  }`
  ];

  lines.splice(sec13Start, endBraceIdx - sec13Start + 1, ...newSectionLines);
}

// 4. Replace setupWrongContainerDelegation
let delegStart = lines.findIndex(l => l.includes('function setupWrongContainerDelegation('));
let delegEnd = lines.findIndex(l => l.includes('// --- DELEGATION 3: Top Navigation ---'));

if (delegStart !== -1 && delegEnd !== -1) {
  let endBraceIdx = delegEnd - 1;
  while (endBraceIdx > delegStart && !lines[endBraceIdx].includes('}')) {
    endBraceIdx--;
  }

  const newDelegLines = [
`  function setupWrongContainerDelegation() {
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
          toggleExpBtn.innerHTML = isHidden ? "<span>🙈</span> <span>해설 접기</span>" : "<span>💡</span> <span>해설 & 출제 트랩 보기</span>";
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
          cumulativeStats.quizzes[quiz.id] = { solved: 0, correct: 0, wrongCount: 1, mastered: false, correctStreak: 0, hasWrong: true };
        }
        const qStat = cumulativeStats.quizzes[quiz.id];
        qStat.solved = (qStat.solved || 0) + 1;

        if (isCorrect) {
          optBtn.classList.add("correct");
          card.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
          qStat.correct = (qStat.correct || 0) + 1;
          qStat.correctStreak = (qStat.correctStreak || 0) + 1;
          
          if (qStat.correctStreak >= 2) {
            qStat.mastered = true;
            triggerConfetti();
            showToast("🎉 2회 연속 정답! '오답노트 완전 졸업(마스터)' 성공!");
          } else {
            showToast("👍 1회 연속 정답! 1번 더 맞히면 오답노트에서 완전히 졸업합니다! (1/2)");
          }
          scheduleSave();
          
          // Update card strike dots and text in real-time
          const strikeDots = card.querySelectorAll(".strike-dot");
          if (strikeDots[0]) strikeDots[0].classList.toggle("filled", qStat.correctStreak >= 1);
          if (strikeDots[1]) strikeDots[1].classList.toggle("filled", qStat.correctStreak >= 2 || qStat.mastered);
          const strikeText = card.querySelector(".strike-text");
          if (strikeText) {
            strikeText.className = "strike-text " + (qStat.mastered ? "mastered" : (qStat.correctStreak === 1 ? "half" : ""));
            strikeText.textContent = qStat.mastered ? "🎉 2회 연속 정답 (마스터 완료!)" : (qStat.correctStreak === 1 ? "🔥 1/2 정답 (1번 더 맞히면 졸업!)" : "⚪ 0/2 (2회 연속 정답 시 마스터 졸업)");
          }

          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.innerHTML = "<span>🙈</span> <span>해설 접기</span>";
          updateWrongHeaderCounts();
        } else {
          optBtn.classList.add("incorrect");
          const correctOpt = card.querySelector(\`.wrong-retry-option[data-choice="\${quiz.answer}"]\`);
          if (correctOpt) correctOpt.classList.add("correct");
          card.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);

          qStat.wrongCount = (qStat.wrongCount || 0) + 1;
          qStat.hasWrong = true;
          qStat.correctStreak = 0;
          qStat.mastered = false;
          scheduleSave();

          const strikeDots = card.querySelectorAll(".strike-dot");
          if (strikeDots[0]) strikeDots[0].classList.remove("filled");
          if (strikeDots[1]) strikeDots[1].classList.remove("filled");
          const strikeText = card.querySelector(".strike-text");
          if (strikeText) {
            strikeText.className = "strike-text";
            strikeText.textContent = "⚪ 0/2 (2회 연속 정답 시 마스터 졸업)";
          }

          if (expBox) expBox.style.display = "block";
          if (toggleBtn) toggleBtn.innerHTML = "<span>🙈</span> <span>해설 접기</span>";
          showToast("❌ 오답입니다! 출제 트랩과 핵심 해설을 확인해 보세요.");
          updateWrongHeaderCounts();
        }
        return;
      }

      // 2. Reset card retry button (선지 활성화 재도전)
      const cardRetryBtn = e.target.closest(".btn-retry-wrong-card");
      if (cardRetryBtn) {
        const card = cardRetryBtn.closest(".quiz-card");
        if (!card) return;
        card.querySelectorAll(".quiz-option").forEach(b => {
          b.disabled = false;
          b.classList.remove("correct", "incorrect", "dimmed");
        });
        showToast("🔄 선지 선택이 초기화되었습니다. 다시 풀어보세요!");
        return;
      }

      // 3. Unmaster button (오답노트 복귀)
      const unmasterBtn = e.target.closest(".btn-unmaster-wrong");
      if (unmasterBtn) {
        const quizId = unmasterBtn.dataset.id;
        if (quizId && cumulativeStats.quizzes[quizId]) {
          cumulativeStats.quizzes[quizId].mastered = false;
          cumulativeStats.quizzes[quizId].correctStreak = 0;
          scheduleSave();
          showToast("↩️ 문제가 다시 오답노트로 복귀되었습니다!");
          renderWrongNotesView(currentWrongFilter);
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
        renderWrongNotesView(currentWrongFilter);
        return;
      }

      // 5. View Concept
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

    // ⚡ 오답 전체 다시 풀기 (Practice View 연동)
    const retryAllBtn = document.getElementById("retryAllWrongBtn");
    if (retryAllBtn) {
      retryAllBtn.addEventListener("click", () => {
        const allTracked = allQuizzes.filter(q => {
          const s = cumulativeStats.quizzes[q.id];
          return s && (s.wrongCount > 0 || s.hasWrong) && !s.mastered;
        });
        if (allTracked.length === 0) {
          showToast("🎉 현재 미해결 오답 문항이 없습니다!");
          return;
        }
        workingQuizzes = [...allTracked];
        switchNav("practice");
        currentMode = "practice";
        renderQuizzes(true);
        showToast(\`⚡ [오답 전체 탈출 모드] 총 \${allTracked.length}문항 풀이가 시작되었습니다!\`);
      });
    }

    // 👑 기출 오답만 다시 풀기
    const retryGichulBtn = document.getElementById("retryGichulWrongBtn");
    if (retryGichulBtn) {
      retryGichulBtn.addEventListener("click", () => {
        const gichulWrong = allQuizzes.filter(q => {
          const s = cumulativeStats.quizzes[q.id];
          return s && (s.wrongCount > 0 || s.hasWrong) && !s.mastered && q._isGichul;
        });
        if (gichulWrong.length === 0) {
          showToast("🎉 현재 미해결 기출 오답 문항이 없습니다!");
          return;
        }
        workingQuizzes = [...gichulWrong];
        switchNav("practice");
        currentMode = "practice";
        renderQuizzes(true);
        showToast(\`👑 [기출 오답 집중 탈출 모드] 총 \${gichulWrong.length}문항 풀이가 시작되었습니다!\`);
      });
    }
  }`
  ];

  lines.splice(delegStart, endBraceIdx - delegStart + 1, ...newDelegLines);
}

fs.writeFileSync(appPath, lines.join('\n'), 'utf8');
console.log('Successfully updated app.js line-by-line!');
