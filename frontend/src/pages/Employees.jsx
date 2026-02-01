import { useEffect, useState } from "react";
import api from "../api/api";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/employees");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <EmployeeForm onSuccess={load} />

      {loading && <Loader />}
      {!loading && employees.length === 0 && <EmptyState message="No employees found" />}
      {!loading && employees.length > 0 && <EmployeeTable employees={employees} refresh={load} />}
    </>
  );
}
