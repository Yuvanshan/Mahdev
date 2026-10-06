// Contact page (TSX).
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";

export const metadata = { title: "Plan an Event" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Let’s plan something memorable" crumb="Event enquiries" sub="Tell us a little about the occasion you have in mind." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />
        <div className="self-start rounded-3xl bg-plum p-7 text-white sm:p-9">
          <p className="text-xs uppercase tracking-[0.22em] text-lilac">A good place to start</p>
          <h2 className="mt-4 font-serif text-3xl">It all begins with a conversation.</h2>
          <p className="mt-4 text-sm leading-6 text-white/75">
            Share the kind of event you&apos;re planning, your preferred date and anything you&apos;re already dreaming about. We&apos;ll take it from there, together.
          </p>
        </div>
      </div>
    </>
  );
}
