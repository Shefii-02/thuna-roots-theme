import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { Initiative } from "@/types";
import { accentClasses } from "@/config/theme";
import { cn } from "@/lib/utils";

export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const accent = accentClasses[initiative.accent];
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    initiative.icon
  ] ?? Icons.Sparkles;
  return (
    <Link
      to="/initiatives/$slug"
      params={{ slug: initiative.slug }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={initiative.heroImage}
          alt={initiative.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={cn("absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-md", accent.bg, "text-white")}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={cn("text-xs font-semibold uppercase tracking-widest", accent.text)}>
          {initiative.category}
        </p>
        <h3 className="mt-2 font-display text-2xl text-brand-navy">{initiative.name}</h3>
        <p className="mt-1 text-sm text-brand-navy/60">{initiative.title}</p>
        <p className="mt-4 text-brand-navy/70">{initiative.shortDescription}</p>
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-brand-navy">
          Explore
          <Icons.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
