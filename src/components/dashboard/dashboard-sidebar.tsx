import Link from "next/link";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  Link as LinkIcon,
  ListTree,
  Users,
} from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/cours", label: "Cours", icon: BookOpen },
  { href: "/dashboard/thematiques", label: "Thématiques", icon: ListTree },
  { href: "/dashboard/ressources", label: "Ressources", icon: LinkIcon },
  { href: "/dashboard/seances", label: "Séances", icon: Calendar },
];

export function DashboardSidebar({ isAdmin }: { isAdmin: boolean }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col justify-between border-r p-4">
      <div>
        <Link
          href="/"
          className="mb-8 block font-heading text-lg font-semibold tracking-tight"
        >
          DeenShare
        </Link>
        <nav className="flex flex-col gap-1 text-sm">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/dashboard/utilisateurs"
              className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Users className="size-4" />
              Utilisateurs
            </Link>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <SignOutButton className="flex-1" />
        <ThemeToggle />
      </div>
    </aside>
  );
}
