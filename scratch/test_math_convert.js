function convertLatexToHTML(latex) {
  if (!latex) return "";
  let str = latex.trim();

  // Normalize any multi-escaped backslashes (\\\\ -> \\ -> \)
  str = str.replace(/\\+/g, '\\');

  // Text wrappers
  str = str.replace(/\\text\{([^}]+)\}/g, '<span class="math-text">$1</span>');
  str = str.replace(/\\mathbf\{([^}]+)\}/g, '<strong>$1</strong>');

  // Fractions supporting 1 level of nested curly braces in num/denom (e.g. X_{min})
  str = str.replace(/\\frac\{((?:[^{}]|\{[^{}]*\})+)\}\{((?:[^{}]|\{[^{}]*\})+)\}/g, (match, num, denom) => {
    return `<span class="math-frac"><span class="math-num">${convertLatexToHTML(num)}</span><span class="math-denom">${convertLatexToHTML(denom)}</span></span>`;
  });

  // Roots
  str = str.replace(/\\sqrt\{((?:[^{}]|\{[^{}]*\})+)\}/g, (match, rad) => {
    return `<span class="math-sqrt">√<span class="math-radicand">${convertLatexToHTML(rad)}</span></span>`;
  });

  // Subscripts & Superscripts
  str = str.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  str = str.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  str = str.replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>');
  str = str.replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>');

  // Common symbols
  const syms = {
    "\\alpha": "α", "\\beta": "β", "\\gamma": "γ", "\\delta": "δ",
    "\\epsilon": "ε", "\\lambda": "λ", "\\mu": "μ", "\\sigma": "σ",
    "\\tau": "τ", "\\theta": "θ", "\\pi": "π", "\\rho": "ρ",
    "\\chi": "χ", "\\Sigma": "Σ", "\\Delta": "Δ",
    "\\ge": "≥", "\\le": "≤", "\\ne": "≠", "\\approx": "≈",
    "\\times": "×", "\\div": "÷", "\\pm": "±",
    "\\cap": "∩", "\\cup": "∪", "\\subset": "⊂",
    "\\rightarrow": "→", "\\leftarrow": "←", "\\Rightarrow": "⇒",
    "\\sum": "∑", "\\prod": "∏", "\\int": "∫",
    "\\infty": "∞", "\\ln": "ln", "\\log": "log",
    "\\sim": "~", "\\quad": " ", "\\,": " "
  };

  for (const [k, v] of Object.entries(syms)) {
    str = str.replace(new RegExp('\\' + k, 'g'), v);
  }

  return str;
}

const sample1 = 'X_{new} = \\frac{X - X_{min}}{X_{max} - X_{min}}';
const sample2 = 'Z = \\frac{X - \\mu}{\\sigma}';
const sample3 = 'VIF = \\frac{1}{1 - R_i^2} \\ge 10';
const sample4 = 'F_1 = \\frac{2 \\times \\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}';

console.log('Sample 1 (User Request):', convertLatexToHTML(sample1));
console.log('Sample 2 (Z-score):', convertLatexToHTML(sample2));
console.log('Sample 3 (VIF):', convertLatexToHTML(sample3));
console.log('Sample 4 (F1):', convertLatexToHTML(sample4));
