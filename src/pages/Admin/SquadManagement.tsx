"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Layout from "@/components/Admin/Layout"
import { MemberCard } from "@/components/Admin/MemberCard"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"
import { Member, Team } from "@/types/team"
import { MemberModal } from "@/components/Modal/member-modal"

export default function SquadManagement() {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  // สร้าง State สำหรับเก็บค่าทีมที่ถูกเลือกใน Dropdown
  // เริ่มต้น "all" = แสดงสมาชิกทั้งหมด
  const [selectedTeamId, setSelectedTeamId] = useState("all")

  // สำหรับการเปิด-ปิด Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null)

  useEffect(() => {
    fetchMembers()
    fetchTeams()
  }, [])

  // -- GET all members --
  async function fetchMembers() {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: API.squad,
        method: "GET",
      })
      const data: Member[] = res.data.data || []
      setMembers(data)
    } catch (error) {
      console.error("Error fetching members:", error)
    } finally {
      setLoading(false)
    }
  }

  // -- GET teams --
  async function fetchTeams() {
    try {
      const res = await UseAPI({
        url: API.team,
        method: "GET",
      })
      console.log("Teams:", res.data.data)
      setTeams(res.data.data)
    } catch (error) {
      console.error("Error fetching teams:", error)
    }
  }

  // -- CREATE new member --
  async function handleAddMember(formData: FormData) {
    try {
      setLoading(true)
      await UseAPI({
        url: API.squad,
        data: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await fetchMembers()
    } catch (error) {
      console.error("Error adding member:", error)
    } finally {
      setLoading(false)
    }
  }

  // -- DELETE member by ID --
  async function deleteMemberById(id: number) {
    if (!confirm("Are you sure you want to delete this item?")) return
    try {
      setLoading(true)
      await UseAPI({
        url: `${API.squad}/${id}`,
        method: "DELETE",
      })
      await fetchMembers()
    } catch (error) {
      console.error("Error deleting member:", error)
    } finally {
      setLoading(false)
    }
  }

  // -- UPDATE member by ID --
  async function handleUpdateMember(id: number, formData: FormData) {
    try {
      setLoading(true)
      await UseAPI({
        url: `${API.squad}/${id}`,
        data: formData,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      await fetchMembers()
    } catch (error) {
      console.error("Error updating member:", error)
    } finally {
      setLoading(false)
    }
  }

  // เปิด Modal แก้ไขสมาชิก
  function openEditModal(member: Member) {
    setMemberToEdit(member)
    setIsEditModalOpen(true)
  }

  // -- Filter members by selectedTeamId --
  const filteredMembers =
    selectedTeamId === "all"
      ? members
      : members.filter((m) => String(m.teamId) === selectedTeamId)

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Squad Management</h2>

          {/* Dropdown สำหรับเลือกทีม */}
          <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {/* ตัวเลือกสำหรับแสดงสมาชิก "ทุกทีม" */}
              <SelectItem value="all">All</SelectItem>

              {/* แสดงรายชื่อทีมจาก state teams */}
              {teams.map((team) => (
                // แปลง team.id เป็น string เพื่อให้ตรงกับ type ของ value
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                {...member}
                role={member.position}
                joinDate={member.startDate}
                description={member.roleDescription}
                onEdit={() => openEditModal(member)}
                onDelete={deleteMemberById}
              />
            ))
          )}
        </div>

        <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8">
          <Button
            variant="outline"
            className="mx-auto flex gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <span>+</span> Add Photo
          </Button>
        </div>

        {/* Modal สำหรับ Add Member */}
        <MemberModal
          mode="add"
          open={isAddModalOpen}
          teams={teams} // ส่ง teams ลงไปให้ modal
          onOpenChange={(open) => setIsAddModalOpen(open)}
          onSubmit={async (formData) => {
            await handleAddMember(formData)
            setIsAddModalOpen(false)
          }}
        />

        {/* Modal สำหรับ Edit Member */}
        <MemberModal
          mode="edit"
          open={isEditModalOpen}
          teams={teams} // ส่ง teams ลงไปด้วยเช่นกัน
          memberData={memberToEdit}
          onOpenChange={(open) => {
            setIsEditModalOpen(open)
            if (!open) {
              setMemberToEdit(null)
            }
          }}
          onSubmit={async (formData) => {
            if (memberToEdit) {
              await handleUpdateMember(memberToEdit.id, formData)
            }
            setIsEditModalOpen(false)
          }}
        />
      </div>
    </Layout>
  )
}
