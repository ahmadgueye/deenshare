import { CoursForm } from "@/components/dashboard/cours-form";

export default function NewCoursPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Nouveau cours
      </h1>
      <div className="mt-6">
        <CoursForm />
      </div>
    </div>
  );
}
