---
name: commercial-engine-and-delivery
description: Commercial engine and delivery management for complex-cycle B2B businesses. Use to review or fix an offer, price or email; diagnose why revenue stalled (reach, lead quality, conversion, capacity, retention); run discovery and qualification (SPIN, MEDDPICC, Challenger, JOLT); build a proposal, guarantee and 30/60/90 plan; and to plan, control and report projects (PMBOK 7, earned value, risk, ISO 21502/31000). Do not use for source-code analysis or formal legal opinions.
whenToUse: When the request involves selling better (offer, price, objection, pipeline, discovery, proposal) or delivering better (scope, schedule, cost, risk, project status). Do not trigger for software architecture or legal/tax advice.
---

# Commercial Engine and Delivery Management

A two-front skill whose parts connect: **selling** (commercial engine) and **delivering** (project management).
The sales front promises; the delivery front fulfils. Using one without the other breaks the business.

## Rules that outrank all others

1. **Evidence over adjectives.** No claim without a source: person, number, date or document.
2. **Stop at the first broken link.** Do not optimise conversion when the problem is reach.
3. **Never invent a number, testimonial or case.** What is missing becomes `[to fill in]` (to be filled in).
4. **Without the profile file, the output is generic.** If `templates/business-profile.md` is not filled in, tell the user and ask the minimum needed before producing anything.

## How to operate

> **Before anything else:** if the offer has **never been sold** (or is new), the step is to **validate with real money** — not to structure it. See `templates/idea-validation-script.md`. Structuring offer, price and outbound before anyone pays is the most expensive mistake at the start, and the most common one because it "looks professional".

### Step 1 — Choose the smallest mode that answers

| Mode | Trigger | Required output |
|---|---|---|
| **Quick review** | one email, one price, one objection | verdict in one sentence + corrected artefact |
| **Bottleneck diagnosis** | "I need more clients", "it doesn't convert" | 5 checks with verdict + 1 experiment card |
| **Full build** | new offer, new product, new move | 12-step map + templates + owners within 30 days |

Do not do all three at once. A quick request gets a quick answer.

### Step 2 — Load only the module you need

| Declared situation | File to read |
|---|---|
| Vague offer, vague price, poorly communicated value | `references/02-offer-and-pricing.md` |
| Cold outbound, nobody replies | `references/04-outbound-and-objections.md` |
| First call, discovery, questions to ask | `references/03-sales-methodologies.md` |
| Large deal, qualification, close forecast | `references/03-sales-methodologies.md` |
| Client convinced but not deciding ("I'll think about it") | `references/03-sales-methodologies.md` (JOLT) |
| A single contact in the account | `references/03-sales-methodologies.md` (committee) |
| Full map, 12 steps, funnel gates | `references/05-commercial-engine-12-steps.md` |
| Project overran schedule or cost | `references/07-costs-and-forecasting.md` |
| Scope that keeps growing | `references/06-project-delivery.md` |
| Don't know why revenue stalled | `references/05-commercial-engine-12-steps.md` |
| Risk, threat, opportunity, reserves | `references/08-risk.md` |
| Meetings, roles, kickoff, manager routine | `references/09-people-and-rituals.md` |
| Governance, compliance, ISO, benchmarks | `references/10-standards-and-benchmarks.md` |
| Idea validation, consultative selling, negotiation (Brazilian school) | `references/12-validation-and-negotiation-br.md` |
| Understanding how the parts connect, or a request that fits no single module | `references/11-engine-architecture.md` |
| Question about evidence, honesty, what to promise | `references/01-evidence-and-profile.md` |
| Customer bought and doesn't use it, churn, renewal | `references/05-commercial-engine-12-steps.md` (link 5, retention) |
| Need to fill in the business context | `templates/business-profile.md` |

Read **one** file. Read a second one only if the first explicitly points to it.

### Step 3 — Choose the output template

| What you are producing | Use the template |
|---|---|
| Business context (do this **first**) | `templates/business-profile.md` |
| **Validate an idea with real money** (before anything else) | `templates/idea-validation-script.md` |
| **Run a consultative sales meeting** | `templates/consultative-sales-script.md` |
| **Prepare and run a negotiation** | `templates/integrative-negotiation-script.md` |
| Offer, price tiers and guarantee | `templates/proposal-and-guarantee.md` |
| Diagnosis result (mode 2) | `templates/experiment-card.md` |
| Delivery, adoption and retention plan | `templates/plan-30-60-90.md` |
| Formally authorise a project | `templates/project-charter.md` |
| Report status to the sponsor | `templates/status-report.md` |
| Define roles and responsibilities | `templates/raci-matrix.md` |
| Record and track risks | `templates/risk-register.md` |
| Run the kickoff meeting | `templates/kickoff-script.md` |
| Review the deliverable before sending | `templates/anti-patterns-checklist.md` |

