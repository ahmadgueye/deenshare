import Link from "next/link";

import { Button } from "@/components/ui/button";
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
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        <Link
          href="/"
          className="col-start-1 font-heading text-lg font-semibold tracking-tight"
        >
          DeenShare
        </Link>
        <SiteNavLinks className="col-start-2" />
        <div className="col-start-3 flex items-center justify-end gap-2">
          <ThemeToggle />
          <Button
            render={<Link href={authHref} />}
            nativeButton={false}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {authLabel}
          </Button>
          <MobileNav authHref={authHref} authLabel={authLabel} />
        </div>
      </div>
    </header>
  );
}
