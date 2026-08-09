import type { Metadata } from "next";

import { SeancesTabs } from "@/components/public/seances-tabs";
import { getPastSeances, getUpcomingSeances } from "@/lib/db/queries/seances";

export const metadata: Metadata = {
  title: "Séances de révision — DeenShare",
};

export default async function SeancesListPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingSeances(),
    getPastSeances(),
  ]);

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Séances de révision
      </h1>
      <p className="mt-2 text-muted-foreground">
        Thématiques et ressources de chaque séance.
      </p>

      <SeancesTabs upcoming={upcoming} past={past} />
    </div>
  );
}
