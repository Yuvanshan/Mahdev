"use client";
// Contact form (TSX) – sends the message through WhatsApp, like orders.
import { useState } from "react";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const TOPICS = ["Corporate event", "Wedding or celebration", "Private event", "Event consultation", "Other"];

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
      <div>
        <h2 className="font-serif text-2xl">Tell us about your event</h2>
        <p className="mt-2 text-sm leading-6 text-muted">A few details will help us start planning with you.</p>
      </div>
      <label className="grid gap-1 text-sm"><span className="text-muted">Your name</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} required /></label>
      <label className="grid gap-1 text-sm"><span className="text-muted">What are you planning?</span>
        <select className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="grid gap-1 text-sm"><span className="text-muted">Your event details</span><textarea className="input" rows={5} placeholder="Date, guest count, location, or anything you have in mind…" value={msg} onChange={(e) => setMsg(e.target.value)} required /></label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="btn-whatsapp"><WhatsAppIcon /> Send event enquiry</button>
    </form>
  );
}
