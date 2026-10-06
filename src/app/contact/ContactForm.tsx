"use client";
// Contact form (TSX) – sends the message through WhatsApp, like orders.
import { useState } from "react";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const TOPICS = ["Product question", "Order update", "Exchange", "Sizing help", "Wholesale", "Other"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) { setError("Add your name and a message."); return; }
    setError("");
    const text = `Hello ${site.name}!\nName: ${name}\nTopic: ${topic}\n\n${msg}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="bg-white border border-line rounded-3xl p-6 sm:p-8 grid gap-4" noValidate>
      <h2 className="font-serif text-2xl">Send us a message</h2>
      <label className="grid gap-1 text-sm"><span className="text-muted">Name</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label className="grid gap-1 text-sm"><span className="text-muted">Topic</span>
        <select className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="grid gap-1 text-sm"><span className="text-muted">Message</span><textarea className="input" rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="btn-whatsapp"><WhatsAppIcon /> Send on WhatsApp</button>
    </form>
  );
}
