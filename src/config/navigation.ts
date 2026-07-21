import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "Campaigns", to: "/campaigns" },
];

export const involveNav: NavItem[] = [
  { label: "Donate", to: "/donate" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Partner", to: "/partner" },
  { label: "Contact", to: "/contact" },
];

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  { heading: "Explore", items: mainNav },
  { heading: "Get Involved", items: involveNav },
];
