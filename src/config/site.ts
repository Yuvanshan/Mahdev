// Central brand configuration (TypeScript).
// Change the values here to rebrand the whole site in one place.

export const site = {
  name: "Aurelle", // Placeholder brand name – replace with your own
  tagline: "Feminine fashion, made affordable",
  description:
    "Aurelle brings thoughtfully curated women's fashion to your doorstep – modern silhouettes, soft fabrics and prices that make sense.",
  currency: "LKR",

  // WhatsApp number that receives every order.
  // International format, digits only – no "+", spaces or leading zero (e.g. 94771234567).
  whatsappNumber: "94770000000",

  // Delivery rules shown in the bag and added to the WhatsApp order message
  delivery: { fee: 400, freeOver: 10000 },

  // Optional hero video in /public (e.g. "/hero.mp4"). Leave empty to use the gradient.
  heroVideo: "",

  contact: {
    address: "Colombo 05, Sri Lanka",
    phone: "+94 77 000 0000",
    email: "hello@example.com",
    hours: "Mon–Sat, 9.00am–7.00pm",
  },
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
  // Messages that rotate in the top announcement bar
  announcements: [
    "Island-wide delivery on every order",
    "Order easily on WhatsApp",
    "Cash on delivery available",
    "New arrivals every Friday",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
} as const;

// Formats a number as a price string, e.g. "LKR 4,990"
export function formatPrice(value: number) {
  return `${site.currency} ${value.toLocaleString("en-US")}`;
}

// Delivery charge for a given subtotal (free above the threshold)
export function deliveryFee(subtotal: number) {
  return subtotal === 0 || subtotal >= site.delivery.freeOver ? 0 : site.delivery.fee;
}
