import Image from "next/image";
import type { ReactNode } from "react";
import { PageShell } from "@/app/_components/page-shell";
import { restaurantImages } from "@/app/_data/imagery";
import { Icon } from "@/app/_ui/icon";

const accountBenefits = [
  "Checkout faster with saved details",
  "Track current and previous orders",
  "Reorder your favourite dishes easily",
];

interface AuthPageShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthPageShell({ title, description, children }: AuthPageShellProps) {
  return (
    <PageShell>
      <section className="site-shell py-5 sm:py-6">
        <div className="grid w-full overflow-hidden rounded-3xl border border-clay-border bg-white shadow-xl shadow-dark/5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7">
            <h1 className="text-3xl font-extrabold tracking-[-0.035em] text-dark">{title}</h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted sm:text-base">{description}</p>
            <div className="mt-5">{children}</div>
          </div>

          <aside className="relative hidden min-h-[440px] overflow-hidden bg-dark lg:block" aria-label="Account benefits">
            <Image
              src={restaurantImages.familyFeast}
              alt="A family-style Bangladeshi meal with biryani and grilled chicken"
              fill
              sizes="(min-width: 1024px) 46vw, 0px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/5" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <h2 className="max-w-sm text-2xl font-extrabold leading-tight tracking-tight">Good food is even better when ordering is easy.</h2>
              <ul className="mt-5 grid gap-2.5">
                {accountBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-orange-200">
                      <Icon name="check" className="size-3" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
