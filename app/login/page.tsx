import type { Metadata } from "next";
import { AuthPageShell } from "@/app/_auth/_components/auth-page-shell";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Sign In | RannaGhor",
  description: "Sign in to RannaGhor with your mobile number to order food and manage your account.",
};

export default function Page() {
  return (
    <AuthPageShell title="Welcome back" description="Sign in with your mobile number. We will send you a one-time verification code.">
      <LoginForm />
    </AuthPageShell>
  );
}
