import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getCurrentProfile } from "@/lib/auth/get-session";

export async function SiteHeader() {
  const profile = await getCurrentProfile();
  const authHref = profile ? "/dashboard" : "/login";
  const authLabel = profile ? "Tableau de bord" : "Se connecter";

  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          DeenShare
        </Link>
        <SiteNavLinks authHref={authHref} authLabel={authLabel} />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav authHref={authHref} authLabel={authLabel} />
        </div>
      </div>
    </header>
  );
}
