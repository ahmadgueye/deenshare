import { count } from "drizzle-orm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { cours, ressources, seances, thematiques } from "@/lib/db/schema";

export default async function DashboardHomePage() {
  const [[coursCount], [thematiquesCount], [ressourcesCount], [seancesCount]] =
    await Promise.all([
      db.select({ value: count() }).from(cours),
      db.select({ value: count() }).from(thematiques),
      db.select({ value: count() }).from(ressources),
      db.select({ value: count() }).from(seances),
    ]);

  const stats = [
    { label: "Cours", value: coursCount.value },
    { label: "Thématiques", value: thematiquesCount.value },
    { label: "Ressources", value: ressourcesCount.value },
    { label: "Séances", value: seancesCount.value },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Tableau de bord
      </h1>
      <p className="mt-1 text-muted-foreground">
        Vue d&apos;ensemble du catalogue.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="font-heading text-3xl">
                {s.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
