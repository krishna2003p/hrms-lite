import { useEffect, useState } from "react";
import api from "../../api/api";
import { useToast } from "../../context/ToastContext";

export default function AttendanceForm() {
  const { showToast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "PRESENT",
  });

  useEffect(() => {
    api.get("/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => showToast("Failed to load employees", "error"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.employee_id || !form.date) {
      showToast("Employee and date are required", "error");
      return;
    }

    try {
      await api.post("/attendance", {
        employee_id: Number(form.employee_id),
        date: form.date,
        status: form.status,
      });

      showToast("Attendance marked successfully", "success");

      setForm({ employee_id: "", date: "", status: "PRESENT" });
    } catch (err) {
      showToast(err.response?.data?.detail || "Attendance failed", "error");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Mark Attendance</h5>

        <form onSubmit={submit}>
          <select className="form-select mb-2" name="employee_id" value={form.employee_id} onChange={handleChange}>
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.employee_id} - {e.full_name}
              </option>
            ))}
          </select>

          <input type="date" className="form-control mb-2" name="date" value={form.date} onChange={handleChange} />

          <select className="form-select mb-3" name="status" value={form.status} onChange={handleChange}>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>

          <button className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}
