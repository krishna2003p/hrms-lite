from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeOut
from app.dependencies import get_db
from sqlalchemy import func
from app.models.attendance import Attendance, AttendanceStatus

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("", response_model=EmployeeOut, status_code=201)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):
    exists = db.query(Employee).filter(
        (Employee.employee_id == payload.employee_id) |
        (Employee.email == payload.email)
    ).first()

    if exists:
        raise HTTPException(status_code=409, detail="Employee already exists")

    employee = Employee(**payload.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

@router.get("", response_model=list[EmployeeOut])
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@router.delete("/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()

@router.get("/summary/present-days")
def present_days_summary(db: Session = Depends(get_db)):
    rows = (
        db.query(
            Employee.id,
            Employee.employee_id,
            Employee.full_name,
            func.count(Attendance.id).label("present_days"),
        )
        .join(Attendance, Attendance.employee_id == Employee.id, isouter=True)
        .filter(Attendance.status == AttendanceStatus.PRESENT)
        .group_by(Employee.id)
        .all()
    )

    # ✅ Convert rows to JSON-serializable dicts
    return [
        {
            "id": r.id,
            "employee_id": r.employee_id,
            "full_name": r.full_name,
            "present_days": r.present_days,
        }
        for r in rows
    ]

@router.get("/summary/dashboard")
def dashboard_summary(db: Session = Depends(get_db)):
    total_employees = db.query(Employee).count()
    total_attendance = db.query(Attendance).count()

    total_present = db.query(Attendance).filter(
        Attendance.status == AttendanceStatus.PRESENT
    ).count()

    total_absent = db.query(Attendance).filter(
        Attendance.status == AttendanceStatus.ABSENT
    ).count()

    return {
        "employees": total_employees,
        "attendance": total_attendance,
        "present": total_present,
        "absent": total_absent,
    }