import React from "react";
import { Link } from "react-router";

export default function CharacterCard({ character }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={character.image}
          className="bd-placeholder-img card-img-top"
          height="225"
          role="img"
          width="100%"
          alt={`Imagen de ${character.name}`}
        />
        <div className="card-body">
          <p className="card-text">
            {character.name}
            {character.customCharacter ? (
              <span className="text-secondary small">
                {" "}
                (Personaje personalizado)
              </span>
            ) : (
              ""
            )}
          </p>
          <p className="card-text"> Casa: {character.house}</p>
          <div className="d-flex justify-content-between align-items-center">

              <Link
                to={`/personajes/${character._id}`}
                type="button"
                className="btn btn-sm btn-secondary"
              >
                Ver mas
              </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
