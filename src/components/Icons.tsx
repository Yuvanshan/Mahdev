// Lightweight inline SVG icons (TSX) – avoids an extra icon dependency.
type P = { className?: string };
const base = "w-5 h-5";

export const IconUser = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
);
export const IconHeart = ({ className = base, filled = false }: P & { filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z" /></svg>
);
export const IconBag = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
);
export const IconMenu = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconTag = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.5" /></svg>
);
export const IconSpark = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" /></svg>
);
export const IconCard = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></svg>
);
export const IconReturn = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><path d="M9 14L4 9l5-5" /><path d="M4 9h11a5 5 0 010 10h-3" /></svg>
);
export const IconStar = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9l3-7z" /></svg>
);
export const IconSearch = ({ className = base }: P) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);
