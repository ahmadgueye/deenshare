import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { cours, thematiques } from "@/lib/db/schema";

export async function getAllCours() {
  return db.query.cours.findMany({
    orderBy: [asc(cours.title)],
  });
}

export async function getCoursBySlug(slug: string) {
  const result = await db.query.cours.findFirst({
    where: eq(cours.slug, slug),
    with: {
      thematiques: {
        orderBy: [asc(thematiques.orderIndex), asc(thematiques.title)],
      },
    },
  });

  return result ?? null;
}
