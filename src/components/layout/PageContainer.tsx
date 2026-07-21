import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Consistent inner container. Every route uses this or container-page directly.
export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
