const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
const cssPath = path.join(__dirname, '..', 'style.css');

let appCode = fs.readFileSync(appPath, 'utf8');
let cssCode = fs.readFileSync(cssPath, 'utf8');

// 1. Update renderMathFormulas in app.js
const targetMath = `  function renderMathFormulas(rootEl) {
    if (!rootEl) return;
    if (typeof window.renderMathInElement === "function") {
      // ⚡ 고속 바이패스: 수식 기호($)가 없는 경우 무거운 전체 DOM 트리 순회를 즉시 스킵
      if (rootEl.textContent && !rootEl.textContent.includes("$")) return;
      try {
        window.renderMathInElement(rootEl, {
          delimiters: [
            { left: "$", right: "$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (e) { }
    }
  }`;

const replacementMath = `  function renderMathFormulas(rootEl) {
    if (!rootEl) return;
    if (typeof window.renderMathInElement === "function") {
      try {
        window.renderMathInElement(rootEl, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\\\(", right: "\\\\)", display: false },
            { left: "\\\\[", right: "\\\\]", display: true }
          ],
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
          throwOnError: false
        });
      } catch (e) { }
    }
  }`;

appCode = appCode.replace(targetMath, replacementMath);

// 2. Update formatQuestionText and add formatExplanationText
const targetFormatQ = `  function formatQuestionText(text, displayNum) {
    if (!text || typeof text !== "string") return "";

    let raw = text.trim();
    let prefixTagHTML = "";

    // Extract prefix tag like [빈출 기출], [최신 기출 변형], [12회 복원], etc.
    const tagMatch = raw.match(/^\\[([가-힣a-zA-Z0-9\\s·]+)\\]\\s*/);
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
      prefixTagHTML = \`<span class="q-prefix-badge \${badgeClass}">🏷️ \${escapeHTML(tagText)}</span> \`;
      raw = raw.substring(tagMatch[0].length).trim();
    }

    const boxRegex = /(<보기>|\\[보기\\]|【보기】|<혼동행렬>|\\[혼동행렬\\]|<표>|\\[표\\]|<사례>|\\[사례\\]|<조건>|\\[조건\\])([\\s\\S]*)/i;
    const boxMatch = raw.match(boxRegex);

    const numPrefix = displayNum ? \`<strong class="q-num-label">Q\${displayNum}.</strong> \` : "";

    if (boxMatch) {
      const mainQuestion = raw.substring(0, boxMatch.index).trim();
      const boxTag = boxMatch[1].replace(/[<\\[【>\\]】]/g, '');
      const boxContent = boxMatch[2].trim();

      const formattedBoxLines = boxContent.split("\\n").map(line => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)\\s]/.test(trimmed)) {
          return \`<div class="quiz-box-bullet-item"><span class="bullet-dot">▪</span><span>\${escapeHTML(trimmed)}</span></div>\`;
        }
        return \`<div class="quiz-box-line">\${escapeHTML(trimmed)}</div>\`;
      }).filter(Boolean).join("");

      return \`
        <div class="quiz-main-prompt">
          \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(mainQuestion))}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [\${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">\${formattedBoxLines}</div>
        </div>
      \`;
    }

    return \`
      <div class="quiz-main-prompt">
        \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(raw))}</span>
      </div>
    \`;
  }`;

