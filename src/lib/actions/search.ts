"use server";

import { searchCatalogue } from "@/lib/db/queries/search";

export async function searchCatalogueAction(query: string) {
  return searchCatalogue(query);
}
