// Contact page (TSX).
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" crumb="Contact" sub="We usually reply within an hour, Mon–Sat" />
      <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <ContactForm />
        <div className="bg-white border border-line rounded-3xl p-6 grid gap-5 self-start text-sm">
          {[
            ["Showroom", site.contact.address],
            ["Phone / WhatsApp", site.contact.phone],
            ["Email", site.contact.email],
            ["Hours", site.contact.hours],
          ].map(([k, v]) => (
            <div key={k}><p className="eyebrow">{k}</p><p className="mt-1 select-all">{v}</p></div>
          ))}
        </div>
      </div>
    </>
  );
}
