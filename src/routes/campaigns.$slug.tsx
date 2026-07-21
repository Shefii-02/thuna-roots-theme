import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCampaignBySlug, getInitiativeBySlug } from "@/lib/data";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns/$slug")({
  loader: ({ params }) => {
    const campaign = getCampaignBySlug(params.slug);
    if (!campaign) throw notFound();
    return { campaign };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Campaign" }, { name: "robots", content: "noindex" }], links: [] };
    const c = loaderData.campaign;
    const base = pageMeta({
      title: c.title,
      description: c.summary,
      path: `/campaigns/${params.slug}`,
      image: c.coverImage,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Campaigns", path: "/campaigns" },
          { name: c.title, path: `/campaigns/${c.slug}` },
        ]),
      ],
    };
  },
  component: CampaignDetail,
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="font-display text-4xl text-brand-navy">Campaign not found</h1>
      <Link to="/campaigns" className="mt-6 inline-block text-brand-navy underline">All campaigns</Link>
    </div>
  ),
});

function CampaignDetail() {
  const { campaign } = Route.useLoaderData() as { campaign: import("@/types").Campaign };
  const initiative = getInitiativeBySlug(campaign.initiativeSlug);
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-32 pb-16 md:pt-40 md:pb-24">
        <img src={campaign.coverImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/85 to-brand-navy" />
        <div className="container-page relative">
          <div className="flex items-center gap-3 text-white/70">
            <Link to="/campaigns" className="hover:text-accent-yellow">Campaigns</Link>
            <span>/</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
              campaign.status === "active" ? "bg-accent-green text-white" : "bg-white/20 text-white",
            )}>{campaign.status}</span>
          </div>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl text-balance">
            {campaign.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">{campaign.summary}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">About this campaign</p>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/80">{campaign.description}</p>
            {initiative && (
              <div className="mt-10 rounded-3xl bg-brand-cream p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Initiative</p>
                <p className="mt-2 font-display text-2xl text-brand-navy">{initiative.name}</p>
                <p className="mt-1 text-sm text-brand-navy/70">{initiative.title}</p>
                <Link to="/initiatives/$slug" params={{ slug: initiative.slug }} className="mt-4 inline-flex text-sm font-semibold text-brand-navy underline">
                  Explore initiative
                </Link>
              </div>
            )}
          </div>
          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-brand-navy/5">
              <div className="font-display text-4xl text-brand-navy">
                ${campaign.raised.toLocaleString()}
              </div>
              <p className="mt-1 text-sm text-brand-navy/60">raised of ${campaign.goal.toLocaleString()} goal</p>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-brand-navy/10">
                <div className="h-full rounded-full bg-gradient-to-r from-accent-coral to-accent-yellow" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-brand-navy/70">
                <span>{pct}% funded</span>
                <span>{campaign.supporters.toLocaleString()} supporters</span>
              </div>
              {campaign.endsOn && (
                <p className="mt-2 text-xs text-brand-navy/50">Ends {new Date(campaign.endsOn).toLocaleDateString()}</p>
              )}
              <Link to="/donate" className="mt-6 flex w-full items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-navy-soft">
                Support this campaign
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
