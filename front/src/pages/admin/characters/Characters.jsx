import React, { useEffect, useState } from 'react'
import { useApiCharacters } from '../../../services/character.service'
import { Link } from 'react-router'
import ItemLoadingSpinner from '../../../components/ItemLoadingSpinner'
import ErrorWithIcon from "../../../components/ErrorWithIcon"

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [estado, setEstado] = useState('LOADING')
  // const { getCharacters } = useApiCharacters();
  
    const fetchApi = async () => {
      setEstado("LOADING");
      const { getCharacters } = useApiCharacters();
      try {
        const data = await getCharacters();
        setCharacters(data);
        console.log(data);
        
        setEstado("READY");
      } catch (error) {
        setEstado("ERROR");
      }
    };
  
    useEffect(() => {
      fetchApi();
    }, []);

    if (estado === "LOADING") {
      return <ItemLoadingSpinner />;
    }
    if (estado === "ERROR") {
      return <ErrorWithIcon message="Error al cargar los personajes." />;
    }

  return (
    <div>
      {/* {characters} */}
      <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Casa</th>
      <th scope="col">Autor</th>
      <th scope="col">Fecha creación</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>

      {
      characters.map( (c) => {
         return (
          <tr key={c._id}>
            <th scope="row">{c._id}</th>
            <td>{c.name}</td>
            <td>{c.house}</td>
            <td>{c.userId ? c.userId : 'Oficial'}</td>
            <td>{c.createdAt ? c.createdAt : 'Oficial'}</td>
            <td>
              <Link to={`/personajes/${c._id}/editar`} className="btn btn-primary me-2">Editar</Link>
              <Link to={`/personajes/${c._id}/eliminar`} className="btn btn-danger">Eliminar</Link>
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
