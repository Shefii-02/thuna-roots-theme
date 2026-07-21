import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValuesCircle } from "@/components/home/ValuesCircle";
import { getTestimonials } from "@/lib/data";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/about")({
  head: () => pageMeta({
    title: "About Thuna Foundations",
    description:
      "The story, purpose and values behind Thuna Foundations — a movement of people standing beside people.",
    path: "/about",
  }),
  component: AboutPage,
});

function AboutPage() {
  const testimonials = getTestimonials();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent-purple/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent-yellow/20 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">About Thuna</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl text-balance">
            A quiet promise: <em className="not-italic text-accent-yellow">you are not alone.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">
            Thuna means the reassuring presence of someone who stands beside us.
            Our foundation was built to make that presence real — in health, learning, livelihood,
            crisis, and hope.
          </p>
        </div>
      </section>

      {/* Meaning */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <ScrollReveal className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">The meaning</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-brand-navy md:text-5xl">
              Five people. One circle. A promise of togetherness.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05} className="md:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-brand-navy/75">
              <p>
                The Thuna logo shows five simplified human forms arranged in a circle —
                a shape without beginning or end. It represents connection, participation,
                and the idea that everyone has a place.
              </p>
              <p>
                We designed our entire foundation around that circle. Ten initiatives, thousands
                of volunteers, and a growing family of partners — all pointing at one shared purpose:
                nobody stands alone.
              </p>
              <p>
                Whether it's a mother facing a health crisis, a child dreaming of a classroom,
                or a village recovering from a flood, our commitment is the same.
                We show up. We listen. We stay.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy pillars */}
      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Our philosophy"
              title="How we work with people, not for them."
              description="These principles guide every decision — from a single home visit to a decade-long village program."
            />
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["Community first", "Every program is designed with the people it serves, never imposed."],
              ["Long-term commitment", "We stay for years, not weeks. Real change takes time."],
              ["Dignity always", "Support is offered as partnership — never as pity."],
            ].map(([t, d], i) => (
              <ScrollReveal key={t} delay={i * 0.05}>
                <div className="h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white font-display">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-brand-navy">{t}</h3>
                  <p className="mt-3 text-brand-navy/70">{d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ValuesCircle />

      {/* Testimonials */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading eyebrow="Voices" title="In their words." />
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                  <blockquote className="font-display text-2xl leading-snug text-brand-navy">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-auto pt-6 text-sm text-brand-navy/60">
                    <span className="font-semibold text-brand-navy">{t.name}</span> — {t.role}
                    {t.location ? `, ${t.location}` : ""}
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
