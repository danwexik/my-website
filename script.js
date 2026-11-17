document.addEventListener('DOMContentLoaded', () => {

  /* ── Dynamic year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Theme toggle ── */
  const toggle  = document.getElementById('theme-toggle');
  const icon    = document.getElementById('theme-icon');
  const saved   = localStorage.getItem('mat-theme');
  const prefersDark = matchMedia('(prefers-color-scheme:dark)').matches;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mat-theme', theme);
    icon.textContent = theme === 'light' ? '☀️' : '🌙';
  };

  if (saved) setTheme(saved);
  else if (!prefersDark) setTheme('light');

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  /* ── Mobile menu ── */
  const menuBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuBtn?.addEventListener('click', () => navMenu?.classList.toggle('active'));

  document.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => navMenu?.classList.remove('active'))
  );

  /* ── Simple scroll-triggered fade-in ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.timeline-item, .subject-card, .flow-card, .mp-card, .grading-box, .detail-table-wrap'
  ).forEach(el => {
    el.classList.add('fade-target');
    observer.observe(el);
  });

  /* inject animation styles */
  const style = document.createElement('style');
  style.textContent = `
    .fade-target { opacity:0; transform:translateY(22px); transition:opacity .55s ease, transform .55s ease; }
    .fade-target.visible { opacity:1; transform:translateY(0); }
  `;
  document.head.appendChild(style);

});
