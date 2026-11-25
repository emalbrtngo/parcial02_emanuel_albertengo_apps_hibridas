"use no memo" // compileerrrr siempre lo mismo
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiCharacters } from "../services/character.service.js"
import UserCard from "../components/UserCard.jsx"
import CharacterCard from "../components/CharacterCard.jsx"
import ConfirmModal from "../components/ConfirmModal.jsx"
import ItemLoadingSpinner from "../components/ItemLoadingSpinner.jsx"
import ErrorWithIcon from "../components/ErrorWithIcon.jsx"
import { useSession } from "../context/session.context.jsx"

export default function MyCollection() {
  // TODO: cuando esté el Context, reemplazar por: const user = useUser()
  const { user } = useSession()

  const { getCharacters, deleteCharacter } = useApiCharacters()
  const [characters, setCharacters] = useState([])
  const [estado, setEstado] = useState("LOADING")
  const [aEliminar, setAEliminar] = useState(null) 
  const [borrando, setBorrando] = useState(false)

  useEffect(() => {
    if (!user) return
    getCharacters({ author: user._id, limit: 100 }) // mando filtros de autor
      .then((data) => {
        setCharacters(data)
        setEstado("READY")
      })
      .catch(() => setEstado("ERROR"))
  }, [user?._id, characters])

  const handleDelete = () => {
    setBorrando(true)
    deleteCharacter(aEliminar._id)
      .then(() => {
        setCharacters(characters.filter((c) => c._id !== aEliminar._id))
        setAEliminar(null)
      })
      .catch(() => console.error("No se pudo eliminar el personaje"))
      .finally(() => setBorrando(false))
  }

  return (
    <div className="container py-4">

      <UserCard user={user} totalCharacters={characters.length} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Mi colección</h2>
        <Link className="btn btn-primary" to="/personajes/nuevo">Nuevo personaje</Link>
      </div>

      {estado === "LOADING" && <ItemLoadingSpinner />}

      {estado === "ERROR" && <ErrorWithIcon message="Error al cargar tus personajes." />}

      {estado === "READY" && characters.length === 0 && (
        <div className="text-center text-body-secondary py-5">
          Todavía no creaste ningún personaje
        </div>
      )}

      {estado === "READY" && characters.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {characters.map((c) => (
            <CharacterCard key={c._id} character={c}>

              <Link to={`/personajes/${c._id}/editar`} className="btn btn-sm btn-outline-primary">
                Editar
              </Link>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setAEliminar(c)}>
                Borrar
              </button>

            </CharacterCard>
          ))}
        </div>
      )}

      <ConfirmModal
        show={aEliminar !== null}
        title="Eliminar personaje"
        message={`¿Seguro que querés eliminar a ${aEliminar?.name}?`}
        confirmText="Eliminar"
        loading={borrando}
        onConfirm={handleDelete}
        onCancel={() => setAEliminar(null)}
      />
    </div>
  )
}