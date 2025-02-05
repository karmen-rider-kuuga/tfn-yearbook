"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import Layout from "@/components/Admin/Layout"
import { MemberCard } from "@/components/Admin/MemberCard"
import { UseAPI } from "@/apis/useAPI"
import { API } from "@/apis/API"
import { Member } from "@/types/team"
import { MemberModal } from "@/components/Modal/member-modal"

// ---- Import MemberModal ----

export default function SquadManagement() {
  const [department, setDepartment] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])
  const [positions, setPositions] = useState<string[]>([])

  useEffect(() => {
    fetchMembers()
  }, [])

  // -- GET all members --
  async function fetchMembers() {
    try {
      setLoading(true)
      const res = await UseAPI({
        url: API.squad,
        method: "GET",
      })
      const data = res.data.data || []
      setMembers(data)

      // Extract unique positions
      const uniquePositions: any = Array.from(new Set(data.map((m: Member) => m.position)))
      setPositions(uniquePositions)
    } catch (error) {
      console.error("Error fetching members:", error)
    } finally {
      setLoading(false)
    }
  }

  // -- CREATE new member --
  async function handleAddMember(formData: FormData) {
    formData.append("teamId", "1")
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
    const confirmDelete = confirm("Are you sure you want to delete this item?")
    if (!confirmDelete) return

    try {
      setLoading(true)
      await UseAPI({
        url: API.squad + `/${id}`,
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
        url: API.squad + `/${id}`,
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

  // -- Open edit modal and set the current member to edit --
  function openEditModal(member: Member) {
    setMemberToEdit(member)
    setIsEditModalOpen(true)
  }

  // -- Filter members by department --
  const filteredMembers =
    department === "all"
      ? members
      : members.filter((m) => m.position === department)

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Squad Management</h2>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {positions.map((pos, idx) => (
                <SelectItem key={idx} value={pos}>
                  {pos}
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
          memberData={memberToEdit} // ส่งข้อมูลสมาชิกที่ต้องการแก้ไข
          onOpenChange={(open) => {
            setIsEditModalOpen(open)
            if (!open) {
              // ถ้าปิด modal ให้เคลียร์ state
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
