/**
 * 빅데이터분석기사 요약노트 (2·3과목 집중 버전)
 * data.json 을 읽어 페이지를 렌더링합니다.
 * 내용 추가/수정은 data.json 만 편집하면 됩니다.
 * v3 — search · expand/collapse · scroll progress · card memory · a11y · theme
 */

(function () {
  'use strict';

  // ── 유틸 ────────────────────────────────────────────────
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 메모/리스트 항목은 JSON에 HTML(<strong> 등)이 포함되므로
  // 신뢰된 data.json 기준으로 그대로 삽입. 외부 입력이면 sanitize 필요.
  function trustHtml(str) {
    return typeof str === 'string' ? str : '';
  }

  // 카드 열림 상태 저장 키
  const OPEN_CARDS_KEY = 'bigdata-note-open-cards';

  function loadOpenCards() {
    try {
      const raw = localStorage.getItem(OPEN_CARDS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveOpenCards(map) {
    try {
      localStorage.setItem(OPEN_CARDS_KEY, JSON.stringify(map));
    } catch {}
  }

  let openCardsMap = loadOpenCards();

  // ── 블록 렌더러 ─────────────────────────────────────────
  function renderBlock(block) {
    switch (block.type) {
      case 'h4':
        return `<h4>${trustHtml(block.text)}</h4>`;

      case 'ul':
        return `<ul>${(block.items || [])
          .map((item) => `<li>${trustHtml(item)}</li>`)
          .join('')}</ul>`;

      case 'memo':
        return `<div class="memo">${trustHtml(block.text)}</div>`;

      case 'note':
        return `<div class="note">${trustHtml(block.text)}</div>`;

      case 'formula':
        return `<div class="formula">${trustHtml(block.text)}</div>`;

      case 'table': {
        const headers = block.headers || [];
        const rows = block.rows || [];
        const head = headers.map((h) => `<th>${trustHtml(h)}</th>`).join('');
        const body = rows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${trustHtml(cell)}</td>`).join('')}</tr>`
          )
          .join('');
        return `
          <div class="table-wrap">
            <table>
              <thead><tr>${head}</tr></thead>
              <tbody>${body}</tbody>
            </table>
          </div>`;
      }

      default:
        return '';
    }
  }

  // ── 카드 렌더러 ─────────────────────────────────────────
  function renderCard(card) {
    // data.json open 플래그 + localStorage 기억 상태 병합
    const isOpen = openCardsMap[card.id] !== undefined
      ? !!openCardsMap[card.id]
      : !!card.open;
    const blocksHtml = (card.blocks || []).map(renderBlock).join('');
    return `
      <article class="card${isOpen ? ' open' : ''}" id="${escapeHtml(card.id)}" data-card-id="${escapeHtml(card.id)}">
        <div
          class="card-header"
          data-toggle
          role="button"
          tabindex="0"
          aria-expanded="${isOpen}"
          aria-controls="${escapeHtml(card.id)}-body"
        >
          <h3><span class="dot" aria-hidden="true"></span>${trustHtml(card.title)}</h3>
          <span class="chevron" aria-hidden="true">▾</span>
        </div>
        <div class="card-body" id="${escapeHtml(card.id)}-body"${isOpen ? '' : ' hidden'}>
          ${blocksHtml}
        </div>
      </article>`;
  }

  // ── 섹션 렌더러 ─────────────────────────────────────────
  function renderSection(section) {
    const subjectClass = section.id.startsWith('s3') ? 'subject-s3' : 'subject-s2';
    const cardsHtml = (section.cards || []).map(renderCard).join('');
    return `
      <section class="section ${subjectClass}" id="${escapeHtml(section.id)}" data-section data-subject="${section.id.startsWith('s3') ? 's3' : 's2'}">
        <div class="section-header">
          <span class="section-num">${escapeHtml(section.num)}</span>
          <h2 class="section-title">${trustHtml(section.title)}</h2>
        </div>
        ${cardsHtml}
      </section>`;
  }

  // ── 네비게이션 렌더러 ───────────────────────────────────
  function renderNav(nav) {
    return (nav || [])
      .map((group) => {
        const items = (group.items || [])
          .map((item) => {
            const cls = item.level === 2 ? 'nav-link sub' : 'nav-link';
            return `<a href="#${escapeHtml(item.id)}" class="${cls}" data-nav-id="${escapeHtml(item.id)}">${trustHtml(item.label)}</a>`;
          })
          .join('');
        return `
          <div class="nav-group">
            <div class="nav-group-title">${trustHtml(group.group)}</div>
            ${items}
          </div>`;
      })
      .join('');
  }

  // ── 테마 ────────────────────────────────────────────────
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? '#070B14' : '#F8FAFC';

    const btn = $('#themeToggleBtn');
    if (btn) {
      const icon = btn.querySelector('.theme-icon') || btn;
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
      );
    }
  }

  // ── 사이드바 ────────────────────────────────────────────
  function setSidebarOpen(open) {
    const sidebar = $('#sidebar');
    const overlay = $('#overlay');
    const menuBtn = $('#menuBtn');
    if (!sidebar || !overlay) return;

    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    sidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    }

    document.body.style.overflow = open ? 'hidden' : '';
  }

  // ── 카드 토글 ───────────────────────────────────────────
  function toggleCard(header, forceOpen) {
    const card = header.closest('.card');
    if (!card) return;
    const body = card.querySelector('.card-body');
    const cardId = card.dataset.cardId || card.id;
    let isOpen;

    if (forceOpen === true) {
      card.classList.add('open');
      isOpen = true;
    } else if (forceOpen === false) {
      card.classList.remove('open');
      isOpen = false;
    } else {
      isOpen = card.classList.toggle('open');
    }

    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (body) {
      if (isOpen) body.removeAttribute('hidden');
      else body.setAttribute('hidden', '');
    }

    // 기억
    openCardsMap[cardId] = isOpen;
    saveOpenCards(openCardsMap);
  }

  function expandAllCards() {
    $$('.card').forEach((card) => {
      const header = card.querySelector('[data-toggle]');
      if (header) toggleCard(header, true);
    });
  }

  function collapseAllCards() {
    $$('.card').forEach((card) => {
      const header = card.querySelector('[data-toggle]');
      if (header) toggleCard(header, false);
    });
  }

  // ── 검색 ────────────────────────────────────────────────
  let currentQuery = '';

  function normalizeText(str) {
    return (str || '')
      .toLowerCase()
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function highlightText(html, query) {
    if (!query || query.length < 1) return html;
    // 단순 텍스트 하이라이트 (태그 보호를 위해 텍스트 노드만 처리하는 대신 간단 버전)
    const re = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    // HTML 태그를 일시 보호
    const placeholders = [];
    const protectedHtml = html.replace(/<[^>]+>/g, (m) => {
      placeholders.push(m);
      return `\u0000${placeholders.length - 1}\u0000`;
    });
    const highlighted = protectedHtml.replace(re, '<mark>$1</mark>');
    return highlighted.replace(/\u0000(\d+)\u0000/g, (_, i) => placeholders[+i]);
  }

  function runSearch(query) {
    currentQuery = (query || '').trim();
    const q = normalizeText(currentQuery);
    const cards = $$('.card');
    const sections = $$('[data-section]');
    let matchCount = 0;

    // 이전 하이라이트 제거를 위해 재렌더는 하지 않고, 표시/숨김만 처리
    // 하이라이트는 카드 제목 + body 텍스트에 적용

    cards.forEach((card) => {
      const titleEl = card.querySelector('h3');
      const bodyEl = card.querySelector('.card-body');
      const titleText = normalizeText(titleEl ? titleEl.textContent : '');
      const bodyText = normalizeText(bodyEl ? bodyEl.textContent : '');
      const haystack = titleText + ' ' + bodyText;

      const matched = !q || haystack.includes(q);

      card.classList.toggle('card-hidden', !matched);
      if (matched) matchCount++;

      // 하이라이트 (제목만 안전하게)
      if (titleEl && titleEl.dataset.origTitle === undefined) {
        titleEl.dataset.origTitle = titleEl.innerHTML;
      }
      if (titleEl) {
        if (q && matched) {
          const orig = titleEl.dataset.origTitle;
          // 점(span.dot)은 유지
          const dotMatch = orig.match(/^<span class="dot"[^>]*><\/span>/);
          const rest = orig.replace(/^<span class="dot"[^>]*><\/span>/, '');
          const plainRest = rest.replace(/<[^>]+>/g, '');
          titleEl.innerHTML =
            (dotMatch ? dotMatch[0] : '') +
            highlightText(escapeHtml(plainRest), currentQuery);
        } else if (titleEl.dataset.origTitle) {
          titleEl.innerHTML = titleEl.dataset.origTitle;
        }
      }
    });

    // 섹션: 내부 카드가 하나도 안 보이면 숨김
    sections.forEach((sec) => {
      const visibleCards = sec.querySelectorAll('.card:not(.card-hidden)');
      sec.classList.toggle('section-hidden', visibleCards.length === 0);
    });

    // 네비 dim
    $$('.nav-link').forEach((link) => {
      const id = link.dataset.navId;
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      // 섹션 또는 카드
      const hidden =
        target.classList.contains('section-hidden') ||
        target.classList.contains('card-hidden');
      link.classList.toggle('dimmed', q && hidden);
    });

    // 배너
    const banner = $('#searchBanner');
    const bannerText = $('#searchBannerText');
    if (banner && bannerText) {
      if (q) {
        banner.hidden = false;
        bannerText.textContent =
          matchCount === 0
            ? `"${currentQuery}" 검색 결과 없음`
            : `"${currentQuery}" · ${matchCount}개 카드`;
      } else {
        banner.hidden = true;
      }
    }

    // clear 버튼
    ['sidebarSearchClear', 'mobileSearchClear'].forEach((id) => {
      const btn = $('#' + id);
      if (btn) btn.hidden = !q;
    });
  }

  function clearSearch() {
    currentQuery = '';
    const inputs = [$('#sidebarSearchInput'), $('#mobileSearchInput')];
    inputs.forEach((inp) => {
      if (inp) inp.value = '';
    });
    runSearch('');
  }

  // ── 스크롤 진행률 ───────────────────────────────────────
  function updateScrollProgress() {
    const bar = $('#scrollProgress');
    if (!bar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));

    // 맨 위로 버튼 표시
    const toTop = $('#toTop');
    if (toTop) {
      toTop.classList.toggle('visible', scrollTop > 320);
    }
  }

  // ── 메인 렌더 ───────────────────────────────────────────
  function render(data) {
    // 사이드바 로고
    const badge = $('#logo-badge');
    const title = $('#logo-title');
    const sub = $('#logo-sub');
    if (badge && data.meta?.version) {
      badge.textContent = data.meta.version.replace('개정 버전 ', '개정 ');
    }
    if (title && data.meta?.title) {
      title.innerHTML = escapeHtml(data.meta.title)
        .replace(' (', '<br>(')
        .replace(' · ', '<br>');
    }
    if (sub && data.meta?.publisher) {
      sub.textContent = data.meta.publisher + ' · IT의 답을 터득하다';
    }

    // 네비게이션
    const navEl = $('#nav-container');
    if (navEl) navEl.innerHTML = renderNav(data.nav);

    // 히어로
    const heroVersion = $('#hero-version');
    const heroTitle = $('#hero-title');
    const heroDesc = $('#hero-desc');
    if (heroVersion && data.meta?.version) {
      heroVersion.textContent =
        data.meta.version + ' · ' + (data.meta.publisher || '아답터');
    }
    if (heroTitle) {
      heroTitle.innerHTML =
        '빅데이터분석기사<br><span>2과목 · 3과목 완벽대비</span> 요약노트';
    }
    if (heroDesc && data.meta?.description) {
      heroDesc.textContent = data.meta.description;
    }

    // 통계
    const sections = data.sections || [];
    const cardCount = sections.reduce(
      (n, s) => n + (s.cards ? s.cards.length : 0),
      0
    );
    const heroStats = $('#heroStats');
    const statSections = $('#statSections');
    const statCards = $('#statCards');
    if (heroStats && sections.length) {
      heroStats.hidden = false;
      if (statSections) statSections.textContent = `${sections.length}개 섹션`;
      if (statCards) statCards.textContent = `${cardCount}개 카드`;
    }

    // 본문
    const content = $('#content');
    if (content) {
      content.innerHTML = sections.map(renderSection).join('');
      content.removeAttribute('aria-busy');
    }

    // 푸터
    const footer = $('#footer');
    if (footer && data.footer) {
      footer.innerHTML = `<p>${trustHtml(data.footer)}</p>`;
    }

    // 문서 제목 보강
    if (data.meta?.title) {
      document.title = data.meta.title;
    }

    bindEvents();
    setupScrollSpy();
    updateScrollProgress();
  }

  // ── 이벤트 바인딩 (위임) ────────────────────────────────
  function bindEvents() {
    // 카드 토글 (클릭 + 키보드)
    document.addEventListener('click', (e) => {
      const header = e.target.closest('[data-toggle]');
      if (header) toggleCard(header);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const header = e.target.closest('[data-toggle]');
      if (header) {
        e.preventDefault();
        toggleCard(header);
      }
    });

    // 테마
    applyTheme(getPreferredTheme());
    const themeBtn = $('#themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next =
          document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'light'
            : 'dark';
        applyTheme(next);
      });
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });

    // 모바일 메뉴
    const menuBtn = $('#menuBtn');
    const overlay = $('#overlay');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const open = !$('#sidebar')?.classList.contains('open');
        setSidebarOpen(open);
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => setSidebarOpen(false));
    }

    // ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        const ms = $('#mobileSearch');
        if (ms && !ms.hidden) {
          ms.hidden = true;
          clearSearch();
        }
      }
    });

    // 네비 링크
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link, #bottomNav a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          setSidebarOpen(false);
          // 검색으로 숨겨진 경우 잠시 표시
          if (target.classList.contains('card-hidden') || target.classList.contains('section-hidden')) {
            clearSearch();
          }
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
        }
      } else {
        setSidebarOpen(false);
      }
    });

    // 맨 위로
    const toTop = $('#toTop');
    if (toTop) {
      const scrollTop = () =>
        window.scrollTo({ top: 0, behavior: 'smooth' });
      toTop.addEventListener('click', scrollTop);
      toTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollTop();
        }
      });
    }

    // 전체 펼치기 / 접기
    const expandBtn = $('#expandAllBtn');
    const collapseBtn = $('#collapseAllBtn');
    if (expandBtn) expandBtn.addEventListener('click', expandAllCards);
    if (collapseBtn) collapseBtn.addEventListener('click', collapseAllCards);

    // 검색
    const sidebarInput = $('#sidebarSearchInput');
    const mobileInput = $('#mobileSearchInput');
    const searchToggle = $('#searchToggleBtn');
    const mobileSearch = $('#mobileSearch');

    function onSearchInput(e) {
      const val = e.target.value;
      // 동기화
      if (sidebarInput && e.target !== sidebarInput) sidebarInput.value = val;
      if (mobileInput && e.target !== mobileInput) mobileInput.value = val;
      runSearch(val);
    }

    if (sidebarInput) {
      sidebarInput.addEventListener('input', onSearchInput);
    }
    if (mobileInput) {
      mobileInput.addEventListener('input', onSearchInput);
    }

    if (searchToggle && mobileSearch) {
      searchToggle.addEventListener('click', () => {
        const willShow = mobileSearch.hidden;
        mobileSearch.hidden = !willShow;
        if (willShow && mobileInput) {
          setTimeout(() => mobileInput.focus(), 50);
        } else {
          clearSearch();
        }
      });
    }

    // clear 버튼들
    ['sidebarSearchClear', 'mobileSearchClear', 'searchBannerClear'].forEach(
      (id) => {
        const btn = $('#' + id);
        if (btn) btn.addEventListener('click', clearSearch);
      }
    );

    // 스크롤
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateScrollProgress();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ── 스크롤 스파이 (IntersectionObserver) ────────────────
  function setupScrollSpy() {
    const navLinks = $$('.nav-link');
    const sections = $$('[data-section]');
    if (!sections.length) return;

    const linkMap = new Map();
    navLinks.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (id) linkMap.set(id, link);
    });

    let currentId = '';

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          currentId = visible[0].target.id;
        } else {
          if (window.scrollY < 80 && sections[0]) {
            currentId = sections[0].id;
          }
        }

        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = linkMap.get(currentId);
        if (activeLink) activeLink.classList.add('active');

        updateBottomNav(currentId);
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    if (sections[0]) {
      currentId = sections[0].id;
      const first = linkMap.get(currentId);
      if (first) first.classList.add('active');
      updateBottomNav(currentId);
    }
  }

  function updateBottomNav(currentId) {
    const bottomLinks = $$('#bottomNav a');
    const subject = currentId.startsWith('s3') ? 's3' : 's2';
    bottomLinks.forEach((a) => {
      a.classList.toggle('active', a.dataset.subject === subject);
    });
  }

  // ── 데이터 로드 ─────────────────────────────────────────
  function showError(message) {
    const content = $('#content');
    if (!content) return;
    content.innerHTML = `
      <div class="loading" role="alert">
        <p>
          data.json 을 불러오지 못했습니다.<br>
          로컬에서 열 때는 웹서버가 필요합니다.<br>
          (예: <code>npx serve .</code> 또는 VS Code Live Server)
        </p>
        <p style="margin-top:12px;color:var(--muted)">오류: ${escapeHtml(message)}</p>
      </div>`;
  }

  fetch('data.json', { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} — data.json 로드 실패`);
      return res.json();
    })
    .then(render)
    .catch((err) => {
      console.error(err);
      showError(err.message || String(err));
    });
})();