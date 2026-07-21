import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { getActiveCampaigns, getCompletedCampaigns } from "@/lib/data";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const Route = createFileRoute("/campaigns/")({
  head: () => pageMeta({
    title: "Campaigns",
    description: "Active and completed Thuna Foundations campaigns you can support.",
    path: "/campaigns",
  }),
  component: CampaignsPage,
});

function CampaignsPage() {
  const active = getActiveCampaigns();
  const completed = getCompletedCampaigns();

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Campaigns</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl text-balance">
            Focused efforts. <em className="not-italic text-accent-yellow">Real deadlines.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">
            Support a specific campaign and see exactly where your gift goes.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Active</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((c, i) => (
              <ScrollReveal key={c.id} delay={i * 0.04}>
                <CampaignCard campaign={c} />
              </ScrollReveal>
            ))}
            {active.length === 0 && <p className="text-brand-navy/60">No active campaigns right now.</p>}
          </div>
        </div>
      </section>

      {completed.length > 0 && (
        <section className="bg-brand-cream pb-24 pt-8 md:pb-32">
          <div className="container-page">
            <h2 className="font-display text-3xl text-brand-navy md:text-4xl">Completed</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
