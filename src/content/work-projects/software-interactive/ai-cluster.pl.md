---
employer: software-interactive
name: Serwer obliczeniowy AI
role: Computer Vision Engineer/Software Developer/MLOps
summary: >-
  System wspomagający pracę ludzkich annotatorów, oznaczający różnorodne elementy na nagraniach z polskich dróg. System umożliwia automatyczne wykrywanie i oznaczanie takich elementów jak: reklamy, znaki pionowe, znaki poziome (linie), urządzenia bezpieczeństwa drogowego, obiekty infrastruktury drogowej (studzienki, kanalizacja, hydranty, przystanki). Udostępniony jako serwer on-premise, działający na dostarczonych nagraniach z dysków na infrastrukturze klienckiej.

startDate: 2025-04
endDate: 2026-09
responsibilities:
  - Projektowanie rozwiązania od podstaw zgodnie z potrzebami klienta.
  - Ścisła współpraca z zespołem odpowiedzialnym za warstwę wizualną aplikacji.
  - Zarządzanie zespołem annotatorów danych oraz kontrolowanie prac w celu otrzymania najwyższej jakości danych treningowych.
  - Trenowanie modeli wizyjnych z kategorii detekcji obiektów, segmentacji semantycznej, segmentacji instancyjnej oraz lokalizacji punktów.
  - Śledzenie metryk treningowych oraz wersjonowanie modeli oraz zbiorów uczących (dvc).
  - Optymalizowanie modeli wizyjnych w celu przyspieszenia czasu działania.
  - Budowa asynchronicznego przetwarzania zadań i integracji z bazą danych.
  - Projektowanie usługi REST udostępniającej przetwarzanie innym systemom.
  - Konteneryzacja, testy automatyczne oraz przygotowanie wdrożenia lokalnego (on-premise).
achievements:
  - Zautomatyzowanie czynności wykonywanych wcześniej ręcznie przez annotatorów.
  - Modułowa konstrukcja, która pozwala dodawać kolejne typy wykrywanych obiektów.
stack: [Python, FastAPI, Celery, RabbitMQ, PyTorch, OpenCV, SQL Server, SQLAlchemy, Docker, DVC, Azure, pytest]
---

Celem projektu jest automatyzacja ewidencji dróg na podstawie dużych zbiorów zdjęć, w tym wykrywanie i klasyfikacja elementów infrastruktury (znaki pionowe, poziome, studzienki, hydranty, drzewa). System składa się z usługi REST, kolejki zadań i niezależnych procesów roboczych, w których modele ML działają na GPU. Wyniki trafiają do relacyjnej bazy danych. Całość jest uruchamiana w kontenerach.
