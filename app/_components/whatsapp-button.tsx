"use client";

import { Icon } from "@/app/_ui/icon";
import { rannaGhorConfig } from "@/app/_data/restaurant";

export function WhatsAppButton() {
  const rawPhone = rannaGhorConfig.contact.whatsapp || rannaGhorConfig.contact.phone || "+8801700000000";
  const phone = rawPhone.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hello RannaGhor, I would like to place an order or ask a question.",
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RannaGhor on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:bg-[#20ba59] hover:shadow-xl hover:scale-110 active:scale-95 lg:bottom-6 lg:right-6 lg:size-13 group"
    >
      <Icon name="whatsapp" className="size-6.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
