import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { ressources, thematiques } from "@/lib/db/schema";

export async function getAllThematiques() {
  return db.query.thematiques.findMany({
    orderBy: [asc(thematiques.title)],
    with: { cours: true },
  });
}

export async function getThematiqueById(id: string) {
  const result = await db.query.thematiques.findFirst({
    where: eq(thematiques.id, id),
  });

  return result ?? null;
}

export async function getThematiqueBySlug(slug: string) {
  const result = await db.query.thematiques.findFirst({
    where: eq(thematiques.slug, slug),
    with: {
      cours: true,
      ressources: { where: eq(ressources.status, "published") },
      hadiths: true,
    },
  });

  return result ?? null;
}
