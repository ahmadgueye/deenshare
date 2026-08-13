"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";

import { MarkdownContent } from "@/components/public/markdown-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function MarkdownEditorField({
  name,
  label,
  defaultValue,
  dir,
  lang,
  editorClassName,
  placeholder = "# Titre\n\nContenu en **Markdown**…",
  dialogTitle = "Contenu — Markdown",
  dialogDescription = "Gras, listes, liens, titres… supportés.",
  fieldDescription = "Markdown supporté : gras, listes, liens, etc.",
}: {
  name: string;
  label?: string;
  defaultValue?: string | null;
  dir?: "rtl" | "ltr";
  lang?: string;
  editorClassName?: string;
  placeholder?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  fieldDescription?: string | null;
}) {
  const [content, setContent] = useState(defaultValue ?? "");
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogTrigger
          render={
            <button
              type="button"
              className="flex w-full flex-col gap-2 border border-dashed p-3 text-left text-sm text-muted-foreground hover:bg-muted"
            />
          }
        >
          {content ? (
            <>
              <span
                dir={dir}
                lang={lang}
                className={cn(
                  "line-clamp-3 font-mono text-xs text-foreground",
                  dir === "rtl" && "text-right",
                )}
              >
                {content}
              </span>
              <span className="flex items-center gap-2 text-xs">
                <PenLine className="size-3.5" />
                Modifier
              </span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <PenLine className="size-4" />
              Rédiger le contenu…
            </span>
          )}
        </DialogTrigger>

        <DialogContent className="flex h-[85vh] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-7xl">
          <DialogHeader className="border-b p-4">
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          <div className="hidden min-h-0 flex-1 sm:grid sm:grid-cols-2">
            <Textarea
              autoFocus
              dir={dir}
              lang={lang}
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={cn(
                "h-full resize-none rounded-none border-0 border-r font-mono text-sm focus-visible:ring-0",
                editorClassName,
              )}
            />
            <div className="h-full overflow-y-auto p-4">
              <MarkdownContent
                content={content || "*Aperçu…*"}
                dir={dir}
                lang={lang}
                className={editorClassName}
              />
            </div>
          </div>

          <Tabs defaultValue="write" className="flex min-h-0 flex-1 sm:hidden">
            <TabsList className="mx-4 mt-2">
              <TabsTrigger value="write">Écrire</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="min-h-0 p-4 pt-2">
              <Textarea
                autoFocus
                dir={dir}
                lang={lang}
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cn("h-full resize-none font-mono text-sm", editorClassName)}
              />
            </TabsContent>
            <TabsContent
              value="preview"
              className="min-h-0 overflow-y-auto p-4 pt-2"
            >
              <MarkdownContent
                content={content || "*Aperçu…*"}
                dir={dir}
                lang={lang}
                className={editorClassName}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="mx-0 mb-0 border-t p-4">
            <DialogClose render={<Button>Terminer</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {fieldDescription && <FieldDescription>{fieldDescription}</FieldDescription>}

      <input type="hidden" name={name} value={content} />
    </Field>
  );
}
