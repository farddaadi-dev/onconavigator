import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";


/* -------------------------------------------------------------------------- */
/*                         Supportive Care Schema                             */
/* -------------------------------------------------------------------------- */

export const supportiveCareCategorySchema = z.enum([
  "infection-prevention",
  "toxicity-prevention",
  "symptom-management",
  "treatment-support",
  "other",
]);


export const supportiveCareSchema = z.object({

  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,

  title: z.string().min(1),

  aliases: z.array(z.string()).default([]),


  /* ----------------------------- Classification ---------------------------- */

  category: supportiveCareCategorySchema,


  /* ----------------------------- Clinical Use ----------------------------- */

  indications: z.array(z.string()).default([]),

  clinicalUse: z.array(z.string()).default([]),


  /* ----------------------------- Management ------------------------------- */

  monitoring: z.array(z.string()).default([]),

  safety: z.array(z.string()).default([]),


  /* ----------------------------- Governance ------------------------------ */

  references: referenceListSchema,

  review: reviewSchema,

});