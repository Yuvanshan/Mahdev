"use client";
// Product tile used in every grid (TSX).
import Link from "next/link";
import { formatPrice } from "@/config/site";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";
import { IconHeart } from "./Icons";

export default function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(p.slug);
  // Percentage off, shown only for discounted items
  const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden">
        <Link href={`/products/${p.slug}`}>
          <ProductImage name={p.name} tones={p.tones} image={p.image} className="aspect-[3/4] transition-transform duration-500 group-hover:scale-105" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {p.isNew && <span className="badge bg-white text-plum">New</span>}
          {off > 0 && <span className="badge bg-plum text-white">-{off}%</span>}
        </div>

        <button
          onClick={() => toggleWish(p.slug)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center transition-colors ${wished ? "text-plum" : "text-ink/60 hover:text-plum"}`}
        >
          <IconHeart filled={wished} className="w-4 h-4" />
        </button>

        {/* Quick-add slides up on hover (always visible on touch screens) */}
        <button
          onClick={() => add(p.slug, p.sizes[Math.min(2, p.sizes.length - 1)])}
          className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 py-2 text-sm font-medium hover:bg-plum hover:text-white transition-all
                     lg:translate-y-14 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          Quick add
        </button>
      </div>

      <div className="pt-3">
        <Link href={`/products/${p.slug}`} className="block text-sm sm:text-base hover:text-plum">{p.name}</Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-medium text-plum">{formatPrice(p.price)}</span>
          {p.compareAt && <span className="text-xs text-ink/40 line-through">{formatPrice(p.compareAt)}</span>}
        </div>
        <div className="flex gap-1 mt-2">
          {p.colours.map((c) => (
            <span key={c} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
