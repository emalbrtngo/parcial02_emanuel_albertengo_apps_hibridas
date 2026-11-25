import { Link } from 'react-router'
import { useSession } from '../../context/session.context'

const secciones = [
  {
    titulo: "Personajes",
    icono: "bi-people-fill",
    ruta: "/admin/characters",
  },
  {
    titulo: "Usuarios",
    icono: "bi-person-gear",
    ruta: "/admin/users",
  },
]

export default function Dashboard() {
  const { user } = useSession()

  return (
    <div>
      <h1 className="h3 mb-1">ADMIN PANEL</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {secciones.map((seccion) => (
          <div className="col" key={seccion.ruta}>
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <i className={`bi ${seccion.icono} display-4 text-primary`}></i>
              <h2 className="h4 mt-3">{seccion.titulo}</h2>
              <Link to={seccion.ruta} className="btn btn-primary mt-auto">
                Ir a {seccion.titulo.toLowerCase()}
              </Link>
            </div>
          </div>
        ))}
      </div>    
    </div>
  )
}