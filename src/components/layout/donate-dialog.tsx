"use client";

import { Heart, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "221771276922";
const WHATSAPP_MESSAGE =
  "Assalamou aleykoum, je souhaite faire un don pour la plateforme طالب.";

export function DonateDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Heart className="text-destructive" />
            Faire un don
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faire un don</DialogTitle>
          <DialogDescription>
            Cette plateforme est gratuite et vise à rendre le savoir islamique
            accessible à tous. Vos dons nous aident à couvrir les frais
            d&apos;hébergement et à financer la création de nouveaux contenus au
            fur et à mesure.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Le système de don en ligne n&apos;est pas encore disponible, il arrive
          bientôt incha Allah. En attendant, vous pouvez nous contacter
          directement sur WhatsApp pour faire un don.
        </p>
        <Button
          render={
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          className="w-full"
        >
          <MessageCircle />
          +221 77 127 69 22
        </Button>
      </DialogContent>
    </Dialog>
  );
}
