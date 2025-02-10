import Navbar from "@/components/Navbar"
import type React from "react"
import { useLocation } from "react-router"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const adminPaths = ["/admin", "/dashboard", "/squad-management", "/gallery-management"]

  const isAdminPath = adminPaths.some((path) => location.pathname.startsWith(path))

  return (
    <>
      {!isAdminPath && <Navbar />}
      {children}
    </>
  )
}

export default Layout

