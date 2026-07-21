import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { getFaqs } from "@/lib/data";
import { site } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta({
    title: "Contact",
    description: "Reach the Thuna Foundations team.",
    path: "/contact",
  }),
  component: ContactPage,
});

function ContactPage() {
  const faqs = getFaqs();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent-purple/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Contact</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl text-balance">
            Let's talk. We'd love <em className="not-italic text-accent-yellow">to hear from you.</em>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Reach us</h2>
            <ul className="mt-8 space-y-5 text-brand-navy/80">
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-accent-coral" /> <a href={`mailto:${site.email}`} className="hover:text-brand-navy">{site.email}</a></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-accent-yellow" /> {site.phone}</li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-accent-green" /> {site.address}</li>
            </ul>
            <div className="mt-10 aspect-video overflow-hidden rounded-3xl bg-brand-cream">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                alt="Community members meeting outside"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="rounded-[2rem] bg-brand-cream p-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent-green" />
                <p className="mt-4 font-display text-2xl text-brand-navy">Thanks — message received.</p>
                <p className="mt-1 text-sm text-brand-navy/60">Preview only — no data was sent.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid gap-4 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-brand-navy/5 md:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required />
                  <Field label="Email" type="email" required />
                  <Field label="Subject" />
                  <Field label="Related to" />
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Message</span>
                  <textarea rows={5} className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none" />
                </label>
                <button className="mt-4 rounded-full bg-brand-navy px-6 py-4 font-semibold text-white hover:bg-brand-navy-soft">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Frequently asked</h2>
          <div className="mt-8 divide-y divide-brand-navy/10 rounded-3xl bg-white shadow-sm ring-1 ring-brand-navy/5">
            {faqs.map((f) => (
              <details key={f.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-brand-navy">
                  {f.question}
                  <span className="ml-4 text-brand-navy/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-brand-navy/70">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">{label}{required && " *"}</span>
      <input type={type} required={required}
        className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none" />
    </label>
  );
}
