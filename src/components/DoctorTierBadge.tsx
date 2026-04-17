import { cn } from "@/lib/utils";
import type { DoctorTier } from "@/lib/clinic-data";

export function DoctorTierBadge({ tier, className }: { tier: DoctorTier; className?: string }) {
  const isBlue = tier === "blue";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        isBlue ? "bg-ink-blue-soft text-ink-blue" : "bg-ink-green-soft text-ink-green",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", isBlue ? "bg-ink-blue" : "bg-ink-green")} />
      {isBlue ? "Blue Ink · Senior" : "Green Ink · Junior"}
    </span>
  );
}
