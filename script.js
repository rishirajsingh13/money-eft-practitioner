/**
 * MONEY EFT PRACTITIONER — 2-DAY LIVE WORKSHOP (17–18th October, 12–3 PM)
 * Interactive Scripts: 15-Min Urgency Timer, FAQ Accordion, Proof Rail, Lightbox & Sticky Bar
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initFaqAccordion();
  initProofRail();
  initStickyBar();
  initSmoothScroll();
  setCurrentYear();
});

/* ==========================================================================
   1. 15-MINUTE CLIENT-SIDE SESSION COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const TOTAL_DURATION_SECONDS = 15 * 60; // 15 minutes = 900 seconds
  const STORAGE_KEY = 'money_eft_practitioner_timer_start';

  let startTime = sessionStorage.getItem(STORAGE_KEY);
  const now = Math.floor(Date.now() / 1000);

  if (!startTime) {
    startTime = now;
    sessionStorage.setItem(STORAGE_KEY, startTime);
  } else {
    startTime = parseInt(startTime, 10);
  }

  // Elements
  const heroMinutes = document.getElementById('hero-minutes');
  const heroSeconds = document.getElementById('hero-seconds');
  const heroLabel = document.getElementById('hero-timer-label');
  const bannerTimer = document.getElementById('banner-timer');
  const pricingTimer = document.getElementById('pricing-timer');
  const pricingLabel = document.getElementById('pricing-timer-label');
  const stickyTimer = document.getElementById('sticky-timer');

  function updateTimer() {
    const currentNow = Math.floor(Date.now() / 1000);
    const elapsed = currentNow - startTime;
    let remaining = TOTAL_DURATION_SECONDS - elapsed;

    if (remaining <= 0) {
      // Urgency state when timer ends: Swap copy to offer extended / rolling urgency
      if (heroMinutes && heroSeconds) {
        heroMinutes.textContent = '00';
        heroSeconds.textContent = '00';
      }
      if (heroLabel) {
        heroLabel.textContent = '🔥 Final Call — Limited Seats Remaining:';
      }
      if (bannerTimer) {
        bannerTimer.textContent = 'LAST CHANCE';
      }
      if (pricingTimer) {
        pricingTimer.textContent = 'EXPIRES SOON';
      }
      if (pricingLabel) {
        pricingLabel.textContent = 'Special Registration Offer Extended:';
      }
      if (stickyTimer) {
        stickyTimer.textContent = 'LIMITED SEATS';
      }
      return;
    }

    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    const timeString = `${formattedMins}:${formattedSecs}`;

    if (heroMinutes && heroSeconds) {
      heroMinutes.textContent = formattedMins;
      heroSeconds.textContent = formattedSecs;
    }

    if (bannerTimer) bannerTimer.textContent = timeString;
    if (pricingTimer) pricingTimer.textContent = timeString;
    if (stickyTimer) stickyTimer.textContent = timeString;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.accordion-header');
          const otherBody = other.querySelector('.accordion-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   3. PROOF RAIL (swipe on touch, arrow buttons on desktop, tap to enlarge)
   ========================================================================== */
function initProofRail() {
  const rail = document.querySelector('.proof-rail');
  if (!rail) return;

  rail.querySelectorAll('.proof-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item.dataset.full));
  });

  document.querySelectorAll('[data-rail-dir]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = Number(btn.dataset.railDir);
      const first = rail.querySelector('.proof-item');
      const step = first ? first.getBoundingClientRect().width + 14 : rail.clientWidth * 0.8;
      rail.scrollBy({ left: dir * step, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   4. LIGHTBOX MODAL
   ========================================================================== */
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (lightbox && img) {
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  // If clicked inside the image, don't close unless clicked close button
  if (event.target === img) return;
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ESC key to close lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Attach to window so onclick in HTML works seamlessly
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/* ==========================================================================
   5. STICKY MOBILE CONVERSION BAR
   ========================================================================== */
function initStickyBar() {
  const stickyBar = document.getElementById('sticky-bar');
  const heroCta = document.getElementById('hero-cta-btn');
  if (!stickyBar || !heroCta || !('IntersectionObserver' in window)) return;

  // Bar shows once the hero CTA has scrolled out of view, and hides while the
  // pricing card or final CTA (which carry their own button) are on screen.
  const state = { heroVisible: true, heroAbove: false, blockers: new Set() };
  const blockers = [document.getElementById('register'), document.getElementById('final-cta')].filter(Boolean);

  function render() {
    const show = !state.heroVisible && state.heroAbove && state.blockers.size === 0;
    stickyBar.classList.toggle('visible', show);
  }

  new IntersectionObserver(([entry]) => {
    state.heroVisible = entry.isIntersecting;
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
  blockers.forEach((el) => blockObserver.observe(el));
}

/* ==========================================================================
   6. SMOOTH SCROLL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   7. CURRENT YEAR
   ========================================================================== */
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
