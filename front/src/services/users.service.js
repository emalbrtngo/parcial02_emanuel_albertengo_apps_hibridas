import {call} from '../services/api.service'

export function useApiUsers() {
    function registerUser(data) { return call('/users', 'POST', data)}
    function getUsers(filtros = {}) {
        const params = new URLSearchParams(filtros).toString()
        return call(`/users${params ? `?${params}` : ""}`)
    }
    function deleteUser(id) { return call(`/users/${id}`, 'DELETE')}
    function login(data) { return call(`/users/login`, 'POST', data)}
    function changeRol(id, rol) { return call(`/users/${id}/rol`, 'PATCH', { rol }) }


    return { 
        registerUser,
        getUsers,
        deleteUser,
        login,
        changeRol
    }
}

