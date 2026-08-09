import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { hadiths } from "@/lib/db/schema";

export async function getAllHadiths() {
  return db.query.hadiths.findMany({
    orderBy: [asc(hadiths.title)],
    with: { thematique: { with: { cours: true } } },
  });
}

export async function getRecentHadiths(limit: number) {
  return db.query.hadiths.findMany({
    orderBy: [desc(hadiths.createdAt)],
    limit,
    with: { thematique: { with: { cours: true } } },
  });
}

export async function getHadithById(id: string) {
  const result = await db.query.hadiths.findFirst({
    where: eq(hadiths.id, id),
  });

  return result ?? null;
}

export async function getHadithBySlug(slug: string) {
  const result = await db.query.hadiths.findFirst({
    where: eq(hadiths.slug, slug),
    with: {
      thematique: { with: { cours: true } },
    },
  });

  return result ?? null;
}
