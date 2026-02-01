from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.dependencies import get_db
from app.schemas.attendance import AttendanceCreate
from datetime import date
from fastapi import Query
from typing import Optional

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("", status_code=201)
def mark_attendance(payload: AttendanceCreate, db: Session = Depends(get_db)):

    # ✅ 1. Validate employee exists
    employee = db.query(Employee).filter(Employee.id == payload.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # ✅ 2. Prevent duplicate attendance
    exists = db.query(Attendance).filter(
        Attendance.employee_id == payload.employee_id,
        Attendance.attendance_date == payload.date
    ).first()

    if exists:
        raise HTTPException(status_code=409, detail="Attendance already marked")

    attendance = Attendance(
        employee_id=payload.employee_id,
        attendance_date=payload.date,
        status=payload.status
    )

    db.add(attendance)
    db.commit()

    return {"message": "Attendance marked successfully"}



@router.get("", tags=["Attendance"])
def list_attendance(
    from_date: Optional[date] = Query(None),
    to_date: Optional[date] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Attendance)

    if from_date:
        query = query.filter(Attendance.attendance_date >= from_date)
    if to_date:
        query = query.filter(Attendance.attendance_date <= to_date)

    return query.all()
