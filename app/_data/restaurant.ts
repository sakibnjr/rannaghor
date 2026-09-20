import { restaurantImages } from "./imagery";
import { RestaurantConfig } from "@/app/_types/restaurant";

export const rannaGhorConfig: RestaurantConfig = {
  id: "rannaghor-dhaka-01",
  name: "RannaGhor",
  tagline: "Good Food Brings Us Together",
  heroImage: {
    src: restaurantImages.hero,
    alt: "Steaming chicken biryani served with fragrant rice and fresh herbs",
  },
  heroNote: "Taste the Bangladesh",
  heroBadge: "Authentic Flavors, Happier Together",
  heroHeadline: {
    line1: "Freshly Made.",
    line2: "Delivered With Love.",
  },
  heroSubtext:
    "Delicious food, made with the freshest ingredients, now at your doorstep. Because good food makes every moment better.",
  branding: {
    primaryColor: "#E8572A",
    secondaryColor: "#17624F",
    backgroundColor: "#FFF9F5",
  },
  contact: {
    phone: "+880 1700-000000",
    email: "contact@rannaghor.com",
    whatsapp: "+880 1700-000000",
  },
  address: {
    division: "Dhaka",
    city: "Dhaka",
    area: "Gulshan-1",
    street: "Road 132, House 12",
  },
  delivery: {
    isOpen: true,
    closingTime: "11:00 PM",
    averageTime: "30–45 min",
    deliveryMethod: "Delivery & Pickup",
  },
  rating: {
    score: 4.8,
    reviewCount: 2500,
    displayCount: "2,500+ reviews",
  },
};
