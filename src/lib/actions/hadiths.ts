"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireContributor } from "@/lib/auth/get-session";
import { db } from "@/lib/db";
import { hadiths } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export type ActionState = { error?: string } | undefined;

const hadithSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis."),
  arabicText: z.string().trim().min(1, "Le texte arabe est requis."),
  translationFr: z.string().trim().min(1, "La traduction est requise."),
  narrator: z.string().trim().min(1, "Le rapporteur est requis."),
  source: z.string().trim().optional(),
  thematiqueId: z.string().trim().min(1, "La thématique est requise."),
});

function parseHadithForm(formData: FormData) {
  return hadithSchema.safeParse({
    title: formData.get("title"),
    arabicText: formData.get("arabicText"),
    translationFr: formData.get("translationFr"),
    narrator: formData.get("narrator"),
    source: formData.get("source"),
    thematiqueId: formData.get("thematiqueId"),
  });
}

export async function createHadith(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireContributor();
  const parsed = parseHadithForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await db.insert(hadiths).values({
      title: parsed.data.title,
      slug: slugify(parsed.data.title),
      arabicText: parsed.data.arabicText,
      translationFr: parsed.data.translationFr,
      narrator: parsed.data.narrator,
      source: parsed.data.source || null,
      thematiqueId: parsed.data.thematiqueId,
      addedBy: profile.id,
    });
  } catch {
    return { error: "Un hadith avec ce titre existe déjà." };
  }

  revalidatePath("/dashboard/hadiths");
  revalidatePath("/hadiths");
  revalidatePath("/thematiques");
  redirect("/dashboard/hadiths");
}

export async function updateHadith(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireContributor();
  const parsed = parseHadithForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await db
      .update(hadiths)
      .set({
        title: parsed.data.title,
        slug: slugify(parsed.data.title),
        arabicText: parsed.data.arabicText,
        translationFr: parsed.data.translationFr,
        narrator: parsed.data.narrator,
        source: parsed.data.source || null,
        thematiqueId: parsed.data.thematiqueId,
        updatedAt: new Date(),
      })
      .where(eq(hadiths.id, id));
  } catch {
    return { error: "Un hadith avec ce titre existe déjà." };
  }

  revalidatePath("/dashboard/hadiths");
  revalidatePath("/hadiths");
  revalidatePath("/thematiques");
  redirect("/dashboard/hadiths");
}

export async function deleteHadith(id: string) {
  await requireContributor();
  await db.delete(hadiths).where(eq(hadiths.id, id));
  revalidatePath("/dashboard/hadiths");
  revalidatePath("/hadiths");
  revalidatePath("/thematiques");
}
