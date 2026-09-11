/**
 * MONEY EFT PRACTITIONER — 3-DAY LIVE WORKSHOP
 * Interactive Scripts: 15-Min Urgency Timer, FAQ Accordion, Proof Carousel, Lightbox & Sticky Bar
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initFaqAccordion();
  initProofCarousel();
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
   3. PROOF CAROUSEL
   ========================================================================== */
function initProofCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  const slides = track.querySelectorAll('.proof-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let slidesPerView = window.innerWidth <= 640 ? 1 : 2;

  // Build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const numPages = Math.ceil(totalSlides / slidesPerView);
    for (let i = 0; i < numPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i * slidesPerView;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    slidesPerView = window.innerWidth <= 640 ? 1 : 2;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const activePageIndex = Math.round(currentIndex / slidesPerView);
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === activePageIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, totalSlides - slidesPerView);
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    buildDots();
    updateCarousel();
  });

  buildDots();
  updateCarousel();
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
  const pricingSection = document.getElementById('register');
  if (!stickyBar) return;

  function handleScroll() {
    if (!heroCta) return;
    const heroRect = heroCta.getBoundingClientRect();
    const isPastHero = heroRect.bottom < 0;

    let isInsidePricing = false;
    if (pricingSection) {
      const pricingRect = pricingSection.getBoundingClientRect();
      // Hide sticky bar if user is currently looking at the main checkout form
      if (pricingRect.top < window.innerHeight && pricingRect.bottom > 100) {
        isInsidePricing = true;
      }
    }

    if (isPastHero && !isInsidePricing) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
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
