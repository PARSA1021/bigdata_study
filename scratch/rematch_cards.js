const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');
const cbtPath = path.join(__dirname, '../cbt_bank.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const cbt = JSON.parse(fs.readFileSync(cbtPath, 'utf8'));

// 1. Flatten all cards from data.json
const cards = [];
for (const section of data.sections) {
  if (section.cards) {
    for (const card of section.cards) {
      cards.push({
        id: card.id,
        title: card.title,
        content: (card.content || '').replace(/<[^>]*>?/gm, ' '),
        sectionId: section.id, // e.g. "s1-1"
      });
    }
  }
}

console.log(`Loaded ${cards.length} cards from data.json`);

// 2. Simple TF scoring function
function tokenize(text) {
  if (!text) return [];
  return text
    .replace(/[^\w\s가-힣]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function scoreMatch(qText, card) {
  const qTokens = tokenize(qText);
  const cardTitleTokens = tokenize(card.title);
  const cardContentTokens = tokenize(card.content);
  
  let score = 0;
  for (const qt of qTokens) {
    if (cardTitleTokens.includes(qt)) score += 5; // Title match is stronger
    if (cardContentTokens.includes(qt)) score += 1;
  }
  return score;
}

// 3. Rematch each question
let matched = 0;
let changed = 0;
for (const q of cbt.questions) {
  const qText = `${q.question} ${q.choices ? q.choices.join(' ') : ''} ${q.explanation || ''} ${q.memorizationPoint || ''}`;
  
  let bestCardId = q.cardId;
  let bestScore = -1;
  
  // We prefer cards in the same section, but if none match well, we search all.
  // Actually, searching within the same section is much safer.
  let targetCards = cards.filter(c => c.sectionId === q.sectionId);
  if (targetCards.length === 0) targetCards = cards; // fallback

  for (const card of targetCards) {
    const s = scoreMatch(qText, card);
    if (s > bestScore) {
      bestScore = s;
      bestCardId = card.id;
    }
  }
  
  if (q.cardId !== bestCardId) {
    changed++;
    q.cardId = bestCardId;
  }
  matched++;
}

console.log(`Matched ${matched} questions. Changed cardId for ${changed} questions.`);

fs.writeFileSync(cbtPath, JSON.stringify(cbt, null, 2), 'utf8');
console.log('Saved cbt_bank.json successfully.');
