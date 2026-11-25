export default function Pagination({ currentPage, hasNext, onPageChange }) {
    const hasPrev = currentPage > 1


    if (!hasPrev && !hasNext) return null//si hay una sola pagina no se muestra nada

    return (
        <nav aria-label="Paginación de personajes" className="d-flex justify-content-center mt-4">
        <ul className="pagination mb-0">
            <li className={`page-item ${!hasPrev ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrev}>
                <i className="bi bi-chevron-left"></i> Anterior
            </button>
            </li>

            <li className="page-item active" aria-current="page">
            <span className="page-link">{currentPage}</span>
            </li>

            <li className={`page-item ${!hasNext ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
                Siguiente <i className="bi bi-chevron-right"></i>
            </button>
            </li>
        </ul>
        </nav>
    )
}