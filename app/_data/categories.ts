import { restaurantImages } from "./imagery";
import { MenuCategory } from "@/app/_types/product";

export const foodCategories: MenuCategory[] = [
  {
    id: "cat-biryani",
    name: "Biryani",
    slug: "biryani",
    image: restaurantImages.biryani,
    sortOrder: 1,
  },
  {
    id: "cat-burger",
    name: "Burger",
    slug: "burger",
    image: restaurantImages.burger,
    sortOrder: 2,
  },
  {
    id: "cat-pizza",
    name: "Pizza",
    slug: "pizza",
    image: restaurantImages.pizza,
    sortOrder: 3,
  },
  {
    id: "cat-chinese",
    name: "Chinese",
    slug: "chinese",
    image: restaurantImages.chowMein,
    sortOrder: 4,
  },
  {
    id: "cat-kebab",
    name: "Kebab",
    slug: "kebab",
    image: restaurantImages.kebab,
    sortOrder: 5,
  },
  {
    id: "cat-rice",
    name: "Rice",
    slug: "rice",
    image: restaurantImages.prawnRice,
    sortOrder: 6,
  },
  {
    id: "cat-drinks",
    name: "Drinks",
    slug: "drinks",
    image: restaurantImages.mango,
    sortOrder: 7,
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    slug: "desserts",
    image: restaurantImages.dessert,
    sortOrder: 8,
  },
];
