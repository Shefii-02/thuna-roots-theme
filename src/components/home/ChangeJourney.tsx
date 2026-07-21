import { getJourney } from "@/lib/data";
import { accentClasses } from "@/config/theme";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export function ChangeJourney() {
  const steps = getJourney();
  return (
    <section className="bg-brand-cream py-24 md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How change happens"
            title={<>From listening to lasting change.</>}
            description="Every partnership starts small — with a conversation, a walk through a village, a mother's story."
          />
        </ScrollReveal>

        <div className="relative mt-20 grid gap-10 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-accent-yellow via-accent-coral to-accent-green md:block" />
          {steps.map((s, i) => {
            const accent = accentClasses[s.accent];
            return (
              <ScrollReveal key={s.step} delay={i * 0.1}>
                <div className="relative flex flex-col">
                  <div className={cn("relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand-cream text-white font-display text-xl", accent.bg)}>
                    {s.step}
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-brand-navy">{s.title}</h3>
                  <p className="mt-3 text-brand-navy/70">{s.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
