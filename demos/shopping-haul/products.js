const PRODUCTS = [
  {
    id: 'top-1',
    name: 'Rosalie Satin Corset Top',
    category: 'Tops',
    vibe: 'Coquette & Bows',
    price: 899,
    originalPrice: 1499,
    discount: '40% OFF',
    rating: 4.9,
    reviewsCount: 128,
    isBestseller: true,
    isTrending: true,
    description: 'Ultra-romantic satin corset top featuring a sweetheart neck, structural boning for a sculpted silhouette, and a delicate back satin ribbon tie-up.',
    fabric: '95% Premium Satin Polyester, 5% Elastane',
    fit: 'Sculpted Corset Fit (True to size)',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Blush Pink', hex: '#FFC0CB' },
      { name: 'Champagne Cream', hex: '#F5E6D3' },
      { name: 'Dusky Rose', hex: '#D8A0A6' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: { XS: 3, S: 8, M: 5, L: 2 },
    tags: ['Coquette', 'Corset', 'Party Wear', 'Date Night']
  },
  {
    id: 'top-2',
    name: 'Daisy Dreams Floral Milkmaid Top',
    category: 'Tops',
    vibe: 'Soft Girl',
    price: 699,
    originalPrice: 1199,
    discount: '42% OFF',
    rating: 4.8,
    reviewsCount: 94,
    isBestseller: true,
    isTrending: false,
    description: 'Sweet cottagecore milkmaid top with dainty wildflower print, elasticated puff sleeves, and adjustable drawstring keyhole neckline.',
    fabric: '100% Breathable Viscose Cotton',
    fit: 'Relaxed Bust with Elastic Waist',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Wildflower Pink', hex: '#FFB6C1' },
      { name: 'Lilac Mist', hex: '#E6E6FA' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 10, M: 12, L: 6, XL: 4 },
    tags: ['Soft Girl', 'Cottagecore', 'Floral', 'Summer']
  },
  {
    id: 'top-3',
    name: 'Y2K Shimmer Ribbed Halter',
    category: 'Tops',
    vibe: 'Y2K Baddie',
    price: 599,
    originalPrice: 999,
    discount: '40% OFF',
    rating: 4.7,
    reviewsCount: 82,
    isBestseller: false,
    isTrending: true,
    description: 'Retro 2000s halter crop top in a subtle metallic shimmer rib knit. Backless neck tie with cute O-ring front accent.',
    fabric: 'Ribbed Knit Poly-Cotton Blend',
    fit: 'Form-fitting Stretchy Crop',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Baby Pink Shimmer', hex: '#FFB3BA' },
      { name: 'Ice Blue Metallic', hex: '#BAE1FF' }
    ],
    sizes: ['XS', 'S', 'M'],
    stock: { XS: 4, S: 7, M: 2 },
    tags: ['Y2K', 'Halter Top', 'Clubbing', 'Shimmer']
  },
  {
    id: 'acc-1',
    name: 'Coquette Satin Ribbon Bow Clip Trio',
    category: 'Accessories',
    vibe: 'Coquette & Bows',
    price: 399,
    originalPrice: 699,
    discount: '43% OFF',
    rating: 5.0,
    reviewsCount: 210,
    isBestseller: true,
    isTrending: true,
    description: 'Set of 3 handmade silk satin hair bows with French alligator clips. Features long flowing tails for that iconic Pinterest coquette hair vibe.',
    fabric: '100% Double-Faced Mulberry Satin',
    fit: 'Universal Clip',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pastel Trio (Pink, Ivory, Rose)', hex: '#FFD1DC' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 25 },
    tags: ['Hair Accessories', 'Bows', 'Coquette', 'Pinterest Viral']
  },
  {
    id: 'top-4',
    name: 'Seraphina Scallop Lace Cami',
    category: 'Tops',
    vibe: 'Clean Girl',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    rating: 4.9,
    reviewsCount: 165,
    isBestseller: true,
    isTrending: false,
    description: 'Essential soft rib cotton camisole with delicate floral lace trim along the neckline and cute tiny center satin bow.',
    fabric: '95% Soft Organic Cotton, 5% Elastane',
    fit: 'Body-hugging stretch',
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vanilla Cream', hex: '#FFFDD0' },
      { name: 'Soft Pink', hex: '#FFE4E1' },
      { name: 'Sky Blue', hex: '#E0FFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: { XS: 5, S: 14, M: 18, L: 8, XL: 6 },
    tags: ['Basics', 'Lace Cami', 'Clean Girl', 'Layering']
  },
  {
    id: 'acc-2',
    name: 'Freshwater Pearl & Bow Choker',
    category: 'Accessories',
    vibe: 'Coquette & Bows',
    price: 449,
    originalPrice: 799,
    discount: '44% OFF',
    rating: 4.8,
    reviewsCount: 76,
    isBestseller: false,
    isTrending: true,
    description: 'Elegant aesthetic choker crafted with real baroque mini pearls and a 14k rose gold plated bow centerpiece.',
    fabric: 'Freshwater Cultured Pearls, Rose Gold Alloy',
    fit: 'Adjustable Chain (14 - 17 inches)',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pearl & Rose Gold', hex: '#FDFBF7' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 18 },
    tags: ['Jewelry', 'Pearls', 'Necklace', 'Chic']
  },
  {
    id: 'top-5',
    name: 'Cherry Blossom Tie-Front Cardigan',
    category: 'Tops',
    vibe: 'Soft Girl',
    price: 799,
    originalPrice: 1299,
    discount: '38% OFF',
    rating: 4.7,
    reviewsCount: 89,
    isBestseller: false,
    isTrending: true,
    description: 'Sheer pointelle knit crop cardigan with double ribbon front tie closures and lettuce ruffle hem.',
    fabric: 'Soft Viscose Sheer Knit',
    fit: 'Semi-Sheer Relaxed Crop',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sakura Pink', hex: '#FFC0CB' },
      { name: 'Cloud White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { S: 6, M: 9, L: 3 },
    tags: ['Cardigan', 'Tie Front', 'Layering', 'Cute']
  },
  {
    id: 'acc-3',
    name: 'Aesthetic Canvas Tote "More Espresso"',
    category: 'Accessories',
    vibe: 'Clean Girl',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    rating: 4.9,
    reviewsCount: 142,
    isBestseller: true,
    isTrending: true,
    description: 'Heavyweight organic cotton tote featuring aesthetic pastel pink typography. Perfect for books, laptop, or coffee dates!',
    fabric: '100% Heavy 12oz Organic Cotton Canvas',
    fit: 'Spacious (15 x 16 inches + Inner Pocket)',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cream & Rose Ink', hex: '#FAF9F6' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 30 },
    tags: ['Tote Bag', 'Aesthetic', 'Coffee Girl', 'Pinterest']
  },
  {
    id: 'top-6',
    name: 'Angel Wings Off-Shoulder Ruched Top',
    category: 'Tops',
    vibe: 'Soft Girl',
    price: 749,
    originalPrice: 1199,
    discount: '37% OFF',
    rating: 4.8,
    reviewsCount: 67,
    isBestseller: false,
    isTrending: false,
    description: 'Ethereal off-shoulder top featuring front ruching with self-tie string accents and romantic bell sleeves.',
    fabric: 'Double-Layered Modal Jersey',
    fit: 'Stretch Fitted Bust',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Soft Lavender', hex: '#E6E6FA' },
      { name: 'Blush Pink', hex: '#FFB6C1' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { S: 5, M: 7, L: 4 },
    tags: ['Off-shoulder', 'Ruched', 'Soft Girl', 'Romantic']
  },
  {
    id: 'acc-4',
    name: 'Retro Y2K Oval Tinted Sunglasses',
    category: 'Accessories',
    vibe: 'Y2K Baddie',
    price: 549,
    originalPrice: 899,
    discount: '38% OFF',
    rating: 4.9,
    reviewsCount: 115,
    isBestseller: true,
    isTrending: true,
    description: 'Statement rimless oval sunglasses with rose pink gradient lenses and tiny star charm temple detailing.',
    fabric: 'UV400 Polycarbonate Lenses, Light Alloy Frame',
    fit: 'Universal Chic Fit',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Rose Pink Gradient', hex: '#FFB6C1' },
      { name: 'Honey Amber', hex: '#FFBF00' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 14 },
    tags: ['Sunglasses', 'Y2K', 'Baddie', 'Summer']
  },
  {
    id: 'top-7',
    name: 'Barbiecore Tweed Cropped Vest Top',
    category: 'Tops',
    vibe: 'Party Glam',
    price: 999,
    originalPrice: 1699,
    discount: '41% OFF',
    rating: 5.0,
    reviewsCount: 52,
    isBestseller: false,
    isTrending: true,
    description: 'High-fashion houndstooth tweed cropped vest top embellished with ornate faux pearl buttons and metallic gold thread accents.',
    fabric: 'Woven Tweed Cotton Blend with Satin Lining',
    fit: 'Tailored Cropped Structure',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Magenta Tweed', hex: '#FF007F' },
      { name: 'Ivory Gold Tweed', hex: '#FFFDD0' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { S: 4, M: 3, L: 2 },
    tags: ['Tweed', 'Vest', 'Barbiecore', 'Party']
  },
  {
    id: 'acc-5',
    name: 'Bows & Hearts Beaded Phone Strap',
    category: 'Accessories',
    vibe: 'Coquette & Bows',
    price: 299,
    originalPrice: 499,
    discount: '40% OFF',
    rating: 4.8,
    reviewsCount: 88,
    isBestseller: false,
    isTrending: true,
    description: 'Adorable wrist phone strap beaded with acrylic hearts, pearls, and pastel bow charms. Keeps your phone safe in style!',
    fabric: 'Reinforced Nylon Cord, Glass & Resin Beads',
    fit: 'Universal Phone Case Lanyard Loop',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pink Bows & Pearls', hex: '#FFC0CB' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 40 },
    tags: ['Phone Strap', 'Accessories', 'Cute', 'Beaded']
  },
  {
    id: 'top-8',
    name: 'Sweetheart Organza Sleeve Crop',
    category: 'Tops',
    vibe: 'Coquette & Bows',
    price: 849,
    originalPrice: 1399,
    discount: '39% OFF',
    rating: 4.9,
    reviewsCount: 91,
    isBestseller: true,
    isTrending: true,
    description: 'Chic square neck ribbed bodycon top featuring dreamy voluminous sheer organza puff sleeves.',
    fabric: 'Knit Ribbed Cotton Body, Organza Sleeves',
    fit: 'Snug Fit Body with Dramatic Sleeves',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Milk White', hex: '#FFFFFF' },
      { name: 'Dusky Rose', hex: '#C08081' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: { XS: 2, S: 8, M: 6, L: 3 },
    tags: ['Organza', 'Puff Sleeves', 'Sweetheart', 'Glam']
  },
  {
    id: 'top-9',
    name: 'Pastel Plaid Tube Crop Top',
    category: 'Tops',
    vibe: 'Y2K Baddie',
    price: 529,
    originalPrice: 899,
    discount: '41% OFF',
    rating: 4.6,
    reviewsCount: 48,
    isBestseller: false,
    isTrending: false,
    description: 'Strapless tube crop top in a stretchy soft pastel pink gingham check. Features non-slip silicone band.',
    fabric: 'Stretchy Woven Poly Blend',
    fit: 'Strapless Stay-put Fit',
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pink Plaid', hex: '#FFB6C1' },
      { name: 'Mint Plaid', hex: '#98FF98' }
    ],
    sizes: ['XS', 'S', 'M'],
    stock: { XS: 3, S: 5, M: 4 },
    tags: ['Tube Top', 'Plaid', 'Y2K', 'Summer']
  },
  {
    id: 'acc-6',
    name: 'Quilted Puffer Heart Vanity Pouch',
    category: 'Accessories',
    vibe: 'Soft Girl',
    price: 399,
    originalPrice: 699,
    discount: '43% OFF',
    rating: 5.0,
    reviewsCount: 167,
    isBestseller: true,
    isTrending: true,
    description: 'Cloud-soft quilted puffer makeup bag stitched with adorable heart embroidery. Gold zipper with pearl puller.',
    fabric: 'Water-Resistant Soft Nylon with Cotton Fill',
    fit: 'Compact & Spacious (7.5 x 5 x 4 inches)',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Blush Pink Puffer', hex: '#FFC0CB' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 22 },
    tags: ['Makeup Bag', 'Puffer', 'Hearts', 'Travel']
  },
  {
    id: 'top-10',
    name: 'Aesthetic "Self Care Club" Graphic Tee',
    category: 'Tops',
    vibe: 'Clean Girl',
    price: 699,
    originalPrice: 1099,
    discount: '36% OFF',
    rating: 4.9,
    reviewsCount: 104,
    isBestseller: false,
    isTrending: true,
    description: 'Heavyweight vintage washed oversized tee with aesthetic pastel pink puff-printed back graphics.',
    fabric: '100% 240 GSM Heavy Cotton',
    fit: 'Relaxed Streetwear Oversized',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Washed Rose', hex: '#D8A0A6' },
      { name: 'Cream Oatmeal', hex: '#FAF5EF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 8, M: 11, L: 9, XL: 5 },
    tags: ['Graphic Tee', 'Oversized', 'Streetwear', 'Clean Girl']
  },
  // NEW VIRAL TRENDY PRODUCTS ADDED
  {
    id: 'top-11',
    name: 'Balletcore Cross Wrap Tie Crop',
    category: 'Tops',
    vibe: 'Soft Girl',
    price: 729,
    originalPrice: 1199,
    discount: '39% OFF',
    rating: 4.9,
    reviewsCount: 88,
    isBestseller: true,
    isTrending: true,
    description: 'Trendy balletcore wrap crop top with long ribbon waist ties that wrap around the waist twice for a flattering ballerina silhouette.',
    fabric: 'Soft Rayon Elastane Jersey',
    fit: 'Adjustable Wrap Fit',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Ballet Slipper Pink', hex: '#FFC0CB' },
      { name: 'Alabaster White', hex: '#F8F9FA' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: { XS: 4, S: 9, M: 7, L: 3 },
    tags: ['Balletcore', 'Wrap Top', 'Dance', 'Pinterest Viral']
  },
  {
    id: 'top-12',
    name: 'Y2K Star Patch Denim Corset',
    category: 'Tops',
    vibe: 'Y2K Baddie',
    price: 949,
    originalPrice: 1599,
    discount: '40% OFF',
    rating: 4.8,
    reviewsCount: 71,
    isBestseller: false,
    isTrending: true,
    description: 'Vintage washed light denim corset top featuring cute frayed star appliqués and silver zipper front.',
    fabric: '100% Cotton Stretchy Denim',
    fit: 'Structured Snug Fit',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Light Wash', hex: '#ADD8E6' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: { XS: 2, S: 6, M: 5, L: 1 },
    tags: ['Denim', 'Corset', 'Star Patch', 'Y2K']
  },
  {
    id: 'acc-7',
    name: 'Silver Bow Baguette Mini Shoulder Bag',
    category: 'Accessories',
    vibe: 'Coquette & Bows',
    price: 899,
    originalPrice: 1499,
    discount: '40% OFF',
    rating: 5.0,
    reviewsCount: 156,
    isBestseller: true,
    isTrending: true,
    description: 'Aesthetic Y2K mini baguette purse in metallic silver faux leather adorned with a structured front bow charm.',
    fabric: 'Vegan Metallic Leather, Silver Hardware',
    fit: 'Compact Shoulder Bag (9 x 5 inches)',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Metallic Silver', hex: '#C0C0C0' },
      { name: 'Metallic Pink', hex: '#FF69B4' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 12 },
    tags: ['Purse', 'Baguette Bag', 'Silver', 'Coquette']
  },
  {
    id: 'acc-8',
    name: 'Glitter Star Hair Clip Set (6 Pcs)',
    category: 'Accessories',
    vibe: 'Y2K Baddie',
    price: 349,
    originalPrice: 599,
    discount: '41% OFF',
    rating: 4.9,
    reviewsCount: 195,
    isBestseller: true,
    isTrending: true,
    description: 'Set of 6 sparkly glitter star snap hair clips in iridescent pink, purple, and silver.',
    fabric: 'Resin & Alloy Snap Clips',
    fit: 'Universal Snap',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sparkle Mix', hex: '#FFB6C1' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 35 },
    tags: ['Hair Clips', 'Stars', 'Glitter', 'Y2K']
  },
  {
    id: 'top-13',
    name: 'Strawberry Shortcake Puff Sleeve Crop',
    category: 'Tops',
    vibe: 'Soft Girl',
    price: 649,
    originalPrice: 1099,
    discount: '41% OFF',
    rating: 4.7,
    reviewsCount: 63,
    isBestseller: false,
    isTrending: true,
    description: 'Adorable cottagecore crop top with embroidered mini strawberry motifs and ruffled sweetheart neck.',
    fabric: 'Soft Cotton Seersucker',
    fit: 'Smocked Back Stretchy Fit',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pink Strawberry', hex: '#FFB6C1' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { S: 7, M: 8, L: 4 },
    tags: ['Strawberry', 'Cottagecore', 'Puff Sleeve']
  },
  {
    id: 'acc-9',
    name: 'Pearl & Bow Pearl Waist Chain Belt',
    category: 'Accessories',
    vibe: 'Coquette & Bows',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    rating: 4.8,
    reviewsCount: 54,
    isBestseller: false,
    isTrending: true,
    description: 'Dainty body belly chain with layered pearls and rose gold ribbon bow charms. Perfect over tops or skirts!',
    fabric: 'Freshwater Pearl Beads & Stainless Alloy',
    fit: 'Adjustable Hook Chain (26 - 36 inches)',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Rose Gold & Pearl', hex: '#E8C3C7' }
    ],
    sizes: ['One Size'],
    stock: { 'One Size': 16 },
    tags: ['Waist Chain', 'Body Jewelry', 'Pearls', 'Coquette']
  }
];

const OUTFIT_BUNDLES = [
  {
    id: 'bundle-1',
    title: 'The Viral Coquette Princess Haul',
    tagline: 'Pair the Rosalie Corset Top with Silk Hair Bows & Pearl Choker',
    topId: 'top-1',
    acc1Id: 'acc-1',
    acc2Id: 'acc-2',
    bundleDiscount: 'EXTRA 15% OFF BUNDLE',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bundle-2',
    title: 'Y2K Summer Sunset Outfit',
    tagline: 'Match the Shimmer Halter with Oval Tinted Sunglasses & Star Clips',
    topId: 'top-3',
    acc1Id: 'acc-4',
    acc2Id: 'acc-8',
    bundleDiscount: 'SAVE ₹300 ON COMBOS',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bundle-3',
    title: 'Clean Girl Coffee & Chill Kit',
    tagline: 'Combine Scallop Lace Cami with "More Espresso" Canvas Tote',
    topId: 'top-4',
    acc1Id: 'acc-3',
    acc2Id: 'acc-6',
    bundleDiscount: 'BESTSELLING DUO',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bundle-4',
    title: 'Balletcore Coquette Dream Set',
    tagline: 'Ballet Wrap Tie Crop + Silver Bow Baguette Bag + Pearl Chain',
    topId: 'top-11',
    acc1Id: 'acc-7',
    acc2Id: 'acc-9',
    bundleDiscount: 'NEW BALLETCORE DROP',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  }
];

const STORIES_DATA = [
  {
    id: 'story-1',
    title: '🎀 Bow Trend',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    caption: 'Coquette Bow Clips styling tutorial by @ria! Tap to shop.',
    productId: 'acc-1'
  },
  {
    id: 'story-2',
    title: '🔥 Viral Corsets',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    caption: 'Restocked 50 units of the Rosalie Corset in Blush Pink!',
    productId: 'top-1'
  },
  {
    id: 'story-3',
    title: '✨ Y2K Sunnies',
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400',
    caption: 'Sunset vibes with rose tinted oval sunnies.',
    productId: 'acc-4'
  },
  {
    id: 'story-4',
    title: '🩰 Balletcore',
    img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=400',
    caption: 'Ballet Wrap Tie Crop has arrived! Ultra flattering waist wrap.',
    productId: 'top-11'
  },
  {
    id: 'story-5',
    title: '☕ Coffee Girl',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    caption: 'More Espresso Less Depresso Canvas Tote is 44% OFF today.',
    productId: 'acc-3'
  }
];

const PINTEREST_PINS = [
  {
    id: 'pin-1',
    author: '@fashionbyria',
    caption: 'Obsessed with this rose corset top from Uptownie! Cutest fit ever 🎀',
    likes: '14.2k',
    productId: 'top-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pin-2',
    author: '@aesthetics_ananya',
    caption: 'Hair bow clip trio + pearl choker = peak coquette aesthetic ✨',
    likes: '9.8k',
    productId: 'acc-1',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pin-3',
    author: '@tanya_fits',
    caption: 'Golden hour in my Y2K tinted sunnies and halter top 💖',
    likes: '18.5k',
    productId: 'acc-4',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pin-4',
    author: '@clean_girl_diaries',
    caption: 'My daily uniform: Scallop lace cami + cute canvas tote ☕🌸',
    likes: '11.3k',
    productId: 'top-4',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600'
  }
];
