// ==========================================================================
// UPTOWNIE - GIRLY & TRENDY PINTEREST SHOPPING HAUL APP LOGIC
// ==========================================================================

// Global App State
const state = {
  cart: JSON.parse(localStorage.getItem('uptownie_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('uptownie_wishlist') || '[]'),
  activeCategory: 'All',
  activeVibe: 'All',
  searchQuery: '',
  maxPrice: 1500,
  selectedSize: 'All',
  selectedColor: 'All',
  sortBy: 'bestseller',
  gridCols: 3,
  appliedPromo: null,
  promoDiscount: 0,
  quickViewProduct: null,
};

function saveState() {
  localStorage.setItem('uptownie_cart', JSON.stringify(state.cart));
  localStorage.setItem('uptownie_wishlist', JSON.stringify(state.wishlist));
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderAll();
  initFlashSaleTimer();
});

// Event Listeners Setup
function initEventListeners() {
  // Search bar
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Price range slider
  const priceSlider = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value);
      if (priceVal) priceVal.textContent = `₹${state.maxPrice}`;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Promo Code apply
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', applyPromoCode);
  }
}

// Global Render Coordinator
function renderAll() {
  renderStories();
  renderVibePills();
  renderProducts();
  renderOutfitBundles();
  renderPinterestFeed();
  updateCartBadge();
  updateWishlistBadge();
}

// Render Story Reels Highlight Circles
function renderStories() {
  const container = document.getElementById('storiesContainer');
  if (!container) return;

  container.innerHTML = STORIES_DATA.map(story => `
    <div class="story-circle-item" onclick="openStoryModal('${story.id}')">
      <div class="story-ring">
        <img src="${story.img}" alt="${story.title}">
      </div>
      <span class="story-label">${story.title}</span>
    </div>
  `).join('');
}

