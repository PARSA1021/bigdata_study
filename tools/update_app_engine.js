const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Top declarations
code = code.replace(
  '  const mockPreset11th = document.getElementById("mockPreset11th");\n  const mockPreset10th = document.getElementById("mockPreset10th");\n  const mockPreset4th = document.getElementById("mockPreset4th");\n  const mockPresetRandom = document.getElementById("mockPresetRandom");',
  '  const mockPreset12th = document.getElementById("mockPreset12th");\n  const mockPreset11th = document.getElementById("mockPreset11th");\n  const mockPreset10th = document.getElementById("mockPreset10th");\n  const mockPreset9th = document.getElementById("mockPreset9th");\n  const mockPreset8th = document.getElementById("mockPreset8th");\n  const mockPreset4th = document.getElementById("mockPreset4th");\n  const mockPresetRandom = document.getElementById("mockPresetRandom");'
);

code = code.replace(
  '  const wfAllCount = document.getElementById("wfAllCount");\n  const wfHighCount = document.getElementById("wfHighCount");',
  '  const wfAllCount = document.getElementById("wfAllCount");\n  const wfGichulCount = document.getElementById("wfGichulCount");\n  const wfHighCount = document.getElementById("wfHighCount");'
);

// 2. getQuestionRound & isGichulQuestion
const targetGetRound = `  function getQuestionRound(q) {
    if (!q) return "mock";
    const exam = q.exam || q.round;
    if (exam) {
      const match = String(exam).match(/(\\d+)/);
      if (match) return match[1];
    }
    const qid = String(q.id || "");
    if (qid.startsWith("Q9_")) return "9";
    if (qid.startsWith("Q8_")) return "8";
    if (qid.startsWith("Q12_")) return "12";
    if (qid.startsWith("Q11_")) return "11";
    if (qid.startsWith("Q10_") || qid.startsWith("Q10")) return "10";
    if (qid.startsWith("Q4_")) return "4";
    if (qid.startsWith("Q5")) return "mock";
    if (/^Q[1-4]/.test(qid)) return "practice";

    const qText = q.question || "";
    const textMatch = qText.match(/\\[(\\d+)회/);
    if (textMatch) return textMatch[1];

    return "mock";
  }`;

const replacementGetRound = `  function getQuestionRound(q) {
    if (!q) return "practice";
    if (q.round) return String(q.round);
    const qid = String(q.id || "");
    const tag = (q.question && q.question.match(/^\\[(.*?)\\]/) ? q.question.match(/^\\[(.*?)\\]/)[1] : "") || "";
    const fullText = (q.question || "") + " " + (q.explanation || "") + " " + (q.examinerTip || "");

    if (qid.startsWith("Q12_") || tag.includes("12회") || q.exam === "12회 기출 복원" || tag.includes("제12회") || fullText.includes("12회 기출") || fullText.includes("제12회 실전 기출")) {
      return "12";
    }
    if (qid.startsWith("Q11_") || tag.includes("11회") || fullText.includes("11회 기출")) {
      return "11";
    }
    if (qid.startsWith("Q10_") || tag.includes("10회") || fullText.includes("10회 기출")) {
      return "10";
    }
    if (qid.startsWith("Q9_") || tag.includes("9회") || q.exam === "9회 기출 복원" || fullText.includes("9회 기출")) {
      return "9";
    }
    if (qid.startsWith("Q8_") || tag.includes("8회") || q.exam === "8회 기출 복원" || fullText.includes("8회 기출")) {
      return "8";
    }
    if (qid.startsWith("Q4_") || tag.includes("4회") || fullText.includes("4회 기출")) {
      return "4";
    }
    if (tag.includes("기출") || fullText.includes("기출") || tag.includes("합격기준") || tag.includes("킬러")) {
      return "frequent";
    }
    return "practice";
  }

  function isGichulQuestion(q) {
    if (!q) return false;
    if (typeof q.isGichul === "boolean") return q.isGichul;
    const r = getQuestionRound(q);
    return r !== "practice";
  }`;

code = code.replace(targetGetRound, replacementGetRound);

