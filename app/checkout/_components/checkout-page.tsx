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
    return <div className="site-shell page-section" aria-busy="true"><div className="h-96 animate-pulse rounded-3xl bg-white" /></div>;
  }

  if (order) {
    return (
      <div className="site-shell page-section flex min-h-[65vh] items-center justify-center">
        <section className="w-full max-w-xl rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-12">
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
    return <div className="site-shell page-section"><div className="rounded-3xl border border-border bg-white"><CartEmpty /></div></div>;
  }

  return (
    <div className="site-shell page-section">
      <p className="text-sm font-bold text-primary">Secure checkout</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Complete your order</h1>
      <p className="mt-2 text-sm text-muted">A few details and your meal will be on its way.</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        <CheckoutForm onComplete={setOrder} />
        <CheckoutOrderSummary />
      </div>
    </div>
  );
}
