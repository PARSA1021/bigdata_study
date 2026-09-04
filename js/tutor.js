/**
 * KNOWWAY (노웨이) 1:1 AI 튜터 & 개념비교 훈련 엔진 (v2.5 Upgrade)
 * - 16단계 로드맵 + 1:1 대화형 AI 질문 챗봇 + Web Speech 음성 강의 + Web Audio 사운드 이펙트
 * - 3단계 이해도 Level 분석 + 3초 스피드 드릴 + 취약점 팝 퀴즈 + 자동 오답노트
 */

const TUTOR_STORAGE_KEY = "knowway_ai_tutor_v2";

function getTutorCurriculum() {
  if (window.TUTOR_CURRICULUM && Array.isArray(window.TUTOR_CURRICULUM)) return window.TUTOR_CURRICULUM;
  if (typeof TUTOR_CURRICULUM !== "undefined" && Array.isArray(TUTOR_CURRICULUM)) return TUTOR_CURRICULUM;
  return [];
}

function getThreeSecCheats() {
  if (window.THREE_SEC_CHEATS && Array.isArray(window.THREE_SEC_CHEATS)) return window.THREE_SEC_CHEATS;
  if (typeof THREE_SEC_CHEATS !== "undefined" && Array.isArray(THREE_SEC_CHEATS)) return THREE_SEC_CHEATS;
  return [];
}

class AITutorEngine {
  constructor() {
    this.state = this.loadState();
    this.currentStageIdx = this.state.currentStageIdx || 0;
    this.currentConceptIdx = this.state.currentConceptIdx || 0;
    this.currentQuestionIdx = 0;
    this.activeMode = "train"; // 'train' | 'speed' | 'review' | 'wrong'

    // Quiz State
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;

    // Speed Drill State
    this.speedTimer = null;
    this.speedTimeRemaining = 3.0;
    this.speedCurrentItem = null;
    this.speedStreak = 0;
    this.speedScore = 0;

    // Review State
    this.reviewQuizzes = [];
    this.reviewCurrentIdx = 0;
    this.reviewScore = 0;

    // Pop Quiz State
    this.popQuizList = [];
    this.popQuizIdx = 0;
    this.popQuizScore = 0;

    // Audio SFX State
    this.audioCtx = null;
  }

