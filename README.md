# ETIS – Event Traffic Intelligence System

## Overview

ETIS (Event Traffic Intelligence System) is an AI-powered traffic management platform designed to predict congestion caused by planned and unplanned events and provide intelligent resource deployment recommendations.

The system helps traffic authorities forecast traffic impact, allocate police personnel, recommend barricades and diversions, monitor incidents in real time, and collect citizen-reported traffic issues.

---

## Problem Statement

Traffic congestion caused by events such as:

* Road Accidents
* Political Rallies
* Festivals
* Sports Events
* Construction Activities
* Public Gatherings

often leads to delayed emergency response and inefficient deployment of traffic resources.

Current systems are mostly reactive and rely on manual decision-making.

ETIS provides a predictive and data-driven approach to traffic operations.

---

## Key Features

### AI Congestion Prediction

Predicts traffic congestion severity based on:

* Event Type
* Event Cause
* Priority
* Location
* Time Features
* Historical Event Patterns

---

### Severity Classification

Classifies incidents into:

* Low
* Medium
* High
* Critical

---

### Intelligent Resource Allocation

Recommends:

* Constables
* ASI Officers
* Inspectors
* Barricades
* Diversion Plans

based on predicted congestion levels.

---

### Auto Officer Dispatch

Automatically assigns available officers to high-priority incidents.

---

### Live Incident Map

Provides:

* Real-time incident visualization
* Heatmap generation
* Severity-based markers
* Geographic incident intelligence

---

### Citizen Incident Reporting

Users can report:

* Accidents
* Traffic Jams
* Road Closures
* Public Gatherings
* Construction Activities

with GPS coordinates.

---

### Operations Command Center

Provides:

* KPI Dashboard
* AI Recommendations
* Incident Timeline
* Resource Analytics
* Dispatch Monitoring
* Notifications

---

## System Architecture

Frontend (Next.js)

↓

FastAPI Backend

↓

Machine Learning Models

↓

PostgreSQL Database

↓

Real-Time Dashboard

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Leaflet

### Backend

* FastAPI
* Python
* Pydantic

### Database

* PostgreSQL

### Machine Learning

* Scikit-Learn
* Pandas
* NumPy

### Visualization

* Chart.js
* Leaflet Maps

---

## Dataset

The dataset contains:

* Event Information
* Event Type
* Event Cause
* Location Data
* Zone Information
* Priority Levels
* Road Closure Indicators
* Historical Congestion Records

Total Records: 8,173+

---

## ML Models

### Severity Prediction Model

Predicts:

* Low
* Medium
* High
* Critical

### Congestion Prediction Model

Predicts:

* Congestion Score (%)

### Resource Recommendation Model

Predicts:

* Constables Required
* ASI Required
* Inspector Required
* Barricades Required

### Diversion Recommendation Model

Predicts:

* No Diversion
* Partial Diversion
* Full Diversion

---

## Project Structure

frontend/
│
├── app/
├── components/
├── lib/
├── public/
└── middleware.ts

backend/
│
├── routes/
├── services/
├── models/
├── predictor.py
├── database.py
└── main.py

---

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Database

```sql
CREATE DATABASE etis;
```

Configure PostgreSQL connection in:

```python
database.py
```

---

## Demo Workflow

1. User reports an incident.
2. ETIS predicts congestion severity.
3. AI generates deployment recommendations.
4. Officers are automatically assigned.
5. Incident appears on the live dashboard.
6. Authorities monitor and manage the event in real time.

---

## Future Enhancements

* Real-Time Traffic APIs
* CCTV Integration
* Drone Surveillance Integration
* Mobile Application
* Route Optimization Engine
* Emergency Vehicle Priority Routing
* AI Chat Assistant for Operators

---

## Impact

ETIS enables:

* Faster Incident Response
* Reduced Traffic Congestion
* Smarter Resource Allocation
* Improved Public Safety
* Data-Driven Traffic Management

---

## Team

ETIS Development Team

Hackathon Project Submission 2026

Built using AI, Machine Learning, Geospatial Intelligence, and Modern Web Technologies.
