// About page (TSX).
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata = { title: "About Us" };

const VALUES = [
  ["Made for our weather", "Linen, cotton and light crepes chosen for humid days."],
  ["Honest pricing", "No inflated “original” prices. Our sales are real sales."],
  ["People first", "A real person answers every WhatsApp message, usually within the hour."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Our Story" crumb="About Us" />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl sm:text-3xl leading-snug">
            {site.name} started with a simple idea: good-looking clothes shouldn&apos;t cost a week&apos;s salary or fall apart after three washes.
          </p>
          <p className="text-muted mt-6">
            We&apos;re a small team choosing every style by hand. We look for soft, breathable fabrics that suit our climate, cuts that flatter real bodies,
            and finishes that hold up. Then we price them fairly and deliver to every district.
          </p>
          <p className="text-muted mt-4">New pieces arrive every week, and we listen closely to what our customers ask for. If something isn&apos;t right, we&apos;ll make it right.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {VALUES.map(([t, d]) => (
            <div key={t} className="bg-white border border-line rounded-2xl p-6">
              <h3 className="font-serif text-2xl">{t}</h3>
              <p className="text-muted mt-1 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
