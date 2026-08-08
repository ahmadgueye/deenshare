import { ilike, or } from "drizzle-orm";

import { db } from "@/lib/db";
import { cours, ressources, seances, thematiques } from "@/lib/db/schema";

export type SearchResult = {
  type: "cours" | "thematique" | "ressource" | "seance";
  title: string;
  subtitle?: string | null;
  href: string;
};

export async function searchCatalogue(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const pattern = `%${q}%`;

  const [coursResults, thematiqueResults, ressourceResults, seanceResults] =
    await Promise.all([
      db
        .select()
        .from(cours)
        .where(or(ilike(cours.title, pattern), ilike(cours.description, pattern)))
        .limit(5),
      db.query.thematiques.findMany({
        where: (t, { ilike: like, or: orOp }) =>
          orOp(like(t.title, pattern), like(t.description, pattern)),
        with: { cours: true },
        limit: 5,
      }),
      db
        .select()
        .from(ressources)
        .where(
          or(
            ilike(ressources.title, pattern),
            ilike(ressources.description, pattern)
          )
        )
        .limit(5),
      db
        .select()
        .from(seances)
        .where(
          or(ilike(seances.title, pattern), ilike(seances.summary, pattern))
        )
        .limit(5),
    ]);

  return [
    ...coursResults.map((c) => ({
      type: "cours" as const,
      title: c.title,
      subtitle: c.description,
      href: `/cours/${c.slug}`,
    })),
    ...thematiqueResults.map((t) => ({
      type: "thematique" as const,
      title: t.title,
      subtitle: t.cours.title,
      href: `/thematiques/${t.slug}`,
    })),
    ...ressourceResults.map((r) => ({
      type: "ressource" as const,
      title: r.title,
      subtitle: r.type,
      href: r.url,
    })),
    ...seanceResults.map((s) => ({
      type: "seance" as const,
      title: s.title,
      subtitle: s.sessionDate,
      href: `/seances/${s.slug}`,
    })),
  ];
}
