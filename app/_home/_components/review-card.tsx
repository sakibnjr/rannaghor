import Image from "next/image";
import type { CustomerReview } from "@/app/_data/reviews";
import { Icon } from "@/app/_ui/icon";

export function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <article className="flex h-full min-h-44 flex-col rounded-2xl border border-clay-border bg-white p-4 shadow-2xs transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-warm-cream bg-stone-100">
          <Image
            src={review.avatar}
            alt={review.author}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-dark">{review.author}</h3>
          <p className="mt-0.5 text-xs text-muted">{review.location}</p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-xs italic leading-5 text-dark sm:text-sm">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div
        className="mt-2 flex items-center gap-1"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: review.rating }).map((_, index) => (
          <Icon key={index} name="star" className="size-3.5 text-rating" />
        ))}
        <span className="ml-1 text-xs font-bold text-dark">{review.rating}.0</span>
      </div>
    </article>
  );
}
