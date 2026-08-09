export type SearchResult = {
  type: "cours" | "thematique" | "ressource" | "seance";
  title: string;
  subtitle?: string | null;
  href: string;
};

export type EntityType = SearchResult["type"];
export type RessourceType = "video" | "pdf" | "lien";

export const ALL_ENTITY_TYPES: EntityType[] = [
  "cours",
  "thematique",
  "ressource",
  "seance",
];
export const ALL_RESSOURCE_TYPES: RessourceType[] = ["video", "pdf", "lien"];
