---
employer: software-interactive
name: System AI do klasyfikacji przyczyn ubytków paliwa na stacjach benzynowych
role: Machine Learning Engineer
summary: >-
  System wspierający analityków w ustalaniu przyczyn ubytków paliwa na stacjach
  na podstawie dziennych danych ze zbiorników. Łączy modele uczenia maszynowego
  z usługą API i zapisem informacji zwrotnej od analityków.
startDate: 2025-09
endDate: 2026-10
responsibilities:
  - Rozwijanie potoku przetwarzania danych i inferencji dla szeregów czasowych.
  - Trenowanie i ewaluacja modeli klasyfikacyjnych oraz wykrywających anomalie.
  - Tworzenie usługi REST udostępniającej wyniki analitykom.
  - Przygotowanie konteneryzacji, testów i dokumentacji do uruchamiania systemu.
  - Rozwój aplikacji do wizualizacji wyników
  - Tworzenie narzędzia do automatycznego doszkalania modelu AI
stack: [Python, FastAPI, MongoDB, CatBoost, scikit-learn, pandas, Docker, Streamlit, pytest]
---

Celem projektu jest przyspieszenie i usystematyzowanie pracy analityków przy wyjaśnianiu ubytków paliwa. System składa się z usługi REST, potoku uczenia maszynowego uruchamianego w ramach tej usługi oraz bazy danych przechowującej wyniki i decyzje analityków. Całość jest uruchamiana w kontenerach, a do wizualnej inspekcji wyników służy osobna aplikacja GUI. Decyzje są zbierane w bazie danych w celu późniejszego udoskonalania modelu sztucznej inteligencji
