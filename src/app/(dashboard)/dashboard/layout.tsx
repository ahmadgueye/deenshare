import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { getCurrentProfile } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role === "viewer") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="font-heading text-2xl font-semibold">
          En attente d&apos;autorisation
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Ton compte est connecté mais n&apos;a pas encore été autorisé à
          contribuer. Demande à un administrateur de t&apos;ajouter comme
          contributeur.
        </p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <DashboardSidebar isAdmin={profile.role === "admin"} />
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
