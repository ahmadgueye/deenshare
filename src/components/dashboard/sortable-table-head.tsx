"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function SortableTableHead<T extends string>({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
  className,
}: {
  label: string;
  sortKey: T;
  currentKey: T | null;
  direction: "asc" | "desc";
  onSort: (key: T) => void;
  className?: string;
}) {
  const active = currentKey === sortKey;
  const Icon = active ? (direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "flex items-center gap-1 text-muted-foreground hover:text-foreground",
          active && "text-foreground"
        )}
      >
        {label}
        <Icon className="size-3.5" />
      </button>
    </TableHead>
  );
}
