import React from 'react'
import { Link } from 'react-router'

export default function MyCollection() {
  return (
    <div>
      <Link className="btn btn-primary" to="/personajes/nuevo">Crear nuevo personaje</Link>
      <div>
        Acá deberia mostrar todos los personajes creados del usuario y permitir editarlos o eliminarlos
      </div>
    </div>
  )
}
