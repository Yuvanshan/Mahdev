// Soft banner at the top of inner pages (TSX).
export default function PageHeader({ title, crumb, sub }: { title: string; crumb: string; sub?: string }) {
  return (
    <div className="bg-blush py-10 text-center">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs text-muted mb-1">Home / {crumb}</p>
        <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
        {sub && <p className="text-muted mt-2">{sub}</p>}
      </div>
    </div>
  );
}
