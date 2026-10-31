---
# DUMMY DATA — fictional project. Medium-length body, no achievements, no links.
dummy: true
employer: northwind-analytics
name: Customer Data Ingestion Pipeline
role: Backend Engineer
summary: >-
  Built a validated, replayable ingestion pipeline for heterogeneous retail data
  feeds.
startDate: 2022-04
endDate: 2022-06
responsibilities:
  - Implemented schema validation and a quarantine queue for malformed records.
  - Wrote adapters for CSV, SFTP and webhook-based customer feeds.
stack: [Python, Pydantic, PostgreSQL, Airflow]
---

My first project at the company. Customers send data in wildly different shapes,
so the pipeline normalises everything into a single internal schema and keeps the
raw input so that any run can be replayed. Records that fail validation go to a
quarantine queue with a human-readable reason instead of failing the whole batch.
