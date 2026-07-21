import { Link } from "@tanstack/react-router";
import { HandCoins, Users, Handshake, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const options = [
  {
    icon: HandCoins,
    title: "Donate",
    description: "Help provide meaningful support where it is needed most.",
    to: "/donate" as const,
    cta: "Donate now",
    accent: "bg-accent-yellow text-brand-navy",
    tile: "bg-white",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Give your time, skills and energy to create positive change.",
    to: "/volunteer" as const,
    cta: "Become a volunteer",
    accent: "bg-accent-coral text-white",
    tile: "bg-brand-cream",
  },
  {
    icon: Handshake,
    title: "Partner",
    description: "Work with Thuna Foundations to create lasting impact.",
    to: "/partner" as const,
    cta: "Partner with Thuna",
    accent: "bg-brand-navy text-white",
    tile: "bg-white",
  },
];

export function GetInvolved() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Get involved"
            title={<>Your support can become someone's <em className="not-italic text-accent-coral">hope.</em></>}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {options.map((o, i) => (
            <ScrollReveal key={o.title} delay={i * 0.05}>
              <Link
                to={o.to}
                className={cn(
                  "group flex h-full flex-col rounded-[2rem] border border-brand-navy/5 p-8 transition hover:-translate-y-1 hover:shadow-xl md:p-10",
                  o.tile,
                )}
              >
                <div className={cn("mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl", o.accent)}>
                  <o.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl text-brand-navy md:text-4xl">{o.title}</h3>
                <p className="mt-3 text-brand-navy/70">{o.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  {o.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
