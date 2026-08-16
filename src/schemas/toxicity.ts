import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                              Toxicity Category                             */
/* -------------------------------------------------------------------------- */

export const toxicityCategorySchema = z.enum([
  "hematologic",
  "neurologic",
  "gastrointestinal",
  "cardiac",
  "renal",
  "hepatic",
  "immunologic",
  "other",
]);

/* -------------------------------------------------------------------------- */
/*                               CTCAE Data                                   */
/* -------------------------------------------------------------------------- */

const ctcaeSchema = z.object({
  id: z.string(),
  version: z.string(),
  term: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              Toxicity Grade                                */
/* -------------------------------------------------------------------------- */

const toxicityGradeSchema = z.object({
  grade: z.string(),
  definition: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              Toxicity Schema                               */
/* -------------------------------------------------------------------------- */

export const toxicitySchema = z.object({

  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,

  title: z.string().min(1),


  /* ----------------------------- Classification --------------------------- */

  category: toxicityCategorySchema,


  /* ------------------------------- CTCAE --------------------------------- */

  ctcae: ctcaeSchema,


  /* -------------------------------- Grades -------------------------------- */

  grades: z.array(toxicityGradeSchema).default([]),


  /* ------------------------------ Governance ------------------------------ */

  references: referenceListSchema,

  review: reviewSchema,

});