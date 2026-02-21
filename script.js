gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LENIS SMOOTH SCROLL
============================================================ */
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ============================================================
   CUSTOM CURSOR
============================================================ */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mX = 0, mY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', e => {
  mX = e.clientX; mY = e.clientY;
  gsap.set(cursor, { x: mX, y: mY });
});

(function trackFollower() {
  fX += (mX - fX) * 0.1;
  fY += (mY - fY) * 0.1;
  gsap.set(follower, { x: fX, y: fY });
  requestAnimationFrame(trackFollower);
})();

document.querySelectorAll('a, button, .bento-item, .h-item, .fg-item, .model-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(follower, { scale: 2.5, borderColor: 'rgba(201,169,110,0.8)', duration: 0.4, ease: 'power2.out' });
    gsap.to(cursor, { scale: 0, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(follower, { scale: 1, borderColor: 'rgba(201,169,110,0.5)', duration: 0.4, ease: 'power2.out' });
    gsap.to(cursor, { scale: 1, duration: 0.3 });
  });
});

/* ============================================================
   MOBILE NAV BURGER
============================================================ */
const burger = document.querySelector('.nav-burger');
const mobileNav = document.querySelector('.nav-mobile');
let navOpen = false;

burger.addEventListener('click', () => {
  navOpen = !navOpen;
  mobileNav.classList.toggle('open', navOpen);
  const spans = burger.querySelectorAll('span');
  if (navOpen) {
    gsap.to(spans[0], { y: 7, rotate: 45, duration: 0.4, ease: 'power3.out' });
    gsap.to(spans[1], { y: -7, rotate: -45, duration: 0.4, ease: 'power3.out' });
  } else {
    gsap.to(spans[0], { y: 0, rotate: 0, duration: 0.4, ease: 'power3.out' });
    gsap.to(spans[1], { y: 0, rotate: 0, duration: 0.4, ease: 'power3.out' });
  }
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navOpen = false;
    mobileNav.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    gsap.to(spans[0], { y: 0, rotate: 0, duration: 0.4, ease: 'power3.out' });
    gsap.to(spans[1], { y: 0, rotate: 0, duration: 0.4, ease: 'power3.out' });
  });
});

/* ============================================================
   PRELOADER
============================================================ */
gsap.set('.navbar', { y: -60, autoAlpha: 0 });
gsap.set('.hero-eyebrow', { y: 30, autoAlpha: 0 });
gsap.set('.main-title', { y: 120, autoAlpha: 0 });
gsap.set('.hero-bottom', { y: 50, autoAlpha: 0 });
gsap.set('.hero-scroll-hint', { autoAlpha: 0 });
gsap.set('.outline-text', { autoAlpha: 0, x: 60 });

function initPreloader() {
  const tl = gsap.timeline();

  tl.to('.preloader-line', {
    width: 120, duration: 0.9,
    ease: 'power3.inOut', stagger: 0.1
  })
  .to('.loader-text', {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2, ease: 'power4.inOut'
  }, '-=0.4')
  .to('.preloader-counter', {
    textContent: '100',
    duration: 1.2, ease: 'power2.inOut',
    snap: { textContent: 1 },
    onUpdate: function () {
      const v = Math.round(parseFloat(this.targets()[0].textContent));
      this.targets()[0].textContent = v < 10 ? '0' + v : '' + v;
    }
  }, '-=1.2')
  .to('.preloader', {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.4, ease: 'power4.inOut', delay: 0.3,
    onComplete: () => {
      document.querySelector('.preloader').style.display = 'none';
    }
  });

  return tl;
}

/* ============================================================
   HERO INIT
============================================================ */
function initHero() {
  gsap.timeline()
    .to('.navbar',        { y: 0, autoAlpha: 1, duration: 1,   ease: 'power3.out' })
    .to('.hero-eyebrow',  { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, '-=0.5')
    .to('.main-title',    { y: 0, autoAlpha: 1, duration: 1.2, ease: 'power4.out' }, '-=0.6')
    .to('.hero-bottom',   { y: 0, autoAlpha: 1, duration: 1,   ease: 'power3.out' }, '-=0.7')
    .to('.outline-text',  { autoAlpha: 1, x: 0, duration: 1.4, ease: 'power3.out' }, '-=0.8')
    .to('.hero-scroll-hint', { autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  gsap.to('.hero-bg', {
    scale: 1.12, ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5
    }
  });

  gsap.to('.hero-content', {
    y: 80, autoAlpha: 0, ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: '30% top', end: 'bottom top', scrub: 1
    }
  });
}

/* ============================================================
   MARQUEE
============================================================ */
function initMarquee() {
  gsap.from('.marquee-section', {
    autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.marquee-section', start: 'top 90%' }
  });
}

/* ============================================================
   BENTO
============================================================ */
function initBento() {
  gsap.from('.section-header .section-num, .section-header .section-title', {
    y: 50, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
    scrollTrigger: { trigger: '.bento-section', start: 'top 80%' }
  });

  document.querySelectorAll('.bento-item').forEach((item, i) => {
    gsap.from(item, {
      y: 80 + (Math.floor(i / 4) * 20),
      x: ((i % 4) - 1.5) * 10,
      scale: 0.92, autoAlpha: 0,
      duration: 1.4, ease: 'power4.out',
      delay: i * 0.09,
      scrollTrigger: { trigger: '.bento', start: 'top 78%' }
    });
  });
}

/* ============================================================
   STATEMENT
============================================================ */
function initStatement() {
  gsap.from('.statement-text', {
    y: 80, autoAlpha: 0, duration: 1.4, ease: 'power4.out',
    scrollTrigger: { trigger: '.statement-section', start: 'top 75%' }
  });
  gsap.to('.statement-line', {
    width: '100%', duration: 1.6, ease: 'power4.inOut',
    scrollTrigger: { trigger: '.statement-section', start: 'top 70%' }
  });
}

/* ============================================================
   HORIZONTAL SCROLL
============================================================ */
function initHorizontal() {
  const track = document.querySelector('.horizontal-track');

  if (window.innerWidth <= 680) return;

  gsap.from('.h-item', {
    autoAlpha: 0, y: 40, scale: 0.95, duration: 1.2,
    stagger: 0.1, ease: 'power4.out',
    scrollTrigger: { trigger: '.horizontal', start: 'top 85%' }
  });

  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.22 + 60),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal',
      start: 'top top',
      end: () => '+=' + (track.scrollWidth - window.innerWidth * 0.5),
      scrub: 1.2, pin: true, anticipatePin: 1
    }
  });
}

