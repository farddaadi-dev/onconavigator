import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { toxicitySchema } from "./schemas/toxicity";
import { diseaseSchema } from "./schemas/disease.ts";
import { drugSchema } from "./schemas/drug.ts";
import { regimenSchema } from "./schemas/regimen.ts";
import { sourceSchema } from "./schemas/source.ts";
import { supportiveCareSchema } from "./schemas/supportiveCare.ts";
import { ctcaeSchema } from "./schemas/ctcae.ts";
import { doseModificationSchema } from "./schemas/doseModification.ts";

const ctcae = defineCollection({
  loader: glob({
    base: "./src/content/ctcae",
    pattern: "**/*.yaml",
  }),
  schema: ctcaeSchema,
});

const diseases = defineCollection({
  loader: glob({
    base: "./src/content/diseases",
    pattern: "**/*.yaml",
  }),
  schema: diseaseSchema,
});

const doseModifications = defineCollection({

  loader: glob({
    base: "./src/content/dose-modifications",
    pattern: "**/*.yaml",
  }),

  schema: doseModificationSchema,

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

const toxicities = defineCollection({
  loader: glob({
    base: "./src/content/toxicities",
    pattern: "**/*.yaml",
  }),
  schema: toxicitySchema,
});

export const collections = {
  ctcae,
  diseases,
  doseModifications,
  drugs,
  regimens,
  sources,
  supportiveCare,
  toxicities,
};
