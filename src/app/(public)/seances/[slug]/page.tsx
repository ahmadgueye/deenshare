import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/public/back-button";
import { MarkdownContent } from "@/components/public/markdown-content";
import { RessourceItem } from "@/components/public/ressource-item";
import { getSeanceBySlug } from "@/lib/db/queries/seances";
import { defaultDescription, siteOpenGraph, stripMarkdown } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSeanceBySlug(slug);
  const title = s?.title ?? "Séance";
  const description = s?.summary ? stripMarkdown(s.summary) : defaultDescription;
  return {
    title: `${title} — Taalib`,
    description,
    openGraph: { ...siteOpenGraph, title, description },
  };
}

export default async function SeanceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = await getSeanceBySlug(slug);

  if (!s) notFound();

  return (
    <div className="animate-in fade-in duration-300">
      <BackButton />
      <nav className="mt-3 text-sm text-muted-foreground">
        <Link href="/seances" className="hover:text-foreground">
          Séances
        </Link>{" "}
        / <span className="text-foreground">{s.title}</span>
      </nav>

      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        {s.title}
      </h1>
      {s.sessionDate && (
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(s.sessionDate).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      {s.summary && (
        <div className="mt-4">
          <MarkdownContent content={s.summary} />
        </div>
      )}

      {s.seanceThematiques.length > 0 && (
        <>
          <h2 className="mt-10 font-heading text-xl font-semibold">
            Thématiques abordées
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.seanceThematiques.map(({ thematique }) => (
              <Link key={thematique.id} href={`/thematiques/${thematique.slug}`}>
                <Badge variant="outline" className="hover:bg-muted">
                  {thematique.cours.title} · {thematique.title}
                </Badge>
              </Link>
            ))}
          </div>
        </>
      )}

      {s.seanceRessources.length > 0 && (
        <>
          <h2 className="mt-10 font-heading text-xl font-semibold">
            Ressources
          </h2>
          <div className="mt-4 grid gap-3">
            {s.seanceRessources.map(({ ressource }) => (
              <RessourceItem
                key={ressource.id}
                id={ressource.id}
                title={ressource.title}
                type={ressource.type}
                url={ressource.url}
                content={ressource.content}
                description={ressource.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
