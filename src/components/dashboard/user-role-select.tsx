"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/lib/actions/users";

const roleLabels = { admin: "Admin", contributor: "Contributeur", viewer: "En attente" };

export function UserRoleSelect({
  userId,
  role,
}: {
  userId: string;
  role: "admin" | "contributor" | "viewer";
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      const result = await updateUserRole(userId, value);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Rôle mis à jour.");
      }
    });
  }

  return (
    <Select value={role} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
