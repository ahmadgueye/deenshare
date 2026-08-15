import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { RessourcesHadithsTabs } from "@/components/public/ressources-hadiths-tabs";
import { getThematiqueBySlug } from "@/lib/db/queries/thematiques";
import { defaultDescription, siteOpenGraph } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getThematiqueBySlug(slug);
  const title = t?.title ?? "Thématique";
  const description = t?.description ?? defaultDescription;
  return {
    title: `${title} — Taalib`,
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

      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
        {t.title}
      </h1>
      {t.description && (
        <p className="mt-2 text-muted-foreground">{t.description}</p>
      )}

      <RessourcesHadithsTabs
        ressources={t.ressources}
        hadiths={t.hadiths}
        coursTitle={t.cours.title}
        thematiqueTitle={t.title}
      />
    </div>
  );
}