// 3. applyQuizFilter round logic
code = code.replace(
`      // Round Filter (Cached)
      if (quizFilter.round && quizFilter.round !== "all") {
        if (quizFilter.round === "4") {
          if (q._round !== "4" && q._round !== "5" && q._round !== "6" && q._round !== "7") return false;
        } else {
          if (q._round !== quizFilter.round) return false;
        }
      }`,
`      // Round Filter (Cached)
      if (quizFilter.round && quizFilter.round !== "all") {
        if (quizFilter.round === "gichul_all" || quizFilter.round === "gichul") {
          if (!q._isGichul) return false;
        } else if (quizFilter.round === "4") {
          if (q._round !== "4") return false;
        } else {
          if (q._round !== quizFilter.round) return false;
        }
      }`
);

// 4. buildMaps caching
code = code.replace(
`      q._round = getQuestionRound(q);
      q._isCalc = isCalcQuestion(q);`,
`      q._round = getQuestionRound(q);
      q._isGichul = isGichulQuestion(q);
      q._isCalc = isCalcQuestion(q);`
);

// 5. renderQuizCardHTML badge & stamps
const targetCardHeader = `    const impBadge = getImportanceBadgeHTML(impGrade);
    const diffBadge = getDifficultyBadgeHTML(quiz.difficulty);

    const eliminatedSet = eliminatedOptionsMap.get(quiz.id) || new Set();
    const targetCardId = findMatchingConceptCardId(quiz);
    const targetTutorStage = findMatchingTutorStage(quiz);

    return \`
      <div class="quiz-card" id="quiz-\${quiz.id}" data-id="\${quiz.id}">
        <div class="quiz-card-header">
          <div class="quiz-badges-group">
            <span class="quiz-subject-badge">\${SUBJECT_NAMES[quiz.subject] || "과목"}</span>
            \${impBadge}
            \${diffBadge}
            \${isCalc ? '<span class="quiz-tag-badge" style="background:rgba(37,99,235,0.12); color:#2563EB;">🧮 계산</span>' : ''}
            \${quiz.chapter ? \`<span class="quiz-subject-badge">\${escapeHTML(quiz.chapter)}</span>\` : ""}
            \${quiz.exam ? \`<span class="quiz-tag-badge" style="background:rgba(255,149,0,0.15); color:#D97706; font-weight:850;">\${escapeHTML(quiz.exam)}</span>\` : ""}
          </div>`;

const replacementCardHeader = `    const impBadge = getImportanceBadgeHTML(impGrade);
    const diffBadge = getDifficultyBadgeHTML(quiz.difficulty);

    const eliminatedSet = eliminatedOptionsMap.get(quiz.id) || new Set();
    const targetCardId = findMatchingConceptCardId(quiz);
    const targetTutorStage = findMatchingTutorStage(quiz);

    const isRealGichul = quiz._isGichul || isGichulQuestion(quiz);
    const qStat = (cumulativeStats.quizzes && cumulativeStats.quizzes[quiz.id]) || null;
    let roundStampHTML = "";
    if (qStat && qStat.solved > 0) {
      if (qStat.mastered) {
        roundStampHTML = '<span class="round-stamp stamp-master" title="2회 이상 정답으로 완전 마스터">🏆 마스터 (2-Pass)</span>';
      } else if (qStat.correct > 0 && qStat.wrongCount === 0) {
        roundStampHTML = '<span class="round-stamp stamp-pass" title="1회독 정답 통과">🎯 1회독 통과</span>';
      } else if (qStat.wrongCount > 0) {
        roundStampHTML = \`<span class="round-stamp stamp-wrong" title="오답 기록 \${qStat.wrongCount}회 - 복습 권장">⚠️ 오답 \${qStat.wrongCount}회</span>\`;
      }
    }

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

    return \`
      <div class="quiz-card" id="quiz-\${quiz.id}" data-id="\${quiz.id}">
        <div class="quiz-card-header">
          <div class="quiz-badges-group">
            <span class="quiz-subject-badge">\${SUBJECT_NAMES[quiz.subject] || "과목"}</span>
            \${gichulBadgeHTML}
            \${roundStampHTML}
            \${impBadge}
            \${diffBadge}
            \${isCalc ? '<span class="quiz-tag-badge" style="background:rgba(37,99,235,0.12); color:#2563EB;">🧮 계산</span>' : ''}
            \${quiz.chapter ? \`<span class="quiz-subject-badge">\${escapeHTML(quiz.chapter)}</span>\` : ""}
          </div>`;

