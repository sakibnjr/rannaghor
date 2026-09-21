import Image from "next/image";
import type { ReactNode } from "react";
import { SiteHeader } from "@/app/_components/site-header";
import { SiteFooter } from "@/app/_components/site-footer";
import { restaurantImages } from "@/app/_data/imagery";
import { AuthCloseButton } from "./auth-close-button";

interface AuthPageShellProps {
  title: string;
  description: string;
  children: ReactNode;
  cardClassName?: string;
}

export function AuthPageShell({ title, description, children, cardClassName = "max-w-md" }: AuthPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-8 sm:py-14">
        {/* Full-bleed blurred food background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={restaurantImages.familyFeast}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            aria-hidden="true"
          />
          {/* Warm dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark/85 via-dark/70 to-[#3B1A0A]/75 backdrop-blur-[2px]" />
        </div>

        {/* Floating card */}
        <div
          className={`relative z-10 w-full rounded-2xl border border-white/15 bg-white/95 p-5 shadow-2xl shadow-dark/40 backdrop-blur-md sm:p-8 ${cardClassName}`}
        >
          <AuthCloseButton />
          <div className="pr-11 sm:pr-12">
            <h1 className="text-xl font-extrabold tracking-tight text-dark sm:text-2xl">{title}</h1>
            <p className="mt-1 text-xs leading-normal text-muted sm:text-sm">{description}</p>
          </div>

          <div className="mt-5">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
