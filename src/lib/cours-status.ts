export type CoursStatus = "published" | "coming_soon";

export const coursStatusConfig: Record<
  CoursStatus,
  { label: string; badgeVariant: "default" | "secondary" }
> = {
  published: { label: "Publié", badgeVariant: "default" },
  coming_soon: { label: "Bientôt disponible", badgeVariant: "secondary" },
};
