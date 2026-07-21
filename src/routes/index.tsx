import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { InitiativeUniverse } from "@/components/home/InitiativeUniverse";
import { ImpactStats } from "@/components/home/ImpactStats";
import { FeaturedStories } from "@/components/home/FeaturedStories";
import { ChangeJourney } from "@/components/home/ChangeJourney";
import { GetInvolved } from "@/components/home/GetInvolved";
import { ValuesCircle } from "@/components/home/ValuesCircle";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMeta } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => pageMeta({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <InitiativeUniverse />
      <ImpactStats />
      <FeaturedStories />
      <ChangeJourney />
      <GetInvolved />
      <ValuesCircle />
      <FinalCTA />
    </>
  );
}
