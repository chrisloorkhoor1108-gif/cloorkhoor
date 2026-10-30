// SHARED PAGE BEHAVIOR
// Edit visible text in the HTML files and colors/layout in the CSS files.

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.primary-nav a')];
const revealItems = document.querySelectorAll('.reveal');

// ------------------------------------------------------------
// MOBILE NAVIGATION
// ------------------------------------------------------------
const closeMenu = () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  nav.querySelectorAll('details').forEach((group) => { group.open = false; });
};

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

// ------------------------------------------------------------
// HEADER ON SCROLL
// ------------------------------------------------------------
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
}, { passive: true });

// ------------------------------------------------------------
// CONTENT REVEAL
// ------------------------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

// ------------------------------------------------------------
// IN-PAGE NAVIGATION HIGHLIGHT
// ------------------------------------------------------------
const sections = navLinks
  .map((link) => link.getAttribute('href').startsWith('#') ? document.querySelector(link.getAttribute('href')) : null)
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.6] });

sections.forEach((section) => sectionObserver.observe(section));

// ------------------------------------------------------------
// KEYBOARD CONTROLS
// ------------------------------------------------------------
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});


// ============================================================
// SITE POLISH — progressive enhancement (safe to remove/edit)
// 1. Page transitions: CSS entrance; native View Transitions when supported.
// 2. Scroll reveals: only selected content blocks, once per visit.
// 3. Active navigation: current page and Research dropdown parent.
// 4. Lightbox: original real photographs/diagrams, never blank SVG placeholders.
// 5. Accessibility: reduced motion, keyboard controls, focus restoration.
// ============================================================
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sitePages = new Set([
    'index.html','research.html','sorbents.html','catalysis.html',
    'projects.html','goals.html','resume.html'
  ]);

  // PAGE ENTRANCE / NATIVE SAME-ORIGIN DOCUMENT TRANSITIONS
  // Browser support is optional. Normal links keep working everywhere.
  if (!reduceMotion.matches && 'startViewTransition' in document) {
    document.documentElement.classList.add('view-transitions-supported');
  }
  // Chrome's cross-document transitions use @view-transition {navigation:auto}
  // (declared in CSS); no interception of links or artificial loading screen.

  // ACTIVE NAVIGATION: ensure the parent Research tab is visibly selected.
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a').forEach(link => {
    if ((link.getAttribute('href') || '').includes('#')) return;   // anchor links (e.g. Contact) are never the "current page"
    const target = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
    if (sitePages.has(target) && target === current) link.setAttribute('aria-current','page');
  });
  if (['research.html','sorbents.html','catalysis.html'].includes(current)) {
    document.querySelector('.research-nav > summary')?.classList.add('is-current-section');
  }

  // SUBTLE SCROLL REVEALS. Leave hero, navigation, document links alone.
  const animated = document.querySelectorAll(
    '.reading-section, .portal-grid, .artifact-grid, .home-about, #timeline, .workflow, .related-links, .smr-figures'
  );
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('polish-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.06 });
    animated.forEach((element, i) => {
      element.classList.add('polish-reveal');
      observer.observe(element);
    });
  }

  // IMAGE LIGHTBOX: only real user-provided raster images with a meaningful image.
  // To opt out for an individual image, add data-no-lightbox to its <img> tag.
  const candidates = document.querySelectorAll('main img[src]');
  const images = [...candidates].filter(img => {
    const src = img.getAttribute('src') || '';
    return /\.(png|jpe?g|webp)$/i.test(src.split('?')[0]) && !img.hasAttribute('data-no-lightbox');
  });
  if (!images.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'portfolio-lightbox';
  dialog.setAttribute('aria-label', 'Enlarged image');
  dialog.innerHTML = `
    <div class="lightbox-layout">
      <button class="lightbox-close" type="button" aria-label="Close enlarged image">×</button>
      <img class="lightbox-image" alt="">
      <p class="lightbox-caption"></p>
    </div>`;
  document.body.appendChild(dialog);
  const big = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const close = dialog.querySelector('.lightbox-close');
  let opener = null;
  const show = img => {
    opener = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || 'Enlarged portfolio image';
    caption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { dialog.setAttribute('open',''); dialog.classList.add('lightbox-fallback'); }
    close.focus();
  };
  const hide = () => {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  };
  images.forEach(img => {
    img.classList.add('lightbox-target');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Enlarge image: ${img.alt || 'portfolio illustration'}`);
    // Linked images (e.g., SMR figures) must not also follow their <a href>.
    // Preventing the default action opens the lightbox without opening a new tab.
    img.addEventListener('click', e => {
      e.preventDefault();
      show(img);
    });
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        show(img);
      }
    });
  });
  close.addEventListener('click', hide);
  dialog.addEventListener('click', e => {if (e.target === dialog) hide();});
  dialog.addEventListener('close', () => {opener?.focus(); big.removeAttribute('src');});
  // Native dialog already closes via Escape. Escape fallback for older browsers.
  dialog.addEventListener('keydown', e => {if(e.key === 'Escape' && dialog.open) hide();});
})();
