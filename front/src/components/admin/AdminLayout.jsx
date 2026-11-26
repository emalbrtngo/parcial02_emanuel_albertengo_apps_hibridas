import { Link, NavLink, Outlet } from 'react-router'

export default function AdminLayout() {
  return (
    <>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand text-white">HPPersonajes - Admin</span>
          <div className="d-flex gap-3">
            <NavLink className="nav-link text-white" to="/admin/dashboard">Dashboard</NavLink>
            <Link className="nav-link text-white" to="/">
              Volver al sitio
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