const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const appPath = path.join(ROOT_DIR, 'app.js');
const cssPath = path.join(ROOT_DIR, 'style.css');

// 1. Update app.js
let appCode = fs.readFileSync(appPath, 'utf8');

const targetRenderMath = `  function renderMathFormulas(rootEl) {
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

const replacementRenderMath = `  function normalizeMathSymbols(str) {
    if (!str || typeof str !== "string") return "";
    return str
      .replace(/\\$H_0\\$|\\$H0\\$/g, "H₀")
      .replace(/\\$H_1\\$|\\$H1\\$/g, "H₁")
      .replace(/\\$H_a\\$|\\$Ha\\$/g, "Hₐ")
      .replace(/\\$\\alpha\\$|\\$alpha\\$/g, "α")
      .replace(/\\$\\beta\\$|\\$beta\\$/g, "β")
      .replace(/\\$\\mu\\$|\\$mu\\$/g, "μ")
      .replace(/\\$\\sigma\\^2\\$|\\$sigma\\^2\\$/g, "σ²")
      .replace(/\\$\\sigma\\$|\\$sigma\\$/g, "σ")
      .replace(/\\$\\chi\\^2\\$|\\$chi\\^2\\$/g, "χ²")
      .replace(/\\$R\\^2\\$|\\$R2\\$/g, "R²")
      .replace(/\\$R\\^2_\\{adj\\}\\$/g, "수정된 R²")
      .replace(/\\$Q_1\\$|\\$Q1\\$/g, "Q₁")
      .replace(/\\$Q_2\\$|\\$Q2\\$/g, "Q₂")
      .replace(/\\$Q_3\\$|\\$Q3\\$/g, "Q₃")
      .replace(/\\$X_1\\$/g, "X₁")
      .replace(/\\$X_2\\$/g, "X₂")
      .replace(/\\$y_i\\$/g, "yᵢ")
      .replace(/\\$F_1\\$/g, "F₁")
      .replace(/\\$F_2\\$/g, "F₂")
      .replace(/\\$F_\\{0\\.5\\}\\$/g, "F₀.₅")
      .replace(/\\$F_\\\\beta\\$/g, "F_β")
      .replace(/\\$\\epsilon\\$|\\$epsilon\\$/g, "ε")
      .replace(/\\$A \\\\rightarrow B\\$/g, "A → B")
      .replace(/\\$P\\(X\\)\\$/g, "P(X)")
      .replace(/\\$Y = X\\^2\\$/g, "Y = X²")
      .replace(/\\$([a-zA-Z0-9])\\$/g, "$1");
  }

  function renderMathFormulas(rootEl) {
    if (!rootEl) return;
    if (typeof window.renderMathInElement === "function") {
      if (rootEl.textContent && !rootEl.textContent.includes("$$") && !rootEl.textContent.includes("\\\\(")) return;
      try {
        window.renderMathInElement(rootEl, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\\\(", right: "\\\\)", display: false }
          ],
          output: "html",
          throwOnError: false
        });
      } catch (e) { }
    }
  }`;

// Handle line endings
const normAppCode = appCode.replace(/\r\n/g, '\n');
const normTarget = targetRenderMath.replace(/\r\n/g, '\n');

if (normAppCode.includes(normTarget)) {
  appCode = normAppCode.replace(normTarget, replacementRenderMath);
  fs.writeFileSync(appPath, appCode, 'utf8');
  console.log('Successfully updated math renderer and normalizeMathSymbols in app.js!');
} else {
  console.error('targetRenderMath not found in app.js');
}

// 2. Update style.css with KaTeX Core Fallback Styles
let cssCode = fs.readFileSync(cssPath, 'utf8');
const katexCSS = `
/* =========================================================
   KaTeX Formula Display Optimization & Duplication Prevention
   ========================================================= */
.katex-mathml {
  display: none !important;
  visibility: hidden !important;
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}

.katex {
  font: normal 1.02em/1.2 KaTeX_Main, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  line-height: 1.2 !important;
  white-space: nowrap !important;
  text-indent: 0 !important;
  display: inline-block !important;
  vertical-align: baseline !important;
}

.katex .katex-html {
  display: inline-block !important;
  white-space: nowrap !important;
}
`;

if (!cssCode.includes('.katex-mathml {')) {
  cssCode += katexCSS;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
  console.log('Successfully appended KaTeX fallback styles to style.css!');
}
