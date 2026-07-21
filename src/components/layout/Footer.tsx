import { Link } from "@tanstack/react-router";
import { footerColumns } from "@/config/navigation";
import { site } from "@/config/site";
import { brand } from "@/config/theme";
import { ThunaMark } from "@/components/shared/ThunaMark";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-brand-offwhite">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <ThunaMark className="h-10 w-10 text-accent-yellow" />
              <span className="font-display text-xl">{brand.name}</span>
            </div>
            <p className="mt-6 max-w-md font-display text-2xl leading-snug text-white">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm text-white/70">{site.description}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-sm uppercase tracking-[0.2em] text-white/60">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-white/85 transition hover:text-accent-yellow"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-accent-yellow">{site.email}</a>
            <a href={`https://twitter.com/${site.social.twitter.replace("@","")}`} className="hover:text-accent-yellow">Twitter</a>
            <a href={`https://instagram.com/${site.social.instagram.replace("@","")}`} className="hover:text-accent-yellow">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