function openStoryModal(storyId) {
  const story = STORIES_DATA.find(s => s.id === storyId);
  if (!story) return;

  const modal = document.getElementById('storyModal');
  const body = document.getElementById('storyModalBody');

  if (!modal || !body) return;

  const prod = PRODUCTS.find(p => p.id === story.productId);

  body.innerHTML = `
    <div style="position:relative; border-radius: 24px; overflow:hidden; background:#000; height: 500px; border:2px solid #FF1493;">
      <img src="${story.img}" style="width:100%; height:100%; object-fit:cover; opacity:0.88;">
      
      <div style="position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; color:#FFF;">
        <span style="font-weight:800; font-size:1.1rem; text-shadow:0 2px 4px #000;">${story.title}</span>
        <button onclick="closeStoryModal()" style="color:#FFF; font-size:1.2rem; background:rgba(0,0,0,0.5); width:32px; height:32px; border-radius:50%;">✕</button>
      </div>

      <div style="position:absolute; bottom:24px; left:20px; right:20px; background:rgba(255,255,255,0.96); backdrop-filter:blur(10px); padding:16px; border-radius:18px; border:2px solid #FFB3C6;">
        <p style="font-size:0.92rem; font-weight:800; color:#2C1820; margin-bottom:8px;">${story.caption}</p>
        ${prod ? `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:800; font-size:0.9rem; color:#2C1820;">${prod.name}</div>
              <div style="color:#FF1493; font-weight:800;">₹${prod.price}</div>
            </div>
            <a class="btn-primary" href="product-detail.html?id=${prod.id}" style="padding:8px 16px; font-size:0.82rem; text-decoration:none;">
              Shop Fit 🛍️
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeStoryModal() {
  document.getElementById('storyModal')?.classList.remove('open');
}

// Flash Sale Countdown Timer Engine
function initFlashSaleTimer() {
  let secondsLeft = 14 * 3600 + 32 * 60 + 45;

  setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) secondsLeft = 24 * 3600;

    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;

    const hrsEl = document.getElementById('flashHrs');
    const minsEl = document.getElementById('flashMins');
    const secsEl = document.getElementById('flashSecs');

    if (hrsEl) hrsEl.textContent = String(hrs).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

// Spin Wheel Modal Logic
function openSpinWheelModal() {
  document.getElementById('spinWheelModal')?.classList.add('open');
}

function closeSpinWheelModal() {
  document.getElementById('spinWheelModal')?.classList.remove('open');
}

function spinTheWheel() {
  const wheel = document.getElementById('wheelGraphic');
  const resultDiv = document.getElementById('wheelResult');
  const spinBtn = document.getElementById('spinActionBtn');

  if (!wheel || !spinBtn) return;

  spinBtn.disabled = true;
  spinBtn.textContent = 'Spinning... 💫';

  const randomDeg = 1440 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${randomDeg}deg)`;
  wheel.style.transition = 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)';

  setTimeout(() => {
    state.appliedPromo = 'SECRET30';
    state.promoDiscount = 0.30;

    if (resultDiv) {
      resultDiv.innerHTML = `
        <div style="background:#FFF0F4; border:2px dashed #FF1493; padding:16px; border-radius:16px; text-align:center; margin-top:16px;">
          <span style="font-size:2rem;">🎉</span>
          <h4 style="color:#FF1493; font-size:1.3rem; font-weight:800;">YOU WON 30% OFF!</h4>
          <p style="font-size:0.88rem; color:#7A5C68; margin:4px 0 12px;">Use promo code: <strong>SECRET30</strong> (Auto-applied!)</p>
          <a class="btn-primary" href="cart.html" style="width:100%; justify-content:center; text-decoration:none;">
            View Bag With 30% OFF 🛍️
          </a>
        </div>
      `;
    }
  }, 3600);
}

// Render Vibe Ribbon Filter Pills
function renderVibePills() {
  const vibes = [
    { id: 'All', label: '🌸 All Cuties', icon: '✨' },
    { id: 'Coquette & Bows', label: '🎀 Coquette & Bows', icon: '🎀' },
    { id: 'Soft Girl', label: '☁️ Soft Girl Pink', icon: '☁️' },
    { id: 'Y2K Baddie', label: '⚡ Y2K Baddie', icon: '⚡' },
    { id: 'Clean Girl', label: '🌿 Clean Girl Aesthetic', icon: '🌿' },
    { id: 'Party Glam', label: '🪩 Party Glam', icon: '🪩' }
  ];

  const container = document.getElementById('vibeContainer');
  if (!container) return;

  container.innerHTML = vibes.map(vibe => `
    <button class="vibe-pill ${state.activeVibe === vibe.id ? 'active' : ''}" onclick="setVibe('${vibe.id}')">
      <span>${vibe.label}</span>
    </button>
  `).join('');
}

function setVibe(vibeId) {
  state.activeVibe = vibeId;
  renderVibePills();
  renderProducts();
}

function setCategory(catName) {
  state.activeCategory = catName;
  renderProducts();
}

function setGridCols(cols) {
  state.gridCols = cols;
  document.querySelectorAll('.grid-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.cols) === cols);
  });
  const gridEl = document.getElementById('productsGrid');
  if (gridEl) {
    gridEl.className = `products-grid grid-${cols}`;
  }
}

function setSizeFilter(size) {
  state.selectedSize = state.selectedSize === size ? 'All' : size;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === state.selectedSize);
  });
  renderProducts();
}

function setColorFilter(colorHex) {
  state.selectedColor = state.selectedColor === colorHex ? 'All' : colorHex;
  document.querySelectorAll('.color-circle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.hex === state.selectedColor);
  });
  renderProducts();
}

function resetFilters() {
  state.activeCategory = 'All';
  state.activeVibe = 'All';
  state.searchQuery = '';
  state.maxPrice = 1500;
  state.selectedSize = 'All';
  state.selectedColor = 'All';
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  const priceSlider = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  if (priceSlider) priceSlider.value = 1500;
  if (priceVal) priceVal.textContent = '₹1500';

  renderVibePills();
  renderProducts();
  showToast('Filters reset! 🌸');
}

// Filter & Sort Products Engine
function getFilteredProducts() {
  return PRODUCTS.filter(prod => {
    if (state.activeCategory !== 'All' && prod.category !== state.activeCategory) return false;
    if (state.activeVibe !== 'All' && prod.vibe !== state.activeVibe) return false;
    if (prod.price > state.maxPrice) return false;
    
    if (state.searchQuery) {
      const matchName = prod.name.toLowerCase().includes(state.searchQuery);
      const matchVibe = prod.vibe.toLowerCase().includes(state.searchQuery);
      const matchTag = prod.tags.some(t => t.toLowerCase().includes(state.searchQuery));
      if (!matchName && !matchVibe && !matchTag) return false;
    }
    
    if (state.selectedSize !== 'All') {
      if (!prod.sizes.includes(state.selectedSize)) return false;
    }
    
    if (state.selectedColor !== 'All') {
      const hasColor = prod.colors.some(c => c.hex === state.selectedColor);
      if (!hasColor) return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (state.sortBy === 'price-low') return a.price - b.price;
    if (state.sortBy === 'price-high') return b.price - a.price;
    if (state.sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });
}

// Render Products Grid
function renderProducts() {
  const filtered = getFilteredProducts();
  const gridEl = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');

  if (countEl) {
    countEl.innerHTML = `Showing <strong>${filtered.length}</strong> cute styles`;
  }

  if (!gridEl) return;

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFF0F4; border-radius: 20px; border: 2px dashed #FFB3C6;">
        <span style="font-size: 3rem;">🎀</span>
        <h3 style="font-size: 1.5rem; color: #FF1493; margin: 12px 0 6px;">No cuties found!</h3>
        <p style="color: #7A5C68; margin-bottom: 16px;">Try tweaking your vibe or price filters to uncover more tops & accessories!</p>
        <button class="btn-primary" onclick="resetFilters()">Clear Filters ✨</button>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(prod => {
    const isWishlisted = state.wishlist.includes(prod.id);
    return `
      <div class="product-card">
        <div class="card-image-wrap">
          ${prod.isBestseller ? '<span class="badge-tag">BESTSELLER</span>' : ''}
          ${prod.isTrending ? '<span class="badge-tag trending">PINTEREST VIRAL</span>' : ''}
          
          <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${prod.id}')" title="Add to Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? '#FF1493' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <a href="product-detail.html?id=${prod.id}">
            <img class="img-primary" src="${prod.images[0]}" alt="${prod.name}" loading="lazy">
            <img class="img-secondary" src="${prod.images[1] || prod.images[0]}" alt="${prod.name} back view" loading="lazy">
          </a>
          
          <div class="quick-add-overlay">
            <button class="quick-view-btn" onclick="openQuickView('${prod.id}')">
              <span>👁️ Quick View</span>
            </button>
            <button class="quick-cart-btn" onclick="quickAddToCart('${prod.id}')">
              <span>🛍️ Add to Bag</span>
            </button>
          </div>
        </div>
        
        <div class="card-details">
          <div class="vibe-tag-label">${prod.vibe}</div>
          <h3 class="product-title">
            <a href="product-detail.html?id=${prod.id}">${prod.name}</a>
          </h3>
          
          <div class="rating-row">
            <div class="stars">★★★★★</div>
            <span>${prod.rating} (${prod.reviewsCount})</span>
          </div>
          
          <div style="display:flex; gap:6px; margin: 6px 0 12px;">
            ${prod.colors.map(c => `<span style="width:14px; height:14px; border-radius:50%; background:${c.hex}; border:1px solid #CCC;" title="${c.name}"></span>`).join('')}
          </div>
          
          <div class="price-row">
            <span class="current-price">₹${prod.price}</span>
            <span class="original-price">₹${prod.originalPrice}</span>
            <span class="discount-text">${prod.discount}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Outfit Studio Bundles
function renderOutfitBundles() {
  const container = document.getElementById('bundlesContainer');
  if (!container) return;

  container.innerHTML = OUTFIT_BUNDLES.map(bundle => {
    const top = PRODUCTS.find(p => p.id === bundle.topId);
    const acc1 = PRODUCTS.find(p => p.id === bundle.acc1Id);
    const acc2 = PRODUCTS.find(p => p.id === bundle.acc2Id);

    const bundleTotal = (top?.price || 0) + (acc1?.price || 0) + (acc2?.price || 0);
    const discountedBundlePrice = Math.round(bundleTotal * 0.85);

    return `
      <div class="bundle-card">
        <div class="bundle-left">
          <img src="${bundle.image}" alt="${bundle.title}">
        </div>
        <div class="bundle-right">
          <span class="bundle-badge">${bundle.bundleDiscount}</span>
          <h3 style="font-size: 2rem; font-family:'Playfair Display', serif; color:#2C1820;">${bundle.title}</h3>
          <p style="color: #7A5C68; font-size: 1rem;">${bundle.tagline}</p>
          
          <div class="bundle-items-flow">
            <img class="bundle-item-thumb" src="${top?.images[0]}" title="${top?.name}">
            <span class="plus-icon">+</span>
            <img class="bundle-item-thumb" src="${acc1?.images[0]}" title="${acc1?.name}">
            <span class="plus-icon">+</span>
            <img class="bundle-item-thumb" src="${acc2?.images[0]}" title="${acc2?.name}">
          </div>
          
          <div style="display:flex; align-items:baseline; gap:12px;">
            <span style="font-size: 1.8rem; font-weight: 800; color: #FF1493;">Bundle Deal: ₹${discountedBundlePrice}</span>
            <span style="text-decoration: line-through; color:#A68B96;">₹${bundleTotal}</span>
          </div>
          
          <button class="btn-primary" onclick="addBundleToCart('${bundle.id}')" style="width:fit-content; margin-top:8px;">
            <span>🛍️ Add Full Haul to Bag</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Render Shoppable Pinterest Feed Grid
function renderPinterestFeed() {
  const container = document.getElementById('pinterestFeed');
  if (!container) return;

  container.innerHTML = PINTEREST_PINS.map(pin => `
    <div class="pin-card">
      <img src="${pin.image}" alt="${pin.caption}">
      <div class="pin-overlay">
        <div class="pin-author">${pin.author}</div>
        <div class="pin-caption">${pin.caption}</div>
        <a class="shop-pin-btn" href="product-detail.html?id=${pin.productId}">
          📌 Shop This Look
        </a>
      </div>
    </div>
  `).join('');
}

// Wishlist Logic
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist 💔');
  } else {
    state.wishlist.push(productId);
    showToast('Added to Wishlist! 💖');
  }
  saveState();
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = state.wishlist.length;
}

// Quick Add to Cart
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultSize = product.sizes[0];
  const defaultColor = product.colors[0].name;

  addToCart(product.id, defaultSize, defaultColor, 1);
}

// Add Item to Cart
function addToCart(productId, size, color, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(
    item => item.id === productId && item.selectedSize === size && item.selectedColor === color
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].qty += qty;
  } else {
    state.cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize: size,
      selectedColor: color,
      qty: qty
    });
  }

  saveState();
  updateCartBadge();
  showToast(`Added ${product.name} to Bag! 🛍️`);
}

// Add Entire Bundle
function addBundleToCart(bundleId) {
  const bundle = OUTFIT_BUNDLES.find(b => b.id === bundleId);
  if (!bundle) return;

  const top = PRODUCTS.find(p => p.id === bundle.topId);
  const acc1 = PRODUCTS.find(p => p.id === bundle.acc1Id);
  const acc2 = PRODUCTS.find(p => p.id === bundle.acc2Id);

  if (top) addToCart(top.id, top.sizes[0], top.colors[0].name, 1);
  if (acc1) addToCart(acc1.id, acc1.sizes[0], acc1.colors[0].name, 1);
  if (acc2) addToCart(acc2.id, acc2.sizes[0], acc2.colors[0].name, 1);

  showToast('Entire Cute Haul Added to Cart! 🎀');
}

// Update Cart Badge
function updateCartBadge() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = totalQty;
}

function updateItemQty(index, change) {
  if (!state.cart[index]) return;
  state.cart[index].qty += change;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  saveState();
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveState();
  updateCartBadge();
  renderCartDrawer();
  showToast('Item removed from cart');
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'PINK20') {
    state.appliedPromo = 'PINK20';
    state.promoDiscount = 0.20;
    showToast('Promo Code PINK20 Applied! 20% OFF 🎉');
  } else if (code === 'SECRET30') {
    state.appliedPromo = 'SECRET30';
    state.promoDiscount = 0.30;
    showToast('Secret Spin Coupon SECRET30 Applied! 30% OFF 🎉');
  } else if (code === 'UPTOWNIE10') {
    state.appliedPromo = 'UPTOWNIE10';
    state.promoDiscount = 0.10;
    showToast('10% Discount Applied! 🌸');
  } else {
    showToast('Invalid promo code. Try PINK20 or SECRET30! 🎀');
  }
  renderCartDrawer();
}

// Render Cart Page Contents
function renderCartDrawer() {
  const container = document.getElementById('cartItemsBody');
  const shippingMsg = document.getElementById('shippingMsg');
  const progressFill = document.getElementById('progressFill');

  if (!container) return;

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingThreshold = 999;
  const neededForFree = freeShippingThreshold - subtotal;

  if (shippingMsg && progressFill) {
    if (neededForFree <= 0) {
      shippingMsg.innerHTML = '🎉 You unlocked <strong>FREE Express Shipping</strong>!';
      progressFill.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
      shippingMsg.innerHTML = `Add <strong>₹${neededForFree}</strong> more to unlock <strong>FREE Express Shipping</strong>! 🌸`;
      progressFill.style.width = `${pct}%`;
    }
  }

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <span style="font-size: 3.5rem;">🛍️</span>
        <h4 style="font-size: 1.3rem; color: #FF1493; margin: 12px 0 6px; font-weight:800;">Your Shopping Bag is empty</h4>
        <p style="color: #7A5C68; font-size: 0.95rem; margin-bottom: 20px;">Treat yourself to cute tops & accessories!</p>
        <a class="btn-primary" href="tops.html" style="display:inline-flex; text-decoration:none;">Explore Collection 🌸</a>
      </div>
    `;
    return;
  }

  container.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-variant">Size: <strong>${item.selectedSize}</strong> | Color: <strong>${item.selectedColor}</strong></div>
        <div style="font-weight: 800; color: #FF1493; margin-bottom: 8px;">₹${item.price}</div>
        
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateItemQty(${index}, -1)">-</button>
            <span style="font-weight:800; font-size:0.95rem;">${item.qty}</span>
            <button class="qty-btn" onclick="updateItemQty(${index}, 1)">+</button>
          </div>
          <button onclick="removeCartItem(${index})" style="color:#A68B96; font-size:0.82rem; text-decoration:underline;">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const discountAmt = Math.round(subtotal * state.promoDiscount);
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
  const grandTotal = subtotal - discountAmt + shippingFee;

  const subtotalEl = document.getElementById('summarySubtotal');
  const discountEl = document.getElementById('summaryDiscount');
  const shippingEl = document.getElementById('summaryShipping');
  const totalEl = document.getElementById('summaryTotal');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (discountEl) discountEl.textContent = discountAmt > 0 ? `-₹${discountAmt}` : '₹0';
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? 'FREE' : `₹${shippingFee}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;
}

// Quick View Modal
function openQuickView(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  state.quickViewProduct = prod;

  const modalBackdrop = document.getElementById('quickViewModal');
  const modalBody = document.getElementById('quickViewBody');

  if (!modalBackdrop || !modalBody) return;

  let chosenSize = prod.sizes[0];
  let chosenColor = prod.colors[0].name;

  modalBody.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1.1fr; gap: 32px; align-items:start;">
      <div>
        <div style="aspect-ratio: 4/5; border-radius: 18px; overflow:hidden; margin-bottom: 12px; border:2px solid #FFB3C6;">
          <img id="modalMainImg" src="${prod.images[0]}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="display:flex; gap:10px;">
          ${prod.images.map((img, i) => `
            <img src="${img}" style="width:70px; height:85px; border-radius:8px; object-fit:cover; cursor:pointer; border: 2px solid ${i === 0 ? '#FF1493' : '#FFB3C6'};" onclick="document.getElementById('modalMainImg').src='${img}'">
          `).join('')}
        </div>
      </div>
      
      <div>
        <span class="vibe-tag-label">${prod.vibe}</span>
        <h2 style="font-size: 2.2rem; font-family:'Playfair Display', serif; margin: 4px 0 8px; color:#2C1820;">${prod.name}</h2>
        
        <div class="rating-row" style="margin-bottom:16px;">
          <div class="stars">★★★★★</div>
          <span><strong>${prod.rating}</strong> (${prod.reviewsCount} customer reviews)</span>
        </div>
        
        <div class="price-row" style="margin-bottom:20px;">
          <span class="current-price" style="font-size: 1.9rem;">₹${prod.price}</span>
          <span class="original-price" style="font-size: 1.15rem;">₹${prod.originalPrice}</span>
          <span class="discount-text">${prod.discount}</span>
        </div>
        
        <p style="color:#7A5C68; font-size:0.95rem; margin-bottom:20px; line-height:1.6;">${prod.description}</p>
        
        <div style="margin-bottom:20px;">
          <div style="font-weight:800; font-size:0.9rem; margin-bottom:8px; color:#2C1820;">Select Color: <span id="modalColorName" style="color:#FF1493;">${chosenColor}</span></div>
          <div style="display:flex; gap:10px;">
            ${prod.colors.map(c => `
              <span class="color-circle" style="background:${c.hex};" onclick="document.getElementById('modalColorName').textContent='${c.name}'" title="${c.name}"></span>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-weight:800; font-size:0.9rem; color:#2C1820;">Select Size:</span>
            <button onclick="openSizeAdvisor()" style="color:#FF1493; font-size:0.85rem; font-weight:800; text-decoration:underline;">📏 Size Advisor</button>
          </div>
          <div class="size-grid">
            ${prod.sizes.map(s => `
              <button class="size-btn ${s === chosenSize ? 'active' : ''}" onclick="selectModalSize(this, '${s}')">${s}</button>
            `).join('')}
          </div>
        </div>
        
        <div style="background:#FFF0F4; border-radius:14px; padding:14px 18px; margin-bottom:24px; font-size:0.88rem; color:#E03E67; border:1px solid #FFB3C6;">
          ✨ <strong>Fabric:</strong> ${prod.fabric}<br>
          🎀 <strong>Fit Note:</strong> ${prod.fit}
        </div>
        
        <button class="btn-primary" style="width:100%; justify-content:center; padding:16px;" onclick="addToCart('${prod.id}', '${chosenSize}', '${chosenColor}', 1); closeQuickView();">
          <span>🛍️ Add to Shopping Bag</span>
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('open');
}

function selectModalSize(btn, size) {
  document.querySelectorAll('#quickViewBody .size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('open');
}

// Size Advisor Modal
function openSizeAdvisor() {
  document.getElementById('sizeAdvisorModal')?.classList.add('open');
}

function closeSizeAdvisor() {
  document.getElementById('sizeAdvisorModal')?.classList.remove('open');
}

function calculateSizeRecommendation() {
  const bust = parseInt(document.getElementById('bustSelect')?.value || '34');
  let recommended = 'M';
  if (bust <= 32) recommended = 'XS';
  else if (bust <= 34) recommended = 'S';
  else if (bust <= 36) recommended = 'M';
  else if (bust <= 38) recommended = 'L';
  else recommended = 'XL';

  const resEl = document.getElementById('sizeAdvisorResult');
  if (resEl) {
    resEl.innerHTML = `
      <div style="background:#E8F5E9; color:#2E7D32; padding:16px; border-radius:14px; font-weight:800; text-align:center; border:1px solid #C8E6C9;">
        ✨ Your Recommended Size is: <span style="font-size:1.5rem; color:#1B5E20;">${recommended}</span>
      </div>
    `;
  }
}

// Checkout Form Submission
function processCheckoutOrder(e) {
  e.preventDefault();
  state.cart = [];
  saveState();
  updateCartBadge();
  
  document.getElementById('confirmationModal')?.classList.add('open');
}

function closeConfirmationModal() {
  document.getElementById('confirmationModal')?.classList.remove('open');
}

// Toast System
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>✨</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
