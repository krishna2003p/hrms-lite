import { useState } from "react";
import api from "../../api/api";
import { useToast } from "../../context/ToastContext";

export default function EmployeeForm({ onSuccess }) {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!Object.values(form).every(Boolean)) {
      showToast("All fields are required", "error");
      return;
    }

    try {
      await api.post("/employees", form);
      showToast("Employee added successfully", "success");
      onSuccess();

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
    } catch (err) {
      showToast(err.response?.data?.detail || "Failed to add employee", "error");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Add Employee</h5>

        <form onSubmit={submit}>
          <input className="form-control mb-2" name="employee_id" placeholder="Employee Code" onChange={handleChange} value={form.employee_id} />
          <input className="form-control mb-2" name="full_name" placeholder="Full Name" onChange={handleChange} value={form.full_name} />
          <input type="email" className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} value={form.email} />
          <input className="form-control mb-3" name="department" placeholder="Department" onChange={handleChange} value={form.department} />

          <button className="btn btn-primary w-100">Add Employee</button>
        </form>
      </div>
    </div>
  );
}
