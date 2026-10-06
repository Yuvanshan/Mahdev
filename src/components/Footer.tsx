import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#17251f] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-10 md:grid-cols-[1.5fr_1fr_1fr] lg:px-12 lg:py-20">
        <div>
          <Link href="/" className="font-serif text-3xl tracking-wide">MAHDEV</Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#e8c991]">Pvt Ltd · Event management</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">{site.description}</p>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#e8c991]">Discover</h2>
          <ul className="grid gap-3 text-sm text-white/75">
            <li><Link href="/#services" className="transition hover:text-white">Our services</Link></li>
            <li><Link href="/#experiences" className="transition hover:text-white">Our work</Link></li>
            <li><Link href="/#about" className="transition hover:text-white">About Mahdev</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#e8c991]">Start a conversation</h2>
          <p className="max-w-xs text-sm leading-6 text-white/60">Have a date, a big idea, or just a feeling you want to bring to life? We&apos;d love to hear about it.</p>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm text-white transition hover:text-[#e8c991]">
            Tell us about your event <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-6 py-5 text-xs text-white/45 sm:px-10 lg:px-12">
          <span>© {new Date().getFullYear()} Mahdev Pvt Ltd. All rights reserved.</span>
          <span>Thoughtfully planned. Unforgettable by design.</span>
        </div>
      </div>
    </footer>
  );
}
