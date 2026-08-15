import Link from "next/link";
import { BookOpen } from "lucide-react";

import { DonateDialog } from "@/components/layout/donate-dialog";
import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            lang="ar"
            className="flex items-center gap-2 font-logo-arabic text-2xl font-bold tracking-tight"
          >
            {/* <BookOpen className="size-5" /> */}
            طالب
          </Link>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <SiteNavLinks />
        </div>
        <div className="flex items-center justify-end gap-2">
          <DonateDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
