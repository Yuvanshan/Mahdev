// Collections page (TSX). Filtering runs on the client, so it's wrapped in Suspense
// (required by Next.js when a client component reads the URL search params).
import { Suspense } from "react";
import ShopView from "./ShopView";

export const metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted">Loading styles…</div>}>
      <ShopView />
    </Suspense>
  );
}
