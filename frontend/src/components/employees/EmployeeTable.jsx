import api from "../../api/api";
import { useToast } from "../../context/ToastContext";

export default function EmployeeTable({ employees, refresh }) {
  const { showToast } = useToast();

  const remove = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      showToast("Employee deleted successfully", "success");
      refresh();
    } catch (err) {
      showToast(
        err.response?.data?.detail || "Failed to delete employee",
        "error"
      );
    }
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Emp Code</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center">
              No employees found
            </td>
          </tr>
        )}

        {employees.map((e) => (
          <tr key={e.id}>
            <td>{e.employee_id}</td>
            <td>{e.full_name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => remove(e.id)}  
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
