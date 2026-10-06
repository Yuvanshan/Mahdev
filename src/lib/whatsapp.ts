// WhatsApp ordering helpers (TypeScript).
// Orders are not processed on the website – we build a tidy message and open WhatsApp
// with it pre-filled, so the customer only has to press "Send".

import { site, formatPrice, deliveryFee } from "@/config/site";
import { getProduct, colourName } from "@/data/products";
import type { CartItem } from "@/context/CartContext";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  note?: string;
};

// Builds a wa.me link that opens a chat with the shop number and the given text
export function waLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Turns cart lines into priced rows, skipping any product that no longer exists
export function priceLines(items: CartItem[]) {
  return items
    .map((i) => {
      const p = getProduct(i.slug);
      return p ? { ...i, name: p.name, price: p.price, total: p.price * i.qty } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

// Full order message sent from the bag/checkout
export function buildOrderMessage(items: CartItem[], c: Customer) {
  const lines = priceLines(items);
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const fee = deliveryFee(subtotal);

  const rows = lines
    .map((l, n) => `${n + 1}. ${l.name}\n   Size: ${l.size}${l.colour ? ` | Colour: ${colourName(l.colour)}` : ""} | Qty: ${l.qty}\n   ${formatPrice(l.total)}`)
    .join("\n");

  return [
    `Hello ${site.name}! I'd like to place an order 🛍️`,
    "",
    "*Order*",
    rows,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery: ${fee ? formatPrice(fee) : "Free"}`,
    `*Total: ${formatPrice(subtotal + fee)}*`,
    "",
    "*Delivery details*",
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    `Address: ${c.address}, ${c.city}`,
    `District: ${c.district}`,
    c.note ? `Note: ${c.note}` : "",
    "",
    "Payment: Cash on delivery / bank transfer (please confirm)",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === "")) // collapse double blank lines
    .join("\n");
}

// Short enquiry for a single product (used by the "Ask on WhatsApp" button)
export function buildProductMessage(name: string, price: number, size?: string, colour?: string, qty = 1) {
  return [
    `Hello ${site.name}! I'm interested in:`,
    `*${name}* – ${formatPrice(price)}`,
    size ? `Size: ${size}` : "",
    colour ? `Colour: ${colourName(colour)}` : "",
    `Qty: ${qty}`,
    "",
    "Is it available?",
  ]
    .filter(Boolean)
    .join("\n");
}
