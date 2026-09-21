"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice, getCartItemUnitPrice } from "@/app/_lib/cart-calculations";
import type { CartItem } from "@/app/_types/cart";
import { Icon } from "@/app/_ui/icon";

export function CartItemRow({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { updateQuantity, removeItem } = useCart();
  const unitPrice = getCartItemUnitPrice(item);
  const selectedOptions = [item.variant?.name, ...item.addOns.map((addOn) => addOn.name)].filter(Boolean);
  const details = selectedOptions.length > 0 ? selectedOptions.join(" · ") : item.product.description;

  if (compact) {
    return (
      <m.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 24 }} className="flex gap-3 py-2.5">
        <ProductImage item={item} size="size-16" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><h3 className="truncate text-sm font-bold text-dark">{item.product.name}</h3><p className="mt-0.5 truncate text-xs text-muted">{details}</p></div>
            <button type="button" onClick={() => removeItem(item.key)} className="text-xs font-semibold text-muted hover:text-primary transition-colors">Remove</button>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <QuantityControl item={item} onChange={updateQuantity} />
            <strong className="text-sm font-bold text-dark">{formatPrice(unitPrice * item.quantity)}</strong>
          </div>
        </div>
      </m.article>
    );
  }

  return (
    <m.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.16 } }}
      className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[80px_minmax(0,1fr)] sm:px-4 lg:grid-cols-[80px_minmax(0,1fr)_120px_100px_40px] lg:gap-4"
    >
      <ProductImage item={item} size="size-[72px] sm:size-20" />

      <div className="min-w-0 self-center">
        <h3 className="truncate text-sm font-bold text-dark sm:text-base">{item.product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-muted">{details}</p>
        {item.instructions && <p className="line-clamp-1 text-xs text-muted"><span className="font-semibold text-dark">Note:</span> {item.instructions}</p>}
      </div>

      <div className="col-start-2 flex items-center justify-between gap-3 lg:contents">
        <QuantityControl item={item} onChange={updateQuantity} />
        <div className="text-right lg:text-left">
          <p className="text-[10px] text-muted">{formatPrice(unitPrice)} each</p>
          <p className="text-base font-extrabold text-dark">{formatPrice(unitPrice * item.quantity)}</p>
        </div>
        <button
          type="button"
          onClick={() => removeItem(item.key)}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-primary-light hover:text-primary"
          aria-label={`Remove ${item.product.name} from cart`}
        >
          <Icon name="close" className="size-3.5" />
        </button>
      </div>
    </m.article>
  );
}

function ProductImage({ item, size }: { item: CartItem; size: string }) {
  return <div className={`relative shrink-0 overflow-hidden rounded-lg bg-stone-100 ${size}`}><Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover" /></div>;
}

function QuantityControl({ item, onChange }: { item: CartItem; onChange: (key: string, quantity: number) => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2" aria-label={`Quantity for ${item.product.name}`}>
      <button
        type="button"
        onClick={() => onChange(item.key, item.quantity - 1)}
        className="flex size-8 items-center justify-center rounded-full border border-border bg-white text-dark transition-colors hover:border-primary hover:bg-primary-light hover:text-primary"
        aria-label={`Decrease ${item.product.name} quantity`}
      >
        <Icon name="minus" className="size-2.5" />
      </button>
      <span className="min-w-5 text-center text-sm font-bold text-dark" aria-live="polite">{item.quantity}</span>
      <button
        type="button"
        onClick={() => onChange(item.key, item.quantity + 1)}
        className="flex size-8 items-center justify-center rounded-full border border-border bg-white text-dark transition-colors hover:border-primary hover:bg-primary-light hover:text-primary"
        aria-label={`Increase ${item.product.name} quantity`}
      >
        <Icon name="plus" className="size-2.5" />
      </button>
    </div>
  );
}
