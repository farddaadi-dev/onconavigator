import { z } from "astro:content";

import {
  identifierSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                         Antiemetic Recommendation                          */
/* -------------------------------------------------------------------------- */

export const antiemeticRecommendationSchema = z.object({
  drug: identifierSchema,

  dose: z.string(),

  route: z.string(),

  timing: z.string().optional(),

  duration: z.string().optional(),

  notes: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                         Antiemetic Protocol                                */
/* -------------------------------------------------------------------------- */

export const antiemeticProtocolSchema = z.object({
  risk: z.enum([
    "minimal",
    "low",
    "moderate",
    "high",
  ]),

  description: z.string(),

  recommendations: z.array(
    antiemeticRecommendationSchema,
  ).default([]),
});