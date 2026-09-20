export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface ProductAddOn {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: string;
  bestseller?: boolean;
  spicyLevel?: number;
  available: boolean;
  variants?: ProductVariant[];
  addOns?: ProductAddOn[];
}
