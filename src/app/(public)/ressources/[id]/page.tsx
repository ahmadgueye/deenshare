import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { TextResourceReader } from "@/components/public/text-resource-reader";
import { getPublishedRessourceById } from "@/lib/db/queries/ressources";
import { defaultDescription, siteOpenGraph, stripMarkdown } from "@/lib/metadata";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = await getPublishedRessourceById(id);
  const title = r?.title ?? "Ressource";
  const description = r?.content ? stripMarkdown(r.content) : defaultDescription;
  return {
    title: `${title} — Taalib`,
    description,
    openGraph: { ...siteOpenGraph, title, description },
  };
}

export default async function RessourceDetailPage({ params }: Props) {
  const { id } = await params;
  const r = await getPublishedRessourceById(id);

  if (!r || r.type !== "texte" || !r.content) notFound();

  return (
    <div className="animate-in fade-in duration-300">
      <BackButton />
      <nav className="mt-3 text-sm text-muted-foreground">
        <Link
          href={`/thematiques/${r.thematique.slug}`}
          className="hover:text-foreground"
        >
          {r.thematique.cours.title} · {r.thematique.title}
        </Link>{" "}
        / <span className="text-foreground">{r.title}</span>
      </nav>

      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
        {r.title}
      </h1>

      <div className="mt-6">
        <TextResourceReader content={r.content} />
      </div>
    </div>
  );
}
