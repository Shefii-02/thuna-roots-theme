import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
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
            title={
              <>
                A connected ecosystem of{" "}
                <em className="not-italic text-accent-coral">people standing beside people.</em>
              </>
            }
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
              <ScrollReveal
                key={i.id}
                delay={idx * 0.03}
                className={cn(spans[idx] ?? "col-span-2")}
              >
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
      <div
        className={cn(
          "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl",
          accent.bgSoft,
          accent.text,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/50">
        {initiative.category}
      </p>
      <h3
        className={cn(
          "mt-2 font-display text-brand-navy",
          large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
        )}
      >
        {initiative.name}
      </h3>
      <p className="mt-1 text-sm text-brand-navy/60">{initiative.title}</p>
      <p className={cn("mt-4 text-brand-navy/70", large ? "text-base" : "text-sm")}>
        {initiative.shortDescription}
      </p>
      <div className={cn("mt-auto flex items-center gap-2 pt-6 text-sm font-semibold", accent.text)}>
        Explore
        <Icons.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div
        className={cn(
          "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60",
          accent.bg,
        )}
      />
    </Link>
  );
}

function UniverseOrbit({ initiatives }: { initiatives: Initiative[] }) {
  const prefersReduced = useReducedMotion();
  const N = initiatives.length;
  const radius = 260;

  // Track which initiative is selected/tapped
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const cur = initiatives.find((i) => i.slug === selectedSlug) ?? null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px]">
      {/* Dashed rotating orbit ring (visual only) */}
      <motion.svg
        viewBox="0 0 600 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        <circle
          cx="300"
          cy="300"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-brand-navy/15"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Node layer (rotates the positions, independent of dashed ring) */}
      <motion.div
        className="absolute inset-0 rounded-full"
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
              isActive={i.slug === selectedSlug}
              onSelect={() => setSelectedSlug(i.slug === selectedSlug ? null : i.slug)}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#F5C518] to-[#FF8A3D] p-8 text-center shadow-2xl shadow-[#FF8A3D]/40">
        <div className="font-display text-lg leading-tight text-[#0B1B3D]">THUNA</div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#0B1B3D]/70">
          Foundations
        </div>
        <p className="mt-1 font-display text-[15px] leading-tight">Together, we stand beside</p>
      </div>

      {/* Details panel — shown when a node is tapped */}
      <AnimatePresence mode="wait">
        {cur && (
          <motion.div
            key={cur.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute left-1/2 top-[62%] w-[380px] -translate-x-1/2 rounded-3xl border border-white/15 bg-brand-navy p-6 text-left backdrop-blur-xl shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ background: cur.accentColor }} />
              <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {cur.category}
              </div>
            </div>

            <div className="mt-2 font-display text-2xl leading-tight text-white">{cur.title}</div>

            <p className="mt-3 text-sm text-white/75">{cur.shortDescription}</p>

            <Link
              to="/initiatives/$slug"
              params={{ slug: cur.slug }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-yellow transition hover:brightness-95"
            >
              Explore {cur.name}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrbitNode({
  initiative,
  style,
  isActive,
  onSelect,
}: {
  initiative: Initiative;
  style: React.CSSProperties;
  isActive: boolean;
  onSelect: () => void;
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
        <button type="button" onClick={onSelect} className="group flex flex-col items-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-md transition group-hover:scale-110",
              isActive ? "border-2 scale-110" : "border-brand-navy/10",
              accent.text,
            )}
            style={isActive ? { borderColor: initiative.accentColor } : undefined}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={cn(
              "mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest transition",
              isActive ? "text-brand-navy" : "text-brand-navy/80",
            )}
          >
            {initiative.name}
          </span>
        </button>
      </motion.div>
    </div>
  );
}