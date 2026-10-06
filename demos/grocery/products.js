// VerdantBasket Product Catalog Database
// High-res curated aesthetic grocery products with variants, nutrition, and category taxonomy

const CATEGORIES = [
    {
        id: "all",
        name: "All Items",
        icon: "fa-solid fa-border-all",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
        count: "50+ Items"
    },
    {
        id: "fruits-vegetables",
        name: "Fruits & Vegetables",
        icon: "fa-solid fa-apple-whole",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
        count: "Farm Fresh"
    },
    {
        id: "dairy-bakery",
        name: "Dairy & Bakery",
        icon: "fa-solid fa-cheese",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
        count: "Daily Essentials"
    },
    {
        id: "staples-grains",
        name: "Staples & Grains",
        icon: "fa-solid fa-wheat-awn",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
        count: "100% Organic"
    },
    {
        id: "beverages",
        name: "Beverages & Juices",
        icon: "fa-solid fa-glass-water",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80",
        count: "Cold Pressed & Brews"
    },
    {
        id: "snacks-munchies",
        name: "Snacks & Munchies",
        icon: "fa-solid fa-cookie-bite",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80",
        count: "Artisanal & Healthy"
    },
    {
        id: "gourmet-organic",
        name: "Gourmet & Superfoods",
        icon: "fa-solid fa-seedling",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        count: "Premium Imports"
    },
    {
        id: "personal-care",
        name: "Personal & Home Care",
        icon: "fa-solid fa-spa",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
        count: "Natural & Eco"
    }
];

