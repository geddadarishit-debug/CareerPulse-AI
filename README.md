CareerPulse AI 🚀
AI-Powered Career Intelligence & Resume Analysis Platform
<p align="center"> <img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge"/> <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi"/> <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react"/> <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/> </p>
📌 Overview

CareerPulse AI is an intelligent career guidance platform that analyzes resumes, identifies skill gaps, recommends career paths, suggests projects, generates personalized learning roadmaps, and prepares users for interviews.

Unlike traditional resume analyzers, CareerPulse AI focuses on helping students and job seekers understand where they stand today and what they need to do to become industry-ready.

This project was developed as a full-stack AI-powered web application using React, FastAPI, SQLAlchemy, and SQLite, following a modular and scalable architecture.

✨ Features
🔐 Authentication
User Registration
Secure Login
JWT Authentication
Protected APIs
Current User Authentication
Logout Support
📄 Resume Management
Upload PDF Resume
Automatic PDF Text Extraction
Resume Storage
Resume History
Resume Retrieval
Resume Management Dashboard
🤖 AI Resume Analysis

CareerPulse AI analyzes uploaded resumes and generates:

Career Score
Skills Found
Missing Skills
Rising Industry Skills
Dead/Outdated Skills
Career Readiness Assessment
🎯 Career Intelligence

The platform recommends:

Best Matching Career Roles
Skill Gap Analysis
Personalized Learning Roadmap
Weekly Learning Plan
Project Recommendations
Interview Preparation Plan
⏳ Career Time Machine

Predicts future career growth by providing:

Current Career Stage
6-Month Career Outlook
1-Year Career Outlook
Risk Factors
Priority Action Plan
💼 Job Recommendation Engine

Based on the resume analysis, CareerPulse AI recommends:

Suitable Job Roles
Match Percentage
Missing Skills
Priority Skills
Improvement Suggestions
📚 Learning Roadmap

Generates:

Weekly Learning Goals
Skill Development Plan
Practical Project Suggestions
Deployment Recommendations
Resume Improvement Tips
🎨 Modern Dashboard
Responsive Design
Interactive Cards
Career Analytics
Resume Insights
Skill Visualization
Analysis History
Professional UI
🏗️ Tech Stack
Frontend
React.js
React Router
Axios
Context API
CSS
Backend
FastAPI
SQLAlchemy
Pydantic
JWT Authentication
PyMuPDF
Werkzeug Security
Database
SQLite
AI / Analysis Engine
Resume Parser
Skill Extraction Engine
Career Score Engine
Gap Analyzer
Role Matching Engine
Learning Roadmap Generator
Project Recommendation Engine
Interview Planner
Career Time Machine
📁 Project Structure
CareerPulse-AI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
⚙️ Installation
Clone Repository
git clone https://github.com/yourusername/CareerPulse-AI.git

cd CareerPulse-AI
Backend Setup
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

Swagger API:

http://localhost:8000/docs
Frontend Setup
cd frontend

npm install

npm run dev

Frontend runs at:

http://localhost:5173
API Flow
User

↓

Register / Login

↓

JWT Authentication

↓

Upload Resume

↓

PDF Parsing

↓

Resume Analysis Engine

↓

Career Intelligence Engine

↓

Store Results

↓

Dashboard

↓

Career Recommendations
Current Analysis Includes
Career Score
Skills Found
Missing Skills
Dead Skills
Rising Skills
Role Fit
Weekly Learning Plan
Smart Roadmap
Career Time Machine
Interview Plan
Job Recommendations
Project Recommendations

Future Roadmap (Version 2)

CareerPulse AI Version 2 will introduce:

Live Job Market Integration
ATS Resume Score
AI Resume Improvement Suggestions
LLM-Based Career Coach
Real-Time Skill Trends
Salary Insights
Course Recommendations
AI Mock Interviews
Portfolio Analyzer
Resume Version Comparison
Career Progress Tracking
Industry Trend Dashboard
Recruiter Insights
Security
JWT Authentication
Password Hashing
Protected Routes
Secure API Validation
Input Validation
Environment Variable Configuration
Highlights
Modular Architecture
Scalable Design
RESTful APIs
Responsive UI
Clean Code Structure
Repository Pattern
Service Layer Architecture
Separation of Concerns
Author

Geddada Rishit

GitHub: https://github.com/geddadarishit-debug

Acknowledgements

Special thanks to the open-source community and the creators of:

FastAPI
React
SQLAlchemy
PyMuPDF
Pydantic
JWT
Werkzeug
