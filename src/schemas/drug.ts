import { z } from "astro:content";
import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                                   Enums                                    */
/* -------------------------------------------------------------------------- */

export const drugClassSchema = z.enum([
  "chemotherapy",
  "targeted-therapy",
  "immunotherapy",
  "hormonal-therapy",
  "supportive-care",
  "radiopharmaceutical",
  "other",
]);

/* -------------------------------------------------------------------------- */
/*                        Classification Schema                              */
/* -------------------------------------------------------------------------- */

const classificationSchema = z.object({
  class: drugClassSchema,
  subclass: z.string().optional(),
  molecularTargets: z.array(identifierSchema).default([]),
});

/* -------------------------------------------------------------------------- */
/*                           Indications Schema                               */
/* -------------------------------------------------------------------------- */

const indicationsSchema = z.object({
  diseases: z.array(identifierSchema).default([]),
  usedInRegimens: z.array(identifierSchema).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Dosage Form Schema                                 */
/* -------------------------------------------------------------------------- */

const dosageFormSchema = z.object({
  formulation: z.string().min(1),
  strengths: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                      Dose Modification Schema                              */
/* -------------------------------------------------------------------------- */

const doseModificationSchema = z.object({
  renalImpairment: z.array(z.string()).default([]),
  hepaticImpairment: z.array(z.string()).default([]),
  hematologicToxicity: z.array(z.string()).default([]),
  neurologicToxicity: z.array(z.string()).default([]),
  cardiacToxicity: z.array(z.string()).default([]),
  infusionReaction: z.array(z.string()).default([]),
  other: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                               Drug Schema                                  */
/* -------------------------------------------------------------------------- */

export const drugSchema = z.object({

  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,
  title: z.string().min(1),
  aliases: z.array(z.string()).default([]),

  /* ---------------------------- Classification ---------------------------- */

  classification: classificationSchema,

  /* ----------------------------- Indications ------------------------------ */

  indications: indicationsSchema,

  /* -------------------------- Pharmaceutical Data ------------------------- */

  dosageForms: z.array(dosageFormSchema).default([]),

  /* -------------------------- Dose Modifications --------------------------- */

  doseModifications: doseModificationSchema,

  /* ----------------------------- Governance ------------------------------- */

  references: referenceListSchema,
  review: reviewSchema,
});

