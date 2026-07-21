import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  getCampaignsForInitiative,
  getInitiativeBySlug,
  getRelatedInitiatives,
  getStoriesForInitiative,
} from "@/lib/data";
import { accentClasses } from "@/config/theme";
import { InitiativeCard } from "@/components/initiatives/InitiativeCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/initiatives/$slug")({
  loader: ({ params }) => {
    const initiative = getInitiativeBySlug(params.slug);
    if (!initiative) throw notFound();
    return { initiative };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Initiative — Thuna Foundations" }, { name: "robots", content: "noindex" }],
        links: [],
      };
    }
    const i = loaderData.initiative;
    const base = pageMeta({
      title: `${i.name} · ${i.title}`,
      description: i.shortDescription,
      path: `/initiatives/${params.slug}`,
      image: i.heroImage,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Initiatives", path: "/initiatives" },
          { name: i.name, path: `/initiatives/${i.slug}` },
        ]),
      ],
    };
  },
  component: InitiativeDetail,
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="font-display text-4xl text-brand-navy">Initiative not found</h1>
      <Link to="/initiatives" className="mt-6 inline-block text-brand-navy underline">
        See all initiatives
      </Link>
    </div>
  ),
});

function InitiativeDetail() {
  const { initiative } = Route.useLoaderData() as { initiative: import("@/types").Initiative };
  const accent = accentClasses[initiative.accent];
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    initiative.icon
  ] ?? Icons.Sparkles;

  const relatedStories = getStoriesForInitiative(initiative.slug);
  const relatedCampaigns = getCampaignsForInitiative(initiative.slug);
  const relatedInitiatives = getRelatedInitiatives(initiative.slug, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-32 pb-20 md:pt-40 md:pb-28">
        <img
          src={initiative.heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/85 to-brand-navy")} />
        <div className="container-page relative">
          <div className="flex items-center gap-3 text-white/70">
            <Link to="/initiatives" className="hover:text-accent-yellow">Initiatives</Link>
            <span>/</span>
            <span className="text-white">{initiative.category}</span>
          </div>
          <div className="mt-8 flex items-start gap-5">
            <div className={cn("inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white", accent.bg)}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">
                {initiative.category}
              </p>
              <h1 className="mt-2 font-display text-5xl leading-tight text-white md:text-6xl">
                {initiative.name}
              </h1>
              <p className="mt-2 text-lg text-white/70">{initiative.title}</p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/85 text-pretty">
            {initiative.description}
          </p>
        </div>
      </section>

      {/* Impact strip */}
      <section className={cn("py-12", accent.bgSoft)}>
        <div className="container-page grid gap-8 sm:grid-cols-3">
          {initiative.impact.map((s) => (
            <div key={s.label}>
              <div className={cn("font-display text-4xl md:text-5xl", accent.text)}>{s.value}</div>
              <div className="mt-1 text-sm text-brand-navy/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Long description + highlights */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <ScrollReveal className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">Mission</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-brand-navy md:text-5xl">
              What we do, in depth.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              {initiative.longDescription}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05} className="md:col-span-5">
            <div className="rounded-3xl border border-brand-navy/5 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">Highlights</p>
              <ul className="mt-5 space-y-3">
                {initiative.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className={cn("mt-2 h-2 w-2 flex-none rounded-full", accent.bg)} />
                    <span className="text-brand-navy/80">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Focus areas */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">Key focus areas</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {initiative.focusAreas.map((f) => (
              <span key={f} className={cn("rounded-full border px-4 py-2 text-sm font-medium", accent.border, accent.text)}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {initiative.gallery.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-page">
            <div className="grid gap-4 md:grid-cols-3">
              {initiative.gallery.map((src, idx) => (
                <ScrollReveal key={src} delay={idx * 0.05}>
                  <img
                    src={src}
                    alt={`${initiative.name} gallery`}
                    loading="lazy"
                    className={cn(
                      "w-full rounded-3xl object-cover",
                      idx === 0 ? "aspect-[4/5]" : "aspect-square",
                    )}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related stories */}
      {relatedStories.length > 0 && (
        <section className="bg-brand-cream py-24 md:py-32">
          <div className="container-page">
            <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Stories from {initiative.name}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((s) => <StoryCard key={s.id} story={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Related campaigns */}
      {relatedCampaigns.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-page">
            <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Active campaigns</h2>
            <ul className="mt-8 divide-y divide-brand-navy/10">
              {relatedCampaigns.map((c) => (
                <li key={c.id}>
                  <Link to="/campaigns/$slug" params={{ slug: c.slug }} className="flex items-center justify-between gap-6 py-6 hover:text-brand-navy">
                    <div>
                      <p className="font-display text-2xl text-brand-navy">{c.title}</p>
                      <p className="mt-1 text-sm text-brand-navy/60">{c.summary}</p>
                    </div>
                    <Icons.ArrowUpRight className="h-6 w-6 shrink-0 text-brand-navy" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related initiatives */}
      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Explore related initiatives</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInitiatives.map((i) => (
              <InitiativeCard key={i.id} initiative={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("py-24 text-white md:py-32 relative overflow-hidden", accent.bg)}>
        <div className="container-page relative">
          <h2 className="max-w-3xl font-display text-4xl leading-tight text-white md:text-6xl text-balance">
            Stand with {initiative.name}.
          </h2>
          <p className="mt-4 max-w-xl text-white/85">
            Your support directly powers this work — every dollar, every hour, every voice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/donate" className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-cream">
              Donate to this initiative
            </Link>
            <Link to="/volunteer" className="rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              Volunteer with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
