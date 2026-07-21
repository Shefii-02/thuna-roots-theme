// A small helper for hero/section background orbits.
import { cn } from "@/lib/utils";

export function OrbitRings({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-orbit-slow" />
      <div className="absolute left-1/2 top-1/2 h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-orbit-slower" />
      <div className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
    </div>
  );
}
