import { PageShell } from "@/app/_components/page-shell";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactLocation } from "./contact-location";
import { Reveal } from "@/app/_ui/reveal";

export function ContactPage() {
  return (
    <PageShell>
      <ContactHero />
      <Reveal>
        <div className="site-shell grid gap-5 pt-3 pb-8 sm:py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <ContactDetails />
          <ContactForm />
        </div>
      </Reveal>
      <Reveal><ContactLocation /></Reveal>
    </PageShell>
  );
}
