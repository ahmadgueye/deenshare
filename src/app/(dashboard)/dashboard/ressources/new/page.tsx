import { RessourceForm } from "@/components/dashboard/ressource-form";
import { getAllThematiques } from "@/lib/db/queries/thematiques";

export default async function NewRessourcePage() {
  const thematiques = await getAllThematiques();
  const thematiqueOptions = thematiques.map((t) => ({
    id: t.id,
    title: t.title,
    coursTitle: t.cours.title,
  }));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Nouvelle ressource
      </h1>
      <div className="mt-6">
        <RessourceForm thematiqueOptions={thematiqueOptions} />
      </div>
    </div>
  );
}
