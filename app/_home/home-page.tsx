import { MenuFilterProvider } from "./_components/menu-filter-provider";
import { SiteHeader } from "@/app/_components/site-header";
import { SiteFooter } from "@/app/_components/site-footer";
import { HeroSection } from "./_components/hero-section";
import { CategorySection } from "./_components/category-section";
import { PopularSection } from "./_components/popular-section";
import { OffersSection } from "./_components/offers-section";
import { MenuExploreSection } from "./_components/menu-explore-section";
import { GallerySection } from "./_components/gallery-section";
import { StorySection } from "./_components/story-section";
import { WhyChooseUs } from "./_components/why-choose-us";
import { ReviewsSection } from "./_components/reviews-section";
import { LocationSection } from "./_components/location-section";
import { FinalCtaSection } from "./_components/final-cta-section";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1D2522]">
      {/* Sticky Site Header */}
      <SiteHeader />

      <MenuFilterProvider>
        <main>
          <HeroSection />

          {/* Main Content Sections from design with unified consistent section spacing */}
          <div className="site-shell flex-1 space-y-10 pb-6 pt-0 sm:space-y-12 sm:pb-8">
            <CategorySection />
            <PopularSection />
            <OffersSection />
            <MenuExploreSection />
            <GallerySection />
            <StorySection />
            <WhyChooseUs />
            <ReviewsSection />
            <LocationSection />
            <FinalCtaSection />
          </div>
        </main>
      </MenuFilterProvider>

      {/* Global Site Footer */}
      <SiteFooter />
    </div>
  );
}
