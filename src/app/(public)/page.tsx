import Link from "next/link";

import { EntityCard } from "@/components/public/entity-card";
import { getAllCours } from "@/lib/db/queries/cours";

export default async function Home() {
  const coursList = await getAllCours();

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-300">
      <section className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          Des ressources pour apprendre l'Islam, toujours à leur place.
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Accessible à tous, à votre guise.
        </p>
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
