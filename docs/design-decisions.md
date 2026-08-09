# Design Decisions

This section records important architectural decisions made during the design of OncoNavigator. It explains **why** certain approaches were chosen so that future development remains consistent with the project's vision.

## DD-001 — Structured Knowledge Instead of Documents

Clinical information is stored as structured, searchable content rather than as a collection of PDF documents.

### Rationale

- Enables powerful search and filtering.
- Supports relationships between diseases, regimens, drugs, and clinical support.
- Makes updating individual pieces of information straightforward.
- Eliminates duplication of knowledge.

---

## DD-002 — Regimens Are Treatment Plans

A regimen is modeled as a complete treatment plan rather than a simple list of medications.

Each regimen includes:

- Clinical context
- Treatment schedule
- Medication administration plan
- Monitoring
- Supportive care
- References
- Review metadata

### Rationale

This reflects how oncologists think and work in clinical practice.

---

## DD-003 — Medication Administration Is Structured

Each medication within a regimen is represented independently and includes:

- Drug
- Dose
- Dose type
- Unit
- Route
- Administration day(s)
- Cycle-specific rules
- Future dose modification framework

### Rationale

Many oncology regimens contain:

- Loading doses
- Maintenance doses
- Different doses in different cycles
- Maximum dose limits
- Complex administration schedules

The data model must support these scenarios from the beginning.

---

## DD-004 — One Source of Truth

Every clinical concept exists only once.

Examples:

- One Rituximab entry
- One Tumor Lysis Syndrome entry
- One NCCN guideline source entry

Other content references these entities rather than duplicating them.

### Rationale

Single-source content is easier to maintain, update, and validate.

---

## DD-005 — Structured Data and Narrative Are Separate

Each content page contains:

1. Structured metadata used by the application.
2. Narrative clinical content intended for clinicians.

### Rationale

Structured data enables navigation, filtering, and automation, while narrative content provides context, explanation, and practical guidance.

---

## DD-006 — Sources Are First-Class Entities

Guidelines, landmark trials, drug labels, and other references are stored as independent content objects.

Clinical pages reference these sources rather than embedding citation details repeatedly.

### Rationale

This provides consistent provenance, simplifies updates, and supports future citation features.

---

## DD-007 — Offline-First Architecture

OncoNavigator is designed to function without an internet connection.

The complete knowledge base resides locally.

### Rationale

The application should remain fast, reliable, private, and available regardless of network connectivity.

---

## DD-008 — No Patient Data

OncoNavigator is a clinical knowledge system.

It is **not** an electronic medical record and does **not** store identifiable patient information.

### Rationale

Keeping patient information outside the application greatly simplifies privacy, security, and long-term maintenance.

---

## DD-009 — Personal Knowledge Is Separate

Personal notes and clinical pearls are stored independently from reviewed reference content.

Reference material remains clearly distinguishable from personal observations.

### Rationale

Evidence-based information should never be confused with personal experience or local practice preferences.

---

## DD-010 — Build the Foundation Before the Content

The project follows this sequence:

1. Define the vision.
2. Design the data model.
3. Implement schemas.
4. Build navigation.
5. Add clinical content.

### Rationale

A well-designed architecture minimizes future restructuring and ensures consistency as the knowledge base grows.

## DD-011 — Model Clinical Concepts at Their Natural Level

Each concept should be represented at the level where it naturally belongs.

Examples:

- Drug properties belong to the **Drug** entity.
- Administration details belong to the **Medication** entity.
- Workflow and protocol rules belong to the **Regimen** entity.
- General supportive measures belong to **Clinical Support**.
- Evidence belongs to **Source**.

### Rationale

Avoiding duplication and keeping concepts at their natural level makes the knowledge model easier to understand, maintain, and extend.

## DD-012 — Model Clinical Rules Rather Than Individual Cases

When designing schemas, prefer general clinical rules (e.g., conditions and medication rules) over fields that solve only one specific regimen. This keeps the model extensible as new protocols and treatment patterns are added.

## DD-013 — Model Clinical Workflow at the Regimen Level

Regimens represent clinical workflows rather than simply collections of medications. Workflow steps such as eligibility, baseline assessment, pre-treatment measures, monitoring, supportive care, and dose modifications belong to the regimen because they arise from the treatment protocol as a whole, even when some actions are primarily associated with a single medication.

---

# Living Document

These design decisions are expected to evolve as OncoNavigator matures.

New decisions should be added rather than modifying historical ones whenever possible. This preserves the reasoning behind the project's evolution and provides a clear architectural history.

## Golden Rule 1

Every schema change must be justified by at least one real clinical example.

# Knowledge Ownership and Contextual Display

## Principle

Clinical information should be stored at the lowest level that owns the knowledge, but displayed wherever it is clinically useful.

## Examples

### Drug-specific information

Information that applies to a medication regardless of regimen belongs to the drug entity.

Examples:

- Dose modifications
- Organ toxicity considerations
- Infusion reactions
- Mechanism of action
- Drug-specific monitoring

Example:
Drug
└── Vincristine
└── Peripheral neuropathy dose modifications


---

### Regimen-specific information

Information that applies only to a treatment plan belongs to the regimen entity.

Examples:

- Cycle schedule
- Combination of medications
- Regimen-specific supportive care
- Treatment intent
- Line of therapy
- Regimen-level dose delays

Example:


## Source Versioning Strategy

OncoNavigator treats clinical sources as living evidence objects.

Guidelines are not versioned as separate entities. The source identity represents the guideline family, while the current version is stored as publication metadata.

Example:

nccn-b-cell-lymphomas

Version changes update the source metadata rather than creating duplicate source objects.

Historical versions may be recorded in previousVersions when useful.

Survivorship is a disease-centered longitudinal care pathway that should be modeled separately from treatment supportive care.