import React, { useEffect, useState } from 'react'
import { useApiCharacters } from '../../../services/character.service'
import { Link } from 'react-router'
import ItemLoadingSpinner from '../../../components/ItemLoadingSpinner'
import ErrorWithIcon from "../../../components/ErrorWithIcon"
import TituloH1 from '../../../components/TituloH1'
import Pagination from '../../../components/Pagination'
import CharacterFilters from '../../../components/CharacterFilters'
import { useNavigate } from 'react-router'

const LIMIT = 20 

function limpiarFiltros(filtros) {
  return Object.fromEntries(Object.entries(filtros).filter(([, valor]) => valor))
}

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [estado, setEstado] = useState('LOADING')
  const [currentPage, setCurrentPage] = useState(1)
  const [filtros, setFiltros] = useState({})
  const navigate = useNavigate()
  const { getCharacters } = useApiCharacters();

  useEffect(() => {
    setEstado("LOADING");
    getCharacters({ ...limpiarFiltros(filtros), page: currentPage, limit: LIMIT })
      .then((data) => {
        setCharacters(data);
        setEstado("READY");
      })
      .catch(() => setEstado("ERROR"));
  }, [currentPage, filtros]);

  const handleFilter = (nuevosFiltros) => {
    setFiltros(nuevosFiltros)
    setCurrentPage(1)
  }

  const hasNext = characters.length === LIMIT

  return (
    <div>
      {/* {characters} */}
      <button className='btn btn-secondary' onClick={() => navigate(-1)}>Volver</button>
      <TituloH1 titulo={'Personajes'}/>

      <CharacterFilters onFilter={handleFilter} />

      {estado === "LOADING" && <ItemLoadingSpinner />}
      {estado === "ERROR" && <ErrorWithIcon message="Error al cargar los personajes." />}

      {estado === "READY" && (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
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
                {characters.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-body-secondary py-4">No se encontraron personajes.</td>
                  </tr>
                )}

                {
                characters.map( (c) => {
                  return (
                    <tr key={c._id}>
                      <th scope="row">{c._id}</th>
                      <td>{c.name}</td>
                      <td>{c.house || 'Sin casa'}</td>
                      <td>{c.authorUsername ? c.authorUsername : 'Oficial'}</td>
                      <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString("es-AR") : 'No disponible'}</td>
                      <td className="text-nowrap">
                        <Link to={`/admin/characters/edit/${c._id}`} className="btn btn-primary me-2">Editar</Link>
                        <Link to={`/admin/characters/delete/${c._id}`} className="btn btn-danger">Eliminar</Link>
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} hasNext={hasNext} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  )
}