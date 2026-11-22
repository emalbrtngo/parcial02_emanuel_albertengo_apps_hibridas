import { Link, NavLink, Outlet } from 'react-router'

export default function AdminLayout() {
  return (
    <>
      <nav className="navbar bg-secondary">
        <div className="container-fluid">
          <span className="navbar-brand">HPWorld · Admin</span>
          <div className="d-flex gap-3">
            <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
            <Link className="nav-link" to="/">
              <i className="bi bi-box-arrow-left me-1"></i>Volver al sitio
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  )
}