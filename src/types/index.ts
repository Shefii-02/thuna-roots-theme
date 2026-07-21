// Domain types for Thuna Foundations.
// The UI depends ONLY on these types. The current source is src/data/sampleData.ts;
// later a Laravel API can back the same shapes via src/lib/data/* without UI changes.

export type AccentKey =
  | "navy"
  | "yellow"
  | "coral"
  | "orange"
  | "green"
  | "purple"
  | "pink"
  | "teal";

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon?: string;
}

export interface Initiative {
  id: string;
  slug: string;
  name: string;         // e.g. "THUNA CARE"
  title: string;        // e.g. "Healthcare & Medical Assistance"
  category: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  accent: AccentKey;
  icon: string;         // lucide icon name
  heroImage: string;
  gallery: string[];
  impact: { label: string; value: string }[];
  highlights: string[];
  focusAreas: string[];
  relatedStories: string[]; // story slugs
  relatedCampaigns: string[]; // campaign slugs
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  initiativeSlug?: string;
  author: string;
  date: string;         // ISO
  readMinutes: number;
  coverImage: string;
  featured?: boolean;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  initiativeSlug: string;
  status: "active" | "completed" | "upcoming";
  goal: number;
  raised: number;
  currency: string;
  supporters: number;
  endsOn?: string;
  coverImage: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location?: string;
  avatar?: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  initiativeSlug: string;
  location: string;
  commitment: string;
  skills: string[];
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  type: "corporate" | "community" | "ngo" | "government";
  logo?: string;
  blurb?: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface Value {
  name: string;
  description: string;
  accent: AccentKey;
  icon: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  accent: AccentKey;
}

export interface FaqItem {
  question: string;
  answer: string;
}
