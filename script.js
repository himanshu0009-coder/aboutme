// =========================================
// CUSTOM CURSOR ARROW
// =========================================
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.classList.add('is-visible');
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});
document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));

// =========================================
// PROJECTS DATA & CAROUSEL
// =========================================
const projects = [
  { title: 'Customer Shopping Behavior Analysis', description: 'Uncovered the moments, products, and offers that turn browsing into repeat purchases. Used clustering and cohort analysis to identify high-value customer segments and built an interactive Power BI dashboard for the marketing team.', tags: ['Python', 'Pandas', 'Power BI'], stat: '+24% retention insight', mark: '01' },
  { title: 'Retail Revenue Dashboard', description: 'A clear executive view of revenue performance across regions, products, and seasons. Built 12 interactive KPI tiles with drill-down filters, enabling leadership to spot underperforming categories in seconds.', tags: ['Power BI', 'SQL', 'DAX'], stat: '12 KPIs tracked', mark: '02' },
  { title: 'Customer Churn Exploration', description: 'Used clean visual storytelling to find the signals hiding behind customer churn. Explored tenure, contract type, and support call frequency as primary churn drivers and identified 5 at-risk segments.', tags: ['Python', 'Seaborn', 'Sklearn'], stat: '5 risk segments', mark: '03' },
];

let activeProject = 0;
const track = document.getElementById('projectTrack');
const counter = document.getElementById('projectCounter');
const dotsContainer = document.getElementById('carouselDots');
let currentFilter = 'All';
let visibleProjects = projects;
let autoAdvance = null;

function renderProjects() {
  visibleProjects = currentFilter === 'All' ? projects : projects.filter((p) => p.tags.includes(currentFilter));
  track.innerHTML = visibleProjects.map((p) => `
    <div class="project-slide">
      <div class="project-slide-visual"><span>${p.mark}</span></div>
      <div class="project-slide-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-slide-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="project-slide-stat">${p.stat}</div>
      </div>
    </div>
  `).join('');
  renderDots();
  activeProject = 0;
  updateCarousel();
}

function renderDots() {
  dotsContainer.innerHTML = visibleProjects.map((_, i) => `<button data-index="${i}" aria-label="Go to project ${i + 1}"></button>`).join('');
  dotsContainer.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => { activeProject = parseInt(btn.dataset.index); updateCarousel(); resetAutoAdvance(); });
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${activeProject * 100}%)`;
  counter.textContent = `0${activeProject + 1} / 0${visibleProjects.length}`;
  dotsContainer.querySelectorAll('button').forEach((btn, i) => btn.classList.toggle('is-active', i === activeProject));
}

function nextSlide() { activeProject = (activeProject + 1) % visibleProjects.length; updateCarousel(); }
function prevSlide() { activeProject = (activeProject - 1 + visibleProjects.length) % visibleProjects.length; updateCarousel(); }

function startAutoAdvance() { autoAdvance = setInterval(nextSlide, 5000); }
function resetAutoAdvance() { clearInterval(autoAdvance); startAutoAdvance(); }

document.getElementById('nextProject').addEventListener('click', () => { nextSlide(); resetAutoAdvance(); });
document.getElementById('prevProject').addEventListener('click', () => { prevSlide(); resetAutoAdvance(); });

document.querySelectorAll('#projectFilter button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#projectFilter button').forEach((b) => b.classList.remove('filter-active'));
    btn.classList.add('filter-active');
    currentFilter = btn.dataset.filter;
    renderProjects();
    resetAutoAdvance();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { nextSlide(); resetAutoAdvance(); }
  if (e.key === 'ArrowLeft') { prevSlide(); resetAutoAdvance(); }
});

// =========================================
// SKILLS TABS
// =========================================
const skillGroups = {
  Analysis: [
    { name: 'Python', level: 85 },
    { name: 'SQL', level: 80 },
    { name: 'Pandas', level: 82 },
    { name: 'NumPy', level: 75 },
    { name: 'Excel', level: 90 },
  ],
  Visualization: [
    { name: 'Power BI', level: 85 },
    { name: 'Tableau', level: 70 },
    { name: 'Matplotlib', level: 78 },
    { name: 'Seaborn', level: 75 },
  ],
  Foundations: [
    { name: 'Git & GitHub', level: 72 },
    { name: 'EDA', level: 80 },
    { name: 'Scikit-learn', level: 65 },
    { name: 'Statistics', level: 75 },
  ],
};

const skillList = document.getElementById('skillList');

function renderSkills(group) {
  skillList.innerHTML = skillGroups[group].map((skill, i) => `
    <div class="skill-row">
      <span>0${i + 1}</span>
      <strong>${skill.name}</strong>
      <div class="skill-bar"><div class="skill-bar-fill" style="width: 0%"></div></div>
    </div>
  `).join('');
  requestAnimationFrame(() => {
    skillList.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
      bar.style.width = skillGroups[group][i].level + '%';
    });
  });
}

document.querySelectorAll('#skillsTabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#skillsTabs button').forEach((b) => b.classList.remove('skill-tab-active'));
    btn.classList.add('skill-tab-active');
    renderSkills(btn.dataset.skill);
  });
});

// =========================================
// NAV ACTIVE STATE & MOBILE MENU
// =========================================
const navLinks = document.querySelectorAll('#navLinks a');
navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    navLinks.forEach((l) => l.classList.remove('active'));
    this.classList.add('active');
  });
});

const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('navLinks');
menuButton.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); }));

// =========================================
// CONTACT MODAL
// =========================================
const contactModal = document.getElementById('contactModal');
const openContactForm = document.getElementById('openContactForm');
const closeContactForm = document.getElementById('closeContactForm');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

openContactForm.addEventListener('click', () => contactModal.classList.add('is-open'));
closeContactForm.addEventListener('click', () => contactModal.classList.remove('is-open'));
contactModal.addEventListener('click', (e) => { if (e.target === contactModal) contactModal.classList.remove('is-open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') contactModal.classList.remove('is-open'); });

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.add('is-visible');
  contactForm.reset();
  setTimeout(() => { formSuccess.classList.remove('is-visible'); }, 4000);
});

// =========================================
// SCROLL REVEAL
// =========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// =
// ========================================
// NAV SCROLL SPY
// =========================================
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.3 });
sections.forEach((s) => navObserver.observe(s));

// =========================================
// INIT
// =========================================
renderProjects();
renderSkills('Analysis');
startAutoAdvance();
