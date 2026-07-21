import { Link } from "@tanstack/react-router";
import type { Campaign } from "@/types";
import { cn } from "@/lib/utils";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  return (
    <Link
      to="/campaigns/$slug"
      params={{ slug: campaign.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={campaign.coverImage} alt={campaign.title} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className={cn(
          "absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
          campaign.status === "active" && "bg-accent-green text-white",
          campaign.status === "completed" && "bg-brand-navy text-white",
          campaign.status === "upcoming" && "bg-accent-yellow text-brand-navy",
        )}>
          {campaign.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-brand-navy">{campaign.title}</h3>
        <p className="mt-2 text-sm text-brand-navy/70">{campaign.summary}</p>
        <div className="mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-navy/10">
            <div className="h-full rounded-full bg-gradient-to-r from-accent-coral to-accent-yellow" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-brand-navy">
              ${(campaign.raised).toLocaleString()} <span className="text-brand-navy/50 font-normal">of ${(campaign.goal).toLocaleString()}</span>
            </span>
            <span className="text-brand-navy/60">{campaign.supporters.toLocaleString()} supporters</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
