import { useState } from "react"

const casas = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]

export default function CharacterFilters({ onFilter }) {
    
    const [title, setTitle] = useState("")
    const [house, setHouse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onFilter({ title: title.trim(), house })
    }

    const handleClear = () => {
        setTitle("")
        setHouse("")
        onFilter({})
    }

    return (
        <form onSubmit={handleSubmit} className="row g-2 align-items-center mb-4">
        <div className="col-12 col-md-6">
            <label htmlFor="buscar" className="visually-hidden visually-hidden-focusable">Buscar por nombre</label>
            <input
                id="buscar"
                type="text"
                className="form-control"
                placeholder="Buscar personaje por nombre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="col-12 col-md-3">
            <label htmlFor="select-casas" className="visually-hidden visually-hidden-focusable">Filtra por casas</label>
            <select
            id="select-casas"
            className="form-select"
            value={house}
            onChange={(e) => {
                setHouse(e.target.value)
                onFilter({ title: title.trim(), house: e.target.value })
            }}
            >
            <option value="">Todas las casas</option>
                {casas.map((casa) => <option key={casa} value={casa}>{casa}</option>)}
            </select>
        </div>

        <div className="col-12 col-md-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">Buscar</button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleClear} title="Limpiar filtros">
            <i className="bi bi-x-lg"></i>
            </button>
        </div>
        </form>
    )
}