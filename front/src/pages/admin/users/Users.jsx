import React, { useEffect, useState } from 'react'
//falta crear useApiUsers
// import { useApiUsers } from '../../../services/user.service'
import { Link } from 'react-router'
import ItemLoadingSpinner from '../../../components/ItemLoadingSpinner'
import ErrorWithIcon from "../../../components/ErrorWithIcon"

const testUsers = [
  {
    _id: '1',
    username: 'testuser1',
    email: 'testuser1@example.com',
    role: 'User',
    createdAt: '2024-06-01'
  },
  {
    _id: '2',
    username: 'testuser2',
    email: 'testuser2@example.com',
    role: 'Admin',
    createdAt: '2024-06-02'
  }
]

export default function Users() {
  const [usuarios, setUsuarios] = useState(testUsers)
  const [estado, setEstado] = useState('READY') // <<<<< CAMBIAR A LOADING PARA CUANDO FUNCIONE
  const roles = ['Admin', 'User']
  // const { getCharacters } = useApiCharacters();
  
    const fetchApi = async () => {
      setEstado("LOADING");
      const { getUsers } = useApiUsers();
      try {
        const data = await getUsers();
        setUsuarios(data);
        console.log(data);
        
        setEstado("READY");
      } catch (error) {
        setEstado("ERROR");
      }
    };
   // DESCOMENTAR PARA TRAER USUARIOS
    // useEffect(() => {
    //   fetchApi();
    // }, []);

    if (estado === "LOADING") {
      return <ItemLoadingSpinner />;
    }
    if (estado === "ERROR") {
      return <ErrorWithIcon message="Error al cargar los usuarios." />;
    }

  return (
    <div>
      {/* {characters} */}
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
      usuarios.map( (c) => {
         return (
          <tr key={c._id}>
            <th scope="row">{c._id}</th>
            <td>{c.username}</td>
            <td>{c.email}</td>
            <td>
              <select className="form-select" defaultValue={c.role ? c.role : 'User'}>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </td>
            <td>{c.createdAt}</td>
            <td>
              <Link to={`/usuarios/${c._id}/editar`} className="btn btn-primary me-2">Editar</Link>
              <Link to={`/usuarios/${c._id}/eliminar`} className="btn btn-danger">Eliminar</Link>
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
