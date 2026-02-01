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


## Database Setup (Required)

This project uses **MySQL** as the database.

Before running the backend, please ensure:

### 1. MySQL is installed and running
```bash
mysql --version


Login to MySQL:

mysql -u root -p


Create database:

CREATE DATABASE hrms_lite;


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
