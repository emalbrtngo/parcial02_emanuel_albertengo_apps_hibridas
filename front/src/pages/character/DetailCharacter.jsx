// pages/characters/DetailCharacter.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useApiCharacters } from '../../services/character.service.js'
import ItemLoadingSpinner from '../../components/ItemLoadingSpinner.jsx'
import ErrorWithIcon from '../../components/ErrorWithIcon.jsx'
import CommentForm from '../../components/comments/CommentForm.jsx'
import CommentList from '../../components/comments/CommentList.jsx'

const HOUSE_COLORS = {
  Gryffindor: "#740001",
  Slytherin: "#1a472a",
  Ravenclaw: "#0e1a40",
  Hufflepuff: "#ecb939",
}

const NO_IMAGE = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"

export default function DetailCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [estado, setEstado] = useState('LOADING')
  const [character, setCharacter] = useState(null)
  const { getCharacterById } = useApiCharacters()

  useEffect(() => {
    getCharacterById(id)
      .then((data) => {
        setCharacter(data)
        setEstado('READY')
      })
      .catch(() => setEstado('ERROR'))
  }, [id])

  if (estado === 'LOADING') return <ItemLoadingSpinner />
  if (estado === 'ERROR') return <ErrorWithIcon message="Error al cargar el personaje." />

  const houseColor = HOUSE_COLORS[character.house] || "#6c757d"

  const datos = [
    { label: "Casa", value: character.house || "Sin casa" },
    { label: "Especie", value: character.species },
    { label: "Actor", value: character.actor },
    { label: "Nacimiento", value: character.dateOfBirth || character.yearOfBirth },
    { label: "Ascendencia", value: character.ancestry },
    { label: "Patronus", value: character.patronus },
  ]

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary px-0 mb-3">
        Volver
      </button>

      <div className="card border-0 shadow-sm overflow-hidden mb-5">
        <div style={{ height: "8px", backgroundColor: houseColor }}></div>

        <div className="row g-0">
          <div className="col-12 col-md-4">
            <img
              src={character.image || NO_IMAGE}
              alt={character.name}
              className="w-100 h-100"
              style={{ objectFit: "cover", minHeight: "280px" }}
            />
          </div>

          <div className="col-12 col-md-8">
            <div className="card-body p-4">
              <span className="badge mb-2" style={{ backgroundColor: houseColor }}>
                {character.house || "Sin casa"}
              </span>
              <h1 className="h2 mb-1">{character.name}</h1>
              {character.alternate_names?.length > 0 && (
                <p className="text-body-secondary fst-italic">
                  También conocido como {character.alternate_names.join(", ")}
                </p>
              )}

              <dl className="row mt-4 mb-0">
                {datos.map(({ label, value }) => (
                  <div key={label} className="col-12 col-sm-6 mb-3">
                    <dt className="small text-body-secondary fw-normal">
                      {label}
                    </dt>
                    <dd className="mb-0 fw-semibold">{value || "Desconocido"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="h4 mb-3">
          Comentarios <span className="badge text-bg-secondary">{character.comments?.length || 0}</span>
        </h2>
        <CommentForm />
        <CommentList comments={character.comments} />
      </section>
    </div>
  )
}