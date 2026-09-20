import { restaurantImages } from "./imagery";
import { SpecialOffer } from "@/app/_types/offer";

export const featuredOffer: SpecialOffer = {
  id: "offer-family-feast",
  title: "Family Feast",
  subtitle: "Good food tastes better together!",
  items: [
    "2 Chicken Biryani",
    "4 pcs Chicken Roast",
    "2 Drinks",
    "1 Dessert (Free)",
  ],
  originalPrice: 1200,
  discountedPrice: 899,
  savingsBadge: "Save ৳ 301",
  image: restaurantImages.familyFeast,
  featured: true,
};

export const promoOffers: SpecialOffer[] = [
  {
    id: "offer-lunch-special",
    title: "Lunch Special",
    subtitle: "Delicious meal at a special price",
    originalPrice: 400,
    discountedPrice: 320,
    savingsBadge: "Save 20%",
    image: restaurantImages.lunch,
  },
  {
    id: "offer-weekend-combo",
    title: "Weekend Combo",
    subtitle: "More taste. More moments.",
    originalPrice: 600,
    discountedPrice: 450,
    savingsBadge: "Save 25%",
    image: restaurantImages.weekend,
  },
];
