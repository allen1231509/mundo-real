import type { Metadata } from "next";

import { SettingsForm } from "@/features/admin/components/settings-form";
import { getBusinessSettings } from "@/services/settings";

export const metadata: Metadata = { title: "Configuración" };

export default async function AdminSettingsPage() {
  const settings = await getBusinessSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Configuración del negocio
        </h1>
        <p className="text-muted-foreground">
          Esta información se usa en toda la página pública.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
