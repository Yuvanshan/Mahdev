// Trust/benefit strip with a rating badge (TSX).
import { IconCard, IconReturn, IconSpark, IconStar, IconTag } from "./Icons";

const features = [
  { icon: IconTag, title: "Fair Prices", text: "Style that respects your budget" },
  { icon: IconSpark, title: "Hand-picked Quality", text: "Every piece checked before it ships" },
  { icon: IconCard, title: "Flexible Payment", text: "Card, bank transfer or cash on delivery" },
  { icon: IconReturn, title: "Easy Returns", text: "Simple exchanges if it isn't right" },
];

export default function Features() {
  return (
    <section className="bg-blush/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <span className="w-12 h-12 rounded-full bg-white text-plum flex items-center justify-center shadow-sm">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-ink/60">{text}</p>
            </div>
          ))}
        </div>

        {/* Rating badge – replace with your real review figures */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow-sm text-sm">
            <span className="flex text-amber-400">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</span>
            <span><strong>4.8/5</strong> from happy customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
