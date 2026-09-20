import { restaurantImages } from "@/app/_data/imagery";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import type { HeroSlide } from "../_types/hero-slide";

export const heroSlides: HeroSlide[] = [
  {
    id: "freshly-made",
    badge: rannaGhorConfig.heroBadge,
    headline: rannaGhorConfig.heroHeadline,
    description: rannaGhorConfig.heroSubtext,
    image: rannaGhorConfig.heroImage,
    primaryAction: { label: "Order Now", href: "#explore-menu" },
    secondaryAction: { label: "View Menu", href: "/menu" },
    highlight: {
      value: rannaGhorConfig.rating.score.toFixed(1),
      label: `From ${rannaGhorConfig.rating.displayCount}`,
      showStar: true,
    },
    note: rannaGhorConfig.heroNote,
  },
  {
    id: "family-feast",
    badge: "Family favourite · Save ৳301",
    headline: { line1: "Bring Everyone.", line2: "Feast for ৳899." },
    description: "Chicken biryani, roast, kebabs, drinks and dessert—one generous spread made for sharing.",
    image: {
      src: restaurantImages.familyFeastBanner,
      alt: "A family feast with chicken biryani, grilled chicken, kebabs, salad and mango drinks",
    },
    primaryAction: { label: "Get Family Feast", href: "/offers#all-offers" },
    secondaryAction: { label: "See All Offers", href: "/offers" },
    highlight: { value: "৳899", label: "Regular ৳1,200" },
    note: "Made for Sharing",
  },
  {
    id: "weekend-combo",
    badge: "Weekend special · Save 25%",
    headline: { line1: "Weekend Cravings.", line2: "Sorted for ৳450." },
    description: "Two juicy burgers, crispy wings, golden fries and chilled drinks for an easy weekend treat.",
    image: {
      src: restaurantImages.weekendComboBanner,
      alt: "A weekend combo with beef burgers, chicken wings, fries and cold drinks",
    },
    primaryAction: { label: "Get Weekend Combo", href: "/offers#all-offers" },
    secondaryAction: { label: "View Full Menu", href: "/menu" },
    highlight: { value: "25% off", label: "Friday and Saturday" },
    note: "Weekend Treat",
  },
];
