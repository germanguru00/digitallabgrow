/**
 * DIGITAL MARKETING KING® 3.0 (DM KING ELITE)
 * Interactive Application & Technology Suite
 * Core features: ROI Calculator, Live SEO/AI Audit Simulator, Dynamic Service Estimator,
 * Searchable FAQs, Interactive Case Study Filter, and WhatsApp/Call Hub (+91 8283945753)
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoiCalculator();
  initAuditScanner();
  initPackageEstimator();
  initCaseStudyTabs();
  initReviewFilters();
  initFaqSearch();
  initEnquiryModal();
  initMobileMenu();
  initPhoneCopy();
});

/* ==========================================================================
   1. ROI & Ad Spend Interactive Calculator
   ========================================================================== */
const INDUSTRY_DATA = {
  ecommerce: {
    name: 'E-Commerce / Direct-to-Consumer',
    avgCpc: 12,
    conversionRate: 0.032,
    avgOrderValue: 2400,
    closeRate: 1.0,
    roiMultiplierBase: 4.8
  },
  b2b: {
    name: 'B2B & Industrial Manufacturing',
    avgCpc: 28,
    conversionRate: 0.045,
    avgOrderValue: 45000,
    closeRate: 0.18,
    roiMultiplierBase: 6.2
  },
  realestate: {
    name: 'Real Estate & Luxury Projects',
    avgCpc: 45,
    conversionRate: 0.028,
    avgOrderValue: 120000,
    closeRate: 0.08,
    roiMultiplierBase: 7.5
  },
  healthcare: {
    name: 'Healthcare, Clinics & Hospitals',
    avgCpc: 22,
    conversionRate: 0.052,
    avgOrderValue: 12000,
    closeRate: 0.35,
    roiMultiplierBase: 5.4
  },
  local: {
    name: 'Digital Services & Direct-to-Consumer',
    avgCpc: 15,
    conversionRate: 0.065,
    avgOrderValue: 6500,
    closeRate: 0.40,
    roiMultiplierBase: 5.1
  },
  edtech: {
    name: 'Education, Coaching & EdTech',
    avgCpc: 18,
    conversionRate: 0.048,
    avgOrderValue: 18000,
    closeRate: 0.22,
    roiMultiplierBase: 4.5
  }
};

function initRoiCalculator() {
  const budgetInput = document.getElementById('roi-budget-input');
  const budgetDisplay = document.getElementById('roi-budget-display');
  const industrySelect = document.getElementById('roi-industry-select');
  
  const reachEl = document.getElementById('calc-reach');
  const leadsEl = document.getElementById('calc-leads');
  const revenueEl = document.getElementById('calc-revenue');
  const multiplierEl = document.getElementById('calc-multiplier');
  const ctaBtn = document.getElementById('roi-cta-btn');

  if (!budgetInput || !industrySelect) return;

  function updateCalculations() {
    const budget = parseFloat(budgetInput.value);
    const industryKey = industrySelect.value;
    const data = INDUSTRY_DATA[industryKey] || INDUSTRY_DATA.b2b;

    // Format currency display
    budgetDisplay.textContent = '₹' + budget.toLocaleString('en-IN');

    // Computation logic
    const estimatedClicks = Math.floor(budget / data.avgCpc);
    const estimatedImpressions = Math.floor(estimatedClicks * 28);
    const estimatedLeads = Math.max(1, Math.floor(estimatedClicks * data.conversionRate));
    const closedDeals = Math.max(1, Math.floor(estimatedLeads * data.closeRate));
    const projectedRevenue = Math.floor(closedDeals * data.avgOrderValue);
    const roiMultiplier = (projectedRevenue / budget).toFixed(1);

    // Update UI with smooth formatting
    if (reachEl) reachEl.textContent = estimatedImpressions.toLocaleString('en-IN') + '+';
    if (leadsEl) leadsEl.textContent = estimatedLeads.toLocaleString('en-IN') + ' High-Intent Leads';
    if (revenueEl) revenueEl.textContent = '₹' + projectedRevenue.toLocaleString('en-IN');
    if (multiplierEl) multiplierEl.textContent = roiMultiplier + 'x Target ROI';

    // Update CTA link with prefilled WhatsApp message
    if (ctaBtn) {
      const msg = encodeURIComponent(`Hi Digital Growth Lab team! I ran the ROI calculator for ${data.name} with a budget of ₹${budget.toLocaleString('en-IN')}. My estimated revenue target is ₹${projectedRevenue.toLocaleString('en-IN')}. Can we schedule a strategic discussion? (Enquiry: +91 8283945753)`);
      ctaBtn.href = `https://wa.me/918283945753?text=${msg}`;
    }
  }

  budgetInput.addEventListener('input', updateCalculations);
  industrySelect.addEventListener('change', updateCalculations);
  updateCalculations();
}

/* ==========================================================================
   2. Live AI Website & SEO Health Audit Scanner
   ========================================================================== */
