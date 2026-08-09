import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { ressources } from "@/lib/db/schema";

export async function getAllRessources() {
  return db.query.ressources.findMany({
    orderBy: [asc(ressources.title)],
    with: { thematique: { with: { cours: true } } },
  });
}

export async function getRessourceById(id: string) {
  const result = await db.query.ressources.findFirst({
    where: eq(ressources.id, id),
  });

  return result ?? null;
}
