"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, Home, Search } from "lucide-react";

import { cn, isNavActive } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Accueil", icon: Home, exact: true },
  { href: "/cours", label: "Cours", icon: BookOpen },
  { href: "/seances", label: "Séances", icon: Calendar },
  { href: "/recherche", label: "Recherche", icon: Search },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background pb-[env(safe-area-inset-bottom)] sm:hidden">
      {tabs.map(({ href, label, icon: Icon, exact }) => {
        const active = isNavActive(pathname, href, exact);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2 text-xs text-muted-foreground",
              active && "text-foreground"
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
