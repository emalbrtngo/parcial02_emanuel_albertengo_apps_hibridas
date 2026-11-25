import { useState, useEffect } from "react";
import { Link } from "react-router";
import TituloH1 from "../components/TituloH1";
import ItemLoadingSpinner from "../components/ItemLoadingSpinner";
import ErrorWithIcon from "../components/ErrorWithIcon";
import CharacterCard from "../components/CharacterCard";
import CharacterFilters from "../components/CharacterFilters";
import Pagination from "../components/Pagination";
import { useApiCharacters } from "../services/character.service";
import { useSession } from "../context/session.context";
import { limpiarFiltros } from "../utils";



export default function Characters() {
  const { user } = useSession();
  const { getCharacters } = useApiCharacters();  

  const [characters, setCharacters] = useState([]);
  const [estado, setEstado] = useState("LOADING");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtros, setFiltros] = useState({})

  const handleFilter = (nuevosFiltros) => {
    setFiltros(nuevosFiltros)
    setCurrentPage(1)
  }

  useEffect(() => {
    setEstado("LOADING");
    getCharacters({ ...limpiarFiltros(filtros), page: currentPage, limit: 9 })
      .then((data) => {
        setCharacters(data);
        setEstado("READY");
        window.scrollTo({ top: 0, behavior: "smooth" }); // subir al cambiar de página
      })
      .catch(() => setEstado("ERROR"));
  }, [currentPage, filtros]);

  const hasNext = characters.length === 9;

  return (
    <div>
      <TituloH1 titulo="Personajes del mundo mágico" />

      <div className="card border-0 shadow-sm p-4 my-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <p className="lead mb-1">Explorá el mundo mágico y descubrí a sus personajes.</p>
          <p className="text-body-secondary mb-0">También podés crear el tuyo!</p>
        </div>

        {user ? (
          <Link to="/personajes/nuevo" className="btn btn-primary text-nowrap">
            Crear personaje
          </Link>
        ) : (
          <Link to="/login" className="btn btn-outline-primary text-nowrap">
            Iniciá sesión para crear el tuyo
          </Link>
        )}
      </div>

      <CharacterFilters onFilter={handleFilter} />

      {estado === "LOADING" && <ItemLoadingSpinner />}
      {estado === "ERROR" && <ErrorWithIcon message="Error al cargar los personajes." />}

      {estado === "READY" && (
        <>
          {characters.length === 0 ? (
            <p className="text-center text-body-secondary py-5">No hay más personajes para mostrar</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {characters.map((character) => (
                <CharacterCard key={character._id} character={character} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} hasNext={hasNext} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}