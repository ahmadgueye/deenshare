"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/cours", label: "Cours" },
  { href: "/seances", label: "Séances" },
  { href: "/recherche", label: "Recherche" },
];

export function MobileNav({
  authHref,
  authLabel,
}: {
  authHref: string;
  authLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" />}
        nativeButton={false}
        className="sm:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">Menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="font-heading">DeenShare</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={authHref}
            onClick={() => setOpen(false)}
            className="px-2 py-2 text-sm font-medium text-foreground"
          >
            {authLabel}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
