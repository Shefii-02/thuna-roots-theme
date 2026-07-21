// Small helpers to build per-route TanStack `head()` metadata consistently.
import { site } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;           // e.g. "/about"
  image?: string;         // absolute or root-relative
  type?: "website" | "article";
}

interface HeadReturn {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
  scripts?: Array<{ type: string; children: string }>;
}

export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): HeadReturn {
  const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: path }],
  };
}

export function organizationJsonLd() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NGO",
      name: site.name,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      sameAs: [
        `https://twitter.com/${site.social.twitter.replace("@", "")}`,
        `https://instagram.com/${site.social.instagram.replace("@", "")}`,
        `https://linkedin.com/${site.social.linkedin}`,
      ],
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.path,
      })),
    }),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  image?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: input.title,
      description: input.description,
      author: { "@type": "Person", name: input.author },
      datePublished: input.datePublished,
      image: input.image,
      publisher: { "@type": "NGO", name: site.name },
    }),
  };
}
