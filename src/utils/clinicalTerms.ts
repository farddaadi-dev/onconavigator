import { clinicalTerms } from "@/data/clinicalTerms";

export function getClinicalLabel(id: string): string {
  return clinicalTerms[id] ?? id;
}