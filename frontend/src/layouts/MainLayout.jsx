import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();

  const nav = (path) =>
    `nav-link ${pathname === path ? "active fw-bold" : ""}`;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">HRMS Lite</Link>

        <div className="navbar-nav">
          <Link className={nav("/")} to="/">Employees</Link>
          <Link className={nav("/attendance")} to="/attendance">Mark Attendance</Link>
          <Link className={nav("/attendance-list")} to="/attendance-list">Attendance List</Link>
          <Link className={nav("/summary")} to="/summary">Summary</Link>
          <Link className={nav("/dashboard")} to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}
