# OncoNavigator Data Model

## Purpose

This document defines the conceptual data model for OncoNavigator.

The goal is to represent oncology knowledge as structured, connected, source-traceable information rather than as a collection of documents.

The data model should support:

- Rapid clinical navigation.
- Clear relationships between diseases, regimens, drugs, and supportive care.
- Transparent provenance and review history.
- Future expansion without restructuring existing content.

---

# Data Model Principles

## 1. Structured, not document-first

Clinical knowledge should exist as structured information that can be searched, linked, and displayed in multiple ways.

Documents and references support knowledge but are not the primary structure.

---

## 2. One source of truth

Each clinical concept should exist only once.

Examples:

- Rituximab should have one drug entry.
- Tumor lysis syndrome should have one clinical support entry.
- A guideline should have one source entry.

Other content should reference these entities rather than duplicate information.

---

## 3. Separation of structured data and narrative

Structured data describes information that the application needs to process.

Examples:

- Drug name
- Dose
- Cycle length
- Biomarkers
- Relationships

Narrative content explains information for clinicians.

Examples:

- Clinical considerations
- Practical notes
- Explanations
- Pearls

---

## 4. Traceability

Every substantive clinical statement should be traceable to:

- Source
- Review date
- Version information when available
- Evidence level when appropriate

---

# Core Content Collections

Initial content collections:

```text
src/content/

├── diseases
├── regimens
├── drugs
├── clinical-support
└── sources
```

Future collections may include:

```text
├── pearls
├── trials
├── guidelines
└── calculators
```

---

# Disease Entity

## Purpose

Represents a disease or disease category.

Examples:

- Diffuse Large B-cell Lymphoma
- HER2-positive Breast Cancer
- Non-small Cell Lung Cancer

---

## Structure

```yaml
title:
aliases:
category:
classification:

diagnosis:
staging:
biomarkers:

relatedRegimens:

references:

review:
  lastReviewed:
  reviewedBy:
```

---

## Example

```yaml
title: Diffuse Large B-cell Lymphoma

aliases:
  - DLBCL

classification:
  - Aggressive B-cell lymphoma

biomarkers:
  - CD20
  - MYC
  - BCL2

relatedRegimens:
  - r-chop
  - da-r-epoch
```

---

# Regimen Entity

## Purpose

Represents a complete oncology treatment plan.

A regimen is not simply a list of drugs.

A regimen contains:

- Clinical indication.
- Treatment intent.
- Schedule.
- Medication administration plan.
- Monitoring.
- Supportive care.
- References.

---

# Regimen Structure

```yaml
title:
aliases:

disease:
intent:
setting:
lineOfTherapy:

schedule:

medications:

premedications:

monitoring:

supportiveCare:

doseModifications:

references:

review:
  lastReviewed:
  reviewedBy:
```

---

# Clinical Context

Defines when and why the regimen is used.

```yaml
disease:
  - dlbcl

intent:
  - curative

setting:
  - newly-diagnosed

lineOfTherapy:
  - first-line
```

---

# Treatment Schedule

Defines the overall treatment timeline.

```yaml
schedule:

  cycleLength:
    value: 21
    unit: days

  numberOfCycles:
    value: 6
```

---

# Medication Administration Plan

## Purpose

Defines exactly how each drug is administered.

A medication entry should include:

- Drug reference.
- Dose.
- Dose type.
- Unit.
- Route.
- Administration day.
- Cycle rules.

---

## Structure

```yaml
medications:

  - drug:
      rituximab

    dose:
      value: 375
      unit: mg/m2

    doseType:
      - bsa

    route:
      - IV

    administrationDay:
      - 1

    cycleRule:
      - all
```

---

# Supported Dose Types

The model should support:

```text
flat dose

mg/m2 (body surface area)

mg/kg (weight based)

AUC

percentage adjustment

other
```

Examples:

```yaml
doseType:
  - bsa
```

```yaml
doseType:
  - weight
```

```yaml
doseType:
  - auc
```

---

# Cycle-Specific Dose Rules

Some drugs have different doses depending on the cycle.

Example:

Trastuzumab:

```yaml
doseRules:

  - condition:
      cycle: 1

    dose:
      value: 8
      unit: mg/kg

  - condition:
      cycle:
        greaterThan: 1

    dose:
      value: 6
      unit: mg/kg
```

---

# Dose Modification Framework

The initial version should define the structure without requiring complete modification tables.

Future examples:

```yaml
doseModifications:

  - drug:
      vincristine

    toxicity:
      neuropathy

    action:
      reduce
```

Possible future parameters:

- Neutropenia
- Thrombocytopenia
- Renal impairment
- Hepatic impairment
- Neuropathy
- Other organ toxicities

---

# Premedications

Defines medications used to prevent or reduce treatment complications.

Example:

```yaml
premedications:

  - drug:
      dexamethasone

    purpose:
      hypersensitivity prevention
```

---

# Monitoring

Defines baseline and treatment monitoring.

Example:

```yaml
monitoring:

  baseline:
    - CBC
    - CMP
    - Hepatitis B screening
    - Echocardiogram

  duringTreatment:
    - CBC
    - CMP
```

---

# Drug Entity

## Purpose

Represents a medication independently from any single regimen.

A drug may belong to multiple regimens.

---

## Structure

```yaml
title:

aliases:

class:

mechanism:

targets:

indications:

administration:

monitoring:

toxicities:

references:

review:
  lastReviewed:
  reviewedBy:
```

---

## Example

```yaml
title: Rituximab

class:
  - Anti-CD20 monoclonal antibody

targets:
  - CD20

monitoring:
  - Infusion reactions
  - Hepatitis B reactivation
```

---

# Clinical Support Entity

## Purpose

Represents supportive and preventive oncology care.

Examples:

- Antiemetics
- Growth factor support
- Tumor lysis syndrome
- Infection prophylaxis
- Infusion reactions

---

## Structure

```yaml
title:

category:

relatedDiseases:

relatedRegimens:

riskFactors:

prevention:

management:

monitoring:

references:

review:
  lastReviewed:
  reviewedBy:
```

---

# Source Entity

## Purpose

Stores references used to support clinical content.

Sources are first-class entities to maintain consistent provenance.

---

## Structure

```yaml
title:

organization:

type:

version:

publicationDate:

url:

accessDate:
```

---

## Source Types

Examples:

```text
Guideline

Clinical trial

Drug label

Review article

Institutional protocol
```

---

# Future Personal Knowledge Layer

Personal observations should remain separate from reviewed reference content.

Future entities:

```text
Clinical Pearl

Personal Note
```

These should never appear identical to evidence-based reference information.

---

# Relationships

The knowledge system is built around connections:

```text
Disease
   |
   ├── Regimen
   |
   ├── Biomarker
   |
   └── Reference


Regimen
   |
   ├── Drug
   |
   ├── Clinical Support
   |
   └── Reference


Drug
   |
   ├── Regimen
   |
   └── Reference
```

---

# Implementation Priority

The first implementation should support:

1. Disease collection.
2. Regimen collection.
3. Drug collection.
4. Source collection.
5. Relationships between these entities.

Clinical content will be added only after schemas and validation rules are finalized.


---
