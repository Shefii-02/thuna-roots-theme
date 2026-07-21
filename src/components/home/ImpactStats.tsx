import { getImpactMetrics } from "@/lib/data";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ImpactStats() {
  const metrics = getImpactMetrics();
  return (
    <section className="bg-brand-navy py-24 text-white md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Impact so far"
            title={
              <span className="text-white">
                Change starts with one person. Progress happens{" "}
                <em className="not-italic text-accent-yellow">together.</em>
              </span>
            }
            description={
              <span className="text-white/70">
                Every number here is a person, a family, a community. Real stories behind real progress.
              </span>
            }
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                <div className="font-display text-4xl text-accent-yellow md:text-5xl">
                  <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} prefix={m.prefix ?? ""} />
                </div>
                <p className="mt-3 font-semibold text-white">{m.label}</p>
                {m.description && (
                  <p className="mt-1 text-sm text-white/60">{m.description}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
