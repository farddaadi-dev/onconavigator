import { z } from "astro:content";

import {
  cycleRangeSchema,
  identifierSchema,
  referenceListSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                                  Enums                                     */
/* -------------------------------------------------------------------------- */

export const doseTypeSchema = z.enum([
  "flat",
  "bsa",
  "weight",
  "auc",
  "other",
]);

export const routeSchema = z.enum([
  "IV",
  "PO",
  "SC",
  "IM",
  "IT",
]);

/* -------------------------------------------------------------------------- */
/*                               Dose Schema                                  */
/* -------------------------------------------------------------------------- */

export const doseSchema = z.object({
  value: z.number(),

  unit: z.string().min(1),

  type: doseTypeSchema,
});

/* -------------------------------------------------------------------------- */
/*                           Administration Schema                            */
/* -------------------------------------------------------------------------- */

export const administrationSchema = z.object({
  route: routeSchema,

  administrationDays: z
    .array(z.number().int().positive())
    .min(1),

  diluent: z.string().optional(),

  volume: z
    .object({
      value: z.number().positive(),
      unit: z.string().min(1),
    })
    .optional(),

  infusionDuration: z.string().optional(),

  notes: z.string().optional(),
});
/* -------------------------------------------------------------------------- */
/*                             Condition Schema                               */
/* -------------------------------------------------------------------------- */

export const conditionSchema = z.object({
  cycleRange: cycleRangeSchema.optional(),
});

/* -------------------------------------------------------------------------- */
/*                         Medication Rule Schema                             */
/* -------------------------------------------------------------------------- */

export const medicationRuleSchema = z.object({
  condition: conditionSchema.optional(),

  dose: doseSchema,

  administration: administrationSchema,

  notes: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                           Medication Schema                                */
/* -------------------------------------------------------------------------- */

export const medicationSchema = z.object({
  drug: identifierSchema,

  indication: z.string().optional(),

  rules: z
    .array(medicationRuleSchema)
    .min(1),

  preparationNotes: z.string().optional(),

  infusionNotes: z.string().optional(),

  monitoringNotes: z.string().optional(),

  comments: z.string().optional(),

  references: referenceListSchema,
});