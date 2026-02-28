function initHeaderShrink() {
  const header = document.querySelector('.site-header');
  if (!header) {
    return;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
}

function initNavToggle() {
  const topbar = document.querySelector('.topbar');
  const nav = document.querySelector('.site-nav');
  if (!topbar || !nav) {
    return;
  }

  const button = document.createElement('button');
  button.className = 'nav-toggle';
  button.type = 'button';
  button.textContent = 'Menu';
  button.setAttribute('aria-label', 'Toggle navigation menu');
  topbar.insertBefore(button, nav);

  button.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(el => observer.observe(el));
}

function initExpandableCards() {
  const cards = document.querySelectorAll('.expandable');
  cards.forEach(card => {
    const header = card.querySelector('.expand-header');
    if (!header) {
      return;
    }

    header.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
}

function initTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        buttons.forEach(btn => btn.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        const panel = group.querySelector(`#${target}`);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });
  });
}

function animateProgressRing(element, value) {
  let current = 0;
  const target = Math.max(0, Math.min(100, value));
  const inner = element.querySelector('span');
  const timer = setInterval(() => {
    current += 2;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    const degrees = current * 3.6;
    element.style.setProperty('--progress', `${current}%`);
    element.style.background = `conic-gradient(var(--accent) ${degrees}deg, #1f2f46 ${degrees}deg)`;
    if (inner) {
      inner.textContent = `${current}%`;
    }
  }, 14);
}

function initDashboard() {
  const dashboard = document.querySelector('[data-dashboard]');
  if (!dashboard) {
    return;
  }

  const tiles = dashboard.querySelectorAll('.project-tile');
  const filterButtons = dashboard.querySelectorAll('.filter-btn');
  const panel = document.querySelector('.slide-panel');
  const panelClose = panel?.querySelector('.panel-close');

  dashboard.querySelectorAll('.progress-ring').forEach(ring => {
    const value = Number(ring.getAttribute('data-progress') || 0);
    animateProgressRing(ring, value);
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tiles.forEach(tile => {
        const category = tile.getAttribute('data-category');
        tile.style.display = filter === 'All' || category === filter ? 'block' : 'none';
      });
    });
  });

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (!panel) {
        return;
      }

      panel.querySelector('[data-panel-title]').textContent = tile.getAttribute('data-name') || '';
      panel.querySelector('[data-panel-role]').textContent = tile.getAttribute('data-role') || '';
      panel.querySelector('[data-panel-summary]').textContent = tile.getAttribute('data-summary') || '';
      panel.querySelector('[data-panel-status]').textContent = tile.getAttribute('data-status') || '';
      panel.querySelector('[data-panel-maturity]').textContent = tile.getAttribute('data-maturity') || '';
      panel.querySelector('[data-panel-goals]').textContent = tile.getAttribute('data-goals') || '';
      panel.querySelector('[data-panel-next]').textContent = tile.getAttribute('data-next') || '';
      panel.querySelector('[data-panel-skills]').textContent = tile.getAttribute('data-devskills') || '';
      panel.querySelector('[data-panel-growth]').textContent = tile.getAttribute('data-growth') || '';
      panel.querySelector('[data-panel-future]').textContent = tile.getAttribute('data-future') || '';
      panel.classList.add('open');
    });
  });

  panelClose?.addEventListener('click', () => panel.classList.remove('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initHeaderShrink();
  initReveal();
  initExpandableCards();
  initTabs();
  initDashboard();
});