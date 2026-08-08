import { z } from "astro:content";
import { cycleRangeSchema } from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                                   Enums                                    */
/* -------------------------------------------------------------------------- */

export const timeUnitSchema = z.enum([
  "days",
  "weeks",
]);

export const durationUnitSchema = z.enum([
  "weeks",
  "months",
  "years",
]);

/* -------------------------------------------------------------------------- */
/*                               Cycle Schema                                 */
/* -------------------------------------------------------------------------- */

/**
 * Defines the repeating treatment cycle.
 *
 * Examples:
 * - 21-day cycle
 * - 14-day cycle
 * - 8-week maintenance cycle
 */
export const cycleSchema = z.object({
  length: z.object({
    value: z.number().positive(),

    unit: timeUnitSchema,
  }),
});

/* -------------------------------------------------------------------------- */
/*                           Stop Condition Schema                            */
/* -------------------------------------------------------------------------- */

/**
 * Defines when treatment should stop.
 *
 * A regimen may have:
 * - a planned number of cycles,
 * - a planned duration,
 * - continue until progression,
 * - continue until unacceptable toxicity,
 * - or a combination of these.
 */
export const stopConditionSchema = z.object({
  plannedCycles: z.number().int().positive().optional(),

  duration: z
    .object({
      value: z.number().positive(),

      unit: durationUnitSchema,
    })
    .optional(),

  untilProgression: z.boolean().optional(),

  untilUnacceptableToxicity: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                         Treatment Phase Schema                             */
/* -------------------------------------------------------------------------- */

/**
 * Represents one phase of treatment.
 *
 * Examples:
 * - AC (cycles 1–4)
 * - Paclitaxel (cycles 5–8)
 * - Induction
 * - Maintenance
 */
export const treatmentPhaseSchema = z.object({
  name: z.string().min(1),

  cycleRange: cycleRangeSchema,
  description: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                              Schedule Schema                               */
/* -------------------------------------------------------------------------- */

/**
 * Defines the overall timing of a treatment regimen.
 */
export const scheduleSchema = z.object({
  cycle: cycleSchema.optional(),

  stopCondition: stopConditionSchema,

  treatmentPhases: z
    .array(treatmentPhaseSchema)
    .default([]),

  notes: z.string().optional(),
});