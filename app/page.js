import Hero from "./Home/Hero";
import StatsSection from "./Home/StatsSection";
import FeaturedJobs from "./Home/FeaturedJobs";
import HowItWorks from "./Home/HowItWorks";
import SuccessStories from "./Home/SuccessStories";
import JoinNextEdge from "./Home/JoinNextEdge";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <StatsSection></StatsSection>
      <FeaturedJobs></FeaturedJobs>
      <HowItWorks></HowItWorks>
      <SuccessStories></SuccessStories>
      <JoinNextEdge></JoinNextEdge>
    </div>
  );
}
