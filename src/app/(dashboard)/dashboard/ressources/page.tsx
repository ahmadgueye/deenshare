import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { deleteRessource } from "@/lib/actions/ressources";
import { getAllRessources } from "@/lib/db/queries/ressources";

const typeLabels = { video: "Vidéo", pdf: "PDF", lien: "Lien" };

export default async function DashboardRessourcesPage() {
  const ressourcesList = await getAllRessources();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Ressources
        </h1>
        <Button render={<Link href="/dashboard/ressources/new" />} nativeButton={false}>
          <Plus className="size-4" />
          Nouvelle ressource
        </Button>
      </div>

      {ressourcesList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucune ressource pour le moment.
        </p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Thématique</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {ressourcesList.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{typeLabels[r.type]}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.thematique.cours.title} · {r.thematique.title}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={
                      <Link href={`/dashboard/ressources/${r.id}/edit`} />
                    }
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteRessource.bind(null, r.id)}
                    itemLabel={r.title}
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
