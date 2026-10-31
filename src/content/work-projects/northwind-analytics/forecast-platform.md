---
# DUMMY DATA — fictional project. Every optional field is filled in; long body.
dummy: true
employer: northwind-analytics
name: Demand Forecasting Platform
role: Senior Software Engineer
summary: >-
  Redesigned the core forecasting service from a nightly batch script into an
  API-driven platform that serves forecasts for thousands of product lines.
startDate: 2022-06
endDate: 2023-11
responsibilities:
  - Designed the service architecture and wrote the technical design document.
  - Implemented the forecast orchestration layer and the public REST API.
  - Led a team of three engineers and reviewed all production-facing changes.
  - Defined the model contract so data scientists could ship models independently.
achievements:
  - Cut end-to-end forecast latency from 6 hours to under 20 minutes.
  - Reduced infrastructure cost by roughly 35% by right-sizing compute and caching features.
  - Onboarded 14 enterprise customers without a single forecast-related incident.
stack: [Python, FastAPI, PostgreSQL, Redis, Docker, Kubernetes, Airflow, Terraform]
links:
  - label: Case study
    url: https://example.com/case-study
  - label: Engineering blog post
    url: https://example.com/blog/forecasting
---

## Background

The original forecasting product was a collection of scripts that ran every
night, read a snapshot of customer data and wrote CSV files to a bucket. This
worked for the first few customers, but it had three structural problems: runs
could not be retried partially, a single customer's bad data could block everyone
else's forecasts, and data scientists had no way to deploy a new model without
help from the platform team.

## Goals

- Make forecasts available on demand, not only after the nightly run.
- Isolate customers from each other, both for failures and for cost.
- Give data scientists a stable contract for packaging and releasing models.

## Architecture

The platform is split into three services that communicate through a task
queue and a shared feature store:

1. **Ingestion** validates customer data and writes normalised features.
2. **Orchestration** schedules forecast jobs, handles retries and records lineage.
3. **Serving** exposes forecasts and their confidence intervals over a REST API.

Models are packaged as containers that implement a tiny interface — `fit(features)`
and `predict(horizon)` — and are pulled by the orchestrator at run time. Because
the contract is deliberately small, a new model can go from notebook to production
in a day.

```python
class ForecastModel(Protocol):
    def fit(self, features: pd.DataFrame) -> None: ...
    def predict(self, horizon: int) -> pd.DataFrame: ...
```

## Implementation notes

The hardest part was not the happy path but **partial failure**. Every job is
idempotent and keyed by customer, model version and data snapshot, so a retry
simply recomputes what is missing. Results are written atomically and only then
made visible to the API, which removed an entire class of "half-updated forecast"
bugs.

Feature computation was the main cost driver. By caching expensive aggregates in
Redis and recomputing only the changed partitions, most daily runs touch less than
10% of the data.

## My contribution

I wrote the initial design, built the orchestration layer end to end and the
serving API, and set up the deployment pipeline with Terraform and Kubernetes. I
also ran the migration: customers were moved over one by one, with forecasts from
both systems compared side by side before each cut-over.
