import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrbitRings } from "@/components/shared/OrbitRings";
import { brand } from "@/config/theme";

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const anim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white pt-28 pb-24 md:pt-40 md:pb-32">
      <OrbitRings className="opacity-70" />
      {/* Color halos */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-accent-yellow/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-purple/25 blur-3xl" />

      <div className="container-page relative">
        <motion.div {...anim(0)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-accent-yellow" />
          10 Initiatives · One Purpose · A Better Future
        </motion.div>

        <motion.h1
          {...anim(0.1)}
          className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px] text-balance"
        >
          {brand.tagline.split(",").map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && <span className="text-accent-yellow">,</span>}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...anim(0.2)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl text-pretty"
        >
          Building stronger people, healthier communities and a more hopeful future — together.
        </motion.p>

        <motion.div {...anim(0.3)} className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/donate"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-yellow px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:brightness-95"
          >
            Support Our Mission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/initiatives"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Explore Our Initiatives
          </Link>
        </motion.div>

        {/* Small stat row */}
        <motion.div {...anim(0.4)} className="mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["10", "Initiatives"],
            ["640+", "Communities"],
            ["128k+", "People supported"],
            ["3,120", "Volunteers"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-2xl text-accent-yellow md:text-3xl">{v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
