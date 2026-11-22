import React from "react";
import { Link } from "react-router";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            HPWorld
          </Link>

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item">
                {!user && 
                  <Link className="nav-link" to="/login"> Login </Link>
                }
              </li>
              <li className="nav-item">
                {user && 
                  <Link className="nav-link" to="/miperfil"> Mi Perfil </Link>
                }
              </li>
              {user && user.rol === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Panel</Link>
                </li>
              )}
            </ul>

            <form className="d-flex mb-3" action="/personajes" method="GET">
              <input
                className="form-control me-2"
                type="text"
                name="title"
                placeholder="Buscar por nombre..."
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