code = code.replace(targetCardHeader, replacementCardHeader);

// 6. loadMockPreset
const targetLoadMock = `  function loadMockPreset(preset) {
    currentPreset = preset;
    let selected = [];
    if (preset === "12th") {
      selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q12_"));
      if (selected.length === 0) selected = allQuizzes.slice(0, 80);
    } else if (preset === "11th") {
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
  }`;

const replacementLoadMock = `  function loadMockPreset(preset) {
    currentPreset = preset;
    let selected = [];
    if (preset === "12th") {
      selected = [];
      for (let s = 1; s <= 4; s++) {
        const sQuizzes = allQuizzes.filter(q => q._round === "12" && q.subject === s);
        selected.push(...sQuizzes.slice(0, 20));
      }
      if (selected.length < 80) {
        const extra = allQuizzes.filter(q => q._round === "12" && !selected.includes(q));
        selected.push(...extra.slice(0, 80 - selected.length));
      }
    } else if (preset === "11th") {
      selected = allQuizzes.filter(q => q._round === "11");
      if (selected.length === 0) selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q11_"));
    } else if (preset === "10th") {
      selected = allQuizzes.filter(q => q._round === "10");
      if (selected.length === 0) selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q10_"));
    } else if (preset === "9th") {
      selected = allQuizzes.filter(q => q._round === "9");
    } else if (preset === "8th") {
      selected = allQuizzes.filter(q => q._round === "8");
    } else if (preset === "4th") {
      selected = allQuizzes.filter(q => q._round === "4");
      if (selected.length === 0) selected = allQuizzes.filter(q => q.id && q.id.startsWith("Q4_"));
    } else {
      selected = [];
      for (let s = 1; s <= 4; s++) {
        const sQuizzes = allQuizzes.filter(q => q._isGichul && q.subject === s);
        selected.push(...shuffleArray(sQuizzes).slice(0, 20));
      }
    }

    mockQuizzes = selected.length > 0 ? selected : allQuizzes.slice(0, 80);
    workingQuizzes = mockQuizzes;
    mockSolvedMap.clear();
    mockFlaggedSet.clear();
    isMockSubmitted = false;

    [mockPreset12th, mockPreset11th, mockPreset10th, mockPreset9th, mockPreset8th, mockPreset4th, mockPresetRandom].forEach(p => {
      if (p) p.classList.remove("active");
    });
    if (preset === "12th" && mockPreset12th) mockPreset12th.classList.add("active");
    if (preset === "11th" && mockPreset11th) mockPreset11th.classList.add("active");
    if (preset === "10th" && mockPreset10th) mockPreset10th.classList.add("active");
    if (preset === "9th" && mockPreset9th) mockPreset9th.classList.add("active");
    if (preset === "8th" && mockPreset8th) mockPreset8th.classList.add("active");
    if (preset === "4th" && mockPreset4th) mockPreset4th.classList.add("active");
    if (preset === "random" && mockPresetRandom) mockPresetRandom.classList.add("active");

    startExamTimer();
    renderQuizzes(true);
    renderOmrGrid();
    updateOmrHeaderCounts();
  }`;

code = code.replace(targetLoadMock, replacementLoadMock);

