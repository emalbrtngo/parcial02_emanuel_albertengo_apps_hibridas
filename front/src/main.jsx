import { StrictMode, lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.scss"  
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css" 
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import ProtectedRoute from './components/ProtectedRoute.jsx'
// import App from './pages/App.jsx'
// import Home from './pages/Home.jsx'
// import Characters from './pages/Characters.jsx'
import Layout from './components/Layout.jsx';
import Logout from './pages/auth/Logout.jsx'
import { SessionProvider } from './context/session.context.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Characters = lazy(() => import('./pages/Characters.jsx'))
const NewCharacter = lazy(() => import('./pages/character/NewCharacter.jsx'))
const EditCharacter = lazy(() => import('./pages/character/EditCharacter.jsx'))
const DetailCharacter = lazy(() => import('./pages/character/DetailCharacter.jsx'))
const DeleteCharacter = lazy(() => import('./pages/character/DeleteCharacter.jsx'))
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const MyCollection = lazy(() => import('./pages/MyCollection.jsx'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const AdminCharacters = lazy(() => import('./pages/admin/characters/Characters.jsx'))
const AdminUsers = lazy(() => import('./pages/admin/users/Users.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}> <Home /></Suspense>,
      },
      {
        path: "/personajes",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><Characters /></Suspense>,
      },
      {
        path: "/personajes/nuevo",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><ProtectedRoute element={ <NewCharacter/>} /></Suspense>,
      },
      {
        path: "/personajes/:id/editar",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><ProtectedRoute element={ <EditCharacter />} /></Suspense>,
      },
      {
        path: "/personajes/:id/eliminar",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><ProtectedRoute element={ <DeleteCharacter />} /></Suspense>,
      },
      {
        path: "/personajes/:id",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><DetailCharacter /></Suspense>,
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><Login /></Suspense>,
      },
      {
        path: "/register",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><Register /></Suspense>,
      },
      {
        path: "/logout",
        element:  <Suspense fallback={<div>Revolviendo el caldero...</div>}><ProtectedRoute element={<Logout />} /></Suspense>,
      },
      {
        path: "/micolleccion",
        element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><ProtectedRoute element={<MyCollection />} /></Suspense>,
      }
    ]
  },
  {
    path: "/admin",
    element: <ProtectedRoute rol={['admin']} element={<AdminLayout />}  />,
    children: [
    {
      index: true,                                   
      element: <Navigate to="dashboard" replace />,  
    },
    {
      path: "dashboard",                            
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><AdminDashboard /></Suspense>,
    },
    {
      path: "characters",
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><AdminCharacters /></Suspense>,
    },
    {
      path:"characters/edit/:id",
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><EditCharacter /></Suspense>,
    },
    {
      path:"characters/delete/:id",
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><DeleteCharacter /></Suspense>,
    },
    {
      path: "characters/create",
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><NewCharacter /></Suspense>,
    },
    {
      path: "users",
      element: <Suspense fallback={<div>Revolviendo el caldero...</div>}><AdminUsers /></Suspense>,
    }
    ]
  },
  {
    path: "*", // si no matchea con nada
    element: <div>404 - Página no encontrada</div>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
