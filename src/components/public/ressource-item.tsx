import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ressourceTypeConfig } from "@/lib/ressource-types";
import { stripMarkdown } from "@/lib/metadata";
import type { RessourceType } from "@/lib/db/queries/search";

export function RessourceItem({
  id,
  title,
  type,
  url,
  content,
  description,
}: {
  id: string;
  title: string;
  type: RessourceType;
  url: string | null;
  content?: string | null;
  description?: string | null;
}) {
  const { label, icon: Icon } = ressourceTypeConfig[type];
  const header = (
    <>
      <span className="inline-flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <Badge variant="secondary">{label}</Badge>
      </span>
      <div className="mt-1 font-medium">{title}</div>
    </>
  );

  if (type === "texte") {
    return (
      <Link
        href={`/ressources/${id}`}
        className="block border p-4 transition-colors hover:bg-muted"
      >
        {header}
        {content && (
          <p className="mt-2 text-sm text-muted-foreground">
            {stripMarkdown(content, 240)}
          </p>
        )}
        <span className="mt-2 inline-block text-sm underline underline-offset-4">
          Lire la suite
        </span>
      </Link>
    );
  }

  return (
    <a
      href={url ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="block border p-4 transition-colors hover:bg-muted"
    >
      {header}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </a>
  );
}
