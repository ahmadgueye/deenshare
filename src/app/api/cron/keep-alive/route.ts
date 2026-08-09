import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { cours } from "@/lib/db/schema";

// Pinged daily by Vercel Cron (see vercel.json) to keep the Supabase
// project active — the free tier auto-pauses after 7 days with no activity.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await db.select({ value: count() }).from(cours);

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() });
}
