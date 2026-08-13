export type RessourceStatus = "draft" | "published";

export const ressourceStatusConfig: Record<
  RessourceStatus,
  { label: string; badgeVariant: "outline" | "default" }
> = {
  draft: { label: "Brouillon", badgeVariant: "outline" },
  published: { label: "Publié", badgeVariant: "default" },
};
