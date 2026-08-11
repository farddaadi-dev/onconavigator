import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                          Treatment Context Schema                          */
/* -------------------------------------------------------------------------- */

const treatmentContextSchema = z.object({
  setting: z.string().min(1),
  lineOfTherapy: z.string().min(1),
  regimens: z.array(identifierSchema).default([]),
});

/* -------------------------------------------------------------------------- */
/*                              Category Schema                               */
/* -------------------------------------------------------------------------- */

const categorySchema = z.object({
  id: identifierSchema,
  title: z.string().min(1),
  treatment: z.array(treatmentContextSchema).default([]),
});

/* -------------------------------------------------------------------------- */
/*                               Disease Schema                               */
/* -------------------------------------------------------------------------- */

export const diseaseSchema = z.object({
  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,
  title: z.string().min(1),
  aliases: z.array(z.string()).default([]),

  /* ------------------------------ Categories ------------------------------ */

  categories: z.array(categorySchema).default([]),

  /* ------------------------------ Treatment ------------------------------- */

  treatment: z.array(treatmentContextSchema).default([]),

  /* ---------------------------- Supportive Care --------------------------- */

  supportiveCare: z.array(identifierSchema).default([]),

  /* ----------------------------- Governance ------------------------------- */

  references: referenceListSchema,
  review: reviewSchema,
});