import { FileText, Link as LinkIcon, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const typeConfig = {
  video: { label: "Vidéo", icon: Video },
  pdf: { label: "PDF", icon: FileText },
  lien: { label: "Lien", icon: LinkIcon },
} as const;

export function RessourceItem({
  title,
  type,
  url,
  description,
}: {
  title: string;
  type: keyof typeof typeConfig;
  url: string;
  description?: string | null;
}) {
  const { label, icon: Icon } = typeConfig[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 border p-4 transition-colors hover:bg-muted"
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          <Badge variant="secondary">{label}</Badge>
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </a>
  );
}
