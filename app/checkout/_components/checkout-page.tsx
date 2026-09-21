"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import { CartEmpty } from "@/app/cart/_components/cart-empty";
import type { PlacedOrderData } from "../_types/checkout";
import { CheckoutAccordionForm } from "./checkout-accordion-form";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import { CheckoutOrderSuccess } from "./checkout-order-success";

export function CheckoutPage() {
  const { items, isReady } = useCart();
  const [order, setOrder] = useState<PlacedOrderData | null>(null);

  if (!isReady) {
    return (
      <div className="site-shell py-4 sm:py-8" aria-busy="true">
        <div className="h-80 sm:h-96 animate-pulse rounded-2xl sm:rounded-3xl bg-white/70" />
      </div>
    );
  }

  // Order Confirmed State
  if (order) {
    return <CheckoutOrderSuccess order={order} />;
  }

  // Cart Empty State
  if (items.length === 0) {
    return (
      <div className="site-shell py-5 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-xl rounded-2xl sm:rounded-3xl border border-border bg-white p-5 sm:p-6 shadow-sm">
          <CartEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="site-shell py-3.5 sm:py-6 lg:py-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-muted">
            <Link href="/menu" className="hover:text-primary">
              Menu
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-primary">
              Cart
            </Link>
            <span>/</span>
            <span className="text-primary">Checkout</span>
          </div>
          <h1 className="mt-0.5 text-xl font-black tracking-tight text-dark sm:text-2xl lg:text-3xl">
            Complete your order
          </h1>
          <p className="text-[11px] sm:text-xs text-muted">
            Fast, secure checkout. Your meal will be cooked fresh upon confirmation.
          </p>
        </div>

        {/* Security & Guarantee Badges */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-secondary">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-emerald-800">
            <Icon name="check" className="size-3 sm:size-3.5" /> 100% Encrypted Checkout
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="mt-4 sm:mt-6 grid items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Left Column: Progressive Step Stack Accordion */}
        <div className="min-w-0">
          <CheckoutAccordionForm onComplete={setOrder} />
        </div>

        {/* Right Column: Sticky Pinned Order Summary */}
        <CheckoutOrderSummary />
      </div>
    </div>
  );
}
