import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EntityCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string | null;
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-muted">
        <CardHeader>
          <CardTitle className="font-heading">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          <CardAction>
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
