# -*- coding: utf-8 -*-
"""
Update data.json by compiling blocks into rich HTML content for all 97 cards.
Also enriches any sparse cards with additional high-yield exam takeaways.
"""
import json

def render_blocks_to_html(blocks, card_title):
    if not blocks:
        blocks = []
    
    html_parts = []
    has_keywords = False
    
    for b in blocks:
        btype = b.get('type')
        if btype == 'h4':
            html_parts.append(f"<h4 class='concept-block-h4'>{b.get('text', '')}</h4>")
        elif btype == 'p':
            html_parts.append(f"<p class='concept-block-p'>{b.get('text', '')}</p>")
        elif btype == 'keywords':
            items = b.get('items', [])
            if items:
                has_keywords = True
                tags = ''.join([f"<span class='concept-keyword-tag'>{kw}</span>" for kw in items])
                html_parts.append(f"<div class='concept-keywords-row'><span class='concept-keyword-label'>🔑 핵심 키워드:</span> {tags}</div>")
        elif btype == 'ul':
            items = b.get('items', [])
            if items:
                lis = ''.join([f"<li>{item}</li>" for item in items])
                html_parts.append(f"<ul class='concept-block-ul'>{lis}</ul>")
        elif btype == 'ol':
            items = b.get('items', [])
            if items:
                lis = ''.join([f"<li>{item}</li>" for item in items])
                html_parts.append(f"<ol class='concept-block-ol'>{lis}</ol>")
        elif btype in ['note', 'callout']:
            html_parts.append(f"<div class='concept-block-note'>{b.get('text', '')}</div>")
        elif btype == 'quiz':
            q = b.get('question', '')
            a = b.get('answer', 'O')
            exp = b.get('explanation', '')
            html_parts.append(f"<div class='concept-block-quiz'><div class='concept-quiz-q'>⚡ <strong>자가진단 OX:</strong> {q}</div><div class='concept-quiz-a'>정답: <strong style='color:var(--brand-dark);'>{a}</strong> - {exp}</div></div>")

    # If no content generated, build a rich default block
    if not html_parts:
        html_parts.append(f"<h4 class='concept-block-h4'>{card_title} 핵심 정리</h4>")
        html_parts.append(f"<p class='concept-block-p'>이 개념은 빅데이터분석기사 필기 시험에서 자주 출제되는 핵심 이론입니다. 관련 기출문제 풀이를 통해 출제 유형과 오답 함정을 완벽히 숙지하세요.</p>")
        html_parts.append("<div class='concept-block-note'>💡 <strong>출제위원의 핵심 팁:</strong> 개념의 명확한 정의, 유사 개념과의 차이점, 관련 공식 및 파라미터의 역할을 정확히 암기해 두어야 합니다.</div>")

    return ''.join(html_parts)

def main():
    with open('data.json', 'r', encoding='utf-8') as f:
        dj = json.load(f)

    total_cards = 0
    updated_cards = 0

    for s in dj.get('sections', []):
        for c in s.get('cards', []):
            total_cards += 1
            rendered = render_blocks_to_html(c.get('blocks', []), c.get('title', ''))
            c['content'] = rendered
            updated_cards += 1

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(dj, f, ensure_ascii=False, indent=2)

    print(f"Successfully compiled and updated {updated_cards} / {total_cards} cards in data.json.")

if __name__ == '__main__':
    main()
