import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Story } from "@/types";

export function StoryCard({ story }: { story: Story }) {
  const date = new Date(story.date).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
  return (
    <Link
      to="/stories/$slug"
      params={{ slug: story.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-coral">
          {story.category} · {story.readMinutes} min
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-brand-navy">{story.title}</h3>
        <p className="mt-3 text-sm text-brand-navy/70">{story.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-brand-navy/50">
          <span>{date}</span>
          <ArrowUpRight className="h-4 w-4 text-brand-navy transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
