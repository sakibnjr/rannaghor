import { locationData } from "@/app/_data/location";
import { Icon } from "@/app/_ui/icon";
import { LocationMap } from "@/app/_home/_components/location-map";

export function ContactLocation() {
  return (
    <section className="site-shell py-10 sm:py-12" aria-labelledby="contact-location-heading">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><h2 id="contact-location-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">Come and visit us.</h2><p className="mt-1.5 text-sm text-muted">{locationData.fullAddress}, {locationData.cityPostal}</p></div>
        <a href={locationData.directionsUrl} target="_blank" rel="noopener noreferrer" className="section-action section-action-compact self-start bg-primary px-5 text-white hover:bg-primary-hover"><Icon name="directions" className="size-4" /> Get directions</a>
      </div>
      <div className="h-[340px] overflow-hidden rounded-2xl border border-border"><LocationMap className="h-full" /></div>
    </section>
  );
}
