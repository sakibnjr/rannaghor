"use client";

import Image from "next/image";
import { getCartItemUnitPrice, formatPrice } from "@/app/_lib/cart-calculations";
import { useCart } from "@/app/_components/cart-context";
import type { CartItem } from "@/app/_types/cart";
import { Icon } from "@/app/_ui/icon";

export function CartItemRow({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { updateQuantity, removeItem } = useCart();
  const unitPrice = getCartItemUnitPrice(item);

  return (
    <article className={`flex gap-4 ${compact ? "py-4" : "rounded-2xl border border-border bg-surface p-4 sm:p-5"}`}>
      <div className={`relative shrink-0 overflow-hidden rounded-xl bg-stone-100 ${compact ? "size-20" : "size-24 sm:size-28"}`}>
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes={compact ? "80px" : "112px"}
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-dark">{item.product.name}</h3>
            {(item.variant || item.addOns.length > 0) && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                {[item.variant?.name, ...item.addOns.map((addOn) => addOn.name)]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="shrink-0 text-xs font-semibold text-muted underline-offset-4 hover:text-primary hover:underline"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            Remove
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div
            className="flex h-10 items-center rounded-full border border-border bg-brand-bg"
            aria-label={`Quantity for ${item.product.name}`}
          >
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="flex size-10 items-center justify-center rounded-full text-dark hover:bg-primary-light hover:text-primary"
              aria-label={`Decrease ${item.product.name} quantity`}
            >
              <Icon name="minus" className="size-3" />
            </button>
            <span className="w-7 text-center text-sm font-bold" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="flex size-10 items-center justify-center rounded-full text-dark hover:bg-primary-light hover:text-primary"
              aria-label={`Increase ${item.product.name} quantity`}
            >
              <Icon name="plus" className="size-3" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">{formatPrice(unitPrice)} each</p>
            <p className="mt-0.5 text-lg font-extrabold text-dark">
              {formatPrice(unitPrice * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
