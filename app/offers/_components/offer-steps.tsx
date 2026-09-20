import Link from "next/link";
import { Icon, type IconName } from "@/app/_ui/icon";

const steps: { icon: IconName; title: string; description: string }[] = [
  { icon: "cloche", title: "Pick a deal", description: "Choose the meal and savings that suit you." },
  { icon: "cart", title: "Add it to your cart", description: "One tap adds the complete offer to your order." },
  { icon: "check", title: "Checkout and enjoy", description: "Review your order, then choose delivery or pickup." },
];

export function OfferSteps() {
  return (
    <section aria-labelledby="offer-steps-heading" className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-[1280px] rounded-3xl border border-clay-border bg-clay px-6 py-10 text-dark sm:px-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 id="offer-steps-heading" className="text-3xl font-extrabold tracking-tight">How to enjoy an offer</h2>
          </div>
          <Link href="/menu" className="section-action self-start bg-dark px-5 text-white hover:bg-primary sm:self-auto">
            Browse regular menu <Icon name="arrow" className="size-4" />
          </Link>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-clay-border bg-warm-cream p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-white"><Icon name={step.icon} className="size-5" /></span>
                <span className="text-sm font-bold text-primary">0{index + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
