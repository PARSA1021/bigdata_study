const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT_DIR, 'data.js'));
require(path.join(ROOT_DIR, 'cbt_bank.js'));

function escapeHTML(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightTrapKeywords(str) {
  if (!str || typeof str !== "string") return str;
  const dangerKeywords = [
    "적절하지 않은", "아닌 것은", "틀린 것은", "거리가 먼", "옳지 않은",
    "가장 먼", "틀리게", "부적절한", "포함되지 않는", "해당하지 않는", "잘못된 것은", "옳지 못한"
  ];
  const safeKeywords = [
    "가장 적절한", "적절한 것은", "가장 옳은", "옳은 것은", "맞는 것은", "올바른 것은", "가장 알맞은", "올바르게"
  ];
  let processed = str;
  dangerKeywords.forEach(kw => {
    if (processed.includes(kw)) {
      const re = new RegExp(kw, 'g');
      processed = processed.replace(re, `<span class="badge-trap-danger">🚨 ${kw}</span>`);
    }
  });
  safeKeywords.forEach(kw => {
    if (processed.includes(kw)) {
      const re = new RegExp(kw, 'g');
      processed = processed.replace(re, `<span class="badge-trap-safe">✓ ${kw}</span>`);
    }
  });
  return processed;
}

function formatQuestionText(text, displayNum) {
  if (!text || typeof text !== "string") return "";
  let raw = text.trim();
  let prefixTagHTML = "";
  const tagMatch = raw.match(/^\[([가-힣a-zA-Z0-9\s·]+)\]\s*/);
  if (tagMatch) {
    const tagText = tagMatch[1].trim();
    let badgeClass = "q-prefix-brand";
    if (tagText.includes("빈출") || tagText.includes("A급")) {
      badgeClass = "q-prefix-amber";
    } else if (tagText.includes("12회") || tagText.includes("11회") || tagText.includes("최신")) {
      badgeClass = "q-prefix-purple";
    } else if (tagText.includes("계산")) {
      badgeClass = "q-prefix-blue";
    }
    prefixTagHTML = `<span class="q-prefix-badge ${badgeClass}">🏷️ ${escapeHTML(tagText)}</span> `;
    raw = raw.substring(tagMatch[0].length).trim();
  }
  const numPrefix = displayNum ? `<strong class="q-num-label">Q${displayNum}.</strong> ` : "";
  const parts = raw.split(/\n\s*\n|\n(?=[ㄱ-ㅎ가-힣a-zA-Z0-9][\.\)\s]|<|\[|【|\|)/);
  if (parts.length > 1) {
    let mainPrompt = parts[0].trim();
    let boxContent = parts.slice(1).join('\n').trim();
    let boxTag = "보기";
    const tagInMain = mainPrompt.match(/(<보기>|\[보기\]|【보기】|<혼동행렬>|\[혼동행렬\]|<표>|\[표\]|<사례>|\[사례\]|<조건>|\[조건\])/);
    if (tagInMain) {
      boxTag = tagInMain[1].replace(/[<\[【>\]】]/g, '');
    }
    const boxLines = boxContent.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        return `<div class="quiz-box-table-row font-mono">${escapeHTML(trimmed)}</div>`;
      }
      if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9][\.\)\s]/.test(trimmed)) {
        const itemMatch = trimmed.match(/^([ㄱ-ㅎ가-힣a-zA-Z0-9][\.\)])\s*(.*)/);
        if (itemMatch) {
          return `<div class="quiz-box-bullet-item"><span class="box-bullet-label">${escapeHTML(itemMatch[1])}</span><span class="box-bullet-text">${escapeHTML(itemMatch[2])}</span></div>`;
        }
        return `<div class="quiz-box-bullet-item"><span class="bullet-dot">▪</span><span>${escapeHTML(trimmed)}</span></div>`;
      }
      return `<div class="quiz-box-line">${escapeHTML(trimmed)}</div>`;
    }).filter(Boolean).join('');
    return `
      <div class="quiz-main-prompt">
        ${numPrefix}${prefixTagHTML}<span>${highlightTrapKeywords(escapeHTML(mainPrompt))}</span>
      </div>
      <div class="quiz-box-prompt">
        <div class="quiz-box-prompt-title">📌 [${escapeHTML(boxTag)}]</div>
        <div class="quiz-box-prompt-body">${boxLines}</div>
      </div>
    `;
  }
  return `
    <div class="quiz-main-prompt">
      ${numPrefix}${prefixTagHTML}<span>${highlightTrapKeywords(escapeHTML(raw))}</span>
    </div>
  `;
}

function formatExplanationText(raw) {
  if (!raw || typeof raw !== "string") return "";
  const lines = raw.trim().split("\n");
  const blocks = [];
  let currentParagraph = [];
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) blocks.push(`<p class="explain-p">${text}</p>`);
      currentParagraph = [];
    }
  };
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      return;
    }
    if (trimmed.startsWith("💡") || trimmed.startsWith("🚨") || trimmed.startsWith("📌") || trimmed.startsWith("⚠️")) {
      flushParagraph();
      let icon = trimmed.slice(0, 2);
      let rest = trimmed.slice(2).trim();
      let alertClass = trimmed.startsWith("🚨") || trimmed.startsWith("⚠️") ? "callout-danger" : "callout-brand";
      blocks.push(`<div class="explain-callout ${alertClass}"><span class="callout-icon">${icon}</span><div class="callout-content">${escapeHTML(rest)}</div></div>`);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
      flushParagraph();
      blocks.push(`<div class="explain-bullet"><span class="bullet-dot">▪</span><span>${escapeHTML(trimmed.slice(2))}</span></div>`);
    } else if (/^[0-9]+[\.\)]\s/.test(trimmed)) {
      flushParagraph();
      const match = trimmed.match(/^([0-9]+[\.\)])\s*(.*)/);
      blocks.push(`<div class="explain-step-item"><strong class="step-num">${escapeHTML(match[1])}</strong><span>${escapeHTML(match[2])}</span></div>`);
    } else {
      currentParagraph.push(escapeHTML(trimmed));
    }
  });
  flushParagraph();
  return blocks.join("");
}

const cbt = window.cbtBank;
console.log('Testing render of all 1001 questions in Wrong Notes Card HTML...');

let failed = 0;
cbt.questions.forEach((quiz, idx) => {
  try {
    const qStat = { wrongCount: 2, mastered: false, correctStreak: 0 };
    const isMastered = false;
    const streak = 0;
    const html = `
      <div class="quiz-card wrong-note-card ${isMastered ? 'mastered-card' : ''}" id="wrong-card-${quiz.id}" data-id="${quiz.id}">
        <div class="quiz-question-text">
          ${formatQuestionText(quiz.question, idx + 1)}
        </div>
        <div class="quiz-options-list">
          ${(quiz.choices || []).map((choice, cIdx) => `
            <button class="quiz-option wrong-retry-option" data-choice="${cIdx}">
              <span class="option-num">${cIdx + 1}</span>
              <span>${escapeHTML(choice)}</span>
            </button>
          `).join("")}
        </div>
        <div class="quiz-explanation-box">
          <div class="quiz-explanation-text">
            ${formatExplanationText(quiz.explanation || "")}
          </div>
        </div>
      </div>
    `;
    if (!html || html.length < 50) failed++;
  } catch (err) {
    console.error(`Error on ${quiz.id}:`, err.message);
    failed++;
  }
});

console.log(`Finished test: ${cbt.questions.length - failed} / ${cbt.questions.length} passed.`);
