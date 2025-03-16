
import { NavLogo } from "./NavLogo";
import Account from "../AccountComponent";
import { NavigationLinks } from "./NavigationLinks";
import { createClient } from "@/app/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const { data: { user }} = await supabase.auth.getUser();

  return (
     <nav data-testid="nav" className="bg-gray-200">
      <div data-testid="nav-container" className="max-w-7xl mx-auto border">
        <div data-testid="nav-items" className="flex justify-between">
          <NavLogo />
          <NavigationLinks />
          <Account user={user}/>
        </div>
      </div>
    </nav>
  );
}