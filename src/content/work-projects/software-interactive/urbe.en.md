---
employer: software-interactive-initial
name: Courier Support Application
role: Backend Developer
summary: >-
  A system for couriers riding electric bikes with a trailer (urb-e bike), who make last-mile deliveries. It tracks the courier's location and calculates the order of deliveries and pickups.
startDate: 2022-03
endDate: 2022-08
responsibilities:
  - Collaboration with frontend developers
  - Developing the backend application
  - Deploying the system to production
  - Designing the database and performing migrations
  - Writing tests
  - Reporting progress at weekly meetings
stack: [Python, Django, Postgres, pytest, Sentry]
---

The goal of the project is to manage the last leg of deliveries for couriers riding electric bikes with a trailer. The application tracks the courier's location in real time and, based on it, arranges the order of deliveries and pickups so that the route is shorter and can be completed within the planned time window. The Django backend provides these calculations to the mobile app, and Postgres stores orders, positions and trip history. The frontend application, written in React, displays the data and allows managing it through a GUI.
