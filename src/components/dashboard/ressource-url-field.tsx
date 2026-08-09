"use client";

import { useId, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB — see storage bucket limit

export function RessourceUrlField({ defaultUrl }: { defaultUrl?: string }) {
  const fileInputId = useId();
  const [mode, setMode] = useState<"lien" | "fichier">("lien");
  const [url, setUrl] = useState(defaultUrl ?? "");
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
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("ressources")
      .upload(path, file);

    if (uploadError) {
      setError("Échec de l'envoi du fichier. Réessaie.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("ressources").getPublicUrl(path);
    setUrl(data.publicUrl);
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
        <Input
          type="url"
          placeholder="https://…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
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
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      <FieldDescription>
        Vidéos volumineuses : préfère un lien Drive ou YouTube plutôt qu'un
        envoi direct.
      </FieldDescription>

      <input type="hidden" name="url" value={url} />
    </div>
  );
}
