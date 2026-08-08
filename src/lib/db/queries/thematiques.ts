import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { thematiques } from "@/lib/db/schema";

export async function getThematiqueBySlug(slug: string) {
  const result = await db.query.thematiques.findFirst({
    where: eq(thematiques.slug, slug),
    with: {
      cours: true,
      ressources: true,
    },
  });

  return result ?? null;
}
