"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";

const fieldClass = "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-secondary";

export function CheckoutForm({ onComplete }: { onComplete: (order: { id: string; total: number }) => void }) {
  const { total, clearCart } = useCart();
  const [orderMethod, setOrderMethod] = useState("delivery");
  const [payment, setPayment] = useState("cash");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const completedOrder = { id: `RG-${Date.now().toString().slice(-6)}`, total };
    window.setTimeout(() => {
      onComplete(completedOrder);
      clearCart();
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <CheckoutSection number="1" title="Order method">
        <div className="grid grid-cols-2 gap-3">
          {[{ value: "delivery", label: "Delivery", icon: "delivery" as const }, { value: "pickup", label: "Pickup", icon: "cloche" as const }].map((option) => (
            <label key={option.value} className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-bold ${orderMethod === option.value ? "border-secondary bg-emerald-50 text-secondary" : "border-border bg-white"}`}>
              <input type="radio" name="order-method" value={option.value} checked={orderMethod === option.value} onChange={(event) => setOrderMethod(event.target.value)} className="sr-only" />
              <Icon name={option.icon} className="size-5" /> {option.label}
            </label>
          ))}
        </div>
      </CheckoutSection>

      <CheckoutSection number="2" title="Your details">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">Full name<input name="name" autoComplete="name" required className={fieldClass} placeholder="Your name" /></label>
          <label className="text-sm font-semibold">Mobile number<input name="phone" type="tel" autoComplete="tel" required className={fieldClass} placeholder="+880 1XXXXXXXXX" /></label>
        </div>
      </CheckoutSection>

      {orderMethod === "delivery" && (
        <CheckoutSection number="3" title="Delivery address">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">Area<input name="area" required className={fieldClass} placeholder="Dhanmondi, Dhaka" /></label>
            <label className="text-sm font-semibold">Road<input name="road" required className={fieldClass} placeholder="Road number" /></label>
            <label className="text-sm font-semibold">House / Flat<input name="house" required className={fieldClass} placeholder="House, floor, flat" /></label>
            <label className="text-sm font-semibold sm:col-span-2">Landmark <span className="font-normal text-muted">(optional)</span><input name="landmark" className={fieldClass} placeholder="Near a known place" /></label>
          </div>
        </CheckoutSection>
      )}

      <CheckoutSection number={orderMethod === "delivery" ? "4" : "3"} title="Payment method">
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ value: "cash", label: "Cash on delivery" }, { value: "bkash", label: "bKash" }, { value: "nagad", label: "Nagad" }].map((option) => (
            <label key={option.value} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-center text-sm font-bold ${payment === option.value ? "border-secondary bg-emerald-50 text-secondary" : "border-border bg-white"}`}>
              <input type="radio" name="payment" value={option.value} checked={payment === option.value} onChange={(event) => setPayment(event.target.value)} className="sr-only" />
              {option.label}
            </label>
          ))}
        </div>
      </CheckoutSection>

      <button type="submit" disabled={submitting} className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover disabled:opacity-60">
        {submitting ? "Placing order…" : `Place order • ${formatPrice(total)}`}
      </button>
    </form>
  );
}

function CheckoutSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:px-5 sm:py-4">
      <legend className="px-1 text-base font-extrabold"><span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-primary text-xs text-white">{number}</span>{title}</legend>
      <div className="mt-2.5">{children}</div>
    </fieldset>
  );
}
