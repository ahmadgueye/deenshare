import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { EntityCard } from "@/components/public/entity-card";
import { getCoursBySlug } from "@/lib/db/queries/cours";
import { defaultDescription, siteOpenGraph } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCoursBySlug(slug);
  const title = c?.title ?? "Cours";
  const description = c?.description ?? defaultDescription;
  return {
    title: `${title} — Taalib`,
    description,
    openGraph: { ...siteOpenGraph, title, description },
  };
}

export default async function CoursDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = await getCoursBySlug(slug);

  if (!c) notFound();

  return (
    <div className="animate-in fade-in duration-300">
      <BackButton />
      <nav className="mt-3 text-sm text-muted-foreground">
        <Link href="/cours" className="hover:text-foreground">
          Cours
        </Link>{" "}
        / <span className="text-foreground">{c.title}</span>
      </nav>

      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        {c.title}
      </h1>
      {c.description && (
        <p className="mt-2 text-muted-foreground">{c.description}</p>
      )}

      <h2 className="mt-10 font-heading text-xl font-semibold">
        Thématiques
      </h2>
      {c.thematiques.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Aucune thématique pour ce cours pour le moment.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {c.thematiques.map((t) => (
            <EntityCard
              key={t.id}
              href={`/thematiques/${t.slug}`}
              title={t.title}
              description={t.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