const replacementFormatQ = `  function formatQuestionText(text, displayNum) {
    if (!text || typeof text !== "string") return "";

    let raw = text.trim();
    let prefixTagHTML = "";

    // Extract prefix tag like [빈출 기출], [최신 기출 변형], [12회 복원], etc.
    const tagMatch = raw.match(/^\\[([가-힣a-zA-Z0-9\\s·]+)\\]\\s*/);
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
      prefixTagHTML = \`<span class="q-prefix-badge \${badgeClass}">🏷️ \${escapeHTML(tagText)}</span> \`;
      raw = raw.substring(tagMatch[0].length).trim();
    }

    const numPrefix = displayNum ? \`<strong class="q-num-label">Q\${displayNum}.</strong> \` : "";

    // Check for multi-line question or box patterns
    const parts = raw.split(/\\n\\s*\\n|\\n(?=[ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)\\s]|<|\\[|【|\\|)/);
    
    if (parts.length > 1) {
      let mainPrompt = parts[0].trim();
      let boxContent = parts.slice(1).join('\\n').trim();

      let boxTag = "보기";
      const tagInMain = mainPrompt.match(/(<보기>|\\[보기\\]|【보기】|<혼동행렬>|\\[혼동행렬\\]|<표>|\\[표\\]|<사례>|\\[사례\\]|<조건>|\\[조건\\])/);
      if (tagInMain) {
        boxTag = tagInMain[1].replace(/[<\\[【>\\]】]/g, '');
      }

      const boxLines = boxContent.split('\\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          return \`<div class="quiz-box-table-row font-mono">\${escapeHTML(trimmed)}</div>\`;
        }
        if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)\\s]/.test(trimmed)) {
          const itemMatch = trimmed.match(/^([ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)])\\s*(.*)/);
          if (itemMatch) {
            return \`<div class="quiz-box-bullet-item"><span class="box-bullet-label">\${escapeHTML(itemMatch[1])}</span><span class="box-bullet-text">\${escapeHTML(itemMatch[2])}</span></div>\`;
          }
          return \`<div class="quiz-box-bullet-item"><span class="bullet-dot">▪</span><span>\${escapeHTML(trimmed)}</span></div>\`;
        }
        return \`<div class="quiz-box-line">\${escapeHTML(trimmed)}</div>\`;
      }).filter(Boolean).join('');

      return \`
        <div class="quiz-main-prompt">
          \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(mainPrompt))}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [\${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">\${boxLines}</div>
        </div>
      \`;
    }

    const boxRegex = /(<보기>|\\[보기\\]|【보기】|<혼동행렬>|\\[혼동행렬\\]|<표>|\\[표\\]|<사례>|\\[사례\\]|<조건>|\\[조건\\])([\\s\\S]*)/i;
    const boxMatch = raw.match(boxRegex);

    if (boxMatch && boxMatch.index > 0) {
      const mainQuestion = raw.substring(0, boxMatch.index).trim();
      const boxTag = boxMatch[1].replace(/[<\\[【>\\]】]/g, '');
      const boxContent = boxMatch[2].trim();

      const formattedBoxLines = boxContent.split('\\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)\\s]/.test(trimmed)) {
          const itemMatch = trimmed.match(/^([ㄱ-ㅎ가-힣a-zA-Z0-9][\\.\\)])\\s*(.*)/);
          if (itemMatch) {
            return \`<div class="quiz-box-bullet-item"><span class="box-bullet-label">\${escapeHTML(itemMatch[1])}</span><span class="box-bullet-text">\${escapeHTML(itemMatch[2])}</span></div>\`;
          }
          return \`<div class="quiz-box-bullet-item"><span class="bullet-dot">▪</span><span>\${escapeHTML(trimmed)}</span></div>\`;
        }
        return \`<div class="quiz-box-line">\${escapeHTML(trimmed)}</div>\`;
      }).filter(Boolean).join('');

      return \`
        <div class="quiz-main-prompt">
          \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(mainQuestion))}</span>
        </div>
        <div class="quiz-box-prompt">
          <div class="quiz-box-prompt-title">📌 [\${escapeHTML(boxTag)}]</div>
          <div class="quiz-box-prompt-body">\${formattedBoxLines}</div>
        </div>
      \`;
    }

    return \`
      <div class="quiz-main-prompt">
        \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(raw))}</span>
      </div>
    \`;
  }

  function formatExplanationText(raw) {
    if (!raw || typeof raw !== "string") return "";
    const lines = raw.trim().split("\\n");
    const blocks = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) blocks.push(\`<p class="explain-p">\${text}</p>\`);
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
        blocks.push(\`<div class="explain-callout \${alertClass}"><span class="callout-icon">\${icon}</span><div class="callout-content">\${escapeHTML(rest)}</div></div>\`);
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
        flushParagraph();
        blocks.push(\`<div class="explain-bullet"><span class="bullet-dot">▪</span><span>\${escapeHTML(trimmed.slice(2))}</span></div>\`);
      } else if (/^[0-9]+[\\.\\)]\\s/.test(trimmed)) {
        flushParagraph();
        const match = trimmed.match(/^([0-9]+[\\.\\)])\\s*(.*)/);
        blocks.push(\`<div class="explain-step-item"><strong class="step-num">\${escapeHTML(match[1])}</strong><span>\${escapeHTML(match[2])}</span></div>\`);
      } else {
        currentParagraph.push(escapeHTML(trimmed));
      }
    });
    flushParagraph();
    return blocks.join("");
  }`;

appCode = appCode.replace(targetFormatQ, replacementFormatQ);

// 3. Update explanation in renderQuizCardHTML & renderWrongNotesView
appCode = appCode.replace(
  '<div class="quiz-explanation-text">\n                  ${escapeHTML(quiz.explanation || "")}\n                </div>',
  '<div class="quiz-explanation-text">\n                  ${formatExplanationText(quiz.explanation || "")}\n                </div>'
);

