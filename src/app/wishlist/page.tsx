"use client";
// Wishlist page (TSX) – reads saved items from the cart context.
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, add } = useCart();
  const list = wishlist.map(getProduct).filter((p) => p !== undefined);

  // Adds every saved item using its middle size (customer can change size on WhatsApp)
  const addAll = () => list.forEach((p) => add(p.slug, p.sizes[Math.min(2, p.sizes.length - 1)], p.colours[0]));

  return (
    <>
      <PageHeader title="Wishlist" crumb="Wishlist" sub={list.length ? `${list.length} saved` : undefined} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {list.length ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
            <div className="text-center mt-10"><button onClick={addAll} className="btn-primary">Add all to bag</button></div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-serif text-3xl">Your wishlist is empty</h2>
            <p className="text-muted mt-1 mb-6">Tap the heart on any style to save it here.</p>
            <Link href="/collections" className="btn-primary">Start browsing</Link>
          </div>
        )}
      </div>
    </>
  );
}
