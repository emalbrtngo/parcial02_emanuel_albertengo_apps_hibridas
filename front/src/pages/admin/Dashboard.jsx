import React from 'react'
import { Link } from 'react-router'

export default function Dashboard() {
  return (
    <div>
      Dashboard de administrador
      <div>
        <Link to="/admin/characters" className="btn btn-primary me-2">Administrar Personajes</Link>
        <Link to="/admin/users" className="btn btn-primary">Administrar Usuarios</Link>
      </div>
    </div>
  )
}
