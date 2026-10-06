// 404 page (TSX).
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-4xl mt-2">We couldn&apos;t find that page</h1>
      <p className="text-muted mt-2 mb-6">It may have moved or sold out.</p>
      <Link href="/collections" className="btn-primary">Browse collections</Link>
    </div>
  );
}
