import React from "react";
import TituloH1 from "../components/TituloH1";
import ItemLoadingSpinner from "../components/ItemLoadingSpinner";
import ErrorWithIcon from "../components/ErrorWithIcon";
import CharacterCard from "../components/CharacterCard";
import { useApiCharacters } from "../services/character.service";
import { useState, useEffect } from "react";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [estado, setEstado] = useState("LOADING");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchApi = async () => {
    setEstado("LOADING");
    const { getCharacters } = useApiCharacters();
    try {
      const data = await getCharacters();
      setCharacters(data);
      setEstado("READY");
    } catch (error) {
      setEstado("ERROR");
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  let content = "";
  switch (estado) {
    case "LOADING":
      content = <ItemLoadingSpinner />;
      break;
    case "READY":
      content = (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {characters.map((character) => (
            <CharacterCard key={character._id} character={character} />
          ))}
        </div>
      );
      break;
    case "ERROR":
      content = <ErrorWithIcon message="Error al cargar los personajes." />;
      break;
    default:
      content = "";
  }

  return (
    <div>
      <TituloH1 titulo="Página de personajes" /> 
      { user && (
        <a href="/personajes/nuevo" className="btn btn-primary m-3">Crear personaje para tu colección</a>
      )}
      {content}
    </div>
  );
}
