import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  Link as LinkIcon,
  ListTree,
  Video,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ALL_ENTITY_TYPES,
  ALL_RESSOURCE_TYPES,
  searchCatalogue,
  type EntityType,
  type RessourceType,
  type SearchResult,
} from "@/lib/db/queries/search";

export const metadata: Metadata = {
  title: "Recherche — DeenShare",
};

const typeLabels: Record<SearchResult["type"], string> = {
  cours: "Cours",
  thematique: "Thématique",
  ressource: "Ressource",
  seance: "Séance",
};

const ressourceTypeLabels: Record<RessourceType, string> = {
  video: "Vidéo",
  pdf: "PDF",
  lien: "Lien",
};

const typeIcons: Record<SearchResult["type"], LucideIcon> = {
  cours: BookOpen,
  thematique: ListTree,
  ressource: LinkIcon,
  seance: Calendar,
};

const ressourceTypeIcons: Record<RessourceType, LucideIcon> = {
  video: Video,
  pdf: FileText,
  lien: LinkIcon,
};

function resultDisplay(r: SearchResult) {
  if (r.type === "ressource") {
    const rtype = (r.subtitle as RessourceType) ?? "lien";
    return {
      label: ressourceTypeLabels[rtype] ?? typeLabels.ressource,
      Icon: ressourceTypeIcons[rtype] ?? typeIcons.ressource,
      subtitle: null,
    };
  }
  return {
    label: typeLabels[r.type],
    Icon: typeIcons[r.type],
    subtitle: r.subtitle,
  };
}

type Props = {
  searchParams: Promise<{
    q?: string;
    types?: string | string[];
    rtype?: string | string[];
  }>;
};

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function RecherchePage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const typesValues = toArray(params.types);
  const rtypeValues = toArray(params.rtype);

  const selectedTypes = typesValues.length
    ? (typesValues.filter((t) =>
        ALL_ENTITY_TYPES.includes(t as EntityType)
      ) as EntityType[])
    : ALL_ENTITY_TYPES;
  const selectedRessourceTypes = rtypeValues.length
    ? (rtypeValues.filter((t) =>
        ALL_RESSOURCE_TYPES.includes(t as RessourceType)
      ) as RessourceType[])
    : ALL_RESSOURCE_TYPES;

  const hasSearched = params.q !== undefined;
  const results = hasSearched
    ? await searchCatalogue(q, {
        types: selectedTypes,
        ressourceTypes: selectedRessourceTypes,
      })
    : [];

  return (
    <div className="animate-in fade-in duration-300">
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

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Type de contenu</p>
            <div className="flex flex-col gap-2">
              {ALL_ENTITY_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    name="types"
                    value={type}
                    defaultChecked={selectedTypes.includes(type)}
                  />
                  {typeLabels[type]}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Type de ressource</p>
            <div className="flex flex-col gap-2">
              {ALL_RESSOURCE_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    name="rtype"
                    value={type}
                    defaultChecked={selectedRessourceTypes.includes(type)}
                  />
                  {ressourceTypeLabels[type]}
                </label>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-4">
          Rechercher
        </Button>
      </form>

      {hasSearched && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} résultat{results.length > 1 ? "s" : ""}
          {q && (
            <>
              {" "}
              pour « {q} »
            </>
          )}
        </p>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {results.map((r, i) => {
          const { label, Icon, subtitle } = resultDisplay(r);
          return (
            <Link
              key={`${r.type}-${i}`}
              href={r.href}
              className="flex items-start gap-3 border p-4 transition-colors hover:bg-muted"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <Badge variant="secondary">{label}</Badge>
                <div className="mt-1 font-medium">{r.title}</div>
                {subtitle && (
                  <div className="text-sm text-muted-foreground">
                    {subtitle}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