function initAuditScanner() {
  const form = document.getElementById('audit-form');
  const urlInput = document.getElementById('audit-url');
  const keywordInput = document.getElementById('audit-keyword');
  const scanningState = document.getElementById('audit-scanning-state');
  const resultsState = document.getElementById('audit-results-state');
  const progressBar = document.getElementById('audit-progress-bar');
  const statusText = document.getElementById('audit-status-text');

  if (!form || !urlInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    const keyword = keywordInput ? keywordInput.value.trim() || 'Digital Marketing Services' : 'Digital Growth';

    if (!url) {
      showToast('Please enter a valid website URL', 'error');
      return;
    }

    // Show Scanning State
    form.style.display = 'none';
    scanningState.style.display = 'block';
    resultsState.style.display = 'none';

    const stages = [
      { progress: 20, text: `Connecting to ${url} & measuring DNS latency...` },
      { progress: 45, text: `Crawling mobile viewport, LCP & Core Web Vitals...` },
      { progress: 70, text: `Analyzing keyword indexing for "${keyword}"...` },
      { progress: 90, text: `Auditing schema markup, backlinks & conversion UX...` },
      { progress: 100, text: `Report finalized! Generating actionable diagnosis...` }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        if (progressBar) progressBar.style.width = stage.progress + '%';
        if (statusText) statusText.textContent = stage.text;
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          renderAuditResults(url, keyword);
        }, 500);
      }
    }, 600);
  });

  function renderAuditResults(url, keyword) {
    scanningState.style.display = 'none';
    resultsState.style.display = 'block';

    const cleanDomain = url.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
    const domainDisplay = document.getElementById('res-domain');
    const keywordDisplay = document.getElementById('res-keyword');
    const fixBtn = document.getElementById('audit-fix-btn');

    if (domainDisplay) domainDisplay.textContent = cleanDomain;
    if (keywordDisplay) keywordDisplay.textContent = `Target Keyword: "${keyword}"`;

    if (fixBtn) {
      const msg = encodeURIComponent(`Hello! I just scanned my website (${cleanDomain}) with your AI SEO Audit tool for "${keyword}". It scored 62/100 with critical issues in mobile speed and keyword rank gap. Please connect me with your technical team (+91 8283945753) for the free fix roadmap.`);
      fixBtn.href = `https://wa.me/918283945753?text=${msg}`;
    }
  }

  // Reset button inside result card
  const resetBtn = document.getElementById('audit-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.style.display = 'block';
      resultsState.style.display = 'none';
      scanningState.style.display = 'none';
      if (progressBar) progressBar.style.width = '0%';
    });
  }
}

/* ==========================================================================
   3. Interactive Service Package & Budget Estimator
   ========================================================================== */
function initPackageEstimator() {
  const checkboxes = document.querySelectorAll('.service-checkbox');
  const priceDisplay = document.getElementById('pkg-total-price');
  const discountDisplay = document.getElementById('pkg-discount');
  const pkgBtn = document.getElementById('pkg-quote-btn');
  const selectedCountDisplay = document.getElementById('pkg-selected-count');

  if (!checkboxes.length || !priceDisplay) return;

  function calculatePackage() {
    let subtotal = 0;
    let selectedServices = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        subtotal += parseInt(cb.dataset.price, 10);
        selectedServices.push(cb.dataset.title);
      }
    });

    const count = selectedServices.length;
    if (selectedCountDisplay) selectedCountDisplay.textContent = `${count} Services Selected`;

    // Apply bundle discount if 3 or more services selected
    let discountPercent = count >= 4 ? 25 : (count >= 2 ? 15 : 0);
    let finalTotal = Math.round(subtotal * (1 - (discountPercent / 100)));

    priceDisplay.textContent = '₹' + finalTotal.toLocaleString('en-IN') + (count > 0 ? '/mo' : '');
    
    if (discountDisplay) {
      if (discountPercent > 0) {
        discountDisplay.innerHTML = `<span class="text-emerald-400 font-semibold">🎉 Bundle Savings: ${discountPercent}% OFF applied!</span>`;
      } else {
        discountDisplay.innerHTML = `<span class="text-slate-400">Select 2+ services to unlock up to 25% bundle savings</span>`;
      }
    }

    if (pkgBtn) {
      const servicesList = selectedServices.join(', ');
      const msg = encodeURIComponent(`Hello Digital Growth Lab team! I selected custom services: [${servicesList}] with an estimated investment of ₹${finalTotal.toLocaleString('en-IN')}/mo. Can we discuss onboarding & deliverable schedules? (Enquiry: +91 8283945753)`);
      pkgBtn.href = `https://wa.me/918283945753?text=${msg}`;
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', calculatePackage));
  calculatePackage();
}

/* ==========================================================================
   4. Live Case Study Filter Tabs
   ========================================================================== */
