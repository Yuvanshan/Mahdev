"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { IconClose, IconMenu } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className={`sticky top-0 z-40 border-b border-black/[0.06] bg-[#faf9f6]/95 backdrop-blur transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-12">
        <button className="p-2 lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
          <IconMenu />
        </button>

        <Link href="/" className="flex items-center gap-3" aria-label="Mahdev Pvt Ltd home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20372e] font-serif text-xl text-[#e8c991]">M</span>
          <span className="leading-tight">
            <span className="block font-serif text-xl tracking-wide text-[#20372e] sm:text-2xl">MAHDEV</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.28em] text-[#796c56]">Pvt Ltd · Events</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === "/" && pathname === "/" ? "page" : undefined}
              className={`transition-colors hover:text-[#9a7941] ${item.href === "/" && pathname === "/" ? "text-[#9a7941]" : "text-[#313a35]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="hidden rounded-full bg-[#20372e] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#304d40] sm:inline-flex">
          Let&apos;s talk <span className="ml-2 text-[#e8c991]" aria-hidden="true">↗</span>
        </Link>

        <div className={`fixed inset-0 z-50 lg:hidden ${menu ? "" : "pointer-events-none"}`}>
          <button className={`absolute inset-0 h-full w-full bg-black/45 transition-opacity ${menu ? "opacity-100" : "opacity-0"}`} onClick={() => setMenu(false)} aria-label="Close menu" />
          <div className={`absolute left-0 top-0 h-full w-[min(340px,85vw)] bg-[#faf9f6] p-6 transition-transform ${menu ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="mb-10 flex items-center justify-between">
              <span className="font-serif text-2xl text-[#20372e]">MAHDEV</span>
              <button onClick={() => setMenu(false)} aria-label="Close menu"><IconClose /></button>
            </div>
            <nav className="flex flex-col gap-6">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-lg text-[#313a35]">{item.label}</Link>
              ))}
              <Link href="/contact" className="btn-primary mt-3">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
