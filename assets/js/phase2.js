(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  const setThemeIcon = () => themeButton.innerHTML = root.dataset.theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  setThemeIcon();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    setThemeIcon();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  const header = document.querySelector('.site-header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 12), {passive:true});
  document.querySelector('#year').textContent = new Date().getFullYear();

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const grid = document.querySelector('#repo-grid');
  const status = document.querySelector('#repo-status');
  const fallback = [
    {name:'Project-Rising', description:'Climate-driven disease burden data platform with ETL, validation, FastAPI, and operational reliability foundations.', html_url:'https://github.com/DevDataMLOps/Project-Rising', language:'Python', stargazers_count:0, forks_count:0},
    {name:'Cloud Data Platform', description:'Add your next infrastructure or cloud data platform repository to feature it automatically.', html_url:'https://github.com/DevDataMLOps?tab=repositories', language:'Cloud', stargazers_count:0, forks_count:0},
    {name:'Distributed Pipeline', description:'Add a Spark, Airflow, Kafka, or warehouse engineering repository to strengthen the portfolio.', html_url:'https://github.com/DevDataMLOps?tab=repositories', language:'Data Engineering', stargazers_count:0, forks_count:0}
  ];
  const renderRepos = repos => {
    grid.innerHTML = repos.slice(0, 6).map(repo => `<article class="repo-card"><i class="far fa-folder-open repo-icon"></i><h4>${escapeHtml(repo.name.replaceAll('-', ' '))}</h4><p>${escapeHtml(repo.description || 'Cloud and data engineering repository.')}</p><div class="repo-meta"><span>${escapeHtml(repo.language || 'Code')}</span><span><i class="far fa-star"></i> ${repo.stargazers_count}</span><span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span></div><a class="text-link" href="${repo.html_url}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(repo.name)} repository">Open repository <i class="fas fa-arrow-right"></i></a></article>`).join('');
  };
  function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  fetch('https://api.github.com/users/DevDataMLOps/repos?sort=updated&per_page=12')
    .then(r => { if(!r.ok) throw new Error('GitHub API unavailable'); return r.json(); })
    .then(repos => {
      const filtered = repos.filter(r => !r.fork && !r.archived).sort((a,b) => Number(b.name === 'Project-Rising') - Number(a.name === 'Project-Rising'));
      renderRepos(filtered.length ? filtered : fallback);
      status.textContent = `${filtered.length} public repositories found`;
    })
    .catch(() => { renderRepos(fallback); status.textContent = 'Curated project view'; });
})();
