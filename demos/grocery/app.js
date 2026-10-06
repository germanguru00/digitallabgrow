// ==========================================================================
// VERDANTBASKET - CORE APPLICATION LOGIC & STATE ENGINE
// Fully interactive BigBasket-style grocery platform
// Helpline & WhatsApp: +91 8283945753
// ==========================================================================

// Global Application State
const STATE = {
    cart: JSON.parse(localStorage.getItem('vb_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('vb_wishlist') || '[]'),
    selectedCategory: 'all',
    searchQuery: '',
    maxPrice: 1200,
    isOrganicOnly: false,
    isExpressOnly: false,
    sortBy: 'popular',
    activeCoupon: null,
    selectedCity: 'Mumbai',
    selectedPincode: '400001',
    productVariantSelections: {} // Track selected pack size per product ID: { 'prod-1': 0 }
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Parse URL Parameters (e.g. shop.html?cat=fruits-vegetables)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cat')) {
        STATE.selectedCategory = urlParams.get('cat');
    }
    if (urlParams.get('search')) {
        STATE.searchQuery = urlParams.get('search');
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.value = STATE.searchQuery;
    }

    initSwiper();
    initFlashTimer();
    renderAllCategoryNavs();
    renderFlashDeals();
    renderRecipeBundles();
    renderCoupons();
    renderProducts();
    renderTestimonials();
    updateCartUI();
    updateWishlistBadge();
    setupEventListeners();
});

// Setup Hero & Reviews Swiper Sliders
let reviewsSwiperInstance = null;

function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        // 1. Hero Carousel
        new Swiper('.heroSwiper', {
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        // 2. Customer Reviews Sliding Carousel
        initReviewsSwiper();
    }
}

function initReviewsSwiper() {
    if (typeof Swiper !== 'undefined') {
        if (reviewsSwiperInstance) {
            reviewsSwiperInstance.destroy(true, true);
        }
        reviewsSwiperInstance = new Swiper('.reviewsSwiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            grabCursor: true,
            autoplay: {
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.reviews-swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '#review-next-btn',
                prevEl: '#review-prev-btn',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                }
            }
        });
    }
}

// Flash Deals Countdown Timer
function initFlashTimer() {
    let duration = 3 * 3600 + 48 * 60 + 22; // 3h 48m 22s
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-minutes');
    const secsEl = document.getElementById('timer-seconds');

    if (!hoursEl || !minsEl || !secsEl) return;

    setInterval(() => {
        if (duration > 0) {
            duration--;
            const h = Math.floor(duration / 3600);
            const m = Math.floor((duration % 3600) / 60);
            const s = duration % 60;

            hoursEl.textContent = String(h).padStart(2, '0');
            minsEl.textContent = String(m).padStart(2, '0');
            secsEl.textContent = String(s).padStart(2, '0');
        }
    }, 1000);
}

// Render All Category Navigations (Pills, Stories, Mega Dropdown, Sidebar)
function renderAllCategoryNavs() {
    // 1. Sub-nav Category Pills
    const pillsContainer = document.getElementById('category-nav-pills');
    if (pillsContainer) {
        pillsContainer.innerHTML = CATEGORIES.map(cat => `
            <button 
                onclick="filterByCategory('${cat.id}')" 
                class="px-3 py-1.5 rounded-full transition flex items-center gap-1.5 ${STATE.selectedCategory === cat.id ? 'bg-emerald-700 text-white font-bold shadow-sm' : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'}"
            >
                <i class="${cat.icon} text-[11px] ${STATE.selectedCategory === cat.id ? 'text-emerald-200' : 'text-emerald-600'}"></i>
                <span>${cat.name}</span>
            </button>
        `).join('');
    }

    // 2. Category Circular Stories Grid
    const storiesGrid = document.getElementById('category-stories-grid');
    if (storiesGrid) {
        storiesGrid.innerHTML = CATEGORIES.map(cat => `
            <div 
                onclick="filterByCategory('${cat.id}')"
                class="category-story-card cursor-pointer flex flex-col items-center text-center p-2 rounded-2xl bg-white border border-slate-100 shadow-sm transition ${STATE.selectedCategory === cat.id ? 'active' : ''}"
            >
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 bg-emerald-50 p-1 border-2 ${STATE.selectedCategory === cat.id ? 'border-emerald-500' : 'border-transparent'}">
                    <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover rounded-full">
                </div>
                <span class="text-xs font-bold text-slate-800 line-clamp-1 leading-tight">${cat.name}</span>
                <span class="text-[10px] text-emerald-600 font-semibold">${cat.count}</span>
            </div>
        `).join('');
    }

    // 3. Mega Dropdown Menu List
    const megaList = document.getElementById('mega-menu-list');
    if (megaList) {
        megaList.innerHTML = CATEGORIES.map(cat => `
            <button 
                onclick="filterByCategory('${cat.id}'); toggleMegaCategoryMenu();" 
                class="w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
                <span class="flex items-center gap-2">
                    <i class="${cat.icon} text-emerald-600 w-4"></i>
                    ${cat.name}
                </span>
                <span class="text-[10px] text-slate-400 font-normal">${cat.count}</span>
            </button>
        `).join('');
    }

    // 4. Sidebar Category Filter Radios
    const sidebarFilters = document.getElementById('sidebar-category-filters');
    if (sidebarFilters) {
        sidebarFilters.innerHTML = CATEGORIES.map(cat => `
            <label class="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer ${STATE.selectedCategory === cat.id ? 'bg-emerald-50 font-bold text-emerald-900' : 'text-slate-600'}">
                <div class="flex items-center gap-2">
                    <input 
                        type="radio" 
                        name="sidebar-cat" 
                        value="${cat.id}" 
                        ${STATE.selectedCategory === cat.id ? 'checked' : ''} 
                        onchange="filterByCategory('${cat.id}')"
                        class="accent-emerald-600"
                    >
                    <span>${cat.name}</span>
                </div>
                <i class="${cat.icon} text-[10px] text-slate-400"></i>
            </label>
        `).join('');
    }
}

