# OncoNavigator Coding Standards

**Version:** 1.0  
**Status:** Active  
**Last Updated:** August 2026

---

# Purpose

This document defines the coding standards, architectural conventions, and development practices for OncoNavigator.

The primary goals are:

- Maintain consistency throughout the project.
- Improve readability and maintainability.
- Reduce duplication.
- Encourage predictable project organization.
- Support long-term evolution of the knowledge base.

These standards apply to all source code, content schemas, documentation, and clinical content.

---

# Guiding Principles

## 1. Consistency Over Convenience

Whenever multiple valid approaches exist, choose one approach and use it consistently throughout the project.

Consistency is preferred over personal preference.

---

## 2. Readability Over Cleverness

Code should be easy to understand.

Avoid unnecessary abstractions or overly compact implementations.

Future readability is more important than writing fewer lines of code.

---

## 3. Explicit Over Implicit

Avoid hidden behavior.

Names, types, relationships, and assumptions should be explicit.

Good code should explain itself.

---

## 4. Reusable Over Duplicated

Common structures should be implemented once and reused.

Examples include:

- Review metadata
- Citation schema
- Dose schema
- Medication schema
- Monitoring schema

---

## 5. Knowledge Before Presentation

OncoNavigator is a knowledge system.

Pages are one presentation of structured knowledge.

The underlying data model always takes precedence over user interface concerns.

## 6. Content Evolution Rule

Whenever a content schema changes:

1. Update the schema.
2. Update the corresponding template.
3. Update the reference example(s).
4. Run `npm run build`.
5. Commit the changes together.

Schemas, templates, and reference content should never drift apart.

---

# Project Structure

```
src/

├── components/
├── layouts/
├── pages/
├── content/
├── styles/
├── utils/
├── icons/
└── assets/
```

Documentation:

```
docs/
```

Public assets:

```
public/
```

---

# File Naming

Folders:

- lowercase
- kebab-case

Examples:

```
clinical-support
medical-oncology
```

---

Files:

Use PascalCase for Astro components.

```
DoctorCard.astro
DiseaseHeader.astro
```

Use camelCase for utility files.

```
formatDate.ts
calculateBSA.ts
```

Use kebab-case for Markdown and MDX files.

```
diffuse-large-b-cell-lymphoma.mdx
r-chop.mdx
trastuzumab.mdx
```

---

# Naming Conventions

Variables:

```
camelCase
```

Example:

```ts
cycleLength
doseType
reviewDate
```

---

Types:

```
PascalCase
```

Example:

```ts
Disease
Regimen
Medication
Drug
```

---

Constants:

```
UPPER_SNAKE_CASE
```

Example:

```ts
DEFAULT_CYCLE_LENGTH
MAX_RESULTS
```

---

# IDs and Slugs

Every knowledge object should have a permanent identifier.

Examples:

```
dlbcl

r-chop

rituximab

tumor-lysis-syndrome
```

Relationships should always reference IDs.

Never titles.

---

# TypeScript Standards

Always enable strict typing.

Avoid `any`.

Prefer:

```ts
type
```

for domain models.

Use:

```ts
interface
```

only when extension is required.

Prefer readonly data where practical.

---

# Zod Schema Standards

Shared schemas should be defined once.

Collections should reuse shared schemas.

Prefer:

```ts
z.string().min(1)
```

instead of:

```ts
z.string()
```

Use defaults whenever appropriate.

Example:

```ts
aliases:
    z.array(z.string()).default([])
```

---

# Enumerations

Prefer enums instead of unrestricted strings.

Examples:

Intent

```
curative
adjuvant
neoadjuvant
maintenance
consolidation
palliative
```

Route

```
IV
PO
SC
IM
IT
```

Dose Type

```
flat
bsa
weight
auc
```

---

# Dates

Use ISO 8601.

Example:

```
2026-08-04
```

Never store formatted dates.

Formatting belongs in the presentation layer.

---

# Markdown Standards

Use ATX headings.

```
#
##
###
```

Leave one blank line after headings.

Wrap paragraphs naturally.

Avoid trailing spaces.

---

# MDX Standards

Each content file should contain:

- Frontmatter
- Structured metadata
- Narrative clinical content

Clinical metadata belongs in frontmatter.

Clinical explanation belongs in Markdown.

---

# Comments

Comments should explain:

- Why

Not:

- What

Good:

```ts
// Loading doses require a separate rule because
// trastuzumab uses different dosing in cycle 1.
```

Poor:

```ts
// Increment i.
```

---

# Imports

Import order:

1. External libraries
2. Astro
3. Internal modules
4. Relative imports

Example:

```ts
import { defineCollection, z } from "astro:content";

import type { Regimen } from "@/types";

import { reviewSchema } from "./shared";
```

---

# Documentation

Every important architectural decision should be documented.

Do not rely on commit messages to explain project design.

---

# Git Commits

Prefer small commits.

Examples:

```
Define shared schemas

Add regimen collection

Implement disease schema

Create drug entity
```

Avoid large mixed commits.

---

# Clinical Content Standards

Clinical content must be:

- Source traceable
- Reviewed
- Versioned
- Clearly written
- Clinically neutral

Avoid unsupported opinions.

---

# Personal Notes

Personal notes must remain separate from reviewed clinical knowledge.

Reference material must always remain identifiable.

---

# Security

OncoNavigator stores no patient-identifiable information.

Patient-specific data must never be committed to the repository.

---

# Future Development

When adding new features:

1. Update documentation.
2. Update schemas if required.
3. Add tests when appropriate.
4. Keep backwards compatibility whenever practical.

---

# Living Document

These standards are expected to evolve as OncoNavigator grows.

When a new convention is adopted, update this document before applying it throughout the project.

Consistency across the entire project is more important than preserving historical habits.