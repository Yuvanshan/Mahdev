import Link from "next/link";
import Hero from "@/components/Hero";

const services = [
  {
    number: "01",
    title: "Corporate events",
    description: "Conferences, launches and team gatherings shaped around your people, your purpose and your brand.",
    image: "photo-1511578314322-379afb476865",
  },
  {
    number: "02",
    title: "Weddings & celebrations",
    description: "Personal, heartfelt occasions where the little details feel just as special as the big moments.",
    image: "photo-1519741497674-611481863552",
  },
  {
    number: "03",
    title: "Private experiences",
    description: "Milestones, dinners and get-togethers, thoughtfully brought to life for the people who matter.",
    image: "photo-1519167758481-83f550bb49b3",
  },
];

const steps = [
  ["We listen", "We start with your idea, your priorities and the feeling you want everyone to take home."],
  ["We plan", "We bring together the details, creative direction and trusted suppliers that make your event yours."],
  ["We make it happen", "We coordinate the moving pieces and take care of the day, so you can be present for it."],
];

const imageUrl = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-b border-[#e8e4dc] bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-7 px-6 py-8 sm:grid-cols-4 sm:px-10 lg:px-12">
          {[
            ["Thoughtful", "from first idea"],
            ["Personal", "to your occasion"],
            ["Considered", "down to the details"],
            ["Seamless", "on the day"],
          ].map(([title, detail]) => (
            <div key={title} className="border-l border-[#c7ae7c] pl-4 sm:pl-6">
              <p className="font-serif text-xl text-[#20372e] sm:text-2xl">{title}</p>
              <p className="mt-1 text-xs text-[#77746d] sm:text-sm">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#f3f1eb] px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-[#20372e] sm:text-5xl">A good event feels like <em>you.</em></h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#77746d]">
              No two occasions are the same. We shape the planning around what matters most to you.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="group overflow-hidden bg-white">
                <div
                  role="img"
                  aria-label={service.title}
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url("${imageUrl(service.image, 900)}")` }}
                />
                <div className="relative bg-white px-6 pb-7 pt-6">
                  <span className="absolute right-6 top-6 font-serif text-sm text-[#a38958]">{service.number}</span>
                  <h3 className="font-serif text-2xl text-[#20372e]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#77746d]">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="scroll-mt-24 bg-[#faf9f6] px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="relative min-h-[420px] sm:min-h-[570px]">
            <div
              role="img"
              aria-label="A candlelit event table set for a celebration"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${imageUrl("photo-1511795409834-ef04bbd61622", 1200)}")` }}
            />
            <div className="absolute -bottom-5 -right-4 hidden h-40 w-40 border-b border-r border-[#b79559] sm:block" />
            <div className="absolute bottom-5 left-5 bg-[#faf9f6] px-5 py-4 sm:bottom-8 sm:left-8">
              <p className="font-serif text-lg text-[#20372e]">Made for the moment</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#81775f]">And everyone in it</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">The Mahdev approach</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#20372e] sm:text-5xl">Beautiful is good.<br /><em>Meaningful is better.</em></h2>
            <p className="mt-6 text-base leading-7 text-[#77746d]">
              The best events aren&apos;t just lovely to look at. They make people feel welcomed, connected and part of something. That&apos;s the feeling we plan for.
            </p>
            <p className="mt-4 text-base leading-7 text-[#77746d]">
              We bring creative thinking, careful coordination and a personal touch to every celebration—so the experience feels effortless for you and unforgettable for your guests.
            </p>
            <Link href="/#contact" className="mt-8 inline-flex items-center gap-3 border-b border-[#a38958] pb-2 text-sm font-medium text-[#20372e] transition hover:text-[#a38958]">
              Tell us what you&apos;re imagining <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-[#20372e] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#e8c991]">A little about us</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">We take care of the details.<br /><em>You make the memories.</em></h2>
            <p className="mt-6 text-base leading-7 text-white/70">
              Mahdev Pvt Ltd is an event management company built around one simple idea: planning should feel as considered as the occasion itself. We work closely with you to turn your vision into a thoughtful, well-run experience.
            </p>
          </div>
          <div className="mt-14 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
            {[
              ["Personal by nature", "Your priorities shape the plan, from the first conversation to the last guest."],
              ["Details with purpose", "Every decision has a reason—and belongs to the story you want to tell."],
              ["Calm, capable coordination", "A considered plan helps you spend less time managing and more time enjoying."],
            ].map(([title, detail]) => (
              <div key={title}>
                <h3 className="font-serif text-2xl text-[#e8c991]">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f6] px-6 py-20 sm:px-10 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="eyebrow">From idea to occasion</p>
            <h2 className="mt-3 font-serif text-4xl text-[#20372e] sm:text-5xl">A thoughtful process.<br /><em>A lovely day.</em></h2>
          </div>
          <ol className="grid gap-9 md:grid-cols-3">
            {steps.map(([title, text], index) => (
              <li key={title} className="border-t border-[#c7ae7c] pt-5">
                <span className="font-serif text-3xl text-[#a38958]">0{index + 1}</span>
                <h3 className="mt-4 font-serif text-2xl text-[#20372e]">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#77746d]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#e8e3d8] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Your occasion, your way</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#20372e] sm:text-6xl">Let&apos;s make something <em>memorable.</em></h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#68665e] sm:text-base">
            Whether you have a clear plan or just the beginning of an idea, we&apos;re here to help you take the next step.
          </p>
          <Link href="/contact" className="btn-primary mt-8">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
