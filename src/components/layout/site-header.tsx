import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
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
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/cours" className="hover:text-foreground">
            Cours
          </Link>
          <Link href="/seances" className="hover:text-foreground">
            Séances
          </Link>
          <Link
            href="/recherche"
            className="hover:text-foreground"
            title="Recherche (⌘K)"
          >
            Recherche
          </Link>
          <Button render={<Link href={authHref} />} nativeButton={false} size="sm">
            {authLabel}
          </Button>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav authHref={authHref} authLabel={authLabel} />
        </div>
      </div>
    </header>
  );
}
