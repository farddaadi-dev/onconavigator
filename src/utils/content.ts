import { getCollection, type CollectionEntry } from "astro:content";

type ContentCollection = "diseases" | "drugs" | "regimens" | "sources" | "supportiveCare";

async function getEntryById<TCollection extends ContentCollection>(
  collection: TCollection,
  id: string,
): Promise<CollectionEntry<TCollection> | undefined> {
  const entries = await getCollection(collection);

  return entries.find((entry) => entry.data.id === id);
}

/** Returns a disease entry by its stable clinical identifier. */
export function getDiseaseById(id: string) {
  return getEntryById("diseases", id);
}

/** Returns a regimen entry by its stable clinical identifier. */
export function getRegimenById(id: string) {
  return getEntryById("regimens", id);
}

/** Returns a drug entry by its stable clinical identifier. */
export function getDrugById(id: string) {
  return getEntryById("drugs", id);
}

/** Returns a supportive care entry by its stable clinical identifier. */
export function getSupportiveCareById(id: string) {
  return getEntryById("supportiveCare", id);
}

/** Returns a source entry by its stable clinical identifier. */
export function getSourceById(id: string) {
  return getEntryById("sources", id);
}
