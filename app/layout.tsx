import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./_components/cart-context";
import { SearchProvider } from "./_components/search-context";
import { SearchModal } from "./_components/search-modal";
import { MotionProvider } from "./_components/motion-provider";
import { MobileBottomNav } from "./_components/mobile-bottom-nav";
import { CartDrawer } from "./cart/_components/cart-drawer";
import { CartToastNotification } from "./_ui/toast";
import { ScrollToTop } from "./_components/scroll-to-top";
import { BackToTopButton } from "./_components/back-to-top";
import { WhatsAppButton } from "./_components/whatsapp-button";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "RannaGhor | Freshly Made. Delivered With Love.",
  description:
    "Delicious food, made with the freshest ingredients, now at your doorstep. Order Biryani, Burgers, Kebabs, and more.",
  icons: {
    icon: "/brand/rannaghor-icon.svg",
    shortcut: "/brand/rannaghor-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFF9F5] text-[#1D2522]">
        <MotionProvider>
          <CartProvider>
            <SearchProvider>
              <ScrollToTop />
              {children}
              <MobileBottomNav />
              <CartDrawer />
              <CartToastNotification />
              <BackToTopButton />
              <WhatsAppButton />
              <SearchModal />
            </SearchProvider>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
