const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Update renderReverseRoadmap
const targetRoadmap = `    const presets = [
      { id: "12th", title: "12회 기출 복원", date: "2026.03", count: 87, tag: "최신 출제" },
      { id: "11th", title: "11회 실전 기출", date: "2025.10", count: 80, tag: "실전 모의" },
      { id: "10th", title: "10회 실전 기출", date: "2025.06", count: 80, tag: "핵심 기출" },
      { id: "9th", title: "9회 기출 복원", date: "2024.11", count: 50, tag: "단골 복원" },
      { id: "8th", title: "8회 기출 복원", date: "2024.04", count: 50, tag: "유형 분석" },
      { id: "4th", title: "4회 실전 기출", date: "2022.04", count: 80, tag: "기초 탄탄" }
    ];`;

const replacementRoadmap = `    const presets = [
      { id: "12th", title: "12회 최신 기출", date: "2026.04", count: 80, tag: "🔥 최신 출제" },
      { id: "11th", title: "11회 실전 기출", date: "2025.10", count: 80, tag: "🎯 실전 모의" },
      { id: "10th", title: "10회 실전 기출", date: "2025.06", count: 80, tag: "📘 핵심 기출" },
      { id: "9th", title: "9회 기출 복원", date: "2024.11", count: 80, tag: "🏆 단골 복원" },
      { id: "8th", title: "8회 기출 복원", date: "2024.04", count: 80, tag: "⚡ 유형 분석" },
      { id: "4th", title: "4회 실전 기출", date: "2022.04", count: 80, tag: "🌱 기초 탄탄" }
    ];`;

if (code.includes(targetRoadmap)) {
  code = code.replace(targetRoadmap, replacementRoadmap);
}

// 2. Update pack button bindings
const targetPacks = `    bindPackBtn("btnAgradePass", "⭐ A급 필수 빈출 모드로 전환되었습니다!", f => f.importance = "A");
    bindPackBtn("btn9thExamPack", "🔥 9회 기출 복원 모드로 전환되었습니다!", f => f.round = "9");
    bindPackBtn("btn8thExamPack", "🏆 8회 기출 복원 모드로 전환되었습니다!", f => f.round = "8");
    bindPackBtn("btn12thExamPack", "⚡ 12회 기출 복원 모드로 전환되었습니다!", f => f.is12thOnly = true);
    bindPackBtn("btn11thExamPack", "🎯 11회 기출 집중 모드로 전환되었습니다!", f => f.is11thOnly = true);
    bindPackBtn("btn10thExamPack", "📘 10회 기출 집중 모드로 전환되었습니다!", f => f.is10thOnly = true);
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);`;

const replacementPacks = `    bindPackBtn("btnAllGichulPack", "👑 역대 진짜 기출 전체 (914제) 모드로 전환되었습니다!", f => f.round = "gichul_all");
    bindPackBtn("btn12thExamPack", "⚡ 12회 최신 기출 복원 (242제) 모드로 전환되었습니다!", f => f.round = "12");
    bindPackBtn("btn11thExamPack", "🎯 11회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "11");
    bindPackBtn("btn10thExamPack", "📘 10회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "10");
    bindPackBtn("btn9thExamPack", "🔥 9회 기출 복원 (80제) 모드로 전환되었습니다!", f => f.round = "9");
    bindPackBtn("btn8thExamPack", "🏆 8회 기출 복원 (80제) 모드로 전환되었습니다!", f => f.round = "8");
    bindPackBtn("btn4thExamPack", "🌱 4회 실전 기출 (80제) 모드로 전환되었습니다!", f => f.round = "4");
    bindPackBtn("btnFrequentGichulPack", "⭐ 단원별 빈출 기출 (272제) 모드로 전환되었습니다!", f => f.round = "frequent");
    bindPackBtn("btnAgradePass", "⭐ A급 필수 빈출 모드로 전환되었습니다!", f => f.importance = "A");
    bindPackBtn("btnCalcPack", "🧮 계산 집중 공략 팩으로 전환되었습니다!", f => f.calcOnly = true);`;

if (code.includes(targetPacks)) {
  code = code.replace(targetPacks, replacementPacks);
}

fs.writeFileSync(appPath, code, 'utf8');
console.log('Successfully updated app.js roadmap and pack counts!');
