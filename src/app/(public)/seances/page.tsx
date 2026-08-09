import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllSeances } from "@/lib/db/queries/seances";

export const metadata: Metadata = {
  title: "Séances de révision — DeenShare",
};

export default async function SeancesListPage() {
  const seancesList = await getAllSeances();

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Séances de révision
      </h1>
      <p className="mt-2 text-muted-foreground">
        Les thématiques abordées et les ressources associées à chaque séance.
      </p>

      {seancesList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucune séance pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {seancesList.map((s) => (
            <Link key={s.id} href={`/seances/${s.slug}`}>
              <Card className="h-full transition-colors hover:bg-muted">
                <CardHeader>
                  <CardTitle className="font-heading">{s.title}</CardTitle>
                  {s.sessionDate && (
                    <CardDescription>
                      {new Date(s.sessionDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
