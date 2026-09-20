export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  items?: string[];
  originalPrice: number;
  discountedPrice: number;
  savingsBadge: string;
  image: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category?: string;
}
