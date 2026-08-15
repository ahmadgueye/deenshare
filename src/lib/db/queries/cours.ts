import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { cours, ressources, thematiques } from "@/lib/db/schema";

export async function getAllCours() {
  return db.query.cours.findMany({
    orderBy: [asc(cours.title)],
  });
}

export async function getCoursById(id: string) {
  const result = await db.query.cours.findFirst({
    where: eq(cours.id, id),
    with: {
      thematiques: {
        orderBy: [asc(thematiques.orderIndex), asc(thematiques.title)],
      },
    },
  });

  return result ?? null;
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

export async function getCoursOutline(coursId: string) {
  const result = await db.query.cours.findFirst({
    where: eq(cours.id, coursId),
    with: {
      thematiques: {
        orderBy: [asc(thematiques.orderIndex), asc(thematiques.title)],
        with: {
          ressources: {
            where: eq(ressources.status, "published"),
            orderBy: [asc(ressources.orderIndex), asc(ressources.title)],
          },
        },
      },
    },
  });

  return result ?? null;
}
