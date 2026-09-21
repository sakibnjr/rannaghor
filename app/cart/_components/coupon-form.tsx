"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";

export function CouponForm({ compact = false }: { compact?: boolean }) {
  const { couponCode, couponFeedback, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyCoupon(code);
  }

  if (couponCode) {
    return (
      <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm text-secondary">
        <span className="flex items-center gap-2 font-semibold">
          <Icon name="check" className="size-4" />
          {couponCode} applied
        </span>
        <button type="button" onClick={removeCoupon} className="font-semibold underline underline-offset-4">
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="coupon-code" className="sr-only">Coupon code</label>
        <input
          id="coupon-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Coupon code"
          className={`${compact ? "min-h-9" : "min-h-10"} min-w-0 flex-1 rounded-lg border border-border bg-white px-3 text-xs sm:text-sm uppercase outline-none placeholder:normal-case focus:border-secondary`}
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className={`${compact ? "min-h-9 px-3 text-xs" : "min-h-10 px-3.5 text-sm"} rounded-lg bg-dark font-bold text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 transition-colors`}
        >
          Apply
        </button>
      </form>
      <p className="mt-1.5 text-xs text-muted">Try WELCOME10 or RANNA100.</p>
      {couponFeedback && (
        <p
          role="status"
          className={`mt-2 text-xs font-semibold ${couponFeedback.tone === "error" ? "text-red-600" : "text-secondary"}`}
        >
          {couponFeedback.message}
        </p>
      )}
    </div>
  );
}
