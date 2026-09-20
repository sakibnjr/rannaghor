import { Icon } from "@/app/_ui/icon";

interface RatingStarsProps {
  score: number;
  count?: number;
  displayCount?: string;
  showStarsCount?: number;
  className?: string;
}

export function RatingStars({
  score,
  count,
  displayCount,
  showStarsCount = 5,
  className = "",
}: RatingStarsProps) {
  const formattedCount =
    displayCount ||
    (count !== undefined
      ? count >= 1000
        ? `(${Math.round(count / 100) / 10}k)`
        : `(${count})`
      : "");

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-[#6B706D] ${className}`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: showStarsCount }).map((_, i) => {
          const isFilled = i < Math.floor(score);
          const isHalf = !isFilled && i < score;
          return (
            <Icon key={i} name="star" className={`size-3.5 ${isFilled || isHalf ? "text-rating" : "text-stone-300"}`} />
          );
        })}
      </div>
      <span className="font-semibold text-[#1D2522]">{score.toFixed(1)}</span>
      {formattedCount && <span>{formattedCount}</span>}
    </div>
  );
}
