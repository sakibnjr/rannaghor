export type GalleryCategory = "All" | "Food" | "Restaurant" | "Kitchen" | "Drinks" | "Dessert";

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Exclude<GalleryCategory, "All">;
}