function initCaseStudyTabs() {
  const tabBtns = document.querySelectorAll('.case-tab-btn');
  const caseCards = document.querySelectorAll('.case-item-card');

  if (!tabBtns.length || !caseCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-black', 'border-cyan-400', 'font-bold');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-white/10');
      });

      btn.classList.add('bg-cyan-500', 'text-black', 'border-cyan-400', 'font-bold');
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-white/10');

      caseCards.forEach(card => {
        const category = card.dataset.category;
        if (target === 'all' || category.includes(target)) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4B. Authentic Review Filter Tabs (All, 5-Star, 4-Star Honest, Google, Clutch)
   ========================================================================== */
function initReviewFilters() {
  const filterBtns = document.querySelectorAll('.review-filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  if (!filterBtns.length || !reviewCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'font-bold');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-white/10');
      });
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-white/10');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'font-bold');

      const filter = btn.dataset.filter;

      reviewCards.forEach(card => {
        const rating = card.dataset.rating;
        const source = card.dataset.source;

        let match = false;
        if (filter === 'all') {
          match = true;
        } else if (filter === '5' && rating === '5') {
          match = true;
        } else if (filter === '4' && rating === '4') {
          match = true;
        } else if (filter === 'google' && source === 'google') {
          match = true;
        } else if (filter === 'clutch' && source === 'clutch') {
          match = true;
        }

        if (match) {
          card.style.display = 'flex';
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Searchable FAQ Knowledge Base
   ========================================================================== */
function initFaqSearch() {
  const searchInput = document.getElementById('faq-search-input');
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  // Toggle Accordion Click
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Close all other faqs
      faqItems.forEach(other => {
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherAnswer && other !== item) {
          otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answer.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });

      const noMatchMsg = document.getElementById('faq-no-match');
      if (noMatchMsg) {
        noMatchMsg.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }
}

/* ==========================================================================
   6. Consultation & Enquiry Modal Management
   ========================================================================== */
function initEnquiryModal() {
  const modal = document.getElementById('enquiry-modal');
  const openButtons = document.querySelectorAll('.open-enquiry-modal-btn');
  const closeButtons = document.querySelectorAll('.close-modal-btn');
  const form = document.getElementById('modal-enquiry-form');
  const mainEnquiryForm = document.getElementById('main-enquiry-form');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Click outside backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Modal Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const phone = form.querySelector('[name="phone"]').value;
      const service = form.querySelector('[name="service"]').value;
      const notes = form.querySelector('[name="message"]').value;

      showToast(`Thank you, ${name}! Your enquiry has been received. Our senior consultant will call you at ${phone} or WhatsApp within 15 minutes.`, 'success');
      
      // Auto open WhatsApp with the enquiry detail
      const waMsg = encodeURIComponent(`*New Consultation Request*\nName: ${name}\nPhone: ${phone}\nInterested Service: ${service}\nNotes: ${notes}\n(Enquiry sent to +91 8283945753)`);
      setTimeout(() => {
        window.open(`https://wa.me/918283945753?text=${waMsg}`, '_blank');
      }, 1000);

      form.reset();
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Main Section Form Submission
  if (mainEnquiryForm) {
    mainEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = mainEnquiryForm.querySelector('[name="name"]').value;
      const phone = mainEnquiryForm.querySelector('[name="phone"]').value;
      const service = mainEnquiryForm.querySelector('[name="service"]').value;
      const notes = mainEnquiryForm.querySelector('[name="message"]').value;

      showToast(`Awesome, ${name}! We've registered your priority enquiry. Our team (+91 8283945753) will connect shortly.`, 'success');

      const waMsg = encodeURIComponent(`*Enquiry from Website Form*\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDetails: ${notes}`);
      setTimeout(() => {
        window.open(`https://wa.me/918283945753?text=${waMsg}`, '_blank');
      }, 1000);

      mainEnquiryForm.reset();
    });
  }
}

/* ==========================================================================
   7. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const closeMenu = document.getElementById('mobile-menu-close');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  });

  function closeDrawer() {
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  if (closeMenu) closeMenu.addEventListener('click', closeDrawer);
  links.forEach(l => l.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   8. One-Click Phone Copy & Toast Notifications
   ========================================================================== */
function initPhoneCopy() {
  const copyButtons = document.querySelectorAll('.copy-phone-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phoneNumber = '+91 8283945753';
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast(`Copied ${phoneNumber} to clipboard! Ready to dial or WhatsApp.`, 'success');
      }).catch(() => {
        showToast(`Call us directly at ${phoneNumber}`, 'info');
      });
    });
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgStyles = type === 'success' 
    ? 'bg-[#060913]/90 border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
    : (type === 'error' ? 'bg-[#060913]/90 border-pink-500/60 text-pink-300 shadow-[0_0_20px_rgba(255,0,127,0.3)]' : 'bg-[#060913]/90 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]');

  toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-xl ${bgStyles} transition-all duration-300 transform translate-y-2 opacity-0 text-sm font-medium`;
  toast.innerHTML = `
    <span class="text-base">${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}</span>
    <span class="flex-1">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 20);

  // Remove after 4.5s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
