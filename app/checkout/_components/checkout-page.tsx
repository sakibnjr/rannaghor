"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";
import { CartEmpty } from "@/app/cart/_components/cart-empty";
import { CheckoutForm } from "./checkout-form";
import { CheckoutOrderSummary } from "./checkout-order-summary";

export function CheckoutPage() {
  const { items, isReady } = useCart();
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  if (!isReady) {
    return <div className="site-shell py-5 sm:py-6" aria-busy="true"><div className="h-80 animate-pulse rounded-2xl bg-white" /></div>;
  }

  if (order) {
    return (
      <div className="site-shell flex min-h-[65vh] items-center justify-center py-5 sm:py-6">
        <section className="w-full max-w-xl rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-8">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-secondary"><Icon name="check" className="size-8" /></span>
          <p className="mt-6 text-sm font-bold text-primary">Order {order.id}</p>
          <h1 className="mt-2 text-3xl font-extrabold">Order confirmed</h1>
          <p className="mt-3 text-muted">We received your {formatPrice(order.total)} order. The restaurant will call you to confirm delivery.</p>
          <Link href="/menu" className="section-action mt-7 bg-primary px-6 text-white hover:bg-primary-hover">Browse more dishes</Link>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="site-shell py-5 sm:py-6"><div className="rounded-2xl border border-border bg-white"><CartEmpty /></div></div>;
  }

  return (
    <div className="site-shell py-5 sm:py-6">
      <p className="text-sm font-bold text-primary">Secure checkout</p>
      <h1 className="mt-0.5 text-3xl font-extrabold tracking-tight">Complete your order</h1>
      <p className="mt-1 text-sm text-muted">A few details and your meal will be on its way.</p>
      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <CheckoutForm onComplete={setOrder} />
        <CheckoutOrderSummary />
      </div>
    </div>
  );
}
