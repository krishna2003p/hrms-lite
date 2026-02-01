import { useEffect, useState } from "react";
import api from "../api/api";

export default function EmployeeSummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/employees/summary/present-days").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Present Days Summary</h5>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Name</th>
              <th>Present Days</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td>{e.employee_id}</td>
                <td>{e.full_name}</td>
                <td>{e.present_days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
