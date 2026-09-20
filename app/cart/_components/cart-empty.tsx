import Link from "next/link";
import { Icon } from "@/app/_ui/icon";

export function CartEmpty({ onAction }: { onAction?: () => void }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <span className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Icon name="cloche" className="size-8" />
      </span>
      <h2 className="text-2xl font-extrabold tracking-tight text-dark">Your cart is empty</h2>
      <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
        Add a favourite dish and it will be ready here for checkout.
      </p>
      <Link
        href="/menu"
        onClick={onAction}
        className="section-action mt-6 bg-primary px-6 text-white hover:bg-primary-hover"
      >
        Browse menu
        <Icon name="arrow" className="size-4" />
      </Link>
    </div>
  );
}
