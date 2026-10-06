"use client";
// Sticky site header with logo, navigation and utility icons (TSX).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const { count, wishlist, open } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a shadow once the user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu after navigating
  useEffect(() => setMenu(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 bg-cream/90 backdrop-blur transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        <button className="lg:hidden p-2 -ml-2" onClick={() => setMenu(true)} aria-label="Open menu">
          <IconMenu />
        </button>

        <Link href="/" className="font-serif text-2xl sm:text-3xl text-plum tracking-wide">
          {site.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative py-1 transition-colors hover:text-plum ${isActive(n.href) ? "text-plum" : "text-ink/80"}
                after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-plum after:transition-all ${isActive(n.href) ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/collections?focus=search" className="p-2 hover:text-plum" aria-label="Search"><IconSearch /></Link>
          <Link href="/wishlist" className="relative p-2 hover:text-plum" aria-label="Wishlist">
            <IconHeart />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <button onClick={open} className="relative p-2 hover:text-plum" aria-label="Cart">
            <IconBag />
            {count > 0 && <Badge n={count} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${menu ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${menu ? "opacity-100" : "opacity-0"}`} onClick={() => setMenu(false)} />
        <div className={`absolute left-0 top-0 h-full w-72 bg-white p-6 transition-transform ${menu ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-serif text-2xl text-plum">{site.name}</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu"><IconClose /></button>
          </div>
          <nav className="flex flex-col gap-5">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} className={isActive(n.href) ? "text-plum font-medium" : ""}>{n.label}</Link>
            ))}
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/faq">How to order</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-plum text-white text-[10px] leading-4 text-center">
      {n}
    </span>
  );
}
