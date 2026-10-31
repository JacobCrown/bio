---
# DUMMY DATA — fictional project. Ongoing, featured, all optional fields filled.
dummy: true
name: tinytrack
summary: A minimal, self-hosted experiment tracker for machine learning that stores everything in a single SQLite file.
repo: https://github.com/example/tinytrack
demo: https://example.com/tinytrack
image: ../../assets/projects/shot-1.jpg
imageAlt: Dashboard showing a bar chart of experiment results
stack: [Python, SQLite, FastAPI, HTMX]
startDate: 2025-09
status: ongoing
featured: true
---

Most experiment trackers are built for teams and ship with a database server, a
message queue and a login screen. **tinytrack** is for the rest of us: one process,
one SQLite file, and a small dashboard to compare runs.

## Why

I wanted to track experiments on a laptop and on a single GPU box without running
any infrastructure, and without my results being locked in a hosted service.

## Features

- Log parameters, metrics and artifacts with three lines of Python.
- Compare runs side by side, with metrics plotted over time.
- Export everything to plain CSV or Parquet at any point.

## Status

Under active development. The logging API is stable; the dashboard is still
being reworked.
