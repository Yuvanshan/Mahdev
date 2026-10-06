// Home page (TSX).
import Link from "next/link";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryGrid, { SectionTitle } from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { products, newArrivals, getProduct } from "@/data/products";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export default function Home() {
  const fresh = newArrivals().slice(0, 4);
  const sale = getProduct("floral-tiered-maxi")!;

  return (
    <>
      <Hero />
      <Features />
      <CategoryGrid />

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <SectionTitle eyebrow="Just landed" title="New Arrivals" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {fresh.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
        <div className="text-center mt-10"><Link href="/new-arrivals" className="btn-outline">View all new arrivals</Link></div>
      </section>

      {/* Sale banner */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-plum text-white">
          <div className="p-8 sm:p-12 flex flex-col justify-center items-start gap-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/80">Mid-season sale</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Up to 25% off selected styles</h2>
            <p className="text-white/85">Dresses, outerwear and accessories, while sizes last.</p>
            <Link href="/collections?category=sale" className="inline-flex rounded-full bg-white text-plum px-6 py-3 text-sm font-medium">Shop the sale</Link>
          </div>
          <ProductImage name="" tones={sale.tones} image={sale.image} className="aspect-[4/3] md:aspect-auto md:min-h-[360px]" />
        </div>
      </section>

      {/* Best sellers (first 8 items – reorder in data/products.ts) */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle eyebrow="Customer favourites" title="Best Sellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {products.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* How ordering works */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl bg-blush px-6 py-12 text-center">
          <p className="eyebrow">Simple ordering</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2">Order in three easy steps</h2>
          <ol className="grid sm:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto text-left">
            {[
              ["Add to bag", "Pick your size and colour, then add your favourites to the bag."],
              ["Send on WhatsApp", "Enter your delivery details and we open WhatsApp with your order ready to send."],
              ["We confirm & deliver", "We reply to confirm stock and total, then deliver island-wide. Pay cash on delivery or by bank transfer."],
            ].map(([t, d], i) => (
              <li key={t} className="bg-white rounded-2xl p-5">
                <span className="font-serif text-3xl text-plum">{i + 1}</span>
                <h3 className="font-medium mt-1">{t}</h3>
                <p className="text-sm text-muted mt-1">{d}</p>
              </li>
            ))}
          </ol>
          <a href={waLink(`Hello ${site.name}! I'd like some help choosing.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
            <WhatsAppIcon /> Chat with us
          </a>
        </div>
      </section>
    </>
  );
}
