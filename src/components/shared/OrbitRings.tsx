// A small helper for hero/section background orbits.
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function OrbitRings({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();

  const drift = (rotateDuration: number, scaleDuration: number, reverse = false) =>
    prefersReduced
      ? {}
      : {
          animate: {
            rotate: reverse ? -360 : 360,
            scale: [1, 1.05, 1],
          },
          transition: {
            rotate: { repeat: Infinity, duration: rotateDuration, ease: "linear" as const },
            scale: {
              repeat: Infinity,
              duration: scaleDuration,
              ease: "easeInOut" as const,
            },
          },
        };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* Ring 1: slow drift right + gentle zoom */}
      <motion.div
        {...drift(180, 10)}
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />
      {/* Ring 2: slow drift left + gentle zoom, offset timing */}
      <motion.div
        {...drift(220, 12, true)}
        className="absolute left-1/2 top-1/2 h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />
      {/* Ring 3: slow drift right + gentle zoom, offset timing */}
      <motion.div
        {...drift(260, 8)}
        className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />
    </div>
  );
}
