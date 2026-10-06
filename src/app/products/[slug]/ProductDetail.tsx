"use client";
// Interactive part of the product page: gallery, colour/size/qty pickers,
// "Add to bag" and a direct "Order this on WhatsApp" button (TSX).
import Link from "next/link";
import { useState } from "react";
import { colourName, type Product } from "@/data/products";
import { formatPrice, site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { buildProductMessage, waLink } from "@/lib/whatsapp";
import ProductImage from "@/components/ProductImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { QtyControl } from "@/components/CartDrawer";
import { IconHeart } from "@/components/Icons";

export default function ProductDetail({ p, categoryName }: { p: Product; categoryName: string }) {
  const { add, toggleWish, wishlist } = useCart();
  const oneSize = p.sizes.length === 1;
  const [size, setSize] = useState(oneSize ? p.sizes[0] : "");
  const [colour, setColour] = useState(p.colours[0]);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const wished = wishlist.includes(p.slug);
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  // Placeholder "angles": shift the gradient tones so thumbnails look different
  const tonesFor = (i: number): [string, string] => (i % 2 ? [p.tones[1], p.tones[0]] : p.tones);

  const requireSize = () => {
    if (!size) { setSizeError(true); return false; }
    return true;
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-14 py-8">
      {/* Gallery */}
      <div className="grid grid-cols-[64px_1fr] gap-3">
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <button key={i} onClick={() => setView(i)} className={`rounded-lg overflow-hidden border-2 ${view === i ? "border-plum" : "border-transparent"}`} aria-label={`View image ${i + 1}`}>
              <ProductImage name="" tones={tonesFor(i)} image={p.image} className="aspect-[3/4]" />
            </button>
          ))}
        </div>
        <ProductImage name={p.name} tones={tonesFor(view)} image={p.image} className="aspect-[3/4] rounded-2xl" priority />
      </div>

      {/* Info + options */}
      <div>
        <p className="eyebrow">{categoryName}{p.isNew ? " · New in" : ""}</p>
        <h1 className="font-serif text-4xl sm:text-5xl mt-2 mb-3">{p.name}</h1>
        <div className="flex items-baseline gap-3 tabular-nums">
          <span className="text-2xl text-plum">{formatPrice(p.price)}</span>
          {p.compareAt && <><s className="text-muted text-sm">{formatPrice(p.compareAt)}</s><span className="badge bg-plum text-white">Save {off}%</span></>}
        </div>
        <p className="text-muted mt-4">{p.description}</p>

        <Option label={`Colour: ${colourName(colour)}`}>
          {p.colours.map((c) => (
            <button key={c} onClick={() => setColour(c)} aria-label={colourName(c)} title={colourName(c)}
              className={`w-8 h-8 rounded-full border-2 border-line ${colour === c ? "ring-2 ring-plum ring-offset-2" : ""}`} style={{ background: c }} />
          ))}
        </Option>

        <Option label="Size" extra={!oneSize && <Link href="/faq#size-guide" className="text-xs text-muted underline normal-case tracking-normal font-normal">Size guide</Link>}>
          {p.sizes.map((s) => (
            <button key={s} onClick={() => { setSize(s); setSizeError(false); }}
              className={`min-w-12 px-3 py-2 rounded-lg border ${size === s ? "border-plum bg-plum text-white" : "border-line bg-white hover:border-plum"}`}>{s}</button>
          ))}
        </Option>
        {sizeError && <p className="text-sm text-red-700 mt-2">Choose a size to continue.</p>}

        <Option label="Quantity"><QtyControl value={qty} onChange={(n) => setQty(Math.max(1, Math.min(10, n)))} /></Option>

        <div className="flex flex-wrap gap-3 mt-7">
          <button onClick={() => requireSize() && add(p.slug, size, colour, qty)} className="btn-primary flex-1 min-w-48">
            Add to bag · {formatPrice(p.price * qty)}
          </button>
          <button onClick={() => toggleWish(p.slug)} className={`btn-outline ${wished ? "!text-plum !border-plum" : ""}`} aria-pressed={wished}>
            <IconHeart filled={wished} className="w-4 h-4" /> {wished ? "Saved" : "Wishlist"}
          </button>
        </div>

        {/* Order just this item straight away */}
        <a
          href={waLink(buildProductMessage(p.name, p.price, size || undefined, colour, qty))}
          onClick={(e) => { if (!requireSize()) e.preventDefault(); }}
          target="_blank" rel="noopener noreferrer"
          className="btn-whatsapp w-full mt-3"
        >
          <WhatsAppIcon /> Order this on WhatsApp
        </a>

        <ul className="grid gap-1.5 mt-6 text-sm text-muted">
          <li>✓ Island-wide delivery in 2–4 working days</li>
          <li>✓ Cash on delivery or bank transfer</li>
          <li>✓ Free delivery over {formatPrice(site.delivery.freeOver)}</li>
        </ul>

        <div className="mt-7 border-t border-line">
          <Details title="Details & care" open>{p.description} Machine wash cold on a gentle cycle, hang to dry, warm iron if needed.</Details>
          <Details title="Fit">True to size. Model is 5&apos;6&quot; and wears size S.</Details>
          <Details title="Delivery & exchanges">Colombo 1–2 days, other districts 2–4 days. Exchanges within 7 days on unworn items with tags.</Details>
        </div>
      </div>
    </div>
  );
}

function Option({ label, extra, children }: { label: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-2 text-xs font-semibold uppercase tracking-[0.14em]">{label}{extra}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Details({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="border-b border-line py-4 group">
      <summary className="cursor-pointer font-medium list-none flex justify-between">{title}<span className="group-open:rotate-45 transition-transform">+</span></summary>
      <p className="text-muted mt-2 text-sm">{children}</p>
    </details>
  );
}
