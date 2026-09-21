import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      aria-label="RannaGhor home"
      className="group flex shrink-0 select-none items-center gap-2"
    >
      <span className={`flex size-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${isFooter ? "bg-white" : "bg-primary-light"}`}>
        <Image
          src="/brand/rannaghor-icon.svg"
          alt=""
          aria-hidden="true"
          width={34}
          height={34}
          className="size-[34px]"
        />
      </span>
      <Image
        src="/brand/rannaghor-wordmark.svg"
        alt=""
        aria-hidden="true"
        width={218}
        height={52}
        className={`h-auto w-[126px] sm:w-[138px] ${isFooter ? "brightness-0 invert" : "hidden min-[390px]:block"}`}
      />
    </Link>
  );
}
