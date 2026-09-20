import { locationData } from "@/app/_data/location";

export function LocationMap({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative bg-primary-light ${compact ? "min-h-[220px] sm:min-h-[240px] lg:min-h-full" : "min-h-[340px] lg:min-h-full"} ${className}`}
    >
      <iframe
        title={`Map near ${locationData.area}`}
        src={locationData.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
