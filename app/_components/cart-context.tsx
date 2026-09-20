"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createCartKey,
  getCartSubtotal,
  getCouponDiscount,
  getDeliveryCharge,
} from "@/app/_lib/cart-calculations";
import type { CartItem, CartSelection, CouponFeedback } from "@/app/_types/cart";
import type { Product } from "@/app/_types/product";

interface CartToast {
  id: string;
  message: string;
  productName: string;
}

interface CartContextType {
  isReady: boolean;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  couponCode: string | null;
  couponFeedback: CouponFeedback | null;
  toast: CartToast | null;
  isOpen: boolean;
  addToCart: (product: Product, selection?: CartSelection) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearToast: () => void;
}

const STORAGE_KEY = "rannaghor-cart-v1";
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<CouponFeedback | null>(null);
  const [toast, setToast] = useState<CartToast | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const hydrationTask = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { items?: CartItem[]; couponCode?: string | null };
          if (Array.isArray(parsed.items)) setItems(parsed.items);
          if (typeof parsed.couponCode === "string") setCouponCode(parsed.couponCode);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHasHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrationTask);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, couponCode }));
  }, [couponCode, hasHydrated, items]);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const discount = getCouponDiscount(couponCode, subtotal);
  const deliveryCharge = getDeliveryCharge(subtotal, items.length > 0);
  const total = Math.max(0, subtotal - discount + deliveryCharge);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const addToCart = useCallback((product: Product, selection: CartSelection = {}) => {
    const key = createCartKey(product, selection);
    const quantity = Math.max(1, selection.quantity ?? 1);

    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...current,
        {
          key,
          product,
          quantity,
          variant: selection.variant,
          addOns: selection.addOns ?? [],
          instructions: selection.instructions?.trim() || undefined,
        },
      ];
    });
    setToast({ id: crypto.randomUUID(), message: "added to your cart", productName: product.name });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.key !== key));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
    setCouponFeedback(null);
  }, []);

  const applyCoupon = useCallback((rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (code === "RANNA100") {
      if (subtotal < 700) {
        setCouponFeedback({ tone: "error", message: "Add ৳700 or more to use RANNA100." });
        return;
      }
      setCouponCode(code);
      setCouponFeedback({ tone: "success", message: "৳100 discount applied." });
      return;
    }
    if (code === "WELCOME10") {
      setCouponCode(code);
      setCouponFeedback({ tone: "success", message: "10% welcome discount applied." });
      return;
    }
    setCouponFeedback({ tone: "error", message: "That coupon code is not valid." });
  }, [subtotal]);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponFeedback(null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearToast = useCallback(() => setToast(null), []);

  const value = useMemo<CartContextType>(
    () => ({
      isReady: hasHydrated,
      items,
      itemCount,
      subtotal,
      discount,
      deliveryCharge,
      total,
      couponCode,
      couponFeedback,
      toast,
      isOpen,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      openCart,
      closeCart,
      clearToast,
    }),
    [
      addToCart,
      applyCoupon,
      clearCart,
      clearToast,
      closeCart,
      couponCode,
      couponFeedback,
      deliveryCharge,
      discount,
      hasHydrated,
      isOpen,
      itemCount,
      items,
      openCart,
      removeCoupon,
      removeItem,
      subtotal,
      toast,
      total,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
