import * as Icons from "lucide-react";
import { getValues } from "@/lib/data";
import { accentClasses } from "@/config/theme";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export function ValuesCircle() {
  const values = getValues();

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            align="center"
            eyebrow="Our values"
            title={<>Six commitments that shape everything we do.</>}
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const accent = accentClasses[v.accent];
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              v.icon
            ] ?? Icons.Sparkles;
            return (
              <ScrollReveal key={v.name} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-brand-navy/5 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className={cn("mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl", accent.bgSoft, accent.text)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl text-brand-navy">{v.name}</h3>
                  <p className="mt-2 text-brand-navy/70">{v.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
