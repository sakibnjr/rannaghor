import { restaurantImages } from "./imagery";
import { GalleryItem } from "@/app/_types/offer";

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Traditional Kacchi Biryani",
    image: restaurantImages.galleryBiryani,
    category: "Food",
  },
  {
    id: "gal-2",
    title: "Cozy Dining Ambience",
    image: restaurantImages.galleryInterior,
    category: "Restaurant",
  },
  {
    id: "gal-3",
    title: "Kebabs Over Charcoal",
    image: restaurantImages.galleryKebab,
    category: "Food",
  },
  {
    id: "gal-4",
    title: "Crafted With Care",
    image: restaurantImages.galleryChef,
    category: "Kitchen",
  },
  {
    id: "gal-5",
    title: "Signature Drinks",
    image: restaurantImages.galleryDrinks,
    category: "Drinks",
  },
  {
    id: "gal-6",
    title: "Chocolate Brownie Deluxe",
    image: restaurantImages.galleryDessert,
    category: "Dessert",
  },
];
