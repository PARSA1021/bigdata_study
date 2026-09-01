const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
const cssPath = path.join(__dirname, '..', 'style.css');

let appCode = fs.readFileSync(appPath, 'utf8');
let cssCode = fs.readFileSync(cssPath, 'utf8');

// 1. In switchNav: use currentWrongFilter
appCode = appCode.replace(
  '    } else if (targetNav === "wrong") {\n      if (wrongView) wrongView.classList.remove("hidden");\n      renderWrongNotesView("all");',
  '    } else if (targetNav === "wrong") {\n      if (wrongView) wrongView.classList.remove("hidden");\n      renderWrongNotesView(currentWrongFilter || "all");'
);

// 2. In setupEventListeners: bind wrong-filter-btn
const targetEventSetup = `    // Terminology & Static Keyword Filter`;
const replacementEventSetup = `    // Wrong Note Filter Buttons (전체, 기출만, 2회이상, 마스터, 북마크, 1~4과목)
    document.querySelectorAll(".wrong-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".wrong-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter || "all";
        renderWrongNotesView(f);
      });
    });

    // Terminology & Static Keyword Filter`;

if (!appCode.includes('.wrong-filter-btn')) {
  appCode = appCode.replace(targetEventSetup, replacementEventSetup);
}

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully updated app.js events for wrong filters!');

// 3. Add CSS additions to style.css
const cssAdditions = `
/* =========================================================
   📕 Enhanced Wrong Notes & Filter Chip Styles
   ========================================================= */

.wrong-filter-chip.success {
  background: rgba(52, 199, 89, 0.08);
  color: var(--success);
  border-color: rgba(52, 199, 89, 0.25);
}

.wrong-filter-chip.success:hover {
  background: rgba(52, 199, 89, 0.15);
  border-color: var(--success);
}

.wrong-filter-chip.success.active {
  background: var(--success) !important;
  color: #FFFFFF !important;
  border-color: var(--success) !important;
  box-shadow: 0 2px 8px rgba(52, 199, 89, 0.3);
}

.wrong-filter-chip.brand {
  background: rgba(0, 122, 255, 0.08);
  color: var(--brand);
  border-color: rgba(0, 122, 255, 0.25);
}

.wrong-filter-chip.brand:hover {
  background: rgba(0, 122, 255, 0.15);
  border-color: var(--brand);
}

.wrong-filter-chip.brand.active {
  background: var(--brand) !important;
  color: #FFFFFF !important;
  border-color: var(--brand) !important;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

.wrong-card-action-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
}

.wrong-note-card.mastered-card {
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.03) 0%, var(--surface) 100%);
  opacity: 0.95;
}
`;

if (!cssCode.includes('.wrong-filter-chip.success')) {
  cssCode += cssAdditions;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
  console.log('Successfully updated style.css for wrong notes styling!');
}
