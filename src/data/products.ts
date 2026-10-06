// Sample catalogue data (TypeScript).
// Replace with your real products or fetch them from a CMS/API later.

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  // Two colours used for the placeholder gradient until real photos are added
  tones: [string, string];
};

export type Product = {
  slug: string;
  name: string;
  category: string; // matches Category.slug
  price: number;
  compareAt?: number; // original price – shows a "Sale" badge when set
  isNew?: boolean;
  colours: string[];
  sizes: string[];
  description: string;
  image?: string; // optional path in /public, e.g. "/products/lilac-dress.jpg"
  tones: [string, string];
};

export const categories: Category[] = [
  { slug: "dresses", name: "Dresses", blurb: "Effortless one-piece looks", tones: ["#e9d5ff", "#c4b5fd"] },
  { slug: "tops", name: "Tops", blurb: "Blouses, tees and more", tones: ["#fce7f3", "#f9a8d4"] },
  { slug: "bottoms", name: "Bottoms", blurb: "Skirts, trousers and jeans", tones: ["#ede9fe", "#a78bfa"] },
  { slug: "outerwear", name: "Outerwear", blurb: "Layers for every season", tones: ["#f5f3ff", "#ddd6fe"] },
  { slug: "accessories", name: "Accessories", blurb: "The finishing touches", tones: ["#fdf4ff", "#f0abfc"] },
];

const S = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  { slug: "lilac-wrap-midi-dress", name: "Lilac Wrap Midi Dress", category: "dresses", price: 6490, isNew: true, colours: ["#c4b5fd", "#1f2937"], sizes: S, description: "A flattering wrap silhouette in a lightweight, flowing fabric with a tie waist.", tones: ["#ede9fe", "#c4b5fd"] },
  { slug: "floral-tiered-maxi", name: "Floral Tiered Maxi", category: "dresses", price: 7290, compareAt: 8990, colours: ["#fbcfe8", "#fef3c7"], sizes: S, description: "Soft tiers and a delicate floral print for easy weekend dressing.", tones: ["#fce7f3", "#f5d0fe"] },
  { slug: "satin-slip-dress", name: "Satin Slip Dress", category: "dresses", price: 5890, colours: ["#a78bfa", "#111827"], sizes: S, description: "Minimal, fluid and perfect for evenings out.", tones: ["#ddd6fe", "#8b5cf6"] },
  { slug: "puff-sleeve-blouse", name: "Puff Sleeve Blouse", category: "tops", price: 3490, isNew: true, colours: ["#ffffff", "#fbcfe8"], sizes: S, description: "Romantic puff sleeves with a relaxed body and button front.", tones: ["#fdf2f8", "#fbcfe8"] },
  { slug: "ribbed-knit-top", name: "Ribbed Knit Top", category: "tops", price: 2790, compareAt: 3290, colours: ["#e5e7eb", "#c4b5fd"], sizes: S, description: "A stretchy everyday staple that pairs with everything.", tones: ["#f5f3ff", "#ddd6fe"] },
  { slug: "linen-wide-leg-trousers", name: "Linen Wide-Leg Trousers", category: "bottoms", price: 4590, isNew: true, colours: ["#f5f5f4", "#a8a29e"], sizes: S, description: "Breathable linen blend with a high waist and wide leg.", tones: ["#faf5ff", "#e9d5ff"] },
  { slug: "pleated-midi-skirt", name: "Pleated Midi Skirt", category: "bottoms", price: 3990, colours: ["#c4b5fd", "#fde68a"], sizes: S, description: "Movement-friendly pleats with an elasticated waistband.", tones: ["#ede9fe", "#a78bfa"] },
  { slug: "cropped-tweed-jacket", name: "Cropped Tweed Jacket", category: "outerwear", price: 8490, compareAt: 9990, colours: ["#f5f5f4", "#c4b5fd"], sizes: S, description: "A polished cropped jacket to elevate any outfit.", tones: ["#f5f3ff", "#c4b5fd"] },
  { slug: "oversized-cardigan", name: "Oversized Cardigan", category: "outerwear", price: 5290, isNew: true, colours: ["#fef3c7", "#e9d5ff"], sizes: S, description: "Cosy, slouchy and ideal for layering on cooler days.", tones: ["#fdf4ff", "#e9d5ff"] },
  { slug: "pearl-hair-clip-set", name: "Pearl Hair Clip Set", category: "accessories", price: 1290, colours: ["#ffffff"], sizes: ["One size"], description: "A set of three faux-pearl clips for instant polish.", tones: ["#fdf4ff", "#f5d0fe"] },
  { slug: "quilted-mini-bag", name: "Quilted Mini Bag", category: "accessories", price: 4290, isNew: true, colours: ["#c4b5fd", "#111827"], sizes: ["One size"], description: "A compact quilted bag with a detachable chain strap.", tones: ["#ede9fe", "#a78bfa"] },
  { slug: "silk-scarf", name: "Printed Silk-Feel Scarf", category: "accessories", price: 1890, compareAt: 2390, colours: ["#fbcfe8", "#c4b5fd"], sizes: ["One size"], description: "Wear it in your hair, on your bag or around your neck.", tones: ["#fce7f3", "#f0abfc"] },
];

// Helper look-ups used across pages
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const newArrivals = () => products.filter((p) => p.isNew);

// Friendly names for swatch colours – shown in WhatsApp messages and on the product page.
// Add an entry whenever you use a new colour value above.
const COLOUR_NAMES: Record<string, string> = {
  "#c4b5fd": "Lilac", "#a78bfa": "Violet", "#e9d5ff": "Lavender", "#fbcfe8": "Blush pink",
  "#fef3c7": "Cream", "#fde68a": "Butter yellow", "#ffffff": "White", "#f5f5f4": "Ivory",
  "#e5e7eb": "Light grey", "#a8a29e": "Stone", "#1f2937": "Charcoal", "#111827": "Black",
};
export const colourName = (hex: string) => COLOUR_NAMES[hex.toLowerCase()] ?? hex;
