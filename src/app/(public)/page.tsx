import Link from "next/link";

import { EntityCard } from "@/components/public/entity-card";
import { getAllCours } from "@/lib/db/queries/cours";
import { getUpcomingSeances } from "@/lib/db/queries/seances";
import { formatSeanceDate } from "@/lib/utils";

export default async function Home() {
  const [coursList, seancesList] = await Promise.all([
    getAllCours(),
    getUpcomingSeances(4),
  ]);

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-300">
      <section className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          Les ressources de nos cours, toujours à leur place.
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Vidéos, PDF, liens et séances de révision de vos cours — accessible à
          tous, sans compte.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">
            Prochaines révisions
          </h2>
          <Link
            href="/seances"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Voir tout →
          </Link>
        </div>
        {seancesList.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune séance prévue pour le moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {seancesList.map((s) => (
              <EntityCard
                key={s.id}
                href={`/seances/${s.slug}`}
                title={s.title}
                description={formatSeanceDate(s.sessionDate)}
                accent
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Cours</h2>
          <Link
            href="/cours"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Voir tout →
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
    </div>
  );
}
