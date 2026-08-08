import { defineCollection } from "astro:content";

import { diseaseSchema } from "./schemas/disease.ts";
import { drugSchema } from "./schemas/drug.ts";
import { regimenSchema } from "./schemas/regimen.ts";
import { sourceSchema } from "./schemas/source.ts";

const diseases = defineCollection({
  type: "data",
  schema: diseaseSchema,
});

const drugs = defineCollection({
  type: "data",
  schema: drugSchema,
});

const regimens = defineCollection({
  type: "data",
  schema: regimenSchema,
});

const sources = defineCollection({
  type: "data",
  schema: sourceSchema,
});

export const collections = {
  diseases,
  drugs,
  regimens,
  sources,
};