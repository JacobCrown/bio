---
employer: software-interactive
name: AI System for Classifying Causes of Fuel Losses at Gas Stations
role: Machine Learning Engineer
summary: >-
  A system supporting analysts in determining the causes of fuel losses at gas stations, based on daily tank data. It combines machine learning models with an API service and records feedback from analysts.
startDate: 2025-09
endDate: 2026-10
responsibilities:
  - Developing data processing and inference pipelines for time series.
  - Training and evaluating classification and anomaly detection models.
  - Building a REST service that provides results to analysts.
  - Preparing containerization, tests and documentation for running the system.
  - Developing an application for visualizing results.
  - Building a tool for automatic retraining of the AI model.
stack: [Python, FastAPI, MongoDB, CatBoost, scikit-learn, pandas, Docker, Streamlit, pytest]
---

The goal of the project is to speed up and systematize analysts' work on explaining fuel losses. The system consists of a REST service, a machine learning pipeline run within that service, and a database storing the results and analysts' decisions. Everything runs in containers, and a separate GUI application is used for visual inspection of results. Decisions are collected in the database to later improve the AI model.