// Mega Menu Toggle
function toggleMegaCategoryMenu() {
    const menu = document.getElementById('mega-category-menu');
    const chevron = document.getElementById('category-chevron');
    if (menu) {
        menu.classList.toggle('hidden');
        if (chevron) {
            chevron.classList.toggle('rotate-180');
        }
    }
}

// Render Flash Deals (Steal of the Day)
function renderFlashDeals() {
    const container = document.getElementById('flash-deals-container');
    if (!container) return;

    // Pick 4 curated discount items (Avocado, Strawberries, A2 Milk, Raw Honey)
    const flashItems = PRODUCTS.filter(p => ['prod-1', 'prod-2', 'prod-7', 'prod-15'].includes(p.id));

    container.innerHTML = flashItems.map(prod => {
        const variant = prod.variants[0];
        const discountPercent = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
        const inCartItem = STATE.cart.find(item => item.id === prod.id && item.variantIndex === 0);

        return `
            <div class="bg-white text-slate-900 rounded-2xl p-4 shadow-md flex flex-col justify-between relative group">
                <div class="absolute top-3 left-3 z-10">
                    <span class="badge-pill bg-rose-500 text-white font-black">${discountPercent}% OFF</span>
                </div>

                <button onclick="toggleWishlist('${prod.id}')" class="wishlist-btn ${STATE.wishlist.includes(prod.id) ? 'active' : ''}">
                    <i class="fa-solid fa-heart text-xs"></i>
                </button>

                <div class="product-img-wrapper rounded-xl mb-3 cursor-pointer" onclick="openQuickView('${prod.id}')">
                    <img src="${prod.image}" alt="${prod.name}" class="product-img">
                </div>

                <div class="space-y-1.5 flex-1">
                    <div class="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <i class="fa-solid fa-bolt text-amber-500"></i> ${prod.deliveryTime}
                    </div>
                    <h4 class="font-extrabold text-sm text-slate-900 line-clamp-1 cursor-pointer hover:text-emerald-700" onclick="openQuickView('${prod.id}')">
                        ${prod.name}
                    </h4>
                    <div class="text-xs text-slate-500 font-medium">${variant.size}</div>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                        <div class="text-base font-black text-slate-900">₹${variant.price}</div>
                        <div class="text-xs text-slate-400 line-through">₹${variant.originalPrice}</div>
                    </div>

                    <div class="w-28">
                        ${inCartItem ? `
                            <div class="qty-stepper">
                                <button class="qty-btn" onclick="updateCartQuantity(${STATE.cart.indexOf(inCartItem)}, -1)">-</button>
                                <span class="text-xs font-black text-emerald-900">${inCartItem.quantity}</span>
                                <button class="qty-btn" onclick="updateCartQuantity(${STATE.cart.indexOf(inCartItem)}, 1)">+</button>
                            </div>
                        ` : `
                            <button onclick="addToCart('${prod.id}', 0)" class="add-cart-primary-btn w-full">
                                <i class="fa-solid fa-plus text-xs"></i> Add
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Recipe & Value Kits
function renderRecipeBundles() {
    const grid = document.getElementById('recipe-bundles-grid');
    if (!grid) return;

    grid.innerHTML = RECIPE_BUNDLES.map(bundle => `
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between relative group hover:shadow-lg transition">
            <div class="relative rounded-2xl overflow-hidden mb-4 h-48 bg-slate-100">
                <img src="${bundle.image}" alt="${bundle.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute top-3 left-3 flex items-center gap-2">
                    <span class="badge-pill bg-slate-900/80 backdrop-blur-md text-white border-0">${bundle.tag}</span>
                    <span class="badge-pill bg-emerald-600 text-white font-black">${bundle.savings}</span>
                </div>
            </div>

            <div class="space-y-2 flex-1">
                <h4 class="font-extrabold text-base text-slate-900 leading-tight">${bundle.name}</h4>
                <p class="text-xs text-slate-500">${bundle.description}</p>
                <div class="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-[11px] font-semibold text-emerald-900 flex items-center gap-1.5">
                    <i class="fa-solid fa-box-open text-emerald-600"></i>
                    <span>${bundle.itemsText}</span>
                </div>
            </div>

            <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                    <div class="text-lg font-black text-slate-900">₹${bundle.price}</div>
                    <div class="text-xs text-slate-400 line-through">₹${bundle.originalPrice}</div>
                </div>
                <button onclick="addBundleToCart('${bundle.id}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition">
                    <i class="fa-solid fa-bag-shopping"></i> Add Bundle
                </button>
            </div>
        </div>
    `).join('');
}

// Render Promo Coupons Strip
function renderCoupons() {
    const container = document.getElementById('coupons-container');
    if (!container) return;

    container.innerHTML = PROMO_COUPONS.map(coupon => `
        <div onclick="applyCouponDirect('${coupon.code}')" class="coupon-ticket p-4 cursor-pointer flex flex-col justify-between">
            <div class="flex items-center justify-between mb-2">
                <span class="font-mono font-black text-sm text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                    ${coupon.code}
                </span>
                <span class="text-[11px] font-bold text-amber-600">Min Order ₹${coupon.minOrder}</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed mb-3">${coupon.description}</p>
            <div class="flex items-center justify-between text-[11px] font-bold text-emerald-700">
                <span>Click to Apply</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </div>
        </div>
    `).join('');
}

// Filter and Sort Products Engine
function getFilteredProducts() {
    let filtered = [...PRODUCTS];

    // Filter by Category
    if (STATE.selectedCategory && STATE.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === STATE.selectedCategory);
    }

    // Filter by Search Query
    if (STATE.searchQuery.trim()) {
        const query = STATE.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.origin.toLowerCase().includes(query)
        );
    }

    // Filter by Max Price (check lowest variant price)
    filtered = filtered.filter(p => {
        const lowestPrice = Math.min(...p.variants.map(v => v.price));
        return lowestPrice <= STATE.maxPrice;
    });

    // Filter by Organic Only
    if (STATE.isOrganicOnly) {
        filtered = filtered.filter(p => p.isOrganic);
    }

    // Filter by Express Only
    if (STATE.isExpressOnly) {
        filtered = filtered.filter(p => p.isExpress);
    }

    // Sort
    if (STATE.sortBy === 'price-low') {
        filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (STATE.sortBy === 'price-high') {
        filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (STATE.sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (STATE.sortBy === 'speed') {
        filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }

    return filtered;
}

// Render Products Grid
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-products-view');
    const countLabel = document.getElementById('catalog-item-count-label');
    const titleLabel = document.getElementById('current-catalog-title');

    if (!grid) return;

    const filtered = getFilteredProducts();

    // Update Category Title & Count
    const currentCatObj = CATEGORIES.find(c => c.id === STATE.selectedCategory);
    if (titleLabel) {
        titleLabel.textContent = STATE.searchQuery ? `Search Results for "${STATE.searchQuery}"` : (currentCatObj ? currentCatObj.name : 'All Products');
    }
    if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} fresh items ready for 15-min delivery`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');

    grid.innerHTML = filtered.map(prod => {
        const selectedVariantIdx = STATE.productVariantSelections[prod.id] || 0;
        const variant = prod.variants[selectedVariantIdx] || prod.variants[0];
        const discountPercent = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
        const inCartItem = STATE.cart.find(item => item.id === prod.id && item.variantIndex === selectedVariantIdx);

        return `
            <div class="product-card p-4 flex flex-col justify-between">
                
                <!-- Badges & Wishlist -->
                <div class="flex items-center justify-between mb-2">
                    <span class="badge-pill badge-${prod.badgeColor}">
                        ${prod.badge}
                    </span>
                    <button onclick="toggleWishlist('${prod.id}')" class="wishlist-btn ${STATE.wishlist.includes(prod.id) ? 'active' : ''}">
                        <i class="fa-solid fa-heart text-xs"></i>
                    </button>
                </div>

                <!-- Product Thumbnail with Quick View Trigger -->
                <div class="product-img-wrapper rounded-xl mb-3 cursor-pointer" onclick="openQuickView('${prod.id}')">
                    <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
                </div>

                <!-- Content info -->
                <div class="space-y-2 flex-1">
                    
                    <!-- Delivery Time & Rating -->
                    <div class="flex items-center justify-between text-xs">
                        <span class="text-emerald-700 font-bold flex items-center gap-1">
                            <i class="fa-solid fa-bolt text-amber-500"></i> ${prod.deliveryTime}
                        </span>
                        <span class="text-slate-600 font-semibold flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                            <i class="fa-solid fa-star text-amber-400 text-[10px]"></i> ${prod.rating} (${prod.reviewsCount})
                        </span>
                    </div>

                    <!-- Product Name -->
                    <h3 class="font-bold text-sm text-slate-900 line-clamp-2 cursor-pointer hover:text-emerald-700 transition" onclick="openQuickView('${prod.id}')">
                        ${prod.name}
                    </h3>

                    <!-- Pack Size Variant Selector -->
                    ${prod.variants.length > 1 ? `
                        <div class="pt-1">
                            <select 
                                onchange="changeProductVariant('${prod.id}', this.value)" 
                                class="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg p-1.5 outline-none cursor-pointer hover:border-emerald-400"
                            >
                                ${prod.variants.map((v, idx) => `
                                    <option value="${idx}" ${selectedVariantIdx === idx ? 'selected' : ''}>
                                        ${v.size} - ₹${v.price}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    ` : `
                        <div class="text-xs text-slate-500 font-medium pt-1">${variant.size}</div>
                    `}
                </div>

                <!-- Price and Add to Cart Stepper -->
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-base font-black text-slate-900">₹${variant.price}</span>
                            <span class="text-xs text-slate-400 line-through">₹${variant.originalPrice}</span>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-600">${discountPercent}% OFF</span>
                    </div>

                    <div class="w-28">
                        ${inCartItem ? `
                            <div class="qty-stepper">
                                <button class="qty-btn" onclick="updateCartQuantity(${STATE.cart.indexOf(inCartItem)}, -1)">-</button>
                                <span class="text-xs font-black text-emerald-900">${inCartItem.quantity}</span>
                                <button class="qty-btn" onclick="updateCartQuantity(${STATE.cart.indexOf(inCartItem)}, 1)">+</button>
                            </div>
                        ` : `
                            <button onclick="addToCart('${prod.id}', ${selectedVariantIdx})" class="add-cart-primary-btn w-full">
                                <i class="fa-solid fa-plus text-xs"></i> Add
                            </button>
                        `}
                    </div>
                </div>

            </div>
        `;
    }).join('');
}

// Change selected variant for a product in catalog
function changeProductVariant(productId, variantIndex) {
    STATE.productVariantSelections[productId] = parseInt(variantIndex);
    renderProducts();
}

// Render Customer Testimonials Sliding Carousel
function renderTestimonials() {
    const container = document.getElementById('testimonials-slider-wrapper');
    if (!container) return;

    container.innerHTML = TESTIMONIALS.map(t => `
        <div class="swiper-slide h-auto">
            <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                
                <!-- Background Watermark Quote -->
                <div class="absolute -right-2 -top-2 text-slate-100 text-7xl font-serif select-none pointer-events-none group-hover:text-emerald-50 transition-colors">
                    <i class="fa-solid fa-quote-right"></i>
                </div>

                <div class="space-y-3 relative z-10">
                    <!-- Rating & Delivery Tag -->
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-1 text-amber-400 text-xs">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}
                            <span class="text-slate-800 font-black ml-1 text-xs">5.0</span>
                        </div>
                        <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                            <i class="fa-solid fa-bolt text-amber-500 text-[10px]"></i> ${t.deliveryTime}
                        </span>
                    </div>

                    <!-- Ordered Item Tag -->
                    <div class="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-lg">
                        <i class="fa-solid fa-basket-shopping text-emerald-600 text-[10px]"></i>
                        <span class="truncate max-w-[220px]">${t.itemOrdered}</span>
                    </div>

                    <!-- Review Text -->
                    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic pt-1">
                        "${t.comment}"
                    </p>
                </div>

                <!-- Reviewer Footer Profile -->
                <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 relative z-10">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <img src="${t.avatar}" alt="${t.name}" class="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40">
                            ${t.verified ? `
                                <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px]" title="Verified Buyer">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                            ` : ''}
                        </div>
                        <div>
                            <h5 class="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                <span>${t.name}</span>
                            </h5>
                            <span class="text-[11px] text-slate-500 font-medium">${t.location}</span>
                        </div>
                    </div>
                    <span class="text-[10px] text-slate-400 font-semibold">${t.date}</span>
                </div>

            </div>
        </div>
    `).join('');

    // Re-initialize swiper instance after DOM population
    initReviewsSwiper();
}

// ==========================================================================
// CART & COMMERCE ENGINE
// ==========================================================================

// Add Single Item to Cart
function addToCart(productId, variantIndex = 0) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const variant = prod.variants[variantIndex] || prod.variants[0];
    const existingIndex = STATE.cart.findIndex(item => item.id === productId && item.variantIndex === variantIndex);

    if (existingIndex > -1) {
        STATE.cart[existingIndex].quantity += 1;
    } else {
        STATE.cart.push({
            id: prod.id,
            name: prod.name,
            variantIndex: variantIndex,
            size: variant.size,
            price: variant.price,
            originalPrice: variant.originalPrice,
            image: prod.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    renderProducts();
    renderFlashDeals();
    showToast(`Added ${prod.name} (${variant.size}) to basket!`, 'success');
}

// Add Whole Recipe Bundle to Cart
function addBundleToCart(bundleId) {
    const bundle = RECIPE_BUNDLES.find(b => b.id === bundleId);
    if (!bundle) return;

    bundle.itemIds.forEach(prodId => {
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (prod) {
            const existingIndex = STATE.cart.findIndex(item => item.id === prod.id && item.variantIndex === 0);
            if (existingIndex > -1) {
                STATE.cart[existingIndex].quantity += 1;
            } else {
                STATE.cart.push({
                    id: prod.id,
                    name: prod.name,
                    variantIndex: 0,
                    size: prod.variants[0].size,
                    price: prod.variants[0].price,
                    originalPrice: prod.variants[0].originalPrice,
                    image: prod.image,
                    quantity: 1
                });
            }
        }
    });

    saveCart();
    updateCartUI();
    renderProducts();
    renderFlashDeals();
    toggleCartDrawer(true);
    showToast(`Added entire ${bundle.name} to basket!`, 'success');
}

// Update Cart Quantity
function updateCartQuantity(cartIndex, delta) {
    if (STATE.cart[cartIndex]) {
        STATE.cart[cartIndex].quantity += delta;
        if (STATE.cart[cartIndex].quantity <= 0) {
            STATE.cart.splice(cartIndex, 1);
        }
    }
    saveCart();
    updateCartUI();
    renderProducts();
    renderFlashDeals();
}

// Remove from Cart
function removeFromCart(cartIndex) {
    STATE.cart.splice(cartIndex, 1);
    saveCart();
    updateCartUI();
    renderProducts();
    renderFlashDeals();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('vb_cart', JSON.stringify(STATE.cart));
}

// Calculate Cart Totals
function getCartTotals() {
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeDeliveryThreshold = 199;
    let deliveryFee = 0;

    if (subtotal > 0 && subtotal < freeDeliveryThreshold) {
        deliveryFee = 25;
    }

    let discount = 0;
    if (STATE.activeCoupon && subtotal >= STATE.activeCoupon.minOrder) {
        if (STATE.activeCoupon.discountType === 'percent') {
            discount = Math.round((subtotal * STATE.activeCoupon.discountValue) / 100);
        } else if (STATE.activeCoupon.discountType === 'flat') {
            discount = STATE.activeCoupon.discountValue;
        } else if (STATE.activeCoupon.discountType === 'free_delivery') {
            deliveryFee = 0;
        }
    }

    const handlingFee = subtotal > 0 ? 5 : 0;
    const grandTotal = Math.max(0, subtotal + deliveryFee + handlingFee - discount);

    return {
        subtotal,
        deliveryFee,
        discount,
        handlingFee,
        grandTotal,
        freeDeliveryThreshold
    };
}

// Update All Cart UI Elements
function updateCartUI() {
    const totalItems = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totals = getCartTotals();

    // 1. Header Badges
    const headerCount = document.getElementById('cart-item-count-badge');
    const headerTotal = document.getElementById('cart-header-total');
    const mobileBadge = document.getElementById('mobile-cart-badge');
    const drawerCountLabel = document.getElementById('cart-drawer-count-label');

    if (headerCount) headerCount.textContent = totalItems;
    if (headerTotal) headerTotal.textContent = `₹${totals.grandTotal}`;
    if (mobileBadge) mobileBadge.textContent = totalItems;
    if (drawerCountLabel) drawerCountLabel.textContent = `${totalItems} items in basket`;

    // 2. Free Delivery Progress Bar
    const freeDelMsg = document.getElementById('free-delivery-msg');
    const freeDelPercent = document.getElementById('free-delivery-percent');
    const freeDelProgressBar = document.getElementById('free-delivery-progress-bar');

    if (freeDelProgressBar && freeDelMsg && freeDelPercent) {
        if (totals.subtotal >= totals.freeDeliveryThreshold || totalItems === 0) {
            freeDelMsg.textContent = totalItems === 0 ? 'Add ₹199 more for FREE 15-Min Delivery!' : '🎉 You have unlocked FREE Express Delivery!';
            freeDelPercent.textContent = totalItems === 0 ? '0%' : '100%';
            freeDelProgressBar.style.width = totalItems === 0 ? '0%' : '100%';
        } else {
            const needed = totals.freeDeliveryThreshold - totals.subtotal;
            const percentage = Math.min(100, Math.round((totals.subtotal / totals.freeDeliveryThreshold) * 100));
            freeDelMsg.textContent = `Add ₹${needed} more for FREE 15-Min Delivery!`;
            freeDelPercent.textContent = `${percentage}%`;
            freeDelProgressBar.style.width = `${percentage}%`;
        }
    }

    // 3. Render Cart Drawer Items
    const itemsContainer = document.getElementById('cart-items-container');
    if (itemsContainer) {
        if (STATE.cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="text-center py-12 space-y-3">
                    <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                    <h4 class="font-extrabold text-slate-800 text-sm">Your basket is empty</h4>
                    <p class="text-xs text-slate-400 max-w-xs mx-auto">Explore farm fresh vegetables, A2 dairy, and organic staples with 15-minute express drop.</p>
                    <button onclick="toggleCartDrawer(false)" class="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md">
                        Start Shopping
                    </button>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = STATE.cart.map((item, idx) => `
                <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-xl bg-white p-1">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-xs text-slate-900 truncate">${item.name}</h4>
                        <div class="text-[11px] text-slate-500">${item.size}</div>
                        <div class="text-xs font-black text-slate-900 mt-1">₹${item.price * item.quantity}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="qty-stepper w-20 h-7">
                            <button class="qty-btn text-xs w-6 h-6" onclick="updateCartQuantity(${idx}, -1)">-</button>
                            <span class="text-xs font-bold text-emerald-900">${item.quantity}</span>
                            <button class="qty-btn text-xs w-6 h-6" onclick="updateCartQuantity(${idx}, 1)">+</button>
                        </div>
                        <button onclick="removeFromCart(${idx})" class="text-slate-400 hover:text-rose-500 text-xs p-1">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // 4. Update Bill Summary Numbers
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const deliveryEl = document.getElementById('cart-delivery-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-val');
    const grandtotalEl = document.getElementById('cart-grandtotal-val');
    const checkoutTotalEl = document.getElementById('checkout-btn-total');
    const checkoutPaymentLabel = document.getElementById('checkout-payment-total-label');

    if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
    if (deliveryEl) deliveryEl.textContent = totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`;
    
    if (discountRow && discountEl) {
        if (totals.discount > 0) {
            discountRow.classList.remove('hidden');
            discountEl.textContent = `-₹${totals.discount}`;
        } else {
            discountRow.classList.add('hidden');
        }
    }

    if (grandtotalEl) grandtotalEl.textContent = `₹${totals.grandTotal}`;
    if (checkoutTotalEl) checkoutTotalEl.textContent = `₹${totals.grandTotal} Total`;
    if (checkoutPaymentLabel) checkoutPaymentLabel.textContent = `₹${totals.grandTotal}`;

    // 5. Applied Coupon Badge
    const couponBadge = document.getElementById('applied-coupon-badge');
    const couponCodeText = document.getElementById('applied-coupon-code-text');
    const couponDiscountVal = document.getElementById('applied-coupon-discount-val');

    if (couponBadge && couponCodeText && couponDiscountVal) {
        if (STATE.activeCoupon && totals.discount > 0) {
            couponBadge.classList.remove('hidden');
            couponCodeText.textContent = STATE.activeCoupon.code;
            couponDiscountVal.textContent = `₹${totals.discount}`;
        } else {
            couponBadge.classList.add('hidden');
        }
    }
}

// Toggle Cart Drawer
function toggleCartDrawer(forceOpen = null) {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    if (!drawer || !backdrop) return;

    if (forceOpen === true) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
    } else if (forceOpen === false) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
    } else {
        drawer.classList.toggle('open');
        backdrop.classList.toggle('open');
    }
}

// Apply Coupon from Input
function applyCartCoupon() {
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    applyCouponDirect(code);
    input.value = '';
}

// Direct Coupon Apply
function applyCouponDirect(code) {
    const coupon = PROMO_COUPONS.find(c => c.code === code);
    const totals = getCartTotals();

    if (!coupon) {
        showToast(`Invalid coupon code: ${code}`, 'error');
        return;
    }

    if (totals.subtotal < coupon.minOrder) {
        showToast(`Add items worth ₹${coupon.minOrder - totals.subtotal} more to apply ${code}!`, 'error');
        return;
    }

    STATE.activeCoupon = coupon;
    updateCartUI();
    showToast(`Coupon ${code} applied successfully! 🎉`, 'success');
}

// Remove Coupon
function removeCoupon() {
    STATE.activeCoupon = null;
    updateCartUI();
    showToast('Coupon removed.', 'info');
}

// ==========================================================================
// QUICK VIEW PRODUCT MODAL
// ==========================================================================

function openQuickView(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('quickview-modal');
    const content = document.getElementById('quickview-modal-content');
    if (!modal || !content) return;

    const selectedVariantIdx = STATE.productVariantSelections[prod.id] || 0;
    const variant = prod.variants[selectedVariantIdx] || prod.variants[0];

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <!-- Image & Badge -->
            <div class="space-y-3">
                <div class="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 h-64 sm:h-80">
                    <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex items-center gap-2">
                    <span class="badge-pill badge-${prod.badgeColor}">${prod.badge}</span>
                    <span class="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <i class="fa-solid fa-bolt text-amber-500"></i> ${prod.deliveryTime}
                    </span>
                    <span class="text-xs text-slate-500 font-semibold ml-auto">
                        <i class="fa-solid fa-star text-amber-400"></i> ${prod.rating} (${prod.reviewsCount} reviews)
                    </span>
                </div>
            </div>

            <!-- Details & Variants -->
            <div class="space-y-4 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-black text-slate-900 leading-snug">${prod.name}</h3>
                    <div class="text-xs text-emerald-700 font-bold mt-1">Origin: ${prod.origin}</div>
                    <p class="text-xs text-slate-600 leading-relaxed mt-2">${prod.description}</p>
                    
                    ${prod.storageTips ? `
                        <div class="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 mt-3 flex items-start gap-2">
                            <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5"></i>
                            <span><strong>Storage Tip:</strong> ${prod.storageTips}</span>
                        </div>
                    ` : ''}

                    ${prod.nutrition ? `
                        <div class="mt-4 pt-3 border-t border-slate-100">
                            <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400">Nutrition Facts</span>
                            <div class="grid grid-cols-4 gap-2 text-center text-xs mt-2">
                                <div class="bg-slate-50 p-2 rounded-xl">
                                    <span class="block text-[10px] text-slate-400 font-bold">CALORIES</span>
                                    <strong class="text-slate-900">${prod.nutrition.calories}</strong>
                                </div>
                                <div class="bg-slate-50 p-2 rounded-xl">
                                    <span class="block text-[10px] text-slate-400 font-bold">CARBS</span>
                                    <strong class="text-slate-900">${prod.nutrition.carbs}</strong>
                                </div>
                                <div class="bg-slate-50 p-2 rounded-xl">
                                    <span class="block text-[10px] text-slate-400 font-bold">FATS</span>
                                    <strong class="text-slate-900">${prod.nutrition.fats || '0g'}</strong>
                                </div>
                                <div class="bg-slate-50 p-2 rounded-xl">
                                    <span class="block text-[10px] text-slate-400 font-bold">PROTEIN</span>
                                    <strong class="text-slate-900">${prod.nutrition.protein}</strong>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Pack Selection & Add to Cart -->
                <div class="pt-4 border-t border-slate-200 space-y-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-2xl font-black text-slate-900">₹${variant.price}</div>
                            <div class="text-xs text-slate-400 line-through">₹${variant.originalPrice}</div>
                        </div>
                        <div class="text-xs font-bold text-slate-600">${variant.size}</div>
                    </div>

                    <div class="flex items-center gap-3">
                        <button onclick="addToCart('${prod.id}', ${selectedVariantIdx}); closeQuickViewModal();" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition">
                            <i class="fa-solid fa-bag-shopping mr-1.5"></i> Add to Cart (₹${variant.price})
                        </button>
                        <a href="tel:8283945753" class="bg-amber-100 hover:bg-amber-200 text-amber-900 p-3 rounded-xl text-xs font-bold transition" title="Inquire on Phone">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('open');
}

function closeQuickViewModal() {
    const modal = document.getElementById('quickview-modal');
    if (modal) modal.classList.remove('open');
}

// ==========================================================================
// MULTI-STEP CHECKOUT & ORDER SIMULATION
// ==========================================================================

function openCheckoutModal() {
    if (STATE.cart.length === 0) {
        showToast('Your basket is empty! Add items first.', 'error');
        return;
    }
    toggleCartDrawer(false);
    goToCheckoutStep(1);
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('open');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('open');
}

function goToCheckoutStep(step) {
    // Hide all steps
    [1, 2, 3, 4].forEach(i => {
        const stepEl = document.getElementById(`checkout-step-${i}`);
        const nodeEl = document.getElementById(`step-node-${i}`);
        if (stepEl) stepEl.classList.add('hidden');
        if (nodeEl) {
            nodeEl.classList.remove('active', 'completed');
            if (i < step) nodeEl.classList.add('completed');
            if (i === step) nodeEl.classList.add('active');
        }
    });

    const targetStep = document.getElementById(`checkout-step-${step}`);
    if (targetStep) targetStep.classList.remove('hidden');
}

function processOrderConfirmation() {
    const totals = getCartTotals();
    const orderId = `VB-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmedOrderIdEl = document.getElementById('confirmed-order-id');
    if (confirmedOrderIdEl) confirmedOrderIdEl.textContent = orderId;

    // Trigger Canvas Confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Build WhatsApp Order Receipt String
    const nameInput = document.getElementById('checkout-name')?.value || 'Valued Customer';
    const flatInput = document.getElementById('checkout-flat')?.value || 'My Address';
    const cityInput = document.getElementById('checkout-city')?.value || STATE.selectedCity;
    const itemsSummary = STATE.cart.map(i => `• ${i.name} (${i.size}) x ${i.quantity} = ₹${i.price * i.quantity}`).join('%0A');

    const waMsg = `*New Order Confirmed on VerdantBasket!*%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${encodeURIComponent(nameInput)}%0A*Address:* ${encodeURIComponent(flatInput)}, ${encodeURIComponent(cityInput)}%0A%0A*Items Ordered:*%0A${itemsSummary}%0A%0A*Total Paid:* ₹${totals.grandTotal}%0A*Delivery:* 15-Minute Express%0A%0APlease process my order!`;

    const waBtn = document.getElementById('whatsapp-order-btn');
    if (waBtn) {
        waBtn.href = `https://wa.me/918283945753?text=${waMsg}`;
    }

    // Clear cart
    STATE.cart = [];
    saveCart();
    updateCartUI();
    renderProducts();
    renderFlashDeals();

    goToCheckoutStep(4);
    showToast(`Order ${orderId} confirmed successfully! 🌿`, 'success');
}

