import { Icon } from "@/app/_ui/icon";
import type { RestaurantDeliveryInfo } from "@/app/_types/restaurant";

interface HeroTrustBarProps {
  delivery: RestaurantDeliveryInfo;
}

export function HeroTrustBar({ delivery }: HeroTrustBarProps) {
  const details = [
    {
      title: delivery.isOpen ? "Open Now" : "Closed",
      description: delivery.isOpen ? `Until ${delivery.closingTime}` : "Check opening hours",
      icon: delivery.isOpen ? "check" as const : "minus" as const,
      color: "bg-secondary",
    },
    {
      title: delivery.averageTime,
      description: "Average delivery",
      icon: "clock" as const,
      color: "bg-primary",
    },
    {
      title: delivery.deliveryMethod,
      description: "Choose at checkout",
      icon: "delivery" as const,
      color: "bg-primary",
    },
  ];

  return (
    <ul aria-label="Restaurant service information" className="flex flex-wrap gap-x-4 gap-y-3 pt-3">
      {details.map((detail) => (
        <li key={detail.title} className="flex items-center gap-2 rounded-lg bg-surface/90 px-2.5 py-2">
          <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white ${detail.color}`}>
            <Icon name={detail.icon} className="size-4" />
          </span>
          <span>
            <span className="block text-sm font-bold leading-snug text-dark">{detail.title}</span>
            <span className="block text-xs leading-snug text-muted">{detail.description}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
