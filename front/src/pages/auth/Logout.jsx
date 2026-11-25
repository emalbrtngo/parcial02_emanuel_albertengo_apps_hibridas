import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useSession } from '../../context/session.context.jsx'

export default function Logout() {
  const auth = useSession()

  useEffect(() => {
    auth.logout()
  }, [])

  return <Navigate to="/login" />
}