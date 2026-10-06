"use client";
// Slide-out bag (TSX). The only next step is ordering on WhatsApp.
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, deliveryFee, site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import ProductImage from "./ProductImage";
import WhatsAppIcon from "./WhatsAppIcon";
import { IconClose } from "./Icons";

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();

  // Close with the Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const subtotal = items.reduce((s, i) => s + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);
  const fee = deliveryFee(subtotal);
  const toFree = Math.max(0, site.delivery.freeOver - subtotal);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={close} />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-cream flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button onClick={close} aria-label="Close bag" className="p-2"><IconClose /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 p-8">
            <h3 className="font-serif text-2xl">Your bag is empty</h3>
            <p className="text-muted">Find something you love.</p>
            <Link href="/new-arrivals" onClick={close} className="btn-primary">Shop new arrivals</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-5">
              {/* Free-delivery progress */}
              <div className="text-sm">
                {toFree ? <>Add <strong>{formatPrice(toFree)}</strong> more for free delivery</> : "You've unlocked free delivery"}
                <div className="h-1.5 rounded bg-line mt-2 overflow-hidden">
                  <div className="h-full bg-plum transition-all" style={{ width: `${Math.min(100, (subtotal / site.delivery.freeOver) * 100)}%` }} />
                </div>
              </div>

              {items.map((item, idx) => {
                const p = getProduct(item.slug);
                if (!p) return null;
                return (
                  <div key={`${item.slug}-${item.size}-${item.colour}`} className="grid grid-cols-[72px_1fr] gap-4">
                    <ProductImage name="" tones={p.tones} image={p.image} className="aspect-[3/4] rounded-xl" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <Link href={`/products/${p.slug}`} onClick={close} className="font-medium hover:text-plum">{p.name}</Link>
                      <span className="text-xs text-muted flex items-center gap-1.5">
                        {item.size}
                        {item.colour && <span className="w-3 h-3 rounded-full border border-line" style={{ background: item.colour }} />}
                      </span>
                      <div className="flex items-center justify-between">
                        <QtyControl value={item.qty} onChange={(q) => setQty(idx, q)} />
                        <span className="tabular-nums">{formatPrice(p.price * item.qty)}</span>
                      </div>
                      <button onClick={() => remove(idx)} className="self-start text-xs text-muted underline">Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-line px-5 py-4 grid gap-2 text-sm tabular-nums">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Delivery" value={fee ? formatPrice(fee) : "Free"} />
              <Row label="Total" value={formatPrice(subtotal + fee)} bold />
              <Link href="/checkout" onClick={close} className="btn-whatsapp mt-2">
                <WhatsAppIcon /> Order on WhatsApp
              </Link>
              <p className="text-xs text-muted text-center">Add your delivery details next. We confirm every order on WhatsApp.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-base" : ""}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

// Reusable − / + quantity stepper
export function QtyControl({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button onClick={() => onChange(value - 1)} className="w-8 h-8" aria-label="Decrease quantity">−</button>
      <span className="w-7 text-center tabular-nums">{value}</span>
      <button onClick={() => onChange(value + 1)} className="w-8 h-8" aria-label="Increase quantity">+</button>
    </div>
  );
}
