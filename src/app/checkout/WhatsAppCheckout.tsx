"use client";
// WhatsApp checkout form (TSX).
// No payment or order is stored on the site: on submit we build the order text and open WhatsApp.
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, deliveryFee } from "@/config/site";
import { buildOrderMessage, priceLines, waLink, type Customer } from "@/lib/whatsapp";
import { getProduct } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota",
  "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
];

const empty: Customer = { name: "", phone: "", address: "", city: "", district: "Colombo", note: "" };

export default function WhatsAppCheckout() {
  const { items, clear } = useCart();
  const [form, setForm] = useState<Customer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [sent, setSent] = useState(false);

  const lines = priceLines(items);
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const fee = deliveryFee(subtotal);

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Basic validation – Sri Lankan mobile numbers: 07XXXXXXXX or +947XXXXXXXX
  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Enter your name";
    if (!/^(\+94|0)7\d{8}$/.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a mobile number like 0771234567";
    if (form.address.trim().length < 5) e.address = "Enter your street address";
    if (!form.city.trim()) e.city = "Enter your city or town";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waLink(buildOrderMessage(items, form));
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  // After WhatsApp opens: let the customer clear the bag or go back
  if (sent) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-wa text-white flex items-center justify-center mx-auto mb-4"><WhatsAppIcon className="w-8 h-8" /></div>
        <h2 className="font-serif text-3xl">Almost done!</h2>
        <p className="text-muted mt-2">Press <strong>Send</strong> in WhatsApp to place your order. We&apos;ll reply to confirm stock, total and delivery time.</p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <a href={waLink(buildOrderMessage(items, form))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Open WhatsApp again</a>
          <Link href="/collections" onClick={clear} className="btn-outline">I&apos;ve sent it – clear my bag</Link>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="font-serif text-3xl">Your bag is empty</h2>
        <p className="text-muted mt-1 mb-6">Add a few styles, then come back to order.</p>
        <Link href="/collections" className="btn-primary">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-[1.3fr_1fr] gap-10">
      <form onSubmit={submit} noValidate className="bg-white border border-line rounded-3xl p-6 sm:p-8 grid gap-5 self-start">
        <h2 className="font-serif text-2xl">Delivery details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name" error={errors.name} className="sm:col-span-2">
            <input className="input" value={form.name} onChange={set("name")} autoComplete="name" />
          </Field>
          <Field label="Mobile / WhatsApp number" error={errors.phone}>
            <input className="input" value={form.phone} onChange={set("phone")} type="tel" placeholder="0771234567" autoComplete="tel" />
          </Field>
          <Field label="District">
            <select className="input" value={form.district} onChange={set("district")}>
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Street address" error={errors.address} className="sm:col-span-2">
            <input className="input" value={form.address} onChange={set("address")} autoComplete="street-address" />
          </Field>
          <Field label="City / town" error={errors.city}>
            <input className="input" value={form.city} onChange={set("city")} autoComplete="address-level2" />
          </Field>
          <Field label="Note (optional)">
            <input className="input" value={form.note} onChange={set("note")} placeholder="Landmark, delivery time…" />
          </Field>
        </div>

        <div className="rounded-2xl bg-blush p-4 text-sm">
          <strong>How it works:</strong> we open WhatsApp with your order filled in. Press Send, and we&apos;ll confirm by message.
          Pay <strong>cash on delivery</strong> or by <strong>bank transfer</strong>.
        </div>

        <button className="btn-whatsapp w-full !py-3.5 text-base"><WhatsAppIcon /> Send order on WhatsApp · {formatPrice(subtotal + fee)}</button>
      </form>

      {/* Order summary */}
      <aside className="bg-white border border-line rounded-3xl p-6 grid gap-4 self-start lg:sticky lg:top-24">
        <h2 className="font-serif text-2xl">Order summary</h2>
        {lines.map((l) => {
          const p = getProduct(l.slug)!;
          return (
            <div key={`${l.slug}-${l.size}-${l.colour}`} className="grid grid-cols-[56px_1fr_auto] gap-3 items-center text-sm">
              <ProductImage name="" tones={p.tones} image={p.image} className="aspect-[3/4] rounded-lg" />
              <div className="min-w-0"><p className="font-medium truncate">{l.name}</p><p className="text-muted">{l.size} · Qty {l.qty}</p></div>
              <span className="tabular-nums">{formatPrice(l.total)}</span>
            </div>
          );
        })}
        <div className="border-t border-line pt-3 grid gap-1.5 text-sm tabular-nums">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{fee ? formatPrice(fee) : "Free"}</span></div>
          <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(subtotal + fee)}</span></div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`grid gap-1 text-sm ${className}`}>
      <span className="text-muted">{label}</span>
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  );
}
