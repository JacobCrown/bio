---
employer: software-interactive
name: Aplikacja wsparcia kurierów
role: Backend Developer
summary: >-
  System dla kurierów poruszający się na rowerach elektrycznych z przyczepką (urb-e bike) wykonujących dostawy "Last Mile delivery". Umożliwiający śledzenie lokalizacji kuriera, obliczający optymalne trasy dostawy oraz odbioru przesyłki. 
startDate: 2023-03
endDate: 2023-08
responsibilities:
  - Współpraca z frontendowcami
  - Rozwój aplikacji backendowej
  - Wdrażanie systemu na produkcję
  - Projektowanie bazy danych i dokonywanie migracji
  - Pisanie testów 
  - Raportowanie postępu na spotkaniach tygodniowych
  - Modułowa konstrukcja, która pozwala dodawać kolejne typy wykrywanych obiektów.
stack: [Python, Django, Postgres]
---

## Cele i architektura

Celem projektu jest zarządzenie ostatnim odcinkiem dostawy dla kurierów na rowerach elektrycznych z przyczepką. Aplikacja na bieżąco śledzi położenie kuriera i na tej podstawie układa kolejność doręczeń oraz odbiorów, tak aby trasa była krótsza i dało się ją zamknąć w zaplanowanym oknie czasowym. Backend w Django udostępnia te wyliczenia aplikacji klienckiej, a Postgres przechowuje zlecenia, pozycje i historię przejazdów. Aplikacja fronendowa napisana w React wyświetla dane i umożliwia ich zarządzaniem z poziomu GUI

