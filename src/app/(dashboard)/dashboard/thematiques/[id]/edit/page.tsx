import { notFound } from "next/navigation";

import { SortableReorderList } from "@/components/dashboard/sortable-reorder-list";
import { ThematiqueForm } from "@/components/dashboard/thematique-form";
import { reorderRessources } from "@/lib/actions/ressources";
import { getAllCours } from "@/lib/db/queries/cours";
import { getThematiqueById } from "@/lib/db/queries/thematiques";

const typeLabels = {
  video: "Vidéo",
  pdf: "PDF",
  lien: "Lien",
  texte: "Texte",
} as const;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditThematiquePage({ params }: Props) {
  const { id } = await params;
  const [t, coursOptions] = await Promise.all([
    getThematiqueById(id),
    getAllCours(),
  ]);

  if (!t) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Modifier la thématique
      </h1>
      <div className="mt-6">
        <ThematiqueForm coursOptions={coursOptions} thematique={t} />
      </div>

      {t.ressources.length > 1 && (
        <div className="mt-10 max-w-lg">
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Ordre des ressources
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Glissez-déposez pour choisir l&apos;ordre d&apos;affichage des
            ressources de cette thématique.
          </p>
          <div className="mt-4">
            <SortableReorderList
              items={t.ressources.map((r) => ({
                id: r.id,
                label: r.title,
                sublabel: typeLabels[r.type],
              }))}
              onReorder={reorderRessources.bind(null, t.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
