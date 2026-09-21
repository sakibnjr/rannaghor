"use client";

import { useCallback, useEffect, type PointerEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/app/_ui/icon";

interface AuthModalCardProps {
  title: string;
  description: string;
  children: ReactNode;
  cardClassName: string;
}

export function AuthModalCard({ title, description, children, cardClassName }: AuthModalCardProps) {
  const router = useRouter();

  const closeAuth = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace("/");
  }, [router]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeAuth();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAuth]);

  function handleBackdropPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) closeAuth();
  }

  return (
    <div
      className="relative z-10 flex w-full flex-1 items-center justify-center"
      onPointerDown={handleBackdropPointerDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
        aria-describedby="auth-dialog-description"
        className={`relative w-full rounded-2xl border border-white/15 bg-white/95 p-5 shadow-2xl shadow-dark/40 backdrop-blur-md sm:p-8 ${cardClassName}`}
      >
        <button
          type="button"
          onClick={closeAuth}
          aria-label="Close and return to the previous page"
          title="Close"
          className="absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary hover:bg-primary-light hover:text-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-4 sm:top-4"
        >
          <Icon name="close" className="size-4" />
        </button>

        <div className="pr-11 sm:pr-12">
          <h1 id="auth-dialog-title" className="text-xl font-extrabold tracking-tight text-dark sm:text-2xl">
            {title}
          </h1>
          <p id="auth-dialog-description" className="mt-1 text-xs leading-normal text-muted sm:text-sm">
            {description}
          </p>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
