"use client";

import { useState, type FormEvent } from "react";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";
import type {
  AddressTag,
  CustomerDetails,
  DeliveryAddress,
  OrderMethod,
  PaymentMethodType,
  PlacedOrderData,
} from "../_types/checkout";

interface CheckoutAccordionFormProps {
  onComplete: (order: PlacedOrderData) => void;
}

const inputClass =
  "min-h-9 sm:min-h-11 w-full rounded-lg sm:rounded-xl border border-border bg-brand-bg px-3 text-xs sm:text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10";

const RIDER_NOTES = [
  "Call upon arrival",
  "Leave with security / guard",
  "Don't ring bell (Baby sleeping)",
  "Hand over at door",
];

const DHAKA_AREAS = [
  "Dhanmondi",
  "Gulshan 1",
  "Gulshan 2",
  "Banani",
  "Uttara",
  "Mirpur",
  "Mohammadpur",
  "Badda",
  "Bashundhara R/A",
  "Baridhara",
  "Mohakhali",
  "Tejgaon",
  "Lalmatia",
  "Shantinagar",
  "Khilgaon",
  "Old Dhaka",
];

export function CheckoutAccordionForm({ onComplete }: CheckoutAccordionFormProps) {
  const { total, subtotal, deliveryCharge, discount, itemCount, clearCart } = useCart();

  // Accordion Step State: 1 | 2 | 3
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Step 1 State
  const [orderMethod, setOrderMethod] = useState<OrderMethod>("delivery");
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "Sakib Ahmed",
    phone: "01712345678",
    email: "sakib@example.com",
  });

  // Step 2 State (Address)
  const [address, setAddress] = useState<DeliveryAddress>({
    tag: "home",
    city: "Dhaka",
    area: "Dhanmondi",
    road: "Road 7/A",
    house: "House 14, Apt 4B (4th Floor)",
    landmark: "Near Medinova Diagnostic",
    riderNote: "Call upon arrival",
    kitchenNote: "",
  });

  // Step 3 State (Payment & Preferences)
  const [payment, setPayment] = useState<PaymentMethodType>("cash");
  const [noCutlery, setNoCutlery] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validation & Transitions
  function handleStep1Submit(e: FormEvent) {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMessage("Please provide your name and phone number.");
      return;
    }
    setErrorMessage("");
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1])));
    if (orderMethod === "pickup") {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  }

  function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    if (!address.area.trim() || !address.road.trim() || !address.house.trim()) {
      setErrorMessage("Please complete your delivery address details.");
      return;
    }
    setErrorMessage("");
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1, 2])));
    setActiveStep(3);
  }

  function handleFinalSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const placedOrder: PlacedOrderData = {
      id: `RG-${Math.floor(100000 + Math.random() * 900000)}`,
      total,
      subtotal,
      deliveryCharge: orderMethod === "pickup" ? 0 : deliveryCharge,
      discount,
      orderMethod,
      customer,
      address: orderMethod === "delivery" ? address : undefined,
      payment,
      itemsCount: itemCount,
      noCutlery,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      estimatedArrival: orderMethod === "pickup" ? "15–20 Mins" : "30–45 Mins",
    };

    window.setTimeout(() => {
      onComplete(placedOrder);
      clearCart();
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs sm:text-sm font-semibold text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: Order Method & Contact Details */}
      {/* ========================================================================= */}
      <section
        aria-labelledby="step-1-title"
        className={`rounded-xl sm:rounded-2xl border transition-all duration-300 ${
          activeStep === 1
            ? "border-primary/40 bg-white p-3.5 sm:p-5 shadow-2xs sm:shadow-sm"
            : "border-border bg-white p-3 sm:px-4 sm:py-3.5"
        }`}
      >
        {activeStep === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2.5 border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-black text-white">
                  1
                </span>
                <div>
                  <h2 id="step-1-title" className="text-sm sm:text-base font-extrabold text-dark">
                    Order method &amp; contact
                  </h2>
                  <p className="text-[10px] sm:text-xs text-muted">
                    Choose how you want to receive your food.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Method Selector */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setOrderMethod("delivery")}
                className={`flex min-h-11 sm:min-h-13 cursor-pointer items-center justify-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl border p-2 sm:p-3 text-left transition-all ${
                  orderMethod === "delivery"
                    ? "border-primary bg-primary-light ring-2 ring-primary/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <div
                  className={`flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-lg ${
                    orderMethod === "delivery" ? "bg-primary text-white" : "bg-white text-dark"
                  }`}
                >
                  <Icon name="delivery" className="size-4 sm:size-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-dark">Home Delivery</p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-secondary">
                    30–45 Mins
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderMethod("pickup")}
                className={`flex min-h-11 sm:min-h-13 cursor-pointer items-center justify-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl border p-2 sm:p-3 text-left transition-all ${
                  orderMethod === "pickup"
                    ? "border-primary bg-primary-light ring-2 ring-primary/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <div
                  className={`flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-lg ${
                    orderMethod === "pickup" ? "bg-primary text-white" : "bg-white text-dark"
                  }`}
                >
                  <Icon name="cloche" className="size-4 sm:size-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-dark">Self Pickup</p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-primary">
                    15–20 Mins (Free)
                  </p>
                </div>
              </button>
            </div>

            {/* Customer Inputs */}
            <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-dark">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Sakib Ahmed"
                  className={`mt-1 ${inputClass}`}
                />
              </div>

              <div>
                <label className="text-[11px] sm:text-xs font-bold text-dark">
                  Mobile Number <span className="text-primary">*</span>
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 text-[11px] sm:text-xs font-extrabold text-muted">
                    🇧🇩 +880
                  </span>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="1712 345678"
                    className={`pl-16 sm:pl-18 ${inputClass}`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] sm:text-xs font-bold text-dark">
                  Email address{" "}
                  <span className="font-normal text-muted">(optional for invoice)</span>
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <m.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="section-action w-full justify-center bg-primary py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-primary-hover"
              >
                {orderMethod === "delivery"
                  ? "Continue to Delivery Address →"
                  : "Continue to Payment Method →"}
              </m.button>
            </div>
          </form>
        ) : (
          /* Step 1 Collapsed Summary */
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                <Icon name="check" className="size-3.5 sm:size-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-extrabold text-dark">Contact &amp; Method</h3>
                  <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-emerald-700">
                    Confirmed
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] sm:text-xs text-muted">
                  <span className="font-bold text-dark">{customer.name}</span> • +880{" "}
                  {customer.phone} •{" "}
                  <span className="font-semibold text-primary">
                    {orderMethod === "delivery" ? "🛵 Delivery (30–45m)" : "🛍️ Self Pickup"}
                  </span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="shrink-0 rounded-lg border border-border bg-brand-bg px-2.5 py-1 text-[11px] sm:text-xs font-bold text-dark hover:border-primary hover:text-primary"
            >
              Change
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* STEP 2: Delivery Address & Rider Instructions */}
      {/* ========================================================================= */}
      {orderMethod === "delivery" && (
        <section
          aria-labelledby="step-2-title"
          className={`rounded-xl sm:rounded-2xl border transition-all duration-300 ${
            activeStep === 2
              ? "border-primary/40 bg-white p-3.5 sm:p-5 shadow-2xs sm:shadow-sm"
              : "border-border bg-white p-3 sm:px-4 sm:py-3.5"
          }`}
        >
          {activeStep === 2 ? (
            <form onSubmit={handleStep2Submit} className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between gap-2.5 border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-black text-white">
                    2
                  </span>
                  <div>
                    <h2
                      id="step-2-title"
                      className="text-sm sm:text-base font-extrabold text-dark"
                    >
                      Delivery address &amp; notes
                    </h2>
                    <p className="text-[10px] sm:text-xs text-muted">
                      Where should our rider bring your food?
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Tag Selector */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted">
                  Address Label
                </label>
                <div className="mt-1 flex gap-1.5">
                  {(
                    [
                      { id: "home", label: "🏠 Home" },
                      { id: "work", label: "🏢 Office" },
                      { id: "other", label: "📍 Other" },
                    ] as const
                  ).map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setAddress({ ...address, tag: tag.id as AddressTag })}
                      className={`rounded-lg sm:rounded-xl border px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold transition-all ${
                        address.tag === tag.id
                          ? "border-primary bg-primary-light font-extrabold text-primary shadow-2xs"
                          : "border-border bg-brand-bg text-dark hover:border-stone-300"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-dark">
                    Area / Neighborhood <span className="text-primary">*</span>
                  </label>
                  <select
                    value={address.area}
                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    className={`mt-1 ${inputClass} cursor-pointer font-bold`}
                  >
                    {DHAKA_AREAS.map((ar) => (
                      <option key={ar} value={ar}>
                        {ar}, Dhaka
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-dark">
                    Road / Sector / Block <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address.road}
                    onChange={(e) => setAddress({ ...address, road: e.target.value })}
                    placeholder="e.g. Road 7/A, Block C"
                    className={`mt-1 ${inputClass}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-dark">
                    House / Building / Flat <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address.house}
                    onChange={(e) => setAddress({ ...address, house: e.target.value })}
                    placeholder="e.g. House 14, Apt 4B (4th Floor)"
                    className={`mt-1 ${inputClass}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-dark">
                    Nearby Landmark{" "}
                    <span className="font-normal text-muted">(helps rider find you)</span>
                  </label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    placeholder="e.g. Opposite to Medinova Diagnostic"
                    className={`mt-1 ${inputClass}`}
                  />
                </div>
              </div>

              {/* Rider Delivery Notes */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-dark">
                  Delivery instructions for rider:
                </label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {RIDER_NOTES.map((note) => {
                    const selected = address.riderNote === note;
                    return (
                      <button
                        key={note}
                        type="button"
                        onClick={() =>
                          setAddress({
                            ...address,
                            riderNote: selected ? "" : note,
                          })
                        }
                        className={`rounded-lg border px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold transition-all ${
                          selected
                            ? "border-secondary bg-emerald-50 text-secondary"
                            : "border-border bg-brand-bg text-dark hover:border-stone-300"
                        }`}
                      >
                        {selected ? `✓ ${note}` : note}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen Cooking Note */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-dark">
                  Special Kitchen Note{" "}
                  <span className="font-normal text-muted">(e.g. less spicy)</span>
                </label>
                <input
                  type="text"
                  value={address.kitchenNote}
                  onChange={(e) => setAddress({ ...address, kitchenNote: e.target.value })}
                  placeholder="Any preference for the chef..."
                  className={`mt-1 ${inputClass}`}
                />
              </div>

              <div className="pt-1 sm:pt-2">
                <m.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="section-action w-full justify-center bg-primary py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-primary-hover"
                >
                  Continue to Payment Method →
                </m.button>
              </div>
            </form>
          ) : completedSteps.includes(2) ? (
            /* Step 2 Collapsed Summary */
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                  <Icon name="check" className="size-3.5 sm:size-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-extrabold text-dark">
                      Delivery Address
                    </h3>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-emerald-700">
                      Confirmed
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] sm:text-xs text-muted">
                    <span className="font-bold uppercase text-dark">{address.tag}:</span>{" "}
                    {address.house}, {address.road}, {address.area}, Dhaka
                    {address.riderNote ? ` • Note: "${address.riderNote}"` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="shrink-0 rounded-lg border border-border bg-brand-bg px-2.5 py-1 text-[11px] sm:text-xs font-bold text-dark hover:border-primary hover:text-primary"
              >
                Change
              </button>
            </div>
          ) : (
            /* Step 2 Inactive Header */
            <div className="flex items-center gap-2.5 opacity-60">
              <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[11px] sm:text-xs font-bold text-stone-600">
                2
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-dark">Delivery Address</h3>
                <p className="text-[10px] sm:text-xs text-muted">Address &amp; rider delivery instructions</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: Payment Method & Place Order */}
      {/* ========================================================================= */}
      <section
        aria-labelledby="step-3-title"
        className={`rounded-xl sm:rounded-2xl border transition-all duration-300 ${
          activeStep === 3
            ? "border-primary/40 bg-white p-3.5 sm:p-5 shadow-2xs sm:shadow-sm"
            : "border-border bg-white p-3 sm:px-4 sm:py-3.5"
        }`}
      >
        {activeStep === 3 ? (
          <form onSubmit={handleFinalSubmit} className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2.5 border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-black text-white">
                  3
                </span>
                <div>
                  <h2 id="step-3-title" className="text-sm sm:text-base font-extrabold text-dark">
                    Select payment method
                  </h2>
                  <p className="text-[10px] sm:text-xs text-muted">Safe, encrypted &amp; verified payments.</p>
                </div>
              </div>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid gap-2 sm:gap-2.5 sm:grid-cols-2">
              {/* Cash on Delivery */}
              <label
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg sm:rounded-xl border p-2.5 sm:p-3.5 transition-all ${
                  payment === "cash"
                    ? "border-primary bg-primary-light ring-2 ring-primary/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={payment === "cash"}
                  onChange={() => setPayment("cash")}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full border ${
                    payment === "cash"
                      ? "border-primary bg-primary"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {payment === "cash" && <span className="size-1.5 rounded-full bg-white" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-extrabold text-dark">💵 Cash on Delivery</p>
                    <span className="rounded bg-stone-200/70 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-dark">
                      COD
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                    Pay in cash when rider hands over your food.
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg sm:rounded-xl border p-2.5 sm:p-3.5 transition-all ${
                  payment === "bkash"
                    ? "border-[#E2136E] bg-[#E2136E]/5 ring-2 ring-[#E2136E]/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={payment === "bkash"}
                  onChange={() => setPayment("bkash")}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full border ${
                    payment === "bkash"
                      ? "border-[#E2136E] bg-[#E2136E]"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {payment === "bkash" && <span className="size-1.5 rounded-full bg-white" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-extrabold text-dark">🌸 bKash Wallet</p>
                    <span className="rounded bg-[#E2136E]/10 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-[#E2136E]">
                      Instant
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                    Instant simulation via bKash payment.
                  </p>
                </div>
              </label>

              {/* Nagad */}
              <label
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg sm:rounded-xl border p-2.5 sm:p-3.5 transition-all ${
                  payment === "nagad"
                    ? "border-[#F7941D] bg-[#F7941D]/5 ring-2 ring-[#F7941D]/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="nagad"
                  checked={payment === "nagad"}
                  onChange={() => setPayment("nagad")}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full border ${
                    payment === "nagad"
                      ? "border-[#F7941D] bg-[#F7941D]"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {payment === "nagad" && <span className="size-1.5 rounded-full bg-white" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-extrabold text-dark">🟠 Nagad Wallet</p>
                    <span className="rounded bg-[#F7941D]/10 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-[#F7941D]">
                      Verified
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                    Pay securely using Nagad account.
                  </p>
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg sm:rounded-xl border p-2.5 sm:p-3.5 transition-all ${
                  payment === "card"
                    ? "border-primary bg-primary-light ring-2 ring-primary/20"
                    : "border-border bg-brand-bg hover:border-stone-300 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full border ${
                    payment === "card"
                      ? "border-primary bg-primary"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {payment === "card" && <span className="size-1.5 rounded-full bg-white" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-extrabold text-dark">💳 Debit / Card</p>
                    <span className="rounded bg-stone-200/70 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-dark">
                      Visa/MC
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                    Pay with Visa, Mastercard, or AMEX.
                  </p>
                </div>
              </label>
            </div>

            {/* Cutlery Environment Preference */}
            <div className="rounded-lg sm:rounded-xl border border-border bg-brand-bg/70 p-2.5 sm:p-3">
              <label className="flex cursor-pointer items-center gap-2 text-[11px] sm:text-xs font-bold text-dark">
                <input
                  type="checkbox"
                  checked={noCutlery}
                  onChange={(e) => setNoCutlery(e.target.checked)}
                  className="size-3.5 sm:size-4 rounded text-primary focus:ring-primary"
                />
                <span>🌱 No disposable plastic cutlery needed (Save trees)</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-1 sm:pt-2">
              <m.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.98 }}
                className="section-action w-full justify-center bg-primary py-2.5 sm:py-3.5 text-xs sm:text-base font-extrabold text-white shadow-md hover:bg-primary-hover disabled:opacity-60"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-3.5 sm:size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Confirming order…
                  </span>
                ) : (
                  <span>Place Order • {formatPrice(total)}</span>
                )}
              </m.button>
              <p className="mt-1.5 text-center text-[10px] sm:text-[11px] text-muted">
                By placing this order you agree to RannaGhor&apos;s Terms &amp; Refund Policy.
              </p>
            </div>
          </form>
        ) : (
          /* Step 3 Inactive Header */
          <div className="flex items-center gap-2.5 opacity-60">
            <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[11px] sm:text-xs font-bold text-stone-600">
              3
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-dark">Payment Method</h3>
              <p className="text-[10px] sm:text-xs text-muted">bKash, Nagad, Cash on Delivery, or Cards</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
