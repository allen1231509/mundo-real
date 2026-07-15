import { redirect } from "next/navigation";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { createClient } from "@/lib/supabase/server";
import { getBusinessSettings } from "@/services/settings";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const settings = await getBusinessSettings();

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="font-semibold">{settings.name} — Admin</span>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Cerrar sesión
          </Button>
        </form>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 md:flex-row">
        <aside className="shrink-0 overflow-x-auto md:w-56">
          <AdminSidebar />
        </aside>
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
