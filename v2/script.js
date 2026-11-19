/**
 * MONEY EFT PRACTITIONER - v2 interactions
 * Session countdown (same behaviour as v1), testimonial lightbox, sticky bar.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initProofRail();
  initStickyBar();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* 1. 15-MINUTE CLIENT-SIDE SESSION COUNTDOWN (unchanged from v1) */
function initCountdownTimer() {
  const TOTAL_DURATION_SECONDS = 15 * 60;
  const STORAGE_KEY = 'money_eft_practitioner_timer_start';

  let startTime = sessionStorage.getItem(STORAGE_KEY);
  const now = Math.floor(Date.now() / 1000);
  if (!startTime) {
    startTime = now;
    sessionStorage.setItem(STORAGE_KEY, startTime);
  } else {
    startTime = parseInt(startTime, 10);
  }

  const heroMinutes = document.getElementById('hero-minutes');
  const heroSeconds = document.getElementById('hero-seconds');
  const heroLabel = document.getElementById('hero-timer-label');
  const pricingTimer = document.getElementById('pricing-timer');
  const pricingLabel = document.getElementById('pricing-timer-label');
  const stickyTimer = document.getElementById('sticky-timer');

  function updateTimer() {
    const remaining = TOTAL_DURATION_SECONDS - (Math.floor(Date.now() / 1000) - startTime);

    if (remaining <= 0) {
      if (heroMinutes && heroSeconds) { heroMinutes.textContent = '00'; heroSeconds.textContent = '00'; }
      if (heroLabel) heroLabel.textContent = '🔥 Final Call — Limited Seats Remaining:';
      if (pricingTimer) pricingTimer.textContent = 'EXPIRES SOON';
      if (pricingLabel) pricingLabel.textContent = 'Special Registration Offer Extended:';
      if (stickyTimer) stickyTimer.textContent = 'LIMITED SEATS';
      return;
    }

    const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    if (heroMinutes && heroSeconds) { heroMinutes.textContent = mins; heroSeconds.textContent = secs; }
    if (pricingTimer) pricingTimer.textContent = `${mins}:${secs}`;
    if (stickyTimer) stickyTimer.textContent = `${mins}:${secs}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 2. TESTIMONIALS + LIGHTBOX */
function initProofRail() {
  document.querySelectorAll('.rail__item, .poster').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item.dataset.full));
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lightbox || !img) return;
  img.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  const lightbox = document.getElementById('lightbox');
  if (event && event.target && event.target.id === 'lightboxImg') return;
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/* 3. STICKY BAR: after the hero CTA leaves view, hidden over the appointment card and close */
function initStickyBar() {
  const bar = document.getElementById('sticky-bar');
  const heroCta = document.getElementById('hero-cta-btn');
  if (!bar || !heroCta || !('IntersectionObserver' in window)) return;

  const state = { heroAbove: false, blockers: new Set() };
  const render = () => bar.classList.toggle('visible', state.heroAbove && state.blockers.size === 0);

  new IntersectionObserver(([entry]) => {
    state.heroAbove = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    render();
  }).observe(heroCta);

  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) state.blockers.add(entry.target);
      else state.blockers.delete(entry.target);
    });
    render();
  }, { rootMargin: '0px 0px -25% 0px' });
  ['register', 'final-cta'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) blockObserver.observe(el);
  });
}
