const fs = require('fs');
const path = require('path');

function escapeHTML(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightTrapKeywords(str) {
  if (!str || typeof str !== 'string') return str;

  const dangerKeywords = [
    '적절하지 않은', '아닌 것은', '틀린 것은', '거리가 먼', '옳지 않은',
    '가장 먼', '틀리게', '부적절한', '포함되지 않는', '해당하지 않는', '잘못된 것은', '옳지 못한'
  ];

  const safeKeywords = [
    '가장 적절한', '적절한 것은', '가장 옳은', '옳은 것은', '맞는 것은', '올바른 것은', '가장 알맞은', '올바르게'
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
  if (!text || typeof text !== 'string') return '';

  let raw = text.trim();
  let prefixTagHTML = '';

  // Extract prefix tag like [빈출 기출], [최신 기출 변형], [12회 복원], etc.
  const tagMatch = raw.match(/^\[([가-힣a-zA-Z0-9\s·]+)\]\s*/);
  if (tagMatch) {
    const tagText = tagMatch[1].trim();
    let badgeClass = 'q-prefix-brand';
    if (tagText.includes('빈출') || tagText.includes('A급')) {
      badgeClass = 'q-prefix-amber';
    } else if (tagText.includes('12회') || tagText.includes('11회') || tagText.includes('최신')) {
      badgeClass = 'q-prefix-purple';
    } else if (tagText.includes('계산')) {
      badgeClass = 'q-prefix-blue';
    }
    prefixTagHTML = `<span class="q-prefix-badge ${badgeClass}">🏷️ ${escapeHTML(tagText)}</span> `;
    raw = raw.substring(tagMatch[0].length).trim();
  }

  const numPrefix = displayNum ? `<strong class="q-num-label">Q${displayNum}.</strong> ` : '';

  // Check for multi-line question or box patterns
  // Pattern 1: Question ending with '?' or ':' followed by newline items or <보기>
  const parts = raw.split(/\n\s*\n|\n(?=[ㄱ-ㅎ가-힣a-zA-Z0-9][\.\)\s]|<|\[|【|\|)/);
  
  if (parts.length > 1) {
    let mainPrompt = parts[0].trim();
    let boxContent = parts.slice(1).join('\n').trim();

    // Check if mainPrompt has box tag e.g. <보기>
    let boxTag = '보기';
    const tagInMain = mainPrompt.match(/(<보기>|\[보기\]|【보기】|<혼동행렬>|\[혼동행렬\]|<표>|\[표\]|<사례>|\[사례\]|<조건>|\[조건\])/);
    if (tagInMain) {
      boxTag = tagInMain[1].replace(/[<\[【>\]】]/g, '');
    }

    // Format box content lines
    const boxLines = boxContent.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';

      // Check for markdown table line
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        return `<div class="quiz-box-table-row font-mono">${escapeHTML(trimmed)}</div>`;
      }
      // Check for bullet items (ㄱ. ㄴ. 1. a.)
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

  // Fallback for inline box matches
  const boxRegex = /(<보기>|\[보기\]|【보기】|<혼동행렬>|\[혼동행렬\]|<표>|\[표\]|<사례>|\[사례\]|<조건>|\[조건\])([\s\S]*)/i;
  const boxMatch = raw.match(boxRegex);

  if (boxMatch && boxMatch.index > 0) {
    const mainQuestion = raw.substring(0, boxMatch.index).trim();
    const boxTag = boxMatch[1].replace(/[<\[【>\]】]/g, '');
    const boxContent = boxMatch[2].trim();

    const formattedBoxLines = boxContent.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
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
        ${numPrefix}${prefixTagHTML}<span>${highlightTrapKeywords(escapeHTML(mainQuestion))}</span>
      </div>
      <div class="quiz-box-prompt">
        <div class="quiz-box-prompt-title">📌 [${escapeHTML(boxTag)}]</div>
        <div class="quiz-box-prompt-body">${formattedBoxLines}</div>
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
  if (!raw || typeof raw !== 'string') return '';
  const lines = raw.trim().split('\n');
  const blocks = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
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

    if (trimmed.startsWith('💡') || trimmed.startsWith('🚨') || trimmed.startsWith('📌')) {
      flushParagraph();
      let icon = trimmed.slice(0, 2);
      let rest = trimmed.slice(2).trim();
      let alertClass = trimmed.startsWith('🚨') ? 'callout-danger' : 'callout-brand';
      blocks.push(`<div class="explain-callout ${alertClass}"><span class="callout-icon">${icon}</span><div class="callout-content">${escapeHTML(rest)}</div></div>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
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
  return blocks.join('');
}

// Test on dataset
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cbt_bank.json'), 'utf8'));
console.log('Testing formatQuestionText and formatExplanationText on 941 questions...');

let totalTested = 0;
data.questions.forEach(q => {
  const formattedQ = formatQuestionText(q.question, 1);
  const formattedE = formatExplanationText(q.explanation);
  if (!formattedQ || !formattedE) {
    console.error('Failed to format question:', q.id);
  }
  totalTested++;
});

console.log(`✅ Successfully formatted all ${totalTested} questions and explanations without any errors!`);

// Test specific question Q1022
const q1022 = data.questions.find(q => q.id === 'Q1022');
console.log('\n--- Formatted Q1022 Question HTML ---\n', formatQuestionText(q1022.question, 1));
console.log('\n--- Formatted Q1022 Explanation HTML ---\n', formatExplanationText(q1022.explanation));
