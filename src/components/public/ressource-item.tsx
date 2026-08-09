import { Badge } from "@/components/ui/badge";
import { ressourceTypeConfig } from "@/lib/ressource-types";
import type { RessourceType } from "@/lib/db/queries/search";

export function RessourceItem({
  title,
  type,
  url,
  description,
}: {
  title: string;
  type: RessourceType;
  url: string;
  description?: string | null;
}) {
  const { label, icon: Icon } = ressourceTypeConfig[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border p-4 transition-colors hover:bg-muted"
    >
      <span className="inline-flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />
        <Badge variant="secondary">{label}</Badge>
      </span>
      <div className="mt-1 font-medium">{title}</div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </a>
  );
}
