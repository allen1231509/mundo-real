import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

/**
 * Cliente de Supabase sin cookies, para lecturas públicas (RLS ya restringe
 * a contenido activo). No lee `cookies()`, por lo que no fuerza renderizado
 * dinámico y permite que ISR (`export const revalidate`) funcione de verdad.
 * No usar donde se necesite conocer al usuario autenticado (panel admin) —
 * para eso está lib/supabase/server.ts.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
