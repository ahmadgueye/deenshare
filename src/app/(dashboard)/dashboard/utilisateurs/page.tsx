import { asc } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRoleSelect } from "@/components/dashboard/user-role-select";
import { getCurrentProfile } from "@/lib/auth/get-session";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

export default async function DashboardUtilisateursPage() {
  const currentProfile = await getCurrentProfile();
  if (currentProfile?.role !== "admin") {
    notFound();
  }

  const usersList = await db
    .select()
    .from(profiles)
    .orderBy(asc(profiles.email));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Utilisateurs
      </h1>
      <p className="mt-1 text-muted-foreground">
        Autorise les personnes qui peuvent ajouter des ressources.
      </p>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead className="w-44">Rôle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.email}</TableCell>
              <TableCell className="text-muted-foreground">
                {u.fullName ?? "—"}
              </TableCell>
              <TableCell>
                <UserRoleSelect userId={u.id} role={u.role} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
