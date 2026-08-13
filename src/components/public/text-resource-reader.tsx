"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/public/markdown-content";

const sizeSteps = [
  "max-w-2xl text-sm leading-relaxed",
  "max-w-2xl text-base leading-relaxed",
  "max-w-3xl text-lg leading-loose",
  "max-w-3xl text-xl leading-loose",
];

export function TextResourceReader({ content }: { content: string }) {
  const [step, setStep] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-2 border-b pb-3 text-sm text-muted-foreground">
        <span>Taille du texte</span>
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
      <div className="mt-6">
        <MarkdownContent content={content} className={sizeSteps[step]} />
      </div>
    </div>
  );
}
