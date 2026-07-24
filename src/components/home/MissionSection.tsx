import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function MissionSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-16">
        <ScrollReveal className="md:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent-coral/20 via-accent-yellow/15 to-accent-purple/20 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
              alt="People standing together in a community meeting"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl"
            />
            <div className="absolute -bottom-10 -right-6 hidden max-w-xs rounded-3xl border border-black/5 bg-white p-6 shadow-xl md:block">
              <div className="font-display text-4xl text-[#0B1B3D]">2016</div>
              <div className="mt-1 text-sm text-[#5B6178]">
                The year Thuna was founded around one simple idea — people supporting people.
              </div>
            </div>
            <div className="absolute -top-6 -left-10 hidden h-24 w-24 items-center justify-center rounded-full bg-accent-yellow text-brand-navy shadow-lg md:flex">
              <span className="font-display text-2xl">Thuna</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="md:col-span-7 md:pt-8">
          <ScrollReveal delay={0.05}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">
              Our mission
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-brand-navy sm:text-5xl md:text-6xl text-balance">
              Support becomes change when we{" "}
              <span className="italic text-accent-coral">stand together.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy/75 text-pretty">
              Every person needs support at some point in life. Sometimes it is care,
              sometimes it is guidance, opportunity, protection, or simply the confidence
              that someone is willing to stand beside us.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-navy/75 text-pretty">
              Thuna Foundations brings people and resources together to turn compassion
              into action — and action into progress.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
