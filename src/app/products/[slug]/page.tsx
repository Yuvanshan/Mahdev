// Product detail route (TSX). Pages are pre-rendered for every product at build time.
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, getCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SectionTitle } from "@/components/CategoryGrid";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getProduct((await params).slug);
  return { title: p?.name ?? "Product", description: p?.description };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category);

  // Same category first, then fill with other items
  const related = [...products.filter((x) => x.category === p.category && x.slug !== p.slug), ...products.filter((x) => x.category !== p.category)].slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <p className="text-xs text-muted pt-6">
        <Link href="/" className="hover:text-plum">Home</Link> / <Link href={`/collections?category=${p.category}`} className="hover:text-plum">{cat?.name}</Link> / {p.name}
      </p>
      <ProductDetail p={p} categoryName={cat?.name ?? ""} />
      <section className="py-14">
        <SectionTitle title="You may also like" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {related.map((r) => <ProductCard key={r.slug} p={r} />)}
        </div>
      </section>
    </div>
  );
}
