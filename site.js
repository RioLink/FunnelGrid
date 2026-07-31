document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('fg-nouveau');

  const path = window.location.pathname.replace(/index\.html$/, '');
  const parts = path.split('/').filter(Boolean);
  const page = parts[0] || 'home';
  document.body.dataset.page = page;

  const progress = document.createElement('div');
  progress.className = 'fg-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const edgeNote = document.createElement('div');
  edgeNote.className = 'fg-edge-note';
  edgeNote.setAttribute('aria-hidden', 'true');
  edgeNote.textContent = 'FunnelGrid / growth operating system';
  document.body.appendChild(edgeNote);

  const pageCodes = {
    services: 'Service architecture / 1',
    cases: 'Proof over promises / 2',
    tariffs: 'Clear investment / 3',
    blog: parts.length > 1 ? 'Field notes / article' : 'Field notes / 4',
    contacts: 'Start a campaign / 5'
  };

  const masthead = document.querySelector('.services-hero, .cases-hero, .tariffs-hero, .blog-hero, .contacts-hero, .post-hero');
  if (masthead) masthead.dataset.fgCode = pageCodes[page] || 'FunnelGrid / system';

  document.querySelectorAll('.nav a').forEach(function (link) {
    const href = (link.getAttribute('href') || '').replace(/^\//, '').split('/')[0];
    if ((page === 'home' && !href) || href === page) link.classList.add('is-active');
  });

  document.querySelectorAll('.svc-card, .service-item, .case-card, .case-item, .tariff-card, .plan, .blog-card').forEach(function (card, index) {
    card.style.setProperty('--fg-index', index + 1);
  });

  const signalTabs = Array.from(document.querySelectorAll('[data-signal-tab]'));
  const signalPanels = Array.from(document.querySelectorAll('[data-signal-panel]'));

  function activateSignal(name) {
    signalTabs.forEach(function (tab) {
      const active = tab.dataset.signalTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    signalPanels.forEach(function (panel) {
      const active = panel.dataset.signalPanel === name;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }

  signalTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activateSignal(tab.dataset.signalTab); });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const next = signalTabs[(index + offset + signalTabs.length) % signalTabs.length];
      activateSignal(next.dataset.signalTab);
      next.focus();
    });
  });

  const decisionTabs = Array.from(document.querySelectorAll('[data-decision-tab]'));
  const decisionPanels = Array.from(document.querySelectorAll('[data-decision-panel]'));

  function activateDecision(name) {
    decisionTabs.forEach(function (tab) {
      const active = tab.dataset.decisionTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    decisionPanels.forEach(function (panel) {
      const active = panel.dataset.decisionPanel === name;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }

  decisionTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activateDecision(tab.dataset.decisionTab); });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
      const next = decisionTabs[(index + (forward ? 1 : -1) + decisionTabs.length) % decisionTabs.length];
      activateDecision(next.dataset.decisionTab);
      next.focus();
    });
  });
  if (decisionTabs.length) activateDecision(decisionTabs[0].dataset.decisionTab);

  if (page === 'cases') {
    document.querySelectorAll('.case-item__text').forEach(function (text) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'case-item__more';
      button.textContent = 'Розгорнути кейс';
      button.setAttribute('aria-expanded', 'false');
      text.insertAdjacentElement('afterend', button);

      button.addEventListener('click', function () {
        const card = button.closest('.case-item');
        const expanded = card.classList.toggle('is-expanded');
        button.textContent = expanded ? 'Згорнути кейс' : 'Розгорнути кейс';
        button.setAttribute('aria-expanded', String(expanded));
      });
    });
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    document.documentElement.style.setProperty('--scroll-progress', value + '%');
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', function (event) {
      document.documentElement.style.setProperty('--pointer-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--pointer-y', event.clientY + 'px');
    }, { passive: true });
  }
});
