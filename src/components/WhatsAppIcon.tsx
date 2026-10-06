// Simple chat-bubble icon used on WhatsApp buttons (TSX).
// A generic speech bubble with a phone handset – not the official logo artwork.
export default function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round">
      <path d="M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4.1-1.1L4 20z" />
      <path d="M9.2 8.6c.2-.4.6-.5.9-.3l.9 1.4c.1.3 0 .6-.2.8l-.4.4c.4.9 1.1 1.6 2 2l.4-.4c.2-.2.5-.3.8-.2l1.4.9c.3.2.3.6 0 .9-.6.7-1.5.9-2.3.6a6.6 6.6 0 01-3.9-3.9c-.3-.8 0-1.6.4-2.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
