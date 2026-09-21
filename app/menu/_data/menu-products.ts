import type { Product } from "@/app/_types/product";
import { popularProducts } from "@/app/_data/products";
import { exploreMenuItems } from "@/app/_data/explore-menu";
import { restaurantImages } from "@/app/_data/imagery";
import type { MenuCategoryFilter } from "../_types/menu";

export const menuCategories: MenuCategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "biryani", label: "Biryani" },
  { id: "chicken", label: "Chicken" },
  { id: "beef", label: "Beef" },
  { id: "chinese", label: "Chinese" },
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "kebab", label: "Kebab" },
  { id: "rice", label: "Rice" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
];

const additionalProducts: Product[] = [
  {
    id: "menu-shahi-kacchi",
    name: "Shahi Kacchi Biryani",
    slug: "shahi-kacchi-biryani",
    description: "Tender mutton, aromatic rice, potato and house-made borhani.",
    image: restaurantImages.galleryBiryani,
    price: 480,
    oldPrice: 520,
    rating: 4.9,
    reviewCount: 740,
    categoryId: "Biryani",
    bestseller: true,
    available: true,
    variants: [
      { id: "regular", name: "Regular", price: 480 },
      { id: "large", name: "Large", price: 650 },
    ],
    addOns: [
      { id: "egg", name: "Boiled egg", price: 30 },
      { id: "borhani", name: "Borhani", price: 60 },
      { id: "firni", name: "Shahi firni", price: 90 },
    ],
  },
  {
    id: "menu-chicken-cheese-pizza",
    name: "Chicken Cheese Pizza",
    slug: "chicken-cheese-pizza",
    description: "Roasted chicken, mozzarella, peppers and tomato sauce.",
    image: restaurantImages.pizza,
    price: 520,
    rating: 4.7,
    reviewCount: 360,
    categoryId: "Pizza",
    available: true,
  },
  {
    id: "menu-beef-seekh-kebab",
    name: "Beef Seekh Kebab",
    slug: "beef-seekh-kebab",
    description: "Charcoal-grilled beef kebabs with onion, lime and chutney.",
    image: restaurantImages.galleryKebab,
    price: 340,
    rating: 4.8,
    reviewCount: 430,
    categoryId: "Kebab",
    spicyLevel: 2,
    available: true,
  },
  {
    id: "menu-vegetable-fried-rice",
    name: "Vegetable Fried Rice",
    slug: "vegetable-fried-rice",
    description: "Wok-tossed rice with egg, vegetables and spring onion.",
    image: restaurantImages.prawnRice,
    price: 210,
    rating: 4.5,
    reviewCount: 210,
    categoryId: "Rice",
    available: true,
  },
  {
    id: "menu-mango-lassi",
    name: "Mango Lassi",
    slug: "mango-lassi",
    description:
      "Creamy yogurt blended with ripe mango and a touch of cardamom.",
    image: restaurantImages.mango,
    price: 180,
    rating: 4.8,
    reviewCount: 265,
    categoryId: "Drinks",
    available: true,
  },
  {
    id: "menu-chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    slug: "chocolate-lava-cake",
    description: "Warm chocolate cake with a soft molten centre.",
    image: restaurantImages.galleryDessert,
    price: 240,
    rating: 4.9,
    reviewCount: 195,
    categoryId: "Desserts",
    available: false,
  },
  {
    id: "menu-mango-lassi2",
    name: "Mango Lassi",
    slug: "mango-lassi",
    description:
      "Creamy yogurt blended with ripe mango and a touch of cardamom.",
    image: restaurantImages.mango,
    price: 180,
    rating: 4.8,
    reviewCount: 265,
    categoryId: "Drinks",
    available: true,
  },
];

export const menuProducts: Product[] = [
  ...popularProducts,
  ...exploreMenuItems,
  ...additionalProducts,
];

export function normalizeCategory(categoryId: string) {
  return categoryId.toLowerCase().replace(/^cat-/, "");
}
