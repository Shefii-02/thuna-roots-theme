import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { getPartners } from "@/lib/data";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const Route = createFileRoute("/partner")({
  head: () => pageMeta({
    title: "Partner With Us",
    description: "Corporate, community, NGO and government partnerships with Thuna Foundations.",
    path: "/partner",
  }),
  component: PartnerPage,
});

const partnershipTypes = [
  { title: "Corporate partnerships", body: "Employee giving, cause marketing, in-kind support and long-term program funding." },
  { title: "Community partnerships", body: "Village councils, cooperatives and grassroots organizations building alongside us." },
  { title: "NGO partnerships", body: "Program collaboration, shared learning and joint response networks." },
  { title: "Sponsorship", body: "Underwrite a campaign, a village program or a full initiative for the year." },
];

function PartnerPage() {
  const partners = getPartners();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent-teal/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Partner</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl text-balance">
            The best change is <em className="not-italic text-accent-yellow">built together.</em>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Ways to partner</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {partnershipTypes.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                  <h3 className="font-display text-2xl text-brand-navy">{p.title}</h3>
                  <p className="mt-3 text-brand-navy/70">{p.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">In good company</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <div key={p.id} className="rounded-3xl bg-white p-6 ring-1 ring-brand-navy/5">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/50">{p.type}</p>
                <p className="mt-2 font-display text-xl text-brand-navy">{p.name}</p>
                {p.blurb && <p className="mt-2 text-sm text-brand-navy/70">{p.blurb}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Start a conversation</h2>
          {submitted ? (
            <div className="mt-8 rounded-3xl bg-brand-cream p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-accent-green" />
              <p className="mt-4 font-display text-2xl text-brand-navy">We'll be in touch.</p>
              <p className="mt-1 text-sm text-brand-navy/60">Preview only — no data was sent.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 grid gap-4 rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Organization" required />
                <Field label="Your name" required />
                <Field label="Email" type="email" required />
                <Field label="Partnership type" />
              </div>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">How can we work together?</span>
                <textarea rows={5} className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none" />
              </label>
              <button className="mt-4 rounded-full bg-brand-navy px-6 py-4 font-semibold text-white hover:bg-brand-navy-soft">Send inquiry</button>
            </form>
          )}
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
