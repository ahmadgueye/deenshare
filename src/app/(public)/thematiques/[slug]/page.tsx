import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { RessourceItem } from "@/components/public/ressource-item";
import { getThematiqueBySlug } from "@/lib/db/queries/thematiques";
import { defaultDescription, siteOpenGraph } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getThematiqueBySlug(slug);
  const title = t?.title ?? "Thématique";
  const description = t?.description ?? defaultDescription;
  return {
    title: `${title} — DeenShare`,
    description,
    openGraph: { ...siteOpenGraph, title, description },
  };
}

export default async function ThematiqueDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = await getThematiqueBySlug(slug);

  if (!t) notFound();

  return (
    <div className="animate-in fade-in duration-300">
      <BackButton />
      <nav className="mt-3 text-sm text-muted-foreground">
        <Link href="/cours" className="hover:text-foreground">
          Cours
        </Link>{" "}
        /{" "}
        <Link href={`/cours/${t.cours.slug}`} className="hover:text-foreground">
          {t.cours.title}
        </Link>{" "}
        / <span className="text-foreground">{t.title}</span>
      </nav>

      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        {t.title}
      </h1>
      {t.description && (
        <p className="mt-2 text-muted-foreground">{t.description}</p>
      )}

      <h2 className="mt-10 font-heading text-xl font-semibold">Ressources</h2>
      {t.ressources.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Aucune ressource pour cette thématique pour le moment.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {t.ressources.map((r) => (
            <RessourceItem
              key={r.id}
              title={r.title}
              type={r.type}
              url={r.url}
              description={r.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
