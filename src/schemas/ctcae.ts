import { z } from "astro:content";

import {
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";


const ctcaeGradeSchema = z.object({
  grade: z.string(),
  definition: z.string(),
});


export const ctcaeSchema = z.object({

  id: z.string(),

  title: z.string(),

  version: z.string(),

  term: z.string(),

  category: z.string(),

  grades: z.array(ctcaeGradeSchema),

  references: referenceListSchema,

  review: reviewSchema,

});