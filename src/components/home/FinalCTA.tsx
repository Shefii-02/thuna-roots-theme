import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OrbitRings } from "@/components/shared/OrbitRings";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#FF8A3D] to-[#F5C518] py-24 text-white md:py-32">
      <OrbitRings className="opacity-60" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-accent-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent-yellow/15 blur-3xl" />

      <div className="container-page relative">
        <ScrollReveal>
          <h2 className="max-w-4xl font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Because no one should have to face life's challenges{" "}
            <span className="italic text-accent-yellow">alone.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">
            Stand with us. Support a person. Strengthen a community. Help create a better future.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent-yellow px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:brightness-95">
              Support Thuna <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/volunteer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Join our community
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
