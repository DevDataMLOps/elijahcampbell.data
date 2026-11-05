# Portfolio 2.0 evidence register

Reviewed 2026-11-05. This register distinguishes repository-supported results from independently rerun measurements. No cloud workload was executed, no protected dataset accessed, and no financial savings fabricated. Homepage metrics use the same claims and boundaries as the case studies.

## Published claims

| Project | Metric | Baseline | Comparison | Measurement method | Source evidence | Limitations | Verification status |
|---|---|---|---|---|---|---|---|
| ZIPCO | 1,000,000 source records | Original synthetic CSV | Full-source profile | Full scan: row count, schema, nulls, duplicates, key semantics | [Profile report](https://github.com/DevDataMLOps/Zipco-Financial-Risk-Intelligence-platform/blob/2142d7101e126515ff75e19a525df0f9ea260490/phases/01-foundation/evidence/zipco_phase2_profile_and_data_contract.md) | Synthetic extract; not customer scale in production | Document reviewed; source not rerun |
| ZIPCO | 88.21% scan reduction | CSV full-history aggregate (normalized 100) | Equivalent Parquet full-history aggregate (11.79) | Athena bytes scanned; result reuse off; three runs per strategy; SHA-256 result reconciliation | [Benchmark and method](https://github.com/DevDataMLOps/Zipco-Financial-Risk-Intelligence-platform/blob/2142d7101e126515ff75e19a525df0f9ea260490/phases/03-optimization/benchmark-results-and-interpretation.md) | Percentages documented; exact per-run bytes retained in AWS S3, not independently retrieved. No realized savings claim | Repository evidence reviewed; AWS runs not rerun |
| ZIPCO | 95.55% additional scan reduction | Full-history Parquet (normalized 100) | Partition-pruned 2023 workload (4.45) | Same benchmark runner; 2023 result separately reconciled to CSV 2023 | [Benchmark and boundaries](https://github.com/DevDataMLOps/Zipco-Financial-Risk-Intelligence-platform/blob/2142d7101e126515ff75e19a525df0f9ea260490/phases/03-optimization/benchmark-results-and-interpretation.md) | Time scope and pruning both change. Not a pure partition-only causal effect or financial saving | Repository evidence reviewed; AWS runs not rerun |
| PATIENTRA | 2,938 Gold admission records | Historical synthetic source release | Historical Phase 6 Gold row count | Independent Gold row-count/uniqueness and upstream audit reconciliation | [Phase 6 aggregate evidence](https://github.com/DevDataMLOps/Patientra/blob/9666fa0b3743606ada4fe7f1e56bc23399237478/docs/evidence/phase-6-validation-presentation/README.md) | Historical release; separate from reconstructed dashboard and smaller frozen prototype; no clinical validation | Aggregate evidence and release code/contract reviewed |
| PATIENTRA | 13/13 independent release checks passed | 13 required Phase 6 release checks | 13 successful checks | Hashes, schemas, counts, identifiers, suppression and version-chain checks | [Phase 6 result](https://github.com/DevDataMLOps/Patientra/blob/9666fa0b3743606ada4fe7f1e56bc23399237478/docs/evidence/phase-6-validation-presentation/README.md); [Check contract](https://github.com/DevDataMLOps/Patientra/blob/9666fa0b3743606ada4fe7f1e56bc23399237478/docs/validation.md) | Independent pipeline stage, not independent external certification; synthetic release only | Documented PASS reviewed; historical private outputs not rerun |
| PATIENTRA | 8 of 51 breakdown rows suppressed | 51 historical aggregate breakdown rows | 8 withheld under disclosure controls | Suppression count and blank-metric integrity validation | [Phase 6 reconciliation](https://github.com/DevDataMLOps/Patientra/blob/9666fa0b3743606ada4fe7f1e56bc23399237478/docs/evidence/phase-6-validation-presentation/README.md) | Rows, not patients; no claim of regulatory compliance or formal privacy certification | Aggregate evidence reviewed |
| Project RISING | Three-person team | Not applicable | README team declaration | Repository statement, with owner-confirmed account attribution | [Team scope](https://github.com/DevDataMLOps/Project-Rising/blob/0c0824d89d6f6a39abbc466fc0869d01c9d9c5bf/README.md) | Team size is contextual; commits support bounded individual work, not sole ownership | Repository and owner confirmation |
| Project RISING | HTTP 503 → HTTP 200; first verification request after restore | Required dataset missing in isolated local test | Dataset restored in same application | Controlled /ready requests; recorded request IDs and regression | [Controlled recovery drill](https://github.com/DevDataMLOps/Project-Rising/blob/0c0824d89d6f6a39abbc466fc0869d01c9d9c5bf/docs/operations/evidence/2026-07-23-readiness-failure-recovery.md) | Not a production RTO, disaster recovery or clinical accuracy measure; drill not rerun for portfolio | Recorded drill and regression source reviewed |
| Telecom | 243,553 source records | Source CSV identified by hash in profile | Full dataset count | Checked-in machine-readable profiler output | [Profile JSON](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/docs/data_profiling/telecom_profile.json) | Source excluded from Git; cannot independently rerun profile without authorized dataset | Profile and code reviewed |
| Telecom | 223,966 curated records | 243,553 source rows | 223,966 contract-valid rows | Profile routing; BigQuery COUNT(*) script and PASS screenshot | [Profile](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/docs/data_profiling/telecom_profile.json); [SQL verification](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/scripts/verify_bigquery_counts.py); [Execution screenshot](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/docs/screenshots/telecom-bigquery-verification.png) | Screenshot is retained execution evidence, not a fresh cloud query; does not prove churn improvement | Profile, validation/export source and screenshot cross-checked |
| Telecom | 19,587 quarantined records | 243,553 source rows | 19,587 invalid rows; curated + quarantined = source | Reason-coded validation routing, profile JSON and warehouse count check | [Quality rules](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/docs/data_quality/telecom_quality_rules.md); [BigQuery result](https://github.com/DevDataMLOps/Telecom-Data-Revolution/blob/f8eccab9d9baae21118aee61eb5060b4e86e2198/docs/screenshots/telecom-bigquery-verification.png) | Rejected records retained for review; no claim all defects have been discovered | Counts reconcile; source and cloud not rerun |

## Source snapshots

Evidence links pin the reviewed commit so future repository changes do not silently alter the supporting record.

- Zipco-Financial-Risk-Intelligence-platform: `2142d7101e126515ff75e19a525df0f9ea260490`
- Patientra: `9666fa0b3743606ada4fe7f1e56bc23399237478`
- Project-Rising: `0c0824d89d6f6a39abbc466fc0869d01c9d9c5bf`
- Telecom-Data-Revolution: `f8eccab9d9baae21118aee61eb5060b4e86e2198`

## Attribution and experience

The owner confirmed on 2026-11-05 that DevDataMLOps commits represent their RISING contributions and clarified that the Amdari context was project-based work on Telecom and ZIPCO. The portfolio therefore labels this as project-based training, without an employment date or production-employment result.

RISING is a three-person team project. Specific inspected commits attributed by GitHub to DevDataMLOps:

- [Batch ETL](https://github.com/DevDataMLOps/Project-Rising/commit/0a11a0f1eff78d5659b9c9142d15ee63c470a3cd): CSV extraction, transformations, pipeline orchestration and validation.
- [CI testing](https://github.com/DevDataMLOps/Project-Rising/commit/495a1e25809aa84d4fee638334bcd4fe90c67e94): GitHub Actions pytest workflow.
- [API and deployment hardening](https://github.com/DevDataMLOps/Project-Rising/commit/491dd654023a5d0dbc5808fb440b24fdccd29acd): readiness, configuration, security, atomic ETL output, deployment and tests.

These support individual contributions; they do not assign all team work to one person. Hackathon participation is supported by the project README. No award or placement was supplied or verified, so none is claimed.

## Removed or bounded claims

- Previous homepage and Amdari claims of **30% pipeline latency reduction**, **40% query performance improvement**, and **£10,000 quarterly infrastructure savings** had no supporting measurement artifact or verified employment context in the reviewed material. Removed from the page, not relabeled as project savings.
- The existing resume PDF is preserved and its path/file integrity checked. Its wording has not been rewritten as part of this website change; the owner should reconcile any legacy claims before deployment.
- MLOps and AI infrastructure are explicitly an emerging direction.
- ZIPCO scan reductions are measurements reported in repository evidence. Any billing implication is modeled, not realized savings.
- PATIENTRA historical release, reconstructed dashboard and frozen prototype are separate runs. The card's 2,938/13/13/8-of-51 figures belong to the historical synthetic release. The prototype is a demonstration, not clinical validation.
- Telecom repository identity is confirmed by the account search, README, source, profiling and BigQuery screenshot. A development placeholder is unnecessary.

## Architecture asset provenance

[PATIENTRA architecture screenshot](https://github.com/DevDataMLOps/Patientra/blob/9666fa0b3743606ada4fe7f1e56bc23399237478/docs/showcase/assets/architecture-overview.png) is copied unchanged to `assets/images/patientra-architecture.png`. It illustrates the repository's architecture; it is not a newly generated deployment screenshot. Other cards link directly to their project architecture and operational evidence. The original generic homepage architecture remains illustrative.

## Maintenance standard

Before changing a quantitative claim, update its baseline, comparison, method, pinned evidence and boundary here. Do not promote README prose to an independently reproduced measurement. Check links and distinguish historical screenshots from current service health. Never add credentials, patient-level data, source customer records or inferred monetary savings.
