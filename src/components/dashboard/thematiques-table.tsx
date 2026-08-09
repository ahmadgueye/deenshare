"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

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
import { SortableTableHead } from "@/components/dashboard/sortable-table-head";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteThematique } from "@/lib/actions/thematiques";

type ThematiqueRow = {
  id: string;
  title: string;
  createdAt: Date;
  cours: { id: string; title: string };
};

type SortKey = "title" | "cours" | "createdAt";

export function ThematiquesTable({ data }: { data: ThematiqueRow[] }) {
  const [search, setSearch] = useState("");
  const [coursFilter, setCoursFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const coursOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of data) map.set(t.cours.id, t.cours.title);
    return Array.from(map, ([id, title]) => ({ id, title }));
  }, [data]);

  const selectItems = useMemo(
    () => ({
      all: "Tous les cours",
      ...Object.fromEntries(coursOptions.map((c) => [c.id, c.title])),
    }),
    [coursOptions]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((t) => {
      const matchesCours =
        coursFilter === "all" || t.cours.id === coursFilter;
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.cours.title.toLowerCase().includes(q);
      return matchesCours && matchesSearch;
    });
  }, [data, search, coursFilter]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "cours")
        cmp = a.cours.title.localeCompare(b.cours.title);
      else cmp = a.createdAt.getTime() - b.createdAt.getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Rechercher une thématique…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={coursFilter}
          onValueChange={(v) => v && setCoursFilter(v)}
          items={selectItems}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les cours</SelectItem>
            {coursOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sorted.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Aucun résultat.</p>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <SortableTableHead
                label="Titre"
                sortKey="title"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableTableHead
                label="Cours"
                sortKey="cours"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableTableHead
                label="Créé le"
                sortKey="createdAt"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {t.cours.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(t.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell className="flex justify-end gap-1">
                  <Button
                    render={
                      <Link href={`/dashboard/thematiques/${t.id}/edit`} />
                    }
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteButton
                    action={deleteThematique.bind(null, t.id)}
                    itemLabel={t.title}
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
