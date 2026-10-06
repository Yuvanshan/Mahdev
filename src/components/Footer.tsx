// Site footer (TSX).
import Link from "next/link";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] text-sm">
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-2xl text-plum tracking-wide">{site.name}</p>
          <p className="text-muted mt-2 max-w-xs">{site.description}</p>
          <div className="flex gap-4 mt-4 text-muted">
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-plum">Facebook</a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-plum">Instagram</a>
            <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-plum">TikTok</a>
          </div>
        </div>

        <FooterCol title="Shop" links={[["All collections", "/collections"], ["New arrivals", "/new-arrivals"], ["Sale", "/collections?category=sale"], ["Lookbook", "/lookbook"]]} />
        <FooterCol title="Help" links={[["How to order", "/faq"], ["Delivery & exchanges", "/faq"], ["Size guide", "/faq"], ["Contact us", "/contact"]]} />

        <div>
          <h4 className="footer-h">Get in touch</h4>
          <ul className="grid gap-2 text-muted">
            <li>{site.contact.address}</li>
            <li><a href={waLink(`Hello ${site.name}!`)} target="_blank" rel="noopener noreferrer" className="hover:text-plum">WhatsApp: {site.contact.phone}</a></li>
            <li>{site.contact.email}</li>
            <li>{site.contact.hours}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-5 border-t border-line flex flex-wrap justify-between gap-2 text-xs text-muted">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Order on WhatsApp · Cash on delivery · Bank transfer</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="footer-h">{title}</h4>
      <ul className="grid gap-2 text-muted">
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} className="hover:text-plum">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
