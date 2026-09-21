"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/app/_ui/icon";

const fieldClass = "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-brand-bg px-3.5 text-sm text-dark outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/15";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  return (
    <section className="rounded-2xl bg-clay p-5 sm:p-6" aria-labelledby="contact-form-heading">
      <h2 id="contact-form-heading" className="text-2xl font-extrabold tracking-tight">How can we help?</h2>
      <p className="mt-2 text-sm text-muted">Send us a message and our team will get back to you as soon as possible.</p>

      <form onSubmit={submitForm} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-dark">Your name<input name="name" required autoComplete="name" className={fieldClass} placeholder="Enter your name" /></label>
        <label className="text-sm font-bold text-dark">Mobile number<input name="phone" required type="tel" autoComplete="tel" className={fieldClass} placeholder="+880 1XXXXXXXXX" /></label>
        <label className="text-sm font-bold text-dark">Email address<input name="email" type="email" autoComplete="email" className={fieldClass} placeholder="name@example.com" /></label>
        <label className="text-sm font-bold text-dark">What is this about?<select name="topic" className={fieldClass} defaultValue="general"><option value="general">General question</option><option value="menu">Menu information</option><option value="delivery">Delivery question</option><option value="order">Existing order</option><option value="feedback">Feedback</option></select></label>
        <label className="text-sm font-bold text-dark sm:col-span-2">Message<textarea name="message" required rows={4} className={`${fieldClass} resize-y py-3`} placeholder="Tell us how we can help" /></label>
        <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center">
          <button type="submit" className="section-action section-action-compact bg-primary px-5 text-white hover:bg-primary-hover"><Icon name="arrow" className="size-4" /> Send message</button>
          {sent && <p role="status" className="inline-flex items-center gap-2 text-sm font-bold text-secondary"><Icon name="check" className="size-4" /> Message received. Thank you.</p>}
        </div>
      </form>
    </section>
  );
}
