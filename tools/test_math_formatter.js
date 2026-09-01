const fs = require('fs');

const testStr = "[8회 기출 복원] 통계적 가설 검정에서 '실제로는 귀무가설($H_0$)이 참임에도 불구하고, 귀무가설을 잘못 기각하여 발생하는 오류'인 제1종 오류(Type I Error, $\\alpha$)에 해당하는 혼동 행렬의 사례는?";

function cleanMathNotation(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\$H_0\$/g, 'H₀')
    .replace(/\$H_1\$/g, 'H₁')
    .replace(/\$H_a\$/g, 'Hₐ')
    .replace(/\$\\alpha\$/g, 'α')
    .replace(/\$\\beta\$/g, 'β')
    .replace(/\$\\mu\$/g, 'μ')
    .replace(/\$\\sigma\$/g, 'σ')
    .replace(/\$\\sigma\^2\$/g, 'σ²')
    .replace(/\$\\chi\^2\$/g, 'χ²')
    .replace(/\$R\^2\$/g, 'R²')
    .replace(/\$R\^2_\{adj\}\$/g, '수정된 R²')
    .replace(/\$F\$/g, 'F')
    .replace(/\$t\$/g, 't')
    .replace(/\$z\$/g, 'z')
    .replace(/\$p\$/g, 'p')
    .replace(/\$n\$/g, 'n')
    .replace(/\$k\$/g, 'k')
    .replace(/\$K\$/g, 'K')
    .replace(/\$X\$/g, 'X')
    .replace(/\$Y\$/g, 'Y')
    .replace(/\$A \\rightarrow B\$/g, 'A → B')
    .replace(/\$A\$/g, 'A')
    .replace(/\$B\$/g, 'B')
    .replace(/\$\\epsilon\$/g, 'ε');
}

console.log('Original:', testStr);
console.log('Cleaned:', cleanMathNotation(testStr));
