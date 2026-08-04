import type {
  NavigationBadge,
  NavigationBadgeTone,
} from "@/features/cloud/types/navigation";
import { cn } from "./cn";

const toneClasses: Record<NavigationBadgeTone, string> = {
  new: "bg-[#F04D23] text-white",
  popular: "bg-[#FC7E24] text-white",
  free: "bg-[#2369B3] text-white",
  ai: "bg-[#651FFF] text-white",
  secure: "bg-[#16A34A] text-white",
};

export function HeaderBadge({
  badge,
  compact = false,
}: {
  badge: NavigationBadge;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md font-bold uppercase leading-none tracking-[0.04em]",
        toneClasses[badge.tone],
        compact ? "px-1.5 py-1 text-[9px]" : "px-2 py-1 text-[10px]",
      )}
    >
      {badge.label}
    </span>
  );
}
