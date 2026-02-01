# HRMS Lite – Full Stack Application

A lightweight HRMS system built using **React**, **FastAPI**, and **MySQL**.

---

## Tech Stack
- Frontend: React (Vite) + Bootstrap
- Backend: FastAPI + SQLAlchemy
- Database: MySQL

---

## Project Structure
hrms-lite/
├── backend/ # FastAPI backend
├── frontend/ # React frontend


---

## Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload



cd frontend
npm install
npm run dev
