import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

export function HadithCard({
  slug,
  title,
  arabicText,
  translationFr,
}: {
  slug: string;
  title: string;
  arabicText: string;
  translationFr: string;
}) {
  return (
    <Link href={`/hadiths/${slug}`}>
      <Card className="h-full transition-colors hover:bg-muted">
        <CardHeader>
          <CardTitle className="font-heading">{title}</CardTitle>
          <p
            dir="rtl"
            lang="ar"
            className="line-clamp-2 font-arabic text-right text-sm text-muted-foreground"
          >
            {arabicText}
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {translationFr}
          </p>
          <CardAction className="row-span-3 self-center">
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
