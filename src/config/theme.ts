// Centralized Thuna brand theme. Colors are also exposed as CSS variables in
// src/styles.css so Tailwind utilities (bg-primary, text-accent-coral, etc.) work.
import type { AccentKey } from "@/types";

export const brand = {
  name: "Thuna Foundations",
  tagline: "Together, We Stand Beside People.",
  short: "Thuna",
} as const;

// Palette values (kept in sync with :root in src/styles.css).
export const palette = {
  navy: "#0B1F3A",
  navyDeep: "#07152A",
  navySoft: "#132A4C",
  yellow: "#F5C542",
  coral: "#F26D5B",
  orange: "#F28C28",
  green: "#3FB27F",
  purple: "#7A5AF8",
  pink: "#EC5D8A",
  teal: "#2AB5B5",
  offWhite: "#FBF7F0",
  cream: "#F5EFE4",
  softGray: "#E7E4DF",
  charcoal: "#1B1B1F",
} as const;

// Map an accent key to its Tailwind bg/text/border/ring utility bundle.
// Tailwind can't discover dynamic class names, so keep the full class strings
// as literals here — the compiler will preserve them.
export const accentClasses: Record<
  AccentKey,
  {
    bg: string;
    bgSoft: string;
    text: string;
    border: string;
    ring: string;
    gradient: string;
    hex: string;
  }
> = {
  navy:   { bg: "bg-brand-navy",   bgSoft: "bg-brand-navy/10",   text: "text-brand-navy",   border: "border-brand-navy",   ring: "ring-brand-navy",   gradient: "from-brand-navy to-brand-navy-soft",       hex: palette.navy },
  yellow: { bg: "bg-accent-yellow",bgSoft: "bg-accent-yellow/15",text: "text-accent-yellow",border: "border-accent-yellow",ring: "ring-accent-yellow",gradient: "from-accent-yellow to-accent-orange",       hex: palette.yellow },
  coral:  { bg: "bg-accent-coral", bgSoft: "bg-accent-coral/15", text: "text-accent-coral", border: "border-accent-coral", ring: "ring-accent-coral", gradient: "from-accent-coral to-accent-pink",         hex: palette.coral },
  orange: { bg: "bg-accent-orange",bgSoft: "bg-accent-orange/15",text: "text-accent-orange",border: "border-accent-orange",ring: "ring-accent-orange",gradient: "from-accent-orange to-accent-yellow",      hex: palette.orange },
  green:  { bg: "bg-accent-green", bgSoft: "bg-accent-green/15", text: "text-accent-green", border: "border-accent-green", ring: "ring-accent-green", gradient: "from-accent-green to-accent-teal",         hex: palette.green },
  purple: { bg: "bg-accent-purple",bgSoft: "bg-accent-purple/15",text: "text-accent-purple",border: "border-accent-purple",ring: "ring-accent-purple",gradient: "from-accent-purple to-accent-pink",        hex: palette.purple },
  pink:   { bg: "bg-accent-pink",  bgSoft: "bg-accent-pink/15",  text: "text-accent-pink",  border: "border-accent-pink",  ring: "ring-accent-pink",  gradient: "from-accent-pink to-accent-purple",        hex: palette.pink },
  teal:   { bg: "bg-accent-teal",  bgSoft: "bg-accent-teal/15",  text: "text-accent-teal",  border: "border-accent-teal",  ring: "ring-accent-teal",  gradient: "from-accent-teal to-accent-green",         hex: palette.teal },
};

export const typography = {
  display: "font-display",
  body: "font-sans",
} as const;
