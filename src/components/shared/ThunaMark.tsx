// The Thuna mark: five simplified human forms arranged in a circle
// representing connection, community and standing beside one another.
import type { SVGProps } from "react";

export function ThunaMark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  const cx = 32;
  const cy = 32;
  const r = 20;
  const dots = Array.from({ length: 5 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={className} {...rest}>
      {/* connecting circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.35} />
      {/* five human forms: head + body */}
      {dots.map((d, i) => (
        <g key={i} transform={`translate(${d.x - 4}, ${d.y - 6})`}>
          <circle cx={4} cy={3} r={3} />
          <path d="M0 12 Q4 6 8 12 L8 12 Q4 14 0 12 Z" />
        </g>
      ))}
    </svg>
  );
}