const PRODUCTS = [
    // Fruits & Vegetables
    {
        id: "prod-1",
        name: "Fresh Hass Avocados (Imported)",
        category: "fruits-vegetables",
        badge: "Bestseller",
        badgeColor: "emerald",
        rating: 4.9,
        reviewsCount: 428,
        deliveryTime: "12 mins",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&w=600&q=80"
        ],
        variants: [
            { size: "2 pcs (Approx 350g)", price: 179, originalPrice: 249 },
            { size: "4 pcs (Approx 700g)", price: 339, originalPrice: 480 }
        ],
        origin: "Farm Orchard, New Zealand",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "160 kcal", carbs: "8.5g", fats: "14.7g", protein: "2g" },
        description: "Rich, creamy, and nutty Hass Avocados hand-picked at peak ripeness. Perfect for artisan avocado toasts, guacamole, and keto smoothies.",
        storageTips: "Store at room temp until ripe, then refrigerate for up to 4 days."
    },
    {
        id: "prod-2",
        name: "Hydroponic English Strawberries",
        category: "fruits-vegetables",
        badge: "Fresh Arrival",
        badgeColor: "rose",
        rating: 4.8,
        reviewsCount: 312,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80"
        ],
        variants: [
            { size: "250g Box", price: 149, originalPrice: 199 },
            { size: "500g Pack", price: 279, originalPrice: 380 }
        ],
        origin: "Mahabaleshwar Estate Farms",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "32 kcal", carbs: "7.7g", fats: "0.3g", protein: "0.7g" },
        description: "Sweet, fragrant, pesticide-free ruby red strawberries grown in climate-controlled hydroponic greenhouses. Extra juicy and vitamin C rich.",
        storageTips: "Keep dry and refrigerated in original breathable packaging."
    },
    {
        id: "prod-3",
        name: "Crisp Organic Baby Spinach",
        category: "fruits-vegetables",
        badge: "Superfood",
        badgeColor: "green",
        rating: 4.7,
        reviewsCount: 189,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "200g Fresh Pack", price: 49, originalPrice: 75 },
            { size: "500g Value Pack", price: 99, originalPrice: 150 }
        ],
        origin: "Certified Organic Greens Valley",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "23 kcal", carbs: "3.6g", fats: "0.4g", protein: "2.9g" },
        description: "Triple-washed, tender baby spinach leaves rich in natural iron, folate, and antioxidants. Ready to toss into gourmet salads and detox drinks.",
        storageTips: "Store in vegetable crisper drawer with paper towel."
    },
    {
        id: "prod-4",
        name: "Heirloom Cherry Tomatoes (Vine Ripened)",
        category: "fruits-vegetables",
        badge: "25% OFF",
        badgeColor: "amber",
        rating: 4.8,
        reviewsCount: 220,
        deliveryTime: "12 mins",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "250g Punnet", price: 65, originalPrice: 89 },
            { size: "500g Pack", price: 119, originalPrice: 170 }
        ],
        origin: "Polyhouse Solan Valley",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "18 kcal", carbs: "3.9g", fats: "0.2g", protein: "0.9g" },
        description: "Sweet, bursting with flavor multi-colored vine cherry tomatoes. A vibrant addition to Italian pastas, burrata salads, and roast platters.",
        storageTips: "Store at room temperature to preserve rich natural sugars and aroma."
    },
    {
        id: "prod-5",
        name: "Organic Royal Gala Apples (Washington)",
        category: "fruits-vegetables",
        badge: "Crisp & Sweet",
        badgeColor: "rose",
        rating: 4.9,
        reviewsCount: 540,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "4 pcs (Approx 600g)", price: 185, originalPrice: 240 },
            { size: "1 kg (Approx 6-7 pcs)", price: 299, originalPrice: 390 }
        ],
        origin: "Washington Orchards",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "52 kcal", carbs: "14g", fats: "0.2g", protein: "0.3g" },
        description: "Crunchy, sweet, and aromatic Gala apples packed with dietary fiber and essential minerals. Wax-free and naturally harvested.",
        storageTips: "Refrigerate to preserve crisp snap and juice."
    },
    {
        id: "prod-6",
        name: "Exotic Japanese Enoki & Button Mushrooms",
        category: "fruits-vegetables",
        badge: "Chef's Choice",
        badgeColor: "indigo",
        rating: 4.6,
        reviewsCount: 145,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "200g Pack", price: 89, originalPrice: 120 },
            { size: "400g Gourmet Duo", price: 165, originalPrice: 230 }
        ],
        origin: "Cool Alpine Valley Cultivations",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "22 kcal", carbs: "3.3g", fats: "0.3g", protein: "3.1g" },
        description: "Delicate, umami-rich mushrooms ideal for ramen bowls, stir-fries, creamy soups, and continental grills.",
        storageTips: "Store in a brown paper bag in the refrigerator."
    },

    // Dairy & Bakery
    {
        id: "prod-7",
        name: "Pure Farm A2 Cow Milk (Glass Bottle)",
        category: "dairy-bakery",
        badge: "100% Pure A2",
        badgeColor: "emerald",
        rating: 4.9,
        reviewsCount: 680,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "1 Litre Glass Bottle", price: 85, originalPrice: 110 },
            { size: "2 Litre Pack (Pack of 2)", price: 160, originalPrice: 220 }
        ],
        origin: "Grass-Fed Gir Cow Dairy Farm",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "62 kcal / 100ml", carbs: "4.8g", fats: "3.6g", protein: "3.2g" },
        description: "Freshly drawn raw pasteurized A2 cow milk from ethically treated, free-grazing indigenous Gir cows. Non-homogenized with rich cream layer.",
        storageTips: "Boil before consumption and store chilled at 4°C."
    },
    {
        id: "prod-8",
        name: "Artisanal Sourdough Country Loaf",
        category: "dairy-bakery",
        badge: "Freshly Baked 5AM",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 390,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "400g Loaf", price: 120, originalPrice: 160 },
            { size: "800g Family Loaf", price: 210, originalPrice: 280 }
        ],
        origin: "Verdant Woodfired Bakery",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "210 kcal / 100g", carbs: "42g", fats: "1.2g", protein: "8g" },
        description: "Naturally fermented for 36 hours using slow wild starter. Crispy blistered golden crust with an airy, soft, open crumb.",
        storageTips: "Slice as needed. Store in a bread bag or freeze sliced for up to 1 month."
    },
    {
        id: "prod-9",
        name: "Organic Malai Paneer (Cream Cottage Cheese)",
        category: "dairy-bakery",
        badge: "Extra Soft",
        badgeColor: "green",
        rating: 4.8,
        reviewsCount: 510,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "200g Block", price: 95, originalPrice: 125 },
            { size: "500g Value Pack", price: 220, originalPrice: 290 }
        ],
        origin: "Heritage Dairy Co-op",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "265 kcal / 100g", carbs: "1.5g", fats: "20g", protein: "18g" },
        description: "Melt-in-mouth cottage cheese crafted from whole A2 farm milk with zero preservatives, starch, or chemicals. Super high protein.",
        storageTips: "Immerse in cold water in an airtight box and refrigerate."
    },
    {
        id: "prod-10",
        name: "Authentic Greek Yogurt - Alphonso Mango",
        category: "dairy-bakery",
        badge: "Probiotic Rich",
        badgeColor: "amber",
        rating: 4.7,
        reviewsCount: 275,
        deliveryTime: "12 mins",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "150g Cup", price: 65, originalPrice: 85 },
            { size: "400g Tub", price: 160, originalPrice: 210 }
        ],
        origin: "Artisan Creamery",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "110 kcal / 100g", carbs: "12g", fats: "3g", protein: "10g" },
        description: "Double strained thick Greek yogurt blended with real Ratnagiri Alphonso mango pulp. Packed with 10g of protein and live active cultures.",
        storageTips: "Keep refrigerated at 2°C - 5°C. Do not freeze."
    },
    {
        id: "prod-11",
        name: "Farm Fresh Free-Range Brown Eggs (Pack of 12)",
        category: "dairy-bakery",
        badge: "Omega-3 Rich",
        badgeColor: "rose",
        rating: 4.9,
        reviewsCount: 890,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "Pack of 6 Eggs", price: 75, originalPrice: 95 },
            { size: "Pack of 12 Eggs", price: 140, originalPrice: 180 },
            { size: "Pack of 30 Tray", price: 330, originalPrice: 420 }
        ],
        origin: "Sunlit Pastures Poultry",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "72 kcal / egg", carbs: "0.4g", fats: "4.8g", protein: "6.3g" },
        description: "Hens raised outdoors on open sunlit pastures with organic herbal feed. Golden orange yolks loaded with natural Omega-3 and Vitamin D.",
        storageTips: "Store in refrigerator pointed end down."
    },

    // Staples & Grains
    {
        id: "prod-12",
        name: "Aged Royal Daawat Basmati Rice (2 Years Aged)",
        category: "staples-grains",
        badge: "Extra Long Grain",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 620,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "1 kg Bag", price: 145, originalPrice: 190 },
            { size: "5 kg Cloth Bag", price: 680, originalPrice: 920 }
        ],
        origin: "Foothills of the Himalayas",
        isOrganic: false,
        isExpress: true,
        nutrition: { calories: "350 kcal / 100g", carbs: "78g", fats: "0.5g", protein: "7.5g" },
        description: "Pearlescent long slender grains aged naturally for 24 months to deliver exquisite floral aroma and non-sticky elongation.",
        storageTips: "Store in an airtight container in a dry pantry."
    },
    {
        id: "prod-13",
        name: "Cold Pressed Virgin Yellow Mustard Oil",
        category: "staples-grains",
        badge: "Wood Kachi Ghani",
        badgeColor: "amber",
        rating: 4.8,
        reviewsCount: 340,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "1 Litre Bottle", price: 185, originalPrice: 240 },
            { size: "5 Litre Can", price: 890, originalPrice: 1150 }
        ],
        origin: "Rajasthan Heritage Oil Mill",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "884 kcal / 100ml", carbs: "0g", fats: "100g", protein: "0g" },
        description: "Cold-pressed in traditional wooden Kolhu at low temperature to retain natural pungency, high smoke point, and heart-healthy MUFA.",
        storageTips: "Keep away from direct sunlight."
    },
    {
        id: "prod-14",
        name: "Organic Unpolished Toor Dal (Pigeon Pea)",
        category: "staples-grains",
        badge: "Zero Polish",
        badgeColor: "emerald",
        rating: 4.8,
        reviewsCount: 450,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "1 kg Pack", price: 155, originalPrice: 195 },
            { size: "2 kg Value Pack", price: 295, originalPrice: 380 }
        ],
        origin: "Gulbarga Organic Farmers Collective",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "343 kcal / 100g", carbs: "63g", fats: "1.5g", protein: "22g" },
        description: "Naturally grown, chemical-free and unpolished Toor Dal. Cooks rapidly with an authentic homely aroma and high natural protein.",
        storageTips: "Store in a cool, airtight glass jar."
    },
    {
        id: "prod-15",
        name: "Raw Wild Forest Organic Honey (Unprocessed)",
        category: "staples-grains",
        badge: "100% Raw & Pure",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 710,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "350g Jar", price: 280, originalPrice: 380 },
            { size: "500g Jar", price: 390, originalPrice: 520 }
        ],
        origin: "Sundarbans Biosphere Reserve",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "304 kcal / 100g", carbs: "82g", fats: "0g", protein: "0.3g" },
        description: "Direct from wild hives with live bee pollen and natural enzymes. Unpasteurized, unheated, zero added sugar or jaggery syrup.",
        storageTips: "Store at room temperature. Natural crystallization is a sign of purity."
    },
    {
        id: "prod-16",
        name: "Stoneground Sharbati Whole Wheat Atta",
        category: "staples-grains",
        badge: "Chakki Fresh",
        badgeColor: "emerald",
        rating: 4.8,
        reviewsCount: 530,
        deliveryTime: "20 mins",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "5 kg Bag", price: 275, originalPrice: 340 },
            { size: "10 kg Bag", price: 520, originalPrice: 660 }
        ],
        origin: "Sehore, Madhya Pradesh",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "340 kcal / 100g", carbs: "72g", fats: "1.7g", protein: "12g" },
        description: "Milled from golden MP Sharbati grains on slow traditional chakki stones to keep dietary bran and wheatgerm nutrients intact. Makes extra fluffy rotis.",
        storageTips: "Keep in a dry container with bay leaves."
    },

    // Beverages & Juices
    {
        id: "prod-17",
        name: "Raw Cold-Pressed Valencia Orange Juice (100% Pure)",
        category: "beverages",
        badge: "No Added Sugar",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 380,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "300ml Bottle", price: 99, originalPrice: 140 },
            { size: "1 Litre Carafe", price: 260, originalPrice: 350 }
        ],
        origin: "Sunshine Valley Citrus Groves",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "45 kcal / 100ml", carbs: "10g", fats: "0.1g", protein: "0.7g" },
        description: "Cold-press extracted within 2 hours of harvesting. Never heated, no concentrates, no added water, preservative-free pure vitamin powerhouse.",
        storageTips: "Keep chilled below 4°C. Shake well before sipping."
    },
    {
        id: "prod-18",
        name: "Organic Ceremonial Matcha Green Tea (Uji Japan)",
        category: "beverages",
        badge: "Premium Grade",
        badgeColor: "emerald",
        rating: 4.9,
        reviewsCount: 195,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "50g Tin", price: 590, originalPrice: 799 },
            { size: "100g Tin", price: 1050, originalPrice: 1499 }
        ],
        origin: "Uji, Kyoto, Japan",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "3 kcal / serving", carbs: "0.4g", fats: "0g", protein: "0.3g" },
        description: "First harvest shade-grown stoneground green tea leaves from Kyoto. Rich in L-theanine and EGCG antioxidants for sustained clean focus.",
        storageTips: "Seal tightly and store in the refrigerator."
    },
    {
        id: "prod-19",
        name: "Artisan Cold Brew Coffee Concentrate (Vanilla Bean)",
        category: "beverages",
        badge: "Brewed 24 Hrs",
        badgeColor: "indigo",
        rating: 4.8,
        reviewsCount: 290,
        deliveryTime: "12 mins",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "500ml Bottle (Makes 6 Cups)", price: 240, originalPrice: 320 },
            { size: "1 Litre Party Pack", price: 440, originalPrice: 590 }
        ],
        origin: "Chikmagalur Single Origin Arabica",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "5 kcal / serving", carbs: "0.5g", fats: "0g", protein: "0.2g" },
        description: "Smooth, low-acidity cold brew steeped slowly for 24 hours with Madagascar bourbon vanilla pods. Mix with cold milk or tonic.",
        storageTips: "Keep chilled. Consume within 2 weeks of opening."
    },
    {
        id: "prod-20",
        name: "Tender Coconut Water (Freshly Bottled)",
        category: "beverages",
        badge: "Natural Electrolytes",
        badgeColor: "emerald",
        rating: 4.9,
        reviewsCount: 820,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "1 pc Natural Coconut (Cut & Ready)", price: 60, originalPrice: 75 },
            { size: "Pack of 4 Bottles (300ml each)", price: 199, originalPrice: 260 }
        ],
        origin: "Pollachi Coastal Farms",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "19 kcal / 100ml", carbs: "3.7g", potassium: "250mg", protein: "0.7g" },
        description: "Sweet, cooling natural hydration loaded with essential potassium, magnesium, and enzymes. Pure, raw and unadulterated.",
        storageTips: "Serve ice cold."
    },

    // Snacks & Munchies
    {
        id: "prod-21",
        name: "Roasted California Almonds & Cashews Mix (Himalayan Salt)",
        category: "snacks-munchies",
        badge: "Protein Crunch",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 440,
        deliveryTime: "12 mins",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "250g Jar", price: 320, originalPrice: 420 },
            { size: "500g Jar", price: 590, originalPrice: 790 }
        ],
        origin: "California & Mangalore Estates",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "579 kcal / 100g", carbs: "21g", fats: "49g", protein: "21g" },
        description: "Slow-roasted jumbo dry fruits tossed with mineral-rich pink Himalayan crystal salt. Zero oil roasting.",
        storageTips: "Keep in an airtight jar in a cool, dry place."
    },
    {
        id: "prod-22",
        name: "Artisan Dark Chocolate 75% Single Estate",
        category: "snacks-munchies",
        badge: "Bean-to-Bar",
        badgeColor: "rose",
        rating: 4.9,
        reviewsCount: 310,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "80g Bar", price: 175, originalPrice: 230 },
            { size: "Pack of 3 Bars Assorted", price: 475, originalPrice: 650 }
        ],
        origin: "Idukki Organic Cacao Plantations",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "580 kcal / 100g", carbs: "35g", fats: "43g", protein: "8g" },
        description: "Crafted from hand-sorted Idukki cacao beans and organic raw cane sugar. Rich notes of red berries and roasted hazelnuts.",
        storageTips: "Store in a cool spot (18°C - 20°C)."
    },
    {
        id: "prod-23",
        name: "Popped Makhana / Foxnuts (Pari-Pari & Mint Herb)",
        category: "snacks-munchies",
        badge: "Guilt-Free 0% Transfat",
        badgeColor: "green",
        rating: 4.7,
        reviewsCount: 260,
        deliveryTime: "10 mins",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "100g Pack (Peri-Peri)", price: 95, originalPrice: 130 },
            { size: "Combo of 3 Flavors (300g)", price: 260, originalPrice: 375 }
        ],
        origin: "Mithila Lotus Ponds, Bihar",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "350 kcal / 100g", carbs: "76g", fats: "0.5g", protein: "9.7g" },
        description: "Super crispy roasted lotus seeds seasoned with zesty herbs and spices. High fiber, calcium, and low glycemic index snack.",
        storageTips: "Reseal ziplock immediately to prevent sogginess."
    },

    // Gourmet & Superfoods
    {
        id: "prod-24",
        name: "Organic White Quinoa & Chia Seeds Duo Pack",
        category: "gourmet-organic",
        badge: "Superfood Combo",
        badgeColor: "emerald",
        rating: 4.8,
        reviewsCount: 380,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "500g Quinoa + 250g Chia", price: 340, originalPrice: 480 },
            { size: "1kg Quinoa + 500g Chia", price: 620, originalPrice: 890 }
        ],
        origin: "Andean Valley & Certified Farms",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "368 kcal / 100g", carbs: "64g", fiber: "10g", protein: "14g" },
        description: "Rich in all 9 essential amino acids, dietary fiber, and plant-based omega-3. Perfect replacement for polished rice in healthy meal prep.",
        storageTips: "Keep in a dry air-sealed container."
    },
    {
        id: "prod-25",
        name: "Authentic Extra Virgin Olive Oil (First Cold Pressed)",
        category: "gourmet-organic",
        badge: "Acidity < 0.2%",
        badgeColor: "amber",
        rating: 4.9,
        reviewsCount: 510,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "500ml Dark Bottle", price: 540, originalPrice: 720 },
            { size: "1 Litre Bottle", price: 980, originalPrice: 1350 }
        ],
        origin: "Andalusia, Spain",
        isOrganic: true,
        isExpress: true,
        nutrition: { calories: "884 kcal / 100ml", carbs: "0g", fats: "100g", protein: "0g" },
        description: "Estate grown Picual & Arbequina olives pressed within 6 hours. Fruity aroma with a peppery finish, perfect for dressings and pestos.",
        storageTips: "Store in a dark cupboard away from oven heat."
    },

    // Personal & Home Care
    {
        id: "prod-26",
        name: "Cold-Processed Lavender & Tea Tree Herbal Soap",
        category: "personal-care",
        badge: "Handmade Eco-Luxe",
        badgeColor: "indigo",
        rating: 4.8,
        reviewsCount: 190,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1607006483702-326402488349?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "125g Bar", price: 135, originalPrice: 180 },
            { size: "Set of 3 Assorted Bars", price: 360, originalPrice: 500 }
        ],
        origin: "Himalayan Botanical Apothecary",
        isOrganic: true,
        isExpress: true,
        nutrition: null,
        description: "Enriched with pure French lavender essential oil, Australian tea tree, shea butter, and virgin coconut oil. 100% SLS and paraben free.",
        storageTips: "Use a draining soap dish to extend bar life."
    },
    {
        id: "prod-27",
        name: "Plant-Based Organic Dishwash Gel (Citrus Lemon)",
        category: "personal-care",
        badge: "Bio-Enzymatic",
        badgeColor: "emerald",
        rating: 4.7,
        reviewsCount: 310,
        deliveryTime: "15 mins",
        image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
        variants: [
            { size: "500ml Pump Bottle", price: 165, originalPrice: 220 },
            { size: "2 Litre Refill Can", price: 460, originalPrice: 650 }
        ],
        origin: "EcoClean Labs",
        isOrganic: true,
        isExpress: true,
        nutrition: null,
        description: "Tough on grease yet gentle on hands. Infused with natural citrus peels and neem extracts. 100% biodegradable and non-toxic.",
        storageTips: "Store in a cool dry space."
    }
];

