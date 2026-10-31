---
employer: software-interactive
name: Serwer obliczeniowy AI
role: Computer Vision Engineer/Software Developer/MlOps
summary: >-
  Zaprojektowanie, implementacja, wdrożenie i utrzymanie serwera obliczeniowego do autmatyzacji zadań wspomagający annotatorów. Serwer odpowiedzialny jest za wykrywanie i oznaczanie obiektów na zdjęciach, np. znaków pionowych, poziomych, reklam, drzew na potrzeby ewidencji dróg.

startDate: 2025-03
endDate: 2026-09
responsibilities:
  - Budowa asynchronicznego przetwarzania zadań i integracji z bazą danych.
  - Projektowanie usługi REST udostępniającej przetwarzanie innym systemom.
  - Konteneryzacja, testy automatyczne oraz przygotowanie wdrożenia lokalnego (on-premise).
achievements:
  - Zautomatyzowanie czynności wykonywanych wcześniej ręcznie przez annotatorów.
  - Modułowa konstrukcja, która pozwala dodawać kolejne typy wykrywanych obiektów.
stack: [Python, FastAPI, Celery, RabbitMQ, PyTorch, OpenCV, SQL Server, SQLAlchemy, Docker, DVC, Azure, pytest]
---

## Cele i architektura

Celem projektu jest automatyzacja ewidencji dróg na podstawie dużych zbiorów zdjęć, w tym wykrywanie i klasyfikacja elementów infrastruktury (znaki pionowe, poziome, studzienki, hydranty, drzewa). System składa się z usługi REST, kolejki zadań i niezależnych procesów roboczych, w których modele ML działają na GPU. Wyniki trafiają do relacyjnej bazy danych. Całość jest uruchamiana w kontenerach.
