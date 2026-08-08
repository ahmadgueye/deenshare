import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const coursApercu = [
  {
    title: "Aqida",
    description: "Les fondements de la croyance islamique.",
    thematiques: 6,
  },
  {
    title: "Fiqh",
    description: "Jurisprudence et actes d'adoration au quotidien.",
    thematiques: 9,
  },
  {
    title: "Sīra",
    description: "La biographie du Prophète ﷺ.",
    thematiques: 4,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-heading text-lg font-semibold tracking-tight">
            DeenShare
          </span>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/cours" className="hover:text-foreground">
              Cours
            </a>
            <a href="/seances" className="hover:text-foreground">
              Séances
            </a>
            <a href="/recherche" className="hover:text-foreground">
              Recherche
            </a>
            <Button render={<a href="/login" />} size="sm">
              Se connecter
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16">
        <section className="max-w-2xl">
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-balance">
            Les ressources de nos cours, toujours à leur place.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Un catalogue unique pour retrouver les vidéos, PDF et liens
            partagés en cours, organisés par thématique — et les séances de
            révision qui s&apos;y rattachent. Accessible à tous, sans compte.
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold">Cours</h2>
            <Badge variant="secondary">Aperçu</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {coursApercu.map((cours) => (
              <Card key={cours.title}>
                <CardHeader>
                  <CardTitle className="font-heading">
                    {cours.title}
                  </CardTitle>
                  <CardDescription>{cours.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-muted-foreground">
          DeenShare — catalogue de ressources d&apos;études islamiques.
        </div>
      </footer>
    </div>
  );
}
