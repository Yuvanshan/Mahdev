// Lookbook page (TSX) – a masonry-style gallery linking to each product.
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductImage from "@/components/ProductImage";
import { products } from "@/data/products";

export const metadata = { title: "Lookbook" };
const RATIOS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]"];

export default function LookbookPage() {
  return (
    <>
      <PageHeader title="Lookbook" crumb="Lookbook" sub="Ways to wear this season's pieces" />
      <div className="mx-auto max-w-7xl px-4 py-12 columns-2 md:columns-3 gap-4">
        {products.map((p, i) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="block mb-4 break-inside-avoid rounded-2xl overflow-hidden group">
            <ProductImage name={p.name} tones={p.tones} image={p.image} className={`${RATIOS[i % 3]} transition-transform duration-500 group-hover:scale-105`} />
          </Link>
        ))}
      </div>
    </>
  );
}
