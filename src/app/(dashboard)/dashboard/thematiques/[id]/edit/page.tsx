import { notFound } from "next/navigation";

import { ThematiqueForm } from "@/components/dashboard/thematique-form";
import { getAllCours } from "@/lib/db/queries/cours";
import { getThematiqueById } from "@/lib/db/queries/thematiques";

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
    </div>
  );
}
