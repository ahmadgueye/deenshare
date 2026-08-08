import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { searchCatalogue, type SearchResult } from "@/lib/db/queries/search";

export const metadata: Metadata = {
  title: "Recherche — DeenShare",
};

const typeLabels: Record<SearchResult["type"], string> = {
  cours: "Cours",
  thematique: "Thématique",
  ressource: "Ressource",
  seance: "Séance",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RecherchePage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = q ? await searchCatalogue(q) : [];

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Recherche
      </h1>

      <form method="get" className="mt-6 max-w-md">
        <Input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Rechercher un cours, une thématique, une ressource…"
          autoFocus
        />
      </form>

      {q && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} résultat{results.length > 1 ? "s" : ""} pour «{" "}
          {q} »
        </p>
      )}

      <div className="mt-4 grid gap-2">
        {results.map((r, i) => (
          <Link
            key={`${r.type}-${i}`}
            href={r.href}
            className="flex items-center gap-3 border p-4 transition-colors hover:bg-muted"
          >
            <Badge variant="secondary">{typeLabels[r.type]}</Badge>
            <div>
              <div className="font-medium">{r.title}</div>
              {r.subtitle && (
                <div className="text-sm text-muted-foreground">
                  {r.subtitle}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
