import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import * as Icons from "lucide-react";
import { getInitiatives } from "@/lib/data";
import { accentClasses } from "@/config/theme";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Initiative } from "@/types";
import { cn } from "@/lib/utils";

// The "Initiative Universe": a central Thuna hub with initiatives orbiting.
// On mobile it collapses into an editorial vertical list.
export function InitiativeUniverse() {
  const initiatives = getInitiatives();

  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            eyebrow="10 Initiatives · One Purpose"
            title={<>A connected ecosystem of <em className="not-italic text-accent-coral">people standing beside people.</em></>}
            description="Each initiative is a distinct promise — health, learning, livelihood, dignity, hope. Together they form one purpose: no one stands alone."
          />
        </ScrollReveal>

        {/* Desktop: orbit visualization */}
        <div className="mt-20 hidden lg:block">
          <UniverseOrbit initiatives={initiatives} />
        </div>

        {/* Mobile + tablet: editorial asymmetric grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:hidden">
          {initiatives.map((i, idx) => (
            <ScrollReveal key={i.id} delay={idx * 0.05}>
              <InitiativeTile initiative={i} large={idx === 0} />
            </ScrollReveal>
          ))}
        </div>

        {/* All-initiatives grid on desktop too, as an editorial layout */}
        <div className="mt-14 hidden grid-cols-6 gap-5 lg:grid">
          {initiatives.map((i, idx) => {
            const spans = [
              "col-span-3 row-span-2",
              "col-span-3",
              "col-span-2",
              "col-span-2",
              "col-span-2",
              "col-span-2",
              "col-span-2",
              "col-span-2",
              "col-span-3",
              "col-span-3",
            ];
            return (
              <ScrollReveal key={i.id} delay={idx * 0.03} className={cn(spans[idx] ?? "col-span-2")}>
                <InitiativeTile initiative={i} large={idx === 0} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InitiativeTile({ initiative, large }: { initiative: Initiative; large?: boolean }) {
  const accent = accentClasses[initiative.accent];
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    initiative.icon
  ] ?? Icons.Sparkles;
  return (
    <Link
      to="/initiatives/$slug"
      params={{ slug: initiative.slug }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl",
        large && "md:p-10",
      )}
    >
      <div className={cn("mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl", accent.bgSoft, accent.text)}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/50">
        {initiative.category}
      </p>
      <h3 className={cn("mt-2 font-display text-brand-navy", large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")}>
        {initiative.name}
      </h3>
      <p className="mt-1 text-sm text-brand-navy/60">{initiative.title}</p>
      <p className={cn("mt-4 text-brand-navy/70", large ? "text-base" : "text-sm")}>{initiative.shortDescription}</p>
      <div className={cn("mt-auto flex items-center gap-2 pt-6 text-sm font-semibold", accent.text)}>
        Explore
        <Icons.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className={cn("absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60", accent.bg)} />
    </Link>
  );
}

function UniverseOrbit({ initiatives }: { initiatives: Initiative[] }) {
  const prefersReduced = useReducedMotion();
  const N = initiatives.length;
  const radius = 260;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px]">
      <motion.div
        className="absolute inset-0 rounded-full border border-brand-navy/10"
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      >
        {initiatives.map((i, idx) => {
          const angle = (Math.PI * 2 * idx) / N - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <OrbitNode
              key={i.id}
              initiative={i}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-brand-navy text-center text-white shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-yellow">Thuna</p>
        <p className="mt-1 font-display text-2xl leading-tight">Together, we stand beside</p>
      </div>
    </div>
  );
}

function OrbitNode({
  initiative,
  style,
}: {
  initiative: Initiative;
  style: React.CSSProperties;
}) {
  const accent = accentClasses[initiative.accent];
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    initiative.icon
  ] ?? Icons.Sparkles;
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
      {/* counter-rotate so text stays upright */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      >
        <Link
          to="/initiatives/$slug"
          params={{ slug: initiative.slug }}
          className="group flex flex-col items-center"
        >
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full border border-brand-navy/10 bg-white shadow-md transition group-hover:scale-110",
              accent.text,
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-brand-navy/80">
            {initiative.name}
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
