---
title: Costs, forecasting and quality
summary: Earned value formulas (PV/EV/AC, SV, CV, SPI, CPI, EAC, ETC, VAC, TCPI), PERT and standard deviation, 4 forecasting perspectives, 7 control steps and the cost of quality.
---

# 7. Costs, forecasting and quality

## 7.1 Earned value — the three quantities

| Abbrev. | Name | What it is, in one sentence |
|---|---|---|
| **PV** | Planned Value | how much work **was scheduled** to be done by the date |
| **EV** | Earned Value | how much work was **actually completed** |
| **AC** | Actual Cost | how much the completed work **cost** |

**Plain reading:** PV = how much work I planned to do · EV = how much work was done · AC = what the work done cost.

## 7.2 The formulas

```
Schedule variance     SV  = EV − PV        > 0 ahead       | < 0 behind        | = 0 on time
Schedule performance  SPI = EV / PV        > 1 ahead       | < 1 behind        | = 1 on time
Cost variance         CV  = EV − AC        > 0 under budget | < 0 over budget
Cost performance      CPI = EV / AC        > 1 under budget | < 1 over budget
```

**Reading on the chart** (cost on the Y axis, time on the X axis):
- **EV curve below** the **PV curve** → **behind schedule** (less work earned than planned)
- **EV curve below** the **AC curve** → **over budget** (less earned than spent)

**Watch out for a common sign error:** source material of doubtful quality inverts SV and CV. The correct convention is the one in the table above: **EV − PV** and **EV − AC**.

## 7.3 Forecasting — 4 perspectives and the abbreviations

| Perspective | Answers |
|---|---|
| **Plan** (baseline) | what did we intend to deliver? |
| **Actual** | what really happened? |
| **Forecast** | where are we heading? |
| **EAC** | what will the total result be? |

```
ETC  = Estimate to Complete        → what it costs to finish the remaining work
EAC  = Estimate at Completion      → forecast total cost of the project
VAC  = Variance at Completion      → what is left (or missing) at the end: budget − EAC
TCPI = To-Complete Performance Index → efficiency needed to finish within budget
```

**7-step flow:** collect actuals → compare with the plan → analyse variances → identify problems, risks and impacts → update the forecast → calculate EAC → **take action**.
Without the last step, the rest is just reporting.

**The 7 forecast measures the report must contain:** current position · ETC · EAC · forecast completion date · remaining risks · approved changes · **confidence range**.

## 7.4 What makes a forecast reliable (and what blinds it)

**5 obstacles:**
1. outdated data
2. excessive optimism
3. unresolved assumptions
4. lack of real data
5. unknown dependencies

**What makes it reliable:** current and complete data · realistic work reflecting reality · known risks, visible and included · changes formally recorded · assumptions documented and tested · **transparent confidence range, never a single number**.

## 7.5 Estimation — PERT and techniques

```
PERT:      E  = (O + 4M + P) / 6
Std dev:   σ  = (P − O) / 6
Variance:  σ²
```
`O` = optimistic · `M` = most likely · `P` = pessimistic.

**Worked example:** O = 11, M = 15, P = 19
```
E = (11 + 4×15 + 19) / 6 = (11 + 60 + 19) / 6 = 90 / 6 = 15 days
σ = (19 − 11) / 6 = 1.33
Variance = σ² = (8/6)² ≈ 1.78   (with σ rounded to 1.33: 1.77)
→ "15 days ± 1.33"
```

**Other techniques:** analogous (similar past work) · parametric (cost per unit × quantity) · three-point · relative (planning poker, Fibonacci, t-shirt sizing) · flow (cycle time and throughput).

**Precision × accuracy:** accuracy is hitting the target; precision is grouping the shots. You can be precise and wrong — four darts clustered off target. An "exact" estimate with high uncertainty is just a false sense of control.

**Rule:** always present a range, never a single number. A single number is a promise you did not make.

## 7.6 Performance control cycle (illustrative)

A practical control sequence used in many projects. **It is not the structure of the PMBOK 7**, which organises work into performance domains (§6.2). In the 6th edition, the planning, execution and monitoring steps corresponded to process groups. The last column shows which 7th-edition domain each step fits.

| # | Step | What happens | PMBOK 7 domain |
|---|---|---|---|
| 1 | **Planning** | defines scope, schedule, costs, resources; sets the baseline | Planning |
| 2 | **Execution** | carries out the work, produces deliverables and communications | Project work · Delivery |
| 3 | **Monitoring** | tracks progress and performance, identifies problems, updates records | Measurement |
| 4 | **Variance analysis** | baseline vs. actual; root cause; assesses impacts | Measurement |
| 5 | **Corrective actions** | develops options, implements, updates the plan, communicates | Project work · Uncertainty |
| 6 | **Forecasting** | estimates EAC and ETC, predicts completion, updates risks and resources | Measurement · Uncertainty |
| 7 | **Project success** | objectives achieved, quality standards, stakeholder satisfaction, lessons | Delivery · Measurement |

## 7.7 Quality — cost of quality

| Category | Examples | When it occurs |
|---|---|---|
| **Prevention** | training, quality plan, robust specifications | before |
| **Appraisal** | inspection, audit, testing, dimensional checks | during |
| **Internal failure** | scrap, waste, rework, failure analysis | before reaching the client |
| **External failure** | returns, recall, warranty claims, reputational damage | after reaching the client |

**The cost-of-change curve:** a defect found late costs far more (work has already been built on top of it). **Practical consequence:** build quality into the process and **involve quality early**, in the design phase — not in the final inspection.

**How to optimise:** inspect and review **while** the work is being done, and test early in the cycle to avoid rework, delay and overruns.

## 7.8 Cost and schedule health checklist

- [ ] Is there an approved baseline (scope, schedule, cost)?
- [ ] Are PV, EV and AC updated **as of the same cut-off date**?
- [ ] Have SPI and CPI been calculated and interpreted?
- [ ] Are ETC, EAC and VAC on the latest version?
- [ ] Does the forecast have a **confidence range**, not a single number?
- [ ] Are the reserves (contingency and management) still sufficient for the remaining risk?
- [ ] Are approved changes reflected in the baselines?
- [ ] Is there a defined action for every variance outside the limit?
