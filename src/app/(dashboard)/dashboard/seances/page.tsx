import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { deleteSeance } from "@/lib/actions/seances";
import { getAllSeances } from "@/lib/db/queries/seances";

export default async function DashboardSeancesPage() {
  const seancesList = await getAllSeances();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Séances de révision
        </h1>
        <Button render={<Link href="/dashboard/seances/new" />}>
          <Plus className="size-4" />
          Nouvelle séance
        </Button>
      </div>

      {seancesList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucune séance pour le moment.
        </p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {seancesList.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {s.sessionDate
                    ? new Date(s.sessionDate).toLocaleDateString("fr-FR")
                    : "—"}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={<Link href={`/dashboard/seances/${s.id}/edit`} />}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteSeance.bind(null, s.id)}
                    itemLabel={s.title}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
