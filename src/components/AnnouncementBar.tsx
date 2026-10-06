"use client";
// Rotating announcement strip at the very top of every page (TSX).
import { useEffect, useState } from "react";
import { site } from "@/config/site";

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  // Cycle through the messages every 3.5 seconds
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % site.announcements.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-plum text-white text-xs sm:text-sm tracking-wide">
      <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-center">
        {/* key forces re-mount so the fade animation replays on each change */}
        <p key={i} className="animate-fade">{site.announcements[i]}</p>
      </div>
    </div>
  );
}
