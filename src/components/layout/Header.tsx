import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { brand } from "@/config/theme";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isDark
          ? "bg-brand-offwhite/85 backdrop-blur-md border-b border-brand-navy/5"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="relative block w-72 shrink-0">
            <img
              src="/thuna_logo_light.png"
              alt={brand.name}
              className={cn(
                "absolute inset-0 h-16 p-0 m-0 object-contain transition-opacity duration-300 ",
                isDark ? "opacity-0" : "opacity-100",
              )}
            />
            <img
              src="/thuna_logo_dark.png"
              alt={brand.name}
              className={cn(
                "absolute1 inset-0 h-16 p-0 m-0 object-contain transition-opacity duration-300 ",
                isDark ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm font-medium transition",
                isDark
                  ? "text-brand-navy/75 hover:text-brand-navy"
                  : "text-white/85 hover:text-white",
              )}
              activeProps={{
                className: isDark ? "text-brand-navy" : "text-white",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/donate"
            className="hidden rounded-full bg-gradient-to-br from-[#FF6B6B] via-[#FF8A3D] to-[#F5C518] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-navy-soft md:inline-flex"
          >
            Donate
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-navy md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="container-page pb-6 pt-2">
            <nav className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 font-display text-2xl text-brand-navy hover:bg-brand-navy/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-brand-navy px-6 py-4 text-center text-base font-semibold text-white"
              >
                Donate
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
