import { Navigate, Outlet } from "react-router"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

