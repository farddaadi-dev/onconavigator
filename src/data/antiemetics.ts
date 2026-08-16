import { z } from "zod";

import { antiemeticProtocolSchema } from "@/schemas/antiemetic";

export type AntiemeticProtocol = z.infer<
  typeof antiemeticProtocolSchema
>;

export const antiemeticProtocols: Record<
  AntiemeticProtocol["risk"],
  AntiemeticProtocol
> = {
  minimal: {
    risk: "minimal",

    description:
      "Routine antiemetic prophylaxis is not recommended.",

    recommendations: [],
  },

  low: {
  risk: "low",

  description:
    "A single dose of dexamethasone is recommended before chemotherapy.",

  recommendations: [
    {
      drug: "dexamethasone",
      dose: "8 mg",
      route: "IV",
      timing: "Before chemotherapy",
    },
  ],
},

  moderate: {
  risk: "moderate",

  description:
    "An NK1 receptor antagonist, 5-HT3 receptor antagonist plus dexamethasone is recommended before chemotherapy.",

  recommendations: [
    {
      drug: "aprepitant",
      dose: "125 mg",
      route: "PO",
      timing: "Day 1 before chemotherapy",
    },
    {
      drug: "aprepitant",
      dose: "80 mg",
      route: "PO",
      timing: "Days 2–3",
    },
    {
      drug: "granisetron",
      dose: "3 mg",
      route: "IV",
      timing: "Before chemotherapy",
    },
    {
      drug: "dexamethasone",
      dose: "12 mg",
      route: "IV",
      timing: "Before chemotherapy",
    },
  ],
},

  high: {
  risk: "high",

  description:
    "Four-drug antiemetic prophylaxis with an NK1 receptor antagonist, a 5-HT3 receptor antagonist, dexamethasone, and olanzapine.",

  recommendations: [
    {
      drug: "aprepitant",
      dose: "125 mg",
      route: "PO",
      timing: "Day 1 before chemotherapy",
    },
    {
      drug: "aprepitant",
      dose: "80 mg",
      route: "PO",
      timing: "Days 2–3",
    },
    {
      drug: "granisetron",
      dose: "3 mg",
      route: "IV",
      timing: "Day 1 before chemotherapy",
    },
    {
      drug: "dexamethasone",
      dose: "12 mg",
      route: "IV",
      timing: "Day 1 before chemotherapy",
    },
    {
      drug: "olanzapine",
      dose: "2.5 mg",
      route: "PO",
      timing: "At bedtime, days 1–4",
    },
  ],
},
};