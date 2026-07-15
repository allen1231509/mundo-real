import { NavbarClient } from "@/components/shared/navbar-client";
import { getBusinessSettings } from "@/services/settings";

export async function Navbar() {
  const settings = await getBusinessSettings();
  return <NavbarClient settings={settings} />;
}
