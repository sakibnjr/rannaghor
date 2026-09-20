import { locationData } from "@/app/_data/location";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { Icon, type IconName } from "@/app/_ui/icon";

const details: { icon: IconName; title: string; value: string; href?: string }[] = [
  { icon: "phone", title: "Call us", value: locationData.displayPhone, href: `tel:${locationData.phone.replace(/\s+/g, "")}` },
  { icon: "pin", title: "Find us", value: locationData.area, href: locationData.directionsUrl },
  { icon: "clock", title: "Opening hours", value: locationData.hours },
  { icon: "delivery", title: "Delivery", value: `Usually ${rannaGhorConfig.delivery.averageTime}` },
];

export function ContactDetails() {
  return (
    <aside className="relative overflow-hidden rounded-3xl border border-clay-border bg-warm-cream p-6 text-dark sm:p-8" aria-labelledby="contact-details-heading">
      <div className="absolute -right-16 -top-16 size-48 rounded-full border-[32px] border-dark/5" aria-hidden="true" />
      <h2 id="contact-details-heading" className="text-3xl font-extrabold tracking-tight">Reach RannaGhor</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">For urgent order questions, calling is the quickest way to reach the restaurant.</p>
      <ul className="mt-7 divide-y divide-dark/10 border-y border-dark/10">
        {details.map((detail) => (
          <li key={detail.title} className="flex items-center gap-4 py-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary"><Icon name={detail.icon} className="size-5" /></span>
            <span><span className="block text-xs font-semibold text-muted">{detail.title}</span>{detail.href ? <a href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-0.5 block text-sm font-bold hover:text-primary">{detail.value}</a> : <span className="mt-0.5 block text-sm font-bold">{detail.value}</span>}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-muted">General email: <a href={`mailto:${rannaGhorConfig.contact.email}`} className="font-bold text-dark hover:text-primary">{rannaGhorConfig.contact.email}</a></p>
    </aside>
  );
}