// Curated Recipe / Value Bundles
const RECIPE_BUNDLES = [
    {
        id: "bundle-1",
        name: "Avocado & Sourdough Breakfast Kit",
        tag: "Morning Gourmet",
        tagColor: "amber",
        savings: "Save ₹70",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        itemsText: "2x Hass Avocados + 1x Artisanal Sourdough + 1x Vine Tomatoes",
        price: 364,
        originalPrice: 434,
        itemIds: ["prod-1", "prod-8", "prod-4"],
        description: "Everything you need for a café-quality breakfast at home in under 10 minutes."
    },
    {
        id: "bundle-2",
        name: "Green Goddess Immunity & Detox Kit",
        tag: "Clean Eating",
        tagColor: "emerald",
        savings: "Save ₹85",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80",
        itemsText: "Baby Spinach + Valencia Orange Juice + Raw Forest Honey",
        price: 428,
        originalPrice: 513,
        itemIds: ["prod-3", "prod-17", "prod-15"],
        description: "Supercharged greens, cold-pressed citrus, and unprocessed raw honey for total vitality."
    },
    {
        id: "bundle-3",
        name: "Farm Fresh High-Protein Dairy Box",
        tag: "Protein Boost",
        tagColor: "indigo",
        savings: "Save ₹65",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        itemsText: "1L A2 Gir Cow Milk + 200g Malai Paneer + 12 Brown Eggs",
        price: 320,
        originalPrice: 385,
        itemIds: ["prod-7", "prod-9", "prod-11"],
        description: "Pure A2 goodness, velvety paneer, and pasture-raised eggs delivering 45g+ daily protein."
    }
];