// 7. renderReverseRoadmap
const targetRoadmap = `  function renderReverseRoadmap() {
    if (!examTimelineGrid) return;
    const presets = [
      { id: "12th", title: "12회 기출 복원", date: "2026.03", count: 87, tag: "최신 출제" },
      { id: "11th", title: "11회 실전 기출", date: "2025.10", count: 80, tag: "실전 모의" },
      { id: "10th", title: "10회 실전 기출", date: "2025.06", count: 80, tag: "핵심 기출" },
      { id: "9th", title: "9회 기출 복원", date: "2024.11", count: 50, tag: "단골 복원" },
      { id: "8th", title: "8회 기출 복원", date: "2024.04", count: 50, tag: "유형 분석" },
      { id: "4th", title: "4회 실전 기출", date: "2022.04", count: 80, tag: "기초 탄탄" }
    ];

    let passedCount = 0;
    let html = "";

    presets.forEach(p => {
      const rec = mockRecords[p.id] || { bestScore: 0, lastScore: 0, passed: false, solvedCount: 0 };
      if (rec.passed) passedCount++;

      html += \`
        <div class="timeline-exam-card \${rec.passed ? 'passed' : ''}" data-preset="\${p.id}" style="cursor:pointer;">
          <div class="t-exam-top">
            <span class="t-exam-tag">\${p.tag}</span>
            <span class="t-exam-score \${rec.bestScore >= 60 ? 'pass' : (rec.bestScore > 0 ? 'fail' : '')}">
              \${rec.bestScore > 0 ? \`\${rec.bestScore}점\` : '미응시'}
            </span>
          </div>
          <h4 class="t-exam-title">\${p.title}</h4>
          <div class="t-exam-meta">\${p.date} 시행 · \${p.count}문항</div>
          <div class="t-exam-status-bar">
            <span class="t-status-text">\${rec.passed ? '🎉 60점 합격 완료' : (rec.bestScore > 0 ? '🔄 재응시 권장' : '⚡ 실전 풀기')}</span>
            <span class="t-status-arrow">➔</span>
          </div>
        </div>
      \`;
    });

    examTimelineGrid.innerHTML = html;

    if (roadmapMasteryRate) {
      const pct = Math.round((passedCount / presets.length) * 100);
      roadmapMasteryRate.textContent = \`\${pct}% (\${passedCount}/\${presets.length}회차)\`;
    }
  }`;

const replacementRoadmap = `  function renderReverseRoadmap() {
    if (!examTimelineGrid) return;
    const presets = [
      { id: "12th", title: "12회 최신 기출", date: "2026.04", count: 80, tag: "🔥 최신 출제" },
      { id: "11th", title: "11회 실전 기출", date: "2025.10", count: 80, tag: "🎯 실전 모의" },
      { id: "10th", title: "10회 실전 기출", date: "2025.06", count: 80, tag: "📘 핵심 기출" },
      { id: "9th", title: "9회 기출 복원", date: "2024.11", count: 50, tag: "🏆 단골 복원" },
      { id: "8th", title: "8회 기출 복원", date: "2024.04", count: 50, tag: "⚡ 유형 분석" },
      { id: "4th", title: "4회 실전 기출", date: "2022.04", count: 80, tag: "🌱 기초 탄탄" }
    ];

    let passedCount = 0;
    let html = "";

    presets.forEach(p => {
      const rec = mockRecords[p.id] || { bestScore: 0, lastScore: 0, passed: false, solvedCount: 0 };
      if (rec.passed) passedCount++;

      html += \`
        <div class="timeline-exam-card \${rec.passed ? 'passed' : ''}" data-preset="\${p.id}" style="cursor:pointer;" title="클릭 시 \${p.title} 실전 모의고사를 즉시 시작합니다">
          <div class="t-exam-top">
            <span class="t-exam-tag">\${p.tag}</span>
            <span class="t-exam-score \${rec.bestScore >= 60 ? 'pass' : (rec.bestScore > 0 ? 'fail' : '')}">
              \${rec.bestScore > 0 ? \`\${rec.bestScore}점\` : '미응시'}
            </span>
          </div>
          <h4 class="t-exam-title">\${p.title}</h4>
          <div class="t-exam-meta">\${p.date} 시행 · \${p.count}문항 실전 모의</div>
          <div class="t-exam-status-bar">
            <span class="t-status-text">\${rec.passed ? '🎉 60점 합격 완료' : (rec.bestScore > 0 ? '🔄 재응시 권장' : '⚡ 실전 풀기')}</span>
            <span class="t-status-arrow">➔</span>
          </div>
        </div>
      \`;
    });

    examTimelineGrid.innerHTML = html;

    if (roadmapMasteryRate) {
      const pct = Math.round((passedCount / presets.length) * 100);
      roadmapMasteryRate.textContent = \`\${pct}% (\${passedCount}/\${presets.length}회차)\`;
    }
  }`;

