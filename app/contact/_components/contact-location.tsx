import { locationData } from "@/app/_data/location";
import { Icon } from "@/app/_ui/icon";
import { LocationMap } from "@/app/_home/_components/location-map";

export function ContactLocation() {
  return (
    <section className="site-shell page-section" aria-labelledby="contact-location-heading">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h2 id="contact-location-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Come and visit us.</h2><p className="mt-2 text-sm text-muted">{locationData.fullAddress}, {locationData.cityPostal}</p></div>
        <a href={locationData.directionsUrl} target="_blank" rel="noopener noreferrer" className="section-action self-start bg-primary px-6 text-white hover:bg-primary-hover"><Icon name="directions" className="size-4" /> Get directions</a>
      </div>
      <div className="h-[420px] overflow-hidden rounded-3xl border border-border"><LocationMap className="h-full" /></div>
    </section>
  );
}
