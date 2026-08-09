import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RessourcesTable } from "@/components/dashboard/ressources-table";
import { getAllRessources } from "@/lib/db/queries/ressources";

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

      <div className="mt-6">
        <RessourcesTable data={ressourcesList} />
      </div>
    </div>
  );
}
