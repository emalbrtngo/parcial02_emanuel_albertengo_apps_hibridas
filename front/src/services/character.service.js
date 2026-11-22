import { call } from './api.service.jsx'

export function useApiCharacters() {
    function getCharacters() { return call("/personajes") }
    function getCharacterById(id) { return call(`/personajes/${id}`) }
    function createCharacter(data) { return call("/personajes", "POST", data) }
    function updateCharacter(id, data) { return call(`/personajes/${id}`, "PUT", data) }
    function deleteCharacter(id) { return call(`/personajes/${id}`, "DELETE") }

    return {
        getCharacters,
        getCharacterById,
        createCharacter,
        updateCharacter,
        deleteCharacter
    }
}