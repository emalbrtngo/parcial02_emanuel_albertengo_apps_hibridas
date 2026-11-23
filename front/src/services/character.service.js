import { call } from './api.service.jsx'

export function useApiCharacters() {
    function getCharacters() { return call("/personajes") }
    function getCharacterById(id) { return call(`/personajes/${id}`) }
    function createCharacter(data) { return call("/personajes", "POST", data) }
    function updateCharacter(id, data) { return call(`/personajes/${id}`, "PUT", data) }
    function deleteCharacter(id) { return call(`/personajes/${id}`, "DELETE") }
    function deleteCharacterComment(id) {return call(`/personajes/comentarios/${id}`, "DELETE")}
    function submitComment(id, data) {return call(`/personajes/${id}/comentarios` , "POST", data)}

    return {
        getCharacters,
        getCharacterById,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        deleteCharacterComment,
        submitComment
    }
}