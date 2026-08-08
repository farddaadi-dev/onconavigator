import { z } from "astro:content";

import {
  identifierSchema,
  referenceListSchema,
  reviewSchema,
} from "./shared.ts";

/* -------------------------------------------------------------------------- */
/*                         Clinical Context Schema                            */
/* -------------------------------------------------------------------------- */

const clinicalContextSchema = z.object({

  category: z.array(identifierSchema).default([]),

  behavior: z.array(identifierSchema).default([]),

});

/* -------------------------------------------------------------------------- */
/*                            Diagnosis Schema                                */
/* -------------------------------------------------------------------------- */

const diagnosisSchema = z.object({

  pathology: z.array(z.string()).default([]),

  immunophenotype: z.array(identifierSchema).default([]),

  molecularTesting: z.array(identifierSchema).default([]),

  imaging: z.array(z.string()).default([]),

  other: z.array(z.string()).default([]),

});

/* -------------------------------------------------------------------------- */
/*                           Biomarker Schema                                 */
/* -------------------------------------------------------------------------- */

const biomarkerSchema = z.object({

  required: z.array(identifierSchema).default([]),

  diagnostic: z.array(identifierSchema).default([]),

  predictive: z.array(identifierSchema).default([]),

  prognostic: z.array(identifierSchema).default([]),

  other: z.array(identifierSchema).default([]),

});

/* -------------------------------------------------------------------------- */
/*                            Staging Schema                                  */
/* -------------------------------------------------------------------------- */

const stagingSchema = z.object({

  system: z.string().optional(),

  assessments: z.array(z.string()).default([]),

  notes: z.array(z.string()).default([]),

});

/* -------------------------------------------------------------------------- */
/*                          Treatment Schema                                  */
/* -------------------------------------------------------------------------- */

const treatmentSchema = z.object({

  firstLine: z.array(identifierSchema).default([]),

  secondLine: z.array(identifierSchema).default([]),

  laterLine: z.array(identifierSchema).default([]),

  maintenance: z.array(identifierSchema).default([]),

  supportiveCare: z.array(identifierSchema).default([]),

  other: z.array(identifierSchema).default([]),

});

/* -------------------------------------------------------------------------- */
/*                           Follow-up Schema                                 */
/* -------------------------------------------------------------------------- */

const followUpSchema = z.object({

  responseAssessment: z.array(z.string()).default([]),

  surveillance: z.array(z.string()).default([]),

  survivorship: z.array(z.string()).default([]),

  other: z.array(z.string()).default([]),

});

/* -------------------------------------------------------------------------- */
/*                               Disease Schema                               */
/* -------------------------------------------------------------------------- */

export const diseaseSchema = z.object({

  

  id: identifierSchema,

  title: z.string().min(1),

  aliases: z.array(z.string()).default([]),

  clinicalContext: clinicalContextSchema,

  diagnosis: diagnosisSchema,

  biomarkers: biomarkerSchema,

  staging: stagingSchema,
  
  treatment: treatmentSchema,

  followUp: followUpSchema,

  references: referenceListSchema,

  review: reviewSchema,

});