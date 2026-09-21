"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/app/_ui/icon";

export function AuthCloseButton() {
  const router = useRouter();

  function closeAuth() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace("/");
  }

  return (
    <button
      type="button"
      onClick={closeAuth}
      aria-label="Close and return to the previous page"
      title="Close"
      className="absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary hover:bg-primary-light hover:text-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:right-4 sm:top-4"
    >
      <Icon name="close" className="size-4" />
    </button>
  );
}
