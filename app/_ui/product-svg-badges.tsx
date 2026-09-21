interface SavingsSvgBadgeProps {
  amount: string;
}

export function BestsellerSvgBadge() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="92"
      height="26"
      viewBox="0 0 92 26"
      fill="none"
      role="img"
      aria-label="Bestseller"
      className="h-[26px] w-[92px] shrink-0 select-none drop-shadow-sm"
    >
      <rect
        x="1"
        y="1"
        width="90"
        height="24"
        rx="7"
        fill="var(--color-primary)"
        stroke="var(--color-primary)"
        strokeWidth="2"
      />

      <text
        x="46"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontFamily="var(--font-inter), Inter, Arial, sans-serif"
        fontSize="9.2"
        fontWeight="650"
        letterSpacing=".15"
        style={{ userSelect: "none" }}
      >
        BESTSELLER
      </text>
    </svg>
  );
}

export function SavingsSvgBadge({ amount }: SavingsSvgBadgeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="26"
      viewBox="0 0 72 26"
      fill="none"
      role="img"
      aria-label={`Save ${amount}`}
      className="h-[26px] w-[72px] shrink-0 select-none drop-shadow-sm"
    >
      <rect
        x="1"
        y="1"
        width="70"
        height="24"
        rx="7"
        fill="var(--color-secondary)"
        stroke="var(--color-secondary)"
        strokeWidth="2"
      />

      <text
        x="36"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontFamily="var(--font-inter), Inter, Arial, sans-serif"
        fontSize="9.2"
        fontWeight="650"
        style={{ userSelect: "none" }}
      >
        Save {amount}
      </text>
    </svg>
  );
}
