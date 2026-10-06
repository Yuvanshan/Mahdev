// New arrivals page (TSX).
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { newArrivals } from "@/data/products";

export const metadata = { title: "New Arrivals" };

export default function NewArrivalsPage() {
  const list = newArrivals();
  return (
    <>
      <PageHeader title="New Arrivals" crumb="New Arrivals" sub="Fresh styles added every Friday" />
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </>
  );
}
