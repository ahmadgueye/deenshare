import type { Metadata } from "next";

import { EntityCard } from "@/components/public/entity-card";
import { getAllCours } from "@/lib/db/queries/cours";

export const metadata: Metadata = {
  title: "Cours — Taalib",
};

export default async function CoursListPage() {
  const coursList = await getAllCours();

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Cours
      </h1>
      <p className="mt-2 text-muted-foreground">
        Parcourez les cours et leurs thématiques.
      </p>

      {coursList.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Aucun cours pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coursList.map((c) => (
            <EntityCard
              key={c.id}
              href={`/cours/${c.slug}`}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
