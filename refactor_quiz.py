import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_code = """
  // === Quiz Container Event Delegation ===
  quizContainer.addEventListener("click", (e) => {
    // 1. Hint Button
    const hintBtn = e.target.closest(".hint-btn");
    if (hintBtn) {
      const quizId = hintBtn.dataset.quizId;
      const quizCard = document.getElementById(quizId);
      if (quizCard.classList.contains("solved")) return;
      
      const answerIdx = parseInt(quizCard.dataset.answer);
      const optionsNodes = Array.from(quizCard.querySelectorAll(".quiz-option:not(:disabled)"));
      const wrongOptions = optionsNodes.filter(opt => parseInt(opt.dataset.optIdx) !== answerIdx);
      
      if (wrongOptions.length >= 2) {
        wrongOptions.sort(() => 0.5 - Math.random());
        wrongOptions[0].classList.add("dimmed");
        wrongOptions[0].disabled = true;
        wrongOptions[1].classList.add("dimmed");
        wrongOptions[1].disabled = true;
      }
      
      hintBtn.disabled = true;
      hintBtn.textContent = "사용 완료";
      return;
    }

    // 2. Next Quiz Button
    const nextBtn = e.target.closest(".next-quiz-btn");
    if (nextBtn) {
      const currentCard = nextBtn.closest(".quiz-card");
      const nextCard = currentCard.nextElementSibling;
      
      let target = nextCard;
      while (target && (!target.classList.contains("quiz-card") || target.classList.contains("solved"))) {
        target = target.nextElementSibling;
      }
      
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        document.querySelector(".quiz-toolbar").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // 3. Bookmark Button
    const bookmarkBtn = e.target.closest(".bookmark-btn");
    if (bookmarkBtn) {
      const quizId = bookmarkBtn.dataset.quizId;
      if (bookmarks.has(quizId)) {
        bookmarks.delete(quizId);
        bookmarkBtn.textContent = "☆";
        bookmarkBtn.classList.remove("active");
      } else {
        bookmarks.add(quizId);
        bookmarkBtn.textContent = "⭐";
        bookmarkBtn.classList.add("active");
      }
      saveBookmarks();
      renderQuizToolbar();
      return;
    }
    
    // 4. Quiz Option Button
    const optBtn = e.target.closest(".quiz-option");
    if (optBtn) {
      const quizCard = optBtn.closest(".quiz-card");
      if (quizCard.classList.contains("solved")) return;
      
      const quizId = quizCard.id;
      const answerIdx = parseInt(quizCard.dataset.answer);
      const clickedIdx = parseInt(optBtn.dataset.optIdx);
      const status = quizCard.querySelector(".quiz-status");
      const explanation = quizCard.querySelector(".quiz-explanation");

      explanation.classList.remove("hidden");

      const currentQuizObj = allQuizzes.find(q => q.id === quizId);
      const fbDiv = quizCard.querySelector(`#feedback-${quizId}-${clickedIdx}`);
      const isCorrect = clickedIdx === answerIdx;
      
      if (!isCorrect) {
        optBtn.classList.add("shake-animation");
        setTimeout(() => optBtn.classList.remove("shake-animation"), 400);

        if (fbDiv) {
          let reasonText = "";
          if (currentQuizObj && currentQuizObj.whyWrong && currentQuizObj.whyWrong[clickedIdx]) {
            const reason = currentQuizObj.whyWrong[clickedIdx];
            if (reason !== "정답") reasonText = reason;
          }
          
          if (reasonText) {
            fbDiv.innerHTML = `<span class="feedback-icon">💡</span> <div><strong style="color:var(--danger-color); display:block; margin-bottom:4px;">왜 틀렸을까요?</strong> <span style="color:var(--text-color);">${reasonText}</span></div>`;
          } else {
            fbDiv.innerHTML = `<span class="feedback-icon">💡</span> <div><strong style="color:var(--danger-color); display:block; margin-bottom:4px;">오답입니다!</strong> <span style="color:var(--text-color);">아쉽게도 정답이 아닙니다. 아래 해설을 통해 이유를 확인해 보세요!</span></div>`;
          }
          fbDiv.classList.remove("hidden");
        }
      }
      
      const nBtn = quizCard.querySelector(".next-quiz-btn");
      if (nBtn) nBtn.classList.remove("hidden");

      status.textContent = isCorrect ? "정답입니다! 🎉" : "오답입니다. 🥲";
      status.classList.add(isCorrect ? "correct" : "incorrect");
      finalizeCard(quizCard, answerIdx, clickedIdx, isCorrect);
      
      setTimeout(() => {
        explanation.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);

      if (isCorrect) {
        wrongIds.delete(quizId);
      } else {
        wrongIds.add(quizId);
      }
      solvedMap.set(quizId, isCorrect);
      chosenAnswerMap.set(quizId, clickedIdx);

      const currentQuiz = allQuizzes.find(q => q.id === quizId);
      if (currentQuiz) recordStat(currentQuiz.subject, isCorrect, currentQuiz.cardId, currentQuiz.id);

      updateScoreBar();
    }
  });
"""

# Remove the forEach event listeners from renderQuizzes
content = re.sub(r'    quizContainer\.querySelectorAll\("\.quiz-option"\)\.forEach\(btn => \{.*?(?=    bindConceptLinkButtons\(\);)', '', content, flags=re.DOTALL)

# Insert the delegated listener after the init() function or at the end of the DOMContentLoaded block
# We can insert it before `// === 4. 개념 미리보기 모달 2.0`
content = content.replace('  // === 4. 개념 미리보기 모달 2.0', new_code + '\n  // === 4. 개념 미리보기 모달 2.0')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
