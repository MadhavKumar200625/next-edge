import Hero from "./Home/Hero";
import StatsSection from "./Home/StatsSection";
import JobCategories from "./Home/JobCategories";
import FeaturedJobs from "./Home/FeaturedJobs";
import WhyNextEdge from "./Home/WhyNextEdge";
import HowItWorks from "./Home/HowItWorks";
import SuccessStories from "./Home/SuccessStories";
import FaqSection from "./Home/FaqSection";
import JoinNextEdge from "./Home/JoinNextEdge";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <StatsSection></StatsSection>
      <JobCategories></JobCategories>
      <FeaturedJobs></FeaturedJobs>
      <WhyNextEdge></WhyNextEdge>
      <HowItWorks></HowItWorks>
      <SuccessStories></SuccessStories>
      <FaqSection></FaqSection>
      <JoinNextEdge></JoinNextEdge>
    </div>
  );
}
