/**
 * 빅데이터분석기사 요약노트 (2·3과목 집중 버전)
 * data.json 을 읽어 페이지를 렌더링합니다.
 * 내용 추가/수정은 data.json 만 편집하면 됩니다.
 * v2 — performance · a11y · theme sync
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
    const isOpen = !!card.open;
    const blocksHtml = (card.blocks || []).map(renderBlock).join('');
    return `
      <article class="card${isOpen ? ' open' : ''}" id="${escapeHtml(card.id)}">
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
            return `<a href="#${escapeHtml(item.id)}" class="${cls}">${trustHtml(item.label)}</a>`;
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

    // theme-color meta 동기화
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? '#070B14' : '#F8FAFC';

    // 버튼 아이콘 / aria-label
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

    // 모바일에서 사이드바 열릴 때 body 스크롤 잠금
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // ── 카드 토글 ───────────────────────────────────────────
  function toggleCard(header) {
    const card = header.closest('.card');
    if (!card) return;
    const body = card.querySelector('.card-body');
    const isOpen = card.classList.toggle('open');
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (body) {
      if (isOpen) body.removeAttribute('hidden');
      else body.setAttribute('hidden', '');
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
      // 긴 제목을 줄바꿈 친화적으로
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

    // 본문
    const content = $('#content');
    if (content) {
      content.innerHTML = (data.sections || []).map(renderSection).join('');
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

    // OS 테마 변경 반영 (사용자가 수동 저장하지 않은 경우만)
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

    // ESC로 사이드바 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    });

    // 네비 링크 클릭 → 사이드바 닫기 + 부드러운 스크롤
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link, #bottomNav a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          setSidebarOpen(false);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // URL 해시 갱신 (히스토리)
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
        // 위에서부터 가장 많이 보이는 섹션 선택
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          currentId = visible[0].target.id;
        } else {
          // 스크롤이 맨 위일 때 첫 섹션
          if (window.scrollY < 80 && sections[0]) {
            currentId = sections[0].id;
          }
        }

        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = linkMap.get(currentId);
        if (activeLink) activeLink.classList.add('active');

        // 바텀 네비 (s2 / s3)
        updateBottomNav(currentId);
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    // 초기 상태
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