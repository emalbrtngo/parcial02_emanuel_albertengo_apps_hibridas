import React, { useEffect, useState } from 'react'
import { useApiUsers } from '../../../services/users.service.js'
import { Link } from 'react-router'
import ItemLoadingSpinner from '../../../components/ItemLoadingSpinner'
import ErrorWithIcon from "../../../components/ErrorWithIcon"
import ConfirmModal from '../../../components/ConfirmModal.jsx'
import TituloH1 from '../../../components/TituloH1.jsx'
import { useNavigate } from 'react-router'


export default function Users() {
  const [usuarios, setUsuarios] = useState([])
  const [estado, setEstado] = useState('LOADING') 
  const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
]
  const { getUsers, deleteUser } = useApiUsers();
  const navigate = useNavigate()

const [aEliminar, setAEliminar] = useState(null) 

const onDelete = (id) => {
  deleteUser(id)
    .then(() => {
      setUsuarios(usuarios.filter((u) => u._id !== id))
      setAEliminar(null)//cierra modal                            
    })
    .catch(() => console.error("No se pudo eliminar el usuario"))
}

// const onFilter = (f) => {
//   console.log('Filtrar por: ' , f);
// }
  
    useEffect(() => {
      getUsers()
        .then((data) => {
          setUsuarios(data)
          setEstado("READY")
          // console.log('Usuarios traidos: ' , data);
          
        })
        .catch(() => setEstado("ERROR"))
    }, [])

    if (estado === "LOADING") {
      return <ItemLoadingSpinner />;
    }
    if (estado === "ERROR") {
      return <ErrorWithIcon message="Error al cargar los usuarios." />;
    }

  return (
    <div>
      <button className='btn btn-secondary'onClick={() => navigate(-1)}>Volver</button>
      <TituloH1 titulo='Usuarios'/>
      {/* <button className='btn btn-primary m-4' onClick={ () => onFilter('filtro')} >Ver Eliminados</button> */}
      <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th scope="col">Fecha creación</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>

      {
      usuarios.map( (user) => {
         return (
          <tr key={user._id}>
            <th scope="row">{user._id}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <select className="form-select" defaultValue={user.rol ?? "user"}>
                {roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </td>
            <td>{new Date(user.createdAt)
                .toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
            </td>
            <td>
              {/* <Link to={`/usuarios/${c._id}/editar`} className="btn btn-primary me-2">Editar</Link> */}
              <button onClick={() => setAEliminar(user)} className="btn btn-danger">Eliminar</button>
            <ConfirmModal
              show={aEliminar !== null}
              title="Eliminar usuario"
              message={`¿Seguro que querés eliminar a ${aEliminar?.username}?`}
              confirmText="Eliminar"
              onConfirm={() => onDelete(aEliminar._id)}
              onCancel={() => setAEliminar(null)}
            />
            </td>
          </tr>
         )
         
        })
      }
  </tbody>
</table>
    </div>
  )
}
