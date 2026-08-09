import { notFound } from "next/navigation";

import { CoursForm } from "@/components/dashboard/cours-form";
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
    </div>
  );
}
