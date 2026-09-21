"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/app/_ui/icon";
import { PhoneField } from "@/app/_auth/_components/phone-field";
import { isBangladeshMobile } from "@/app/_auth/_lib/validate-phone";

type LoginStep = "phone" | "otp" | "complete";

export function LoginForm() {
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isBangladeshMobile(phone)) {
      setError("Enter a valid Bangladeshi mobile number.");
      return;
    }
    setError("");
    setStep("otp");
  }

  function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit verification code.");
      return;
    }
    setError("");
    setStep("complete");
  }

  if (step === "complete") {
    return (
      <div role="status" className="rounded-2xl border border-secondary/20 bg-emerald-50 p-5">
        <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-white"><Icon name="check" /></span>
        <h2 className="mt-4 text-xl font-extrabold text-dark">You are signed in</h2>
        <p className="mt-1 text-sm leading-6 text-muted">Your account is ready. Continue browsing and add your favourites to the cart.</p>
        <Link href="/menu" className="section-action mt-5 w-full bg-primary text-white hover:bg-primary-hover">Browse menu <Icon name="arrow" className="size-4" /></Link>
      </div>
    );
  }

  return (
    <>
      {step === "phone" ? (
        <form onSubmit={requestCode} noValidate className="space-y-3">
          <PhoneField value={phone} onChange={(value) => { setPhone(value); setError(""); }} error={error} />
          <button type="submit" className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover">Send verification code <Icon name="arrow" className="size-4" /></button>
        </form>
      ) : (
        <form onSubmit={verifyCode} noValidate className="space-y-3">
          <div className="rounded-lg bg-clay/60 px-3.5 py-2.5 text-xs text-muted">Code sent to <strong className="text-dark">+880 {phone.replace(/^0/, "")}</strong></div>
          <label className="block text-xs font-bold text-dark">Verification code
            <input name="otp" inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} maxLength={6} required aria-invalid={Boolean(error)} className="mt-1 min-h-10 w-full rounded-lg border border-border bg-white px-3 text-center text-lg font-bold tracking-[0.35em] outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15" placeholder="000000" />
          </label>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <button type="submit" className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover">Verify and sign in</button>
          <div className="flex items-center justify-between text-xs">
            <button type="button" onClick={() => { setStep("phone"); setOtp(""); setError(""); }} className="font-semibold text-secondary hover:underline">Change number</button>
            <button type="button" onClick={() => setError("")} className="font-semibold text-primary hover:underline">Resend code</button>
          </div>
        </form>
      )}

      <p className="mt-3.5 border-t border-border pt-3 text-center text-xs text-muted">New to RannaGhor? <Link href="/register" className="font-bold text-secondary hover:underline">Create an account</Link></p>
    </>
  );
}
