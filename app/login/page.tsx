import type { Metadata } from "next";

import { LoginForm } from "@/features/admin/components/login-form";
import { getBusinessSettings } from "@/services/settings";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const settings = await getBusinessSettings();

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Panel administrador</h1>
          <p className="text-sm text-muted-foreground">{settings.name}</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
