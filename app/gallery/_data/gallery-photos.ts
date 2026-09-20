import { restaurantImages } from "@/app/_data/imagery";
import type { GalleryCategory, GalleryPhoto } from "../_types/gallery";

export const galleryCategories: GalleryCategory[] = ["All", "Food", "Restaurant", "Kitchen", "Drinks", "Dessert"];

export const galleryPhotos: GalleryPhoto[] = [
  { id: "gallery-kacchi", title: "Traditional Kacchi Biryani", description: "Slow-cooked rice, tender meat and fragrant spices.", image: restaurantImages.galleryBiryani, category: "Food" },
  { id: "gallery-interior", title: "A Table Waiting for You", description: "A warm and relaxed space for everyday meals.", image: restaurantImages.galleryInterior, category: "Restaurant" },
  { id: "gallery-kebab", title: "Kebabs Over Charcoal", description: "Smoky, juicy and grilled to order.", image: restaurantImages.galleryKebab, category: "Food" },
  { id: "gallery-chef", title: "Crafted With Care", description: "Our kitchen team preparing every plate carefully.", image: restaurantImages.galleryChef, category: "Kitchen" },
  { id: "gallery-drinks", title: "Signature Drinks", description: "Cold, bright and made to refresh.", image: restaurantImages.galleryDrinks, category: "Drinks" },
  { id: "gallery-dessert", title: "Chocolate Brownie Deluxe", description: "A rich finish worth saving room for.", image: restaurantImages.galleryDessert, category: "Dessert" },
  { id: "gallery-feast", title: "The Family Table", description: "A complete feast made for sharing.", image: restaurantImages.familyFeast, category: "Food" },
  { id: "gallery-evening", title: "Evenings at RannaGhor", description: "Soft light, good company and comforting food.", image: restaurantImages.interiorEvening, category: "Restaurant" },
  { id: "gallery-pizza", title: "Fresh From the Oven", description: "Golden crust, melted cheese and fresh toppings.", image: restaurantImages.pizza, category: "Food" },
  { id: "gallery-wings", title: "Smoky BBQ Wings", description: "Glazed wings with a little heat and plenty of flavour.", image: restaurantImages.wings, category: "Food" },
  { id: "gallery-coffee", title: "Cold Coffee Break", description: "Creamy coffee served chilled.", image: restaurantImages.coffee, category: "Drinks" },
  { id: "gallery-kitchen", title: "Inside Our Kitchen", description: "Fresh ingredients become familiar favourites.", image: restaurantImages.chef, category: "Kitchen" },
];
