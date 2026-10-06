// Help / FAQ page (TSX), including how WhatsApp ordering works and a size guide.
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { formatPrice, site } from "@/config/site";

export const metadata = { title: "Help & FAQ" };

const FAQ: [string, string][] = [
  ["How do I place an order?", "Add items to your bag, press “Order on WhatsApp”, fill in your delivery details and press Send in WhatsApp. We reply to confirm stock, total and delivery time."],
  ["Can I order a single item quickly?", "Yes. On any product page, choose your size and tap “Order this on WhatsApp”."],
  ["How do I pay?", "Cash on delivery anywhere we deliver, or bank transfer. We share bank details on WhatsApp when you choose transfer."],
  ["How long does delivery take?", "Colombo and suburbs: 1–2 working days. Other districts: 2–4 working days."],
  ["How much is delivery?", `${formatPrice(site.delivery.fee)} island-wide, free on orders over ${formatPrice(site.delivery.freeOver)}.`],
  ["What is your exchange policy?", "Exchange unworn items with tags within 7 days. Message us on WhatsApp and we'll arrange it."],
];

const SIZES = [
  ["XS", "6", "31–32", "24–25", "34–35"],
  ["S", "8", "33–34", "26–27", "36–37"],
  ["M", "10", "35–36", "28–29", "38–39"],
  ["L", "12", "37–39", "30–32", "40–42"],
  ["XL", "14", "40–42", "33–35", "43–45"],
];

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Help & FAQ" crumb="Help" />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0} className="border-b border-line py-4 group">
              <summary className="cursor-pointer font-medium list-none flex justify-between gap-4">{q}<span className="group-open:rotate-45 transition-transform">+</span></summary>
              <p className="text-muted mt-2 text-sm">{a}</p>
            </details>
          ))}
        </div>

        <h2 id="size-guide" className="font-serif text-3xl mt-14 mb-4 scroll-mt-24">Size guide</h2>
        <p className="text-muted text-sm mb-4">Body measurements in inches (UK sizing).</p>
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-blush text-left">
              <tr>{["Size", "UK", "Bust", "Waist", "Hips"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {SIZES.map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className="px-4 py-3">{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted mb-3">Still need help?</p>
          <Link href="/contact" className="btn-primary">Contact us</Link>
        </div>
      </div>
    </>
  );
}
