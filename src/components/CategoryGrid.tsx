// "Shop by category" tiles (TSX).
import Link from "next/link";
import { categories } from "@/data/products";
import ProductImage from "./ProductImage";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle eyebrow="Find your fit" title="Shop by Category" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((c) => (
          <Link key={c.slug} href={`/collections?category=${c.slug}`} className="group relative rounded-2xl overflow-hidden">
            <ProductImage name="" tones={c.tones} className="aspect-[3/4] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
              <h3 className="font-serif text-xl">{c.name}</h3>
              <p className="text-xs text-white/80 mb-1">{c.blurb}</p>
              <span className="text-xs uppercase tracking-widest underline-offset-4 group-hover:underline">Shop now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Shared section heading used on several pages
export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center mb-10">
      {eyebrow && <p className="uppercase tracking-[0.3em] text-xs text-plum mb-2">{eyebrow}</p>}
      <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
    </div>
  );
}
