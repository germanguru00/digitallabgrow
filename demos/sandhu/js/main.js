/**
 * Sandhu Modular Kitchen - Multi-Page Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndPalette();
  initHeaderAndMobileNav();
  initGalleryAndLightbox();
  initWhatsAppForm();
  initCostEstimator();
  highlightActiveNav();
  initBeforeAfterSlider();
  initSwatchExplorer();
  initNumberCounters();
});

/* --------------------------------------------------------------------------
   1. Theme & Color Palette Management
   -------------------------------------------------------------------------- */
function initThemeAndPalette() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const paletteToggle = document.getElementById('palette-toggle');

  // Load preferences
  const savedTheme = localStorage.getItem('sandhu-theme') || 'dark';
  const savedPalette = localStorage.getItem('sandhu-palette') || 'emerald';

  root.setAttribute('data-theme', savedTheme);
  root.setAttribute('data-palette', savedPalette);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('sandhu-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  if (paletteToggle) {
    const palettes = ['emerald', 'sapphire', 'onyx'];
    paletteToggle.addEventListener('click', () => {
      const currentPalette = root.getAttribute('data-palette') || 'emerald';
      const nextIndex = (palettes.indexOf(currentPalette) + 1) % palettes.length;
      const nextPalette = palettes[nextIndex];
      root.setAttribute('data-palette', nextPalette);
      localStorage.setItem('sandhu-palette', nextPalette);
      showPaletteToast(nextPalette);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i, #theme-toggle svg');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`; // moon
  } else {
    icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`; // sun
  }
}

function showPaletteToast(paletteName) {
  const names = {
    emerald: 'Royal Emerald & Champagne Gold',
    sapphire: 'Midnight Sapphire & Rose Gold',
    onyx: 'Velvet Onyx & Radiant Amber'
  };
  let toast = document.getElementById('palette-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'palette-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      background: var(--bg-card);
      color: var(--text-main);
      border: 1px solid var(--accent-gold);
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 99;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      transition: opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = `Theme: ${names[paletteName] || paletteName}`;
  toast.style.opacity = '1';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
  }, 2200);
}

/* --------------------------------------------------------------------------
   2. Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeaderAndMobileNav() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
      });
    });
  }
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const page = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === page || (page === '' && href === 'index.html') || (page === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Gallery Lightbox & Filtering
   -------------------------------------------------------------------------- */
let activeGalleryPhotos = [];
let currentLightboxIndex = 0;

function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Collect all photos currently displayed
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
      activeGalleryPhotos = visibleItems.map(i => ({
        url: i.getAttribute('data-full') || i.querySelector('img')?.src,
        title: i.querySelector('.gallery-item-title')?.textContent || 'Sandhu Interior',
        category: i.getAttribute('data-category') || 'Interior'
      }));
      currentLightboxIndex = visibleItems.indexOf(item);
      if (currentLightboxIndex === -1) currentLightboxIndex = 0;
      openLightbox();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (!modal || !img || activeGalleryPhotos.length === 0) return;

  const current = activeGalleryPhotos[currentLightboxIndex];
  img.src = current.url;
  if (caption) {
    caption.textContent = `${current.title} (${current.category})`;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  if (activeGalleryPhotos.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + dir + activeGalleryPhotos.length) % activeGalleryPhotos.length;
  const current = activeGalleryPhotos[currentLightboxIndex];
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (img) img.src = current.url;
  if (caption) caption.textContent = `${current.title} (${current.category})`;
}

/* --------------------------------------------------------------------------
   4. WhatsApp Form Integration
   -------------------------------------------------------------------------- */
function initWhatsAppForm() {
  const form = document.getElementById('sandhu-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const service = form.querySelector('[name="service"]')?.value || 'Modular Kitchen';
    const message = form.querySelector('[name="message"]')?.value.trim() || '';

    if (!name || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const text = `*New Inquiry - Sandhu Modular Kitchen*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n\n*Message:*\n${message || 'Hi, I would like to book a free consultation and quotation for my home interiors.'}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/919988772181?text=${encoded}`;
    window.open(waUrl, '_blank');
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Modular Kitchen Cost Estimator
   -------------------------------------------------------------------------- */
function initCostEstimator() {
  const estimatorContainer = document.getElementById('cost-estimator');
  if (!estimatorContainer) return;

  let selectedLayout = 'L-Shape';
  let selectedFinish = 'Acrylic';
  let kitchenSqFt = 90;

  const layoutMultiplier = {
    'Straight': 1.0,
    'L-Shape': 1.15,
    'Parallel': 1.25,
    'U-Shape': 1.4,
    'Island': 1.65
  };

  const finishRate = {
    'Matte Laminate': 1650,
    'Acrylic': 2250,
    'PU Lacquer': 2850,
    'Glass / Ceramic': 3450
  };

  const layoutCards = estimatorContainer.querySelectorAll('.calc-layout-option');
  const finishCards = estimatorContainer.querySelectorAll('.calc-finish-option');
  const sqftSlider = estimatorContainer.querySelector('#calc-sqft-slider');
  const sqftDisplay = estimatorContainer.querySelector('#calc-sqft-value');
  const priceDisplay = estimatorContainer.querySelector('#est-price-val');
  const shareWaBtn = estimatorContainer.querySelector('#calc-share-wa');

  function calculateEstimate() {
    const rate = finishRate[selectedFinish] || 2250;
    const mult = layoutMultiplier[selectedLayout] || 1.15;
    const base = kitchenSqFt * rate * mult;
    const minEst = Math.round(base * 0.9 / 5000) * 5000;
    const maxEst = Math.round(base * 1.15 / 5000) * 5000;

    const formatted = `₹${(minEst).toLocaleString('en-IN')} - ₹${(maxEst).toLocaleString('en-IN')}`;
    if (priceDisplay) priceDisplay.textContent = formatted;

    if (shareWaBtn) {
      const msg = `*Quotation Estimate Inquiry - Sandhu Modular Kitchen*\n\n*Selected Layout:* ${selectedLayout}\n*Cabinet Finish:* ${selectedFinish}\n*Approx Area:* ${kitchenSqFt} sq. ft.\n*Estimated Range:* ${formatted}\n\nPlease share detailed 3D design and quotation.`;
      shareWaBtn.href = `https://wa.me/919988772181?text=${encodeURIComponent(msg)}`;
    }
  }

  layoutCards.forEach(card => {
    card.addEventListener('click', () => {
      layoutCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedLayout = card.getAttribute('data-value') || 'L-Shape';
      calculateEstimate();
    });
  });

  finishCards.forEach(card => {
    card.addEventListener('click', () => {
      finishCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedFinish = card.getAttribute('data-value') || 'Acrylic';
      calculateEstimate();
    });
  });

  if (sqftSlider && sqftDisplay) {
    sqftSlider.addEventListener('input', (e) => {
      kitchenSqFt = parseInt(e.target.value, 10);
      sqftDisplay.textContent = `${kitchenSqFt} sq. ft.`;
      calculateEstimate();
    });
  }

  calculateEstimate();
}

