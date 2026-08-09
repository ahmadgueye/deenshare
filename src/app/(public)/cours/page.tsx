import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllCours } from "@/lib/db/queries/cours";

export const metadata: Metadata = {
  title: "Cours — DeenShare",
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
            <Link key={c.id} href={`/cours/${c.slug}`}>
              <Card className="h-full transition-colors hover:bg-muted">
                <CardHeader>
                  <CardTitle className="font-heading">{c.title}</CardTitle>
                  {c.description && (
                    <CardDescription>{c.description}</CardDescription>
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
