import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { getImpactMetrics, getInitiatives, getTestimonials } from "@/lib/data";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { accentClasses } from "@/config/theme";
import { cn } from "@/lib/utils";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/impact")({
  head: () => pageMeta({
    title: "Our Impact",
    description:
      "The people, families, and communities Thuna Foundations stands beside — measured in real progress.",
    path: "/impact",
  }),
  component: ImpactPage,
});

function ImpactPage() {
  const metrics = getImpactMetrics();
  const initiatives = getInitiatives();
  const testimonials = getTestimonials();

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-yellow/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-accent-green/20 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Impact</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl text-balance">
            Change starts with one. Progress happens{" "}
            <em className="not-italic text-accent-yellow">together.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">
            Behind every number is a name, a family, a village. Here is what we've built together — so far.
          </p>
        </div>
      </section>

      {/* Big counters */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.05}>
              <div className="rounded-3xl border border-brand-navy/5 bg-white p-6 shadow-sm">
                <div className="font-display text-4xl text-brand-navy md:text-5xl">
                  <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} />
                </div>
                <p className="mt-3 font-semibold text-brand-navy">{m.label}</p>
                {m.description && <p className="mt-1 text-sm text-brand-navy/60">{m.description}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Impact by initiative */}
      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading eyebrow="Impact by initiative" title="Ten fronts of progress." />
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {initiatives.map((i, idx) => {
              const accent = accentClasses[i.accent];
              return (
                <ScrollReveal key={i.id} delay={idx * 0.03}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                    <div className="flex items-center gap-3">
                      <span className={cn("h-3 w-3 rounded-full", accent.bg)} />
                      <p className={cn("text-xs font-semibold uppercase tracking-widest", accent.text)}>
                        {i.name}
                      </p>
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-brand-navy">{i.title}</h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {i.impact.map((s) => (
                        <div key={s.label}>
                          <div className={cn("font-display text-2xl", accent.text)}>{s.value}</div>
                          <div className="mt-1 text-xs text-brand-navy/60">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading eyebrow="Community voices" title="What people say." />
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-brand-navy/5">
                  <blockquote className="font-display text-xl leading-snug text-brand-navy">"{t.quote}"</blockquote>
                  <figcaption className="mt-auto pt-6 text-sm text-brand-navy/60">
                    <span className="font-semibold text-brand-navy">{t.name}</span> — {t.role}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
