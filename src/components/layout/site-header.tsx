import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          DeenShare
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/cours" className="hover:text-foreground">
            Cours
          </Link>
          <Link href="/seances" className="hover:text-foreground">
            Séances
          </Link>
          <Link href="/recherche" className="hover:text-foreground">
            Recherche
          </Link>
          <Button render={<Link href="/login" />} size="sm">
            Se connecter
          </Button>
        </nav>
      </div>
    </header>
  );
}
