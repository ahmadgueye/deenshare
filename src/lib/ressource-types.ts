import {
  FileText,
  Link as LinkIcon,
  NotebookText,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { RessourceType } from "@/lib/db/queries/search";

export const ressourceTypeConfig: Record<
  RessourceType,
  { label: string; icon: LucideIcon }
> = {
  video: { label: "Vidéo", icon: Video },
  pdf: { label: "PDF", icon: FileText },
  lien: { label: "Lien", icon: LinkIcon },
  texte: { label: "Texte", icon: NotebookText },
};
