import { useEffect, useState } from "react";
import api from "../api/api";

export default function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({ from: "", to: "" });

  const fetchData = async () => {
    const params = {};
    if (filter.from) params.from_date = filter.from;
    if (filter.to) params.to_date = filter.to;

    const res = await api.get("/attendance", { params });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Attendance Records</h5>

        <div className="row mb-3">
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary w-100" onClick={fetchData}>
              Filter
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.employee_id}</td>
                <td>{r.attendance_date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
