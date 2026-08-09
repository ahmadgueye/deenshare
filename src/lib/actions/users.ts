"use server";

import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/get-session";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

const roleSchema = z.enum(["admin", "contributor", "viewer"]);

export async function updateUserRole(userId: string, role: string) {
  const admin = await requireAdmin();
  const parsed = roleSchema.safeParse(role);
  if (!parsed.success) {
    return { error: "Rôle invalide." };
  }

  if (userId === admin.id && parsed.data !== "admin") {
    const [{ value: adminCount }] = await db
      .select({ value: count() })
      .from(profiles)
      .where(eq(profiles.role, "admin"));
    if (adminCount <= 1) {
      return { error: "Impossible de retirer le dernier administrateur." };
    }
  }

  await db
    .update(profiles)
    .set({ role: parsed.data })
    .where(eq(profiles.id, userId));

  revalidatePath("/dashboard/utilisateurs");
}
