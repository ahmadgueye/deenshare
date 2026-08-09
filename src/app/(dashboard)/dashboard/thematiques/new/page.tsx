import { ThematiqueForm } from "@/components/dashboard/thematique-form";
import { getAllCours } from "@/lib/db/queries/cours";

export default async function NewThematiquePage() {
  const coursOptions = await getAllCours();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Nouvelle thématique
      </h1>
      <div className="mt-6">
        <ThematiqueForm coursOptions={coursOptions} />
      </div>
    </div>
  );
}
