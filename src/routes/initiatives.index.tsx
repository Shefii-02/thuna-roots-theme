import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { pageMeta } from "@/lib/seo";
import { getInitiatives } from "@/lib/data";
import { InitiativeCard } from "@/components/initiatives/InitiativeCard";
import { InitiativeUniverse } from "@/components/home/InitiativeUniverse";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/initiatives/")({
  head: () => pageMeta({
    title: "Initiatives",
    description:
      "Ten connected initiatives across health, education, livelihood, environment, and emergency response.",
    path: "/initiatives",
  }),
  component: InitiativesPage,
});

function InitiativesPage() {
  const all = getInitiatives();
  const categories = ["All", ...Array.from(new Set(all.map((i) => i.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? all : all.filter((i) => i.category === active);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -left-24 top-16 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent-teal/20 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Initiatives</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl text-balance">
            Ten promises. <em className="not-italic text-accent-yellow">One purpose.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">
            Each initiative addresses a specific need. Together, they form a full ecosystem of
            support — because life doesn't come in one category.
          </p>
        </div>
      </section>

      <InitiativeUniverse />

      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  active === c
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-navy/15 text-brand-navy/70 hover:border-brand-navy/40 hover:text-brand-navy",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i, idx) => (
              <ScrollReveal key={i.id} delay={idx * 0.03}>
                <InitiativeCard initiative={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
