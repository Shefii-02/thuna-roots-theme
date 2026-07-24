import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrbitRings } from "@/components/shared/OrbitRings";
import { brand } from "@/config/theme";

// Replace these with your real assets
const images = {
  hero: [
    "/splash_screen.png",
    "/home_screen.png",
    "/screen_1.png",
    "/screen_2.png",
    "/screen_3.png",
    "/screen_4.png",
  ],
  storyStudent:
    "https://images.unsplash.com/photo-1649399044844-9af065083b8a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  storyMother:
    "https://images.unsplash.com/photo-1649768524366-a93840e4c501?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  storyElder:
    "https://images.pexels.com/photos/10987201/pexels-photo-10987201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
};

// Caption shown per hero image (index-matched)
const heroCaptions = [
  "Free medical camp — Kolar district reaches its 12,000th patient.",
  "New water wells bring clean drinking water to 4 villages.",
  "Winter relief drive reaches 2,800 families this season.",
];

// Matches the dot colors in the reference design
const orbitDots = [
  "#E8871E", // orange
  "#3FA66B", // green
  "#F2C230", // yellow
  "#7C6FE0", // purple
  "#2C8C82", // teal
  "#E0574B", // red/coral
];

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.hero.length);
    }, 4000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const anim = (delay: number) =>
    prefersReduced
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] as const },
      };

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white pt-28 pb-24 md:pt-40 md:pb-32">
      <OrbitRings className="opacity-70" />
      {/* Color halos */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-accent-coral/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-accent-yellow/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-purple/25 blur-3xl" />

      <div className="container-page relative grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left: existing content */}
        <div>
          <motion.div
            {...anim(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-yellow" />
            10 Initiatives · One Purpose · A Better Future
          </motion.div>

          <motion.h1
            {...anim(0.1)}
            className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[72px] text-balance"
          >
            {brand.tagline.split(",").map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && <span className="text-accent-yellow">,</span>}
                {i < arr.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...anim(0.2)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl text-pretty"
          >
            Building stronger people, healthier communities and a more hopeful future — together.
          </motion.p>

          <motion.div {...anim(0.3)} className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/donate"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-yellow px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:brightness-95"
            >
              Support Our Mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/initiatives"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore Our Initiatives
            </Link>
          </motion.div>

          {/* Small stat row */}
          <motion.div {...anim(0.4)} className="mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["10", "Initiatives"],
              ["640+", "Communities"],
              ["128k+", "People supported"],
              ["3,120", "Volunteers"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl text-accent-yellow md:text-3xl">{v}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: cycling image + rotating orbit + badges */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[36px] border border-white/10 shadow-2xl shadow-black/40"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={images.hero[activeIndex]}
                src={images.hero[activeIndex]}
                alt="A community standing together"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/70 via-transparent to-transparent" />

            {/* Bottom overlay — caption changes with the image */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg">
              <div className="text-xs uppercase tracking-widest text-white/70">This week</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroCaptions[activeIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="mt-1 text-sm text-white"
                >
                  {heroCaptions[activeIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots for the slideshow */}
            <div className="absolute right-6 top-6 flex gap-1.5">
              {images.hero.map((src, idx) => (
                <button
                  key={src}
                  aria-label={`Show image ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Rotating ring of dots, top-right */}
          <motion.div
            className="pointer-events-none absolute -right-10 -top-10 hidden h-56 w-56 md:block"
            animate={prefersReduced ? undefined : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="1 6"
              />
              {orbitDots.map((color, idx) => {
                const angle = (idx / orbitDots.length) * Math.PI * 2 - Math.PI / 2;
                const x = 100 + Math.cos(angle) * 90;
                const y = 100 + Math.sin(angle) * 90;
                return <circle key={color} cx={x} cy={y} r="6" fill={color} />;
              })}
            </svg>
          </motion.div>

          {/* Floating volunteers badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-4 top-28 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-lg md:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[images.storyStudent, images.storyMother, images.storyElder].map((src) => (
                  <div key={src} className="h-8 w-8 overflow-hidden rounded-full border-2 border-brand-navy">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-white/80">6,300 volunteers stand with us</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}