// Coupons Available
const PROMO_COUPONS = [
    {
        code: "FRESH15",
        discountType: "percent",
        discountValue: 15,
        minOrder: 399,
        description: "Get 15% OFF on all fresh fruits, veggies & grocery orders above ₹399."
    },
    {
        code: "VERDANT50",
        discountType: "flat",
        discountValue: 50,
        minOrder: 499,
        description: "Flat ₹50 Instant discount on farm fresh cart value above ₹499."
    },
    {
        code: "FREEDEL",
        discountType: "free_delivery",
        discountValue: 0,
        minOrder: 199,
        description: "Enjoy 100% Free Superfast 15-Minute Express Delivery on orders ₹199+."
    }
];

// Testimonials & Customer Reviews (20+ Verified Buyers)
const TESTIMONIALS = [
    {
        id: "rev-1",
        name: "Pooja Sharma",
        location: "Bandra West, Mumbai",
        itemOrdered: "Hass Avocados & A2 Gir Cow Milk",
        category: "fruits-vegetables",
        comment: "The Hass Avocados and A2 Milk arrive within 12 minutes! The packaging is completely eco-friendly and the produce is even fresher than physical luxury supermarkets.",
        rating: 5,
        deliveryTime: "11 mins delivery",
        verified: true,
        date: "Yesterday",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-2",
        name: "Rohit Malhotra",
        location: "Koregaon Park, Pune",
        itemOrdered: "Avocado & Sourdough Breakfast Kit",
        category: "dairy-bakery",
        comment: "Customer care at 8283945753 resolved my custom delivery slot query within 2 rings on WhatsApp! Truly unmatched service, warm sourdough, and crispy greens.",
        rating: 5,
        deliveryTime: "14 mins delivery",
        verified: true,
        date: "2 days ago",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-3",
        name: "Ananya Iyer",
        location: "Indiranagar, Bengaluru",
        itemOrdered: "Hydroponic English Strawberries",
        category: "fruits-vegetables",
        comment: "The Hydroponic Strawberries and Greek Yogurt combo is our weekend family staple now. Best online grocery shopping experience with zero bruised fruit.",
        rating: 5,
        deliveryTime: "9 mins delivery",
        verified: true,
        date: "3 days ago",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-4",
        name: "Vikram Sengupta",
        location: "Cyber City, Gurugram",
        itemOrdered: "Cold-Pressed Valencia Orange Juice",
        category: "beverages",
        comment: "The cold-pressed Valencia orange juice is 100% pure with zero added sugar. You can genuinely taste the difference from typical shelf brands. Fast delivery!",
        rating: 5,
        deliveryTime: "13 mins delivery",
        verified: true,
        date: "4 days ago",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-5",
        name: "Dr. Meenakshi Sundaram",
        location: "Jubilee Hills, Hyderabad",
        itemOrdered: "Organic Sharbati Atta & Forest Honey",
        category: "staples-grains",
        comment: "As a nutritionist, I am very particular about pesticide-free food. VerdantBasket's unpolished dals and raw forest honey are 100% authentic and pure.",
        rating: 5,
        deliveryTime: "15 mins delivery",
        verified: true,
        date: "5 days ago",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-6",
        name: "Karan Mehta",
        location: "Alkapuri, Vadodara",
        itemOrdered: "Organic Malai Paneer & Brown Eggs",
        category: "dairy-bakery",
        comment: "The Malai Paneer is so soft it literally melts in the pan. The brown eggs have rich golden yolks. Super reliable 15-minute express delivery!",
        rating: 5,
        deliveryTime: "10 mins delivery",
        verified: true,
        date: "6 days ago",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-7",
        name: "Sneha Kapur",
        location: "Salt Lake, Kolkata",
        itemOrdered: "Artisan Dark Chocolate 75%",
        category: "snacks-munchies",
        comment: "The bean-to-bar dark chocolate and roasted nuts are gourmet luxury grade. Ordering via WhatsApp using helpline 8283945753 is super seamless.",
        rating: 5,
        deliveryTime: "12 mins delivery",
        verified: true,
        date: "1 week ago",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-8",
        name: "Arjun Nambiar",
        location: "Panampilly Nagar, Kochi",
        itemOrdered: "Green Goddess Detox Bundle",
        category: "beverages",
        comment: "The detox kit saves so much prep time in the mornings. Spinach is crisp, baby leaves are triple-washed. 10/10 recommend to everyone.",
        rating: 5,
        deliveryTime: "11 mins delivery",
        verified: true,
        date: "1 week ago",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-9",
        name: "Tanvi Deshmukh",
        location: "Viman Nagar, Pune",
        itemOrdered: "Organic Baby Spinach & Vine Tomatoes",
        category: "fruits-vegetables",
        comment: "The freshness of the heirloom tomatoes is incredible! Sweet, juicy, and vine-ripened. Zero plastic packaging is such a relief.",
        rating: 5,
        deliveryTime: "8 mins delivery",
        verified: true,
        date: "1 week ago",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-10",
        name: "Aditya Khurana",
        location: "Sector 14, Chandigarh",
        itemOrdered: "Artisanal Sourdough & Cold Brew Coffee",
        category: "dairy-bakery",
        comment: "Fresh bread delivered hot and crispy at 7:00 AM before our morning team meetings. The Cold Brew concentrate has rich notes of Madagascar vanilla.",
        rating: 5,
        deliveryTime: "12 mins delivery",
        verified: true,
        date: "2 weeks ago",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-11",
        name: "Rituja Singhania",
        location: "C-Scheme, Jaipur",
        itemOrdered: "Cold Pressed Virgin Mustard Oil & Toor Dal",
        category: "staples-grains",
        comment: "Traditional wooden Kolhu yellow mustard oil has that authentic pungency our grandmother's recipes required. Super high quality staples.",
        rating: 5,
        deliveryTime: "14 mins delivery",
        verified: true,
        date: "2 weeks ago",
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-12",
        name: "Devendra Rathore",
        location: "Satellite, Ahmedabad",
        itemOrdered: "Aged Basmati Rice & Raw Honey",
        category: "staples-grains",
        comment: "The 2-year aged Basmati rice cooked so fragrant and elongated. The helpline 8283945753 assisted me promptly with a festival bulk order.",
        rating: 5,
        deliveryTime: "15 mins delivery",
        verified: true,
        date: "2 weeks ago",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-13",
        name: "Shruti Hegde",
        location: "Malleshwaram, Bengaluru",
        itemOrdered: "Tender Coconut Water & Greek Yogurt",
        category: "beverages",
        comment: "Freshly cut natural tender coconuts delivered in 10 minutes flat on a hot afternoon. Pure bliss and natural electrolytes!",
        rating: 5,
        deliveryTime: "10 mins delivery",
        verified: true,
        date: "3 weeks ago",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-14",
        name: "Harsh Vardhan",
        location: "Gomti Nagar, Lucknow",
        itemOrdered: "Roasted Almonds & Foxnuts (Makhana)",
        category: "snacks-munchies",
        comment: "Crunchy peri-peri makhana and jumbo slow-roasted almonds. Perfect guilt-free evening snack for office work.",
        rating: 5,
        deliveryTime: "13 mins delivery",
        verified: true,
        date: "3 weeks ago",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-15",
        name: "Natasha Fernandes",
        location: "Miramar, Panaji, Goa",
        itemOrdered: "Extra Virgin Olive Oil & Organic Quinoa",
        category: "gourmet-organic",
        comment: "The extra virgin olive oil has a rich peppery aroma. Making Mediterranean salads with their quinoa and heirloom tomatoes is a daily joy.",
        rating: 5,
        deliveryTime: "11 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-16",
        name: "Sameer Joshi",
        location: "Pashan, Pune",
        itemOrdered: "Pure A2 Gir Cow Milk (Glass Bottle)",
        category: "dairy-bakery",
        comment: "Finding genuine glass bottle A2 milk with a thick cream layer delivered daily before 6:30 AM is a game changer for our kids.",
        rating: 5,
        deliveryTime: "9 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-17",
        name: "Farhan Qureshi",
        location: "Banjara Hills, Hyderabad",
        itemOrdered: "Exotic Japanese Mushrooms & Gala Apples",
        category: "fruits-vegetables",
        comment: "Enoki and Button mushrooms are so fresh and firm. Ideal for gourmet continental stir fries. Rider arrived in just 11 minutes.",
        rating: 5,
        deliveryTime: "11 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-18",
        name: "Pallavi Ghosh",
        location: "New Town, Kolkata",
        itemOrdered: "Ceremonial Matcha Green Tea",
        category: "beverages",
        comment: "Authentic Kyoto shade-grown Matcha! Vibrantly green and mixes smoothly with oat milk. Highly recommend VerdantBasket.",
        rating: 5,
        deliveryTime: "14 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-19",
        name: "Naveen Reddy",
        location: "Whitefield, Bengaluru",
        itemOrdered: "Handmade Lavender Soap & Eco Dishwash",
        category: "personal-care",
        comment: "Plant-based citrus dishwash gel cuts oil effortlessly without drying hands. Organic soap smells like real fresh French lavender fields.",
        rating: 5,
        deliveryTime: "12 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: "rev-20",
        name: "Simran Kaur",
        location: "Model Town, Ludhiana",
        itemOrdered: "High-Protein Dairy Box (Paneer & Eggs)",
        category: "dairy-bakery",
        comment: "1-Click high protein combo has made my gym meal prep so easy. 100% genuine farm products with zero chemical aftertaste.",
        rating: 5,
        deliveryTime: "10 mins delivery",
        verified: true,
        date: "1 month ago",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80"
    }
];


