import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/public/markdown-content";
import { ressourceTypeConfig } from "@/lib/ressource-types";
import type { RessourceType } from "@/lib/db/queries/search";

export function RessourceItem({
  title,
  type,
  url,
  content,
  description,
}: {
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
      <div className="border p-4">
        {header}
        {content && (
          <div className="mt-2">
            <MarkdownContent content={content} />
          </div>
        )}
      </div>
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
