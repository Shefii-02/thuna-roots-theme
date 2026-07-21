import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/60">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-[1.05] text-brand-navy sm:text-4xl md:text-5xl lg:text-6xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-brand-navy/70 text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
