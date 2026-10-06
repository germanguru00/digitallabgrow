/* ==========================================================================
   ANVI GERMAN MASTER - MULTI-PAGE INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. STICKY HEADER SHADOW & MOBILE MENU TOGGLE
  // ------------------------------------------------------------------------
  const header = document.querySelector('.main-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Highlight Current Active Page in Navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else if (!linkPage.includes('#') && linkPage !== currentPage) {
      link.classList.remove('active');
    }
  });

  // ------------------------------------------------------------------------
  // 2. DEMO & CONSULTATION FORM SUBMISSION (WITH DIRECT WHATSAPP TRIGGER)
  // ------------------------------------------------------------------------
  const demoForms = document.querySelectorAll('.js-demo-form');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  demoForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || 'Student';
      const email = form.querySelector('[name="email"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const course = form.querySelector('[name="course"]')?.value || 'German Course';
      const mode = form.querySelector('[name="mode"]')?.value || 'Online';

      // Format WhatsApp Message
      const waText = encodeURIComponent(
        `Hallo Anvi German Master! 👋\n` +
        `I would like to book a Free Demo Class / Consultation.\n\n` +
        `👤 Name: ${name}\n` +
        `📧 Email: ${email}\n` +
        `📞 Phone: ${phone}\n` +
        `📚 Course/Inquiry: ${course}\n` +
        `🏫 Learning Mode: ${mode}`
      );

      const waUrl = `https://wa.me/918283945753?text=${waText}`;

      if (modalOverlay && modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: rgba(5, 150, 105, 0.1); color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.8rem;">
              ✓
            </div>
            <h3 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 0.5rem;">Inquiry Received!</h3>
            <p style="color: #475569; margin-bottom: 1.5rem;">Thank you <strong>${name}</strong>! Trainer Anvi and our advisory team will connect with you on <strong>${phone}</strong>.</p>
            <a href="${waUrl}" target="_blank" class="btn btn-gold" style="width: 100%; display: inline-flex; justify-content: center; gap: 0.5rem;">
              <i class="fab fa-whatsapp"></i> Chat Instant on WhatsApp (+91 8283945753)
            </a>
          </div>
        `;
        modalOverlay.classList.add('active');
      }

      form.reset();

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1500);
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. COURSE & GALLERY TAB FILTERING
  // ------------------------------------------------------------------------
  function setupTabFiltering(btnClass, itemClass, dataAttr) {
    const btns = document.querySelectorAll(btnClass);
    const items = document.querySelectorAll(itemClass);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        items.forEach(item => {
          if (filter === 'all' || item.getAttribute(dataAttr) === filter) {
            item.style.display = 'block';
            if (item.classList.contains('course-card') || item.classList.contains('gallery-card')) {
              item.style.display = 'flex';
            }
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  setupTabFiltering('.tab-btn', '.course-card', 'data-category');
  setupTabFiltering('.gallery-tab-btn', '.gallery-card', 'data-category');

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE GERMAN LEVEL FINDER QUIZ
  // ------------------------------------------------------------------------
  const quizCards = document.querySelectorAll('.quiz-question-card');
  const quizProgress = document.getElementById('quizProgressFill');
  const quizResults = document.getElementById('quizResults');
  let userAnswers = {};

  window.selectQuizAnswer = function(questionIndex, scoreValue, choiceText) {
    userAnswers[questionIndex] = scoreValue;

    const currentCard = document.getElementById(`questionCard${questionIndex}`);
    if (currentCard) {
      currentCard.classList.remove('active');
    }

    const nextIndex = questionIndex + 1;
    const nextCard = document.getElementById(`questionCard${nextIndex}`);

    if (nextCard) {
      nextCard.classList.add('active');
      if (quizProgress) {
        quizProgress.style.width = `${((nextIndex) / 5) * 100}%`;
      }
    } else {
      if (quizProgress) quizProgress.style.width = '100%';
      calculateQuizScore();
    }
  };

  function calculateQuizScore() {
    let totalScore = 0;
    Object.values(userAnswers).forEach(val => totalScore += val);

    let recommendedLevel = "German A1 Beginner";
    let descText = "You are ready to start your German journey with Anvi's A1 Foundation Masterclass!";

    if (totalScore >= 3 && totalScore <= 4) {
      recommendedLevel = "German A2 Elementary";
      descText = "Great basic grasp! Step up to A2 to expand your grammar and conversational fluency.";
    } else if (totalScore >= 5) {
      recommendedLevel = "German B1 / B2 Intermediate";
      descText = "Impressive knowledge! You qualify for B1/B2 intensive preparation for Goethe & TELC certification!";
    }

    const resultBadge = document.getElementById('recommendedLevelBadge');
    const resultDesc = document.getElementById('recommendedLevelDesc');
    const waResultBtn = document.getElementById('quizWaBtn');

    if (resultBadge) resultBadge.textContent = recommendedLevel;
    if (resultDesc) resultDesc.textContent = descText;

    if (waResultBtn) {
      const waText = encodeURIComponent(
        `Hallo Anvi German Master! 🇩🇪\n` +
        `I completed the German Level Finder Quiz on your website.\n` +
        `My Assessment Result: ${recommendedLevel}\n` +
        `I would like to consult with Trainer Anvi regarding class batches.`
      );
      waResultBtn.href = `https://wa.me/918283945753?text=${waText}`;
    }

    if (quizResults) {
      quizResults.classList.add('active');
    }
  }

  window.restartQuiz = function() {
    userAnswers = {};
    if (quizResults) quizResults.classList.remove('active');
    quizCards.forEach(c => c.classList.remove('active'));

    const firstCard = document.getElementById('questionCard0');
    if (firstCard) firstCard.classList.add('active');
    if (quizProgress) quizProgress.style.width = '20%';
  };

  // ------------------------------------------------------------------------
  // 5. FAQ ACCORDION TOGGLE
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});
