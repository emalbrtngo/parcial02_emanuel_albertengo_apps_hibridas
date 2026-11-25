import { Link } from "react-router";

const NO_IMAGE = "https://placehold.net/default.svg";

export default function CharacterCard({ character, children }) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <img
          src={character.image || NO_IMAGE}
          className="card-img-top"
          style={{ height: "225px", objectFit: "cover" }}
          alt={`Imagen de ${character.name}`}
        />
        <div className="card-body d-flex flex-column">
          <p className="card-text mb-1">
            {character.name}
            {character.customCharacter && (
              <span className="text-secondary small"> (Personaje personalizado)</span>
            )}
          </p>
          <p className="card-text">Casa: {character.house || "Sin casa"}</p>

          <div className="d-flex gap-2 mt-auto">
            <Link to={`/personajes/${character._id}`} className="btn btn-sm btn-secondary">
              Ver más
            </Link>
            {/* recibe botones para my coleccion */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}