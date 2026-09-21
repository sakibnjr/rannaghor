"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";
import type { PlacedOrderData } from "../_types/checkout";

interface CheckoutOrderSuccessProps {
  order: PlacedOrderData;
}

export function CheckoutOrderSuccess({ order }: CheckoutOrderSuccessProps) {
  const steps = [
    { id: "received", label: "Order Received", time: order.createdAt, status: "done" },
    { id: "kitchen", label: "Kitchen Preparing", time: "In progress", status: "active" },
    { id: "rider", label: "Rider on the Way", time: "Pending", status: "upcoming" },
    { id: "delivered", label: "Delivered", time: order.estimatedArrival, status: "upcoming" },
  ];

  const paymentLabels: Record<string, string> = {
    cash: "Cash on Delivery",
    bkash: "bKash Mobile Wallet",
    nagad: "Nagad Mobile Wallet",
    card: "Debit / Credit Card",
  };

  return (
    <div className="site-shell py-2.5 sm:py-4 lg:py-6">
      <div className="mx-auto max-w-5xl xl:max-w-6xl">
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-white shadow-2xs sm:shadow-sm">
          {/* Top Banner (Compact Responsive Layout) */}
          <div className="bg-gradient-to-r from-primary to-primary-hover p-3 sm:p-4 lg:p-5 text-white">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <m.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="flex size-9 sm:size-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-primary shadow-md"
                >
                  <Icon name="check" className="size-5 sm:size-7" />
                </m.div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="rounded bg-white/20 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                      Order {order.id}
                    </span>
                    <span className="rounded bg-emerald-400/30 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-emerald-100">
                      In Kitchen
                    </span>
                  </div>
                  <h1 className="mt-0.5 text-sm sm:text-lg lg:text-xl font-black tracking-tight truncate">
                    Order Confirmed &amp; In Kitchen!
                  </h1>
                  <p className="text-[10px] sm:text-xs text-white/90 leading-tight truncate">
                    Thank you, <span className="font-bold text-white">{order.customer.name}</span>! Cooking your fresh meal now.
                  </p>
                </div>
              </div>

              {/* Quick Actions in Banner */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-[#25D366] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-extrabold text-white shadow-2xs hover:bg-[#20bd5a] transition-colors"
                >
                  <Icon name="whatsapp" className="size-3.5 sm:size-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+8801700000000"
                  className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-white/20 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-extrabold text-white backdrop-blur-xs hover:bg-white/30 transition-colors"
                >
                  <Icon name="phone" className="size-3.5 sm:size-4" />
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
            {/* Live Progress Tracker */}
            <div className="rounded-xl sm:rounded-2xl border border-border bg-brand-bg/60 p-2.5 sm:p-3.5">
              <div className="flex items-center justify-between border-b border-border/70 pb-2">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] sm:text-xs font-bold text-muted">Estimated arrival:</p>
                  <span className="rounded-md bg-primary-light px-2 py-0.2 text-[11px] sm:text-xs font-black text-primary">
                    ⏱️ {order.estimatedArrival}
                  </span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.2 text-[10px] sm:text-xs font-bold text-emerald-800">
                  <span className="size-1.5 sm:size-2 animate-pulse rounded-full bg-emerald-600" />
                  Live tracker
                </span>
              </div>

              {/* Progress Steps in 1 Row */}
              <div className="mt-2.5 grid grid-cols-4 gap-1.5 text-center">
                {steps.map((step, idx) => (
                  <div key={step.id} className="min-w-0">
                    <div className="relative mx-auto flex size-6 sm:size-8 items-center justify-center rounded-full">
                      {step.status === "done" && (
                        <div className="flex size-6 sm:size-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                          <Icon name="check" className="size-3 sm:size-4" />
                        </div>
                      )}
                      {step.status === "active" && (
                        <div className="flex size-6 sm:size-8 items-center justify-center rounded-full bg-primary text-white shadow-md animate-pulse">
                          <Icon name="chef" className="size-3 sm:size-4" />
                        </div>
                      )}
                      {step.status === "upcoming" && (
                        <div className="flex size-6 sm:size-8 items-center justify-center rounded-full border border-dashed border-stone-300 bg-white text-stone-400 font-bold text-[10px] sm:text-xs">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-[10px] sm:text-xs font-bold leading-tight truncate ${
                        step.status === "active"
                          ? "text-primary"
                          : step.status === "done"
                          ? "text-dark"
                          : "text-muted"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-muted truncate">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Column Structured Information Grid */}
            <div className="grid gap-2.5 sm:grid-cols-3 text-xs sm:text-sm">
              {/* Column 1: Customer & Destination */}
              <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border bg-white p-2.5 sm:p-3.5">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted">
                    {order.orderMethod === "delivery" ? "Delivery Destination" : "Pickup Location"}
                  </p>
                  <p className="mt-0.5 font-bold text-dark text-xs sm:text-sm">{order.customer.name}</p>
                  <p className="text-[11px] sm:text-xs text-muted">+880 {order.customer.phone}</p>
                  {order.address ? (
                    <p className="mt-1 text-[11px] sm:text-xs text-dark font-medium leading-relaxed">
                      <span className="font-bold text-primary uppercase">
                        {order.address.tag}:
                      </span>{" "}
                      {order.address.house}, {order.address.road}, {order.address.area}, Dhaka
                      {order.address.landmark ? ` (${order.address.landmark})` : ""}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] sm:text-xs text-dark font-medium leading-relaxed">
                      RannaGhor Kitchen, Road 27 (Old), Dhanmondi, Dhaka
                    </p>
                  )}
                </div>
                {order.address?.riderNote && (
                  <p className="mt-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-800">
                    Rider note: &quot;{order.address.riderNote}&quot;
                  </p>
                )}
              </div>

              {/* Column 2: Payment & Bill Breakdown */}
              <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border bg-white p-2.5 sm:p-3.5">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted">
                    Payment &amp; Bill
                  </p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="font-bold text-dark text-xs sm:text-sm">
                      {paymentLabels[order.payment] ?? order.payment}
                    </span>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-extrabold text-emerald-700">
                      {order.payment === "cash" ? "Pay on delivery" : "Verified"}
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-dark">
                        {formatPrice(order.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-semibold text-dark">
                        {order.deliveryCharge ? formatPrice(order.deliveryCharge) : "Free"}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span className="font-bold">−{formatPrice(order.discount)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-1.5 flex items-baseline justify-between border-t border-border pt-1.5">
                  <span className="font-bold text-dark text-[11px] sm:text-xs">Total Amount</span>
                  <span className="text-sm sm:text-base lg:text-lg font-black text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Column 3: Order Assistance & Menu Shortcut */}
              <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border bg-white p-2.5 sm:p-3.5">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted">
                    Order Assistance
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-muted leading-relaxed">
                    Have questions? Our kitchen team and rider support are on standby.
                  </p>
                </div>

                <div className="mt-2 space-y-1.5">
                  <Link
                    href="/menu"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-primary px-3 py-2 text-[11px] sm:text-xs font-extrabold text-white hover:bg-primary-hover transition-colors"
                  >
                    Browse Menu / Order More
                  </Link>
                  <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] font-semibold text-muted">
                    <span>🍲 100% Halal</span>
                    <span>•</span>
                    <span>🛡️ Hot &amp; Fresh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
