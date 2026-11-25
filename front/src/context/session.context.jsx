import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"

export const context = createContext()

export function useSession() {
    return useContext(context)
}

export function SessionProvider({ children }) {
    // arranca con lo que haya en ls asi no se pierde la sesion
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"))

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        toast.success(`Inicio de sesión exitoso. Bienvenido ${userData.username}`)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        toast.info('Cerraste sesión')
    }

    const rol = () => {
        if (user?.token){
            const payload = jwtDecode(user?.token)
            // toast.warning('Rol de admin verificado correctamente')
            return payload.rol
        }
    }
    

    return (
        <context.Provider value={{ user, login, logout, rol  }}>
        {children}
        </context.Provider>
    )
}