/* --------------------------------------------------------------------------
   6. Before & After Transformation Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  if (!container) return;

  const afterWrap = container.querySelector('.ba-image-after-wrap');
  const handle = container.querySelector('.ba-slider-handle');
  if (!afterWrap || !handle) return;
  let isDragging = false;

  function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;

    afterWrap.style.width = `${pos}%`;
    handle.style.left = `${pos}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   7. Material & Finish Swatch Explorer
   -------------------------------------------------------------------------- */
function initSwatchExplorer() {
  const swatchPills = document.querySelectorAll('.swatch-pill');
  if (swatchPills.length === 0) return;

  const previewImg = document.getElementById('swatch-preview-img');
  const titleEl = document.getElementById('swatch-title');
  const descEl = document.getElementById('swatch-desc');
  const durabilityEl = document.getElementById('swatch-durability');
  const moistureEl = document.getElementById('swatch-moisture');
  const hardwareEl = document.getElementById('swatch-hardware');
  const appEl = document.getElementById('swatch-app');

  const swatchData = {
    'acrylic': {
      title: 'High-Gloss German Acrylic (Anti-Yellowing)',
      desc: 'Super high-gloss mirror-like reflective surface offering superior depth, UV protection, and seamless laser edge-banding with zero joint lines.',
      durability: 'Scratch Resistant Grade 4H',
      moisture: '100% Water Resistant',
      hardware: 'Blum Tandembox Compatible',
      app: 'Modern Island & Wall Units',
      img: 'assets/kitchen_white_marble.png'
    },
    'pu-lacquer': {
      title: 'Satin PU Lacquer Paint (Seamless 360° Coating)',
      desc: 'Flawlessly hand-sanded and multi-coat baked polyurethane lacquer finish providing a continuous seamless barrier around all 6 sides of every shutter.',
      durability: 'High Chemical & Stain Resistance',
      moisture: 'Hermetically Sealed',
      hardware: 'Hettich Sensys Soft-Close',
      app: 'Shaker Styles & Fluted Doors',
      img: 'assets/kitchen_slate_blue_grand.jpg'
    },
    'teal-acrylic': {
      title: 'Vibrant Matte & Gloss Jewel Acrylic',
      desc: 'Sophisticated architectural color pigments designed for statement kitchen islands, tall pantry units, and designer bar cabinets.',
      durability: 'Anti-Fingerprint Nano Surface',
      moisture: 'Complete Moisture Shield',
      hardware: 'Push-to-Open & Hydraulic Lift',
      app: 'Contemporary Designer Kitchens',
      img: 'assets/kitchen_teal_luxury.png'
    },
    'herringbone': {
      title: 'Architectural Quartz & Herringbone Tile Backing',
      desc: 'Non-porous quartz composites paired with high-fired ceramic tiles that resist hot cooking splatters, turmeric stains, and steam.',
      durability: 'Mohs Hardness 7 (High Impact)',
      moisture: 'Zero Porosity Absorption',
      hardware: 'Under-Cabinet Profile LED',
      app: 'Countertops & Splashbacks',
      img: 'assets/kitchen_parallel_galley.png'
    }
  };

  swatchPills.forEach(pill => {
    pill.addEventListener('click', () => {
      swatchPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-swatch');
      const data = swatchData[key];
      if (!data) return;

      if (previewImg) previewImg.src = data.img;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (durabilityEl) durabilityEl.textContent = data.durability;
      if (moistureEl) moistureEl.textContent = data.moisture;
      if (hardwareEl) hardwareEl.textContent = data.hardware;
      if (appEl) appEl.textContent = data.app;
    });
  });
}

/* --------------------------------------------------------------------------
   8. Number Counter Animation
   -------------------------------------------------------------------------- */
function initNumberCounters() {
  const statVals = document.querySelectorAll('.stat-val');
  if (statVals.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      obs.unobserve(el);

      const text = el.textContent.trim();
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0], 10);
      const suffix = text.replace(/\d+/, '');
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = `${current}${suffix}`;
      }, 30);
    });
  }, { threshold: 0.5 });

  statVals.forEach(val => observer.observe(val));
}

