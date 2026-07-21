// Data access layer. UI components import ONLY from here — never directly
// from src/data/sampleData.ts. Later, swap these functions for API calls.
import {
  campaigns,
  faqs,
  impactMetrics,
  initiatives,
  journey,
  partners,
  stories,
  testimonials,
  values,
  volunteerOpportunities,
} from "@/data/sampleData";
import type { Campaign, Initiative, Story } from "@/types";

// --- Initiatives -----------------------------------------------------------
export function getInitiatives(): Initiative[] {
  return initiatives;
}
export function getInitiativeBySlug(slug: string): Initiative | undefined {
  return initiatives.find((i) => i.slug === slug);
}
export function getInitiativeSlugs(): string[] {
  return initiatives.map((i) => i.slug);
}
export function getRelatedInitiatives(slug: string, limit = 3): Initiative[] {
  const current = getInitiativeBySlug(slug);
  if (!current) return initiatives.slice(0, limit);
  return initiatives.filter((i) => i.slug !== slug).slice(0, limit);
}

// --- Stories ---------------------------------------------------------------
export function getStories(): Story[] {
  return stories;
}
export function getFeaturedStory(): Story {
  return stories.find((s) => s.featured) ?? stories[0];
}
export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
export function getStoriesForInitiative(slug: string): Story[] {
  return stories.filter((s) => s.initiativeSlug === slug);
}

// --- Campaigns -------------------------------------------------------------
export function getCampaigns(): Campaign[] {
  return campaigns;
}
export function getActiveCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === "active");
}
export function getCompletedCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === "completed");
}
export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}
export function getCampaignsForInitiative(slug: string): Campaign[] {
  return campaigns.filter((c) => c.initiativeSlug === slug);
}

// --- Content ---------------------------------------------------------------
export function getImpactMetrics() { return impactMetrics; }
export function getTestimonials() { return testimonials; }
export function getValues() { return values; }
export function getJourney() { return journey; }
export function getVolunteerOpportunities() { return volunteerOpportunities; }
export function getPartners() { return partners; }
export function getFaqs() { return faqs; }
