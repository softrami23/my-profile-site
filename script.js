// 프로젝트 데이터 (최신순)
// image: 실제 이미지 경로(예: 'images/crossfire.jpg')를 넣으면 gradient 대신 이미지가 배경으로 쓰입니다.
// 담당 업무 설명은 추후 채워 넣을 수 있도록 중립 문구로 둡니다.
const projects = [
  { title: 'CrossFire X', tags: ['Game Client'], gradient: 'linear-gradient(135deg, #6d28d9, #1e1b4b)' },
  { title: 'CrossFire HD', tags: ['Game Client'], gradient: 'linear-gradient(135deg, #8b5cf6, #f97316)' },
  { title: 'CrossFire', tags: ['Game Client'], gradient: 'linear-gradient(135deg, #7c3aed, #312e81)' },
  { title: 'Special Force', tags: ['Game Client'], gradient: 'linear-gradient(135deg, #f97316, #7c2d12)' },
  { title: 'Priston Tale 2', tags: ['Game Client'], gradient: 'linear-gradient(135deg, #a78bfa, #4c1d95)' },
  { title: 'PuppyRed', tags: ['Web 3D Avatar'], gradient: 'linear-gradient(135deg, #c4b5fd, #fb923c)' },
];

function projectBackground({ gradient, image }) {
  return image ? `background-image: url('${image}')` : `background: ${gradient}`;
}

function renderProjects() {
  const grid = document.getElementById('project-grid');

  grid.innerHTML = projects
    .map(
      (project) => `
        <article class="card project-card">
          <div class="project-bg" style="${projectBackground(project)}"></div>
          <div class="project-content">
            <div class="flex flex-wrap gap-2">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <h3 class="project-title mt-5 text-2xl font-bold text-white transition">${project.title}</h3>
            <p class="mt-3 text-slate-300">프로젝트 상세 내용은 추후 추가 예정입니다.</p>
          </div>
        </article>`
    )
    .join('');
}

function setupRevealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function setupHeaderOnScroll() {
  const header = document.getElementById('header');

  const update = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // 메뉴 항목을 누르면 닫기
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);
        });
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupCopyEmail() {
  const button = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  const email = 'softrami.85@gmail.com';

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = '이메일 주소를 복사했습니다.';
    } catch {
      status.textContent = '복사에 실패했습니다. 주소를 직접 선택해 주세요.';
    }
  });
}

renderProjects();
setupRevealOnScroll();
setupHeaderOnScroll();
setupMobileMenu();
setupScrollSpy();
setupCopyEmail();
