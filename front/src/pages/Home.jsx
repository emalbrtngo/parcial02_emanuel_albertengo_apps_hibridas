import React from 'react'
import { Link } from 'react-router'
import TituloH1 from '../components/TituloH1'

export default function Home() {
  return (
    <div>
      <TituloH1 titulo="HP PERSONAJES" />
      <h2> Bienvenidos brujos y brujas</h2>

      <div className="card border-0 shadow-sm overflow-hidden my-4">
        <div className="row g-0 align-items-center">
          <div className="col-12 col-md-5">
            <img
              src='images/home1_characters-magic.jpg'
              className="img-fluid w-100"
              alt="Imagen de bienvenida al mundo mágico"
            />
          </div>
          <div className="col-12 col-md-7">
            <div className="card-body p-4 p-lg-5">
              <h2 className="h3 mb-3">El mundo de Harry Potter, en un solo lugar</h2>
              <p className="text-body-secondary">
                Explorá a los magos, brujas y criaturas de la saga, conocé sus casas, varitas y patronus,
                y dejá tus comentarios. Si te registrás, también podés crear tus propios personajes
                y armar tu colección.
              </p>
              <Link to="/personajes" className="btn btn-primary mt-2">
                Ver personajes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}