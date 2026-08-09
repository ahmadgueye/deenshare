"use client";

import { useId, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

type RessourceType = "video" | "pdf" | "lien";

const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB — see storage bucket limit

export const typeLabels: Record<RessourceType, string> = {
  video: "Vidéo",
  pdf: "PDF",
  lien: "Lien",
};

const videoExtensions = ["mp4", "mov", "webm", "avi", "mkv", "m4v"];

function guessTypeFromFileName(name: string): RessourceType {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (videoExtensions.includes(ext)) return "video";
  return "pdf"; // pdf, and a reasonable fallback for any other document type
}

// Supabase Storage object keys reject accented/special characters (e.g. "º")
// and are safest without spaces — sanitize while keeping the extension.
function sanitizeFileName(name: string) {
  const lastDot = name.lastIndexOf(".");
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot).toLowerCase() : "";

  const safeBase = base
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeBase || "fichier"}${ext}`;
}

export function RessourceUrlField({
  defaultUrl,
  defaultType,
}: {
  defaultUrl?: string;
  defaultType?: RessourceType;
}) {
  const fileInputId = useId();
  const [mode, setMode] = useState<"lien" | "fichier">("lien");
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [type, setType] = useState<RessourceType>(defaultType ?? "lien");
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (file.size > MAX_SIZE_BYTES) {
      setError("Ce fichier dépasse la limite de 20 Mo.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const path = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from("ressources")
      .upload(path, file);

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      setError("Échec de l'envoi du fichier. Réessaie.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("ressources").getPublicUrl(path);
    setUrl(data.publicUrl);
    setType(guessTypeFromFileName(file.name));
    setFileName(file.name);
    setUploading(false);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel>Ressource</FieldLabel>
      <Tabs value={mode} onValueChange={(v) => setMode(v as "lien" | "fichier")}>
        <TabsList>
          <TabsTrigger value="lien">Lien externe</TabsTrigger>
          <TabsTrigger value="fichier">Fichier</TabsTrigger>
        </TabsList>
      </Tabs>

      {mode === "lien" ? (
        <>
          <Input
            type="url"
            placeholder="https://…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Select
            value={type}
            onValueChange={(v) => v && setType(v as RessourceType)}
            items={typeLabels}
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(typeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <div>
          <label
            htmlFor={fileInputId}
            className="flex cursor-pointer items-center gap-2 border border-dashed p-3 text-sm text-muted-foreground hover:bg-muted"
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {fileName ?? "Choisir un fichier (max 20 Mo)"}
          </label>
          <input
            id={fileInputId}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {fileName && !uploading && (
            <p className="mt-2 text-sm text-muted-foreground">
              Type détecté : {typeLabels[type]}
            </p>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      <FieldDescription>
        Vidéos volumineuses : préfère un lien Drive ou YouTube plutôt qu'un
        envoi direct.
      </FieldDescription>

      <input type="hidden" name="url" value={url} />
      <input type="hidden" name="type" value={type} />
    </div>
  );
}
