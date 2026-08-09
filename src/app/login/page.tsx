import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleLoginButton } from "@/components/public/google-login-button";

export const metadata: Metadata = {
  title: "Connexion — DeenShare",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-16">
      <Link
        href="/"
        className="mb-8 font-heading text-lg font-semibold tracking-tight"
      >
        DeenShare
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading">Espace contributeurs</CardTitle>
          <CardDescription>
            Réservé aux personnes autorisées à ajouter des ressources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleLoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
