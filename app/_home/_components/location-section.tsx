import { locationData } from "@/app/_data/location";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { Icon, type IconName } from "@/app/_ui/icon";
import { LocationMap } from "./location-map";

export function LocationSection() {
  const { delivery } = rannaGhorConfig;
  const details: { icon: IconName; label: string; detail: string }[] = [
    {
      icon: "pin",
      label: locationData.fullAddress,
      detail: locationData.cityPostal,
    },
    {
      icon: "clock",
      label: locationData.hours,
      detail: "Dine in or pick up your favourites",
    },
    {
      icon: "delivery",
      label: delivery.deliveryMethod,
      detail: `Delivery in ${delivery.averageTime}`,
    },
  ];

  return (
    <section
      aria-labelledby="location-heading"
      className="grid overflow-hidden rounded-2xl border border-clay-border bg-clay shadow-sm lg:grid-cols-[1.24fr_0.76fr]"
    >
      <LocationMap compact />
      <div className="px-7 py-5 text-dark sm:px-9 sm:py-6">
        <div>
          <h2
            id="location-heading"
            className="max-w-lg text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            Find us in Dhanmondi
          </h2>
          <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-muted">
            Visit, collect your meal, or order for delivery.
          </p>

          <ul className="mt-4 space-y-2.5 border-t border-dark/10 pt-4">
            {details.map((item) => (
              <li key={item.icon} className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon name={item.icon} className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-snug text-dark">
                    {item.label}
                  </p>
                  <p className="text-[11px] leading-snug text-muted">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-1 gap-2 border-t border-dark/10 pt-4 sm:grid-cols-2">
            <a
              href={locationData.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-white hover:bg-primary-hover"
            >
              <Icon name="directions" className="size-4" /> Directions
            </a>
            <a
              href={`tel:${locationData.phone.replace(/\s+/g, "")}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-clay-border-strong bg-white px-3 text-xs font-semibold text-dark hover:bg-warm-cream"
            >
              <Icon name="phone" className="size-4" /> Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
