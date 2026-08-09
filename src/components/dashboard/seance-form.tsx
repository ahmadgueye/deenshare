"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/dashboard/submit-button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createSeance,
  updateSeance,
  type ActionState,
} from "@/lib/actions/seances";

const typeLabels = { video: "Vidéo", pdf: "PDF", lien: "Lien" };

export function SeanceForm({
  thematiqueOptions,
  ressourceOptions,
  seance,
  linkedThematiqueIds = [],
  linkedRessourceIds = [],
}: {
  thematiqueOptions: { id: string; title: string; coursTitle: string }[];
  ressourceOptions: {
    id: string;
    title: string;
    type: "video" | "pdf" | "lien";
  }[];
  seance?: {
    id: string;
    title: string;
    sessionDate: string | null;
    summary: string | null;
  };
  linkedThematiqueIds?: string[];
  linkedRessourceIds?: string[];
}) {
  const action = seance
    ? updateSeance.bind(null, seance.id)
    : createSeance;
  const [state, formAction] = useActionState<ActionState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="max-w-lg">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Titre</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={seance?.title}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sessionDate">Date</FieldLabel>
          <Input
            id="sessionDate"
            name="sessionDate"
            type="date"
            defaultValue={seance?.sessionDate ?? ""}
          />
          <FieldDescription>Facultatif.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="summary">Résumé de la séance</FieldLabel>
          <Textarea
            id="summary"
            name="summary"
            defaultValue={seance?.summary ?? ""}
            rows={4}
          />
          <FieldDescription>Facultatif.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Thématiques abordées</FieldLabel>
          <div className="max-h-48 space-y-2 overflow-y-auto border p-3">
            {thematiqueOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune thématique disponible.
              </p>
            ) : (
              thematiqueOptions.map((t) => (
                <label key={t.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    name="thematiqueIds"
                    value={t.id}
                    defaultChecked={linkedThematiqueIds.includes(t.id)}
                  />
                  {t.coursTitle} · {t.title}
                </label>
              ))
            )}
          </div>
        </Field>

        <Field>
          <FieldLabel>Ressources associées</FieldLabel>
          <div className="max-h-48 space-y-2 overflow-y-auto border p-3">
            {ressourceOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune ressource disponible.
              </p>
            ) : (
              ressourceOptions.map((r) => (
                <label key={r.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    name="ressourceIds"
                    value={r.id}
                    defaultChecked={linkedRessourceIds.includes(r.id)}
                  />
                  {r.title}
                  <Badge variant="secondary">{typeLabels[r.type]}</Badge>
                </label>
              ))
            )}
          </div>
        </Field>

        {state?.error && <FieldError>{state.error}</FieldError>}
        <SubmitButton>{seance ? "Enregistrer" : "Créer"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
