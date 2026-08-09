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
import { deleteThematique } from "@/lib/actions/thematiques";
import { getAllThematiques } from "@/lib/db/queries/thematiques";

export default async function DashboardThematiquesPage() {
  const thematiquesList = await getAllThematiques();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Thématiques
        </h1>
        <Button render={<Link href="/dashboard/thematiques/new" />} nativeButton={false}>
          <Plus className="size-4" />
          Nouvelle thématique
        </Button>
      </div>

      {thematiquesList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucune thématique pour le moment.
        </p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {thematiquesList.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {t.cours.title}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={
                      <Link href={`/dashboard/thematiques/${t.id}/edit`} />
                    }
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteThematique.bind(null, t.id)}
                    itemLabel={t.title}
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
