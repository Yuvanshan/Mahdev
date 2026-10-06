// Full-width event-planning hero.
import Link from "next/link";

export default function Hero() {
  return (
    <section className="event-hero relative isolate min-h-[650px] overflow-hidden sm:min-h-[730px]">
      <div className="event-hero-image absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#15211d]/85 via-[#15211d]/55 to-[#15211d]/5" />
      <div className="mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24 sm:min-h-[730px] sm:px-10 lg:px-12">
        <div className="max-w-2xl animate-rise text-white">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.32em] text-[#e8c991] sm:text-sm">Mahdev Pvt Ltd · Event experiences</p>
          <h1 className="font-serif text-5xl leading-[1.04] sm:text-7xl lg:text-[88px]">
            Make it a day <em className="font-normal text-[#e8c991]">to remember.</em>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            From the first spark of an idea to the final toast, we bring every detail—and every moment—beautifully together.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/#contact" className="btn-primary">Plan your event <span aria-hidden="true">↗</span></Link>
            <Link href="/#experiences" className="btn-ghost">Explore our work</Link>
          </div>
          <div className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="h-px w-12 bg-[#e8c991]" />
            Moments made meaningful
          </div>
        </div>
      </div>
    </section>
  );
}
