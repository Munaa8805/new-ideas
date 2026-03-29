import BannerCarousel from "../components/BannerCarousel";
import HomeHeroSection from "../components/HomeHeroSection";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import HomeFeaturedProjectsSection from "../components/HomeFeaturedProjectsSection";
import HomeFeaturedIdeasSection from "../components/HomeFeaturedIdeasSection";
import HomeCtaBanner from "../components/HomeCtaBanner";

export default function Home() {
  return (
    <div className="space-y-23 pb-12">
      <BannerCarousel />
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeFeaturedProjectsSection />
      <HomeFeaturedIdeasSection />
      <HomeCtaBanner />
    </div>
  );
}
