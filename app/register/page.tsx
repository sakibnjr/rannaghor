import type { Metadata } from "next";
import { AuthPageShell } from "@/app/_auth/_components/auth-page-shell";
import { RegistrationForm } from "./_components/registration-form";

export const metadata: Metadata = {
  title: "Create Account | RannaGhor",
  description: "Create your RannaGhor account for faster ordering, saved details, and order tracking.",
};

export default function Page() {
  return (
    <AuthPageShell
      title="Create your account"
      description="Use your mobile number to get started. Registration takes less than a minute."
      cardClassName="max-w-lg sm:max-w-xl"
    >
      <RegistrationForm />
    </AuthPageShell>
  );
}
