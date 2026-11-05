---
name: dnn-pytorch
summary: >-
  Library for training vision models (classification and segmentation) from a YAML config file, with experiment tracking and automatic charts.
repo: https://github.com/JacobCrown/dnn-pytorch
stack: [Python, PyTorch, timm, Hydra, MLflow, Albumentations, smp, OmegaConf]
startDate: 2025-11
status: ongoing
featured: true
---

Two commands, `dnn-train-classification` and `dnn-train-segmentation`, start a training run from a YAML file. Each experiment logs the model, metrics, charts and predictions to MLflow.

## Classification

Any model from timm. Images live in `train`, `val` and `test` folders, and the folder name is the class. A run produces accuracy curves, a confusion matrix, per-class accuracy, an augmentation preview and predictions from the best model.

## Segmentation

Any architecture and encoder from segmentation_models_pytorch. Masks are RGB images, and the color-to-class mapping sits in the config. A run produces IoU curves, per-class mIoU, the pixel share of each class, an augmentation preview and predictions next to the ground truth.

## Configuration

Hydra and OmegaConf keep the model, Albumentations pipelines (including `OneOf`), losses, the optimizer and the dataset in YAML. SMP losses can be mixed with weights, for example 0.8 × Jaccard and 0.2 × Dice. The backbone can be frozen so only the head trains, classes can be merged without rewriting the files, and training can resume from a checkpoint.

## Experiment sweeps

`--multirun` launches several variants at once, such as a few models and batch sizes. Every run stores metrics, parameters, artifacts and checkpoints in MLflow, so the runs can be compared side by side.
