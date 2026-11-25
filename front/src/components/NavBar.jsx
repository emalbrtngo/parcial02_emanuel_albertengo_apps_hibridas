import { Link } from "react-router";
import { useSession } from "../context/session.context.jsx";

// const user = JSON.parse(localStorage.getItem("user"));
export default function NavBar() {
  const {user , rol} = useSession()
  // console.log(rol);
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <Link className="navbar-brand" to="/">
              HPP
            </Link>
            {user && rol() === 'admin' && (
              <Link className="nav-link small" to="/admin">Admin Panel</Link>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/personajes">
                  Personajes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/micolleccion">
                  Mi Colección
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login"> Login </Link>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register"> Registrarse </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout"> Cerrar Sesión </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}