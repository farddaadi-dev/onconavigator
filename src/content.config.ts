import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { diseaseSchema } from "./schemas/disease.ts";
import { drugSchema } from "./schemas/drug.ts";
import { regimenSchema } from "./schemas/regimen.ts";
import { sourceSchema } from "./schemas/source.ts";
import { supportiveCareSchema } from "./schemas/supportiveCare.ts";

const diseases = defineCollection({
  loader: glob({
    base: "./src/content/diseases",
    pattern: "**/*.yaml",
  }),
  schema: diseaseSchema,
});

const drugs = defineCollection({
  loader: glob({
    base: "./src/content/drugs",
    pattern: "**/*.yaml",
  }),
  schema: drugSchema,
});

const regimens = defineCollection({
  loader: glob({
    base: "./src/content/regimens",
    pattern: "**/*.yaml",
  }),
  schema: regimenSchema,
});

const sources = defineCollection({
  loader: glob({
    base: "./src/content/sources",
    pattern: "**/*.yaml",
  }),
  schema: sourceSchema,
});

const supportiveCare = defineCollection({
  loader: glob({
    base: "./src/content/supportive-care",
    pattern: "**/*.yaml",
  }),
  schema: supportiveCareSchema,
});

export const collections = {
  diseases,
  drugs,
  regimens,
  sources,
  supportiveCare,
};
