"use client";

import { Icon } from "@/app/_ui/icon";

import { useEffect } from "react";
import { useCart } from "@/app/_components/cart-context";

export function CartToastNotification() {
  const { toast, clearToast, openCart } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <aside
      aria-label="Notification"
      role="status"
      className="fixed bottom-4 left-4 right-4 z-[70] flex items-center gap-3 rounded-2xl border border-stone-700/50 bg-dark px-4 py-3 text-white shadow-xl transition-all sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
    >
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
        <Icon name="check" className="size-4" />
      </div>
      <div className="text-sm">
        <span className="font-semibold text-white">{toast.productName}</span>{" "}
        <span className="text-stone-300">{toast.message}</span>
      </div>
      <button
        onClick={() => {
          clearToast();
          openCart();
        }}
        className="ml-auto shrink-0 text-xs font-semibold text-primary hover:underline"
      >
        View cart
      </button>
    </aside>
  );
}
