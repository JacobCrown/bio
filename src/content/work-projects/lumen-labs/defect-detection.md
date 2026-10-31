---
# DUMMY DATA — fictional project. Computer vision; dates, long body, links.
dummy: true
employer: lumen-labs
name: Surface Defect Detection
role: Computer Vision Engineer
summary: >-
  Developed the vision model and inference pipeline that detects surface defects
  on production lines in real time.
startDate: 2019-11
endDate: 2021-08
responsibilities:
  - Trained and evaluated segmentation models on highly imbalanced data.
  - Built the labelling workflow and the active-learning loop around it.
  - Optimised inference to run on edge GPUs next to the production line.
achievements:
  - Reached 97% recall on critical defects at a false-positive rate below 1%.
  - Reduced inference time per frame from 180 ms to 28 ms using quantisation and TensorRT.
stack: [Python, PyTorch, OpenCV, ONNX, TensorRT, C++, Docker]
links:
  - label: Conference talk
    url: https://example.com/talk
---

## Problem

Customers needed to find scratches, dents and coating flaws on metal parts moving
past a camera at line speed. Defects are rare — fewer than one in a thousand
frames — and look very different from one product to another.

## Approach

A U-Net-style segmentation model was trained on crops around candidate regions
rather than whole frames, which helped enormously with class imbalance. New
defect types were handled with an **active-learning loop**: the model flags
uncertain frames, operators label them in a small web tool, and a retrained model
is validated automatically before it is allowed to replace the production one.

## Deployment

Models were exported to ONNX, converted to TensorRT engines and served from a C++
inference service. The Python training code and the C++ service shared a single
preprocessing specification, with tests that compared outputs numerically, so
that training and production could not silently drift apart.
