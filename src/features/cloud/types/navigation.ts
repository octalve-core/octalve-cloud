import type { LucideIcon } from "lucide-react";

export type MegaMenuId = "products" | "resources";

export type NavigationBadgeTone =
  | "new"
  | "popular"
  | "free"
  | "ai"
  | "secure";

export type NavigationBadge = Readonly<{
  label: string;
  tone: NavigationBadgeTone;
}>;

export type NavigationLink = Readonly<{
  id: string;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  badge?: NavigationBadge;
  external?: boolean;
}>;

export type MegaMenuCategory = Readonly<{
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  links: readonly NavigationLink[];
}>;

export type MegaMenuFeaturedCard = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: LucideIcon;
  external?: boolean;
}>;

export type MegaMenuDefinition = Readonly<{
  id: MegaMenuId;
  label: string;
  eyebrow: string;
  description: string;
  categories: readonly MegaMenuCategory[];
  featured: MegaMenuFeaturedCard;
}>;

export type HeaderDirectLink = Readonly<{
  kind: "link";
  id: string;
  label: string;
  href: string;
}>;

export type HeaderMegaMenuTrigger = Readonly<{
  kind: "mega";
  id: MegaMenuId;
  label: string;
}>;

export type HeaderNavigationItem =
  | HeaderDirectLink
  | HeaderMegaMenuTrigger;

export type AccountAccessLink = Readonly<{
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}>;
