// Full-width hero (TSX).
// Shows an animated gradient, or a background video when site.heroVideo is set.
import Link from "next/link";
import { site } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden">
      {/* Animated gradient fallback layer */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Optional video layer – set site.heroVideo (e.g. "/hero.mp4") to enable */}
      {site.heroVideo && (
        <video className="absolute inset-0 w-full h-full object-cover" src={site.heroVideo} autoPlay muted loop playsInline />
      )}

      {/* Darkening overlay so text stays readable over any footage */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center">
        <div className="max-w-xl text-white animate-rise">
          <p className="uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 text-white/80">New season edit</p>
          <h1 className="font-serif text-4xl sm:text-6xl leading-tight mb-5">
            Dress the way <em className="text-lilac">you</em> feel
          </h1>
          <p className="text-white/85 text-base sm:text-lg mb-8">
            Trend-led pieces, soft fabrics and honest prices – curated for everyday confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/new-arrivals" className="btn-primary">Shop New Arrivals</Link>
            <Link href="/collections" className="btn-ghost">Explore Collections</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
