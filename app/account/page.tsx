import type { Metadata } from "next";
import { AuthPageShell } from "@/app/_auth/_components/auth-page-shell";
import { LoginForm } from "@/app/login/_components/login-form";

export const metadata: Metadata = {
  title: "Account | RannaGhor",
  description: "Sign in to RannaGhor to view your orders, addresses, and account details.",
};

export default function Page() {
  return (
    <AuthPageShell
      title="My Account"
      description="Sign in with your mobile number to view past orders, track deliveries, and manage your account."
    >
      <LoginForm />
    </AuthPageShell>
  );
}
