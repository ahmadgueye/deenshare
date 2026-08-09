import Link from "next/link";
import { BookOpen } from "lucide-react";

import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        <Link
          href="/"
          className="col-start-1 flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
        >
          <BookOpen className="size-5" />
          DeenShare
        </Link>
        <SiteNavLinks className="col-start-2" />
        <div className="col-start-3 flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
