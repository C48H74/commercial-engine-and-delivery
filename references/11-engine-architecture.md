---
title: Commercial engine architecture
summary: How the engine is assembled — the three modes, the situation-based decision tree, diagnosis before concluding, and the output contracts. Includes the scope decision for the skill.
---

# 11. Commercial engine architecture

> This is the "blueprint" that ties together all the other files. Read it when you need to understand **how the parts connect**, or when the request does not clearly fit a single module.

## 11.1 The architecture in 4 stages

```
1. CHOOSE THE MODE             2. LOAD ONLY WHAT IS NEEDED
   review · diagnosis ·           situation-based decision tree
   full build                     points to 1 module
              ↓                              ↓
3. DIAGNOSE BEFORE             4. OUTPUT CONTRACT
   CONCLUDING                      verdict · diagnosis · plan
   reach → lead → conversion
   → capacity → retention
   "stop at the first broken link"
```

## 11.2 Situation-based decision tree

| Declared situation | Module to load |
|---|---|
| Vague offer or price | offer and pricing (`references/02-*`) |
| Cold outbound, no replies | outbound + 5-touch sequence (`references/04-*`) |
| First call | SPIN discovery + call guide (`references/03-*`) |
| Large deal | MEDDPICC scorecard (`references/03-*`) |
| Stalled deal | JOLT + objection library (`references/03-*`, `references/04-*`) |
| A single contact | multithreading + committee map (`references/03-*`) |
| "I need more clients" | diagnosis of the 5 links (`references/05-*`) |
| New offer or new move | 12-step map (`references/05-*`) |

## 11.3 Diagnosis before concluding

**Mandatory order, no skipping:**

```
Reach → Lead quality → Conversion → Capacity → Retention
```

**"Stop at the first broken link."** Optimising conversion when the problem is reach is a waste of effort and credibility. Each link limits those that follow — there is no shortcut.

## 11.4 Output contracts

| Mode | Mandatory output | Where the template is |
|---|---|---|
| **Quick review** | verdict in one sentence + corrected artefact | — (the output is the artefact itself) |
| **Bottleneck diagnosis** | diagnosis per link + **1** experiment card | `templates/experiment-card.md` |
| **Full build** | plan + templates + owners and deadlines within 30 days | `templates/plan-30-60-90.md` |

## 11.5 Engine assets (reference inventory)

The original engine was designed with this inventory. Use it as a completeness target:

| Asset | Reference quantity | Status in this skill |
|---|---|---|
| References | 17 | **12** reference files (consolidated) |
| Templates | 9 | **13** templates |
| Operational scripts | 3 | **3** complete scripts (validation, consultative sales, negotiation) |
| Objection library | 15 objections | structure + 7 catalogued objections (`references/04-*`) |
| Checklists | 2 | anti-patterns checklist + checklists per module |
| Annotated examples | 2 | 1 calibrated example (§11.6) |

> **Declared gap:** the complete library of 15 objections and the 2 annotated examples of the original design **were not reproduced**, because the available sources did not contain them. Recorded as a next step.

## 11.6 Calibrated example — quick review

**Request:** *"my client says R$ 12,000/year is expensive. What do I answer?"*

**Mode:** quick review. **Modules:** objections + value (MEDDPICC M) + JOLT T.

> **Verdict:** this is not a price objection — it is **unquantified value**. You never put a number on the scale.
>
> **What to do, in this order:**
> 1. Do not defend the price. An absolute number without comparison always looks expensive.
> 2. Go back to the pain and quantify it: *"how many hours a week does your team spend issuing invoices manually?"* → hours × cost/hour × 52 = **their number**.
> 3. Bring proof from a client of the same size — **with authorisation**.
> 4. If they still hesitate, it is **risk**, not price: offer a way out, not a discount (JOLT, T).
> 5. Review the tiers: maybe you offered the complete tier to someone who needs the essential one.
>
> **Evidence needed:** their pain number + one authorised case. **Without both, do not respond.**
>
> **Trap:** "I can get you a discount" — destroys the anchor and does not fix the cause.

## 11.7 Scope decision for the skill

This skill covers **two fronts** with one router. The decision was deliberate:

- **Commercial front:** triggered by requests about selling, pricing, prospecting, negotiating.
- **Delivery front:** triggered when the subject is schedule, cost, scope, risk, status.
- **The router:** the `SKILL.md` decides by the declared situation, not by history.

**Why unite the two:** the commercial engine promises and project delivery fulfils. Separated, the first sells what the second cannot sustain — which is exactly what the snowball effect and the lack of handoff produce (see `references/06-project-delivery.md` and `templates/plan-30-60-90.md`).

**Alternative considered and discarded:** two separate skills with cross-reading. Discarded because the most common point of failure lies precisely on the **boundary** between selling and delivering.
