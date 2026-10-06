// Central brand configuration (TypeScript).
// Change the values here to rebrand the whole site in one place.

export const site = {
  name: "Mahdev Pvt Ltd",
  tagline: "Thoughtfully planned. Unforgettable by design.",
  description:
    "Mahdev Pvt Ltd plans and produces thoughtful, beautifully executed events—from intimate celebrations to standout corporate experiences.",
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
    "Bringing people together, beautifully",
    "Corporate events · Weddings · Celebrations",
    "Thoughtful planning. Seamless execution.",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Our Work", href: "/#experiences" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
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
