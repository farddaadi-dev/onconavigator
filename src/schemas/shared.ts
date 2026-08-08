import { z } from "astro:content";

/**
 * Unique identifier used for relationships between knowledge objects.
 *
 * Examples:
 * - dlbcl
 * - r-chop
 * - rituximab
 */
export const identifierSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Identifier must use lowercase letters, numbers, and hyphens only."
  );

/* -------------------------------------------------------------------------- */
/*                            Publication Type                                */
/* -------------------------------------------------------------------------- */

/**
 * High-level publication categories used throughout the knowledge base.
 */
export const publicationTypeSchema = z.enum([
  "guideline",
  "journal-article",
  "book",
  "product-monograph",
  "website",
  "conference",
  "other",
]);

/* -------------------------------------------------------------------------- */
/*                            Cycle Range Schema                              */
/* -------------------------------------------------------------------------- */

/**
 * Defines a range of treatment cycles.
 *
 * Examples:
 * - Cycles 1–4
 * - Cycles 5–8
 */
export const cycleRangeSchema = z.object({
  start: z.number().int().positive(),

  end: z.number().int().positive(),
});

/**
 * Review metadata for clinical content.
 *
 * Every clinical knowledge object should include
 * information about when and by whom it was reviewed.
 */
export const reviewSchema = z.object({
  lastReviewed: z.coerce.date(),

  reviewedBy: identifierSchema,

  nextReview: z.coerce.date().optional(),
});

/**
 * Citation information.
 *
 * Used to connect clinical statements with their supporting sources.
 */
export const citationSchema = z.object({
  source: identifierSchema,

  note: z.string().optional(),
});

/**
 * A reusable list of references.
 *
 * References point to Source entities.
 */
export const referenceListSchema = z
  .array(identifierSchema)
  .default([]);