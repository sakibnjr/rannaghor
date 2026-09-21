"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { PhoneField } from "@/app/_auth/_components/phone-field";
import { isBangladeshMobile } from "@/app/_auth/_lib/validate-phone";
import { Icon } from "@/app/_ui/icon";

type RegistrationStep = "details" | "otp" | "complete";
const fieldClass = "mt-1 min-h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-dark outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15";

export function RegistrationForm() {
  const [step, setStep] = useState<RegistrationStep>("details");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function submitDetails(event: FormEvent<HTMLFormElement>) {
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
      <div role="status" className="rounded-xl border border-secondary/20 bg-emerald-50 p-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-white"><Icon name="check" /></span>
        <h2 className="mt-3 text-lg font-extrabold text-dark">Account created</h2>
        <p className="mt-1 text-xs leading-5 text-muted">Welcome to RannaGhor. You can now order food and manage your details.</p>
        <Link href="/menu" className="section-action section-action-compact mt-4 w-full bg-primary text-white hover:bg-primary-hover">Start ordering <Icon name="arrow" className="size-4" /></Link>
      </div>
    );
  }

  return (
    <>
      {step === "details" ? (
        <form onSubmit={submitDetails} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-dark">
              Full name
              <input name="name" required autoComplete="name" className={fieldClass} placeholder="Enter your full name" />
            </label>
            <label className="text-xs font-bold text-dark">
              Email address <span className="font-normal text-muted">(optional)</span>
              <input name="email" type="email" autoComplete="email" className={fieldClass} placeholder="name@example.com" />
            </label>
          </div>

          <PhoneField value={phone} onChange={(value) => { setPhone(value); setError(""); }} error={error} />

          <label className="flex cursor-pointer items-start gap-2 pt-0.5 text-xs leading-4 text-muted">
            <input name="terms" type="checkbox" required className="mt-0.5 size-3.5 accent-secondary" />
            <span>I agree to the <a href="#" className="font-semibold text-secondary hover:underline">Terms & Conditions</a> and <a href="#" className="font-semibold text-secondary hover:underline">Privacy Policy</a>.</span>
          </label>

          <button type="submit" className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover">
            Create account <Icon name="arrow" className="size-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={verifyCode} noValidate className="space-y-3">
          <div className="rounded-lg bg-clay/60 px-3.5 py-2.5 text-xs text-muted">Code sent to <strong className="text-dark">+880 {phone.replace(/^0/, "")}</strong></div>
          <label className="block text-xs font-bold text-dark">Verification code
            <input name="otp" inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} maxLength={6} required aria-invalid={Boolean(error)} className="mt-1 min-h-10 w-full rounded-lg border border-border bg-white px-3 text-center text-lg font-bold tracking-[0.35em] outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15" placeholder="000000" />
          </label>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <button type="submit" className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover">Verify and create account</button>
          <button type="button" onClick={() => { setStep("details"); setOtp(""); setError(""); }} className="w-full text-center text-xs font-semibold text-secondary hover:underline">Edit account details</button>
        </form>
      )}

      <p className="mt-3.5 border-t border-border pt-3 text-center text-xs text-muted">Already have an account? <Link href="/login" className="font-bold text-secondary hover:underline">Sign in</Link></p>
    </>
  );
}
