"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireContributor } from "@/lib/auth/get-session";
import { db } from "@/lib/db";
import { ressources } from "@/lib/db/schema";

export type ActionState = { error?: string } | undefined;

const baseFields = {
  title: z.string().trim().min(1, "Le titre est requis."),
  description: z.string().trim().optional(),
  thematiqueId: z.string().trim().min(1, "La thématique est requise."),
};

const ressourceSchema = z.discriminatedUnion("type", [
  z.object({
    ...baseFields,
    type: z.literal("texte"),
    content: z.string().trim().min(1, "Le contenu est requis."),
  }),
  z.object({
    ...baseFields,
    type: z.enum(["video", "pdf", "lien"]),
    url: z.string().trim().url("Le lien doit être une URL valide."),
  }),
]);

export async function createRessource(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireContributor();
  const parsed = ressourceSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    url: formData.get("url"),
    content: formData.get("content"),
    description: formData.get("description"),
    thematiqueId: formData.get("thematiqueId"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db.insert(ressources).values({
    title: parsed.data.title,
    type: parsed.data.type,
    url: parsed.data.type === "texte" ? null : parsed.data.url,
    content: parsed.data.type === "texte" ? parsed.data.content : null,
    description: parsed.data.description || null,
    thematiqueId: parsed.data.thematiqueId,
    addedBy: profile.id,
  });

  revalidatePath("/dashboard/ressources");
  revalidatePath("/thematiques");
  redirect("/dashboard/ressources");
}

export async function updateRessource(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireContributor();
  const parsed = ressourceSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    url: formData.get("url"),
    content: formData.get("content"),
    description: formData.get("description"),
    thematiqueId: formData.get("thematiqueId"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db
    .update(ressources)
    .set({
      title: parsed.data.title,
      type: parsed.data.type,
      url: parsed.data.type === "texte" ? null : parsed.data.url,
      content: parsed.data.type === "texte" ? parsed.data.content : null,
      description: parsed.data.description || null,
      thematiqueId: parsed.data.thematiqueId,
      updatedAt: new Date(),
    })
    .where(eq(ressources.id, id));

  revalidatePath("/dashboard/ressources");
  revalidatePath("/thematiques");
  redirect("/dashboard/ressources");
}

export async function deleteRessource(id: string) {
  await requireContributor();
  await db.delete(ressources).where(eq(ressources.id, id));
  revalidatePath("/dashboard/ressources");
  revalidatePath("/thematiques");
}
