/* ================================================================
   MANIKLAL MONDAL — Portfolio Script
   ================================================================ */

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('back-to-top').classList.toggle('show', window.scrollY > 400);
});

/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── BACK TO TOP ── */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const step = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.stat-num');
let countersDone = false;
const counterObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersDone) {
    countersDone = true;
    counters.forEach(c => animateCounter(c));
  }
}, { threshold: 0.5 });
if (counters.length) counterObs.observe(counters[0].closest('.hero-stats'));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

/* ── SKILL BARS ── */
const skillCards = document.querySelectorAll('.skill-card, .lang-card');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const fill = e.target.querySelector('.skill-fill');
      if (fill) {
        setTimeout(() => {
          fill.style.width = fill.dataset.w + '%';
        }, 100);
      }
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
skillCards.forEach(c => skillObs.observe(c));

/* ── PROJECT CARDS ── */
const projectCards = document.querySelectorAll('.project-card');
const projObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      projObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
projectCards.forEach(c => projObs.observe(c));

/* ── TABS ── */
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      /* Re-trigger animations for newly shown cards */
      const cards = panel.querySelectorAll('.skill-card, .lang-card');
      cards.forEach(c => {
        c.classList.remove('visible');
        void c.offsetWidth;
        setTimeout(() => c.classList.add('visible'), 50);
        const fill = c.querySelector('.skill-fill');
        if (fill) { fill.style.width = '0'; setTimeout(() => fill.style.width = fill.dataset.w + '%', 180); }
      });
    }
  });
});

/* ── TERMINAL TYPING EFFECT ── */
const terminalLines = document.querySelectorAll('.terminal-body .t-line, .terminal-body .t-output');
terminalLines.forEach((el, i) => {
  el.style.opacity = '0';
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '1';
  }, i * 300 + 800);
});

/* ── CONTACT FORM ── */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }
  /* Simulate submission */
  const btn = this.querySelector('.btn-primary');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    this.reset();
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 4000);
  }, 1200);
});

/* ── SMOOTH HOVER TILT on project cards ── */
projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
