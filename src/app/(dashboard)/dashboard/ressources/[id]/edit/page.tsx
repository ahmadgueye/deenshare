import { notFound } from "next/navigation";

import { RessourceForm } from "@/components/dashboard/ressource-form";
import { getAllThematiques } from "@/lib/db/queries/thematiques";
import { getRessourceById } from "@/lib/db/queries/ressources";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRessourcePage({ params }: Props) {
  const { id } = await params;
  const [r, thematiques] = await Promise.all([
    getRessourceById(id),
    getAllThematiques(),
  ]);

  if (!r) notFound();

  const thematiqueOptions = thematiques.map((t) => ({
    id: t.id,
    title: t.title,
    coursTitle: t.cours.title,
  }));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Modifier la ressource
      </h1>
      <div className="mt-6">
        <RessourceForm thematiqueOptions={thematiqueOptions} ressource={r} />
      </div>
    </div>
  );
}