// ==========================================================================
// WISHLIST & LOCATION MODALS
// ==========================================================================

function toggleWishlist(productId) {
    const index = STATE.wishlist.indexOf(productId);
    const prod = PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
        STATE.wishlist.splice(index, 1);
        showToast(`Removed from saved items`, 'info');
    } else {
        STATE.wishlist.push(productId);
        showToast(`Saved ${prod ? prod.name : 'item'} to wishlist! ❤️`, 'success');
    }

    localStorage.setItem('vb_wishlist', JSON.stringify(STATE.wishlist));
    updateWishlistBadge();
    renderProducts();
    renderFlashDeals();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        if (STATE.wishlist.length > 0) {
            badge.classList.remove('hidden');
            badge.textContent = STATE.wishlist.length;
        } else {
            badge.classList.add('hidden');
        }
    }
}

function openWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    const container = document.getElementById('wishlist-items-container');
    if (!modal || !container) return;

    const wishlistProducts = PRODUCTS.filter(p => STATE.wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 space-y-2">
                <i class="fa-regular fa-heart text-3xl text-slate-300"></i>
                <p class="text-xs text-slate-500 font-semibold">Your saved wishlist is currently empty.</p>
            </div>
        `;
    } else {
        container.innerHTML = wishlistProducts.map(prod => `
            <div class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div class="flex items-center gap-3">
                    <img src="${prod.image}" alt="${prod.name}" class="w-12 h-12 object-cover rounded-xl bg-white p-0.5">
                    <div>
                        <h4 class="font-bold text-xs text-slate-900">${prod.name}</h4>
                        <div class="text-xs font-black text-emerald-700">₹${prod.variants[0].price}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="addToCart('${prod.id}', 0); toggleWishlist('${prod.id}');" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                        Add to Cart
                    </button>
                    <button onclick="toggleWishlist('${prod.id}')" class="text-slate-400 hover:text-rose-500 p-1 text-xs">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    modal.classList.add('open');
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    if (modal) modal.classList.remove('open');
}