### Step 4 — Verify before delivering

Walk the **evidence ladder** (`references/01-evidence-and-profile.md`) and state which rung the deliverable reaches. Do not call something functional if it is only written down.

### Step 5 — Close with the output contract

- **Specific:** "post on Tuesday at 9am" — not "post on social media".
- **Opinionated:** "kill this feature" — not "consider deprioritising".
- **Sourced:** every external number has an origin. Without one → "Estimate" or "Not found".
- **Brief:** word limit. Brevity forces clarity.
- **Structured:** tables, checklists and matrices — never a wall of text.
- **With a verdict:** end with **advance / correct / discard**.

## Skill map

```
commercial-engine-and-delivery/
├── SKILL.md                              ← this file (router)
├── references/
│   ├── 01-evidence-and-profile.md          evidence ladder, what to promise, how to fill in the profile
│   ├── 02-offer-and-pricing.md       6 pricing models, 3 tiers, guarantee with exposure
│   ├── 03-sales-methodologies.md       SPIN, MEDDPICC, committee, JOLT, Challenger
│   ├── 04-outbound-and-objections.md         5-touch sequence, objections
│   ├── 05-commercial-engine-12-steps.md   12 steps, gates, diagnosis of the 5 links
│   ├── 06-project-delivery.md            PMBOK 7, scope, documents, status, kickoff, decision
│   ├── 07-costs-and-forecasting.md           EVM, PERT, forecasting, controls, quality
│   ├── 08-risk.md                       matrix, strategies, reserves, measurement pitfalls
│   ├── 09-people-and-rituals.md           meetings, RACI, routine, maturity, delegation
│   ├── 10-standards-and-benchmarks.md         ISO and PMI Pulse data (partly unverified)
│   ├── 11-engine-architecture.md        the 3 modes, decision tree, output contracts
│   └── 12-validation-and-negotiation-br.md   Meisler and Alfredo Soares; test before structuring
└── templates/
    ├── business-profile.md                 business context (prerequisite for everything)
    ├── idea-validation-script.md     test demand with real money
    ├── consultative-sales-script.md       diagnosis and disciplined refusal
    ├── integrative-negotiation-script.md predictability, closed choices, trading concessions
    ├── experiment-card.md          standard output of diagnosis mode
    ├── plan-30-60-90.md                     delivery, adoption and retention
    ├── project-charter.md              project charter (TAP)
    ├── status-report.md            the 5 blocks
    ├── raci-matrix.md                    roles
    ├── risk-register.md             exposure per risk
    ├── proposal-and-guarantee.md            offer, tiers, guarantee
    ├── kickoff-script.md             agenda with timings and decision log
    └── anti-patterns-checklist.md         11 review categories
```

## Known limits of this skill

- **Numbers from sales methodologies** (e.g., "40% of the best are Challengers", "17% increase in the SPIN study") come from the authors themselves, **without independent verification**. Treat them as claims with an origin, never as measured facts.
- **ISO 21502 and ISO 31000** were synthesised from third-party presentations, not from the official text. Before quoting a clause of a standard, consult the text.
- **Reference 12** (Meisler, Alfredo Soares) is **practitioner opinion**, drawn from a compilation of videos whose attributions and excerpts **were not verified**. Treat it as market practice; if you quote them by name to a client, confirm the original source.
- **Out of scope:** legal, tax, formal accounting, source-code analysis.
- **PMI Pulse figures** (ref. 10 §10.3): only the 57% growth in hybrid approaches and the claim of equivalent performance were confirmed on the official page. Yearly percentages, the 477-company sample and the 8 facilitators were **not** confirmed. Do not quote them without checking the full report.
- **SPIN figures:** the "17% increase" is not a claim by Rackham and must not be used (ref. 03 §3.1).
- **Open gap:** small-business finance (margin, break-even, cash flow, tax) and channel acquisition beyond outbound.
