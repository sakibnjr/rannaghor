import Image from "next/image";
import Link from "next/link";
import { restaurantImages } from "@/app/_data/imagery";
import { Icon } from "@/app/_ui/icon";
import styles from "./home-sections.module.css";

export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-heading" className={styles.cta}>
      <div className={styles.ctaPhoto} aria-hidden="true">
        <Image
          src={restaurantImages.heroBanner}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 1280px"
          className={styles.ctaImage}
        />
      </div>
      <div className={styles.ctaCopy}>
        <h2
          id="cta-heading"
          className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl"
        >
          Hungry already?
        </h2>
        <p className="mt-3 max-w-sm text-base font-medium leading-relaxed text-muted-strong">
          Your favourite meal is just a few taps away.
        </p>
        <Link
          href="#explore-menu"
          className="section-action mt-6 w-full bg-primary px-6 text-white hover:bg-primary-hover lg:w-1/2"
        >
          Order Now <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
