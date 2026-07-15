import { cache } from "react";

import { createPublicClient } from "@/lib/supabase/public";
import type { BusinessSettings } from "@/types";

// Lectura 100% pública (RLS: public_read_settings using (true)); se usa el
// cliente sin cookies para permitir ISR real en las páginas públicas.
export const getBusinessSettings = cache(
  async (): Promise<BusinessSettings> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("business_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) throw error;
    return data;
  },
);
