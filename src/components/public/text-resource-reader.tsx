"use client";

import { type ReactNode, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/public/markdown-content";

const sizeSteps = [
  "max-w-none text-sm leading-relaxed",
  "max-w-none text-base leading-relaxed",
  "max-w-none text-lg leading-loose",
  "max-w-none text-xl leading-loose",
  "max-w-none text-2xl leading-loose",
  "max-w-none text-3xl leading-loose",
];

export function TextResourceReader({
  content,
  courseNav,
}: {
  content: string;
  courseNav?: ReactNode;
}) {
  const [step, setStep] = useState(1);

  return (
    <div>
      <div className="sticky top-16 z-20 flex items-center justify-between gap-2 border-b bg-background/95 py-3 text-sm text-muted-foreground backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Taille du texte</span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            <Minus />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={step === sizeSteps.length - 1}
            onClick={() => setStep((s) => Math.min(sizeSteps.length - 1, s + 1))}
          >
            <Plus />
          </Button>
        </div>
        {courseNav}
      </div>
      <div className="mt-6 text-justify">
        <MarkdownContent content={content} className={sizeSteps[step]} />
      </div>
    </div>
  );
}
