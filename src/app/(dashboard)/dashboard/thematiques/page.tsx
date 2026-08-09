import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThematiquesTable } from "@/components/dashboard/thematiques-table";
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

      <div className="mt-6">
        <ThematiquesTable data={thematiquesList} />
      </div>
    </div>
  );
}
