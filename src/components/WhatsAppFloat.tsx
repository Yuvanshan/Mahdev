// Floating "Chat with us" button shown on every page (TSX).
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(`Hello ${site.name}! I have a question.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-40 right-4 bottom-4 sm:right-6 sm:bottom-6 w-14 h-14 rounded-full bg-wa text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
