import { Icon } from "@/app/_ui/icon";
import type { RestaurantDeliveryInfo } from "@/app/_types/restaurant";

interface HeroTrustBarProps {
  delivery: RestaurantDeliveryInfo;
}

export function HeroTrustBar({ delivery }: HeroTrustBarProps) {
  const details = [
    {
      title: delivery.isOpen ? "Open Now" : "Closed",
      description: delivery.isOpen ? `Until ${delivery.closingTime}` : "Check hours",
      icon: delivery.isOpen ? ("check" as const) : ("minus" as const),
      color: "bg-secondary",
    },
    {
      title: delivery.averageTime,
      description: "Avg delivery",
      icon: "clock" as const,
      color: "bg-primary",
    },
    {
      title: delivery.deliveryMethod,
      description: "Fast delivery",
      icon: "delivery" as const,
      color: "bg-primary",
    },
  ];

  return (
    <ul
      aria-label="Restaurant service information"
      className="grid grid-cols-3 gap-1.5 w-full pt-2.5 sm:flex sm:flex-wrap sm:gap-3"
    >
      {details.map((detail) => (
        <li
          key={detail.title}
          className="flex min-w-0 items-center gap-1.5 rounded-xl border border-border/60 bg-surface/95 px-2 py-1.5 shadow-2xs sm:gap-2 sm:px-3 sm:py-2"
        >
          <span
            aria-hidden="true"
            className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white sm:size-8 ${detail.color}`}
          >
            <Icon name={detail.icon} className="size-3 sm:size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11px] font-bold leading-tight text-dark sm:text-sm">
              {detail.title}
            </span>
            <span className="block truncate text-[9px] leading-tight text-muted sm:text-xs">
              {detail.description}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