appCode = appCode.replace(
  '<div class="quiz-explanation-text">\n              ${escapeHTML(quiz.explanation || "")}\n            </div>',
  '<div class="quiz-explanation-text">\n              ${formatExplanationText(quiz.explanation || "")}\n            </div>'
);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully updated app.js formatting and explanation logic!');

// 4. Update style.css with responsive & polished explanation styles
const cssAdditions = `
/* =========================================================
   📱 Responsive Question, Box Prompt & Explanation Polish
   ========================================================= */

.quiz-box-bullet-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
  line-height: 1.6;
  font-size: 14.5px;
  color: var(--text-color);
}

.box-bullet-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 22px;
  background: var(--brand-soft);
  color: var(--text-bold);
  font-weight: 850;
  font-size: 12.5px;
  border-radius: 4px;
  flex-shrink: 0;
}

.box-bullet-text {
  flex: 1;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.quiz-box-table-row {
  padding: 4px 8px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
  margin: 4px 0;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}

/* Explanation Paragraphs & Callouts */
.explain-p {
  margin: 0 0 10px 0;
  line-height: 1.75;
  font-size: 14.5px;
  color: var(--text-color);
  word-break: keep-all;
  overflow-wrap: break-word;
}

.explain-p:last-child {
  margin-bottom: 0;
}

.explain-callout {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  margin: 10px 0;
  font-size: 13.5px;
  line-height: 1.6;
}

.explain-callout.callout-brand {
  background: rgba(0, 122, 255, 0.08);
  border-left: 4px solid var(--brand);
  color: var(--text-color);
}

.explain-callout.callout-danger {
  background: rgba(255, 59, 48, 0.08);
  border-left: 4px solid var(--danger);
  color: var(--text-color);
}

.explain-callout.callout-warning {
  background: rgba(245, 158, 11, 0.08);
  border-left: 4px solid #F59E0B;
  color: var(--text-color);
}

.explain-callout.callout-success {
  background: rgba(52, 199, 89, 0.08);
  border-left: 4px solid var(--success);
  color: var(--text-color);
}

[data-theme="dark"] .explain-callout.callout-brand {
  background: rgba(0, 122, 255, 0.15);
}

[data-theme="dark"] .explain-callout.callout-danger {
  background: rgba(255, 59, 48, 0.15);
}

[data-theme="dark"] .explain-callout.callout-warning {
  background: rgba(245, 158, 11, 0.15);
}

[data-theme="dark"] .explain-callout.callout-success {
  background: rgba(52, 199, 89, 0.15);
}

.callout-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.callout-content {
  flex: 1;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.explain-bullet {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.6;
}

.explain-step-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.6;
}

.step-num {
  color: var(--brand);
  font-weight: 850;
  flex-shrink: 0;
}

/* Mobile & Tablet Responsive Optimizations */
@media (max-width: 768px) {
  .quiz-card {
    padding: 16px 14px !important;
  }
  .quiz-main-prompt {
    font-size: 15px !important;
    line-height: 1.6 !important;
  }
  .quiz-option {
    padding: 12px 14px !important;
    font-size: 14px !important;
  }
  .quiz-option .option-num {
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    font-size: 11.5px !important;
    margin-right: 8px !important;
  }
  .quiz-explanation-box {
    padding: 14px 12px !important;
  }
  .correct-analysis-box, .wrong-analysis-box {
    padding: 12px !important;
  }
  .explain-p {
    font-size: 13.5px !important;
    line-height: 1.65 !important;
  }
  .explain-callout {
    padding: 10px 12px !important;
    font-size: 13px !important;
  }
  .choice-trap-item {
    padding: 8px 10px !important;
    font-size: 12.5px !important;
  }
  .quiz-box-prompt {
    padding: 10px 12px !important;
    margin: 10px 0 !important;
  }
  .quiz-box-bullet-item {
    font-size: 13.5px !important;
  }
  .box-bullet-label {
    min-width: 20px !important;
    height: 20px !important;
    font-size: 11.5px !important;
  }
}

@media (max-width: 480px) {
  .quiz-badges-group {
    gap: 4px !important;
  }
  .quiz-tag-badge, .quiz-subject-badge, .round-stamp {
    font-size: 10px !important;
    padding: 1px 6px !important;
  }
  .quiz-loop-buttons-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
  }
  .loop-action-btn {
    padding: 8px 6px !important;
    font-size: 11.5px !important;
  }
}
`;

cssCode += cssAdditions;
fs.writeFileSync(cssPath, cssCode, 'utf8');
console.log('Successfully updated style.css with responsive question and explanation styling!');
