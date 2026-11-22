import React from 'react'
import { Navigate } from 'react-router'
/*
Éste componente permite o restringe el acceso si el usuario está o no logeado.
Se aplica a rutas que quiero que el user esté logeado
Como funciona:
Si usuario está logeado, es decir, existe en ls, entoncces lo mando a "element" que corresponderá
a una ruta protegida. De lo contrario, lo redirijo al login.

En las rutas:
Luego en las rutas hay que pasar este componente y dentro, la prop con el elemento que se quiere 
intresar: ej <ProtectedRoute element={<MiPerfil />} /> o rutas de administración acompañando

NO OLVIDAR: RECIBE POR PROP UN ARRAY DE ROLES PERMITIDOS.
la prop con un rol: ej <ProtectedRoute element={<AdminPanel />} rol=["admin", "superadmin"] />

SEGUIR VIENDO LA CLASE 1HORA 16MIN
*/ 


export default function ProtectedRoute({ element, rol }) {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/login" />  //No está logueado al login

  if (!rol || rol.includes(user.rol)) return element //Tiene rol permitido o no se requiere rol

  return <Navigate to="/" /> 
}
