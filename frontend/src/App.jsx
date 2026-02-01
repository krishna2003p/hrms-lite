import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";
import EmployeeSummary from "./pages/EmployeeSummary";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/summary" element={<EmployeeSummary />} />
      </Route>
    </Routes>
  );
}