/* ============================================================
   ABOUT SECTION
============================================================ */
function initAbout() {
  gsap.from('.about-eyebrow, .about-heading', {
    y: 60, autoAlpha: 0, duration: 1.3, stagger: 0.2, ease: 'power4.out',
    scrollTrigger: { trigger: '.about-section', start: 'top 75%' }
  });

  gsap.from('.about-quote', {
    x: 40, autoAlpha: 0, duration: 1.2, ease: 'power4.out',
    scrollTrigger: { trigger: '.about-right', start: 'top 80%' }
  });

  gsap.from('.about-body', {
    y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-right', start: 'top 75%' }
  });

  gsap.from('.about-quote-two', {
    y: 40, autoAlpha: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-quote-two', start: 'top 85%' }
  });

  gsap.from('.about-stat', {
    y: 30, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-stats', start: 'top 88%' }
  });
}


function initModels() {
  gsap.from('.models-header .section-num, .models-header .section-title', {
    y: 50, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
    scrollTrigger: { trigger: '.models-section', start: 'top 80%' }
  });

  gsap.from('.model-row', {
    y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out',
    scrollTrigger: { trigger: '.models-list', start: 'top 78%' }
  });

  const rows = document.querySelectorAll('.model-row');

  rows.forEach(row => {
    const img = row.querySelector('.model-img-follow');
    if (!img) return;

    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let rafId = null;
    let isHovered = false;

    function lerp(a, b, n) { return a + (b - a) * n; }

    function tick() {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);

      gsap.set(img, {
        x: currentX,
        y: currentY
      });

      if (isHovered) rafId = requestAnimationFrame(tick);
    }

    row.addEventListener('mouseenter', () => {
      isHovered = true;
      img.classList.add('visible');
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    row.addEventListener('mouseleave', () => {
      isHovered = false;
      img.classList.remove('visible');
      cancelAnimationFrame(rafId);
      rafId = null;
    });

    row.addEventListener('mousemove', e => {
      const rect = row.getBoundingClientRect();
      const imgW = img.offsetWidth;
      const imgH = img.offsetHeight;

      targetX = e.clientX - imgW / 2;
      targetY = e.clientY - imgH / 2;
    });
  });
}

/* ============================================================
   FINAL GRID
============================================================ */
function initFinalGrid() {
  gsap.from('.final-header .section-num, .final-header .section-title', {
    y: 40, autoAlpha: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
    scrollTrigger: { trigger: '.final-grid', start: 'top 80%' }
  });

  gsap.from('.fg-item', {
    y: 100, autoAlpha: 0, scale: 0.94,
    duration: 1.4, stagger: { each: 0.1, from: 'start' }, ease: 'power4.out',
    scrollTrigger: { trigger: '.final-grid-inner', start: 'top 82%' }
  });

  document.querySelectorAll('.fg-item').forEach(item => {
    gsap.fromTo(item.querySelector('img'),
      { y: '6%' },
      {
        y: '-6%', ease: 'none',
        scrollTrigger: {
          trigger: item, start: 'top bottom', end: 'bottom top', scrub: true
        }
      }
    );
  });
}

/* ============================================================
   FOOTER
============================================================ */
function initFooter() {
  gsap.from('.footer-cta-eyebrow, .footer-cta-heading, .footer-cta-btn', {
    y: 60, autoAlpha: 0, duration: 1.4, stagger: 0.15, ease: 'power4.out',
    scrollTrigger: { trigger: '.footer-cta', start: 'top 80%' }
  });

  gsap.from('.footer-logo, .footer-brand p, .footer-col', {
    y: 40, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer-main', start: 'top 85%' }
  });
}

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
============================================================ */
function initNavScroll() {
  let lastY = 0;
  ScrollTrigger.create({
    onUpdate: self => {
      const y = self.scroll();
      if (y > lastY && y > 100) {
        gsap.to('.navbar', { y: -80, duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to('.navbar', { y: 0, duration: 0.5, ease: 'power3.out' });
      }
      lastY = y;
    }
  });
}

/* ============================================================
   BOOT
============================================================ */
window.addEventListener('load', () => {
  gsap.set('.preloader', { clipPath: 'inset(0 0 0% 0)' });

  const masterTl = gsap.timeline();
  masterTl
    .add(initPreloader())
    .add(() => {
      initHero();
      initMarquee();
      initBento();
      initStatement();
      initHorizontal();
      initAbout();
      initModels();
      initFinalGrid();
      initFooter();
      initNavScroll();
    });
});