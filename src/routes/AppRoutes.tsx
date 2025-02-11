import { Routes, Route } from "react-router"
import Home from "../pages/Home"
import TimelinePage from "../pages/TimelinePage"
import SquadPage from "../pages/SquadPage"
import AdminConsole from "@/pages/Admin/AdminConsole"
import SquadManagement from "@/pages/Admin/SquadManagement"
import GalleryManagement from "@/pages/Admin/GalleryManagement"
import ProtectedRoute from "./ProtectedRoute"
import TeamManagement from "@/pages/Admin/TeamPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminConsole />} />
        <Route path="/squad-management" element={<SquadManagement />} />
        <Route path="/gallery-management" element={<GalleryManagement />} />
        <Route path="/team-management" element={<TeamManagement />} />
      </Route>

      {/* Unprotected Routes */}
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/squad" element={<SquadPage />} />
    </Routes>
  )
}

