import {call} from '../services/api.service'

export function useApiUsers() {
    function registerUser(data) { return call('/users', 'POST', data)}


    return { registerUser }
}