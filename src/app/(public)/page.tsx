import Link from "next/link";

import { EntityCard } from "@/components/public/entity-card";
import { getAllCours } from "@/lib/db/queries/cours";
import { getAllSeances } from "@/lib/db/queries/seances";

export default async function Home() {
  const [coursList, seancesList] = await Promise.all([
    getAllCours(),
    getAllSeances(),
  ]);

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-300">
      <section className="max-w-2xl">
        <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-balance">
          Les ressources de nos cours, toujours à leur place.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Un catalogue unique pour retrouver les vidéos, PDF et liens
          partagés en cours, organisés par thématique — et les séances de
          révision qui s&apos;y rattachent. Accessible à tous, sans compte.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Cours</h2>
          <Link
            href="/cours"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Voir tous les cours →
          </Link>
        </div>
        {coursList.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun cours pour le moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {coursList.map((c) => (
              <EntityCard
                key={c.id}
                href={`/cours/${c.slug}`}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">
            Séances de révision récentes
          </h2>
          <Link
            href="/seances"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Voir toutes les séances →
          </Link>
        </div>
        {seancesList.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune séance pour le moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {seancesList.slice(0, 4).map((s) => (
              <EntityCard
                key={s.id}
                href={`/seances/${s.slug}`}
                title={s.title}
                description={
                  s.sessionDate
                    ? new Date(s.sessionDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : null
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
