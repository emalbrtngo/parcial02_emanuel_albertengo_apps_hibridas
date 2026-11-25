import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useApiCharacters } from '../../services/character.service.js'
import ItemLoadingSpinner from '../../components/ItemLoadingSpinner.jsx'
import ErrorWithIcon from '../../components/ErrorWithIcon.jsx'
import { toast } from 'sonner'

export default function DeleteCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [estado, setEstado] = useState("LOADING")
  const { getCharacterById, deleteCharacter } = useApiCharacters()

  useEffect(() => {
    getCharacterById(id)
      .then((data) => {
        setCharacter(data)
        setEstado("READY")
      })
      .catch(() => setEstado("ERROR"))
  }, [])

  const handleDelete = (e) => {
    e.preventDefault()
    deleteCharacter(id)
      .then(() => 
        navigate(-1),     )
      .catch(() => console.error("No se pudo eliminar el personaje"))
  }

  if (estado === "LOADING") return <ItemLoadingSpinner />
  if (estado === "ERROR") return <ErrorWithIcon message="Personaje no encontrado" />

  return (
    <div className="card shadow-sm mx-auto mt-5 p-4" style={{ maxWidth: "500px" }}>
      <h1 className="h4">Eliminar personaje</h1>
      <p>¿Estás seguro de que deseas eliminar a <strong>{character.name}</strong>?</p>
      <form onSubmit={handleDelete} className="d-flex gap-2 justify-content-end">
        <button type="submit" className="btn btn-danger">Eliminar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  )
}