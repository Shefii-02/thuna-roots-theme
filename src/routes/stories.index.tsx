import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { pageMeta } from "@/lib/seo";
import { getStories } from "@/lib/data";
import { StoryCard } from "@/components/stories/StoryCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/stories/")({
  head: () => pageMeta({
    title: "Stories",
    description: "Real people, real change. Stories from the people we stand beside.",
    path: "/stories",
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const all = getStories();
  const featured = all.find((s) => s.featured) ?? all[0];
  const rest = all.filter((s) => s.id !== featured.id);
  const categories = ["All", ...Array.from(new Set(all.map((s) => s.category)))];
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => (cat === "All" ? rest : rest.filter((s) => s.category === cat)), [cat, rest]);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Stories</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl text-balance">
            Every story deserves a chance <em className="not-italic text-accent-yellow">to change.</em>
          </h1>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Link
            to="/stories/$slug"
            params={{ slug: featured.slug }}
            className="group grid gap-8 overflow-hidden rounded-[2.5rem] bg-brand-cream lg:grid-cols-12"
          >
            <div className="aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto">
              <img src={featured.coverImage} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-coral">
                Featured · {featured.category}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-brand-navy md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-brand-navy/70">{featured.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                Read story <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Filters */}
          <div className="mt-16 flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  cat === c
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-navy/15 text-brand-navy/70 hover:border-brand-navy/40 hover:text-brand-navy",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.04}>
                <StoryCard story={s} />
              </ScrollReveal>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-brand-navy/60">No stories in this category yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
