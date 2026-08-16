import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";


const doseModificationActionSchema = z.object({
  action: z.string(),
  notes: z.string().optional(),
});


const toxicityActionSchema = z.object({

  toxicity: identifierSchema,

  grades: z.array(
    z.object({
      grade: z.string(),

      actions: z.array(
        doseModificationActionSchema
      ),
    })
  ),

});


export const doseModificationSchema = z.object({

  id: identifierSchema,

  title: z.string(),

  regimen: identifierSchema,

  medication: identifierSchema,

  toxicity: z.array(toxicityActionSchema),

  references: referenceListSchema,

  review: reviewSchema,

});