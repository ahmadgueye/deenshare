"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRessource } from "@/lib/actions/ressources";

const typeLabels = { video: "Vidéo", pdf: "PDF", lien: "Lien" } as const;
type RessourceType = keyof typeof typeLabels;

const filterItems = { all: "Tous les types", ...typeLabels };

type RessourceRow = {
  id: string;
  title: string;
  type: RessourceType;
  createdAt: Date;
  thematique: { id: string; title: string; cours: { title: string } };
};

export function RessourcesTable({ data }: { data: RessourceRow[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [thematiqueFilter, setThematiqueFilter] = useState("all");

  const thematiqueOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of data) {
      map.set(r.thematique.id, `${r.thematique.cours.title} · ${r.thematique.title}`);
    }
    return Array.from(map, ([id, label]) => ({ id, label }));
  }, [data]);

  const thematiqueFilterItems = useMemo(
    () => ({
      all: "Toutes les thématiques",
      ...Object.fromEntries(thematiqueOptions.map((t) => [t.id, t.label])),
    }),
    [thematiqueOptions]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((r) => {
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      const matchesThematique =
        thematiqueFilter === "all" || r.thematique.id === thematiqueFilter;
      const matchesSearch = !q || r.title.toLowerCase().includes(q);
      return matchesType && matchesThematique && matchesSearch;
    });
  }, [data, search, typeFilter, thematiqueFilter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Rechercher une ressource…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={typeFilter}
          onValueChange={(v) => v && setTypeFilter(v)}
          items={filterItems}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {Object.entries(typeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={thematiqueFilter}
          onValueChange={(v) => v && setThematiqueFilter(v)}
          items={thematiqueFilterItems}
        >
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les thématiques</SelectItem>
            {thematiqueOptions.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Aucun résultat.</p>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Thématique</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{typeLabels[r.type]}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.thematique.cours.title} · {r.thematique.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={
                      <Link href={`/dashboard/ressources/${r.id}/edit`} />
                    }
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteRessource.bind(null, r.id)}
                    itemLabel={r.title}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
