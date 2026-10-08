/**
 * GERMAN GURU (germanguru.co.in) - MAIN INTERACTIVE SCRIPT
 * Handles mobile drawer navigation, sticky header, modal triggers,
 * form submissions, toast alerts, and FAQ accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Sticky Header Scroll Effect
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      if (mainHeader) mainHeader.classList.add('scrolled');
    } else {
      if (mainHeader) mainHeader.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.faq-card');
      const content = card.querySelector('.faq-content');
      const isActive = card.classList.contains('active');

      // Close other open cards for clean accordion behaviour
      document.querySelectorAll('.faq-card.active').forEach(openCard => {
        if (openCard !== card) {
          openCard.classList.remove('active');
          const openContent = openCard.querySelector('.faq-content');
          if (openContent) openContent.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // Automatically open first FAQ if present
  const firstFaq = document.querySelector('.faq-card');
  if (firstFaq) {
    firstFaq.classList.add('active');
    const firstContent = firstFaq.querySelector('.faq-content');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  // 4. Modal System (Book Free Demo Modal)
  const demoModal = document.getElementById('demoModal');
  const openModalBtns = document.querySelectorAll('.js-open-demo-modal');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      openModal(demoModal);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModal = btn.closest('.modal-overlay');
      closeModal(targetModal);
    });
  });

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeModal(demoModal);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (demoModal && demoModal.classList.contains('active')) closeModal(demoModal);
    }
  });

  // 5. Toast Notification System
  function showToast(message = 'Inquiry sent! Our counselor will call you shortly.') {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 6. Lead Forms Submission Handling - Forward directly to WhatsApp
  const leadForms = document.querySelectorAll('.js-lead-form');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const courseSelect = form.querySelector('[name="course"]');
      const modeSelect = form.querySelector('[name="mode"]');
      const messageInput = form.querySelector('[name="message"]');

      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Student';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : '';
      const course = courseSelect ? courseSelect.value : 'German Language Course';
      const mode = modeSelect ? modeSelect.value : 'Online / Offline';
      const message = messageInput && messageInput.value.trim() ? messageInput.value.trim() : '';

      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      if (!cleanPhone || cleanPhone.length < 8) {
        alert('Please enter a valid phone or WhatsApp number so our counselor can reach you.');
        return;
      }

      // Build structured, professional WhatsApp inquiry message
      let waMessage = `Hallo GERMAN GURU! 🇩🇪\n`;
      waMessage += `I would like to enquire / book a Free Demo Class:\n\n`;
      waMessage += `👤 Name: ${name}\n`;
      waMessage += `📞 Phone / WhatsApp: ${phone}\n`;
      if (email) {
        waMessage += `📧 Email: ${email}\n`;
      }
      waMessage += `📚 Target Course: ${course}\n`;
      waMessage += `🏢 Preferred Mode: ${mode}\n`;
      if (message) {
        waMessage += `💬 My Query / Note: ${message}\n`;
      }
      waMessage += `\n📍 Sent from: germanguru.co.in\nPlease share upcoming batch dates, fee structure & trial demo timings. Danke!`;

      const waUrl = `https://wa.me/916280723651?text=${encodeURIComponent(waMessage)}`;

      // Show user feedback toast
      showToast(`Vielen Dank, ${name}! Redirecting to confirmation page...`);

      // Open WhatsApp inquiry in new tab if permitted so counselor receives inquiry
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        // Continue to thank-you redirect if popup blocked
      }

      // Reset Form & Close Modal
      form.reset();
      if (demoModal && demoModal.classList.contains('active')) {
        closeModal(demoModal);
      }

      // Redirect user to the new Thank You page
      const thankYouUrl = `thank-you.html?name=${encodeURIComponent(name)}&course=${encodeURIComponent(course)}`;
      setTimeout(() => {
        window.location.href = thankYouUrl;
      }, 350);
    });
  });

  // 7. Dynamic Course Filter Tabs (for courses.html)
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-filter-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        courseCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-level') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Testimonial Carousel Slider (with student photos)
  const sliderTrack = document.getElementById('testimonialSliderTrack');
  const sliderWrapper = document.getElementById('testimonialSliderWrapper');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('sliderDotsContainer');

  if (sliderTrack && sliderWrapper) {
    const slides = sliderTrack.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function getSlidesPerView() {
      return window.innerWidth <= 900 ? 1 : 2;
    }

    function getMaxIndex() {
      return Math.max(0, totalSlides - getSlidesPerView());
    }

    // Build pagination dots
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalPages = getMaxIndex() + 1;
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      const perView = getSlidesPerView();
      const slideWidthPercent = 100 / perView;
      sliderTrack.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      // Update arrow disabled states
      if (prevBtn) prevBtn.disabled = (currentIndex === 0);
      if (nextBtn) nextBtn.disabled = (currentIndex >= getMaxIndex());
    }

    function goToSlide(index) {
      const max = getMaxIndex();
      if (index < 0) {
        currentIndex = 0;
      } else if (index > max) {
        currentIndex = max;
      } else {
        currentIndex = index;
      }
      updateSlider();
    }

    function nextSlide() {
      if (currentIndex >= getMaxIndex()) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlider();
    }

    function prevSlide() {
      if (currentIndex <= 0) {
        currentIndex = getMaxIndex();
      } else {
        currentIndex--;
      }
      updateSlider();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // Auto-advance every 5 seconds
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pause on hover
    sliderWrapper.addEventListener('mouseenter', stopAutoplay);
    sliderWrapper.addEventListener('mouseleave', startAutoplay);

    // Mobile touch swipe handling
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    }, { passive: true });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (currentIndex > getMaxIndex()) {
        currentIndex = getMaxIndex();
      }
      renderDots();
      updateSlider();
    });

    // Initial render
    renderDots();
    updateSlider();
    startAutoplay();
  }
});
