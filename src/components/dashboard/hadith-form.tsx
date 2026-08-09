"use client";

import { useActionState } from "react";

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
  createHadith,
  updateHadith,
  type ActionState,
} from "@/lib/actions/hadiths";

export function HadithForm({
  thematiqueOptions,
  hadith,
}: {
  thematiqueOptions: { id: string; title: string; coursTitle: string }[];
  hadith?: {
    id: string;
    title: string;
    arabicText: string;
    translationFr: string;
    narrator: string;
    source: string | null;
    thematiqueId: string;
  };
}) {
  const action = hadith ? updateHadith.bind(null, hadith.id) : createHadith;
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
            defaultValue={hadith?.thematiqueId}
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
            defaultValue={hadith?.title}
            required
          />
          <FieldDescription>
            Court résumé en français, utilisé aussi pour l&apos;URL.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="arabicText">Texte arabe</FieldLabel>
          <Textarea
            id="arabicText"
            name="arabicText"
            dir="rtl"
            lang="ar"
            className="font-arabic text-right"
            defaultValue={hadith?.arabicText}
            rows={4}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="translationFr">
            Traduction en français
          </FieldLabel>
          <Textarea
            id="translationFr"
            name="translationFr"
            defaultValue={hadith?.translationFr}
            rows={4}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="narrator">Rapporteur(s)</FieldLabel>
          <Input
            id="narrator"
            name="narrator"
            defaultValue={hadith?.narrator}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="source">Source</FieldLabel>
          <Input
            id="source"
            name="source"
            defaultValue={hadith?.source ?? ""}
            placeholder="ex. Sahih al-Bukhari, n°1"
          />
          <FieldDescription>Facultatif.</FieldDescription>
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        <SubmitButton>{hadith ? "Enregistrer" : "Créer"}</SubmitButton>
      </FieldGroup>
    </form>
  );
}
