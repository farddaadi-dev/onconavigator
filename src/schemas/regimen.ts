import { z } from "astro:content";

import {
  cycleRangeSchema,
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
  "palliative",
]);

export const treatmentSettingSchema = z.enum([
  "adjuvant",
  "neoadjuvant",
  "metastatic",
  "induction",
  "consolidation",
  "maintenance",
  "newly-diagnosed",
]);

export const lineOfTherapySchema = z.enum([
  "first-line",
  "second-line",
  "third-line",
  "subsequent-line",
]);

export const regimenTypeSchema = z.enum([
  "standalone",
  "composite",
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



const treatmentPreparationSchema = z.object({
  premedications: z.array(z.string()).default([]),
  antiemeticRisk: emetogenicRiskSchema,
  hydration: z.array(z.string()).default([]),
  prophylaxis: z.array(z.string()).default([]),
  other: z.array(z.string()).default([]),
});

/* -------------------------------------------------------------------------- */
/*                         Regimen Component Schema                           */
/* -------------------------------------------------------------------------- */

const regimenComponentSchema = z.object({
  regimen: identifierSchema,
  cycleRange: cycleRangeSchema.optional(),
  notes: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                           Common Regimen Fields                            */
/* -------------------------------------------------------------------------- */

const regimenBaseSchema = z.object({
  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  aliases: z.array(z.string()).default([]),

  /* --------------------------- Clinical Context --------------------------- */

  diseases: z.array(identifierSchema).min(1),
  treatmentIntent: z.array(treatmentIntentSchema).min(1),
  setting: z.array(treatmentSettingSchema).min(1),
  lineOfTherapy: z.array(lineOfTherapySchema).min(1),
  biomarkers: z.array(identifierSchema).default([]),

  /* ----------------------------- Eligibility ----------------------------- */

  eligibility: z.array(z.string()).default([]),

  /* ------------------------------- Schedule ------------------------------- */

  schedule: scheduleSchema,

  /* ------------------------- Pre-treatment Workflow ---------------------- */

  preTreatmentAssessment: preTreatmentAssessmentSchema,
  treatmentPreparation: treatmentPreparationSchema,

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

/* -------------------------------------------------------------------------- */
/*                         Standalone Regimen Schema                           */
/* -------------------------------------------------------------------------- */

const standaloneRegimenSchema = regimenBaseSchema.extend({
  type: z.literal("standalone"),

  medications: z.array(medicationSchema).min(1),
});

/* -------------------------------------------------------------------------- */
/*                          Composite Regimen Schema                           */
/* -------------------------------------------------------------------------- */

const compositeRegimenSchema = regimenBaseSchema.extend({
  type: z.literal("composite"),

  components: z.array(regimenComponentSchema).min(1),
});

/* -------------------------------------------------------------------------- */
/*                              Regimen Schema                                */
/* -------------------------------------------------------------------------- */

export const regimenSchema = z.discriminatedUnion("type", [
  standaloneRegimenSchema,
  compositeRegimenSchema,
]);