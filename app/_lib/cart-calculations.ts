import type { CartItem, CartSelection } from "@/app/_types/cart";
import type { Product } from "@/app/_types/product";

export const DELIVERY_FEE = 60;
export const FREE_DELIVERY_MINIMUM = 1200;

export function createCartKey(product: Product, selection: CartSelection = {}) {
  const addOnIds = (selection.addOns ?? [])
    .map((addOn) => addOn.id)
    .sort()
    .join(".");

  return [
    product.id,
    selection.variant?.id ?? "base",
    addOnIds || "no-add-ons",
    selection.instructions?.trim() ?? "",
  ].join("|");
}

export function getCartItemUnitPrice(item: CartItem) {
  const basePrice = item.variant?.price ?? item.product.price;
  return basePrice + item.addOns.reduce((total, addOn) => total + addOn.price, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + getCartItemUnitPrice(item) * item.quantity,
    0,
  );
}

export function getCouponDiscount(code: string | null, subtotal: number) {
  if (code === "RANNA100" && subtotal >= 700) return 100;
  if (code === "WELCOME10") return Math.min(Math.round(subtotal * 0.1), 150);
  return 0;
}

export function getDeliveryCharge(subtotal: number, hasItems: boolean) {
  if (!hasItems || subtotal >= FREE_DELIVERY_MINIMUM) return 0;
  return DELIVERY_FEE;
}

export function formatPrice(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}
