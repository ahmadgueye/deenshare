"use client";

import { useActionState } from "react";

import { RessourceUrlField } from "@/components/dashboard/ressource-url-field";
import { SubmitButton } from "@/components/dashboard/submit-button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createRessource,
  updateRessource,
  type ActionState,
} from "@/lib/actions/ressources";

export function RessourceForm({
  thematiqueOptions,
  ressource,
}: {
  thematiqueOptions: { id: string; title: string; coursTitle: string }[];
  ressource?: {
    id: string;
    title: string;
    type: "video" | "pdf" | "lien" | "texte";
    url: string | null;
    content?: string | null;
    description: string | null;
    thematiqueId: string;
  };
}) {
  const action = ressource
    ? updateRessource.bind(null, ressource.id)
    : createRessource;
  const [state, formAction] = useActionState<ActionState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="max-w-lg">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="thematiqueId">Thématique</FieldLabel>
          <Select
            name="thematiqueId"
            defaultValue={ressource?.thematiqueId}
            items={thematiqueOptions.map((t) => ({
              value: t.id,
              label: `${t.coursTitle} · ${t.title}`,
            }))}
            required
          >
            <SelectTrigger id="thematiqueId" className="w-full">
              <SelectValue placeholder="Choisir une thématique" />
            </SelectTrigger>
            <SelectContent>
              {thematiqueOptions.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.coursTitle} · {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="title">Titre</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={ressource?.title}
            required
          />
        </Field>
        <Field>
          <RessourceUrlField
            defaultUrl={ressource?.url ?? undefined}
            defaultType={ressource?.type}
            defaultContent={ressource?.content}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={ressource?.description ?? ""}
            rows={3}
          />
          <FieldDescription>Facultatif.</FieldDescription>
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        <SubmitButton>{ressource ? "Enregistrer" : "Créer"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
