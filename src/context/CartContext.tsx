"use client";
// Bag + wishlist state (TypeScript / React context).
// Saved to localStorage so the bag survives page reloads.

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = { slug: string; size: string; colour?: string; qty: number };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: string, colour?: string, qty?: number) => void;
  remove: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  count: number;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "shop-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load saved state once on the client (try/catch covers private mode / blocked storage)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(saved.items)) setItems(saved.items);
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist);
    } catch {}
    setLoaded(true);
  }, []);

  // Persist whenever bag or wishlist changes (only after the initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ items, wishlist }));
    } catch {}
  }, [items, wishlist, loaded]);

  const add = (slug: string, size: string, colour?: string, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === slug && i.size === size && i.colour === colour);
      // Same product, size and colour already in the bag → increase quantity
      if (idx >= 0) return prev.map((i, n) => (n === idx ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, size, colour, qty }];
    });
    setOpen(true);
  };

  const remove = (index: number) => setItems((prev) => prev.filter((_, n) => n !== index));

  const setQty = (index: number, qty: number) =>
    qty < 1 ? remove(index) : setItems((prev) => prev.map((i, n) => (n === index ? { ...i, qty: Math.min(qty, 20) } : i)));

  const toggleWish = (slug: string) =>
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items, wishlist, isOpen, count, add, remove, setQty, toggleWish,
        open: () => setOpen(true),
        close: () => setOpen(false),
        clear: () => setItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
