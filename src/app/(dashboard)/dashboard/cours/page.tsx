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
import { deleteCours } from "@/lib/actions/cours";
import { getAllCours } from "@/lib/db/queries/cours";

export default async function DashboardCoursPage() {
  const coursList = await getAllCours();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Cours
        </h1>
        <Button render={<Link href="/dashboard/cours/new" />}>
          <Plus className="size-4" />
          Nouveau cours
        </Button>
      </div>

      {coursList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucun cours pour le moment.
        </p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursList.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell className="max-w-md truncate text-muted-foreground">
                  {c.description}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={<Link href={`/dashboard/cours/${c.id}/edit`} />}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteCours.bind(null, c.id)}
                    itemLabel={c.title}
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