code = code.replace(targetRoadmap, replacementRoadmap);

// 8. renderWrongNotesView
code = code.replace(
`    const highRisk = wrongQuizzes.filter(q => cumulativeStats.quizzes[q.id].wrongCount >= 2 && !cumulativeStats.quizzes[q.id].mastered);

    if (wrongTotalCount) wrongTotalCount.textContent = activeWrong.length;
    if (wrongMasteredCount) wrongMasteredCount.textContent = mastered.length;
    if (wrongBookmarkCount) wrongBookmarkCount.textContent = bookmarkedWrong.length;

    if (wfAllCount) wfAllCount.textContent = activeWrong.length;
    if (wfHighCount) wfHighCount.textContent = highRisk.length;
    if (wfBookCount) wfBookCount.textContent = bookmarkedWrong.length;

    let displayList = [];
    if (filter === "all") displayList = activeWrong;
    else if (filter === "high") displayList = highRisk;
    else if (filter === "bookmarks") displayList = bookmarkedWrong;`,
`    const highRisk = wrongQuizzes.filter(q => cumulativeStats.quizzes[q.id].wrongCount >= 2 && !cumulativeStats.quizzes[q.id].mastered);
    const gichulWrong = activeWrong.filter(q => q._isGichul);

    if (wrongTotalCount) wrongTotalCount.textContent = activeWrong.length;
    if (wrongMasteredCount) wrongMasteredCount.textContent = mastered.length;
    if (wrongBookmarkCount) wrongBookmarkCount.textContent = bookmarkedWrong.length;

    if (wfAllCount) wfAllCount.textContent = activeWrong.length;
    if (wfGichulCount) wfGichulCount.textContent = gichulWrong.length;
    if (wfHighCount) wfHighCount.textContent = highRisk.length;
    if (wfBookCount) wfBookCount.textContent = bookmarkedWrong.length;

    let displayList = [];
    if (filter === "all") displayList = activeWrong;
    else if (filter === "gichul") displayList = gichulWrong;
    else if (filter === "high") displayList = highRisk;
    else if (filter === "bookmarks") displayList = bookmarkedWrong;`
);

// 9. Mock preset listeners
code = code.replace(
`    if (mockPreset11th) {
      mockPreset11th.addEventListener("click", () => loadMockPreset("11th"));
    }
    if (mockPreset10th) {
      mockPreset10th.addEventListener("click", () => loadMockPreset("10th"));
    }
    if (mockPreset4th) {
      mockPreset4th.addEventListener("click", () => loadMockPreset("4th"));
    }
    if (mockPresetRandom) {
      mockPresetRandom.addEventListener("click", () => loadMockPreset("random"));
    }`,
`    if (mockPreset12th) {
      mockPreset12th.addEventListener("click", () => loadMockPreset("12th"));
    }
    if (mockPreset11th) {
      mockPreset11th.addEventListener("click", () => loadMockPreset("11th"));
    }
    if (mockPreset10th) {
      mockPreset10th.addEventListener("click", () => loadMockPreset("10th"));
    }
    if (mockPreset9th) {
      mockPreset9th.addEventListener("click", () => loadMockPreset("9th"));
    }
    if (mockPreset8th) {
      mockPreset8th.addEventListener("click", () => loadMockPreset("8th"));
    }
    if (mockPreset4th) {
      mockPreset4th.addEventListener("click", () => loadMockPreset("4th"));
    }
    if (mockPresetRandom) {
      mockPresetRandom.addEventListener("click", () => loadMockPreset("random"));
    }`
);

