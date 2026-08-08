import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

import { routeSchema } from "./medication.ts";

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
/*                        Classification Schema                               */
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
/*                          Dosage Form Schema                                */
/* -------------------------------------------------------------------------- */

const dosageFormSchema = z.object({
  formulation: z.string().min(1),

  strengths: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Administration Schema                              */
/* -------------------------------------------------------------------------- */

const administrationSchema = z.object({
  routes: z.array(routeSchema).min(1),

  preparation: z.array(z.string()).default([]),

  infusion: z.array(z.string()).default([]),

  premedications: z.array(z.string()).default([]),

  specialInstructions: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                           Monitoring Schema                                */
/* -------------------------------------------------------------------------- */

const monitoringSchema = z.object({
  baseline: z.array(z.string()).default([]),

  duringTreatment: z.array(z.string()).default([]),

  longTerm: z.array(z.string()).default([]),
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
/*                              Safety Schema                                 */
/* -------------------------------------------------------------------------- */

const safetySchema = z.object({
  contraindications: z.array(z.string()).default([]),

  warnings: z.array(z.string()).default([]),

  commonAdverseEffects: z.array(z.string()).default([]),

  seriousAdverseEffects: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Supportive Care Schema                             */
/* -------------------------------------------------------------------------- */

const supportiveCareSchema = z.object({
  topics: z.array(identifierSchema).default([]),
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

  /* ------------------------- Pharmaceutical Data -------------------------- */

  dosageForms: z.array(dosageFormSchema).default([]),

  administration: administrationSchema,

  /* -------------------------- Clinical Management ------------------------- */

  monitoring: monitoringSchema,

  doseModifications: doseModificationSchema,

  safety: safetySchema,

  supportiveCare: supportiveCareSchema,

  /* ----------------------------- Governance ------------------------------ */

  references: referenceListSchema,

  review: reviewSchema,
});