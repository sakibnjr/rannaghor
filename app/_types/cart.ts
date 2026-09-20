import type { Product, ProductAddOn, ProductVariant } from "./product";

export interface CartSelection {
  quantity?: number;
  variant?: ProductVariant;
  addOns?: ProductAddOn[];
  instructions?: string;
}

export interface CartItem {
  key: string;
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  addOns: ProductAddOn[];
  instructions?: string;
}

export interface CouponFeedback {
  tone: "success" | "error";
  message: string;
}
