import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { getHadithBySlug } from "@/lib/db/queries/hadiths";
import { defaultDescription, siteOpenGraph } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const h = await getHadithBySlug(slug);
  const title = h?.title ?? "Hadith";
  const description = h?.translationFr ?? defaultDescription;
  return {
    title: `${title} — DeenShare`,
    description,
    openGraph: { ...siteOpenGraph, title, description },
  };
}

export default async function HadithDetailPage({ params }: Props) {
  const { slug } = await params;
  const h = await getHadithBySlug(slug);

  if (!h) notFound();

  return (
    <div className="animate-in fade-in duration-300">
      <BackButton />
      <nav className="mt-3 text-sm text-muted-foreground">
        <Link href="/hadiths" className="hover:text-foreground">
          Hadiths
        </Link>{" "}
        /{" "}
        <Link
          href={`/thematiques/${h.thematique.slug}`}
          className="hover:text-foreground"
        >
          {h.thematique.cours.title} · {h.thematique.title}
        </Link>{" "}
        / <span className="text-foreground">{h.title}</span>
      </nav>

      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
        {h.title}
      </h1>

      <p
        dir="rtl"
        lang="ar"
        className="mt-6 font-arabic text-2xl leading-loose text-right"
      >
        {h.arabicText}
      </p>

      <p className="mt-6 text-muted-foreground">{h.translationFr}</p>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>Rapporteur(s) : {h.narrator}</p>
        {h.source && <p className="mt-1">Source : {h.source}</p>}
      </div>
    </div>
  );
}
