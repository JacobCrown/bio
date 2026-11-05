---
employer: software-interactive
name: AI Compute Server
role: Computer Vision Engineer/Software Developer/MLOps
summary: >-
  A system supporting human annotators by labeling various elements in recordings from Polish roads. It enables automatic detection and labeling of elements such as advertisements, vertical signs, horizontal signs (road markings), road safety devices and road infrastructure objects (manholes, sewers, hydrants, bus stops). Delivered as an on-premise server, working on recordings stored on drives in the client's infrastructure.

startDate: 2025-04
endDate: 2026-09
responsibilities:
  - Designing the solution from scratch according to the client's needs.
  - Close collaboration with the team responsible for the application's visual layer.
  - Managing the team of data annotators and supervising their work to ensure the highest quality of training data.
  - Training computer vision models for object detection, semantic segmentation, instance segmentation and keypoint localization.
  - Tracking training metrics and versioning models and training datasets (DVC).
  - Optimizing vision models to speed up inference.
  - Building asynchronous task processing and database integration.
  - Designing a REST service that provides processing to other systems.
  - Containerization, automated tests and preparation of the on-premise deployment.
achievements:
  - Automated tasks that annotators previously performed manually.
  - Modular design that allows adding further types of detected objects.
stack: [Python, FastAPI, Celery, RabbitMQ, PyTorch, OpenCV, SQL Server, SQLAlchemy, Docker, DVC, Azure, pytest, Jira]
---

The goal of the project is to automate road inventory based on large sets of photos, including detection and classification of road infrastructure elements (vertical signs, horizontal signs, manholes, hydrants, trees). The system consists of a REST service, a task queue and independent worker processes in which ML models run on GPUs. Results are stored in a relational database. The whole system runs in containers.