  loadState() {
    try {
      const raw = localStorage.getItem(TUTOR_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Failed to load tutor state", e);
    }
    return {
      currentStageIdx: 0,
      currentConceptIdx: 0,
      masteredStages: [],
      conceptLevels: {}, // { [conceptId]: level (1,2,3) }
      wrongNotes: [], // [ { id, conceptId, questionText, userAnswer, correctAnswer, ... } ]
      speedHighScore: 0,
      reviewScores: []
    };
  }

  saveState() {
    try {
      this.state.currentStageIdx = this.currentStageIdx;
      this.state.currentConceptIdx = this.currentConceptIdx;
      localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save tutor state", e);
    }
  }

  init() {
    this.bindDOM();
    this.renderUI();
  }

  bindDOM() {
    const modeTabs = document.querySelectorAll(".tutor-mode-tab");
    modeTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const mode = tab.dataset.tutorMode;
        this.switchMode(mode);
      });
    });
  }

  switchMode(mode) {
    this.activeMode = mode;
    this.stopSpeech();

    const modeTabs = document.querySelectorAll(".tutor-mode-tab");
    modeTabs.forEach(t => {
      if (t.dataset.tutorMode === mode) t.classList.add("active");
      else t.classList.remove("active");
    });

    const panes = ["train", "speed", "review", "wrong"];
    panes.forEach(p => {
      const el = document.getElementById(`tutorPane-${p}`);
      if (el) {
        if (p === mode) el.classList.remove("hidden");
        else el.classList.add("hidden");
      }
    });

    if (mode === "speed") {
      this.initSpeedDrill();
    } else if (mode === "review") {
      this.initCumulativeReview();
    } else if (mode === "wrong") {
      this.renderWrongNotebook();
    } else {
      this.renderTrainPane();
    }
  }

  renderUI() {
    this.renderMasteryBanner();
    this.renderStageTimeline();
    this.switchMode(this.activeMode);
  }

  // ========================================================
  // 0. 마스터리 종합 대시보드 배너 (Mastery Radar)
  // ========================================================
  renderMasteryBanner() {
    const curriculum = getTutorCurriculum();
    if (curriculum.length === 0) return;

    let totalConcepts = 0;
    let masteredConcepts = 0;
    const subjectStats = { 1: { tot: 0, mas: 0 }, 2: { tot: 0, mas: 0 }, 3: { tot: 0, mas: 0 }, 4: { tot: 0, mas: 0 } };

    curriculum.forEach(stage => {
      const subNum = stage.subjectNumber || 1;
      stage.concepts.forEach(c => {
        totalConcepts++;
        if (subjectStats[subNum]) subjectStats[subNum].tot++;
        const lvl = this.state.conceptLevels[c.id] || 0;
        if (lvl >= 2) {
          masteredConcepts++;
          if (subjectStats[subNum]) subjectStats[subNum].mas++;
        }
      });
    });

    const pct = totalConcepts > 0 ? Math.round((masteredConcepts / totalConcepts) * 100) : 0;

    let rankTitle = "🌱 새싹 분석가 (Level 1)";
    let rankColor = "#34C759";
    if (masteredConcepts >= 26) {
      rankTitle = "👑 빅분기 수석 마스터 (Level 4)";
      rankColor = "#AF52DE";
    } else if (masteredConcepts >= 16) {
      rankTitle = "⚡ 3초 함정 킬러 (Level 3)";
      rankColor = "#007AFF";
    } else if (masteredConcepts >= 6) {
      rankTitle = "🌿 함정 탐색가 (Level 2)";
      rankColor = "#FF9500";
    }

    const bannerContainer = document.getElementById("tutorMasteryBanner");
    if (!bannerContainer) {
      const header = document.querySelector(".tutor-top-header");
      if (header) {
        const div = document.createElement("div");
        div.id = "tutorMasteryBanner";
        div.className = "tutor-mastery-banner blur-glass";
        header.parentNode.insertBefore(div, header.nextSibling);
      }
    }

    const bannerEl = document.getElementById("tutorMasteryBanner");
    if (bannerEl) {
      bannerEl.innerHTML = `
        <div class="mastery-stat-grid">
          <div class="m-stat-card">
            <span class="m-stat-icon">🎓</span>
            <div>
              <span class="m-stat-lbl">나의 튜터 훈련 칭호</span>
              <strong class="m-stat-val" style="color: ${rankColor}">${rankTitle}</strong>
            </div>
          </div>
          <div class="m-stat-card">
            <span class="m-stat-icon">🎯</span>
            <div>
              <span class="m-stat-lbl">개념 마스터 진도율</span>
              <strong class="m-stat-val text-brand">${masteredConcepts} / ${totalConcepts}개 (${pct}%)</strong>
            </div>
          </div>
          <div class="m-stat-card">
            <span class="m-stat-icon">⚡</span>
            <div>
              <span class="m-stat-lbl">3초 스피드 최고 기록</span>
              <strong class="m-stat-val text-warn">${this.state.speedHighScore || 0}점</strong>
            </div>
          </div>
          <div class="m-stat-card">
            <span class="m-stat-icon">📕</span>
            <div>
              <span class="m-stat-lbl">자동 관리 오답노트</span>
              <strong class="m-stat-val text-danger">${(this.state.wrongNotes || []).length}문항</strong>
            </div>
          </div>
        </div>

        <div class="subject-progress-bars">
          <span class="subj-p-chip">1과목 분석기획: <strong>${Math.round((subjectStats[1].mas / (subjectStats[1].tot || 1)) * 100)}%</strong></span>
          <span class="subj-p-chip">2과목 데이터탐색: <strong>${Math.round((subjectStats[2].mas / (subjectStats[2].tot || 1)) * 100)}%</strong></span>
          <span class="subj-p-chip">3과목 데이터모델링: <strong>${Math.round((subjectStats[3].mas / (subjectStats[3].tot || 1)) * 100)}%</strong></span>
          <span class="subj-p-chip">4과목 결과해석: <strong>${Math.round((subjectStats[4].mas / (subjectStats[4].tot || 1)) * 100)}%</strong></span>
        </div>
      `;
    }
  }

  // ========================================================
  // 1. 16단계 로드맵 타임라인 바
  // ========================================================
  renderStageTimeline() {
    const container = document.getElementById("tutorStageTimeline");
    const curriculum = getTutorCurriculum();
    if (!container || curriculum.length === 0) return;

    let html = "";
    curriculum.forEach((stage, idx) => {
      const isActive = idx === this.currentStageIdx;
      const isMastered = this.state.masteredStages.includes(stage.stageId);
      const isPassed = idx < this.currentStageIdx || isMastered;

      let badgeClass = "timeline-chip";
      if (isActive) badgeClass += " active";
      else if (isMastered) badgeClass += " mastered";
      else if (isPassed) badgeClass += " passed";

      let masteredCount = 0;
      stage.concepts.forEach(c => {
        if (this.state.conceptLevels[c.id] >= 2) masteredCount++;
      });
      const levelBadge = masteredCount === stage.concepts.length && stage.concepts.length > 0 ? "👑" : (masteredCount > 0 ? "🌿" : "🌱");

      html += `
        <button class="${badgeClass}" onclick="window.aiTutor.selectStage(${idx})">
          <span class="stage-num-pill">${levelBadge} ${stage.stageNumber}단계</span>
          <span class="stage-chip-title">${stage.title.split(". ")[1] || stage.title}</span>
        </button>
      `;
    });

    container.innerHTML = html;
  }

  selectStage(stageIdx) {
    this.currentStageIdx = stageIdx;
    this.currentConceptIdx = 0;
    this.currentQuestionIdx = 0;
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    this.stopSpeech();
    this.saveState();
    this.renderMasteryBanner();
    this.renderStageTimeline();
    this.renderTrainPane();
  }

  selectConcept(conceptIdx) {
    this.currentConceptIdx = conceptIdx;
    this.currentQuestionIdx = 0;
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    this.stopSpeech();
    this.saveState();
    this.renderTrainPane();
  }

  // ========================================================
  // 2. 1:1 맞춤 훈련소 (Train Pane)
  // ========================================================
  renderTrainPane() {
    const pane = document.getElementById("tutorPane-train");
    const curriculum = getTutorCurriculum();
    if (!pane || curriculum.length === 0) return;

    const currentStage = curriculum[this.currentStageIdx] || curriculum[0];
    if (!currentStage) return;

    const currentConcept = currentStage.concepts[this.currentConceptIdx] || currentStage.concepts[0];
    const userLevel = this.state.conceptLevels[currentConcept.id] || 0;

    let levelLabel = "🌱 학습 시작 (Level 0)";
    let levelBadgeClass = "lvl-0";
    if (userLevel === 1) {
      levelLabel = "🌱 Level 1 (정답 달성 - 이유 보강 필요)";
      levelBadgeClass = "lvl-1";
    } else if (userLevel === 2) {
      levelLabel = "🌿 Level 2 (핵심 원리 & 이유 완벽 이해)";
      levelBadgeClass = "lvl-2";
    } else if (userLevel >= 3) {
      levelLabel = "👑 Level 3 (함정 판별 마스터)";
      levelBadgeClass = "lvl-3";
    }

    // Concept Stepper Tabs
    let conceptTabsHtml = "";
    currentStage.concepts.forEach((c, cIdx) => {
      const isCur = cIdx === this.currentConceptIdx;
      const cLevel = this.state.conceptLevels[c.id] || 0;
      let cBadge = "🌱";
      if (cLevel >= 3) cBadge = "👑";
      else if (cLevel >= 2) cBadge = "🌿";

      conceptTabsHtml += `
        <button class="tutor-concept-tab ${isCur ? "active" : ""}" onclick="window.aiTutor.selectConcept(${cIdx})">
          <span class="c-badge">${cBadge}</span> ${c.name}
        </button>
      `;
    });

    // Comparison Table
    let tableHtml = "";
    if (currentConcept.comparisonTable) {
      const t = currentConcept.comparisonTable;
      tableHtml = `
        <div class="tutor-comparison-box">
          <div class="t-box-title">📊 핵심 개념 2열 비교표</div>
          <div class="table-responsive">
            <table class="tutor-table">
              <thead>
                <tr>${t.headers.map(h => `<th>${h}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${t.rows.map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Traps
    let trapsHtml = "";
    if (currentConcept.traps && currentConcept.traps.length > 0) {
      trapsHtml = `
        <div class="tutor-trap-box">
          <div class="trap-box-header">
            <span class="trap-icon">⚠️</span>
            <span class="trap-title">출제자의 킬러 함정 선지 주의보</span>
          </div>
          <ul class="trap-list">
            ${currentConcept.traps.map(tr => `<li>${tr}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    const keywordsHtml = currentConcept.keywords.map(kw => `<span class="tutor-kw-pill">${kw}</span>`).join(" ");
    const examExpHtml = currentConcept.examExpressions.map(ex => `<li>${ex}</li>`).join("");

    pane.innerHTML = `
      <!-- Stage & Concept Header Card -->
      <div class="tutor-card tutor-header-banner blur-glass">
        <div class="tutor-banner-top">
          <div class="tutor-stage-tag">${currentStage.subjectName} · ${currentStage.title}</div>
          <div class="tutor-level-badge ${levelBadgeClass}">${levelLabel}</div>
        </div>
        <h2 class="tutor-concept-title">
          <span class="t-icon">${currentStage.icon}</span> ${currentConcept.name}
          <span class="t-eng-name">(${currentConcept.engName})</span>
        </h2>
        <p class="tutor-oneline-def">📌 <strong>한 줄 정의:</strong> ${currentConcept.oneLineDef}</p>

        <!-- Sub Concept Stepper -->
        <div class="tutor-concept-stepper">
          ${conceptTabsHtml}
        </div>
      </div>

      <!-- 10 Step Detailed Learning Deck -->
      <div class="tutor-deck-grid">

        <!-- Card 1: Easy Explain & Analogy -->
        <div class="tutor-card blur-glass">
          <div class="deck-card-header">
            <span class="d-icon">💡</span>
            <h3>정말 쉽게 이해하기 & 현실 비유</h3>
          </div>
          <div class="deck-body-text">
            <p class="easy-explain-p">${currentConcept.easyExplain}</p>
            <div class="analogy-callout">
              <span class="callout-icon">🎨</span>
              <div>
                <strong>직관적 일상 비유:</strong><br/>
                ${currentConcept.analogy}
              </div>
            </div>

            <!-- "너무 어려워요" Instant Everyday Mode Toggle -->
            <div class="super-easy-toggle-row">
              <button class="button button-light btn-super-easy" onclick="window.aiTutor.toggleSuperEasyMode('${currentConcept.id}')">
                🍼 너무 어려워요! (초등학생도 이해하는 초쉬운 비유 보기)
              </button>
            </div>

            <div id="superEasyBox-${currentConcept.id}" class="super-easy-box hidden">
              <div class="super-easy-header">🍼 극도로 쉬운 제로-전문용어 비유:</div>
              <p class="super-easy-content">${currentConcept.superEasyAnalogy}</p>
            </div>
          </div>
        </div>

        <!-- Card 2: Keywords & Exam Expressions -->
        <div class="tutor-card blur-glass">
          <div class="deck-card-header">
            <span class="d-icon">🔍</span>
            <h3>시험장 필수 핵심 키워드 & 빈출 지문 표현</h3>
          </div>
          <div class="deck-body-text">
            <div class="kw-tags-container">
              ${keywordsHtml}
            </div>
            <div class="exam-exp-box" style="margin-top: 16px;">
              <div class="exp-title">📝 실제 기출 시험지에서 나오는 문장 패턴:</div>
              <ul class="exam-exp-list">
                ${examExpHtml}
              </ul>
            </div>
          </div>
        </div>

        <!-- Card 3: Comparison & Confusing Concept -->
        <div class="tutor-card blur-glass">
          <div class="deck-card-header">
            <span class="d-icon">⚖️</span>
            <h3>무엇과 헷갈리는가? & 비교표</h3>
          </div>
          <div class="deck-body-text">
            <div class="confusing-alert">
              <strong>🚨 수험생들이 가장 헷갈리는 포인트:</strong><br/>
              ${currentConcept.confusingConcept}
            </div>
            ${tableHtml}
          </div>
        </div>

        <!-- Card 4: Memorization & Traps & 3-Sec Cheatkey -->
        <div class="tutor-card blur-glass">
          <div class="deck-card-header">
            <span class="d-icon">⚡</span>
            <h3>한 줄 암기법 & 출제자 함정 선지 & 3초 판단법</h3>
          </div>
          <div class="deck-body-text">
            <div class="golden-memo-box">
              <div class="memo-badge">🔥 입에 착 달라붙는 한 줄 암기 공식</div>
              <div class="memo-rule-text">${currentConcept.memorizationRule}</div>
            </div>

            ${trapsHtml}

            <div class="three-sec-box">
              <span class="three-sec-badge">⚡ 시험장 3초 판단 치트키</span>
              <div class="three-sec-text">${currentConcept.threeSecKey}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Action Anchor to Quiz -->
      <div class="tutor-quiz-anchor-bar">
        <div class="quiz-anchor-text">
          <span>🧠 개념을 충분히 이해하셨나요?</span>
          <p>출제자의 함정이 숨겨진 실전 확인 문제로 내 이해도(Level 1~3)를 즉시 테스트하세요!</p>
        </div>
        <button class="button button-brand hero-massive-btn" onclick="window.aiTutor.scrollToQuiz()">
          🎯 실전 확인 문제 풀기 (AI 채점) ➔
        </button>
      </div>

      <!-- Interactive Verification Quiz Card Container -->
      <div id="tutorInteractiveQuizContainer" class="tutor-quiz-section">
        <!-- Rendered by renderQuizCard() -->
      </div>
    `;

    this.renderQuizCard(currentConcept);
  }

  toggleSuperEasyMode(conceptId) {
    const box = document.getElementById(`superEasyBox-${conceptId}`);
    if (box) {
      box.classList.toggle("hidden");
    }
  }

  scrollToQuiz() {
    const el = document.getElementById("tutorInteractiveQuizContainer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Safe no-op helper for backward compatibility
  stopSpeech() {}

  playAudioEffect(type) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.setValueAtTime(196, now + 0.12); // G3
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'levelup') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (e) {
      // Audio context not allowed or unsupported
    }
  }

  // ========================================================
  // 5. 실전 확인 문제 & AI 답변 심층 분석 (Interactive Quiz Engine)
  // ========================================================
  renderQuizCard(concept) {
    const container = document.getElementById("tutorInteractiveQuizContainer");
    if (!container || !concept.questions || concept.questions.length === 0) return;

    const question = concept.questions[this.currentQuestionIdx] || concept.questions[0];
    const totalQCount = concept.questions.length;

    let optionsHtml = "";
    question.options.forEach((opt, oIdx) => {
      const isSelected = this.selectedOption === oIdx;
      let optClass = "quiz-opt-btn";
      if (isSelected) optClass += " selected";

      if (this.isAnswerSubmitted) {
        if (oIdx === question.correctAnswer) optClass += " correct-opt";
        else if (isSelected && oIdx !== question.correctAnswer) optClass += " wrong-opt";
      }

      optionsHtml += `
        <button class="${optClass}" onclick="window.aiTutor.selectQuizOption(${oIdx})" ${this.isAnswerSubmitted ? "disabled" : ""}>
          ${opt}
        </button>
      `;
    });

    let reasonChipsHtml = "";
    if (question.reasonKeywords && question.reasonKeywords.length > 0) {
      reasonChipsHtml = `
        <div class="tutor-reason-selection-box">
          <div class="reason-box-title">
            <span>🔍 내가 정답으로 고른 핵심 키워드/이유를 선택하세요 (Level 2/3 판별용)</span>
          </div>
          <div class="reason-chips-bar">
            ${question.reasonKeywords.map((rKw, rIdx) => {
              const isRSelected = this.selectedReason === rIdx;
              return `
                <button class="reason-chip ${isRSelected ? "active" : ""}" onclick="window.aiTutor.selectReason(${rIdx})" ${this.isAnswerSubmitted ? "disabled" : ""}>
                  📌 ${rKw}
                </button>
              `;
            }).join("")}
            <button class="reason-chip ${this.selectedReason === -1 ? "active" : ""}" onclick="window.aiTutor.selectReason(-1)" ${this.isAnswerSubmitted ? "disabled" : ""}>
              🤔 확실하지 않음 (단순 느낌으로 찍음)
            </button>
          </div>
        </div>
      `;
    }

    let feedbackHtml = "";
    if (this.isAnswerSubmitted) {
      feedbackHtml = this.generateFeedbackCard(concept, question);
    }

    container.innerHTML = `
      <div class="tutor-card tutor-quiz-card blur-glass">
        <div class="tutor-quiz-header">
          <div class="tutor-q-badge">
            <span>🎯 실전 기출 확인 문제 (${this.currentQuestionIdx + 1} / ${totalQCount})</span>
            <span class="q-level-tag">난이도: ${question.level === 1 ? "Level 1 개념확인" : (question.level === 2 ? "Level 2 함정구분" : "Level 3 기출킬러")}</span>
          </div>
        </div>

        <div class="tutor-quiz-statement">
          ${question.questionText.replace(/\n/g, "<br/>")}
        </div>

        <div class="tutor-quiz-options-grid">
          ${optionsHtml}
        </div>

        ${reasonChipsHtml}

        ${!this.isAnswerSubmitted ? `
          <div class="tutor-quiz-submit-row">
            <button class="button button-brand hero-massive-btn" onclick="window.aiTutor.submitAnswer()" ${this.selectedOption === null ? "disabled" : ""}>
              ⚡ 답안 제출 및 AI 이해도 분석 받기
            </button>
          </div>
        ` : ""}

        ${feedbackHtml}
      </div>
    `;
  }

  selectQuizOption(idx) {
    if (this.isAnswerSubmitted) return;
    this.selectedOption = idx;
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const currentConcept = currentStage.concepts[this.currentConceptIdx];
    this.renderQuizCard(currentConcept);
  }

  selectReason(reasonIdx) {
    if (this.isAnswerSubmitted) return;
    this.selectedReason = reasonIdx;
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const currentConcept = currentStage.concepts[this.currentConceptIdx];
    this.renderQuizCard(currentConcept);
  }

  submitAnswer() {
    if (this.selectedOption === null) return;
    this.isAnswerSubmitted = true;

    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const currentConcept = currentStage.concepts[this.currentConceptIdx];
    const question = currentConcept.questions[this.currentQuestionIdx];

    const isCorrect = this.selectedOption === question.correctAnswer;
    const isReasonExact = this.selectedReason !== null && this.selectedReason >= 0;

    let awardedLevel = 0;
    if (isCorrect) {
      if (isReasonExact) {
        awardedLevel = question.level >= 2 ? 3 : 2;
        this.playAudioEffect('levelup');
      } else {
        awardedLevel = 1;
        this.playAudioEffect('correct');
      }
    } else {
      awardedLevel = 0;
      this.playAudioEffect('wrong');
      this.recordWrongAnswer(currentConcept, question);
    }

    const prevLevel = this.state.conceptLevels[currentConcept.id] || 0;
    if (awardedLevel > prevLevel) {
      this.state.conceptLevels[currentConcept.id] = awardedLevel;
    }

    const allConceptsMastered = currentStage.concepts.every(c => (this.state.conceptLevels[c.id] || 0) >= 2);
    if (allConceptsMastered && !this.state.masteredStages.includes(currentStage.stageId)) {
      this.state.masteredStages.push(currentStage.stageId);
    }

    this.saveState();
    this.renderMasteryBanner();
    this.renderStageTimeline();
    this.renderQuizCard(currentConcept);

    if (isCorrect && window.confetti) {
      window.confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
    }
  }

  recordWrongAnswer(concept, question) {
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const existingIndex = this.state.wrongNotes.findIndex(w => w.qId === question.qId);

    const record = {
      qId: question.qId,
      conceptId: concept.id,
      stageNumber: currentStage.stageNumber,
      conceptName: concept.name,
      confusingConcept: concept.confusingConcept,
      questionText: question.questionText,
      userAnswerText: question.options[this.selectedOption],
      correctAnswerText: question.options[question.correctAnswer],
      correctReason: question.explanation.correctReason,
      wrongBreakdowns: question.explanation.wrongBreakdowns,
      examKeywords: concept.keywords.join(", "),
      oneLineMemo: concept.memorizationRule,
      threeSecKey: concept.threeSecKey,
      trapPoint: concept.traps ? concept.traps[0] : "",
      failedCount: 1,
      isRepeatedWeakness: false,
      timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      record.failedCount = (this.state.wrongNotes[existingIndex].failedCount || 1) + 1;
      record.isRepeatedWeakness = record.failedCount >= 2;
      this.state.wrongNotes[existingIndex] = record;
    } else {
      this.state.wrongNotes.unshift(record);
    }
    this.saveState();
  }

  generateFeedbackCard(concept, question) {
    const isCorrect = this.selectedOption === question.correctAnswer;
    const isReasonExact = this.selectedReason !== null && this.selectedReason >= 0;
    const hasNextQuestion = this.currentQuestionIdx + 1 < concept.questions.length;
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const hasNextConcept = this.currentConceptIdx + 1 < currentStage.concepts.length;
    const hasNextStage = this.currentStageIdx + 1 < curriculum.length;

    let statusHeader = "";
    let levelMessage = "";

    if (isCorrect) {
      if (isReasonExact) {
        statusHeader = `<div class="fb-status-header correct">🎉 완벽한 정답입니다! (이유까지 완벽 판별)</div>`;
        levelMessage = `
          <div class="fb-level-callout level-2">
            <span class="l-icon">🌿</span>
            <div>
              <strong>LEVEL 2 달성:</strong> 핵심 키워드와 원리를 정확하게 파악하고 계십니다!
              ${hasNextQuestion ? "함정 선지까지 완벽 판별하는 <strong>Level 3 마스터 문제</strong>에 도전해보세요." : "이 개념을 완벽히 마스터하셨습니다. 다음 개념으로 넘어가도 좋습니다."}
            </div>
          </div>
        `;
      } else {
        statusHeader = `<div class="fb-status-header partial">✓ 정답을 맞혔습니다! (단, 정확한 이유 파악 필요)</div>`;
        levelMessage = `
          <div class="fb-level-callout level-1">
            <span class="l-icon">🌱</span>
            <div>
              <strong>LEVEL 1 판정:</strong> 정답은 맞혔으나 핵심 키워드와 근거가 다소 불확실합니다.
              실제 시험장의 변형 함정에 낚이지 않도록 <strong>유사 함정 문제</strong>를 하나 더 풀어서 확실히 다져보세요!
            </div>
          </div>
        `;
      }
    } else {
      statusHeader = `<div class="fb-status-header wrong">❌ 오답입니다. (출제자의 함정에 유의하세요!)</div>`;
      levelMessage = `
        <div class="fb-level-callout level-0">
          <span class="l-icon">⚠️</span>
          <div>
            <strong>집중 케어 필요:</strong> 헷갈리는 개념과의 차이점을 다시 한 번 확인하세요.
            이 오답은 <strong>AI 오답노트에 자동으로 분석 정리</strong>되었습니다.
          </div>
        </div>
      `;
    }

    const breakdownHtml = question.explanation.wrongBreakdowns.map(b => `<li>${b}</li>`).join("");

    return `
      <div class="tutor-feedback-box blur-glass">
        ${statusHeader}
        ${levelMessage}

        <div class="fb-analysis-section">
          <h4 class="fb-sub-title">💡 왜 정답인가?</h4>
          <p class="fb-correct-reason">${question.explanation.correctReason}</p>

          <h4 class="fb-sub-title" style="margin-top: 14px;">🔍 다른 선지가 오답인 이유 (함정 분석)</h4>
          <ul class="fb-wrong-breakdowns">
            ${breakdownHtml}
          </ul>

          <div class="fb-cheat-recap">
            <strong>⚡ 시험장 3초 킬러 치트키 복습:</strong> ${concept.threeSecKey}
          </div>
        </div>

        <!-- Next Actions -->
        <div class="tutor-fb-actions">
          ${hasNextQuestion ? `
            <button class="button button-brand" onclick="window.aiTutor.loadNextQuestion()">
              ➕ 유사 함정 문제 도전하기 (${this.currentQuestionIdx + 2}번 문항) ➔
            </button>
          ` : ""}

          ${hasNextConcept ? `
            <button class="button button-success" onclick="window.aiTutor.loadNextConcept()">
              ➡️ 다음 개념으로 이동하기 (${currentStage.concepts[this.currentConceptIdx + 1].name}) ➔
            </button>
          ` : (hasNextStage ? `
            <button class="button button-success" onclick="window.aiTutor.loadNextStage()">
              🏆 ${currentStage.stageNumber}단계 마스터 완료! ➔ ${currentStage.stageNumber + 1}단계로 전진! 🚀
            </button>
          ` : `
            <button class="button button-success" onclick="window.aiTutor.switchMode('speed')">
              👑 전 커리큘럼 완료! 3초 스피드 훈련하러 가기 ⚡
            </button>
          `)}

          <button class="button button-light" onclick="window.aiTutor.retryCurrentQuestion()">
            🔄 이 문제 다시 풀기
          </button>
        </div>
      </div>
    `;
  }

  loadNextQuestion() {
    this.currentQuestionIdx++;
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const currentConcept = currentStage.concepts[this.currentConceptIdx];
    this.renderQuizCard(currentConcept);
    this.scrollToQuiz();
  }

  retryCurrentQuestion() {
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    const curriculum = getTutorCurriculum();
    const currentStage = curriculum[this.currentStageIdx];
    const currentConcept = currentStage.concepts[this.currentConceptIdx];
    this.renderQuizCard(currentConcept);
    this.scrollToQuiz();
  }

  loadNextConcept() {
    this.currentConceptIdx++;
    this.currentQuestionIdx = 0;
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    this.stopSpeech();
    this.saveState();
    this.renderMasteryBanner();
    this.renderTrainPane();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  loadNextStage() {
    this.currentStageIdx++;
    this.currentConceptIdx = 0;
    this.currentQuestionIdx = 0;
    this.selectedOption = null;
    this.selectedReason = null;
    this.isAnswerSubmitted = false;
    this.stopSpeech();
    this.saveState();
    this.renderMasteryBanner();
    this.renderStageTimeline();
    this.renderTrainPane();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ========================================================
  // 6. 3초 판단 스피드 치트키 훈련소 (Speed Drill)
  // ========================================================
  initSpeedDrill() {
    const pane = document.getElementById("tutorPane-speed");
    const cheats = getThreeSecCheats();
    if (!pane || cheats.length === 0) return;

    this.speedStreak = 0;
    this.speedScore = 0;

    pane.innerHTML = `
      <div class="tutor-card speed-drill-card blur-glass text-center">
        <div class="speed-header">
          <span class="speed-badge-pill">⚡ 3-SECOND SPEED DRILL</span>
          <h2>시험장 3초 판단 스피드 훈련</h2>
          <p class="speed-sub-desc">지문의 핵심 키워드를 보자마자 3초 안에 정답 개념을 반사적으로 선택하세요!</p>
        </div>

        <div class="speed-stat-row">
          <div class="s-stat-box">
            <span class="s-lbl">연속 정답</span>
            <strong id="speedStreakVal" class="s-val text-warn">🔥 0</strong>
          </div>
          <div class="s-stat-box">
            <span class="s-lbl">현재 점수</span>
            <strong id="speedScoreVal" class="s-val text-brand">0점</strong>
          </div>
          <div class="s-stat-box">
            <span class="s-lbl">최고 기록</span>
            <strong class="s-val">${this.state.speedHighScore || 0}점</strong>
          </div>
        </div>

        <div class="speed-timer-bar-wrap">
          <div id="speedTimerBar" class="speed-timer-bar-fill" style="width: 100%;"></div>
        </div>

        <div id="speedDrillContent" class="speed-drill-arena">
          <div class="speed-intro-box">
            <p>준비되셨나요? 문제를 시작하면 3초 카운트다운이 즉시 동작합니다.</p>
            <button class="button button-brand hero-massive-btn" onclick="window.aiTutor.startNextSpeedQuestion()">
              🚀 3초 스피드 훈련 시작하기!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  startNextSpeedQuestion() {
    if (this.speedTimer) clearInterval(this.speedTimer);

    const cheats = getThreeSecCheats();
    if (cheats.length === 0) return;

    const randomItem = cheats[Math.floor(Math.random() * cheats.length)];
    this.speedCurrentItem = randomItem;

    const distractorPool = cheats.filter(c => c.concept !== randomItem.concept).map(c => c.concept);
    const uniquePool = [...new Set(distractorPool)];
    const shuffledPool = uniquePool.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [randomItem.concept, ...shuffledPool].sort(() => 0.5 - Math.random());

    const arena = document.getElementById("speedDrillContent");
    if (!arena) return;

    arena.innerHTML = `
      <div class="speed-question-prompt">
        <div class="speed-q-stage-tag">${randomItem.stage}단계 키워드 힌트</div>
        <div class="speed-keyword-text">"${randomItem.keyword}"</div>
      </div>

      <div class="speed-options-grid">
        ${options.map(opt => `
          <button class="speed-opt-btn" onclick="window.aiTutor.answerSpeedQuestion('${opt}')">
            ${opt}
          </button>
        `).join("")}
      </div>

      <div id="speedFeedbackBox" class="speed-fb-box hidden"></div>
    `;

    this.speedTimeRemaining = 3.0;
    const timerBar = document.getElementById("speedTimerBar");

    this.speedTimer = setInterval(() => {
      this.speedTimeRemaining -= 0.05;
      const pct = Math.max(0, (this.speedTimeRemaining / 3.0) * 100);
      if (timerBar) {
        timerBar.style.width = `${pct}%`;
        if (pct < 30) timerBar.style.backgroundColor = "var(--danger)";
        else if (pct < 60) timerBar.style.backgroundColor = "var(--warn)";
        else timerBar.style.backgroundColor = "var(--brand)";
      }

      if (this.speedTimeRemaining <= 0) {
        clearInterval(this.speedTimer);
        this.handleSpeedTimeout();
      }
    }, 50);
  }

  answerSpeedQuestion(selectedConcept) {
    if (this.speedTimer) clearInterval(this.speedTimer);

    const isCorrect = selectedConcept === this.speedCurrentItem.concept;
    const fbBox = document.getElementById("speedFeedbackBox");
    const streakEl = document.getElementById("speedStreakVal");
    const scoreEl = document.getElementById("speedScoreVal");

    document.querySelectorAll(".speed-opt-btn").forEach(btn => {
      btn.disabled = true;
      if (btn.innerText.trim() === this.speedCurrentItem.concept) {
        btn.classList.add("correct");
      } else if (btn.innerText.trim() === selectedConcept && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    if (isCorrect) {
      this.playAudioEffect('correct');
      this.speedStreak++;
      const gainedScore = Math.round(100 + (this.speedTimeRemaining * 50) + (this.speedStreak * 20));
      this.speedScore += gainedScore;

      if (this.speedScore > (this.state.speedHighScore || 0)) {
        this.state.speedHighScore = this.speedScore;
        this.saveState();
      }

      if (fbBox) {
        fbBox.className = "speed-fb-box speed-fb-correct";
        fbBox.innerHTML = `
          <span>✓ 3초 킬러 정답! (+${gainedScore}점) [힌트: ${this.speedCurrentItem.hint}]</span>
        `;
        fbBox.classList.remove("hidden");
      }
    } else {
      this.playAudioEffect('wrong');
      this.speedStreak = 0;
      if (fbBox) {
        fbBox.className = "speed-fb-box speed-fb-wrong";
        fbBox.innerHTML = `
          <span>❌ 오답! 정답은 <strong>[${this.speedCurrentItem.concept}]</strong> 입니다. (힌트: ${this.speedCurrentItem.hint})</span>
        `;
        fbBox.classList.remove("hidden");
      }
    }

    if (streakEl) streakEl.innerText = `🔥 ${this.speedStreak}`;
    if (scoreEl) scoreEl.innerText = `${this.speedScore}점`;

    setTimeout(() => {
      this.startNextSpeedQuestion();
    }, 1400);
  }

  handleSpeedTimeout() {
    this.playAudioEffect('wrong');
    this.speedStreak = 0;
    const streakEl = document.getElementById("speedStreakVal");
    if (streakEl) streakEl.innerText = `🔥 0`;

    const fbBox = document.getElementById("speedFeedbackBox");
    if (fbBox) {
      fbBox.className = "speed-fb-box speed-fb-wrong";
      fbBox.innerHTML = `
        <span>⏱️ 시간 초과 (3초 경과)! 정답은 <strong>[${this.speedCurrentItem.concept}]</strong> 입니다.</span>
      `;
      fbBox.classList.remove("hidden");
    }

    document.querySelectorAll(".speed-opt-btn").forEach(btn => {
      btn.disabled = true;
      if (btn.innerText.trim() === this.speedCurrentItem.concept) {
        btn.classList.add("correct");
      }
    });

    setTimeout(() => {
      this.startNextSpeedQuestion();
    }, 1600);
  }

  // ========================================================
  // 7. 누적 믹스 복습 모의고사 (Cumulative Review)
  // ========================================================
  initCumulativeReview() {
    const pane = document.getElementById("tutorPane-review");
    const curriculum = getTutorCurriculum();
    if (!pane || curriculum.length === 0) return;

    let pool = [];
    for (let s = 0; s <= this.currentStageIdx; s++) {
      const stage = curriculum[s];
      if (stage && stage.concepts) {
        stage.concepts.forEach(c => {
          c.questions.forEach(q => {
            pool.push({
              stageTitle: stage.title,
              conceptName: c.name,
              question: q
            });
          });
        });
      }
    }

    this.reviewQuizzes = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    this.reviewCurrentIdx = 0;
    this.reviewScore = 0;

    pane.innerHTML = `
      <div class="tutor-card blur-glass">
        <div class="deck-card-header">
          <span class="d-icon">🔄</span>
          <div>
            <h3>누적 믹스 복습 모의고사 (1단계 ~ ${this.currentStageIdx + 1}단계)</h3>
            <p style="font-size:13px; color:var(--text-muted);">지금까지 학습한 단계들의 함정 문제들을 무작위로 섞어서 실전 감각을 훈련합니다.</p>
          </div>
        </div>

        <div id="reviewQuizArena" class="review-arena-wrap" style="margin-top: 20px;">
          <!-- Injected by renderReviewQuiz() -->
        </div>
      </div>
    `;

    this.renderReviewQuiz();
  }

  renderReviewQuiz() {
    const arena = document.getElementById("reviewQuizArena");
    if (!arena || this.reviewQuizzes.length === 0) return;

    if (this.reviewCurrentIdx >= this.reviewQuizzes.length) {
      const finalScore = Math.round((this.reviewScore / this.reviewQuizzes.length) * 100);
      arena.innerHTML = `
        <div class="review-result-box text-center">
          <div class="result-score-circle">${finalScore}점</div>
          <h3>🎉 누적 믹스 복습 완료!</h3>
          <p>총 ${this.reviewQuizzes.length}문제 중 <strong>${this.reviewScore}문제</strong>를 맞혔습니다.</p>
          <button class="button button-brand" onclick="window.aiTutor.initCumulativeReview()" style="margin-top: 16px;">
            🔄 새로운 문제로 다시 복습하기
          </button>
        </div>
      `;
      return;
    }

    const item = this.reviewQuizzes[this.reviewCurrentIdx];
    const q = item.question;

    arena.innerHTML = `
      <div class="review-q-progress">문항 ${this.reviewCurrentIdx + 1} / ${this.reviewQuizzes.length} [출처: ${item.stageTitle} · ${item.conceptName}]</div>
      <div class="tutor-quiz-statement" style="margin-top: 10px;">${q.questionText.replace(/\n/g, "<br/>")}</div>

      <div class="tutor-quiz-options-grid" style="margin-top: 16px;">
        ${q.options.map((opt, oIdx) => `
          <button class="quiz-opt-btn" onclick="window.aiTutor.answerReviewQuiz(${oIdx})">
            ${opt}
          </button>
        `).join("")}
      </div>

      <div id="reviewFbBox" class="tutor-feedback-box hidden" style="margin-top: 16px;"></div>
    `;
  }

  answerReviewQuiz(selectedIdx) {
    const item = this.reviewQuizzes[this.reviewCurrentIdx];
    const q = item.question;
    const isCorrect = selectedIdx === q.correctAnswer;
    if (isCorrect) {
      this.reviewScore++;
      this.playAudioEffect('correct');
    } else {
      this.playAudioEffect('wrong');
    }

    const fbBox = document.getElementById("reviewFbBox");

    document.querySelectorAll("#reviewQuizArena .quiz-opt-btn").forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) btn.classList.add("correct-opt");
      else if (idx === selectedIdx && !isCorrect) btn.classList.add("wrong-opt");
    });

    if (fbBox) {
      fbBox.innerHTML = `
        <div class="fb-status-header ${isCorrect ? "correct" : "wrong"}">
          ${isCorrect ? "✓ 정답입니다!" : "❌ 오답입니다!"}
        </div>
        <p class="fb-correct-reason" style="margin-top: 8px;">${q.explanation.correctReason}</p>
        <button class="button button-brand" onclick="window.aiTutor.nextReviewQuiz()" style="margin-top: 12px; width: 100%;">
          다음 복습 문제 풀기 ➔
        </button>
      `;
      fbBox.classList.remove("hidden");
    }
  }

  nextReviewQuiz() {
    this.reviewCurrentIdx++;
    this.renderReviewQuiz();
  }

  // ========================================================
  // 8. AI 튜터 자동 오답노트 & 취약점 팝 퀴즈 (Weakness Pop Quiz)
  // ========================================================
  renderWrongNotebook() {
    const pane = document.getElementById("tutorPane-wrong");
    if (!pane) return;

    const wrongNotes = this.state.wrongNotes || [];
    const repeatedCount = wrongNotes.filter(w => w.isRepeatedWeakness).length;

    let notesListHtml = "";
    if (wrongNotes.length === 0) {
      notesListHtml = `
        <div class="empty-state-box text-center" style="padding: 40px;">
          <span style="font-size: 48px;">🎉</span>
          <h3 style="margin-top: 12px;">오답노트가 깨끗합니다!</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">문제를 풀며 틀린 개념과 함정 포인트가 이곳에 100% 자동 정리됩니다.</p>
        </div>
      `;
    } else {
      notesListHtml = wrongNotes.map((note) => {
        return `
          <div class="tutor-wrong-card blur-glass ${note.isRepeatedWeakness ? "weakness-alert-card" : ""}">
            <div class="tw-header">
              <div class="tw-concept-badge">
                <span class="tw-stage-tag">${note.stageNumber}단계</span>
                <strong>[오답 개념] ${note.conceptName}</strong>
                ${note.isRepeatedWeakness ? `<span class="repeated-tag">⚠️ ${note.failedCount}회 틀림 (반복 취약점)</span>` : ""}
              </div>
              <button class="action-btn-sm" onclick="window.aiTutor.jumpToRetrain('${note.conceptId}')">🎯 이 개념 다시 훈련하기</button>
            </div>

            <div class="tw-body">
              <div class="tw-q-text"><strong>문제:</strong> ${note.questionText}</div>
              <div class="tw-answers-row">
                <span class="tw-my-ans">❌ 내가 선택한 답: ${note.userAnswerText}</span>
                <span class="tw-correct-ans">⭕ 정답: ${note.correctAnswerText}</span>
              </div>

              <div class="tw-analysis-grid">
                <div class="tw-item">
                  <span class="tw-lbl">내가 틀린 이유 & 정답 해설:</span>
                  <p>${note.correctReason}</p>
                </div>
                <div class="tw-item">
                  <span class="tw-lbl">헷갈린 개념 & 구분법:</span>
                  <p>${note.confusingConcept}</p>
                </div>
                <div class="tw-item">
                  <span class="tw-lbl">시험장 3초 키워드 & 한 줄 암기:</span>
                  <p><strong>키워드:</strong> ${note.examKeywords} <br/><strong>암기:</strong> ${note.oneLineMemo}</p>
                </div>
                <div class="tw-item">
                  <span class="tw-lbl">출제자의 비슷한 함정:</span>
                  <p>${note.trapPoint || note.threeSecKey}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    pane.innerHTML = `
      <div class="tutor-card blur-glass">
        <div class="wrong-header-top">
          <div>
            <span class="brand-badge-pill">📕 AUTOMATED AI WRONG NOTES</span>
            <h2>AI 튜터 전용 스마트 오답노트</h2>
            <p style="font-size: 13px; color: var(--text-muted);">내가 틀린 문제와 헷갈린 이유, 시험장 키워드가 완벽한 양식으로 자동 정리됩니다.</p>
          </div>
          <div class="wrong-stat-pills">
            <span class="ws-pill danger">총 오답 <strong>${wrongNotes.length}</strong></span>
            <span class="ws-pill warning">반복 취약점 <strong>${repeatedCount}</strong></span>
          </div>
        </div>

        ${wrongNotes.length > 0 ? `
          <div class="weakness-popquiz-box blur-glass">
            <div class="popquiz-info">
              <h3>🔥 내 취약점 오답 100% 극복 팝 퀴즈 (Weakness Drill)</h3>
              <p>내가 틀린 ${wrongNotes.length}개 오답 문제만 모아서 1:1 집중 재시험을 봅니다.</p>
            </div>
            <button class="button button-danger" onclick="window.aiTutor.startWeaknessPopQuiz()">
              ⚡ 취약점 재시험 시작하기 ➔
            </button>
          </div>
        ` : ""}

        <div id="popQuizContainer" class="hidden" style="margin-bottom: 24px;"></div>

        <div class="tutor-wrong-cards-container" style="margin-top: 20px;">
          ${notesListHtml}
        </div>
      </div>
    `;
  }

  startWeaknessPopQuiz() {
    const wrongNotes = this.state.wrongNotes || [];
    if (wrongNotes.length === 0) return;

    this.popQuizList = [...wrongNotes].sort(() => 0.5 - Math.random());
    this.popQuizIdx = 0;
    this.popQuizScore = 0;

    const container = document.getElementById("popQuizContainer");
    if (container) {
      container.classList.remove("hidden");
      this.renderPopQuizStep();
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  renderPopQuizStep() {
    const container = document.getElementById("popQuizContainer");
    if (!container || this.popQuizList.length === 0) return;

    if (this.popQuizIdx >= this.popQuizList.length) {
      container.innerHTML = `
        <div class="tutor-card blur-glass text-center" style="padding: 30px; border: 2px solid var(--success);">
          <span style="font-size: 40px;">🎉</span>
          <h3 style="margin-top: 10px;">취약점 팝 퀴즈 완료!</h3>
          <p style="margin-top: 6px;">총 ${this.popQuizList.length}문항 중 <strong>${this.popQuizScore}문항</strong>을 극복했습니다!</p>
          <button class="button button-brand" onclick="window.aiTutor.renderWrongNotebook()" style="margin-top: 14px;">
            오답노트로 돌아가기 ➔
          </button>
        </div>
      `;
      return;
    }

    const note = this.popQuizList[this.popQuizIdx];

    container.innerHTML = `
      <div class="tutor-card blur-glass" style="border: 2px solid var(--danger);">
        <div class="tutor-quiz-header">
          <div class="tutor-q-badge text-danger">
            <span>🔥 취약점 극복 팝 퀴즈 (${this.popQuizIdx + 1} / ${this.popQuizList.length})</span>
            <span class="q-level-tag">${note.stageNumber}단계 · ${note.conceptName}</span>
          </div>
        </div>

        <div class="tutor-quiz-statement">
          ${note.questionText.replace(/\n/g, "<br/>")}
        </div>

        <div class="tutor-reason-selection-box" style="margin-top: 14px;">
          <span style="font-size: 13px; font-weight: 750;">💡 이전에 틀렸던 오답:</span>
          <p style="color: var(--danger); margin: 4px 0 0; font-weight: 700;">❌ 내가 선택했던 답: ${note.userAnswerText}</p>
        </div>

        <div style="margin-top: 16px; padding: 14px; background: var(--paper-subtle); border-radius: var(--radius-md);">
          <span style="font-size: 13px; font-weight: 750;">⭕ 정답과 해설 다시 확인:</span>
          <p style="color: var(--success); font-weight: 800; margin: 4px 0;">${note.correctAnswerText}</p>
          <p style="font-size: 13.5px; margin: 6px 0 0;">${note.correctReason}</p>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 6px;"><strong>암기 공식:</strong> ${note.oneLineMemo}</p>
        </div>

        <div style="margin-top: 16px; display: flex; gap: 10px;">
          <button class="button button-success" onclick="window.aiTutor.passPopQuizItem(true)" style="flex:1;">
            ✓ 이제 확실히 이해했습니다! (마스터 +1)
          </button>
          <button class="button button-light" onclick="window.aiTutor.passPopQuizItem(false)">
            다음 취약점 보기 ➔
          </button>
        </div>
      </div>
    `;
  }

  passPopQuizItem(isCleared) {
    if (isCleared) {
      this.popQuizScore++;
      this.playAudioEffect('correct');
    }
    this.popQuizIdx++;
    this.renderPopQuizStep();
  }

  jumpToRetrain(conceptId) {
    const curriculum = getTutorCurriculum();
    if (curriculum.length === 0) return;
    for (let s = 0; s < curriculum.length; s++) {
      const stage = curriculum[s];
      const cIdx = stage.concepts.findIndex(c => c.id === conceptId);
      if (cIdx >= 0) {
        this.currentStageIdx = s;
        this.currentConceptIdx = cIdx;
        this.currentQuestionIdx = 0;
        this.selectedOption = null;
        this.selectedReason = null;
        this.isAnswerSubmitted = false;
        this.switchMode("train");
        this.renderStageTimeline();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }
}

// Global Instantiate
window.aiTutor = new AITutorEngine();
