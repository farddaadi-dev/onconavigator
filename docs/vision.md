# OncoNavigator vision

## Purpose

OncoNavigator is a private, offline-first oncology knowledge system designed to help clinicians rapidly navigate structured, source-traceable clinical information.

It is a reference and learning tool, not a diagnostic, prescribing, or decision-making system. Clinical judgement, local policy, and current authoritative guidance always take precedence.

OncoNavigator models oncology knowledge — not oncology documents.

## Primary User

The primary user is a practicing medical oncologist or hematologist seeking rapid access to curated oncology knowledge during clinical practice or study.

Although initially developed for personal use, the architecture should be sufficiently robust to support broader use without fundamental redesign.

## Goals

- Present oncology knowledge in concise, clinician-friendly structured pages.
- Organize knowledge around diseases, regimens, drugs, and clinical support topics.
- Connect related material so a user can navigate from a clinical scenario to the relevant regimen, protocol details, monitoring, and references.
- Keep every substantive clinical statement traceable to a source and review date.
- Keep the application private, portable, and usable without an internet connection.
- Allow carefully separated personal notes and clinical pearls in a future phase.
- Build a maintainable knowledge system that can evolve without restructuring existing content.

## Core Values

- Accuracy over completeness.
- Clarity over complexity.
- Speed over visual decoration.
- One source of truth for every piece of information.
- Every clinical statement should be traceable.
- Every page should answer a clinical question.
- Maintainability over convenience.

## Principles

1. **Structured, not document-first.** Content should exist as structured knowledge rather than as a collection of documents.
2. **Traceable.** Every substantive clinical statement should include its source, review date, and, where appropriate, the level of evidence.
3. **Conservative and transparent.** Uncertainty, exceptions, and local variation should be made visible rather than hidden.
4. **Private by default.** The initial product stores content locally and does not require a hosted service.
5. **Deliberate content governance.** Schemas and content are added only after an agreed review workflow exists.
6. **No implied clinical authority.** The product assists navigation; it does not replace professional judgement or institutional guidance.
7. **Separation of content and presentation.** User interface components display information but never contain clinical knowledge directly.

## Initial information architecture

The first content collections are intentionally empty and represent the core domains of the knowledge system.

### Regimens

Treatment-specific information including:

- Indications
- Patient selection
- Treatment schedule
- Drugs
- Monitoring
- Clinical support
- References

### Drugs

Drug-specific information including:

- Mechanism of action
- Indications
- Administration
- Safety considerations
- Monitoring
- Drug interactions
- References

### Clinical Support

Supportive and preventive care including:

- Antiemetics
- Growth factors
- Tumor lysis syndrome
- Infection Prophylaxis
- Infusion reactions
- Survivorship
- Other supportive interventions

Future content models must define required provenance, review metadata, and safety metadata before clinical entries are added.



## Roadmap

### Phase 1 — Foundation

- Establish the Astro application architecture.
- Implement typed content collections.
- Define content schemas.
- Design the navigation system.
- Implement offline-friendly search.
- Establish citation and review standards.

## Phase 1.5 - Clinical Framework

- Define disease taxonomy.
- Define regimen taxonomy.
- Define drug taxonomy.
- Define clinical support taxonomy.
- Define metadata standards.
- Define citation format.
- Define review workflow.
- Define editorial standards.

### Phase 2 — Curated knowledge base

- Add reviewed disease, regimen, drug, and clinical support entries.
- Link related content throughout the application.
- Display citations, review dates, and version history.
- Add content status and review indicators.
- Maintain one source of truth for every clinical concept.

### Phase 3 — Personal knowledge layer

- Add private notes.
- Add clinical pearls.
- Keep personal observations visibly distinct from reviewed reference content.
- Support export, backup, and controlled updates of the local knowledge base.

## Long-Term Vision

OncoNavigator is intended to become a comprehensive personal oncology knowledge system rather than a document repository.

Its purpose is to organize trusted clinical knowledge into a structure that reflects how oncologists think during patient care.

Every feature should support one guiding question:
    **Will this help the clinician care for the patient more efficiently, more safely, and with greater confidence while remaining transparent about the underlying evidence?**