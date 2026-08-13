import { notFound } from "next/navigation";

import { CoursForm } from "@/components/dashboard/cours-form";
import { SortableReorderList } from "@/components/dashboard/sortable-reorder-list";
import { reorderThematiques } from "@/lib/actions/thematiques";
import { getCoursById } from "@/lib/db/queries/cours";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursPage({ params }: Props) {
  const { id } = await params;
  const c = await getCoursById(id);

  if (!c) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Modifier le cours
      </h1>
      <div className="mt-6">
        <CoursForm cours={c} />
      </div>

      {c.thematiques.length > 1 && (
        <div className="mt-10 max-w-lg">
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Ordre des thématiques
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Glissez-déposez pour choisir l&apos;ordre d&apos;affichage des
            thématiques de ce cours.
          </p>
          <div className="mt-4">
            <SortableReorderList
              items={c.thematiques.map((t) => ({ id: t.id, label: t.title }))}
              onReorder={reorderThematiques.bind(null, c.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
