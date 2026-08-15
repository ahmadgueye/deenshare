import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function EntityCard({
  href,
  title,
  description,
  accent = false,
  badge,
}: {
  href: string;
  title: string;
  description?: string | null;
  accent?: boolean;
  badge?: {
    label: string;
    variant?:
      | "default"
      | "secondary"
      | "outline"
      | "destructive"
      | "ghost"
      | "link";
  };
}) {
  return (
    <Link href={href}>
      <Card
        className={cn(
          "h-full transition-colors hover:bg-muted",
          accent &&
            "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60",
        )}
      >
        <CardHeader>
          <CardTitle className="font-heading">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {badge && (
            <Badge variant={badge.variant} className="w-fit mt-2">
              {badge.label}
            </Badge>
          )}
          <CardAction className="self-center">
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