// Location Selector
function openLocationModal() {
    const modal = document.getElementById('location-modal');
    if (modal) modal.classList.add('open');
}

function closeLocationModal() {
    const modal = document.getElementById('location-modal');
    if (modal) modal.classList.remove('open');
}

function selectCity(city, pincode) {
    STATE.selectedCity = city;
    STATE.selectedPincode = pincode;
    const topBarLabel = document.getElementById('top-bar-city');
    if (topBarLabel) {
        topBarLabel.innerHTML = `Deliver to: <strong>${city} ${pincode}</strong>`;
    }
    closeLocationModal();
    showToast(`Delivery location set to ${city} (${pincode}) - 15m Express Active!`, 'success');
}

// ==========================================================================
// SEARCH, FILTER & SORT HANDLERS
// ==========================================================================

function filterByCategory(categoryId) {
    STATE.selectedCategory = categoryId;
    const grid = document.getElementById('products-grid');

    if (!grid) {
        window.location.href = `shop.html?cat=${categoryId}`;
        return;
    }

    renderAllCategoryNavs();
    renderProducts();

    // Scroll smoothly to catalog
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSortChange(sortVal) {
    STATE.sortBy = sortVal;
    renderProducts();
}

function handlePriceSliderChange(val) {
    STATE.maxPrice = parseInt(val);
    const label = document.getElementById('price-slider-val');
    if (label) label.textContent = `₹${val}`;
    renderProducts();
}

function handleFilterToggles() {
    const organicToggle = document.getElementById('filter-organic-toggle');
    const expressToggle = document.getElementById('filter-express-toggle');

    if (organicToggle) STATE.isOrganicOnly = organicToggle.checked;
    if (expressToggle) STATE.isExpressOnly = expressToggle.checked;

    renderProducts();
}

function resetAllFilters() {
    STATE.selectedCategory = 'all';
    STATE.searchQuery = '';
    STATE.maxPrice = 1200;
    STATE.isOrganicOnly = false;
    STATE.isExpressOnly = false;
    STATE.sortBy = 'popular';

    const searchInput = document.getElementById('global-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const priceSlider = document.getElementById('price-range-slider');
    const priceVal = document.getElementById('price-slider-val');
    const organicToggle = document.getElementById('filter-organic-toggle');
    const expressToggle = document.getElementById('filter-express-toggle');
    const sortSelect = document.getElementById('sort-select');

    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    if (priceSlider) priceSlider.value = '1200';
    if (priceVal) priceVal.textContent = '₹1200';
    if (organicToggle) organicToggle.checked = false;
    if (expressToggle) expressToggle.checked = false;
    if (sortSelect) sortSelect.value = 'popular';

    renderAllCategoryNavs();
    renderProducts();
    showToast('Filters reset to default', 'info');
}

function clearSearch() {
    STATE.searchQuery = '';
    const searchInput = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-autocomplete-dropdown');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (dropdown) dropdown.classList.add('hidden');

    renderProducts();
}

// Contact Form Submission Handler
function handleContactFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'User';
    const phone = document.getElementById('contact-phone')?.value || '8283945753';
    const msg = document.getElementById('contact-message')?.value || '';

    showToast(`Thank you ${name}! Our concierge at 8283945753 will call you shortly.`, 'success');
    e.target.reset();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search Autocomplete
    const searchInput = document.getElementById('global-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-autocomplete-dropdown');
    const resultsList = document.getElementById('search-results-list');

    function performSearch(query) {
        STATE.searchQuery = query;
        if (query.trim()) {
            if (clearBtn) clearBtn.classList.remove('hidden');
            
            // Autocomplete suggestions
            const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
            if (resultsList && dropdown) {
                if (matches.length > 0) {
                    resultsList.innerHTML = matches.map(m => `
                        <div onclick="openQuickView('${m.id}')" class="p-2.5 hover:bg-emerald-50 cursor-pointer flex items-center justify-between rounded-lg transition">
                            <div class="flex items-center gap-2.5">
                                <img src="${m.image}" alt="${m.name}" class="w-8 h-8 rounded-lg object-cover">
                                <div>
                                    <div class="text-xs font-bold text-slate-800">${m.name}</div>
                                    <div class="text-[10px] text-emerald-700 font-semibold">₹${m.variants[0].price} - ${m.variants[0].size}</div>
                                </div>
                            </div>
                            <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">15m</span>
                        </div>
                    `).join('');
                    dropdown.classList.remove('hidden');
                } else {
                    dropdown.classList.add('hidden');
                }
            }
        } else {
            if (clearBtn) clearBtn.classList.add('hidden');
            if (dropdown) dropdown.classList.add('hidden');
        }
        renderProducts();
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => performSearch(e.target.value));
    }
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => performSearch(e.target.value));
    }

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
        if (dropdown && !e.target.closest('#global-search-input') && !e.target.closest('#search-autocomplete-dropdown')) {
            dropdown.classList.add('hidden');
        }
        const megaMenu = document.getElementById('mega-category-menu');
        const megaBtn = document.getElementById('category-dropdown-btn');
        if (megaMenu && !e.target.closest('#mega-category-menu') && !e.target.closest('#category-dropdown-btn')) {
            megaMenu.classList.add('hidden');
        }
    });

    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Toast Notifications System
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';

    let icon = 'fa-solid fa-circle-info text-emerald-400';
    if (type === 'success') icon = 'fa-solid fa-circle-check text-emerald-400';
    if (type === 'error') icon = 'fa-solid fa-circle-exclamation text-rose-400';

    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
