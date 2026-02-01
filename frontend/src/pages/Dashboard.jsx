import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/employees/summary/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="row">
      {[
        ["Employees", stats.employees, "primary"],
        ["Attendance", stats.attendance, "secondary"],
        ["Present", stats.present, "success"],
        ["Absent", stats.absent, "danger"],
      ].map(([label, value, color]) => (
        <div className="col-md-3" key={label}>
          <div className={`card text-white bg-${color} mb-3`}>
            <div className="card-body text-center">
              <h5>{label}</h5>
              <h2>{value ?? 0}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
