"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn, isNavActive } from "@/lib/utils";

const links = [
  { href: "/cours", label: "Cours" },
  { href: "/seances", label: "Séances" },
  { href: "/recherche", label: "Recherche", title: "Recherche (⌘K)" },
];

export function SiteNavLinks({
  authHref,
  authLabel,
}: {
  authHref: string;
  authLabel: string;
}) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          title={link.title}
          className={cn(
            "hover:text-foreground",
            isNavActive(pathname, link.href) && "font-medium text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
      <Button render={<Link href={authHref} />} nativeButton={false} size="sm">
        {authLabel}
      </Button>
    </nav>
  );
}
