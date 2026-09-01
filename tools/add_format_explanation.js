const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

const target = `    return \`
      <div class="quiz-main-prompt">
        \${numPrefix}\${prefixTagHTML}<span>\${highlightTrapKeywords(escapeHTML(raw))}</span>
      </div>
    \`;
  }`;

const replacement = `    return \`
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
        if (text) {
          blocks.push(\`<p class="explain-p">\${text}</p>\`);
        }
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
        blocks.push(\`
          <div class="explain-callout \${alertClass}">
            <span class="callout-icon">\${icon}</span>
            <div class="callout-content">\${escapeHTML(rest)}</div>
          </div>
        \`);
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
        flushParagraph();
        blocks.push(\`
          <div class="explain-bullet">
            <span class="bullet-dot">▪</span>
            <span>\${escapeHTML(trimmed.slice(2))}</span>
          </div>
        \`);
      } else if (/^[0-9]+[\\.\\)]\\s/.test(trimmed)) {
        flushParagraph();
        const match = trimmed.match(/^([0-9]+[\\.\\)])\\s*(.*)/);
        blocks.push(\`
          <div class="explain-step-item">
            <strong class="step-num">\${escapeHTML(match[1])}</strong>
            <span>\${escapeHTML(match[2])}</span>
          </div>
        \`);
      } else {
        currentParagraph.push(escapeHTML(trimmed));
      }
    });

    flushParagraph();
    return blocks.join("");
  }`;

// Handle line endings
const normCode = code.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normCode.includes(normTarget)) {
  const updated = normCode.replace(normTarget, replacement);
  fs.writeFileSync(appPath, updated, 'utf8');
  console.log('Successfully inserted formatExplanationText into app.js!');
} else {
  console.error('Target not found in app.js');
}
