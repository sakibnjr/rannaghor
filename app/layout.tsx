import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./_components/cart-context";
import { MotionProvider } from "./_components/motion-provider";
import { CartDrawer } from "./cart/_components/cart-drawer";
import { CartToastNotification } from "./_ui/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
            {children}
            <CartDrawer />
            <CartToastNotification />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
