import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/back-button";
import { ResourceCourseNav } from "@/components/public/resource-course-nav";
import { TextResourceReader } from "@/components/public/text-resource-reader";
import { getCoursOutline } from "@/lib/db/queries/cours";
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

  const outline = await getCoursOutline(r.thematique.cours.id);
  const thematiques = (outline?.thematiques ?? []).map((thematique) => ({
    id: thematique.id,
    title: thematique.title,
    ressources: thematique.ressources.map((ressource) => ({
      id: ressource.id,
      title: ressource.title,
      type: ressource.type,
      url: ressource.url,
    })),
  }));

  const texteRessources = thematiques.flatMap((thematique) =>
    thematique.ressources.filter((ressource) => ressource.type === "texte")
  );
  const currentIndex = texteRessources.findIndex(
    (ressource) => ressource.id === r.id
  );
  const prev =
    currentIndex > 0
      ? { id: texteRessources[currentIndex - 1].id, title: texteRessources[currentIndex - 1].title }
      : null;
  const next =
    currentIndex >= 0 && currentIndex < texteRessources.length - 1
      ? { id: texteRessources[currentIndex + 1].id, title: texteRessources[currentIndex + 1].title }
      : null;

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
        <TextResourceReader
          content={r.content}
          courseNav={
            <ResourceCourseNav
              coursTitle={r.thematique.cours.title}
              coursSlug={r.thematique.cours.slug}
              thematiques={thematiques}
              currentRessourceId={r.id}
              prev={prev}
              next={next}
            />
          }
        />
      </div>
    </div>
  );
}
