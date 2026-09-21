import Link from "next/link";
import { Icon, type IconName } from "@/app/_ui/icon";

const steps: { icon: IconName; title: string; description: string }[] = [
  { icon: "cloche", title: "Pick a deal", description: "Choose the meal and savings that suit you." },
  { icon: "cart", title: "Add it to your cart", description: "One tap adds the complete offer to your order." },
  { icon: "check", title: "Checkout and enjoy", description: "Review your order, then choose delivery or pickup." },
];

export function OfferSteps() {
  return (
    <section aria-labelledby="offer-steps-heading" className="py-10 sm:py-12">
      <div className="site-shell">
        <div className="rounded-2xl border border-clay-border bg-clay px-5 py-7 text-dark sm:px-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="offer-steps-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">How to enjoy an offer</h2>
            </div>
            <Link href="/menu" className="section-action section-action-compact self-start bg-dark px-4 text-white hover:bg-primary sm:self-auto">
              Browse regular menu <Icon name="arrow" className="size-4" />
            </Link>
          </div>

          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-clay-border bg-warm-cream p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white"><Icon name={step.icon} className="size-4" /></span>
                  <span className="text-sm font-bold text-primary">0{index + 1}</span>
                </div>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
