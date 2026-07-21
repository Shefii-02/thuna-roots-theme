import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, Clock } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { getInitiativeBySlug, getVolunteerOpportunities } from "@/lib/data";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/volunteer")({
  head: () => pageMeta({
    title: "Volunteer",
    description: "Give your time, skills and energy. Explore Thuna Foundations volunteer opportunities.",
    path: "/volunteer",
  }),
  component: VolunteerPage,
});

function VolunteerPage() {
  const opps = getVolunteerOpportunities();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Volunteer</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl text-balance">
            Give what only you can give: <em className="not-italic text-accent-yellow">your presence.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">Mentors, medics, teachers, builders, listeners — every skill matters.</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Open opportunities</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {opps.map((o, i) => {
              const initiative = getInitiativeBySlug(o.initiativeSlug);
              return (
                <ScrollReveal key={o.id} delay={i * 0.04}>
                  <article className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-coral">{initiative?.name}</p>
                    <h3 className="mt-2 font-display text-2xl text-brand-navy">{o.title}</h3>
                    <p className="mt-3 text-brand-navy/70">{o.description}</p>
                    <div className="mt-6 grid gap-3 text-sm text-brand-navy/70">
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {o.location}</div>
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {o.commitment}</div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {o.skills.map((s) => (
                        <span key={s} className="rounded-full bg-brand-cream px-3 py-1 text-xs text-brand-navy/70">{s}</span>
                      ))}
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl leading-tight text-brand-navy md:text-5xl">Apply to volunteer</h2>
            <p className="mt-4 text-brand-navy/70">Tell us a bit about yourself and where you'd like to help. We'll be in touch within a week.</p>
          </div>
          <div className="md:col-span-7">
            {submitted ? (
              <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent-green" />
                <p className="mt-4 font-display text-2xl text-brand-navy">Thank you for stepping up.</p>
                <p className="mt-2 text-brand-navy/60">Preview only — no data was sent.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="grid gap-4 rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Full name" required />
                  <TextField label="Email" type="email" required />
                  <TextField label="Location" />
                  <TextField label="Skills / experience" />
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Message</span>
                  <textarea rows={4}
                    className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none" />
                </label>
                <button className={cn("mt-4 rounded-full bg-brand-navy px-6 py-4 font-semibold text-white transition hover:bg-brand-navy-soft")}>
                  Submit application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function TextField({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">{label}{required && " *"}</span>
      <input type={type} required={required}
        className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none" />
    </label>
  );
}
