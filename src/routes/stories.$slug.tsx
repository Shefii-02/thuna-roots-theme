import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getInitiativeBySlug, getStories, getStoryBySlug } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { StoryCard } from "@/components/stories/StoryCard";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStoryBySlug(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story — Thuna Foundations" }, { name: "robots", content: "noindex" }],
        links: [],
      };
    }
    const s = loaderData.story;
    const base = pageMeta({
      title: s.title,
      description: s.excerpt,
      path: `/stories/${params.slug}`,
      image: s.coverImage,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        articleJsonLd({
          title: s.title,
          description: s.excerpt,
          author: s.author,
          datePublished: s.date,
          image: s.coverImage,
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
          { name: s.title, path: `/stories/${s.slug}` },
        ]),
      ],
    };
  },
  component: StoryDetail,
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="font-display text-4xl text-brand-navy">Story not found</h1>
      <Link to="/stories" className="mt-6 inline-block text-brand-navy underline">All stories</Link>
    </div>
  ),
});

function StoryDetail() {
  const { story } = Route.useLoaderData();
  const initiative = story.initiativeSlug ? getInitiativeBySlug(story.initiativeSlug) : undefined;
  const others = getStories().filter((s) => s.id !== story.id).slice(0, 3);
  const formatted = new Date(story.date).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-brand-navy text-white pt-32 pb-16 md:pt-40 md:pb-24">
          <img src={story.coverImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/85 to-brand-navy" />
          <div className="container-page relative">
            <div className="flex items-center gap-3 text-white/70">
              <Link to="/stories" className="hover:text-accent-yellow">Stories</Link>
              <span>/</span>
              <span className="text-white">{story.category}</span>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] text-white md:text-6xl text-balance">
              {story.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">{story.excerpt}</p>
            <p className="mt-8 text-sm text-white/60">
              {story.author} · {formatted} · {story.readMinutes} min read
            </p>
          </div>
        </header>

        <div className="container-page grid gap-14 py-24 md:grid-cols-12 md:py-32">
          <div className="prose prose-lg max-w-none md:col-span-8">
            <img src={story.coverImage} alt={story.title} className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover" />
            {story.body.map((p, i) => (
              <p key={i} className="mb-6 text-lg leading-relaxed text-brand-navy/80">{p}</p>
            ))}
          </div>
          <aside className="md:col-span-4">
            <div className="sticky top-28 space-y-6">
              {initiative && (
                <div className="rounded-3xl bg-brand-cream p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Initiative</p>
                  <p className="mt-2 font-display text-2xl text-brand-navy">{initiative.name}</p>
                  <p className="mt-1 text-sm text-brand-navy/70">{initiative.title}</p>
                  <Link to="/initiatives/$slug" params={{ slug: initiative.slug }} className="mt-4 inline-flex text-sm font-semibold text-brand-navy underline">
                    Explore initiative
                  </Link>
                </div>
              )}
              <div className="rounded-3xl bg-brand-navy p-6 text-white">
                <p className="font-display text-xl">Support work like this.</p>
                <p className="mt-2 text-sm text-white/70">Every gift powers real people, real stories.</p>
                <Link to="/donate" className="mt-4 inline-flex rounded-full bg-accent-yellow px-5 py-2.5 text-sm font-semibold text-brand-navy">
                  Donate
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="bg-brand-cream py-24 md:py-32">
        <div className="container-page">
          <h2 className="font-display text-3xl text-brand-navy md:text-4xl">More stories</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => <StoryCard key={s.id} story={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
