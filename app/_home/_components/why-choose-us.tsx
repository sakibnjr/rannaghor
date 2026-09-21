import { Icon } from "@/app/_ui/icon";
import { whyChooseUsData } from "@/app/_data/benefits";

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative w-full overflow-hidden rounded-3xl border border-clay-border bg-clay px-5 py-7 text-dark shadow-sm sm:px-7 sm:py-9 lg:px-10"
    >
      <div
        className="absolute -right-16 -top-20 size-56 rounded-full border-[36px] border-dark/5"
        aria-hidden="true"
      />

      <div className="relative max-w-2xl">
        <h2
          id="why-heading"
          className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Why choose us
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          Food made carefully, delivered reliably and ordered without the fuss.
        </p>
        <span
          className="mt-5 block h-1 w-16 rounded-full bg-primary"
          aria-hidden="true"
        />
      </div>

      <ol className="relative mt-7 grid grid-cols-1 gap-y-6 border-t border-dark/10 pt-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:divide-x lg:divide-dark/10">
        {whyChooseUsData.map((benefit, index) => (
          <li
            key={benefit.id}
            className="group relative flex items-start gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
          >
            <span
              className="absolute -top-4 right-2 text-6xl font-black leading-none text-primary/10"
              aria-hidden="true"
            >
              0{index + 1}
            </span>
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-sm transition-transform group-hover:-translate-y-1">
              <Icon
                name={
                  benefit.iconType === "phone" ? "mobile" : benefit.iconType
                }
                className="size-6"
              />
            </span>

            <div className="relative pt-0.5">
              <h3 className="text-base font-bold tracking-tight text-dark sm:text-lg">
                {benefit.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {benefit.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
