import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

import {
  doseSchema,
  medicationSchema,
  routeSchema,
} from "./medication.ts";
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
/*                              Monitoring Schema                             */
/* -------------------------------------------------------------------------- */

const monitoringSchema = z.object({
  beforeEachCycle: z.array(z.string()).default([]),
  duringTreatment: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Pre-treatment Assessment                           */
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

/* -------------------------------------------------------------------------- */
/*                           Treatment Preparation                            */
/* -------------------------------------------------------------------------- */

const emetogenicRiskSchema = z.enum([
  "minimal",
  "low",
  "moderate",
  "high",
]);

const antiemeticMedicationSchema = z.object({
  drug: identifierSchema,
  dose: doseSchema,
  administration: z.object({
    route: routeSchema,
    timing: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const antiemeticSchema = z.object({
  risk: emetogenicRiskSchema,
  medications: z.array(antiemeticMedicationSchema).default([]),
});

const treatmentPreparationSchema = z.object({
  premedications: z.array(z.string()).default([]),
  antiemetics: antiemeticSchema,
  hydration: z.array(z.string()).default([]),
  prophylaxis: z.array(z.string()).default([]),
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

  setting: z.string().min(1),

  lineOfTherapy: lineOfTherapySchema,

  biomarkers: z.array(identifierSchema).default([]),

  /* ----------------------------- Eligibility ----------------------------- */

  eligibility: z.array(z.string()).default([]),

  /* ------------------------------- Schedule ------------------------------- */

  schedule: scheduleSchema,

  /* ------------------------- Pre-treatment Workflow ---------------------- */

  preTreatmentAssessment: preTreatmentAssessmentSchema,

  treatmentPreparation: treatmentPreparationSchema,

  /* ------------------------------ Medications ----------------------------- */

  medications: z.array(medicationSchema).min(1),

  /* ------------------------------- Monitoring ----------------------------- */

  monitoring: monitoringSchema,

  /* ---------------------------- Supportive Care --------------------------- */

  supportiveCare: z.array(identifierSchema).default([]),

  /* -------------------------- Dose Modifications -------------------------- */

  doseModifications: z.array(z.string()).default([]),

  /* ----------------------------- Governance ------------------------------- */

  references: referenceListSchema,

  review: reviewSchema,
});