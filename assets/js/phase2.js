(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch { /* Persistence is optional. */ }
  const setThemeIcon = () => {
    const light = root.dataset.theme === 'light';
    themeButton.innerHTML = light ? '<i class="fas fa-sun" aria-hidden="true"></i>' : '<i class="fas fa-moon" aria-hidden="true"></i>';
    themeButton.setAttribute('aria-label', 'Switch to ' + (light ? 'dark' : 'light') + ' theme');
  };
  setThemeIcon();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch { /* Optional. */ }
    setThemeIcon();
  });
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const closeNav = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => navToggle.setAttribute('aria-expanded', String(navLinks.classList.toggle('open'))));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) { closeNav(); navToggle.focus(); }
  });
  const header = document.querySelector('.site-header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 12), {passive:true});
  document.querySelector('#year').textContent = new Date().getFullYear();
  // Content remains visible without JavaScript, observer support, or animation.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }), {threshold: .05});
    document.querySelectorAll('.reveal').forEach(el => { el.classList.add('reveal-pending'); observer.observe(el); });
  }
  const grid = document.querySelector('#repo-grid');
  const status = document.querySelector('#repo-status');
  const fallback = [
    {name:'Zipco-Financial-Risk-Intelligence-platform', description:'Serverless AWS financial data engineering, scan benchmarks and operational governance.', language:'Python'},
    {name:'Patientra', description:'Governed healthcare data pipeline, identity review and synthetic aggregate release.', language:'Python'},
    {name:'Project-Rising', description:'Three-person climate-health hackathon project with resilient ETL, FastAPI and Streamlit.', language:'Python'},
    {name:'Telecom-Data-Revolution', description:'Mage and BigQuery batch ETL with data contracts, quarantine and audit evidence.', language:'Python'}
  ];
  const textElement = (tag, content, className) => {
    const node = document.createElement(tag);
    node.textContent = String(content);
    if (className) node.className = className;
    return node;
  };
  const validRepo = repo => repo && typeof repo.name === 'string' && /^[A-Za-z0-9_.-]+$/.test(repo.name) && repo.name !== '.' && repo.name !== '..';
  const count = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
  const renderRepos = (repos, live) => {
    grid.replaceChildren();
    repos.slice(0,6).forEach(repo => {
      const card = document.createElement('article');
      card.className = 'repo-card';
      card.append(textElement('h4', repo.name.replaceAll('-', ' ')));
      card.append(textElement('p', typeof repo.description === 'string' ? repo.description : 'Cloud and data engineering repository.'));
      const meta = document.createElement('div');
      meta.className = 'repo-meta';
      meta.append(textElement('span', typeof repo.language === 'string' ? repo.language : 'Code'));
      if (live) {
        meta.append(textElement('span', count(repo.stargazers_count) + ' stars'));
        meta.append(textElement('span', count(repo.forks_count) + ' forks'));
      }
      card.append(meta);
      const anchor = textElement('a', 'Open repository →', 'text-link');
      // API strings are text nodes, and API-provided URLs are never trusted.
      anchor.href = 'https://github.com/DevDataMLOps/' + encodeURIComponent(repo.name);
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.setAttribute('aria-label', 'Open ' + repo.name + ' repository');
      card.append(anchor);
      grid.append(card);
    });
  };
  const showFallback = () => {
    renderRepos(fallback, false);
    status.textContent = 'GitHub feed unavailable or empty · verified repository links shown';
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/users/DevDataMLOps/repos?sort=updated&direction=desc&per_page=100', {signal:controller.signal})
    .then(response => { if (!response.ok) throw new Error('GitHub unavailable'); return response.json(); })
    .then(repos => {
      if (!Array.isArray(repos)) throw new Error('Unexpected GitHub response');
      const filtered = repos.filter(repo => validRepo(repo) && !repo.fork && !repo.archived);
      // Retain API activity ordering; featured case studies are independent.
      if (!filtered.length) { showFallback(); return; }
      renderRepos(filtered, true);
      status.textContent = 'Showing ' + Math.min(filtered.length,6) + ' recently updated repositories';
    })
    .catch(showFallback)
    .finally(() => clearTimeout(timeout));
})();
