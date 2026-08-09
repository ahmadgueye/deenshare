"use client";

import { EntityCard } from "@/components/public/entity-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatSeanceDate } from "@/lib/utils";

type SeanceListItem = {
  id: string;
  slug: string;
  title: string;
  sessionDate: string | null;
};

function SeancesGrid({
  seancesList,
  emptyMessage,
}: {
  seancesList: SeanceListItem[];
  emptyMessage: string;
}) {
  if (seancesList.length === 0) {
    return <p className="mt-8 text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {seancesList.map((s) => (
        <EntityCard
          key={s.id}
          href={`/seances/${s.slug}`}
          title={s.title}
          description={formatSeanceDate(s.sessionDate)}
        />
      ))}
    </div>
  );
}

export function SeancesTabs({
  upcoming,
  past,
}: {
  upcoming: SeanceListItem[];
  past: SeanceListItem[];
}) {
  return (
    <Tabs defaultValue="prevues" className="mt-8">
      <TabsList>
        <TabsTrigger value="prevues">Prévues ({upcoming.length})</TabsTrigger>
        <TabsTrigger value="passees">Passées ({past.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="prevues">
        <SeancesGrid
          seancesList={upcoming}
          emptyMessage="Aucune séance prévue pour le moment."
        />
      </TabsContent>
      <TabsContent value="passees">
        <SeancesGrid
          seancesList={past}
          emptyMessage="Aucune séance passée."
        />
      </TabsContent>
    </Tabs>
  );
}
