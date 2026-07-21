import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getStories } from "@/lib/data";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FeaturedStories() {
  const stories = getStories();
  const [featured, ...rest] = stories;
  const others = rest.slice(0, 2);

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Stories"
              title={<>Every story deserves a chance <br className="hidden md:inline" />to change.</>}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 rounded-full border border-brand-navy/20 px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5"
            >
              All stories <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <StoryFeatureCard story={featured} />
          </ScrollReveal>
          <div className="flex flex-col gap-8 lg:col-span-5">
            {others.map((s, i) => (
              <ScrollReveal key={s.id} delay={0.1 + i * 0.05}>
                <StorySmallCard story={s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryFeatureCard({ story }: { story: ReturnType<typeof getStories>[number] }) {
  return (
    <Link
      to="/stories/$slug"
      params={{ slug: story.slug }}
      className="group block overflow-hidden rounded-[2rem] bg-brand-cream"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-coral">
          {story.category} · {story.readMinutes} min read
        </p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-brand-navy md:text-4xl">
          {story.title}
        </h3>
        <p className="mt-3 text-brand-navy/70">{story.excerpt}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
          Read story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}

function StorySmallCard({ story }: { story: ReturnType<typeof getStories>[number] }) {
  return (
    <Link
      to="/stories/$slug"
      params={{ slug: story.slug }}
      className="group grid grid-cols-5 gap-4 rounded-3xl border border-brand-navy/5 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="col-span-2 overflow-hidden rounded-2xl">
        <img
          src={story.coverImage}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="col-span-3 flex flex-col justify-center py-2 pr-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-coral">
          {story.category}
        </p>
        <h4 className="mt-1 font-display text-xl leading-tight text-brand-navy">
          {story.title}
        </h4>
        <p className="mt-2 line-clamp-2 text-sm text-brand-navy/60">{story.excerpt}</p>
      </div>
    </Link>
  );
}
