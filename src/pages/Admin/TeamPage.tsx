"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Admin/Layout"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"

import type { Team } from "@/types/team"
import { TeamModal } from "@/components/Modal/team-modal"

export default function TeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])

  // state สำหรับ Team Modal (เพิ่ม/แก้ไข ทีม)
  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  async function fetchTeams() {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: API.team,
        method: "GET",
      })
      setTeams(res.data.data)
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteTeam(teamId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this team?")
    if (!confirmDelete) return

    try {
      setLoading(true)
      await UseAPI({
        url: `${API.team}/${teamId}`,
        method: "DELETE",
      })
      await fetchTeams()
    } catch (error) {
      console.error("Error deleting team:", error)
    } finally {
      setLoading(false)
    }
  }

  function openTeamModal(team?: Team) {
    if (team) {
      setCurrentTeam(team)
    } else {
      setCurrentTeam(null)
    }
    setTeamModalOpen(true)
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Team Management</h2>
          <Button
            onClick={() => openTeamModal()}
            variant="outline"
            className="flex gap-2"
            size={teamModalOpen ? "sm" : "lg"}
          >
            <span>+</span> Add Team
          </Button>
        </div>

        <div className="mb-6">
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.name}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          teams.map((team) =>
            selectedTeam === "all" || selectedTeam === team.name ? (
              <div key={team.id} className="mb-8 border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <div>
                    <Button
                      onClick={() => openTeamModal(team)}
                      variant="outline"
                      className="mr-2"
                    >
                      Edit Team
                    </Button>
                    <Button onClick={() => deleteTeam(team.id)} variant="destructive">
                      Delete Team
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{team.description}</p>
              </div>
            ) : null
          )
        )}

        <TeamModal
          isOpen={teamModalOpen}
          onClose={() => setTeamModalOpen(false)}
          onSave={fetchTeams}
          team={currentTeam}
        />

      </div>
    </Layout>
  )
}
