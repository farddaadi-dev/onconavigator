import { z } from "astro:content";

import {
  identifierSchema,
  publicationTypeSchema,
  reviewSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                               Access Schema                                */
/* -------------------------------------------------------------------------- */

const accessSchema = z.object({
  url: z.string().url().optional(),

  requiresSubscription: z.boolean().default(false),

  notes: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                            Publication Schema                              */
/* -------------------------------------------------------------------------- */

const publicationSchema = z.object({
  type: publicationTypeSchema,

  publisher: z.string().min(1),

  year: z.number().int().positive(),

  version: z.string().optional(),

  previousVersions: z.array(z.string()).default([]),

  citation: z.string().min(1),
});

/* -------------------------------------------------------------------------- */
/*                               Source Schema                                */
/* -------------------------------------------------------------------------- */

export const sourceSchema = z.object({
  /* ------------------------------- Identity ------------------------------- */

  id: identifierSchema,

  title: z.string().min(1),

  aliases: z.array(z.string()).default([]),

  /* ----------------------------- Publication ----------------------------- */

  publication: publicationSchema,

  /* -------------------------------- Access -------------------------------- */

  access: accessSchema,

  /* ------------------------------- Discovery ------------------------------ */

  keywords: z.array(identifierSchema).default([]),

  /* ------------------------------ Governance ------------------------------ */

  review: reviewSchema,
});