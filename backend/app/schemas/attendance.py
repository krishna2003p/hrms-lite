from pydantic import BaseModel
from datetime import date
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"

class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus
