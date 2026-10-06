"use client";
// Product listing with category, size and price filters, search and sorting (TSX).
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/config/site";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

const SIZES = ["XS", "S", "M", "L", "XL"];
const SORTS = [
  ["featured", "Featured"],
  ["new", "Newest"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
] as const;

export default function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // Category comes from the URL (?category=dresses) so links can deep-link to it
  const category = params.get("category") ?? "all";
  const [size, setSize] = useState("");
  const [max, setMax] = useState(10000);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number][0]>("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Header search icon links here with ?focus=search
  useEffect(() => {
    if (params.get("focus") === "search") searchRef.current?.focus();
  }, [params]);

  const setCategory = (c: string) => router.replace(c === "all" ? "/collections" : `/collections?category=${c}`, { scroll: false });
  const reset = () => { setSize(""); setMax(10000); setQ(""); setSort("featured"); setCategory("all"); };

  // Apply all filters, then sort
  const list = useMemo(() => {
    const r = products.filter(
      (p) =>
        (category === "all" || (category === "sale" ? !!p.compareAt : p.category === category)) &&
        (!size || p.sizes.includes(size)) &&
        p.price <= max &&
        (!q || p.name.toLowerCase().includes(q.toLowerCase()))
    );
    const order = products.map((p) => p.slug);
    const sorters = {
      featured: (a: typeof r[0], b: typeof r[0]) => order.indexOf(a.slug) - order.indexOf(b.slug),
      new: (a: typeof r[0], b: typeof r[0]) => Number(!!b.isNew) - Number(!!a.isNew),
      low: (a: typeof r[0], b: typeof r[0]) => a.price - b.price,
      high: (a: typeof r[0], b: typeof r[0]) => b.price - a.price,
    };
    return [...r].sort(sorters[sort]);
  }, [category, size, max, q, sort]);

  const title = category === "all" ? "All Collections" : category === "sale" ? "Sale" : categories.find((c) => c.slug === category)?.name ?? "Collections";

  return (
    <>
      <PageHeader title={title} crumb="Collections" sub={`${list.length} ${list.length === 1 ? "style" : "styles"}`} />

      <div className="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-[230px_1fr] gap-10">
        {/* Filters sidebar (collapsible on mobile) */}
        <aside className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col gap-7 text-sm`}>
          <FilterGroup title="Category">
            {[{ slug: "all", name: "All" }, ...categories, { slug: "sale", name: "Sale" }].map((c) => (
              <button key={c.slug} onClick={() => setCategory(c.slug)} className={`chip ${category === c.slug ? "chip-on" : ""}`}>{c.name}</button>
            ))}
          </FilterGroup>
          <FilterGroup title="Size">
            {["", ...SIZES].map((s) => (
              <button key={s || "any"} onClick={() => setSize(s)} className={`chip ${size === s ? "chip-on" : ""}`}>{s || "Any"}</button>
            ))}
          </FilterGroup>
          <div>
            <h4 className="footer-h">Max price</h4>
            <input type="range" min={1000} max={10000} step={500} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-plum" />
            <p className="text-muted tabular-nums">Up to {formatPrice(max)}</p>
          </div>
          <button onClick={reset} className="btn-outline">Clear filters</button>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
            <div className="flex gap-2 flex-1 min-w-[220px]">
              <button onClick={() => setShowFilters((s) => !s)} className="btn-outline lg:hidden !px-4 !py-2">Filters</button>
              <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search styles" className="input max-w-xs" aria-label="Search styles" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="input !w-auto" aria-label="Sort by">
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          {list.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="font-serif text-2xl">Nothing matches yet</h3>
              <p className="text-muted mt-1 mb-5">Try another size or a higher price limit.</p>
              <button onClick={reset} className="btn-primary">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="footer-h">{title}</h4>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
