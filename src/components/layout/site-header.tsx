import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getCurrentProfile } from "@/lib/auth/get-session";

export async function SiteHeader() {
  const profile = await getCurrentProfile();
  const authHref = profile ? "/dashboard" : "/login";
  const authLabel = profile ? "Tableau de bord" : "Se connecter";
  const AuthIcon = profile ? LayoutDashboard : LogIn;

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
          <Button
            render={<Link href={authHref} />}
            nativeButton={false}
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label={authLabel}
          >
            <AuthIcon className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