// 10. Pack buttons
const targetPacks = `    bindPackBtn("btnAgradePass", "⭐ A급 필수 빈출 모드로 전환되었습니다!", f => f.importance = "A");
    bindPackBtn("btn9thExamPack", "🔥 9회 기출 복원 모드로 전환되었습니다!", f => f.round = "9");
    bindPackBtn("btn8thExamPack", "🏆 8회 기출 복원 모드로 전환되었습니다!", f => f.round = "8");
    bindPackBtn("btn12thExamPack", "⚡ 12회 기출 복원 모드로 전환되었습니다!", f => f.is12thOnly = true);
    bindPackBtn("btn11thExamPack", "🎯 11회 기출 집중 모드로 전환되었습니다!", f => f.is11thOnly = true);
    bindPackBtn("btn10thExamPack", "📘 10회 기출 집중 모드로 전환되었습니다!", f => f.is10thOnly = true);
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);
    bindPackBtn("btnBookmarkedOnly", "⭐ 나의 북마크 문제 모드로 전환되었습니다!", f => {
      if (bookmarks.size === 0) showToast("⚠️ 북마크(⭐)한 문제가 없습니다.");
      f.bookmarkedOnly = true;
    });`;

const replacementPacks = `    bindPackBtn("btnAllGichulPack", "👑 역대 진짜 기출 전체 (854제) 모드로 전환되었습니다!", f => f.round = "gichul_all");
    bindPackBtn("btn12thExamPack", "⚡ 12회 최신 기출 복원 (242제) 모드로 전환되었습니다!", f => f.round = "12");
    bindPackBtn("btn11thExamPack", "🎯 11회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "11");
    bindPackBtn("btn10thExamPack", "📘 10회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "10");
    bindPackBtn("btn9thExamPack", "🔥 9회 기출 복원 (50제) 모드로 전환되었습니다!", f => f.round = "9");
    bindPackBtn("btn8thExamPack", "🏆 8회 기출 복원 (50제) 모드로 전환되었습니다!", f => f.round = "8");
    bindPackBtn("btn4thExamPack", "🌱 4회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "4");
    bindPackBtn("btnFrequentGichulPack", "⭐ 단원별 빈출 기출 (272제) 모드로 전환되었습니다!", f => f.round = "frequent");
    bindPackBtn("btnAgradePass", "⭐ A급 필수 빈출 모드로 전환되었습니다!", f => f.importance = "A");
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);
    bindPackBtn("btnBookmarkedOnly", "⭐ 나의 북마크 문제 모드로 전환되었습니다!", f => {
      if (bookmarks.size === 0) showToast("⚠️ 북마크(⭐)한 문제가 없습니다.");
      f.bookmarkedOnly = true;
    });`;

code = code.replace(targetPacks, replacementPacks);

// 11. Wrong filter button event delegation
code = code.replace(
`    // Terminology & Static Keyword Filter`,
`    // Wrong Note Filter Buttons
    document.querySelectorAll(".wrong-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".wrong-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter || "all";
        renderWrongNotesView(f);
      });
    });

    // Terminology & Static Keyword Filter`
);

// 12. setupTimelineDelegation
const targetTimeline = `  function setupTimelineDelegation() {
    if (!examTimelineGrid) return;
    examTimelineGrid.addEventListener("click", e => {
      const card = e.target.closest(".timeline-exam-card");
      if (card) {
        switchNav("practice");
      }
    });
  }`;

const replacementTimeline = `  function setupTimelineDelegation() {
    if (!examTimelineGrid) return;
    examTimelineGrid.addEventListener("click", e => {
      const card = e.target.closest(".timeline-exam-card");
      if (card) {
        const preset = card.dataset.preset || "12th";
        switchNav("practice");
        currentMode = "mock";
        const btnModeExam = document.getElementById("btnModeExam");
        const btnModeStudy = document.getElementById("btnModeStudy");
        const mockHeaderEl = document.getElementById("mock-header");
        if (btnModeExam) btnModeExam.classList.add("active");
        if (btnModeStudy) btnModeStudy.classList.remove("active");
        if (mockHeaderEl) mockHeaderEl.classList.remove("hidden");
        loadMockPreset(preset);
        showToast(\`⚡ [\${card.querySelector('.t-exam-title')?.textContent || preset}] 실전 모의고사가 시작되었습니다!\`);
      }
    });
  }`;

code = code.replace(targetTimeline, replacementTimeline);

fs.writeFileSync(appPath, code, 'utf8');
console.log('Successfully updated app.js!');
