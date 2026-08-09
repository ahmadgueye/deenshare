import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { seances } from "@/lib/db/schema";

export async function getAllSeances() {
  return db.query.seances.findMany({
    orderBy: [desc(seances.sessionDate)],
  });
}

export async function getSeanceById(id: string) {
  const result = await db.query.seances.findFirst({
    where: eq(seances.id, id),
    with: {
      seanceThematiques: true,
      seanceRessources: true,
    },
  });

  return result ?? null;
}

export async function getSeanceBySlug(slug: string) {
  const result = await db.query.seances.findFirst({
    where: eq(seances.slug, slug),
    with: {
      seanceThematiques: {
        with: { thematique: { with: { cours: true } } },
      },
      seanceRessources: {
        with: { ressource: true },
      },
    },
  });

  return result ?? null;
}
