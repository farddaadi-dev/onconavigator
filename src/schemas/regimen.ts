import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

import { medicationSchema } from "./medication";
import { scheduleSchema } from "./schedule.ts";

/* -------------------------------------------------------------------------- */
/*                                   Enums                                    */
/* -------------------------------------------------------------------------- */

export const treatmentIntentSchema = z.enum([
  "curative",
  "adjuvant",
  "neoadjuvant",
  "definitive",
  "maintenance",
  "palliative",
]);

export const lineOfTherapySchema = z.enum([
  "first-line",
  "second-line",
  "third-line",
  "later-line",
]);

/* -------------------------------------------------------------------------- */
/*                           Monitoring Schema                                */
/* -------------------------------------------------------------------------- */

const monitoringSchema = z.object({
  beforeEachCycle: z.array(z.string()).default([]),

  duringTreatment: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                      Pre-treatment Measures Schema                         */
/* -------------------------------------------------------------------------- */

const preTreatmentAssessmentSchema = z.object({
  diagnosis: z.array(z.string()).default([]),

  clinical: z.array(z.string()).default([]),

  laboratory: z.array(z.string()).default([]),

  infectionScreening: z.array(z.string()).default([]),

  imaging: z.array(z.string()).default([]),

  calculations: z.array(z.string()).default([]),

  counselling: z.array(z.string()).default([]),

  other: z.array(z.string()).default([]),
});

const treatmentPreparationSchema = z.object({
  premedications: z.array(z.string()).default([]),

  antiemetics: z.array(z.string()).default([]),

  hydration: z.array(z.string()).default([]),

  prophylaxis: z.array(z.string()).default([]),

  other: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                              Follow up Schema                                */
/* -------------------------------------------------------------------------- */

const followUpSchema = z.object({
  responseAssessment: z.array(z.string()).default([]),

  postTreatmentEvaluation: z.array(z.string()).default([]),

  surveillance: z.array(z.string()).default([]),

  other: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                              Regimen Schema                                */
/* -------------------------------------------------------------------------- */

export const regimenSchema = z.object({
  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,
  
  title: z.string().min(1),

  aliases: z.array(z.string()).default([]),

  /* --------------------------- Clinical Context --------------------------- */

  diseases: z.array(identifierSchema).min(1),

  intent: treatmentIntentSchema,

  setting: z.string(),

  lineOfTherapy: lineOfTherapySchema,

  biomarkers: z.array(identifierSchema).default([]),

  /* -------------------------- Clinical Workflow --------------------------- */

  eligibility: z.array(z.string()).default([]),

  schedule: scheduleSchema,

  preTreatmentAssessment: preTreatmentAssessmentSchema,

  treatmentPreparation: treatmentPreparationSchema,

  medications: z.array(medicationSchema).min(1),

  monitoring: monitoringSchema,

  supportiveCare: z.array(identifierSchema).default([]),

  doseModifications: z.array(z.string()).default([]),

  followUp: followUpSchema,

  /* ----------------------------- Governance ------------------------------ */

  references: referenceListSchema,

  review: reviewSchema,
});