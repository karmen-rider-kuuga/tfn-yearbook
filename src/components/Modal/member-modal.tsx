"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Member, Team } from "@/types/team"

interface MemberModalProps {
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormData) => Promise<void>
  memberData?: Member | null // ข้อมูลเดิม ถ้าเป็นโหมด edit
  teams: Team[] // รายชื่อทีมทั้งหมดที่ดึงมาได้
}

export function MemberModal({
  mode,
  open,
  onOpenChange,
  onSubmit,
  memberData,
  teams,
}: MemberModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // ฟิลด์ต่าง ๆ ที่ต้องการให้แก้ไข
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [startDate, setStartDate] = useState("")

  // เพิ่ม state สำหรับ teamId
  const [teamId, setTeamId] = useState<string>("0")

  // เมื่อ modal เปิด (หรือ memberData เปลี่ยน) ให้ set ค่าเริ่มต้น
  useEffect(() => {
    if (mode === "edit" && memberData) {
      setName(memberData.name || "")
      setPosition(memberData.position || "")
      setRoleDescription(memberData.roleDescription || "")
      setStartDate(memberData.startDate || "")
      // ถ้า edit แล้วมี teamId ให้เซ็ตค่าทีม
      if (memberData.teamId) {
        setTeamId(String(memberData.teamId))
      } else {
        setTeamId("0")
      }
      setSelectedFile(null) // เคลียร์ไฟล์ทุกครั้ง เมื่อเปิดโมดอลแก้ไข
    } else {
      // ถ้าเป็น add หรือเคลียร์ฟอร์ม
      setName("")
      setPosition("")
      setRoleDescription("")
      setStartDate("")
      setSelectedFile(null)
      setTeamId("0")
    }
  }, [mode, memberData, open])

  // จัดการ Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file)
    }
  }
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // ตรวจสอบว่าฟอร์มกรอกครบหรือไม่
  // 1) name, position, roleDescription, startDate ต้องไม่ว่าง
  // 2) รูปภาพ:
  //    - ถ้า mode="add" => ต้องอัปโหลดไฟล์เสมอ
  //    - ถ้า mode="edit" => ต้องมีรูปภาพเดิม (memberData?.imageUrl) หรือมีไฟล์ใหม่
  const isFormValid = (() => {
    if (!name.trim()) return false
    if (!position.trim()) return false
    if (!roleDescription.trim()) return false
    if (!startDate.trim()) return false

    // ตรวจรูป
    if (mode === "add") {
      // ต้องอัปโหลดไฟล์
      if (!selectedFile) return false
    } else {
      // edit mode: ไม่มีไฟล์ใหม่ => ต้องมีรูปเดิม
      const hasExistingImage = memberData?.imageUrl && memberData.imageUrl.trim() !== ""
      if (!selectedFile && !hasExistingImage) {
        return false
      }
    }

    return true
  })()

  // เมื่อกด Submit จะส่ง FormData กลับไปให้ Parent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    // Append รูป (ถ้ามีไฟล์ใหม่)
    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    formData.append("name", name)
    formData.append("position", position)
    formData.append("roleDescription", roleDescription)
    formData.append("startDate", startDate)

    // teamId ถ้าเป็น "0" อาจหมายถึง "No Team"
    // สามารถปรับ logic เองได้ตามต้องการ
    formData.append("teamId", teamId)

    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Member" : "Add Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="team">Select Team</Label>
            <Select
              value={teamId}
              onValueChange={setTeamId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No Team</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={String(team.id)}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <div className="relative">
              <Input
                type="date"
                id="joinDate"
                name="startDate"
                required
                className="pl-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Drag and Drop File */}
          <div className="space-y-2">
            <Label>Upload Photo</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                {selectedFile ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Selected file: {selectedFile.name}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    {/* แสดงรูปเดิมกรณี edit mode มีรูปอยู่แล้ว */}
                    {mode === "edit" && memberData?.imageUrl && (
                      <img
                        src={memberData.imageUrl}
                        alt="current image"
                        className="w-28 h-28 object-cover mx-auto mb-2"
                      />
                    )}
                    <p className="text-sm text-gray-600">
                      Drag and Drop file here or Choose File
                    </p>
                    <p className="text-xs text-gray-500">
                      (jpg, png formats, up to 50MB)
                    </p>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={handleFileSelect}
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                    >
                      Browse
                    </Label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Name, Position, Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">
                Position<span className="text-red-500">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleDescription">
              Description / Quote<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="roleDescription"
              name="roleDescription"
              required
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            {/* 
              ใช้ isFormValid เพื่อกำหนด disabled และกำหนด style 
              - ถ้า valid: สีพื้นหลัง primary, กดได้
              - ถ้าไม่ valid: ปิดการใช้งานปุ่ม
            */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className={
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            >
              {mode === "edit" ? "Update" : "Save change"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
