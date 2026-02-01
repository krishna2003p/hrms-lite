from pydantic import BaseModel, EmailStr

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeOut(EmployeeCreate):
    id: int

    class Config:
        orm_mode = True
