// Product/category visual (TSX).
// Shows the real photo when `image` is provided; otherwise an elegant gradient placeholder
// with a simple garment outline so the layout looks finished before photos exist.
import Image from "next/image";

type Props = { name: string; tones: [string, string]; image?: string; className?: string; priority?: boolean };

export default function ProductImage({ name, tones, image, className = "", priority }: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={name} fill priority={priority} sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(160deg, ${tones[0]}, ${tones[1]})` }}
    >
      {/* Decorative hanger + dress outline */}
      <svg viewBox="0 0 100 120" className="w-2/5 opacity-60 text-white drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M50 8a6 6 0 116 6c-3 0-6 2-6 6" />
        <path d="M50 20L20 34h60L50 20z" />
        <path d="M36 34l-4 20 8 4-12 56h44l-12-56 8-4-4-20" />
      </svg>
      <span className="absolute bottom-3 left-0 right-0 text-center font-serif italic text-white/80 text-sm px-2 truncate">{name}</span>
    </div>
  );
}
