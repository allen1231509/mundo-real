"use client";

import { useActionState } from "react";

import { updateBusinessSettings, type ActionState } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageUploader } from "@/features/admin/components/single-image-uploader";
import { SubmitButton } from "@/features/admin/components/submit-button";
import type { BusinessSettings } from "@/types";

const initialState: ActionState = { error: null };

export function SettingsForm({ settings }: { settings: BusinessSettings }) {
  const [state, formAction] = useActionState(
    updateBusinessSettings,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <section className="space-y-4">
        <h2 className="font-semibold">Identidad</h2>
        <div className="space-y-2">
          <Label>Logo</Label>
          <SingleImageUploader
            name="logo"
            kind="logo"
            initialUrl={settings.logo}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del negocio</Label>
          <Input id="name" name="name" defaultValue={settings.name} required />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Contacto</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" defaultValue={settings.phone ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp (sin +, ej: 51999999999)</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              defaultValue={settings.whatsapp ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={settings.email ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              defaultValue={settings.address ?? ""}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule">Horario de atención</Label>
          <Textarea
            id="schedule"
            name="schedule"
            rows={2}
            defaultValue={settings.schedule ?? ""}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Redes sociales</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook (URL)</Label>
            <Input
              id="facebook"
              name="facebook"
              defaultValue={settings.facebook ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram (URL)</Label>
            <Input
              id="instagram"
              name="instagram"
              defaultValue={settings.instagram ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok (URL)</Label>
            <Input
              id="tiktok"
              name="tiktok"
              defaultValue={settings.tiktok ?? ""}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Página principal</h2>
        <div className="space-y-2">
          <Label>Banner del hero</Label>
          <SingleImageUploader
            name="hero_banner"
            kind="hero"
            aspect="wide"
            initialUrl={settings.hero_banner}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_title">Título del hero</Label>
          <Input
            id="hero_title"
            name="hero_title"
            defaultValue={settings.hero_title ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_subtitle">Subtítulo del hero</Label>
          <Textarea
            id="hero_subtitle"
            name="hero_subtitle"
            rows={2}
            defaultValue={settings.hero_subtitle ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="story">Nuestra historia</Label>
          <Textarea
            id="story"
            name="story"
            rows={5}
            defaultValue={settings.story ?? ""}
          />
        </div>
      </section>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-primary">Cambios guardados correctamente.</p>
      )}

      <SubmitButton>Guardar cambios</SubmitButton>
    </form>
  );
}
